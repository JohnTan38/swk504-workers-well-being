import React, { useState, useEffect } from 'react';
import {
  Users, Shield, BookOpen, Layers, Award, Download, Search,
  ExternalLink, ChevronRight, Play, Pause, RotateCcw, AlertTriangle,
  HeartHandshake, Building2, MapPin, CheckCircle2, Info, ArrowUpRight,
  Sparkles, FileCheck, Scale, MessageSquare, Compass
} from 'lucide-react';

// ============================================================================
// CLEVERLY-SG STYLE GLASSMORPHIC HOVER TOOLTIP TILE COMPONENT
// Replicates the floating glassmorphic hover popup tile with mouse-tracking
// glow, badge header, deep-dive context, and academic source verification.
// ============================================================================
function HoverTooltipTile({
  children,
  badge,
  title,
  summary,
  metrics,
  source,
  accentColor = 'crimson', // 'crimson' | 'amber' | 'emerald' | 'blue'
  position = 'top'
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const accentMap = {
    crimson: {
      border: 'hover:border-[#D32F2F]/70',
      badgeBg: 'bg-[#D32F2F]/20 text-red-300 border-[#D32F2F]/40',
      dot: 'bg-[#D32F2F]',
      glow: 'rgba(211, 47, 47, 0.22)',
      popupBorder: 'border-[#D32F2F]/50'
    },
    amber: {
      border: 'hover:border-amber-400/70',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      dot: 'bg-amber-400',
      glow: 'rgba(245, 158, 11, 0.22)',
      popupBorder: 'border-amber-400/50'
    },
    emerald: {
      border: 'hover:border-emerald-400/70',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      dot: 'bg-emerald-400',
      glow: 'rgba(16, 185, 129, 0.22)',
      popupBorder: 'border-emerald-400/50'
    },
    blue: {
      border: 'hover:border-sky-400/70',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      dot: 'bg-sky-400',
      glow: 'rgba(56, 189, 248, 0.22)',
      popupBorder: 'border-sky-400/50'
    }
  };

  const styleConfig = accentMap[accentColor] || accentMap.crimson;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
    >
      {/* Interactive Tile Surface with Mouse-Tracking Radial Spotlight */}
      <div
        className={`relative h-full transition-all duration-300 ease-out rounded-xl border border-slate-800/90 ${styleConfig.border} group-hover:-translate-y-1 group-hover:shadow-2xl overflow-hidden cursor-pointer`}
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${coords.x}% ${coords.y}%, ${styleConfig.glow}, rgba(15, 23, 42, 0.85) 70%)`
            : 'rgba(15, 23, 42, 0.65)'
        }}
      >
        {/* Subtle top-right hover indicator badge */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/90 border border-white/10 text-[10px] text-slate-400 group-hover:text-white group-hover:border-white/30 transition-all">
          <Sparkles className="h-2.5 w-2.5 text-[#D32F2F]" />
          <span>Insight</span>
        </div>
        {children}
      </div>

      {/* Floating Glassmorphic Popup Card (john-tan-data-analyst-cleverly-sg style) */}
      <div
        className={`pointer-events-none absolute z-50 left-1/2 -translate-x-1/2 w-80 md:w-96 p-4 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border ${styleConfig.popupBorder} shadow-[0_20px_60px_rgba(0,0,0,0.85)] transition-all duration-200 ease-out ${
          position === 'bottom' ? 'top-full mt-3' : 'bottom-full mb-3'
        } ${
          isHovered
            ? 'opacity-100 translate-y-0 scale-100'
            : position === 'bottom'
            ? 'opacity-0 -translate-y-2 scale-95'
            : 'opacity-0 translate-y-2 scale-95'
        }`}
      >
        {/* Top Header Pill */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styleConfig.badgeBg}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${styleConfig.dot} animate-pulse`} />
            {badge}
          </span>
          <span className="text-[10px] font-mono text-slate-400">SUSS SWK504 Defense</span>
        </div>

        {/* Popup Main Title & Analytical Explanation */}
        <div className="mt-2.5">
          <h4 className="text-xs font-extrabold text-white tracking-tight leading-snug">
            {title}
          </h4>
          <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Key Takeaways / Quantitative & Practice Metrics */}
        {metrics && metrics.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-white/10 grid grid-cols-1 gap-1.5">
            {metrics.map((m, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[10px] bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#D32F2F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">{m.label}: </span>
                  <span className="text-slate-300">{m.value}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Academic Citation Footer */}
        {source && (
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 italic">
            <span>Ref: {source}</span>
            <span className="text-emerald-400 font-semibold not-italic">Verified</span>
          </div>
        )}

        {/* Caret Arrow */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-slate-950 border ${styleConfig.popupBorder} ${
            position === 'bottom'
              ? '-top-1.5 border-b-0 border-r-0'
              : '-bottom-1.5 border-t-0 border-l-0'
          }`}
        />
      </div>
    </div>
  );
}

const MODULES = [
  { id: 'overview', label: '1. Problem & Context', icon: Users },
  { id: 'micro', label: '2. Micro Groupwork', icon: HeartHandshake },
  { id: 'task9', label: '3. Community Model (Task 9)', icon: Building2 },
  { id: 'presentation', label: '4. Slide Defense Rig', icon: Play },
  { id: 'audit', label: '5. Academic Audit (APA 7)', icon: BookOpen }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCirclePhase, setActiveCirclePhase] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(70);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [registerFilter, setRegisterFilter] = useState('all');

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const searchItems = [
    { title: 'Social Support Theory (Hupcey, 1998)', category: 'Theory', tab: 'micro' },
    { title: 'Therapeutic Factors (Yalom & Leszcz, 2020)', category: 'Micro Groupwork', tab: 'micro' },
    { title: 'Subramaniam et al. (2026) 79.2% Help-Seeking Study', category: 'Empirical Evidence', tab: 'overview' },
    { title: 'Worker Community Advisory Council (WCAC)', category: 'Community Practice', tab: 'task9' },
    { title: 'Boehm & Cnaan (2012) 3 Criteria', category: 'Task 9 Framework', tab: 'task9' },
    { title: 'Action-to-Resolution Register', category: 'Implementation', tab: 'task9' },
    { title: 'SnapSAFE Confidential MOM Reporting', category: 'Singapore Regulations', tab: 'overview' },
    { title: 'Primary Care Plan (PCP) Coverage', category: 'Healthcare Access', tab: 'overview' },
    { title: 'ABCD Asset Mapping (Kretzmann & McKnight, 1993)', category: 'Community Model', tab: 'task9' },
    { title: 'Consensus Organizing (Beck & Eichler, 2000)', category: 'Community Model', tab: 'task9' },
    { title: 'Family Independence Initiative (FII / UpTogether)', category: 'Community Model', tab: 'task9' }
  ];

  const filteredSearch = searchQuery.trim() === '' ? [] : searchItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const downloadTakeaway = () => {
    const content = `# SWK504 Group Project: Men at Work
Target Population: South Asian Migrant Construction Workers in Singapore (Indian & Bangladeshi Nationals)
Team Members: Chin Hong Ern Stephen, Marcus Liew Zhuo Yi, Muhammad Tirmuzi Bin Kasman, Noor Azlan Bin Salim, Tan Vie Ming

## 1. Issue & Rationale
- Foreign workforce includes ~380,000 construction work permit holders (MOM June 2026 CMP combined: 490,700).
- Subramaniam et al. (2026) landmark study (N=1,465): 79.2% seek emotional help informally (60.9% family back home, 58.6% peers/dormitory neighbours).
- 39.7% explicitly prefer a trained fellow worker; 69.1% prefer face-to-face workshops.

## 2. Micro Groupwork Design
- Theoretical Foundation: Hupcey (1998) Social Support Theory (Relationships, Perceived Support, Enacted Support, Reciprocal Social Exchange) & 4 Functions (Emotional, Informational, Instrumental, Appraisal).
- Yalom's 3 Therapeutic Factors: Group Cohesiveness, Universality, Imparting of Information.
- Group Stages: Northen & Kurland (Inclusion-Orientation, Uncertainty-Exploration, Mutuality-Goal Achievement, Separation-Termination).

## 3. Task 9 Community Intervention Model: MW-WSP
- Framework: Boehm & Cnaan (2012) 3 criteria:
  1. Level of Community Involvement (Worker Community Advisory Council - WCAC)
  2. Discursive Communication & Deliberative Democracy (Multilingual Listening & Co-Design Forums)
  3. Integration of Policy & Implementation (Action-to-Resolution Register)
- 3 Development Principles:
  1. ABCD (Kretzmann & McKnight, 1993): Asset mapping existing capabilities.
  2. Consensus Organizing (Beck & Eichler, 2000): Multi-Stakeholder Well-being Alliance based on mutual interest without compromising rights.
  3. FII / UpTogether: Choice and control through self-directed well-being action plans.

Verified October 30, 2026 | Singapore University of Social Sciences (SUSS)`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'SWK504_Men_At_Work_Submission_Takeaway.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const circlePhases = [
    {
      phase: 'Phase 1: Convene',
      theme: 'Welcoming & Grounding',
      script: '"Thank you for coming to this circle tonight. We are here together for your well-being, to share space and feel like a family away from home."'
    },
    {
      phase: 'Phase 2: Connect',
      theme: 'Talking Piece Norms & Heritage Roots',
      script: '"When someone has this talking piece, everyone listens and respects them. No one interrupts or laughs. Please share your home town and a happy memory about your family or village back home."'
    },
    {
      phase: 'Phase 3: Main Topic',
      theme: 'Singapore Lived Experience',
      script: '"How long have you worked in Singapore? Share one thing you appreciate about your journey here, and what you like most about living here."'
    },
    {
      phase: 'Phase 4: Collaborate',
      theme: 'Shared Daily Challenges',
      script: '"Share one story where you encountered difficulties with your catered food, transport, or dormitory accommodation in Singapore."'
    },
    {
      phase: 'Phase 5: Closing',
      theme: 'Affirmation & Next Steps',
      script: '"We hear you and we validate your struggles. In our next session, we will turn these shared concerns into concrete steps for improving our living spaces. We look forward to seeing everyone next week."'
    }
  ];

  const slides = [
    {
      num: 1,
      title: 'Slide 1: Issue & Rationale',
      timeTarget: '60s',
      bullets: [
        'Centrality & Vulnerability: ~380k construction work permit holders from India & Bangladesh. Disruption of primary family kinship buffers creates acute isolation.',
        'Empirical Landmark: Subramaniam et al. (2026) Singapore study (N=1,465) shows 79.2% seek emotional help informally (peers 58.6%, family back home 60.9%).',
        'Structural Barriers: Fear of job loss/repatriation, mental health stigma ("madness"), language barriers (Bangla/Tamil/Hindi), and lack of awareness of Primary Care Plan (PCP).',
        'Intervention Mandate: Shift from passive charity to closed, peer-led bunk self-help groups bridging to community organizing.'
      ],
      script: 'Our project addresses lower-wage Indian and Bangladeshi construction workers in Singapore. With over 380,000 construction permit holders separated from their families, isolation is compounded by wage debt, dormitory living, and workplace safety concerns. Groundbreaking Singapore data by Subramaniam and colleagues in 2026 shows that while nearly 80% seek emotional help, they overwhelmingly rely on informal networks because fear of repatriation and language barriers deter them from formal care. Crucially, 39.7% want help from a trained peer worker. We answer this need with a peer-led dormitory model.'
    },
    {
      num: 2,
      title: 'Slide 2: Proposed Groupwork (Peer-Led Self-Help)',
      timeTarget: '75s',
      bullets: [
        'Bunk-Based Micro Setting: Closed self-help groups of 6-8 workers residing in the same bunk room.',
        'Developmental Arc: Social worker initiates and scaffolds safety; bilingual co-workers assume co-leadership.',
        'Norms & Voice: Talking piece circle processes ensure equal voice across linguistic lines.',
        'Holistic Scope: Immediate survival coping (catered food, rest, safety) escalating into long-term mutual aid.'
      ],
      script: 'We structure voluntary self-help circles of 6 to 8 workers within their own dormitory bunks. Guided by Northen and Kurland\'s developmental stages, a social worker initially establishes psychological safety and ground rules using talking pieces. As the group transitions into mutuality, trained peer leaders facilitate conversations in Bangla and Tamil. This transforms dormitory rooms into safe incubators for emotional solace, rights literacy, and collective problem-solving.'
    },
    {
      num: 3,
      title: 'Slide 3: Diversity, Intersectionality & Power',
      timeTarget: '75s',
      bullets: [
        'Linguistic Representation: Addressing Bangla, Tamil, Hindi, and Telugu variations to prevent single-group dominance.',
        'Intersectionality (Crenshaw, 1989): Examining the convergence of debt bondage, low wages, and migrant legal status.',
        'Mutual-Aid Power Sharing: Rotating leadership and baseline negotiation for dietary and dormitory improvements.',
        'Gathering Invitation: Grounded in Peter Block\'s Six Conversations to instill personal ownership and commitment.'
      ],
      script: 'Multicultural groups often face power dynamics where dominant language groups overshadow quieter members. We apply Crenshaw\'s intersectionality and Toseland\'s group dynamics to build deliberate safeguards: bilingual peer connectors, native-language breakouts, and Peter Block\'s gathering conversations. Workers collectively negotiate acceptable baselines for food quality and dormitory hygiene, replacing top-down paternalism with democratic voice.'
    },
    {
      num: 4,
      title: 'Slide 4: Theoretical Basis & Therapeutic Factors',
      timeTarget: '70s',
      bullets: [
        'Hupcey (1998) Social Support Theory: Rebuilding 4 concepts (relationships, perceived support, received support, social exchange) and 4 functions (informational, emotional, instrumental, appraisal).',
        'Yalom Factor 1: Group Cohesiveness: The precondition for change; closed bunk circles foster brotherhood and belonging.',
        'Yalom Factor 2: Universality: Realizing "we are in the same boat" through shared meal, housing, and remittance discussions.',
        'Yalom Factor 3: Imparting Information: Multilingual navigation of MOM SnapSAFE, FWMOMCare, and Primary Care Plan (PCP).'
      ],
      script: 'Moving to Slide 4, our group design is anchored in Hupcey\'s (1998) Social Support Theory. When Indian and Bangladeshi workers arrive in Singapore, kinship ties are broken. Our bunk groups restore reciprocal social exchange—seeking, giving, and receiving emotional empathy, informational rights, instrumental safety checks, and appraisal dignity. To operationalize this, we promote three Yalom factors: Cohesiveness as the precondition for change, creating a bunk brotherhood; Universality, showing members they are in the same boat; and Imparting of Information, linking workers directly to MOM SnapSAFE and NGO resources.'
    }
  ];

  const registerItems = [
    {
      id: 'REG-101',
      category: 'Food Quality',
      issue: 'Catered dinners arriving spoiled/sour due to afternoon roadside deliveries.',
      action: 'Negotiated staggered refrigerated drop boxes with dormitory operator and caterer.',
      owner: 'Operator Logistics / Alliance',
      status: 'Resolved',
      verified: 'Verified by Worker Council'
    },
    {
      id: 'REG-102',
      category: 'Dormitory Upkeep',
      issue: 'Ceiling fans in Block C bunk 4 broken during hot humid monsoon weeks.',
      action: '48-hour SLA maintenance tracking logged into Action-to-Resolution register.',
      owner: 'Dorm Maintenance Lead',
      status: 'In Progress',
      verified: 'Mid-point audit inspection'
    },
    {
      id: 'REG-103',
      category: 'Safety & Reporting',
      issue: 'Unsafe scaffolding clamps on sub-contractor worksite; workers fear speaking up.',
      action: 'Bypassed alliance register; immediately referred to confidential MOM SnapSAFE channel.',
      owner: 'MOM Workplace Safety & Health Inspectorate',
      status: 'Escalated Formal',
      verified: 'Independent NGO Safeguarding Lead'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#1B2A4A]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-lg flex items-center justify-center shadow-md">
              <img src="/suss-logo.svg" alt="SUSS Logo" className="h-8 w-auto" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider bg-[#D32F2F] text-white px-2 py-0.5 rounded">SWK504</span>
                <span className="text-xs text-slate-300 font-semibold">Group Assignment</span>
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Men at Work <span className="text-slate-400 text-sm font-normal">| Migrant Workers Well-being</span>
              </h1>
            </div>
          </div>

          {/* Search bar with Autocomplete */}
          <div className="relative flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search theories (Hupcey, Yalom), criteria (Boehm), data..."
                className="w-full pl-9 pr-4 py-1.5 bg-slate-900/80 border border-slate-700 rounded-full text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#D32F2F] transition-all"
              />
            </div>
            {filteredSearch.length > 0 && (
              <div className="absolute top-10 left-0 right-0 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                {filteredSearch.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveTab(item.tab);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-800 flex items-center justify-between text-xs border-b border-slate-800 last:border-0"
                  >
                    <div>
                      <div className="font-semibold text-white">{item.title}</div>
                      <div className="text-[10px] text-slate-400">{item.category}</div>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#D32F2F]" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Download Slide Deck / Takeaway */}
          <div className="flex items-center gap-2">
            <button
              onClick={downloadTakeaway}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#D32F2F] hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-md transition-all active:scale-95"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Takeaway</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-white/5 pt-2">
          {MODULES.map(m => {
            const Icon = m.icon;
            const isActive = activeTab === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-[#D32F2F]' : ''}`} />
                {m.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8">
        {/* TAB 1: OVERVIEW & SINGAPORE DATA */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
              <div className="max-w-3xl">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#D32F2F]">SWK504 Project Synthesis</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                  Empowering South Asian Migrant Construction Workers in Singapore
                </h2>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  A dual-track social work intervention linking bunk-based peer mutual aid circles with a multi-stakeholder community partnership (MW-WSP). Hover over any interactive tile below to inspect theoretical mechanisms, empirical baselines, and statutory safeguards.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Team: Men at Work</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Cohort: Graduate Diploma in Social Work</span>
                  <span className="px-2.5 py-1 rounded-md bg-red-950/60 text-red-200 border border-red-800/50 flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-red-400" />
                    Interactive Hover Tooltips Enabled
                  </span>
                </div>
              </div>
            </div>

            {/* Singapore Empirical Evidence Cards with Cleverly-SG Style Hover Tooltips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <HoverTooltipTile
                badge="Demographics & Safety"
                title="MOM Workforce & Construction Risk Profile"
                summary="Singapore recorded 1,655,900 foreign workers in June 2026, including 490,700 CMP Work Permit holders (~380,000 in construction). Leaving immediate families behind in India and Bangladesh disrupts natural kinship buffers."
                metrics={[
                  { label: 'CMP Sector Total', value: '490,700 Work Permit holders (June 2026)' },
                  { label: 'WSH Injury Rate', value: '26.3 per 100k construction workers (2025 vs 31.0 in 2024)' },
                  { label: 'Primary Cohort', value: '>57% Bangladeshi & Indian nationals in dorm studies' }
                ]}
                source="Ministry of Manpower (2026a, 2026b)"
                accentColor="crimson"
                position="bottom"
              >
                <div className="p-5 border-l-4 border-[#D32F2F] h-full">
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">MOM Workforce Context</div>
                  <div className="text-3xl font-black text-white mt-2">~380,000</div>
                  <div className="text-xs font-semibold text-slate-300">Construction Work Permit Holders</div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Primarily from Bangladesh and India. Disruption of primary family kinship buffers creates acute psychological vulnerability and isolation.
                  </p>
                </div>
              </HoverTooltipTile>

              <HoverTooltipTile
                badge="Help-Seeking Behavior"
                title="Reliance on Informal Networks Over Clinics"
                summary="A landmark mixed-methods study of 1,465 migrant workers in Singapore revealed overwhelming reliance on informal networks due to fears of repatriation, losing 'face', language barriers, and cost misconceptions."
                metrics={[
                  { label: 'Family/Friends Home', value: '60.9% seek emotional support from home country ties' },
                  { label: 'Dormitory Peers', value: '58.6% turn to fellow workers/neighbours in Singapore' },
                  { label: 'Key Deterrents', value: 'Fear of job termination, mental stigma & clinic costs' }
                ]}
                source="Subramaniam et al. (2026), Archives of Public Health"
                accentColor="amber"
                position="bottom"
              >
                <div className="p-5 border-l-4 border-amber-500 h-full">
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Subramaniam et al. (2026)</div>
                  <div className="text-3xl font-black text-amber-400 mt-2">79.2%</div>
                  <div className="text-xs font-semibold text-slate-300">Seek Informal Peer/Family Help</div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Only a minority seek formal clinics due to fears of repatriation, loss of employment, cost misconceptions, and mental health stigma.
                  </p>
                </div>
              </HoverTooltipTile>

              <HoverTooltipTile
                badge="Evidence-Backed Design"
                title="Why Bunk-Based Peer Support Works"
                summary="Empirical findings confirm that male migrant workers strongly favor trained fellow migrant workers and in-person workshops over top-down clinical or purely digital interventions."
                metrics={[
                  { label: 'Peer Preference', value: '39.7% explicitly prefer a trained fellow worker' },
                  { label: 'Format Preference', value: '69.1% prefer face-to-face workshops' },
                  { label: 'Strategic Fit', value: 'Shifts workers from passive aid recipients to active providers' }
                ]}
                source="Subramaniam et al. (2026); Hupcey (1998)"
                accentColor="emerald"
                position="bottom"
              >
                <div className="p-5 border-l-4 border-emerald-500 h-full">
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Worker Preferences</div>
                  <div className="text-3xl font-black text-emerald-400 mt-2">39.7%</div>
                  <div className="text-xs font-semibold text-slate-300">Prefer Trained Peer Support</div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    69.1% explicitly endorse face-to-face workshops over digital platforms, confirming the necessity of physical bunk-based circles.
                  </p>
                </div>
              </HoverTooltipTile>
            </div>

            {/* Regulatory Safeguards in Singapore with Hover Tooltips */}
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#D32F2F]" />
                Singapore Statutory Infrastructure & Safeguards (Hover for Legal/Ethical Protocols)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <HoverTooltipTile
                  badge="WSH Statutory Channel"
                  title="MOM SnapSAFE Confidential Escalation"
                  summary="SnapSAFE allows workers to upload photos and location details of workplace safety hazards. MOM keeps the whistleblower's identity strictly confidential from the employer."
                  metrics={[
                    { label: 'Governance Rule', value: 'Urgent safety hazards bypass consensus dialogue' },
                    { label: 'Role Boundary', value: 'Workers never replace statutory safety officers' }
                  ]}
                  source="Ministry of Manpower (n.d.-a)"
                  accentColor="crimson"
                >
                  <div className="p-4 h-full">
                    <div className="font-semibold text-sm text-slate-200">MOM SnapSAFE</div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Statutory reporting tool for severe workplace safety hazards. Strict identity anonymity prevents employer retaliation. Unsafe conditions bypass consensual negotiation.
                    </p>
                  </div>
                </HoverTooltipTile>

                <HoverTooltipTile
                  badge="Multilingual E-Service"
                  title="FWMOMCare Native-Language Portal"
                  summary="Mandatory mobile app enabling migrant workers to report accommodation or catered food issues and request direct callbacks from MOM officers in Bangla, Tamil, or Hindi."
                  metrics={[
                    { label: 'Accessibility', value: 'Bilingual peer leaders assist with app navigation' },
                    { label: 'Scope', value: 'Covers salary arrears, dorm upkeep & meal disputes' }
                  ]}
                  source="Ministry of Manpower (n.d.-b)"
                  accentColor="blue"
                >
                  <div className="p-4 h-full">
                    <div className="font-semibold text-sm text-slate-200">FWMOMCare Portal</div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Mobile engagement enabling migrant workers to directly request MOM officer assistance in native languages (Bangla, Tamil).
                    </p>
                  </div>
                </HoverTooltipTile>

                <HoverTooltipTile
                  badge="Healthcare Mandate"
                  title="Primary Care Plan (PCP) Literacy"
                  summary="Employers are legally required to purchase PCP coverage for Work Permit and S-Pass holders residing in dormitories, providing low-cost medical and mental health consultations."
                  metrics={[
                    { label: 'Barrier Addressed', value: 'Corrects worker fears of exorbitant clinic bills' },
                    { label: 'NGO Complement', value: 'Linked with HealthServe & Project DAWN mental health' }
                  ]}
                  source="MOM Primary Care Plan; HealthServe (2026)"
                  accentColor="emerald"
                >
                  <div className="p-4 h-full">
                    <div className="font-semibold text-sm text-slate-200">Primary Care Plan (PCP)</div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Mandatory baseline healthcare scheme for migrant workers. Group leaders impart clear guidance to correct misconceptions regarding clinical costs.
                    </p>
                  </div>
                </HoverTooltipTile>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MICRO GROUPWORK DESIGN */}
        {activeTab === 'micro' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#D32F2F]">Theoretical Foundation</span>
                  <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
                    Social Support Theory (Hupcey, 1998) & Yalom Factors
                  </h2>
                </div>
                <div className="px-3 py-1 bg-red-950/60 border border-red-800/60 rounded-lg text-xs text-red-200 font-medium">
                  Closed Bunk-Based Circles (Max 8 Members)
                </div>
              </div>

              {/* 4 Functions of Hupcey with Hover Tooltips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <HoverTooltipTile
                  badge="Hupcey Function 1"
                  title="Emotional Support in Dormitory Bunks"
                  summary="Provides empathy, reassurance, trust, and psychological buffering in native languages (Bangla, Tamil, Hindi) so workers can process homesickness and workplace stress without fear of gossip."
                  metrics={[
                    { label: 'Core Mechanism', value: 'Replaces disrupted primary kinship ties in India/Bangladesh' },
                    { label: 'Safeguard', value: 'Closed bunk membership + talking-piece circle norms' }
                  ]}
                  source="Hupcey (1998); Peterson & Bredow (2014)"
                  accentColor="crimson"
                  position="bottom"
                >
                  <div className="p-4 h-full">
                    <div className="text-xs font-bold text-red-400 uppercase">Emotional Support</div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Safe bunk circles conducted in native languages (Bangla, Tamil) to ease homesickness and workplace trauma without fear of gossip.
                    </p>
                  </div>
                </HoverTooltipTile>

                <HoverTooltipTile
                  badge="Hupcey Function 2"
                  title="Informational Support & Rights Literacy"
                  summary="Equips workers with practical guidance, translated advice, and systemic literacy to navigate unfamiliar Singapore laws, healthcare coverage, and reporting channels safely."
                  metrics={[
                    { label: 'Key Pathways', value: 'MOM FWMOMCare, SnapSAFE & PCP clinic coverage' },
                    { label: 'Delivery', value: 'Bilingual social workers + trained peer connectors' }
                  ]}
                  source="Hupcey (1998); Subramaniam et al. (2026)"
                  accentColor="amber"
                  position="bottom"
                >
                  <div className="p-4 h-full">
                    <div className="text-xs font-bold text-amber-400 uppercase">Informational Support</div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Bilingual orientation on Singapore norms, MOM SnapSAFE reporting, and PCP healthcare access pathways.
                    </p>
                  </div>
                </HoverTooltipTile>

                <HoverTooltipTile
                  badge="Hupcey Function 3"
                  title="Instrumental Support & Daily Mutual Aid"
                  summary="Tangible, concrete assistance and collective problem-solving for immediate survival and liveability needs inside the dormitory and worksite."
                  metrics={[
                    { label: 'Bunk Routines', value: 'Collective checks on ventilation, fans & hygiene' },
                    { label: 'Peer Escort', value: 'Accompanying unwell co-workers to HealthServe or TWC2' }
                  ]}
                  source="Hupcey (1998); Muskat et al. (2020)"
                  accentColor="blue"
                  position="bottom"
                >
                  <div className="p-4 h-full">
                    <div className="text-xs font-bold text-blue-400 uppercase">Instrumental Support</div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Peer hygiene audits, navigating catered meal disputes, and escorting ill bunkmates to NGO clinics like HealthServe.
                    </p>
                  </div>
                </HoverTooltipTile>

                <HoverTooltipTile
                  badge="Hupcey Function 4"
                  title="Appraisal Support & Dignity Affirmation"
                  summary="Constructive feedback, validation, and social affirmation that strengthen self-efficacy, occupational pride, and agency against societal stigma."
                  metrics={[
                    { label: 'Identity Shift', value: 'Reframes workers as valued builders of Singapore' },
                    { label: 'Leadership', value: 'Trains co-workers as Peer Support Leaders' }
                  ]}
                  source="Hupcey (1998); Kretzmann & McKnight (1993)"
                  accentColor="emerald"
                  position="bottom"
                >
                  <div className="p-4 h-full">
                    <div className="text-xs font-bold text-emerald-400 uppercase">Appraisal Support</div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Affirming workers' dignity as national infrastructure builders, validating coping efforts, and peer leader training.
                    </p>
                  </div>
                </HoverTooltipTile>
              </div>

              {/* Yalom Therapeutic Factors with Hover Tooltips */}
              <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
                <HoverTooltipTile
                  badge="Yalom Factor 1"
                  title="Group Cohesiveness: Precondition for Change"
                  summary="Yalom defines cohesiveness as the group equivalent of the therapeutic alliance. Without a trusted 'brotherhood', other therapeutic factors cannot operate."
                  metrics={[
                    { label: 'Slide 4 Anchor', value: 'Regular weekly sessions & shared well-being roadmap' },
                    { label: 'Cross-Cultural Bridge', value: 'Overcomes Bangla vs. Tamil/Hindi sub-grouping' }
                  ]}
                  source="Yalom & Leszcz (2020)"
                  accentColor="crimson"
                >
                  <div className="p-4 h-full">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#D32F2F]"></span>
                      1. Group Cohesiveness
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Precondition for change. Regular bunk sessions with shared well-being roadmaps bridge linguistic subgroups and build trust.
                    </p>
                  </div>
                </HoverTooltipTile>

                <HoverTooltipTile
                  badge="Yalom Factor 2"
                  title="Universality: 'We Are in the Same Boat'"
                  summary="Disconfirms a worker's belief that their distress is unique or a personal failure. Realizing bunkmates share identical struggles replaces stoic shame with collective validation."
                  metrics={[
                    { label: 'Slide 4 Anchor', value: 'Sharing of food/housing concerns & peer solutions' },
                    { label: 'Stigma Reduction', value: 'Normalizes emotional help-seeking across cultures' }
                  ]}
                  source="Yalom & Leszcz (2020); Subramaniam et al. (2026)"
                  accentColor="amber"
                >
                  <div className="p-4 h-full">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                      2. Universality
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      "We are in the same boat." Openly voicing meal, bunk, and remittance pressure replaces individual stigma with collective validation.
                    </p>
                  </div>
                </HoverTooltipTile>

                <HoverTooltipTile
                  badge="Yalom Factor 3"
                  title="Imparting of Information: Closing the Literacy Gap"
                  summary="Combines didactic guidance from social workers with practical peer resource navigation to connect workers to translated statutory and NGO channels."
                  metrics={[
                    { label: 'Slide 4 Anchor', value: 'Link translated information & community resources' },
                    { label: 'Ecosystem Links', value: 'High Commissions, MOM, TWC2 & HealthServe' }
                  ]}
                  source="Yalom & Leszcz (2020)"
                  accentColor="emerald"
                >
                  <div className="p-4 h-full">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                      3. Imparting Information
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Didactic and peer guidance. Connecting members to translated resources from embassies, MOM, and NGOs (TWC2, HealthServe).
                    </p>
                  </div>
                </HoverTooltipTile>
              </div>
            </div>

            {/* Interactive Circle Process Simulator */}
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">First Session Circle Process</h3>
                  <p className="text-xs text-slate-400">Operationalizing talking-piece norms across language groups</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 rounded border border-slate-700">
                  Step {activeCirclePhase + 1} of 5
                </span>
              </div>

              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {circlePhases.map((cp, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCirclePhase(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                      activeCirclePhase === idx
                        ? 'bg-[#D32F2F] text-white font-semibold'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {cp.phase.split(':')[0]}
                  </button>
                ))}
              </div>

              <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 mt-4">
                <div className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  {circlePhases[activeCirclePhase].phase} &mdash; {circlePhases[activeCirclePhase].theme}
                </div>
                <div className="mt-3 p-4 bg-slate-950/70 border-l-2 border-[#D32F2F] rounded-r-lg font-mono text-xs text-slate-200 leading-relaxed">
                  {circlePhases[activeCirclePhase].script}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TASK 9 COMMUNITY INTERVENTION MODEL */}
        {activeTab === 'task9' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="max-w-3xl">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#D32F2F]">Community Practice Model (20 Marks)</span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  Migrant Worker Well-being & Safety Partnership (MW-WSP)
                </h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Synthesizing 3 Boehm & Cnaan (2012) criteria with 3 core community development principles (ABCD, Consensus Organizing, and FII Choice-and-Control). Hover over any pillar to inspect operational safeguards.
                </p>
              </div>

              {/* 3 Boehm & Cnaan Criteria with Hover Tooltips */}
              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Part A: Three Boehm & Cnaan (2012) Practice Criteria
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <HoverTooltipTile
                    badge="Boehm & Cnaan Criterion 1"
                    title="Level of Community Involvement"
                    summary="Establishes whose priorities count. Each dormitory circle voluntarily nominates rotating delegates to the Worker Community Advisory Council (WCAC) with anonymous input options."
                    metrics={[
                      { label: 'Agenda Power', value: 'Worker delegates control agenda & approve publications' },
                      { label: 'Anti-Cooptation', value: 'Employers cannot select or vet worker delegates' }
                    ]}
                    source="Boehm & Cnaan (2012, pp. 146-151)"
                    accentColor="crimson"
                    position="bottom"
                  >
                    <div className="p-4 h-full">
                      <div className="text-xs font-bold text-[#D32F2F] uppercase">1. Community Involvement</div>
                      <div className="text-sm font-semibold text-white mt-1">Worker Community Advisory Council</div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        Voluntary rotating delegates from bunk circles set the agenda. Employer appointment of representatives is strictly prohibited to prevent co-optation.
                      </p>
                    </div>
                  </HoverTooltipTile>

                  <HoverTooltipTile
                    badge="Boehm & Cnaan Criterion 2"
                    title="Discursive Communication & Deliberative Democracy"
                    summary="Determines how disagreements are handled across unequal power. Holds worker-only pre-caucuses before independently moderated sessions with operators and employers."
                    metrics={[
                      { label: 'Safe Dissent', value: 'Confidential dissent logs & right to refuse joint sessions' },
                      { label: 'Rights Floor', value: 'No pressure to trade statutory rights for consensus' }
                    ]}
                    source="Boehm & Cnaan (2012); Toseland et al. (2004)"
                    accentColor="amber"
                    position="bottom"
                  >
                    <div className="p-4 h-full">
                      <div className="text-xs font-bold text-amber-400 uppercase">2. Discursive Deliberation</div>
                      <div className="text-sm font-semibold text-white mt-1">Multilingual Co-Design Forums</div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        Worker-only caucuses precede joint meetings. Dissent is protected confidentially without forcing workers to trade statutory rights.
                      </p>
                    </div>
                  </HoverTooltipTile>

                  <HoverTooltipTile
                    badge="Boehm & Cnaan Criterion 3"
                    title="Integration of Policy & Implementation"
                    summary="Specifies what must change after deliberation so forums do not become tokenistic talk-shops. Tracks non-identifying community remedies from assignment to verification."
                    metrics={[
                      { label: 'Pilot Target', value: '>=70% of agreed non-urgent actions completed on time' },
                      { label: 'Statutory Bypass', value: 'Urgent hazards go straight to MOM SnapSAFE' }
                    ]}
                    source="Boehm & Cnaan (2012)"
                    accentColor="emerald"
                    position="bottom"
                  >
                    <div className="p-4 h-full">
                      <div className="text-xs font-bold text-emerald-400 uppercase">3. Policy to Implementation</div>
                      <div className="text-sm font-semibold text-white mt-1">Action-to-Resolution Register</div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        Transparent accountability logging time-bound commitments. Urgent safety risks bypass dialogue directly to MOM SnapSAFE.
                      </p>
                    </div>
                  </HoverTooltipTile>
                </div>
              </div>

              {/* 3 Community Development Principles with Hover Tooltips */}
              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Part B: Three Community Development Principles (ABCD, Consensus Organizing, FII)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <HoverTooltipTile
                    badge="ABCD Principle"
                    title="Identify & Mobilize Existing Assets"
                    summary="Maps workers' bilingual skills, trade safety experience, informal food networks, and cultural associations rather than viewing workers through a deficit lens."
                    metrics={[
                      { label: 'Ethical Boundary', value: 'Prevents unpaid responsibilisation of migrant workers' },
                      { label: 'Safeguard', value: 'Assets supplement—never replace—employer legal duties' }
                    ]}
                    source="Kretzmann & McKnight (1993); Harrison et al. (2019)"
                    accentColor="blue"
                  >
                    <div className="p-4 h-full">
                      <div className="text-xs font-bold text-sky-400 uppercase">1. Asset-Based (ABCD)</div>
                      <div className="text-sm font-semibold text-white mt-1">Worker-Led Asset Mapping</div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        Mobilizes multilingual peer connectors and occupational know-how while ensuring unpaid workers are never turned into substitute safety inspectors.
                      </p>
                    </div>
                  </HoverTooltipTile>

                  <HoverTooltipTile
                    badge="Consensus Organizing"
                    title="Build Partnerships Around Mutual Self-Interest"
                    summary="Aligns worker desire for dignity and safe meals/bunks with operator and employer interest in operational stability, lower turnover, and early dispute resolution."
                    metrics={[
                      { label: 'Shared-Gain Pilot', value: 'Transparent meal-feedback & 48h maintenance SLA' },
                      { label: 'Escalation Trigger', value: 'Independent advocacy & enforcement when consensus fails' }
                    ]}
                    source="Beck & Eichler (2000); Eichler (2007)"
                    accentColor="amber"
                  >
                    <div className="p-4 h-full">
                      <div className="text-xs font-bold text-amber-400 uppercase">2. Consensus Organizing</div>
                      <div className="text-sm font-semibold text-white mt-1">Multi-Stakeholder Well-being Alliance</div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        Connects worker circles with operators, employers, and NGOs (HealthServe, TWC2) around shared gains without waiving statutory protections.
                      </p>
                    </div>
                  </HoverTooltipTile>

                  <HoverTooltipTile
                    badge="FII / UpTogether"
                    title="Choice & Control Through Self-Directed Action"
                    summary="Adapts the FII autonomy principle so dormitory circles draft their own priorities and use flexible micro-resources without professional paternalism."
                    metrics={[
                      { label: 'Methodological Note', value: 'Conceptual adaptation (not a US family trial claim)' },
                      { label: 'Autonomy Rule', value: 'Micro-resources are never conditional on public speaking' }
                    ]}
                    source="UpTogether (n.d.); OECD (2023)"
                    accentColor="emerald"
                  >
                    <div className="p-4 h-full">
                      <div className="text-xs font-bold text-emerald-400 uppercase">3. Family Independence (FII)</div>
                      <div className="text-sm font-semibold text-white mt-1">Worker-Directed Action Plans</div>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        Preserves heterogeneity and worker choice over goals (dietary suitability, bunk upkeep, or quiet referral) with full opt-out rights.
                      </p>
                    </div>
                  </HoverTooltipTile>
                </div>
              </div>
            </div>

            {/* Action-to-Resolution Interactive Register */}
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">MW-WSP Action-to-Resolution Register</h3>
                  <p className="text-xs text-slate-400">Tracking non-identifying priority remediation with verified safeguards</p>
                </div>
                <div className="flex gap-2">
                  {['all', 'Resolved', 'In Progress', 'Escalated Formal'].map(f => (
                    <button
                      key={f}
                      onClick={() => setRegisterFilter(f)}
                      className={`px-2.5 py-1 rounded text-xs transition-all ${
                        registerFilter === f
                          ? 'bg-[#D32F2F] text-white font-semibold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                      <th className="py-2.5 px-3">ID / Domain</th>
                      <th className="py-2.5 px-3">Worker-Identified Issue</th>
                      <th className="py-2.5 px-3">Agreed Remediation Action</th>
                      <th className="py-2.5 px-3">Accountable Lead</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {registerItems
                      .filter(i => registerFilter === 'all' || i.status === registerFilter)
                      .map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/50">
                          <td className="py-3 px-3">
                            <span className="font-mono text-slate-400">{item.id}</span>
                            <div className="text-white font-medium">{item.category}</div>
                          </td>
                          <td className="py-3 px-3 text-slate-300 max-w-xs">{item.issue}</td>
                          <td className="py-3 px-3 text-slate-300 max-w-xs">{item.action}</td>
                          <td className="py-3 px-3 text-slate-400">{item.owner}</td>
                          <td className="py-3 px-3">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.status === 'Resolved' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                              item.status === 'In Progress' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                              'bg-red-950 text-red-300 border border-red-800'
                            }`}>
                              {item.status}
                            </span>
                            <div className="text-[10px] text-slate-500 mt-1">{item.verified}</div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CONCURRENT PRESENTATION DEFENSE RIG */}
        {activeTab === 'presentation' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#D32F2F] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">Defense Simulator</span>
                    <span className="text-xs text-slate-400">Concurrent 5-Minute Cap (Max 4 Slides)</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">{slides[activeSlide].title}</h2>
                </div>

                {/* Defense Timer Rig */}
                <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-700">
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Slide Target: {slides[activeSlide].timeTarget}</div>
                    <div className={`font-mono text-lg font-black ${timerSeconds <= 15 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}>
                      00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="p-2 rounded-lg bg-[#D32F2F] hover:bg-red-700 text-white"
                  >
                    {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(70);
                    }}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Slide Navigation Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {slides.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveSlide(idx);
                      setTimerSeconds(idx === 3 ? 70 : 65);
                      setIsTimerRunning(false);
                    }}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      activeSlide === idx
                        ? 'bg-slate-800 border-[#D32F2F] shadow-md'
                        : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/50 text-slate-400'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase text-[#D32F2F]">Slide {s.num}</div>
                    <div className="text-xs font-semibold text-white truncate">{s.title.split(':')[1]}</div>
                  </button>
                ))}
              </div>

              {/* Current Slide Display Canvas */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Visual Presentation Anchors</span>
                    <span className="text-[#D32F2F]">Slide {activeSlide + 1} of 4</span>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {slides[activeSlide].bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="h-4 w-4 text-[#D32F2F] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#1B2A4A]/50 p-5 rounded-xl border border-white/10">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Verbatim Speaker Script (Timed)</span>
                    <span className="text-xs text-slate-300">~60-75s delivery</span>
                  </div>
                  <div className="mt-4 p-4 bg-slate-950/80 rounded-lg border-l-2 border-amber-400 font-mono text-xs text-slate-200 leading-relaxed italic">
                    "{slides[activeSlide].script}"
                  </div>
                  <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>Practice at a moderate conversational pace (~130 words/min) to align with grading limits.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ACADEMIC AUDIT & REFERENCES */}
        {activeTab === 'audit' && (
          <div className="glass-panel p-6 rounded-2xl space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#D32F2F]">Scholarly Verification</span>
              <h2 className="text-xl md:text-2xl font-bold text-white mt-1">APA 7th Reference Audit & Methodological Integrity</h2>
              <p className="text-xs text-slate-300 mt-1">Hover over any reference tile to inspect methodological boundaries and source-audit corrections.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <HoverTooltipTile
                badge="Empirical Study Audit"
                title="Subramaniam et al. (2026) Scope & Limits"
                summary="Mixed-methods study of 1,465 migrant workers and 1,462 migrant domestic workers in Singapore. Confirms 79.2% informal help-seeking and 39.7% peer preference."
                metrics={[
                  { label: 'Audit Correction', value: 'Covers CMP-sector workers broadly, not exclusively construction' },
                  { label: 'Causal Boundary', value: 'Observational baseline; does not prove MW-WSP efficacy' }
                ]}
                source="Archives of Public Health, 84, Article 45"
                accentColor="amber"
              >
                <div className="p-4 h-full">
                  <span className="font-bold text-white">Subramaniam, M., Zhang, Y., Satghare, P., Koh, Y. S., et al. (2026).</span>
                  <p className="text-slate-300 mt-1">
                    Mental health help-seeking behaviour among migrant workers and migrant domestic workers in Singapore: A mixed-methods study. <i>Archives of Public Health</i>, 84, Article 45. https://doi.org/10.1186/s13690-026-01844-z
                  </p>
                  <div className="text-[11px] text-amber-400 mt-2">Evidence Scope: Observational data (N=1,465 migrant workers) across CMP sectors.</div>
                </div>
              </HoverTooltipTile>

              <HoverTooltipTile
                badge="Community Framework Audit"
                title="Boehm & Cnaan (2012) Page & Scope Verification"
                summary="Provides the process-based, participatory criteria used to structure the MW-WSP community intervention model."
                metrics={[
                  { label: 'Bibliographic Span', value: 'Full article pp. 141-168; criteria on pp. 146-151' },
                  { label: 'Theoretical Role', value: 'Design criteria, not independently tested causal mechanisms' }
                ]}
                source="Journal of Sociology & Social Welfare, 39(1)"
                accentColor="crimson"
              >
                <div className="p-4 h-full">
                  <span className="font-bold text-white">Boehm, A., & Cnaan, R. A. (2012).</span>
                  <p className="text-slate-300 mt-1">
                    Towards a practice-based model for community practice: Linking theory and practice. <i>Journal of Sociology & Social Welfare</i>, 39(1), 141-168.
                  </p>
                  <div className="text-[11px] text-slate-400 mt-2">Course Anchor: Selected criteria 1 (Involvement), 2 (Deliberation), 3 (Implementation).</div>
                </div>
              </HoverTooltipTile>

              <HoverTooltipTile
                badge="Groupwork Theory Audit"
                title="Hupcey (1998) Social Support Linkage"
                summary="Establishes the 4 core concepts of social support and 4 functional dimensions used to transform dormitory bunks into reciprocal support networks."
                metrics={[
                  { label: '4 Core Concepts', value: 'Network, Perceived, Enacted & Reciprocal Exchange' },
                  { label: '4 Functions', value: 'Emotional, Informational, Instrumental & Appraisal' }
                ]}
                source="Journal of Advanced Nursing, 27(6), 1231-1241"
                accentColor="blue"
              >
                <div className="p-4 h-full">
                  <span className="font-bold text-white">Hupcey, J. E. (1998).</span>
                  <p className="text-slate-300 mt-1">
                    Clarifying the social support theory-research linkage. <i>Journal of Advanced Nursing</i>, 27(6), 1231-1241.
                  </p>
                  <div className="text-[11px] text-slate-400 mt-2">Theory Anchor: Reciprocal social exchange and 4 functional dimensions.</div>
                </div>
              </HoverTooltipTile>

              <HoverTooltipTile
                badge="Official Statistics Audit"
                title="MOM (2026) Denominator & WSH Accuracy"
                summary="Verifies Singapore foreign workforce denominators and workplace fatality/major injury rates for accurate academic reporting."
                metrics={[
                  { label: 'June 2026 Data', value: '1,655,900 foreign workers; 490,700 CMP Work Permits' },
                  { label: '2025 WSH Report', value: 'Construction injury rate 26.3 per 100k (down from 31.0)' }
                ]}
                source="Ministry of Manpower (2026a, 2026b)"
                accentColor="emerald"
              >
                <div className="p-4 h-full">
                  <span className="font-bold text-white">Ministry of Manpower. (2026).</span>
                  <p className="text-slate-300 mt-1">
                    Foreign workforce numbers [June 2026 data] & WSH Report 2025: Record-low workplace fatality and major injury rates. Singapore Government.
                  </p>
                  <div className="text-[11px] text-emerald-400 mt-2">Verified Audit Date: 30 October 2026.</div>
                </div>
              </HoverTooltipTile>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 px-4 py-4 text-center text-xs text-slate-400">
        <p>Singapore University of Social Sciences (SUSS) &bull; SWK504 Groupwork and Community Organisation</p>
        <p className="text-[11px] text-slate-400 mt-1">Men at Work &mdash; Chin Hong Ern Stephen, Marcus Liew Zhuo Yi, Muhammad Tirmuzi Bin Kasman, Noor Azlan Bin Salim, Tan Vie Ming</p>
      </footer>
    </div>
  );
}
