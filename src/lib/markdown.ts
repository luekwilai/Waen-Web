/**
 * Simple markdown-to-HTML renderer for blog content.
 * Handles the patterns used in WAENWEB blog posts.
 */
export function renderMarkdown(md: string): string {
  const lines = md.split("\n")
  const output: string[] = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Headings
    if (line.startsWith("### ")) {
      if (inList) { output.push("</ul>"); inList = false }
      output.push(`<h3>${inline(line.slice(4))}</h3>`)
      continue
    }
    if (line.startsWith("## ")) {
      if (inList) { output.push("</ul>"); inList = false }
      output.push(`<h2>${inline(line.slice(3))}</h2>`)
      continue
    }

    // List items
    if (line.startsWith("- ")) {
      if (!inList) { output.push("<ul>"); inList = true }
      output.push(`<li>${inline(line.slice(2))}</li>`)
      continue
    }

    // End list on blank line or non-list line
    if (inList && line.trim() === "") {
      output.push("</ul>")
      inList = false
      continue
    }
    if (inList) {
      output.push("</ul>")
      inList = false
    }

    // Blank line → skip (paragraph spacing via CSS)
    if (line.trim() === "") {
      output.push("")
      continue
    }

    // Regular paragraph
    output.push(`<p>${inline(line)}</p>`)
  }

  if (inList) output.push("</ul>")
  return output.join("\n")
}

/** Process inline markdown: **bold**, emoji lines starting with ✅ */
function inline(text: string): string {
  // **bold**
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  // _italic_ (just in case)
  text = text.replace(/\_(.+?)\_/g, "<em>$1</em>")
  return text
}
