import { Globe, MessageSquare, Briefcase, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-white/40 backdrop-blur-md border-t border-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="flex justify-center space-x-8 mb-10">
                    <a href="#" className="text-gray-400 hover:text-[#E5322D] transition-all hover:scale-110">
                        <MessageSquare className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#E5322D] transition-all hover:scale-110">
                        <Globe className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#E5322D] transition-all hover:scale-110">
                        <Briefcase className="w-6 h-6" />
                    </a>
                </div>
                <p className="text-gray-900 font-black text-sm uppercase tracking-widest">
                    © {new Date().getFullYear()} PDF Convertor. All rights reserved.
                </p>
                <p className="text-gray-400 font-bold text-xs mt-3 flex items-center justify-center gap-2 uppercase tracking-tight">
                    Crafted with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> for the modern web.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
