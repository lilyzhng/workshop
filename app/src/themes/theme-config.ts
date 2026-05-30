export type WorkshopThemeId =
  | "obsidian"
  | "paper"
  | "daylight"
  | "midnight"
  | "sage"
  | "computer"
  | "retro"
  | "hybrid"
  | "agent-dark"
  | "agent-light";

export const THEME_STORAGE_KEY = "workshop:theme";

export const DEFAULT_THEME: WorkshopThemeId = "obsidian";

export interface WorkshopThemeMeta {
  id: WorkshopThemeId;
  label: string;
  description: string;
  swatch: [string, string, string];
  /** Uses dot-grid body texture and/or embossed panels */
  texture?: "computer" | "retro" | "hybrid" | "agent";
}

export const WORKSHOP_THEMES: WorkshopThemeMeta[] = [
  {
    id: "obsidian",
    label: "Obsidian",
    description: "Default dark — high contrast, trace-focused.",
    swatch: ["#000000", "#5B8DEF", "#60E36D"],
  },
  {
    id: "paper",
    label: "Paper",
    description: "Warm light — cream background, amber accent.",
    swatch: ["#FAF8F5", "#C4713B", "#2D8A47"],
  },
  {
    id: "daylight",
    label: "Daylight",
    description: "Cool light — crisp white, blue accent.",
    swatch: ["#F8FAFC", "#2563EB", "#16A34A"],
  },
  {
    id: "midnight",
    label: "Midnight",
    description: "Blue-tinted dark — softer on the eyes at night.",
    swatch: ["#070B14", "#818CF8", "#4ADE80"],
  },
  {
    id: "sage",
    label: "Sage",
    description: "Green-tinted dark — calm terminal aesthetic.",
    swatch: ["#0C100E", "#34D399", "#6EE7B7"],
  },
  {
    id: "computer",
    label: "Computer",
    description: "Agent Computer — terminal retro, Tokyo Night + Gruvbox.",
    swatch: ["#181818", "#7AA2F7", "#9ECE6A"],
    texture: "computer",
  },
  {
    id: "retro",
    label: "Retro",
    description: "Periwinkle dot grid — embossed, tactile, minimal.",
    swatch: ["#A8B4D4", "#1A2744", "#2D6A4F"],
    texture: "retro",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    description: "Grey VM desktop + dark agent log — product dashboard.",
    swatch: ["#E8E8E8", "#3355FF", "#16A34A"],
    texture: "hybrid",
  },
  {
    id: "agent-dark",
    label: "Agent Dark",
    description: "Ops status — true black, mint green, monospace.",
    swatch: ["#000000", "#FFFFFF", "#6EE7A0"],
    texture: "agent",
  },
  {
    id: "agent-light",
    label: "Agent Light",
    description: "Product UI — grey desktop, Barlow + Space Mono, blue accent.",
    swatch: ["#F0F0F0", "#3355FF", "#16A34A"],
    texture: "agent",
  },
];

export function isWorkshopThemeId(value: string): value is WorkshopThemeId {
  return WORKSHOP_THEMES.some((theme) => theme.id === value);
}

export function loadStoredTheme(): WorkshopThemeId {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && isWorkshopThemeId(stored)) return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_THEME;
}

export function applyTheme(themeId: WorkshopThemeId): void {
  document.documentElement.dataset.theme = themeId;
  document.body.dataset.texture =
    WORKSHOP_THEMES.find((t) => t.id === themeId)?.texture ?? "";
}

export function themeUsesEmbossedPanels(themeId: WorkshopThemeId): boolean {
  return themeId === "retro" || themeId === "computer";
}

export function themeUsesAgentTags(themeId: WorkshopThemeId): boolean {
  return themeId === "agent-dark" || themeId === "agent-light" || themeId === "hybrid";
}

/** Full Agent Computer light design system (typography, panels, semantic colors) */
export function themeUsesAgentLightDesign(themeId: WorkshopThemeId): boolean {
  return themeId === "agent-light";
}

/** Cleaner UI: collapsed secondary panels, 3-size type scale, icon-only header actions */
export function themeUsesCompactUI(themeId: WorkshopThemeId): boolean {
  return themeId === "agent-light";
}

export function displayFontFamily(themeId: WorkshopThemeId): string {
  if (themeId === "agent-light") return '"Barlow", system-ui, sans-serif';
  if (themeId === "agent-dark") return '"Space Mono", monospace';
  return '"AlphaLyrae", sans-serif';
}

export function uiFontFamily(themeId: WorkshopThemeId): string {
  if (themeId === "agent-light" || themeId === "agent-dark" || themeId === "hybrid") {
    return '"Barlow", system-ui, sans-serif';
  }
  return "inherit";
}

export function monoFontFamily(): string {
  return '"Space Mono", monospace';
}

export function pixelFillForTheme(themeId: WorkshopThemeId): string {
  if (themeId === "retro") return "26,39,68";
  if (themeId === "agent-dark") return "110,231,160";
  if (themeId === "agent-light" || themeId === "hybrid") return "51,85,255";
  if (themeId === "computer") return "122,162,247";
  return "142,157,166";
}

export function persistTheme(themeId: WorkshopThemeId): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch {
    /* ignore */
  }
}
