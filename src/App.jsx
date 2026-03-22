import React, { useState } from 'react';
import { 
  Hexagon, Package, Truck, MapPin, Search, 
  CheckCircle2, AlertTriangle, Box, Activity, 
  X, Map as MapIcon, Navigation, Phone, Clock, 
  ShieldAlert, Check, ChevronRight, TrendingUp, 
  Thermometer, BatteryCharging, QrCode, MapPinned,
  Satellite, Server, History, MessageSquareWarning,
  Wrench, CalendarClock, HardDrive, Wifi, BarChart3,
  Globe, Database, Cpu
} from 'lucide-react';

// =====================================================================
// 1. DADOS E CONFIGURAÇÕES DE BASE
// =====================================================================

const NAV_ITEMS = [
  { id: 'dashboard', icon: Activity, label: 'Painel' },
  { id: 'estoque', icon: Box, label: 'Estoque' },
  { id: 'rastreamento', icon: Search, label: 'Rastreio' },
  { id: 'rotas', icon: MapIcon, label: 'Rotas' },
];

const CHART_DATA = [
  { time: '06:00', volume: 480, status: 'Normal' },
  { time: '08:00', volume: 850, status: 'Atenção' },
  { time: '10:00', volume: 1450, status: 'Pico' },
  { time: '12:00', volume: 760, status: 'Normal' },
  { time: '14:00', volume: 1100, status: 'Alto' },
  { time: 'Agora', volume: 1320, status: 'Pico' }
];

const CLIENT_LOGOS = {
  'Apple': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774109722/747_hjikst.png',
  'Amazon': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774109743/images_1_abboq2.jpg',
  'LG': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774109524/1000316462_plxqcy.webp',
  'Mercado Livre': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774110431/mercado-livre-logo-png_seeklogo-264236_onqmjq.png',
  'PlayStation': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774111735/playstation_drdbmt.jpg',
  'Americanas': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774110431/images_wcoxnd.jpg',
  'Shopee': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774109781/images_lbk692.png',
  'Dafiti': 'https://res.cloudinary.com/dnymahpi7/image/upload/v1774109766/dafiti-logo-png_seeklogo-214989_poot5a.png',
};

const USER_PHOTOS = {
  'José Bernardo': 'https://iili.io/f4Ae6es.png', 
  'Carlos Silva': 'https://randomuser.me/api/portraits/men/55.jpg', 
  'João Pedro': 'https://randomuser.me/api/portraits/men/32.jpg',
  'Marcos Silva': 'https://randomuser.me/api/portraits/men/44.jpg',
  'Carla Dias': 'https://randomuser.me/api/portraits/women/68.jpg',
  'Ana Souza': 'https://randomuser.me/api/portraits/women/44.jpg',
  'Fernando Costa': 'https://randomuser.me/api/portraits/men/22.jpg',
  'Lucia Gomes': 'https://randomuser.me/api/portraits/women/63.jpg',
  'Pedro Alves': 'https://randomuser.me/api/portraits/men/67.jpg',
};

const MOCK_INVENTORY = [
  { id: 1, sku: 'SYNC-EL-001', name: 'iPhone 15 Pro Max', qty: 1250, client: 'Apple', status: 'Adequado' },
  { id: 2, sku: 'SYNC-MD-045', name: 'Cadeira Gamer DXR', qty: 15, client: 'Amazon', status: 'Crítico' },
  { id: 3, sku: 'SYNC-TV-099', name: 'Smart TV LG OLED', qty: 340, client: 'LG', status: 'Atenção' },
  { id: 4, sku: 'SYNC-AC-102', name: 'AirPods Pro 2', qty: 4500, client: 'Mercado Livre', status: 'Adequado' },
  { id: 5, sku: 'SYNC-CG-011', name: 'PlayStation 5 Slim', qty: 89, client: 'PlayStation', status: 'Crítico' },
  { id: 6, sku: 'SYNC-UD-301', name: 'Air Fryer Mondial', qty: 3200, client: 'Americanas', status: 'Adequado' },
  { id: 7, sku: 'SYNC-SP-887', name: 'Tênis Nike Rev', qty: 1100, client: 'Shopee', status: 'Adequado' },
  { id: 8, sku: 'SYNC-FW-991', name: 'Bolsa Couro Legít', qty: 25, client: 'Dafiti', status: 'Crítico' },
];

const MOCK_ROUTES = [
  { id: 'VTR-01', driver: 'João Pedro', plate: 'XYZ-9090', status: 'Em Rota', dest: 'CD Barueri, SP', pos: { t: '35%', l: '30%' } },
  { id: 'VTR-02', driver: 'Marcos Silva', plate: 'QWE-1234', status: 'Atrasado', dest: 'S. J. dos Campos', pos: { t: '60%', l: '45%' } },
  { id: 'VTR-03', driver: 'Carla Dias', plate: 'ABC-5678', status: 'Em Rota', dest: 'Sorocaba, SP', pos: { t: '25%', l: '75%' } },
  { id: 'VTR-04', driver: 'Carlos Silva', plate: 'BRA-3R56', status: 'Em Rota', dest: 'Centro de SP', pos: { t: '55%', l: '85%' } },
  { id: 'VTR-05', driver: 'Ana Souza', plate: 'MNO-5566', status: 'Em Rota', dest: 'Campinas, SP', pos: { t: '40%', l: '15%' } },
  { id: 'VTR-06', driver: 'Fernando Costa', plate: 'GHI-9876', status: 'Parado', dest: 'Ribeirão Preto', pos: { t: '80%', l: '25%' } },
  { id: 'VTR-07', driver: 'Lucia Gomes', plate: 'JKL-4321', status: 'Em Rota', dest: 'Congonhas', pos: { t: '15%', l: '45%' } },
  { id: 'VTR-08', driver: 'Pedro Alves', plate: 'DEF-6789', status: 'Atenção', dest: 'Santo André', pos: { t: '90%', l: '60%' } },
];

const MOCK_PROBLEMS = [
  { id: 'OC-991', type: 'Destinatário Ausente', severity: 'Atenção', driver: 'Marcos Silva', time: '10:20', loc: 'Av. Paulista, SP', desc: 'Tentativa de entrega sem sucesso por falta de recebedor no local.' },
  { id: 'OC-992', type: 'Pneu Furado', severity: 'Crítico', driver: 'Carlos Silva', time: '09:45', loc: 'Rod. Castelo Branco', desc: 'Veículo imobilizado no acostamento. Necessário envio de suporte técnico.' },
  { id: 'OC-993', type: 'Atraso em Rota', severity: 'Normal', driver: 'João Pedro', time: '11:30', loc: 'Marginal Tietê', desc: 'Fluxo intenso de veículos impactando o ETA em 20 minutos.' }
];

const TRACKING_DATA = {
  'SYNC-84920': {
    id: 'SYNC-84920', client: 'Mercado Livre', driver: 'Carlos Silva', status: 'Em Trânsito', progress: 65, eta: '14:30', 
    events: [{ t: '11:15', d: 'Em trânsito na Rodovia' }, { t: '09:30', d: 'Expedido do CD' }, { t: '07:00', d: 'Carga Bipada' }]
  }
};

// =====================================================================
// 2. COMPONENTES VISUAIS
// =====================================================================

const Avatar = ({ name, className = "w-10 h-10" }) => (
  <div className={`${className} rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-200 shrink-0 flex items-center justify-center`}>
    {USER_PHOTOS[name] ? <img src={USER_PHOTOS[name]} alt={name} className="w-full h-full object-cover" /> : <span className="text-[10px] font-bold">{name.substring(0, 2)}</span>}
  </div>
);

const CompanyLogo = ({ name, className = "w-10 h-10" }) => (
  <div className={`${className} bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200 overflow-hidden p-1 shrink-0`}>
    {CLIENT_LOGOS[name] ? <img src={CLIENT_LOGOS[name]} alt={name} className="w-full h-full object-contain rounded-lg" /> : <div className="text-[10px] font-bold">{name.substring(0, 2)}</div>}
  </div>
);

// =====================================================================
// 3. APLICAÇÃO PRINCIPAL (APP)
// =====================================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDark, setIsDark] = useState(false);
  const [selectedBar, setSelectedBar] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [trackingId, setTrackingId] = useState('');
  const [searchedShipment, setSearchedShipment] = useState(null);
  const [searchError, setSearchError] = useState(false);

  const theme = {
    bg: isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900',
    card: isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100',
    textSec: isDark ? 'text-slate-400' : 'text-slate-500',
    border: isDark ? 'border-slate-800' : 'border-slate-100',
    nav: isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-100',
  };

  const getStatusColor = (status) => {
    if (status === 'Adequado' || status === 'Em Rota' || status === 'Normal') return 'bg-emerald-500/10 text-emerald-600';
    if (status === 'Atenção' || status === 'Atrasado' || status === 'Alto') return 'bg-amber-500/10 text-amber-500';
    return 'bg-red-500/10 text-red-500';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const result = TRACKING_DATA[trackingId.toUpperCase()];
    if (result) {
      setSearchedShipment(result);
      setSearchError(false);
    } else {
      setSearchedShipment(null);
      setSearchError(true);
    }
  };

  const Modal = ({ title, onClose, children }) => (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
      <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'} w-full max-w-2xl rounded-[2rem] flex flex-col shadow-2xl overflow-hidden border animate-in slide-in-from-bottom-5 duration-300`}>
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-black text-xl tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:scale-110 transition-transform"><X className="w-5 h-5"/></button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[75vh] no-scrollbar">{children}</div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme.bg} flex font-sans transition-colors duration-500 pb-20 md:pb-0`}>
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

      {/* SIDEBAR PC */}
      <aside className="hidden md:flex flex-col w-[260px] h-screen bg-slate-950 text-white p-6 sticky top-0 shrink-0 border-r border-slate-900">
        <div className="flex items-center gap-4 mb-10 cursor-pointer group" onClick={() => setIsDark(!isDark)}>
          <div className="bg-gradient-to-tr from-indigo-600 to-cyan-500 p-2.5 rounded-xl shadow-lg group-hover:scale-105 transition-transform"><Hexagon className="w-6 h-6 text-white" /></div>
          <div><h2 className="text-xl font-black">LOGISYNC</h2><p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mt-0.5">SLA 98,05%</p></div>
        </div>
        <div className="space-y-2 flex-1">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
              <item.icon className="w-5 h-5" /> <span className="text-sm uppercase tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-6 border-t border-slate-800 mt-auto">
          <Avatar name="José Bernardo" className="w-10 h-10" />
          <div className="text-left">
            <p className="text-sm font-black leading-tight text-white">José Bernardo</p>
            <p className="text-[9px] font-black text-indigo-400 uppercase">Gestor Geral</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full max-w-[1500px] mx-auto md:px-10 md:py-8 animate-in fade-in duration-500 overflow-x-hidden">
        
        {/* HEADER MOBILE */}
        <header className={`md:hidden flex items-center justify-between p-4 ${theme.nav} sticky top-0 z-50 backdrop-blur-md border-b`}>
          <div className="flex items-center gap-2.5" onClick={() => setIsDark(!isDark)}>
            <div className="bg-gradient-to-tr from-indigo-600 to-cyan-500 p-2 rounded-lg shadow-md"><Hexagon className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-black tracking-tight">LOGISYNC</span>
          </div>
          <Avatar name="José Bernardo" className="w-9 h-9" />
        </header>

        <div className="p-4 md:p-0 space-y-6">
          
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight">Olá, <span className="animate-gradient-text">José Bernardo</span>.</h1>
                <p className={`${theme.textSec} text-xs font-bold mt-1 uppercase tracking-widest`}>SLA Operacional em 98,05%.</p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {[
                  { id: 'entregas', l: 'Entregas Hoje', v: '1.432', icon: Truck, c: 'from-blue-600 to-cyan-500' },
                  { id: 'transito', l: 'Em Trânsito', v: '385', icon: Navigation, c: 'from-orange-500 to-amber-400' },
                  { id: 'problemas', l: 'Ocorrências', v: '12', icon: AlertTriangle, c: 'from-rose-600 to-red-500' },
                  { id: 'sla', l: 'SLA Geral', v: '98,05%', icon: CheckCircle2, c: 'from-emerald-600 to-emerald-400' },
                ].map((kpi, idx) => (
                  <div key={idx} onClick={() => setActiveModal(kpi.id)} className={`${theme.card} p-4 md:p-6 rounded-[2rem] border shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-95`}>
                    <div className={`inline-flex p-2 rounded-xl bg-gradient-to-tr ${kpi.c} text-white mb-3 shadow-md`}><kpi.icon className="w-5 h-5" /></div>
                    <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${theme.textSec} mb-0.5`}>{kpi.l}</p>
                    <p className="text-xl md:text-3xl font-black">{kpi.v}</p>
                  </div>
                ))}
              </div>

              {/* GRÁFICO INTERATIVO NO PAINEL */}
              <div className={`${theme.card} p-5 md:p-8 rounded-[2.5rem] border shadow-sm overflow-hidden`}>
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-black text-sm md:text-lg flex items-center gap-2"><BarChart3 className="w-5 h-5 text-indigo-500" /> Fluxo de Expedição</h3>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Clique nas barras para dados</span>
                </div>
                
                <div className="h-48 md:h-80 flex items-end justify-between gap-1.5 md:gap-4 relative px-1 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="absolute left-0 right-0 border-t border-dashed border-slate-300 dark:border-slate-700 z-0" style={{ bottom: '60%' }}>
                    <span className="text-[7px] md:text-[9px] font-black text-slate-400 absolute -top-4 left-0 uppercase tracking-tighter">Meta (900)</span>
                  </div>

                  {CHART_DATA.map((data, i) => {
                    const h = (data.volume / 1600) * 100;
                    const isSelected = selectedBar === i;
                    return (
                      <div key={i} onClick={() => setSelectedBar(isSelected ? null : i)} className="w-full h-full flex flex-col items-center justify-end group cursor-pointer relative z-10">
                        {isSelected && (
                          <div className={`absolute -top-12 ${isDark ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'} px-2 py-1.5 rounded-xl text-[9px] font-black shadow-xl z-20 animate-bounce`}>
                            {data.volume} CXS • {data.status}
                          </div>
                        )}
                        <div className={`w-full max-w-[45px] rounded-t-lg transition-all duration-300 ${isSelected ? 'brightness-110 scale-x-110 shadow-lg' : 'opacity-90'} ${data.volume > 1200 ? 'bg-indigo-600' : data.volume > 800 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ height: `${h}%` }}>
                           <div className="w-full h-full bg-white/10 rounded-t-lg"></div>
                        </div>
                        <span className={`mt-3 text-[7px] md:text-[10px] font-black uppercase ${isSelected ? 'text-indigo-600' : theme.textSec}`}>{data.time}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ESTOQUE */}
          {activeTab === 'estoque' && (
            <div className="space-y-6">
              <h2 className="text-xl md:text-3xl font-black tracking-tight">Estoque WMS</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                {MOCK_INVENTORY.map(item => (
                  <div key={item.id} onClick={() => setSelectedProduct(item)} className={`${theme.card} p-5 rounded-[2rem] border shadow-sm cursor-pointer group active:scale-95 transition-all`}>
                    <div className="flex justify-between items-center mb-6"><CompanyLogo name={item.client} className="w-8 h-8 md:w-11 md:h-11"/><span className={`px-1.5 py-0.5 text-[7px] md:text-[8px] font-black uppercase rounded-lg ${getStatusColor(item.status)}`}>{item.status}</span></div>
                    <h4 className="font-black text-[11px] md:text-sm mb-6 group-hover:text-indigo-600 line-clamp-1">{item.name}</h4>
                    <div className="flex justify-between items-end border-t pt-4 border-slate-50 dark:border-slate-800">
                      <div><p className="text-[7px] md:text-[8px] font-black uppercase text-slate-400 mb-0.5">Em Stock</p><p className="text-lg md:text-2xl font-black">{item.qty}</p></div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RASTREIO (COM INFOS DE STATUS E INFRA) */}
          {activeTab === 'rastreamento' && (
            <div className="space-y-6">
               <div className="relative w-full rounded-[2.5rem] overflow-hidden p-8 md:p-16 text-center shadow-lg" style={{ backgroundImage: `url('https://res.cloudinary.com/dnymahpi7/image/upload/v1774112612/Picsart_26-03-21_14-01-59-284_2_pyqjog.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[1px]"></div>
                <div className="relative z-10 max-w-xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter uppercase">Localizador</h2>
                  <form onSubmit={handleSearch} className="relative">
                    <input 
                      type="text" placeholder="CÓDIGO (EX: SYNC-84920)" value={trackingId} onChange={(e) => setTrackingId(e.target.value)}
                      className="w-full pl-6 pr-32 py-4 rounded-2xl bg-white text-slate-900 font-black uppercase text-sm md:text-lg shadow-2xl outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all" 
                    />
                    <button type="submit" className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 rounded-xl font-black text-xs uppercase tracking-widest transition-all">Buscar</button>
                  </form>
                  {searchError && <p className="mt-4 text-red-400 font-bold text-xs uppercase animate-pulse">Código não encontrado.</p>}
                </div>
              </div>

              {searchedShipment ? (
                <div className={`${theme.card} p-6 md:p-10 rounded-[2.5rem] border shadow-2xl animate-in slide-in-from-bottom-5`}>
                   <div className="flex justify-between items-center mb-8">
                     <div className="flex items-center gap-4">
                       <CompanyLogo name={searchedShipment.client} className="w-14 h-14" />
                       <div><h3 className="text-2xl font-black tracking-tighter">{searchedShipment.id}</h3><p className={`${theme.textSec} text-xs font-bold uppercase`}>{searchedShipment.client}</p></div>
                     </div>
                     <div className="text-right"><p className="text-[10px] font-black text-indigo-500 uppercase mb-1">Previsão</p><p className="text-2xl font-black text-indigo-600">{searchedShipment.eta}</p></div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase"><span>CD Logisync</span><span>{searchedShipment.progress}% Concluído</span><span>Destino</span></div>
                      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full" style={{ width: `${searchedShipment.progress}%` }}></div></div>
                   </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className={`${theme.card} p-6 rounded-[2rem] border shadow-sm`}>
                      <h4 className="font-black text-sm md:text-lg mb-6 flex items-center gap-2"><Globe className="w-5 h-5 text-indigo-500" /> Status do Sistema</h4>
                      <div className="space-y-4">
                         <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                            <div className="flex items-center gap-3"><Database className="w-4 h-4 text-slate-400" /><div><p className="text-xs font-black">Banco de Dados</p><p className="text-[10px] text-emerald-500 font-bold uppercase">Sincronizado</p></div></div>
                            <span className="text-xs font-black text-slate-400">99.9% Uptime</span>
                         </div>
                         <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                            <div className="flex items-center gap-3"><Cpu className="w-4 h-4 text-slate-400" /><div><p className="text-xs font-black">Telemetria</p><p className="text-[10px] text-emerald-500 font-bold uppercase">Online</p></div></div>
                            <span className="text-xs font-black text-slate-400">24ms Ping</span>
                         </div>
                      </div>
                   </div>
                   <div className={`${theme.card} p-6 rounded-[2rem] border shadow-sm`}>
                      <h4 className="font-black text-sm md:text-lg mb-6 flex items-center gap-2"><History className="w-5 h-5 text-indigo-500" /> Atividade Recente</h4>
                      <div className="space-y-3">
                         <p className="text-[11px] font-medium py-2 border-b border-slate-100 dark:border-slate-800"><span className="text-indigo-500 font-black">[12:45]</span> Rota VTR-08 iniciada para Sto André.</p>
                         <p className="text-[11px] font-medium py-2 border-b border-slate-100 dark:border-slate-800"><span className="text-indigo-500 font-black">[12:30]</span> Estoque de Americanas (+1200).</p>
                         <p className="text-[11px] font-medium py-2 border-b border-slate-100 dark:border-slate-800"><span className="text-red-500 font-black">[11:50]</span> Alerta de atraso para unidade VTR-02.</p>
                      </div>
                   </div>
                </div>
              )}
            </div>
          )}

          {/* ROTAS (MAPA COM MOTORISTAS RESTAURADOS) */}
          {activeTab === 'rotas' && (
            <div className="space-y-6">
              <h2 className="text-xl md:text-3xl font-black tracking-tight">Monitorização Global</h2>
              
              <div className="w-full h-64 md:h-[450px] rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl relative bg-slate-200">
                <iframe 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-46.8,-23.7,-46.4,-23.4&layer=mapnik" 
                  className={`absolute inset-0 w-full h-full grayscale contrast-125 ${isDark ? 'invert brightness-50' : ''}`}
                  style={{ border: 0 }}
                  title="Mapa Logisync"
                />
                
                {/* MOTORISTAS NO MAPA */}
                {MOCK_ROUTES.map((r, i) => (
                  <div key={i} className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform hover:scale-125" style={{ top: r.pos.t, left: r.pos.l }} onClick={() => setSelectedRoute(r)}>
                    <div className={`absolute -inset-2 rounded-full animate-ping opacity-40 ${r.status === 'Atrasado' ? 'bg-red-500' : 'bg-indigo-500'}`}></div>
                    <Avatar name={r.driver} className={`w-8 h-8 md:w-12 md:h-12 border-2 ${r.status === 'Atrasado' ? 'border-red-500' : 'border-indigo-500'} shadow-2xl relative z-20`} />
                  </div>
                ))}

                <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-slate-900/95 px-4 py-2 rounded-2xl text-[9px] md:text-[11px] font-black shadow-lg border dark:border-slate-700 flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 8 Veículos Monitorados
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                {MOCK_ROUTES.map(route => (
                  <div key={route.id} onClick={() => setSelectedRoute(route)} className={`${theme.card} p-5 rounded-[1.5rem] border shadow-sm cursor-pointer group active:scale-95 transition-all`}>
                    <div className="flex items-center gap-3 mb-5 md:mb-6"><Avatar name={route.driver} className="w-9 h-9 md:w-11 md:h-11" /><div className="font-black text-sm group-hover:text-indigo-600 transition-colors">{route.driver}</div></div>
                    <div className="mb-5"><p className="text-[8px] font-black text-slate-400 uppercase mb-1">Última Paragem</p><p className="text-[11px] font-bold truncate leading-relaxed">{route.dest}</p></div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-50 dark:border-slate-800"><span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded-lg ${getStatusColor(route.status)}`}>{route.status}</span><ChevronRight className="w-4 h-4 text-slate-300" /></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =====================================================================
          4. MODAIS E DETALHES FUNCIONAIS (AQUI ESTÁ A GESTÃO DE OCORRÊNCIAS)
      ===================================================================== */}

      {/* MODAL KPIs DASHBOARD - GESTÃO DE OCORRÊNCIAS */}
      {activeModal === 'problemas' && (
        <Modal title="Gestão de Ocorrências em Campo" onClose={() => setActiveModal(null)}>
           <div className="space-y-4">
             {MOCK_PROBLEMS.map((prob, i) => (
               <div key={i} className={`p-5 rounded-3xl border-2 ${prob.severity === 'Crítico' ? 'bg-red-500/5 border-red-500/20' : 'bg-amber-500/5 border-amber-500/20'} flex flex-col gap-4 shadow-sm`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                       <div className={`p-3 rounded-2xl ${prob.severity === 'Crítico' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white shadow-amber-500/20'}`}>
                          {prob.severity === 'Crítico' ? <AlertTriangle className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                       </div>
                       <div>
                          <h4 className={`font-black text-lg ${prob.severity === 'Crítico' ? 'text-red-500' : 'text-amber-600'}`}>{prob.type}</h4>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{prob.id} • {prob.time}</p>
                       </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${prob.severity === 'Crítico' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>{prob.severity}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-100 dark:border-slate-800">
                     <div className="flex items-center gap-3"><Avatar name={prob.driver} className="w-8 h-8" /><div><p className="text-[10px] text-slate-400 font-black uppercase">Motorista</p><p className="text-xs font-black">{prob.driver}</p></div></div>
                     <div><p className="text-[10px] text-slate-400 font-black uppercase">Localização</p><p className="text-xs font-black truncate">{prob.loc}</p></div>
                  </div>

                  <p className="text-xs font-medium text-slate-500 leading-relaxed italic">"{prob.desc}"</p>

                  <div className="flex gap-3 mt-2">
                     <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-indigo-500/20">Tratar Agora</button>
                     <button className="flex-1 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">Ligar</button>
                  </div>
               </div>
             ))}
           </div>
        </Modal>
      )}

      {/* MODAL ENTREGAS */}
      {activeModal === 'entregas' && (
        <Modal title="Histórico de Entregas (Hoje)" onClose={() => setActiveModal(null)}>
           <div className="space-y-4">
             {[{id: '#ENT-01', c: 'Apple', t: '11:45', d: 'Shopping Morumbi'}, {id: '#ENT-02', c: 'Amazon', t: '11:20', d: 'Centro Barueri'}, {id: '#ENT-03', c: 'Shopee', t: '10:55', d: 'Vila Olímpia'}].map((e, i) => (
               <div key={i} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm">
                  <div className="flex gap-4 items-center"><CompanyLogo name={e.c} className="w-10 h-10" /><div><p className="font-black text-sm">{e.id}</p><p className="text-[10px] text-slate-400 font-bold">{e.d}</p></div></div>
                  <div className="text-right"><p className="font-black text-sm">{e.t}</p><span className="text-[8px] font-black text-emerald-500 uppercase bg-emerald-500/10 px-2 py-1 rounded">Concluída</span></div>
               </div>
             ))}
           </div>
        </Modal>
      )}

      {/* MODAL SLA */}
      {activeModal === 'sla' && (
        <Modal title="Performance Platinum" onClose={() => setActiveModal(null)}>
           <div className="flex flex-col items-center py-10">
             <div className="relative w-56 h-56 rounded-full border-[18px] border-emerald-500 flex items-center justify-center shadow-2xl mb-8 animate-in zoom-in-75 duration-700">
                <div className="text-center"><span className="text-5xl font-black text-indigo-600 tracking-tighter">98,05%</span><p className="text-emerald-500 font-black text-[10px] uppercase mt-2 tracking-[0.2em]">Eficiência Operacional</p></div>
             </div>
             <p className="text-center text-sm text-slate-400 max-w-xs font-medium leading-relaxed">Sua operação mantém um desvio de apenas 1,95%, consolidando o LOGISYNC como líder em precisão logística.</p>
           </div>
        </Modal>
      )}

      {/* MODAL PRODUTO WMS */}
      {selectedProduct && (
        <Modal title="Info do WMS" onClose={() => setSelectedProduct(null)}>
          <div className="space-y-6">
            <div className="flex items-center gap-5 bg-slate-950 p-6 rounded-[1.5rem] text-white shadow-2xl">
              <CompanyLogo name={selectedProduct.client} className="w-14 h-14" />
              <div><h4 className="text-xl font-black leading-tight">{selectedProduct.name}</h4><p className="text-[10px] font-mono opacity-50 tracking-widest">{selectedProduct.sku}</p></div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border dark:border-slate-700 shadow-inner"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Volume em Rack</p><p className="text-4xl font-black text-indigo-600">{selectedProduct.qty}</p></div>
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border dark:border-slate-700 shadow-inner"><p className="text-[10px] font-black text-slate-400 uppercase mb-2">Status Logístico</p><p className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-xl ${getStatusColor(selectedProduct.status)}`}>{selectedProduct.status}</p></div>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL ROTA/MOTORISTA */}
      {selectedRoute && (
        <Modal title="Painel da Unidade" onClose={() => setSelectedRoute(null)}>
          <div className="space-y-8 text-center">
            <Avatar name={selectedRoute.driver} className="w-24 h-24 mx-auto border-4 border-indigo-500/30 shadow-2xl" />
            <div><h4 className="text-3xl font-black tracking-tighter">{selectedRoute.driver}</h4><p className="text-sm font-black text-indigo-500 uppercase tracking-widest">{selectedRoute.plate}</p></div>
            <div className="grid grid-cols-2 gap-3">
               <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center border dark:border-slate-800 shadow-sm"><Activity className="w-5 h-5 mx-auto mb-2 text-indigo-500"/><p className="text-[8px] font-black text-slate-400 uppercase">GPS SINAL</p><p className="text-xs font-black">EXCELENTE</p></div>
               <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl text-center border dark:border-slate-800 shadow-sm"><Phone className="w-5 h-5 mx-auto mb-2 text-emerald-500"/><p className="text-[8px] font-black text-slate-400 uppercase">CANAL</p><p className="text-xs font-black">ATIVO</p></div>
            </div>
            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Contactar Motorista</button>
          </div>
        </Modal>
      )}

      {/* NAV MOBILE */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 ${theme.nav} border-t border-slate-100 dark:border-slate-800 pb-safe pt-2.5 px-6 flex justify-around z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]`}>
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => {setActiveTab(item.id); window.scrollTo(0,0);}} className="flex flex-col items-center p-2 group transition-all">
            <div className={`p-2 rounded-xl transition-all duration-300 ${activeTab === item.id ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/30' : 'text-slate-400 group-active:scale-90'}`}>
              <item.icon className="w-6 h-6" strokeWidth={activeTab === item.id ? 2.5 : 2} />
            </div>
            <span className={`text-[8px] md:text-[9px] mt-1.5 font-black uppercase tracking-widest transition-all ${activeTab === item.id ? 'text-indigo-600 opacity-100' : 'text-slate-400 opacity-60'}`}>{item.label}</span>
          </button>
        ))}
      </nav>

    </div>
  );
}
