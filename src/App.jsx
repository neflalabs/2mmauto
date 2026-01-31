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
        <div className="relative w-24 h-12 mx-auto mb-4">
            <div className="absolute inset-0 rounded-t-full overflow-hidden"
                style={{
                    background: 'conic-gradient(from 180deg at 50% 100%, #00ff88, #ffcc00, #ff6b00, #ff0000)'
                }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-18 h-9 rounded-t-full"
                    style={{ background: 'var(--bg-main)' }}></div>
            </div>
            <div className="absolute bottom-0 left-1/2 w-0.5 h-9 origin-bottom rounded-full"
                style={{
                    background: 'linear-gradient(to top, #ff0000, #ff6b00)',
                    transform: `translateX(-50%) rotate(${rotation}deg)`,
                    transition: 'transform 1s ease-out'
                }}></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-neutral-900 dark:bg-white border-2 border-orange-500"></div>
        </div>
    );
};

// --- STATUS BADGE COMPONENT ---
const StatusBadge = () => {
    const [status, setStatus] = useState("loading");
    const [meterValue, setMeterValue] = useState(0);

    useEffect(() => {
        const moods = [
            { text: "BUKA (Mungkin)", color: "from-green-500 to-emerald-600", message: "Lagi butuh duit, sini mampir.", meter: 85 },
            { text: "PIT STOP", color: "from-red-600 to-red-700", message: "Mekanik lagi push rank. Jangan ganggu.", meter: 0 },
            { text: "WARM UP", color: "from-yellow-500 to-orange-500", message: "Cuma terima ganti oli, yang susah skip.", meter: 40 },
            { text: "GABUT MODE", color: "from-purple-500 to-violet-600", message: "Sini nongkrong aja, servis nanti dulu.", meter: 20 }
        ];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        setStatus(randomMood);

        setTimeout(() => {
            setMeterValue(randomMood.meter);
        }, 500);
    }, []);

    if (status === "loading") return (
        <div className="flex h-20 items-center justify-center">
            <div className="relative">
                <Loader2 className="animate-spin text-orange-500" size={32} />
                <div className="absolute inset-0 blur-lg bg-orange-500/30 rounded-full"></div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center">
            <Speedometer value={meterValue} />
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r blur-xl opacity-50 group-hover:opacity-70 transition-opacity"
                    style={{ background: `linear-gradient(135deg, var(--racing-red), var(--racing-orange))` }}></div>
                <span className={`relative px-6 py-3 rounded-sm bg-gradient-to-r ${status.color} text-white font-bold text-xl md:text-2xl uppercase tracking-wider shadow-2xl inline-block`}
                    style={{ fontFamily: "'Orbitron', sans-serif", clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}>
                    <Flag className="inline-block mr-2 -mt-1" size={20} />
                    {status.text}
                </span>
            </div>
            <p className="mt-4 text-neutral-500 dark:text-neutral-400 italic text-sm font-medium flex items-center gap-2">
                <Timer size={14} className="text-orange-500" />
                "{status.message}"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {jobs.map((job, idx) => {
                const IconComponent = job.icon;
                return (
                    <div key={idx}
                        className={`racing-card p-5 rounded-lg transition-all duration-300 hover:translate-x-1 hover:-translate-y-1 group cursor-default
                            ${job.accept
                                ? 'hover:shadow-lg hover:shadow-orange-500/10'
                                : 'opacity-60 hover:opacity-80'}`}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded flex items-center justify-center
                                    ${job.accept
                                        ? 'bg-gradient-to-br from-orange-500 to-red-600'
                                        : 'bg-neutral-700'}`}>
                                    <IconComponent size={18} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold tracking-wide uppercase"
                                    style={{ fontFamily: "'Orbitron', sans-serif" }}>{job.name}</h3>
                            </div>
                            {job.accept ?
                                <CheckCircle size={20} className="text-green-500 flex-shrink-0" /> :
                                <XCircle size={20} className="text-red-500 flex-shrink-0" />
                            }
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-sm
                                ${job.accept
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
                                style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}>
                                {job.mood}
                            </span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{job.desc}</p>

                        {/* Speed lines on hover */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex flex-col gap-1">
                                <div className="w-8 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
                                <div className="w-12 h-0.5 bg-gradient-to-r from-red-500 to-transparent"></div>
                                <div className="w-6 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// --- TESTIMONIAL COMPONENT ---
const Testimonial = ({ quote, author, borderColor }) => {
    return (
        <div className={`racing-card p-6 rounded-lg relative overflow-hidden hover:translate-x-1 transition-transform duration-300`}
            style={{ borderLeft: `4px solid ${borderColor}` }}>
            <div className="absolute -right-4 -bottom-4 opacity-5">
                <MessageSquare size={80} />
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 italic text-base leading-relaxed relative z-10">"{quote}"</p>
            <p className="text-neutral-500 text-xs mt-4 font-bold uppercase tracking-widest flex items-center gap-2">
                <Flag size={12} className="text-orange-500" />
                {author}
            </p>
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
        const hour = new Date().getHours();
        return (hour >= 6 && hour < 18) ? 'light' : 'dark';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={`min-h-screen relative overflow-hidden flex flex-col transition-colors duration-400
            ${theme === 'dark' ? 'dark bg-[#0a0a0a] text-white' : 'bg-neutral-100 text-neutral-900'}`}>

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Racing gradient orbs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
                    style={{ background: 'radial-gradient(circle, #ff0000, transparent)' }}></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
                    style={{ background: 'radial-gradient(circle, #ff6b00, transparent)' }}></div>

                {/* Grid lines */}
                <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(var(--text-main) 1px, transparent 1px), linear-gradient(90deg, var(--text-main) 1px, transparent 1px)',
                        backgroundSize: '100px 100px'
                    }}></div>

                {/* Checkered flag corner */}
                <div className="absolute top-0 left-0 w-40 h-40 checkered-pattern opacity-30"></div>
            </div>

            {/* Noise overlay */}
            <div className="noise"></div>

            {/* === NAVBAR === */}
            <nav className="relative z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-4">
                    {/* Logo */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-500 blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                        <div className="relative bg-gradient-to-br from-red-600 to-orange-500 p-2.5 rounded shadow-xl">
                            <Gauge className="text-white" size={24} />
                        </div>
                    </div>
                    <div>
                        <span className="text-2xl font-black tracking-wider uppercase block"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}>2MM AUTO</span>
                        <span className="text-[10px] text-neutral-500 uppercase tracking-[0.3em] font-semibold">Racing Garage</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <ThemeToggle theme={theme} onToggle={toggleTheme} />
                    <a href="#lokasi"
                        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 
                            hover:border-orange-500 hover:text-orange-500 transition-all text-sm font-bold uppercase tracking-widest">
                        <Flag size={14} />
                        LOKASI
                    </a>
                </div>
            </nav>

            {/* === HERO SECTION === */}
            <main className="relative z-10 flex-grow px-6 pb-16">
                <div className="max-w-7xl mx-auto text-center pt-8 md:pt-12">

                    {/* Status Badge */}
                    <StatusBadge />

                    {/* Main Title */}
                    <div className="mt-4 mb-3 relative">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl leading-none tracking-tight uppercase font-black"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}>
                            BENGKEL <span className="relative inline-block">
                                <span className="relative z-10 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                                    GABUT
                                </span>
                                {/* Glow effect behind text */}
                                <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent blur-2xl opacity-50">
                                    GABUT
                                </span>
                            </span>
                        </h1>
                    </div>

                    {/* Tagline */}
                    <div className="relative inline-block mb-4">
                        <div className="pit-lane-divider absolute -bottom-2 left-0 right-0"></div>
                        <h2 className="text-sm md:text-lg text-neutral-600 dark:text-neutral-400 font-bold uppercase tracking-[0.2em] px-4">
                            KERJA KERAS ITU TIPES, KERJA CERDAS ITU SKIP.
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Kami adalah <span className="text-orange-500 font-bold">bengkel motor independen</span>.
                        Sangat independen sampai-sampai kami bebas milih mau benerin motor lu atau nggak.
                        <span className="block mt-1 text-neutral-500">Buka kalau bangun, tutup kalau ngantuk.</span>
                    </p>

                    {/* === CONTENT GRID === */}
                    <div className="grid lg:grid-cols-12 gap-12 text-left">

                        {/* Services Section */}
                        <div className="lg:col-span-7">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <AlertTriangle className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl tracking-wide uppercase font-black"
                                        style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                        PIT MENU
                                    </h3>
                                    <p className="text-xs text-neutral-500 uppercase tracking-widest">Daftar Kerjaan</p>
                                </div>
                            </div>
                            <Services />
                        </div>

                        {/* Testimonials Section */}
                        <div className="lg:col-span-5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                    <MessageSquare className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl tracking-wide uppercase font-black"
                                        style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                        PADOCK TALK
                                    </h3>
                                    <p className="text-xs text-neutral-500 uppercase tracking-widest">Testimoni Jujur</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Testimonial
                                    quote="Dateng jam 9 pagi, mekaniknya masih tidur di atas kompresor. Tapi motor gua jadi kenceng sih."
                                    author="Budi, Pengguna Supra"
                                    borderColor="#ff6b00"
                                />
                                <Testimonial
                                    quote="Mau benerin rem malah disuruh beli gorengan dulu. Bintang 5 karena gorengannya enak."
                                    author="Siska, Beat User"
                                    borderColor="#ff0000"
                                />
                                <Testimonial
                                    quote="Gak sengaja mampir karena ban bocor, malah dikasih kopi doang ban gak dibenerin. Mantap."
                                    author="Joni, NMAX Player"
                                    borderColor="#0066ff"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* === FOOTER === */}
            <footer id="lokasi" className="relative z-10 border-t border-neutral-200 dark:border-neutral-800 py-16 px-6">
                {/* Checkered flag decoration */}
                <div className="absolute inset-x-0 top-0 h-2 finish-line opacity-50"></div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-gradient-to-br from-red-600 to-orange-500 p-2 rounded">
                                    <Gauge className="text-white" size={20} />
                                </div>
                                <span className="text-2xl font-black tracking-wider uppercase"
                                    style={{ fontFamily: "'Orbitron', sans-serif" }}>2MM AUTO</span>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-4 font-medium">
                                Jl. Entah Dimana No. 2
                            </p>
                            <p className="text-neutral-500 text-sm flex items-center gap-2">
                                <Flag size={14} className="text-orange-500" />
                                Patokan: Ada papan oranye tulisan hitam STIHL
                            </p>
                        </div>

                        <div className="text-left md:text-right">
                            <div className="inline-block bg-white dark:bg-neutral-900/80 backdrop-blur-sm rounded-lg p-6 border border-neutral-200 dark:border-neutral-800 shadow-lg">
                                <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-2">Jam Operasional</p>
                                <p className="text-lg font-bold text-orange-500" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                    KAPAN AJA<br />
                                    <span className="text-sm text-neutral-500">(kalo mood)</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center">
                        <p className="text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-widest font-bold">
                            &copy; {new Date().getFullYear()} 2MM Auto Racing Garage.
                            Jangan tuntut kami kalau motor lu makin kenceng tapi remnya blong.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
