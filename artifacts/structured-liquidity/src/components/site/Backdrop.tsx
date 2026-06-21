/* Off-screen SVG refraction filter (referenced by html.sl-refract .glass
   backdrop-filter) + the field grid and grain layers behind the page. */
export function Backdrop() {
  return (
    <>
      <svg
        className="sl-glass-defs"
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <filter
          id="sl-glass-refract"
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.01"
            numOctaves={2}
            seed={7}
            stitchTiles="stitch"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="0.5" result="smoothNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="smoothNoise"
            scale={8}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="field" aria-hidden="true">
        <div className="grid"></div>
      </div>
      <div className="grain" aria-hidden="true"></div>
    </>
  );
}
