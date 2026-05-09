import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1.8 seconds loading animation duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          // Slide up hata diya hai, ab sirf smooth fade out hoga ending me
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden pointer-events-none"
        >
          {/* 
            Logo Reveal Sequence: 
            Zoom In (0 to 30%) -> Hold steady (30% to 75%) -> Massive Zoom Out covering screen (75% to 100%)
          */}
          <motion.div
            animate={{ 
              scale: [0.5, 1, 1, 40], // Scale to 40 at the end for an extreme fly-through full screen zoom
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 1.8, 
              times: [0, 0.3, 0.75, 1], 
              ease: "easeInOut" 
            }}
            className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center mb-6"
          >
            <img 
              src="/logo.jpeg" 
              alt="Company Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.h1 
            animate={{ 
              opacity: [0, 1, 1, 0], 
              scale: [0.8, 1, 1, 2] // Text expands and fades out along with the logo
            }}
            transition={{ duration: 1.8, times: [0, 0.3, 0.75, 1], ease: "easeInOut" }}
            className="text-slate-900 font-black text-3xl md:text-5xl tracking-[0.2em] uppercase absolute mt-64"
          >
            Cyvanta
          </motion.h1>
          
          {/* Fast loading bar */}
          <motion.div 
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, times: [0, 0.3, 0.75, 1] }}
            className="w-48 md:w-64 h-1.5 bg-slate-200 rounded-full mt-10 overflow-hidden absolute bottom-1/4"
          >
            <motion.div 
              className="h-full bg-cyan-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
