import * as React from "react";
import { cn } from "@/lib/utils";

const PEEK = 15;
const SCALE_STEP = 0.055;
const GAP = 12;
const MAX = 3;
const LIFE = 4200;
const EXIT_MS = 380;

export interface ToastOptions {
  title?: string;
  description?: string;
}

interface ToastItemData {
  id: number;
  title: string;
  description: string;
  show: boolean;
  removed: boolean;
}

interface ToastMeta {
  remaining: number;
  removed: boolean;
  start: number;
  timer: ReturnType<typeof setTimeout> | undefined;
}

interface ToastCtx {
  toast: (opts: ToastOptions) => number;
  toasts: ToastItemData[];
  expanded: boolean;
  enter: () => void;
  leave: () => void;
}

const Ctx = React.createContext<ToastCtx | null>(null);

/* ---- imperative bridge ----------------------------------------------------
   A module-level reference to the live provider's toast() so non-React code
   (e.g. the imperative gallery in src/lib/behaviors.ts) can raise the same
   toasts. Registered by <ToastProvider> on mount; a no-op until then. */
let externalToast: ((opts: ToastOptions) => void) | null = null;

/** emitToast — fire a toast from outside React (no-op until a provider mounts). */
export function emitToast(opts: ToastOptions): void {
  externalToast?.(opts);
}

/** useToast — push toasts onto the stack rendered by <Toaster />. */
export function useToast() {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("useToast must be used within <ToastProvider>");
  return { toast: c.toast };
}

function useToasterCtx() {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("<Toaster> must be used within <ToastProvider>");
  return c;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

/** Structured Liquidity toast provider — Sonner-style stacking deck. */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastItemData[]>([]);
  const [expanded, setExpanded] = React.useState(false);
  const metas = React.useRef<Record<number, ToastMeta>>({});
  const counter = React.useRef(0);
  const expandedRef = React.useRef(false);
  expandedRef.current = expanded;

  const remove = React.useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    delete metas.current[id];
  }, []);

  const dismiss = React.useCallback(
    (id: number) => {
      const meta = metas.current[id];
      if (!meta || meta.removed) return;
      meta.removed = true;
      clearTimeout(meta.timer);
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, removed: true, show: false } : t)),
      );
      setTimeout(() => remove(id), EXIT_MS);
    },
    [remove],
  );

  const arm = React.useCallback(
    (id: number) => {
      const meta = metas.current[id];
      if (!meta || meta.removed) return;
      meta.start = Date.now();
      meta.timer = setTimeout(() => dismiss(id), meta.remaining);
    },
    [dismiss],
  );

  const enter = React.useCallback(() => {
    setExpanded(true);
    Object.values(metas.current).forEach((meta) => {
      if (meta.removed) return;
      clearTimeout(meta.timer);
      meta.remaining = Math.max(600, meta.remaining - (Date.now() - meta.start));
    });
  }, []);

  const leave = React.useCallback(() => {
    setExpanded(false);
    Object.keys(metas.current).forEach((key) => {
      const id = Number(key);
      if (!metas.current[id].removed) arm(id);
    });
  }, [arm]);

  const toast = React.useCallback(
    ({ title = "Saved", description = "" }: ToastOptions) => {
      const id = ++counter.current;
      metas.current[id] = { remaining: LIFE, removed: false, start: 0, timer: undefined };
      setToasts((prev) => [
        ...prev,
        { id, title, description, show: false, removed: false },
      ]);
      if (expandedRef.current) {
        Object.values(metas.current).forEach((meta) => {
          if (meta.removed) return;
          clearTimeout(meta.timer);
        });
      } else {
        arm(id);
      }
      return id;
    },
    [arm],
  );

  React.useEffect(() => {
    externalToast = toast;
    return () => {
      if (externalToast === toast) externalToast = null;
    };
  }, [toast]);

  React.useEffect(() => {
    const pending = toasts.filter((t) => !t.show && !t.removed);
    if (pending.length === 0) return;
    const raf = requestAnimationFrame(() => {
      setToasts((prev) =>
        prev.map((t) => (!t.show && !t.removed ? { ...t, show: true } : t)),
      );
    });
    return () => cancelAnimationFrame(raf);
  }, [toasts]);

  return (
    <Ctx.Provider value={{ toast, toasts, expanded, enter, leave }}>
      {children}
    </Ctx.Provider>
  );
}

/** Toaster — renders the fixed bottom-right stack. Place once near the app root. */
export function Toaster({ className }: { className?: string }) {
  const { toasts, expanded, enter, leave } = useToasterCtx();
  const heights = React.useRef<Record<number, number>>({});
  const [, force] = React.useReducer((x: number) => x + 1, 0);

  const setHeight = React.useCallback((id: number, h: number) => {
    if (heights.current[id] !== h) {
      heights.current[id] = h;
      force();
    }
  }, []);

  const n = toasts.length;
  const styleFor = (i: number): React.CSSProperties => {
    const t = toasts[i];
    const depth = n - 1 - i;
    const base: Record<string, string | number> = { zIndex: 100 + i };
    if (t.removed) {
      return { ...base, "--y": "0px", "--s": "1", opacity: 0 } as React.CSSProperties;
    }
    if (expanded) {
      let y = 0;
      for (let j = i + 1; j < n; j++) y -= (heights.current[toasts[j].id] || 0) + GAP;
      return { ...base, "--y": y + "px", "--s": "1", opacity: 1 } as React.CSSProperties;
    }
    return {
      ...base,
      "--y": -depth * PEEK + "px",
      "--s": String(Math.max(0, 1 - depth * SCALE_STEP)),
      opacity: depth >= MAX ? 0 : 1,
    } as React.CSSProperties;
  };

  return (
    <div
      className={cn("sl-toast-stack", className)}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {toasts.map((t, i) => (
        <ToastItem key={t.id} data={t} style={styleFor(i)} onHeight={setHeight} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  data: ToastItemData;
  style: React.CSSProperties;
  onHeight: (id: number, h: number) => void;
}
function ToastItem({ data, style, onHeight }: ToastItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    if (ref.current) onHeight(data.id, ref.current.offsetHeight);
  }, [data.id, data.title, data.description, onHeight]);
  return (
    <div ref={ref} className={cn("sl-toast", data.show && "show")} style={style}>
      <div>
        <p className="tt">{data.title}</p>
        <p className="td">{data.description}</p>
      </div>
    </div>
  );
}
