import { useState, useEffect, useRef } from "react";

const HERO_IMG = "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/bb3591ba-d458-49ba-88de-e831d343d9d7/back-office.jpg";
const BACK_IMG = "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/50ac8218-ba9d-4b18-845e-a62283c840d4/front-office.jpg";
const GOV_IMG  = "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/22509f6d-0850-4622-b385-5e7e23f65cc4/governance.jpg";

const workspaces = [
  {
    n:"01", title:"Intake & Classify", sub:"From raw complaint to the right rule.",
    body:"Capture every dispute the moment it arrives, classify it against RESPA, TRID, ECOA, or your own rulebook, and route it with the right priority.",
    features:[
      { name:"Complaint Capture",   desc:"Intake from any channel — mail, portal, CFPB forwarding — into one tracked queue." },
      { name:"Rule Matching",       desc:"Map every complaint to the applicable regulation and your internal policy." },
      { name:"Priority Scoring",    desc:"Score by SLA urgency, monetary exposure, and supervisory risk." },
      { name:"Assignment",          desc:"Route to the right specialist with full context attached — no re-keying." },
    ],
  },
  {
    n:"02", title:"Investigate", sub:"Pull the loan file and find the root cause.",
    body:"Agents read the loan file, escrow history, payment records, and correspondence to surface the root cause before a human opens the case.",
    features:[
      { name:"Loan File Pull",       desc:"Reads your MSP, LOS, and document store — account history, escrow analysis, statement dates." },
      { name:"Root Cause Analysis",  desc:"Identifies the error: rate change, tax increase, late statement, fee misapplication." },
      { name:"Evidence Assembly",    desc:"Packages the relevant records into a structured finding — cited, traceable, auditable." },
      { name:"Flagging",             desc:"Surfaces upstream data errors that may affect other borrowers on the same loan type." },
    ],
  },
  {
    n:"03", title:"Draft & Approve", sub:"Compliant response, human sign-off.",
    body:"The agent drafts the borrower response and the resolution decision — both sourced from the loan file. A person reviews and approves before anything is sent.",
    features:[
      { name:"Response Draft",      desc:"Plain-language letter citing the regulation, the finding, and what will happen next." },
      { name:"Decision Preparation",desc:"Proposed resolution — waive, correct, deny — with rulebook citation and provenance." },
      { name:"Compliance Pre-check",desc:"RESPA acknowledgment and resolution window checked before the draft goes to review." },
      { name:"Human Sign-off",      desc:"Nothing is sent until a specialist approves in the Decision Inbox. Every verdict is yours." },
    ],
  },
  {
    n:"04", title:"Log & Close", sub:"Filed, evidenced, audit-ready.",
    body:"Every step from intake to resolution is logged with timestamps, attribution, and citations. Exam-ready on day one — no evidence project at exam time.",
    features:[
      { name:"Full Audit Trail",    desc:"Who classified, who investigated, who drafted, who approved — all versioned and exportable." },
      { name:"CFPB Filing",         desc:"Response and resolution submitted and tracked. Deadlines visible across the queue." },
      { name:"Upstream Prevention", desc:"Flags the loan-level error for ops to fix before the next borrower writes in." },
      { name:"Reporting",           desc:"SLA adherence, root-cause patterns, and resolution rates — one report for the board." },
    ],
  },
];

const trustRows = [
  { g:"The model never decides",   how:"Every verdict is rulebook-computed.",   what:"Deterministic call on your policy — the LLM drafts, the rules decide." },
  { g:"Human on every action",     how:"Decision Inbox for every dispute.",      what:"No borrower letter is sent without specialist sign-off. Ever." },
  { g:"Auditable, always",         how:"Every step, timestamped and attributed.",what:"Provenance on every figure. Exportable to your evidence store." },
  { g:"Your data, your perimeter", how:"Sovereign / on-prem deployment.",        what:"No data leaves the institution. No training on your loans." },
  { g:"BYO-LLM",                   how:"Your Azure OpenAI, AWS Bedrock.",        what:"Your keys, your logs, your controls." },
  { g:"Your systems",              how:"MSP, LOS, case management.",             what:"Additive layer — nothing gets replaced or ripped out." },
];

const creds = ["RESPA by construction","TRID-aligned","ECOA / fair-lending","CFPB exam-ready","SOC 2 Type II","Sovereign / on-prem","BYO-LLM","Full audit trail"];

const businessMetrics = [
  { val:"26,100", top:"Mortgage complaints to CFPB",  bottom:"In 2024 — the desk that carries the volume." },
  { val:"5 / 30",  top:"Acknowledge · resolve days",   bottom:"RESPA 12 CFR 1024.35 — the clock starts at intake." },
  { val:"$1,397",  top:"Extra cost per non-performing",bottom:"$1,573 vs $176 — the difference a fast response makes." },
  { val:"Zero",    top:"CFPB findings from SLA breach",bottom:"The exam-readiness that matters most." },
];

const roadmap = [
  { step:"01", phase:"Scope & connect",   timing:"Week 1-2",   desc:"Choose one dispute type — escrow, fee, payment error. Agree the baseline SLA and the systems needed. No integration required to start." },
  { step:"02", phase:"Pilot on synthetic",timing:"Week 2",     desc:"30-minute walkthrough on synthetic data that mirrors your loan book. Prove the workflow before a single real dispute." },
  { step:"03", phase:"Go live",           timing:"Weeks 3-4",  desc:"Put the first dispute type into production. Human-in-the-loop from day one. Every decision waits for specialist sign-off." },
  { step:"04", phase:"Expand from proof", timing:"From week 4",desc:"Extend to more dispute types, more SLA windows. Same governed layer — same audit trail — across the full servicing queue." },
];

const faqs = [
  { q:"Does it send responses to borrowers automatically?",    a:"No. Every response and resolution waits in the Decision Inbox for specialist sign-off. Nothing is sent until a person approves it." },
  { q:"How does it hold up in a CFPB exam?",                   a:"Built for it. Human-in-the-loop, provenance on every figure, a full audit trail. Show the examiner exactly how each dispute was decided and who signed off." },
  { q:"Does it replace our servicing platform?",               a:"No — it is a layer on top. It reads your MSP, LOS, and document store. Nothing gets ripped out or replaced." },
  { q:"What if the AI produces the wrong root cause?",          a:"The verdict is recomputed server-side against your rulebook — not determined by the model. A human reviews the finding before any action is taken." },
  { q:"Where does our loan data live?",                         a:"Inside your perimeter. Sovereign / on-prem deployment. No data leaves the institution. No training on your loans." },
  { q:"How fast can we see it on our disputes?",                a:"A 30-minute walkthrough on synthetic data that mirrors your book. No integration to start. Bring your hardest dispute type." },
];

const navTeams = [
  { label:"Commercial Banking" },
  { label:"Retail Banking" },
  { label:"Deal Intelligence" },
  { label:"Compliant Marketing" },
  { label:"Underwriting",       soon:true },
  { label:"KYC",                soon:true },
  { label:"Risk & Compliance" },
  { label:"Reconciliations",    soon:true },
  { label:"Dispute Resolution", active:true },
  { label:"HR" },
];

const T = {
  h1:"text-[48px] leading-[1.04]", h2:"text-[38px] leading-[1.06]", h3:"text-[30px] leading-[1.1]",
  h4:"text-[24px] leading-[1.2]",  lead:"text-[19px] leading-relaxed", body:"text-base leading-relaxed",
  sm:"text-[13px] leading-relaxed", label:"text-[10px] uppercase tracking-[0.28em]",
};
/* ── button tokens ── */
const BTN = {
  primary: "group inline-flex items-center gap-2 rounded-sm bg-[#1E1610] px-6 py-3 text-[13px] font-medium text-white relative overflow-hidden hover:opacity-85 transition-opacity",
  secondary: "inline-flex items-center gap-2 rounded-sm border border-[#E8DFD3] bg-[#F9F5F1] px-6 py-3 text-[13px] hover:bg-white hover:border-[#1E1610] transition-all",
  ghost: "inline-flex items-center gap-2 rounded-sm border border-white/25 px-6 py-3 text-[13px] font-medium text-white hover:bg-white/8 transition-colors",
};


const SHARED_CSS = `
  h1,h2,h3,h4{font-family:"Playfair Display",serif;letter-spacing:-.02em}
  body{font-family:"DM Sans",sans-serif;-webkit-font-smoothing:antialiased;background:#F9F5F1}
  .sf{font-family:"Playfair Display",serif;letter-spacing:-.02em}
  ::selection{background:#1E1610;color:#fff}
  .grid-lines{background-image:linear-gradient(to right,rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.06) 1px,transparent 1px);background-size:80px 80px}
  .ochre-rule{height:1px;background:linear-gradient(to right,transparent,#1E1610 40%,#1E1610 60%,transparent)}
  @keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.3}}
  .pulse-dot{animation:pulse-dot 1.6s ease-in-out infinite}
  @keyframes fade-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
  .fade-up{animation:fade-up .9s cubic-bezier(.16,1,.3,1) both}
  .fade-up-2{animation:fade-up .9s .12s cubic-bezier(.16,1,.3,1) both}
  .fade-up-3{animation:fade-up .9s .24s cubic-bezier(.16,1,.3,1) both}
  @keyframes ping{0%{transform:scale(1);opacity:.8}70%,100%{transform:scale(2.2);opacity:0}}
  .ping{animation:ping 1.8s ease-out infinite}
  [data-reveal]{opacity:0;transform:translateY(28px);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}
  [data-reveal="left"]{transform:translateX(-28px)}
  [data-reveal="scale"]{transform:scale(.93)}
  [data-reveal].in-view{opacity:1;transform:none}
  [data-delay="1"]{transition-delay:.06s}[data-delay="2"]{transition-delay:.13s}
  [data-delay="3"]{transition-delay:.20s}[data-delay="4"]{transition-delay:.27s}
  [data-delay="5"]{transition-delay:.34s}[data-delay="6"]{transition-delay:.41s}
  @keyframes stat-pop{from{opacity:0;transform:scale(.9) translateY(14px)}to{opacity:1;transform:none}}
  [data-stat].in-view{animation:stat-pop .6s cubic-bezier(.16,1,.3,1) both}
  [data-stat][data-delay="1"].in-view{animation-delay:.06s}
  [data-stat][data-delay="2"].in-view{animation-delay:.12s}
  [data-stat][data-delay="3"].in-view{animation-delay:.18s}
  [data-stat][data-delay="4"].in-view{animation-delay:.24s}
  .ws-accent::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:#1E1610;transform:scaleY(0);transform-origin:bottom;transition:transform .35s cubic-bezier(.16,1,.3,1)}
  .ws-accent.on::before,.ws-accent:hover::before{transform:scaleY(1)}
  .tab-content{transition:opacity .18s ease,transform .18s ease}
  .tab-content.out{opacity:0;transform:translateY(8px)}
  .tab-content.in{opacity:1;transform:none}
`;

interface Props { navigate: (page: string) => void; }

export default function DisputeResolution({ navigate }: Props) {
  const [navScrolled,  setNavScrolled]  = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [activeWs,     setActiveWs]     = useState(0);
  const [tabFade,      setTabFade]      = useState(true);
  const [openFaq,      setOpenFaq]      = useState<number | null>(null);
  const [heroParallax, setHeroParallax] = useState(0);
  const faqBodyRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fn = () => { setNavScrolled(window.scrollY > 60); setHeroParallax(window.scrollY * 0.28); };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in-view"); obs.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );
    document.querySelectorAll("[data-reveal],[data-stat]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const switchTab = (i: number) => {
    if (i === activeWs) return;
    setTabFade(false);
    setTimeout(() => { setActiveWs(i); setTabFade(true); }, 180);
  };

  const navUL = "relative after:content-[\'\'] after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-px after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100";

  const NavDropdown = () => (
    <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute left-1/2 top-full mt-4 w-[520px] -translate-x-1/2 border border-[#E8DFD3] bg-[#F9F5F1] p-4 text-[#1E1610] shadow-[0_30px_80px_-30px_rgba(0,0,0,.30)] transition-all duration-250">
      <p className={`mb-3 px-2 ${T.label} text-[#6B5E4F]`}>For your team</p>
      <ul className="grid grid-cols-2 gap-0.5 text-sm">
        {navTeams.map(t => (
          <li key={t.label}>
            <button onClick={() => {
                if (t.label === "Commercial Banking")       navigate("commercial-banking");
                else if (t.label === "Retail Banking")      navigate("retail-banking");
                else if (t.label === "Deal Intelligence")   navigate("deal-intelligence");
                else if (t.label === "Compliant Marketing") navigate("compliant-marketing");
                else if (t.label === "Risk & Compliance")   navigate("risk-compliance");
                else if (t.label === "HR") navigate("hr");
                else if (!t.soon && !t.active)              navigate("home");
              }}
              className={`w-full flex items-center justify-between rounded-sm px-3 py-2.5 transition-colors text-left ${t.active ? "bg-[#1E1610] text-white cursor-default" : "hover:bg-[#F1EBE1]"}`}>
              {t.label}
              {t.soon && <span className="rounded-full border border-[#E8DFD3] px-2 py-0.5 text-[9px] uppercase tracking-widest text-[#6B5E4F]">Soon</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ fontFamily:"'DM Sans',sans-serif", background:"#F9F5F1", color:"#1E1610" }}>
      <style>{SHARED_CSS}</style>

      {/* NAV */}
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-400 ${navScrolled ? "border-[#E8DFD3] bg-[#F9F5F1]/92 text-[#1E1610]" : "border-transparent text-white"}`}
        style={{ backdropFilter: navScrolled ? "saturate(160%) blur(12px)" : "none" }}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <button onClick={() => navigate("home")} className="sf text-[24px] tracking-tight hover:opacity-70 transition-opacity">Madison</button>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            {["Platform","Coverage","Solutions"].map(l => (
              <button key={l} onClick={() => navigate("home")} className={navUL}>{l}</button>
            ))}
            <div className="group relative">
              <button className={`inline-flex items-center gap-1 ${navUL} after:scale-x-100`}>
                For your team
                <svg className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 8l5 5 5-5"/></svg>
              </button>
              <NavDropdown />
            </div>
            {["Governance","Advisors"].map(l => (
              <button key={l} onClick={() => navigate("home")} className={navUL}>{l}</button>
            ))}
          </nav>
          <a href="#contact" className="hidden rounded-sm border border-current px-4 py-2 text-xs tracking-wide md:inline-flex hover:opacity-70 transition-opacity">Request a demo</a>
          <button onClick={() => setMobileOpen(v => !v)} className="md:hidden h-9 w-9 grid place-items-center border border-current rounded-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-[#E8DFD3]/40 bg-[#F9F5F1] text-[#1E1610] md:hidden">
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col gap-1 text-sm">
              <button onClick={() => { navigate("home"); setMobileOpen(false); }} className="py-2 border-b border-[#E8DFD3] text-left">← Home</button>
              {[["commercial-banking","Commercial Banking"],["retail-banking","Retail Banking"],["deal-intelligence","Deal Intelligence"],["compliant-marketing","Compliant Marketing"],["risk-compliance","Risk & Compliance"]].map(([p,l]) => (
                <button key={p} onClick={() => { navigate(p); setMobileOpen(false); }} className="py-2 border-b border-[#E8DFD3] text-left">{l}</button>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-3 inline-flex rounded-sm border border-[#1E1610] px-4 py-2 text-xs w-fit">Request a demo</a>
            </div>
          </div>
        )}
        <div className={`transition-all duration-400 ${navScrolled ? "border-t border-[#E8DFD3]/60" : "border-t border-white/15"}`}>
          <div className="mx-auto max-w-[1400px] px-6 py-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em]">
            <button onClick={() => navigate("home")} className="opacity-55 hover:opacity-100 transition-opacity">For your team</button>
            <span className="opacity-35">›</span>
            <span className={navScrolled ? "text-[#1E1610]" : "text-white"}>Dispute Resolution</span>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative isolate overflow-hidden text-white min-h-[94vh] flex items-end">
        <img src={HERO_IMG} alt="Dispute resolution" className="absolute inset-0 -z-10 h-full w-full object-cover will-change-transform"
          style={{ transform:`translateY(${heroParallax}px)`, transformOrigin:"center top" }} />
        <div className="absolute inset-0 -z-10" style={{ background:"linear-gradient(155deg,rgba(0,0,0,.90) 0%,rgba(0,0,0,.60) 55%,rgba(0,0,0,.18) 100%)" }} />
        <div className="absolute inset-0 -z-10 grid-lines opacity-30" />
        <div className="absolute left-6 top-20 bottom-0 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent hidden lg:block" />
        <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-40 md:pb-28 md:pt-52">
          <div className="max-w-[760px]">
            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/6 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/80 backdrop-blur-sm fade-up">
              <span className="relative h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-white ping" />
                <span className="relative block h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              Madison for Dispute Resolution
            </p>
            <h1 className={`sf ${T.h1} tracking-tight fade-up-2`}>
              Every servicing dispute answered on time —<br /><em className="italic text-white/80">your team holds the pen.</em>
            </h1>
            <p className={`mt-7 max-w-lg ${T.lead} text-white/78 fade-up-3`}>
              Agents investigate and draft on your loan data. Your team makes the call. The 30-day scramble becomes a same-week sign-off — with a full audit trail on every decision.
            </p>
            <p className={`mt-3 ${T.sm} text-white/50 fade-up-3`}>RESPA and TRID by construction. Live in weeks, not a multi-year build.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 fade-up-3">
              <a href="#contact" className={BTN.primary}>
                <span className="relative z-10">Become a design partner</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#workspaces" className={BTN.ghost}>
                Explore the workflows
              </a>
            </div>
          </div>
          <div className="mt-14 flex flex-wrap gap-x-7 gap-y-2">
            {["RESPA & TRID by construction","Human on every verdict","Full audit trail","Runs in your perimeter"].map(t => (
              <span key={t} className="flex items-center gap-2 text-[12px] text-white/58">
                <span className="h-2.5 w-2.5 rounded-full border border-white/30" />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E8DFD3]">
          {[
            { val:"26,100", label:"Mortgage complaints to CFPB in 2024" },
            { val:"5 / 30", label:"Days to acknowledge and resolve — RESPA" },
            { val:"$1,397", label:"Extra cost per non-performing loan" },
            { val:"<Week",  label:"From pilot to first live dispute resolved" },
          ].map(({ val, label }, i) => (
            <div key={i} data-stat data-delay={String(i+1)} className="group px-8 py-12 hover:bg-[#F1EBE1] transition-colors cursor-default">
              <p className={`sf ${T.h1} tracking-tight`}>{val}</p>
              <p className={`mt-3 ${T.sm} text-[#6B5E4F]`}>{label}</p>
              <div className="mt-5 h-px w-8 bg-[#1E1610] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT FITS */}
      <section className="border-b border-[#E8DFD3]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-5 md:sticky md:top-28" data-reveal="scale">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F1EBE1]">
              <img src={BACK_IMG} alt="Servicing desk" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] hover:scale-105" />
              <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(30,22,16,.72),transparent 55%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className={`${T.label} text-white/55 mb-2`}>One end-to-end workflow</p>
                <div className="flex flex-wrap gap-2">
                  {["Intake","Investigate","Draft","Approve","Log"].map(s => (
                    <span key={s} className="border border-white/20 bg-white/8 px-2.5 py-1 text-[11px] rounded-sm backdrop-blur-sm">{s}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-4 divide-x divide-[#E8DFD3] border border-[#E8DFD3]">
              {["Ops","Legal","Compliance","Board"].map(t => (
                <div key={t} className="py-2.5 text-center text-[11px] text-[#6B5E4F] hover:bg-[#F1EBE1] hover:text-[#1E1610] transition-colors">{t}</div>
              ))}
            </div>
            <p className={`mt-3 text-center ${T.label} text-[#6B5E4F]`}>One platform · end to end</p>
          </div>
          <div className="md:col-span-7">
            <p className={`${T.label} text-[#6B5E4F]`} data-reveal>How it fits</p>
            <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">One dispute workflow.<br />One audit trail.<br />Every decision yours.</h2>
            <p className={`mt-6 ${T.lead} text-[#6B5E4F] max-w-lg`} data-reveal data-delay="2">Madison carries context from the moment the complaint lands — through investigation, drafting, human review, and filing — so your team closes disputes inside the window, not on day 29.</p>
            <ul className="mt-10">
              {[
                { n:"01", t:"Intake & Classify",  d:"Capture, classify against the right rule, and route to the right specialist — with priority already scored." },
                { n:"02", t:"Investigate",         d:"Pull the loan file, surface root cause, and assemble the evidence before the case is opened." },
                { n:"03", t:"Draft & Approve",     d:"Draft the compliant response and decision. Human signs off in the Decision Inbox before anything is sent." },
                { n:"04", t:"Log & Close",         d:"Full audit trail from intake to resolution. Exam-ready on day one — no separate evidence project." },
              ].map(({ n, t, d }, i) => (
                <li key={n} data-reveal="left" data-delay={String(i+1)}
                  className="group flex gap-5 border-t border-[#E8DFD3] py-5 hover:bg-[#F1EBE1] -mx-4 px-4 transition-colors rounded-sm cursor-default">
                  <span className="text-[11px] text-[#1E1610] mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5">{n}</span>
                  <div>
                    <p className="font-medium text-[#1E1610]">{t}</p>
                    <p className={`mt-1 ${T.sm} text-[#6B5E4F]`}>{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHERE MADISON FITS */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 text-center max-w-xl mx-auto">
            <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Where Madison fits</p>
            <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Not a scoring tool.<br />Not a manual workflow.</h2>
            <p className={`mt-5 ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">The governed AI layer across your dispute lifecycle — from the moment the complaint lands to the moment the file is closed — without replacing the systems you already run.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[#E8DFD3] border border-[#E8DFD3]">
            {[
              { icon:"✕", label:"Not", title:"A dispute scoring tool",       desc:"Scoring a complaint and dropping it back in the queue is not resolution. Madison carries the case end to end — classify, investigate, draft, approve, log.", dark:false },
              { icon:"✕", label:"Not", title:"A manual workflow tracker",    desc:"Tracking disputes in a spreadsheet or a ticketing system moves deadlines around. Madison moves the case to closure, with evidence at every step.", dark:false },
              { icon:"✓", label:"Is",  title:"An agentic resolution layer",  desc:"One governed workflow that connects your servicing platform, loan data, and compliance team — with a human on every verdict and an audit trail on every step.", dark:true },
            ].map(({ icon, label, title, desc, dark }, i) => (
              <div key={title} data-reveal data-delay={String(i+1)}
                className={`group flex flex-col gap-6 p-8 md:p-10 transition-all duration-300 ${dark ? "bg-[#1E1610] text-white hover:bg-[#2a1f16]" : "bg-[#F9F5F1] hover:bg-white"}`}>
                <div className="flex items-center gap-3">
                  <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-medium transition-transform duration-300 group-hover:scale-110 ${dark ? "bg-white/10 text-white" : "border border-[#E8DFD3] text-[#6B5E4F]"}`}>{icon}</span>
                  <span className={`${T.label} ${dark ? "text-white/40" : "text-[#6B5E4F]"}`}>{label}</span>
                </div>
                <div>
                  <h3 className={`sf ${T.h4} leading-snug`}>{title}</h3>
                  <p className={`mt-4 ${T.sm} ${dark ? "text-white/68" : "text-[#6B5E4F]"}`}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKSPACES */}
      <section id="workspaces" className="border-b border-[#E8DFD3] scroll-mt-20">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Dispute resolution workflows</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">From intake to closure — inside the window.</h2>
            </div>
            <div className="md:col-span-8 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F] max-w-lg`} data-reveal data-delay="2">Each stage of the dispute lifecycle, governed and human-approved. Start with the dispute type that carries your highest SLA risk.</p>
            </div>
          </div>
          <div data-reveal className="grid md:grid-cols-12 gap-0 border border-[#E8DFD3]">
            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-[#E8DFD3] divide-y divide-[#E8DFD3]">
              {workspaces.map((ws, i) => (
                <button key={i} onClick={() => switchTab(i)}
                  className={`ws-accent relative w-full text-left px-7 py-6 transition-all duration-300 ${activeWs === i ? "on bg-[#1E1610] text-white" : "bg-[#F9F5F1] hover:bg-[#F1EBE1]"}`}>
                  <span className={`${T.label} block mb-2 ${activeWs === i ? "text-white/40" : "text-[#6B5E4F]"}`}>{ws.n}</span>
                  <span className={`sf ${T.h4}`}>{ws.title}</span>
                  <p className={`mt-1 ${T.sm} ${activeWs === i ? "text-white/60" : "text-[#6B5E4F]"}`}>{ws.sub}</p>
                </button>
              ))}
            </div>
            <div className="md:col-span-8 bg-[#F9F5F1]">
              <div className={`p-8 md:p-10 tab-content ${tabFade ? "in" : "out"}`}>
                <div className="flex items-start justify-between mb-7">
                  <div>
                    <span className={`${T.label} text-[#1E1610]`}>{workspaces[activeWs].n}</span>
                    <h3 className={`sf ${T.h3} mt-1`}>{workspaces[activeWs].title}</h3>
                    <p className={`mt-2 ${T.sm} text-[#6B5E4F]`}>{workspaces[activeWs].body}</p>
                  </div>
                  <span className="h-px w-10 bg-[#1E1610] flex-shrink-0 mt-6" />
                </div>
                <div className="grid sm:grid-cols-2 gap-px bg-[#E8DFD3]">
                  {workspaces[activeWs].features.map((f, i) => (
                    <div key={i} className="group bg-[#F9F5F1] p-6 hover:bg-[#F1EBE1] transition-colors cursor-default">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="h-1 w-4 bg-[#1E1610] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        <p className={`font-medium ${T.sm} text-[#1E1610]`}>{f.name}</p>
                      </div>
                      <p className={`${T.sm} text-[#6B5E4F]`}>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DECISION INBOX (dark) */}
      <section className="relative overflow-hidden border-b border-[#E8DFD3]" style={{ background:"#1E1610" }}>
        <div className="absolute inset-0 grid-lines opacity-22" />
        <div className="absolute inset-0 opacity-12"><img src={GOV_IMG} className="h-full w-full object-cover" alt="" /></div>
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-5 text-white">
            <p className={`${T.label} text-white/45 flex items-center gap-2`} data-reveal>
              <span className="relative h-2 w-2"><span className="absolute inset-0 rounded-full bg-white/50 ping" /><span className="relative block h-2 w-2 rounded-full bg-white/80" /></span>
              Decision Inbox · one verdict, awaiting you
            </p>
            <h2 className={`mt-6 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">The dispute brief your specialist approves before anything is sent.</h2>
            <p className={`mt-5 ${T.lead} text-white/68`} data-reveal data-delay="2">Investigated, drafted, and compliance-checked — pulled from your loan file, escrow history, and payment records. Your specialist makes the call.</p>
            <div className="mt-8 space-y-3">
              {["Reads your MSP, LOS, and escrow analysis automatically","Identifies the root cause — tax change, late statement, fee error","Drafts the compliant borrower response, sourced and cited"].map((item, i) => (
                <div key={item} data-reveal="left" data-delay={String(i+3)} className="flex items-start gap-3">
                  <span className="h-px w-4 bg-white/40 mt-2.5 flex-shrink-0" />
                  <p className={`${T.sm} text-white/72`}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-7" data-reveal data-delay="1">
            <div className="border border-white/10 bg-black/50 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <span className="flex items-center gap-2 text-xs text-white/58">
                  <span className="relative h-1.5 w-1.5"><span className="absolute inset-0 rounded-full bg-white/50 ping" /><span className="relative block h-1.5 w-1.5 rounded-full bg-white/80" /></span>
                  Day 3 of 30 · awaiting sign-off
                </span>
                <span className="text-[11px] text-white/55">L-1003 · Aisha Khan · Escrow shortage · RESPA</span>
              </div>
              <div className="grid grid-cols-3 divide-x divide-white/10">
                {[
                  { label:"Dispute type",   val:"Escrow",    delta:"Shortage",     dc:"text-white/45" },
                  { label:"Root cause",     val:"Tax rise",  delta:"+ late stmt",  dc:"text-white/80" },
                  { label:"SLA remaining",  val:"27 days",   delta:"On track",     dc:"text-white/80" },
                ].map(({ label, val, delta, dc }) => (
                  <div key={label} className="group px-5 py-6 hover:bg-white/4 transition-colors">
                    <p className={`${T.label} text-white/40`}>{label}</p>
                    <p className="mt-2 sf text-[28px] text-white transition-transform duration-300 group-hover:-translate-y-0.5">{val}</p>
                    <p className={`mt-1 text-xs ${dc}`}>{delta}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 px-6 py-5">
                <p className={`${T.label} text-white/35 mb-2`}>Recommended resolution</p>
                <p className={`${T.sm} text-white/88`}>Waive the $240 late fee and re-issue the corrected escrow analysis. Tax increase raised the payment; the annual statement went out 4 days late. Draft response prepared — in plain language, RESPA-compliant.</p>
              </div>
              <div className="border-t border-white/10 px-6 py-4 flex items-center gap-3">
                <button className={`rounded-sm bg-white px-4 py-2 ${T.label} text-[#1E1610] hover:opacity-90 transition-opacity`}>Approve &amp; send</button>
                <button className={`rounded-sm border border-white/20 px-4 py-2 ${T.label} text-white/75 hover:bg-white/8 transition-colors`}>Edit draft</button>
                <span className="ml-auto text-[10px] text-white/28">Nothing sent until you approve</span>
              </div>
            </div>
            <div className="mt-3 border border-white/8 divide-y divide-white/8">
              {[
                { time:"Day 1",   signal:"Complaint received via borrower portal — classified as escrow shortage, RESPA" },
                { time:"Day 2",   signal:"Loan file pulled — escrow analysis, tax statement, payment history assembled" },
                { time:"Day 3",   signal:"Root cause confirmed — draft response and fee waiver prepared, awaiting approval" },
              ].map(({ time, signal }) => (
                <div key={signal} className="group flex items-start gap-4 px-5 py-3.5 hover:bg-white/4 transition-colors">
                  <span className="text-[10px] text-white/32 flex-shrink-0 mt-0.5 w-14">{time}</span>
                  <p className={`${T.sm} text-white/60 group-hover:text-white/80 transition-colors`}>{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[900px] px-6 py-24 md:py-28 text-center">
          <span data-reveal className="sf text-[96px] leading-none text-[#1E1610]/18 block -mb-6">"</span>
          <p className={`sf ${T.h2} tracking-tight text-[#1E1610]`} data-reveal data-delay="1">The model never decides. Your rulebook does. The human signs off. That is the only architecture that survives a CFPB exam.</p>
          <p className={`mt-8 ${T.sm} text-[#6B5E4F]`} data-reveal data-delay="2">— Governance principle · Dispute resolution</p>
          <div className="mx-auto mt-6 ochre-rule w-28" data-reveal data-delay="3" />
        </div>
      </section>

      {/* BUSINESS CASE */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>The business case</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Measured. Attributed. Defensible.</h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Agree the baseline before deployment. Measure SLA adherence, cost per dispute, and exam-readiness in production. Expand when the numbers make the case.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E8DFD3] border border-[#E8DFD3]">
            {businessMetrics.map(({ val, top, bottom }, i) => (
              <div key={val} data-stat data-delay={String(i+1)}
                className="group bg-[#F9F5F1] px-8 py-10 hover:bg-[#1E1610] hover:text-white transition-all duration-400 cursor-default">
                <p className={`sf ${T.h1} tracking-tight`}>{val}</p>
                <div className="mt-5 h-px w-8 bg-[#1E1610] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <p className={`mt-4 font-medium ${T.sm} text-[#1E1610] group-hover:text-white transition-colors`}>{top}</p>
                <p className={`mt-1 ${T.sm} text-[#6B5E4F] group-hover:text-white/55 transition-colors`}>{bottom}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Roadmap</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Start with one dispute type. Prove value in weeks.</h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">One dispute type, a focused team, and the systems needed to make it work. Measure the impact, then expand from proof.</p>
            </div>
          </div>
          <div>
            {roadmap.map((r, i) => (
              <div key={i} data-reveal="left" data-delay={String(i+1)}
                className="group grid md:grid-cols-12 gap-4 border-t border-[#E8DFD3] py-7 items-baseline -mx-6 px-6 hover:bg-[#F1EBE1] transition-all duration-200 hover:pl-8">
                <div className="md:col-span-2"><span className="text-[11px] text-[#1E1610]">STEP {r.step}</span></div>
                <div className="md:col-span-3">
                  <h3 className={`sf ${T.h4}`}>{r.phase}</h3>
                  <p className="mt-1 text-[10px] text-[#6B5E4F] tracking-widest">{r.timing}</p>
                </div>
                <div className="md:col-span-7"><p className={`${T.body} text-[#6B5E4F]`}>{r.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Trust &amp; sovereignty</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Built to pass second-line review.</h2>
              <p className={`mt-5 ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Your compliance officer reads landing pages too — and we designed this one for them.</p>
              <div className="mt-10 space-y-5">
                {[
                  { title:"The model never decides",       body:"The verdict is recomputed server-side against your rulebook. The LLM drafts — your policy decides." },
                  { title:"Human on every action",          body:"No borrower letter is sent without specialist sign-off. No shadow decisions. No autonomous sends." },
                  { title:"Auditable, every step",          body:"Provenance on every figure. Versioned, attributed, and exportable to your evidence store." },
                ].map(({ title, body }, i) => (
                  <div key={title} data-reveal="left" data-delay={String(i+3)} className="border-l-2 border-[#1E1610] pl-4 transition-all duration-300 hover:pl-6">
                    <p className={`font-medium ${T.sm} text-[#1E1610]`}>{title}</p>
                    <p className={`mt-1 ${T.sm} text-[#6B5E4F]`}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="flex flex-wrap gap-2 mb-8">
                {creds.map((c, i) => (
                  <span key={c} data-reveal data-delay={String(i+1)}
                    className="flex items-center gap-1.5 border border-[#E8DFD3] bg-[#F9F5F1] px-3 py-1.5 text-xs text-[#6B5E4F] hover:border-[#1E1610] hover:text-[#1E1610] transition-colors cursor-default">
                    <span className="text-[#1E1610]">✓</span>{c}
                  </span>
                ))}
              </div>
              <div data-reveal className="overflow-x-auto border border-[#E8DFD3]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F9F5F1]">
                      <th className={`px-5 py-4 text-left ${T.label} text-[#6B5E4F] font-medium w-[32%]`}>Guarantee</th>
                      <th className={`px-5 py-4 text-left ${T.label} text-[#6B5E4F] font-medium w-[30%]`}>How it shows up</th>
                      <th className={`px-5 py-4 text-left ${T.label} text-[#1E1610] font-medium`}>What the reviewer gets</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFD3]">
                    {trustRows.map((r, i) => (
                      <tr key={i} className="hover:bg-[#F9F5F1] transition-colors">
                        <td className="px-5 py-4 align-top text-[#6B5E4F] text-xs">{r.g}</td>
                        <td className="px-5 py-4 align-top text-[#6B5E4F] text-xs">{r.how}</td>
                        <td className="px-5 py-4 align-top font-medium text-[#1E1610] text-xs">{r.what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4" data-reveal>
                <a href="mailto:security@madison.ai" className={`group inline-flex items-center gap-2 border border-[#E8DFD3] bg-[#F9F5F1] px-4 py-2.5 ${T.sm} hover:bg-white hover:border-[#1E1610] transition-all`}>
                  Request the security &amp; compliance pack <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>FAQ</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">The six questions your compliance team will ask.</h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Straight answers to the questions that slow every enterprise AI evaluation down.</p>
            </div>
          </div>
          <div className="border-t border-[#E8DFD3]">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} data-reveal data-delay={String((i%3)+1)}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-8 py-6 text-left -mx-6 px-6 hover:bg-[#F1EBE1] transition-colors">
                    <div className="flex items-start gap-5">
                      <span className="text-[11px] text-[#1E1610] flex-shrink-0 mt-0.5">0{i+1}</span>
                      <span className={`${T.body} font-medium text-[#1E1610]`}>{faq.q}</span>
                    </div>
                    <span className={`flex-shrink-0 grid h-7 w-7 place-items-center rounded-full border transition-all duration-300 ${isOpen ? "border-[#1E1610] bg-[#1E1610] text-white rotate-45" : "border-[#E8DFD3] text-[#6B5E4F]"}`}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 1v8M1 5h8"/></svg>
                    </span>
                  </button>
                  <div ref={el => { faqBodyRefs.current[i] = el; }}
                    className="overflow-hidden transition-all duration-400 ease-in-out border-b border-[#E8DFD3]"
                    style={{ maxHeight:isOpen ? (faqBodyRefs.current[i]?.scrollHeight ?? 200)+"px" : "0px", opacity:isOpen ? 1 : 0 }}>
                    <div className="pb-6 pl-[52px] pr-6">
                      <p className={`${T.body} text-[#6B5E4F]`}>{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 text-center">
            <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Design-partner pilot · open</p>
            <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">See it on your own dispute types.</h2>
            <p className={`mt-5 ${T.lead} text-[#6B5E4F] max-w-xl mx-auto`} data-reveal data-delay="2">30 minutes on synthetic data that mirrors your loan book. No integration to start. Bring your hardest dispute type.</p>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-3" data-reveal data-delay="3">
              <a href="mailto:hello@madison.ai" className={BTN.primary}>
                Book a walkthrough <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="mailto:security@madison.ai" className={BTN.secondary}>
                Request the security pack
              </a>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className={`${T.label} text-[#6B5E4F] mb-6`} data-reveal>What to expect</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { n:"30-min working session",      d:"With a servicing specialist on your team — no slides, just the product on your data." },
                  { n:"Live dispute on real data",    d:"One of your actual (masked) disputes shown end to end in the Decision Inbox." },
                  { n:"Reference architecture",       d:"For your CISO — security, data residency, and control plane layout." },
                  { n:"Scoping doc within 48h",       d:"Named dispute type, agreed SLA baseline, one workflow in production." },
                ].map(({ n, d }, i) => (
                  <div key={n} data-reveal data-delay={String(i+1)}
                    className="group border border-[#E8DFD3] bg-[#F9F5F1] p-6 hover:border-[#1E1610] hover:shadow-sm transition-all duration-300">
                    <p className={`font-medium ${T.sm} text-[#1E1610]`}>{n}</p>
                    <p className={`mt-2 ${T.sm} text-[#6B5E4F] leading-snug`}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="md:col-span-5 border border-[#E8DFD3] bg-[#F9F5F1] p-8 self-start" data-reveal data-delay="2">
              <p className={`${T.label} text-[#6B5E4F]`}>Who it fits</p>
              <dl className="mt-6 divide-y divide-[#E8DFD3]">
                {[
                  { dt:"Institution", dd:"US bank or credit union" },
                  { dt:"Size",        dd:"$1B–$10B in assets" },
                  { dt:"Owner",       dd:"Head of Mortgage Servicing" },
                  { dt:"Co-signer",   dd:"Chief Compliance Officer" },
                  { dt:"Autonomy",    dd:"Recommend · human approves" },
                ].map(({ dt, dd }) => (
                  <div key={dt} className="flex items-center justify-between py-3.5">
                    <dt className={`${T.sm} text-[#6B5E4F]`}>{dt}</dt>
                    <dd className={`${T.sm} font-medium text-right`}>{dd}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 pt-5 border-t border-[#E8DFD3]">
                <p className={`${T.sm} text-[#6B5E4F]`}>Three partners per cohort per region. No procurement gate required to start.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#1E1610" }} className="text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <button onClick={() => navigate("home")} className="sf text-[30px] hover:opacity-70 transition-opacity">Madison</button>
            <p className={`mt-3 max-w-sm ${T.sm} text-white/55 leading-relaxed`}>The Agentic Banking OS — governed AI agents for banks and credit unions. Built on Lyzr.</p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {[
              { heading:"Platform",     links:["Platform","Solutions","Governance","Live demo"] },
              { heading:"Company",      links:["About","Pricing","Privacy","For developers"] },
              { heading:"Get in touch", links:["Book a demo","Talk to our team","Security overview"] },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <p className={`${T.label} text-white/38`}>{heading}</p>
                <ul className="mt-4 space-y-2.5">
                  {links.map(l => <li key={l}><a href="#" className={`${T.sm} text-white/70 hover:text-white transition-colors`}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-[1400px] px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-[10px] text-white/35">
            <p>© 2026 Madison. All rights reserved. Madison is built on the Lyzr platform.</p>
            <p>Built for New York, deployed worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
