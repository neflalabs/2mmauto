import React, { useState } from 'react';
import { Send, MapPin, Flag, Phone, Mail, Instagram, ArrowRight, CheckCircle2 } from 'lucide-react';

const AboutContact = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [motor, setMotor] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submission
        if (name && motor && message) {
            setFormSubmitted(true);
            setTimeout(() => {
                setFormSubmitted(false);
                setName('');
                setMotor('');
                setMessage('');
            }, 3000);
        }
    };

    return (
        <div className="space-y-16">
            {/* About Section */}
            <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-racing-red/10 border border-racing-red/20 text-racing-red">
                        <span className="w-1.5 h-1.5 rounded-full bg-racing-red animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-widest">ABOUT NEFLALABS</span>
                    </div>
                    <h2 className="h-premium text-4xl sm:text-5xl leading-tight">
                        MEMBANTU MOTOR HARIAN TERASA <span className="text-gradient">SEPERTI MOTOR BALAP</span>
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        Dilahirkan dari passion mendalam terhadap mesin motor presisi tinggi pada tahun 2024, <strong>2MM AUTO</strong> beroperasi di bawah payung <strong>NeflaLabs</strong>. Kami tidak mengejar kuantitas pengerjaan motor yang masuk setiap hari. Kami hanya menerima proyek servis dan modifikasi terpilih untuk memastikan detail terkecil pun tidak terlewatkan.
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        Kami menjunjung tinggi kejujuran mekanik: jika pekerjaan dirasa terlalu berisiko atau di luar keahlian kami (seperti kelistrikan rakitan ekstrim), kami akan merekomendasikan spesialis terbaik tanpa menahan motor pelanggan.
                    </p>
                    
                    {/* Nilai Utama */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        {[
                            { title: "Standard Presisi 2mm", desc: "Toleransi pengukuran sangat ketat untuk kompresi dan clearance klep yang optimal." },
                            { title: "Paddock Hospitality", desc: "Tempat nongkrong yang asik dengan atmosfer kekeluargaan yang erat bagi para speed-hunter." }
                        ].map((item, idx) => (
                            <div key={idx} className="p-5 glass-panel rounded-2xl border border-black/5 dark:border-white/5 space-y-2">
                                <h4 className="font-extrabold text-xs uppercase text-neutral-900 dark:text-white tracking-wider">{item.title}</h4>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* About Specs/Visual */}
                <div className="lg:col-span-5 relative">
                    <div className="premium-card glass-panel p-8 border border-black/5 dark:border-white/5 space-y-6 relative overflow-hidden bg-neutral-50/50 dark:bg-neutral-950/20">
                        {/* Background racing number */}
                        <div className="absolute right-[-15px] bottom-[-30px] text-neutral-200/40 dark:text-neutral-900/40 font-black text-[180px] leading-none pointer-events-none select-none font-display">
                            2M
                        </div>
                        
                        <div className="relative z-10 space-y-4">
                            <h3 className="h-premium text-2xl text-neutral-950 dark:text-white uppercase tracking-tight">The Garage Rules</h3>
                            <div className="space-y-3.5">
                                {[
                                    "Servis berat wajib booking slot terlebih dahulu.",
                                    "Konsultasi gratis asal bawa kopi atau gorengan.",
                                    "Tidak melayani pengerjaan terburu-buru.",
                                    "Mekanik berhak menolak proyek jika terlalu banyak antrean."
                                ].map((rule, idx) => (
                                    <div key={idx} className="flex gap-3 items-start">
                                        <CheckCircle2 size={16} className="text-racing-red shrink-0 mt-0.5" />
                                        <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">{rule}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact & Location Section */}
            <div className="grid lg:grid-cols-12 gap-12 pt-8">
                {/* Contact Info & Location */}
                <div className="lg:col-span-6 space-y-8 text-left">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-racing-red/10 border border-racing-red/20 text-racing-red">
                            <span className="w-1.5 h-1.5 rounded-full bg-racing-red"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest">GET IN TOUCH</span>
                        </div>
                        <h3 className="h-premium text-3xl uppercase tracking-tight text-neutral-900 dark:text-white">Paddock Headquarter</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            Silakan kunjungi kami atau hubungi admin untuk melakukan konsultasi mekanis secara online.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <a href="tel:+628123456789" className="flex items-center gap-4 p-4.5 glass-panel rounded-2xl border border-black/5 dark:border-white/5 hover:border-racing-red/30 transition-all duration-300 group">
                            <div className="w-10 h-10 rounded-xl bg-racing-red text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Phone size={18} />
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">WhatsApp / Call</p>
                                <p className="text-sm font-bold text-neutral-900 dark:text-white">+62 812-3456-789</p>
                            </div>
                        </a>

                        <a href="mailto:admin@2mmauto.com" className="flex items-center gap-4 p-4.5 glass-panel rounded-2xl border border-black/5 dark:border-white/5 hover:border-racing-red/30 transition-all duration-300 group">
                            <div className="w-10 h-10 rounded-xl bg-racing-red text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Mail size={18} />
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Email Support</p>
                                <p className="text-sm font-bold text-neutral-900 dark:text-white">admin@neflalabs.com</p>
                            </div>
                        </a>

                        <div className="flex items-center gap-4 p-4.5 glass-panel rounded-2xl border border-black/5 dark:border-white/5">
                            <div className="w-10 h-10 rounded-xl bg-racing-red text-white flex items-center justify-center">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Address</p>
                                <p className="text-sm font-bold text-neutral-900 dark:text-white">South Garage District, DKI Jakarta</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 glass-panel rounded-3xl border border-racing-red/20 space-y-3 bg-racing-red/5">
                        <div className="flex items-center gap-2 text-racing-red font-black text-[10px] tracking-widest uppercase">
                            <Flag size={14} /> Patokan Lokasi
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-semibold">
                            Masuk lewat gang samping ruko utama, cari rumah dengan <strong className="text-racing-red">Gerbang Oranye STIHL</strong>. Parkir di dalam paddock.
                        </p>
                    </div>
                </div>

                {/* Booking / Message Form */}
                <div className="lg:col-span-6">
                    <div className="premium-card glass-panel p-8 border border-black/5 dark:border-white/5">
                        <h4 className="h-premium text-2xl uppercase tracking-tight text-neutral-900 dark:text-white mb-2 text-left">
                            Kirim Pesan Servis
                        </h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-8 text-left leading-relaxed">
                            Punya keluhan mesin atau ingin bore-up? Tuliskan rencana spesifikasi Anda di bawah ini, kami akan hubungi kembali.
                        </p>

                        {formSubmitted ? (
                            <div className="py-16 text-center space-y-4 flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center animate-bounce">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h5 className="font-bold text-neutral-900 dark:text-white text-lg">Pesan Terkirim!</h5>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs">
                                    Terima kasih. Mekanik kami akan segera menganalisis permintaan Anda dan menghubungi via WA.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5 text-left">
                                <div>
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 px-1">Nama Pemilik</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Nama Lengkap"
                                        className="w-full bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5 text-neutral-900 dark:text-white rounded-2xl px-5 py-3.5 text-sm font-semibold outline-none focus:border-racing-red transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 px-1">Tipe Motor / Tahun</label>
                                    <input
                                        type="text"
                                        required
                                        value={motor}
                                        onChange={(e) => setMotor(e.target.value)}
                                        placeholder="Contoh: BeAT FI 2018 / NMAX 2021"
                                        className="w-full bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5 text-neutral-900 dark:text-white rounded-2xl px-5 py-3.5 text-sm font-semibold outline-none focus:border-racing-red transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 px-1">Spesifikasi Impian / Keluhan</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Tulis keluhan mesin atau spesifikasi mesin impian Anda secara detail di sini..."
                                        className="w-full bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/5 text-neutral-900 dark:text-white rounded-2xl px-5 py-3.5 text-sm font-semibold outline-none focus:border-racing-red transition-all duration-300 resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4.5 bg-racing-red hover:bg-red-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-colors duration-300 shadow-red-glow cursor-pointer"
                                >
                                    Kirim ke Paddock <Send size={14} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutContact;
