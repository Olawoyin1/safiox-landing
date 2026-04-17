import React, { useState, useEffect } from 'react';
import { AdminAPI } from '../../services/adminApi';
import { AlertCircle, Phone, Clock, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const SosMonitoring = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAlerts();
        const interval = setInterval(loadAlerts, 10000); // Polling SOS alerts every 10s
        return () => clearInterval(interval);
    }, []);

    const loadAlerts = async () => {
        try {
            const res = await AdminAPI.getActiveSOS();
            if (res.success) {
                setAlerts(res.data.alerts || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleResolve = async (id) => {
        if (!confirm('Mark SOS as resolved?')) return;
        try {
            const res = await AdminAPI.resolveSOS(id);
            if (res.success) {
                toast.success('SOS alert resolved');
                loadAlerts();
            }
        } catch (err) {
            toast.error('Failed to resolve');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-800">SOS Monitoring</h2>

            {loading ? (
                <div className="py-20 text-center text-slate-400">
                    <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-slate-200" />
                    Checking for active distress signals...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {alerts.length > 0 ? alerts.map(alert => (
                        <div key={alert._id} className="bg-white border-2 border-red-50 rounded-3xl p-6 shadow-sm hover:shadow-md transition group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-200 group-hover:scale-110 transition duration-500">
                                        <AlertCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">{alert.userId?.name || 'Unknown User'}</h4>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{alert.trackingToken}</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-black rounded-full animate-pulse">LIVE SOS</span>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    {alert.userId?.phone || 'No phone'}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    Triggered: {new Date(alert.createdAt).toLocaleTimeString()}
                                </div>
                            </div>

                            <button
                                onClick={() => handleResolve(alert._id)}
                                className="w-full py-3 bg-safiox-dark text-white text-xs font-black rounded-xl hover:bg-slate-800 transition active:scale-95"
                            >
                                RESOLVE ALERT
                            </button>
                        </div>
                    )) : (
                        <div className="col-span-full p-20 text-center text-slate-400 border border-dashed border-slate-200 rounded-[2.5rem]">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheckIcon className="w-8 h-8 text-slate-200" />
                            </div>
                            <p className="font-bold text-slate-300">No active SOS alerts at this time.</p>
                            <p className="text-xs mt-1 text-slate-300">System is standing by...</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Simple icon placeholder if ShieldCheck is not exported or different name
const ShieldCheckIcon = (props) => (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
);

export default SosMonitoring;
