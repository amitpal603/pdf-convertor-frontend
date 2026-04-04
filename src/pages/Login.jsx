import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn, ArrowRight, AlertCircle, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState(null);
    const { login, loading, user } = useAuth();
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);
        try {
            await login(email, password);
            navigate('/profile');
        } catch (err) {
            setLocalError(err.message || 'Login failed');
        }
    };

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center relative overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo & Intro */}
                <div className="text-center mb-10">
                    <div className="w-20 h-20 rounded-[2rem] bg-white/10 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                        <FileText className="text-red-500 w-10 h-10" />
                    </div>
                    <h2 className="text-4xl font-black text-white tracking-tight mb-3 uppercase">Welcome Back</h2>
                    <p className="text-gray-400 font-bold">Enter your credentials to access your toolkit.</p>
                </div>

                <div className="bg-white/10 border border-white/10 p-10 rounded-[3rem] backdrop-blur-2xl shadow-2xl relative">
                    <AnimatePresence mode="wait">
                        {localError && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold mb-8"
                            >
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {localError}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Email Input */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] py-5 pl-14 pr-5 text-white font-medium placeholder-gray-600 focus:outline-none focus:border-red-500/30 focus:bg-white/10 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-3">
                            <div className="flex justify-between px-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Password</label>
                                <a href="#" className="text-[10px] text-red-500 hover:text-red-400 transition-colors uppercase font-black tracking-widest">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] py-5 pl-14 pr-14 text-white font-medium placeholder-gray-600 focus:outline-none focus:border-red-500/30 focus:bg-white/10 transition-all outline-none"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className={`w-full flex items-center justify-center gap-3 py-5 rounded-[1.5rem] font-black text-lg transition-all active:scale-95 ${
                                loading 
                                ? 'bg-white/5 text-gray-600 cursor-not-allowed' 
                                : 'bg-white text-black hover:scale-[1.02] shadow-2xl shadow-white/5 active:bg-gray-100'
                            }`}
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                <>
                                    Log In <ArrowRight className="w-6 h-6" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center pt-8 border-t border-white/5">
                        <p className="text-gray-500 font-bold">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-red-500 hover:text-red-400 font-black transition-all ml-1">
                                Join now
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );

};

export default Login;
