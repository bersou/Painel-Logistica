import React, { useState } from 'react';
import { 
  Hexagon, 
  Package, Truck, MapPin, Search, 
  CheckCircle2, AlertTriangle, Box, 
  Activity, X, Map as MapIcon, 
  Navigation, Phone, Clock, ShieldAlert, 
  Check, ChevronRight, TrendingUp, 
  Thermometer, BatteryCharging, 
  FileText, QrCode, MapPinned,
  Satellite, Server, History, MessageSquareWarning,
  Wrench, CalendarClock
} from 'lucide-react';

// --- ESTILOS INJETADOS ---
const CustomStyles = () => (
  <style>{`
    .animate-gradient-text {
      background: linear-gradient(to right, #4f46e5, #0ea5e9, #10b981, #4f46e5);
      background-size: 200% auto;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      animation: shine 4s linear infinite;
    }
    @keyframes shine { to { background-position: 200% center; } }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

// =====================================================================
// 📸 IMAGEM DE CAPA DO RASTREIO E LOGOS
// =====================================================================
const TRACKING_BG_URL = 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774112612/Picsart_26-03-21_14-01-59-284_2_pyqjog.jpg';

const CLIENT_LOGOS = {
  'Mercado Livre': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774110431/mercado-livre-logo-png_seeklogo-264236_onqmjq.png',
  'Dafiti': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774109766/dafiti-logo-png_seeklogo-214989_poot5a.png',
  'Shopee': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774109781/images_lbk692.png',
  'Americanas': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774110431/images_wcoxnd.jpg',
  'Amazon': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774109743/images_1_abboq2.jpg',
  'Apple': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774109722/747_hjikst.png',
  'LG': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774109524/1000316462_plxqcy.webp',
  'PlayStation': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774111735/playstation_drdbmt.jpg',
};

const USER_PHOTOS = {
  'José Bernardo': 'https://iili.io/f4Ae6es.png', 
  'Carlos Silva': 'https://randomuser.me/api/portraits/men/55.jpg', 
  'João Pedro': 'https://randomuser.me/api/portraits/men/32.jpg',
  'Marcos Silva': 'https://randomuser.me/api/portraits/men/44.jpg',
  'Carla Dias': 'https://randomuser.me/api/portraits/women/68.jpg',
  'Roberto Justos': 'https://randomuser.me/api/portraits/men/85.jpg',
};

// --- COMPONENTES VISUAIS (Avatares e Logos) ---
const CompanyLogo = ({ name, className = "w-10 h-10" }) => {
  const [imgError, setImgError] = useState(false);
  const logoUrl = CLIENT_LOGOS[name];

  if (!logoUrl || imgError) {
    return (
      <div className={`${className} bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-black text-xs shadow-sm border border-indigo-200 shrink-0`}>
        {name.substring(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div className={`${className} bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200 overflow-hidden p-1 shrink-0`}>
      <img src={logoUrl} alt={name} className="w-full h-full object-contain rounded-lg" onError={() => setImgError(true)} />
    </div>
  );
};

const Avatar = ({ name, className = "w-10 h-10" }) => {
  const photoUrl = USER_PHOTOS[name];
  return (
    <div className={`${className} rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-200 shrink-0 flex items-center justify-center`}>
      {photoUrl ? (
        <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="font-black text-slate-500 text-xs">{name.substring(0,2).toUpperCase()}</span>
      )}
    </div>
  );
};

// --- BANCO DE DADOS MOCK ---
const MOCK_INVENTORY = [
  { id: 1, sku: 'SYNC-EL-001', name: 'iPhone 15 Pro Max 256GB', qty: 1250, client: 'Apple', status: 'Adequado', corredor: 'A-12', prateleira: 'P-04' },
  { id: 2, sku: 'SYNC-MD-045', name: 'Cadeira Gamer DXRacer', qty: 15, client: 'Amazon', status: 'Crítico', corredor: 'C-05', prateleira: 'P-01' },
  { id: 3, sku: 'SYNC-TV-099', name: 'Smart TV LG OLED 65"', qty: 340, client: 'LG', status: 'Atenção', corredor: 'B-02', prateleira: 'P-02' },
  { id: 4, sku: 'SYNC-AC-102', name: 'AirPods Pro 2', qty: 4500, client: 'Mercado Livre', status: 'Adequado', corredor: 'A-01', prateleira: 'P-09' },
  { id: 5, sku: 'SYNC-CG-011', name: 'PlayStation 5 Slim', qty: 89, client: 'PlayStation', status: 'Crítico', corredor: 'A-10', prateleira: 'P-03' },
  { id: 6, sku: 'SYNC-UD-301', name: 'Air Fryer Mondial 4L', qty: 3200, client: 'Americanas', status: 'Adequado', corredor: 'D-15', prateleira: 'P-01' },
  { id: 7, sku: 'SYNC-SP-887', name: 'Tênis Nike Revolution', qty: 1100, client: 'Shopee', status: 'Adequado', corredor: 'G-11', prateleira: 'P-08' },
  { id: 8, sku: 'SYNC-FW-991', name: 'Bolsa Couro Legítimo', qty: 25, client: 'Dafiti', status: 'Crítico', corredor: 'F-02', prateleira: 'P-05' },
];

const MOCK_ROUTES = [
  { id: 'VTR-01', driver: 'João Pedro', phone: '(11) 98765-4321', plate: 'XYZ-9090', status: 'Em Rota', location: 'Marginal Tietê, São Paulo', dest: 'CD Barueri, SP', eta: '45 min', speed: '82 km/h', temp: '18°C', cargo: [{ item: 'PlayStation 5', qty: 15, client: 'PlayStation' }, { item: 'iPhone 15 Pro', qty: 50, client: 'Apple' }] },
  { id: 'VTR-02', driver: 'Marcos Silva', phone: '(11) 91234-5678', plate: 'QWE-1234', status: 'Atrasado', location: 'Rod. Dutra, Km 210', dest: 'São José dos Campos', eta: '2h 10m', speed: '0 km/h', temp: '22°C', cargo: [{ item: 'Smart TV LG', qty: 30, client: 'LG' }, { item: 'Air Fryer Mondial', qty: 120, client: 'Americanas' }] },
  { id: 'VTR-03', driver: 'Carla Dias', phone: '(11) 95555-4444', plate: 'ABC-5678', status: 'Em Rota', location: 'Rod. Castelo Branco', dest: 'Sorocaba, SP', eta: '55 min', speed: '90 km/h', temp: '19°C', cargo: [{ item: 'Tênis Nike', qty: 200, client: 'Shopee' }, { item: 'Bolsa Couro', qty: 55, client: 'Dafiti' }] },
  { id: 'VTR-04', driver: 'Carlos Silva', phone: '(11) 99999-1111', plate: 'BRA-3R56', status: 'Em Rota', location: 'Rua Augusta', dest: 'Centro de SP', eta: '15 min', speed: '30 km/h', temp: '20°C', cargo: [{ item: 'Cadeira Gamer', qty: 10, client: 'Amazon' }, { item: 'AirPods Pro 2', qty: 150, client: 'Mercado Livre' }] },
];

const MOCK_SHIPMENTS = {
  'SYNC-84920': {
    id: 'SYNC-84920', client: 'Mercado Livre', destination: 'Av. Paulista, 1000 - SP', status: 'Em Trânsito', location: 'Rod. dos Bandeirantes, Km 45', eta: 'Hoje, 14:30', progress: 65, driver: 'Carlos Silva', plate: 'BRA-3R56',
    events: [{ time: '09:15', desc: 'Em trânsito', done: true }, { time: '06:30', desc: 'Saiu do Centro de Distribuição', done: true }]
  }
};

const DETAILS_MOCK = {
  entregas: [
    { id: '#ENT-001', time: '10:45', client: 'Mercado Livre', dest: 'Rua Augusta, SP', driver: 'João Pedro', sign: 'Recebido por: Maria S.' },
    { id: '#ENT-002', time: '10:30', client: 'Amazon', dest: 'Av. Brasil, Campinas', driver: 'Marcos Silva', sign: 'Recebido por: Portaria' },
    { id: '#ENT-003', time: '09:15', client: 'Americanas', dest: 'Centro, Guarulhos', driver: 'Carla Dias', sign: 'Recebido pelo Titular' },
    { id: '#ENT-004', time: '08:50', client: 'Dafiti', dest: 'Vila Madalena, SP', driver: 'Carlos Silva', sign: 'Recebido por: Síndico' },
  ],
  transito: MOCK_ROUTES.filter(r => r.status !== 'Parado'),
  problemas: [
    { 
      id: 'OC-991', type: 'Destinatário Ausente', route: 'VTR-02', plate: 'QWE-1234', 
      time: '10:20', severity: 'Atenção', driver: 'Marcos Silva', phone: '(11) 91234-5678',
      location: 'Av. Paulista, 1500 - São Paulo, SP',
      desc: 'Motorista tentou contato via interfone e celular por 15 minutos. Ninguém atendeu na portaria. O zelador informou que o cliente está viajando.' 
    },
    { 
      id: 'OC-992', type: 'Pneu Furado na Via', route: 'VTR-04', plate: 'BRA-3R56', 
      time: '09:45', severity: 'Crítico', driver: 'Carlos Silva', phone: '(11) 99999-1111',
      location: 'Rodovia Anhanguera, Km 23 - Sentido SP',
      desc: 'Pneu traseiro direito estourou em um buraco. Veículo está imobilizado no acostamento. A carga está segura e baú trancado. Necessita de guincho.' 
    },
  ]
};

const CHART_DATA = [
  { time: '06:00', volume: 480, status: 'normal' }, 
  { time: '08:00', volume: 450, status: 'attention' }, 
  { time: '10:00', volume: 1100, status: 'critical' }, 
  { time: '12:00', volume: 600, status: 'normal' }, 
  { time: '14:00', volume: 720, status: 'attention' }, 
  { time: 'Agora', volume: 1220, status: 'critical' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDark, setIsDark] = useState(false); 
  
  const [trackingId, setTrackingId] = useState('');
  const [searchedShipment, setSearchedShipment] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [activeBar, setActiveBar] = useState(null);

  const toggleTheme = () => setIsDark(!isDark);

  // --- TEMAS DINÂMICOS ---
  const theme = {
    bg: isDark ? 'bg-slate-950' : 'bg-slate-50',
    card: isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100',
    cardHover: isDark ? 'hover:bg-slate-800' : 'hover:shadow-md',
    textMain: isDark ? 'text-slate-100' : 'text-slate-900',
    textSec: isDark ? 'text-slate-400' : 'text-slate-500',
    border: isDark ? 'border-slate-800' : 'border-slate-100',
    navBottom: isDark ? 'bg-slate-950/95 border-slate-800' : 'bg-white/95 border-slate-200',
    header: isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50/90 border-slate-200',
    input: isDark ? 'bg-slate-900 border-slate-700 text-white placeholder:text-slate-500' : 'bg-white border-slate-200 text-slate-800',
    modalBg: isDark ? 'bg-slate-950' : 'bg-slate-50',
    modalHeader: isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100',
    modalContentBg: isDark ? 'bg-slate-900' : 'bg-white'
  };

  const handleTrackingSearch = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setSearchError(''); setIsSearching(true); setSearchedShipment(null);
    setTimeout(() => {
      // Alterado para SYNC para corresponder ao novo nome LOGISYNC
      const result = MOCK_SHIPMENTS[trackingId.toUpperCase()];
      if (result) setSearchedShipment(result);
      else setSearchError('Código não encontrado. Tente SYNC-84920');
      setIsSearching(false);
    }, 800);
  };
  
  const navItems = [
    { id: 'dashboard', icon: Activity, label: 'Painel' },
    { id: 'estoque', icon: Box, label: 'Estoque' },
    { id: 'rastreamento', icon: Search, label: 'Rastreio' },
    { id: 'rotas', icon: MapIcon, label: 'Rotas' },
  ];

  const getStatusColor = (status) => {
    if (status === 'Adequado' || status === 'Normal' || status === 'Em Rota') return 'bg-emerald-100/20 text-emerald-600 border border-emerald-200/30';
    if (status === 'Atenção' || status === 'Parado') return 'bg-amber-100/20 text-amber-500 border border-amber-200/30';
    if (status === 'Crítico' || status === 'Atrasado') return 'bg-red-100/20 text-red-500 border border-red-200/30';
    return 'bg-slate-100/10 text-slate-400';
  };

  // --- COMPONENTE MODAL GLOBAL ---
  const Modal = ({ title, onClose, children }) => (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className={`${theme.modalBg} w-full max-w-3xl h-[85vh] md:h-auto md:max-h-[85vh] rounded-t-[2.5rem] md:rounded-[2.5rem] flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 overflow-hidden relative border ${theme.border}`}>
        <div className={`flex justify-between items-center p-5 md:p-6 ${theme.modalHeader} z-10 shadow-sm sticky top-0`}>
          <h3 className={`font-black text-xl md:text-2xl ${theme.textMain} tracking-tight`}>{title}</h3>
          <button onClick={onClose} className={`p-2 rounded-full transition-all ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 md:p-6 overflow-y-auto flex-1 pb-10 no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );

  const renderNav = () => (
    <>
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 ${theme.navBottom} backdrop-blur-md border-t pb-safe pt-2 px-4 flex justify-around z-50 transition-colors duration-300`}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button key={item.id} onClick={() => {setActiveTab(item.id); window.scrollTo(0,0);}} className="relative flex flex-col items-center p-2 w-full transition-all duration-300">
              <div className={`relative p-2.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-indigo-600 text-white scale-110 shadow-[0_5px_15px_rgba(79,70,229,0.3)]' : 'text-slate-400 hover:text-indigo-500'}`}>
                <item.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] mt-1.5 font-bold transition-all ${isActive ? 'text-indigo-600 uppercase tracking-widest' : 'text-slate-400'}`}>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <aside className={`hidden md:flex flex-col w-[260px] h-screen bg-slate-950 text-white p-6 sticky top-0 shadow-2xl z-40 border-r border-slate-900`}>
        <div onClick={toggleTheme} className="flex items-center gap-3 mb-10 cursor-pointer group hover:bg-white/5 p-2 rounded-xl transition-all" title="Mudar Tema">
          <div className="bg-gradient-to-tr from-indigo-600 to-cyan-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform shrink-0">
            <Hexagon className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-black tracking-tight text-white leading-none">LOGISYNC</span>
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mt-0.5">Inteligência Logística</span>
          </div>
        </div>

        <div className="space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => {setActiveTab(item.id); window.scrollTo(0,0);}} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 group ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>
                <item.icon className="w-5 h-5" /> 
                <span className="text-sm tracking-wide">{item.label}</span>
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-3 pt-6 border-t border-slate-800 mt-auto">
          <Avatar name="José Bernardo" className="w-10 h-10" />
          <div className="text-left">
            <p className="text-sm font-black text-white leading-tight">José Bernardo</p>
            <p className="text-xs font-bold text-indigo-400">Gerente Geral</p>
          </div>
        </div>
      </aside>
    </>
  );

  return (
    <div className={`min-h-screen ${theme.bg} flex font-sans selection:bg-indigo-500/30 selection:text-indigo-200 pb-20 md:pb-0 transition-colors duration-500`}>
      <CustomStyles />
      {renderNav()}

      <main className="flex-1 w-full max-w-[1200px] mx-auto md:p-6 animate-in fade-in duration-300">
        
        {/* HEADER MOBILE COM NOVO NOME E SLOGAN */}
        <header className={`md:hidden flex items-center justify-between p-4 ${theme.header} sticky top-0 z-30 backdrop-blur-md border-b transition-colors duration-500`}>
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={toggleTheme} title="Mudar Tema">
            <div className="bg-gradient-to-tr from-indigo-600 to-cyan-500 p-2 rounded-lg shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Hexagon className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col justify-center">
              <span className={`text-xl font-black ${theme.textMain} tracking-tight leading-none`}>LOGISYNC</span>
              <span className={`text-[8px] sm:text-[9px] font-black ${theme.textSec} uppercase tracking-widest mt-0.5 hidden min-[320px]:block`}>Inteligência Logística</span>
            </div>
          </div>
          <Avatar name="José Bernardo" className="w-10 h-10 shrink-0" />
        </header>

        <div className="px-5 md:px-0 mt-5 md:mt-0">

          {/* =========================================
              ABA 1: DASHBOARD
          ============================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div>
                <h1 className={`text-2xl md:text-3xl font-black ${theme.textMain} tracking-tight`}>
                  Olá, <span className="animate-gradient-text">José Bernardo</span>.
                </h1>
                <p className={`${theme.textSec} mt-1 font-medium text-sm`}>Visão executiva da sua operação hoje.</p>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { id: 'entregas', label: 'Entregas Hoje', value: '1.432', trend: '+12%', icon: Truck, color: 'from-blue-600 to-cyan-500' },
                  { id: 'transito', label: 'Em Trânsito', value: '385', trend: 'Estável', icon: Navigation, color: 'from-orange-500 to-amber-400' },
                  { id: 'problemas', label: 'Problemas', value: '12', trend: '-2%', icon: AlertTriangle, color: 'from-rose-600 to-red-500' },
                  { id: 'sla', label: 'Meta de SLA', value: '98.5%', trend: '+0.5%', icon: CheckCircle2, color: 'from-emerald-600 to-emerald-400' },
                ].map((kpi, idx) => (
                  <button key={idx} onClick={() => setActiveModal(kpi.id)} className={`text-left ${theme.card} p-5 rounded-2xl border ${theme.border} ${theme.cardHover} transition-all duration-200 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-indigo-500/30`}>
                    <div className={`absolute -top-4 -right-4 p-2 opacity-5 group-hover:opacity-10 transition-all transform group-hover:scale-110 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <kpi.icon className="w-24 h-24" />
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-tr ${kpi.color} shadow-md text-white`}>
                        <kpi.icon className="w-6 h-6" />
                      </div>
                      <ChevronRight className={`w-5 h-5 ${theme.textSec} group-hover:text-indigo-500`} />
                    </div>
                    <p className={`text-xs ${theme.textSec} font-bold uppercase tracking-wider mb-1`}>{kpi.label}</p>
                    <p className={`text-3xl md:text-4xl font-black ${theme.textMain} tracking-tight`}>{kpi.value}</p>
                    <div className="mt-4">
                       <span className={`text-[10px] md:text-xs font-bold px-2 py-1 rounded-md ${kpi.trend.includes('+') ? 'text-emerald-600 bg-emerald-100/20 border border-emerald-200/30' : kpi.trend.includes('-') ? 'text-red-500 bg-red-100/20 border border-red-200/30' : 'text-slate-400 bg-slate-100/10 border border-slate-200/20'}`}>{kpi.trend} em 24h</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Gráfico */}
              <div className={`${theme.card} p-5 md:p-6 rounded-2xl border ${theme.border}`}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-3">
                  <div>
                    <h3 className={`font-black text-lg ${theme.textMain} flex items-center gap-2`}><TrendingUp className="w-5 h-5 text-indigo-500"/> Volume de Expedição</h3>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Normal</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Atenção</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-500"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Crítico</span>
                  </div>
                </div>
                
                <div className="h-40 md:h-48 flex items-end justify-between gap-1 md:gap-3 px-1 relative">
                  {CHART_DATA.map((data, i) => {
                    const heightPercent = (data.volume / 1450) * 100;
                    const isActive = activeBar === i;
                    let barColor = data.status === 'critical' ? 'bg-red-500' : data.status === 'attention' ? 'bg-amber-400' : 'bg-emerald-500';
                    if (isActive) {
                      barColor = data.status === 'critical' ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.6)]' : data.status === 'attention' ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]' : 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]';
                    }

                    return (
                      <div key={i} onClick={() => setActiveBar(isActive ? null : i)} className="w-full h-full flex items-end justify-center relative cursor-pointer group">
                        {isActive && (
                          <div className={`absolute -top-16 left-1/2 -translate-x-1/2 ${isDark ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'} px-3 py-2 rounded-xl text-xs font-black shadow-xl whitespace-nowrap z-20 animate-in zoom-in-95`}>
                            <span className="text-indigo-500 text-[10px] uppercase block leading-none mb-1">{data.time}</span>
                            {data.volume} Caixas
                            <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 ${isDark ? 'bg-white' : 'bg-slate-900'} rotate-45`}></div>
                          </div>
                        )}
                        <div className={`w-full ${isDark ? 'bg-slate-800' : 'bg-slate-50'} rounded-t-lg relative h-full flex items-end overflow-hidden`}>
                          <div className={`w-full rounded-t-lg transition-all duration-300 ${barColor} ${isActive ? 'scale-y-[1.02]' : 'opacity-80 group-hover:opacity-100'}`} style={{ height: `${heightPercent}%` }}></div>
                        </div>
                        <span className={`absolute -bottom-6 text-[9px] md:text-[10px] font-bold uppercase ${isActive ? 'text-indigo-500 scale-110' : theme.textSec} ${i % 2 !== 0 && 'hidden sm:block'} transition-transform`}>{data.time}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-8"></div>
              </div>
            </div>
          )}

          {/* =========================================
              ABA 2: ESTOQUE WMS 
          ============================================= */}
          {activeTab === 'estoque' && (
            <div className="space-y-6 animate-in fade-in duration-500">
               <div>
                  <h2 className={`text-2xl md:text-3xl font-black ${theme.textMain} tracking-tight`}>Estoque WMS</h2>
                  <p className={`${theme.textSec} font-medium text-sm mt-1`}>Inventário agrupado por cliente B2B.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {MOCK_INVENTORY.map((item) => (
                  <button key={item.id} onClick={() => setSelectedProduct(item)} className={`text-left ${theme.card} p-5 rounded-2xl border ${theme.border} ${theme.cardHover} transition-all duration-200 flex flex-col group w-full focus:outline-none`}>
                    <div className="flex justify-between items-center mb-4 w-full">
                      <CompanyLogo name={item.client} className="w-10 h-10" />
                      <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg ${getStatusColor(item.status)}`}>{item.status}</span>
                    </div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${theme.textSec} mb-1`}>{item.sku}</p>
                    <h3 className={`font-black text-base ${theme.textMain} mb-5 leading-tight flex-1 group-hover:text-indigo-500 transition-colors line-clamp-2`}>{item.name}</h3>
                    <div className={`pt-4 border-t ${theme.border} flex items-end justify-between w-full`}>
                      <div>
                        <p className={`text-[9px] font-bold uppercase ${theme.textSec} mb-0.5`}>Qtd Estoque</p>
                        <p className={`text-2xl font-black ${theme.textMain}`}>{item.qty}</p>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${theme.textSec} group-hover:text-indigo-500`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* =========================================
              ABA 3: RASTREAMENTO COM A IMAGEM DE CAPA
          ============================================= */}
          {activeTab === 'rastreamento' && (
             <div className="w-full space-y-6 animate-in fade-in duration-500">
                              
              <div 
                className="relative w-full rounded-3xl overflow-hidden shadow-lg flex flex-col items-center justify-center p-8 md:p-14 mb-8"
                style={{
                  backgroundImage: `url(${TRACKING_BG_URL})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl">
                  <div className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20 shadow-xl">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">Buscar Encomenda</h2>
                  <p className="text-indigo-200 font-bold text-sm md:text-base mb-8">Acompanhe pacotes e veículos em tempo real.</p>
                  
                  <form onSubmit={handleTrackingSearch} className="relative w-full">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                      <Package className="w-5 h-5 text-indigo-500" />
                    </div>
                    <input 
                      type="text" placeholder="Ex: SYNC-84920" value={trackingId} onChange={(e) => setTrackingId(e.target.value)}
                      className="w-full pl-12 pr-32 py-4 md:py-5 rounded-2xl border-0 bg-white/95 backdrop-blur-md text-lg font-black uppercase placeholder:normal-case placeholder:font-bold placeholder:text-slate-400 text-slate-900 transition-all shadow-2xl focus:ring-4 focus:ring-indigo-500/50"
                    />
                    <button type="submit" disabled={isSearching} className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 rounded-xl font-bold text-sm transition-all flex justify-center items-center disabled:opacity-70 shadow-md">
                      {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Buscar'}
                    </button>
                  </form>
                </div>
              </div>

              {searchError && (
                <div className="p-4 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20 flex items-center justify-center gap-3 font-bold text-sm animate-in zoom-in-95 shadow-sm max-w-4xl mx-auto">
                  <AlertTriangle className="w-5 h-5" /> {searchError}
                </div>
              )}

              {searchedShipment && (
                <div className={`${theme.card} rounded-3xl border ${theme.border} overflow-hidden animate-in slide-in-from-bottom-4 shadow-lg max-w-3xl mx-auto`}>
                  <div className="bg-slate-900 text-white p-6 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500 rounded-full blur-[60px] opacity-30"></div>
                    <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-indigo-200 backdrop-blur-md mb-4 border border-white/10">
                          <Truck className="w-3.5 h-3.5" /> Em Transporte
                        </span>
                        <h3 className="text-3xl font-black tracking-tight">{searchedShipment.id}</h3>
                        <div className="mt-3 flex items-center gap-3">
                           <CompanyLogo name={searchedShipment.client} className="w-8 h-8 border-none" />
                           <span className="text-sm font-bold text-white">{searchedShipment.client}</span>
                        </div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mb-1">Previsão (ETA)</p>
                        <p className="text-xl font-black text-emerald-400 flex items-center gap-2"><Clock className="w-5 h-5" /> {searchedShipment.eta}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <div className="flex justify-between text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
                        <span>Origem</span><span className="text-indigo-500">{searchedShipment.progress}%</span><span>Destino</span>
                      </div>
                      <div className={`h-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'} rounded-full overflow-hidden relative shadow-inner`}>
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-1000" style={{ width: `${searchedShipment.progress}%` }}></div>
                      </div>
                    </div>
                    
                    <div className={`flex flex-col sm:flex-row gap-6 pt-6 border-t ${theme.border}`}>
                      <div className={`flex-1 flex items-center gap-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'} p-4 rounded-2xl border ${theme.border}`}>
                        <Avatar name={searchedShipment.driver} className="w-12 h-12" />
                        <div>
                           <p className="font-black text-base text-slate-800 dark:text-white">{searchedShipment.driver}</p>
                           <p className="text-[10px] font-black text-slate-500 bg-slate-200 dark:bg-slate-700 inline-block px-2 py-1 rounded-md uppercase mt-1">{searchedShipment.plate}</p>
                        </div>
                      </div>
                      <div className="flex-1 space-y-4 sm:pl-4 sm:border-l-2 border-indigo-500/20">
                         {searchedShipment.events.map((evt, i) => (
                           <div key={i}>
                             <p className={`font-black text-sm ${i === 0 ? 'text-indigo-500' : theme.textSec}`}>{evt.desc}</p>
                             <p className={`text-xs font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{evt.time}</p>
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!searchedShipment && !isSearching && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in max-w-4xl mx-auto">
                   <div className={`${theme.card} p-5 rounded-2xl border ${theme.border}`}>
                      <h4 className={`text-xs font-black ${theme.textSec} uppercase tracking-widest mb-4 flex items-center gap-2`}><History className="w-4 h-4"/> Histórico Recente</h4>
                      <div className="space-y-3">
                        <div className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                           <div className="flex items-center gap-3">
                             <div className="bg-emerald-500/10 p-2 rounded-lg"><CheckCircle2 className="w-4 h-4 text-emerald-500" /></div>
                             <div><p className={`font-bold text-sm ${theme.textMain}`}>SYNC-11203</p><p className="text-[10px] font-bold text-slate-400">Há 2 horas</p></div>
                           </div>
                           <span className="text-[9px] font-black text-emerald-500 uppercase">Entregue</span>
                        </div>
                        <div className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                           <div className="flex items-center gap-3">
                             <div className="bg-amber-500/10 p-2 rounded-lg"><Truck className="w-4 h-4 text-amber-500" /></div>
                             <div><p className={`font-bold text-sm ${theme.textMain}`}>SYNC-90881</p><p className="text-[10px] font-bold text-slate-400">Há 5 horas</p></div>
                           </div>
                           <span className="text-[9px] font-black text-amber-500 uppercase">Em Rota</span>
                        </div>
                      </div>
                   </div>
                   
                   <div className={`${theme.card} p-5 rounded-2xl border ${theme.border}`}>
                      <h4 className={`text-xs font-black ${theme.textSec} uppercase tracking-widest mb-4 flex items-center gap-2`}><Satellite className="w-4 h-4"/> Sistemas de Rastreio</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1"><span className={`text-[10px] font-bold ${theme.textMain}`}>API Correios</span><span className="text-[10px] font-bold text-emerald-500">Online</span></div>
                          <div className={`w-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'} rounded-full h-1.5`}><div className="bg-emerald-500 h-1.5 rounded-full w-full"></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1"><span className={`text-[10px] font-bold ${theme.textMain}`}>Satelite Frota Própria</span><span className="text-[10px] font-bold text-emerald-500">Online</span></div>
                          <div className={`w-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'} rounded-full h-1.5`}><div className="bg-emerald-500 h-1.5 rounded-full w-full"></div></div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1"><span className={`text-[10px] font-bold ${theme.textMain}`}>Integração Transportadoras</span><span className="text-[10px] font-bold text-amber-500">Instável</span></div>
                          <div className={`w-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'} rounded-full h-1.5`}><div className="bg-amber-500 h-1.5 rounded-full w-[80%] animate-pulse"></div></div>
                        </div>
                      </div>
                   </div>
                </div>
              )}
             </div>
          )}

          {/* =========================================
              ABA 4: ROTAS E MAPA 
          ============================================= */}
          {activeTab === 'rotas' && (
            <div className="space-y-6 animate-in fade-in duration-500">
               <div>
                  <h2 className={`text-2xl md:text-3xl font-black ${theme.textMain} tracking-tight`}>Monitoramento</h2>
                  <p className={`${theme.textSec} font-bold text-sm mt-1`}>Telemetria em tempo real de frota.</p>
              </div>

              <div className={`relative w-full h-[250px] md:h-[350px] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-300 border-white'} rounded-3xl overflow-hidden border-[6px] shadow-lg mb-6`}>
                <iframe 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-46.8,-23.7,-46.4,-23.4&layer=mapnik" 
                  className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 ${isDark ? 'grayscale contrast-125 brightness-50 hue-rotate-180 invert opacity-60' : 'grayscale sepia-[0.1] contrast-125 opacity-80'}`}
                  style={{ border: 0 }}
                  title="Mapa Real"
                />
                                
                {MOCK_ROUTES.map((route, idx) => {
                   const positions = [ { top: '40%', left: '30%' }, { top: '65%', right: '25%' }, { bottom: '20%', left: '50%' }, { top: '20%', right: '40%' } ];
                   const pos = positions[idx % positions.length];
                   const isAlert = route.status === 'Atrasado';

                   return (
                     <div key={route.id} onClick={() => setSelectedRoute(route)} className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer" style={pos}>
                        <div className={`absolute inset-0 ${isAlert ? 'bg-red-500' : 'bg-indigo-500'} rounded-full animate-ping opacity-50 scale-150`}></div>
                        <Avatar name={route.driver} className={`relative w-10 h-10 md:w-12 md:h-12 border-2 ${isAlert ? 'border-red-500' : 'border-indigo-500'} shadow-lg group-hover:scale-110 transition-transform z-10`} />
                     </div>
                   );
                })}
                
                <div className={`absolute bottom-3 left-3 ${isDark ? 'bg-slate-900/90 text-white border-slate-700' : 'bg-white/90 text-slate-800 border-slate-200'} backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-md border flex items-center gap-2`}>
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Satélite Sincronizado
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOCK_ROUTES.map((route) => (
                  <button key={route.id} onClick={() => setSelectedRoute(route)} className={`text-left ${theme.card} p-5 rounded-2xl border ${theme.border} ${theme.cardHover} transition-all duration-200 group w-full`}>
                    <div className="flex justify-between items-start mb-5 w-full">
                      <div className="flex items-center gap-3">
                         <Avatar name={route.driver} className="w-10 h-10" />
                         <div>
                            <p className={`font-black text-sm ${theme.textMain} leading-tight`}>{route.driver}</p>
                            <p className={`text-[9px] font-black ${theme.textSec} ${isDark ? 'bg-slate-800' : 'bg-slate-100'} inline-block px-1.5 py-0.5 rounded uppercase mt-1`}>{route.plate}</p>
                         </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className={`text-[9px] ${theme.textSec} font-black uppercase tracking-widest mb-0.5`}>Local</p>
                      <p className={`text-xs font-bold ${theme.textMain} truncate`}>{route.location}</p>
                    </div>
                    <div className={`pt-3 border-t ${theme.border} flex justify-between items-center w-full`}>
                       <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg ${getStatusColor(route.status)}`}>{route.status}</span>
                       <ChevronRight className={`w-4 h-4 ${theme.textSec} group-hover:text-indigo-500`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =====================================================================
          MODAIS E POPUPS (TODOS FUNCIONAIS)
      ===================================================================== */}
      
      {/* 1. Modal Estoque (Produto) */}
      {selectedProduct && (
        <Modal title="Info do WMS" onClose={() => setSelectedProduct(null)}>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1 bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden flex flex-col">
              <CompanyLogo name={selectedProduct.client} className="w-14 h-14 mb-4 border-none shadow-none" />
              <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Dono B2B</p>
              <h4 className="text-2xl font-black mb-6">{selectedProduct.client}</h4>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl mt-auto">
                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-1">SKU</p>
                <p className="text-base font-mono">{selectedProduct.sku}</p>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className={`text-lg font-black ${theme.textMain} leading-tight mb-2`}>{selectedProduct.name}</h2>
                <span className={`inline-block px-2.5 py-1 text-[9px] font-black uppercase rounded-md ${getStatusColor(selectedProduct.status)}`}>Estoque: {selectedProduct.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className={`${theme.modalContentBg} p-4 rounded-xl text-center border ${theme.border}`}>
                  <MapPinned className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                  <p className={`text-[9px] font-bold uppercase ${theme.textSec} mb-0.5`}>Corredor</p>
                  <p className={`text-xl font-black ${theme.textMain}`}>{selectedProduct.corredor}</p>
                </div>
                <div className={`${theme.modalContentBg} p-4 rounded-xl text-center border ${theme.border}`}>
                  <Box className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                  <p className={`text-[9px] font-bold uppercase ${theme.textSec} mb-0.5`}>Prateleira</p>
                  <p className={`text-xl font-black ${theme.textMain}`}>{selectedProduct.prateleira}</p>
                </div>
              </div>
              <div className={`${isDark ? 'bg-indigo-900/20 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'} p-5 rounded-xl border flex items-center justify-between`}>
                <div>
                  <p className="text-[10px] font-bold uppercase text-indigo-400 mb-0.5">Volume Total</p>
                  <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{selectedProduct.qty}</p>
                </div>
                <QrCode className="w-10 h-10 text-indigo-300" />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* 2. Modal Entregas KPI */}
      {activeModal === 'entregas' && (
        <Modal title="Últimas Entregas" onClose={() => setActiveModal(null)}>
          <div className="space-y-3">
            {DETAILS_MOCK.entregas.map((item, i) => (
              <button key={i} onClick={() => { setActiveModal(null); setSelectedDelivery(item); }} className={`w-full text-left ${theme.modalContentBg} p-4 rounded-2xl border ${theme.border} flex items-center justify-between hover:shadow-md transition-all`}>
                <div className="flex items-center gap-4">
                  <CompanyLogo name={item.client} className="w-10 h-10" />
                  <div>
                    <p className={`font-black text-base ${theme.textMain}`}>{item.id}</p>
                    <p className={`text-xs font-bold ${theme.textSec}`}>{item.dest}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-black ${theme.textMain}`}>{item.time}</p>
                  <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded mt-1 inline-block border border-emerald-500/20">Concluída</span>
                </div>
              </button>
            ))}
          </div>
        </Modal>
      )}

      {/* 3. Modal Comprovante */}
      {selectedDelivery && (
        <Modal title="Comprovante" onClose={() => setSelectedDelivery(null)}>
          <div className={`max-w-sm mx-auto ${theme.modalContentBg} border ${theme.border} rounded-3xl p-6 shadow-xl relative`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white p-3 rounded-full border-4 border-white dark:border-slate-800">
              <Check className="w-6 h-6" strokeWidth={4} />
            </div>
            <div className={`text-center mt-6 mb-6 border-b-2 border-dashed ${isDark ? 'border-slate-700' : 'border-slate-200'} pb-6`}>
              <p className={`text-[10px] font-black ${theme.textSec} uppercase mb-1`}>ID do Pedido</p>
              <p className={`text-2xl font-black ${theme.textMain}`}>{selectedDelivery.id}</p>
              <p className="text-emerald-500 font-bold text-xs mt-2 flex items-center justify-center gap-1"><Clock className="w-3 h-3"/> Entregue às {selectedDelivery.time}</p>
            </div>
            <div className="space-y-5">
              <div>
                <p className={`text-[10px] font-black ${theme.textSec} uppercase mb-1`}>Destino</p>
                <p className={`text-sm font-bold ${theme.textMain}`}>{selectedDelivery.dest}</p>
              </div>
              <div className={`flex items-center gap-4 ${isDark ? 'bg-slate-800' : 'bg-slate-50'} p-3 rounded-xl`}>
                <Avatar name={selectedDelivery.driver} className="w-10 h-10" />
                <div>
                  <p className={`text-[10px] font-black ${theme.textSec} uppercase mb-0.5`}>Motorista</p>
                  <p className={`text-sm font-black ${theme.textMain}`}>{selectedDelivery.driver}</p>
                </div>
              </div>
              <div className={`${isDark ? 'bg-indigo-900/20 border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'} p-4 rounded-xl border`}>
                <p className={`text-[10px] font-black text-indigo-400 uppercase mb-2`}>Assinatura</p>
                <p className={`text-lg font-serif italic ${isDark ? 'text-slate-300' : 'text-slate-700'} border-b ${isDark ? 'border-slate-600' : 'border-indigo-200'} inline-block pb-1`}>{selectedDelivery.sign}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* 4. Modal Controle de VTR */}
      {selectedRoute && (
        <Modal title="Controle de Frota" onClose={() => setSelectedRoute(null)}>
          <div className="flex flex-col gap-4">
             <div className={`flex items-center gap-4 ${theme.modalContentBg} border ${theme.border} p-4 rounded-2xl`}>
                <Avatar name={selectedRoute.driver} className="w-16 h-16" />
                <div>
                  <p className={`text-xl font-black ${theme.textMain} mb-1`}>{selectedRoute.driver}</p>
                  <div className="flex gap-2">
                     <span className={`bg-slate-500/10 px-2 py-1 rounded text-xs font-black uppercase ${theme.textSec}`}>{selectedRoute.plate}</span>
                     <span className={`bg-slate-500/10 px-2 py-1 rounded text-xs font-black ${theme.textSec} flex items-center gap-1`}><Phone className="w-3 h-3"/> {selectedRoute.phone}</span>
                  </div>
                </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className={`${theme.modalContentBg} border ${theme.border} p-3 rounded-xl text-center`}>
                  <Activity className="w-5 h-5 text-indigo-500 mx-auto mb-1"/>
                  <p className={`text-[10px] uppercase font-bold ${theme.textSec}`}>Velocidade</p>
                  <p className={`text-lg font-black ${theme.textMain}`}>{selectedRoute.speed}</p>
                </div>
                <div className={`${theme.modalContentBg} border ${theme.border} p-3 rounded-xl text-center`}>
                  <Thermometer className="w-5 h-5 text-amber-500 mx-auto mb-1"/>
                  <p className={`text-[10px] uppercase font-bold ${theme.textSec}`}>Temp</p>
                  <p className={`text-lg font-black ${theme.textMain}`}>{selectedRoute.temp}</p>
                </div>
                <div className={`${theme.modalContentBg} border ${theme.border} p-3 rounded-xl text-center`}>
                  <Clock className="w-5 h-5 text-emerald-500 mx-auto mb-1"/>
                  <p className={`text-[10px] uppercase font-bold ${theme.textSec}`}>ETA</p>
                  <p className={`text-lg font-black ${theme.textMain}`}>{selectedRoute.eta}</p>
                </div>
                <div className={`${theme.modalContentBg} border ${theme.border} p-3 rounded-xl text-center`}>
                  <BatteryCharging className="w-5 h-5 text-emerald-500 mx-auto mb-1"/>
                  <p className={`text-[10px] uppercase font-bold ${theme.textSec}`}>Bateria</p>
                  <p className={`text-lg font-black ${theme.textMain}`}>98%</p>
                </div>
             </div>

             <h4 className={`font-black text-sm ${theme.textMain} mt-4 mb-2`}>Carga Atual</h4>
             {selectedRoute.cargo.length > 0 ? (
               <div className="space-y-3">
                 {selectedRoute.cargo.map((item, idx) => (
                   <div key={idx} className={`${theme.modalContentBg} border ${theme.border} p-4 rounded-xl flex items-center justify-between`}>
                      <div className="flex items-center gap-3">
                        <CompanyLogo name={item.client} className="w-8 h-8" />
                        <div>
                          <p className={`font-bold text-sm ${theme.textMain}`}>{item.item}</p>
                          <p className={`text-[10px] font-bold ${theme.textSec}`}>{item.client}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-black text-indigo-500`}>{item.qty} un</p>
                      </div>
                   </div>
                 ))}
               </div>
             ) : (
                <div className={`${theme.modalContentBg} border ${theme.border} p-6 rounded-xl text-center flex flex-col items-center`}>
                  <Box className={`w-8 h-8 ${theme.textSec} mb-2 opacity-50`} />
                  <p className={`font-bold text-sm ${theme.textMain}`}>Veículo Vazio</p>
                  <p className={`text-[10px] ${theme.textSec}`}>Retornando ao CD.</p>
                </div>
             )}
          </div>
        </Modal>
      )}
            
      {/* 5. Modal Trânsito KPI */}
      {activeModal === 'transito' && (
        <Modal title="Frota em Rota" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            {DETAILS_MOCK.transito.map((item, i) => (
              <button key={i} onClick={() => { setActiveModal(null); setSelectedRoute(item); }} className={`w-full text-left ${theme.modalContentBg} p-4 rounded-xl border ${theme.border} hover:shadow-md transition-all`}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={item.driver} className="w-10 h-10" />
                    <div>
                      <p className={`font-black text-sm ${theme.textMain}`}>{item.driver}</p>
                      <p className={`text-[10px] font-bold ${theme.textSec}`}>{item.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-[9px] font-black uppercase rounded ${getStatusColor(item.status)}`}>{item.status}</span>
                </div>
                <p className={`text-xs font-bold ${theme.textSec} truncate mb-1`}><MapPin className="w-3 h-3 inline mr-1"/> {item.location}</p>
              </button>
            ))}
          </div>
        </Modal>
      )}

      {/* 6. Modal Problemas (Abre a Lista) */}
      {activeModal === 'problemas' && (
        <Modal title="Ocorrências em Campo" onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            {DETAILS_MOCK.problemas.map((item, i) => (
              <button 
                key={i} 
                onClick={() => { setActiveModal(null); setSelectedProblem(item); }} 
                className={`w-full text-left ${theme.modalContentBg} p-5 rounded-2xl border-2 ${item.severity === 'Crítico' ? 'border-red-500/30 hover:border-red-500/60' : 'border-amber-500/30 hover:border-amber-500/60'} flex flex-col sm:flex-row justify-between gap-4 transition-colors group`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${item.severity === 'Crítico' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'} group-hover:scale-110 transition-transform`}>
                    <AlertTriangle className="w-6 h-6"/>
                  </div>
                  <div>
                    <p className={`font-black text-lg ${theme.textMain} leading-tight`}>{item.type}</p>
                    <p className={`text-[10px] font-bold ${theme.textSec} mt-1`}><Clock className="w-3 h-3 inline mr-1" />Reportado às {item.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-indigo-600 text-white text-xs font-black px-4 py-2 rounded-xl group-hover:bg-indigo-500 transition-colors self-start sm:self-center">
                  Tratar <ChevronRight className="w-4 h-4"/>
                </div>
              </button>
            ))}
          </div>
        </Modal>
      )}

      {/* 7. Modal Tratativa de Ocorrência */}
      {selectedProblem && (
        <Modal title="Resolução de Ocorrência" onClose={() => setSelectedProblem(null)}>
          <div className="flex flex-col gap-6">
            <div className={`${selectedProblem.severity === 'Crítico' ? 'bg-red-500' : 'bg-amber-500'} p-6 rounded-3xl text-white shadow-lg relative overflow-hidden`}>
              <AlertTriangle className="absolute -right-4 -top-4 w-32 h-32 opacity-20" />
              <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Natureza do Problema</p>
              <h2 className="text-3xl font-black mb-2">{selectedProblem.type}</h2>
              <div className="flex items-center gap-3">
                <span className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{selectedProblem.severity}</span>
                <span className="text-sm font-bold flex items-center gap-1"><Clock className="w-4 h-4"/> {selectedProblem.time}</span>
              </div>
            </div>

            <div className={`${theme.modalContentBg} border ${theme.border} p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4`}>
               <div className="flex items-center gap-4">
                  <Avatar name={selectedProblem.driver} className="w-14 h-14" />
                  <div>
                    <p className={`text-[10px] font-black ${theme.textSec} uppercase tracking-widest`}>Motorista no Local</p>
                    <p className={`text-xl font-black ${theme.textMain} mb-0.5`}>{selectedProblem.driver}</p>
                    <p className={`text-xs font-bold ${theme.textSec} flex items-center gap-1`}><Truck className="w-3 h-3"/> VTR: {selectedProblem.route} ({selectedProblem.plate})</p>
                  </div>
               </div>
               <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-colors shadow-md">
                 <Phone className="w-4 h-4"/> Ligar: {selectedProblem.phone}
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className={`${theme.modalContentBg} border ${theme.border} p-5 rounded-2xl`}>
                 <h4 className={`text-[10px] font-black ${theme.textSec} uppercase tracking-widest mb-2 flex items-center gap-1.5`}><MapPin className="w-4 h-4 text-indigo-500"/> Local do Fato</h4>
                 <p className={`text-sm font-bold ${theme.textMain}`}>{selectedProblem.location}</p>
               </div>
               <div className={`${theme.modalContentBg} border ${theme.border} p-5 rounded-2xl`}>
                 <h4 className={`text-[10px] font-black ${theme.textSec} uppercase tracking-widest mb-2 flex items-center gap-1.5`}><MessageSquareWarning className="w-4 h-4 text-amber-500"/> Relato do Motorista</h4>
                 <p className={`text-sm font-medium ${theme.textSec}`}>{selectedProblem.desc}</p>
               </div>
            </div>

            <div>
               <h4 className={`text-xs font-black ${theme.textMain} mb-3`}>Ações de Resolução</h4>
               <div className="flex flex-wrap gap-3">
                  {selectedProblem.severity === 'Crítico' ? (
                    <>
                      <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-indigo-500"><Wrench className="w-4 h-4"/> Acionar Guincho/Seguro</button>
                      <button className={`${isDark ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-800'} px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 hover:opacity-80`}><Truck className="w-4 h-4"/> Enviar Veículo de Apoio</button>
                    </>
                  ) : (
                    <>
                      <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-indigo-500"><CalendarClock className="w-4 h-4"/> Reagendar Entrega</button>
                      <button className={`${isDark ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-800'} px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 hover:opacity-80`}><Phone className="w-4 h-4"/> Contatar Cliente</button>
                    </>
                  )}
                  <button className="bg-emerald-100 text-emerald-700 px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-emerald-200 ml-auto border border-emerald-200"><CheckCircle2 className="w-4 h-4"/> Marcar como Resolvido</button>
               </div>
            </div>
          </div>
        </Modal>
      )}

      {/* 8. Modal SLA KPI */}
      {activeModal === 'sla' && (
        <Modal title="Desempenho SLA" onClose={() => setActiveModal(null)}>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-48 h-48 rounded-full border-[16px] border-emerald-500 flex items-center justify-center shadow-inner mb-6">
              <span className={`text-4xl font-black ${theme.textMain}`}>98.5%</span>
            </div>
            <h4 className={`text-xl font-black ${theme.textMain}`}>Padrão Ouro</h4>
            <p className={`text-xs ${theme.textSec} mt-2 text-center max-w-xs font-medium`}>Sua operação fluiu perfeitamente na última hora. Apenas 1.5% das rotas tiveram desvio de percurso.</p>
          </div>
        </Modal>
      )}

    </div>
  );
}