import React from 'react';
import { X, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isWarning = false,
    loading = false
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-sm text-slate-500 mb-6">{message}</p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition"
                        disabled={loading}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`flex-1 py-3 text-white rounded-xl text-sm font-bold transition disabled:opacity-60 flex items-center justify-center gap-2 ${isWarning ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'
                            }`}
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isWarning ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />)}
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
