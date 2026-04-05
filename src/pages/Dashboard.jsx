import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, 
    Download, 
    Trash2, 
    FileText, 
    Image as ImageIcon, 
    Clock, 
    CheckCircle2, 
    AlertCircle,
    ExternalLink,
    Search,
    Filter,
    ArrowUpRight,
    RotateCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('image-to-pdf');
    const [history, setHistory] = useState({
        'image-to-pdf': [],
        'pdf-to-image': []
    });
    const [searchTerm, setSearchTerm] = useState('');

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const [imgToPdfRes, pdfToImgRes] = await Promise.all([
                api.get('/pdf/image-to-pdf/history'),
                api.get('/pdf/pdf-to-image/history')
            ]);

            setHistory({
                'image-to-pdf': imgToPdfRes.data.history || [],
                'pdf-to-image': pdfToImgRes.data.history || []
            });
        } catch (err) {
            console.error('Failed to fetch history:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleDelete = async (id, type) => {
        if (!window.confirm('Are you sure you want to delete this record?')) return;

        try {
            const endpoint = type === 'image-to-pdf' 
                ? `/pdf/delete/${id}` 
                : `/pdf/pdf-to-image/delete/${id}`;
            
            await api.delete(endpoint);
            
            // Update local state
            setHistory(prev => ({
                ...prev,
                [type]: prev[type].filter(item => item._id !== id)
            }));
        } catch (err) {
            console.error('Delete failed:', err);
            alert('Failed to delete record');
        }
    };

    const handleDownload = async (item, type) => {
        try {
            if (type === 'image-to-pdf') {
                const res = await api.get(`/pdf/download/${item._id}`);
                if (res.data.success) {
                    window.open(res.data.downloadUrl, '_blank');
                }
            } else {
                // For PDF to Image, we usually download specific pages or a zip?
                // The current backend has downloadImage for a specific page.
                // If there's only one page, we download it. If many, maybe they should pick.
                // For now, let's open the first image or the record details.
                if (item.images && item.images.length > 0) {
                    const res = await api.get(`/pdf/pdf-to-image/download/${item._id}/1`);
                    if (res.data.success) {
                        window.open(res.data.downloadUrl, '_blank');
                    }
                }
            }
        } catch (err) {
            console.error('Download failed:', err);
            alert('Failed to get download link');
        }
    };

    const filteredHistory = history[activeTab].filter(item => {
        const name = activeTab === 'image-to-pdf' ? item.originalName : item.originalPdfName;
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen bg-[#050505] text-white">
            {loading && <Loading message="Syncing your history..." />}

            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <button 
                            onClick={() => navigate('/profile')}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group"
                        >
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-bold uppercase tracking-widest">Back to Profile</span>
                        </button>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none italic">
                            Activity <span className="text-red-500 underline decoration-4 underline-offset-8">Hub</span>
                        </h1>
                        <p className="text-gray-500 mt-2 font-medium">Manage your document conversions and assets</p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input 
                                type="text"
                                placeholder="Search files..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 w-full md:w-64 transition-all uppercase font-bold tracking-widest placeholder:text-gray-700"
                            />
                        </div>
                        <button 
                            onClick={fetchHistory}
                            disabled={loading}
                            className={`p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-90 group ${loading ? 'opacity-50' : ''}`}
                            title="Refresh History"
                        >
                            <RotateCw className={`w-5 h-5 text-gray-400 group-hover:text-white transition-colors ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl mb-8 w-fit">
                    {[
                        { id: 'image-to-pdf', label: 'Image to PDF', icon: <FileText className="w-4 h-4" /> },
                        { id: 'pdf-to-image', label: 'PDF to Image', icon: <ImageIcon className="w-4 h-4" /> }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all ${
                                activeTab === tab.id 
                                ? 'bg-red-500 text-white shadow-lg' 
                                : 'text-gray-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* History List */}
                <div className="grid gap-4">
                    <AnimatePresence mode='popLayout'>
                        {filteredHistory.length > 0 ? (
                            filteredHistory.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.08] transition-all group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl -z-10 group-hover:bg-red-500/10 transition-all" />
                                    
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl border ${
                                            activeTab === 'image-to-pdf' 
                                            ? 'bg-red-500/10 border-red-500/20 text-red-500' 
                                            : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500'
                                        }`}>
                                            {activeTab === 'image-to-pdf' ? <FileText className="w-6 h-6" /> : <ImageIcon className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black uppercase tracking-tight group-hover:text-red-500 transition-colors">
                                                {activeTab === 'image-to-pdf' ? item.originalName : item.originalPdfName}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-4 mt-1">
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                                    {activeTab === 'image-to-pdf' ? (
                                                        <>Pages: {item.metadata?.pageCount || 1}</>
                                                    ) : (
                                                        <>Format: {item.outputFormat || 'JPEG'}</>
                                                    )}
                                                </span>
                                                <span className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter px-2.5 py-1 rounded-full border ${
                                                    item.status === 'completed' 
                                                    ? 'bg-green-500/10 border-green-500/20 text-green-500'
                                                    : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                                                }`}>
                                                    {item.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => handleDownload(item, activeTab)}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item._id, activeTab)}
                                            className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
                                            title="Delete Record"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-[3rem]"
                            >
                                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <AlertCircle className="w-10 h-10 text-gray-600" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-widest text-gray-400">No History Found</h3>
                                <p className="text-gray-600 mt-2 font-medium">Start converting files to see them here!</p>
                                <button 
                                    onClick={() => navigate('/')}
                                    className="mt-8 px-8 py-3 bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                                >
                                    New Conversion
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
