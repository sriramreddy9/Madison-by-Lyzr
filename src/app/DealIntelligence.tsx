import { useState, useEffect, useRef } from "react";

/* ── images (canonical folder IDs from App.tsx) ── */
const HERO_IMG  = "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/942f099b-dfbb-44cf-ad86-dfb8f36a6a31/hero-ny.jpg";
const BRIEF_IMG = "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/bb3591ba-d458-49ba-88de-e831d343d9d7/back-office.jpg";
const GOV_IMG   = "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/22509f6d-0850-4622-b385-5e7e23f65cc4/governance.jpg";

/* ── type scale: major third, H1 = 48px ── */
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
  h1,h2,h3,h4{font-family:'Playfair Display',serif;letter-spacing:-.02em}
  body{font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;background:#F9F5F1}
  .sf{font-family:'Playfair Display',serif;letter-spacing:-.02em}
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
  .ws-accent::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:#1E1610;transform:scaleY(0);transform-origin:bottom;transition:transform .35s cubic-bezier(.16,1,.3,1)}
  .ws-accent.on::before,.ws-accent:hover::before{transform:scaleY(1)}
  .tab-content{transition:opacity .18s ease,transform .18s ease}
  .tab-content.out{opacity:0;transform:translateY(8px)}
  .tab-content.in{opacity:1;transform:none}
`;

/* ── data ── */
const workflows = [
  {
    n:"01", title:"Strategic Company Evaluation",
    who:"CorpDev · Strategy · Ventures · Innovation",
    output:"Company profile, strategic fit, recommendation",
    why:"Faster evaluation of fintechs, vendors, and targets",
    tags:["Company profile","Strategic fit","Recommendation","Memo","Evidence pack"],
  },
  {
    n:"02", title:"Investment Banking Workbench",
    who:"IB · M&A · Capital Markets · Analysts",
    output:"Research synthesis, buyer universe, pitch deck",
    why:"Reduces analyst effort in research-heavy workflows",
    tags:["Research synthesis","Buyer universe","Pitch deck","Comp table","IC materials"],
  },
  {
    n:"03", title:"Bank-to-Bank Partnership Intelligence",
    who:"Strategy · Partnerships · CEO Office",
    output:"Bank profile, partnership thesis, synergy map",
    why:"Evaluates banks for partnership or collaboration",
    tags:["Bank profile","Partnership thesis","Synergy map","Regulatory fit"],
  },
  {
    n:"04", title:"Vendor / Fintech Evaluation",
    who:"Digital Banking · CIO · COO · Innovation",
    output:"Vendor brief, risk summary, next action",
    why:"Supports modernisation decisions without the committee overhead",
    tags:["Vendor brief","Risk summary","TPRM readiness","Next action"],
  },
  {
    n:"05", title:"Credit & Counterparty Evidence Support",
    who:"Risk · Credit · Treasury",
    output:"Ratings summary, credit-readiness evidence pack",
    why:"Supports adjacent risk review with structured evidence",
    tags:["Ratings summary","Credit readiness","Evidence pack","Source trail"],
  },
];

const stackLayers = [
  { layer:"Market & deal data",     systems:"PitchBook · CapIQ · CB Insights · Crunchbase · FactSet · Bloomberg · LSEG",  role:"Profiles, funding, financials, signals" },
  { layer:"Research & knowledge",   systems:"AlphaSense · Filings · Analyst reports · News",                               role:"Synthesis, competitor intelligence, diligence" },
  { layer:"CRM & relationships",    systems:"Salesforce · nCino · Dynamics · HubSpot",                                     role:"Relationships, deal status, account notes" },
  { layer:"Documents & memory",     systems:"SharePoint · OneDrive · Box · Drive · Confluence · Notion",                   role:"Prior memos, IC materials, strategy docs" },
  { layer:"Data infrastructure",    systems:"Snowflake · Databricks · BigQuery · Redshift",                                role:"Internal performance and portfolio data" },
  { layer:"Outputs",                systems:"PowerPoint · Word · PDF · Excel · CRM records",                               role:"Decks, memos, evidence packs, reports" },
  { layer:"Governance",             systems:"SSO · RBAC · Audit logs · Data residency",                                    role:"Permissioned access, traceability" },
];

const govRows = [
  { need:"Access control",         how:"Role-based access, source-level permissions, retrieval-time checks" },
  { need:"Internal data",          how:"Bank-controlled access, no cross-domain memory leakage" },
  { need:"Human accountability",   how:"Human review before decisions are acted on" },
  { need:"Auditability",           how:"Every recommendation carries evidence, rationale, source trail, and approval state" },
  { need:"Model-risk support",     how:"Explainable reasoning, confidence indicators, review logs" },
  { need:"Procurement readiness",  how:"Designed for SOC 2, TPRM, deployment, and data residency review" },
  { need:"Domain isolation",       how:"CorpDev, IB, Risk, and Marketing memory remain separated" },
];

const deployPhases = [
  { step:"01", phase:"Design Partner Pilot",  timing:"Start today",    desc:"Uses uploaded documents, approved external data exports, and public filings. You receive: company evaluation, memo, evidence pack, pitch-style deck." },
  { step:"02", phase:"Data Integration",      timing:"Weeks 3–6",      desc:"Connectors to PitchBook, CapIQ, AlphaSense, CRM, SharePoint. You receive: automated profiles, prior evaluation retrieval, relationship context." },
  { step:"03", phase:"Workflow Integration",  timing:"Weeks 7–12",     desc:"CRM write-back, deal watchlists, approval workflows, PowerPoint/PDF/Word outputs. You receive: repeatable decision workflow across CorpDev, Strategy, and IB." },
  { step:"04", phase:"Enterprise Deployment", timing:"From week 12",   desc:"SI-led implementation, cloud/VPC/on-prem options, governance controls. You receive: bank-wide permissioned Deal Intelligence OS." },
];

const problemRows = [
  { state:"External data in multiple platforms",    impact:"Analysts manually connect dots" },
  { state:"Internal context in CRM / SharePoint",   impact:"Teams miss prior evaluations" },
  { state:"Memos rebuilt from scratch",             impact:"Time spent formatting, not deciding" },
  { state:"Prior decisions not reusable",           impact:"Each evaluation starts from zero" },
  { state:"AI tools summarise, not contextualise",  impact:"Outputs are faster, not necessarily smarter" },
];

const navTeams = [
  { label:"Commercial Banking" },
  { label:"Retail Banking" },
  { label:"Deal Intelligence",     active:true },
  { label:"Compliant Marketing" },
  { label:"Underwriting",          soon:true },
  { label:"KYC",                   soon:true },
  { label:"Risk & Compliance" },
  { label:"Reconciliations",       soon:true },
  { label:"Dispute Resolution" },
  { label:"HR" },
];

interface Props { navigate: (page: string) => void; }

export default function DealIntelligence({ navigate }: Props) {
  const [navScrolled,  setNavScrolled]  = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [activeWf,     setActiveWf]     = useState(0);
  const [tabFade,      setTabFade]      = useState(true);
  const [heroParallax, setHeroParallax] = useState(0);

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

  const switchWf = (i: number) => {
    if (i === activeWf) return;
    setTabFade(false);
    setTimeout(() => { setActiveWf(i); setTabFade(true); }, 180);
  };

  const navUL = "relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-px after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans',sans-serif", background: "#F9F5F1", color: "#1E1610" }}>
      <style>{SHARED_CSS}</style>

      {/* ══ NAV ══ */}
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-400 ${navScrolled ? "border-[#E8DFD3] bg-[#F9F5F1]/92 text-[#1E1610]" : "border-transparent text-white"}`}
        style={{ backdropFilter: navScrolled ? "saturate(160%) blur(12px)" : "none" }}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <button onClick={() => navigate("home")} className="sf text-[24px] tracking-tight hover:opacity-70 transition-opacity">Madison</button>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            {["Platform", "Coverage", "Solutions"].map(l => (
              <button key={l} onClick={() => navigate("home")} className={navUL}>{l}</button>
            ))}
            <div className="group relative">
              <button className={`inline-flex items-center gap-1 ${navUL} after:scale-x-100`}>
                For your team
                <svg className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 8l5 5 5-5" /></svg>
              </button>
              <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute left-1/2 top-full mt-4 w-[520px] -translate-x-1/2 border border-[#E8DFD3] bg-[#F9F5F1] p-4 text-[#1E1610] shadow-[0_30px_80px_-30px_rgba(0,0,0,.30)] transition-all duration-250">
                <p className={`mb-3 px-2 ${T.label} text-[#6B5E4F]`}>For your team</p>
                <ul className="grid grid-cols-2 gap-0.5 text-sm">
                  {navTeams.map(t => (
                    <li key={t.label}>
                      <button
                        onClick={() => {
                          if (t.label === "Commercial Banking") navigate("commercial-banking");
                          else if (t.label === "Retail Banking") navigate("retail-banking");
                          else if (t.label === "Compliant Marketing") navigate("compliant-marketing");
                          else if (t.label === "Risk & Compliance") navigate("risk-compliance");
                          else if (t.label === "Dispute Resolution") navigate("dispute-resolution");
                            else if (t.label === "HR") navigate("hr");
                          else if (!t.soon && !t.active) navigate("home");
                        }}
                        className={`w-full flex items-center justify-between rounded-sm px-3 py-2.5 transition-colors text-left ${t.active ? "bg-[#1E1610] text-white cursor-default" : "hover:bg-[#F1EBE1]"}`}>
                        {t.label}
                        {t.soon && <span className="rounded-full border border-[#E8DFD3] px-2 py-0.5 text-[9px] uppercase tracking-widest text-[#6B5E4F]">Soon</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {["Governance", "Advisors"].map(l => (
              <button key={l} onClick={() => navigate("home")} className={navUL}>{l}</button>
            ))}
          </nav>

          <a href="#contact" className="hidden rounded-sm border border-current px-4 py-2 text-xs tracking-wide md:inline-flex hover:opacity-70 transition-opacity">Request a demo</a>
          <button onClick={() => setMobileOpen(v => !v)} aria-label="Menu" className="md:hidden h-9 w-9 grid place-items-center border border-current rounded-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-[#E8DFD3]/40 bg-[#F9F5F1] text-[#1E1610] md:hidden">
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col gap-1 text-sm">
              <button onClick={() => { navigate("home"); setMobileOpen(false); }} className="py-2 border-b border-[#E8DFD3] text-left">← Home</button>
              <button onClick={() => { navigate("commercial-banking"); setMobileOpen(false); }} className="py-2 border-b border-[#E8DFD3] text-left">Commercial Banking</button>
              <button onClick={() => { navigate("retail-banking"); setMobileOpen(false); }} className="py-2 border-b border-[#E8DFD3] text-left">Retail Banking</button>
              {["Governance", "Advisors"].map(l => (
                <button key={l} onClick={() => { navigate("home"); setMobileOpen(false); }} className="py-2 border-b border-[#E8DFD3] text-left last:border-0">{l}</button>
              ))}
              <a href="#contact" className="mt-3 inline-flex rounded-sm border border-[#1E1610] px-4 py-2 text-xs w-fit" onClick={() => setMobileOpen(false)}>Request a demo</a>
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        <div className={`transition-all duration-400 ${navScrolled ? "border-t border-[#E8DFD3]/60" : "border-t border-white/15"}`}>
          <div className="mx-auto max-w-[1400px] px-6 py-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em]">
            <button onClick={() => navigate("home")} className="opacity-55 hover:opacity-100 transition-opacity">For your team</button>
            <span className="opacity-35">›</span>
            <span className="text-[#1E1610]">Deal Intelligence</span>
          </div>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section className="relative isolate overflow-hidden text-white min-h-[94vh] flex items-end">
        <img src={HERO_IMG} alt="Deal Intelligence" className="absolute inset-0 -z-10 h-full w-full object-cover will-change-transform"
          style={{ transform: `translateY(${heroParallax}px)`, transformOrigin: "center top" }} />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(155deg,rgba(0,0,0,.92) 0%,rgba(0,0,0,.62) 55%,rgba(0,0,0,.18) 100%)" }} />
        <div className="absolute inset-0 -z-10 grid-lines opacity-30" />
        <div className="absolute left-6 top-20 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1E1610]/35 to-transparent hidden lg:block" />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-40 md:pb-28 md:pt-52">
          <div className="max-w-[820px]">
            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/6 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/80 backdrop-blur-sm fade-up">
              <span className="relative h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-[#1E1610] ping" />
                <span className="relative block h-1.5 w-1.5 rounded-full bg-[#1E1610]" />
              </span>
              Madison / Spotlight · Deal Intelligence
            </p>
            <h1 className={`sf ${T.h1} tracking-tight fade-up-2`}>
              Deal Intelligence<br /><em className="italic text-white/78">for Banks.</em>
            </h1>
            <p className={`mt-7 max-w-xl ${T.lead} text-white/78 fade-up-3`}>
              Evaluate companies, partners, targets, and pitch opportunities with evidence, context, and institutional memory.
            </p>
            <p className={`mt-3 ${T.sm} text-white/50 fade-up-3`}>
              CorpDev · Strategy · Partnerships · Ventures · Innovation · Investment Banking
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 fade-up-3">
              <a href="#contact" className={BTN.primary}>
                <span className="relative z-10">Request a demo</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#workflows" className={BTN.ghost}>
                Explore workflows
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2">
              {["Partner","Invest","Acquire","Monitor","Pass"].map(r => (
                <span key={r} className="flex items-center gap-2 text-[12px] text-white/58">
                  <span className="h-2.5 w-2.5 rounded-full border border-[#1E1610]/60 bg-[#1E1610]/20" />{r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E8DFD3]">
          {[
            { val: "5",    label: "Data platforms teams manually connect today" },
            { val: "Zero", label: "Reuse from prior evaluations without Spotlight" },
            { val: "9",    label: "Automated steps from brief to decision-ready output" },
            { val: "One",  label: "Decision brain for all five deal workflows" },
          ].map(({ val, label }, i) => (
            <div key={i} data-stat data-delay={String(i + 1)} className="group px-8 py-12 hover:bg-[#F1EBE1] transition-colors cursor-default">
              <p className={`sf ${T.h1} tracking-tight`}>{val}</p>
              <p className={`mt-3 ${T.sm} text-[#6B5E4F]`}>{label}</p>
              <div className="mt-5 h-px w-8 bg-[#1E1610] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* ══ THE WHITE SPACE ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className={`${T.label} text-[#6B5E4F]`} data-reveal>The white space</p>
            <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Banks have data.<br />They do not have<br />decision intelligence.</h2>
            <p className={`mt-6 ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Teams operate across PitchBook, CapIQ, AlphaSense, CRM, SharePoint, and prior memos — but the workflow is fragmented and each evaluation starts from zero.</p>
            <div className="mt-8 border border-[#E8DFD3] bg-[#F9F5F1] p-6" data-reveal data-delay="3">
              <p className={`${T.label} text-[#6B5E4F] mb-4`}>What Spotlight resolves</p>
              <p className={`sf ${T.h4} text-[#1E1610]`}>"The bank's own permissioned Deal Intelligence system."</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Evidence-backed","Bank memory","Human review","Permissioned","Reusable"].map(b => (
                  <span key={b} className="flex items-center gap-1.5 border border-[#E8DFD3] px-3 py-1.5 text-xs text-[#6B5E4F]">
                    <span className="text-[#1E1610]">✓</span>{b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <p className={`${T.label} text-[#6B5E4F] mb-5`} data-reveal>Current state → business impact</p>
            <div className="border border-[#E8DFD3] overflow-hidden" data-reveal data-delay="1">
              <div className="grid grid-cols-2 bg-[#F9F5F1] border-b border-[#E8DFD3]">
                <div className={`px-5 py-3 ${T.label} text-[#6B5E4F]`}>Current state</div>
                <div className={`px-5 py-3 ${T.label} text-[#1E1610] border-l border-[#E8DFD3]`}>Business impact</div>
              </div>
              {problemRows.map(({ state, impact }, i) => (
                <div key={i} className="grid grid-cols-2 border-b border-[#E8DFD3] last:border-0 hover:bg-[#F9F5F1] transition-colors">
                  <div className={`px-5 py-4 ${T.sm} text-[#6B5E4F]`}>{state}</div>
                  <div className={`px-5 py-4 ${T.sm} text-[#1E1610] border-l border-[#E8DFD3]`}>{impact}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-px bg-[#E8DFD3] border border-[#E8DFD3]" data-reveal data-delay="2">
              {[
                { icon:"🏦", label:"CorpDev & Strategy" },
                { icon:"📊", label:"Investment Banking" },
                { icon:"🤝", label:"Partnerships & Innovation" },
              ].map(({ icon, label }) => (
                <div key={label} className="bg-[#F9F5F1] px-5 py-4 flex items-center gap-3 hover:bg-white transition-colors">
                  <span className="text-lg">{icon}</span>
                  <span className={`${T.sm} text-[#6B5E4F]`}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHAT IT DOES (dark) ══ */}
      <section className="relative overflow-hidden border-b border-[#E8DFD3]" style={{ background: "#1E1610" }}>
        <div className="absolute inset-0 grid-lines opacity-22" />
        <div className="absolute inset-0 opacity-10"><img src={BRIEF_IMG} className="h-full w-full object-cover" alt="" /></div>
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-5 text-white">
            <p className={`${T.label} text-white/45 flex items-center gap-2`} data-reveal>
              <span className="relative h-2 w-2"><span className="absolute inset-0 rounded-full bg-[#1E1610] ping" /><span className="relative block h-2 w-2 rounded-full bg-[#1E1610]" /></span>
              Spotlight · Evaluation workflow
            </p>
            <h2 className={`mt-6 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">One brief in.<br />Decision-ready output out.</h2>
            <p className={`mt-5 ${T.lead} text-white/68`} data-reveal data-delay="2">The next evaluation starts smarter because the bank remembers the last one.</p>
            <div className="mt-8 space-y-3" data-reveal data-delay="3">
              {["Builds the company profile from structured and unstructured sources", "Maps opportunity to the bank's strategic priorities", "Checks prior evaluations, memos, and relationship history", "Recommends: Partner / Invest / Acquire / Monitor / Pass", "Produces memo, one-pager, evidence pack, or pitch-style deck"].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[10px] text-[#1E1610] mt-0.5 flex-shrink-0 w-4">{String(i + 1).padStart(2, "0")}</span>
                  <p className={`${T.sm} text-white/72`}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-7" data-reveal data-delay="1">
            <div className="border border-white/10 bg-black/50 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <span className="flex items-center gap-2 text-xs text-white/58">
                  <span className="relative h-1.5 w-1.5"><span className="absolute inset-0 rounded-full bg-[#1E1610] ping" /><span className="relative block h-1.5 w-1.5 rounded-full bg-[#1E1610]" /></span>
                  Spotlight · Running evaluation
                </span>
                <span className="text-[11px] text-white/45">PaymentsFintech Inc. — Strategic fit</span>
              </div>

              <div className="px-6 py-5 border-b border-white/10 space-y-3">
                {[
                  { step:"01", label:"Company profile built",         done:true  },
                  { step:"02", label:"Market & financial context",    done:true  },
                  { step:"03", label:"Strategic priorities mapped",   done:true  },
                  { step:"04", label:"Prior evaluations retrieved",   done:true  },
                  { step:"05", label:"Risks & objections surfaced",   done:false, running:true },
                  { step:"06", label:"Recommendation generated",      done:false  },
                  { step:"07", label:"Memo & evidence pack produced", done:false  },
                ].map(({ step, label, done, running }) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className={`text-[10px] flex-shrink-0 w-5 ${done ? "text-[#1E1610]" : running ? "text-white/80" : "text-white/25"}`}>{step}</span>
                    <span className={`${T.sm} transition-colors ${done ? "text-white/85" : running ? "text-white" : "text-white/28"}`}>{label}</span>
                    {done && <span className="ml-auto text-[#1E1610] text-xs">✓</span>}
                    {running && <span className="ml-auto pulse-dot h-1.5 w-1.5 rounded-full bg-white flex-shrink-0" />}
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 px-6 py-5">
                <p className={`${T.label} text-white/35 mb-2`}>Preliminary signal</p>
                <p className={`${T.sm} text-white/88`}>Strong strategic fit for commercial banking distribution. Two prior evaluations on file — last reviewed 14 months ago. Recommend updating with Q4 financials before IC presentation.</p>
              </div>
              <div className="border-t border-white/10 px-6 py-4 flex items-center gap-3">
                <button className={`rounded-sm bg-white px-4 py-2 ${T.label} text-[#1E1610] hover:opacity-90 transition-opacity`}>Open full brief</button>
                <button className={`rounded-sm border border-white/20 px-4 py-2 ${T.label} text-white/75 hover:bg-white/8 transition-colors`}>Send for review</button>
                <span className="ml-auto text-[10px] text-white/28">Human review required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CORE WORKFLOWS ══ */}
      <section id="workflows" className="border-b border-[#E8DFD3] scroll-mt-20">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Core workflows</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Five deal-intelligence workflows.<br />One decision brain.</h2>
            </div>
            <div className="md:col-span-8 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F] max-w-lg`} data-reveal data-delay="2">Start with the workflow that matters most. All five share the same intelligence layer, the same memory, and the same governance rails.</p>
            </div>
          </div>

          <div data-reveal className="grid md:grid-cols-12 gap-0 border border-[#E8DFD3]">
            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-[#E8DFD3] divide-y divide-[#E8DFD3]">
              {workflows.map((wf, i) => (
                <button key={i} onClick={() => switchWf(i)}
                  className={`ws-accent relative w-full text-left px-7 py-5 transition-all duration-300 ${activeWf === i ? "on bg-[#1E1610] text-white" : "bg-[#F9F5F1] hover:bg-[#F1EBE1]"}`}>
                  <span className={`${T.label} block mb-1.5 transition-colors ${activeWf === i ? "text-[#1E1610]" : "text-[#6B5E4F]"}`}>{wf.n}</span>
                  <span className="sf text-[17px] leading-snug block">{wf.title}</span>
                  <p className={`mt-0.5 ${T.sm} ${activeWf === i ? "text-white/55" : "text-[#6B5E4F]"}`}>{wf.who}</p>
                </button>
              ))}
            </div>

            <div className="md:col-span-8 bg-[#F9F5F1]">
              <div className={`p-8 md:p-10 tab-content ${tabFade ? "in" : "out"}`}>
                <div className="flex items-start justify-between mb-7">
                  <div>
                    <span className={`${T.label} text-[#1E1610]`}>{workflows[activeWf].n}</span>
                    <h3 className={`sf ${T.h3} mt-1`}>{workflows[activeWf].title}</h3>
                    <p className={`mt-2 ${T.sm} text-[#6B5E4F]`}>{workflows[activeWf].who}</p>
                  </div>
                  <span className="h-px w-10 bg-[#1E1610] flex-shrink-0 mt-6" />
                </div>
                <div className="grid sm:grid-cols-2 gap-6 mb-7">
                  <div className="border border-[#E8DFD3] bg-[#F1EBE1] p-5">
                    <p className={`${T.label} text-[#6B5E4F] mb-2`}>Output</p>
                    <p className={`${T.sm} text-[#1E1610]`}>{workflows[activeWf].output}</p>
                  </div>
                  <div className="border border-[#E8DFD3] bg-[#F1EBE1] p-5">
                    <p className={`${T.label} text-[#6B5E4F] mb-2`}>Why it matters</p>
                    <p className={`${T.sm} text-[#1E1610]`}>{workflows[activeWf].why}</p>
                  </div>
                </div>
                <div>
                  <p className={`${T.label} text-[#6B5E4F] mb-3`}>Deliverables</p>
                  <div className="flex flex-wrap gap-2">
                    {workflows[activeWf].tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1.5 border border-[#E8DFD3] bg-[#F1EBE1] px-3 py-1.5 text-xs text-[#6B5E4F]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1E1610]" />{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-[#E8DFD3] flex items-center justify-between">
                  <p className={`${T.sm} text-[#6B5E4F]`}>Recommended starting workflow: Strategic Company Evaluation</p>
                  <a href="#contact" className={`group inline-flex items-center gap-2 border border-[#E8DFD3] px-4 py-2.5 ${T.sm} hover:border-[#1E1610] hover:text-[#1E1610] transition-all flex-shrink-0`}>
                    See it in action <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PULL QUOTE ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[900px] px-6 py-24 md:py-28 text-center">
          <span data-reveal className="sf text-[96px] leading-none text-[#1E1610]/18 block -mb-6">"</span>
          <p className={`sf ${T.h2} tracking-tight text-[#1E1610]`} data-reveal data-delay="1">External data can be bought. Internal decision memory has to be earned, protected, and compounded.</p>
          <p className={`mt-8 ${T.sm} text-[#6B5E4F]`} data-reveal data-delay="2">— Deal Intelligence · Differentiation principle</p>
          <div className="mx-auto mt-6 ochre-rule w-28" data-reveal data-delay="3" />
        </div>
      </section>

      {/* ══ THE BANKING STACK ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>The banking stack</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Not a replacement.<br />An intelligence layer<br />that sits above.</h2>
              <p className={`mt-5 ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Madison / Spotlight connects to the data sources and systems banks already trust — adding intelligence, not replacing infrastructure.</p>
            </div>
            <div className="md:col-span-7">
              <div className="border border-[#E8DFD3] overflow-hidden" data-reveal data-delay="1">
                <div className="grid grid-cols-3 bg-[#F9F5F1] border-b border-[#E8DFD3]">
                  <div className={`px-4 py-3 ${T.label} text-[#6B5E4F]`}>Layer</div>
                  <div className={`px-4 py-3 ${T.label} text-[#6B5E4F] border-l border-[#E8DFD3]`}>Systems</div>
                  <div className={`px-4 py-3 ${T.label} text-[#1E1610] border-l border-[#E8DFD3]`}>Role</div>
                </div>
                {stackLayers.map(({ layer, systems, role }, i) => (
                  <div key={i} data-reveal data-delay={String((i % 3) + 1)} className="grid grid-cols-3 border-b border-[#E8DFD3] last:border-0 hover:bg-[#F9F5F1] transition-colors group">
                    <div className={`px-4 py-3.5 ${T.sm} font-medium text-[#1E1610]`}>{layer}</div>
                    <div className={`px-4 py-3.5 ${T.sm} text-[#6B5E4F] border-l border-[#E8DFD3] leading-snug`}>{systems}</div>
                    <div className={`px-4 py-3.5 ${T.sm} text-[#6B5E4F] border-l border-[#E8DFD3]`}>{role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ GOVERNANCE ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Governance</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Explainable.<br />Permissioned.<br />Reviewable.</h2>
              <p className={`mt-5 ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Reuse the rails. Protect the memory.</p>
              <div className="mt-8 flex flex-wrap gap-2" data-reveal data-delay="3">
                {["SOC 2 Type II","TPRM ready","RBAC","SSO / SAML","Data residency","Human review","Audit logs","Domain isolation"].map((c, i) => (
                  <span key={c} className="flex items-center gap-1.5 border border-[#E8DFD3] bg-[#F1EBE1] px-3 py-1.5 text-xs text-[#6B5E4F] hover:border-[#1E1610] hover:text-[#1E1610] transition-colors cursor-default">
                    <span className="text-[#1E1610]">✓</span>{c}
                  </span>
                ))}
              </div>
              <div className="mt-8 aspect-[4/3] overflow-hidden border border-[#E8DFD3]" data-reveal data-delay="4">
                <img src={GOV_IMG} alt="Governance" className="h-full w-full object-cover hover:scale-105 transition-transform duration-[2s]" />
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="border border-[#E8DFD3] overflow-hidden" data-reveal data-delay="1">
                <div className="grid grid-cols-2 bg-[#F1EBE1] border-b border-[#E8DFD3]">
                  <div className={`px-5 py-3 ${T.label} text-[#6B5E4F]`}>Governance need</div>
                  <div className={`px-5 py-3 ${T.label} text-[#1E1610] border-l border-[#E8DFD3]`}>Our approach</div>
                </div>
                {govRows.map(({ need, how }, i) => (
                  <div key={i} data-reveal data-delay={String((i % 3) + 1)} className="grid grid-cols-2 border-b border-[#E8DFD3] last:border-0 hover:bg-[#F1EBE1] transition-colors">
                    <div className={`px-5 py-4 ${T.sm} font-medium text-[#1E1610]`}>{need}</div>
                    <div className={`px-5 py-4 ${T.sm} text-[#6B5E4F] border-l border-[#E8DFD3]`}>{how}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6" data-reveal>
                <a href="mailto:governance@madison.ai"
                  className={`group inline-flex items-center gap-2 border border-[#E8DFD3] bg-[#F1EBE1] px-4 py-2.5 ${T.sm} hover:bg-white hover:border-[#1E1610] transition-all`}>
                  Request the governance pack
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ DEPLOYMENT PATH ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Deployment path</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Start without integration.<br />Scale into the bank's environment.</h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Begin with uploaded documents and public filings. Scale into full data integrations and enterprise deployment at a pace your procurement and security teams can sustain.</p>
            </div>
          </div>
          <div>
            {deployPhases.map((r, i) => (
              <div key={i} data-reveal="left" data-delay={String(i + 1)}
                className="group grid md:grid-cols-12 gap-4 border-t border-[#E8DFD3] py-7 items-baseline -mx-6 px-6 hover:bg-[#F9F5F1] transition-all duration-200 hover:pl-8">
                <div className="md:col-span-2"><span className="text-[11px] text-[#1E1610]">PHASE {r.step}</span></div>
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

      {/* ══ CONTACT ══ */}
      <section id="contact" className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 text-center">
            <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Design-partner pilot · open</p>
            <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Build your bank's<br />Deal Intelligence layer.</h2>
            <p className={`mt-5 ${T.lead} text-[#6B5E4F] max-w-xl mx-auto`} data-reveal data-delay="2">Start with one workflow. Prove the loop. Expand into a Deal Intelligence OS. The next deal should be smarter than the last.</p>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-3" data-reveal data-delay="3">
              <a href="mailto:hello@madison.ai" className={BTN.primary}>
                Request a demo <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="mailto:hello@madison.ai" className={BTN.secondary}>
                Become a design partner
              </a>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className={`${T.label} text-[#6B5E4F] mb-6`} data-reveal>Three steps</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { n: "Start with one workflow", d: "Strategic Company Evaluation is the recommended starting point. No integration required." },
                  { n: "Prove the loop",           d: "Real evaluation. Real output. Compare to your current process with an agreed baseline." },
                  { n: "Expand into the OS",       d: "Add workflows, integrate data sources, scale to CorpDev, IB, and Partnerships." },
                ].map(({ n, d }, i) => (
                  <div key={n} data-reveal data-delay={String(i + 1)}
                    className="group border border-[#E8DFD3] bg-[#F1EBE1] p-6 hover:border-[#1E1610] hover:shadow-sm transition-all duration-300">
                    <span className="text-[11px] text-[#1E1610] block mb-3">0{i + 1}</span>
                    <p className={`font-medium ${T.sm} text-[#1E1610]`}>{n}</p>
                    <p className={`mt-2 ${T.sm} text-[#6B5E4F] leading-snug`}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="md:col-span-5 border border-[#E8DFD3] bg-[#F1EBE1] p-8 self-start" data-reveal data-delay="2">
              <p className={`${T.label} text-[#6B5E4F]`}>Who it fits</p>
              <dl className="mt-6 divide-y divide-[#E8DFD3]">
                {[
                  { dt: "Institution",  dd: "Bank, credit union, or investment firm" },
                  { dt: "Size",         dd: "$5B–$500B in assets" },
                  { dt: "Owner",        dd: "Head of CorpDev, Strategy, or IB" },
                  { dt: "Co-signer",    dd: "Chief Risk or Compliance Officer" },
                  { dt: "Starting with",dd: "Strategic Company Evaluation" },
                ].map(({ dt, dd }) => (
                  <div key={dt} className="flex items-center justify-between py-3.5">
                    <dt className={`${T.sm} text-[#6B5E4F]`}>{dt}</dt>
                    <dd className={`${T.sm} font-medium text-right`}>{dd}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 pt-5 border-t border-[#E8DFD3]">
                <p className={`${T.sm} text-[#6B5E4F]`}>No integration or procurement gate required to start.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#1E1610" }} className="text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <button onClick={() => navigate("home")} className="sf text-[30px] hover:opacity-70 transition-opacity">Madison</button>
            <p className={`mt-3 max-w-sm ${T.sm} text-white/55 leading-relaxed`}>The Agentic Banking OS — governed AI agents for banks and credit unions. Built on Lyzr.</p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {[
              { heading: "Platform",     links: ["Platform", "Solutions", "Governance", "Live demo"] },
              { heading: "Company",      links: ["About", "Pricing", "Privacy", "For developers"] },
              { heading: "Get in touch", links: ["Book a demo", "Talk to our team", "Security overview"] },
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
