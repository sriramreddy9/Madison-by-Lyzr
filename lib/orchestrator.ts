import type { Turn } from "./scenario";

// A turn streams as: thinking -> reasoning lines, one by one -> output -> done.
export function totalSteps(turn: Turn): number {
  return turn.reasoning.length + 2; // thinking + lines + output
}

export function delayForStep(step: number, turn: Turn, reduced: boolean): number {
  if (reduced) return 40;
  if (step === 0) return 850; // thinking
  if (step <= turn.reasoning.length) return 320 + (step % 3) * 140; // 320 to 600ms
  return 550; // output
}

export function isLiveMode(): boolean {
  return process.env.NEXT_PUBLIC_LIVE_AI === "true";
}

// Live-LLM mode: ask the server route for this turn. Any failure returns null
// and the caller falls back silently to the scripted turn.
export async function fetchLiveTurn(
  scenarioId: string,
  itemId: string,
  brief: string
): Promise<Turn | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scenarioId, itemId, brief }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = (await res.json()) as { turn?: Turn };
    const t = data.turn;
    if (
      !t ||
      t.kind !== "turn" ||
      typeof t.title !== "string" ||
      !Array.isArray(t.reasoning) ||
      t.reasoning.length === 0 ||
      !t.output ||
      typeof t.output.headline !== "string" ||
      !Array.isArray(t.output.details)
    ) {
      return null;
    }
    return t;
  } catch {
    return null;
  }
}
