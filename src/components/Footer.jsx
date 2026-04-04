import { Globe, MessageSquare, Briefcase, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-white/10 backdrop-blur-md border-t border-white/5 py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="flex justify-center space-x-10 mb-10">
                    <a href="#" className="text-gray-500 hover:text-red-500 transition-all hover:scale-125">
                        <MessageSquare className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-red-500 transition-all hover:scale-125">
                        <Globe className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-red-500 transition-all hover:scale-125">
                        <Briefcase className="w-6 h-6" />
                    </a>
                </div>
                <p className="text-white font-black text-sm uppercase tracking-[0.3em] mb-4">
                    © {new Date().getFullYear()} PDF Convertor. All rights reserved.
                </p>
                <p className="text-gray-600 font-bold text-[10px] flex items-center justify-center gap-2 uppercase tracking-widest">
                    Crafted with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> for the modern web.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
