"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TEAMS, NAV_LINKS } from "@/content/nav";
import {
  ChevronDownIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/icons";

function Wordmark() {
  return (
    <Link href="/" className="group inline-flex flex-col items-start leading-none">
      <span className="font-serif text-2xl font-semibold text-foreground">
        Madison
      </span>
      <span className="mt-1 font-mono text-[11px] tracking-wide text-muted-foreground">
        by Lyzr
      </span>
      <span className="mt-1.5 h-px w-1/2 bg-brand" aria-hidden />
    </Link>
  );
}

function TeamRow({
  team,
  onNavigate,
}: {
  team: (typeof TEAMS)[number];
  onNavigate?: () => void;
}) {
  const inner = (
    <>
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-foreground">
          {team.label}
        </span>
        <span className="mt-0.5 font-mono text-[11px] text-muted-foreground">
          {team.role}
        </span>
      </span>
      {team.comingSoon ? (
        <Badge tone="neutral" className="shrink-0">
          Coming soon
        </Badge>
      ) : null}
    </>
  );

  if (team.comingSoon) {
    return (
      <span
        aria-disabled
        className="flex cursor-default items-center justify-between gap-4 px-4 py-2.5 opacity-70"
      >
        {inner}
      </span>
    );
  }

  return (
    <Link
      href={team.href}
      onClick={onNavigate}
      className="flex items-center justify-between gap-4 px-4 py-2.5 transition-colors duration-120 ease-standard hover:bg-accent"
    >
      {inner}
    </Link>
  );
}

export function Header() {
  const [teamsOpen, setTeamsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTeamsOpen, setMobileTeamsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!teamsOpen) return;
    function onPointerDown(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setTeamsOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setTeamsOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [teamsOpen]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-6"
      >
        <Wordmark />

        {/* Desktop */}
        <div className="mx-auto hidden items-center gap-7 min-[900px]:flex">
          {NAV_LINKS.slice(0, 3).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors duration-120 ease-standard hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <div className="relative" ref={dropdownRef}>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={teamsOpen}
              aria-haspopup="menu"
              onClick={() => setTeamsOpen((v) => !v)}
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-120 ease-standard hover:text-foreground"
            >
              For your team
              <ChevronDownIcon
                size={14}
                className={cn(
                  "transition-transform duration-180 ease-standard",
                  teamsOpen && "rotate-180",
                )}
              />
            </button>
            {teamsOpen ? (
              <div
                role="menu"
                className="absolute right-0 top-full mt-3 max-h-[70vh] w-88 overflow-auto rounded-md border bg-popover py-2 text-popover-foreground shadow-lg"
              >
                {TEAMS.map((team) => (
                  <TeamRow
                    key={team.label}
                    team={team}
                    onNavigate={() => setTeamsOpen(false)}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {NAV_LINKS.slice(3).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors duration-120 ease-standard hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto hidden min-[900px]:block">
          <Button href="/#contact" size="sm">
            Request a demo
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto text-foreground min-[900px]:hidden"
        >
          {mobileOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </nav>

      {/* Mobile panel */}
      {mobileOpen ? (
        <div className="border-t bg-background min-[900px]:hidden">
          <div className="mx-auto max-w-6xl px-6 py-4">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block border-b py-3 text-[15px] text-foreground"
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              aria-expanded={mobileTeamsOpen}
              onClick={() => setMobileTeamsOpen((v) => !v)}
              className="flex w-full items-center justify-between border-b py-3 text-[15px] text-foreground"
            >
              For your team
              <ChevronDownIcon
                size={16}
                className={cn(
                  "transition-transform duration-180 ease-standard",
                  mobileTeamsOpen && "rotate-180",
                )}
              />
            </button>
            {mobileTeamsOpen ? (
              <div className="border-b bg-muted/50">
                {TEAMS.map((team) => (
                  <TeamRow
                    key={team.label}
                    team={team}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ))}
              </div>
            ) : null}

            {NAV_LINKS.slice(3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block border-b py-3 text-[15px] text-foreground"
              >
                {link.label}
              </Link>
            ))}

            <div className="py-4">
              <Button
                href="/#contact"
                className="w-full"
                onClick={() => setMobileOpen(false)}
              >
                Request a demo
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
