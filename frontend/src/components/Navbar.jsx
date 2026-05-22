import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import InternshipRegistrationModal from './InternshipRegistrationModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'IT Services', path: '/it-services' },
    { name: 'Education', path: '/education' },
    { name: 'Internship', path: '/internship' },
  ];

  return (
    <>
      <nav className="fixed w-full z-[100] bg-blue-600/20 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-1 rounded-lg transition-colors overflow-hidden">
                <img src="/logo.jpeg" alt="Cyvanta Tech Quantum Logo" className="w-10 h-10 object-contain mix-blend-multiply" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">
                Cyvanta Tech Quantum
              </span>
              <span className="font-bold text-xl tracking-tight text-slate-900 sm:hidden">
                Cyvanta
              </span>
            </Link>

            {/* Desktop Menu & Admin Button */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <div className="flex items-center space-x-2 lg:space-x-4">
                {links.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`relative px-3 py-2 rounded-md text-sm font-bold transition-colors hover:text-cyan-700 ${isActive ? 'text-cyan-700' : 'text-slate-900'
                        }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 rounded-full"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  );
                })}

                {/* Registration Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <button className="relative px-3 py-2 rounded-md text-sm font-bold text-slate-900 hover:text-orange-600 transition-colors flex items-center gap-1 group">
                    Registration <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl shadow-orange-500/10 border border-orange-200 overflow-hidden"
                      >
                        <div className="p-2">
                          <button 
                            onClick={() => { setIsRegModalOpen(true); setIsDropdownOpen(false); }}
                            className="w-full text-left px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white rounded-lg font-bold transition-all shadow-md flex items-center justify-between"
                          >
                            Internship Registration
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <Link
                to="/admin"
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-bold shadow-md shadow-slate-200 transition-all flex items-center gap-2"
              >
                Admin
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-900 hover:text-cyan-700 hover:bg-white/50 focus:outline-none transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-blue-50/90 backdrop-blur-xl border-b border-white/20 shadow-lg absolute w-full"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-3 rounded-xl text-base font-bold transition-colors ${location.pathname === link.path
                        ? 'bg-cyan-100 text-cyan-800'
                        : 'text-slate-900 hover:bg-white/80 hover:text-cyan-800'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="pt-4 mt-2 border-t border-slate-100">
                  <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Registration</p>
                  <button 
                    onClick={() => { setIsRegModalOpen(true); setIsOpen(false); }}
                    className="w-full text-left px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-xl font-bold shadow-md shadow-orange-500/20 mb-4"
                  >
                    Internship Registration
                  </button>

                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-bold bg-slate-800 text-white text-center hover:bg-slate-900 transition-colors shadow-md"
                  >
                    Admin Login
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <InternshipRegistrationModal isOpen={isRegModalOpen} onClose={() => setIsRegModalOpen(false)} />
    </>
  );
};

export default Navbar;
