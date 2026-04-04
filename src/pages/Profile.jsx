import React from 'react';
import { motion } from 'framer-motion';
import { 
    ChevronLeft, 
    Wallet, 
    FileText, 
    Sparkles, 
    Share2, 
    HelpCircle, 
    Shield, 
    Lock, 
    LogOut, 
    User,
    Globe,
    Briefcase,
    Camera,
    Play
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };
    
    const menuItems = [
        { icon: <FileText className="w-5 h-5 text-purple-400" />, label: 'My Conversions', link: '/history' },
        { icon: <User className="w-5 h-5 text-indigo-400" />, label: 'Account Settings', link: '/settings' },
        { icon: <Sparkles className="w-5 h-5 text-pink-400" />, label: 'Pro Plan / Upgrade', link: '/pro' },
        { icon: <HelpCircle className="w-5 h-5 text-green-400" />, label: 'Help Center', link: '/support' },
        { icon: <LogOut className="w-5 h-5 text-gray-500" />, label: 'Log Out', onClick: handleLogout, danger: true },
    ];

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen">
            <div className="max-w-md mx-auto relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-90 transition-all"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-xl font-bold text-white uppercase tracking-widest text-center flex-grow">
                        My Profile
                    </h2>
                    <div className="w-10" /> {/* Spacer for balance */}
                </div>

                {/* Profile Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 mb-8 backdrop-blur-xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -z-10" />
                    
                    <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
                            <div className="w-full h-full rounded-[1.4rem] bg-black flex items-center justify-center overflow-hidden">
                                <User className="w-10 h-10 text-white/50" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">{user?.name || 'User'}</h3>
                            <p className="text-white/50 text-sm font-mono">{user?.email || 'user@example.com'}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Menu List */}
                <div className="space-y-2">
                    {menuItems.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={index}
                        >
                            {item.onClick ? (
                                <button 
                                    onClick={item.onClick}
                                    className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all group ${
                                        item.danger ? 'hover:bg-red-500/5' : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </div>
                                        <span className={`text-sm font-semibold tracking-wide ${
                                            item.danger ? 'text-red-400' : 'text-white/80 group-hover:text-white'
                                        }`}>
                                            {item.label}
                                        </span>
                                    </div>
                                    <ChevronLeft className="w-4 h-4 text-white/20 rotate-180 group-hover:translate-x-1 transition-transform" />
                                </button>
                            ) : (
                                <Link 
                                    to={item.link}
                                    className={`flex items-center justify-between p-5 rounded-2xl transition-all group ${
                                        item.danger ? 'hover:bg-red-500/5' : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </div>
                                        <span className={`text-sm font-semibold tracking-wide ${
                                            item.danger ? 'text-red-400' : 'text-white/80 group-hover:text-white'
                                        }`}>
                                            {item.label}
                                        </span>
                                    </div>
                                    
                                    {item.value ? (
                                        <span className="text-white font-mono text-xs bg-white/5 px-2 py-1 rounded-lg border border-white/10">
                                            {item.value}
                                        </span>
                                    ) : (
                                        <ChevronLeft className="w-4 h-4 text-white/20 rotate-180 group-hover:translate-x-1 transition-transform" />
                                    )}
                                </Link>
                            )}
                            <div className="h-px bg-white/5 mx-5 mt-1" />
                        </motion.div>
                    ))}
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-6 mt-12">
                    <a href="#" className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all hover:scale-110">
                        <Share2 className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all hover:scale-110">
                        <Camera className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all hover:scale-110">
                        <Play className="w-5 h-5" />
                    </a>
                </div>

                {/* Version */}
                <p className="text-center text-[10px] text-white/20 font-bold tracking-[0.2em] uppercase mt-10">
                    Version : 1.0.0
                </p>
            </div>
        </div>
    );
};

export default Profile;
