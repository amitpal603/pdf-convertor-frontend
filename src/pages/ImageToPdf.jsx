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
                    <h2 className="text-4xl font-bold text-white uppercase mb-4 tracking-tight">
                        Image to <span className="text-purple-500 italic">PDF</span>
                    </h2>
                    <p className="text-gray-400">Combine multiple images into a single professional PDF document.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-12 backdrop-blur-sm shadow-2xl">
                    {!result ? (
                        <div className="flex flex-col items-center">
                            <div className="w-full max-w-lg mb-8 aspect-video rounded-3xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center relative hover:border-purple-500/50 transition-colors group">
                                <input 
                                    type="file" 
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="text-center p-4">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <FileUp className="w-8 h-8 text-purple-500" />
                                    </div>
                                    <p className="text-white font-medium">Click or drag images</p>
                                    <p className="text-gray-500 text-sm mt-1">Accepts JPG, PNG, WEBP</p>
                                </div>
                            </div>

                            {files.length > 0 && (
                                <div className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                    {files.map((file, i) => (
                                        <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
                                            <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="Preview" />
                                            <button 
                                                onClick={() => removeFile(i)}
                                                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button 
                                onClick={handleUpload}
                                disabled={files.length === 0 || loading}
                                className={`w-full max-w-xs flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${
                                    files.length === 0 || loading 
                                    ? 'bg-white/10 text-gray-500 cursor-not-allowed border border-white/5' 
                                    : 'bg-white text-black hover:scale-105 shadow-xl shadow-purple-500/10'
                                }`}
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Generate PDF'}
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                                <FileCheck className="w-12 h-12 text-green-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2 uppercase tracking-wide">Success!</h3>
                            <p className="text-gray-400 mb-12">Your images have been converted into a single PDF document.</p>
                            
                            <div className="flex justify-center gap-4">
                                <a 
                                    href={result.fileUrl.replace('/upload/', '/upload/fl_attachment/')}
                                    className="flex items-center gap-3 bg-white text-black px-12 py-4 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl"
                                >
                                    <Download className="w-6 h-6" /> Download PDF
                                </a>
                                <button 
                                    onClick={() => setResult(null)}
                                    className="p-4 bg-white/5 border border-white/10 text-gray-400 rounded-2xl hover:text-white transition-all uppercase text-sm font-bold tracking-widest"
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
