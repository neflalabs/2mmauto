import React, { useState, useEffect } from 'react';
import {
    Wrench,
    AlertTriangle,
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
    Settings
} from 'lucide-react';

// --- SPEEDOMETER COMPONENT ---
const Speedometer = ({ value = 0 }) => {
    const rotation = (value / 100) * 180 - 90;

    return (
        <div className="relative w-32 h-16 mx-auto mb-6 group">
            <svg viewBox="0 0 100 50" className="w-full h-full">
                <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-neutral-200 dark:text-neutral-800"
                />
                <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="url(#gauge-gradient)"
                    strokeWidth="8"
                    strokeDasharray="126"
                    strokeDashoffset={126 - (value / 100) * 126}
                    className="tachometer-dial"
                />
                <defs>
                    <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00ff88" />
                        <stop offset="40%" stopColor="#ffcc00" />
                        <stop offset="70%" stopColor="#ff6b00" />
                        <stop offset="100%" stopColor="#ff0033" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute bottom-0 left-1/2 w-1 h-12 origin-bottom -translate-x-1/2 rounded-full"
                style={{
                    background: 'linear-gradient(to top, var(--color-racing-red), transparent)',
                    transform: `translateX(-50%) rotate(${rotation}deg)`,
                    transition: 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}></div>
            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-black border-4 border-racing-red shadow-glow"></div>
        </div>
    );
};

// --- STATUS BADGE COMPONENT ---
const StatusBadge = () => {
    const [status, setStatus] = useState("loading");
    const [meterValue, setMeterValue] = useState(0);

    useEffect(() => {
        const moods = [
            { text: "BUKA (Mungkin)", color: "from-green-500/20 to-emerald-600/20", textColor: "text-green-500", border: "border-green-500/30", message: "Lagi butuh duit, sini mampir.", meter: 85 },
            { text: "PIT STOP", color: "from-red-600/20 to-red-700/20", textColor: "text-red-500", border: "border-red-500/30", message: "Mekanik lagi push rank. Jangan ganggu.", meter: 10 },
            { text: "WARM UP", color: "from-yellow-500/20 to-orange-500/20", textColor: "text-orange-500", border: "border-orange-500/30", message: "Cuma terima ganti oli, yang susah skip.", meter: 45 },
            { text: "GABUT MODE", color: "from-purple-500/20 to-violet-600/20", textColor: "text-purple-500", border: "border-purple-500/30", message: "Sini nongkrong aja, servis nanti dulu.", meter: 25 }
        ];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        setStatus(randomMood);

        setTimeout(() => {
            setMeterValue(randomMood.meter);
        }, 800);
    }, []);

    if (status === "loading") return (
        <div className="flex h-32 items-center justify-center">
            <div className="relative">
                <Loader2 className="animate-spin text-racing-red" size={40} />
                <div className="absolute inset-0 blur-xl bg-red-500/20 rounded-full"></div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center animate-float">
            <Speedometer value={meterValue} />
            <div className={`status-pill px-8 py-4 bg-gradient-to-r ${status.color} border ${status.border} backdrop-blur-md shadow-2xl relative overflow-hidden group`}>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-3 relative z-10">
                    <div className={`w-2 h-2 rounded-full bg-current ${status.textColor} shadow-[0_0_10px_currentColor] animate-pulse`}></div>
                    <span className={`h-premium text-2xl font-black italic tracking-tighter ${status.textColor}`}>
                        {status.text}
                    </span>
                </div>
            </div>
            <p className="mt-6 text-neutral-500 dark:text-neutral-400 text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                <Timer size={14} className="text-racing-red" />
                {status.message}
            </p>
        </div>
    );
};

// --- SERVICES COMPONENT ---
const Services = () => {
    const jobs = [
        { name: "Ganti Oli", mood: "Gas Terus", accept: true, desc: "Kerjaan paling gampang. Duit cepet.", icon: Fuel },
        { name: "Turun Mesin", mood: "Skip Dulu", accept: false, desc: "Ribet, pinggang sakit, lama.", icon: Settings },
        { name: "Pasang Aksesoris", mood: "Tergantung", accept: true, desc: "Asal bautnya gak sleg, gas aja.", icon: Wrench },
        { name: "Kelistrikan", mood: "Males", accept: false, desc: "Takut kesetrum, cari bengkel lain aja.", icon: Zap },
        { name: "Curhat Motor", mood: "Boleh", accept: true, desc: "Gratis, asal bawa gorengan/kopi.", icon: MessageSquare },
        { name: "Modif Hedon", mood: "Prioritas", accept: true, desc: "Nah ini baru semangat ngerjainnya.", icon: Gauge },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {jobs.map((job, idx) => {
                const IconComponent = job.icon;
                return (
                    <div key={idx}
                        className={`premium-card glass-panel p-6 rounded-2xl group cursor-default overflow-hidden
                            ${!job.accept ? 'opacity-60 grayscale-[0.5]' : ''}`}>

                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500
                                    ${job.accept
                                        ? 'bg-gradient-to-br from-racing-red to-racing-orange text-white shadow-glow'
                                        : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'}`}>
                                    <IconComponent size={24} />
                                </div>
                                <div>
                                    <h3 className="h-premium text-xl font-black italic tracking-tight">{job.name}</h3>
                                    <span className={`text-[10px] uppercase tracking-[0.2em] font-black 
                                        ${job.accept ? 'text-green-500' : 'text-red-500'}`}>
                                        {job.mood}
                                    </span>
                                </div>
                            </div>
                            {job.accept ?
                                <CheckCircle size={24} className="text-green-500/50" /> :
                                <XCircle size={24} className="text-red-500/50" />
                            }
                        </div>

                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-medium">
                            {job.desc}
                        </p>

                        <div className="absolute bottom-0 right-0 w-24 h-24 -mr-8 -mb-8 opacity-5 group-hover:opacity-10 transition-all duration-700 blur-sm">
                            <IconComponent size={96} />
                        </div>

                        {/* Progressive speed line */}
                        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-racing-red to-transparent w-0 group-hover:w-full transition-all duration-700"></div>
                    </div>
                );
            })}
        </div>
    );
};

// --- TESTIMONIAL COMPONENT ---
const Testimonial = ({ quote, author, color }) => {
    return (
        <div className="premium-card glass-panel p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <MessageSquare size={48} className={color.startsWith('#') ? '' : `text-${color}`} style={color.startsWith('#') ? { color: color } : {}} />
            </div>
            <p className="text-lg text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed relative z-10 italic">
                "{quote}"
            </p>
            <div className="mt-6 flex items-center gap-3">
                <div className={`w-8 h-1 rounded-full bg-gradient-to-r ${color.startsWith('#') ? '' : `from-${color}`} to-transparent`} style={color.startsWith('#') ? { background: `linear-gradient(to right, ${color}, transparent)` } : {}}></div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-neutral-500 group-hover:text-racing-red transition-colors">
                    {author}
                </p>
            </div>
        </div>
    );
};

// --- THEME TOGGLE COMPONENT ---
const ThemeToggle = ({ theme, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className={`relative w-16 h-8 rounded-full transition-all duration-300 cursor-pointer overflow-hidden
                ${theme === 'light'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                    : 'bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700'}`}
        >
            <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-300 flex items-center justify-center
                ${theme === 'light' ? 'left-9' : 'left-1'}`}>
                {theme === 'light'
                    ? <Sun size={14} className="text-orange-500" />
                    : <Moon size={14} className="text-slate-600" />
                }
            </div>

            {/* Stars for dark mode */}
            {theme === 'dark' && (
                <>
                    <div className="absolute right-3 top-2 w-1 h-1 rounded-full bg-white/60"></div>
                    <div className="absolute right-2 top-4 w-0.5 h-0.5 rounded-full bg-white/40"></div>
                    <div className="absolute right-5 top-3 w-0.5 h-0.5 rounded-full bg-white/50"></div>
                </>
            )}
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
        <div className="min-h-screen relative flex flex-col selection:bg-racing-red selection:text-white overflow-x-hidden">
            <div className="noise-overlay"></div>
            <div className="checkered-bg fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"></div>

            {/* Ambient Background Glows */}
            <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none"></div>

            {/* === NAVBAR === */}
            <nav className="relative z-50 px-8 py-8 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative w-14 h-14 glass-panel rounded-2xl flex items-center justify-center border-racing-red/20 group-hover:border-racing-red/50 transition-all duration-500">
                            <Gauge size={32} className="text-racing-red group-hover:rotate-[30deg] transition-transform duration-500" />
                        </div>
                    </div>
                    <div>
                        <h1 className="h-premium text-3xl font-black italic tracking-tighter leading-none">
                            2MM <span className="text-racing-red">AUTO</span>
                        </h1>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-[0.5em] font-black mt-1">
                            Racing Garage
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <ThemeToggle theme={theme} onToggle={() => setTheme(p => p === 'light' ? 'dark' : 'light')} />
                    <a href="#lokasi" className="hidden md:flex h-premium text-xs font-black italic tracking-widest text-neutral-500 hover:text-racing-red transition-colors items-center gap-2">
                        <Flag size={14} /> LOKASI
                    </a>
                </div>
            </nav>

            {/* === HERO SECTION === */}
            <main className="relative z-10 flex-grow px-8 pt-12 pb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <StatusBadge />

                        <div className="mt-12 relative inline-block">
                            <h2 className="h-premium text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter leading-[0.8] block">
                                BENGKEL <br />
                                <span className="text-gradient drop-shadow-2xl">GABUT</span>
                            </h2>
                            <div className="absolute -bottom-4 right-0 text-right hidden sm:block">
                                <div className="speed-stripe w-32 ml-auto mb-2 opacity-50"></div>
                                <p className="h-premium text-lg text-neutral-500 tracking-tighter italic font-black">
                                    EST. 2024
                                </p>
                            </div>
                        </div>

                        <p className="mt-16 text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 max-w-3xl mx-auto font-medium leading-relaxed italic">
                            "Kerja keras itu <span className="text-racing-red font-bold">tipes</span>, <br />
                            kerja cerdas itu <span className="text-neutral-900 dark:text-white font-black italic">skip</span>."
                        </p>
                        <p className="mt-6 text-sm text-neutral-400 dark:text-neutral-500 max-w-xl mx-auto font-medium">
                            Sangat independen sampai-sampai kami bebas milih mau benerin motor lu atau nggak.
                            Buka kalau bangun, tutup kalau ngantuk.
                        </p>
                    </div>

                    {/* === CONTENT GRID === */}
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Services */}
                        <div className="lg:col-span-7">
                            <div className="flex items-end gap-4 mb-10">
                                <span className="h-premium text-5xl font-black italic text-racing-red opacity-20 leading-none">01</span>
                                <h3 className="h-premium text-4xl font-black italic tracking-tight">PIT MENU</h3>
                            </div>
                            <Services />
                        </div>

                        {/* Testimonials */}
                        <div className="lg:col-span-5">
                            <div className="flex items-end gap-4 mb-10">
                                <span className="h-premium text-5xl font-black italic text-racing-red opacity-20 leading-none">02</span>
                                <h3 className="h-premium text-4xl font-black italic tracking-tight uppercase">Paddock Talk</h3>
                            </div>
                            <div className="space-y-6">
                                <Testimonial quote="Dateng jam 9 pagi, mekaniknya masih tidur di atas kompresor. Tapi motor gua jadi kenceng sih." author="Budi, Supra User" color="racing-red" />
                                <Testimonial quote="Mau benerin rem malah disuruh beli gorengan dulu. Bintang 5 karena gorengannya enak." author="Siska, Beat Player" color="racing-orange" />
                                <Testimonial quote="Gak sengaja mampir karena ban bocor, malah dikasih kopi doang. Mantap." author="Joni, NMAX Enthusiast" color="#0066ff" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* === FOOTER === */}
            <footer id="lokasi" className="relative z-10 glass-panel border-t-0 rounded-t-[3rem] py-24 px-8 mt-12 bg-white/50 dark:bg-black/50 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-racing-red/20 to-transparent"></div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                    <div className="space-y-8">
                        <div>
                            <h4 className="h-premium text-2xl font-black italic text-racing-red">2MM AUTO</h4>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-[0.5em] font-black">Racing Garage</p>
                        </div>
                        <p className="text-neutral-500 font-medium leading-relaxed max-w-xs italic">
                            Bengkel motor paling santai se-galaxy. Buka kalau bangun, tutup kalau ngantuk.
                            Jangan berharap banyak, tapi hasilnya biasanya kenceng.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h5 className="h-premium text-xs tracking-widest text-neutral-500 font-black">LOCATION</h5>
                        <div className="space-y-4">
                            <p className="text-xl font-bold italic text-neutral-800 dark:text-neutral-200">Jl. Entah Dimana No. 2</p>
                            <p className="text-sm text-neutral-500 flex items-center gap-2 font-medium italic">
                                <Flag size={14} className="text-racing-red" />
                                Patokan: Ada papan oranye tulisan hitam STIHL
                            </p>
                        </div>
                    </div>

                    <div className="lg:text-right space-y-6">
                        <h5 className="h-premium text-xs tracking-widest text-neutral-500 font-black lg:ml-auto">WORKING HOURS</h5>
                        <div className="premium-card glass-panel p-8 rounded-3xl inline-block text-left group">
                            <p className="h-premium text-3xl font-black italic text-racing-red group-hover:scale-105 transition-transform duration-500">KAPAN AJA</p>
                            <p className="text-xs text-neutral-500 font-black tracking-widest mt-2">(KALO MOODNYA ENAK)</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] text-neutral-400 font-black tracking-widest uppercase text-center md:text-left">
                        &copy; {new Date().getFullYear()} 2MM AUTO RACING GARAGE. NYAWA LU TANGGUNG JAWAB LU SENDIRI.
                    </p>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="w-4 h-4 checkered-bg opacity-20"></div>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
