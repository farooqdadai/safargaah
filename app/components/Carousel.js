"use client";

import { Children, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function Carousel({
  children,
  className = "",
  options,
  onApi
}) {
  const [viewportRef, emblaApi] = useEmblaCarousel(options);

  useEffect(() => {
    if (!onApi) {
      return undefined;
    }
    onApi(emblaApi ?? null);
  }, [emblaApi, onApi]);

  return (
    <div className={`embla ${className}`.trim()}>
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {Children.map(children, (child, index) => (
            <div className="embla__slide" key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

