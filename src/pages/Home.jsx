import React from 'react';
import { motion } from 'framer-motion';
import { 
    ArrowRight, FileImage, FileStack, ShieldCheck, Zap, 
    Presentation, Table, Edit3, Image as ImageIcon, 
    PenTool, Stamp, RotateCw, Code, Unlock, Lock, 
    Layout, FileType, Wrench, ListOrdered, Scan, 
    Languages, Columns, SquareX, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import bgPattern from '../assets/bg-pattern.png';

const tools = [
    {
        title: "PowerPoint to PDF",
        desc: "Make PPT and PPTX slideshows easy to view by converting them to PDF.",
        icon: <Presentation className="w-8 h-8 text-orange-500" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "Excel to PDF",
        desc: "Make EXCEL spreadsheets easy to read by converting them to PDF.",
        icon: <Table className="w-8 h-8 text-green-500" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "Edit PDF",
        desc: "Add text, images, shapes or freehand annotations to a PDF document.",
        icon: <Edit3 className="w-8 h-8 text-purple-500" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "PDF to JPG",
        desc: "Convert each PDF page into a JPG or extract all images contained in a PDF.",
        icon: <ImageIcon className="w-8 h-8 text-yellow-600" />,
        path: "/convert/pdf-to-image",
        status: "Functional"
    },
    {
        title: "JPG to PDF",
        desc: "Convert JPG images to PDF in seconds. Easily adjust orientation and margins.",
        icon: <FileImage className="w-8 h-8 text-yellow-600" />,
        path: "/convert/image-to-pdf",
        status: "Functional"
    },
    {
        title: "Sign PDF",
        desc: "Sign yourself or request electronic signatures from others.",
        icon: <PenTool className="w-8 h-8 text-blue-500" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "Watermark",
        desc: "Stamp an image or text over your PDF in seconds. Choose position and transparency.",
        icon: <Stamp className="w-8 h-8 text-purple-400" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "Rotate PDF",
        desc: "Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!",
        icon: <RotateCw className="w-8 h-8 text-pink-500" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "HTML to PDF",
        desc: "Convert webpages in HTML to PDF. Copy and paste the URL and convert it with a click.",
        icon: <Code className="w-8 h-8 text-yellow-700" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "Unlock PDF",
        desc: "Remove PDF password security, giving you the freedom to use your PDFs as you want.",
        icon: <Unlock className="w-8 h-8 text-blue-400" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "Protect PDF",
        desc: "Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.",
        icon: <Lock className="w-8 h-8 text-blue-600" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "Organize PDF",
        desc: "Sort pages of your PDF file however you like. Delete or add PDF pages at your convenience.",
        icon: <Layout className="w-8 h-8 text-orange-600" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "PDF to PDF/A",
        desc: "Transform your PDF to PDF/A, the ISO-standardized version of PDF for long-term archiving.",
        icon: <FileType className="w-8 h-8 text-blue-500" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "Repair PDF",
        desc: "Repair a damaged PDF and recover data from corrupt PDF. Fix PDF files with our Repair tool.",
        icon: <Wrench className="w-8 h-8 text-green-600" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "Page numbers",
        desc: "Add page numbers into PDFs with ease. Choose your positions, dimensions, typography.",
        icon: <ListOrdered className="w-8 h-8 text-purple-600" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "Scan to PDF",
        desc: "Capture document scans from your mobile device and send them instantly to your browser.",
        icon: <Scan className="w-8 h-8 text-orange-500" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "OCR PDF",
        desc: "Easily convert scanned PDF into searchable and selectable documents.",
        icon: <Languages className="w-8 h-8 text-green-500" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "Compare PDF",
        desc: "Show a side-by-side document comparison and easily spot changes between different file versions.",
        icon: <Columns className="w-8 h-8 text-blue-500" />,
        path: "#",
        status: "Coming Soon"
    },
    {
        title: "Redact PDF",
        desc: "Redact text and graphics to permanently remove sensitive information from a PDF.",
        icon: <SquareX className="w-8 h-8 text-red-500" />,
        path: "#",
        status: "Coming Soon"
    },
];

const Home = () => {
    return (
        <div className="pt-32 pb-20 px-4 min-h-screen">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/5 border border-red-500/10 text-red-600 text-sm font-bold mb-8 shadow-sm"
                >
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    Every tool you need to work with PDFs in one place
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 mb-6 drop-shadow-sm"
                >
                    Every tool you need to use PDFs, <br />
                    <span className="text-[#E5322D]">at your fingertips.</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl mx-auto text-gray-700 text-lg mb-10 font-semibold leading-relaxed"
                >
                    All the tools you need to efficiently enhance your digital documents while keeping your data safe and secure.
                </motion.p>
            </div>

            {/* Tools Grid Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tools.map((tool, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <Link 
                                to={tool.path}
                                className={`group relative flex flex-col h-full bg-white/90 backdrop-blur-sm border border-gray-100 p-8 rounded-[2rem] hover:bg-white hover:border-red-500/30 transition-all duration-300 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(229,50,45,0.08)] ${tool.status === 'Coming Soon' ? 'cursor-not-allowed opacity-90' : ''}`}
                            >
                                {/* Tool Status Badge */}
                                {tool.status === 'Coming Soon' && (
                                    <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-tighter bg-gray-50 text-gray-400 px-2 py-1 rounded-md border border-gray-100">
                                        Soon
                                    </span>
                                )}
                                {tool.status === 'Functional' && (
                                    <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-tighter bg-red-500/10 text-[#E5322D] px-2 py-1 rounded-md border border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Ready
                                    </span>
                                )}

                                <div className="mb-6 p-4 bg-gray-50 rounded-2xl w-fit group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                    {tool.icon}
                                </div>
                                
                                <h3 className="text-gray-900 text-xl font-black mb-3 group-hover:text-[#E5322D] transition-colors">
                                    {tool.title}
                                </h3>
                                
                                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-4">
                                    {tool.desc}
                                </p>

                                <div className="mt-auto pt-4 flex items-center gap-2 text-[#E5322D] text-sm font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                                    {tool.status === 'Functional' ? 'Get Started' : 'Learn More'} 
                                    <ArrowRight className="w-4 h-4" />
                                </div>

                                {/* Decorative Background Glow */}
                                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-red-500/5 blur-[50px] group-hover:bg-red-500/10 transition-all duration-500" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto mt-32 text-center border-t border-gray-200/50 pt-20 relative z-10">
                <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-100 shadow-sm mb-8">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                    <span className="text-gray-900 font-black">Your data is safe with us</span>
                </div>
                <p className="max-w-xl mx-auto text-gray-600 text-sm font-bold">
                    We process your files securely using industrial-grade encryption. <br />
                    All files are automatically deleted after processing.
                </p>
            </div>
        </div>
    );
};

export default Home;


