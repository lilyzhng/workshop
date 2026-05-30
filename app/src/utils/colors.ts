/** Semantic color tokens — values come from CSS variables in themes/themes.css */
export const C = {
  bg: "var(--w-bg)",
  surface: "var(--w-surface)",
  elevated: "var(--w-elevated)",
  border: "var(--w-border)",
  borderLight: "var(--w-border-light)",

  fg0: "var(--w-fg0)",
  fg1: "var(--w-fg1)",
  fg2: "var(--w-fg2)",
  fg3: "var(--w-fg3)",
  fg4: "var(--w-fg4)",
  fg5: "var(--w-fg5)",

  accent: "var(--w-accent)",
  green: "var(--w-green)",
  red: "var(--w-red)",
  purple: "var(--w-purple)",
  orange: "var(--w-orange)",
  cyan: "var(--w-cyan)",
  user: "var(--w-user)",

  spanTool: "var(--w-span-tool, #b08c5a)",
  spanLlm: "var(--w-span-llm, #5a8ab0)",
  timelineLlmBar: "var(--w-timeline-llm-bar, rgba(255,255,255,0.38))",
  timelineLlmLabel: "var(--w-timeline-llm-label, rgba(255,255,255,0.55))",
  timelineBarLabel: "var(--w-timeline-bar-label, #ffffff)",

  selected: "var(--w-selected)",
  selectedBorder: "var(--w-selected-border)",
} as const;

const SPAN_COLORS = [
  "#60E36D", "#F0AD4E", "#A57CF5", "#4FCAE3",
  "#5B8DEF", "#94A3B8", "#F5CE4E", "#45B5AA",
  "#7C8CF5", "#8BC34A", "#B08968", "#6DB3F2",
];

export function spanColor(name: string, map: Map<string, string>): string {
  if (!map.has(name)) {
    map.set(name, SPAN_COLORS[map.size % SPAN_COLORS.length]);
  }
  return map.get(name)!;
}
