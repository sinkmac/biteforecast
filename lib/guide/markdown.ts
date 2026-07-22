const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const renderInlineMarkdown = (value: string) => {
  let html = escapeHtml(value);

  html = html.replace(
    /\[([^\]]+)\]\((https:\/\/www\.amazon\.co\.uk\/[^)]+)\)/g,
    '<a class="text-almanac-green underline decoration-almanac-green/40 underline-offset-4 hover:text-almanac-ink" href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-almanac-ink">$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  return html;
};

const isTableRow = (line: string) => /^\|.+\|$/.test(line.trim());
const isTableDivider = (line: string) => /^\|(?:[\s:-]+\|)+$/.test(line.trim());

function renderTable(lines: string[]) {
  const rows = lines.filter((line) => !isTableDivider(line));
  const [headerLine, ...bodyLines] = rows;
  const cellsFromLine = (line: string) =>
    line
      .trim()
      .slice(1, -1)
      .split("|")
      .map((cell) => cell.trim());

  const headers = cellsFromLine(headerLine);
  const bodyRows = bodyLines.map(cellsFromLine);

  return `<div class="my-6 overflow-x-auto rounded-2xl border border-almanac-border"><table class="w-full min-w-[34rem] border-collapse text-left text-sm"><thead class="bg-almanac-ink text-almanac-card"><tr>${headers
    .map((header) => `<th class="border-b border-almanac-border px-4 py-3 font-semibold text-almanac-card">${renderInlineMarkdown(header)}</th>`)
    .join("")}</tr></thead><tbody>${bodyRows
    .map(
      (row) =>
        `<tr class="border-b border-almanac-border/70 last:border-b-0">${row
          .map((cell) => `<td class="px-4 py-3 align-top text-almanac-secondary">${renderInlineMarkdown(cell)}</td>`)
          .join("")}</tr>`,
    )
    .join("")}</tbody></table></div>`;
}

function renderList(items: string[], ordered: boolean) {
  const tag = ordered ? "ol" : "ul";
  const listClass = ordered
    ? "my-5 list-decimal space-y-3 pl-6 text-almanac-secondary"
    : "my-5 list-disc space-y-3 pl-6 text-almanac-secondary";
  return `<${tag} class="${listClass}">${items
    .map((item) => `<li>${renderInlineMarkdown(item.replace(/^[-]\s+/, "").replace(/^\d+\.\s+/, ""))}</li>`)
    .join("")}</${tag}>`;
}

export function markdownToHtml(markdown: string) {
  const blocks = markdown.trim().split(/\n{2,}/);

  return blocks
    .map((block) => {
      const lines = block.split("\n");
      const trimmed = block.trim();

      if (trimmed.startsWith("## ")) {
        return `<h2 class="mt-10 text-2xl font-semibold tracking-tight text-almanac-ink">${renderInlineMarkdown(trimmed.slice(3))}</h2>`;
      }

      if (lines.every((line) => isTableRow(line) || isTableDivider(line))) {
        return renderTable(lines);
      }

      if (lines.every((line) => /^-\s+/.test(line.trim()))) {
        return renderList(lines.map((line) => line.trim()), false);
      }

      if (lines.every((line) => /^\d+\.\s+/.test(line.trim()))) {
        return renderList(lines.map((line) => line.trim()), true);
      }

      return `<p class="text-lg leading-8 text-almanac-secondary">${renderInlineMarkdown(trimmed).replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");
}
