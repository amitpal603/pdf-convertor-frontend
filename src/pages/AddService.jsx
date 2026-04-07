import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    ArrowRight, 
    ChevronLeft, 
    AlertCircle, 
    CheckCircle2, 
    Loader2, 
    Settings,
    Layout,
    Type,
    Link as LinkIcon,
    Hash,
    Tag,
    Activity,
    BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddService = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'Settings',
        path: '/convert/',
        status: 'Functional',
        category: 'Conversion',
        displayOrder: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'displayOrder' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.post('/services', formData);
            setSuccess(true);
            setTimeout(() => navigate('/admin/dashboard'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Deployment of service unit failed');
        } finally {
            setLoading(false);
        }
    };

    const categories = ['Conversion', 'Editing', 'Security', 'Organization', 'Other'];
    const statuses = ['Functional', 'Coming Soon'];

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen bg-[#050505] text-white">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <button 
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Dashboard Core</span>
                    </button>
                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
                        New <span className="text-red-500 underline decoration-[6px] underline-offset-[12px]">Service</span>
                    </h1>
                    <p className="text-gray-500 mt-6 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                        <Activity className="w-3 h-3 text-red-500" /> Initializing new functional module
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="p-6 bg-red-500/10 border border-red-500/20 rounded-[1.5rem] flex items-center gap-4 text-red-500 text-xs font-black uppercase tracking-widest"
                                    >
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        {error}
                                    </motion.div>
                                )}

                                {success && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 bg-green-500/10 border border-green-500/20 rounded-[2rem] flex flex-col items-center gap-4 text-green-500 text-center"
                                    >
                                        <CheckCircle2 className="w-12 h-12" />
                                        <div className="space-y-1">
                                            <p className="font-black uppercase tracking-widest">Service Unit Deployed</p>
                                            <p className="text-[10px] opacity-60 uppercase font-bold">Redirecting to command center...</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!success && (
                                <>
                                    {/* Grid Layout for Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Title */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-4">Service Title</label>
                                            <div className="relative group">
                                                <Type className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                                <input 
                                                    type="text" 
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    placeholder="e.g. PDF to Excel"
                                                    required
                                                    className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] py-5 pl-16 pr-6 text-white font-bold placeholder:text-gray-800 focus:outline-none focus:border-red-500/30 focus:bg-white/10 transition-all outline-none italic"
                                                />
                                            </div>
                                        </div>

                                        {/* Icon Name */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-4">Icon (Lucide)</label>
                                            <div className="relative group">
                                                <Layout className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                                <input 
                                                    type="text" 
                                                    name="icon"
                                                    value={formData.icon}
                                                    onChange={handleChange}
                                                    placeholder="FileText, Settings, etc."
                                                    required
                                                    className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] py-5 pl-16 pr-6 text-white font-bold placeholder:text-gray-800 focus:outline-none focus:border-red-500/30 focus:bg-white/10 transition-all outline-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Path */}
                                        <div className="space-y-3 md:col-span-2">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-4">Platform Route Path</label>
                                            <div className="relative group">
                                                <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                                <input 
                                                    type="text" 
                                                    name="path"
                                                    value={formData.path}
                                                    onChange={handleChange}
                                                    placeholder="/convert/..."
                                                    required
                                                    className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] py-5 pl-16 pr-6 text-red-500 font-bold placeholder:text-gray-800 focus:outline-none focus:border-red-500/30 focus:bg-white/10 transition-all outline-none italic"
                                                />
                                            </div>
                                        </div>

                                        {/* Category */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-4">Category</label>
                                            <div className="relative group">
                                                <Tag className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-red-500 transition-colors pointer-events-none" />
                                                <select 
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] py-5 pl-16 pr-10 text-white font-black uppercase tracking-widest text-xs focus:outline-none focus:border-red-500/30 focus:bg-white/10 transition-all outline-none appearance-none cursor-pointer"
                                                >
                                                    {categories.map(cat => (
                                                        <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Status */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-4">Status</label>
                                            <div className="relative group">
                                                <Activity className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-red-500 transition-colors pointer-events-none" />
                                                <select 
                                                    name="status"
                                                    value={formData.status}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] py-5 pl-16 pr-10 text-white font-black uppercase tracking-widest text-xs focus:outline-none focus:border-red-500/30 focus:bg-white/10 transition-all outline-none appearance-none cursor-pointer"
                                                >
                                                    {statuses.map(status => (
                                                        <option key={status} value={status} className="bg-black text-white">{status}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Display Order */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-4">Display Priority Index</label>
                                            <div className="relative group">
                                                <Hash className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                                <input 
                                                    type="number" 
                                                    name="displayOrder"
                                                    value={formData.displayOrder}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/5 rounded-[1.5rem] py-5 pl-16 pr-6 text-white font-bold focus:outline-none focus:border-red-500/30 focus:bg-white/10 transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-4">Technical Description</label>
                                        <div className="relative group">
                                            <BookOpen className="absolute left-6 top-8 w-4 h-4 text-gray-600 group-focus-within:text-red-500 transition-colors" />
                                            <textarea 
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                placeholder="Provide detailed description of the service module capabilities..."
                                                required
                                                rows="5"
                                                className="w-full bg-white/5 border border-white/5 rounded-[2rem] py-7 pl-16 pr-8 text-white font-medium placeholder:text-gray-800 focus:outline-none focus:border-red-500/30 focus:bg-white/10 transition-all outline-none resize-none leading-relaxed"
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full flex items-center justify-center gap-4 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] transition-all active:scale-[0.98] mt-10 ${
                                            loading 
                                            ? 'bg-white/5 text-gray-700 cursor-not-allowed' 
                                            : 'bg-white text-black hover:bg-gray-100 hover:scale-[1.02] shadow-[0_20px_50px_rgba(255,255,255,0.05)]'
                                        }`}
                                    >
                                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                            <>
                                                Deploy Module <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </form>
                    </div>

                    {/* Preview Section */}
                    <div className="hidden lg:block">
                        <div className="sticky top-40 space-y-8">
                            <div className="flex items-center gap-2 px-2 text-[10px] font-black uppercase tracking-widest text-gray-600">
                                <Activity className="w-3 h-3" /> Real-time Live Preview
                            </div>
                            
                            <motion.div 
                                animate={{ scale: [0.95, 1], opacity: [0, 1] }}
                                className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl -z-10" />
                                <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-10 shadow-2xl">
                                    <Settings className="w-10 h-10" />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight mb-4 italic truncate">
                                    {formData.title || 'Service Title'}
                                </h3>
                                <p className="text-gray-500 text-sm font-medium mb-10 line-clamp-3 leading-relaxed">
                                    {formData.description || 'Module description will appear here as you type. Provide clear details.'}
                                </p>
                                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-gray-500 pt-6 border-t border-white/5">
                                    <span>{formData.category} Unit</span>
                                    <span className="text-red-500">{formData.status}</span>
                                </div>
                            </motion.div>

                            <div className="p-10 rounded-[2.5rem] border border-dashed border-white/5 bg-white/[0.02]">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4">Metadata Analysis</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                                        <span className="text-gray-700">Display Weight:</span>
                                        <span className="text-white">#{formData.displayOrder}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                                        <span className="text-gray-700">Root Link:</span>
                                        <span className="text-red-500 italic lowercase">{formData.path}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddService;
