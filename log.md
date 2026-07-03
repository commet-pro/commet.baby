---
title: Wiki Log
---

# Wiki Log

- [2026-06-24 18:15:05] INIT vault_path="." categories=concepts,entities,skills,references,synthesis,journal
- [2026-06-25] DESIGN_SYSTEM imported Commet Baby DS into apps/web (tokens, 9 components, Nunito, brand assets, /design-system showcase); mirrored to brain: [[Design_System]], [[Design_Tokens]], [[UI_Components]]. Also fixed pnpm-workspace.yaml UTF-16->UTF-8 and installed pnpm 10.12.1.
- [2026-06-25] WORKFLOW added Issue Sync convention to CONTRIBUTING + PR template; mirrored to brain: [[Fluxo_de_Trabalho]]. Commented DS unblock on issues #9/#11/#12/#15/#16/#17/#19.
- [2026-06-25] FRONTEND auth pages (#9, PR #40), landing (#12, PR #41) and baby profiles (#11, PR #42) merged to develop; added API client + Zustand auth store. Sprint 1 front complete.
- [2026-06-25] BRAIN_SYNC documented frontend state in [[Frontend_Web]] (routes, integration layer, stub-readiness, backend dependency); indexed and logged.
- [2026-06-25] BRAIN_CONFORM brought the wiki into schema conformance: full frontmatter (category/summary/sources/created/updated) on the 5 notes, index.md with per-page summaries, created .manifest.json + vault-root AGENTS.md (owner conventions), and de-duplicated .agents/AGENTS.md (269->141 lines).
- [2026-06-25] BRAIN_CONFORM2 conformed Passo_0 frontmatter (+ fixed title encoding), removed the duplicate nested vault 'Commet Baby/', added root CLAUDE.md (Claude Code forcer) and a README brain/standards section.
- [2026-06-25] AGENT_CONFIGS added Google Antigravity support (root GEMINI.md + .agents/rules/commet-baby.md) and frontmatter on all docs/\*.md. Every agent tool is now steered to the standards: Codex/Cursor -> AGENTS.md, Claude Code -> CLAUDE.md, Antigravity/Gemini -> GEMINI.md + .agents/rules/.
- [2026-06-25] LINT issues_found=0 orphans=0 broken_links=0 stale=0 contradictions=0 missing_frontmatter=0 missing_summary=0 index_issues=0. Brain healthy; apps/api/README orphan linked in PR #45; fixed cosmetic [[wikilinks]] token in AGENTS.md.
- [2026-06-26] FRONTEND Sprint 2 start: content Home/catalog with filters (#15) on app shell (main)/layout, contentApi + frontend-only mock layer (lib/mock, NEXT_PUBLIC_API_MOCK), /story/[slug] detail stub (player pending #16/#17). Mirrored to brain: [[Frontend_Web]].
