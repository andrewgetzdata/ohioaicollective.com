# Submit PR

Create and submit pull request for code changes

## Usage
/submit-pr "description of changes"

## Workflow
1. Check git status for modified/new files
2. Review changes across all modified files
3. Run npm run build to verify changes work
4. Create descriptive commit message
5. Push changes to new branch
6. Create pull request with:
   - Clear description of changes
   - Screenshots if UI changes are visible
   - Request review from team members

## Commit Message Format
Use conventional commits format:
"type(scope): description"

Examples:
- "feat: migrate from Base44 to local JSON data files"
- "fix(jobs): correct job filtering logic"
- "docs: add data management documentation"
- "refactor(auth): remove Base44 authentication system"

## PR Description Template
```markdown
## Summary
Brief description of what was changed and why

## Changes Made
- Bulleted list of key changes
- Include file changes and new features
- Note any breaking changes

## Test Plan
- [ ] npm run build passes
- [ ] npm run preview works
- [ ] All pages load correctly
- [ ] Data displays properly

## Additional Notes
Any important context or follow-up items
```

## Before Creating PR
1. Ensure all changes are intentional
2. Verify build passes
3. Test critical functionality
4. Update documentation if needed