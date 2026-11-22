# AGENTS.md — Entstehung des Menschen

## Role and purpose

You are working on **Learning Lab 05 — Entstehung des Menschen**, an independent static educational website. Primary purpose: curiosity-driven personal learning, experimentation, and occasional public sharing through GitHub Pages. It is **not** a commercial product, not a reusable platform, and not a production SaaS.

The lab number is an **optional learning route**, never a software dependency or required sequence. Do not assume access to any central Learning Labs runtime or Space.

## Subject scope

Homininen, Fossilien, Körpermerkmale, Werkzeugkulturen, Migrationen und genetische Verwandtschaft.

### Guiding learner questions

- Welche Homininen sind fossil belegt?
- Wie rekonstruieren wir Verwandtschaft und Wanderungen?
- Welche Erkenntnisse liefern Archäologie und Paläogenetik?
- Wo sind die Grenzen unserer Rekonstruktionen?

### Implemented interactive learning labs (V0.1)

- **01** `01_zeitleiste.html` – eight approximate fossil ranges shown on a seven-million-year timeline, relative overlap counter, clickable specimen summaries and quiz.
- **02** `02_stammbaum.html` – conceptual kinship tree, toggleable fossil/genome/admixture layers and active inference quiz. Never depict exact direct ancestry for unestablished edges.
- **03** `03_aufrechter_gang.html` – footprint/skeleton evidence and a basic abstract distance calculation (step count × model step length), NOT biomechanical simulation.
- **04** `04_werkzeuge.html` – early archaeology evidence from Lomekwi, Oldowan, Acheulean, Middle Stone Age, with symbolic drawings and chronology quiz.
- **05** `05_ausbreitung.html` – seven source-grounded archaeological/genetic sites on a deliberately symbolic map. Relationship lines do NOT establish actual migration routes.
- **06** `06_evidenz.html` – six evidence comprehension questions on primary fossil, stone tool, dating and paleogenomic studies.

The landing page contains six active cards, the modules 01–03 use `human-labs.js` and modules 04–06 use `human-labs-more.js`. All pages load `human.css` and the unchanged vendored `modern-objectivity.css`.

## Scientific responsibility

Keine lineare 'Affen-zu-Mensch'-Treppe, keine biologischen Werturteile. Unsichere Datierungen und wissenschaftlich umstrittene Zuordnungen kennzeichnen.

- Distinguish observation, evidence, hypotheses, models, estimates, and consensus.
- Cite factual scientific claims from traceable credible sources when adding content.
- Explicitly label simplifications, scale distortions, uncertain dates and model limitations.
- Never invent publications, citations, simulations, measurements, validations, or sources.
- Never present a conceptual placeholder as a functioning experiment.

## Pedagogy

- Do not assume prior school knowledge. Introduce each object before abbreviations or jargon.
- Prefer **observe → predict → interact → explain**, with useful feedback.
- Make controls meaningful, use a consistent legend, and provide explanations at increasing depth when helpful.
- Prefer clear interfaces to decorative animation. Pause and step through time-dependent processes.
- An experiment should expose a scientifically meaningful relationship, not just an effect.

## Design direction

Modern Objectivity, as documented in the provisional Apperception Machinery BrandBook:
- Quiet graphical UI stage; graphite, warm near-white, signal turquoise `#009E98`.
- Liberation Sans, Liberation Serif, Liberation Mono with fallbacks.
- Accessibility: responsive layout, keyboard operability, discernible focus, explanatory labels, reduced-motion support.
- Scientific illustration colors may differ from brand accents, but must communicate meaning and include legends.
- Avoid implying that an unfinished design guide is formally approved.

## Architecture

- Standalone static HTML/CSS/JavaScript website deployable with GitHub Pages.
- SVG, Canvas, Three.js allowed when materially helpful. Keep versioned third-party dependencies and their notices.
- No required backend, database, registration, analytics, build pipeline, or network access unless unavoidable and explained.
- No shared cross-repository runtime. Copy small design patterns when needed rather than coupling repositories.
- Keep `index.html` as entry point, `README.md` as public project description, and `LICENSE` intact.
- This repository is licensed under GNU GPL v2.0; track separately licensed content and dependencies.

## Working process

1. Inspect the current code and state of the exhibit before changing it.
2. Make focused changes aligned to the learner's question.
3. Verify internal links, JavaScript syntax, central interactions, and responsive rendering where tools permit.
4. State what was tested, what was not, and any scientific uncertainty.
5. Never claim a browser test or GitHub Pages deployment without evidence.
6. Keep docs accurate: planned exhibits are not implemented features.

## Modern Objectivity implementation

Use the **locally vendored** `modern-objectivity.css` (the v0.1 draft [practical style kit](https://philippklinz.github.io/modern-objectivity-style/), source SHA `c6af71a8688b9001313d19a642e8f308fa463280`). Preserve the vendor stylesheet as an exact copy; make stage-specific changes in the local page styles and prefer `--mo-*` semantic tokens. This is a reference style, **not a universal visual mandate**. Keep the standalone site functioning with no CDN dependencies. If upgrading the kit, compare behavior and update attribution/version notes.

## Model accuracy contracts for LAB 05

- Homo sapiens dates back to approximately 300 ka in the fossil record; the Jebel Irhoud TL result of 315 ± 34 ka is an age of associated heated flints, not an observed origin date or precision birth date.
- Omo I: datation of overlying tephra (233 ± 22 ka) establishes a **minimum** fossil age. Do not misrepresent the tephra as directly dated bone.
- Laetoli (~3.6 Ma) demonstrates ancient bipedal gait, not a specimen of Homo sapiens. Species attribution remains an inference.
- Lomekwi (~3.3 Ma) shows early lithic technology; assignment to Homo is unproven. Archaeological tool types are NOT the species of their makers.
- Fossil occurrences and age ranges do NOT establish actual extinction years. In `01_zeitleiste.html` the tiny Ardipithecus span is explicitly an illustrative placeholder around 4.4 Ma, not a measured species duration.
- `03_aufrechter_gang.html`: model distance = user step number × user step length / 100 (metres). This is not gait biomechanics, a measured trail, or a fossil-derived speed estimate.
- `05_ausbreitung.html`: all site coordinates and continent outlines are schematic. Dashed lines express only broad possible connections, **never verified paths**. DNA introgression is not an exact individual journey.
- Ancient Denisova/Neanderthal genomes support related population histories and introgression; they do not yield a complete genotyped genealogy of all extinct hominins.
- Do not use claims of cultural or biological superiority in population comparisons.

## UI and QA requirements

- New pages and edits must pass `tests/layout-check.mjs` (7 pages × 12 widths) and `tests/interactions-check.mjs` (all six interactive modules). CI: `.github/workflows/lab-05-checks.yml`.
- Preserve page gutters in `.ho-wrap`; never reset them with `padding:… 0` on combined wrapper and section classes. Fix overflow at its cause, not via global clipping.
- No content or account API calls. No analytics, cookies, localStorage, unreviewed external runtime scripts, or cross-repository dependencies.
- Do not claim visual Chromium/CI success until confirmed. Do not confuse technical correctness with independent anthropological verification.
