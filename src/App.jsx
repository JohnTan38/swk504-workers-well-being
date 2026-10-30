import React, { useState, useEffect } from 'react';
import {
  Users, Shield, BookOpen, Layers, Award, Download, Search,
  ExternalLink, ChevronRight, Play, Pause, RotateCcw, AlertTriangle,
  HeartHandshake, Building2, MapPin, CheckCircle2, Info, ArrowUpRight
} from 'lucide-react';
import HoverTooltipArea from './components/HoverTooltipArea.jsx';

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
  const [timerSeconds, setTimerSeconds] = useState(60);
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
              <img src="/suss-logo.svg" alt="SWK504 course project" className="h-8 w-auto" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/swk504-mark.svg"; }} />
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
            <a
              href={`${import.meta.env.BASE_URL}SWK504_Men_At_Work.pdf`}
              download="SWK504_Men_At_Work.pdf"
              className="flex items-center gap-2 px-3 py-1.5 bg-[#D32F2F] hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-md transition-all active:scale-95"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Takeaway</span>
            </a>
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
      <HoverTooltipArea className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8">
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
                  A dual-track social work intervention linking bunk-based peer mutual aid circles with a multi-stakeholder community partnership (MW-WSP). Rooted in Singapore employment legislation, empirical help-seeking behaviors, and social work ethics.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Team: Men at Work</span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">Cohort: Graduate Diploma in Social Work</span>
                  <span className="px-2.5 py-1 rounded-md bg-red-950/60 text-red-200 border border-red-800/50">Graded Defense Mode</span>
                </div>
              </div>
            </div>

            {/* Singapore Empirical Evidence Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-panel p-5 rounded-xl border-l-4 border-[#D32F2F]" role="group" tabIndex={0} aria-label={"MOM Workforce Context: The presentation estimates approximately 380,000 construction Work Permit holders, focusing on workers from India and Bangladesh."} data-tooltip-title={"MOM Workforce Context"} data-tooltip-category={"SINGAPORE CONTEXT"} data-tooltip-metric={"~380,000"} data-tooltip-description={"The presentation estimates approximately 380,000 construction Work Permit holders, focusing on workers from India and Bangladesh."} data-tooltip-detail={"Population scale frames the case for multilingual, dormitory-based support and community advocacy."} data-tooltip-tags={"MOM,Construction,Population"}>
                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">MOM Workforce Context</div>
                <div className="text-3xl font-black text-white mt-2">~380,000</div>
                <div className="text-xs font-semibold text-slate-300">Construction Work Permit Holders</div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Primarily from Bangladesh and India. Disruption of primary family kinship buffers creates acute psychological vulnerability and isolation.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-xl border-l-4 border-amber-500" role="group" tabIndex={0} aria-label={"Informal Help-Seeking: The cited 2026 Singapore study is used to describe migrant workers' preference for informal emotional support through family and peers."} data-tooltip-title={"Informal Help-Seeking"} data-tooltip-category={"EMPIRICAL EVIDENCE"} data-tooltip-metric={"79.2%"} data-tooltip-description={"The cited 2026 Singapore study is used to describe migrant workers' preference for informal emotional support through family and peers."} data-tooltip-detail={"The group model prioritises trusted peer-led conversations while maintaining routes to professional help."} data-tooltip-tags={"Subramaniam 2026,Support Networks,Groupwork"}>
                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Subramaniam et al. (2026)</div>
                <div className="text-3xl font-black text-amber-400 mt-2">79.2%</div>
                <div className="text-xs font-semibold text-slate-300">Seek Informal Peer/Family Help</div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Only a minority seek formal clinics due to fears of repatriation, loss of employment, cost misconceptions, and mental health stigma.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-xl border-l-4 border-emerald-500" role="group" tabIndex={0} aria-label={"Preference for Trained Peers: The presentation cites 39.7% preferring trained fellow-worker support and 69.1% endorsing face-to-face workshops."} data-tooltip-title={"Preference for Trained Peers"} data-tooltip-category={"WORKER PREFERENCES"} data-tooltip-metric={"39.7%"} data-tooltip-description={"The presentation cites 39.7% preferring trained fellow-worker support and 69.1% endorsing face-to-face workshops."} data-tooltip-detail={"A bilingual peer-facilitator model complements in-person bunk-circle sessions."} data-tooltip-tags={"Peer Leadership,Face-to-Face,Participation"}>
                <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Worker Preferences</div>
                <div className="text-3xl font-black text-emerald-400 mt-2">39.7%</div>
                <div className="text-xs font-semibold text-slate-300">Prefer Trained Peer Support</div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  69.1% explicitly endorse face-to-face workshops over digital platforms, confirming the necessity of physical bunk-based circles.
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
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"MOM SnapSAFE: A reporting route discussed in the project for workplace safety concerns, including hazards requiring formal attention."} data-tooltip-title={"MOM SnapSAFE"} data-tooltip-category={"WORKPLACE SAFETY"} data-tooltip-metric={"Reporting"} data-tooltip-description={"A reporting route discussed in the project for workplace safety concerns, including hazards requiring formal attention."} data-tooltip-detail={"Serious safety issues are escalated to official channels instead of being left to informal negotiation."} data-tooltip-tags={"MOM,Worker Rights,Escalation"}>
                  <div className="font-semibold text-sm text-slate-200">MOM SnapSAFE</div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Statutory reporting tool for severe workplace safety hazards. Strict identity anonymity prevents employer retaliation. Unsafe conditions bypass consensual negotiation.
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"FWMOMCare: The app presents FWMOMCare as an avenue for migrant workers to seek assistance and engage with MOM."} data-tooltip-title={"FWMOMCare"} data-tooltip-category={"MIGRANT WORKER SUPPORT"} data-tooltip-metric={"Assistance"} data-tooltip-description={"The app presents FWMOMCare as an avenue for migrant workers to seek assistance and engage with MOM."} data-tooltip-detail={"Peer facilitators can help members identify trustworthy government support and information."} data-tooltip-tags={"MOM,Assistance,Multilingual"}>
                  <div className="font-semibold text-sm text-slate-200">FWMOMCare Portal</div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Mobile engagement enabling migrant workers to directly request MOM officer assistance in native languages (Bangla, Tamil).
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"Primary Care Plan (PCP): An employer-arranged primary healthcare coverage scheme covered in the app's orientation material."} data-tooltip-title={"Primary Care Plan (PCP)"} data-tooltip-category={"HEALTHCARE ACCESS"} data-tooltip-metric={"PCP"} data-tooltip-description={"An employer-arranged primary healthcare coverage scheme covered in the app's orientation material."} data-tooltip-detail={"Informational support includes helping workers understand routes to primary healthcare services."} data-tooltip-tags={"Healthcare,Information,Access"}>
                  <div className="font-semibold text-sm text-slate-200">Primary Care Plan (PCP)</div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Mandatory baseline healthcare scheme for migrant workers. Group leaders impart clear guidance to correct misconceptions regarding clinical costs.
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
                  Closed Bunk-Based Circles (Max 8 Members)
                </div>
              </div>

              {/* 4 Functions of Hupcey */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"Emotional Support: Provide culturally responsive listening and a sense of belonging within voluntary dormitory-based support circles."} data-tooltip-title={"Emotional Support"} data-tooltip-category={"HUPCEY — SUPPORT FUNCTIONS"} data-tooltip-metric={"Empathy"} data-tooltip-description={"Provide culturally responsive listening and a sense of belonging within voluntary dormitory-based support circles."} data-tooltip-detail={"Shared conversations about homesickness and work pressures can build mutual trust."} data-tooltip-tags={"Social Support,Emotional,Cohesion"}>
                  <div className="text-xs font-bold text-red-400 uppercase">Emotional Support</div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Safe bunk circles conducted in native languages (Bangla, Tamil) to ease homesickness and workplace trauma without fear of gossip.
                  </p>
                </div>
                <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"Informational Support: Share clear information in familiar languages about local expectations, safety reporting and healthcare navigation."} data-tooltip-title={"Informational Support"} data-tooltip-category={"HUPCEY — SUPPORT FUNCTIONS"} data-tooltip-metric={"Guidance"} data-tooltip-description={"Share clear information in familiar languages about local expectations, safety reporting and healthcare navigation."} data-tooltip-detail={"Bilingual peer leaders help reduce literacy and language barriers."} data-tooltip-tags={"Rights Literacy,PCP,Bilingual"}>
                  <div className="text-xs font-bold text-amber-400 uppercase">Informational Support</div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Bilingual orientation on Singapore norms, MOM SnapSAFE reporting, and PCP healthcare access pathways.
                  </p>
                </div>
                <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"Instrumental Support: Mobilise practical peer assistance for everyday well-being concerns, including food and accommodation problems."} data-tooltip-title={"Instrumental Support"} data-tooltip-category={"HUPCEY — SUPPORT FUNCTIONS"} data-tooltip-metric={"Practical help"} data-tooltip-description={"Mobilise practical peer assistance for everyday well-being concerns, including food and accommodation problems."} data-tooltip-detail={"Mutual aid can include navigating support services or helping a colleague reach assistance."} data-tooltip-tags={"Practical Aid,Dormitories,Well-being"}>
                  <div className="text-xs font-bold text-blue-400 uppercase">Instrumental Support</div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Peer hygiene audits, navigating catered meal disputes, and escorting ill bunkmates to NGO clinics like HealthServe.
                  </p>
                </div>
                <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"Appraisal Support: Affirm workers' contributions, coping efforts and strengths through recognition and constructive peer feedback."} data-tooltip-title={"Appraisal Support"} data-tooltip-category={"HUPCEY — SUPPORT FUNCTIONS"} data-tooltip-metric={"Affirmation"} data-tooltip-description={"Affirm workers' contributions, coping efforts and strengths through recognition and constructive peer feedback."} data-tooltip-detail={"A strengths-based stance promotes worker agency and dignity."} data-tooltip-tags={"Dignity,Strengths,Feedback"}>
                  <div className="text-xs font-bold text-emerald-400 uppercase">Appraisal Support</div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Affirming workers' dignity as national infrastructure builders, validating coping efforts, and peer leader training.
                  </p>
                </div>
              </div>

              {/* Yalom Therapeutic Factors */}
              <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800" role="group" tabIndex={0} aria-label={"Group Cohesiveness: Repeated sessions and shared goals can strengthen trust between members of multilingual dormitory groups."} data-tooltip-title={"Group Cohesiveness"} data-tooltip-category={"YALOM THERAPEUTIC FACTORS"} data-tooltip-metric={"Belonging"} data-tooltip-description={"Repeated sessions and shared goals can strengthen trust between members of multilingual dormitory groups."} data-tooltip-detail={"Cohesion helps create the conditions for participation and collective action."} data-tooltip-tags={"Yalom,Trust,Common Goals"}>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#D32F2F]"></span>
                    1. Group Cohesiveness
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Precondition for change. Regular bunk sessions with shared well-being roadmaps bridge linguistic subgroups and build trust.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800" role="group" tabIndex={0} aria-label={"Universality: Members discover that concerns about meals, living conditions or family remittances may be shared by others."} data-tooltip-title={"Universality"} data-tooltip-category={"YALOM THERAPEUTIC FACTORS"} data-tooltip-metric={"Shared experience"} data-tooltip-description={"Members discover that concerns about meals, living conditions or family remittances may be shared by others."} data-tooltip-detail={"Hearing common experiences may reduce isolation and foster mutual validation."} data-tooltip-tags={"Yalom,Peer Sharing,Validation"}>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                    2. Universality
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    "We are in the same boat." Openly voicing meal, bunk, and remittance pressure replaces individual stigma with collective validation.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800" role="group" tabIndex={0} aria-label={"Imparting Information: Facilitators and peers exchange practical knowledge and point members towards translated resources."} data-tooltip-title={"Imparting Information"} data-tooltip-category={"YALOM THERAPEUTIC FACTORS"} data-tooltip-metric={"Resources"} data-tooltip-description={"Facilitators and peers exchange practical knowledge and point members towards translated resources."} data-tooltip-detail={"Examples in the project include embassies, MOM, TWC2 and HealthServe."} data-tooltip-tags={"Yalom,Resource Navigation,Learning"}>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    3. Imparting Information
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Didactic and peer guidance. Connecting members to translated resources from embassies, MOM, and NGOs (TWC2, HealthServe).
                  </p>
                </div>
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
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#D32F2F]">Community Practice Model</span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  Migrant Worker Well-being & Safety Partnership (MW-WSP)
                </h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Synthesizing Boehm & Cnaan (2012) framework criteria with three core development principles: ABCD, Consensus Organizing, and FII Choice-and-Control.
                </p>
              </div>

              {/* 3 Boehm & Cnaan Criteria */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"Community Involvement: Voluntary worker delegates from peer circles help set priorities for the community intervention."} data-tooltip-title={"Community Involvement"} data-tooltip-category={"BOEHM & CNAAN — CRITERION 1"} data-tooltip-metric={"Worker Council"} data-tooltip-description={"Voluntary worker delegates from peer circles help set priorities for the community intervention."} data-tooltip-detail={"The proposed Worker Community Advisory Council gives members meaningful representation."} data-tooltip-tags={"Participation,WCAC,Voice"}>
                  <div className="text-xs font-bold text-[#D32F2F] uppercase">1. Community Involvement</div>
                  <div className="text-sm font-semibold text-white mt-1">Worker Community Advisory Council</div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Voluntary rotating delegates from bunk circles set the agenda. Employer appointment of representatives is strictly prohibited to prevent co-optation.
                  </p>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"Discursive Deliberation: Worker-only discussions and multilingual forums create space to share concerns and negotiate actions."} data-tooltip-title={"Discursive Deliberation"} data-tooltip-category={"BOEHM & CNAAN — CRITERION 2"} data-tooltip-metric={"Co-design"} data-tooltip-description={"Worker-only discussions and multilingual forums create space to share concerns and negotiate actions."} data-tooltip-detail={"Confidentiality and the right to disagree are central protections in the model."} data-tooltip-tags={"Dialogue,Power Sharing,Language"}>
                  <div className="text-xs font-bold text-amber-400 uppercase">2. Discursive Deliberation</div>
                  <div className="text-sm font-semibold text-white mt-1">Multilingual Co-Design Forums</div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Worker-only caucuses precede joint meetings. Dissent is protected confidentially without forcing workers to trade statutory rights.
                  </p>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"Policy to Implementation: An Action-to-Resolution Register tracks agreed actions, responsible leads and verification steps."} data-tooltip-title={"Policy to Implementation"} data-tooltip-category={"BOEHM & CNAAN — CRITERION 3"} data-tooltip-metric={"Accountability"} data-tooltip-description={"An Action-to-Resolution Register tracks agreed actions, responsible leads and verification steps."} data-tooltip-detail={"Formal reporting is retained for serious workplace safety concerns."} data-tooltip-tags={"Governance,Follow-through,Safeguards"}>
                  <div className="text-xs font-bold text-emerald-400 uppercase">3. Policy to Implementation</div>
                  <div className="text-sm font-semibold text-white mt-1">Action-to-Resolution Register</div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Transparent accountability logging time-bound commitments. Urgent safety risks bypass dialogue directly to MOM SnapSAFE.
                  </p>
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
                      {String(Math.floor(timerSeconds / 60)).padStart(2, '0')}:{String(timerSeconds % 60).padStart(2, '0')}
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
                      setTimerSeconds(parseInt(slides[activeSlide].timeTarget, 10));
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
                    data-tooltip-title={s.title}
                    data-tooltip-category="PRESENTATION DEFENSE"
                    data-tooltip-metric={s.timeTarget}
                    data-tooltip-description={s.bullets[0]}
                    data-tooltip-detail="Hover to preview the slide topic; select this tile to view its talking points and timed script."
                    data-tooltip-tags="Slides,Defense,Speaker Notes"
                    onClick={() => {
                      setActiveSlide(idx);
                      setTimerSeconds(parseInt(s.timeTarget, 10));
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
                <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"Presentation Visual Anchors: These are the concise verbal and visual points for the currently selected slide."} data-tooltip-title={"Presentation Visual Anchors"} data-tooltip-category={"DEFENSE SIMULATOR"} data-tooltip-metric={"4 key points"} data-tooltip-description={"These are the concise verbal and visual points for the currently selected slide."} data-tooltip-detail={"Use the anchors to organise the presentation without reading every sentence verbatim."} data-tooltip-tags={"Presentation,Key Ideas,Structure"}>
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

                <div className="bg-[#1B2A4A]/50 p-5 rounded-xl border border-white/10" role="group" tabIndex={0} aria-label={"Timed Speaker Script: The selected slide's drafted narration is displayed here for presentation rehearsal."} data-tooltip-title={"Timed Speaker Script"} data-tooltip-category={"DEFENSE SIMULATOR"} data-tooltip-metric={"60–75 sec"} data-tooltip-description={"The selected slide's drafted narration is displayed here for presentation rehearsal."} data-tooltip-detail={"The stopwatch and slide-specific time targets support practice delivery."} data-tooltip-tags={"Speaker Notes,Practice,Timing"}>
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
          <div className="glass-panel p-4 sm:p-6 rounded-2xl space-y-7">
            {/* QR is visible at the top of the audit panel, without interrupting the bibliography. */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px] gap-6 items-start">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#D32F2F]">Scholarly Verification</span>
                <h2 className="text-xl md:text-2xl font-bold text-white mt-1">APA 7th Reference Audit &amp; Methodological Integrity</h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">Academic sources supporting the groupwork and community intervention model, with Singapore evidence and relevant course texts.</p>
                <p className="text-xs text-slate-400 mt-3">Book entries follow APA 7 author–date formatting, sentence-case titles and italicised book titles.</p>
              </div>

              <aside className="rounded-2xl border border-white/15 bg-slate-900/70 p-3 text-center shadow-lg" aria-label="Men at Work project QR code">
                <div className="bg-white rounded-xl p-4 mx-auto w-full max-w-[184px]">
                  <img
                    src={`${import.meta.env.BASE_URL}qr-code-men-at-work.png`}
                    alt="QR code supplied for the SWK504 Men at Work group project"
                    width="320"
                    height="320"
                    loading="lazy"
                    className="w-full h-auto object-contain"
                    data-testid="men-at-work-qr-code"
                  />
                </div>
                <p className="font-semibold text-white text-xs mt-3">Men at Work · Project QR</p>
                <p className="text-[11px] text-slate-400 mt-1">Scan to open the SWK504 website</p>
                <a
                  href="https://swk504-workers-well-being.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 text-[11px] mt-2 text-red-300 underline underline-offset-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
                >
                  Open project website <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </aside>
            </div>

            {/* Requested course textbooks, formatted as APA 7 book references. */}
            <section aria-labelledby="apa7-course-texts-title">
              <h3 id="apa7-course-texts-title" className="text-sm font-bold text-amber-300 mb-3">Core Groupwork Texts</h3>
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label="Northen and Kurland (2001): Foundational text on social work with groups and group development." data-tooltip-title="Northen & Kurland (2001)" data-tooltip-category="CORE COURSE TEXT" data-tooltip-metric="Group development" data-tooltip-description="A foundational groupwork text used to understand group development, facilitation and effective social work practice with groups." data-tooltip-detail="Applied to the progressive stages of the peer-led dormitory self-help circles." data-tooltip-tags="Group Stages,Facilitation,Social Work">
                  <p className="apa7-reference text-slate-200 leading-relaxed">Northen, H., &amp; Kurland, R. (2001). <i>Social work with groups</i> (3rd ed.). Columbia University Press.</p>
                  <p className="text-[11px] text-slate-400 mt-2">In-text citation: (Northen &amp; Kurland, 2001)</p>
                </div>
                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label="Toseland and Rivas (2022): Group work practice textbook for process, facilitation and group dynamics." data-tooltip-title="Toseland & Rivas (2022)" data-tooltip-category="CORE COURSE TEXT" data-tooltip-metric="Groupwork practice" data-tooltip-description="A core groupwork practice textbook addressing how groups are planned, facilitated, developed and evaluated." data-tooltip-detail="Supports attention to group dynamics, inclusion, facilitation and mutual aid among workers." data-tooltip-tags="Groupwork,Mutual Aid,Dynamics">
                  <p className="apa7-reference text-slate-200 leading-relaxed">Toseland, R. W., &amp; Rivas, R. F. (2022). <i>An introduction to group work practice</i>. Pearson Education Limited.</p>
                  <p className="text-[11px] text-slate-400 mt-2">In-text citation: (Toseland &amp; Rivas, 2022)</p>
                </div>
              </div>
            </section>

            <section aria-labelledby="apa7-existing-references-title">
              <h3 id="apa7-existing-references-title" className="text-sm font-bold text-white mb-3">Research, Theory &amp; Singapore Context</h3>
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"Subramaniam et al. (2026): Empirical study cited in the SWK504 project on mental health help-seeking among migrant workers in Singapore."} data-tooltip-title={"Subramaniam et al. (2026)"} data-tooltip-category={"ACADEMIC REFERENCE"} data-tooltip-metric={"Help-seeking"} data-tooltip-description={"Empirical study cited in the SWK504 project on mental health help-seeking among migrant workers in Singapore."} data-tooltip-detail={"Used in the presentation to discuss informal support preferences and access barriers."} data-tooltip-tags={"Evidence,Methods,Migrant Workers"}>
                  <span className="font-bold text-white">Subramaniam, M., Zhang, Y., Satghare, P., Koh, Y. S., et al. (2026).</span>
                  <p className="text-slate-300 mt-1">
                    Mental health help-seeking behaviour among migrant workers and migrant domestic workers in Singapore: A mixed-methods study. <i>Archives of Public Health</i>, 84, Article 45. https://doi.org/10.1186/s13690-026-01844-z
                  </p>
                  <div className="text-[11px] text-amber-400 mt-1">Evidence Scope: Observational data (N=1,465 migrant workers) across CMP sectors.</div>
                </div>

                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"Boehm & Cnaan (2012): Theoretical framework for choosing a community practice approach and linking concepts with implementation."} data-tooltip-title={"Boehm & Cnaan (2012)"} data-tooltip-category={"ACADEMIC REFERENCE"} data-tooltip-metric={"Community practice"} data-tooltip-description={"Theoretical framework for choosing a community practice approach and linking concepts with implementation."} data-tooltip-detail={"The app applies participation, deliberation and implementation criteria to the MW-WSP."} data-tooltip-tags={"Framework,Task 9,Community"}>
                  <span className="font-bold text-white">Boehm, A., &amp; Cnaan, R. A. (2012).</span>
                  <p className="text-slate-300 mt-1">
                    Towards a practice-based model for community practice: Linking theory and practice. <i>Journal of Sociology &amp; Social Welfare</i>, 39(1), 141-168.
                  </p>
                  <div className="text-[11px] text-slate-400 mt-1">Course Anchor: Selected criteria 1 (Involvement), 2 (Deliberation), 3 (Implementation).</div>
                </div>

                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"Hupcey (1998): Social Support Theory anchor in the SWK504 project, covering relationships and reciprocal support functions."} data-tooltip-title={"Hupcey (1998)"} data-tooltip-category={"ACADEMIC REFERENCE"} data-tooltip-metric={"Social support"} data-tooltip-description={"Social Support Theory anchor in the SWK504 project, covering relationships and reciprocal support functions."} data-tooltip-detail={"Applied to emotional, informational, instrumental and appraisal support in peer groups."} data-tooltip-tags={"Theory,Groupwork,Hupcey"}>
                  <span className="font-bold text-white">Hupcey, J. E. (1998).</span>
                  <p className="text-slate-300 mt-1">
                    Clarifying the social support theory-research linkage. <i>Journal of Advanced Nursing</i>, 27(6), 1231-1241.
                  </p>
                  <div className="text-[11px] text-slate-400 mt-1">Theory Anchor: Reciprocal social exchange and 4 functional dimensions.</div>
                </div>

                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800" role="group" tabIndex={0} aria-label={"Ministry of Manpower (2026): Government data cited for workforce scale, workplace safety conditions and employment context."} data-tooltip-title={"Ministry of Manpower (2026)"} data-tooltip-category={"ACADEMIC REFERENCE"} data-tooltip-metric={"Singapore context"} data-tooltip-description={"Government data cited for workforce scale, workplace safety conditions and employment context."} data-tooltip-detail={"Provides contextual background for the project's issue and rationale."} data-tooltip-tags={"MOM,Statistics,Workplace Safety"}>
                  <span className="font-bold text-white">Ministry of Manpower. (2026).</span>
                  <p className="text-slate-300 mt-1">
                    Foreign workforce numbers [June 2026 data] &amp; WSH Report 2025: Record-low workplace fatality and major injury rates. Singapore Government.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </HoverTooltipArea>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 px-4 py-4 text-center text-xs text-slate-400">
        <p>Singapore University of Social Sciences (SUSS) &bull; SWK504 Groupwork and Community Organisation</p>
        <p className="text-[11px] text-slate-400 mt-1">Men at Work &mdash; Chin Hong Ern Stephen, Marcus Liew Zhuo Yi, Muhammad Tirmuzi Bin Kasman, Noor Azlan Bin Salim, Tan Vie Ming</p>
      </footer>
    </div>
  );
}