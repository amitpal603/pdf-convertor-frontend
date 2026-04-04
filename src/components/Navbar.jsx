import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image, LayoutDashboard, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group text-white font-bold text-xl uppercase tracking-wider">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FileText className="text-white w-5 h-5" />
                            </div>
                            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                PDF Conver
                            </span>
                        </Link>
                    </div>
                    
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link to="/convert/pdf-to-image" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                PDF to Image
                            </Link>
                            <Link to="/convert/image-to-pdf" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Image to PDF
                            </Link>
                            <Link to="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                <LayoutDashboard className="w-4 h-4" /> Dashboard
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/profile" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white p-2 rounded-xl border border-white/10 transition-all active:scale-95 group">
                            <User className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
                        </Link>
                        {isAuthenticated ? (
                            <button 
                                onClick={() => logout()}
                                className="hover:cursor-pointer active:scale-95 hidden sm:flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all active:scale-95"
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        ) : (
                            <Link to="/login" className="hover:cursor-pointer active:scale-95 hidden sm:flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold hover:scale-105 active:scale-95 transition-all">
                                <LogIn className="w-4 h-4" /> Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
