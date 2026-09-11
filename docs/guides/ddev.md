# DDEV

## Umgebung starten und Dev-Server aufrufen

**Problem:** Die React-Anwendung soll im Container laufen und im Browser des
Hosts erreichbar sein.

**Vorgehen:**

```bash
ddev start                 # Container starten
ddev exec npm install      # Abhängigkeiten installieren (einmalig bzw. nach Änderungen)
ddev exec npm run dev      # Vite-Dev-Server im Vordergrund starten
```

Danach im Browser: <https://kingdom-prototype.ddev.site:5173>

**Hinweise:**

- Der Dev-Server läuft im Vordergrund. Beenden mit `Strg+C`.
- `ddev stop` hält die Container an, `ddev poweroff` alle Projekte auf einmal.
- Antwortet die URL mit **502**, läuft der Dev-Server nicht — der Router ist da,
  aber niemand lauscht auf Port 5173 im Container.

## Befehle im Container ausführen

**Problem:** `ddev npm install` bricht mit
`Could not read package.json: /var/www/html/package.json` ab.

**Vorgehen:** Entweder `ddev exec` nutzen oder vorher in den App-Ordner wechseln:

```bash
ddev exec npm install      # nutzt working_dir aus .ddev/config.yaml -> /var/www/html/frontend
cd frontend && ddev npm install   # nutzt das aktuelle Host-Verzeichnis
```

**Hinweise:**

- `ddev exec` führt den Befehl im konfigurierten `working_dir` des Web-Containers
  aus — unabhängig davon, wo du auf dem Host stehst.
- `ddev npm` (und `ddev composer`) bilden dagegen das **aktuelle Host-Verzeichnis**
  in den Container ab. Im Projekt-Root landen sie deshalb in `/var/www/html`, wo
  keine `package.json` liegt.
- Node läuft ausschließlich im Container. Host-Node wird nicht gebraucht und kann
  eine andere Version haben.

## Vite-Dev-Server hinter dem DDEV-Router

**Problem:** Ein Dev-Server im Container ist von außen nicht erreichbar, und HMR
bricht ab, obwohl die Seite lädt.

**Vorgehen:** Port am Router anmelden (`.ddev/config.yaml`):

```yaml
web_extra_exposed_ports:
    - name: vite
      container_port: 5173
      http_port: 5172
      https_port: 5173
```

und Vite passend konfigurieren (`frontend/vite.config.ts`):

```ts
server: {
  host: '0.0.0.0',
  port: 5173,
  strictPort: true,
  allowedHosts: ['.ddev.site'],
  origin: 'https://kingdom-prototype.ddev.site:5173',
  hmr: { protocol: 'wss', host: 'kingdom-prototype.ddev.site', clientPort: 5173 },
}
```

**Hinweise:**

- `host: '0.0.0.0'` ist zwingend. Mit dem Standard `localhost` lauscht Vite nur
  auf dem Loopback-Interface **im Container** — der Router käme nicht durch.
- `strictPort: true` verhindert, dass Vite bei belegtem Port stillschweigend auf
  5174 ausweicht; der Router kennt nur 5173 und lieferte dann 502.
- Der `hmr`-Block ist der eigentliche Knackpunkt: Die Seite wird über HTTPS
  ausgeliefert, also muss auch der HMR-Socket über `wss` laufen. Ohne die Angabe
  rät der Client auf `ws://` und der Browser blockiert die Verbindung als
  Mixed Content — die Seite lädt, aber Änderungen kommen nie an.
- `allowedHosts` ist nötig, weil Vite seit den Sicherheitsupdates 5.4.12/6.0.9
  Anfragen mit fremdem `Host`-Header abweist (Schutz vor DNS-Rebinding). Ohne den
  Eintrag antwortet der Server mit `Blocked request. This host is not allowed`.

**Prüfen ohne Browser:**

```bash
curl -sk -i --http1.1 -H "Connection: Upgrade" -H "Upgrade: websocket" \
  -H "Sec-WebSocket-Version: 13" -H "Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==" \
  -H "Sec-WebSocket-Protocol: vite-hmr" https://kingdom-prototype.ddev.site:5173/
```

Antwortet der Server mit `101 Switching Protocols` und `{"type":"connected"}`,
steht der HMR-Kanal. `--http1.1` ist wichtig: Über HTTP/2 ignoriert der Router
den Upgrade-Header und antwortet mit einer normalen 200.

## Produktions-Build erzeugen

**Problem:** Prüfen, ob die Anwendung auch gebaut fehlerfrei durchläuft.

**Vorgehen:**

```bash
ddev exec npm run build
```

**Hinweise:**

- Das Skript führt erst `tsc -b` aus, dann `vite build`. Typfehler brechen den
  Build ab, auch wenn der Dev-Server sie nur als Warnung zeigt.
- Ergebnis liegt in `frontend/dist/` und ist von Git ausgenommen.
- `ddev exec npm run preview` serviert den Build — dafür müsste der
  Preview-Port (4173) zusätzlich exponiert werden.
