# kingdom-prototype

Lernprojekt zum Aufbau von Full-Stack-Wissen. Die Arbeit ist bewusst in kleine,
nachvollziehbare Arbeitspakete geschnitten — der Weg ist hier genauso Ergebnis
wie der Code.

## Status

Frühe Phase: Der Technologie-Stack steht noch nicht fest, es existiert bislang
nur die Projekt- und Dokumentationsstruktur.

## Struktur

| Pfad | Inhalt |
| --- | --- |
| [`docs/guides/`](docs/guides/README.md) | Kurzanleitungen zum Nachschlagen (deutsch) |
| `docs/plans/` | Spezifikationsdokumente je Feature (englisch) |
| `docs/plans/archive/` | Abgeschlossene Spezifikationen |
| [`CLAUDE.md`](CLAUDE.md) | Arbeitsregeln für die Entwicklung mit Claude Code |

## Kurzanleitungen

Wiederkehrende Befehle und Erkenntnisse werden in
[`docs/guides/README.md`](docs/guides/README.md) gesammelt — aktuell unter
anderem der Squash-Merge-Ablauf und die verwendeten Commit-Typen.

## Arbeitsweise

1. **Klären** — offene Fragen zur Anforderung werden vorab beantwortet.
2. **Planen** — Spezifikation mit Checkliste unter `docs/plans/<feature>.md`.
3. **Umsetzen** — Checkliste Schritt für Schritt auf einem `feature/`-Branch,
   Merge nach `main` per Squash.

Details dazu in [`CLAUDE.md`](CLAUDE.md).
