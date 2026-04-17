import React, { useState, useEffect } from 'react';
import {
    Download,
    Plus,
    Eye,
    CheckCircle,
    Slash,
    ShieldCheck,
    Loader2,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { AdminAPI } from '../../services/adminApi';
import toast from 'react-hot-toast';

const OrganizationManagement = () => {
    const [orgs, setOrgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ status: 'all', type: '' });

    useEffect(() => {
        loadOrgs();
    }, [filters]);

    const loadOrgs = async () => {
        setLoading(true);
        try {
            let params = [];
            if (filters.status !== 'all') params.push(`status=${filters.status}`);
            if (filters.type) params.push(`type=${filters.type}`);

            const res = await AdminAPI.getOrganizations(params.join('&'));
            if (res.success) {
                const data = res.data.organizations || res.data.data || (Array.isArray(res.data) ? res.data : []);
                setOrgs(data);
            }
        } catch (err) {
            toast.error('Failed to load organizations');
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (id) => {
        const reason = prompt('Reason for rejection:');
        if (!reason) return;
        try {
            const res = await AdminAPI.rejectOrg(id, reason);
            if (res.success) {
                toast.success('Organization rejected');
                loadOrgs();
            }
        } catch (err) {
            toast.error(err.message || 'Rejection failed');
        }
    };

    const handleExportCSV = () => {
        if (!orgs.length) return toast.error('No data to export');
        const headers = ['Name', 'Email', 'Type', 'Status', 'Date Joined'];
        const rows = orgs.map(o => [
            o.name || '',
            o.email || '',
            o.type || '',
            o.verificationStatus || '',
            new Date(o.createdAt).toLocaleDateString()
        ]);
        const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'organizations.csv'; a.click();
        URL.revokeObjectURL(url);
    };
        if (!confirm('Approve this organization?')) return;
        try {
            const res = await AdminAPI.approveOrg(id);
            if (res.success) {
                toast.success('Organization approved');
                loadOrgs();
            }
        } catch (err) {
            toast.error(err.message || 'Approval failed');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Organization Management</h2>
                    <p className="text-slate-400 text-sm">Verify documents and manage safety partners</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleExportCSV} className="flex items-center gap-2 bg-slate-100 text-slate-600 text-sm font-bold px-4 py-2 rounded-xl transition hover:bg-slate-200">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                    <button className="flex items-center gap-2 bg-safiox-red text-white text-sm font-bold px-4 py-2 rounded-xl transition hover:bg-red-600 shadow-lg shadow-red-500/20">
                        <Plus className="w-4 h-4" /> Add Partner
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'verified'].map(s => (
                    <button
                        key={s}
                        onClick={() => setFilters({ ...filters, status: s })}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition ${filters.status === s ? 'bg-safiox-dark text-white' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
                    >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                ))}
                <div className="w-px h-8 bg-slate-100 mx-2 hidden md:block"></div>
                {['police', 'hospital'].map(t => (
                    <button
                        key={t}
                        onClick={() => setFilters({ ...filters, type: filters.type === t ? '' : t })}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition ${filters.type === t ? 'bg-safiox-dark text-white' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
                    >
                        {t.charAt(0).toUpperCase() + t.slice(1)}s
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Organization</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Documents</th>
                                <th className="px-6 py-4">Date Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="p-20 text-center text-slate-400">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-slate-200" />
                                        Loading organizations...
                                    </td>
                                </tr>
                            ) : orgs.length > 0 ? orgs.map(org => (
                                <tr key={org._id} className="hover:bg-slate-50/50 transition duration-150">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 uppercase">{(org.name || 'O')[0]}</div>
                                            <div>
                                                <p className="font-bold text-slate-800">{org.name || 'Unnamed Org'}</p>
                                                <p className="text-xs text-slate-400">{org.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">{org.type}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${org.verificationStatus === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                            {org.verificationStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {org.verificationDocuments?.[0] ? (
                                            <button
                                                onClick={() => window.open(org.verificationDocuments[0], '_blank')}
                                                className="text-safiox-red font-bold text-xs flex items-center gap-1 hover:text-red-700 transition"
                                            >
                                                <Eye className="w-3 h-3" /> View Doc
                                            </button>
                                        ) : (
                                            <span className="text-xs text-slate-300">No Documents</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-xs font-medium">{new Date(org.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            {org.verificationStatus === 'pending' ? (
                                                <>
                    <button onClick={handleApprove.bind(null, org._id)} className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                                                    <button onClick={() => handleReject(org._id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition" title="Reject"><Slash className="w-4 h-4" /></button>
                                                </>
                                            ) : (
                                                <span className="p-2 text-emerald-500" title="Verified Member"><ShieldCheck className="w-5 h-5" /></span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="p-20 text-center text-slate-400 italic">No organizations found matching your criteria.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-400 font-bold">
                    <p>Showing {orgs.length} organizations</p>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 transition"><ChevronLeft className="w-4 h-4" /></button>
                        <button className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 transition"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationManagement;
