import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Smartphone, Server, Shield, Database, Layout,
  Cpu, Cloud, CheckCircle2, Star, ChevronDown,
  ArrowRight, Rocket, Zap, Users, Clock, Briefcase,
  Play, Award, GraduationCap, MonitorPlay, LineChart,
  Lightbulb, Building2, Quote, Check, Settings, Trophy,
  Terminal, Bot
} from 'lucide-react';
import ContactModal from '../components/ContactModal';
import InternshipRegistrationModal from '../components/InternshipRegistrationModal';
import InternshipEnquiryModal from '../components/InternshipEnquiryModal';

// Static Data
const programs = [
  { icon: Code, title: "Full Stack Web Development", level: "Beginner to Advanced", projects: 4, tools: "MERN Stack, Java, Python", color: "from-blue-500 to-cyan-400" },
  { icon: Cpu, title: "AI & Machine Learning", level: "Intermediate", projects: 3, tools: "Python, TensorFlow", color: "from-purple-500 to-pink-500" },
  { icon: Smartphone, title: "App Development", level: "Beginner to Advanced", projects: 3, tools: "React Native, Firebase", color: "from-green-400 to-emerald-600" },
  { icon: Terminal, title: "Programming & DSA", level: "Beginner to Advanced", projects: 200, tools: "C++, Java, Python", color: "from-orange-400 to-amber-600" },
  { icon: Bot, title: "IoT & Robotics", level: "Intermediate", projects: 4, tools: "Arduino, Raspberry Pi", color: "from-red-500 to-rose-600" },
  { icon: Layout, title: "AutoCAD & Design", level: "Beginner to Intermediate", projects: 4, tools: "AutoCAD, SolidWorks", color: "from-indigo-500 to-blue-600" }
];

const whyChooseUs = [
  { icon: Award, title: "Industry-Oriented Curriculum", desc: "Learn exactly what tech companies are looking for right now." },
  { icon: MonitorPlay, title: "Hands-on Projects", desc: "Stop watching tutorials and start building real applications." },
  { icon: Users, title: "Expert Mentorship", desc: "Get 1-on-1 guidance from senior developers." },
  { icon: GraduationCap, title: "Internship Certificate", desc: "Get an ISO-certified, verifiable experience letter." },
  { icon: Briefcase, title: "Career Guidance", desc: "Resume reviews, mock interviews, and LinkedIn optimization." },
  { icon: Rocket, title: "Startup Exposure", desc: "Experience the fast-paced culture of building products from scratch." }
];

const journeySteps = [
  { num: "1", title: "Register", desc: "Sign up and clear the basic aptitude evaluation." },
  { num: "2", title: "Attend Training", desc: "Master the tech stack through live, interactive sessions." },
  { num: "3", title: "Build Projects", desc: "Develop 3+ industry-grade applications from scratch." },
  { num: "4", title: "Assessments", desc: "Clear coding rounds and project evaluations." },
  { num: "5", title: "Certification", desc: "Receive your verified experience letter and certificates." },
  { num: "6", title: "Placement", desc: "Get referred to top tech startups and MNCs." }
];

const liveProjects = [
  { title: "AI Chatbot Application", tag: "AI/ML", color: "bg-purple-100 text-purple-700" },
  { title: "E-Commerce Platform", tag: "MERN Stack", color: "bg-blue-100 text-blue-700" },
  { title: "Smart Attendance System", tag: "IoT & Python", color: "bg-emerald-100 text-emerald-700" },
  { title: "Hospital Management", tag: "Java / Spring", color: "bg-rose-100 text-rose-700" }
];

const stats = [
  { val: "250+", label: "Students Trained" },
  { val: "80+", label: "Workshops Held" },
  { val: "35+", label: "Live Projects" },
  { val: "15+", label: "Technologies" }
];

const Internship = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [testiIndex, setTestiIndex] = useState(0);

  // Dynamic Data
  const [heroVideo, setHeroVideo] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/hero`).then(r => r.json()).then(d => setHeroVideo(d.videoUrl)).catch(console.error);
    fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/testimonials`).then(r => r.json()).then(d => setTestimonials(d)).catch(console.error);
    fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/faqs`).then(r => r.json()).then(d => setFaqs(d)).catch(console.error);
    fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/colleges`).then(r => r.json()).then(d => setColleges(d)).catch(console.error);
    fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/gallery`).then(r => r.json()).then(d => setGallery(d)).catch(console.error);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setTestiIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden font-sans">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 overflow-hidden text-white">
        {/* Background Media */}
        {heroVideo ? (
          <div className="absolute inset-0 z-0">
            {heroVideo.match(/\.(mp4|webm|ogg)$/i) ? (
              <video src={heroVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={heroVideo} alt="Hero Background" className="w-full h-full object-cover" />
            )}
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] via-[#112A46] to-[#0A2540] z-0">
            <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
            <motion.div animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-bold text-sm mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              <Zap className="w-4 h-4" /> Next-Gen Career Launchpad
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-lg text-white">
              Internship & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">Industrial Training</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed font-medium max-w-3xl mx-auto drop-shadow-md">
              Gain hands-on experience through live projects, mentorship, certifications, and real-world training in trending technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(249, 115, 22, 0.6)" }} whileTap={{ scale: 0.95 }} onClick={() => setIsEnquiryModalOpen(true)} className="px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl font-black shadow-lg transition-all flex items-center justify-center gap-2">
                Enquiry Now <ArrowRight className="w-5 h-5" />
              </motion.button>
              <button onClick={() => document.getElementById('programs').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white/10 hover:bg-orange-500/20 text-white border border-orange-500/50 hover:border-orange-500 rounded-xl font-bold backdrop-blur-md transition-all shadow-lg">
                View Programs
              </button>
            </div>

            {/* Highlights Row */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 pt-8 border-t border-white/10">
              {['Live Projects', 'Industry Mentors', 'Internship Certificate', 'Placement Guidance', 'Resume Building'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-200 font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRAINING PROGRAMS */}
      <section id="programs" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Trending Summer Training Programs</h2>
            <p className="text-lg text-slate-500 font-medium">Master the technologies that top companies are hiring for.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group relative bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className={`absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br ${prog.color} rounded-full opacity-10 group-hover:scale-[3] transition-transform duration-700 blur-2xl`}></div>

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center mb-6 shadow-lg text-white group-hover:scale-110 transition-transform`}>
                  <prog.icon className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-4">{prog.title}</h3>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-slate-600 font-medium"><Award className="w-5 h-5 text-blue-500" /> Level: {prog.level}</div>
                  <div className="flex items-center gap-3 text-slate-600 font-medium"><Clock className="w-5 h-5 text-purple-500" /> Duration: 28 / 45 / 60 Days</div>
                  <div className="flex items-center gap-3 text-slate-600 font-medium"><Settings className="w-5 h-5 text-orange-500" /> Tools: {prog.tools}</div>
                  <div className="flex items-center gap-3 text-slate-900 font-extrabold mt-2 pt-2 border-t border-slate-100"><Zap className="w-5 h-5 text-yellow-500" /> Fee: ₹3,500</div>
                </div>

                <button onClick={() => setIsRegModalOpen(true)} className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="py-24 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Why Students Choose Us</h2>
            <p className="text-lg text-slate-500 font-medium">We don't just teach theory. We build careers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:border-cyan-400 hover:shadow-cyan-100 transition-all">
                <div className="w-16 h-16 rounded-full bg-cyan-50 flex items-center justify-center mb-6 group-hover:bg-cyan-500 transition-colors">
                  <item.icon className="w-8 h-8 text-cyan-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERNSHIP JOURNEY TIMELINE */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Your Internship Journey</h2>
            <p className="text-lg text-slate-500 font-medium">A step-by-step roadmap to becoming industry-ready.</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-slate-100"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {journeySteps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative text-center flex flex-col items-center group">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 shadow-xl flex items-center justify-center text-3xl font-black text-slate-300 mb-6 relative z-10 group-hover:border-cyan-500 group-hover:text-cyan-600 transition-all duration-300">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 px-2">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEARNING WEBSITE SHOWCASE */}
      <section className="py-24 bg-[#2A2A2A] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Side: Animated Website Mockup */}
            <div className="relative h-[500px] flex items-center justify-center">
              {/* Decorative Circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#00D49A] opacity-90 right-10 md:right-0 bottom-10 overflow-hidden"
              >
                {/* Dotted pattern inside circle */}
                <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
              </motion.div>

              {/* Main Browser Window */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20 w-[90%] md:w-[400px] bg-white rounded-[2rem] shadow-2xl overflow-hidden border-[6px] border-slate-800"
              >
                {/* Browser Header / Navbar */}
                <div className="h-16 bg-slate-50 border-b border-slate-100 flex items-center px-6 gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Code className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="font-black text-slate-800 text-lg">CYVANTA <span className="text-orange-500">LEARN</span></div>
                  <div className="ml-auto w-8 h-8 bg-slate-200 rounded-full"></div>
                </div>
                {/* Browser Content */}
                <div className="p-5 bg-white flex flex-col gap-4">
                  {/* Search Bar */}
                  <div className="h-10 bg-slate-100 rounded-full px-4 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                    <div className="h-2 w-20 bg-slate-300 rounded"></div>
                  </div>
                  {/* Banner */}
                  <div className="h-28 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-4 flex flex-col justify-center">
                    <div className="h-5 w-32 bg-white rounded mb-2 shadow-sm"></div>
                    <div className="h-3 w-48 bg-white/70 rounded"></div>
                  </div>
                  {/* Grid of courses */}
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <div className="h-36 bg-slate-50 rounded-xl border border-slate-100 p-2 flex flex-col gap-2">
                      <div className="flex-1 bg-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center">
                        <div className="text-yellow-400 font-black text-2xl">JS</div>
                      </div>
                      <div className="h-3 w-full bg-slate-200 rounded"></div>
                      <div className="h-3 w-2/3 bg-slate-200 rounded"></div>
                    </div>
                    <div className="h-36 bg-slate-50 rounded-xl border border-slate-100 p-2 flex flex-col gap-2">
                      <div className="flex-1 bg-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center">
                        <div className="text-blue-400 font-black text-2xl">PY</div>
                      </div>
                      <div className="h-3 w-full bg-slate-200 rounded"></div>
                      <div className="h-3 w-2/3 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Overlapping smaller window */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-5 -right-5 md:-right-10 z-30 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-slate-800"
              >
                <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 justify-between">
                  <div className="h-2 w-16 bg-slate-300 rounded"></div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-3 bg-white">
                  <div className="h-28 bg-slate-100 rounded-xl flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                      <div className="w-4 h-4 border-t-2 border-r-2 border-white rotate-45"></div>
                    </div>
                  </div>
                  <div className="h-3 w-full bg-slate-200 rounded mt-2"></div>
                  <div className="h-3 w-4/5 bg-slate-200 rounded"></div>
                  <div className="h-10 w-full bg-orange-500 rounded-xl mt-2 flex items-center justify-center shadow-md">
                    <div className="h-3 w-16 bg-white/80 rounded"></div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side: Content */}
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <Trophy className="w-14 h-14 text-yellow-400 mb-6" strokeWidth={1.5} />
                <h2 className="text-3xl md:text-5xl font-extrabold text-orange-500 leading-tight mb-6">
                  Cyvanta – Personalised Learning Website Comming Soon ⌛.
                </h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed font-medium">
                  Experience next-gen e-learning with Cyvanta's official training & learning website. From buying courses online to accessing your student dashboard, everything you need to learn, practice, and grow is in one place.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  "Exclusive Premium Access to all Cyvanta Trainees",
                  "Courses for All Engineering Branches",
                  "Highly Interactive & Easy to Use",
                  "Personalised Student Dashboard",
                  "Study Materials in form of Videos, PDF & more",
                  "Attendance & Progress Tracking",
                  "Interactive Quizzes & Assignments"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-orange-500 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.707 7.707l-6 6a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L11 13.586l5.293-5.293a1 1 0 011.414 1.414z" />
                    </svg>
                    <span className="text-slate-200 text-lg font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. STUDENT TESTIMONIALS (Dynamic Slider) */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-white overflow-hidden border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-16">Hear From Our Students</h2>

            <div className="max-w-4xl mx-auto relative h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testiIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm"
                >
                  <Quote className="w-12 h-12 text-cyan-200 mb-6" />
                  <p className="text-xl md:text-3xl font-medium text-slate-700 italic mb-8 leading-relaxed">"{testimonials[testiIndex].text}"</p>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(parseInt(testimonials[testiIndex].rating) || 5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{testimonials[testiIndex].name}</h4>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* 7 & 8. CERTIFICATION & PLACEMENT SUPPORT */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Certification */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-bold text-sm mb-6">
                <Award className="w-4 h-4" /> ISO Certified Training
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Industry Recognized Certification</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Upon successful completion of the internship and project submissions, you will receive a verifiable digital certificate and experience letter that drastically boosts your resume and LinkedIn profile.
              </p>
              <div className="space-y-6">
                {/* 1. Animated Certificate Graphic */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                >
                  <div className="absolute right-0 top-0 w-32 h-32 bg-amber-100/50 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
                  <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                    <div className="relative w-32 h-24 shrink-0" style={{ perspective: 1000 }}>
                      <motion.div 
                        className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-3 border-2 border-amber-500 shadow-[0_10px_20px_rgba(0,0,0,0.2)] flex flex-col justify-between relative overflow-hidden"
                        initial={{ rotateY: -15, rotateX: 10 }}
                        whileHover={{ rotateY: 5, rotateX: 0, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      >
                        {/* Certificate Header */}
                        <div className="flex justify-between items-start">
                          <div className="text-[7px] font-black text-white tracking-widest drop-shadow-md">CYVANTA</div>
                          <Award className="w-5 h-5 text-amber-400 drop-shadow-md" />
                        </div>
                        {/* Certificate Body Lines */}
                        <div className="space-y-1.5">
                          <div className="h-1 w-full bg-slate-500/80 rounded"></div>
                          <div className="h-1 w-3/4 bg-slate-500/80 rounded"></div>
                          <div className="h-1 w-1/2 bg-slate-500/80 rounded"></div>
                        </div>
                        {/* Certificate Footer / Seal */}
                        <div className="flex justify-between items-end">
                          <div className="w-6 h-6 bg-amber-500/20 border border-amber-400 rounded-full flex items-center justify-center relative shadow-sm">
                            <div className="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                              <Star className="w-2.5 h-2.5 text-slate-900" />
                            </div>
                            {/* Ribbon pieces */}
                            <div className="absolute -bottom-1.5 -right-0.5 w-1.5 h-2.5 bg-amber-600 rotate-12 -z-10"></div>
                            <div className="absolute -bottom-1.5 -left-0.5 w-1.5 h-2.5 bg-amber-600 -rotate-12 -z-10"></div>
                          </div>
                          <div className="h-1.5 w-10 bg-slate-500/80 rounded"></div>
                        </div>
                        
                        {/* Diagonal Shine Effect */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent skew-x-12"
                          animate={{ x: ["-200%", "200%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                        />
                      </motion.div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
                        Verifiable Certificate <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        ISO-certified, verifiable digital certificate and experience letter to drastically boost your resume and LinkedIn.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* 2. Animated Welcome Kit Graphic */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                >
                  <div className="absolute right-0 top-0 w-32 h-32 bg-orange-100/50 rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-500"></div>
                  <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                    <div className="relative w-32 h-28 shrink-0 flex items-center justify-center">
                      <motion.div
                         animate={{ y: [-4, 4, -4] }}
                         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                         className="relative w-24 h-24"
                      >
                        {/* Custom Polo Shirt SVG */}
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_8px_15px_rgba(0,0,0,0.15)]">
                          {/* Main shirt body */}
                          <path d="M19 4L15 2C15 2 13 3.5 12 3.5C11 3.5 9 2 9 2L5 4L2 9.5L5.5 10.5V21H18.5V10.5L22 9.5L19 4Z" fill="#1E293B" />
                          {/* Design Accents / Stripes */}
                          <path d="M5.5 19H18.5" stroke="#F97316" strokeWidth="1" />
                          <path d="M3 9L5.5 10" stroke="#F97316" strokeWidth="0.5" />
                          <path d="M21 9L18.5 10" stroke="#F97316" strokeWidth="0.5" />
                          {/* Collar & Buttons Area */}
                          <path d="M9 2L12 6L15 2" fill="#334155" />
                          <path d="M12 6V10" stroke="#F97316" strokeWidth="0.5" />
                          <circle cx="12" cy="7" r="0.6" fill="white" />
                          <circle cx="12" cy="8.5" r="0.6" fill="white" />
                        </svg>
                        
                        {/* Company Logo Placed on T-Shirt Pocket Area */}
                        <div className="absolute top-[34%] left-1/2 -translate-x-1/2 flex items-center justify-center">
                           <span className="text-[5px] font-black text-white tracking-widest drop-shadow-md">CYVANTA</span>
                        </div>
                        
                        {/* Sparkle / Floating Elements */}
                        <motion.div 
                          className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full blur-[1.5px]"
                          animate={{ y: [0, -10, 0], opacity: [0, 1, 0], scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.div 
                          className="absolute bottom-2 -left-2 w-2 h-2 bg-amber-400 rounded-full blur-[1px]"
                          animate={{ y: [0, -15, 0], opacity: [0, 1, 0], scale: [1, 1.2, 1] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2">
                        Internship Welcome Kit <Trophy className="w-5 h-5 text-orange-500" />
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Get started with our premium Cyvanta polo t-shirt and exclusive welcome goodies delivered to you.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Placement Support */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-slate-900 text-white p-10 md:p-14 rounded-[3rem] relative overflow-hidden shadow-2xl">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

              <h2 className="text-3xl md:text-4xl font-extrabold mb-8 relative z-10">Placement & Career Support</h2>

              <div className="space-y-6 relative z-10">
                {[
                  "Resume & Portfolio Building",
                  "LinkedIn Profile Optimization",
                  "Mock Interviews & Technical Prep",
                  "Freelancing Guidance",
                  "Startup Idea Mentorship"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="font-bold text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. DYNAMIC COLLEGE COLLABORATIONS (MARQUEE) */}
      {colleges.length > 0 && (
        <section className="py-16 bg-white border-y border-slate-200 overflow-hidden relative shadow-inner">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="text-center mb-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Our College & University Partners</h3>
          </div>

          <div className="flex whitespace-nowrap">
            <motion.div className="flex gap-16 items-center w-max" animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 30, repeat: Infinity }}>
              {[...colleges, ...colleges].map((c, i) => (
                <div key={i} className="px-8">
                  <img src={c.imageUrl} alt="College Partner" className="h-16 md:h-20 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* 11. DYNAMIC INTERNSHIP GALLERY */}
      {gallery.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Life at Cyvanta</h2>
              <p className="text-lg text-slate-500 font-medium">Glimpses of our workshops, coding sessions, and events.</p>
            </div>

            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {gallery.map((img, i) => (
                <motion.div key={img.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                  <img src={img.imageUrl} alt="Gallery" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. STATS COUNTER */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
            {stats.map((stat, i) => (
              <div key={i} className="px-4">
                <div className="text-4xl md:text-6xl font-black mb-2">{stat.val}</div>
                <div className="text-sm md:text-base font-bold text-blue-100 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      {faqs.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-5 flex items-center justify-between font-bold text-left text-slate-800 hover:bg-slate-100 transition-colors">
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-5 text-slate-600 border-t border-slate-200 pt-4 leading-relaxed font-medium">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 13. FINAL CTA BANNER */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Ready To Start Your Tech Journey?</h2>
            <button onClick={() => setIsEnquiryModalOpen(true)} className="px-10 py-5 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all transform hover:scale-105">
              Enquiry Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal Integration */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} serviceName="Internship Program Inquiry" />
      
      {/* Internship Registration Modal */}
      <InternshipRegistrationModal isOpen={isRegModalOpen} onClose={() => setIsRegModalOpen(false)} />
      
      {/* Internship Enquiry Modal */}
      <InternshipEnquiryModal isOpen={isEnquiryModalOpen} onClose={() => setIsEnquiryModalOpen(false)} />
    </div>
  );
};

export default Internship;

