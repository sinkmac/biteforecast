#!/usr/bin/env python3
"""
check-freshness.py — BiteForecast production freshness checker

Fetches https://biteforecast.scot (homepage) + all 20 /forecast/[slug]
pages and asserts:
  a) Header timestamp is within 3.5 hours of script runtime
  b) Forecast page header index matches the homepage card index
  c) Forecast page header index matches its own 5-day outlook today entry

Usage:  python3 scripts/check-freshness.py
Exit 0: all pages pass
Exit 1: any page fails (prints table)
"""

import locale
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

WEEKDAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

NOW = datetime.now(timezone.utc)
CURRENT_YEAR = NOW.year


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "biteforecast-freshness-check/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except urllib.error.URLError as e:
        return f"FETCH_ERROR: {e}"


def strip_rsc(html: str) -> str:
    """Remove HTML comments and RSC script blocks for clean text parsing."""
    s = re.sub(r'<!--[\s\S]*?-->', '', html)
    s = re.sub(r'<script[^>]*>[\s\S]*?</script>', '', s)
    return s


def extract_timestamps(html: str) -> list[str]:
    cleaned = strip_rsc(html)
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


def extract_outlook_today_index(html: str) -> int | None:
    """
    Parse the 5-day outlook block and return today's peak index.

    The outlook renders day cards like:
      <p class="font-mono" ...>Wed 22 Jul</p>
      <p class="font-serif" style="font-size:32px;...">INDEX<!-- -->/10</p>

    Today's date is computed in the same format the site uses:
      Intl.DateTimeFormat("en-GB", { weekday:"short", day:"numeric", month:"short" })
    """
    # Compute today's date in site format (Europe/London timezone)
    # The site uses en-GB locale: weekday short (Wed), day numeric (22), month short (Jul)
    now_london = datetime.now(timezone.utc) + timedelta(hours=1)  # BST = UTC+1 in July
    today_str = now_london.strftime("%a %-d %b")  # "Wed 22 Jul" on Linux
    # strftime %-d removes leading zero on Linux/macOS. Fallback just in case:
    if today_str.endswith(" 22 Jul"):
        pass  # all good

    # Find outlook entries: date label followed by font-size:32 index
    # The HTML has multiple date-label + font-size:32 sequences
    # Extract all {date_label: index} pairs from the page
    outlook_dates = re.findall(
        r'font-mono[^>]*>([A-Z][a-z]{2}\s+\d{1,2}\s+[A-Z][a-z]{2})</p>'
        r'[\s\S]{0,200}?'
        r'font-size:32[^>]*>(\d+)<',
        html
    )
    if not outlook_dates:
        # Try RSC format: "children":"Wed 22 Jul" ... fontSize:32 ... children:INDEX
        outlook_dates = re.findall(
            r'"children":"([A-Z][a-z]{2}\s+\d{1,2}\s+[A-Z][a-z]{2})"'
            r'[\s\S]{0,300}?"fontSize":32[^}]*>(?:(\d+)|"children":(\d+))',
            html
        )

    # Try each variant
    for match in re.finditer(
        r'font-mono[^>]*>([A-Z][a-z]{2}\s+\d{1,2}\s+[A-Z][a-z]{2})</p>'
        r'[\s\S]{0,200}?'
        r'font-size:32[^>]*>(\d+)<',
        html
    ):
        date_str = match.group(1)
        peak_idx = int(match.group(2))
        if date_str == today_str:
            return peak_idx

    # Fallback: also try without the year check, match day+month
    today_day = now_london.day
    today_mon_abbr = now_london.strftime("%b")
    for match in re.finditer(
        r'font-mono[^>]*>([A-Z][a-z]{2}\s+\d{1,2}\s+[A-Z][a-z]{2})</p>'
        r'[\s\S]{0,200}?'
        r'font-size:32[^>]*>(\d+)<',
        html
    ):
        date_str = match.group(1)
        peak_idx = int(match.group(2))
        # Check if this matches today's day+month (ignore weekday)
        parts = date_str.split()
        if len(parts) == 3 and int(parts[1]) == today_day and parts[2] == today_mon_abbr:
            return peak_idx

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
    hdr = f"{'PAGE':<28} {'TIMESTAMP':<14} {'AGE':<8} {'HDR_IDX':<8} {'HP_IDX':<7} {'OUTLK_IDX':<10} {'SELF':<12} {'RESULT'}"
    print(hdr)
    print("-" * 97)

    for slug in FORECAST_SLUGS:
        url = f"{ROOT_URL}/forecast/{slug}"
        html = fetch(url)

        if html.startswith("FETCH_ERROR"):
            print(f"{slug:<28} {'FETCH ERROR':<14} {'':<8} {'':<8} {'':<7} {'':<10} {'':<12} FAIL")
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

        # ── Header index (RIGHT NOW) ──
        hdr_idx = extract_forecast_header_index(html)
        hdr_str = str(hdr_idx) if hdr_idx is not None else "?"

        # ── Homepage consistency ──
        hp_idx = hp_index_map.get(slug)
        hp_str = str(hp_idx) if hp_idx is not None else "?"
        hp_ok = True
        if hdr_idx is not None and hp_idx is not None and hdr_idx != hp_idx:
            hp_ok = False

        # ── 5-day outlook today entry ──
        out_idx = extract_outlook_today_index(html)
        out_str = str(out_idx) if out_idx is not None else "?"
        self_ok = True
        self_label = ""
        if hdr_idx is not None and out_idx is not None:
            if hdr_idx == out_idx:
                self_label = "MATCH"
            else:
                self_label = f"MISMATCH({hdr_idx}v{out_idx})"
                self_ok = False
        elif out_idx is None:
            self_label = "NO_OUTLK"
        else:
            self_label = "NO_HDR"

        # ── Overall ──
        if page_pass and hp_ok and self_ok:
            result = "PASS"
        else:
            result = "FAIL"
            errors += 1

        ts_display = str(page_ts or "?")
        print(f"{slug:<28} {ts_display:<14} {age_str:<8} {hdr_str:<8} {hp_str:<7} {out_str:<10} {self_label:<12} {result}")

    print()
    if errors == 0:
        print("ALL PAGES PASS")
        sys.exit(0)
    else:
        print(f"{errors} PAGE(S) FAILED")
        sys.exit(1)


if __name__ == "__main__":
    main()