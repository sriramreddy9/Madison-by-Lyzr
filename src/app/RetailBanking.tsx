import { useState, useEffect, useRef } from "react";

const HERO_IMG = "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/bb3591ba-d458-49ba-88de-e831d343d9d7/back-office.jpg";
const GOV_IMG  = "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/22509f6d-0850-4622-b385-5e7e23f65cc4/governance.jpg";
const FRONT_IMG= "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/50ac8218-ba9d-4b18-845e-a62283c840d4/front-office.jpg";

/* ── shared style constants — mirror CommercialBanking exactly ── */
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

const C = { bg:"#F9F5F1", ink:"#1E1610", sec:"#F1EBE1", muted:"#6B5E4F", ochre:"#1E1610", border:"#E8DFD3" };

const SHARED_CSS = `
  h1,h2,h3,h4{font-family:'Playfair Display',serif;letter-spacing:-.02em}
  body{font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;background:${C.bg}}
  .sf{font-family:'Playfair Display',serif;letter-spacing:-.02em}
  ::selection{background:${C.ink};color:#fff}
  .grid-lines{background-image:linear-gradient(to right,rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.06) 1px,transparent 1px);background-size:80px 80px}
  .ochre-rule{height:1px;background:linear-gradient(to right,transparent,${C.ochre} 40%,${C.ochre} 60%,transparent)}
  @keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.3}}
  .pulse-dot{animation:pulse-dot 1.6s ease-in-out infinite}
  @keyframes fade-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
  .fade-up  {animation:fade-up .9s        cubic-bezier(.16,1,.3,1) both}
  .fade-up-2{animation:fade-up .9s  .12s  cubic-bezier(.16,1,.3,1) both}
  .fade-up-3{animation:fade-up .9s  .24s  cubic-bezier(.16,1,.3,1) both}
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
  .ws-accent::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:${C.ochre};transform:scaleY(0);transform-origin:bottom;transition:transform .35s cubic-bezier(.16,1,.3,1)}
  .ws-accent.on::before,.ws-accent:hover::before{transform:scaleY(1)}
  .tab-content{transition:opacity .18s ease,transform .18s ease}
  .tab-content.out{opacity:0;transform:translateY(8px)}
  .tab-content.in{opacity:1;transform:none}
`;

const agents = [
  {
    n:"01", title:"Deposit Defense", pricing:"Per deposit dollar retained",
    sub:"The most common first deployment.",
    body:"Detects silent attrition before the account closes. Delivers compliance-checked retention plays to the banker — with context and the suggested opening line.",
    signals:["Direct-deposit loss","Drain velocity","Soft switching"],
  },
  {
    n:"02", title:"Onboarding Rescue & 60-Day Primacy", pricing:"Per activated account",
    sub:"The window in which primacy is won or lost.",
    body:"Catches abandoning applicants in real time; clears verification exceptions in minutes; manages the first 60 days — direct deposit, card, bill pay.",
    signals:["Stalled applications","Verification exceptions","Direct deposit · Card · Bill pay"],
  },
  {
    n:"03", title:"Life-Event Cross-Sell", pricing:"Per product added",
    sub:"The conversation the banker never got to.",
    body:"Reads customer signals; delivers fair-value-documented conversations for bankers, or compliant digital offers within limits you set.",
    signals:["Competitor mortgage payment","Payroll change","Large idle balance"],
  },
  {
    n:"04", title:"Maturity & Rate-Watch", pricing:"Per renewal or upgrade",
    sub:"The most predictable moment in banking.",
    body:"Works every CD maturity, promo roll-off, and loan payoff ahead of the customer's shopping window. Renew, upgrade, or consolidate — priced within treasury bounds.",
    signals:["CD maturities","Promo roll-offs","Loan payoffs"],
  },
  {
    n:"05", title:"Business-Banking Graduation", pricing:"Per referred account opened",
    sub:"The stickiest deposits you can gather.",
    body:"Identifies businesses hiding inside retail accounts; delivers a pre-assembled file and warm introduction to the business banker.",
    signals:["Invoicing income","Merchant fees","Fintech tool spend"],
  },
  {
    n:"06", title:"The Banker's Day, Returned", pricing:"Included with revenue agents",
    sub:"Underneath every revenue agent.",
    body:"Pre-meeting briefs for every appointment; cited live product knowledge during conversations; automatic notes, follow-ups, and referral tracking after.",
    signals:["Pre-meeting briefs","Cited product answers","Auto notes & follow-ups"],
  },
];

const govPillars = [
  { n:"01", title:"Genuine-need gate on every offer",         body:"Logged suitability and fair-value rationale on every action — evidence under Consumer Duty, UDAAP, and EU AI Act, generated automatically." },
  { n:"02", title:"Your autonomy dial",                        body:'Each agent runs at your chosen level: "brief my banker" to "act within these bounds and show me the log." Vulnerable customers always route to a human.' },
  { n:"03", title:"A replayable audit trail",                  body:"Append-only log of every decision, approval, and outcome. Examiner documentation packs assembled on demand." },
  { n:"04", title:"Conduct protection built in",               body:"Continuous monitoring for sales-practice risk patterns. Structurally designed to make the next Wells Fargo–style failure impossible, not just unlikely." },
];

const engagementSteps = [
  { step:"01", phase:"60–90 days to production",     timing:"Fixed scope",    desc:"One agent, one measurable outcome, live in production. Most institutions start with Deposit Defense." },
  { step:"02", phase:"Pay for the number that moves",timing:"Per outcome",    desc:"Outcome-metered: per deposit dollar saved, per activated account, per product added. Methodology published before engagement starts." },
  { step:"03", phase:"Your data, as it is",           timing:"No prerequisites",desc:"No data-warehouse project required. Agents connect to your core and digital banking systems as they are." },
  { step:"04", phase:"Expand as results come in",     timing:"From day 91",   desc:"Each agent added shares customer state, signals, and audit spine. One platform, every retail moment." },
];

const faqs = [
  { q:"Does anything reach a customer without a human?",
    a:"Only within limits you set. Vulnerable customers and high-value decisions always route to a human, regardless of the autonomy level configured for other moments." },
  { q:"How do you evidence suitability and fair value?",
    a:"The genuine-need gate logs rationale automatically on every action — evidence under Consumer Duty, UDAAP, and EU AI Act, without extra manual steps." },
  { q:"Do we need a data warehouse first?",
    a:"No. Agents connect to your existing core and digital banking systems as they are. Any data enrichment is done internally within the platform." },
  { q:"How is it priced?",
    a:"Per outcome — per deposit dollar saved, per activated account, per product added. The pricing methodology is published before engagement starts, so there are no surprises." },
  { q:"How long until it's live?",
    a:"60–90 days for the first agent in production. That's a fixed scope commitment, not a roadmap estimate." },
  { q:"What about sales-practice risk?",
    a:"Continuous conduct monitoring is built in. Every action carries logged rationale. We design to make the next Wells Fargo–style failure structurally impossible." },
];

const navTeams = [
  { label:"Commercial Banking" },
  { label:"Retail Banking",    active:true },
  { label:"Deal Intelligence" },
  { label:"Compliant Marketing" },
  { label:"Underwriting",      soon:true },
  { label:"KYC",               soon:true },
  { label:"Risk & Compliance" },
  { label:"Reconciliations",   soon:true },
  { label:"Dispute Resolution" },
  { label:"HR" },
];

interface Props { navigate: (page: string) => void; }

export default function RetailBanking({ navigate }: Props) {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeAgent, setActiveAgent] = useState(0);
  const [tabFade,     setTabFade]     = useState(true);
  const [openFaq,     setOpenFaq]     = useState<number | null>(null);
  const [heroParallax,setHeroParallax]= useState(0);
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

  const switchAgent = (i: number) => {
    if (i === activeAgent) return;
    setTabFade(false);
    setTimeout(() => { setActiveAgent(i); setTabFade(true); }, 180);
  };

  const navUL = "relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-px after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <div className="min-h-screen" style={{fontFamily:"'DM Sans',sans-serif",background:C.bg,color:C.ink}}>
      <style>{SHARED_CSS}</style>

      {/* ══ NAV ══ */}
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-400 ${navScrolled?"border-[#E8DFD3] bg-[#F9F5F1]/92 text-[#1E1610]":"border-transparent text-white"}`}
        style={{backdropFilter:navScrolled?"saturate(160%) blur(12px)":"none"}}>
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
              <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute left-1/2 top-full mt-4 w-[520px] -translate-x-1/2 border border-[#E8DFD3] bg-[#F9F5F1] p-4 text-[#1E1610] shadow-[0_30px_80px_-30px_rgba(0,0,0,.30)] transition-all duration-250">
                <p className={`mb-3 px-2 ${T.label} text-[#6B5E4F]`}>For your team</p>
                <ul className="grid grid-cols-2 gap-0.5 text-sm">
                  {navTeams.map(t => (
                    <li key={t.label}>
                      <button
                        onClick={() => {
                          if (t.label === "Commercial Banking") navigate("commercial-banking");
                          else if (t.label === "Deal Intelligence") navigate("deal-intelligence");
                          else if (t.label === "Compliant Marketing") navigate("compliant-marketing");
                          else if (t.label === "Risk & Compliance") navigate("risk-compliance");
                          else if (t.label === "Dispute Resolution") navigate("dispute-resolution");
                            else if (t.label === "HR") navigate("hr");
                          else if (!t.active) navigate("home");
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
            {["Governance","Advisors"].map(l => (
              <button key={l} onClick={() => navigate("home")} className={navUL}>{l}</button>
            ))}
          </nav>

          <a href="#contact" className="hidden rounded-sm border border-current px-4 py-2 text-xs tracking-wide md:inline-flex hover:opacity-70 transition-opacity">Request a demo</a>
          <button onClick={() => setMobileOpen(v => !v)} aria-label="Menu" className="md:hidden h-9 w-9 grid place-items-center border border-current rounded-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-[#E8DFD3]/40 bg-[#F9F5F1] text-[#1E1610] md:hidden">
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col gap-1 text-sm">
              <button onClick={() => { navigate("home"); setMobileOpen(false); }} className="py-2 border-b border-[#E8DFD3] text-left">← Home</button>
              <button onClick={() => { navigate("commercial-banking"); setMobileOpen(false); }} className="py-2 border-b border-[#E8DFD3] text-left">Commercial Banking</button>
              {["Governance","Advisors"].map(l => (
                <button key={l} onClick={() => { navigate("home"); setMobileOpen(false); }} className="py-2 border-b border-[#E8DFD3] text-left last:border-0">{l}</button>
              ))}
              <a href="#contact" className="mt-3 inline-flex rounded-sm border border-[#1E1610] px-4 py-2 text-xs w-fit" onClick={() => setMobileOpen(false)}>Request a demo</a>
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        <div className={`transition-all duration-400 ${navScrolled?"border-t border-[#E8DFD3]/60":"border-t border-white/15"}`}>
          <div className="mx-auto max-w-[1400px] px-6 py-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em]">
            <button onClick={() => navigate("home")} className="opacity-55 hover:opacity-100 transition-opacity">For your team</button>
            <span className="opacity-35">›</span>
            <span style={{color:C.ochre}}>Retail Banking</span>
          </div>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section className="relative isolate overflow-hidden text-white min-h-[94vh] flex items-end">
        <img src={HERO_IMG} alt="Retail banking" className="absolute inset-0 -z-10 h-full w-full object-cover will-change-transform"
          style={{transform:`translateY(${heroParallax}px)`,transformOrigin:"center top"}}/>
        <div className="absolute inset-0 -z-10" style={{background:"linear-gradient(155deg,rgba(0,0,0,.90) 0%,rgba(0,0,0,.6) 55%,rgba(0,0,0,.18) 100%)"}}/>
        <div className="absolute inset-0 -z-10 grid-lines opacity-30"/>
        <div className="absolute left-6 top-20 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1E1610]/35 to-transparent hidden lg:block"/>

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-40 md:pb-28 md:pt-52">
          <div className="max-w-[800px]">
            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/6 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/80 backdrop-blur-sm fade-up">
              <span className="relative h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-[#1E1610] ping"/>
                <span className="relative block h-1.5 w-1.5 rounded-full bg-[#1E1610]"/>
              </span>
              Madison for Retail Banking
            </p>
            <h1 className={`sf ${T.h1} tracking-tight fade-up-2`}>
              Your bankers, with the<br/><em className="italic text-white/80">follow-through of a thousand.</em>
            </h1>
            <p className={`mt-7 max-w-lg ${T.lead} text-white/78 fade-up-3`}>
              Madison monitors your existing data signals, prepares the work your bankers don't have time for, and completes the follow-through — so your bankers stay in the lead.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 fade-up-3">
              <a href="#contact" className={BTN.primary}>
                <span className="relative z-10">Book a working session</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"/>
              </a>
              <a href="#agents" className={BTN.ghost}>
                Meet the agents
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2">
              {["60–90 days: first agent live","Priced per outcome","No data prerequisites","Human escalation, always"].map(t => (
                <span key={t} className="flex items-center gap-2 text-[12px] text-white/58">
                  <span className="h-2.5 w-2.5 rounded-full border border-white/30"/>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ OPPORTUNITY INBOX (dark) ══ */}
      <section className="relative overflow-hidden border-b border-[#E8DFD3]" style={{background:C.ink}}>
        <div className="absolute inset-0 grid-lines opacity-22"/>
        <div className="relative mx-auto max-w-[1400px] px-6 py-20 md:py-28 grid gap-14 md:grid-cols-12 items-center">
          <div className="md:col-span-5 text-white">
            <p className={`${T.label} text-white/45 flex items-center gap-2`} data-reveal>
              <span className="relative h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-[#1E1610] ping"/>
                <span className="relative block h-2 w-2 rounded-full bg-[#1E1610]"/>
              </span>
              Opportunity inbox · 08:15
            </p>
            <h2 className={`mt-6 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">3 briefs ready before the branch opens.</h2>
            <p className={`mt-5 ${T.lead} text-white/68`} data-reveal data-delay="2">
              Pre-researched, pre-qualified, compliance-checked. Every brief arrives with the context, the why-now, and the suggested opening line.
            </p>
            <div className="mt-8 flex flex-wrap gap-2" data-reveal data-delay="3">
              {["Genuine-need gate","Append-only audit trail","Consumer Duty · UDAAP","Human escalation, always"].map(badge => (
                <span key={badge} className="border border-white/15 bg-white/6 px-3 py-1.5 text-[11px] text-white/70">{badge}</span>
              ))}
            </div>
          </div>

          <div className="md:col-span-7" data-reveal data-delay="1">
            <div className="border border-white/10 bg-black/50 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <span className="flex items-center gap-2 text-xs text-white/55">
                  <span className="relative h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-[#1E1610] ping"/>
                    <span className="relative block h-1.5 w-1.5 rounded-full bg-[#1E1610]"/>
                  </span>
                  Live · 3 briefs ready
                </span>
                <span className="text-[10px] text-white/45">Every brief: pre-researched · pre-qualified · compliance-checked</span>
              </div>
              {[
                { signal:"Direct deposit stopped",         agent:"Deposit Defense",         customer:"M. Alvarez · 4-year household",            urgent:true },
                { signal:"CD matures in 12 days",          agent:"Maturity & Rate-Watch",   customer:"R. & J. Guarin · promo roll-off",          urgent:false },
                { signal:"Competitor mortgage payment",     agent:"Life-Event Cross-Sell",   customer:"D. Okafor · seen in checking",             urgent:false },
              ].map(({signal,agent,customer,urgent}) => (
                <div key={signal} className="group grid grid-cols-12 gap-3 items-center border-b border-white/8 px-6 py-4 hover:bg-white/4 transition-colors">
                  <div className="col-span-5">
                    <p className={`${T.sm} text-white/88`}>{signal}</p>
                    {urgent && <span className="text-[9px] text-[#1E1610] uppercase tracking-widest">~3-week window</span>}
                  </div>
                  <div className="col-span-4">
                    <p className="text-[11px] text-white/50">{agent}</p>
                  </div>
                  <div className="col-span-3 text-right">
                    <p className="text-[11px] text-white/60">{customer}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-white/10 px-6 py-5">
                <p className={`${T.label} text-white/35 mb-2`}>Alvarez · Retention play</p>
                <p className={`${T.sm} text-white/85`}>Payroll deposit stopped two Fridays ago after four years. Drain velocity indicates ~three-week window. Suitability logged, fair value documented.</p>
              </div>
              <div className="border-t border-white/10 px-6 py-4 flex items-center gap-3">
                <button className={`rounded-sm bg-white px-4 py-2 ${T.label} text-[#1E1610] hover:opacity-90 transition-opacity`}>Open brief</button>
                <button className={`rounded-sm border border-white/20 px-4 py-2 ${T.label} text-white/75 hover:bg-white/8 transition-colors`}>View all 3</button>
                <span className="ml-auto text-[10px] text-white/28">Autonomy dial: brief my banker</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E8DFD3]">
          {[
            { val:"2.3",   label:"Products held vs. ~7 owned per household" },
            { val:"67%",   label:"Digital applications abandoned" },
            { val:"~90%",  label:"Deposit attrition invisible to reports" },
            { val:"5–25×", label:"Cheaper to deepen than acquire" },
          ].map(({val,label},i) => (
            <div key={i} data-stat data-delay={String(i+1)} className="group px-8 py-12 hover:bg-[#F1EBE1] transition-colors cursor-default">
              <p className={`sf ${T.h1} tracking-tight`}>{val}</p>
              <p className={`mt-3 ${T.sm} text-[#6B5E4F]`}>{label}</p>
              <div className="mt-5 h-px w-8 bg-[#1E1610] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"/>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PROBLEM ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-5 md:sticky md:top-28" data-reveal="scale">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#EDE4D6]">
              <img src={FRONT_IMG} alt="Retail branch" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] hover:scale-105"/>
              <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(30,22,16,.7),transparent 55%)"}}/>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className={`${T.label} text-white/55 mb-3`}>Signals already in your data</p>
                <div className="space-y-2">
                  {["Stopped direct deposit","CD maturing in 12d","Competitor mortgage pmnt","Large idle balance +90d"].map((s,i) => (
                    <div key={s} className="flex items-center gap-2 text-[12px] text-white/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1E1610] flex-shrink-0"/>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className={`mt-4 text-center ${T.label} text-[#6B5E4F]`}>None of this is a data problem.</p>
          </div>

          <div className="md:col-span-7">
            <p className={`${T.label} text-[#6B5E4F]`} data-reveal>The problem</p>
            <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">The signals are in your data.<br/>The follow-through never happens.</h2>
            <p className={`mt-6 ${T.lead} text-[#6B5E4F] max-w-lg`} data-reveal data-delay="2">Bankers spend time reconciling systems and writing things up. Signals decay before action. Cross-sell happens only when the queue is empty — and it never is.</p>
            <ul className="mt-10">
              {[
                { n:"01", t:"Uncollected wallet share",      d:"The average household holds 2.3 products. They own ~7. Every one of those missing products is visible in data you already own." },
                { n:"02", t:"Lost at onboarding",            d:"67% of digital applications are abandoned. Young customers lost at the 60-day mark never return for a second product." },
                { n:"03", t:"Silent attrition",              d:"~90% of deposit attrition is invisible to reports. Balances drain quietly. Only closed accounts get counted." },
                { n:"04", t:"Cheaper to deepen than acquire",d:"It costs 5–25× more to win a new customer than to grow an existing one. The budget is already in the book." },
              ].map(({n,t,d},i) => (
                <li key={n} data-reveal="left" data-delay={String(i+1)}
                  className="group flex gap-5 border-t border-[#E8DFD3] py-5 hover:bg-[#F9F5F1] -mx-4 px-4 transition-colors rounded-sm cursor-default">
                  <span className="text-[11px] text-[#1E1610] mt-0.5 flex-shrink-0">{n}</span>
                  <div>
                    <p className="font-medium text-[#1E1610]">{t}</p>
                    <p className={`mt-1 ${T.sm} text-[#6B5E4F]`}>{d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className={`mt-8 ${T.sm} text-[#6B5E4F] italic`} data-reveal>
              "None of this is a data problem. Every one of these events is visible in data you already own."
            </p>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS — 5-step loop ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>How it works</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">One inbox in front.<br/>A continuous loop behind it.</h2>
            </div>
            <div className="md:col-span-8 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F] max-w-lg`} data-reveal data-delay="2">Every retail banker receives a single inbox of live opportunities — pre-researched, pre-qualified, compliance-checked — while specialized agents run a continuous loop over existing systems.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-px bg-[#E8DFD3] border border-[#E8DFD3]">
            {[
              { n:"01", title:"Sense",   body:"Agents monitor core, digital banking, and interaction data continuously — no data-warehouse project required." },
              { n:"02", title:"Judge",   body:"Genuine-need test: right customer, fair value, right now — rationale logged every time." },
              { n:"03", title:"Engage",  body:"One-page brief: context, why-now, talking points, pre-qualified terms. Routine digital moments can execute directly within set limits." },
              { n:"04", title:"Execute", body:"Account opened from KYC on file, direct deposit switched, documents chased, CRM notes written. Nothing dies in a queue." },
              { n:"05", title:"Learn",   body:"Detection improves with each outcome. Managers get a live pipeline view, including expiring opportunities." },
            ].map(({n,title,body},i) => (
              <div key={n} data-reveal data-delay={String(i+1)}
                className="group bg-[#F9F5F1] p-6 hover:bg-[#1E1610] hover:text-white transition-all duration-300 cursor-default">
                <span className={`${T.label} text-[#1E1610] block mb-4 group-hover:text-[#1E1610]`}>{n}</span>
                <h3 className={`sf ${T.h4} mb-3`}>{title}</h3>
                <p className={`${T.sm} text-[#6B5E4F] group-hover:text-white/65 transition-colors`}>{body}</p>
              </div>
            ))}
          </div>
          <p className={`mt-4 text-center ${T.label} text-[#6B5E4F]`} data-reveal>
            Learn feeds Sense · every outcome, logged · Suitability logged · Fair value documented · Replayable
          </p>
        </div>
      </section>

      {/* ══ POSITIONING — Not / Is ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 text-center max-w-xl mx-auto">
            <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Where Madison fits</p>
            <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Not a platform program.<br/>Not a pilot that never ends.</h2>
            <p className={`mt-5 ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">One agent, one measurable outcome, live in production — connected to your core and digital banking systems as they are.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[#E8DFD3] border border-[#E8DFD3]">
            {[
              { icon:"✕", label:"Not", title:"A data-warehouse project",         desc:"Agents connect to your existing core and digital banking systems. No new data infrastructure required before you start.", dark:false },
              { icon:"✕", label:"Not", title:"Another chatbot pilot",             desc:"Generic AI assistants don't know your customers, your products, or your compliance obligations. Madison is built for banking.", dark:false },
              { icon:"✓", label:"Is",  title:"An agentic workbench on your stack",desc:"One agent. One measurable outcome. Connected to your systems as they are, live in production in 60–90 days.", dark:true },
            ].map(({icon,label,title,desc,dark},i) => (
              <div key={title} data-reveal data-delay={String(i+1)}
                className={`group flex flex-col gap-6 p-8 md:p-10 transition-all duration-300 ${dark?"bg-[#1E1610] text-white hover:bg-[#2a1f16]":"bg-[#F9F5F1] hover:bg-white"}`}>
                <div className="flex items-center gap-3">
                  <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-medium transition-transform duration-300 group-hover:scale-110 ${dark?"bg-[#1E1610] text-white":"border border-[#E8DFD3] text-[#6B5E4F]"}`}>{icon}</span>
                  <span className={`${T.label} ${dark?"text-[#1E1610]":"text-[#6B5E4F]"}`}>{label}</span>
                </div>
                <div>
                  <h3 className={`sf ${T.h4} leading-snug`}>{title}</h3>
                  <p className={`mt-4 ${T.sm} ${dark?"text-white/70":"text-[#6B5E4F]"}`}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SIX AGENTS ══ */}
      <section id="agents" className="border-b border-[#E8DFD3] scroll-mt-20">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>The agents</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Six agents.<br/>Each owns a moment your reports can't see.</h2>
            </div>
            <div className="md:col-span-8 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F] max-w-lg`} data-reveal data-delay="2">Most institutions start with Deposit Defense. Each agent added shares customer state, signals, and audit spine.</p>
            </div>
          </div>

          <div data-reveal className="grid md:grid-cols-12 gap-0 border border-[#E8DFD3]">
            {/* Agent tab list */}
            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-[#E8DFD3] divide-y divide-[#E8DFD3]">
              {agents.map((a,i) => (
                <button key={i} onClick={() => switchAgent(i)}
                  className={`ws-accent relative w-full text-left px-7 py-5 transition-all duration-300 ${activeAgent===i?"on bg-[#1E1610] text-white":"bg-[#F9F5F1] hover:bg-[#F1EBE1]"}`}>
                  <span className={`${T.label} block mb-1.5 transition-colors ${activeAgent===i?"text-[#1E1610]":"text-[#6B5E4F]"}`}>{a.n}</span>
                  <span className={`sf text-[18px] leading-snug block`}>{a.title}</span>
                  <p className={`mt-0.5 ${T.sm} ${activeAgent===i?"text-white/55":"text-[#6B5E4F]"}`}>{a.pricing}</p>
                </button>
              ))}
            </div>
            {/* Agent content */}
            <div className="md:col-span-8 bg-[#F9F5F1]">
              <div className={`p-8 md:p-10 tab-content ${tabFade?"in":"out"}`}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className={`${T.label} text-[#1E1610]`}>{agents[activeAgent].n}</span>
                    <h3 className={`sf ${T.h3} mt-1`}>{agents[activeAgent].title}</h3>
                    <p className={`mt-1 ${T.sm} text-[#6B5E4F] italic`}>{agents[activeAgent].sub}</p>
                  </div>
                  <span className="h-px w-10 bg-[#1E1610] flex-shrink-0 mt-6"/>
                </div>
                <p className={`${T.body} text-[#6B5E4F] mb-8`}>{agents[activeAgent].body}</p>
                <div>
                  <p className={`${T.label} text-[#6B5E4F] mb-3`}>Signals</p>
                  <div className="flex flex-wrap gap-2">
                    {agents[activeAgent].signals.map(s => (
                      <span key={s} className="flex items-center gap-1.5 border border-[#E8DFD3] bg-[#F1EBE1] px-3 py-1.5 text-xs text-[#6B5E4F]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1E1610]"/>{s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-[#E8DFD3] flex items-center justify-between">
                  <div>
                    <p className={`${T.label} text-[#6B5E4F]`}>Pricing</p>
                    <p className={`mt-1 ${T.sm} font-medium text-[#1E1610]`}>{agents[activeAgent].pricing}</p>
                  </div>
                  <a href="#contact" className={`group inline-flex items-center gap-2 border border-[#E8DFD3] px-4 py-2.5 ${T.sm} hover:border-[#1E1610] hover:text-[#1E1610] transition-all`}>
                    See the workflow <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
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
          <p className={`sf ${T.h2} tracking-tight text-[#1E1610]`} data-reveal data-delay="1">Our goal is simple: your compliance officer should be this product's biggest champion.</p>
          <p className={`mt-8 ${T.sm} text-[#6B5E4F]`} data-reveal data-delay="2">— Governance principle · Retail Banking</p>
          <div className="mx-auto mt-6 ochre-rule w-28" data-reveal data-delay="3"/>
        </div>
      </section>

      {/* ══ GOVERNANCE ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Governance</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Governance isn't a feature.<br/>It's the foundation.</h2>
              <p className={`mt-5 ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Everything the agents do is examinable by design, because we build for regulated institutions first.</p>
              <div className="mt-8 aspect-[4/3] overflow-hidden border border-[#E8DFD3]" data-reveal data-delay="3">
                <img src={GOV_IMG} alt="Governance" className="h-full w-full object-cover hover:scale-105 transition-transform duration-[2s]"/>
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="flex flex-wrap gap-2 mb-8">
                {["Consumer Duty","UDAAP","EU AI Act","Genuine-need gate","Append-only audit trail","Autonomy dial","Examiner packs on demand","SSO / SAML"].map((c,i) => (
                  <span key={c} data-reveal data-delay={String(i+1)}
                    className="flex items-center gap-1.5 border border-[#E8DFD3] bg-[#F9F5F1] px-3 py-1.5 text-xs text-[#6B5E4F] hover:border-[#1E1610] hover:text-[#1E1610] transition-colors cursor-default">
                    <span className="text-[#1E1610]">✓</span>{c}
                  </span>
                ))}
              </div>
              <div className="space-y-4">
                {govPillars.map(({n,title,body},i) => (
                  <div key={n} data-reveal data-delay={String(i+1)}
                    className="border border-[#E8DFD3] bg-[#F9F5F1] p-6 hover:border-[#1E1610] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <span className="text-[11px] text-[#1E1610] flex-shrink-0 mt-0.5">{n}</span>
                      <div>
                        <p className={`font-medium ${T.sm} text-[#1E1610]`}>{title}</p>
                        <p className={`mt-2 ${T.sm} text-[#6B5E4F]`}>{body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6" data-reveal>
                <a href="mailto:governance@madison.ai"
                  className={`group inline-flex items-center gap-2 border border-[#E8DFD3] bg-[#F9F5F1] px-4 py-2.5 ${T.sm} hover:bg-white hover:border-[#1E1610] transition-all`}>
                  Request the governance pack
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ENGAGEMENT MODEL ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Engagement model</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">One agent. One number.<br/>Sixty to ninety days.</h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Fixed scope. Outcome-metered pricing. No data prerequisites. Most institutions start with Deposit Defense.</p>
            </div>
          </div>
          <div>
            {engagementSteps.map((r,i) => (
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

      {/* ══ FAQ ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>FAQ</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">The six questions your compliance officer will ask.</h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Straight answers to the questions that stop every retail AI evaluation in its tracks.</p>
            </div>
          </div>
          <div className="border-t border-[#E8DFD3]">
            {faqs.map((faq,i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} data-reveal data-delay={String((i%3)+1)}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-8 py-6 text-left -mx-6 px-6 hover:bg-[#F9F5F1] transition-colors">
                    <div className="flex items-start gap-5">
                      <span className="text-[11px] text-[#1E1610] flex-shrink-0 mt-0.5">0{i+1}</span>
                      <span className={`${T.body} font-medium transition-colors ${isOpen?"text-[#1E1610]":"text-[#1E1610]"}`}>{faq.q}</span>
                    </div>
                    <span className={`flex-shrink-0 grid h-7 w-7 place-items-center rounded-full border transition-all duration-300 ${isOpen?"border-[#1E1610] bg-[#1E1610] text-white rotate-45":"border-[#E8DFD3] text-[#6B5E4F]"}`}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 1v8M1 5h8"/></svg>
                    </span>
                  </button>
                  <div ref={el => { faqBodyRefs.current[i] = el; }}
                    className="overflow-hidden transition-all duration-400 ease-in-out border-b border-[#E8DFD3]"
                    style={{maxHeight:isOpen?(faqBodyRefs.current[i]?.scrollHeight??200)+"px":"0px",opacity:isOpen?1:0}}>
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

      {/* ══ CONTACT ══ */}
      <section id="contact" className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 text-center">
            <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Working session · open</p>
            <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Bring one month of your own numbers.</h2>
            <p className={`mt-5 ${T.lead} text-[#6B5E4F] max-w-xl mx-auto`} data-reveal data-delay="2">45-minute working session with retail and compliance leadership. One month of real attrition or onboarding data. Line-by-line: what the agents would have caught.</p>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-3" data-reveal data-delay="3">
              <a href="mailto:hello@madison.ai" className={BTN.primary}>
                Book the working session <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="mailto:governance@madison.ai" className={BTN.secondary}>
                Request the governance pack
              </a>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className={`${T.label} text-[#6B5E4F] mb-6`} data-reveal>What to expect</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { n:"45 minutes with retail & compliance",  d:"No slides. Real data, real numbers, real agents." },
                  { n:"One month of your attrition data",     d:"Line-by-line: what the agents would have caught, what they would have done." },
                  { n:"Live opportunity brief on your data",  d:"One of your actual (masked) customers shown through the workbench." },
                  { n:"Fixed 60–90 day scope",                d:"Named outcome, agreed baseline, one agent in production. No open-ended commitments." },
                ].map(({n,d},i) => (
                  <div key={n} data-reveal data-delay={String(i+1)}
                    className="group border border-[#E8DFD3] bg-[#F1EBE1] p-6 hover:border-[#1E1610] hover:shadow-sm transition-all duration-300">
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
                  { dt:"Institution", dd:"Bank or credit union" },
                  { dt:"Size",        dd:"$500M–$50B in assets" },
                  { dt:"Owner",       dd:"Head of Retail / Consumer Banking" },
                  { dt:"Co-signer",  dd:"Chief Compliance Officer" },
                  { dt:"Autonomy",   dd:"Brief my banker · human approves" },
                ].map(({dt,dd}) => (
                  <div key={dt} className="flex items-center justify-between py-3.5">
                    <dt className={`${T.sm} text-[#6B5E4F]`}>{dt}</dt>
                    <dd className={`${T.sm} font-medium text-right`}>{dd}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 pt-5 border-t border-[#E8DFD3]">
                <p className={`${T.sm} text-[#6B5E4F]`}>No procurement gate required to start.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{background:C.ink}} className="text-white">
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
            ].map(({heading,links}) => (
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
            <p>© 2026 Madison. All rights reserved. Compliance labels reflect audit status at time of publication.</p>
            <p>Built for New York, deployed worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
