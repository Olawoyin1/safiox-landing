import React, { useState, useEffect } from 'react';
import {
    Download, Eye, CheckCircle, X, ShieldCheck, Loader2,
    ChevronLeft, ChevronRight, MapPin, Phone, Clock, Users,
    FileText, Truck, Building2, AlertTriangle, ExternalLink
} from 'lucide-react';
import { AdminAPI } from '../../services/adminApi';
import toast from 'react-hot-toast';

const STATUS_STYLES = {
    pending:  'bg-amber-50 text-amber-600',
    verified: 'bg-emerald-50 text-emerald-600',
    rejected: 'bg-red-50 text-red-500',
};

const TYPE_COLORS = {
    hospital:  'bg-blue-50 text-blue-600',
    police:    'bg-indigo-50 text-indigo-600',
    fire:      'bg-orange-50 text-orange-600',
    ambulance: 'bg-red-50 text-red-600',
    other:     'bg-slate-100 text-slate-500',
};

const STATUS_FILTERS = ['all', 'pending', 'verified', 'rejected'];
const TYPE_FILTERS   = ['hospital', 'police', 'fire', 'ambulance', 'other'];

// ── Reject Modal ──────────────────────────────────────────────────────────────
const RejectModal = ({ org, onConfirm, onClose }) => {
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        setLoading(true);
        await onConfirm(org._id, reason);
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-800">Reject Organization</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition"><X className="w-5 h-5" /></button>
                </div>
                <p className="text-sm text-slate-400 mb-5">Rejecting <span className="font-bold text-slate-700">{org.name}</span>. A notification and email will be sent to the org admin.</p>
                <textarea
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    placeholder="Reason for rejection (recommended)..."
                    rows={4}
                    className="w-full border border-slate-200 rounded-xl p-4 text-sm outline-none focus:border-red-400 resize-none mb-4"
                />
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition">Cancel</button>
                    <button onClick={submit} disabled={loading} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <AlertTriangle className="w-4 h-4" />}
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

// ── Detail Drawer ─────────────────────────────────────────────────────────────
const OrgDetailDrawer = ({ orgId, onClose, onApprove, onReject }) => {
    const [org, setOrg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AdminAPI.getOrganization(orgId)
            .then(res => { if (res.success) setOrg(res.data.organization); })
            .catch(() => toast.error('Failed to load organization details'))
            .finally(() => setLoading(false));
    }, [orgId]);

    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
            <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white z-50 shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800">Organization Review</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition"><X className="w-5 h-5" /></button>
                </div>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
                    </div>
                ) : !org ? (
                    <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">Failed to load details.</div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Identity */}
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-xl text-slate-500 uppercase flex-shrink-0">
                                {(org.name || 'O')[0]}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-xl font-bold text-slate-800">{org.name}</h3>
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${STATUS_STYLES[org.verificationStatus] || 'bg-slate-100 text-slate-500'}`}>
                                        {org.verificationStatus}
                                    </span>
                                </div>
                                <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase ${TYPE_COLORS[org.type] || TYPE_COLORS.other}`}>
                                    {org.type}
                                </span>
                                {org.verificationCode && (
                                    <p className="text-xs text-slate-400 mt-1 font-mono">{org.verificationCode}</p>
                                )}
                            </div>
                        </div>

                        {/* Contact */}
                        <Section title="Contact Details">
                            <InfoRow icon={<Phone className="w-4 h-4" />} label="Phone" value={org.phone || '—'} />
                            <InfoRow icon={<FileText className="w-4 h-4" />} label="Email" value={org.email || '—'} />
                            <InfoRow icon={<MapPin className="w-4 h-4" />} label="Address" value={org.address || '—'} />
                            {org.hotlineNumbers?.length > 0 && (
                                <InfoRow icon={<Phone className="w-4 h-4" />} label="Hotlines" value={org.hotlineNumbers.join(', ')} />
                            )}
                        </Section>

                        {/* Operating Hours */}
                        {org.operatingHours && (
                            <Section title="Operating Hours">
                                <InfoRow
                                    icon={<Clock className="w-4 h-4" />}
                                    label="Hours"
                                    value={org.operatingHours.is24Hours ? '24 Hours' : `${org.operatingHours.open} – ${org.operatingHours.close}`}
                                />
                            </Section>
                        )}

                        {/* Staff & Fleet */}
                        <Section title="Capacity">
                            {org.staffCount != null && (
                                <InfoRow icon={<Users className="w-4 h-4" />} label="Staff Count" value={org.staffCount} />
                            )}
                            {org.fleetInfo && (
                                <>
                                    <InfoRow icon={<Truck className="w-4 h-4" />} label="Vehicles" value={org.fleetInfo.vehicleCount} />
                                    {org.fleetInfo.vehicleTypes?.length > 0 && (
                                        <InfoRow icon={<Truck className="w-4 h-4" />} label="Vehicle Types" value={org.fleetInfo.vehicleTypes.join(', ')} />
                                    )}
                                </>
                            )}
                        </Section>

                        {/* Branches */}
                        {org.branches?.length > 0 && (
                            <Section title={`Branches (${org.branches.length})`}>
                                {org.branches.map((b, i) => (
                                    <div key={b._id || i} className="bg-slate-50 rounded-2xl p-4">
                                        <p className="font-bold text-sm text-slate-700">{b.name}</p>
                                        <p className="text-xs text-slate-400 mt-1">{b.address}</p>
                                        {b.operatingHours && (
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                {b.operatingHours.is24Hours ? '24 Hours' : `${b.operatingHours.open} – ${b.operatingHours.close}`}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </Section>
                        )}

                        {/* Registered User */}
                        {org.userId && (
                            <Section title="Registered By">
                                <InfoRow icon={<Users className="w-4 h-4" />} label="Name" value={org.userId.name} />
                                <InfoRow icon={<FileText className="w-4 h-4" />} label="Email" value={org.userId.email} />
                                {org.userId.phone && <InfoRow icon={<Phone className="w-4 h-4" />} label="Phone" value={org.userId.phone} />}
                                <InfoRow icon={<Clock className="w-4 h-4" />} label="Joined" value={new Date(org.userId.createdAt).toLocaleDateString()} />
                            </Section>
                        )}

                        {/* Documents */}
                        <Section title={`Verification Documents (${org.verificationDocuments?.length || 0})`}>
                            {org.verificationDocuments?.length > 0 ? (
                                <div className="space-y-2">
                                    {org.verificationDocuments.map((url, i) => (
                                        <button
                                            key={i}
                                            onClick={() => window.open(url, '_blank')}
                                            className="w-full flex items-center justify-between gap-3 p-3 bg-slate-50 hover:bg-red-50 rounded-xl transition group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-4 h-4 text-slate-400 group-hover:text-red-500" />
                                                <span className="text-sm font-medium text-slate-600 group-hover:text-red-600 truncate max-w-xs">
                                                    Document {i + 1}
                                                </span>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-red-400 flex-shrink-0" />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-400 italic">No documents uploaded.</p>
                            )}
                        </Section>

                        {/* Rejection reason if already rejected */}
                        {org.verificationStatus === 'rejected' && org.verificationRejectionReason && (
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                                <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Rejection Reason</p>
                                <p className="text-sm text-red-700">{org.verificationRejectionReason}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Action Footer — only for pending */}
                {org?.verificationStatus === 'pending' && (
                    <div className="p-5 border-t border-slate-100 flex gap-3">
                        <button
                            onClick={() => onReject(org)}
                            className="flex-1 py-3 border-2 border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition text-sm"
                        >
                            Reject
                        </button>
                        <button
                            onClick={() => onApprove(org._id)}
                            className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition text-sm flex items-center justify-center gap-2"
                        >
                            <CheckCircle className="w-4 h-4" /> Approve
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

const Section = ({ title, children }) => (
    <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{title}</p>
        <div className="space-y-2">{children}</div>
    </div>
);

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3 text-sm">
        <span className="text-slate-300 mt-0.5 flex-shrink-0">{icon}</span>
        <span className="text-slate-400 w-24 flex-shrink-0">{label}</span>
        <span className="text-slate-700 font-medium">{value}</span>
    </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const OrganizationManagement = () => {
    const [orgs, setOrgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ status: 'all', type: '' });
    const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });
    const [selectedOrgId, setSelectedOrgId] = useState(null);
    const [rejectTarget, setRejectTarget] = useState(null);

    useEffect(() => {
        loadOrgs(1);
    }, [filters]);

    const loadOrgs = async (page = pagination.page) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.status !== 'all') params.set('status', filters.status);
            if (filters.type) params.set('type', filters.type);
            params.set('page', page);
            params.set('limit', 20);

            const res = await AdminAPI.getOrganizations(params.toString());
            if (res.success) {
                const data = Array.isArray(res.data) ? res.data : (res.data.organizations || res.data.data || []);
                setOrgs(data);
                if (res.pagination) setPagination({ page: res.pagination.page, total: res.pagination.total, pages: res.pagination.pages });
            }
        } catch {
            toast.error('Failed to load organizations');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            const res = await AdminAPI.approveOrg(id);
            if (res.success) {
                toast.success('Organization approved — notification sent');
                setSelectedOrgId(null);
                loadOrgs();
            }
        } catch (err) {
            toast.error(err.message || 'Approval failed');
        }
    };

    const handleRejectConfirm = async (id, reason) => {
        try {
            const res = await AdminAPI.rejectOrg(id, reason);
            if (res.success) {
                toast.success('Organization rejected — notification sent');
                setRejectTarget(null);
                setSelectedOrgId(null);
                loadOrgs();
            }
        } catch (err) {
            toast.error(err.message || 'Rejection failed');
        }
    };

    const handleExportCSV = () => {
        if (!orgs.length) return toast.error('No data to export');
        const headers = ['Name', 'Email', 'Phone', 'Type', 'Status', 'Date Joined'];
        const rows = orgs.map(o => [o.name || '', o.email || '', o.phone || '', o.type || '', o.verificationStatus || '', new Date(o.createdAt).toLocaleDateString()]);
        const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'organizations.csv';
        a.click();
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Reject Modal */}
            {rejectTarget && (
                <RejectModal
                    org={rejectTarget}
                    onConfirm={handleRejectConfirm}
                    onClose={() => setRejectTarget(null)}
                />
            )}

            {/* Detail Drawer */}
            {selectedOrgId && (
                <OrgDetailDrawer
                    orgId={selectedOrgId}
                    onClose={() => setSelectedOrgId(null)}
                    onApprove={handleApprove}
                    onReject={(org) => { setSelectedOrgId(null); setRejectTarget(org); }}
                />
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Organization Management</h2>
                    <p className="text-slate-400 text-sm">Verify documents and manage safety partners</p>
                </div>
                <button onClick={handleExportCSV} className="flex items-center gap-2 bg-slate-100 text-slate-600 text-sm font-bold px-4 py-2 rounded-xl transition hover:bg-slate-200 self-start md:self-auto">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {STATUS_FILTERS.map(s => (
                    <button
                        key={s}
                        onClick={() => setFilters(f => ({ ...f, status: s }))}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition ${filters.status === s ? 'bg-safiox-dark text-white' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
                    >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                ))}
                <div className="w-px h-8 bg-slate-100 mx-1 hidden md:block self-center" />
                {TYPE_FILTERS.map(t => (
                    <button
                        key={t}
                        onClick={() => setFilters(f => ({ ...f, type: f.type === t ? '' : t }))}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition ${filters.type === t ? 'bg-safiox-dark text-white' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
                    >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
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
                                <th className="px-6 py-4">Date Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-20 text-center text-slate-400">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-slate-200" />
                                        Loading organizations...
                                    </td>
                                </tr>
                            ) : orgs.length > 0 ? orgs.map(org => (
                                <tr
                                    key={org._id}
                                    onClick={() => setSelectedOrgId(org._id)}
                                    className="hover:bg-slate-50/70 transition duration-150 cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 uppercase flex-shrink-0">
                                                {(org.name || 'O')[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{org.name || 'Unnamed Org'}</p>
                                                <p className="text-[11px] text-slate-400">{org.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${TYPE_COLORS[org.type] || TYPE_COLORS.other}`}>
                                            {org.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[org.verificationStatus] || 'bg-slate-100 text-slate-500'}`}>
                                            {org.verificationStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                                        {new Date(org.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                                        <div className="flex justify-end gap-1">
                                            {org.verificationStatus === 'pending' ? (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(org._id)}
                                                        className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setRejectTarget(org)}
                                                        className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition"
                                                        title="Reject"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </>
                                            ) : org.verificationStatus === 'verified' ? (
                                                <span className="p-2 text-emerald-500" title="Verified"><ShieldCheck className="w-5 h-5" /></span>
                                            ) : (
                                                <span className="p-2 text-red-400" title="Rejected"><AlertTriangle className="w-4 h-4" /></span>
                                            )}
                                            <button
                                                onClick={() => setSelectedOrgId(org._id)}
                                                className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg transition"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="p-20 text-center text-slate-400 italic">
                                        No organizations found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-400 font-bold">
                    <p>{pagination.total > 0 ? `${orgs.length} of ${pagination.total} organizations` : `${orgs.length} organizations`}</p>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={pagination.page <= 1}
                            onClick={() => loadOrgs(pagination.page - 1)}
                            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="px-2">Page {pagination.page} of {pagination.pages || 1}</span>
                        <button
                            disabled={pagination.page >= pagination.pages}
                            onClick={() => loadOrgs(pagination.page + 1)}
                            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizationManagement;
