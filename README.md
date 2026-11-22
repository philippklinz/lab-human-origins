# Die Entstehung des Menschen — Learning Lab 05

> Unsere Geschichte hat viele Äste.

**Stand:** Sechs unabhängige, interaktive Unterlabore, Version 0.1. Einstieg: [GitHub Pages](https://philippklinz.github.io/lab-human-origins/).

Das Labor ist eine Lernumgebung für die biologische und archäologische Vorgeschichte des Menschen. Es vermittelt nicht die angebliche lineare Entwicklung „vom Affen zum Menschen“, sondern fossil und genetisch rekonstruierbare, zeitweise nebeneinander existierende Homininenlinien.

## Sechs Lernmodule

| Modul | Interaktive Aufgabe | Wissenschaftliche Grenze |
|---|---|---|
| [01 · Zeitleiste & Arten](01_zeitleiste.html) | Acht beispielhafte fossile Taxa in 7 Millionen Jahren; Schieberegler für den Zeitpunkt, ausgewählte Art und zeitliche Überlappungen; Quiz | Fossilintervalle und taxonomische Zuordnung sind unsicher und nicht mit exakten Existenzperioden gleichzusetzen |
| [02 · Stammbaum & Verwandtschaft](02_stammbaum.html) | Konzeptioneller Stammbaum, Evidenzlayer Fossilien, Genome und Genfluss, aktive Verwandtschaftsfrage | Kein vollständiger phylogenomischer Baum; keine gesicherte direkte Abstammungsfolge aller Taxa |
| [03 · Aufrechter Gang](03_aufrechter_gang.html) | Laetoli-Fußspuren, Lucy und H. erectus vergleichen; Schrittzahl und Schrittlänge als Rechenmodell | Keine biomechanische Rekonstruktion der echten Fossilien; Schrittlängen sind frei gewählt |
| [04 · Werkzeuge & Kultur](04_werkzeuge.html) | Lomekwi, Oldowan, Acheuléen und frühe Middle-Stone-Age-Kontexte; symbolische Artefaktgrafiken; Wissenstest | Keine Rekonstruktion echter Artefakte, keine eindeutige Artzuordnung zu Werkzeugen |
| [05 · Ausbreitung & Genetik](05_ausbreitung.html) | Sieben Fundstellen, ausgewählte Lagebeziehungen und separate Genflusshinweise; Wissenstest | Schematische Karte ohne geografischen Maßstab, hypothetische Beziehungen statt nachgewiesener Einzelrouten |
| [06 · Evidenzlabor](06_evidenz.html) | Sechs Befunde mit jeweils drei Antwortmöglichkeiten, Quellen und erläuterndem Feedback | Quellen- und Begriffsübung, keine direkte Durchführung der Untersuchungen |

**Keine technische Kopplung** an Evolution, Molekularbiologie oder den Anthropology Atlas. Der Atlas behandelt historisch belegte Menschen und Ereignisse; LAB 05 die tiefe Vor- und Frühgeschichte aus Fossilien, Archäologie und Genetik.

## Methodik

- **Fund:** Fossil, Fußspur, Artefakt oder alte DNA sind erhaltene Belege.
- **Datierung:** Ein Fossil kann anhand einer überlagernden Schicht ein **Mindestalter** erhalten, statt direkt datiert zu sein (Omo I).
- **Interpretation:** Die Zuordnung zu einer Art, einer Funktion oder einer Abstammungslinie wird aus Befunden erschlossen.
- **Unsicherheit:** Fossilien sind lückenhaft; Verbreitungs- und Aussterbedaten sind Mindestintervalle der bekannten Funde, keine exakten biologischen Grenzen.
- **Keine Rangordnung:** Werkzeugherstellung, Gehirnform, Körpergröße, Gangart oder kulturelle Innovationen begründen keine biologische Höherwertigkeit.

## Wissenschaftliche Referenzen

- [Smithsonian Institution – Introduction to Human Evolution](https://humanorigins.si.edu/education/introduction-human-evolution)
- [ASU Institute of Human Origins – Timeline](https://iho.asu.edu/accessible-timeline)
- [Smithsonian – Laetoli Footprints](https://humanorigins.si.edu/evidence/behavior/footprints/laetoli-footprint-trails)
- [Harmand et al., 2015 – 3.3 Ma stone tools from Lomekwi 3](https://www.nature.com/articles/nature14464)
- [Richter et al., 2017 – Dating Jebel Irhoud](https://www.nature.com/articles/nature22335)
- [Hublin et al., 2017 – Jebel Irhoud fossils](https://www.nature.com/articles/nature22336)
- [Vidal et al., 2022 – Minimum age of Omo I](https://www.nature.com/articles/s41586-021-04275-8)
- [Zhu et al., 2018 – Hominins on the Chinese Loess Plateau](https://www.nature.com/articles/s41586-018-0299-4)
- [Groucutt et al., 2018 – Homo sapiens in Arabia](https://www.nature.com/articles/s41559-018-0518-2)
- [Reich et al., 2010 – Ancient Denisovan genome](https://www.nature.com/articles/nature09710)

Jedes Unterlabor enthält spezifische Quellenangaben und erklärt, welche Zahlen nur **illustrative Modellwerte** sind.

## Design, Technik und Tests

- Statische HTML-, CSS-, JavaScript- und eigene SVG-Dateien ohne Backend, Tracking, Login, Laufzeit-CDNs oder fremde Bilder.
- [Modern Objectivity](https://philippklinz.github.io/modern-objectivity-style/): `modern-objectivity.css` ist eine unveränderte lokale Kopie des Style Kits; `human.css` erweitert es responsiv.
- `human-labs.js` implementiert Module 01–03; `human-labs-more.js` Module 04–06.
- `tests/layout-check.mjs` prüft sieben Seiten bei zwölf Fenstergrößen (320–1600 px) in Chromium.
- `tests/interactions-check.mjs` prüft alle sechs Experimente, Modellgrenzen und Antworten in Chromium.
- Workflow [Human Origins laboratory checks](https://github.com/philippklinz/lab-human-origins/actions/workflows/lab-05-checks.yml).
- Tests prüfen Darstellung und Funktion, **nicht** die fachliche Vollständigkeit der Forschungsquellen. Eine zusätzliche wissenschaftliche Fachreview bleibt sinnvoll.

## Lizenz

Eigene Projektdateien: [GNU GPL v2.0 only](LICENSE). Wissenschaftliche Facharbeiten werden verlinkt, nicht als kopierte Volltexte eingebunden.

[AGENTS.md](AGENTS.md) legt verbindliche wissenschaftliche und technische Entwicklungsregeln fest.
