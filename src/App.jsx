import React, { useState, useEffect } from 'react';
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
  { id: 'OC-992', type: 'Pneu Furado', severity: 'Crítico', driver: 'Carlos Silva', time: '09:45', loc: 'Rod. Castelo Branco', desc: 'Veículo imobilizado no acostamento. Necessário envio de guincho.' },
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

  // Efeito para sincronizar a cor da barra do navegador (topo do telemóvel)
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const color = isDark ? '#020617' : '#f8fafc'; // slate-950 vs slate-50
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, [isDark]);

  const theme = {
    bg: isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900',
    card: isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100',
    textSec: isDark ? 'text-slate-400' : 'text-slate-500',
    border: isDark ? 'border-slate-800' : 'border-slate-100',
    header: isDark ? 'bg-slate-950/95 border-slate-900' : 'bg-white/95 border-slate-200',
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
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className={`${isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'} w-full max-w-2xl rounded-[2.5rem] flex flex-col shadow-2xl overflow-hidden border animate-in slide-in-from-bottom-5`}>
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-black text-xl tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:scale-110 transition-transform"><X className="w-5 h-5"/></button>
        </div>
        <div className="p-7 overflow-y-auto max-h-[75vh] no-scrollbar">{children}</div>
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
          <div><h2 className="text-xl font-black tracking-tight">LOGISYNC</h2><p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mt-0.5">SLA 98,05%</p></div>
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
        
        {/* HEADER MOBILE - CORRIGIDO PARA SER PROPORCIONAL */}
        <header className={`md:hidden flex items-center justify-between p-5 ${theme.header} sticky top-0 z-50 backdrop-blur-md border-b`}>
          <div className="flex items-center gap-2.5" onClick={() => setIsDark(!isDark)}>
            <div className="bg-gradient-to-tr from-indigo-600 to-cyan-500 p-2 rounded-lg shadow-md"><Hexagon className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-black tracking-tight">LOGISYNC</span>
          </div>
          <Avatar name="José Bernardo" className="w-9 h-9" />
        </header>

        <div className="p-4 md:p-0 space-y-7">
          
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-7 animate-in slide-in-from-top-3 duration-500">
              <div>
                <h1 className="text-2xl md:text-4xl font-black tracking-tight">Olá, <span className="animate-gradient-text">José Bernardo</span>.</h1>
                <p className={`${theme.textSec} text-xs font-bold mt-1 uppercase tracking-[0.2em]`}>SLA OPERACIONAL EM 98,05%.</p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { id: 'entregas', l: 'Entregas Hoje', v: '1.432', icon: Truck, c: 'from-blue-600 to-cyan-500' },
                  { id: 'transito', l: 'Em Trânsito', v: '385', icon: Navigation, c: 'from-orange-500 to-amber-400' },
                  { id: 'problemas', l: 'Ocorrências', v: '12', icon: AlertTriangle, c: 'from-rose-600 to-red-500' },
                  { id: 'sla', l: 'SLA Geral', v: '98,05%', icon: CheckCircle2, c: 'from-emerald-600 to-emerald-400' },
                ].map((kpi, idx) => (
                  <div key={idx} onClick={() => setActiveModal(kpi.id)} className={`${theme.card} p-5 md:p-6 rounded-[2rem] border shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-95`}>
                    <div className={`inline-flex p-2.5 rounded-2xl bg-gradient-to-tr ${kpi.c} text-white mb-4 shadow-md transition-transform hover:rotate-6`}><kpi.icon className="w-6 h-6 md:w-7 md:h-7" /></div>
                    <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${theme.textSec} mb-1`}>{kpi.l}</p>
                    <p className="text-xl md:text-3xl font-black tracking-tighter">{kpi.v}</p>
                  </div>
                ))}
              </div>

              {/* GRÁFICO INTERATIVO NO PAINEL */}
              <div className={`${theme.card} p-6 md:p-8 rounded-[2.5rem] border shadow-sm overflow-hidden relative`}>
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-black text-sm md:text-lg flex items-center gap-2"><BarChart3 className="w-6 h-6 text-indigo-500" /> Fluxo de Expedição</h3>
                  <div className="flex gap-2">
                     <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                     <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                </div>
                
                <div className="h-48 md:h-80 flex items-end justify-between gap-1.5 md:gap-4 relative px-1 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="absolute left-0 right-0 border-t border-dashed border-slate-300 dark:border-slate-700 z-0" style={{ bottom: '60%' }}>
                    <span className="text-[8px] font-black text-slate-400 absolute -top-4 left-0 uppercase tracking-tighter">Meta Operacional (900)</span>
                  </div>

                  {CHART_DATA.map((data, i) => {
                    const h = (data.volume / 1600) * 100;
                    const isSelected = selectedBar === i;
                    return (
                      <div key={i} onClick={() => setSelectedBar(isSelected ? null : i)} className="w-full h-full flex flex-col items-center justify-end group cursor-pointer relative z-10">
                        {isSelected && (
                          <div className={`absolute -top-12 ${isDark ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'} px-3 py-1.5 rounded-xl text-[10px] font-black shadow-2xl z-20 animate-bounce border ${isDark ? 'border-slate-200' : 'border-slate-800'}`}>
                            {data.volume} CXS • {data.status}
                          </div>
                        )}
                        <div className={`w-full max-w-[45px] rounded-t-xl transition-all duration-300 ${isSelected ? 'brightness-110 scale-x-110 shadow-lg' : 'opacity-90'} ${data.volume > 1200 ? 'bg-indigo-600' : data.volume > 800 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ height: `${h}%` }}>
                           <div className="w-full h-full bg-white/10 rounded-t-lg"></div>
                        </div>
                        <span className={`mt-3 text-[8px] md:text-[10px] font-black uppercase tracking-tighter ${isSelected ? 'text-indigo-600 scale-110' : theme.textSec}`}>{data.time}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ESTOQUE */}
          {activeTab === 'estoque' && (
            <div className="space-y-7 animate-in slide-in-from-right-3 duration-500">
              <h2 className="text-xl md:text-3xl font-black tracking-tight">Estoque WMS</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {MOCK_INVENTORY.map(item => (
                  <div key={item.id} onClick={() => setSelectedProduct(item)} className={`${theme.card} p-5 md:p-6 rounded-[2rem] border shadow-sm cursor-pointer group active:scale-95 transition-all`}>
                    <div className="flex justify-between items-center mb-7"><CompanyLogo name={item.client} className="w-10 h-10 md:w-12 md:h-12 shadow-sm"/><span className={`px-2 py-0.5 text-[7px] md:text-[8px] font-black uppercase rounded-lg ${getStatusColor(item.status)}`}>{item.status}</span></div>
                    <h4 className="font-black text-[11px] md:text-sm mb-6 group-hover:text-indigo-600 line-clamp-1">{item.name}</h4>
                    <div className="flex justify-between items-end border-t pt-5 border-slate-50 dark:border-slate-800">
                      <div><p className="text-[7px] md:text-[8px] font-black uppercase text-slate-400 mb-0.5">Em Stock</p><p className="text-lg md:text-2xl font-black tracking-tighter">{item.qty}</p></div>
                      <div className="bg-indigo-50 dark:bg-slate-800 p-1.5 rounded-lg text-indigo-500"><ChevronRight className="w-4 h-4" /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RASTREIO */}
          {activeTab === 'rastreamento' && (
            <div className="space-y-7 animate-in slide-in-from-left-3 duration-500">
               <div className="relative w-full rounded-[3rem] overflow-hidden p-10 md:p-20 text-center shadow-xl border-4 border-white dark:border-slate-900" style={{ backgroundImage: `url('https://res.cloudinary.com/dnymahpi7/image/upload/v1774112612/Picsart_26-03-21_14-01-59-284_2_pyqjog.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>
                <div className="relative z-10 max-w-xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tighter uppercase">Localizador</h2>
                  <p className="text-indigo-300 text-[10px] md:text-xs font-black mb-10 uppercase tracking-[0.3em]">Visão analítica do fluxo de carga.</p>
                  
                  <form onSubmit={handleSearch} className="relative">
                    <input 
                      type="text" placeholder="EX: SYNC-84920" value={trackingId} onChange={(e) => setTrackingId(e.target.value)}
                      className="w-full pl-8 pr-36 py-5 rounded-3xl bg-white text-slate-900 font-black uppercase text-lg shadow-2xl outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all" 
                    />
                    <button type="submit" className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Buscar</button>
                  </form>
                  {searchError && <p className="mt-5 text-red-400 font-black text-xs uppercase animate-pulse">Código não identificado na base.</p>}
                </div>
              </div>

              {searchedShipment ? (
                <div className={`${theme.card} p-8 md:p-12 rounded-[3rem] border shadow-2xl animate-in slide-in-from-bottom-5`}>
                   <div className="flex justify-between items-center mb-12">
                     <div className="flex items-center gap-5">
                       <CompanyLogo name={searchedShipment.client} className="w-16 h-16 shadow-none" />
                       <div><h3 className="text-3xl font-black tracking-tighter">{searchedShipment.id}</h3><p className={`${theme.textSec} text-xs font-black uppercase tracking-widest`}>{searchedShipment.client}</p></div>
                     </div>
                     <div className="text-right"><p className="text-[10px] font-black text-indigo-500 uppercase mb-1">Previsão Entrega</p><p className="text-3xl font-black text-indigo-600">{searchedShipment.eta}</p></div>
                   </div>
                   <div className="space-y-5 mb-5">
                      <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest"><span>Origem CD</span><span>{searchedShipment.progress}% Processado</span><span>Destino</span></div>
                      <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full transition-all duration-1000" style={{ width: `${searchedShipment.progress}%` }}></div></div>
                   </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className={`${theme.card} p-7 rounded-[2.5rem] border shadow-sm`}>
                      <h4 className="font-black text-sm md:text-lg mb-8 flex items-center gap-3"><Globe className="w-6 h-6 text-indigo-500" /> Status da Infraestrutura</h4>
                      <div className="space-y-5">
                         <div className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border dark:border-slate-700 shadow-sm">
                            <div className="flex items-center gap-4"><Database className="w-5 h-5 text-slate-400" /><div><p className="text-xs font-black">Cluster SQL Central</p><p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Sincronizado</p></div></div>
                            <span className="text-xs font-black text-slate-400">99.9% Uptime</span>
                         </div>
                         <div className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border dark:border-slate-700 shadow-sm">
                            <div className="flex items-center gap-4"><Cpu className="w-5 h-5 text-slate-400" /><div><p className="text-xs font-black">Node de Telemetria</p><p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Online</p></div></div>
                            <span className="text-xs font-black text-slate-400">22ms Latency</span>
                         </div>
                      </div>
                   </div>
                   <div className={`${theme.card} p-7 rounded-[2.5rem] border shadow-sm`}>
                      <h4 className="font-black text-sm md:text-lg mb-8 flex items-center gap-3"><History className="w-6 h-6 text-indigo-500" /> Atividade do Sistema</h4>
                      <div className="space-y-4">
                         <p className="text-[11px] font-medium py-3 border-b border-slate-100 dark:border-slate-800 leading-relaxed"><span className="text-indigo-500 font-black">[12:45]</span> VTR-08 iniciou trajeto via Rodoanel para Santo André.</p>
                         <p className="text-[11px] font-medium py-3 border-b border-slate-100 dark:border-slate-800 leading-relaxed"><span className="text-indigo-500 font-black">[12:30]</span> Atualização massiva de estoque concluída (Americanas).</p>
                         <p className="text-[11px] font-medium py-3 border-b border-slate-100 dark:border-slate-800 leading-relaxed"><span className="text-red-500 font-black">[11:50]</span> Alerta: Falha de sinal GPS reportada pela unidade VTR-02.</p>
                      </div>
                   </div>
                </div>
              )}
            </div>
          )}

          {/* ROTAS */}
          {activeTab === 'rotas' && (
            <div className="space-y-7 animate-in slide-in-from-bottom-3 duration-500">
              <h2 className="text-xl md:text-3xl font-black tracking-tight">Monitorização Global</h2>
              
              <div className="w-full h-64 md:h-[480px] rounded-[3rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl relative bg-slate-200">
                <iframe 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-46.8,-23.7,-46.4,-23.4&layer=mapnik" 
                  className={`absolute inset-0 w-full h-full grayscale contrast-125 ${isDark ? 'invert brightness-50' : 'opacity-80'}`}
                  style={{ border: 0 }}
                  title="Mapa Logisync"
                />
                
                {/* MOTORISTAS NO MAPA */}
                {MOCK_ROUTES.map((r, i) => (
                  <div key={i} className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-all hover:scale-125 hover:z-20" style={{ top: r.pos.t, left: r.pos.l }} onClick={() => setSelectedRoute(r)}>
                    <div className={`absolute -inset-3 rounded-full animate-ping opacity-40 ${r.status === 'Atrasado' ? 'bg-red-500' : 'bg-indigo-500'}`}></div>
                    <Avatar name={r.driver} className={`w-9 h-9 md:w-14 md:h-14 border-2 ${r.status === 'Atrasado' ? 'border-red-500' : 'border-indigo-600'} shadow-2xl relative z-20`} />
                  </div>
                ))}

                <div className="absolute bottom-5 left-5 bg-white/95 dark:bg-slate-900/95 px-5 py-2.5 rounded-2xl text-[10px] md:text-[11px] font-black shadow-2xl border dark:border-slate-700 flex items-center gap-3">
                   <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> 8 Veículos Monitorados Ativos
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {MOCK_ROUTES.map(route => (
                  <div key={route.id} onClick={() => setSelectedRoute(route)} className={`${theme.card} p-5 rounded-[1.8rem] border shadow-sm cursor-pointer group active:scale-95 transition-all`}>
                    <div className="flex items-center gap-4 mb-6"><Avatar name={route.driver} className="w-10 h-10 md:w-12 md:h-12" /><div className="font-black text-sm group-hover:text-indigo-600 transition-colors leading-tight">{route.driver}</div></div>
                    <div className="mb-6"><p className="text-[8px] font-black text-slate-400 uppercase mb-1 tracking-widest">Destino Final</p><p className="text-[11px] font-bold truncate leading-relaxed">{route.dest}</p></div>
                    <div className="flex justify-between items-center pt-5 border-t border-slate-50 dark:border-slate-800"><span className={`px-2.5 py-1 text-[8px] font-black uppercase rounded-lg ${getStatusColor(route.status)}`}>{route.status}</span><ChevronRight className="w-4 h-4 text-slate-300" /></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* =====================================================================
          4. MODAIS E GESTÃO DE OCORRÊNCIAS (RESTAURADOS)
      ===================================================================== */}

      {/* GESTÃO DE OCORRÊNCIAS (CLICK NO CARTÃO ALERTA) */}
      {activeModal === 'problemas' && (
        <Modal title="Central de Gestão de Crises" onClose={() => setActiveModal(null)}>
           <div className="space-y-5">
             {MOCK_PROBLEMS.map((prob, i) => (
               <div key={i} className={`p-6 rounded-[2rem] border-2 ${prob.severity === 'Crítico' ? 'bg-red-500/5 border-red-500/20' : 'bg-amber-500/5 border-amber-500/20'} flex flex-col gap-5 shadow-sm`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-5">
                       <div className={`p-4 rounded-2xl ${prob.severity === 'Crítico' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'}`}>
                          {prob.severity === 'Crítico' ? <AlertTriangle className="w-7 h-7" /> : <ShieldAlert className="w-7 h-7" />}
                       </div>
                       <div>
                          <h4 className={`font-black text-xl ${prob.severity === 'Crítico' ? 'text-red-500' : 'text-amber-600'}`}>{prob.type}</h4>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">{prob.id} • {prob.time}</p>
                       </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase ${prob.severity === 'Crítico' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>{prob.severity}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-5 border-y border-slate-100 dark:border-slate-800">
                     <div className="flex items-center gap-4"><Avatar name={prob.driver} className="w-10 h-10 border-none shadow-sm" /><div><p className="text-[10px] text-slate-400 font-black uppercase">Responsável</p><p className="text-sm font-black">{prob.driver}</p></div></div>
                     <div><p className="text-[10px] text-slate-400 font-black uppercase">Local do Incidente</p><p className="text-sm font-black truncate">{prob.loc}</p></div>
                  </div>

                  <div className="bg-white dark:bg-slate-800/50 p-4 rounded-2xl border dark:border-slate-800">
                     <h5 className="text-[9px] font-black text-slate-400 uppercase mb-2">Relato do Condutor</h5>
                     <p className="text-[13px] font-medium text-slate-500 leading-relaxed italic">"{prob.desc}"</p>
                  </div>

                  <div className="flex gap-4 mt-2">
                     <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-indigo-500/20">Iniciar Resolução</button>
                     <button className="flex-1 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-sm">Protocolar</button>
                  </div>
               </div>
             ))}
           </div>
        </Modal>
      )}

      {/* MODAL PERFORMANCE PLATINUM */}
      {activeModal === 'sla' && (
        <Modal title="Monitor de Qualidade" onClose={() => setActiveModal(null)}>
           <div className="flex flex-col items-center py-12">
             <div className="relative w-64 h-64 rounded-full border-[22px] border-emerald-500 flex items-center justify-center shadow-2xl mb-10 animate-in zoom-in-75 duration-700">
                <div className="text-center"><span className="text-6xl font-black text-indigo-600 tracking-tighter">98,05%</span><p className="text-emerald-500 font-black text-[10px] uppercase mt-3 tracking-[0.3em]">Padrão de Ouro</p></div>
                <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-ping"></div>
             </div>
             <div className="text-center space-y-4 max-w-sm px-4">
                <h4 className="text-2xl font-black leading-tight">Eficiência de Classe Mundial</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">Apenas 1,95% de variância operacional. Sua logística está operando no pico da produtividade global.</p>
             </div>
           </div>
        </Modal>
      )}

      {/* MODAL ENTREGAS */}
      {activeModal === 'entregas' && (
        <Modal title="Expedição em Tempo Real" onClose={() => setActiveModal(null)}>
           <div className="space-y-4">
             {[{id: '#ENT-01', c: 'Apple', t: '11:45', d: 'Shopping Morumbi'}, {id: '#ENT-02', c: 'Amazon', t: '11:20', d: 'CD Barueri'}, {id: '#ENT-03', c: 'Shopee', t: '10:55', d: 'Vila Olímpia'}, {id: '#ENT-04', c: 'Mercado Livre', t: '10:15', d: 'Centro SP'}].map((e, i) => (
               <div key={i} className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-800 rounded-[1.8rem] border dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                  <div className="flex gap-5 items-center"><CompanyLogo name={e.c} className="w-12 h-12 shadow-none" /><div><p className="font-black text-base">{e.id}</p><p className="text-[10px] text-slate-400 font-black uppercase">{e.d}</p></div></div>
                  <div className="text-right"><p className="font-black text-base leading-none mb-1">{e.t}</p><span className="text-[9px] font-black text-emerald-500 uppercase bg-emerald-500/10 px-2 py-1 rounded">Expedido</span></div>
               </div>
             ))}
           </div>
        </Modal>
      )}

      {/* MODAL UNIDADE / ROTA */}
      {selectedRoute && (
        <Modal title="Centro de Telemetria" onClose={() => setSelectedRoute(null)}>
          <div className="space-y-8 text-center">
            <Avatar name={selectedRoute.driver} className="w-28 h-28 mx-auto border-[6px] border-white dark:border-slate-800 shadow-[0_10px_40px_rgba(79,70,229,0.2)]" />
            <div><h4 className="text-4xl font-black tracking-tighter">{selectedRoute.driver}</h4><p className="text-sm font-black text-indigo-500 uppercase tracking-[0.4em] mt-2">{selectedRoute.plate}</p></div>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border dark:border-slate-800 shadow-sm"><Activity className="w-6 h-6 mx-auto mb-3 text-indigo-500"/><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sinal GPS</p><p className="text-base font-black uppercase text-emerald-500">Execelente</p></div>
               <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border dark:border-slate-800 shadow-sm"><Phone className="w-6 h-6 mx-auto mb-3 text-indigo-500"/><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado</p><p className="text-base font-black uppercase">{selectedRoute.status}</p></div>
            </div>
            <div className="flex gap-4">
               <button className="flex-1 py-5 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] active:scale-95 transition-all shadow-xl">Voz Direta</button>
               <button className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">Relatório</button>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL PRODUTO */}
      {selectedProduct && (
        <Modal title="Inteligência de Stock" onClose={() => setSelectedProduct(null)}>
          <div className="space-y-8">
            <div className="flex items-center gap-6 bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <CompanyLogo name={selectedProduct.client} className="w-16 h-16 shadow-none relative z-10" />
              <div className="relative z-10"><h4 className="text-2xl font-black leading-tight tracking-tight">{selectedProduct.name}</h4><p className="text-[11px] font-mono opacity-60 tracking-[0.2em] mt-1">{selectedProduct.sku}</p></div>
              <Box className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 rotate-12" />
            </div>
            <div className="grid grid-cols-2 gap-5 text-center">
              <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border dark:border-slate-700 shadow-inner"><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Qtd em Rack</p><p className="text-5xl font-black text-indigo-600 tracking-tighter">{selectedProduct.qty}</p></div>
              <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border dark:border-slate-700 shadow-inner"><p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Status ERP</p><p className={`text-[11px] font-black uppercase px-4 py-2 rounded-xl inline-block ${getStatusColor(selectedProduct.status)}`}>{selectedProduct.status}</p></div>
            </div>
          </div>
        </Modal>
      )}

      {/* NAV MOBILE (BARRA INFERIOR) */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 ${theme.header} border-t border-slate-100 dark:border-slate-800 pb-safe pt-3 px-6 flex justify-around z-50 shadow-[0_-15px_40px_rgba(0,0,0,0.15)]`}>
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => {setActiveTab(item.id); window.scrollTo(0,0);}} className="flex flex-col items-center p-2 group transition-all">
            <div className={`p-2.5 rounded-2xl transition-all duration-300 ${activeTab === item.id ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/40' : 'text-slate-400 group-active:scale-90'}`}>
              <item.icon className="w-6 h-6" strokeWidth={activeTab === item.id ? 2.5 : 2} />
            </div>
            <span className={`text-[9px] mt-2 font-black uppercase tracking-widest transition-all ${activeTab === item.id ? 'text-indigo-600 opacity-100' : 'text-slate-400 opacity-60'}`}>{item.label}</span>
          </button>
        ))}
      </nav>

    </div>
  );
}
