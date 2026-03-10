# Edit Job

Help manage job listings in /src/data/jobs.json

## Usage
/edit-job [action] [job-title]

## Actions
- add: Add new job listing
- edit: Modify existing job
- archive: Set is_archived to true

## Job Fields (Required)
- title: Job title
- company: Company name
- job_type: "Full-time", "Part-time", "Contract", "Internship"
- role_summary: Brief summary (max 200 chars)
- location: Array of location strings ["City, State", "City, State"]
- salary_range: Salary range string (e.g., "$100,000 - $150,000")
- description: Markdown formatted job description
- requirements: Markdown formatted requirements
- application_url: URL to apply
- company_logo: URL or data URI for company logo
- tags: Array of skill/technology tags ["SQL", "Python", "React"]
- is_archived: boolean, false to display
- created_date: ISO datetime string

## Process
1. Read current jobs.json file
2. Parse and validate provided job information
3. Create proper JSON structure with validation
4. Ensure markdown formatting in description/requirements
5. Set created_date to current ISO datetime for new jobs
6. Validate all required fields and data types
7. Write updated file
8. Show summary of changes made
9. Test with `npm run build` to ensure JSON is valid
10. Suggest using `/git-workflow` skill for committing changes

## Validation Rules
- All required fields must be present
- job_type must be one of the valid options
- location must be array of strings
- tags must be array of strings
- salary_range should follow format "$X,XXX - $Y,YYY"
- URLs must be valid format
- created_date must be ISO 8601 format
- Boolean fields must be true/false

## Example Job Structure
```json
{
  "title": "Data Scientist",
  "company": "TechCorp",
  "job_type": "Full-time",
  "role_summary": "Build ML models and drive data-driven decisions",
  "location": ["Columbus, OH", "Remote"],
  "salary_range": "$120,000 - $180,000",
  "description": "## About the Role\n\nWe're looking for...",
  "requirements": "## Requirements\n\n- 3+ years Python experience...",
  "application_url": "https://example.com/apply",
  "company_logo": "https://example.com/logo.png",
  "tags": ["Python", "Machine Learning", "SQL"],
  "is_archived": false,
  "created_date": "2025-02-11T12:00:00.000Z"
}
```