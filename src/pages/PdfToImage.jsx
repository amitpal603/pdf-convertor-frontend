import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileUp, FileCheck, Loader2, Download, Trash2 } from 'lucide-react';
import api from '../services/api';

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
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white uppercase mb-4 tracking-tight">
                        PDF to <span className="text-indigo-500 italic">Image</span>
                    </h2>
                    <p className="text-gray-400">Transform your PDF documents into high-quality images in seconds.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-12 backdrop-blur-sm shadow-2xl">
                    {!result ? (
                        <div className="flex flex-col items-center">
                            <div className="w-full max-w-lg mb-8 aspect-video rounded-3xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center relative hover:border-indigo-500/50 transition-colors group">
                                <input 
                                    type="file" 
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                {file ? (
                                    <div className="text-center p-4">
                                        <FileCheck className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
                                        <p className="text-white font-medium truncate max-w-xs mx-auto">{file.name}</p>
                                        <p className="text-gray-500 text-sm mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                ) : (
                                    <div className="text-center p-4">
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <FileUp className="w-8 h-8 text-indigo-500" />
                                        </div>
                                        <p className="text-white font-medium">Click or drag PDF file</p>
                                        <p className="text-gray-500 text-sm mt-1">Max file size 20MB</p>
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={handleUpload}
                                disabled={!file || loading}
                                className={`w-full max-w-xs flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${
                                    !file || loading 
                                    ? 'bg-white/10 text-gray-500 cursor-not-allowed border border-white/5' 
                                    : 'bg-white text-black hover:scale-105 shadow-xl shadow-indigo-500/10'
                                }`}
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Convert Now'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <FileCheck className="w-8 h-8 text-green-500" />
                                    <div>
                                        <p className="text-white font-medium">{result.originalPdfName}</p>
                                        <p className="text-gray-500 text-xs uppercase tracking-widest">{result.images.length} Pages Processed</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setResult(null)}
                                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {result.images.map((img, i) => (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        key={i}
                                        className="group relative aspect-[3/4] bg-black/20 rounded-2xl overflow-hidden border border-white/5"
                                    >
                                        <img src={img.imageUrl} alt={`Page ${img.pageNumber}`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                            <a 
                                                href={`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/pdf/pdf-to-image/download/${result._id}/${img.pageNumber}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-white text-black p-3 rounded-full hover:scale-110 active:scale-90 transition-all shadow-xl"
                                            >
                                                <Download className="w-5 h-5" />
                                            </a>
                                        </div>
                                        <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded-lg text-[10px] text-white font-bold tracking-widest border border-white/10">
                                            PAGE {img.pageNumber}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            Premium Optimization
                        </h4>
                        <p className="text-gray-500 text-sm">Industrial grade compression algorithms ensure small file size without losing detail.</p>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse text-xs" />
                            Format Compatibility
                        </h4>
                        <p className="text-gray-500 text-sm">Convert complex PDFs including embedded vectors and high-res photography flawlessly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfToImage;
