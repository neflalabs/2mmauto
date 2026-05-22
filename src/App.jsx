import React, { useState, useEffect } from 'react';
import {
    Wrench,
    CheckCircle,
    XCircle,
    MessageSquare,
    Loader2,
    Sun,
    Moon,
    Gauge,
    Zap,
    Flag,
    Timer,
    Fuel,
    Settings,
    ArrowRight,
    MapPin,
    Menu,
    X
} from 'lucide-react';

import Toolbox from './components/Toolbox';
import Pricelist from './components/Pricelist';
import AboutContact from './components/AboutContact';

// --- STATUS INDICATOR COMPONENT ---
const StatusIndicator = () => {
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const moods = [
            { text: "Operational", color: "text-green-500", bg: "bg-green-500/10", message: "Ready for speed.", detail: "Pit building open" },
            { text: "Warm Up", color: "text-orange-500", bg: "bg-orange-500/10", message: "Hanya terima servis ringan.", detail: "Limited capacity" },
            { text: "Gabut Mode", color: "text-purple-500", bg: "bg-purple-500/10", message: "Nongkrong only, servis nanti.", detail: "Social hours" }
        ];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        const timer = setTimeout(() => setStatus(randomMood), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (status === "loading") return (
        <div className="flex h-12 items-center justify-center">
            <Loader2 className="animate-spin text-racing-red/50" size={24} />
        </div>
    );

    return (
        <div className="inline-flex flex-col items-center sm:items-start group">
            <div className={`px-4 py-1.5 rounded-full ${status.bg} border border-black/5 dark:border-white/5 flex items-center gap-2 mb-2 transition-all duration-500`}>
                <div className={`w-2 h-2 rounded-full ${status.color} bg-current animate-pulse`}></div>
                <span className={`text-xs font-bold uppercase tracking-widest ${status.color}`}>
                    {status.text}
                </span>
            </div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 italic">
                {status.message}
            </p>
        </div>
    );
};

// --- SERVICES COMPONENT ---
const Services = () => {
    const jobs = [
        { name: "Fluid System", mood: "Gas Terus", accept: true, desc: "Ganti oli dan kuras cairan. Duit cepet, mesin seger.", icon: Fuel },
        { name: "Inner Mechanics", mood: "Skip Dulu", accept: false, desc: "Turun mesin. Ribet, pinggang sakit, pengerjaan lama.", icon: Settings },
        { name: "Visual Mods", mood: "Tergantung", accept: true, desc: "Pasang aksesoris. Asal bautnya gak sleg, gas aja.", icon: Wrench },
        { name: "Power Grid", mood: "Males", accept: false, desc: "Kelistrikan rakitan. Takut kesetrum, mending ke spesialis.", icon: Zap },
        { name: "Pit Talk", mood: "Boleh", accept: true, desc: "Sharing & Konsultasi gratis, asal bawa kopi atau gorengan.", icon: MessageSquare },
        { name: "Elite Tuning", mood: "Prioritas", accept: true, desc: "Modifikasi performa tinggi. Nah, ini baru semangat.", icon: Gauge },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, idx) => {
                const IconComponent = job.icon;
                return (
                    <div key={idx}
                        className={`premium-card glass-panel p-6 flex flex-col justify-between group h-full
                            ${!job.accept ? 'opacity-50' : ''}`}>
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110
                                    ${job.accept ? 'bg-racing-red text-white shadow-red-glow' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'}`}>
                                    <IconComponent size={24} />
                                </div>
                                {job.accept ? 
                                    <CheckCircle size={20} className="text-green-500/40" /> : 
                                    <XCircle size={20} className="text-red-500/40" />
                                }
                            </div>
                            <h3 className="h-premium text-xl mb-2 flex items-center gap-2">
                                {job.name}
                                {!job.accept && <span className="text-[10px] bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded text-neutral-500 uppercase tracking-tighter">Skip</span>}
                            </h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                                {job.desc}
                            </p>
                        </div>
                        <div className="racing-stripe mt-auto"></div>
                    </div>
                );
            })}
        </div>
    );
};

// --- THEME TOGGLE COMPONENT ---
const ThemeToggle = ({ theme, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:text-racing-red hover:bg-neutral-200 dark:hover:bg-neutral-850 transition-all duration-300 border border-black/5 dark:border-white/5 cursor-pointer"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
};

// --- MAIN APP ---
const App = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;
        return (new Date().getHours() >= 6 && new Date().getHours() < 18) ? 'light' : 'dark';
    });
    
    const [activePage, setActivePage] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const navigateTo = (page) => {
        setActivePage(page);
        setIsMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] selection:bg-racing-red selection:text-white transition-colors duration-500 flex flex-col">
            {/* Background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-40 z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[40%] bg-racing-red/10 blur-[130px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[45%] h-[40%] bg-racing-red/5 blur-[130px] rounded-full"></div>
            </div>

            {/* === NAVIGATION === */}
            <nav className="relative z-50 max-w-7xl w-full mx-auto px-6 py-6 flex justify-between items-center border-b border-black/5 dark:border-white/5 bg-[var(--bg-main)]/80 backdrop-blur-md sticky top-0">
                <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigateTo('home')}>
                    <div className="w-10 h-10 bg-racing-red rounded-xl flex items-center justify-center text-white shadow-red-glow transition-transform group-hover:rotate-12">
                        <Gauge size={22} />
                    </div>
                    <div>
                        <h1 className="h-premium text-2xl leading-none">
                            2MM <span className="text-racing-red">AUTO</span>
                        </h1>
                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.4em] mt-1">
                            by NeflaLabs
                        </p>
                    </div>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-8 text-[11px] font-black tracking-widest uppercase">
                    {[
                        { id: 'home', label: 'Home' },
                        { id: 'toolbox', label: 'Toolbox' },
                        { id: 'pricelist', label: 'Pricelist' },
                        { id: 'about', label: 'About & Contact' }
                    ].map((link) => (
                        <button
                            key={link.id}
                            onClick={() => navigateTo(link.id)}
                            className={`hover:text-racing-red transition-colors cursor-pointer tracking-wider ${
                                activePage === link.id ? 'text-racing-red font-extrabold' : 'text-neutral-400 dark:text-neutral-400'
                            }`}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle theme={theme} onToggle={() => setTheme(p => p === 'light' ? 'dark' : 'light')} />
                    
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:text-racing-red hover:bg-neutral-200 dark:hover:bg-neutral-850 md:hidden border border-black/5 dark:border-white/5 cursor-pointer"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed top-[89px] inset-x-0 bg-[var(--bg-main)]/95 backdrop-blur-lg border-b border-black/5 dark:border-white/5 z-40 p-6 flex flex-col gap-5 text-center text-xs font-black uppercase tracking-widest">
                    {[
                        { id: 'home', label: 'Home' },
                        { id: 'toolbox', label: 'Toolbox' },
                        { id: 'pricelist', label: 'Pricelist' },
                        { id: 'about', label: 'About & Contact' }
                    ].map((link) => (
                        <button
                            key={link.id}
                            onClick={() => navigateTo(link.id)}
                            className={`py-3 w-full rounded-2xl hover:text-racing-red hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all cursor-pointer ${
                                activePage === link.id ? 'bg-racing-red/10 text-racing-red' : 'text-neutral-500'
                            }`}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            )}

            {/* === PAGE CONTENTS === */}
            <div className="flex-grow relative z-10">
                {activePage === 'home' && (
                    <>
                        {/* HERO SECTION */}
                        <header className="max-w-7xl mx-auto px-6 pt-16 pb-20">
                            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                <StatusIndicator />
                                
                                <h2 className="mt-12 h-premium text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter uppercase">
                                    PRECISION <br className="hidden md:block" /> 
                                    <span className="text-gradient">GARAGE</span>
                                </h2>
                                
                                <div className="mt-12 max-w-2xl">
                                    <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed italic">
                                        "Kerja keras itu tipes, kerja cerdas itu <span className="text-racing-red font-bold">prioritas</span>."
                                    </p>
                                    <p className="mt-6 text-sm text-neutral-450 leading-relaxed">
                                        Bengkel motor independen dengan standar kenceng. 
                                        Kami hanya fokus pada kualitas, bukan kuantitas. 
                                        Buka saat fokus, tutup saat istirahat.
                                    </p>
                                </div>

                                <div className="mt-12 flex flex-wrap justify-center sm:justify-start gap-4">
                                    <button 
                                        onClick={() => navigateTo('about')}
                                        className="px-8 py-4 bg-racing-red text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 transition-transform shadow-red-glow cursor-pointer"
                                    >
                                        Book a Slot <ArrowRight size={16} />
                                    </button>
                                    <div className="px-8 py-4 glass-panel rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-3">
                                        <Timer size={16} /> EST. 2024
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* SERVICES */}
                        <main className="max-w-7xl mx-auto px-6 pb-24">
                            <div className="flex items-center gap-4 mb-12">
                                <span className="h-premium text-4xl text-racing-red opacity-10 leading-none">01</span>
                                <h3 className="h-premium text-3xl uppercase tracking-tight text-neutral-900 dark:text-white">Technical Menu</h3>
                            </div>
                            <Services />
                        </main>
                    </>
                )}

                {activePage === 'toolbox' && (
                    <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                        <div className="space-y-4 mb-12">
                            <h2 className="h-premium text-4xl sm:text-5xl uppercase tracking-tight text-neutral-900 dark:text-white">
                                Mechanical <span className="text-gradient">Toolbox</span>
                            </h2>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
                                Kalkulator rasio kompresi, volume silinder (CC), dan perhitungan diameter klep ideal untuk kebutuhan modifikasi mesin.
                            </p>
                        </div>
                        <Toolbox />
                    </section>
                )}

                {activePage === 'pricelist' && (
                    <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                        <div className="space-y-4 mb-12">
                            <h2 className="h-premium text-4xl sm:text-5xl uppercase tracking-tight text-neutral-900 dark:text-white">
                                Service <span className="text-gradient">Pricelist</span>
                            </h2>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
                                Daftar harga jasa servis standard, porting polish, hingga bore-up paket harian di bengkel 2MM Auto.
                            </p>
                        </div>
                        <Pricelist />
                    </section>
                )}

                {activePage === 'about' && (
                    <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                        <div className="space-y-4 mb-12">
                            <h2 className="h-premium text-4xl sm:text-5xl uppercase tracking-tight text-neutral-900 dark:text-white">
                                About & <span className="text-gradient">Contact</span>
                            </h2>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
                                Profil bengkel independen presisi tinggi di bawah naungan NeflaLabs dan formulir konsultasi paddock.
                            </p>
                        </div>
                        <AboutContact />
                    </section>
                )}
            </div>

            {/* === FOOTER === */}
            <footer className="relative z-10 border-t border-black/5 dark:border-white/5 py-16 bg-neutral-50 dark:bg-black/40 mt-auto">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                    <div className="space-y-6 text-left">
                        <div>
                            <h4 className="h-premium text-xl mb-1 text-neutral-900 dark:text-white">2MM <span className="text-racing-red">AUTO</span></h4>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.4em]">by NeflaLabs</p>
                        </div>
                        <p className="text-sm text-neutral-500 leading-relaxed italic max-w-xs">
                            Bengkel independen spesialis motor kenceng. Mengedepankan presisi dan kepuasan rider di atas segalanya.
                        </p>
                    </div>

                    <div className="space-y-4 text-left">
                        <h5 className="text-[10px] font-black tracking-[0.3em] text-neutral-450 uppercase">Explore Paddock</h5>
                        <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider">
                            <li>
                                <button onClick={() => navigateTo('home')} className="text-neutral-400 hover:text-racing-red transition-colors cursor-pointer">Home</button>
                            </li>
                            <li>
                                <button onClick={() => navigateTo('toolbox')} className="text-neutral-400 hover:text-racing-red transition-colors cursor-pointer">Toolbox</button>
                            </li>
                            <li>
                                <button onClick={() => navigateTo('pricelist')} className="text-neutral-400 hover:text-racing-red transition-colors cursor-pointer">Pricelist</button>
                            </li>
                            <li>
                                <button onClick={() => navigateTo('about')} className="text-neutral-400 hover:text-racing-red transition-colors cursor-pointer">About & Contact</button>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6 md:text-right text-left">
                        <h5 className="text-[10px] font-black tracking-[0.3em] text-neutral-450 uppercase md:ml-auto">Operational Hours</h5>
                        <div className="inline-block text-left p-6 glass-panel rounded-3xl border-racing-red/10 bg-neutral-100/50 dark:bg-neutral-950/20">
                            <p className="h-premium text-2xl text-racing-red">BY APPOINTMENT</p>
                            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">No walk-ins for major repairs</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold text-neutral-450 uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} 2MM AUTO. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-8">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-neutral-400 hover:text-racing-red uppercase tracking-widest">Instagram</a>
                        <a href="https://wa.me/yournum" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-neutral-400 hover:text-racing-red uppercase tracking-widest">WhatsApp</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
