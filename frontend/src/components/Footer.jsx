import { useState } from 'react';
import { Rocket, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactModal from './ContactModal';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="bg-[#0A2540] pt-10 pb-6 border-t-[6px] border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

          {/* Column 1: Brand & Intro */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="p-1 rounded-lg">
                <img src="/logo.jpeg" alt="Cyvanta Tech Quantum Logo" className="w-10 h-10 object-contain mix-blend-multiply" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white flex flex-col">
                Cyvanta <span className="text-sm font-normal text-slate-300">Tech Quantum Pvt Ltd</span>
              </span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-4 font-medium">
              We are a digital technology company for students and enterprises. Our mission is to help people become creators, thinkers, and innovators.
            </p>

            <div className="flex gap-3">
              <a href="https://www.instagram.com/techquantumlko/" className="p-2 bg-white/10 hover:bg-white/20 rounded text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com/company/cyvanta-tech-quantum/" className="p-2 bg-white/10 hover:bg-white/20 rounded text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 pb-1 border-b-2 border-blue-500 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm font-medium">
              <li><Link to="/about" className="hover:text-white transition-all">About Us</Link></li>
              <li><Link to="/career" className="hover:text-white transition-all">Career</Link></li>
              <li><button onClick={() => setIsModalOpen(true)} className="hover:text-white transition-all">Contact Us</button></li>
              <li><Link to="/blog" className="hover:text-white transition-all">Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 pb-1 border-b-2 border-blue-500 inline-block">
              Get In Touch
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm mb-4 font-medium">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a href="mailto:techquantum.india@gmail.com" className="hover:text-white">techquantum.india@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span>+91 7232912907, +91 9454216701</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-1" />
                <span className="leading-relaxed">B-2/390, Sitapur Rd, Sector-A, Secheme,<br /> Aliganj, Lucknow, Uttar Pradesh 226024</span>
              </li>
            </ul>

            <div className="bg-[#1C3A5A] p-3 rounded-lg">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-white text-sm font-medium">Mon - Sat: 09:00 AM - 6:00 PM</span>
              </div>
              <p className="text-red-400 text-sm font-medium ml-6">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Copyright Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-center items-center">
          <p className="text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} Cyvanta Tech Quantum Pvt Ltd.
          </p>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName="General Inquiry"
      />
    </footer>
  );
};

export default Footer;
