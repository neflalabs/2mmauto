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
    MapPin
} from 'lucide-react';

// --- STATUS INDICATOR COMPONENT ---
const StatusIndicator = () => {
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const moods = [
            { text: "Operational", color: "text-green-500", bg: "bg-green-500/10", message: "Ready for speed.", detail: "Pit building open" },
            { text: "Pit Stop", color: "text-red-500", bg: "bg-red-500/10", message: "Mekanik lagi push rank.", detail: "Restricted access" },
            { text: "Warm Up", color: "text-orange-500", bg: "bg-orange-500/10", message: "Hanya terima servis ringan.", detail: "Limited capacity" },
            { text: "Gabut Mode", color: "text-purple-500", bg: "bg-purple-500/10", message: "Nongkrong only, servis nanti.", detail: "Social hours" }
        ];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        setTimeout(() => setStatus(randomMood), 1000);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

// --- TESTIMONIAL COMPONENT ---
const Testimonial = ({ quote, author, tag }) => {
    return (
        <div className="premium-card glass-panel p-6 border-l-4 border-l-racing-red/20 hover:border-l-racing-red transition-all duration-500">
            <p className="text-neutral-700 dark:text-neutral-300 italic mb-6 leading-relaxed">
                "{quote}"
            </p>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">{author}</p>
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{tag}</p>
                </div>
                <MessageSquare size={16} className="opacity-10" />
            </div>
        </div>
    );
};

// --- THEME TOGGLE COMPONENT ---
const ThemeToggle = ({ theme, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-racing-red transition-colors duration-300"
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

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0A0A0A] selection:bg-racing-red selection:text-white transition-colors duration-500">
            {/* Background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-racing-red/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-racing-red/5 blur-[120px] rounded-full"></div>
            </div>

            {/* === NAVIGATION === */}
            <nav className="relative z-50 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
                <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
                <div className="flex items-center gap-6">
                    <a href="#lokasi" className="hidden sm:flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-400 hover:text-racing-red transition-colors uppercase">
                        <MapPin size={12} /> Find Us
                    </a>
                    <ThemeToggle theme={theme} onToggle={() => setTheme(p => p === 'light' ? 'dark' : 'light')} />
                </div>
            </nav>

            {/* === HERO SECTION === */}
            <header className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <StatusIndicator />
                    
                    <h2 className="mt-12 h-premium text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter">
                        PRECISION <br className="hidden md:block" /> 
                        <span className="text-gradient">GARAGE</span>
                    </h2>
                    
                    <div className="mt-12 max-w-2xl">
                        <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed italic">
                            "Kerja keras itu tipes, kerja cerdas itu <span className="text-racing-red font-bold">prioritas</span>."
                        </p>
                        <p className="mt-6 text-sm text-neutral-400 leading-relaxed">
                            Bengkel motor independen dengan standar kenceng. 
                            Kami hanya fokus pada kualitas, bukan kuantitas. 
                            Buka saat fokus, tutup saat istirahat.
                        </p>
                    </div>

                    <div className="mt-12 flex flex-wrap justify-center sm:justify-start gap-4">
                        <a href="https://wa.me/yournum" className="px-8 py-4 bg-racing-red text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 transition-transform shadow-red-glow">
                            Book a Slot <ArrowRight size={16} />
                        </a>
                        <div className="px-8 py-4 glass-panel rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-3">
                            <Timer size={16} /> EST. 2024
                        </div>
                    </div>
                </div>
            </header>

            {/* === CONTENT SECTION === */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Services */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-4 mb-12">
                            <span className="h-premium text-4xl text-racing-red opacity-10 leading-none">01</span>
                            <h3 className="h-premium text-3xl uppercase tracking-tight">Technical Menu</h3>
                        </div>
                        <Services />
                    </div>

                    {/* Testimonials */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-4 mb-12">
                            <span className="h-premium text-4xl text-racing-red opacity-10 leading-none">02</span>
                            <h3 className="h-premium text-3xl uppercase tracking-tight">Paddock Talk</h3>
                        </div>
                        <div className="space-y-4">
                            <Testimonial quote="Dateng jam 9 pagi, mekaniknya telat. Tapi motor gua jadi kenceng parah. Worth it." author="Budi" tag="Supra User" />
                            <Testimonial quote="Bengkel paling jujur. Kalo males ngerjain langsung bilang skip, nggak nahan motor." author="Siska" tag="Scooter Rider" />
                            <Testimonial quote="Tempat nongkrong asik, mekaniknya paham bgt settingan harian maupun balap." author="Joni" tag="Speed Hunter" />
                        </div>
                    </div>
                </div>
            </main>

            {/* === FOOTER === */}
            <footer id="lokasi" className="relative z-10 border-t border-black/5 dark:border-white/5 py-24 bg-neutral-50 dark:bg-black/40">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
                    <div className="space-y-6">
                        <div>
                            <h4 className="h-premium text-xl mb-1">2MM <span className="text-racing-red">AUTO</span></h4>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.4em]">by NeflaLabs</p>
                        </div>
                        <p className="text-sm text-neutral-500 leading-relaxed italic max-w-xs">
                            Bengkel independen spesialis motor kenceng. Mengedepankan presisi dan kepuasan rider di atas segalanya.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h5 className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase">Contact & Location</h5>
                        <div className="space-y-4">
                            <p className="text-lg font-bold text-neutral-800 dark:text-neutral-200">South Garage District</p>
                            <p className="text-xs text-neutral-500 flex items-center gap-2">
                                <Flag size={14} className="text-racing-red" />
                                Patokan: Gerbang Oranye STIHL
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 md:text-right">
                        <h5 className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase md:ml-auto">Operational Hours</h5>
                        <div className="inline-block text-left p-6 glass-panel rounded-3xl border-racing-red/10">
                            <p className="h-premium text-2xl text-racing-red">BY APPOINTMENT</p>
                            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">No walk-ins for major repairs</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-24 pt-12 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} 2MM AUTO. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-[10px] font-bold text-neutral-400 hover:text-racing-red uppercase tracking-widest">Instagram</a>
                        <a href="#" className="text-[10px] font-bold text-neutral-400 hover:text-racing-red uppercase tracking-widest">WhatsApp</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
