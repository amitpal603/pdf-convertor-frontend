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
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Hamburger Menu Icon (Mobile) */}
                    <div className="flex items-center md:hidden">
                        <button 
                            onClick={toggleMenu}
                            className="text-gray-400 hover:text-white p-2 focus:outline-none"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="flex items-center flex-1 justify-center md:justify-start">
                        <Link to="/" className="flex items-center gap-2 group text-white font-bold text-2xl uppercase tracking-tighter">
                            <div className="flex items-center gap-1 group-hover:scale-105 transition-transform duration-300">
                                <span className="text-white">PDF</span>
                                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    Convertor
                                </span>
                            </div>
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.path}
                                    to={link.path} 
                                    className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
                                >
                                    {link.icon}
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
                        <button className="hidden sm:block text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <Grid className="w-5 h-5" />
                        </button>

                        <div className="h-6 w-[1px] bg-white/10 hidden sm:block mx-2"></div>

                        <Link to="/profile" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white p-2 rounded-xl border border-white/10 transition-all active:scale-95 group">
                            <User className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
                        </Link>
                        
                        {isAuthenticated ? (
                            <button 
                                onClick={() => logout()}
                                className="hidden md:flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all active:scale-95"
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        ) : (
                            <Link to="/login" className="hidden md:flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
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
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] md:hidden"
                        />
                        <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#121212] border-r border-white/5 z-50 md:hidden flex flex-col pt-20 px-6"
                        >
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2 ml-2">Main Menu</p>
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.path}
                                        to={link.path} 
                                        onClick={toggleMenu}
                                        className="flex items-center justify-between text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            {link.icon || <FileText className="w-4 h-4" />}
                                            <span className="font-medium">{link.name}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 opacity-30" />
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto mb-8 flex flex-col gap-3">
                                {isAuthenticated ? (
                                    <button 
                                        onClick={() => { logout(); toggleMenu(); }}
                                        className="flex items-center justify-center gap-2 w-full bg-red-500/10 border border-red-500/20 text-red-500 py-4 rounded-2xl font-bold transition-all active:scale-95"
                                    >
                                        <LogOut className="w-5 h-5" /> Logout
                                    </button>
                                ) : (
                                    <Link 
                                        to="/login" 
                                        onClick={toggleMenu}
                                        className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 rounded-2xl font-bold transition-all active:scale-95"
                                    >
                                        <LogIn className="w-5 h-5" /> Sign In
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

