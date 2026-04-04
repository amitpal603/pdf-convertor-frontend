import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import bgPattern from '../assets/bg-pattern.png';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#0D0D0D] text-gray-100 selection:bg-red-500/30 overflow-x-hidden relative">
            {/* Professional Background Layering */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {/* Modern Gradient Orbs for Depth */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-500/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-red-600/5 blur-[120px]" />
                
                {/* Fixed Background Pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.25] pointer-events-none"
                    style={{ 
                        backgroundImage: `url(${bgPattern})`,
                        backgroundSize: '400px',
                        backgroundRepeat: 'repeat',
                        backgroundAttachment: 'fixed',
                        mixBlendMode: 'screen'
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

