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
        { icon: <FileText className="w-5 h-5 text-red-500" />, label: 'My Conversions', link: '/history' },
        { icon: <User className="w-5 h-5 text-indigo-500" />, label: 'Account Settings', link: '/settings' },
        { icon: <Sparkles className="w-5 h-5 text-amber-500" />, label: 'Pro Plan / Upgrade', link: '/pro' },
        { icon: <HelpCircle className="w-5 h-5 text-green-500" />, label: 'Help Center', link: '/support' },
        { icon: <LogOut className="w-5 h-5 text-gray-400" />, label: 'Log Out', onClick: handleLogout, danger: true },
    ];

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen">
            <div className="max-w-md mx-auto relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-900 hover:scale-110 active:scale-90 transition-all shadow-sm"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter text-center flex-grow">
                        Account
                    </h2>
                    <div className="w-12" /> {/* Spacer for balance */}
                </div>

                {/* Profile Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-gray-100 rounded-[2.5rem] p-8 mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl -z-10" />
                    
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-3xl bg-gray-50 border border-gray-100 p-1 flex items-center justify-center shadow-inner">
                            <div className="w-full h-full rounded-[1.4rem] bg-white flex items-center justify-center overflow-hidden">
                                <User className="w-12 h-12 text-gray-200" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-gray-900 mb-1 uppercase tracking-tight">{user?.name || 'User'}</h3>
                            <p className="text-gray-400 text-sm font-bold tracking-tight">{user?.email || 'user@example.com'}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Menu List */}
                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-1">
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
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                                        item.danger ? 'hover:bg-red-50' : 'hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 group-hover:scale-110 transition-transform bg-white shadow-sm">
                                            {item.icon}
                                        </div>
                                        <span className={`text-sm font-black tracking-wide ${
                                            item.danger ? 'text-red-600' : 'text-gray-700'
                                        }`}>
                                            {item.label}
                                        </span>
                                    </div>
                                    <ChevronLeft className="w-4 h-4 text-gray-300 rotate-180 group-hover:translate-x-1 transition-transform" />
                                </button>
                            ) : (
                                <Link 
                                    to={item.link}
                                    className="flex items-center justify-between p-4 rounded-2xl transition-all group hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-white border border-gray-100 group-hover:scale-110 transition-transform shadow-sm">
                                            {item.icon}
                                        </div>
                                        <span className="text-sm font-black tracking-wide text-gray-700">
                                            {item.label}
                                        </span>
                                    </div>
                                    <ChevronLeft className="w-4 h-4 text-gray-300 rotate-180 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-6 mt-12">
                    <a href="#" className="p-4 rounded-2xl bg-white border border-gray-100 text-gray-300 hover:text-red-500 hover:border-red-100 transition-all hover:scale-110 shadow-sm">
                        <Share2 className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-4 rounded-2xl bg-white border border-gray-100 text-gray-300 hover:text-red-500 hover:border-red-100 transition-all hover:scale-110 shadow-sm">
                        <Camera className="w-5 h-5" />
                    </a>
                    <a href="#" className="p-4 rounded-2xl bg-white border border-gray-100 text-gray-300 hover:text-red-500 hover:border-red-100 transition-all hover:scale-110 shadow-sm">
                        <Play className="w-5 h-5" />
                    </a>
                </div>

                {/* Version */}
                <p className="text-center text-[10px] text-gray-300 font-black tracking-[0.3em] uppercase mt-12">
                    Version : 1.0.0
                </p>
            </div>
        </div>
    );

};

export default Profile;
