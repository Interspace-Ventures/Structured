/* ============================================================
   GLASBRÜTAL — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- cursor-tracked specular highlight on every glass surface ---- */
  function bindGlassCursor() {
    document.querySelectorAll(".glass").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
      });
    });
  }

  /* ---- scroll reveal ----
     CSS transitions freeze at their start frame in non-compositing capture
     contexts (screenshot / print / PDF), which would leave content stuck
     invisible. So: reveal anything already on screen INSTANTLY (transition
     off), and only use the fade for below-the-fold items that appear while
     the user is actively scrolling (page is painting then). Nothing can get
     stuck hidden. */
  function bindReveal() {
    const items = [...document.querySelectorAll(".reveal")];
    items.forEach((el, i) => { el.style.transitionDelay = Math.min(i % 6, 5) * 55 + "ms"; });

    const inView = (el) => {
      const r = el.getBoundingClientRect();
      return r.top < (window.innerHeight || 800) * 0.92 && r.bottom > -40;
    };
    const showInstant = (el) => {
      const prev = el.style.transition;
      el.style.transition = "none";
      el.classList.add("in");
      void el.offsetHeight;            // commit without animating
      el.style.transition = prev;
    };
    const showAnimated = (el) => el.classList.add("in");

    // 1) initial paint: reveal everything currently on screen, instantly
    items.forEach((el) => { if (inView(el)) showInstant(el); });

    // 2) below-the-fold: fade in as they enter during scroll
    let ticking = false;
    const sweep = () => {
      items.forEach((el) => { if (!el.classList.contains("in") && inView(el)) showAnimated(el); });
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sweep);
    }, { passive: true });

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((en) => { if (en.isIntersecting) { showAnimated(en.target); io.unobserve(en.target); } }),
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      items.forEach((el) => { if (!el.classList.contains("in")) io.observe(el); });
    }

    // safety net: nothing stays hidden longer than this
    setTimeout(() => items.forEach((el) => { if (!el.classList.contains("in")) showInstant(el); }), 1800);
  }

  /* ---- hero specimen parallax (pointer + scroll) ---- */
  function bindParallax() {
    const cards = [...document.querySelectorAll(".specimen .card")];
    if (!cards.length) return;
    let px = 0, py = 0;
    window.addEventListener("pointermove", (e) => {
      px = (e.clientX / window.innerWidth - 0.5);
      py = (e.clientY / window.innerHeight - 0.5);
      apply();
    });
    function apply() {
      cards.forEach((c) => {
        if (c.dataset.dragging === "1") return;
        const d = parseFloat(c.dataset.depth || "0.05");
        const ox = parseFloat(c.dataset.ox || "0");
        const oy = parseFloat(c.dataset.oy || "0");
        c.style.transform = `translate(${ox + px * d * 600}px, ${oy + py * d * 600}px)`;
      });
    }
    apply();
  }

  /* ---- draggable glass chips ---- */
  function bindDrag() {
    document.querySelectorAll(".draggable").forEach((el) => {
      let sx, sy, ox0, oy0;
      el.addEventListener("pointerdown", (e) => {
        el.dataset.dragging = "1";
        el.setPointerCapture(e.pointerId);
        sx = e.clientX; sy = e.clientY;
        ox0 = parseFloat(el.dataset.ox || "0");
        oy0 = parseFloat(el.dataset.oy || "0");
        el.style.zIndex = 20;
        el.style.transition = "none";
      });
      el.addEventListener("pointermove", (e) => {
        if (el.dataset.dragging !== "1") return;
        const ox = ox0 + (e.clientX - sx);
        const oy = oy0 + (e.clientY - sy);
        el.dataset.ox = ox; el.dataset.oy = oy;
        el.style.transform = `translate(${ox}px, ${oy}px) scale(1.03)`;
      });
      const end = () => {
        if (el.dataset.dragging !== "1") return;
        el.dataset.dragging = "0";
        el.style.transition = "";
      };
      el.addEventListener("pointerup", end);
      el.addEventListener("pointercancel", end);
    });
  }

  /* ---- live specimens ---- */
  function bindSpecimens() {
    document.querySelectorAll(".toggle").forEach((t) => {
      const flip = () => {
        const on = t.classList.toggle("on");
        t.setAttribute("aria-checked", on ? "true" : "false");
      };
      t.addEventListener("click", flip);
      t.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
      });
    });

    document.querySelectorAll(".seg").forEach((seg) => {
      seg.querySelectorAll("button").forEach((b) => {
        b.addEventListener("click", () => {
          seg.querySelectorAll("button").forEach((x) => x.classList.remove("sel"));
          b.classList.add("sel");
        });
      });
    });

    // draggable demo slider that also writes the readout
    const track = document.getElementById("demoTrack");
    if (track) {
      const fill = track.querySelector(".fill");
      const thumb = track.querySelector(".thumb");
      const readout = document.getElementById("blurReadout");
      let active = false;
      const set = (clientX) => {
        const r = track.getBoundingClientRect();
        let p = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
        fill.style.width = p * 100 + "%";
        thumb.style.left = p * 100 + "%";
        if (readout) readout.textContent = Math.round(p * 100);
      };
      track.addEventListener("pointerdown", (e) => { active = true; track.setPointerCapture(e.pointerId); set(e.clientX); });
      track.addEventListener("pointermove", (e) => { if (active) set(e.clientX); });
      track.addEventListener("pointerup", () => { active = false; });
    }
  }

  /* ---- nav scrollspy: highlight the active section's nav link ---- */
  function bindDotNav() {
    const links = [...document.querySelectorAll('.nav .links a[href^="#"]')]
      .filter((a) => !a.classList.contains("nav-cta"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    const byId = {};
    links.forEach((a) => {
      const id = a.getAttribute("href").slice(1);
      if (id) byId[id] = a;
    });
    const sections = Object.keys(byId).map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;
    const setActive = (id) =>
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
    const visible = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) visible.add(en.target);
          else visible.delete(en.target);
        });
        if (!visible.size) { setActive(null); return; } // in the hero / between bands
        let top = null;
        visible.forEach((s) => { if (!top || s.offsetTop < top.offsetTop) top = s; });
        setActive(top ? top.id : null);
      },
      { rootMargin: "-38% 0px -57% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
  }

  function init() {
    bindGlassCursor();
    bindReveal();
    bindParallax();
    bindDrag();
    bindSpecimens();
    bindDotNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
