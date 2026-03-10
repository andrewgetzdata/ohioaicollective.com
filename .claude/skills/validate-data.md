# Validate Data

Validate JSON data files for proper formatting and required fields

## Usage
/validate-data [file]

## Files
- partners: Validate partners.json
- jobs: Validate jobs.json
- events: Validate events.json
- all: Validate all data files

## Validation Checks
- Valid JSON syntax
- Required fields present
- Proper data types (strings, arrays, booleans)
- Date format validation (ISO 8601)
- URL format validation
- Enum validation (job_type, event type, logo_height)
- Array structure validation (location, tags)

## When validation fails:
1. Show specific error locations
2. Suggest corrections
3. Offer to fix common issues automatically

## Required Fields by Type

### Jobs
- title, company, job_type, role_summary, location, salary_range
- description, requirements, application_url, tags, is_archived, created_date

### Events
- title, type, description, speaker, date, duration_in_minutes
- location, tags, is_past

### Partners
- name, logo_url, display_order, logo_height, is_archived