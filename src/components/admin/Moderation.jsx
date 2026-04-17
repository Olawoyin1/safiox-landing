import React, { useState, useEffect } from 'react';
import { AdminAPI } from '../../services/adminApi';
import { Shield, Loader2, Trash2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const Moderation = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setLoading(true);
        try {
            const res = await AdminAPI.getPosts();
            if (res.success) {
                setPosts(res.data || []);
            }
        } catch (err) {
            toast.error('Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id) => {
        const reason = prompt('Reason for removal:', 'Violation of community guidelines');
        if (!reason) return;
        try {
            const res = await AdminAPI.removePost(id, reason);
            if (res.success) {
                toast.success('Post removed');
                loadPosts();
            }
        } catch (err) {
            toast.error('Removal failed');
        }
    };

    const handleRestore = async (id) => {
        try {
            const res = await AdminAPI.restorePost(id);
            if (res.success) {
                toast.success('Post restored');
                loadPosts();
            }
        } catch (err) {
            toast.error('Restore failed');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-800">Content Moderation</h2>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <tr>
                            <th className="px-6 py-4">Post Content</th>
                            <th className="px-6 py-4">Author</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="p-20 text-center text-slate-400">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-slate-200" />
                                    Analyzing community content...
                                </td>
                            </tr>
                        ) : posts.length > 0 ? posts.map(post => (
                            <tr key={post._id} className="hover:bg-slate-50 transition border-b border-slate-50">
                                <td className="px-6 py-4 max-w-md">
                                    <p className={`text-sm text-slate-700 line-clamp-2 ${post.isRemoved ? 'line-through text-slate-400' : ''}`}>
                                        {post.content}
                                    </p>
                                    {post.isRemoved && (
                                        <p className="text-[8px] text-red-500 font-bold mt-1 uppercase tracking-wider">
                                            REASON: {post.removalReason || 'N/A'}
                                        </p>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-xs font-bold text-slate-400 italic">
                                    {post.authorId?.name || 'Unknown'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {post.isRemoved ? (
                                        <button
                                            onClick={() => handleRestore(post._id)}
                                            className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-xl hover:bg-emerald-600 hover:text-white transition flex items-center gap-2 ml-auto"
                                        >
                                            <RotateCcw className="w-3 h-3" /> RESTORE POST
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleRemove(post._id)}
                                            className="px-4 py-2 bg-red-50 text-red-600 text-[10px] font-black rounded-xl hover:bg-red-600 hover:text-white transition flex items-center gap-2 ml-auto"
                                        >
                                            <Trash2 className="w-3 h-3" /> REMOVE POST
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="p-20 text-center text-slate-400 italic">No posts flagged for moderation.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Moderation;
