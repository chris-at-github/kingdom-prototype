# shadcn/ui

## Komponente hinzufügen

**Problem:** Eine weitere UI-Komponente wird gebraucht.

**Vorgehen:**

```bash
ddev exec "npx --yes shadcn@latest add dialog"     # Name der Komponente
ddev exec "npx --yes shadcn@latest add"            # ohne Namen: Liste zur Auswahl
```

**Hinweise:**

- shadcn/ui ist **keine Abhängigkeit**, sondern ein Generator: Der Befehl kopiert
  Quellcode nach `frontend/src/components/ui/`. Diese Dateien gehören dem Projekt
  und dürfen bearbeitet werden — ein Update überschreibt sie allerdings wieder.
- Benötigte Pakete (etwa Teile von Base UI) installiert der Befehl automatisch mit.
- Importiert wird über den Alias: `import { Button } from '@/components/ui/button'`.

## Eigenes Theme einsetzen

**Problem:** Die von shadcn erzeugten Standardfarben sollen durch ein eigenes
Theme ersetzt werden.

**Vorgehen:** In `frontend/src/index.css` den `:root`-Block durch die eigenen
Variablen ersetzen. Die Datei ist in drei Teile gegliedert:

```css
@theme inline { ... }   /* Brücke: verbindet die Variablen mit Tailwind-Klassen */
:root { ... }           /* Light-Werte — hier gehört das eigene Theme hinein */
.dark { ... }           /* Dark-Werte — greifen nur, wenn <html> die Klasse .dark trägt */
```

**Hinweise:**

- Den `@theme inline`-Block nicht anfassen. Er sorgt dafür, dass aus
  `--primary` die Tailwind-Klasse `bg-primary` wird. Fehlt dort ein Eintrag,
  existiert die passende Klasse nicht.
- Die Komponenten verwenden ausschließlich diese semantischen Namen
  (`--primary`, `--muted`, `--border`, …). Deshalb wirkt ein Theme-Wechsel sofort
  auf alle Komponenten, ohne dass Komponentendateien angefasst werden.
- Der `.dark`-Block bleibt wirkungslos, solange kein Umschalter die Klasse setzt.
  Er darf stehen bleiben und ist die Grundlage, falls Dark Mode später dazukommt.

## Pfad-Alias `@/`

**Problem:** `import ... from '@/components/ui/button'` wird nicht gefunden, oder
die IDE meckert, obwohl der Build läuft (oder umgekehrt).

**Vorgehen:** Der Alias muss an **zwei** Stellen stehen:

```jsonc
// frontend/tsconfig.json und tsconfig.app.json — für die Typprüfung
"paths": { "@/*": ["./src/*"] }
```

```ts
// frontend/vite.config.ts — für das tatsächliche Auflösen beim Bauen
resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } }
```

**Hinweise:**

- TypeScript löst Importe nur für die Typprüfung auf, Vite für das Bündeln.
  Stimmen beide nicht überein, läuft genau eines von beidem.
- Die shadcn-Dokumentation zeigt zusätzlich `baseUrl`. Mit TypeScript 6 bricht
  der Build damit ab (`TS5101: Option 'baseUrl' is deprecated`) — seitdem werden
  `paths` relativ zur tsconfig aufgelöst und `baseUrl` entfällt ersatzlos.
- `import.meta.dirname` statt `__dirname`: Der künftige Vite-Config-Loader
  unterstützt `__dirname` nicht mehr und warnt bereits heute.

## Welche Variante hier eingerichtet ist

`frontend/components.json` hält die Entscheidungen fest:

- **Base UI** als Primitiv-Bibliothek (`@base-ui/react`), seit Juli 2026 der
  shadcn-Standard. Radix bleibt unterstützt; ein Wechsel liefe über
  `npx shadcn@latest init --force -b radix` und das erneute Hinzufügen aller
  bereits kopierten Komponenten.
- **Preset `base-nova`** — Lucide als Icon-Set, Geist als Schrift.
- **CSS-Variablen** statt fester Farbwerte, damit eigene Themes greifen.

## MCP-Server für die Registry

**Problem:** Claude Code soll die shadcn-Registry direkt abfragen können, statt
sich auf (schnell veraltendes) Trainingswissen zu verlassen.

**Vorgehen:** Der Server ist projektbezogen in `.mcp.json` eingetragen und läuft
im DDEV-Container:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "docker",
      "args": ["exec", "-i", "-w", "/var/www/html/frontend",
               "ddev-kingdom-prototype-web", "npx", "--no", "shadcn", "mcp"]
    }
  }
}
```

**Hinweise:**

- `ddev exec` funktioniert hier **nicht**: Es reicht stdin nicht an den Container
  durch, und genau darüber läuft die Kommunikation eines MCP-Servers. Prüfen lässt
  sich das mit `echo test | ddev exec --raw -- cat` (keine Ausgabe) gegenüber
  `echo test | docker exec -i ddev-kingdom-prototype-web cat` (Ausgabe).
- `npx --no shadcn` nutzt die im Projekt installierte CLI statt bei jedem Start
  eine Version herunterzuladen. Der Aufruf schlägt bewusst fehl, falls das Paket
  fehlt, statt still eine fremde Version zu ziehen.
- Der Container muss laufen. Ohne `ddev start` scheitert der Server beim
  Sitzungsstart.
- Der Server **installiert nichts selbst**: Sein Werkzeug `get_add_command_for_items`
  liefert nur den passenden `add`-Befehl, der anschließend wie gewohnt über
  `ddev exec` läuft. Damit bleibt Node ausschließlich im Container.
- Projektbezogen statt global, weil der Aufruf den Containernamen dieses Projekts
  enthält und in anderen Projekten nur Startzeit und Kontext kosten würde.
