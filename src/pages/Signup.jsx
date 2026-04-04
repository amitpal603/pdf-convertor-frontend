import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, UserPlus, ArrowRight, AlertCircle, FileText, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState(null);
    const { signup, loading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);

        if (password !== confirmPassword) {
            setLocalError('Passwords do not match');
            return;
        }

        try {
            await signup({ name, email, password });
            navigate('/login'); // Redirect to login after successful registration
        } catch (err) {
            setLocalError(err.message || 'Registration failed');
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
                    <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                        <FileText className="text-red-500 w-10 h-10" />
                    </div>
                    <h2 className="text-4xl font-black text-white tracking-tight mb-3 uppercase">Create Account</h2>
                    <p className="text-gray-400 font-bold">Join the elite toolkit for PDF management.</p>
                </div>

                <div className="bg-white/10 border border-white/5 p-10 rounded-[3rem] backdrop-blur-2xl shadow-2xl relative">
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-2">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    required
                                    className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] py-4 pl-14 pr-5 text-white font-medium placeholder-gray-600 focus:outline-none focus:border-red-500/30 focus:bg-white/10 transition-all outline-none"
                                />
                            </div>
                        </div>

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
                                    className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] py-4 pl-14 pr-5 text-white font-medium placeholder-gray-600 focus:outline-none focus:border-red-500/30 focus:bg-white/10 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-2">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Minimum 6 characters"
                                    required
                                    className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] py-4 pl-14 pr-14 text-white font-medium placeholder-gray-600 focus:outline-none focus:border-red-500/30 focus:bg-white/10 transition-all outline-none"
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

                        {/* Confirm Password */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-2">Confirm Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                                <input 
                                    type="password" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-type password"
                                    required
                                    className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] py-4 pl-14 pr-5 text-white font-medium placeholder-gray-600 focus:outline-none focus:border-red-500/30 focus:bg-white/10 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
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
                                        Get Started <ArrowRight className="w-6 h-6" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 text-center pt-8 border-t border-white/5">
                        <p className="text-gray-500 font-bold">
                            Already have an account?{' '}
                            <Link to="/login" className="text-red-500 hover:text-red-400 font-black transition-all ml-1">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );




};

export default Signup;
