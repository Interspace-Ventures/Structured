/* ============================================================
   liquid-word.js
   Animated "water fill" used in two places:
     1. The hero wordmark ("Liquidity"), clipped to letterforms.
     2. The logo glyph — a hypercube whose inner cube holds liquid.
   Technique: sine-wave <path>s clipped to a shape, translated
   horizontally for flow + bobbed vertically. A single scroll
   loop tilts every water body (.lw-slosh) so the liquid sloshes
   as you scroll. Colors come from --accent so Tweaks drive them.
   ============================================================ */
(function () {
  var NS = "http://www.w3.org/2000/svg";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  /* Build a <g class="lw-slosh"><g class="lw-bob">…waves…</g></g>
     that fills the box 0..w, 0..h with liquid up to `level`. */
  function makeWater(w, h, opts) {
    opts = opts || {};
    var level = opts.level != null ? opts.level : h * 0.42;
    var amp = opts.amp != null ? opts.amp : h * 0.05;
    var bottom = h * 1.7;
    var ref = opts.wavelenRef || h * 0.95;
    var periods = Math.max(2, Math.round(w / ref));
    var wl = w / periods;
    var step = Math.max(2, w / 60);

    function wavePath(cls, lvl, a, fillDown) {
      var d = "M 0 " + lvl.toFixed(2);
      for (var x = 0; x <= 2 * w; x += step) {
        var y = lvl + a * Math.sin((2 * Math.PI * x) / wl);
        d += " L " + x.toFixed(2) + " " + y.toFixed(2);
      }
      if (fillDown) d += " L " + (2 * w).toFixed(2) + " " + bottom.toFixed(2) + " L 0 " + bottom.toFixed(2) + " Z";
      var p = el("path", { class: cls, d: d });
      p.style.setProperty("--w", w + "px");
      return p;
    }

    var slosh = el("g", { class: "lw-slosh" });
    var bob = el("g", { class: "lw-bob" });
    bob.style.setProperty("--amp", (h * 0.045).toFixed(2) + "px");

    if (opts.full) {
      // brim-full: solid liquid edge-to-edge (the slosh skew + bob keep it
      // from ever revealing an air gap), with internal ripple lines that
      // drift sideways to read as moving liquid.
      bob.appendChild(el("rect", { class: "lw-wave-front", x: -w, y: -h, width: 3 * w, height: bottom + 2 * h }));
      bob.appendChild(wavePath("lw-ripple lw-ripple-a", h * 0.3, amp * 0.7, false));
      bob.appendChild(wavePath("lw-ripple lw-ripple-b", h * 0.58, amp * 0.55, false));
      bob.appendChild(wavePath("lw-shine", h * 0.16, amp * 0.6, false));
    } else {
      bob.appendChild(wavePath("lw-wave-back", level + amp * 0.55, amp * 0.8, true));
      bob.appendChild(wavePath("lw-wave-front", level, amp, true));
      bob.appendChild(wavePath("lw-shine", level, amp, false));
    }
    slosh.appendChild(bob);
    return slosh;
  }

  /* ---------------- hero wordmark ---------------- */
  function buildText(span, cs, w, h, fs) {
    var t = el("text", {
      x: 0,
      y: (h * 0.5).toFixed(1),
      "dominant-baseline": "central",
      textLength: w.toFixed(1),
      lengthAdjust: "spacingAndGlyphs",
      "font-family": cs.fontFamily,
      "font-weight": cs.fontWeight,
      "font-size": fs,
    });
    t.style.fontStretch = cs.fontStretch;
    t.style.letterSpacing = cs.letterSpacing;
    t.textContent = span.getAttribute("data-liquid-text") || span.textContent.trim();
    return t;
  }

  function buildWord(span) {
    var cs = getComputedStyle(span);
    var w = span.offsetWidth, h = span.offsetHeight;
    if (!w || !h) return;
    var fs = parseFloat(cs.fontSize);

    var old = span.querySelector("svg.liquid-svg");
    if (old) old.remove();

    var uid = "lw-" + Math.random().toString(36).slice(2, 8);
    var svg = el("svg", { class: "liquid-svg", viewBox: "0 0 " + w + " " + h, preserveAspectRatio: "none", "aria-hidden": "true" });

    var defs = el("defs");
    var clip = el("clipPath", { id: uid });
    clip.appendChild(buildText(span, cs, w, h, fs));
    defs.appendChild(clip);
    svg.appendChild(defs);

    var g = el("g", { "clip-path": "url(#" + uid + ")" });
    g.appendChild(el("rect", { class: "lw-glass", x: 0, y: 0, width: w, height: h }));
    g.appendChild(makeWater(w, h, { level: h * 0.42, amp: h * 0.05 }));
    svg.appendChild(g);

    var outline = buildText(span, cs, w, h, fs);
    outline.setAttribute("class", "lw-outline");
    svg.appendChild(outline);

    span.appendChild(svg);
    span.classList.add("is-liquid");
  }

  /* ---------------- isometric hypercube logo ---------------- */
  // Geometry precomputed for a 100×100 viewBox. Outer iso cube (edge L=32)
  // and a concentric inner iso cube at 0.42 scale. In isometric projection
  // the near + far corners both land at center (50,50) — the classic look.
  var CUBE = {
    outerHex: "M50 18 L77.71 34 L77.71 66 L50 82 L22.29 66 L22.29 34 Z",
    outerY: "M50 50 L50 82 M50 50 L22.29 34 M50 50 L77.71 34",
    innerHex: "M50 36.56 L61.64 43.28 L61.64 56.72 L50 63.44 L38.36 56.72 L38.36 43.28 Z",
    innerY: "M50 50 L50 63.44 M50 50 L38.36 43.28 M50 50 L61.64 43.28",
    links:
      "M50 18 L50 36.56 M77.71 34 L61.64 43.28 M77.71 66 L61.64 56.72 " +
      "M50 82 L50 63.44 M22.29 66 L38.36 56.72 M22.29 34 L38.36 43.28",
  };

  function buildCube(host) {
    var old = host.querySelector("svg.liquid-cube");
    if (old) old.remove();

    var uid = "lc-" + Math.random().toString(36).slice(2, 8);
    var svg = el("svg", { class: "liquid-cube", viewBox: "0 0 100 100", preserveAspectRatio: "none", "aria-hidden": "true" });

    // clip liquid to the outer cube silhouette
    var defs = el("defs");
    var clip = el("clipPath", { id: uid });
    clip.appendChild(el("path", { d: CUBE.outerHex }));
    defs.appendChild(clip);
    svg.appendChild(defs);

    // faint glass behind the liquid
    svg.appendChild(el("path", { class: "lw-cube-innerglass", d: CUBE.outerHex }));

    // liquid filling the cube volume
    var g = el("g", { "clip-path": "url(#" + uid + ")" });
    g.appendChild(makeWater(100, 100, { full: true, amp: 7, wavelenRef: 30 }));
    svg.appendChild(g);

    // wireframe — connecting edges, both Y's, then the two silhouettes
    svg.appendChild(el("path", { class: "lw-cube-edge", d: CUBE.links + " " + CUBE.outerY + " " + CUBE.innerY }));
    svg.appendChild(el("path", { class: "lw-cube-edge", d: CUBE.innerHex }));
    svg.appendChild(el("path", { class: "lw-cube-shell", d: CUBE.outerHex }));

    host.appendChild(svg);
    host.classList.add("is-cube");
  }

  /* ---------------- scroll-driven slosh ---------------- */
  var lastY = window.pageYOffset || 0;
  var rawV = 0, slosh = 0, sloshV = 0, running = false;

  function onScroll() {
    var y = window.pageYOffset || 0;
    rawV += y - lastY;
    lastY = y;
  }

  function tick() {
    sloshV += rawV * 0.015;   // scroll motion pushes the liquid
    rawV *= 0.55;             // bleed off the raw delta
    sloshV += -slosh * 0.06;  // spring back toward level
    sloshV *= 0.86;           // damping
    slosh += sloshV;
    if (slosh > 14) slosh = 14; else if (slosh < -14) slosh = -14;
    var tr = "skewY(" + (slosh * 0.45).toFixed(2) + "deg) translateY(" + (slosh * 0.3).toFixed(2) + "px)";
    var nodes = document.querySelectorAll(".lw-slosh");
    for (var i = 0; i < nodes.length; i++) nodes[i].style.transform = tr;
    requestAnimationFrame(tick);
  }

  function startSlosh() {
    if (running || reduce) return;
    running = true;
    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(tick);
  }

  /* ---------------- init ---------------- */
  function initAll() {
    document.querySelectorAll(".glas[data-liquid]").forEach(buildWord);
    document.querySelectorAll(".glyph").forEach(buildCube);
    startSlosh();
  }

  function ready() {
    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    fonts.then(initAll);
    setTimeout(initAll, 400);
  }

  if (document.readyState !== "loading") ready();
  else document.addEventListener("DOMContentLoaded", ready);

  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(initAll, 150);
  });
})();
