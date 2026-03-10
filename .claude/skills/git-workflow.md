# Git Workflow

Handle Git operations for data changes with proper branching and PR workflow

## Usage
/git-workflow [description-of-changes]

## Process
1. **Show Changes**: Display git diff of what was modified
2. **Ask Permission**: "Would you like me to commit these changes to a new branch?"
3. **Create Branch**: Generate descriptive branch name (e.g., `data/archive-buckeye-ai-event`, `data/add-new-job-posting`)
4. **Stage & Commit**: Add files and create descriptive commit message
5. **Push Branch**: Push feature branch to origin
6. **Ask for PR**: "Would you like me to create a pull request?"
7. **Optional PR**: Create PR with detailed description if requested

## Branch Naming Convention
- Data changes: `data/brief-description`
- Features: `feat/brief-description`
- Fixes: `fix/brief-description`
- Documentation: `docs/brief-description`

## Commit Message Format
```
type(scope): brief description

Longer description if needed explaining what was changed and why.

Examples:
- data: archive past Buckeye AI event
- data: add Software Engineer position at TechCorp
- feat: add new partner logo display
```

## Safety Rules
- **NEVER push directly to main branch**
- Always create feature branches for changes
- Always show user exactly what will be committed
- Always ask permission before Git operations
- Never use force push or destructive commands
- Test build before committing (npm run build)

## User Control Points
- User approves branch creation
- User approves commit message
- User decides whether to create PR
- User maintains full control over merge timing