import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Mail, Award, Check, Copy } from 'lucide-react';

const Verify = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Set dynamic SEO page title
    document.title = "Certificate Verification | Cyvanta Tech Quantum Pvt. Ltd.";

    // Find or create dynamic SEO meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    let originalDescription = "";
    if (metaDescription) {
      originalDescription = metaDescription.content;
      metaDescription.content = "Verify the authenticity of certificates issued by Cyvanta Tech Quantum Pvt. Ltd. for the Summer Internship Program 2026.";
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      metaDescription.content = "Verify the authenticity of certificates issued by Cyvanta Tech Quantum Pvt. Ltd. for the Summer Internship Program 2026.";
      document.head.appendChild(metaDescription);
    }

    // Dynamic Open Graph SEO elements
    let ogDescription = document.querySelector('meta[property="og:description"]');
    let originalOgDesc = ogDescription ? ogDescription.content : "";
    if (ogDescription) {
      ogDescription.content = "Verify the authenticity of certificates issued by Cyvanta Tech Quantum Pvt. Ltd. for the Summer Internship Program 2026.";
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    let originalOgTitle = ogTitle ? ogTitle.content : "";
    if (ogTitle) {
      ogTitle.content = "Certificate Verification | Cyvanta Tech Quantum Pvt. Ltd.";
    }

    // Restore original values when navigating away
    return () => {
      document.title = "Cyvanta Tech Quantum - IT Solutions & Tech Training";
      if (metaDescription) {
        metaDescription.content = originalDescription || "Cyvanta Tech Quantum provides cutting-edge IT solutions, industrial training, and internships to bridge the gap between traditional education and industry advancements.";
      }
      if (ogDescription) {
        ogDescription.content = originalOgDesc || "Cyvanta Tech Quantum provides cutting-edge IT solutions, industrial training, and internships to bridge the gap between traditional education and industry advancements.";
      }
      if (ogTitle) {
        ogTitle.content = originalOgTitle || "Cyvanta Tech Quantum - IT Solutions & Tech Training";
      }
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("techquantum.india@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[75vh] bg-gradient-to-b from-[#FFF9F5] via-white to-[#F8FAFC] py-8 sm:py-12 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Decorative ambient background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-100/40 rounded-full blur-[100px] opacity-40 -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-100/40 rounded-full blur-[120px] opacity-40 -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Main card wrapper with fade-in, hover zoom, and interactive properties */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ y: -2, boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08)" }}
        className="max-w-xl w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100/80 p-6 sm:p-8 text-center relative z-10 transition-shadow duration-300"
      >
        {/* Top Header Row with Logo & Verified Pill side-by-side to save height */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#0A2540]/5 rounded-lg border border-slate-100">
              <img
                src="/logo.jpeg"
                alt="Cyvanta Tech Quantum Logo"
                className="w-8 h-8 object-contain mix-blend-multiply"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <span className="font-extrabold text-sm text-[#0A2540] tracking-tight">
              Cyvanta Tech Quantum
            </span>
          </div>

          {/* Glowing VERIFIED badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-black tracking-widest uppercase shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            Verified
          </span>
        </div>

        {/* Animated Checkmark Success Container */}
        <div className="flex justify-center mb-3">
          <div className="relative flex items-center justify-center w-14 h-14 bg-emerald-50 rounded-full border border-emerald-100/80">
            {/* Pulsing ring around the checkmark */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-emerald-400/30"
            />
            {/* SVG Checkmark */}
            <svg className="w-8 h-8 text-emerald-600 relative z-10" viewBox="0 0 52 52" fill="none">
              <motion.circle
                cx="26"
                cy="26"
                r="24"
                stroke="currentColor"
                strokeWidth="4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.path
                d="M17 26l6 6 12-12"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.35, delay: 0.4, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </div>

        {/* Verified Certificate Title & Sub-heading */}
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight mb-1">
          Certificate Verified
        </h1>
        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">
          Official Internship Record
        </p>

        {/* Verification Message */}
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 max-w-md mx-auto font-medium">
          This certificate has been officially issued by <strong className="text-slate-800 font-bold">Cyvanta Tech Quantum Pvt. Ltd.</strong> under the <span className="text-emerald-600 font-bold">Summer Internship Program 2026</span>.
        </p>
        <div className="bg-[#FFF9F5] rounded-xl p-2.5 mb-4 border border-orange-100 text-slate-500 text-[11px] leading-relaxed max-w-md mx-auto">
          Scanning this QR Code confirms that the certificate belongs to our official internship program.
        </div>

        {/* About the Internship Section (Optimized layout) */}
        <div className="text-left bg-slate-50/80 rounded-xl p-4 border border-slate-100 mb-4 shadow-sm">
          <h2 className="text-[11px] font-black text-slate-700 tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#F05A28]" />
            About the Internship
          </h2>
          <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed font-medium">
            Our Summer Internship Program provides practical industry exposure, hands-on project experience, and professional skill development in software development, web technologies, mobile application development, AI, robotics, and emerging technologies.
          </p>
        </div>

        {/* Interactive Contact & Links Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-6">
          <a
            href="https://techquantum.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-white border border-slate-100 hover:border-emerald-500/30 rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className="w-8.5 h-8.5 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors shrink-0">
              <Globe className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Website</p>
              <p className="text-xs font-extrabold text-slate-700 group-hover:text-emerald-600 transition-colors truncate">techquantum.in</p>
            </div>
          </a>

          <div
            onClick={handleCopyEmail}
            className="flex items-center justify-between p-3 bg-white border border-slate-100 hover:border-emerald-500/30 rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
            title="Click to copy email address"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8.5 h-8.5 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors shrink-0">
                {copied ? <Check className="w-4.5 h-4.5 text-emerald-600" /> : <Mail className="w-4.5 h-4.5" />}
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                <p className="text-xs font-extrabold text-slate-700 group-hover:text-emerald-600 transition-colors truncate">techquantum.india@gmail.com</p>
              </div>
            </div>
            
            {/* Interactive Clipboard State Icon/Label */}
            <div className="ml-1 text-[10px] font-extrabold text-emerald-600 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider"
                  >
                    Copied
                  </motion.span>
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Card Specific Footer */}
        <div className="text-center border-t border-slate-100 pt-4 mt-2">
          <p className="text-[10px] font-bold text-slate-400 tracking-widest leading-relaxed">
            © 2026 Cyvanta Tech Quantum Pvt. Ltd. <br className="sm:hidden" /> All Rights Reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Verify;
