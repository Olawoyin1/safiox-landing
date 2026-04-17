import React, { useEffect, useState } from 'react';
import {
    Users,
    AlertCircle,
    Building,
    CheckCircle2,
    Megaphone,
    Send,
    AlertTriangle,
    X
} from 'lucide-react';
import { AdminAPI } from '../../services/adminApi';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import toast from 'react-hot-toast';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DashboardOverview = () => {
    const navigate = useNavigate();
    const [activeSos, setActiveSos] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [trendData, setTrendData] = useState([]);
    const [trendLabels, setTrendLabels] = useState([]);
    const [trendDays, setTrendDays] = useState(7);
    const [allIncidents, setAllIncidents] = useState([]);
    const [showBroadcast, setShowBroadcast] = useState(false);
    const [broadcastMsg, setBroadcastMsg] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        loadActiveSos();
        AdminAPI.getAnalytics()
            .then(res => { if (res.success) setAnalytics(res.data.analytics); })
            .catch(() => {});
        loadIncidentTrend();
    }, []);

    useEffect(() => {
        buildTrend(allIncidents, trendDays);
    }, [trendDays, allIncidents]);

    const loadActiveSos = async () => {
        try {
            const res = await AdminAPI.getActiveSOS();
            if (res.success) setActiveSos(res.data.alerts);
        } catch (err) {
            console.error(err);
        }
    };

    const buildTrend = (incidents, days) => {
        const buckets = Array.from({ length: days }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (days - 1 - i));
            return d;
        });

        if (days === 7) {
            const labels = buckets.map(d => d.toLocaleDateString('en-US', { weekday: 'short' }));
            const counts = buckets.map(d => {
                const dayStr = d.toDateString();
                return incidents.filter(inc => new Date(inc.createdAt).toDateString() === dayStr).length;
            });
            setTrendLabels(labels);
            setTrendData(counts);
        } else {
            // Group 30 days into ~4-day chunks (8 points) for readability
            const chunkSize = 4;
            const chunks = [];
            for (let i = 0; i < buckets.length; i += chunkSize) {
                chunks.push(buckets.slice(i, i + chunkSize));
            }
            const labels = chunks.map(chunk => {
                const first = chunk[0];
                const last = chunk[chunk.length - 1];
                return `${first.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}–${last.toLocaleDateString('en-US', { day: 'numeric' })}`;
            });
            const counts = chunks.map(chunk =>
                chunk.reduce((sum, d) => {
                    const dayStr = d.toDateString();
                    return sum + incidents.filter(inc => new Date(inc.createdAt).toDateString() === dayStr).length;
                }, 0)
            );
            setTrendLabels(labels);
            setTrendData(counts);
        }
    };

    const loadIncidentTrend = async () => {
        try {
            const res = await AdminAPI.getIncidents();
            const incidents = res.data?.incidents || res.data || [];
            setAllIncidents(incidents);
            buildTrend(incidents, 7);
        } catch {
            setTrendLabels(['Mon','Tue','Wed','Thu','Fri','Sat','Sun']);
            setTrendData(Array(7).fill(0));
        }
    };

    const handleSendBroadcast = async () => {
        if (!broadcastMsg.trim()) return toast.error('Message cannot be empty');
        setSending(true);
        try {
            const res = await AdminAPI.sendBroadcast({ message: broadcastMsg });
            if (res.success) {
                toast.success('Broadcast sent successfully');
                setShowBroadcast(false);
                setBroadcastMsg('');
            }
        } catch {
            toast.error('Failed to send broadcast');
        } finally {
            setSending(false);
        }
    };

    const statCards = [
        { label: 'Total Users', value: analytics?.users?.total?.toLocaleString() || '-', icon: Users, color: 'blue', trend: '+12%' },
        { label: 'Active SOS', value: analytics?.sos?.active?.toString().padStart(2, '0') || '-', icon: AlertCircle, color: 'red', badge: 'ACTIVE' },
        { label: 'Organizations', value: analytics?.organizations?.total?.toLocaleString() || '-', icon: Building, color: 'indigo', badge: `${analytics?.organizations?.pending || 0} PENDING` },
        { label: 'Resolved Cases', value: analytics?.sos?.resolved?.toLocaleString() || '-', icon: CheckCircle2, color: 'emerald', badge: 'TOTAL' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Broadcast Modal */}
            {showBroadcast && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Send Global Alert</h3>
                            <button onClick={() => setShowBroadcast(false)} className="p-2 hover:bg-slate-100 rounded-xl transition"><X className="w-5 h-5" /></button>
                        </div>
                        <textarea
                            value={broadcastMsg}
                            onChange={e => setBroadcastMsg(e.target.value)}
                            placeholder="Type your emergency broadcast message..."
                            rows={4}
                            className="w-full border border-slate-200 rounded-xl p-4 text-sm outline-none focus:border-red-400 resize-none mb-4"
                        />
                        <div className="flex gap-3">
                            <button onClick={() => setShowBroadcast(false)} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition">Cancel</button>
                            <button onClick={handleSendBroadcast} disabled={sending} className="flex-1 py-3 bg-safiox-red text-white rounded-xl text-sm font-bold hover:bg-red-600 transition disabled:opacity-60 flex items-center justify-center gap-2">
                                <Send className="w-4 h-4" /> {sending ? 'Sending...' : 'Send Alert'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Broadcast Banner */}
            <div className="bg-safiox-dark rounded-3xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-safiox-border shadow-xl">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-500/20 text-red-500 rounded-2xl">
                        <Megaphone className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Emergency Broadcast</h3>
                        <p className="text-sm text-safiox-muted">Send urgent alerts to all users within a specific radius or region.</p>
                    </div>
                </div>
                <button onClick={() => setShowBroadcast(true)} className="w-full md:w-auto px-8 py-3 bg-safiox-red hover:bg-red-600 text-white font-bold rounded-xl transition shadow-lg shadow-red-500/30 flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Send Global Alert
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {statCards.map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            {stat.trend && <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>}
                            {stat.badge && <span className={`text-[10px] font-bold ${stat.color === 'red' ? 'text-red-500 bg-red-50' : stat.color === 'indigo' ? 'text-amber-500 bg-amber-50' : 'text-slate-400 bg-slate-50'} px-2 py-1 rounded-full uppercase`}>{stat.badge}</span>}
                        </div>
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                        <h3 className="text-2xl font-bold mt-1 text-slate-800">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Charts & Lists */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">Incident Trends</h3>
                            <p className="text-sm text-slate-400">{trendDays === 7 ? 'Weekly' : '30-day'} report of emergency activities</p>
                        </div>
                        <select
                            value={trendDays}
                            onChange={e => setTrendDays(Number(e.target.value))}
                            className="bg-slate-50 border-none rounded-lg text-xs font-bold px-3 py-2 outline-none cursor-pointer"
                        >
                            <option value={7}>Last 7 Days</option>
                            <option value={30}>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-64">
                        <Line
                            data={{
                                labels: trendLabels,
                                datasets: [{
                                    label: 'Incidents',
                                    data: trendData,
                                    borderColor: '#dc2626',
                                    tension: 0.4,
                                    fill: true,
                                    backgroundColor: 'rgba(220, 38, 38, 0.05)'
                                }]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: { beginAtZero: true, grid: { borderDash: [5, 5] } },
                                    x: { grid: { display: false } }
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold">Live Alerts</h3>
                        <button onClick={() => navigate('/admin/emergency')} className="text-xs font-bold text-safiox-red hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {activeSos.length > 0 ? activeSos.slice(0, 5).map((alert, i) => (
                            <div key={i} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-2xl transition cursor-pointer border border-transparent hover:border-slate-100">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <p className="text-sm font-bold">SOS Triggered</p>
                                        <span className="text-[10px] text-slate-400">Live</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{alert.userId?.name} needs help</p>
                                </div>
                            </div>
                        )) : (
                            <div className="py-12 text-center text-slate-300 text-xs italic">
                                No active alerts at this time.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
