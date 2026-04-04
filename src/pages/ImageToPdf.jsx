import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileUp, FileCheck, Loader2, Download, Trash2, LayoutGrid, X } from 'lucide-react';
import api from '../services/api';

const ImageToPdf = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (files.length === 0) return;
        setLoading(true);
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        try {
            const res = await api.post('/pdf/convert/image-to-pdf', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(res.data.pdf);
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
                    <h2 className="text-5xl font-black text-white uppercase mb-4 tracking-tight drop-shadow-sm">
                        Image to <span className="text-red-500 italic">PDF</span>
                    </h2>
                    <p className="text-gray-400 font-bold">Combine multiple images into a single professional PDF document.</p>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-[3rem] p-10 md:p-16 mb-12 backdrop-blur-2xl shadow-2xl">
                    {!result ? (
                        <div className="flex flex-col items-center">
                            <div className="w-full max-w-xl mb-10 aspect-video rounded-[2.5rem] border-3 border-dashed border-white/10 flex flex-col items-center justify-center relative hover:border-red-500/50 transition-all group bg-white/5">
                                <input 
                                    type="file" 
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="text-center p-6">
                                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 shadow-xl shadow-red-500/5 transition-transform border border-white/5">
                                        <FileUp className="w-10 h-10 text-red-500" />
                                    </div>
                                    <p className="text-white font-black text-xl">Click or drag images</p>
                                    <p className="text-gray-500 font-bold mt-2">Accepts JPG, PNG, WEBP</p>
                                </div>
                            </div>

                            {files.length > 0 && (
                                <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
                                    {files.map((file, i) => (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            key={i} 
                                            className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-white/5"
                                        >
                                            <img src={URL.createObjectURL(file)} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Preview" />
                                            <div className="absolute inset-0 bg-red-600/40 opacity-0 group-hover:opacity-100 transition-all" />
                                            <button 
                                                onClick={() => removeFile(i)}
                                                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-xl shadow-xl hover:scale-110 active:scale-90 transition-all"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            <button 
                                onClick={handleUpload}
                                disabled={files.length === 0 || loading}
                                className={`w-full max-w-sm flex items-center justify-center gap-4 py-5 rounded-2xl font-black text-xl transition-all active:scale-95 ${
                                    files.length === 0 || loading 
                                    ? 'bg-white/5 text-gray-600 cursor-not-allowed' 
                                    : 'bg-white text-black hover:scale-[1.02] shadow-2xl shadow-white/10'
                                }`}
                            >
                                {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : 'Generate PDF'}
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-28 h-28 bg-green-500/5 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse border-4 border-white/10 shadow-2xl">
                                <FileCheck className="w-14 h-14 text-green-500" />
                            </div>
                            <h3 className="text-4xl font-black text-white mb-3 uppercase tracking-tight">Success!</h3>
                            <p className="text-gray-400 font-bold mb-12">Your images have been converted into a single PDF document.</p>
                            
                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <a 
                                    href={result.fileUrl.replace('/upload/', '/upload/fl_attachment/')}
                                    className="flex items-center justify-center gap-4 bg-white text-black px-14 py-5 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-white/10"
                                >
                                    <Download className="w-7 h-7" /> Download PDF
                                </a>
                                <button 
                                    onClick={() => setResult(null)}
                                    className="px-14 py-5 bg-white/5 border border-white/10 text-gray-400 rounded-2xl hover:text-red-500 transition-all uppercase text-sm font-black tracking-widest shadow-sm hover:scale-105"
                                >
                                    Start Over
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );


};

export default ImageToPdf;
