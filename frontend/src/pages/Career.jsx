import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';
import ContactModal from '../components/ContactModal';

const Career = () => {
  const [positions, setPositions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/careers`)
      .then(res => res.json())
      .then(data => setPositions(data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mb-6">
            <Briefcase className="w-4 h-4" />
            Join Our Team
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6">
            Build Your Career With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Cyvanta</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            We are always looking for passionate individuals who want to make a difference in technology and education. Check out our open positions below.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {positions.map((pos, index) => (
            <motion.div
              key={pos.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center group hover:border-blue-300 transition-all cursor-pointer"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{pos.title}</h3>
                <div className="flex gap-4 text-sm text-slate-500 font-medium">
                  <span className="bg-slate-100 px-3 py-1 rounded-md">{pos.type}</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-md">{pos.location}</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedJob(pos.title);
                  setIsModalOpen(true);
                }}
                className="mt-4 sm:mt-0 px-6 py-3 bg-blue-50 text-blue-600 rounded-lg font-bold group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center gap-2"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <ContactModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          serviceName={`Application for ${selectedJob}`} 
        />
      </div>
    </div>
  );
};

export default Career;
