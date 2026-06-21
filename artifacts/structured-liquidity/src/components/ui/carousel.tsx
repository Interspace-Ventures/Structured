import * as React from "react";
import { cn } from "@/lib/utils";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** controlled active slide index */
  index?: number;
  /** uncontrolled initial slide index */
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
}

/** Structured Liquidity carousel — snap track with prev/next + dot nav. */
export function Carousel({
  index,
  defaultIndex,
  onIndexChange,
  className,
  children,
  ...props
}: CarouselProps) {
  const slides = React.Children.toArray(children);
  const count = slides.length;
  const [internal, setInternal] = React.useState(defaultIndex ?? 0);
  const isControlled = index !== undefined;
  const cur = Math.max(0, Math.min(count - 1, isControlled ? index : internal));
  const trackRef = React.useRef<HTMLDivElement>(null);

  const go = (i: number) => {
    const next = Math.max(0, Math.min(count - 1, i));
    if (next === cur) return;
    if (!isControlled) setInternal(next);
    onIndexChange?.(next);
  };

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[cur] as HTMLElement | undefined;
    if (slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, [cur]);

  return (
    <div className={cn("sl-carousel-wrap is-enhanced", className)} {...props}>
      <button
        type="button"
        className="sl-carousel-btn prev"
        aria-label="Previous slide"
        disabled={cur <= 0}
        onClick={() => go(cur - 1)}
      >
        ‹
      </button>
      <div className="sl-carousel" ref={trackRef}>
        {children}
      </div>
      <button
        type="button"
        className="sl-carousel-btn next"
        aria-label="Next slide"
        disabled={cur >= count - 1}
        onClick={() => go(cur + 1)}
      >
        ›
      </button>
      {count > 0 && (
        <div className="sl-carousel-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={cn(i === cur && "is-active")}
              onClick={() => go(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CarouselSlide({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("slide", className)} {...props} />;
}
