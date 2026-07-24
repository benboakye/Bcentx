# Bcentx Git Workflow Summary

## Branch Strategy

```text
main                 # V1 freeze remains until V2 is ready to replace production
develop              # Integration branch for V2
feature/*            # Feature work (e.g. feature/project-setup)
fix/*                # Bug fixes
docs/*               # Documentation-only changes
```

Do not commit experimental AI changes directly to `main`.

## Tags

- `v1-static-freeze` — immutable snapshot of the V1 static site before V2 rebuild

## Commit Style

```text
type: short description
```

Types: `chore`, `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `security`, `seo`, `content`

## Session Rules

Before coding:

1. Read `docs/ai-context/README.md`
2. Read `docs/build-log/BUILD_LOG.md`
3. Read `docs/build-log/DECISIONS.md`
4. Confirm branch and task scope

After meaningful work:

1. Update build log
2. Update decision log if needed
3. Commit with a clear message
4. Prefer small, reviewable PRs into `develop`

## V1 Preservation

V1 lives in `legacy/v1-static-site/` on V2 branches. Do not delete without owner approval.
