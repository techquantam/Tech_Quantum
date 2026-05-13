import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle } from 'lucide-react';

const ContactForm = ({ serviceName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Send data to backend (which sends Email AND WhatsApp)
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service: serviceName
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setStatus('idle');
      }, 4000);

    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-8 rounded-2xl relative overflow-hidden"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-bold mb-6 text-slate-800">Get in Touch</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all outline-none text-slate-800 shadow-sm"
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all outline-none text-slate-800 shadow-sm"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all outline-none text-slate-800 shadow-sm"
              placeholder="+91 9876543210"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all outline-none text-slate-800 shadow-sm resize-none"
            placeholder="Tell us about your requirements..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
            status === 'success' 
            ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
            : 'bg-brand-accent hover:bg-brand-accentHover text-white shadow-lg shadow-brand-accent/30 hover:shadow-brand-accent/50'
          }`}
        >
          {status === 'submitting' ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
          ) : status === 'success' ? (
            <><CheckCircle className="w-5 h-5" /> Message Sent Successfully!</>
          ) : (
            <><Send className="w-5 h-5" /> Send Message</>
          )}
        </button>
        {status === 'error' && (
          <p className="text-red-500 font-medium text-sm mt-2 text-center">Something went wrong. Please try again.</p>
        )}
      </div>
    </motion.form>
  );
};

export default ContactForm;

