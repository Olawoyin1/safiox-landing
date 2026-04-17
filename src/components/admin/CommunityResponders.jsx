import React, { useState, useEffect } from 'react';
import { AdminAPI } from '../../services/adminApi';
import { User, Star, Phone, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CommunityResponders = () => {
    const [responders, setResponders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadResponders();
    }, [filter]);

    const loadResponders = async () => {
        setLoading(true);
        try {
            let params = [];
            if (filter !== 'all') params.push(`verified=${filter === 'verified'}`);
            const res = await AdminAPI.getResponders(params.join('&'));
            if (res.success) {
                setResponders(res.data.responders || res.data || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (id, status) => {
        try {
            const res = await AdminAPI.verifyResponder(id, status);
            if (res.success) {
                toast.success(status ? 'Verified' : 'Unverified');
                loadResponders();
            }
        } catch (err) {
            toast.error('Action failed');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Community Responders</h2>
                    <p className="text-slate-400 text-sm">Verified citizens ready to assist in emergencies</p>
                </div>
                <div className="flex gap-2">
                    {['all', 'verified', 'unverified'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition ${filter === f ? 'bg-safiox-dark text-white' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="py-20 text-center text-slate-400">
                    <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-slate-200" />
                    Loading community network...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {responders.length > 0 ? responders.map(r => (
                        <div key={r._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition group">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-red-50 transition duration-500">
                                    <User className="w-6 h-6 text-slate-400 group-hover:text-red-500 transition duration-500" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="font-bold text-slate-800 truncate">{r.userId?.name}</h4>
                                    <p className="text-xs text-slate-400 truncate">{r.specialty || 'General Responder'}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${r.verified ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {r.verified ? 'Verified' : 'Pending'}
                                    </span>
                                    <div className="flex items-center mt-1">
                                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                        <span className="text-xs font-bold ml-1">{r.rating || '0.0'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="bg-slate-50 p-3 rounded-2xl">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Responses</p>
                                    <p className="text-sm font-bold">{r.totalResponses || 0}</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-2xl">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                    <p className={`text-sm font-bold ${r.available ? 'text-emerald-500' : 'text-slate-400'}`}>
                                        {r.available ? 'Online' : 'Offline'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleVerify(r._id, !r.verified)}
                                    className={`flex-1 py-3 ${r.verified ? 'bg-slate-100 text-slate-600' : 'bg-safiox-red text-white'} text-xs font-bold rounded-xl transition active:scale-95`}
                                >
                                    {r.verified ? 'Unverify' : 'Verify Account'}
                                </button>
                                <button onClick={() => window.open(`tel:${r.userId?.phone}`)} className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition">
                                    <Phone className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-20 text-center text-slate-400 italic">No community responders found.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CommunityResponders;
