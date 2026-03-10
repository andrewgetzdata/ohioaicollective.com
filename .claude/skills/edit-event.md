# Edit Event

Help manage events in /src/data/events.json

## Usage
/edit-event [action] [event-title]

## Actions
- add: Add new event
- edit: Modify existing event
- archive: Set is_past to true

## Event Fields
- title: Event title
- type: "Lightning Session", "Workshop", "Ship Session", "Social", "Partner"
- description: Markdown formatted description
- speaker: Speaker or host name
- date: ISO datetime string (e.g., "2025-12-05T17:00:00.000Z")
- duration_in_minutes: Duration number
- location: Location string or "Virtual"
- meeting_url: URL for virtual events
- image_url: Event banner image URL
- max_attendees: Maximum attendee number (or null)
- tags: Array of topic tags
- is_past: boolean, false for future events

## Process
1. Read current events.json file
2. Make requested changes with proper validation
3. Ensure proper ISO datetime formatting for dates
4. Set appropriate event type with correct casing
5. Validate all required fields are present
6. Write updated file
7. Show summary of changes made
8. Test with `npm run build` to ensure JSON is valid
9. Suggest using `/git-workflow` skill for committing changes

## Validation Rules
- Date must be valid ISO 8601 format
- Event type must be one of the valid options
- Required fields must be present and correct data types
- Tags must be array of strings
- Boolean fields must be true/false