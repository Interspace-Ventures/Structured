import { useId } from "react";

type Point = readonly [number, number];
const OUTER: readonly Point[] = [[280, 76], [502, 204], [280, 364], [58, 236]];
const INNER: readonly Point[] = [[280, 166], [368, 217], [280, 274], [192, 223]];
const interpolate = (a: Point, b: Point, t: number): Point => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];
const lower = ([x, y]: Point, amount: number): Point => [x, y + amount];
const polygon = (...points: Point[]) => points.map(([x, y]) => `${x},${y}`).join(" ");

/** Each locally ascending flight closes onto the next: an impossible global loop. */
export function ImpossibleStaircase() {
  const id = useId();
  return (
    <svg className="impossible-staircase" viewBox="0 0 560 460" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>The impossible staircase</title>
      <desc id={`${id}-desc`}>An Escher-inspired endless staircase. Four ascending flights form a closed square around an open courtyard, returning impossibly to their starting height.</desc>
      <g strokeLinejoin="miter" strokeWidth="1.5">
        {/* Solid foundations establish depth beneath the impossible tread circuit. */}
        <polygon className="impossible-staircase__wall" points="58,236 280,364 280,412 58,284" />
        <polygon className="impossible-staircase__wall-dark" points="280,364 502,204 502,252 280,412" />
        <polygon className="impossible-staircase__wall-dark" points="280,166 368,217 368,265 280,214" />
        <polygon className="impossible-staircase__wall" points="192,223 280,166 280,214 192,271" />
        {[0, 3, 1, 2].map((flight) => {
          const next = (flight + 1) % 4;
          return Array.from({ length: 7 }, (_, step) => {
            const a = interpolate(OUTER[flight], OUTER[next], step / 7);
            const b = interpolate(INNER[flight], INNER[next], step / 7);
            const c = interpolate(INNER[flight], INNER[next], (step + 1) / 7);
            const d = interpolate(OUTER[flight], OUTER[next], (step + 1) / 7);
            return (
              <g key={`${flight}-${step}`}>
                <polygon className="impossible-staircase__tread" points={polygon(a, b, lower(c, 9), lower(d, 9))} />
                <polygon className="impossible-staircase__riser" points={polygon(lower(d, 9), lower(c, 9), c, d)} />
              </g>
            );
          });
        })}
      </g>
    </svg>
  );
}
