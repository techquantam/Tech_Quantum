import { motion } from 'framer-motion';
import { Rocket, Target, Users, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-[#F05A28] font-semibold text-sm mb-6">
            <Rocket className="w-4 h-4" />
            About Cyvanta Tech Quantum
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6">
            Innovating the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F05A28] to-orange-500">Tech & Education</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">
            We bridge the gap between industry demands and academic learning by providing cutting-edge IT solutions and world-class educational programs.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-[#F05A28]" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              To empower businesses with next-generation technology and to nurture students into leading thinkers, creators, and innovators of tomorrow. We strive to create an ecosystem where technology meets practical education.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              To become India's leading hub for enterprise IT solutions and skill-based education, driving the digital transformation of schools, colleges, and global businesses.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
