import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    ArrowRight, FileImage, FileStack, ShieldCheck, Zap, 
    Presentation, Table, Edit3, Image as ImageIcon, 
    PenTool, Stamp, RotateCw, Code, Unlock, Lock, 
    Layout, FileType, Wrench, ListOrdered, Scan, 
    Languages, Columns, SquareX, Heart, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';

const Home = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const getIconComponent = (iconName) => {
        const icons = {
            Presentation: <Presentation className="w-8 h-8 text-orange-500" />,
            Table: <Table className="w-8 h-8 text-green-500" />,
            Edit3: <Edit3 className="w-8 h-8 text-purple-500" />,
            ImageIcon: <ImageIcon className="w-8 h-8 text-yellow-600" />,
            FileImage: <FileImage className="w-8 h-8 text-yellow-600" />,
            PenTool: <PenTool className="w-8 h-8 text-blue-500" />,
            Stamp: <Stamp className="w-8 h-8 text-purple-400" />,
            RotateCw: <RotateCw className="w-8 h-8 text-pink-500" />,
            Code: <Code className="w-8 h-8 text-yellow-700" />,
            Unlock: <Unlock className="w-8 h-8 text-blue-400" />,
            Lock: <Lock className="w-8 h-8 text-blue-600" />,
            Layout: <Layout className="w-8 h-8 text-orange-600" />,
            FileType: <FileType className="w-8 h-8 text-blue-500" />,
            Wrench: <Wrench className="w-8 h-8 text-green-600" />,
            ListOrdered: <ListOrdered className="w-8 h-8 text-purple-600" />,
            Scan: <Scan className="w-8 h-8 text-orange-500" />,
            Languages: <Languages className="w-8 h-8 text-green-500" />,
            Columns: <Columns className="w-8 h-8 text-blue-500" />,
            SquareX: <SquareX className="w-8 h-8 text-red-500" />,
            FileStack: <FileStack className="w-8 h-8 text-blue-500" />,
            Zap: <Zap className="w-8 h-8 text-yellow-500" />
        };
        return icons[iconName] || <Zap className="w-8 h-8 text-blue-500" />;
    };

    const fetchServices = async () => {
        try {
            const res = await api.get('/services');
            if (res.data.success) {
                setServices(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching services:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    if (loading) {
        return <Loading message="Syncing Tools..." />;
    }

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-500 text-sm font-bold mb-8 shadow-sm"
                >
                    <Heart className="w-4 h-4 text-blue-500 fill-blue-500" />
                    Every tool you need to work with PDFs in one place
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 drop-shadow-sm"
                >
                    Every tool you need to use PDFs, <br />
                    <span className="text-blue-500">at your fingertips.</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl mx-auto text-gray-400 text-lg mb-10 font-semibold leading-relaxed"
                >
                    All the tools you need to efficiently enhance your digital documents while keeping your data safe and secure.
                </motion.p>
            </div>

            {/* Tools Grid Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((tool, i) => (
                        <motion.div
                            key={tool._id || i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <Link 
                                to={tool.path}
                                className={`group relative flex flex-col h-full bg-white/5 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] hover:bg-white/10 hover:border-red-500/30 transition-all duration-300 overflow-hidden shadow-2xl ${tool.status === 'Coming Soon' ? 'cursor-not-allowed opacity-60' : ''}`}
                            >
                                {/* Tool Status Badge */}
                                {tool.status === 'Coming Soon' && (
                                    <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-tighter bg-white/5 text-gray-400 px-2 py-1 rounded-md border border-white/5">
                                        Soon
                                    </span>
                                )}
                                {tool.status === 'Functional' && (
                                    <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-tighter bg-red-500/10 text-red-500 px-2 py-1 rounded-md border border-red-500/20">
                                        Ready
                                    </span>
                                )}

                                <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                    {getIconComponent(tool.icon)}
                                </div>
                                
                                <h3 className="text-white text-xl font-black mb-3 group-hover:text-blue-500 transition-colors">
                                    {tool.title}
                                </h3>
                                
                                <p className="text-gray-400 text-sm font-medium leading-relaxed mb-4">
                                    {tool.description || tool.desc}
                                </p>

                                <div className="mt-auto pt-4 flex items-center gap-2 text-blue-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                                    {tool.status === 'Functional' ? 'Get Started' : 'Learn More'} 
                                    <ArrowRight className="w-4 h-4" />
                                </div>

                                {/* Decorative Background Glow */}
                                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-red-500/5 blur-[50px] group-hover:bg-red-500/10 transition-all duration-500" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto mt-32 text-center border-t border-white/5 pt-20 relative z-10">
                <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/5 shadow-sm mb-8">
                    <ShieldCheck className="w-6 h-6 text-green-500" />
                    <span className="text-white font-black uppercase tracking-widest text-xs">Your data is safe with us</span>
                </div>
                <p className="max-w-xl mx-auto text-gray-400 text-sm font-bold leading-relaxed">
                    We process your files securely using industrial-grade encryption. <br />
                    All files are automatically deleted after processing.
                </p>
            </div>
        </div>
    );
};

export default Home;



