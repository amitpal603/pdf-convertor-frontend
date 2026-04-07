import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    Trash2, 
    Settings, 
    ExternalLink, 
    RefreshCcw, 
    Shield, 
    LayoutGrid, 
    ChevronRight,
    AlertCircle,
    CheckCircle2,
    Clock,
    Search,
    ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchServices = async () => {
        setLoading(true);
        try {
            const res = await api.get('/services');
            if (res.data.success) {
                setServices(res.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch services:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
        
        try {
            await api.delete(`/services/${id}`);
            setServices(services.filter(s => s._id !== id));
        } catch (err) {
            console.error('Failed to delete service:', err);
            alert('Error deleting service');
        }
    };

    const filteredServices = services.filter(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen bg-[#050505] text-white">
            {loading && <Loading message="Syncing Services..." />}

            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 group"
                        >
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-black uppercase tracking-[0.2em]">User Dashboard</span>
                        </button>
                        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
                            Service <span className="text-red-500 underline decoration-[6px] underline-offset-[12px]">Control</span>
                        </h1>
                        <p className="text-gray-500 mt-6 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                             <Shield className="w-3 h-3 text-red-500" /> Administrative Command Center
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-full sm:w-64 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                            <input 
                                type="text"
                                placeholder="Filter services..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-4 pl-14 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all uppercase font-black tracking-widest placeholder:text-gray-700"
                            />
                        </div>
                        <button 
                            onClick={() => navigate('/admin/services/add')}
                            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.05] active:scale-95 shadow-2xl shadow-red-500/20"
                        >
                            <Plus className="w-5 h-5" /> New Service
                        </button>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredServices.map((service, index) => (
                            <motion.div
                                key={service._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-[3rem] p-8 hover:bg-white/[0.08] transition-all group relative overflow-hidden backdrop-blur-3xl"
                            >
                                <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 blur-3xl -z-10 group-hover:bg-red-500/10 transition-all" />
                                
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                        <Settings className="w-8 h-8" />
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
                                        service.status === 'Functional' 
                                        ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                                        : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                                    }`}>
                                        {service.status}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black uppercase tracking-tight mb-3 group-hover:text-red-500 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500 text-sm font-medium mb-8 line-clamp-2 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="flex flex-col gap-3 mb-8">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 px-2">
                                        <span>Category</span>
                                        <span className="text-white">{service.category}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 px-2">
                                        <span>Order Index</span>
                                        <span className="text-white">#{service.displayOrder}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 px-2">
                                        <span>API Path</span>
                                        <span className="text-red-500 font-bold tracking-normal italic uppercase">{service.path}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                    <button 
                                        onClick={() => navigate(service.path)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" /> Launch
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(service._id, service.title)}
                                        className="p-3 rounded-2xl border border-white/10 bg-white/5 text-gray-600 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all active:scale-90"
                                        title="Delete Service"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        {filteredServices.length === 0 && !loading && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-24 bg-white/5 border border-dashed border-white/10 rounded-[4rem]"
                            >
                                <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
                                    <LayoutGrid className="w-12 h-12 text-gray-700" />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-widest text-gray-500 mb-4">Void Core</h3>
                                <p className="text-gray-700 font-bold text-xs uppercase tracking-[0.2em]">No operational units detected in the cluster</p>
                                <button 
                                    onClick={() => navigate('/admin/services/add')}
                                    className="mt-10 px-10 py-4 bg-white/10 hover:bg-white text-gray-400 hover:text-black rounded-[1.5rem] font-black uppercase tracking-widest transition-all"
                                >
                                    Initialize Service
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
