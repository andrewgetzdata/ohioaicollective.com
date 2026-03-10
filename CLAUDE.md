# JoinForge Data Management

This project uses local JSON files for Partners, Jobs, and Events data.

## Data Files
- `/src/data/partners.json` - Partner logos and information
- `/src/data/jobs.json` - Job listings with markdown descriptions
- `/src/data/events.json` - Events with markdown descriptions

## Data Management Guidelines
- Always validate JSON syntax after edits
- Use markdown in description fields for rich formatting
- Set `is_archived: true` to hide items instead of deleting
- For jobs: include created_date in ISO format
- For events: use ISO datetime format for date field
- For partners: set display_order for positioning

## Workflow
1. Edit data files directly
2. Run `npm run build` to test changes
3. Create PR for review before merging to main

## Available Skills
- `/edit-job` - Add or edit job postings
- `/edit-event` - Add or edit events
- `/edit-partner` - Add or edit partners
- `/validate-data` - Validate JSON data files