#!/usr/bin/env python3
"""
check-freshness.py — BiteForecast production freshness checker

Fetches https://biteforecast.scot (homepage) + all 20 /forecast/[slug]
pages and asserts:
  a) Header timestamp is within 3.5 hours of script runtime
  b) Forecast page current index matches the homepage card for that location

Usage:  python3 scripts/check-freshness.py
Exit 0: all pages pass
Exit 1: any page fails (prints table + failures to stderr)
"""

import json
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone

ROOT_URL = "https://biteforecast.scot"
MAX_AGE = timedelta(hours=3, minutes=30)  # 3.5 hours

FORECAST_SLUGS = [
    "glencoe", "fort-william", "isle-of-skye-portree", "loch-lomond-balloch",
    "cairngorms-aviemore", "arisaig", "glenfinnan", "torridon", "applecross",
    "isle-of-mull-craignure", "loch-ness-drumnadrochit", "glen-affric",
    "rannoch-moor", "knoydart-inverie", "kinlochleven", "isle-of-arran-brodick",
    "pitlochry", "inveraray", "dunoon", "helensburgh",
]

MONTHS = {
    "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
    "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12,
}

NOW = datetime.now(timezone.utc)
CURRENT_YEAR = NOW.year


def fetch(url: str) -> str:
    """Fetch a URL and return the raw HTML text."""
    req = urllib.request.Request(url, headers={"User-Agent": "biteforecast-freshness-check/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except urllib.error.URLError as e:
        return f"FETCH_ERROR: {e}"


def extract_timestamps(html: str) -> list[str]:
    """Extract all 'HH:MM · DD Mon' timestamps from the HTML."""
    # The timestamp appears in the text "Updated 14:50 · 22 Jul" or "14:50 · 22 Jul"
    # RSC comments (<!-- -->) may split the string
    # Remove HTML comments and RSC markers to get clean text
    cleaned = re.sub(r'<!--[\s\S]*?-->', '', html)
    cleaned = re.sub(r'<script[^>]*>[\s\S]*?</script>', '', cleaned)

    pattern = r'(?:Updated\s*)?(\d{1,2}:\d{2}\s*[·.]\s*\d{1,2}\s+[A-Z][a-z]{2})'
    matches = re.findall(pattern, cleaned)
    # Normalize: strip "Updated" prefix
    return [m.strip() for m in matches]


def parse_timestamp(ts_str: str) -> datetime | None:
    """Parse '14:50 · 22 Jul' into a datetime (assumes current year)."""
    m = re.match(r'(\d{1,2}:\d{2})\s*[·.]\s*(\d{1,2})\s+([A-Z][a-z]{2})', ts_str)
    if not m:
        return None
    time_part = m.group(1)
    day = int(m.group(2))
    month_abbr = m.group(3)
    month = MONTHS.get(month_abbr)
    if not month:
        return None

    hour, minute = map(int, time_part.split(':'))
    # Handle midnight crossing: if the timestamp is > 6 hours in the future,
    # it's probably from yesterday (before a data update at e.g. 01:00)
    dt = datetime(CURRENT_YEAR, month, day, hour, minute, tzinfo=timezone.utc)
    # If the parsed timestamp is more than 6 hours in the future, it's
    # likely from last year (e.g. checking a page cached from Dec 31)
    if dt > NOW + timedelta(hours=6):
        dt = dt.replace(year=dt.year - 1)
    return dt


def extract_homepage_index_map(html: str) -> dict[str, int]:
    """
    From the homepage HTML, build {slug: index_number}.

    Each forecast card is an <a href="/forecast/{slug}"> containing
    a font-serif span with the index number (font-size:44px on desktop).
    The homepage HTML is minified single-line, so scan as one string.
    """
    index_map: dict[str, int] = {}

    # Pattern: find href="/forecast/{slug}" ... then an index number in font-size:44 span
    # The desktop grid has these in standard HTML:
    # <a ... href="/forecast/glencoe" ...>
    #   ... <span class="font-serif" style="...font-size:44px...">INDEX</span> ...
    # </a>
    for m in re.finditer(
        r'href="/forecast/([^"&?]+)"(?:(?!</a>).)*?font-size:\s*44[^>]*>(\d+)<',
        html,
        re.DOTALL
    ):
        slug = m.group(1)
        idx = int(m.group(2))
        index_map[slug] = idx

    # Fallback: RSC-style format where the slug appears in JSON-like structures
    # with "children":"INDEX" patterns near a slug reference
    if len(index_map) < 10:
        for m in re.finditer(
            r'"/forecast/([^"]+)"[\s\S]{0,300}?font-size:\s*44[^}]*>(\d+)<',
            html,
        ):
            slug = m.group(1)
            idx = int(m.group(2))
            index_map[slug] = idx

    return index_map


def extract_forecast_meta_description(html: str) -> int | None:
    """
    Extract the current index from the forecast page's meta description
    which has format: "Current midge activity at Glencoe: Low (1/10)."
    """
    m = re.search(r'(?:og:description"|name="description")\s+content="[^"]*\((\d+)/10\)', html)
    if m:
        return int(m.group(1))
    return None


def extract_forecast_index_rsc(html: str) -> int | None:
    """
    Fallback: extract index from RSC JSON payload.
    Look for "fontWeight":600,"fontSize":88 pattern (desktop) or 36 (mobile).
    """
    m = re.search(r'"fontSize":\s*8\d[^}]*>(\d+)', html)
    if m:
        return int(m.group(1))
    m = re.search(r'"fontSize":\s*3\d[^}]*>(\d+)', html)
    if m:
        return int(m.group(1))
    return None


def main():
    errors = 0
    now_ts = NOW.strftime("%H:%M")

    print(f"BiteForecast Freshness Check — {NOW.strftime('%Y-%m-%d %H:%M UTC')}\n")

    # ── Step 1: Fetch homepage ──
    print("Fetching homepage... ", end="", flush=True)
    hp_html = fetch(ROOT_URL)
    if hp_html.startswith("FETCH_ERROR"):
        print(f"FAIL: {hp_html}")
        sys.exit(1)
    print("OK")

    # Extract homepage timestamp
    hp_ts_list = extract_timestamps(hp_html)
    hp_ts = hp_ts_list[0] if hp_ts_list else None

    if not hp_ts:
        print("FAIL: Could not extract homepage timestamp")
        errors += 1
        hp_age_str = "?"
    else:
        hp_dt = parse_timestamp(hp_ts)
        if not hp_dt:
            print(f"FAIL: Could not parse homepage timestamp '{hp_ts}'")
            errors += 1
            hp_age_str = "?"
        else:
            hp_age = NOW - hp_dt
            hp_age_str = f"{int(hp_age.total_seconds() / 60)}m"
            if hp_age > MAX_AGE:
                print(f" HOMEPAGE TIMESTAMP STALE: {hp_ts} ({hp_age_str} old, max {MAX_AGE})")
                errors += 1
            else:
                print(f" Homepage timestamp: {hp_ts} ({hp_age_str} old) — OK")

    # Build slug→index map from homepage
    hp_index_map = extract_homepage_index_map(hp_html)
    print(f" Homepage index map: {len(hp_index_map)} locations found")

    # ── Step 2: Check each forecast page ──
    print()
    print(f"{'PAGE':<32} {'TIMESTAMP':<16} {'AGE':<10} {'IDX':<6} {'HP_IDX':<6} {'MATCH':<12} {'RESULT'}")
    print("-" * 94)

    for slug in FORECAST_SLUGS:
        url = f"{ROOT_URL}/forecast/{slug}"
        html = fetch(url)

        if html.startswith("FETCH_ERROR"):
            print(f"{slug:<32} {'FETCH ERROR':<16} {'':<10} {'':<6} {'':<6} {'':<12} FAIL")
            errors += 1
            continue

        # Extract timestamp
        ts_list = extract_timestamps(html)
        page_ts = ts_list[0] if ts_list else None
        page_age_str = "?"
        page_pass = True

        if not page_ts:
            page_age_str = "NO_TS"
            page_pass = False
        else:
            page_dt = parse_timestamp(page_ts)
            if not page_dt:
                page_age_str = "PARSE_ERR"
                page_pass = False
            else:
                page_age = NOW - page_dt
                page_age_sec = int(page_age.total_seconds())
                page_age_str = f"{int(page_age_sec / 60)}m"
                if page_age > MAX_AGE:
                    page_pass = False

        # Extract forecast index
        idx = extract_forecast_meta_description(html)
        if idx is None:
            idx = extract_forecast_index_rsc(html)
        idx_str = str(idx) if idx is not None else "?"

        # Check consistency with homepage
        hp_idx = hp_index_map.get(slug)
        hp_idx_str = str(hp_idx) if hp_idx is not None else "?"
        match_str = ""
        if idx is not None and hp_idx is not None:
            if idx == hp_idx:
                match_str = "MATCH"
            else:
                match_str = f"MISMATCH({hp_idx}v{idx})"
                page_pass = False
        elif idx is None:
            match_str = "NO_IDX"
            page_pass = False
        elif hp_idx is None:
            match_str = "NO_HP_REF"
            # Not a hard fail — might be a newer slug not on homepage yet

        result = "PASS" if page_pass else "FAIL"
        if result == "FAIL":
            errors += 1

        print(f"{slug:<32} {str(page_ts or '?'):<16} {page_age_str:<10} {idx_str:<6} {hp_idx_str:<6} {match_str:<12} {result}")

    # ── Summary ──
    print()
    if errors == 0:
        print("ALL PAGES PASS")
        sys.exit(0)
    else:
        print(f"{errors} PAGE(S) FAILED")
        sys.exit(1)


if __name__ == "__main__":
    main()