import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-600 font-semibold text-sm mb-6">
            <Mail className="w-4 h-4" />
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6">
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Conversation</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Have a question about our IT services, educational programs, or want to partner with us? Drop us a message!
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
           {/* Reusing our existing ContactForm component */}
           <ContactForm service="General Inquiry" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
