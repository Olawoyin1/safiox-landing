import React, { useState, useEffect } from 'react';
import { AdminAPI } from '../../services/adminApi';
import { Users, Loader2, UserCheck, UserMinus, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async (search = '') => {
        setLoading(true);
        try {
            const res = await AdminAPI.getUsers(search);
            if (res.success) {
                setUsers(res.data.users || res.data || []);
            }
        } catch (err) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleDeactivate = async (id) => {
        if (!confirm('Deactivate user?')) return;
        try {
            const res = await AdminAPI.deactivateUser(id);
            if (res.success) {
                toast.success('User deactivated');
                loadUsers();
            }
        } catch (err) {
            toast.error('Failed to deactivate');
        }
    };

    const handleReactivate = async (id) => {
        try {
            const res = await AdminAPI.reactivateUser(id);
            if (res.success) {
                toast.success('User reactivated');
                loadUsers();
            }
        } catch (err) {
            toast.error('Failed to reactivate');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <tr>
                            <th className="px-6 py-4">User Details</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="p-20 text-center text-slate-400">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-slate-200" />
                                    Syncing user data...
                                </td>
                            </tr>
                        ) : users.length > 0 ? users.map(user => (
                            <tr key={user._id} className="hover:bg-slate-50 transition border-b border-slate-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs text-uppercase">{user.name?.charAt(0)}</div>
                                        <div>
                                            <p className="font-bold text-slate-800">{user.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${user.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${user.isDeactivated ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                        {user.isDeactivated ? 'Deactivated' : 'Active'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        {user.isDeactivated ? (
                                            <button onClick={() => handleReactivate(user._id)} className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition" title="Reactivate"><UserCheck className="w-4 h-4" /></button>
                                        ) : (
                                            <button onClick={() => handleDeactivate(user._id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition" title="Deactivate"><UserMinus className="w-4 h-4" /></button>
                                        )}
                                        <button className="p-2 hover:bg-slate-100 text-slate-400 rounded-lg transition"><Settings className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="p-20 text-center text-slate-400 italic">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
