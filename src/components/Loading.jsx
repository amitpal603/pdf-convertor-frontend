import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Loading = ({ message = "Processing your request..." }) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl"
        >
            <div className="text-center">
                <div className="relative mb-8">
                    <motion.div 
                        animate={{ 
                            rotate: 360,
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ 
                            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="w-24 h-24 border-t-4 border-r-4 border-red-500 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.3)] relative z-10"
                    />
                    <motion.div 
                        animate={{ 
                            rotate: -360,
                            scale: [1, 1.05, 1],
                        }}
                        transition={{ 
                            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute inset-0 w-24 h-24 border-b-4 border-l-4 border-purple-500/50 rounded-full blur-sm"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-white animate-spin opacity-50" />
                    </div>
                </div>
                
                <motion.h3 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-2xl font-black text-white uppercase tracking-widest mb-2"
                >
                    {message}
                </motion.h3>
                <p className="text-gray-500 font-bold text-sm tracking-widest">PLEASE DO NOT CLOSE THIS WINDOW</p>
                
                <div className="mt-8 flex justify-center gap-1.5">
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
                            className="w-1.5 h-1.5 bg-red-500 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Loading;
