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
                    <h2 className="text-5xl font-black text-gray-900 uppercase mb-4 tracking-tight drop-shadow-sm">
                        PDF to <span className="text-[#E5322D] italic">Image</span>
                    </h2>
                    <p className="text-gray-600 font-bold">Transform your PDF documents into high-quality images in seconds.</p>
                </div>

                <div className="bg-white/90 border border-gray-100 rounded-[3rem] p-10 md:p-16 mb-12 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
                    {!result ? (
                        <div className="flex flex-col items-center">
                            <div className="w-full max-w-xl mb-10 aspect-video rounded-[2.5rem] border-3 border-dashed border-gray-200 flex flex-col items-center justify-center relative hover:border-red-500/50 transition-all group bg-gray-50/50">
                                <input 
                                    type="file" 
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                {file ? (
                                    <div className="text-center p-6">
                                        <FileCheck className="w-20 h-20 text-[#E5322D] mx-auto mb-6" />
                                        <p className="text-gray-900 font-black text-xl truncate max-w-xs mx-auto">{file.name}</p>
                                        <p className="text-gray-500 font-bold mt-2">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                ) : (
                                    <div className="text-center p-6">
                                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 shadow-xl shadow-red-500/5 transition-transform">
                                            <FileUp className="w-10 h-10 text-[#E5322D]" />
                                        </div>
                                        <p className="text-gray-900 font-black text-xl">Click or drag PDF file</p>
                                        <p className="text-gray-500 font-bold mt-2">Max file size 20MB</p>
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={handleUpload}
                                disabled={!file || loading}
                                className={`w-full max-w-sm flex items-center justify-center gap-4 py-5 rounded-2xl font-black text-xl transition-all active:scale-95 ${
                                    !file || loading 
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                    : 'bg-[#E5322D] text-white hover:scale-[1.02] shadow-2xl shadow-red-500/20'
                                }`}
                            >
                                {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : 'Convert Now'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between p-6 bg-gray-50 border border-gray-100 rounded-3xl">
                                <div className="flex items-center gap-5">
                                    <div className="p-3 bg-white rounded-2xl shadow-sm">
                                        <FileCheck className="w-10 h-10 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-black text-lg">{result.originalPdfName}</p>
                                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{result.images.length} Pages Processed</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setResult(null)}
                                    className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl shadow-sm transition-all hover:scale-110 active:scale-90"
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
                                        className="group relative aspect-[3/4] bg-gray-100 rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm"
                                    >
                                        <img src={img.imageUrl} alt={`Page ${img.pageNumber}`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-red-600/90 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all backdrop-blur-sm">
                                            <a 
                                                href={`${import.meta.env.VITE_API_URL || 'https://pdf-convertor-wbn9.onrender.com/api'}/pdf/pdf-to-image/download/${result._id}/${img.pageNumber}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-white text-[#E5322D] p-4 rounded-full hover:scale-110 active:scale-90 transition-all shadow-2xl"
                                            >
                                                <Download className="w-6 h-6" />
                                            </a>
                                        </div>
                                        <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[10px] text-gray-900 font-black tracking-widest border border-gray-100 shadow-sm">
                                            PAGE {img.pageNumber}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <div className="p-8 bg-white/80 border border-white rounded-[2rem] shadow-sm">
                        <h4 className="text-gray-900 font-black text-lg mb-3 flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-[#E5322D] shadow-[0_0_10px_rgba(229,50,45,0.5)]" />
                            Premium Optimization
                        </h4>
                        <p className="text-gray-600 font-bold text-sm">Industrial grade compression algorithms ensure small file size without losing detail.</p>
                    </div>
                    <div className="p-8 bg-white/80 border border-white rounded-[2rem] shadow-sm">
                        <h4 className="text-gray-900 font-black text-lg mb-3 flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                            Format Compatibility
                        </h4>
                        <p className="text-gray-600 font-bold text-sm">Convert complex PDFs including embedded vectors and high-res photography flawlessly.</p>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default PdfToImage;
