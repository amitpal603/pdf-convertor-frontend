import { Globe, MessageSquare, Briefcase, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-black/20 border-t border-white/5 py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="flex justify-center space-x-6 mb-8">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <MessageSquare className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Globe className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        <Briefcase className="w-5 h-5" />
                    </a>
                </div>
                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} PDF Conver. All rights reserved.
                </p>
                <p className="text-gray-600 text-xs mt-2 flex items-center justify-center gap-1">
                    Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for the modern web.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
