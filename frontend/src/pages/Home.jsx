import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RotatingCarousel from '../components/RotatingCarousel';
import { Monitor, BookOpen, Briefcase, ArrowRight, Rocket, CheckCircle2, Star } from 'lucide-react';

const services = [
  {
    title: 'IT Services',
    description: 'Cutting-edge software development, web & app solutions, and enterprise IT consulting.',
    icon: Monitor,
    path: '/it-services',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    title: 'Empowering Education',
    description: 'Industry-relevant courses, workshops, and skill development programs for the future.',
    icon: BookOpen,
    path: '/education',
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Summer Training & Internship',
    description: 'Hands-on project experience, mentorship, and certification for aspiring professionals.',
    icon: Briefcase,
    path: '/internship',
    color: 'from-orange-500 to-amber-400'
  }
];

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('IT');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ""}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  const filteredProjects = projects.filter(p => p.category === activeCategory);
  // Duplicate for seamless infinite scrolling
  const scrollableProjects = [...filteredProjects, ...filteredProjects];

  return (
    <div className="min-h-screen bg-[#FFF9F5]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">

        {/* Subtle background gradient blob */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-100 rounded-full blur-[120px] opacity-60 -z-10 translate-x-1/3 -translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Column: Text & Motive */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm mb-8 shadow-sm">
                <Rocket className="w-4 h-4" />
                Choose your path: 🌐 IT Services   🎓 Education   💼 Internship
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A202C] mb-6 tracking-tight leading-tight">
                Build. Learn. Grow <br />with  → <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F05A28] to-[#F97316]">
                  Technology & AI
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                We deliver IT solutions, practical education, and industry-ready internships — all in one place.              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 py-4 bg-[#F05A28] hover:bg-[#d94a1b] text-white rounded-lg font-bold shadow-lg shadow-orange-500/30 transition-all"
                  >
                    Partner With Us 🚀
                  </motion.button>
                </Link>
                <button
                  onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-orange-50 text-[#F05A28] border-2 border-[#F05A28] rounded-lg font-bold transition-all"
                >
                  Explore Programs
                </button>
              </div>
            </motion.div>

            {/* Right Column: 3D Rotating Image Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative h-[400px] sm:h-[500px] lg:h-[400px] w-full flex justify-center lg:justify-end items-center overflow-visible lg:pr-12"
            >
              <RotatingCarousel />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white relative z-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-4"
            >
              Our Core Divisions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-500 font-medium"
            >
              Select a specialized division to learn more
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white border border-slate-200 shadow-md hover:shadow-xl rounded-3xl p-8 overflow-hidden cursor-pointer transition-all duration-300"
              >
                <Link to={service.path} className="block h-full">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-[0.08] rounded-bl-full group-hover:scale-110 transition-transform duration-500`}></div>

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-md`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-[#F05A28] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                    {service.description}
                  </p>

                  <div className="flex items-center text-[#F05A28] font-bold group-hover:translate-x-2 transition-transform">
                    Enter Portal <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlighted Projects Section */}
      <section className="py-24 bg-orange-50 relative border-t border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mb-6 shadow-sm"
            >
              <Star className="w-4 h-4" />
              Our Portfolio
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-8"
            >
              Highlighted Projects & Clients
            </motion.h2>

            {/* Toggle Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-12"
            >
              <div className="bg-white p-2 rounded-2xl shadow-md border border-slate-100 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setActiveCategory('IT')}
                  className={`px-8 py-3 rounded-xl font-bold transition-all ${activeCategory === 'IT'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  IT Section
                </button>
                <button
                  onClick={() => setActiveCategory('Education')}
                  className={`px-8 py-3 rounded-xl font-bold transition-all ${activeCategory === 'Education'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  Empowering Education
                </button>
              </div>
            </motion.div>
          </div>

          <div className="relative overflow-hidden w-full py-4 group">
            {filteredProjects.length > 0 ? (
              <motion.div
                className="flex gap-8 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 20, repeat: Infinity }}
              >
                {scrollableProjects.map((project, index) => (
                  <div
                    key={`${project.id}-${index}`}
                    className="w-[350px] sm:w-[400px] shrink-0 bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300 flex flex-col"
                  >
                    <div className="h-56 overflow-hidden relative shrink-0">
                      <img src={project.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80'} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-slate-800 mb-3 hover:text-blue-600 transition-colors">{project.title}</h3>
                      <p className="text-slate-600 leading-relaxed font-medium">{project.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 text-slate-500 font-medium w-full">
                No projects found for this category yet.
              </div>
            )}

            {/* Fade edges for smooth looping effect in orange */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-orange-50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-[#0A2540] text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"
              >
                Our Story
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="h-2 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full mb-8"
              />
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-slate-300 mb-6 leading-relaxed"
              >
                Cyvanta Tech Quantum was born out of a shared vision to bridge the massive gap between traditional education and rapid industry advancements. Founded in Lucknow, we noticed that brilliant minds often lacked access to practical, industry-grade technology.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-slate-300 mb-8 leading-relaxed"
              >
                What started as a small initiative to train students has rapidly evolved into a full-scale digital technology enterprise. Today, we don't just teach the future; we build it. We partner with top-tier schools and major enterprises to deliver robust IT solutions and curriculum.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm"
                >
                  <div className="p-3 bg-blue-500/20 rounded-xl"><CheckCircle2 className="w-6 h-6 text-blue-400" /></div>
                  <div>
                    <div className="font-bold text-xl text-white">30+</div>
                    <div className="text-sm text-blue-300">Enterprise Clients</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm"
                >
                  <div className="p-3 bg-orange-500/20 rounded-xl"><CheckCircle2 className="w-6 h-6 text-orange-400" /></div>
                  <div>
                    <div className="font-bold text-xl text-white">250+</div>
                    <div className="text-sm text-orange-300">Students Trained</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="relative perspective-[1000px]"
            >
              <div className="grid grid-cols-2 gap-6 relative z-10 scale-110 mt-8 ml-4">
                <motion.img
                  animate={{ y: [-10, 10, -10], rotate: [0, 2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.08, zIndex: 30, rotate: 0 }}
                  src="/Akhand.png"
                  alt="Team"
                  className="rounded-3xl shadow-2xl border-4 border-white/10 relative z-10"
                />
                <motion.img
                  animate={{ y: [15, -15, 15], rotate: [0, -2, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.08, zIndex: 30, rotate: 0 }}
                  src="/abhi.png"
                  alt="Meeting"
                  className="rounded-3xl shadow-2xl border-4 border-white/10 translate-y-16 relative z-10"
                />
              </div>

              {/* Floating Badge */}
              {/* <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 md:bottom-4 md:left-4 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 p-6 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-30"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 text-center drop-shadow-lg">2023</div>
                <div className="text-orange-400 text-xs md:text-sm font-bold text-center tracking-[0.2em] uppercase mt-2">Year Founded</div>
              </motion.div> */}

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 text-white/5 z-0">
                <Rocket className="w-48 h-48" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

