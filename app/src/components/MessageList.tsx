import { useState } from "react";
import { Chevron } from "./Icons";
import { C } from "../utils/colors";
import { parseMessages, messagesFromSpan } from "../utils/messageParsing";
import type { Message } from "../utils/messageParsing";

export { parseMessages, messagesFromSpan };

const ROLE_STYLES: Record<string, { bg: string; border: string; text: string; label: string }> = {
  system:    { bg: "var(--w-elevated)", border: "var(--w-border)", text: "var(--w-fg2)", label: "var(--w-fg1)" },
  user:      { bg: "var(--w-a03)", border: "var(--w-border)", text: "var(--w-fg3)", label: "var(--w-fg1)" },
  assistant: { bg: "var(--w-a025)", border: "var(--w-border)", text: "var(--w-fg3)", label: "var(--w-fg1)" },
  tool:      { bg: "var(--w-a025)", border: "var(--w-border)", text: "var(--w-fg2)", label: "var(--w-purple)" },
};

function MessageBubble({ msg, defaultExpanded }: { msg: Message; defaultExpanded: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const style = ROLE_STYLES[msg.role] ?? ROLE_STYLES.system;
  const preview = msg.content.slice(0, 100).replace(/\n/g, " ") + (msg.content.length > 100 ? "\u2026" : "");

  return (
    <div className="rounded-lg overflow-hidden" style={{ background: style.bg, border: `1px solid ${style.border}` }}>
      <button
        className="flex items-center gap-2 px-3 py-1.5 w-full text-left"
        style={{ borderBottom: expanded ? `1px solid ${style.border}` : "none" }}
        onClick={() => setExpanded(!expanded)}
      >
        <Chevron open={expanded} size={8} />
        <span className="text-[11px] font-mono font-medium uppercase tracking-wide" style={{ color: style.label }}>
          {msg.role}
        </span>
        {!expanded && (
          <span className="text-[11px] truncate flex-1" style={{ color: C.fg1 }}>{preview}</span>
        )}
        {msg.content.length > 100 && (
          <span className="text-[10px] ml-auto flex-shrink-0" style={{ color: C.fg1 }}>
            {(msg.content.length / 1000).toFixed(1)}k
          </span>
        )}
      </button>
      {expanded && (
        <div className="px-3 py-2 select-text cursor-text">
          <pre className="text-[12px] leading-relaxed font-mono whitespace-pre-wrap select-text" style={{ color: style.text, userSelect: "text" }}>
            {msg.content}
          </pre>
        </div>
      )}
    </div>
  );
}

export function MessageList({ messages, compact = false }: { messages: Message[]; compact?: boolean }) {
  return (
    <div className="space-y-1.5">
      {messages.map((msg, i) => (
        <MessageBubble
          key={i}
          msg={msg}
          defaultExpanded={!compact && msg.content.length < 500}
        />
      ))}
    </div>
  );
}
