# Ohio AI Collective

Website for the Ohio AI Collective community — [ohioaicollective.com](https://ohioaicollective.com)

Built with React, Vite, Tailwind CSS, and Radix UI. Deployed via GitHub Pages.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview production build
```

## Data Management

Content is managed through local JSON files in `/src/data/`:

- `partners.json` — Partner logos and information
- `jobs.json` — Job listings with markdown descriptions
- `events.json` — Events with markdown descriptions

Set `is_archived: true` (or `is_past: true` for events) to hide items instead of deleting them.

## Pages

- **Home** — Landing page
- **Events** — Community events and sessions
- **Jobs** — Job board
- **Community** — Community info
- **Calendar** — Event calendar
- **Mission** — About the collective
