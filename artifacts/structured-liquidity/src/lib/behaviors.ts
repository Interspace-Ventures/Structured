/* ============================================================
   Page-level visual behaviors — React-triggered port of the
   non-component parts of public/structured-liquidity.js and the
   original vanilla page hooks. These operate on the DOM
   React renders (run once from App's mount effect). Interactive
   *components* live in src/components/ui/* as real React — these
   are ambient page effects only (cursor specular, scroll reveal,
   nav scrollspy, glass refraction capability + glint).
   ============================================================ */

import catalog from "@/catalog.json";
import { installCommand } from "@/components/site/InstallButton";
import { emitToast } from "@/components/ui/toast";

let booted = false;

/* inline lucide-react glyphs (download / check) — behaviors.ts is imperative,
   so the per-cell copy affordance can't render JSX; these mirror the icons the
   React <InstallButton> uses. */
const ICON_DOWNLOAD =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>';
const ICON_CHECK =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

/* ============================================================
   Component gallery — flattens the statically-rendered kit-groups
   into a single sorted, filterable masonry grid (Category × Type axes,
   FLIP-animated). Faithful port of the legacy mountGallery(): the
   grouped markup is the no-JS fallback; this is the real experience.
   Safe to re-parent the React-rendered .kit-cell nodes because the
   <Components> section never re-renders (no state/props change).
   ============================================================ */
function bindGallery() {
  const groups = document.querySelector<HTMLElement>("#components .kit-groups");
  if (!groups) return;

  const CATS: { key: string; label: string }[] = catalog.categories;
  const labelOf = (k: string): string => CATS.find((c) => c.key === k)?.label ?? k;
  const CAT_OF: Record<string, string> = Object.fromEntries(
    catalog.components.map((c) => [c.cap, c.category] as const),
  );
  const FACETS: { key: string; label: string }[] = catalog.facets;
  const KINDS_OF: Record<string, string[]> = Object.fromEntries(
    catalog.components.map((c) => [c.cap, c.kinds] as const),
  );
  /* cap -> shadcn registry item slug, for the per-cell one-click install. */
  const REG_OF: Record<string, string> = Object.fromEntries(
    catalog.components
      .filter((c): c is typeof c & { registry: string } => "registry" in c && !!c.registry)
      .map((c) => [c.cap, c.registry] as const),
  );

  const grid = document.createElement("div");
  grid.className = "kit-grid gallery";
  const present = new Set<string>();
  const presentFacets = new Set<string>();

  const primaryCap = (cell: HTMLElement): string =>
    cell.querySelector<HTMLElement>(".kit-cap")?.textContent?.trim() ?? "";
  const cells = Array.from(groups.querySelectorAll<HTMLElement>(".kit-cell"));
  cells.sort((a, b) => {
    const la = labelOf(CAT_OF[primaryCap(a)] ?? "other").toLowerCase();
    const lb = labelOf(CAT_OF[primaryCap(b)] ?? "other").toLowerCase();
    return la === lb
      ? primaryCap(a).toLowerCase().localeCompare(primaryCap(b).toLowerCase())
      : la.localeCompare(lb);
  });

  cells.forEach((cell) => {
    const cap = cell.querySelector<HTMLElement>(".kit-cap");
    const capText = cap?.textContent?.trim() ?? "";
    const key = CAT_OF[capText] ?? "other";
    if (import.meta.env.DEV && capText && !(capText in CAT_OF)) {
      console.warn(
        `[catalog] component "${capText}" is missing from src/catalog.json — add it so it's tracked and categorised.`,
      );
    }
    cell.setAttribute("data-cat", key);
    present.add(key);
    const kinds = KINDS_OF[capText] ?? [];
    if (kinds.length) cell.setAttribute("data-kinds", kinds.join(" "));
    kinds.forEach((k) => presentFacets.add(k));
    if (cap && capText && cap.dataset.cat !== key) {
      cap.textContent = `${labelOf(key)} › ${capText}`;
      cap.dataset.cat = key;
    }
    /* one-click install: copy `npx shadcn@latest add …/r/<slug>.json` for this
       component. Appended after the cap text mutation (which would wipe it). */
    const slug = REG_OF[capText];
    if (cap && slug) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "kit-copy";
      btn.dataset.registry = slug;
      btn.setAttribute("aria-label", `Copy install command for ${capText}`);
      btn.title = "Copy install command";
      btn.innerHTML = `<span class="kit-copy-ico" data-ico="download">${ICON_DOWNLOAD}</span><span class="kit-copy-ico" data-ico="check">${ICON_CHECK}</span>`;
      cap.appendChild(btn);
    }
    grid.appendChild(cell);
  });

  const makeChip = (key: string, label: string, active = false): HTMLButtonElement => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "kit-filter" + (active ? " active" : "");
    b.dataset.filter = key;
    b.setAttribute("aria-pressed", active ? "true" : "false");
    b.textContent = label;
    return b;
  };

  const makeRow = (axis: string, axisLabel: string): HTMLElement => {
    const row = document.createElement("div");
    row.className = "kit-filter-row " + (axis === "cat" ? "is-primary" : "is-secondary");
    const lbl = document.createElement("span");
    lbl.className = "kit-filter-axis";
    lbl.textContent = axisLabel;
    const b = document.createElement("div");
    b.className = "kit-filters";
    b.dataset.axis = axis;
    b.setAttribute("role", "group");
    b.setAttribute("aria-label", `Filter components by ${axisLabel.toLowerCase()}`);
    row.append(lbl, b);
    return row;
  };

  const catRow = makeRow("cat", "Category");
  const catBar = catRow.querySelector<HTMLElement>(".kit-filters")!;
  catBar.appendChild(makeChip("all", "All", true));
  CATS.forEach((c) => {
    if (present.has(c.key)) catBar.appendChild(makeChip(c.key, c.label));
  });

  const facetRow = makeRow("kind", "Type");
  const facetBar = facetRow.querySelector<HTMLElement>(".kit-filters")!;
  facetBar.appendChild(makeChip("all", "All", true));
  FACETS.forEach((f) => {
    if (presentFacets.has(f.key)) facetBar.appendChild(makeChip(f.key, f.label));
  });

  const count = document.createElement("p");
  count.className = "kit-result-count";
  count.setAttribute("aria-live", "polite");
  count.setAttribute("aria-atomic", "true");

  const filters = document.createElement("div");
  filters.className = "kit-filterbars";
  filters.append(catRow, facetRow, count);

  groups.replaceWith(filters, grid);

  /* per-cell one-click install (delegated). Copies the component's shadcn add
     command, flashes the check glyph, and raises a toast via the React bridge. */
  grid.addEventListener("click", async (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>(".kit-copy");
    if (!btn) return;
    const slug = btn.dataset.registry;
    if (!slug) return;
    const cmd = installCommand(slug);
    try {
      await navigator.clipboard.writeText(cmd);
    } catch {
      /* clipboard unavailable — still toast so the user sees the command */
    }
    btn.classList.add("is-copied");
    window.setTimeout(() => btn.classList.remove("is-copied"), 1600);
    emitToast({ title: "Copied install command", description: cmd });
  });

  const updateCount = (): void => {
    const total = grid.querySelectorAll(".kit-cell").length;
    const shown = grid.querySelectorAll(".kit-cell:not(.is-hidden)").length;
    count.innerHTML =
      shown === total ? `<b>${total}</b> components` : `<b>${shown}</b> of ${total} shown`;
  };
  updateCount();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PLAY_MS = 440;
  let flipRun = 0;
  const clearFlip = (c: HTMLElement): void => {
    c.style.transition = "";
    c.style.transform = "";
    c.style.opacity = "";
    c.style.willChange = "";
  };

  let activeCat = "all";
  let activeKind = "all";

  const matches = (c: HTMLElement): boolean => {
    if (activeCat !== "all" && c.getAttribute("data-cat") !== activeCat) return false;
    if (activeKind !== "all") {
      const kinds = (c.getAttribute("data-kinds") ?? "").split(" ");
      if (!kinds.includes(activeKind)) return false;
    }
    return true;
  };

  const setActive = (b: HTMLElement, val: string): void => {
    b.querySelectorAll<HTMLButtonElement>(".kit-filter").forEach((x) => {
      const on = x.dataset.filter === val;
      x.classList.toggle("active", on);
      x.setAttribute("aria-pressed", on ? "true" : "false");
    });
  };

  const syncKindChips = (): void => {
    const avail = new Set<string>();
    grid.querySelectorAll<HTMLElement>(".kit-cell").forEach((c) => {
      if (activeCat !== "all" && c.getAttribute("data-cat") !== activeCat) return;
      (c.getAttribute("data-kinds") ?? "")
        .split(" ")
        .filter(Boolean)
        .forEach((k) => avail.add(k));
    });
    facetBar.querySelectorAll<HTMLButtonElement>(".kit-filter").forEach((chip) => {
      const key = chip.dataset.filter ?? "";
      if (key === "all") return;
      chip.hidden = !avail.has(key);
    });
    if (activeKind !== "all" && !avail.has(activeKind)) {
      activeKind = "all";
      setActive(facetBar, "all");
    }
  };

  const applyFilter = (): void => {
    const cells = Array.from(grid.querySelectorAll<HTMLElement>(".kit-cell"));
    if (reduceMotion) {
      cells.forEach((c) => c.classList.toggle("is-hidden", !matches(c)));
      updateCount();
      return;
    }
    const run = ++flipRun;
    cells.forEach((c) => {
      c.style.transition = "none";
      c.style.transform = "";
      c.style.opacity = "";
    });
    void grid.offsetHeight;

    const first = new Map<HTMLElement, DOMRect>();
    cells.forEach((c) => {
      if (!c.classList.contains("is-hidden")) first.set(c, c.getBoundingClientRect());
    });

    cells.forEach((c) => c.classList.toggle("is-hidden", !matches(c)));
    updateCount();

    const last = new Map<HTMLElement, DOMRect>();
    cells.forEach((c) => {
      if (!c.classList.contains("is-hidden")) last.set(c, c.getBoundingClientRect());
    });

    cells.forEach((c) => {
      const lr = last.get(c);
      if (!lr) return;
      const fr = first.get(c);
      if (fr) {
        const dx = fr.left - lr.left;
        const dy = fr.top - lr.top;
        if (dx || dy) c.style.transform = `translate(${dx}px, ${dy}px)`;
      } else {
        c.style.transform = "translateY(10px) scale(0.985)";
        c.style.opacity = "0";
      }
      c.style.willChange = "transform, opacity";
    });

    void grid.offsetHeight;

    cells.forEach((c) => {
      if (!last.has(c)) return;
      c.style.transition = "transform .44s cubic-bezier(.2,.7,.2,1), opacity .34s ease";
      c.style.transform = "";
      c.style.opacity = "1";
    });

    window.setTimeout(() => {
      if (run !== flipRun) return;
      cells.forEach(clearFlip);
    }, PLAY_MS + 80);
  };

  filters.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>(".kit-filter");
    if (!btn || !btn.dataset.filter || btn.classList.contains("active")) return;
    const axis = btn.closest<HTMLElement>(".kit-filters")?.dataset.axis;
    if (axis === "cat") {
      activeCat = btn.dataset.filter;
      setActive(catBar, activeCat);
      syncKindChips();
    } else if (axis === "kind") {
      activeKind = btn.dataset.filter;
      setActive(facetBar, activeKind);
    } else {
      return;
    }
    applyFilter();
  });
}

/* cursor-tracked specular highlight on every glass surface */
function bindGlassCursor() {
  document.querySelectorAll<HTMLElement>(".glass").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });
}

/* scroll reveal — reveal on-screen items instantly (so capture/print never
   freezes them hidden), fade in below-the-fold items as they enter. */
function bindReveal() {
  const items = [...document.querySelectorAll<HTMLElement>(".reveal")];
  items.forEach((el, i) => {
    el.style.transitionDelay = Math.min(i % 6, 5) * 55 + "ms";
  });

  const inView = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return r.top < (window.innerHeight || 800) * 0.92 && r.bottom > -40;
  };
  const showInstant = (el: HTMLElement) => {
    const prev = el.style.transition;
    el.style.transition = "none";
    el.classList.add("in");
    void el.offsetHeight;
    el.style.transition = prev;
  };
  const showAnimated = (el: HTMLElement) => el.classList.add("in");

  items.forEach((el) => {
    if (inView(el)) showInstant(el);
  });

  let ticking = false;
  const sweep = () => {
    items.forEach((el) => {
      if (!el.classList.contains("in") && inView(el)) showAnimated(el);
    });
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sweep);
    },
    { passive: true },
  );

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            showAnimated(en.target as HTMLElement);
            io.unobserve(en.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });
  }

  setTimeout(
    () => items.forEach((el) => { if (!el.classList.contains("in")) showInstant(el); }),
    1800,
  );
}

/* nav scrollspy: highlight the active section's nav link */
function bindDotNav() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.nav .links a[href^="#"]')].filter(
    (a) => !a.classList.contains("nav-cta"),
  );
  if (!links.length || !("IntersectionObserver" in window)) return;
  const byId: Record<string, HTMLAnchorElement> = {};
  links.forEach((a) => {
    const id = a.getAttribute("href")!.slice(1);
    if (id) byId[id] = a;
  });
  const sections = Object.keys(byId)
    .map((id) => document.getElementById(id))
    .filter(Boolean) as HTMLElement[];
  if (!sections.length) return;
  const setActive = (id: string | null) =>
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
  const visible = new Set<HTMLElement>();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) visible.add(en.target as HTMLElement);
        else visible.delete(en.target as HTMLElement);
      });
      if (!visible.size) {
        setActive(null);
        return;
      }
      let top: HTMLElement | null = null;
      visible.forEach((s) => {
        if (!top || s.offsetTop < top.offsetTop) top = s;
      });
      setActive(top ? (top as HTMLElement).id : null);
    },
    { rootMargin: "-38% 0px -57% 0px", threshold: 0 },
  );
  sections.forEach((s) => io.observe(s));
}

/* refraction glint: pointer-tracked --mx/--my on [data-refract] surfaces */
function bindRefraction() {
  document.querySelectorAll<HTMLElement>("[data-refract]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });
}

/* Build the equalizer bars for any [data-waveform] container. data-bars = bar
   count, data-played = how many leading bars read as "played" (solid accent) vs
   upcoming (dim). Heights come from layered sines so it reads like an audio
   envelope, not a bar chart; the bars are static (calm seek display). */
function bindWaveform() {
  document.querySelectorAll<HTMLElement>("[data-waveform]").forEach((el) => {
    const bars = Math.max(1, Math.min(200, Number(el.dataset.bars) || 40));
    const played = Math.max(0, Math.min(bars, Number(el.dataset.played) || 0));
    el.replaceChildren();
    for (let i = 0; i < bars; i += 1) {
      const bar = document.createElement("span");
      bar.className = i < played ? "wf-bar" : "wf-bar is-future";
      const env = Math.abs(Math.sin(i * 0.45) * 0.6 + Math.sin(i * 0.17 + 1) * 0.4);
      bar.style.setProperty("--h", `${(22 + env * 70).toFixed(1)}%`);
      bar.style.setProperty("--d", `${(-(i % 7) * 0.13).toFixed(2)}s`);
      el.appendChild(bar);
    }
  });
}

/* Liquid-glass nav bars. Floating bottom tab bar (.gnav-bar): clicking a tab
   glides the accent marker across the buttons by measuring the active tab's box.
   Segmented section sub-nav ([data-snav-seg]): clicking a segment glides the
   marker to it (offset corrected for the track border via clientLeft). The
   marker's CSS transition is the only motion, disabled under reduced-motion. */
function bindGlassNav() {
  document.querySelectorAll<HTMLElement>(".gnav-bar").forEach((bar) => {
    const tabs = Array.from(bar.querySelectorAll<HTMLButtonElement>(".gnav-tab"));
    if (!tabs.length) return;
    const move = (): void => {
      const active = tabs.find((t) => t.classList.contains("is-active")) ?? tabs[0];
      const barRect = bar.getBoundingClientRect();
      const r = active.getBoundingClientRect();
      bar.style.setProperty("--gnav-x", `${r.left - barRect.left - bar.clientLeft}px`);
      bar.style.setProperty("--gnav-w", `${r.width}px`);
    };
    tabs.forEach((tab) =>
      tab.addEventListener("click", () => {
        tabs.forEach((t) => {
          t.classList.remove("is-active");
          t.removeAttribute("aria-current");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-current", "page");
        requestAnimationFrame(move);
      }),
    );
    move();
    window.addEventListener("resize", move);
    void document.fonts.ready.then(move);
  });
  document.querySelectorAll<HTMLElement>("[data-snav-seg]").forEach((seg) => {
    const btns = Array.from(seg.querySelectorAll<HTMLButtonElement>(".snav-seg-btn"));
    if (!btns.length) return;
    const move = (): void => {
      const active = btns.find((b) => b.getAttribute("aria-selected") === "true") ?? btns[0];
      const segRect = seg.getBoundingClientRect();
      const r = active.getBoundingClientRect();
      seg.style.setProperty("--seg-x", `${r.left - segRect.left - seg.clientLeft}px`);
      seg.style.setProperty("--seg-w", `${r.width}px`);
    };
    btns.forEach((b) =>
      b.addEventListener("click", () => {
        btns.forEach((x) => x.setAttribute("aria-selected", "false"));
        b.setAttribute("aria-selected", "true");
        requestAnimationFrame(move);
      }),
    );
    move();
    window.addEventListener("resize", move);
    void document.fonts.ready.then(move);
  });
}

/* only enable the SVG url() backdrop-filter where the browser actually
   renders it, else the glass would vanish. */
function detectRefract() {
  const ok =
    typeof CSS !== "undefined" &&
    CSS.supports &&
    (CSS.supports("backdrop-filter", "url(#sl-glass-refract)") ||
      CSS.supports("-webkit-backdrop-filter", "url(#sl-glass-refract)"));
  if (ok) document.documentElement.classList.add("sl-refract");
}

export function initBehaviors() {
  if (booted) return;
  booted = true;
  detectRefract();
  bindGallery();
  bindGlassCursor();
  bindReveal();
  bindDotNav();
  bindRefraction();
  bindWaveform();
  bindGlassNav();
}
