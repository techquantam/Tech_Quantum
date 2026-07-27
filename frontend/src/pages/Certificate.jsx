import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Mail, Award, Check, Copy, Search, Calendar, RotateCcw, ShieldCheck, ShieldAlert, FileText } from 'lucide-react';

const Certificate = () => {
  const { registrationNumber } = useParams();
  const navigate = useNavigate();

  const [searchNumber, setSearchNumber] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Dynamic SEO titles matching current page state
    let titleText = "Certificate Verification | Cyvanta Tech Quantum Pvt. Ltd.";
    if (searched && student) {
      titleText = `${student.studentName} - Verified Certificate | Cyvanta`;
    } else if (searched && error) {
      titleText = "Certificate Not Found | Cyvanta";
    }
    document.title = titleText;

    let metaDescription = document.querySelector('meta[name="description"]');
    let originalDescription = "";
    if (metaDescription) {
      originalDescription = metaDescription.content;
      metaDescription.content = "Verify the authenticity of certificates issued by Cyvanta Tech Quantum Pvt. Ltd. for our Internship Programs.";
    }

    return () => {
      document.title = "Cyvanta Tech Quantum - IT Solutions & Tech Training";
      if (metaDescription) {
        metaDescription.content = originalDescription || "Cyvanta Tech Quantum provides cutting-edge IT solutions, industrial training, and internships.";
      }
    };
  }, [searched, student, error]);

  // Automatic trigger if registrationNumber is in route params
  useEffect(() => {
    if (registrationNumber) {
      setSearchNumber(registrationNumber);
      verifyCertificate(registrationNumber);
    } else {
      setStudent(null);
      setError(null);
      setSearched(false);
    }
  }, [registrationNumber]);

  const verifyCertificate = async (regNo) => {
    if (!regNo.trim()) return;
    setLoading(true);
    setError(null);
    setStudent(null);
    setSearched(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/verify/${encodeURIComponent(regNo.trim())}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Certificate Not Found');
        }
        throw new Error('Verification failed. Please try again.');
      }
      const data = await res.json();
      setStudent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchNumber.trim()) {
      navigate(`/certificate/${encodeURIComponent(searchNumber.trim())}`);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("techquantum.india@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetSearch = () => {
    setSearchNumber('');
    setStudent(null);
    setError(null);
    setSearched(false);
    navigate('/certificate');
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-[#FFF9F5] via-white to-[#F8FAFC] py-12 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Decorative ambient background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-[100px] opacity-40 -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-100/40 rounded-full blur-[120px] opacity-40 -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100/80 p-6 sm:p-8 text-center relative z-10 transition-shadow duration-300"
      >
        {/* Header Branding */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#0A2540]/5 rounded-lg border border-slate-100">
              <img
                src="/logo.jpeg"
                alt="Cyvanta Tech Quantum Logo"
                className="w-8 h-8 object-contain mix-blend-multiply"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <span className="font-extrabold text-sm text-[#0A2540] tracking-tight">
              Cyvanta Tech Quantum
            </span>
          </div>

          <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase">
            Official Verification Portal
          </span>
        </div>

        {/* Dynamic Views */}
        <AnimatePresence mode="wait">
          {!searched && !loading && (
            <motion.div
              key="search-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-6"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Award className="w-8 h-8" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight mb-2">
                Certificate Verification
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto mb-8 font-medium">
                Verify the status and details of internship completion certificates issued by Cyvanta Tech Quantum Pvt. Ltd.
              </p>

              <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto relative">
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter Certificate / Registration Number"
                    value={searchNumber}
                    onChange={(e) => setSearchNumber(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-2xl text-slate-800 font-semibold text-sm outline-none transition-all placeholder:text-slate-400 shadow-inner"
                  />
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all text-sm"
                >
                  Verify Certificate
                </button>
              </form>
            </motion.div>
          )}

          {loading && (
            <motion.div
              key="loading-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center"
            >
              <div className="relative flex items-center justify-center w-12 h-12 mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                Querying database records...
              </p>
            </motion.div>
          )}

          {searched && !loading && error && (
            <motion.div
              key="error-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-6"
            >
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-red-600 tracking-tight mb-2">
                Certificate Not Found
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto mb-6 font-medium">
                The certificate number <strong className="text-slate-800 font-bold">"{searchNumber}"</strong> does not match any official record in our database.
              </p>
              <div className="bg-red-50/50 rounded-xl p-3 border border-red-100 text-red-800 text-[11px] leading-relaxed max-w-md mx-auto mb-8 font-semibold">
                ⚠️ Verification Failed. Ensure the spelling/format is exactly as printed on the physical copy.
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                <button
                  onClick={resetSearch}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-all text-xs flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Search Another
                </button>
              </div>
            </motion.div>
          )}

          {searched && !loading && student && (
            <motion.div
              key="success-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="text-left"
            >
              {/* Top Success Header Banner */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-emerald-50/80 border border-emerald-100 rounded-2xl p-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-emerald-800 font-black text-lg">Certificate Verified</h3>
                  <p className="text-emerald-600 text-xs font-semibold">Official Internship Record Verified Authentically</p>
                </div>
                <div className="sm:ml-auto">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border ${
                    student.status === 'Completed' 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-red-100 text-red-800 border-red-300'
                  }`}>
                    {student.status || 'Completed'}
                  </span>
                </div>
              </div>

              {/* Grid Layout: Student Profile Photo + Info Table */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                {student.photoUrl && (
                  <div className="md:col-span-4 flex flex-col items-center justify-start">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-slate-200 p-0.5 bg-white shadow-sm flex items-center justify-center">
                      <img 
                        src={student.photoUrl} 
                        alt={student.studentName} 
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Intern Photograph</span>
                  </div>
                )}

                <div className={`${student.photoUrl ? 'md:col-span-8' : 'md:col-span-12'} overflow-hidden border border-slate-100 rounded-2xl shadow-sm bg-slate-50/50`}>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="grid grid-cols-3 p-3">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Student Name</span>
                      <span className="col-span-2 font-extrabold text-slate-800">{student.studentName}</span>
                    </div>
                    <div className="grid grid-cols-3 p-3">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Certificate No</span>
                      <span className="col-span-2 font-mono font-bold text-slate-700">{student.certificateNumber}</span>
                    </div>
                    {student.college && (
                      <div className="grid grid-cols-3 p-3">
                        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">College</span>
                        <span className="col-span-2 font-bold text-slate-700">{student.college}</span>
                      </div>
                    )}
                    {student.branch && (
                      <div className="grid grid-cols-3 p-3">
                        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Branch</span>
                        <span className="col-span-2 font-bold text-slate-700">{student.branch}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-3 p-3">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Course</span>
                      <span className="col-span-2 font-bold text-slate-700">{student.course}</span>
                    </div>
                    <div className="grid grid-cols-3 p-3">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Intern Program</span>
                      <span className="col-span-2 font-bold text-slate-700">{student.internshipProgram}</span>
                    </div>
                    <div className="grid grid-cols-3 p-3">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Duration</span>
                      <span className="col-span-2 font-bold text-slate-700">{student.duration}</span>
                    </div>
                    {student.issueDate && (
                      <div className="grid grid-cols-3 p-3">
                        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">Issue Date</span>
                        <span className="col-span-2 font-bold text-slate-700 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" /> {student.issueDate}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* View Certificate PDF Button */}
              {student.pdfUrl && (
                <div className="mb-6">
                  <a
                    href={student.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 p-3.5 bg-blue-50 border border-blue-200/50 hover:bg-blue-100 hover:border-blue-300 text-blue-700 rounded-xl font-bold transition-all text-xs cursor-pointer shadow-sm group animate-pulse"
                  >
                    <FileText className="w-4.5 h-4.5 group-hover:scale-105 transition-transform" />
                    View Certificate PDF Document
                  </a>
                </div>
              )}

              {/* Actions & Links Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <a
                  href="https://techquantum.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white border border-slate-100 hover:border-blue-500/30 rounded-xl hover:shadow-md transition-all group"
                >
                  <div className="w-8.5 h-8.5 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Globe className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Website</p>
                    <p className="text-xs font-extrabold text-slate-700 truncate group-hover:text-blue-600">techquantum.in</p>
                  </div>
                </a>

                <div
                  onClick={handleCopyEmail}
                  className="flex items-center justify-between p-3 bg-white border border-slate-100 hover:border-blue-500/30 rounded-xl hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8.5 h-8.5 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      {copied ? <Check className="w-4.5 h-4.5" /> : <Mail className="w-4.5 h-4.5" />}
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                      <p className="text-xs font-extrabold text-slate-700 truncate group-hover:text-blue-600">techquantum.india@gmail.com</p>
                    </div>
                  </div>
                  {copied && (
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                      Copied
                    </span>
                  )}
                </div>
              </div>

              {/* Reset Search Button */}
              <div className="flex justify-center border-t border-slate-100 pt-4">
                <button
                  onClick={resetSearch}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Verify Another Certificate
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info */}
        <div className="text-center border-t border-slate-100 pt-4 mt-6">
          <p className="text-[10px] font-bold text-slate-400 tracking-widest leading-relaxed">
            © 2026 Cyvanta Tech Quantum Pvt. Ltd. <br className="sm:hidden" /> All Rights Reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Certificate;
