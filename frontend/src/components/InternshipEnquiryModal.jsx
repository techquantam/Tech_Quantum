import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Send } from 'lucide-react';

const InternshipEnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', college: '', branch: '', year: '', domain: '', thought: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/internship-enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsSuccess(true);
        // Automatically close after showing success animation for 3.5 seconds
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3500);
      } else {
        alert('Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10 overflow-y-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl relative z-10 overflow-hidden flex flex-col my-2"
        >
          {/* Form Content */}
          <div className="w-full p-6 lg:p-10 bg-white relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-20">
              <X className="w-5 h-5 text-slate-600" />
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center py-32 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle className="w-28 h-28 text-green-500 mb-8 drop-shadow-lg" />
                </motion.div>
                <h3 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Enquiry Submitted!</h3>
                <p className="text-slate-500 text-lg max-w-md">Thank you! Your enquiry details have been successfully submitted. We will get back to you soon.</p>
              </motion.div>
            ) : (
              <div className="max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-1">Internship Enquiry</h2>
                <p className="text-orange-500 font-bold mb-2 text-sm">Submit your details and we will get back to you!</p>
                <p className="text-slate-500 mb-6 text-sm font-medium">Fill out the details below.</p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                      <input required type="text" name="name" onChange={handleChange} className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all font-medium" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Email</label>
                      <input required type="email" name="email" onChange={handleChange} className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all font-medium" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
                      <input required type="tel" name="phone" onChange={handleChange} className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all font-medium" placeholder="+91 9876543210" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">College/University</label>
                      <input required type="text" name="college" onChange={handleChange} className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all font-medium" placeholder="Your College Name" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Branch</label>
                      <input required type="text" name="branch" onChange={handleChange} className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all font-medium" placeholder="e.g. CSE, IT, ECE" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Year of Study</label>
                      <input required type="text" name="year" onChange={handleChange} className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all font-medium" placeholder="e.g. 3rd Year" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Interested Domain</label>
                    <div className="relative">
                      <select required name="domain" onChange={handleChange} className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all font-medium appearance-none">
                        <option value="">Select Domain</option>
                        <option value="Full Stack Web Development">Full Stack Web Development</option>
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                        <option value="App Development">App Development</option>
                        <option value="Programming & DSA">Programming & DSA</option>
                        <option value="IoT & Robotics">IoT & Robotics</option>
                        <option value="AutoCAD & Design">AutoCAD & Design</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Any Thoughts / Comments?</label>
                    <textarea name="thought" onChange={handleChange} rows="2" className="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all resize-none font-medium" placeholder="Let us know if you have any questions..."></textarea>
                  </div>

                  <button disabled={isSubmitting} type="submit" className="w-full py-3 mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-black shadow-md flex justify-center items-center gap-2 transition-all disabled:opacity-70">
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : (
                      <><Send className="w-5 h-5" /> Submit Enquiry</>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InternshipEnquiryModal;
