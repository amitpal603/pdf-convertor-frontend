import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Trash2, Loader2 } from 'lucide-react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onClose, loading = false }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={loading ? undefined : onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Decorative background glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl -z-10" />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-500 hover:text-white transition-all disabled:opacity-50"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Icon */}
                        <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-8 shadow-2xl shadow-red-500/10 mx-auto">
                            <AlertTriangle className="w-10 h-10" />
                        </div>

                        {/* Content */}
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-3 italic">
                                {title || 'Confirm Action'}
                            </h3>
                            <p className="text-gray-400 font-medium leading-relaxed">
                                {message || 'Are you sure you want to proceed? This action may be permanent.'}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={onConfirm}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-98 shadow-xl shadow-red-500/20"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Confirm Delete
                                    </>
                                )}
                            </button>
                            <button
                                onClick={onClose}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
