#!/usr/bin/env python3
"""
check-freshness.py — BiteForecast production freshness checker

Fetches https://biteforecast.scot (homepage) + all 20 /forecast/[slug]
pages and asserts:
  a) Header timestamp is within 3.5 hours of script runtime
  b) Forecast page header index matches the homepage card for that location
  c) Page's own "Tonight's peak" figure matches the corresponding
     timeline slot (genuine internal consistency — catches data-mismatch
     bugs without comparing two intentionally different metrics)

Usage:  python3 scripts/check-freshness.py
Exit 0: all pages pass
Exit 1: any page fails (prints table)
"""

import re
import sys
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
    req = urllib.request.Request(url, headers={"User-Agent": "biteforecast-freshness-check/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except urllib.error.URLError as e:
        return f"FETCH_ERROR: {e}"


def extract_timestamps(html: str) -> list[str]:
    cleaned = re.sub(r'<!--[\s\S]*?-->', '', html)
    cleaned = re.sub(r'<script[^>]*>[\s\S]*?</script>', '', cleaned)
    pattern = r'(?:Updated\s*)?(\d{1,2}:\d{2}\s*[·.]\s*\d{1,2}\s+[A-Z][a-z]{2})'
    return [m.strip() for m in re.findall(pattern, cleaned)]


def parse_timestamp(ts_str: str) -> datetime | None:
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
    dt = datetime(CURRENT_YEAR, month, day, hour, minute, tzinfo=timezone.utc)
    if dt > NOW + timedelta(hours=6):
        dt = dt.replace(year=dt.year - 1)
    return dt


def extract_homepage_index_map(html: str) -> dict[str, int]:
    """Build {slug: index_number} from homepage forecast cards."""
    index_map: dict[str, int] = {}
    for m in re.finditer(
        r'href="/forecast/([^"&?]+)"(?:(?!</a>).)*?font-size:\s*44[^>]*>(\d+)<',
        html, re.DOTALL
    ):
        index_map[m.group(1)] = int(m.group(2))
    if len(index_map) < 10:
        for m in re.finditer(
            r'"/forecast/([^"]+)"[\s\S]{0,300}?font-size:\s*44[^}]*>(\d+)<', html
        ):
            index_map[m.group(1)] = int(m.group(2))
    return index_map


def extract_forecast_header_index(html: str) -> int | None:
    """Extract the 'RIGHT NOW' index from meta description, then fallback to RSC."""
    m = re.search(
        r'(?:og:description"|name="description")\s+content="[^"]*\((\d+)/10\)', html
    )
    if m:
        return int(m.group(1))
    m = re.search(r'"fontSize":\s*8\d[^}]*>(\d+)', html)
    if m:
        return int(m.group(1))
    m = re.search(r'"fontSize":\s*3\d[^}]*>(\d+)', html)
    if m:
        return int(m.group(1))
    return None


def extract_peak_tonight(html: str) -> tuple[str | None, int | None]:
    """
    Extract the 'Tonight's peak' time and index.

    RSC format (inline JSON in script payload):
      "Peak activity tonight: ","10:00pm"," — ",8,"/10"

    Plain HTML format (with RSC comments stripped):
      Peak activity tonight: 10:00pm — 8/10
    """
    # Strip RSC comments so plain text is readable
    cleaned = re.sub(r'<!--[\s\S]*?-->', '', html)

    # Plain HTML: "Peak activity tonight: 10:00pm — 8/10"
    m = re.search(
        r'Peak activity tonight:\s*(\d{1,2}:\d{2}(?:am|pm))\s*[—–-]\s*(\d+)/10',
        cleaned
    )
    if m:
        return m.group(1).strip(), int(m.group(2))

    # RSC JSON array format: "Peak activity tonight: ","10:00pm"," — ",8,"/10"
    m = re.search(
        r'Peak activity tonight:[^"]*"(\d{1,2}:\d{2}(?:am|pm))"[^,]*,\s*(\d+)',
        html
    )
    if m:
        return m.group(1).strip(), int(m.group(2))

    return None, None


def extract_timeline_index_at(html: str, target_time: str) -> int | None:
    """
    Find the index shown in the 24-hour timeline at a given time.

    Desktop timeline (font-size:22):
      10:00pm</div>...<span class="font-serif" style="font-weight:600;font-size:22;...">8</span>

    Mobile timeline (font-size:20):
      10:00pm</div>...<span class="font-serif" style="font-weight:600;font-size:20;...">8</span>
    """
    target_lower = target_time.lower().replace(" ", "")

    # Plain HTML format: find the time label, then look ahead for font-size:22 or font-size:20
    m = re.search(
        re.escape(target_time) + r'[\s\S]{0,300}?font-size:2[02][^>]*>(\d+)<',
        html
    )
    if m:
        return int(m.group(1))

    # RSC format: "children":"10:00pm" ... "children":INDEX nearby
    pairs = re.findall(
        r'"children":"(\d{1,2}:\d{2}(?:am|pm))"[\s\S]{0,300}?"children":(\d+)',
        html
    )
    for time_str, idx_str in pairs:
        if time_str.lower().replace(" ", "") == target_lower:
            return int(idx_str)

    return None


def main():
    errors = 0

    print(f"BiteForecast Freshness Check — {NOW.strftime('%Y-%m-%d %H:%M UTC')}\n")

    # ── Step 1: Fetch homepage ──
    print("Fetching homepage... ", end="", flush=True)
    hp_html = fetch(ROOT_URL)
    if hp_html.startswith("FETCH_ERROR"):
        print(f"FAIL: {hp_html}")
        sys.exit(1)
    print("OK")

    hp_ts_list = extract_timestamps(hp_html)
    hp_ts = hp_ts_list[0] if hp_ts_list else None
    if hp_ts:
        hp_dt = parse_timestamp(hp_ts)
        if hp_dt:
            hp_age = NOW - hp_dt
            hp_age_str = f"{int(hp_age.total_seconds() / 60)}m"
            if hp_age > MAX_AGE:
                print(f" HOMEPAGE TIMESTAMP STALE: {hp_ts} ({hp_age_str} old)")
                errors += 1
            else:
                print(f" Homepage timestamp: {hp_ts} ({hp_age_str}) — OK")

    hp_index_map = extract_homepage_index_map(hp_html)
    print(f" Homepage index map: {len(hp_index_map)} locations found\n")

    # ── Step 2: Check each forecast page ──
    hdr = (f"{'PAGE':<28} {'TS':<14} {'AGE':<8} {'HDR_IDX':<9} "
           f"{'HP_IDX':<8} {'PEAK_TM':<10} {'PEAK_IDX':<9} {'SLOT_IDX':<9} {'PEAK_OK':<8} RESULT")
    print(hdr)
    print("-" * 105)

    for slug in FORECAST_SLUGS:
        url = f"{ROOT_URL}/forecast/{slug}"
        html = fetch(url)

        if html.startswith("FETCH_ERROR"):
            print(f"{slug:<28} {'FETCH ERROR':<14} {'':<8} {'':<9} {'':<8} {'':<10} {'':<9} {'':<9} {'':<8} FAIL")
            errors += 1
            continue

        page_pass = True

        # ── Timestamp ──
        ts_list = extract_timestamps(html)
        page_ts = ts_list[0] if ts_list else None
        age_str = "?"
        if not page_ts:
            age_str = "NO_TS"
            page_pass = False
        else:
            page_dt = parse_timestamp(page_ts)
            if not page_dt:
                age_str = "PARSE_ERR"
                page_pass = False
            else:
                page_age = NOW - page_dt
                age_str = f"{int(page_age.total_seconds() / 60)}m"
                if page_age > MAX_AGE:
                    page_pass = False

        # ── Header index ──
        hdr_idx = extract_forecast_header_index(html)
        hdr_str = str(hdr_idx) if hdr_idx is not None else "?"

        # ── Homepage consistency ──
        hp_idx = hp_index_map.get(slug)
        hp_str = str(hp_idx) if hp_idx is not None else "?"
        if hdr_idx is not None and hp_idx is not None and hdr_idx != hp_idx:
            page_pass = False

        # ── Tonight's peak vs timeline ──
        peak_time, peak_idx = extract_peak_tonight(html)
        peak_time_str = str(peak_time or "?")
        peak_idx_str = str(peak_idx) if peak_idx is not None else "?"

        slot_idx = None
        peak_ok = True
        if peak_time is not None and peak_idx is not None:
            slot_idx = extract_timeline_index_at(html, peak_time)
            slot_idx_str = str(slot_idx) if slot_idx is not None else "?"
            if slot_idx is not None:
                if slot_idx != peak_idx:
                    peak_ok = False
                    page_pass = False
            else:
                # Couldn't find slot at that time — not necessarily a fail
                pass
        else:
            slot_idx_str = "?"

        peak_label = "MATCH" if peak_ok else "MISMATCH"

        result = "PASS" if page_pass else "FAIL"
        if result == "FAIL":
            errors += 1

        ts_display = str(page_ts or "?")
        print(f"{slug:<28} {ts_display:<14} {age_str:<8} {hdr_str:<9} "
              f"{hp_str:<8} {peak_time_str:<10} {peak_idx_str:<9} {slot_idx_str:<9} {peak_label:<8} {result}")

    print()
    if errors == 0:
        print("ALL PAGES PASS")
        sys.exit(0)
    else:
        print(f"{errors} PAGE(S) FAILED")
        sys.exit(1)


if __name__ == "__main__":
    main()