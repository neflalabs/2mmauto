import React, { useState } from 'react';
import { DollarSign, Flame, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

const Pricelist = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const categories = [
        { id: 'all', label: 'Semua Layanan' },
        { id: 'regular', label: 'Regular Service' },
        { id: 'tuning', label: 'Performance Tuning' },
        { id: 'engine', label: 'Engine Bore Up' }
    ];

    const services = [
        {
            name: "Tune-Up Standard",
            price: "Rp 150.000",
            category: "regular",
            desc: "Pembersihan throttle body/karburator, cek kelayakan busi, cek sistem kelistrikan ringan, dan penyetelan celah klep standard.",
            duration: "1 - 1.5 Jam",
            highlight: false
        },
        {
            name: "Fluid Service Pack",
            price: "Rp 85.000",
            category: "regular",
            desc: "Jasa kuras cairan rem (brake fluid), penggantian oli mesin, dan oli gardan (untuk matic). Oli disediakan terpisah atau bawa sendiri.",
            duration: "30 - 45 Menit",
            highlight: false
        },
        {
            name: "Porting Polish (2 Klep)",
            price: "Rp 650.000",
            category: "tuning",
            desc: "Optimalisasi jalur masuk (intake) & buang (exhaust) cylinder head. Meningkatkan efisiensi volumetrik aliran bahan bakar.",
            duration: "2 - 3 Hari",
            highlight: true
        },
        {
            name: "Porting Polish (4 Klep)",
            price: "Rp 950.000",
            category: "tuning",
            desc: "Porting & polishing khusus head 4 klep. Pengerjaan presisi menggunakan CNC-like manual hand-finish untuk flow optimal.",
            duration: "3 - 4 Hari",
            highlight: false
        },
        {
            name: "Bore Up Paket Harian (Scooter FI)",
            price: "Rp 1.800.000",
            category: "engine",
            desc: "Termasuk blok keramik aftermarket, piston kit (misal 58mm / 58.5mm), jasa pasang, dan pemetaan ulang/remap ECU standar.",
            duration: "1 - 2 Hari",
            highlight: true
        },
        {
            name: "Korek Harian & Dyno Mapping",
            price: "Rp 1.200.000",
            category: "tuning",
            desc: "Upgrade noken as custom (camshaft), dial ulang cam, setel ulang rasio kompresi, dan fine-tuning ECU programmable (Juken/ECUSHOP).",
            duration: "1 Hari",
            highlight: false
        },
        {
            name: "Full Engine Build (Racing / Balap)",
            price: "Hubungi Admin",
            category: "engine",
            desc: "Pengerjaan total dari nol. Custom stroke up, custom crankshaft, besar klep maksimal, modifikasi crankcase, dial noken as ekstrim.",
            duration: "7 - 14 Hari",
            highlight: false
        }
    ];

    const filteredServices = activeFilter === 'all' 
        ? services 
        : services.filter(s => s.category === activeFilter);

    return (
        <div className="space-y-12">
            {/* Filter Category */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {categories.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => setActiveFilter(c.id)}
                        className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                            activeFilter === c.id
                                ? 'bg-racing-red text-white shadow-red-glow'
                                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:text-neutral-950 dark:hover:text-white border border-black/5 dark:border-white/5'
                        }`}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            {/* Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredServices.map((service, idx) => (
                    <div 
                        key={idx}
                        className={`premium-card glass-panel p-6 sm:p-8 flex flex-col justify-between border relative group ${
                            service.highlight 
                                ? 'border-racing-red/40 dark:border-racing-red/20' 
                                : 'border-black/5 dark:border-white/5'
                        }`}
                    >
                        {service.highlight && (
                            <span className="absolute top-4 right-4 bg-racing-red text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest flex items-center gap-1 shadow-red-glow">
                                <Flame size={10} /> Best Choice
                            </span>
                        )}

                        <div>
                            <div className="mb-4">
                                <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md ${
                                    service.category === 'engine' 
                                        ? 'bg-red-500/10 text-red-500' 
                                        : service.category === 'tuning' 
                                        ? 'bg-amber-500/10 text-amber-500' 
                                        : 'bg-blue-500/10 text-blue-500'
                                }`}>
                                    {service.category === 'engine' ? 'Engine Build' : service.category === 'tuning' ? 'Tuning' : 'Regular'}
                                </span>
                            </div>

                            <h3 className="h-premium text-2xl mb-2 text-neutral-900 dark:text-white">
                                {service.name}
                            </h3>
                            
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                                {service.desc}
                            </p>
                        </div>

                        <div className="border-t border-black/5 dark:border-white/5 pt-6 mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                                <Clock size={14} />
                                <span className="text-xs font-bold">{service.duration}</span>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Estimasi Jasa</p>
                                <p className="h-premium text-2xl text-racing-red font-black">
                                    {service.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Catatan Penting */}
            <div className="max-w-2xl mx-auto p-6 glass-panel rounded-3xl border border-black/5 dark:border-white/5 flex gap-4 items-start bg-neutral-50/50 dark:bg-neutral-950/20">
                <ShieldCheck className="text-racing-red shrink-0" size={24} />
                <div className="space-y-2">
                    <h4 className="font-bold text-sm text-neutral-900 dark:text-white uppercase tracking-wider">Ketentuan & Garansi</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        Semua pekerjaan bore-up dan tuning harian bergaransi jasa selama 1 minggu sejak penyerahan motor. Jasa tidak termasuk penggantian oli & parts kecuali disebutkan di dalam paket. Harap hubungi mekanik via WhatsApp untuk konsultasi ketersediaan slot sebelum datang ke pit.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Pricelist;
