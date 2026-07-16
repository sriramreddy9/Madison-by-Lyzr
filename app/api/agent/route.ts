import { NextResponse } from "next/server";
import { scenarioById, type Turn } from "@/lib/scenario";

// Live-LLM orchestration. Each agent turn is a single system-prompted call
// that must return strict JSON matching the Turn schema. If the key is
// missing, the call errors, or the JSON fails validation, we return the
// scripted turn so the demo never fails.

export const runtime = "nodejs";

function scriptedTurn(scenarioId: string, itemId: string): Turn | null {
  const scenario = scenarioById(scenarioId);
  const item = scenario.items.find((i) => i.id === itemId);
  return item && item.kind === "turn" ? item : null;
}

function validTurn(t: unknown): t is Turn {
  if (!t || typeof t !== "object") return false;
  const turn = t as Turn;
  return (
    turn.kind === "turn" &&
    typeof turn.id === "string" &&
    typeof turn.agentId === "string" &&
    typeof turn.title === "string" &&
    Array.isArray(turn.brainReads) &&
    Array.isArray(turn.reasoning) &&
    turn.reasoning.length > 0 &&
    turn.reasoning.every((r) => typeof r === "string") &&
    !!turn.output &&
    typeof turn.output.headline === "string" &&
    Array.isArray(turn.output.details)
  );
}

export async function POST(req: Request) {
  let scenarioId = "hy-savings";
  let itemId = "";
  let brief = "";
  try {
    const body = await req.json();
    scenarioId = String(body.scenarioId ?? scenarioId);
    itemId = String(body.itemId ?? "");
    brief = String(body.brief ?? "");
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const scripted = scriptedTurn(scenarioId, itemId);
  if (!scripted) {
    return NextResponse.json({ error: "unknown turn" }, { status: 404 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ turn: scripted, mode: "scripted" });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1024,
        system:
          "You are one agent inside an Agentic OS for banking marketing, running a demo for Willamette Community Credit Union ($3.2B in assets, a credit union: say 'members', never 'customers'). " +
          "You will receive a campaign brief and a reference JSON turn. Rewrite the reasoning lines and output in fresh, specific language while keeping every fact, figure, citation, and structure identical. " +
          "Rules: no em dashes anywhere, ranges use 'to', keep confidence tags like [Modeled] exactly where they appear. " +
          "Return ONLY the JSON object, no prose, matching the reference schema exactly (same id, agentId, kind, brainReads, requiresApproval).",
        messages: [
          {
            role: "user",
            content: `Brief: ${brief}\n\nReference turn JSON:\n${JSON.stringify(scripted)}`,
          },
        ],
      }),
      signal: AbortSignal.timeout(7000),
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const data = (await res.json()) as {
      content?: { type: string; text?: string }[];
    };
    const text =
      data.content?.find((c) => c.type === "text")?.text?.trim() ?? "";
    const jsonText = text.startsWith("{")
      ? text
      : text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
    const parsed = JSON.parse(jsonText) as Turn;
    // Repair: force the invariants the UI depends on.
    parsed.kind = "turn";
    parsed.id = scripted.id;
    parsed.agentId = scripted.agentId;
    parsed.requiresApproval = scripted.requiresApproval;
    parsed.brainReads = Array.isArray(parsed.brainReads)
      ? parsed.brainReads
      : scripted.brainReads;
    if (!validTurn(parsed)) throw new Error("invalid turn shape");
    return NextResponse.json({ turn: parsed, mode: "live" });
  } catch {
    // Silent fallback: the demo must always run.
    return NextResponse.json({ turn: scripted, mode: "scripted" });
  }
}
