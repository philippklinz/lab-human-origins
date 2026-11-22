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

### Candidate interactive exhibits — not yet implemented

- Zeitleiste mit Fossilien, Datierungen und Fundorten
- Vergleich von anatomischen Merkmalen und Werkzeugen
- Karte verschiedener Migrationshypothesen mit Unsicherheiten

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
