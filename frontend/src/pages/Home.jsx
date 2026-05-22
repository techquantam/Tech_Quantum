import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSkeleton from '../components/HeroSkeleton';
import { Monitor, BookOpen, Briefcase, ArrowRight, Rocket, CheckCircle2, Star, Sparkles } from 'lucide-react';

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
  const [heroData, setHeroData] = useState(null);
  const [loadingHero, setLoadingHero] = useState(true);

  useEffect(() => {
    // Fetch projects
    fetch(`${import.meta.env.VITE_API_URL || ""}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));

    // Fetch dynamic home hero announcement configuration
    setLoadingHero(true);
    fetch(`${import.meta.env.VITE_API_URL || ""}/api/home-hero`)
      .then(res => res.json())
      .then(data => {
        setHeroData(data);
        setLoadingHero(false);
      })
      .catch(err => {
        console.error("Failed to load hero configuration:", err);
        setHeroData({
          heading: "Summer Internship Program 2026",
          subtitle: "Build Real Projects With Industry Experts",
          imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
          redirectUrl: "/internship",
          isAnnouncementActive: true,
          tickerText: "🔥 Summer Internship Registrations Open Now"
        });
        setLoadingHero(false);
      });
  }, []);

  const filteredProjects = projects.filter(p => p.category === activeCategory);
  // Duplicate for seamless infinite scrolling
  const scrollableProjects = [...filteredProjects, ...filteredProjects];

  return (
    <div className="min-h-screen bg-[#FFF9F5]">
      {/* Top Ticker Marquee */}
      {heroData?.isAnnouncementActive && (
        <div className="w-full bg-gradient-to-r from-[#F05A28] via-[#F97316] to-[#F05A28] text-white py-3.5 overflow-hidden relative z-30 shadow-md">
          <div className="flex whitespace-nowrap">
            <motion.div
              className="flex gap-8 items-center text-xs sm:text-sm font-bold tracking-widest uppercase"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            >
              {[...Array(6)].map((_, i) => (
                <span key={i} className="inline-flex items-center gap-3 mr-12">
                  <span>{heroData?.tickerText || "🔥 Summer Internship Registrations Open Now"}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-white opacity-60"></span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      {loadingHero ? (
        <HeroSkeleton />
      ) : (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden py-16 lg:py-24">
          {/* Subtle background gradient blob */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-100 rounded-full blur-[120px] opacity-60 -z-10 translate-x-1/3 -translate-y-1/4 animate-pulse"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Left Column: Text & Motive */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                {/* Live Pulse Indicator Badge */}
                {heroData?.isAnnouncementActive ? (
                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-yellow-100/90 text-amber-800 font-extrabold text-xs mb-8 shadow-sm tracking-wider uppercase border border-yellow-300/80 backdrop-blur-sm"
                  >
                    <span className="relative flex h-3 w-3 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </span>
                    <span className="leading-none mt-[1px]">LIVE REGISTRATION OPEN</span>
                  </motion.div>
                ) : (
                  <div className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-yellow-100/90 text-amber-800 font-bold text-xs mb-8 shadow-sm uppercase border border-yellow-300/80 tracking-wider backdrop-blur-sm">
                    <Rocket className="w-3.5 h-3.5 animate-bounce text-amber-600" />
                    <span className="leading-none mt-[1px]">🌐 IT Services • 🎓 Education • 💼 Internship</span>
                  </div>
                )}

                {/* Typography Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0A2540] mb-6 tracking-tight leading-tight">
                  {heroData?.isAnnouncementActive ? (
                    <>
                      {heroData.heading.split(' ').slice(0, -1).join(' ')}{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F05A28] to-[#F97316]">
                        {heroData.heading.split(' ').pop()}
                      </span>
                    </>
                  ) : (
                    <>
                      Build. Learn. Grow <br />with  → <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F05A28] to-[#F97316]">
                        Technology & AI
                      </span>
                    </>
                  )}
                </h1>

                {/* Subtitle / Description */}
                <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-semibold">
                  {heroData?.isAnnouncementActive
                    ? heroData.subtitle
                    : "We deliver IT solutions, practical education, and industry-ready internships — all in one place."}
                </p>

                {/* Premium Interactive Tech Tags */}
                <div className="flex flex-wrap gap-2.5 mb-10">
                  {['Web Development', 'AI & ML', 'Python', 'Blockchain', 'UI/UX'].map((tag) => (
                    <motion.span
                      whileHover={{ y: -3, scale: 1.05, backgroundColor: '#fed7aa' }}
                      key={tag}
                      className="px-4 py-2 text-xs font-bold rounded-full bg-orange-100/50 text-[#F05A28] border border-orange-200/40 backdrop-blur-sm shadow-sm cursor-default hover:shadow-md transition-all duration-300"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Dual Call-To-Action (CTA) Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {heroData?.isAnnouncementActive ? (
                    <a
                      href={heroData.redirectUrl || "/internship"}
                      target={heroData.redirectUrl?.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -5px rgba(240, 90, 40, 0.45)" }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-8 py-4 bg-[#F05A28] hover:bg-[#d94a1b] text-white rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all text-center flex items-center justify-center gap-2"
                      >
                        Register Now <Sparkles className="w-4.5 h-4.5" />
                      </motion.button>
                    </a>
                  ) : (
                    <Link to="/contact" className="w-full sm:w-auto">
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -5px rgba(240, 90, 40, 0.45)" }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-8 py-4 bg-[#F05A28] hover:bg-[#d94a1b] text-white rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all text-center"
                      >
                        Partner With Us 🚀
                      </motion.button>
                    </Link>
                  )}

                  <button
                    onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                    className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-orange-50 text-[#F05A28] border-2 border-orange-500/20 hover:border-[#F05A28] rounded-xl font-bold transition-all flex items-center justify-center shadow-sm"
                  >
                    Explore Our Services
                  </button>
                </div>
              </motion.div>

              {/* Right Column: Premium Tilted & Glowing Announcement Flyer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative w-full flex justify-center lg:justify-end items-center overflow-visible lg:pr-12"
              >
                {/* Floating Emojis with highly animated properties */}
                {heroData?.isAnnouncementActive && (
                  <>
                    {/* Megaphone (📢) floating top-left */}
                    <motion.div
                      className="absolute -top-6 -left-6 sm:-left-2 text-4xl select-none z-30 pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
                      animate={{
                        y: [-12, 12, -12],
                        rotate: [-18, 12, -18],
                        scale: [1, 1.12, 1]
                      }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      📢
                    </motion.div>

                    {/* Bell (🔔) floating top-right */}
                    <motion.div
                      className="absolute -top-8 -right-4 text-3.5xl select-none z-30 pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
                      animate={{
                        y: [10, -10, 10],
                        rotate: [20, -15, 20],
                        scale: [0.96, 1.08, 0.96]
                      }}
                      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🔔
                    </motion.div>

                    {/* Sparkles (✨) floating right side */}
                    <motion.div
                      className="absolute top-1/3 -right-8 text-3xl select-none z-30 pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
                      animate={{
                        scale: [0.85, 1.3, 0.85],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ✨
                    </motion.div>

                    {/* Party Popper (🎉) floating bottom-left */}
                    <motion.div
                      className="absolute -bottom-6 -left-6 text-4xl select-none z-30 pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
                      animate={{
                        y: [10, -10, 10],
                        rotate: [-15, 15, -15],
                        scale: [0.95, 1.05, 0.95]
                      }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🎉
                    </motion.div>

                    {/* Fire (🔥) floating top-left edge */}
                    <motion.div
                      className="absolute top-1/2 -left-8 text-3.5xl select-none z-30 pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
                      animate={{
                        scale: [0.9, 1.15, 0.9],
                        y: [-6, 6, -6]
                      }}
                      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🔥
                    </motion.div>
                  </>
                )}

                {/* Polaroid/Memo Framed Flyer Card */}
                <motion.div
                  animate={{ y: [-6, 6, -6], rotate: -3.2 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 0,
                    rotateY: 6,
                    rotateX: -3,
                    z: 50,
                  }}
                  className="relative w-full max-w-[430px] bg-white border border-slate-100 rounded-[2.2rem] p-3.5 shadow-2xl hover:shadow-[0_30px_70px_rgba(240,90,40,0.2)] transition-all duration-300 group cursor-pointer overflow-visible flex flex-col"
                  style={{ perspective: 1000, transformStyle: "preserve-3d" }}
                  onClick={() => {
                    const url = heroData?.redirectUrl || "/internship";
                    if (url.startsWith("http")) {
                      window.open(url, "_blank", "noopener,noreferrer");
                    } else {
                      window.location.href = url;
                    }
                  }}
                >
                  {/* Outer glowing dynamic neon border on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/15 via-transparent to-amber-500/15 rounded-[2.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"></div>

                  {/* Pinned Washi tape on top center */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-amber-100/75 backdrop-blur-[1.5px] border border-amber-200/40 shadow-[0_2px_4px_rgba(0,0,0,0.03)] rounded-sm rotate-[-1.5deg] z-30 flex items-center justify-center pointer-events-none select-none">
                    <span className="w-10 h-[1px] bg-slate-300/30"></span>
                  </div>

                  {/* Inner Banner wrapper */}
                  <div className="w-full relative overflow-hidden rounded-[1.6rem] bg-slate-50 flex items-center justify-center aspect-[1.45] shadow-inner z-10">
                    {/* High-quality vibrant duplicate blur layer to seamlessly fill edge bars */}
                    <img
                      src={heroData?.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"}
                      alt="Flyer Glow Backdrop"
                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-50 scale-125 select-none pointer-events-none z-0"
                    />

                    {/* Pinned horizontal flyer - uncropped, sharp, border-separated */}
                    <img
                      src={heroData?.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"}
                      alt="Internship Banner announcement"
                      loading="lazy"
                      className="relative z-10 max-w-full max-h-full object-contain p-1 rounded-xl shadow-sm border border-white/20 bg-white/5 group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>

                  {/* Clean announcement details block below the image inside the card */}
                  <div className="pt-4 pb-1 px-2.5 flex items-center justify-between z-20">
                    <div className="max-w-[80%]">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#F05A28] block mb-0.5">Special Announcement</span>
                      <span className="text-sm font-black text-[#0A2540] truncate block">{heroData?.heading || "Summer Internship Program 2026"}</span>
                      <span className="text-[11px] text-slate-500 font-semibold truncate block mt-0.5">{heroData?.subtitle}</span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, backgroundColor: '#d94a1b' }}
                      className="h-9 w-9 rounded-full bg-[#F05A28] flex items-center justify-center text-white shadow-md shrink-0 transition-colors ml-3"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>
      )}

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

