import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileImage, FileStack, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="pt-32 pb-20 px-4">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-8"
                >
                    <Zap className="w-3 h-3 fill-indigo-400" />
                    Ultra Fast Processing
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase"
                >
                    The Ultimate <br />
                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">
                        PDF Toolkit
                    </span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-12"
                >
                    Seamlessly convert PDF to Image and Image to PDF with industrial-grade tools. 
                    No file size limits. No privacy compromises. Just speed.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link to="/convert/pdf-to-image" className="group flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all">
                        PDF to Image <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/convert/image-to-pdf" className="flex items-center justify-center gap-3 bg-white/5 text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/10 hover:bg-white/10 transition-all active:scale-95">
                        Image to PDF
                    </Link>
                </motion.div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        icon: <FileImage className="w-8 h-8 text-indigo-500" />,
                        title: "High Fidelity",
                        desc: "Preserve every pixel. Our conversion algorithms ensure the highest quality images from your PDFs."
                    },
                    {
                        icon: <Zap className="w-8 h-8 text-purple-500" />,
                        title: "Instant Results",
                        desc: "Powered by modern cloud infrastructure to deliver results in seconds, not minutes."
                    },
                    {
                        icon: <ShieldCheck className="w-8 h-8 text-pink-500" />,
                        title: "Secure & Private",
                        desc: "All files are processed securely and deleted immediately. Your privacy is our priority."
                    }
                ].map((feature, i) => (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        key={i}
                        className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-indigo-500/50 hover:bg-white/10 transition-all group"
                    >
                        <div className="mb-4 p-3 rounded-2xl bg-white/5 inline-block group-hover:scale-110 transition-transform">
                            {feature.icon}
                        </div>
                        <h3 className="text-white text-xl font-bold mb-2 uppercase">{feature.title}</h3>
                        <p className="text-gray-400">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Home;
