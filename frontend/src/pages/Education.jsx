import { motion } from 'framer-motion';
import { Rocket, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Education = () => {
  return (
    <div className="min-h-screen bg-[#0A1128] flex items-center justify-center relative overflow-hidden font-sans pt-16">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]"></div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,211,238,0.3)] rotate-3 hover:rotate-6 transition-transform"
        >
          <GraduationCap className="w-12 h-12 md:w-16 md:h-16 text-white" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 font-bold text-sm mb-6 uppercase tracking-widest backdrop-blur-md">
            <Rocket className="w-4 h-4" /> Next-Gen Learning
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Education Portal <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Coming Soon</span>
          </h1>
          
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            We are building a revolutionary learning experience. Interactive courses, live tracking, and personalized dashboards are on the way.
          </p>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl font-black text-lg shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center gap-2 mx-auto transition-all"
            >
              Back to Home <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full blur-[1px]"
        animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-orange-400 rounded-full blur-[1px]"
        animate={{ y: [0, 30, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full blur-[1px]"
        animate={{ y: [0, -15, 0], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </div>
  );
};

export default Education;
