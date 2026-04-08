import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Loading = ({ message = "Loading..." }) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
            <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl flex flex-col items-center gap-6 shadow-2xl">
                <div className="relative">
                    <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
                    <div className="absolute inset-0 w-12 h-12 border-2 border-red-500/20 rounded-full" />
                </div>
                
                <div className="text-center">
                    <h3 className="text-lg font-black text-white uppercase tracking-[0.2em] mb-1">
                        {message}
                    </h3>
                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">
                        Syncing with core cluster
                    </p>
                </div>

                <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                        <motion.div 
                            key={i}
                            animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{ 
                                duration: 1, 
                                repeat: Infinity, 
                                delay: i * 0.2 
                            }}
                            className="w-1 h-1 bg-red-500 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Loading;
