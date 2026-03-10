# Edit Partner

Help manage partner data in /src/data/partners.json

## Usage
/edit-partner [action] [partner-name]

## Actions
- add: Add new partner
- edit: Modify existing partner
- archive: Set is_archived to true
- reorder: Change display_order

## Partner Fields
- name: Partner company name
- logo_url: URL to partner logo image
- website_url: Partner website (optional)
- display_order: Numeric order for display (0, 1, 2, etc.)
- logo_height: "small", "medium", or "large"
- is_archived: boolean, false to display

## Process
1. Read current partners.json file
2. Make requested changes with proper validation
3. Ensure display_order values are unique and sequential
4. Validate logo_height is one of the allowed values
5. Validate URLs are properly formatted
6. Write updated file
7. Show summary of changes made
8. Test with `npm run build` to ensure JSON is valid
9. Suggest using `/git-workflow` skill for committing changes

## Validation Rules
- name is required and must be string
- logo_url must be valid URL format
- website_url must be valid URL format if provided
- display_order must be unique integer
- logo_height must be "small", "medium", or "large"
- is_archived must be boolean

## Example Partner Structure
```json
{
  "name": "TechCorp",
  "logo_url": "https://example.com/logo.png",
  "website_url": "https://techcorp.com",
  "display_order": 3,
  "logo_height": "large",
  "is_archived": false
}
```

## Display Order Management
- When adding new partner, auto-assign next available display_order
- When reordering, ensure no gaps or duplicates
- When archiving, preserve display_order for potential restoration