import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileUp, FileCheck, Loader2, Download, Trash2 } from 'lucide-react';
import api from '../services/api';
import Loading from '../components/Loading';

const PdfToImage = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const res = await api.post('/pdf/convert/pdf-to-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(res.data.data);
        } catch (err) {
            console.error(err);
            alert('Conversion failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen">
            {loading && <Loading message="Converting PDF to Images..." />}
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-black text-white uppercase mb-4 tracking-tight drop-shadow-sm">
                        PDF to <span className="text-red-500 italic">Image</span>
                    </h2>
                    <p className="text-gray-400 font-bold">Transform your PDF documents into high-quality images in seconds.</p>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-[3rem] p-10 md:p-16 mb-12 backdrop-blur-2xl shadow-2xl">
                    {!result ? (
                        <div className="flex flex-col items-center">
                            <div className="w-full max-w-xl mb-10 aspect-video rounded-[2.5rem] border-3 border-dashed border-white/10 flex flex-col items-center justify-center relative hover:border-red-500/50 transition-all group bg-white/5">
                                <input 
                                    type="file" 
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                {file ? (
                                    <div className="text-center p-6">
                                        <FileCheck className="w-20 h-20 text-red-500 mx-auto mb-6" />
                                        <p className="text-white font-black text-xl truncate max-w-xs mx-auto">{file.name}</p>
                                        <p className="text-gray-500 font-bold mt-2">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                ) : (
                                    <div className="text-center p-6">
                                        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 shadow-xl shadow-red-500/5 transition-transform border border-white/5">
                                            <FileUp className="w-10 h-10 text-red-500" />
                                        </div>
                                        <p className="text-white font-black text-xl">Click or drag PDF file</p>
                                        <p className="text-gray-500 font-bold mt-2">Max file size 20MB</p>
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={handleUpload}
                                disabled={!file || loading}
                                className={`w-full max-w-sm flex items-center justify-center gap-4 py-5 rounded-2xl font-black text-xl transition-all active:scale-95 ${
                                    !file || loading 
                                    ? 'bg-white/5 text-gray-600 cursor-not-allowed' 
                                    : 'bg-white text-black hover:scale-[1.02] shadow-2xl shadow-white/10'
                                }`}
                            >
                                {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : 'Convert Now'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl">
                                <div className="flex items-center gap-5">
                                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                        <FileCheck className="w-10 h-10 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-white font-black text-lg">{result.originalPdfName}</p>
                                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{result.images.length} Pages Processed</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setResult(null)}
                                    className="p-3 bg-white/5 text-gray-400 hover:text-red-500 rounded-xl border border-white/10 transition-all hover:scale-110 active:scale-90"
                                >
                                    <Trash2 className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                {result.images.map((img, i) => (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        key={i}
                                        className="group relative aspect-[3/4] bg-white/5 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl"
                                    >
                                        <img src={img.imageUrl} alt={`Page ${img.pageNumber}`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-red-600/90 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all backdrop-blur-sm">
                                            <a 
                                                href={`${import.meta.env.VITE_API_URL || 'https://pdf-convertor-wbn9.onrender.com/api'}/pdf/pdf-to-image/download/${result._id}/${img.pageNumber}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-white text-red-600 p-4 rounded-full hover:scale-110 active:scale-90 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                                            >
                                                <Download className="w-6 h-6" />
                                            </a>
                                        </div>
                                        <div className="absolute top-3 left-3 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl text-[10px] text-white font-black tracking-widest border border-white/10">
                                            PAGE {img.pageNumber}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl">
                        <h4 className="text-white font-black text-lg mb-3 flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]" />
                            Elite Detail
                        </h4>
                        <p className="text-gray-400 font-bold text-sm">Industrial grade compression algorithms ensure high-fidelity image extraction every time.</p>
                    </div>
                    <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl">
                        <h4 className="text-white font-black text-lg mb-3 flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]" />
                            Format Ready
                        </h4>
                        <p className="text-gray-400 font-bold text-sm">Optimized for high-resolution photography and vector documents with zero rendering artifacts.</p>
                    </div>
                </div>
            </div>
        </div>
    );


};

export default PdfToImage;
