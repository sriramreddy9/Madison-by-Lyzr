import { useState, useEffect, useRef } from "react";

const HERO_IMG  = "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/1817a320-d762-465f-b3b6-ffd53cda6a04/section-governance.jpg";
const BACK_IMG  = "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/bb3591ba-d458-49ba-88de-e831d343d9d7/back-office.jpg";
const GOV_IMG   = "https://id-preview--3a3c2193-ea3d-443b-bd3f-3ece099afa34.lovable.app/__l5e/assets-v1/22509f6d-0850-4622-b385-5e7e23f65cc4/governance.jpg";

/* ── design tokens ── */
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

/* ── workspaces ── */
const workspaces = [
  {
    n:"01", title:"Third-Party Risk", sub:"Continuous vendor-risk loop, not quarterly questionnaires.",
    body:"Agents monitor 300+ vendors continuously — scoring inherent risk, tracking control effectiveness, and routing remediation tasks without waiting for the annual review cycle.",
    features:[
      { name:"Continuous monitoring",     desc:"Real-time signals replace static questionnaires. Risk scores update as news, ratings, and contract terms change." },
      { name:"Inherent risk scoring",     desc:"Each vendor rated against concentration, criticality, and data-access tiers — with the rationale written out." },
      { name:"Remediation routing",       desc:"Open findings routed to the vendor with deadlines tracked. Overdue items escalated automatically." },
      { name:"DORA Art. 28/30 mapping",   desc:"Contractual clauses mapped to regulatory obligations. Gaps flagged before the next audit cycle." },
    ],
  },
  {
    n:"02", title:"Vendor-AI Governance", sub:"Runtime supervision of every model embedded in a vendor product.",
    body:"Your vendor inventory now includes AI models you did not deploy. Madison identifies them, establishes performance baselines, and runs the tested kill-switch regulators require.",
    features:[
      { name:"Model inventory",           desc:"Identifies every AI model embedded in your vendor stack. Scored for risk tier under EU AI Act and SR 11-7." },
      { name:"Runtime supervision",       desc:"Performance baselines established. Drift, output anomalies, and explainability gaps flagged as they happen." },
      { name:"Tested kill-switch",        desc:"The switch exists and has been run. Evidence of a successful test attached to the vendor file." },
      { name:"ISO 42001 alignment",       desc:"Controls mapped to the AI management system standard — audit pack available before the examiner asks." },
    ],
  },
  {
    n:"03", title:"Operational Resilience", sub:"Prove you can leave a cloud before you have to.",
    body:"Generates orderly and stressed exit playbooks for every critical vendor — cost-modelled, time-stamped, tested. The T+41d recovery time and $2.3M migration cost are production figures.",
    features:[
      { name:"Exit playbook generation",  desc:"Orderly and stressed scenarios generated per vendor. Recovery timeline, cost model, and continuity confidence score." },
      { name:"Stress-test simulation",    desc:"Simulated vendor failure run against the playbook. Gaps identified before the regulator finds them." },
      { name:"Continuity evidence",       desc:"T+41d recovery, $2.3M migration cost, 82% continuity confidence — documented, auditable, defensible." },
      { name:"DORA TLPT readiness",       desc:"Threat-led penetration test evidence mapped to DORA requirements. Ready for 2026 first-wave assessments." },
    ],
  },
  {
    n:"04", title:"Source-to-Pay", sub:"Every step of procurement, agentic and audit-ready.",
    body:"From a buyer raising a request to payment clearing — eight steps, each governed, each logged. Policy, sanctions, and fraud checked at every hand-off, not just at the end.",
    features:[
      { name:"Conversational intake",     desc:"Policy and sanctions checked before the buyer sees the request. Non-compliant requests blocked at source." },
      { name:"Autonomous negotiation",    desc:"Parallel multi-vendor negotiation run by agents. Best terms surfaced, rationale documented." },
      { name:"Contract redline",          desc:"Clause-by-clause review against DORA Art. 28/30, audit rights, and exit terms. Gaps flagged for legal." },
      { name:"Touchless AP & payment",    desc:"Sanctions and fraud re-checked at the point of payment. Nothing clears that has not been re-screened." },
    ],
  },
];

/* ── trust rows ── */
const trustRows = [
  { g:"Human in the loop",         how:"Every finding, rating, decision.",       what:"No autonomous sends, no shadow verdicts. Approval is a first-class object." },
  { g:"Auditable, always",         how:"Every note, draft, action.",             what:"Versioned, attributable, exportable to your evidence store." },
  { g:"On-prem / VPC / air-gapped",how:"Your data, your region.",               what:"Nothing leaves your perimeter. Sovereign deployment on day one." },
  { g:"BYO-LLM",                   how:"Azure OpenAI, AWS Bedrock.",            what:"Your keys, your logs, your controls. No cross-tenant training." },
  { g:"Tested kill-switch",        how:"Documented, not assumed.",              what:"The switch has been run. Evidence sits in the vendor file." },
  { g:"Immutable decision ledger", how:"Tamper-evident from day one.",          what:"Every rating change, override, and approval written in sequence." },
];

const creds = ["SOC 2 Type II","ISO 27001","ISO 42001 aligned","GDPR Compliant","HIPAA","PCI-DSS","DORA-ready","FFIEC-aligned","RBI IT-Outsourcing","SAMA","CBUAE","On-prem / air-gapped"];

const businessMetrics = [
  { val:"318",   top:"Vendors governed",        bottom:"By 2 FTEs — the ratio the industry runs at." },
  { val:"$4.91M",top:"Avg third-party breach",  bottom:"267 days to contain. IBM 2025." },
  { val:"3-in-4",top:"Banks unprepared",        bottom:"For the AI kill-switch mandate. Wolters Kluwer." },
  { val:"T+41d", top:"Exit recovery time",      bottom:"$2.3M migration cost. 82% continuity confidence." },
];

const roadmap = [
  { step:"01", phase:"Scope & baseline",    timing:"Weeks 1-2",  desc:"Map the vendor inventory. Identify the top-10 critical vendors and the AI models embedded in each. No rip-and-replace." },
  { step:"02", phase:"TPRM live",           timing:"Weeks 3-4",  desc:"Continuous monitoring active on critical vendors. Questionnaire cycle replaced. Human-in-the-loop from day one." },
  { step:"03", phase:"Exit test run",       timing:"Weeks 5-8",  desc:"Generate the orderly exit playbook for the highest-concentration vendor. Run the stress simulation. Document the evidence." },
  { step:"04", phase:"Expand",             timing:"From week 8", desc:"Vendor-AI governance and source-to-pay added on the same platform. One audit trail. One examiner pack." },
];

const faqs = [
  { q:"Does the agent approve vendor relationships?",
    a:"No. The agent scores, monitors, and routes — a person approves every vendor relationship, every exception, every rating change. The approval is a first-class object in the audit trail." },
  { q:"How does Madison handle the AI kill-switch requirement?",
    a:"Madison identifies every AI model embedded in your vendor stack, establishes a performance baseline, and runs a documented kill-switch test. The evidence sits in the vendor file — the switch has been exercised, not merely described." },
  { q:"What happens if a vendor fails the exit simulation?",
    a:"The gap is documented with the specific step that failed — concentration risk, alternative supplier gap, data portability blocker. A remediation task is created and tracked. The regulator sees evidence of a test and a response, not an assumption of continuity." },
  { q:"Which regulators does Madison address?",
    a:"SR 26-2 (effective April 2026), DORA (EU), CBUAE (Gulf, up to AED 1B), RBI IT-Outsourcing and AI mandate, FFIEC, GLBA, EU AI Act Article 99. Regional trigger mapping available in the security pack." },
  { q:"Where does vendor data sit?",
    a:"Inside your perimeter. Madison deploys on-prem, VPC, or air-gapped. Your data never leaves your region. BYOK from day one." },
  { q:"How quickly can we see it?",
    a:"A 30-minute walkthrough on your actual vendor inventory — or synthetic data that mirrors your stack. Bring your highest-concentration vendor or your hardest exit scenario." },
];

const navTeams = [
  { label:"Commercial Banking" },
  { label:"Retail Banking" },
  { label:"Deal Intelligence" },
  { label:"Compliant Marketing" },
  { label:"Underwriting",       soon:true },
  { label:"KYC",                soon:true },
  { label:"Risk & Compliance",  active:true },
  { label:"Reconciliations",    soon:true },
  { label:"Dispute Resolution" },
  { label:"HR" },
];

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

export default function RiskCompliance({ navigate }: Props) {
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

  const routeTo = (label: string) => {
    if (label === "Commercial Banking")       navigate("commercial-banking");
    else if (label === "Retail Banking")      navigate("retail-banking");
    else if (label === "Deal Intelligence")   navigate("deal-intelligence");
    else if (label === "Compliant Marketing") navigate("compliant-marketing");
    else if (label === "Dispute Resolution")  navigate("dispute-resolution");
    else if (label === "HR")                  navigate("hr");
    else navigate("home");
  };

  return (
    <div className="min-h-screen" style={{ fontFamily:"'DM Sans',sans-serif", background:"#F9F5F1", color:"#1E1610" }}>
      <style>{SHARED_CSS}</style>

      {/* ── NAV ── */}
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
                        onClick={() => { if (!t.active && !t.soon) routeTo(t.label); }}
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
          <button onClick={() => setMobileOpen(v => !v)} className="md:hidden h-9 w-9 grid place-items-center border border-current rounded-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-[#E8DFD3]/40 bg-[#F9F5F1] text-[#1E1610] md:hidden">
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col gap-1 text-sm">
              <button onClick={() => { navigate("home"); setMobileOpen(false); }} className="py-2 border-b border-[#E8DFD3] text-left">← Home</button>
              {[["commercial-banking","Commercial Banking"],["retail-banking","Retail Banking"],["deal-intelligence","Deal Intelligence"],["compliant-marketing","Compliant Marketing"],["dispute-resolution","Dispute Resolution"],["hr","HR"]].map(([p,l]) => (
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
            <span>Risk &amp; Compliance</span>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden text-white min-h-[94vh] flex items-end">
        <img src={HERO_IMG} alt="Risk and compliance" className="absolute inset-0 -z-10 h-full w-full object-cover will-change-transform"
          style={{ transform:`translateY(${heroParallax}px)`, transformOrigin:"center top" }} />
        <div className="absolute inset-0 -z-10" style={{ background:"linear-gradient(155deg,rgba(0,0,0,.92) 0%,rgba(0,0,0,.62) 55%,rgba(0,0,0,.20) 100%)" }} />
        <div className="absolute inset-0 -z-10 grid-lines opacity-30" />
        <div className="absolute left-6 top-20 bottom-0 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent hidden lg:block" />
        <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-40 md:pb-28 md:pt-52">
          <div className="max-w-[780px]">
            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/6 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/80 backdrop-blur-sm fade-up">
              <span className="relative h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-white ping" />
                <span className="relative block h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              Madison for Risk &amp; Compliance
            </p>
            <h1 className={`sf ${T.h1} tracking-tight fade-up-2`}>
              The procurement &amp; risk desk,<br /><em className="italic text-white/80">built deep into banking.</em>
            </h1>
            <p className={`mt-7 max-w-lg ${T.lead} text-white/78 fade-up-3`}>
              Agentic third-party risk, vendor-AI governance, and tested vendor exits — on-prem, sovereign, examiner-ready.
            </p>
            <p className={`mt-3 ${T.sm} text-white/50 fade-up-3`}>North America · EU · Gulf/GCC · India — one platform, tuned to every regulator.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 fade-up-3">
              <a href="#contact" className={BTN.primary}>
                <span className="relative z-10">Become a design partner</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#workspaces" className={BTN.ghost}>See the use cases</a>
            </div>
          </div>
          <div className="mt-14 flex flex-wrap gap-x-7 gap-y-2">
            {["On-prem / VPC / air-gapped","Human in the loop","Tested kill-switch","Exportable audit trail"].map(t => (
              <span key={t} className="flex items-center gap-2 text-[12px] text-white/58">
                <span className="h-2.5 w-2.5 rounded-full border border-white/30" />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E8DFD3]">
          {[
            { val:"318/2",   label:"Vendors governed by 2 FTEs — the industry ratio" },
            { val:"$4.91M",  label:"Avg third-party breach cost · 267 days to contain" },
            { val:"3-in-4",  label:"Banks unprepared for AI kill-switch mandates" },
            { val:"14%",     label:"Of firms trust questionnaires reflect real risk" },
          ].map(({ val, label }, i) => (
            <div key={i} data-stat data-delay={String(i+1)} className="group px-8 py-12 hover:bg-[#F1EBE1] transition-colors cursor-default">
              <p className={`sf ${T.h1} tracking-tight`}>{val}</p>
              <p className={`mt-3 ${T.sm} text-[#6B5E4F]`}>{label}</p>
              <div className="mt-5 h-px w-8 bg-[#1E1610] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT FITS ── */}
      <section className="border-b border-[#E8DFD3]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-5 md:sticky md:top-28" data-reveal="scale">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F1EBE1]">
              <img src={BACK_IMG} alt="Risk operations" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] hover:scale-105" />
              <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(30,22,16,.75),transparent 55%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className={`${T.label} text-white/55 mb-2`}>Three risk capabilities</p>
                <div className="flex flex-wrap gap-2">
                  {["TPRM","Vendor-AI","Resilience","Source-to-Pay"].map(s => (
                    <span key={s} className="border border-white/20 bg-white/8 px-2.5 py-1 text-[11px] rounded-sm backdrop-blur-sm">{s}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-4 divide-x divide-[#E8DFD3] border border-[#E8DFD3]">
              {["TPRM","AI Gov","Resilience","S2P"].map(t => (
                <div key={t} className="py-2.5 text-center text-[11px] text-[#6B5E4F] hover:bg-[#F1EBE1] hover:text-[#1E1610] transition-colors">{t}</div>
              ))}
            </div>
            <p className={`mt-3 text-center ${T.label} text-[#6B5E4F]`}>One platform · every regulator</p>
          </div>
          <div className="md:col-span-7">
            <p className={`${T.label} text-[#6B5E4F]`} data-reveal>How it fits</p>
            <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Risk is the one line<br />a bank can never cut.</h2>
            <p className={`mt-6 ${T.lead} text-[#6B5E4F] max-w-lg`} data-reveal data-delay="2">Third-party risk, vendor-AI governance, and operational resilience — run as a continuous operating system, not a quarterly review cycle, on your own data and in your own perimeter.</p>
            <ul className="mt-10">
              {[
                { n:"01", t:"Third-Party Risk Management", d:"Continuous agentic vendor-risk loop. Agents score, monitor, and route remediation — replacing the questionnaire cycle with real-time intelligence." },
                { n:"02", t:"Vendor-AI & Model-Risk Governance", d:"Runtime supervision of every AI model embedded in a vendor product. Performance baselines established. Tested kill-switch documented." },
                { n:"03", t:"Operational Resilience / Exit Testing", d:"Generated orderly and stressed exit playbooks. Cost-modelled, time-stamped, simulated. Prove you can leave a cloud before you have to." },
                { n:"04", t:"Source-to-Pay", d:"Eight steps from buyer request to payment clearing — each governed, each logged. Policy and sanctions checked at every hand-off, not just at the end." },
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

      {/* ── WHERE MADISON FITS ── */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 text-center max-w-xl mx-auto">
            <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Where Madison fits</p>
            <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Not a GRC tool.<br />Not a vendor portal.</h2>
            <p className={`mt-5 ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">The governed AI layer across your risk and procurement function — connecting TPRM, model governance, resilience testing, and source-to-pay without replacing the systems you already run.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[#E8DFD3] border border-[#E8DFD3]">
            {[
              { icon:"✕", label:"Not", title:"A GRC platform module",             desc:"GRC tools track and document. Madison continuously monitors, scores, and routes remediation — before the annual review cycle.", dark:false },
              { icon:"✕", label:"Not", title:"A vendor questionnaire portal",     desc:"Questionnaires reflect what vendors say, not what the evidence shows. Madison monitors signals in real time and flags gaps as they emerge.", dark:false },
              { icon:"✓", label:"Is",  title:"A governed AI layer on your risk function", desc:"One orchestration layer across TPRM, vendor-AI governance, operational resilience, and source-to-pay — on your data, in your perimeter, with a human on every approval.", dark:true },
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

      {/* ── WORKSPACES ── */}
      <section id="workspaces" className="border-b border-[#E8DFD3] scroll-mt-20">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Risk workflows</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">From vendor intake to examined exit.</h2>
            </div>
            <div className="md:col-span-8 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F] max-w-lg`} data-reveal data-delay="2">Each workflow runs continuously, surfaces evidence, and keeps a person on every approval. Start with the function that carries your highest regulatory exposure.</p>
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

      {/* ── LIVE AGENT BRIEF (dark) ── */}
      <section className="relative overflow-hidden border-b border-[#E8DFD3]" style={{ background:"#1E1610" }}>
        <div className="absolute inset-0 grid-lines opacity-22" />
        <div className="absolute inset-0 opacity-12"><img src={GOV_IMG} className="h-full w-full object-cover" alt="" /></div>
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:py-32 grid gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-5 text-white">
            <p className={`${T.label} text-white/45 flex items-center gap-2`} data-reveal>
              <span className="relative h-2 w-2"><span className="absolute inset-0 rounded-full bg-white/50 ping" /><span className="relative block h-2 w-2 rounded-full bg-white/80" /></span>
              TPRM dashboard · live · 318 vendors
            </p>
            <h2 className={`mt-6 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">318 vendors. 2 FTEs. The exam-ready evidence your team cannot produce manually.</h2>
            <p className={`mt-5 ${T.lead} text-white/68`} data-reveal data-delay="2">Continuous signals replace the annual questionnaire. Every rating, every override, every escalation — written to an immutable ledger as it happens.</p>
            <div className="mt-8 space-y-3">
              {["Vendor scores update in real time as news, ratings, and control evidence change","Every rating change and override attributed to a person and timestamped","Examiner pack generated from live data — no manual compilation before the review"].map((item, i) => (
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
                  Live · auto-refreshed 3 min ago
                </span>
                <span className="text-[11px] text-white/55">318 vendors · 2 FTEs</span>
              </div>
              <div className="grid grid-cols-3 divide-x divide-white/10">
                {[
                  { label:"New signals today",    val:"12",         delta:"4 critical",     dc:"text-white/80" },
                  { label:"Reviews due",          val:"4",          delta:"2 overdue",       dc:"text-white/80" },
                  { label:"Open exceptions",      val:"1",          delta:"Escalated",       dc:"text-white/60" },
                ].map(({ label, val, delta, dc }) => (
                  <div key={label} className="group px-5 py-6 hover:bg-white/4 transition-colors">
                    <p className={`${T.label} text-white/40`}>{label}</p>
                    <p className="mt-2 sf text-[24px] text-white transition-transform duration-300 group-hover:-translate-y-0.5">{val}</p>
                    <p className={`mt-1 text-xs ${dc}`}>{delta}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 px-6 py-5">
                <p className={`${T.label} text-white/35 mb-2`}>Apex Data Services · Critical vendor · Under review</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label:"Inherent risk",          val:"High",     delta:"Unchanged",  dc:"text-white/45" },
                    { label:"Control effectiveness",  val:"Weak",     delta:"↓ vs prior", dc:"text-white/80" },
                    { label:"Residual risk",           val:"Elevated", delta:"Escalate",   dc:"text-white/80" },
                  ].map(({ label, val, delta, dc }) => (
                    <div key={label} className="group hover:bg-white/4 transition-colors p-2 rounded-sm">
                      <p className={`${T.label} text-white/35 mb-1`}>{label}</p>
                      <p className="sf text-[18px] text-white">{val}</p>
                      <p className={`text-[10px] ${dc}`}>{delta}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/10 px-6 py-4 flex items-center gap-3">
                <button className={`rounded-sm bg-white px-4 py-2 ${T.label} text-[#1E1610] hover:opacity-90 transition-opacity`}>Open vendor file</button>
                <button className={`rounded-sm border border-white/20 px-4 py-2 ${T.label} text-white/75 hover:bg-white/8 transition-colors`}>Run exit simulation</button>
                <span className="ml-auto text-[10px] text-white/28">Every action logged to immutable ledger</span>
              </div>
            </div>
            <div className="mt-3 border border-white/8 divide-y divide-white/8">
              {[
                { time:"08:14",  signal:"Apex Data Services — S&P rating watch negative. Inherent risk re-scored to High." },
                { time:"07:52",  signal:"4 DORA Art. 28 contract gaps flagged across 2 critical vendors — remediation tasks created." },
                { time:"Yesterday", signal:"Exit simulation complete: T+41d recovery · $2.3M migration cost · 82% continuity confidence." },
              ].map(({ time, signal }) => (
                <div key={signal} className="group flex items-start gap-4 px-5 py-3.5 hover:bg-white/4 transition-colors">
                  <span className="text-[10px] text-white/32 flex-shrink-0 mt-0.5 w-20">{time}</span>
                  <p className={`${T.sm} text-white/60 group-hover:text-white/80 transition-colors`}>{signal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[900px] px-6 py-24 md:py-28 text-center">
          <span data-reveal className="sf text-[96px] leading-none text-[#1E1610]/18 block -mb-6">"</span>
          <p className={`sf ${T.h2} tracking-tight text-[#1E1610]`} data-reveal data-delay="1">The human always decides. The audit trail always runs.</p>
          <p className={`mt-8 ${T.sm} text-[#6B5E4F]`} data-reveal data-delay="2">— Madison Risk &amp; Compliance · Governance principle</p>
          <div className="mx-auto mt-6 ochre-rule w-28" data-reveal data-delay="3" />
        </div>
      </section>

      {/* ── BUSINESS CASE ── */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>The business case</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Measured. Attributed. Defensible.</h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Agree the baseline before deployment. Measure vendor review cycle time, exception close rate, and exit test results in production. Expand when the numbers make the case.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E8DFD3] border border-[#E8DFD3]">
            {businessMetrics.map(({ val, top, bottom }, i) => (
              <div key={val} data-stat data-delay={String(i+1)}
                className="group bg-[#F9F5F1] px-8 py-10 hover:bg-[#1E1610] hover:text-white transition-all duration-400 cursor-default">
                <p className={`sf ${T.h1} tracking-tight`}>{val}</p>
                <div className="mt-5 h-px w-8 bg-[#1E1610] origin-left scale-x-0 group-hover:scale-x-100 group-hover:bg-white transition-all duration-500" />
                <p className={`mt-4 font-medium ${T.sm} text-[#1E1610] group-hover:text-white transition-colors`}>{top}</p>
                <p className={`mt-1 ${T.sm} text-[#6B5E4F] group-hover:text-white/55 transition-colors`}>{bottom}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Roadmap</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Start with one workflow. Prove value in weeks.</h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">One risk workflow, a focused team, and the systems you already run. Measure the impact, then expand to the full risk and procurement platform.</p>
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

      {/* ── TRUST ── */}
      <section className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Trust &amp; sovereignty</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Built to pass second-line review.</h2>
              <p className={`mt-5 ${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Your CRO, general counsel, and enterprise risk committee all read landing pages. We designed this one for them.</p>
              <div className="mt-10 space-y-5">
                {[
                  { title:"One platform, every regulator",  body:"SR 26-2, DORA, CBUAE, RBI IT-Outsourcing, FFIEC — regional triggers mapped to specific Madison controls." },
                  { title:"Tested kill-switch",             body:"The switch exists and has been exercised. Evidence of a successful test sits in the vendor file — not in a policy document." },
                  { title:"Sovereign from day one",         body:"On-prem, VPC, or air-gapped. Your vendor data never leaves your perimeter. BYOK. No cross-tenant training." },
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
                  <span key={c} data-reveal data-delay={String((i%4)+1)}
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
                <a href="mailto:security@madison.ai" className={BTN.secondary}>
                  Request the security &amp; compliance pack →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-b border-[#E8DFD3] bg-[#F9F5F1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <p className={`${T.label} text-[#6B5E4F]`} data-reveal>FAQ</p>
              <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">The questions your CRO and legal counsel will ask.</h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className={`${T.lead} text-[#6B5E4F]`} data-reveal data-delay="2">Straight answers to the questions that slow every enterprise risk AI evaluation down.</p>
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

      {/* ── CONTACT ── */}
      <section id="contact" className="border-b border-[#E8DFD3] bg-[#F1EBE1]">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 text-center">
            <p className={`${T.label} text-[#6B5E4F]`} data-reveal>Design-partner pilot · open</p>
            <h2 className={`mt-5 sf ${T.h2} tracking-tight`} data-reveal data-delay="1">Be the bank that&apos;s un-removable on risk.</h2>
            <p className={`mt-5 ${T.lead} text-[#6B5E4F] max-w-xl mx-auto`} data-reveal data-delay="2">A 30-minute walkthrough on your actual vendor inventory — or synthetic data that mirrors your stack. Bring your highest-concentration vendor or your hardest exit scenario.</p>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-3" data-reveal data-delay="3">
              <a href="mailto:hello@madison.ai" className={BTN.primary}>
                <span className="relative z-10">Book a demo</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="mailto:hello@madison.ai" className={BTN.secondary}>Talk to our team</a>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className={`${T.label} text-[#6B5E4F] mb-6`} data-reveal>What to expect</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { n:"30-min working session",    d:"With your CRO or CISO — no slides, just the product on your vendor inventory." },
                  { n:"Live exit simulation",       d:"Your highest-concentration vendor, stress-tested end to end with a recovery timeline." },
                  { n:"Reference architecture",     d:"For your CISO — security, data residency, and sovereignty layout." },
                  { n:"Scoping doc within 48h",     d:"Named workflow, agreed baseline, one use case in production within weeks." },
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
                  { dt:"Institution",  dd:"US, UK, EU or Gulf bank" },
                  { dt:"Size",         dd:"$1B–$100B in assets" },
                  { dt:"Owner",        dd:"Chief Risk / Compliance Officer" },
                  { dt:"Co-signer",    dd:"CISO / General Counsel" },
                  { dt:"Autonomy",     dd:"Monitor · surface · human approves" },
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

      {/* ── FOOTER ── */}
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
