import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import bgPattern from '../assets/bg-pattern.png';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 overflow-x-hidden">
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {/* Modern Gradient Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-blue-500/5 blur-[160px]" />
                
                {/* Document Pattern Overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.2] pointer-events-none"
                    style={{ 
                        backgroundImage: `url(${bgPattern})`,
                        backgroundSize: '400px',
                        backgroundRepeat: 'repeat',
                        mixBlendMode: 'screen' // Makes black transparent and keeps white lines
                    }}
                />
            </div>
            
            <Navbar />
            <main className="relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
