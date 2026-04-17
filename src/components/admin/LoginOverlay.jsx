import React, { useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { AdminAPI } from '../../services/adminApi';
import toast from 'react-hot-toast';

const LoginOverlay = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await AdminAPI.login(email, password);
            if (res.success && res.data.accessToken) {
                localStorage.setItem('safiox_admin_token', res.data.accessToken);
                toast.success('Welcome back, Admin!');
                onLogin();
            } else {
                toast.error(res.message || 'Login failed');
            }
        } catch (err) {
            toast.error('Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xl transition-all duration-500">
            <div className="w-full max-w-md p-10 bg-white rounded-[3rem] shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-20 h-20 bg-safiox-red rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-red-500/40 mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
                        <ShieldCheck className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Safiox Admin</h2>
                    <p className="text-slate-400 mt-2 font-medium">Secure Authorization Gateway</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            defaultValue="admin@safiox.com"
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-safiox-red focus:outline-none transition-all duration-300"
                            placeholder="admin@safiox.com"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Passcode</label>
                        <input
                            name="password"
                            type="password"
                            required
                            defaultValue="admin123"
                            className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-safiox-red focus:outline-none transition-all duration-300"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-safiox-red text-white text-sm font-black rounded-2xl hover:bg-red-600 transition-all duration-300 shadow-xl shadow-red-500/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'UNSHACKLE ACCESS'}
                    </button>
                </form>

                <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-10">Protected by Safiox Guardian Encryption</p>
            </div>
        </div>
    );
};

export default LoginOverlay;
