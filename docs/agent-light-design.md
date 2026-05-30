# Agent Light Design Language — Handoff Summary

**Theme ID:** `agent-light` (stored in `localStorage` key `workshop:theme`)

---

## What this is

Agent Light is a design system for the Raindrop Workshop trace viewer, modeled on the **Agent Computer product UI** (light marketing/docs surface — not the dark terminal/ops page). The goal is a clean, product-like inspector: grey desktop, white cards, electric blue accent, monospace logs, minimal visual noise.

**Do not conflate with:**

- **Computer** theme — dark Tokyo Night terminal aesthetic
- **Agent Dark** — true-black ops/status page with mint green
- **Hybrid** — grey shell + dark trace pane (different layout model)

Only **Agent Light** gets the full design system + compact UI.

---

## Visual identity

### Canvas & surfaces

| Role | Value |
|------|-------|
| Desktop background | `#F0F0F0` (warm neutral grey) |
| Panel / card surface | `#FFFFFF` |
| Elevated / inset areas | `#FAFAFA` |
| Panel radius | `12px` |
| Control radius | `8px` |
| Tag/chip radius | `4px` |
| Panel shadow | `0 2px 12px rgba(0,0,0,0.06)` |
| Borders | `1px solid rgba(0,0,0,0.08)` — no blur, no glass |

Layout pattern: **grey desktop with white floating windows**. The main trace view (`.run-trace-pane`) is a white card inset with margin, border, and soft shadow.

### Accent & semantics

| Token | Value | Use |
|-------|-------|-----|
| `--w-accent` | `#3355FF` | Links, selection, hover states, tool spans |
| `--w-span-tool` | `#3355FF` | Tool call color in timeline |
| `--w-span-llm` | `#6366F1` | LLM span color |
| `--w-user` | `#EEF2FF` | User message bubble background |
| Green / red / orange | `#16A34A` / `#DC2626` / `#EA580C` | Status, syntax highlights |

### Ink hierarchy (light → dark)

```
--w-fg0: #999   metadata, timestamps, collapsed summaries
--w-fg1: #666   secondary labels
--w-fg2: #444   body secondary
--w-fg3: #222   primary body text
--w-fg4: #1A1A1A  titles, active tabs
--w-fg5: #0A0A0A  strongest emphasis
```

---

## Typography

**Two fonts only** (loaded from Google Fonts in `app/index.html`):

| Font | Role |
|------|------|
| **Barlow** (400–700) | UI chrome — sidebar, headers, tabs, buttons, FAB |
| **Space Mono** (400, 700) | Logs, tool pills, trace content, metadata chips, collapsible labels |

**Not used on Agent Light:** AlphaLyrae (the display font for other themes).

### Type scale — 3 sizes only

Enforced in `.run-trace-pane` and `.agent-run-header`:

| Token | Size | Use |
|-------|------|-----|
| `--w-text-xs` | 11px | Metadata, collapsible labels, compact header meta |
| `--w-text-sm` | 12px | Default body, tool pills, trace content |
| `--w-text-md` | 14px | Run title (h2) |

CSS flattens scattered Tailwind sizes (`text-[9px]`–`text-[13px]`) down to these three inside the trace pane.

Trace content (agent output, markdown) renders in **Space Mono 12px**, line-height 1.6, color `--w-fg3`.

---

## Component patterns

### Run header (`.agent-run-header`)

- Title + green/grey status dot
- **Compact mode:** inline meta `{N tools · Ns}` + **details** toggle
- Stats row, model badge, convo/trace badges hidden until **details** is opened
- Action buttons are **icon-only** (text labels hidden via `.agent-action-label { display: none }`)

### Tabs

Active tab: dark text + **2px bottom border** (`.agent-tab-active`), not pill-style.

### Tool pills (`.agent-tool-pill`)

Monospace log-row style: `#FAFAFA` background, 1px border, 8px radius, 11px type. Shows tool name + truncated args + duration.

### Trajectory timeline (`.flame-timeline-wrap`)

Light inset card on elevated background. In compact mode, collapsed behind a **trajectory** row.

### User messages

Light periwinkle bubble (`--w-user: #EEF2FF`), sans-serif.

### Ask Claude FAB (`[data-ask-fab]`)

White card with border and shadow — **not** dark glass. Hover turns accent blue.

### Action tags (OBSERVE / ACT / WAIT)

Pastel pills defined in `agent-theme.css`:

| Tag | Background | Text |
|-----|------------|------|
| OBSERVE | `#DBEAFE` | `#1D4ED8` |
| ACT | `#DCFCE7` | `#15803D` |
| WAIT | `#FFEDD5` | `#C2410C` |

**Hidden in compact mode** (see below).

### Collapsible sections (`.collapsible-section-*`)

Lowercase monospace labels, summary text right-aligned when collapsed. Used for trajectory, system prompt, and message blocks.

---

## Compact UI (`themeUsesCompactUI`)

Agent Light defaults to a **clean, collapsed** trace view. Secondary chrome is click-to-expand.

| Element | Default | Expand via |
|---------|---------|------------|
| Trajectory timeline | Collapsed | `trajectory · N spans · Xs` row |
| System prompt | Collapsed | `system` block with one-line preview |
| Run stats / badges | Hidden | **details** button in header |
| OBSERVE / ACT / WAIT tags | Hidden | — (removed for cleanliness) |
| Markdown/Raw toggle | Hidden | — |
| Header action labels | Hidden | Icons only |

Implemented in:

- `theme-config.ts` → `themeUsesCompactUI()` returns `true` only for `agent-light`
- `RunDetail.tsx` → compact header + details toggle
- `ChatFlow.tsx` → collapsible trajectory/system; tag/toggle suppression
- `ToolCallPill.tsx`, `SpanTree.tsx` → tags hidden when compact
- `MessageList.tsx` → system/user messages collapsed by default in compact mode
- `CollapsibleSection.tsx` → reusable expand/collapse primitive

---

## Implementation map

### CSS layers (load order in `main.tsx`)

1. `themes/themes.css` — base token structure shared across themes
2. `themes/agent-theme.css` — Agent Light + Agent Dark color tokens, overlays, sidebar vars, tag colors
3. `themes/agent-light-design.css` — **Agent Light-specific** typography, panels, compact rules, component classes
4. `index.css` — global utilities, `.agent-action-tag`, scrollbars, streamdown overrides

Theme is applied via `document.documentElement.dataset.theme = "agent-light"`.

### React helpers (`theme-config.ts`)

```ts
themeUsesAgentLightDesign(theme)  // true only for agent-light
themeUsesCompactUI(theme)         // true only for agent-light
displayFontFamily(theme)          // Barlow for agent-light
monoFontFamily()                  // Space Mono
```

### Color access in components

All components use semantic tokens from `utils/colors.ts`:

```ts
C.fg0 … C.fg5, C.border, C.accent, C.spanTool, C.spanLlm, …
```

Values resolve to CSS variables — no hardcoded `#fff` / `rgba(255,255,255,…)` in Agent Light paths.

### Key CSS classes

| Class | Purpose |
|-------|---------|
| `.run-trace-pane` | White inset card wrapping the trace |
| `.agent-run-header` | Compact header zone |
| `.agent-panel` | Generic white panel |
| `.agent-tool-pill` | Tool call row |
| `.agent-tab-active` | Active tab underline |
| `.agent-meta-chip` | Uppercase metadata chip |
| `.collapsible-section-*` | Expand/collapse UI |
| `.agent-action-tag--{observe,act,wait}` | Span action pills |

---

## Design principles

1. **Product UI, not terminal** — light grey desktop, white cards, no dot grid, no emboss
2. **Two fonts, three sizes** — resist adding more; flatten existing Tailwind sprawl
3. **Progressive disclosure** — show title + conversation flow first; stats, timeline, system prompt on demand
4. **Monospace for machine output** — agent text, tools, logs in Space Mono; human UI chrome in Barlow
5. **Electric blue as the only strong accent** — `#3355FF` for interactive/semantic emphasis
6. **No dark-theme assumptions** — hover states use black overlays (`--w-a04` … `--w-a08`), not white overlays

---

## How to preview

```bash
bun run dev
```

Settings → Appearance → **Agent Light** → load demo traces → open any run (e.g. `demo_triage`).
