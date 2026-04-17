import React, { useState, useEffect } from 'react';
import { AdminAPI } from '../../services/adminApi';
import { MapPin, Loader2, History } from 'lucide-react';

const IncidentLogs = () => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadIncidents();
    }, []);

    const loadIncidents = async (search = '') => {
        setLoading(true);
        try {
            const res = await AdminAPI.getIncidents(search);
            if (res.success) {
                setIncidents(res.data.incidents || res.data || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-800">Incident Logs</h2>

            {loading ? (
                <div className="py-20 text-center text-slate-400">
                    <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-slate-200" />
                    Retrieving history...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {incidents.length > 0 ? incidents.map(incident => (
                        <div key={incident._id} className="bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-lg transition cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest">{incident.type}</div>
                                <span className="text-[10px] text-slate-400 font-bold">{new Date(incident.createdAt).toLocaleTimeString()}</span>
                            </div>
                            <h4 className="font-bold text-slate-800 mb-2">{incident.userName}</h4>
                            <p className="text-xs text-slate-500 line-clamp-2 mb-4 italic">"{incident.description || 'No description provided'}"</p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                                <MapPin className="w-3 h-3 text-red-500" />
                                {incident.location?.address || 'View Details'}
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-20 text-center text-slate-400 italic">No incident reports found.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default IncidentLogs;
