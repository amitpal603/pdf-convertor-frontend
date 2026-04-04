import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import bgPattern from '../assets/bg-pattern.png';

const Layout = ({ children }) => {
    return (
        <div 
            className="min-h-screen bg-[#F8F9FA] text-gray-900 selection:bg-red-500/20 overflow-x-hidden relative"
            style={{ 
                backgroundImage: `url(${bgPattern})`,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center'
            }}
        >
            {/* Soft Overlay for better readability */}
            <div className="fixed inset-0 bg-white/40 pointer-events-none z-0" />
            
            <Navbar />
            <main className="relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

