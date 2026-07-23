import { useState, useEffect } from "react";

/* ── images ── */
const HERO_IMG  = "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/50ac8218-ba9d-4b18-845e-a62283c840d4/front-office.jpg";
const BRIEF_IMG = "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/bb3591ba-d458-49ba-88de-e831d343d9d7/back-office.jpg";
const GOV_IMG   = "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/22509f6d-0850-4622-b385-5e7e23f65cc4/governance.jpg";

/* ── type scale ── */
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
const liveRunSteps = [
  { n:"01", label:"Brief Structurer",          note:"Objective, product, audience, and timing parsed from one line.", done:true },
  { n:"02", label:"Fair-lending Segmentation", note:"4,182 customers matched, with fair-lending guardrails.",         done:true },
  { n:"03", label:"Content Optimisation",      note:"Six variants scored, the winner selected.",                      done:true },
  { n:"04", label:"Compliance Pre-check",      note:"Reg DD disclosure inserted before any human review.",            done:true },
  { n:"05", label:"Human approves",            note:"Marketer first, then compliance, independently.",                done:false, waiting:true },
  { n:"06", label:"Launch",                    note:"Queued to your own send tools.",                                 done:false },
];

const agents = [
  { n:"01", title:"Campaign Production",              body:"Brief to compliant, launch-ready, multi-channel campaign.",                                          tags:["Email","Landing page","Social","SMS"] },
  { n:"02", title:"Compliance Pre-check",             body:"First-pass-clean drafts against your own rulebook before any human sees them.",                      tags:["Reg DD","Reg Z","UDAAP","Fair lending"] },
  { n:"03", title:"Fair-lending Segmentation",        body:"Audience segments with disparate-impact guardrails built in from the start.",                        tags:["ECOA","Disparate impact","HMDA"] },
  { n:"04", title:"Content & Language Optimisation",  body:"On-brand, compliance-aware copy, scored and selected from multiple variants.",                       tags:["Brand kit","Tone scoring","Variant testing"] },
  { n:"05", title:"Competitive & Rate Intelligence",  body:"A daily brief of local competitor rates, offers, and creative. No integration needed.",              tags:["Public data","Rate sheets","Zero-integration"] },
  { n:"06", title:"Measurement & Attribution",        body:"Tracks outcomes, attributes lift, writes results back to the brain.",                                 tags:["Lift attribution","Outcome memory","Brain write-back"] },
  { n:"07", title:"Social & Reputation",              body:"Monitors and drafts responses within brand and compliance guardrails.",                               tags:["Brand guardrails","CAN-SPAM","TCPA"] },
  { n:"08", title:"Board & Exam Reporting",           body:"Exam-ready reporting straight from live activity — the record an examiner asks for already exists.",  tags:["Audit trail","Exam-ready","Exportable"] },
];

const deployPhases = [
  { step:"01", phase:"Land",    timing:"Weeks 1–2",   desc:"Public competitor and rate intelligence. No integration, value in week one. The Competitive & Rate Intelligence agent runs on public data from day zero." },
  { step:"02", phase:"Connect", timing:"Weeks 3–4",   desc:"Connect your CRM and send tools. First governed campaign, brief to compliant launch. On-data segmentation with fair-lending guardrails." },
  { step:"03", phase:"Prove",   timing:"Weeks 5–8",   desc:"Measure clearance time and output against the baseline. A visible trail that de-risks the exam. Every send, edit, and approval logged." },
  { step:"04", phase:"Expand",  timing:"Week 8+",     desc:"More channels, and dynamic agents that compound per institution. The longer you run Madison, the more it knows that no competitor can copy." },
];

const compTable = [
  { cap:"Generate on-brand content",                      ai:true,  mc:"partial", cc:"partial", mad:true  },
  { cap:"Review against your compliance rulebook",        ai:false, mc:false,     cc:true,      mad:true  },
  { cap:"Run the full brief-to-launch workflow",          ai:false, mc:"partial", cc:false,     mad:true  },
  { cap:"Work on your own data, inside your perimeter",   ai:false, mc:"partial", cc:false,     mad:true  },
  { cap:"Memory that compounds per institution",          ai:false, mc:false,     cc:false,     mad:true  },
  { cap:"Shows reasoning, human approves each step",      ai:false, mc:false,     cc:"partial", mad:true  },
  { cap:"Built for a $1B–$10B institution",               ai:"partial", mc:false, cc:"partial", mad:true  },
];

const faqItems = [
  { q:"Which model powers it?",          a:"Yours. BYO-LLM against your Azure OpenAI, AWS Bedrock, or a private deployment. Your keys, your logs, your controls." },
  { q:"How is our data isolated?",       a:"Single-tenant deployment in your region, inside your perimeter — cloud, on-premises, or fully air-gapped. No cross-tenant training, ever." },
  { q:"Can it send anything on its own?",a:"No regulated step sends itself. The rules decide, the model drafts and explains, and a marketer then a compliance officer approve independently. You set the autonomy level per function." },
  { q:"Do we replace our stack or team?",a:"Neither. Madison is the layer on top of the core, CRM, and send tools you already run — giving a two-to-ten-person team the output of a much larger one." },
  { q:"How fast do we see value?",       a:"Week one, with no integration. The Competitive & Rate Intelligence agent runs on public data from day zero. Deeper campaign production follows once you connect your CRM and send tools." },
  { q:"What does this do for our exam?", a:"Every send, edit, and approval is logged in a native, exportable audit trail of what each agent read, what it did, and why. The record an examiner asks for already exists." },
];

const navTeams = [
  { label:"Commercial Banking" },
  { label:"Retail Banking" },
  { label:"Deal Intelligence" },
  { label:"Compliant Marketing", active:true },
  { label:"Underwriting",        soon:true },
  { label:"KYC",                 soon:true },
  { label:"Risk & Compliance" },
  { label:"Reconciliations",     soon:true },
  { label:"Dispute Resolution" },
  { label:"HR" },
];

interface Props { navigate: (page: string) => void; }

export default function CompliantMarketing({ navigate }: Props) {
  const [navScrolled,  setNavScrolled]  = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [activeAgent,  setActiveAgent]  = useState(0);
  const [tabFade,      setTabFade]      = useState(true);
  const [openFaq,      setOpenFaq]      = useState<number | null>(null);
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

  const switchAgent = (i: number) => {
    if (i === activeAgent) return;
    setTabFade(false);
    setTimeout(() => { setActiveAgent(i); setTabFade(true); }, 180);
  };

  const navUL = "relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-px after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100";

  const Cell = ({ val }: { val: boolean | string }) => {
    if (val === true)      return <span className="text-[#1E1610] font-semibold">Yes</span>;
    if (val === false)     return <span className="text-[#6B5E4F]/50">No</span>;
    if (val === "partial") return <span className="text-[#6B5E4F]">Partial</span>;
    return null;
  };

  return (
    <div className="min-h-screen" style={{ fontFamily:"'DM Sans',sans-serif", background:"#F9F5F1", color:"#1E1610" }}>
      <style>{SHARED_CSS}</style>

      {/* ══ NAV ══ */}
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
              <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute left-1/2 top-full mt-4 w-[520px] -translate-x-1/2 border border-[#E8DFD3] bg-[#F9F5F1] p-4 text-[#1E1610] shadow-[0_30px_80px_-30px_rgba(0,0,0,.30)] transition-all duration-250">
                <p className={`mb-3 px-2 ${T.label} text-[#6B5E4F]`}>For your team</p>
                <ul className="grid grid-cols-2 gap-0.5 text-sm">
                  {navTeams.map(t => (
                    <li key={t.label}>
                      <button
                        onClick={() => {
                          if (t.label === "Commercial Banking")  navigate("commercial-banking");
                          else if (t.label === "Retail Banking") navigate("retail-banking");
                          else if (t.label === "Deal Intelligence") navigate("deal-intelligence");
                          else if (t.label === "Risk & Compliance") navigate("risk-compliance");
                          else if (t.label === "Dispute Resolution") navigate("dispute-resolution");
                            else if (t.label === "HR") navigate("hr");
                          else if (!t.soon && !t.active)         navigate("home");
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
              {["commercial-banking","retail-banking","deal-intelligence"].map(p => (
                <button key={p} onClick={() => { navigate(p); setMobileOpen(false); }} className="py-2 border-b border-[#E8DFD3] text-left capitalize">{p.replace(/-/g," ")}</button>
              ))}
              <button onClick={() => { navigate("home"); setMobileOpen(false); }} className="py-2 border-b border-[#E8DFD3] text-left">Governance</button>
              <a href="#contact" className="mt-3 inline-flex rounded-sm border border-[#1E1610] px-4 py-2 text-xs w-fit" onClick={() => setMobileOpen(false)}>Request a demo</a>
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        <div className={`transition-all duration-400 ${navScrolled ? "border-t border-[#E8DFD3]/60" : "border-t border-white/15"}`}>
          <div className="mx-auto max-w-[1400px] px-6 py-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em]">
            <button onClick={() => navigate("home")} className="opacity-55 hover:opacity-100 transition-opacity">For your team</button>
            <span className="opacity-35">›</span>
            <span className="text-[#1E1610]">Compliant Marketing</span>
          </div>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section className="relative isolate overflow-hidden text-white min-h-[94vh] flex items-end">
        <img src={HERO_IMG} alt="Compliant Marketing" className="absolute inset-0 -z-10 h-full w-full object-cover will-change-transform"
          style={{ transform:`translateY(${heroParallax}px)`, transformOrigin:"center top" }} />
        <div className="absolute inset-0 -z-10" style={{ background:"linear-gradient(155deg,rgba(0,0,0,.92) 0%,rgba(0,0,0,.62) 55%,rgba(0,0,0,.18) 100%)" }} />
        <div className="absolute inset-0 -z-10 grid-lines opacity-30" />
        <div className="absolute left-6 top-20 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1E1610]/35 to-transparent hidden lg:block" />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-40 md:pb-28 md:pt-52">
          <div className="max-w-[820px]">
            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/6 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/80 backdrop-blur-sm fade-up">
              <span className="relative h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-[#1E1610] ping" />
                <span className="relative block h-1.5 w-1.5 rounded-full bg-[#1E1610]" />
              </span>
              Madison for Marketing · The Agentic Banking OS
            </p>
            <h1 className={`sf ${T.h1} tracking-tight fade-up-2`}>
              The marketing team<br /><em className="italic text-white/78">you could never afford to hire.</em>
            </h1>
            <p className={`mt-7 max-w-xl ${T.lead} text-white/78 fade-up-3`}>
              A one-line brief becomes a compliant, launch-ready campaign — built on your own data, with a human approving every regulated step.
            </p>
            <p className={`mt-3 ${T.sm} text-white/50 fade-up-3`}>
              Campaigns that took weeks now take days.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 fade-up-3">
              <a href="#contact" className={BTN.primary}>
                <span className="relative z-10">Request a demo</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#live-run" className={BTN.ghost}>
                See a live run
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2">
              {["Reg DD checked","Reg Z checked","Human-approved","Full audit trail","Fair-lending guardrails"].map(r => (
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
            { val:"Weeks → Days", label:"Campaign clearance, brief to launch" },
            { val:"1 brief",      label:"In. A full compliant campaign out." },
            { val:"Week 1",       label:"First value, zero integration required" },
            { val:"Every send",   label:"Human-approved before anything launches" },
          ].map(({ val, label }, i) => (
            <div key={i} data-stat data-delay={String(i + 1)} className="group px-8 py-12 hover:bg-[#F1EBE1] transition-colors cursor-default">
              <p className={`sf ${T.h2} tracking-tight`}>{val}</p>
              <p className={`mt-3 ${T.sm} text-[#6B5E4F]`}>{label}</p>
              <div className="mt-5 h-px w-8 bg-[#1E1610] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* ══ LIVE RUN ══ */}
      <section id="live-run" className="relative overflow-hidden border-b border-[#E8DFD3] scroll-mt-20" style={{ background:"#1E1610" }}>
        <div className="absolute inset-0 grid-lines opacity-22" />
        <div className="absolute inset-0 opacity-10"><img src={BRIEF_IMG} className="h-full w-full object-cover" alt="" /></div>
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-5 text-white">
            <p className={`${T.label} text-white/45 flex items-center gap-2`} data-reveal>
              <span className="relative h-2 w-2"><span className="absolute inset-0 rounded-full bg-[#1E1610] ping" /><span className="relative block h-2 w-2 rounded-full bg-[#1E1610]" /></span>
              Madison for Marketing · Live run
            </p>
            <h2 className={`mt-6 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">One line in.<br />A compliant, launch-ready<br />campaign out.</h2>
            <p className={`mt-5 ${T.lead} text-white/68`} data-reveal data-delay="2">Madison takes a one-line brief and produces a segmented, multi-channel campaign already checked against your own compliance rulebook.</p>
            <div className="mt-8 flex flex-wrap gap-2" data-reveal data-delay="3">
              {["Runs inside your perimeter","Reg DD & Reg Z checked","Human approves every regulated step","Exportable audit trail"].map(f => (
                <span key={f} className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/6 px-3 py-1.5 text-xs text-white/70">
                  <span className="text-[#1E1610]">✓</span>{f}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-7" data-reveal data-delay="1">
            <div className="border border-white/10 bg-black/50 backdrop-blur-sm">
              {/* brief */}
              <div className="border-b border-white/10 px-6 py-5">
                <p className={`${T.label} text-white/38 mb-2`}>Brief</p>
                <p className={`${T.sm} text-white/90 italic`}>"Launch our new 4.25% APY savings to customers with idle balances, Q3."</p>
              </div>
              {/* steps */}
              <div className="px-6 py-5 space-y-3 border-b border-white/10">
                {liveRunSteps.map(({ n, label, note, done, waiting }) => (
                  <div key={n} className="flex items-start gap-3">
                    <span className={`text-[10px] flex-shrink-0 w-5 mt-0.5 ${done ? "text-[#1E1610]" : waiting ? "text-white/80" : "text-white/25"}`}>{n}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`${T.sm} ${done ? "text-white/85" : waiting ? "text-white" : "text-white/28"}`}>{label}</p>
                      {(done || waiting) && <p className={`mt-0.5 text-[11px] ${done ? "text-white/42" : "text-white/60"}`}>{note}</p>}
                    </div>
                    {done    && <span className="ml-auto text-[#1E1610] text-xs flex-shrink-0">✓</span>}
                    {waiting && <span className="ml-auto pulse-dot h-1.5 w-1.5 rounded-full bg-white flex-shrink-0 mt-1" />}
                  </div>
                ))}
              </div>
              {/* output preview */}
              <div className="border-b border-white/10 px-6 py-5">
                <p className={`${T.label} text-white/38 mb-3`}>Email variant — disclosure inserted</p>
                <div className="border border-white/10 bg-white/4 p-4 text-xs text-white/80 leading-relaxed space-y-2">
                  <p className="font-medium text-white">"Your money has been sitting still. 4.25% APY says move."</p>
                  <p className="text-white/55">You keep a healthy balance in checking. It deserves to earn more. Our new high-yield savings pays 4.25% APY (Annual Percentage Yield)...</p>
                  <p className="text-white/35 italic text-[11px]">Disclosure: $1,000 minimum balance required to obtain the advertised APY. Fees could reduce earnings on the account. Insured by NCUA.</p>
                </div>
              </div>
              <div className="px-6 py-4 flex items-center gap-3">
                <button className={`rounded-sm bg-white px-4 py-2 ${T.label} text-[#1E1610] hover:opacity-90 transition-opacity`}>Approve package</button>
                <button className={`rounded-sm border border-white/20 px-4 py-2 ${T.label} text-white/75 hover:bg-white/8 transition-colors`}>Request revision</button>
                <span className="ml-auto text-[10px] text-white/28">Marketer approval required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ THE PROBLEM ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <p className={`${T.label} text-[#6B5E4F]`} data-reveal>The problem</p>
            <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Same rulebook as the biggest banks.<br />None of the staff.</h2>
            <p className={`mt-6 ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Your marketing team is two to ten people. Every line of business — deposits, lending, cards, wealth — sends it work. Anything that states a rate or a term has to clear compliance and legal before it ships.</p>
            <blockquote className={`mt-8 border-l-2 border-[#1E1610] pl-5 sf ${T.h4} italic text-[#1E1610]`} data-reveal data-delay="3">
              "The bottleneck is not the work. It is getting the work through the gate."
            </blockquote>
          </div>
          <div className="md:col-span-7">
            <div className="border border-[#E8DFD3] overflow-hidden" data-reveal data-delay="1">
              {/* Flow diagram */}
              <div className="bg-[#F9F5F1] border-b border-[#E8DFD3] px-6 py-4">
                <div className="flex gap-2 flex-wrap">
                  {["Deposits","Lending","Cards","Wealth","Commercial"].map((t, i) => (
                    <span key={t} className={`px-3 py-1.5 text-xs rounded-sm border ${i === 0 ? "bg-[#1E1610] text-white border-[#1E1610]" : "border-[#E8DFD3] text-[#6B5E4F]"}`}>{t}</span>
                  ))}
                </div>
              </div>
              {[
                { icon:"✍", label:"Marketing", sub:"Every asset, every channel" },
                { icon:"⚖", label:"Compliance & Legal", sub:"4 to 5 weeks average clearance", highlight:true },
                { icon:"🚀", label:"Launch", sub:"One campaign finally clears" },
              ].map(({ icon, label, sub, highlight }) => (
                <div key={label} className={`flex items-center gap-4 px-6 py-5 border-b border-[#E8DFD3] last:border-0 ${highlight ? "bg-red-50/60" : "bg-[#F9F5F1]"}`}>
                  <span className="text-xl w-8 flex-shrink-0">{icon}</span>
                  <div>
                    <p className={`font-medium ${T.sm} ${highlight ? "text-red-800" : ""}`}>{label}</p>
                    <p className={`${T.sm} text-[#6B5E4F]`}>{sub}</p>
                  </div>
                  {highlight && <span className={`ml-auto ${T.label} text-red-600`}>Bottleneck</span>}
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4" data-reveal data-delay="2">
              {[
                { label:"Not", desc:"Another AI content writer" },
                { label:"Not", desc:"A marketing cloud you rip and replace" },
                { label:"Is",  desc:"The orchestration layer from brief to compliant launch", accent:true },
              ].map(({ label, desc, accent }) => (
                <div key={desc} className={`border p-4 ${accent ? "border-[#1E1610] bg-[#1E1610]/5" : "border-[#E8DFD3] bg-[#F9F5F1]"}`}>
                  <span className={`${T.label} ${accent ? "text-[#1E1610]" : "text-[#6B5E4F]"}`}>{label}</span>
                  <p className={`mt-2 ${T.sm} text-[#1E1610] leading-snug`}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ THE AGENTS ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>The agents</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Not one agent.<br />An operating system<br />of them.</h2>
              <p className={`mt-5 ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Madison ships with a working set of marketing agents on day one. Over time it composes new ones from your own history, tuned to your disclosures, your tone, and your sign-off chain.</p>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className={`${T.sm} text-[#6B5E4F] max-w-sm`} data-reveal data-delay="2">Ships with the platform. Compounds with every campaign.</p>
            </div>
          </div>

          <div data-reveal className="grid md:grid-cols-12 gap-0 border border-[#E8DFD3]">
            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-[#E8DFD3] divide-y divide-[#E8DFD3]">
              {agents.map((ag, i) => (
                <button key={i} onClick={() => switchAgent(i)}
                  className={`ws-accent relative w-full text-left px-7 py-4 transition-all duration-300 ${activeAgent === i ? "on bg-[#1E1610] text-white" : "bg-[#F9F5F1] hover:bg-[#F1EBE1]"}`}>
                  <span className={`${T.label} block mb-1 transition-colors ${activeAgent === i ? "text-[#1E1610]" : "text-[#6B5E4F]"}`}>{ag.n}</span>
                  <span className="sf text-[16px] leading-snug block">{ag.title}</span>
                </button>
              ))}
            </div>
            <div className="md:col-span-8 bg-[#F9F5F1]">
              <div className={`p-8 md:p-10 tab-content ${tabFade ? "in" : "out"}`}>
                <div className="flex items-start justify-between mb-7">
                  <div>
                    <span className={`${T.label} text-[#1E1610]`}>{agents[activeAgent].n}</span>
                    <h3 className={`sf ${T.h3} mt-1`}>{agents[activeAgent].title}</h3>
                  </div>
                  <span className="h-px w-10 bg-[#1E1610] flex-shrink-0 mt-6" />
                </div>
                <p className={`${T.lead} text-[#6B5E4F] mb-8`}>{agents[activeAgent].body}</p>
                <div>
                  <p className={`${T.label} text-[#6B5E4F] mb-3`}>Scope</p>
                  <div className="flex flex-wrap gap-2">
                    {agents[activeAgent].tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1.5 border border-[#E8DFD3] bg-[#F1EBE1] px-3 py-1.5 text-xs text-[#6B5E4F]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1E1610]" />{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-[#E8DFD3] flex items-center justify-between">
                  <p className={`${T.sm} text-[#6B5E4F]`}>Dynamic agents composed from your brain</p>
                  <a href="#contact" className={`group inline-flex items-center gap-2 border border-[#E8DFD3] px-4 py-2.5 ${T.sm} hover:border-[#1E1610] hover:text-[#1E1610] transition-all flex-shrink-0`}>
                    See it run <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ GOVERNANCE ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Security & governance</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Built for the way<br />you are regulated.</h2>
              <p className={`mt-5 ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Built to pass second-line review. Your compliance team reads landing pages too, so we wrote this part for them.</p>
              <div className="mt-8 space-y-3" data-reveal data-delay="3">
                {[
                  { step:"The rules decide",           sub:"Your rulebook, not ours" },
                  { step:"The model drafts & explains",sub:"Full reasoning trail shown" },
                  { step:"A human approves",           sub:"Every regulated step gated" },
                ].map(({ step, sub }, i) => (
                  <div key={i} className="flex items-center gap-4 border border-[#E8DFD3] bg-[#F9F5F1] p-4">
                    <span className="text-[11px] text-[#1E1610] flex-shrink-0 w-5">0{i+1}</span>
                    <div>
                      <p className={`font-medium ${T.sm}`}>{step}</p>
                      <p className={`${T.sm} text-[#6B5E4F]`}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-7">
              {/* Regulations checked */}
              <div className="border border-[#E8DFD3] bg-[#F9F5F1] p-6 mb-6" data-reveal data-delay="1">
                <p className={`${T.label} text-[#6B5E4F] mb-4`}>Compliance checked on every asset</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Truth in Savings","Truth in Lending","UDAAP","FDIC & NCUA","Fair lending","CAN-SPAM & TCPA","WCAG"].map(r => (
                    <span key={r} className="flex items-center gap-1.5 border border-[#E8DFD3] px-3 py-1.5 text-xs text-[#6B5E4F] hover:border-[#1E1610] hover:text-[#1E1610] transition-colors cursor-default">
                      <span className="text-[#1E1610]">✓</span>{r}
                    </span>
                  ))}
                </div>
                <p className={`${T.sm} text-[#6B5E4F] italic`}>Logged with the rule cited. The exam trail writes itself.</p>
              </div>
              {/* Audit log */}
              <div className="border border-[#E8DFD3] overflow-hidden" data-reveal data-delay="2">
                <div className="flex items-center justify-between bg-[#F9F5F1] border-b border-[#E8DFD3] px-5 py-3">
                  <span className={`${T.label} text-[#6B5E4F]`}>Decision record</span>
                  <span className={`${T.label} text-[#1E1610]`}>Export ↓</span>
                </div>
                {[
                  { time:"10:02", actor:"Compliance Pre-check",          action:"Inserted 2 disclosures, APY term statement" },
                  { time:"10:04", actor:"Jordan Lee (Marketer)",          action:"Approved package, routed to compliance" },
                  { time:"10:09", actor:"Dana Okafor (Compliance)",       action:"Second approval granted, launch unlocked" },
                  { time:"10:10", actor:"Campaign Production",            action:"Launched to 4,182 customers and members" },
                  { time:"10:31", actor:"Measurement & Attribution",      action:"Outcome written back to the brain" },
                ].map(({ time, actor, action }) => (
                  <div key={time} className="grid grid-cols-[60px_1fr] border-b border-[#E8DFD3] last:border-0 hover:bg-[#F1EBE1] transition-colors">
                    <div className={`px-4 py-3 text-[10px] text-[#6B5E4F] border-r border-[#E8DFD3]`}>{time}</div>
                    <div className="px-4 py-3">
                      <p className={`${T.sm} font-medium text-[#1E1610]`}>{actor}</p>
                      <p className={`${T.sm} text-[#6B5E4F]`}>{action}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Certs */}
              <div className="mt-6 flex flex-wrap gap-2" data-reveal data-delay="3">
                {["SOC 2 Type II","ISO 27001","GLBA","SR 11-7","BYO-LLM","Single-tenant","RBAC & SSO","Cloud / VPC / On-prem"].map(c => (
                  <span key={c} className="border border-[#E8DFD3] bg-[#F9F5F1] px-3 py-1.5 text-xs text-[#6B5E4F]">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PULL QUOTE ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[900px] px-6 py-24 md:py-28 text-center">
          <span data-reveal className="sf text-[96px] leading-none text-[#1E1610]/18 block -mb-6">"</span>
          <p className={`sf ${T.h2} tracking-tight text-[#1E1610]`} data-reveal data-delay="1">A competitor can copy a workflow in a quarter. No one can copy your institution's own accumulated reasoning.</p>
          <p className={`mt-8 ${T.sm} text-[#6B5E4F]`} data-reveal data-delay="2">— Compliant Marketing · Competitive moat</p>
          <div className="mx-auto mt-6 ochre-rule w-28" data-reveal data-delay="3" />
        </div>
      </section>

      {/* ══ DEPLOYMENT PATH ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Value in week one. Expand from proof.</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Start without integration.<br />Scale into the institution.</h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">You do not connect a single system to see Madison work. The Competitive & Rate Intelligence agent runs against public data from day zero and delivers a daily brief of local competitor rates, offers, and creative.</p>
            </div>
          </div>

          {/* Competitor brief preview */}
          <div className="mb-12 border border-[#E8DFD3] bg-[#F9F5F1] overflow-hidden" data-reveal>
            <div className="flex items-center justify-between border-b border-[#E8DFD3] px-6 py-3 bg-[#F1EBE1]">
              <span className={`${T.label} text-[#6B5E4F]`}>Daily brief · scanning public rate sheets</span>
              <span className={`${T.label} text-[#1E1610]`}>No integration required</span>
            </div>
            <div className="divide-y divide-[#E8DFD3]">
              {[
                { inst:"First Cascade Bank",   detail:"savings promo, unchanged 6 days",         rate:"3.80% APY" },
                { inst:"Rose City CU",          detail:"$25,000 minimum to obtain",               rate:"4.00% APY" },
                { inst:"Meridian National",     detail:"plus a $200 checking bonus, new this week", rate:"3.65% APY" },
                { inst:"Umpqua Valley Bank",    detail:"auto loans, billboard creative refreshed", rate:"5.99% APR" },
              ].map(({ inst, detail, rate }) => (
                <div key={inst} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center px-6 py-3.5 hover:bg-[#F1EBE1] transition-colors">
                  <div>
                    <p className={`font-medium ${T.sm}`}>{inst}</p>
                    <p className={`${T.sm} text-[#6B5E4F]`}>{detail}</p>
                  </div>
                  <span className={`text-[13px] font-medium`}>{rate}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E8DFD3] px-6 py-3 bg-[#F9F5F1]">
              <p className={`${T.sm} text-[#1E1610] italic`}>Opening detected: a 4.25% APY offer would lead this market at a $1,000 minimum.</p>
            </div>
          </div>

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
      </section>

      {/* ══ COMPARISON TABLE ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Why Madison</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">The only system that owns<br />brief to compliant launch.</h2>
              <p className={`mt-5 ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">General AI writers generate copy. Marketing clouds send it. Compliance tools check it after it exists. Each owns a slice. Madison owns the job.</p>
            </div>
          </div>
          <div className="overflow-x-auto" data-reveal>
            <table className="w-full border border-[#E8DFD3] text-left">
              <thead>
                <tr className="bg-[#F1EBE1] border-b border-[#E8DFD3]">
                  <th className={`px-5 py-3 ${T.label} text-[#6B5E4F] font-normal`}>Capability</th>
                  {["General AI writers","Marketing cloud","Compliance-copy tools","Madison"].map((h, i) => (
                    <th key={h} className={`px-5 py-3 ${T.label} font-normal text-center ${i === 3 ? "text-[#1E1610]" : "text-[#6B5E4F]"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compTable.map(({ cap, ai, mc, cc, mad }, i) => (
                  <tr key={i} className="border-b border-[#E8DFD3] last:border-0 hover:bg-[#F1EBE1] transition-colors">
                    <td className={`px-5 py-3.5 ${T.sm} text-[#1E1610]`}>{cap}</td>
                    <td className={`px-5 py-3.5 ${T.sm} text-center`}><Cell val={ai} /></td>
                    <td className={`px-5 py-3.5 ${T.sm} text-center`}><Cell val={mc} /></td>
                    <td className={`px-5 py-3.5 ${T.sm} text-center`}><Cell val={cc} /></td>
                    <td className={`px-5 py-3.5 ${T.sm} text-center bg-[#1E1610]/5`}><Cell val={mad} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className={`${T.label} text-[#6B5E4F]`} data-reveal>FAQ</p>
            <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">The questions your compliance team will ask.</h2>
            <img src={GOV_IMG} alt="Governance" className="mt-8 w-full object-cover aspect-[4/3] border border-[#E8DFD3]" data-reveal data-delay="2" />
          </div>
          <div className="md:col-span-8">
            <div className="divide-y divide-[#E8DFD3] border-t border-[#E8DFD3]">
              {faqItems.map(({ q, a }, i) => (
                <div key={i} data-reveal data-delay={String((i % 3) + 1)}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left group">
                    <span className={`sf ${T.h4} group-hover:text-[#1E1610] transition-colors`}>{q}</span>
                    <span className={`flex-shrink-0 h-5 w-5 border border-[#E8DFD3] rounded-full flex items-center justify-center text-[10px] transition-all duration-300 ${openFaq === i ? "bg-[#1E1610] text-white border-[#1E1610] rotate-45" : "text-[#6B5E4F]"}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="pb-6"><p className={`${T.body} text-[#6B5E4F]`}>{a}</p></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 text-center">
            <p className={`${T.label} text-[#6B5E4F]`} data-reveal>This is not a mockup. See it work.</p>
            <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Type a brief.<br />Watch the agents deliver.</h2>
            <p className={`mt-5 ${T.lead} text-[#6B5E4F] max-w-xl mx-auto`} data-reveal data-delay="2">We work with a small number of institutions per cohort. No setup, no integration, running on illustrative data for a demonstration market.</p>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-3" data-reveal data-delay="3">
              <a href="mailto:hello@madison.ai" className={BTN.primary}>
                Request a demo <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="#live-run" className={BTN.secondary}>
                See a live run
              </a>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className={`${T.label} text-[#6B5E4F] mb-6`} data-reveal>What to expect</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { n:"01", t:"30-minute working session",    d:"A live run on one of your real, masked campaigns with a marketer on your team." },
                  { n:"02", t:"Reference architecture",       d:"A reference architecture for your CISO, reviewed by your security team." },
                  { n:"03", t:"Scoping document",             d:"A scoping document within 48 hours, tailored to your stack and workflows." },
                  { n:"04", t:"Proof before procurement",     d:"See value in week one with no integration, before any procurement gate." },
                ].map(({ n, t, d }) => (
                  <div key={n} data-reveal className="border border-[#E8DFD3] bg-[#F1EBE1] p-6 hover:border-[#1E1610] hover:shadow-sm transition-all duration-300">
                    <span className="text-[11px] text-[#1E1610] block mb-3">{n}</span>
                    <p className={`font-medium ${T.sm} text-[#1E1610]`}>{t}</p>
                    <p className={`mt-2 ${T.sm} text-[#6B5E4F] leading-snug`}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="md:col-span-5 border border-[#E8DFD3] bg-[#F1EBE1] p-8 self-start" data-reveal data-delay="2">
              <p className={`${T.label} text-[#6B5E4F]`}>Who it fits</p>
              <dl className="mt-6 divide-y divide-[#E8DFD3]">
                {[
                  { dt:"Institution",   dd:"US bank or credit union" },
                  { dt:"Size",          dd:"$1B–$10B in assets" },
                  { dt:"Owner",         dd:"Head or VP of Marketing" },
                  { dt:"Co-signer",     dd:"Compliance or Risk" },
                  { dt:"Autonomy",      dd:"Recommend, human approves" },
                ].map(({ dt, dd }) => (
                  <div key={dt} className="flex items-center justify-between py-3.5">
                    <dt className={`${T.sm} text-[#6B5E4F]`}>{dt}</dt>
                    <dd className={`${T.sm} font-medium text-right`}>{dd}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
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
            <p>Compliance labels reflect audit status at time of publication.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
