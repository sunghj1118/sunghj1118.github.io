# sunghj1118.github.io

Personal blog built with Gatsby 5 + React 18 + styled-components. Deployed via `gh-pages` (see `deploy` script).

## Content directories — avoid reading unless explicitly asked

These hold blog content, not site design/logic. Don't `Read`/`Grep`/`Glob` into them for
general design/dev work — they're large and irrelevant to layout, components, or build config:

- `src/posts/**` — blog post markdown (algorithm/LEET solutions, infra, AI, papers, etc.)
- `src/images/**` — images referenced by posts (mostly LEET/algorithm screenshots)
- `src/archive/**` — old interview prep notes, unrelated to the site itself
- `static/**`, `public/**` — static assets / build output

Only look inside these when the task is specifically about a particular post's content or an
image asset (e.g. "fix a typo in the renewal2025 post", "why isn't this image showing").

## Site code (safe to read/search normally)

- `src/components/**` — layout, header, footer, cards, etc.
- `src/pages/**` — route-level pages (index, blog, projects, map, hourglass, ...)
- `src/templates/**` — post/tag page rendering logic (`blog-post.js`, `tag.js`)
- `gatsby-config.js`, `gatsby-node.js`, `gatsby-ssr.js`
