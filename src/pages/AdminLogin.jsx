import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState(null);
    const { login, logout, loading, user } = useAuth();
    const navigate = useNavigate();

    // If logged in as admin, redirect to admin dashboard
    useEffect(() => {
        if (user && user.role === 'admin') {
            navigate('/admin/dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);
        try {
            const res = await login(email, password);
            
            // Check if the logged-in user is an admin
            if (res.user.role !== 'admin') {
                await logout(); // Session must be cleared if it is not an admin
                setLocalError('Access denied. This portal is restricted to administrators.');
                return;
            }
            
            navigate('/admin/dashboard');
        } catch (err) {
            setLocalError(err.message || 'Login failed');
        }
    };

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050505]">
            {/* Animated Background Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[120px] -z-10 animate-pulse" />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo & Header */}
                <div className="text-center mb-12">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-2xl relative group">
                        <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full scale-0 group-hover:scale-125 transition-transform duration-700" />
                        <ShieldCheck className="text-red-500 w-12 h-12 relative z-10" />
                    </div>
                    <h2 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase italic">
                        Admin <span className="text-red-500 underline decoration-4 underline-offset-8">Portal</span>
                    </h2>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Secure Access for Platform Management</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-10 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl -z-10 group-hover:bg-red-500/10 transition-all" />
                    
                    <AnimatePresence mode="wait">
                        {localError && (
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex items-center gap-3 p-5 bg-red-500/10 border border-red-500/20 rounded-3xl text-red-500 text-sm font-black mb-10"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {localError}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Email Field */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-4">Admin Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    required
                                    className="w-full bg-black/40 border border-white/5 rounded-[1.8rem] py-6 pl-16 pr-6 text-white font-bold placeholder-gray-800 focus:outline-none focus:border-red-500/30 focus:bg-black/60 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-4">Passcode</label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-black/40 border border-white/5 rounded-[1.8rem] py-6 pl-16 pr-16 text-white font-bold placeholder-gray-800 focus:outline-none focus:border-red-500/30 focus:bg-black/60 transition-all outline-none"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className={`w-full flex items-center justify-center gap-3 py-7 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 ${
                                loading 
                                ? 'bg-white/5 text-gray-700 cursor-not-allowed' 
                                : 'bg-red-500 text-white hover:bg-red-600 shadow-2xl shadow-red-500/20'
                            }`}
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                <>
                                    Verify Identity <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center pt-8 border-t border-white/5">
                        <p className="text-gray-600 font-bold text-[10px] uppercase tracking-widest">
                            Authorized Personnel Only
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
