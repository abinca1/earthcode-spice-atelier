<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Earthcode Naturals landing page: sections live in `src/components/earthcode/` (Hero, Chronicle, Showcase), composed by `src/routes/index.tsx`. Brand color tokens (`--emerald-deep`, `--emerald-glow`, `--charcoal`, `--obsidian`, `--gold`, `--gold-soft`, `--silk`) are defined in `src/styles.css`; the shared luxury spring (`stiffness: 80, damping: 20`) is exported as `LUXURY_SPRING` from `Hero.tsx`. Why: single source of truth for the brand system so edits stay consistent across sections.
