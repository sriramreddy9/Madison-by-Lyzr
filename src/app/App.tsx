import { useState, useEffect, useRef } from "react";
import CommercialBanking from "./CommercialBanking";
import RetailBanking from "./RetailBanking";
import DealIntelligence from "./DealIntelligence";
import CompliantMarketing from "./CompliantMarketing";
import RiskCompliance from "./RiskCompliance";
import DisputeResolution from "./DisputeResolution";
import HR from "./HR";

/* ── images ── */
const IMG = {
  hero:       "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/942f099b-dfbb-44cf-ad86-dfb8f36a6a31/hero-ny.jpg",
  frontOffice:"https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/50ac8218-ba9d-4b18-845e-a62283c840d4/front-office.jpg",
  governance: "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/22509f6d-0850-4622-b385-5e7e23f65cc4/governance.jpg",
  backOffice: "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/bb3591ba-d458-49ba-88de-e831d343d9d7/back-office.jpg",
  govSection: "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/1817a320-d762-465f-b3b6-ffd53cda6a04/section-governance.jpg",
};

/* ── data ── */
const firms = ["MERIDIAN NATIONAL","ASHFIELD CAPITAL","CONTINENTAL TRUST","HARBORVIEW CREDIT UNION","VANTAGE BANCORP","NORTHWIND FINANCIAL","KESTREL SAVINGS","ATLAS MUTUAL"];

const offices = [
  { n:"01", title:"Front Office",  tag:"Client-facing revenue & relationships.", items:["Onboarding","RM & advisor copilot","Lending support","Engagement"],    image:IMG.frontOffice },
  { n:"02", title:"Middle Office", tag:"Risk, compliance & control.",            items:["KYC/CDD","AML triage","Credit review","Covenant & liquidity monitoring"], image:IMG.governance },
  { n:"03", title:"Back Office",   tag:"Processing, settlement & servicing.",   items:["Reconciliation","Disputes & chargebacks","Payment exceptions","Loan servicing"], image:IMG.backOffice },
  { n:"04", title:"Corporate",     tag:"Running the institution.",               items:["Regulatory reporting","Forecasting","Vendor / TPRM review","Contract analysis"], image:IMG.govSection },
];

const certs = ["SOC 2 Type II","GDPR Compliant","ISO 27001","DPDP Act (India)","GLBA","DORA (EU)"];

const pillars = [
  { n:"01", title:"Build your own",   body:"With Architect and Studio, your teams create custom agents and workflows in plain language.", tags:["Architect","Studio"] },
  { n:"02", title:"Deploy your way",  body:"With Sovereign and Optimus, run Madison in cloud, on-prem, or fully air-gapped.", tags:["Sovereign","Optimus"] },
  { n:"03", title:"Unify what you have", body:"With the Control Plane, bring existing agents and AI workflows into one governed layer.", tags:["Control Plane"] },
];

const advisors = [
  { name:"Marcus Halloran", role:"Former Group COO · Major Systemic Bank",         bio:"Twenty-five years scaling treasury and risk operations across three continents.",              prev:"Meridian National" },
  { name:"Priya Anand",     role:"Former Head of Model Risk · Global Asset Manager",bio:"Built model-risk governance for a top-10 asset manager. PhD in applied probability.",        prev:"Ashford Capital" },
  { name:"Daniel Sato",     role:"Former Chief Risk Officer · Investment Bank",     bio:"Two decades in market and credit risk. Led a global bank's Basel III/IV rollout.",            prev:"Continental Trust" },
  { name:"Elena Petrova",   role:"Former Chief Compliance Officer · National CU",  bio:"Directed BSA/AML and sanctions programs through two supervisory examinations.",               prev:"Harborview Credit Union" },
  { name:"Robert Chen",     role:"Former Bank Examiner · Federal Banking Agency",  bio:"Two decades shaping supervisory policy and examination standards.",                            prev:"Federal Banking Agency" },
  { name:"Sarah Whitfield", role:"Former CFO · Regional Bank Holding Co.",         bio:"Guided finance and treasury through multiple M&A integrations and regulatory exams.",         prev:"Vantage Bancorp" },
];

const tones = [
  "#2a1d13","#3a2a1a","#1E1610","#2a1d13","#3a2a1a","#241812",
];

const navTeams = [
  { label:"Commercial Banking", href:"#", live:true },
  { label:"Retail Banking",     href:"#", live:true },
  { label:"Deal Intelligence",  href:"#", live:true },
  { label:"Compliant Marketing",href:"#", live:true },
  { label:"Underwriting",       href:"#", live:false },
  { label:"KYC",                href:"#", live:false },
  { label:"Risk & Compliance",  href:"#", live:true },
  { label:"Reconciliations",    href:"#", live:false },
  { label:"Dispute Resolution", href:"#", live:true },
  { label:"HR",                 href:"#", live:true },
];

const hrCells = ["Hire","Onboard","Learn & develop","Agentic OS","Orchestrating","—","Review","Reward","Exit interview"];

/* ── type scale: major third, H1 = 48px ── */
const T = {
  h1:   "text-[48px] leading-[1.04]",
  h2:   "text-[38px] leading-[1.06]",
  h3:   "text-[30px] leading-[1.1]",
  h4:   "text-[24px] leading-[1.2]",
  lead: "text-[19px] leading-relaxed",
  body: "text-base leading-relaxed",
  sm:   "text-[13px] leading-relaxed",
  label:"text-[10px] uppercase tracking-[0.28em]",
  mono: "font-mono text-[11px] tracking-widest",
};

function initials(name: string) {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("");
}

export default function App() {
  const [page,         setPage]         = useState("home");
  const [navScrolled,  setNavScrolled]  = useState(false);
  const [mobileOpen,  setMobileOpen]    = useState(false);
  const [activeOffice,setActiveOffice]  = useState(0);
  const [advisorIdx,  setAdvisorIdx]    = useState(0);
  const [advisorKey,  setAdvisorKey]    = useState(0);
  const [heroParallax,setHeroParallax]  = useState(0);
  const officeTimerRef  = useRef<ReturnType<typeof setInterval>|null>(null);
  const advisorTimerRef = useRef<ReturnType<typeof setInterval>|null>(null);

  /* ── scroll: nav + parallax ── */
  useEffect(() => {
    const fn = () => {
      setNavScrolled(window.scrollY > 60);
      setHeroParallax(window.scrollY * 0.26);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── global scroll-reveal ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in-view"); obs.unobserve(e.target); }
      }),
      { threshold: 0.07, rootMargin: "0px 0px -48px 0px" }
    );
    document.querySelectorAll("[data-reveal],[data-stat]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── office auto-rotate ── */
  const startOfficeTimer = () => {
    if (officeTimerRef.current) clearInterval(officeTimerRef.current);
    officeTimerRef.current = setInterval(() => {
      setActiveOffice(p => (p + 1) % offices.length);
    }, 6000);
  };
  useEffect(() => { startOfficeTimer(); return () => { if (officeTimerRef.current) clearInterval(officeTimerRef.current); }; }, []);

  /* ── advisor auto-rotate ── */
  const startAdvisorTimer = () => {
    if (advisorTimerRef.current) clearInterval(advisorTimerRef.current);
    advisorTimerRef.current = setInterval(() => {
      setAdvisorIdx(p => (p + 1) % advisors.length);
      setAdvisorKey(k => k + 1);
    }, 5000);
  };
  useEffect(() => { startAdvisorTimer(); return () => { if (advisorTimerRef.current) clearInterval(advisorTimerRef.current); }; }, []);

  const navigate = (p: string) => { setPage(p); window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); };
  const goOffice = (i: number) => { setActiveOffice(i); startOfficeTimer(); };
  const goAdvisor = (i: number) => { setAdvisorIdx(i); setAdvisorKey(k => k + 1); startAdvisorTimer(); };
  const nextAdvisor = () => goAdvisor((advisorIdx + 1) % advisors.length);
  const prevAdvisor = () => goAdvisor((advisorIdx - 1 + advisors.length) % advisors.length);

  const maxAdvisorIdx = Math.max(0, advisors.length - 3);
  const navUnderline = "relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-px after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100";

  if (page === "commercial-banking") {
    return <CommercialBanking navigate={navigate} />;
  }

  if (page === "retail-banking") {
    return <RetailBanking navigate={navigate} />;
  }

  if (page === "deal-intelligence") {
    return <DealIntelligence navigate={navigate} />;
  }

  if (page === "compliant-marketing") {
    return <CompliantMarketing navigate={navigate} />;
  }

  if (page === "risk-compliance") {
    return <RiskCompliance navigate={navigate} />;
  }

  if (page === "dispute-resolution") {
    return <DisputeResolution navigate={navigate} />;
  }

  if (page === "hr") {
    return <HR navigate={navigate} />;
  }

  return (
    <>
      <style>{`
        h1,h2,h3,h4{font-family:'Playfair Display',serif;letter-spacing:-.02em}
        body{font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;background:#F9F5F1}
        .sf{font-family:'Playfair Display',serif;letter-spacing:-.02em}
        ::selection{background:#1E1610;color:#fff}
        .grid-lines{background-image:linear-gradient(to right,rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.06) 1px,transparent 1px);background-size:80px 80px}
        .ochre-rule{height:1px;background:linear-gradient(to right,transparent,#1E1610 40%,#1E1610 60%,transparent)}

        @keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.3}}
        .pulse-dot{animation:pulse-dot 1.6s ease-in-out infinite}

        @keyframes fade-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        .fade-up  {animation:fade-up .9s        cubic-bezier(.16,1,.3,1) both}
        .fade-up-2{animation:fade-up .9s  .12s  cubic-bezier(.16,1,.3,1) both}
        .fade-up-3{animation:fade-up .9s  .24s  cubic-bezier(.16,1,.3,1) both}
        .fade-up-4{animation:fade-up .9s  .36s  cubic-bezier(.16,1,.3,1) both}

        @keyframes ping{0%{transform:scale(1);opacity:.8}70%,100%{transform:scale(2.2);opacity:0}}
        .ping{animation:ping 1.8s ease-out infinite}

        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .animate-marquee{animation:marquee 50s linear infinite}
        .marquee-mask{-webkit-mask-image:linear-gradient(to right,transparent,black 6%,black 94%,transparent);mask-image:linear-gradient(to right,transparent,black 6%,black 94%,transparent)}

        /* scroll reveal */
        [data-reveal]{opacity:0;transform:translateY(28px);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}
        [data-reveal="left"]{transform:translateX(-28px)}
        [data-reveal="scale"]{transform:scale(.93)}
        [data-reveal].in-view{opacity:1;transform:none}
        [data-delay="1"]{transition-delay:.06s}
        [data-delay="2"]{transition-delay:.13s}
        [data-delay="3"]{transition-delay:.20s}
        [data-delay="4"]{transition-delay:.27s}
        [data-delay="5"]{transition-delay:.34s}
        [data-delay="6"]{transition-delay:.41s}

        /* stat pop */
        @keyframes stat-pop{from{opacity:0;transform:scale(.9) translateY(14px)}to{opacity:1;transform:none}}
        [data-stat].in-view{animation:stat-pop .6s cubic-bezier(.16,1,.3,1) both}
        [data-stat][data-delay="1"].in-view{animation-delay:.06s}
        [data-stat][data-delay="2"].in-view{animation-delay:.12s}
        [data-stat][data-delay="3"].in-view{animation-delay:.18s}

        /* advisor progress bar */
        @keyframes progress-fill{from{width:0%}to{width:100%}}
        .progress-bar{animation:progress-fill 5s linear both}

        /* office image transition */
        .office-img{transition:opacity .7s ease,transform .7s ease}
        .office-img.active{opacity:1;transform:scale(1)}
        .office-img.idle{opacity:0;transform:scale(1.04)}

        /* pillar hover */
        .pillar{transition:background .3s,color .3s}
        .pillar:hover{background:#1E1610;color:#fff}
        .pillar:hover .pillar-body{color:rgba(255,255,255,.72)}
        .pillar:hover .pillar-tag{border-color:rgba(255,255,255,.25)}

        /* solution card */
        .sol-card{transition:transform .25s ease,box-shadow .25s ease}
        .sol-card:hover{transform:translateY(-3px);box-shadow:0 12px 40px -12px rgba(0,0,0,.16)}

        /* ws-accent tab indicator */
        .ws-accent::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:#1E1610;transform:scaleY(0);transform-origin:bottom;transition:transform .35s cubic-bezier(.16,1,.3,1)}
        .ws-accent.on::before,.ws-accent:hover::before{transform:scaleY(1)}
        .tab-content{transition:opacity .18s ease,transform .18s ease}
        .tab-content.out{opacity:0;transform:translateY(8px)}
        .tab-content.in{opacity:1;transform:none}
      `}</style>

      <div className="min-h-screen" style={{fontFamily:"'DM Sans',sans-serif",background:"#F9F5F1",color:"#1E1610"}}>

        {/* ════════ NAV ════════ */}
        <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-400 ${navScrolled?"border-[#E8DFD3] bg-[#F9F5F1]/90 text-[#1E1610]":"border-transparent text-white"}`}
          style={{backdropFilter:navScrolled?"saturate(160%) blur(12px)":"none"}}>
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
            <a href="#top" className="sf text-[24px] tracking-tight hover:opacity-70 transition-opacity">Madison</a>

            <nav className="hidden items-center gap-8 text-sm md:flex">
              {["Platform","Coverage","Solutions"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className={navUnderline}>{l}</a>
              ))}

              {/* For your team dropdown */}
              <div className="group relative">
                <button className={`inline-flex items-center gap-1 ${navUnderline}`}>
                  For your team
                  <svg className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 8l5 5 5-5"/></svg>
                </button>
                <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute left-1/2 top-full mt-4 w-[520px] -translate-x-1/2 border border-[#E8DFD3] bg-[#F9F5F1] p-4 text-[#1E1610] shadow-[0_30px_80px_-30px_rgba(0,0,0,.32)] transition-all duration-250">
                  <p className={`mb-3 px-2 ${T.label} text-[#6B5E4F]`}>For your team</p>
                  <ul className="grid grid-cols-2 gap-0.5 text-sm">
                    {navTeams.map(t => (
                      <li key={t.label}>
                        <button
                          onClick={() => {
                            if (t.label === "Commercial Banking") navigate("commercial-banking");
                            else if (t.label === "Retail Banking") navigate("retail-banking");
                            else if (t.label === "Deal Intelligence") navigate("deal-intelligence");
                            else if (t.label === "Compliant Marketing") navigate("compliant-marketing");
                            else if (t.label === "Risk & Compliance") navigate("risk-compliance");
                            else if (t.label === "Dispute Resolution") navigate("dispute-resolution");
                            else if (t.label === "HR") navigate("hr");
                          }}
                          className={`w-full flex items-center justify-between rounded-sm px-3 py-2.5 transition-colors text-left ${["Commercial Banking","Retail Banking","Deal Intelligence","Compliant Marketing","Risk & Compliance"].includes(t.label) ? "font-medium hover:bg-[#1E1610] hover:text-white" : "hover:bg-[#F1EBE1]"}`}>
                          {t.label}
                          {!t.live && <span className="rounded-full border border-[#E8DFD3] px-2 py-0.5 text-[9px] uppercase tracking-widest text-[#6B5E4F]">Soon</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {["Governance","Advisors"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className={navUnderline}>{l}</a>
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
                {["Platform","Coverage","Solutions","Commercial Banking →","Governance","Advisors"].map(l => (
                  <a key={l} href="#" className="py-2 border-b border-[#E8DFD3] last:border-0" onClick={() => setMobileOpen(false)}>{l}</a>
                ))}
                <a href="#contact" className="mt-3 inline-flex rounded-sm border border-[#1E1610] px-4 py-2 text-xs w-fit" onClick={() => setMobileOpen(false)}>Request a demo</a>
              </div>
            </div>
          )}
        </header>

        {/* ════════ HERO ════════ */}
        <section id="top" className="relative isolate overflow-hidden text-white min-h-screen flex items-end">
          <img src={IMG.hero} alt="Lower Manhattan at golden hour" className="absolute inset-0 -z-10 h-full w-full object-cover will-change-transform"
            style={{transform:`translateY(${heroParallax}px)`,transformOrigin:"center top"}}/>
          <div className="absolute inset-0 -z-10" style={{background:"linear-gradient(135deg,rgba(0,0,0,.88),rgba(0,0,0,.55),rgba(0,0,0,.18))"}}/>
          <div className="absolute inset-0 -z-10 grid-lines opacity-40"/>
          <div className="absolute left-6 top-24 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1E1610]/30 to-transparent hidden lg:block"/>

          <div className="relative mx-auto max-w-[1400px] px-6 pb-24 pt-36 md:pb-40 md:pt-48">
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/6 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.26em] text-white/85 backdrop-blur-sm fade-up">
              <span className="relative h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-white ping"/>
                <span className="relative block h-1.5 w-1.5 rounded-full bg-white"/>
              </span>
              The Agentic Banking OS
            </p>

            <h1 className={`sf ${T.h1} max-w-[14ch] tracking-tight fade-up-2`}>
              Madison helps<br/><em className="italic text-white/88">run your bank.</em>
            </h1>

            <p className={`mt-8 max-w-xl ${T.lead} text-white/84 fade-up-3`}>
              Governed AI agents across every banking function.<br/>
              One platform. Your data, your perimeter, your control.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3 fade-up-3">
              <a href="#contact" className={`group inline-flex items-center gap-2 rounded-sm bg-white px-5 py-3 ${T.sm} font-medium text-[#1E1610] hover:opacity-90 transition-opacity`}>
                Request a demo
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="#platform" className={`inline-flex items-center gap-2 rounded-sm border border-white/30 px-5 py-3 ${T.sm} font-medium text-white hover:bg-white/10 transition-colors`}>
                Explore the platform
              </a>
              <a href="#solutions" className={`ml-1 inline-flex items-center gap-1 ${T.sm} text-white/80 underline-offset-4 hover:text-white hover:underline transition-colors`}>
                Or jump to your team →
              </a>
            </div>

            <div className="mt-14 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 fade-up-4">
              {["Governed by design","Runs in your perimeter","Human in the loop","Exportable audit trail"].map(t => (
                <div key={t} className="flex items-start gap-2 text-[13px] text-white/80">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full border border-white/50 flex-shrink-0"/>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ MARQUEE ════════ */}
        <section className="border-y border-[#E8DFD3] bg-[#F1EBE1]/70">
          <div className="mx-auto max-w-[1400px] px-6 py-8">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
              <p className={`${T.label} text-[#6B5E4F]`}>In pilot and production</p>
              <p className="text-[11px] text-[#6B5E4F]/70">Illustrative wordmarks — customer names published only with signed approval.</p>
            </div>
            <div className="relative overflow-hidden marquee-mask">
              <div className="flex w-max animate-marquee items-center gap-14 whitespace-nowrap">
                {[...firms, ...firms].map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-3 text-[#1E1610]/65">
                    <span className="grid h-7 w-7 place-items-center rounded-sm border border-[#E8DFD3] sf text-sm text-[#1E1610]/55">{f[0]}</span>
                    <span className="sf text-lg tracking-[0.22em]">{f}</span>
                    <span className="text-[#1E1610]/22">•</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════ COVERAGE ════════ */}
        <section id="coverage" className="scroll-mt-24 border-b border-[#E8DFD3]">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Front-to-back coverage</p>
                <h2 className={`mt-4 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">One platform, from the<br/>front office to the back.</h2>
                <p className={`mt-6 max-w-2xl ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Madison deploys agents across the full operating stack of a bank. Not a single point solution, but coverage end to end.</p>
              </div>
              <div className="flex items-center gap-2" data-reveal data-delay="3">
                <button onClick={() => goOffice((activeOffice - 1 + offices.length) % offices.length)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#E8DFD3] hover:bg-[#1E1610] hover:text-white hover:border-[#1E1610] transition-all">‹</button>
                <button onClick={() => goOffice((activeOffice + 1) % offices.length)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#E8DFD3] hover:bg-[#1E1610] hover:text-white hover:border-[#1E1610] transition-all">›</button>
              </div>
            </div>

            <div className="grid items-stretch gap-10 md:grid-cols-12" data-reveal>
              {/* Image */}
              <div className="relative overflow-hidden md:col-span-7 aspect-[4/3] bg-[#F1EBE1]">
                {offices.map((o, i) => (
                  <div key={i} className={`office-img absolute inset-0 ${i === activeOffice ? "active" : "idle"}`}>
                    <img src={o.image} alt={o.title} className="h-full w-full object-cover"/>
                    <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.1),transparent)"}}/>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="text-[10px] tracking-widest text-white/70 mb-2">{o.n} / 04</p>
                      <h3 className={`sf ${T.h3}`}>{o.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
              {/* List */}
              <div className="md:col-span-5 flex flex-col divide-y divide-[#E8DFD3] border border-[#E8DFD3]">
                {offices.map((o, i) => (
                  <button key={i} onClick={() => goOffice(i)}
                    className={`flex-1 px-6 py-6 text-left transition-all duration-300 ${i === activeOffice ? "bg-[#1E1610] text-white" : "bg-[#F9F5F1] hover:bg-[#F1EBE1]"}`}>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-[10px] tracking-widest ${i === activeOffice ? "text-white/60" : "text-[#6B5E4F]"}`}>{o.n}</span>
                      <span className={`sf ${T.h4}`}>{o.title}</span>
                    </div>
                    <p className={`${T.sm} mt-1 ${i === activeOffice ? "text-white/75" : "text-[#6B5E4F]"}`}>{o.tag}</p>
                    {i === activeOffice && (
                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-white/85">
                        {o.items.map(item => (
                          <li key={item} className="flex items-center gap-1.5">
                            <span className="h-1 w-1 rounded-full bg-[#1E1610]"/>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════ AUTONOMY ════════ */}
        <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-28 grid gap-12 md:grid-cols-12">
            <p className={`${T.sm} text-[#6B5E4F] md:col-span-4`} data-reveal>
              Our agents work at the right level of autonomy for each function — they{" "}
              <em className="sf italic text-[#1E1610]">assist</em>,{" "}
              <em className="sf italic text-[#1E1610]">recommend</em>, or{" "}
              <em className="sf italic text-[#1E1610]">automate</em>. You set the level; Madison keeps a human in the loop wherever it matters.
            </p>
            <div className="grid gap-6 md:col-span-8 md:grid-cols-3">
              {[
                { code:"A",  title:"Assist",    body:"A copilot to your experts." },
                { code:"R",  title:"Recommend", body:"Prepares and drafts; your team decides." },
                { code:"Au", title:"Automate",  body:"Runs end to end, humans on exceptions." },
              ].map(({code,title,body},i) => (
                <div key={title} data-reveal data-delay={String(i+1)}
                  className="group border border-[#E8DFD3] bg-[#F9F5F1] p-6 hover:border-[#1E1610] hover:bg-[#1E1610] hover:text-white transition-all duration-300">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="grid h-11 w-11 place-items-center rounded-sm bg-[#1E1610] sf text-lg text-white group-hover:bg-white group-hover:text-[#1E1610] transition-colors">{code}</span>
                    <h3 className={`sf ${T.h4}`}>{title}</h3>
                  </div>
                  <p className={`${T.sm} text-[#6B5E4F] group-hover:text-white/70 transition-colors`}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ SOLUTIONS ════════ */}
        <section id="solutions" className="scroll-mt-24 border-b border-[#E8DFD3] bg-[#F1EBE1]/50">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
            <div className="mb-12 grid gap-6 md:grid-cols-12">
              <p className={`${T.label} text-[#6B5E4F] md:col-span-3`} data-reveal>Solutions</p>
              <div className="md:col-span-9">
                <h2 className={`sf ${T.h2} max-w-3xl tracking-tight`} data-reveal data-delay="1">Find the agent build to your work,<br/>or get one custom made</h2>
                <p className={`mt-6 max-w-2xl ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">A dedicated view of how Madison runs inside each function — the metrics, integrations, and deployment notes you would ask on day one.</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-6">
              {/* Commercial Banking — large card */}
              <div data-reveal className="sol-card group flex flex-col gap-4 border border-[#E8DFD3] bg-[#F9F5F1] p-6 md:col-span-4 cursor-pointer hover:border-[#1E1610]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`sf ${T.h4} leading-tight`}>Commercial Banking — RM</h3>
                  <span className="rounded-full bg-[#1E1610]/8 px-2 py-0.5 text-[10px] uppercase tracking-widest text-[#1E1610]">Live</span>
                </div>
                <p className={`${T.sm} text-[#6B5E4F]`}>Meeting prep, portfolio watch, and outbound briefs for every relationship manager on the desk.</p>
                <ul className="mt-4 divide-y divide-[#E8DFD3] border border-[#E8DFD3] bg-[#F9F5F1] text-sm">
                  {[
                    { name:"Meeting-brief agent",   status:"Done",    dot:"bg-[#1E1610]" },
                    { name:"Portfolio-watch agent",  status:"Running", dot:"bg-[#1E1610]/55 pulse-dot" },
                    { name:"Outbound-scan agent",    status:"Queued",  dot:"bg-[#6B5E4F]/45" },
                  ].map(({name,status,dot}) => (
                    <li key={name} className="flex items-center justify-between px-4 py-2.5">
                      <span className={T.sm}>{name}</span>
                      <span className="inline-flex items-center gap-2 text-xs text-[#6B5E4F]">
                        <span className={`h-1.5 w-1.5 rounded-full ${dot}`}/>
                        {status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Underwriting */}
              <div data-reveal data-delay="1" className="flex flex-col gap-4 border border-[#E8DFD3] bg-[#F9F5F1] p-6 md:col-span-2">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`sf ${T.h4} leading-tight`}>Underwriting</h3>
                  <span className="rounded-full border border-[#E8DFD3] px-2 py-0.5 text-[10px] uppercase tracking-widest text-[#6B5E4F]">Soon</span>
                </div>
                <p className={`${T.sm} text-[#6B5E4F]`}>Credit decisioning end to end — analyst-grade memos, model scores, and a human at the gate.</p>
                <div className="mt-auto border border-[#E8DFD3] bg-[#F1EBE1] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B5E4F]">App #U-4021</span>
                    <span className="text-xs">✓ Approved</span>
                  </div>
                  <p className={`mt-1 ${T.label} text-[#6B5E4F]`}>Small business · 24-month term</p>
                  <div className="mt-3 flex items-baseline justify-between">
                    <div><p className={`${T.label} text-[#6B5E4F]`}>DSCR</p><p className={`sf ${T.h4}`}>1.42×</p></div>
                    <div><p className={`${T.label} text-[#6B5E4F]`}>Model conf.</p><p className={`sf ${T.h4}`}>92%</p></div>
                  </div>
                </div>
              </div>

              {/* Reconciliations */}
              <div data-reveal data-delay="2" className="flex flex-col gap-4 border border-[#E8DFD3] bg-[#F9F5F1] p-6 md:col-span-2">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`sf ${T.h4} leading-tight`}>Reconciliations</h3>
                  <span className="rounded-full border border-[#E8DFD3] px-2 py-0.5 text-[10px] uppercase tracking-widest text-[#6B5E4F]">Soon</span>
                </div>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className={`sf ${T.h1} tracking-tight`}>94%</span>
                  <span className={`${T.sm} text-[#6B5E4F]`}>Matched today</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#E8DFD3]">
                  <div className="h-full rounded-full bg-[#1E1610] transition-all duration-1000" style={{width:"94%"}}/>
                </div>
                <p className={`${T.sm} text-[#6B5E4F]`}>1,204 of 1,207 lines</p>
              </div>

              {/* Dispute Resolution */}
              <div data-reveal className="sol-card group flex flex-col gap-4 border border-[#E8DFD3] bg-[#F9F5F1] p-6 md:col-span-2 cursor-pointer hover:border-[#1E1610]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`sf ${T.h4} leading-tight`}>Dispute Resolution</h3>
                  <span className="rounded-full bg-[#1E1610]/8 px-2 py-0.5 text-[10px] uppercase tracking-widest">Live</span>
                </div>
                <ul className="mt-2 divide-y divide-[#E8DFD3] border border-[#E8DFD3] text-sm">
                  {[
                    { id:"#DR-4824", status:"Resolved", dot:"bg-[#1E1610]" },
                    { id:"#DR-4825", status:"In review", dot:"bg-[#1E1610]/55 pulse-dot" },
                  ].map(({id,status,dot}) => (
                    <li key={id} className="flex items-center justify-between px-4 py-2.5">
                      <span className={T.sm}>{id}</span>
                      <span className="inline-flex items-center gap-2 text-xs"><span className={`h-1.5 w-1.5 rounded-full ${dot}`}/>{status}</span>
                    </li>
                  ))}
                </ul>
                <p className={`mt-auto ${T.sm} text-[#6B5E4F]`}>86% auto-settled · 14% routed to adjuster</p>
              </div>

              {/* Risk & Compliance */}
              <div data-reveal data-delay="1" className="sol-card group flex flex-col gap-4 border border-[#E8DFD3] bg-[#F9F5F1] p-6 md:col-span-2 cursor-pointer hover:border-[#1E1610]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`sf ${T.h4} leading-tight`}>Risk &amp; Compliance</h3>
                  <span className="rounded-full bg-[#1E1610]/8 px-2 py-0.5 text-[10px] uppercase tracking-widest">Live</span>
                </div>
                <div className="mt-2 space-y-2">
                  {[
                    { lbl:"TPRM",     val:"Vendor Aspen · refresh in 30d" },
                    { lbl:"MRG",      val:"Model M-241 · drift flagged" },
                    { lbl:"Vendor-AI",val:"3 intakes · SOC 2 verified" },
                  ].map(({lbl,val}) => (
                    <div key={lbl} className="flex items-center justify-between border border-[#E8DFD3] bg-[#F1EBE1] px-3 py-2 gap-3">
                      <span className={`${T.label} text-[#6B5E4F] flex-shrink-0`}>{lbl}</span>
                      <span className={`${T.sm} text-right`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Retail Cross-sell */}
              <div data-reveal data-delay="2" className="sol-card group flex flex-col gap-4 border border-[#E8DFD3] bg-[#F9F5F1] p-6 md:col-span-2 cursor-pointer hover:border-[#1E1610]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`sf ${T.h4} leading-tight`}>Retail — Cross-sell</h3>
                  <span className="rounded-full bg-[#1E1610]/8 px-2 py-0.5 text-[10px] uppercase tracking-widest">Live</span>
                </div>
                <div className="mt-2 border border-[#E8DFD3] bg-[#F1EBE1] p-4">
                  <p className={`${T.sm} text-[#6B5E4F]`}>Which card earns the most on travel?</p>
                  <p className={`mt-2 sf text-[18px] leading-snug`}>The Sterling Travel card — 3× on flights, no FX fees.</p>
                </div>
              </div>

              {/* Compliant Marketing */}
              <div data-reveal className="sol-card group flex flex-col gap-4 border border-[#E8DFD3] bg-[#F9F5F1] p-6 md:col-span-2 cursor-pointer hover:border-[#1E1610]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`sf ${T.h4} leading-tight`}>Compliant Marketing</h3>
                  <span className="rounded-full bg-[#1E1610]/8 px-2 py-0.5 text-[10px] uppercase tracking-widest">Live</span>
                </div>
                <p className={`${T.sm} text-[#6B5E4F]`}>One brief in, a compliant, launch-ready campaign out — built on your own data, human-approved every step.</p>
                <div className="mt-auto flex flex-wrap gap-2 text-xs">
                  {["✓ Reg DD & Reg Z checked","✓ Human-approved","✓ Audit trail"].map(t => (
                    <span key={t} className="rounded-full border border-[#E8DFD3] bg-[#F1EBE1] px-3 py-1">{t}</span>
                  ))}
                </div>
              </div>

              {/* Deal Intelligence */}
              <div data-reveal data-delay="1" className="sol-card group flex flex-col gap-4 border border-[#E8DFD3] bg-[#F9F5F1] p-6 md:col-span-2 cursor-pointer hover:border-[#1E1610]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`sf ${T.h4} leading-tight`}>Deal Intelligence</h3>
                  <span className="rounded-full bg-[#1E1610]/8 px-2 py-0.5 text-[10px] uppercase tracking-widest">Live</span>
                </div>
                <ul className="mt-2 divide-y divide-[#E8DFD3] border border-[#E8DFD3] text-sm">
                  <li className="flex items-center justify-between px-4 py-2.5"><span className={T.sm}>MedTech · Series C</span><span className="text-xs text-red-700">● 2 flags</span></li>
                  <li className="flex items-center justify-between px-4 py-2.5"><span className={T.sm}>Enterprise SaaS · PE roll-up</span><span className="text-xs">● IC ready</span></li>
                </ul>
                <p className={`mt-auto ${T.sm} text-[#6B5E4F]`}>14 targets tracked · weekly memo drafted</p>
              </div>

              {/* KYC */}
              <div data-reveal data-delay="2" className="flex flex-col gap-4 border border-[#E8DFD3] bg-[#F9F5F1] p-6 md:col-span-2">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`sf ${T.h4} leading-tight`}>KYC</h3>
                  <span className="rounded-full border border-[#E8DFD3] px-2 py-0.5 text-[10px] uppercase tracking-widest text-[#6B5E4F]">Soon</span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-center">
                  {[{v:"96%",l:"Auto-clear"},{v:"412",l:"Cleared"},{v:"18",l:"Escalated"}].map(({v,l}) => (
                    <div key={l} className="border border-[#E8DFD3] bg-[#F1EBE1] p-3">
                      <p className={`sf ${T.h4}`}>{v}</p>
                      <p className={`${T.label} text-[#6B5E4F] mt-1`}>{l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* HR — large card */}
              <div data-reveal className="sol-card group flex flex-col gap-4 border border-[#E8DFD3] bg-[#F9F5F1] p-6 md:col-span-4 cursor-pointer hover:border-[#1E1610]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`sf ${T.h4} leading-tight`}>HR</h3>
                  <span className="rounded-full bg-[#1E1610]/8 px-2 py-0.5 text-[10px] uppercase tracking-widest">Live</span>
                </div>
                <p className={`${T.sm} text-[#6B5E4F]`}>The full employee journey, orchestrated end to end.</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  {hrCells.map((c, i) => (
                    <span key={i} className={`border border-[#E8DFD3] px-3 py-2 ${i === 3 ? "bg-[#1E1610] text-white border-[#1E1610]" : "bg-[#F1EBE1]"}`}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ EXPERIENCE (dark) ════════ */}
        <section id="experience" className="relative isolate border-b border-[#E8DFD3] text-white overflow-hidden" style={{background:"#1E1610"}}>
          <img src={IMG.hero} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-22"/>
          <div className="absolute inset-0 -z-10" style={{background:"linear-gradient(to bottom,rgba(30,22,16,.95),rgba(30,22,16,.85),rgba(30,22,16,.95))"}}/>
          <div className="absolute inset-0 -z-10 grid-lines opacity-30"/>

          <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
            <div className="mb-12 grid gap-6 md:grid-cols-12">
              <p className={`${T.label} text-white/55 md:col-span-3`} data-reveal>Experience Madison</p>
              <div className="md:col-span-9">
                <h2 className={`sf ${T.h2} tracking-tight`} data-reveal data-delay="1">See Madison at work.</h2>
                <p className={`mt-6 max-w-2xl ${T.lead} text-white/72`} data-reveal data-delay="2">Watch a governed agent take a real banking task from intake to a completed, audit-ready result.</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-12" data-reveal>
              {/* Video */}
              <div className="md:col-span-7">
                <div className="relative aspect-[16/10] overflow-hidden border border-white/12 bg-white/5">
                  <img src={IMG.backOffice} alt="" className="h-full w-full object-cover opacity-55"/>
                  <div className="absolute inset-0 grid place-items-center">
                    <button className="group grid h-20 w-20 place-items-center rounded-full bg-white text-[#1E1610] transition hover:scale-105 hover:bg-[#1E1610] hover:text-white" aria-label="Play demo">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-white"/> demo video · 2:14
                  </div>
                </div>
              </div>

              {/* Agent panel */}
              <div className="md:col-span-5">
                <div className="flex h-full flex-col gap-4 border border-white/12 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/55">
                    <span>Madison — Dispute Resolution Agent</span>
                    <span>Step 3 / 5</span>
                  </div>
                  <div className="flex items-center justify-between border-y border-white/12 py-3">
                    <span className={`${T.sm}`}>Case #DR-88214 · Card dispute</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[10px]">
                      <span className="pulse-dot h-1.5 w-1.5 rounded-full" style={{background:"#34d399"}}/>
                      running
                    </span>
                  </div>
                  <ul className={`space-y-2 ${T.sm} text-white/85`}>
                    <li>✓ Reviewed transaction history and merchant records.</li>
                    <li>✓ Matched dispute reason to Reg E provisional credit rule.</li>
                    <li>○ Drafted resolution letter — awaiting approval.</li>
                  </ul>
                  <div className="flex gap-2">
                    <button className="rounded-sm bg-white px-3 py-2 text-xs font-medium text-[#1E1610] hover:opacity-90 transition-opacity">Approve &amp; send</button>
                    <button className="rounded-sm border border-white/25 px-3 py-2 text-xs hover:bg-white/8 transition-colors">Edit draft</button>
                  </div>
                  <div className="mt-1 border-t border-white/12 pt-4">
                    <p className={`mb-2 ${T.label} text-white/45`}>Audit trail</p>
                    <ol className="space-y-1 text-[12px] text-white/80">
                      {["Read case #DR-88214","Queried merchant network","Applied Reg E policy v4.2","Drafted resolution letter","Awaiting human approval"].map(s => (
                        <li key={s}>· {s}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                "A dispute resolved end to end.",
                "Every step cited and logged.",
                "A human approval gate in action.",
              ].map((t,i) => (
                <div key={i} data-reveal data-delay={String(i+1)} className="flex items-start gap-4 border-t border-white/12 pt-6">
                  <span className="text-[11px] text-white/50">{String(i+1).padStart(2,"0")}</span>
                  <p className={`sf ${T.h4} leading-snug`}>{t}</p>
                </div>
              ))}
            </div>

            <div className="mt-12" data-reveal>
              <a href="#contact" className={`group inline-flex items-center gap-2 rounded-sm bg-white px-5 py-3 ${T.sm} font-medium text-[#1E1610] hover:opacity-90 transition-opacity`}>
                Request a live demo
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ════════ GOVERNANCE ════════ */}
        <section id="governance" className="scroll-mt-24 border-b border-[#E8DFD3]">
          <div className="mx-auto max-w-[1400px] grid gap-14 px-6 py-24 md:grid-cols-12 md:py-32">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Governance &amp; sovereignty</p>
              <h2 className={`mt-6 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Built for the way banks are regulated.</h2>
              <p className={`mt-6 max-w-lg ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Trust isn't a feature we added. It's the foundation. Every Madison agent runs with role-based access control, identity integration, and a native, exportable audit trail. Nothing leaves your perimeter.</p>
              <div className="mt-8 aspect-[4/3] w-full overflow-hidden border border-[#E8DFD3]" data-reveal data-delay="3">
                <img src={IMG.governance} alt="Governance vault" className="h-full w-full object-cover hover:scale-105 transition-transform duration-[2s]"/>
              </div>
            </div>

            <div className="md:col-span-7">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Security &amp; compliance</p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {certs.map((c, i) => (
                  <div key={c} data-reveal data-delay={String(i+1)}
                    className="flex items-center gap-2 border border-[#E8DFD3] bg-[#F1EBE1] px-4 py-3 hover:border-[#1E1610] hover:text-[#1E1610] transition-colors cursor-default">
                    <span className="text-[#1E1610]">✓</span>
                    <span className={T.sm}>{c}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {[
                  { icon:"🌐", title:"Deploy on your terms",        body:"Cloud, on-premises, or fully air-gapped — VPC, on-prem, and isolated environments so your data and inference stay inside your boundary." },
                  { icon:"🛡",  title:"Production-grade from day one",body:"Git-driven deployment, staged promotion, automated Responsible-AI and hallucination checks, one-click compliance logs." },
                ].map(({icon,title,body},i) => (
                  <div key={title} data-reveal data-delay={String(i+1)} className="border border-[#E8DFD3] p-6 hover:bg-[#F1EBE1] transition-colors">
                    <div className="text-2xl mb-4">{icon}</div>
                    <h3 className={`sf ${T.h4}`}>{title}</h3>
                    <p className={`mt-3 ${T.sm} text-[#6B5E4F]`}>{body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#6B5E4F]" data-reveal>
                <span>🔒 RBAC &amp; SSO</span>
                <span>✓ Exportable audit trail</span>
                <span>⛨ Zero data egress</span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ PLATFORM ════════ */}
        <section id="platform" className="scroll-mt-24 border-b border-[#E8DFD3] bg-[#F1EBE1]/55">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
            <div className="mb-12 grid gap-6 md:grid-cols-12">
              <p className={`${T.label} text-[#6B5E4F] md:col-span-3`} data-reveal>The platform beneath Madison</p>
              <div className="md:col-span-9">
                <h2 className={`sf ${T.h2} max-w-3xl tracking-tight`} data-reveal data-delay="1">Madison runs on Lyzr.<br/>Extend it, deploy it, unify it.</h2>
                <p className={`mt-6 max-w-2xl ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Madison is a complete banking solution today, and an open platform you can build on.</p>
                <p className={`mt-3 ${T.label} text-[#6B5E4F]`}>Built on Lyzr</p>
              </div>
            </div>

            <div className="grid gap-px overflow-hidden border border-[#E8DFD3] bg-[#E8DFD3] md:grid-cols-3" data-reveal>
              {pillars.map((p, i) => (
                <div key={i} className="pillar group flex flex-col justify-between gap-6 bg-[#F9F5F1] p-8">
                  <div>
                    <span className="text-[10px] tracking-widest text-[#6B5E4F] group-hover:text-white/60 transition-colors">{p.n}</span>
                  </div>
                  <div>
                    <h3 className={`sf ${T.h4}`}>{p.title}</h3>
                    <p className={`pillar-body mt-4 ${T.sm} text-[#6B5E4F] transition-colors`}>{p.body}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className={`pillar-tag rounded-full border border-[#E8DFD3] px-3 py-1 text-xs transition-colors`}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ ADVISORS ════════ */}
        <section id="advisors" className="scroll-mt-24 border-b border-[#E8DFD3]">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
            <div className="mb-12 grid gap-6 md:grid-cols-12">
              <p className={`${T.label} text-[#6B5E4F] md:col-span-3`} data-reveal>Shaped by industry leaders</p>
              <div className="md:col-span-9">
                <h2 className={`sf ${T.h2} max-w-3xl tracking-tight`} data-reveal data-delay="1">Guided by senior banking,<br/>risk &amp; regulation leaders.</h2>
                <p className={`mt-6 max-w-2xl ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Ex-bank executives who help shape how Madison is built and governed.</p>
              </div>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden" onMouseEnter={() => { if (advisorTimerRef.current) clearInterval(advisorTimerRef.current); }}
              onMouseLeave={startAdvisorTimer}>
              <div className="flex transition-transform duration-700 ease-out"
                style={{transform:`translateX(-${Math.min(advisorIdx, maxAdvisorIdx) * (100/3)}%)`}}>
                {advisors.map((a, i) => (
                  <article key={i} className="shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 p-3">
                    <div className="flex h-full flex-col border border-[#E8DFD3] bg-[#F9F5F1]">
                      {/* Portrait */}
                      <div className="relative aspect-[5/4] overflow-hidden" style={{background:`linear-gradient(135deg, ${tones[i]} 0%, #1E1610 100%)`}}>
                        <div className="absolute inset-0 grid-lines opacity-30"/>
                        <div className="absolute inset-0 grid place-items-center">
                          <span className="sf text-[88px] italic text-white/88 transition-transform duration-500 hover:scale-[1.04]">{initials(a.name)}</span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white" style={{background:"linear-gradient(to top,rgba(0,0,0,.7),rgba(0,0,0,.05),transparent)"}}>
                          <p className={`${T.label} text-white/72 mb-1`}>Previously</p>
                          <p className={`sf text-lg`}>{a.prev}</p>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex flex-1 flex-col gap-4 p-7">
                        <div className={`sf text-3xl leading-none text-[#1E1610]/25`}>"</div>
                        <p className={`sf ${T.h4} leading-snug font-normal`}>{a.bio}</p>
                        <div className="mt-auto flex items-center gap-3 border-t border-[#E8DFD3] pt-5">
                          <span className="grid h-11 w-11 place-items-center rounded-full sf text-sm text-white flex-shrink-0" style={{background:`linear-gradient(135deg, ${tones[i]} 0%, #1E1610 100%)`}}>{initials(a.name)}</span>
                          <div>
                            <p className="text-sm font-medium">{a.name}</p>
                            <p className={`${T.sm} text-[#6B5E4F]`}>{a.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {advisors.map((a, i) => (
                  <button key={i} onClick={() => goAdvisor(i)} aria-label={a.name}
                    className={`grid h-10 w-10 place-items-center rounded-full sf text-[11px] text-white ring-offset-2 transition-all ${i === advisorIdx ? "ring-2 ring-[#1E1610] scale-110" : "opacity-70 hover:opacity-100"}`}
                    style={{background:`linear-gradient(135deg, ${tones[i]} 0%, #1E1610 100%)`}}>
                    {initials(a.name)}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={prevAdvisor} className="grid h-10 w-10 place-items-center rounded-full border border-[#E8DFD3] hover:bg-[#1E1610] hover:text-white hover:border-[#1E1610] transition-all">‹</button>
                <button onClick={nextAdvisor} className="grid h-10 w-10 place-items-center rounded-full border border-[#E8DFD3] hover:bg-[#1E1610] hover:text-white hover:border-[#1E1610] transition-all">›</button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-[2px] w-full bg-[#E8DFD3] overflow-hidden">
              <div key={advisorKey} className="h-full bg-[#1E1610] progress-bar"/>
            </div>
          </div>
        </section>

        {/* ════════ CTA ════════ */}
        <section id="contact" className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
          <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 text-center">
            <p className={`${T.label} text-[#6B5E4F] justify-center flex`} data-reveal>Get started</p>
            <h2 className={`mx-auto mt-6 max-w-3xl sf ${T.h2} tracking-tight`} data-reveal data-delay="1">
              Get to production<br/>without cutting corners.
            </h2>
            <p className={`mx-auto mt-6 max-w-2xl ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">
              Every agent ships through the same governed pipeline — automated testing, compliance gates, staged promotion. Move fast, keep the controls a bank cannot compromise.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal data-delay="3">
              <a href="#contact" className={`group inline-flex items-center gap-2 rounded-sm bg-[#1E1610] px-5 py-3 ${T.sm} font-medium text-white hover:opacity-85 transition-opacity`}>
                Request a demo
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="#platform" className={`inline-flex items-center gap-2 rounded-sm border border-[#E8DFD3] bg-[#F9F5F1] px-5 py-3 ${T.sm} font-medium hover:bg-white hover:border-[#1E1610] transition-all`}>
                Explore the platform
              </a>
            </div>
          </div>
        </section>

        {/* ════════ FOOTER ════════ */}
        <footer style={{background:"#1E1610"}} className="text-white">
          <div className="mx-auto max-w-[1400px] px-6 py-16 grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <a href="#top" className="sf text-[30px] hover:opacity-70 transition-opacity">Madison</a>
              <p className={`mt-3 max-w-sm ${T.sm} text-white/55 leading-relaxed`}>The Agentic Banking OS — governed AI agents for banks and credit unions. Built on Lyzr.</p>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-3">
              {[
                {heading:"Platform",     links:["Platform","Solutions","Governance","Live demo"]},
                {heading:"Company",      links:["About","Pricing","Privacy","For developers"]},
                {heading:"Get in touch", links:["Book a demo","Talk to our team","Security overview"]},
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
              <p>© 2026 Madison. All rights reserved. Madison is built on the Lyzr platform.</p>
              <p>Built for New York, deployed worldwide.</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
