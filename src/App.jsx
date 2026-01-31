import React, { useState, useEffect } from 'react';

import {
    Wrench,
    AlertTriangle,
    CheckCircle,
    XCircle,
    MessageSquare,
    Loader2,
    Sun,
    Moon
} from 'lucide-react';

// --- COMPONENTS ---

// Komponen Status Badge
const StatusBadge = () => {
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const moods = [
            { text: "BUKA (Mungkin)", color: "bg-green-500", message: "Lagi butuh duit, sini mampir." },
            { text: "TUTUP", color: "bg-red-500", message: "Mekanik lagi push rank. Jangan ganggu." },
            { text: "BUKA DIKIT", color: "bg-yellow-500", message: "Cuma terima ganti oli, yang susah skip." },
            { text: "GABUT", color: "bg-purple-500", message: "Sini nongkrong aja, servis nanti dulu." }
        ];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        setStatus(randomMood);
    }, []);

    if (status === "loading") return (
        <div className="flex h-8 items-center justify-center">
            <Loader2 className="animate-spin text-slate-500" size={20} />
        </div>
    );

    return (
        <div className="flex flex-col items-center">
            <span className={`px-5 py-2 rounded-full text-slate-900 font-black text-xl md:text-2xl uppercase transition-all duration-500 ${status.color} shadow-lg`}>
                {status.text}
            </span>
            <p className="mt-3 text-slate-500 dark:text-slate-400 italic text-sm font-medium">"{status.message}"</p>
        </div>
    );
};

// Komponen List Layanan
const Services = () => {
    const jobs = [
        { name: "Ganti Oli", mood: "Gas Terus", accept: true, desc: "Kerjaan paling gampang. Duit cepet." },
        { name: "Turun Mesin", mood: "Skip Dulu", accept: false, desc: "Ribet, pinggang sakit, lama." },
        { name: "Pasang Aksesoris", mood: "Tergantung", accept: true, desc: "Asal bautnya gak sleg, gas aja." },
        { name: "Kelistrikan", mood: "Males", accept: false, desc: "Takut kesetrum, cari bengkel lain aja." },
        { name: "Curhat Motor", mood: "Boleh", accept: true, desc: "Gratis, asal bawa gorengan/kopi." },
        { name: "Modif Hedon", mood: "Prioritas", accept: true, desc: "Nah ini baru semangat ngerjainnya." },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {jobs.map((job, idx) => (
                <div key={idx} className={`p-5 rounded-xl border transition-all hover:scale-[1.02] hover:shadow-xl ${job.accept
                    ? 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/40'
                    : 'border-red-100 bg-red-50/50 dark:border-red-900/20 dark:bg-red-900/5 opacity-60'
                    } hover:bg-slate-50 dark:hover:bg-slate-800/60`}>
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{job.name}</h3>
                        {job.accept ?
                            <CheckCircle size={18} className="text-green-500 flex-shrink-0" /> :
                            <XCircle size={18} className="text-red-500 flex-shrink-0" />
                        }
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[10px] uppercase tracking-widest font-black px-2 py-0.5 rounded ${job.accept ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
                            {job.mood}
                        </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{job.desc}</p>
                </div>
            ))}
        </div>
    );
};

// Komponen Form Interaktif - REMOVED

const App = () => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const checkTheme = () => {
            const hour = new Date().getHours();
            // Siang: 6 pagi - 6 sore (18:00)
            const isDay = hour >= 6 && hour < 18;
            setTheme(isDay ? 'light' : 'dark');
        };

        checkTheme();
        const interval = setInterval(checkTheme, 60000); // Cek tiap menit
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`${theme} min-h-screen transition-colors duration-500`}>
            <div className="min-h-screen relative overflow-hidden flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
                {/* Background decoration */}
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-yellow-500/10 dark:bg-yellow-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
                <div className="grain opacity-30 dark:opacity-100"></div>

                {/* Navbar */}
                <nav className="relative z-10 px-6 py-6 flex justify-between items-center max-w-6xl mx-auto w-full">
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-500 p-1.5 rounded shadow-lg">
                            <Wrench className="text-black" size={20} />
                        </div>
                        <span className="text-2xl font-bold tracking-tighter uppercase">2MM AUTO</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-300/50 dark:border-slate-700/50">
                            {theme === 'light' ?
                                <Sun size={14} className="text-orange-500" /> :
                                <Moon size={14} className="text-blue-400" />
                            }
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-70">
                                {theme === 'light' ? 'Day Mode' : 'Night Mode'}
                            </span>
                        </div>
                        <a href="#lokasi" className="text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-white text-sm font-black uppercase tracking-widest transition">DIMANA?</a>
                    </div>
                </nav>

                <main className="relative z-10 flex-grow px-6 pb-24">
                    <div className="max-w-6xl mx-auto text-center pt-24 md:pt-32">
                        <StatusBadge />

                        <h1 className="text-7xl md:text-9xl text-slate-900 dark:text-white mt-10 mb-4 leading-[0.85] tracking-tighter">
                            BENGKEL <span className="text-yellow-500">GABUT</span>
                        </h1>
                        <h2 className="text-xl md:text-3xl text-slate-500 dark:text-slate-500 mb-12 font-bold uppercase tracking-widest px-4">
                            KERJA KERAS ITU TIPES, KERJA CERDAS ITU SKIP.
                        </h2>

                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-20 leading-relaxed font-medium">
                            Kami adalah bengkel motor independen. Sangat independen sampai-sampai kami bebas milih mau benerin motor lu atau nggak. Buka kalau bangun, tutup kalau ngantuk.
                        </p>

                        <div className="grid lg:grid-cols-12 gap-16 text-left">
                            <div className="lg:col-span-7">
                                <div className="flex items-center gap-3 mb-2">
                                    <AlertTriangle className="text-yellow-500" size={28} />
                                    <h3 className="text-4xl text-slate-900 dark:text-white tracking-tighter">DAFTAR KERJAAN</h3>
                                </div>
                                <Services />
                            </div>

                            <div className="lg:col-span-5">
                                <div className="flex items-center gap-3 mb-8">
                                    <MessageSquare className="text-yellow-500" size={28} />
                                    <h3 className="text-4xl text-slate-900 dark:text-white tracking-tighter">TESTIMONI JUJUR</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-white dark:bg-slate-800/30 p-6 rounded-xl border-l-4 border-yellow-500 shadow-xl dark:shadow-none backdrop-blur-sm border border-slate-200 dark:border-transparent">
                                        <p className="text-slate-700 dark:text-slate-300 italic text-lg leading-relaxed">"Dateng jam 9 pagi, mekaniknya masih tidur di atas kompresor. Tapi motor gua jadi kenceng sih."</p>
                                        <p className="text-slate-500 text-sm mt-4 font-black uppercase tracking-widest">- Budi, Pengguna Supra</p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-800/30 p-6 rounded-xl border-l-4 border-red-500 shadow-xl dark:shadow-none backdrop-blur-sm border border-slate-200 dark:border-transparent">
                                        <p className="text-slate-700 dark:text-slate-300 italic text-lg leading-relaxed">"Mau benerin rem malah disuruh beli gorengan dulu. Bintang 5 karena gorengannya enak."</p>
                                        <p className="text-slate-500 text-sm mt-4 font-black uppercase tracking-widest">- Siska, Beat User</p>
                                    </div>
                                    <div className="bg-white dark:bg-slate-800/30 p-6 rounded-xl border-l-4 border-blue-500 shadow-xl dark:shadow-none backdrop-blur-sm border border-slate-200 dark:border-transparent">
                                        <p className="text-slate-700 dark:text-slate-300 italic text-lg leading-relaxed">"Gak sengaja mampir karena ban bocor, malah dikasih kopi doang ban gak dibenerin. Mantap."</p>
                                        <p className="text-slate-500 text-sm mt-4 font-black uppercase tracking-widest">- Joni, NMAX Player</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-10 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 text-center px-6">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-3xl text-slate-900 dark:text-white mb-2 tracking-tighter">2MM AUTO</h3>
                        <p className="text-slate-500 dark:text-slate-500 mb-6 font-medium">Jl. Entah Dimana No. 2 (Patokan: Ada papan oranye tulisan hitam STIHL)</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-700 uppercase tracking-widest font-bold">
                            &copy; {new Date().getFullYear()} 2MM Auto. Jangan tuntut kami kalau motor lu makin kenceng tapi remnya blong.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default App;
