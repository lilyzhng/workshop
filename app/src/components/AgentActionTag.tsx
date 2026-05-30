import type { Span } from "../utils/types";

export type AgentAction = "observe" | "act" | "wait";

export function spanToAgentAction(span: Span): AgentAction | null {
  if (span.span_type === "TOOL_CALL") {
    if (span.status === "UNSET" && !span.end_time_ms) return "wait";
    return "act";
  }
  if (span.span_type?.includes("LLM")) return "observe";
  return null;
}

const LABELS: Record<AgentAction, string> = {
  observe: "OBSERVE",
  act: "ACT",
  wait: "WAIT",
};

export function AgentActionTag({ action }: { action: AgentAction }) {
  return (
    <span className={`agent-action-tag agent-action-tag--${action}`}>
      {LABELS[action]}
    </span>
  );
}
