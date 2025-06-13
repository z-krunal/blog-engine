---
title: "MDX Cheat Sheet for Blog Writing"
description: "Quick reference for writing expressive, structured posts in MDX."
date: "2025-06-11"
tags: ["MDX", "Blogging", "Next.js", "Markdown"]
---

# 📝 MDX Blog Writing Cheat Sheet

> Use this as your go-to reference for clean, expressive blog posts using Markdown + JSX components in MDX.

---

## 🧱 Headings

```md
# H1 - Main Title
## H2 - Section Title
### H3 - Subsection



✍️ Text Formatting
Bold: **text** → text

Italic: *text* → text

Strikethrough: ~~text~~ → text

Inline code: `code` → code

💬 Blockquotes

> This is a blockquote.
> Use it for insights or emphasis.
💡 Pro Tip: Use agents instead of monolithic prompts.

📋 Lists
Unordered List
md
Copy
Edit
- Item one
- Item two
  - Subitem
Ordered List
md
Copy
Edit
1. First
2. Second
   1. Substep
🧩 Code Blocks
Inline
Use `LangGraph` to chain your agents.

Block (with optional language tag)
<pre> ```js const hello = () => { console.log("Hello, LangGraph!"); } ``` </pre>
📐 Tables
Use markdown or HTML depending on renderer:

md
Copy
Edit
| GenAI Agent       | Microservice Equivalent   |
|-------------------|---------------------------|
| Summarizer        | Bounded Context           |
| Tool-using Agent  | External API Integration  |
| Memory Agent      | Stateful Service          |
Or use HTML if needed:

html
Copy
Edit
<table>
  <thead>
    <tr>
      <th>Agent</th>
      <th>Microservice Equivalent</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Retriever</td>
      <td>Database Query Service</td>
    </tr>
    <tr>
      <td>Planner</td>
      <td>Workflow Engine</td>
    </tr>
  </tbody>
</table>
🖼️ Images


![Alt text for image](/images/my-image.png)
💡 Custom Components (MDX only)
If you’ve defined React components like <Callout>, use:

mdx
Copy
Edit
<Callout type="info" title="Why Agents?">
  Agents let you separate logic, tools, and memory — just like microservices.
</Callout>
📌 Horizontal Rule
md
Copy
Edit
---
🏁 Final Tip
Keep structure clean:

Use H2 for major sections

Separate logic with ---

Combine Markdown with React components when needed

