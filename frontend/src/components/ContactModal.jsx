import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from './ContactForm';

const ContactModal = ({ isOpen, onClose, serviceName }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-50 rounded-2xl shadow-2xl z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-600 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-2">
              <ContactForm serviceName={serviceName} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
