import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2, Eye, EyeOff } from 'lucide-react';
import { AdminAPI } from '../services/adminApi';
import toast from 'react-hot-toast';

const AdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('safiox_admin_token')) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [navigate]);

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
                navigate('/admin/dashboard', { replace: true });
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
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
            <div className="w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-red-500/40 mb-6">
                        <ShieldCheck className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Safiox Admin</h2>
                    <p className="text-slate-400 mt-2 font-medium">Secure Authorization Gateway</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            autoComplete="off"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                            placeholder="admin@safiox.com"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Passcode</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="new-password"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 pr-12 text-sm font-bold text-slate-600 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(v => !v)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-black py-4 rounded-xl transition flex items-center justify-center gap-2"
                    >
                        {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</> : 'Access Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
