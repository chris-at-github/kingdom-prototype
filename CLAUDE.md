# Project Guidelines

## Projektziel
- Ziel dieses Projektes ist es, Wissen als Full-Stack-Entwickler in verschiedenen Bereichen aufzubauen.
- Das Projekt soll in kleine, verständliche Arbeitspakete aufgeteilt werden.
- Führe keine weiteren Schritte aus, die nicht meinen Anforderungen entsprechen.
- Weise mich auf Fehler in meinen Anforderungen hin.
- Weise mich auf Verbesserungen hin.
- Erkläre bei neuen Konzepten, Bibliotheken oder Patterns kurz das Warum und die Alternative, die du verworfen hast.
- Halte wiederkehrende Befehle und Erkenntnisse als Kurzanleitung in `docs/guides/` fest (Aufbau siehe `docs/guides/README.md`).

## Stack
- Sprache/Runtime: TBD
- Framework(s): TBD
- Datenbank: TBD
- Testing: TBD (wird erst im späteren Projektverlauf ergänzt)
- Linting/Formatting: TBD (wird erst im späteren Projektverlauf ergänzt)
- Code-Sprache (Bezeichner, Kommentare): TBD

## Befehle
- Install: TBD
- Dev-Server: TBD
- Build: TBD
- Test: TBD
- Lint: TBD

## Struktur
- `docs/guides/` — Kurzanleitungen auf Deutsch, Index in `docs/guides/README.md`.
- `docs/plans/` — Spezifikationsdokumente auf Englisch, abgeschlossene unter `docs/plans/archive/`.
- Code-Verzeichnisse: TBD — wird ergänzt, sobald sie entstehen.

## Anforderungsanalyse

1. **Detailfragen erzwingen (Phase 1)**
    - Starte bei neuen Anforderungen NIEMALS direkt mit der Code-Implementierung.
    - Stelle zuerst gezielte Fragen zu Details, Edge Cases, Schnittstellen und Akzeptanzkriterien.
    - Stelle alle Fragen gebündelt in einer Runde. Die Anzahl richtet sich nach der Anforderung — keine feste Obergrenze, aber auch keine Fragen, die die Anforderung schon beantwortet.
    - Die Akzeptanzkriterien (Definition of Done) gebe ich in dieser Phase vor.
    - Ausnahme: Bei trivialen Änderungen (Tippfehler, Rename, Formatierung, offensichtliche Ein-Zeilen-Korrekturen) darf ohne Fragerunde und ohne Plandokument direkt umgesetzt werden.
    - Die Fragen werden auf Deutsch gestellt.

2. **Planerstellung in `docs/plans/` (Phase 2)**
    - Erstelle nach Klärung aller Fragen ein Spezifikationsdokument unter `docs/plans/<feature-name>.md`.
    - Das Dokument wird **vollständig auf Englisch** geschrieben (inklusive Überschriften und Fließtext).
    - Die Datei muss wie folgt aufgebaut sein:
        - **Context & Goal**: Kurze Beschreibung der Anforderung.
        - **Non-Goals**: Was ausdrücklich nicht Teil der Anforderung ist.
        - **Acceptance Criteria**: Überprüfbare Kriterien, die ich in Phase 1 vorgegeben habe.
        - **Open Decisions**: Offene Punkte und getroffene Entscheidungen mit Begründung.
        - **Checklist**: Feingranulare Arbeitsschritte (`- [ ] Task`).

3. **Inkrementeller Abbau (Phase 3)**
    - Arbeite die Checkliste Schritt für Schritt ab.
    - Aktualisiere nach jedem Teilschritt die Datei in `docs/plans/` (Status auf `- [x]` setzen).
    - Verschiebe das Dokument nach Abschluss des Features nach `docs/plans/archive/`.

## GIT
- Füge Dateien eigenständig hinzu, die für das Projekt sinnvoll sind.
- Füge keine temporären Dateien hinzu.
- Niemals committen: `.idea/`, `node_modules/`, `.env*`, Build-Artefakte und andere generierte Dateien. Diese gehören in die `.gitignore`.
- Erstelle für jedes Feature einen eigenen Branch nach dem Schema `feature/<feature-name>`.
- Commite eigenständig einzelne Abschnitte aus Plänen.
- Commit-Messages auf **Englisch** im Conventional-Commits-Format (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
- Führe **kein** Push durch.
- Schreibe die Branch-History nicht um (kein Rebase, kein Squash auf dem Feature-Branch) — die Einzelcommits sind der Arbeitsnachweis.
- Merge **nicht** nach `main` — den Merge führe ich selbst durch, per Squash (`git merge --squash`), sodass pro Feature ein Commit auf `main` landet.
