import React, { useState, useMemo } from 'react';
import { Trash2, Eye, EyeOff, Zap, Gauge, AlertCircle } from 'lucide-react';
import presetData from '../data/presets.json';

const Toolbox = () => {
    const [activeTab, setActiveTab] = useState('cc');
    const [showFormula, setShowFormula] = useState(false);
    const [bore, setBore] = useState('');
    const [stroke, setStroke] = useState('');
    const [buret, setBuret] = useState('');
    const [plugType, setPlugType] = useState('0.8');
    const [customPlug, setCustomPlug] = useState('');
    const [valveConfig, setValveConfig] = useState('2');
    const [stockValve, setStockValve] = useState({ in: '-', ex: '-' });
    const [stockCr, setStockCr] = useState('-');
    const [selectedPreset, setSelectedPreset] = useState('');

    const presets = presetData.presets;
    const market = presetData.market;

    // Displacement (CC) calculation
    const vd = useMemo(() => {
        const b = parseFloat(bore);
        const s = parseFloat(stroke);
        return (!b || !s) ? 0 : (Math.PI * Math.pow(b / 2, 2) * s) / 1000;
    }, [bore, stroke]);

    // Compression Ratio (CR) calculation
    const cr = useMemo(() => {
        const v = parseFloat(buret);
        const plugVal = plugType === 'custom' ? parseFloat(customPlug) : parseFloat(plugType);
        const vc = v - (plugVal || 0);
        return (vd > 0 && vc > 0) ? ((vd + vc) / vc).toFixed(1) : '0.0';
    }, [vd, buret, plugType, customPlug]);

    // Valve size recommendations
    const valveData = useMemo(() => {
        const b = parseFloat(bore);
        if (!b) return null;
        const inVal = valveConfig === '2' ? b * 0.52 : b * 0.35;
        const exVal = inVal * 0.85;
        
        // Find closest market recommendation
        let closest = market[0];
        let minDiff = Math.abs(market[0].in - inVal);
        for (let i = 1; i < market.length; i++) {
            const diff = Math.abs(market[i].in - inVal);
            if (diff < minDiff) {
                minDiff = diff;
                closest = market[i];
            }
        }
        
        return {
            in: inVal.toFixed(1),
            ex: exVal.toFixed(1),
            rec: closest
        };
    }, [bore, valveConfig, market]);

    const handlePresetChange = (e) => {
        const val = e.target.value;
        setSelectedPreset(val);
        const item = presets.find(p => p.name === val);
        if (!item) {
            setStockCr('-');
            setStockValve({ in: '-', ex: '-' });
            return;
        }
        setBore(item.bore);
        setStroke(item.stroke);
        setValveConfig(item.val);
        setStockValve({ in: item.stdIn, ex: item.stdEx });
        setStockCr(item.stdCr || '-');
    };

    const handleClear = () => {
        if (activeTab === 'cc') {
            setBore('');
            setStroke('');
        } else if (activeTab === 'cr') {
            setBuret('');
            setCustomPlug('');
            setStockCr('-');
        } else {
            setBore('');
            setStockValve({ in: '-', ex: '-' });
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto premium-card glass-panel p-6 sm:p-10 border border-black/5 dark:border-white/5 transition-all duration-300">
            {/* Navigasi Tab */}
            <div className="flex bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-1.5 mb-6 sm:mb-8 border border-black/5 dark:border-white/5">
                {[
                    { id: 'cc', label: 'Engine CC' },
                    { id: 'cr', label: 'Comp Ratio' },
                    { id: 'valve', label: 'Valve Size' }
                ].map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`flex-1 py-3 rounded-xl text-xs font-black uppercase transition-all duration-300 tracking-wider ${
                            activeTab === t.id
                                ? 'bg-racing-red text-white shadow-red-glow font-extrabold'
                                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Presets Selector */}
            <div className="relative mb-6">
                <select
                    value={selectedPreset}
                    onChange={handlePresetChange}
                    className="w-full bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5 text-neutral-800 dark:text-white rounded-2xl px-6 py-4 text-xs sm:text-sm font-black uppercase outline-none appearance-none text-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-850 transition-colors duration-300"
                >
                    <option value="">-- PILIH PRESET MOTOR --</option>
                    {presets.map((p) => (
                        <option key={p.name} value={p.name}>
                            {p.name}
                        </option>
                    ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                    ▼
                </div>
            </div>

            {/* Bore & Stroke Inputs */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 px-1">BORE (DIAMETER PISTON)</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={bore}
                            onChange={(e) => setBore(e.target.value)}
                            placeholder="Bore"
                            className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-2xl px-6 py-4 text-center text-lg font-bold w-full border border-black/5 dark:border-white/5 outline-none focus:border-racing-red transition-all duration-300"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-neutral-400">mm</span>
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 px-1">STROKE (LANGKAH PISTON)</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={stroke}
                            onChange={(e) => setStroke(e.target.value)}
                            placeholder="Stroke"
                            className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-2xl px-6 py-4 text-center text-lg font-bold w-full border border-black/5 dark:border-white/5 outline-none focus:border-racing-red transition-all duration-300"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-neutral-400">mm</span>
                    </div>
                </div>
            </div>

            {/* Tab: CC */}
            {activeTab === 'cc' && (
                <div className="bg-racing-red rounded-3xl p-8 text-center text-white shadow-red-glow relative overflow-hidden">
                    {/* Background decor */}
                    <div className="absolute right-[-10%] top-[-20%] text-white/5 font-black text-9xl pointer-events-none select-none">
                        CC
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                        <Gauge size={32} className="mb-2 text-white/80 animate-pulse" />
                        <p className="text-[10px] font-bold opacity-80 tracking-widest uppercase">DISPLACEMENT</p>
                        <p className="text-5xl sm:text-6xl font-black mt-2 font-display">{vd.toFixed(1)} <span className="text-2xl font-black tracking-normal">cc</span></p>
                    </div>
                </div>
            )}

            {/* Tab: CR */}
            {activeTab === 'cr' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 px-1">VOLUME BURET</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={buret}
                                    onChange={(e) => setBuret(e.target.value)}
                                    placeholder="Buret (ml/cc)"
                                    className="w-full bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-2xl px-6 py-4 text-lg font-bold outline-none text-center border border-black/5 dark:border-white/5 focus:border-racing-red transition-all duration-300"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-neutral-400">cc</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 px-1">VOLUME BUSI (PLUG)</label>
                            <select
                                value={plugType}
                                onChange={(e) => setPlugType(e.target.value)}
                                className="w-full bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-white rounded-2xl px-6 py-4.5 text-xs sm:text-sm font-bold uppercase outline-none border border-black/5 dark:border-white/5 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-850 transition-colors text-center"
                            >
                                <option value="0.8">Busi Drat Panjang (Std 0.8 cc)</option>
                                <option value="1.2">Busi Drat Pendek (Std 1.2 cc)</option>
                                <option value="custom">Custom Volume Busi</option>
                            </select>
                        </div>
                    </div>

                    {plugType === 'custom' && (
                        <div className="animate-float">
                            <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 px-1">CUSTOM VOLUME BUSI</label>
                            <input
                                type="number"
                                value={customPlug}
                                onChange={(e) => setCustomPlug(e.target.value)}
                                placeholder="Volume Busi Custom (ml)"
                                className="w-full bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-2xl px-6 py-4 text-base font-bold outline-none text-center border border-black/5 dark:border-white/5 focus:border-racing-red transition-all duration-300"
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-neutral-50 dark:bg-neutral-900/60 p-6 rounded-2xl text-center border border-black/5 dark:border-white/5">
                            <p className="text-[9px] text-neutral-400 tracking-widest font-bold uppercase mb-1">CR PABRIKAN</p>
                            <p className="font-black text-neutral-900 dark:text-white text-2xl font-display">{stockCr}{stockCr !== '-' ? ' : 1' : ''}</p>
                        </div>
                        <div className="bg-racing-red/10 dark:bg-racing-red/5 border border-racing-red/20 p-6 rounded-2xl text-center">
                            <p className="text-[9px] text-racing-red tracking-widest font-bold uppercase mb-1">CR HITUNGAN</p>
                            <p className="font-black text-racing-red text-2xl font-display">{cr} : 1</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab: Valve */}
            {activeTab === 'valve' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 px-1">KONFIGURASI KLEP</label>
                        <div className="flex bg-neutral-100 dark:bg-neutral-900 rounded-xl p-1 border border-black/5 dark:border-white/5">
                            <button
                                onClick={() => setValveConfig('2')}
                                className={`flex-1 py-3 text-xs font-bold rounded-lg transition-colors ${
                                    valveConfig === '2'
                                        ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                                        : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                                }`}
                            >
                                2 Klep
                            </button>
                            <button
                                onClick={() => setValveConfig('4')}
                                className={`flex-1 py-3 text-xs font-bold rounded-lg transition-colors ${
                                    valveConfig === '4'
                                        ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                                        : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                                }`}
                            >
                                4 Klep
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-neutral-50 dark:bg-neutral-900/60 p-6 rounded-2xl text-center border border-black/5 dark:border-white/5">
                            <p className="text-[9px] text-neutral-400 tracking-widest font-bold uppercase mb-1">STD IN / EX</p>
                            <p className="font-black text-neutral-900 dark:text-white text-xl sm:text-2xl font-display">
                                {stockValve.in} / {stockValve.ex}
                            </p>
                        </div>
                        {valveData && (
                            <div className="bg-racing-red/10 dark:bg-racing-red/5 border border-racing-red/20 p-6 rounded-2xl text-center">
                                <p className="text-[9px] text-racing-red tracking-widest font-bold uppercase mb-1">REKOMENDASI KLEP</p>
                                <p className="font-black text-racing-red text-xl sm:text-2xl font-display">
                                    {valveData.rec.in} / {valveData.rec.ex}
                                </p>
                            </div>
                        )}
                    </div>

                    {valveData && (
                        <div className="bg-neutral-50 dark:bg-neutral-900/60 p-4.5 rounded-2xl border border-black/5 dark:border-white/5 flex gap-3 items-center">
                            <AlertCircle size={18} className="text-racing-red shrink-0" />
                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
                                Hasil kalkulasi teoretis klep ideal adalah <span className="font-bold text-neutral-900 dark:text-white">{valveData.in} mm (In)</span> & <span className="font-bold text-neutral-900 dark:text-white">{valveData.ex} mm (Ex)</span>. Rekomendasi di atas adalah ukuran pasar terdekat.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Aksi & Rumus */}
            <div className="flex gap-3 mt-8">
                <button
                    onClick={handleClear}
                    className="p-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-850 rounded-2xl text-red-500 hover:text-red-600 transition-colors border border-black/5 dark:border-white/5"
                    title="Clear tab inputs"
                >
                    <Trash2 size={20} />
                </button>
                <button
                    onClick={() => setShowFormula(!showFormula)}
                    className="flex-1 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-850 rounded-2xl text-xs font-black uppercase text-neutral-800 dark:text-white flex justify-center items-center gap-2 transition-colors border border-black/5 dark:border-white/5"
                >
                    Tampilkan Rumus
                    {showFormula ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>

            {showFormula && (
                <div className="mt-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/30 border border-black/5 dark:border-white/5 text-[11px] text-neutral-500 dark:text-neutral-400 space-y-2 leading-relaxed">
                    <p className="font-bold text-neutral-800 dark:text-neutral-200">
                        {activeTab === 'cc' && "Rumus Volume Silinder (CC):"}
                        {activeTab === 'cr' && "Rumus Compression Ratio (CR):"}
                        {activeTab === 'valve' && "Rumus Diameter Klep Ideal:"}
                    </p>
                    <p className="font-mono">
                        {activeTab === 'cc' && "CC = (π × (Bore / 2)² × Stroke) / 1000"}
                        {activeTab === 'cr' && "CR = (Displacement + Combustion Chamber Volume) / Combustion Chamber Volume"}
                        {activeTab === 'valve' && `In = Bore × ${valveConfig === '2' ? '0.52' : '0.35'} mm | Ex = In × 0.85 mm`}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Toolbox;
