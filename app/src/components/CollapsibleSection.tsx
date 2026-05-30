import { useState, type ReactNode } from "react";
import { Chevron } from "./Icons";
import { C } from "../utils/colors";

export function CollapsibleSection({
  label,
  summary,
  defaultOpen = false,
  className = "",
  children,
}: {
  label: string;
  summary?: string;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`collapsible-section ${className}`.trim()}>
      <button
        type="button"
        className="collapsible-section-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <Chevron open={open} size={10} />
        <span className="collapsible-section-label">{label}</span>
        {!open && summary && (
          <span className="collapsible-section-summary">{summary}</span>
        )}
      </button>
      {open && <div className="collapsible-section-body">{children}</div>}
    </div>
  );
}

export function CollapsibleBlock({
  label,
  summary,
  defaultOpen = false,
  children,
}: {
  label: string;
  summary?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${C.border}`, background: "var(--w-elevated)" }}>
      <button
        type="button"
        className="collapsible-section-trigger w-full"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <Chevron open={open} size={10} />
        <span className="collapsible-section-label">{label}</span>
        {!open && summary && (
          <span className="collapsible-section-summary">{summary}</span>
        )}
      </button>
      {open && (
        <div className="collapsible-section-body px-3 pb-3" style={{ borderTop: `1px solid ${C.border}` }}>
          {children}
        </div>
      )}
    </div>
  );
}
