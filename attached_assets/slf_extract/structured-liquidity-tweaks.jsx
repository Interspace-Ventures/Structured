/* ============================================================
   STRUCTURED LIQUIDITY — Tweaks island.
   Mounts the panel and writes the CSS knobs the whole page
   reads from. Slide between pure liquidity and pure structure
   in real time.
   ============================================================ */

const SL_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#a388ee",
  "blur": 18,
  "border": 2,
  "shadow": 7,
  "radius": 0,
  "font": "Archivo",
  "mode": "dark"
}/*EDITMODE-END*/;

const SL_FONTS = {
  "Archivo": '"Archivo", system-ui, sans-serif',
  "Space Grotesk": '"Space Grotesk", system-ui, sans-serif',
  "Syne": '"Syne", system-ui, sans-serif'
};

// accent -> readable ink for text sitting on the accent fill
function inkFor(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#000000" : "#ffffff";
}

function SLTweaks() {
  const [t, setTweak] = useTweaks(SL_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--accent", t.accent);
    root.setProperty("--accent-ink", inkFor(t.accent));
    root.setProperty("--glass-blur", t.blur + "px");
    root.setProperty("--border-w", t.border + "px");
    root.setProperty("--hard-x", t.shadow + "px");
    root.setProperty("--hard-y", t.shadow + "px");
    root.setProperty("--radius", t.radius + "px");
    root.setProperty("--display", SL_FONTS[t.font] || SL_FONTS.Archivo);
    document.documentElement.setAttribute("data-mode", t.mode);
  }, [t]);

  return (
    <TweaksPanel title="Modifications">
      <TweakSection label="Liquidity" />
      <TweakSlider label="Glass blur" value={t.blur} min={0} max={40} unit="px"
                   onChange={(v) => setTweak("blur", v)} />
      <TweakSlider label="Corner radius" value={t.radius} min={0} max={40} unit="px"
                   onChange={(v) => setTweak("radius", v)} />

      <TweakSection label="Structure" />
      <TweakSlider label="Border weight" value={t.border} min={0} max={5} unit="px"
                   onChange={(v) => setTweak("border", v)} />
      <TweakSlider label="Flat shadow" value={t.shadow} min={0} max={16} unit="px"
                   onChange={(v) => setTweak("shadow", v)} />

      <TweakSection label="Voice" />
      <TweakSelect label="Display font" value={t.font} options={["Archivo", "Space Grotesk", "Syne"]}
                   onChange={(v) => setTweak("font", v)} />
      <TweakColor label="Accent" value={t.accent}
                  options={["#a388ee", "#7c9cff", "#3dd7c8", "#ffb454", "#ff7a90"]}
                  onChange={(v) => setTweak("accent", v)} />
      <TweakRadio label="Mode" value={t.mode} options={["dark", "light"]}
                  onChange={(v) => setTweak("mode", v)} />
    </TweaksPanel>
  );
}

(function mount() {
  const host = document.createElement("div");
  document.body.appendChild(host);
  ReactDOM.createRoot(host).render(<SLTweaks />);
})();
