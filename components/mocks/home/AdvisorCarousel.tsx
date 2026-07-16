"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Figure } from "@/components/ui/Figure";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

export type Advisor = {
  name: string;
  title: string;
  line: string;
  previously: string;
  photo: string;
};

/**
 * Advisory carousel — native scroll-snap, arrows + dot pagination,
 * no autoplay (motion law). Port of the master page's script.js carousel.
 */
export function AdvisorCarousel({ advisors }: { advisors: Advisor[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const recalc = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    setPages(Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth)));
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    recalc();
    const el = viewportRef.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(recalc, 80);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [recalc]);

  const scrollBy = (dir: 1 | -1) => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  const scrollTo = (p: number) => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollTo({ left: p * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Show previous advisors"
          disabled={page === 0}
          onClick={() => scrollBy(-1)}
          className="inline-flex size-10 items-center justify-center rounded-xs border text-foreground transition-colors duration-120 ease-standard hover:bg-accent disabled:opacity-40"
        >
          <ChevronLeftIcon size={17} />
        </button>
        <button
          type="button"
          aria-label="Show next advisors"
          disabled={page >= pages - 1}
          onClick={() => scrollBy(1)}
          className="inline-flex size-10 items-center justify-center rounded-xs border text-foreground transition-colors duration-120 ease-standard hover:bg-accent disabled:opacity-40"
        >
          <ChevronRightIcon size={17} />
        </button>
      </div>

      <div
        ref={viewportRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none]"
      >
        {advisors.map((advisor) => (
          <article
            key={advisor.name}
            className="w-72 shrink-0 snap-start overflow-hidden border bg-card sm:w-80"
          >
            <Figure
              src={advisor.photo}
              alt={advisor.name}
              ratio="portrait"
              sizes="320px"
            />
            <div className="p-5">
              <h3 className="font-sans text-base font-semibold text-foreground">
                {advisor.name}
              </h3>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                {advisor.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {advisor.line}
              </p>
              <div className="mt-4 border-t pt-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Previously
                </span>
                <span className="mt-1 block font-serif text-sm text-foreground">
                  {advisor.previously}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        className="mt-5 flex justify-center gap-2"
        role="tablist"
        aria-label="Advisory board pages"
      >
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === page}
            aria-label={`Advisors page ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={cn(
              "size-2 rounded-full transition-colors duration-120 ease-standard",
              i === page ? "bg-brand" : "bg-input",
            )}
          />
        ))}
      </div>
    </div>
  );
}
