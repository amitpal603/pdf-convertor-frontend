import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image, LayoutDashboard, LogIn, LogOut, User, Menu, X, Grid, Heart, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'PDF to Image', path: '/convert/pdf-to-image' },
        { name: 'Image to PDF', path: '/convert/image-to-pdf' },
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#0D0D0D] backdrop-blur-2xl border-b border-white/5 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Hamburger Menu Icon (Mobile) */}
                    <div className={`flex items-center md:hidden ${isMenuOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
                        <button 
                            onClick={toggleMenu}
                            className="text-gray-400 hover:text-white p-3 rounded-2xl bg-black border border-white/10 transition-all duration-300 focus:outline-none"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="flex items-center flex-1 justify-center md:justify-start">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative z-10 group-hover:scale-105 transition-transform duration-300">
                                    <FileText className="text-red-500 w-6 h-6" />
                                </div>
                            </div>
                            <span className="text-2xl font-black text-white uppercase tracking-tighter leading-none">
                                PDF <span className="text-gray-500">PRO</span>
                            </span>
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.path}
                                    to={link.path} 
                                    className="text-gray-400 hover:text-white hover:bg-white/5 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 group"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 scale-0 group-hover:scale-100 transition-transform" />
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className={`flex items-center gap-4 flex-1 justify-end transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
                        <button className="hidden sm:flex text-gray-500 hover:text-white p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
                            <Grid className="w-5 h-5" />
                        </button>

                        <div className="h-8 w-[1px] bg-white/10 hidden sm:block mx-2"></div>

                        <Link to="/profile" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white p-3 rounded-2xl border border-white/5 transition-all active:scale-95 group shadow-2xl">
                            <User className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                        </Link>
                        
                        {isAuthenticated ? (
                            <button 
                                onClick={() => logout()}
                                className="hidden md:flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95"
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        ) : (
                            <Link to="/login" className="hidden md:flex items-center gap-2 bg-white text-black px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.05] active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
                                <LogIn className="w-4 h-4" /> Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Backdrop */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[-1] md:hidden"
                        />
                        <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 left-0 bottom-0 w-[300px] bg-white/10 backdrop-blur-3xl border-r border-white/10 z-50 md:hidden flex flex-col pt-24 px-8"
                        >
                            {/* New Dedicated Close Button */}
                            <button 
                                onClick={toggleMenu}
                                className="absolute top-6 right-6 p-4 rounded-2xl bg-black border border-white/10 text-red-500 hover:scale-110 active:scale-90 transition-all shadow-2xl"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex flex-col gap-3">
                                <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em] font-black mb-6 ml-2">Platform Navigation</p>
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.path}
                                        to={link.path} 
                                        onClick={toggleMenu}
                                        className="flex items-center justify-between text-gray-400 hover:text-white bg-white/5 px-6 py-4 rounded-2xl transition-all border border-white/5 hover:border-white/10 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-xl bg-white/5 group-hover:text-red-500 transition-colors">
                                                {link.icon || <FileText className="w-5 h-5" />}
                                            </div>
                                            <span className="font-black text-xs uppercase tracking-widest">{link.name}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 opacity-30" />
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto mb-10 flex flex-col gap-4">
                                {isAuthenticated ? (
                                    <button 
                                        onClick={() => { logout(); toggleMenu(); }}
                                        className="flex items-center justify-center gap-3 w-full bg-red-500/10 border border-red-500/20 text-red-500 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all active:scale-95"
                                    >
                                        <LogOut className="w-5 h-5" /> Logout Session
                                    </button>
                                ) : (
                                    <Link 
                                        to="/login" 
                                        onClick={toggleMenu}
                                        className="flex items-center justify-center gap-3 w-full bg-white text-black py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-2xl"
                                    >
                                        <LogIn className="w-5 h-5" /> Access Portal
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

