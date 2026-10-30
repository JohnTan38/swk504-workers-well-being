import React, { useState, useEffect } from 'react';
import {
  Users, Shield, BookOpen, Layers, Award, Download, Search,
  ExternalLink, ChevronRight, Play, Pause, RotateCcw, AlertTriangle,
  HeartHandshake, Building2, MapPin, CheckCircle2, Info, ArrowUpRight
} from 'lucide-react';

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
    { title: 'Primary Care Plan (PCP) Coverage', category: 'Healthcare Access', tab: 'overview' }
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
- foreign workforce includes ~380,000 construction work permit holders (MOM June 2026 CMP combined: 490,700).
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
      script: '"Thank you for coming to this circle tonight. We are here together for your well-being, to share space and feel like a family away from home."'[cite: 29]
    },
    {
      phase: 'Phase 2: Connect',
      theme: 'Talking Piece Norms & Heritage Roots',
      script: '"When someone has this talking piece, everyone listens and respects them[cite: 29]. No one interrupts or laughs[cite: 29]. Please share your home town and a happy memory about your family or village back home."[cite: 29]'
    },
    {
      phase: 'Phase 3: Main Topic',
      theme: 'Singapore Lived Experience',
      script: '"How long have you worked in Singapore?[cite: 29] Share one thing you appreciate about your journey here, and what you like most about living here."[cite: 29]'
    },
    {
      phase: 'Phase 4: Collaborate',
      theme: 'Shared Daily Challenges',
      script: '"Share one story where you encountered difficulties with your catered food, transport, or dormitory accommodation in Singapore."[cite: 30]'
    },
    {
      phase: 'Phase 5: Closing',
      theme: 'Affirmation & Next Steps',
      script: '"We hear you and we validate your struggles[cite: 30]. In our next session, we will turn these shared concerns into concrete steps for improving our living spaces[cite: 30]. We look forward to seeing everyone next week."[cite: 30]'
    }
  ];

  const slides = [
    {
      num: 1,
      title: 'Slide 1: Issue & Rationale',
      timeTarget: '60s',
      bullets: [
        'Centrality & Vulnerability: ~380k construction work permit holders from India & Bangladesh[cite: 2, 54]. Disruption of primary family kinship buffers creates acute isolation[cite: 2, 25].',
        'Empirical Landmark: Subramaniam et al. (2026) Singapore study (N=1,465) shows 79.2% seek emotional help informally (peers 58.6%, family back home 60.9%)[cite: 2, 10].',
        'Structural Barriers: Fear of job loss/repatriation, mental health stigma ("madness"), language barriers (Bangla/Tamil/Hindi), and lack of awareness of Primary Care Plan (PCP)[cite: 2, 6].',
        'Intervention Mandate: Shift from passive charity to closed, peer-led bunk self-help groups bridging to community organizing[cite: 2, 3].'
      ],
      script: 'Our project addresses lower-wage Indian and Bangladeshi construction workers in Singapore[cite: 1, 10]. With over 380,000 construction permit holders separated from their families, isolation is compounded by wage debt, dormitory living, and workplace safety concerns[cite: 2, 10]. Groundbreaking Singapore data by Subramaniam and colleagues in 2026 shows that while nearly 80% seek emotional help, they overwhelmingly rely on informal networks because fear of repatriation and language barriers deter them from formal care. Crucially, 39.7% want help from a trained peer worker[cite: 3, 6]. We answer this need with a peer-led dormitory model[cite: 2].'
    },
    {
      num: 2,
      title: 'Slide 2: Proposed Groupwork (Peer-Led Self-Help)',
      timeTarget: '75s',
      bullets: [
        'Bunk-Based Micro Setting: Closed self-help groups of 6-8 workers residing in the same bunk room[cite: 10, 26, 29].',
        'Developmental Arc: Social worker initiates and scaffolds safety; bilingual co-workers assume co-leadership[cite: 24, 27, 55].',
        'Norms & Voice: Talking piece circle processes ensure equal voice across linguistic lines[cite: 4, 30, 57].',
        'Holistic Scope: Immediate survival coping (catered food, rest, safety) escalating into long-term mutual aid[cite: 10, 24, 55].'
      ],
      script: 'We structure voluntary self-help circles of 6 to 8 workers within their own dormitory bunks[cite: 10, 29]. Guided by Northen and Kurland\'s developmental stages, a social worker initially establishes psychological safety and ground rules using talking pieces[cite: 4, 26, 57]. As the group transitions into mutuality, trained peer leaders facilitate conversations in Bangla and Tamil[cite: 2, 27, 55]. This transforms dormitory rooms into safe incubators for emotional solace, rights literacy, and collective problem-solving[cite: 2, 24].'
    },
    {
      num: 3,
      title: 'Slide 3: Diversity, Intersectionality & Power',
      timeTarget: '75s',
      bullets: [
        'Linguistic Representation: Addressing Bangla, Tamil, Hindi, and Telugu variations to prevent single-group dominance[cite: 2, 57].',
        'Intersectionality (Crenshaw, 1989): Examining the convergence of debt bondage, low wages, and migrant legal status[cite: 22, 39, 57].',
        'Mutual-Aid Power Sharing: Rotating leadership and baseline negotiation for dietary and dormitory improvements[cite: 10, 31, 39].',
        'Gathering Invitation: Grounded in Peter Block\'s Six Conversations to instill personal ownership and commitment[cite: 20, 32].'
      ],
      script: 'Multicultural groups often face power dynamics where dominant language groups overshadow quieter members. We apply Crenshaw\'s intersectionality and Toseland\'s group dynamics to build deliberate safeguards: bilingual peer connectors, native-language breakouts, and Peter Block\'s gathering conversations[cite: 30, 32, 39]. Workers collectively negotiate acceptable baselines for food quality and dormitory hygiene, replacing top-down paternalism with democratic voice[cite: 13, 31, 42].'
    },
    {
      num: 4,
      title: 'Slide 4: Theoretical Basis & Therapeutic Factors',
      timeTarget: '70s',
      bullets: [
        'Hupcey (1998) Social Support Theory: Rebuilding 4 concepts (relationships, perceived support, received support, social exchange) and 4 functions (informational, emotional, instrumental, appraisal)[cite: 1, 25].',
        'Yalom Factor 1: Group Cohesiveness: The precondition for change; closed bunk circles foster brotherhood and belonging[cite: 56].',
        'Yalom Factor 2: Universality: Realizing "we are in the same boat" through shared meal, housing, and remittance discussions[cite: 4, 56].',
        'Yalom Factor 3: Imparting Information: Multilingual navigation of MOM SnapSAFE, FWMOMCare, and Primary Care Plan (PCP)[cite: 56].'
      ],
      script: 'Moving to Slide 4, our group design is anchored in Hupcey\'s (1998) Social Support Theory[cite: 5]. When Indian and Bangladeshi workers arrive in Singapore, kinship ties are broken[cite: 5]. Our bunk groups restore reciprocal social exchange—seeking, giving, and receiving emotional empathy, informational rights, instrumental safety checks, and appraisal dignity[cite: 2, 5]. To operationalize this, we promote three Yalom factors: Cohesiveness as the precondition for change, creating a bunk brotherhood; Universality, showing members they are in the same boat; and Imparting of Information, linking workers directly to MOM SnapSAFE and NGO resources.'
    }
  ];

  const registerItems = [
    {
      id: 'REG-101',
      category: 'Food Quality',
      issue: 'Catered dinners arriving spoiled/sour due to afternoon roadside deliveries[cite: 22, 45].',
      action: 'Negotiated staggered refrigerated drop boxes with dormitory operator and caterer[cite: 14, 42].',
      owner: 'Operator Logistics / Alliance[cite: 12, 14]',
      status: 'Resolved',
      verified: 'Verified by Worker Council[cite: 12, 15]'
    },
    {
      id: 'REG-102',
      category: 'Dormitory Upkeep',
      issue: 'Ceiling fans in Block C bunk 4 broken during hot humid monsoon weeks.',
      action: '48-hour SLA maintenance tracking logged into Action-to-Resolution register.',
      owner: 'Dorm Maintenance Lead[cite: 12, 14]',
      status: 'In Progress',
      verified: 'Mid-point audit inspection'
    },
    {
      id: 'REG-103',
      category: 'Safety & Reporting',
      issue: 'Unsafe scaffolding clamps on sub-contractor worksite; workers fear speaking up[cite: 10, 15].',
      action: 'Bypassed alliance register; immediately referred to confidential MOM SnapSAFE channel[cite: 12, 15].',
      owner: 'MOM Workplace Safety & Health Inspectorate[cite: 12, 15]',
      status: 'Escalated Formal',
      verified: 'Independent NGO Safeguarding Lead[cite: 12, 15]'
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
                  A dual-track social work intervention linking bunk-based peer mutual aid circles with a multi-stakeholder community partnership (MW-WSP)[cite: 10, 40]. Rooted in Singapore employment legislation, empirical help-seeking behaviors, and social work ethics[cite: 2, 10, 19].
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Team: Men at Work</span>[cite: 1, 37]
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Cohort: Graduate Diploma in Social Work</span>
                  <span className="px-2.5 py-1 rounded-md bg-red-950/60 text-red-200 border border-red-800/50">Graded Defense Mode</span>
                </div>
              </div>
            </div>

            {/* Singapore Empirical Evidence Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-panel p-5 rounded-xl border-l-4 border-[#D32F2F]">
                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">MOM Workforce Context</div>[cite: 2]
                <div className="text-3xl font-black text-white mt-2">~380,000</div>[cite: 2, 22]
                <div className="text-xs font-semibold text-slate-300">Construction Work Permit Holders</div>[cite: 2, 22]
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Primarily from Bangladesh and India[cite: 2, 22]. Disruption of primary family kinship buffers creates acute psychological vulnerability and isolation[cite: 2, 25].
                </p>
              </div>

              <div className="glass-panel p-5 rounded-xl border-l-4 border-amber-500">
                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Subramaniam et al. (2026)</div>[cite: 10]
                <div className="text-3xl font-black text-amber-400 mt-2">79.2%</div>[cite: 10]
                <div className="text-xs font-semibold text-slate-300">Seek Informal Peer/Family Help</div>[cite: 2, 10]
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Only a minority seek formal clinics due to fears of repatriation, loss of employment, cost misconceptions, and mental health stigma[cite: 2, 6, 10].
                </p>
              </div>

              <div className="glass-panel p-5 rounded-xl border-l-4 border-emerald-500">
                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Worker Preferences</div>[cite: 3]
                <div className="text-3xl font-black text-emerald-400 mt-2">39.7%</div>[cite: 3, 6]
                <div className="text-xs font-semibold text-slate-300">Prefer Trained Peer Support</div>[cite: 3, 6]
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  69.1% explicitly endorse face-to-face workshops over digital platforms, confirming the necessity of physical bunk-based circles[cite: 3, 6].
                </p>
              </div>
            </div>

            {/* Regulatory Safeguards in Singapore */}
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#D32F2F]" />
                Singapore Statutory Infrastructure & Safeguards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <div className="font-semibold text-sm text-slate-200">MOM SnapSAFE</div>[cite: 2, 12, 15]
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Statutory reporting tool for severe workplace safety hazards[cite: 12, 15]. Strict identity anonymity prevents employer retaliation[cite: 15]. Unsafe conditions bypass consensual negotiation[cite: 12, 15].
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <div className="font-semibold text-sm text-slate-200">FWMOMCare Portal</div>[cite: 2, 12, 15]
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Mobile engagement enabling migrant workers to directly request MOM officer assistance in native languages (Bangla, Tamil)[cite: 15].
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <div className="font-semibold text-sm text-slate-200">Primary Care Plan (PCP)</div>[cite: 2]
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Mandatory baseline healthcare scheme for migrant workers[cite: 2, 7]. Group leaders impart clear guidance to correct misconceptions regarding clinical costs[cite: 2, 5, 10].
                  </p>
                </div>
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
                  Closed Bunk-Based Circles (Max 8 Members)[cite: 10, 26, 29]
                </div>
              </div>

              {/* 4 Functions of Hupcey */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-red-400 uppercase">Emotional Support</div>[cite: 25]
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Safe bunk circles conducted in native languages (Bangla, Tamil) to ease homesickness and workplace trauma without fear of gossip[cite: 2].
                  </p>
                </div>
                <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-amber-400 uppercase">Informational Support</div>[cite: 25]
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Bilingual orientation on Singapore norms, MOM SnapSAFE reporting, and PCP healthcare access pathways[cite: 2].
                  </p>
                </div>
                <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-blue-400 uppercase">Instrumental Support</div>[cite: 25]
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Peer hygiene audits, navigating catered meal disputes, and escorting ill bunkmates to NGO clinics like HealthServe[cite: 2, 27].
                  </p>
                </div>
                <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-emerald-400 uppercase">Appraisal Support</div>[cite: 25]
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Affirming workers' dignity as national infrastructure builders, validating coping efforts, and peer leader training[cite: 2].
                  </p>
                </div>
              </div>

              {/* Yalom Therapeutic Factors */}
              <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#D32F2F]"></span>
                    1. Group Cohesiveness[cite: 3, 28, 56]
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Precondition for change[cite: 3, 56]. Regular bunk sessions with shared well-being roadmaps bridge linguistic subgroups and build trust[cite: 4, 7, 56].
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                    2. Universality[cite: 4, 28, 56]
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    "We are in the same boat."[cite: 4, 7, 59] Openly voicing meal, bunk, and remittance pressure replaces individual stigma with collective validation[cite: 4, 7, 59].
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    3. Imparting Information[cite: 4, 28, 56]
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Didactic and peer guidance[cite: 59]. Connecting members to translated resources from embassies, MOM, and NGOs (TWC2, HealthServe)[cite: 5, 7, 59].
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Circle Process Simulator */}
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">First Session Circle Process</h3>[cite: 20, 29]
                  <p className="text-xs text-slate-400">Operationalizing talking-piece norms across language groups</p>[cite: 4]
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
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#D32F2F]">Community Practice Model</span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  Migrant Worker Well-being & Safety Partnership (MW-WSP)
                </h2>[cite: 10, 40]
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Synthesizing Boehm & Cnaan (2012) framework criteria with three core development principles: ABCD, Consensus Organizing, and FII Choice-and-Control[cite: 10, 13, 33].
                </p>
              </div>

              {/* 3 Boehm & Cnaan Criteria */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-[#D32F2F] uppercase">1. Community Involvement</div>[cite: 10, 12, 34]
                  <div className="text-sm font-semibold text-white mt-1">Worker Community Advisory Council</div>[cite: 12]
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Voluntary rotating delegates from bunk circles set the agenda[cite: 10, 12]. Employer appointment of representatives is strictly prohibited to prevent co-optation[cite: 12].
                  </p>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-amber-400 uppercase">2. Discursive Deliberation</div>[cite: 10, 12, 34]
                  <div className="text-sm font-semibold text-white mt-1">Multilingual Co-Design Forums</div>[cite: 12]
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Worker-only caucuses precede joint meetings. Dissent is protected confidentially without forcing workers to trade statutory rights[cite: 17].
                  </p>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-emerald-400 uppercase">3. Policy to Implementation</div>[cite: 10, 12, 14]
                  <div className="text-sm font-semibold text-white mt-1">Action-to-Resolution Register</div>[cite: 12]
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Transparent accountability logging time-bound commitments. Urgent safety risks bypass dialogue directly to MOM SnapSAFE[cite: 12, 15].
                  </p>
                </div>
              </div>
            </div>

            {/* Action-to-Resolution Interactive Register */}
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">MW-WSP Action-to-Resolution Register</h3>[cite: 12]
                  <p className="text-xs text-slate-400">Tracking non-identifying priority remediation with verified safeguards</p>[cite: 12, 15]
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
                    <span className="text-xs text-slate-400">Concurrent 5-Minute Cap (Max 4 Slides)</span>[cite: 1, 20, 36]
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
                    <span>Verbatim Speaker Script (Timed)</span>[cite: 1, 5, 59]
                    <span className="text-xs text-slate-300">~60-75s delivery</span>[cite: 1, 5, 59]
                  </div>
                  <div className="mt-4 p-4 bg-slate-950/80 rounded-lg border-l-2 border-amber-400 font-mono text-xs text-slate-200 leading-relaxed italic">
                    "{slides[activeSlide].script}"[cite: 59]
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
              <h2 className="text-xl md:text-2xl font-bold text-white mt-1">APA 7th Reference Audit & Methodological Integrity</h2>[cite: 9, 19, 50]
              <p className="text-xs text-slate-300 mt-1">Verified against Singapore peer-reviewed empirical studies and ministry data.</p>[cite: 52]
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="font-bold text-white">Subramaniam, M., Zhang, Y., Satghare, P., Koh, Y. S., et al. (2026).</span>[cite: 19]
                <p className="text-slate-300 mt-1">
                  Mental health help-seeking behaviour among migrant workers and migrant domestic workers in Singapore: A mixed-methods study. <i>Archives of Public Health</i>, 84, Article 45. https://doi.org/10.1186/s13690-026-01844-z[cite: 19]
                </p>
                <div className="text-[11px] text-amber-400 mt-1">Evidence Scope: Observational data (N=1,465 migrant workers) across CMP sectors[cite: 10, 18].</div>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="font-bold text-white">Boehm, A., & Cnaan, R. A. (2012).</span>[cite: 19]
                <p className="text-slate-300 mt-1">
                  Towards a practice-based model for community practice: Linking theory and practice. <i>Journal of Sociology & Social Welfare</i>, 39(1), 141-168.[cite: 19]
                </p>
                <div className="text-[11px] text-slate-400 mt-1">Course Anchor: Selected criteria 1 (Involvement), 2 (Deliberation), 3 (Implementation)[cite: 10, 12].</div>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="font-bold text-white">Hupcey, J. E. (1998).</span>[cite: 38]
                <p className="text-slate-300 mt-1">
                  Clarifying the social support theory-research linkage. <i>Journal of Advanced Nursing</i>, 27(6), 1231-1241.[cite: 38]
                </p>
                <div className="text-[11px] text-slate-400 mt-1">Theory Anchor: Reciprocal social exchange and 4 functional dimensions[cite: 1, 25].</div>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="font-bold text-white">Ministry of Manpower. (2026).</span>[cite: 19]
                <p className="text-slate-300 mt-1">
                  Foreign workforce numbers [June 2026 data] & WSH Report 2025: Record-low workplace fatality and major injury rates. Singapore Government.[cite: 19]
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 px-4 py-4 text-center text-xs text-slate-400">
        <p>Singapore University of Social Sciences (SUSS) &bull; SWK504 Groupwork and Community Organisation[cite: 20, 53]</p>[cite: 60]
        <p className="text-[11px] text-slate-400 mt-1">Men at Work &mdash; Chin Hong Ern Stephen, Marcus Liew Zhuo Yi, Muhammad Tirmuzi Bin Kasman, Noor Azlan Bin Salim, Tan Vie Ming</p>[cite: 37, 53]
      </footer>
    </div>
  );
}