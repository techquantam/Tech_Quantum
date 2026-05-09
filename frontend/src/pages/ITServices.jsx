import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Smartphone, Server, Shield, Database, Layout,
  Settings, Cpu, Cloud, CheckCircle2, Star, ChevronDown,
  ArrowRight, Rocket, Zap, Users, Clock, Briefcase, Plus,
  MessageSquare
} from 'lucide-react';
import ContactModal from '../components/ContactModal';

const services = [
  { icon: Code, title: 'Web Development', desc: 'Scalable, high-performance web applications built on modern tech stacks.', blobClass: 'bg-blue-50 group-hover:bg-blue-100', iconClass: 'from-blue-400 to-blue-600 shadow-blue-500/30' },
  { icon: Smartphone, title: 'Mobile App Development', desc: 'Native and cross-platform apps for iOS and Android.', blobClass: 'bg-fuchsia-50 group-hover:bg-fuchsia-100', iconClass: 'from-fuchsia-400 to-fuchsia-600 shadow-fuchsia-500/30' },
  { icon: Cpu, title: 'AI & Automation', desc: 'Intelligent automation systems and machine learning integration.', blobClass: 'bg-orange-50 group-hover:bg-orange-100', iconClass: 'from-orange-400 to-orange-600 shadow-orange-500/30' },
  { icon: Cloud, title: 'Cloud Solutions', desc: 'AWS, Azure, and GCP infrastructure setup and management.', blobClass: 'bg-cyan-50 group-hover:bg-cyan-100', iconClass: 'from-cyan-400 to-cyan-600 shadow-cyan-500/30' },
  { icon: Layout, title: 'UI/UX Design', desc: 'Intuitive, conversion-optimized interfaces and user experiences.', blobClass: 'bg-purple-50 group-hover:bg-purple-100', iconClass: 'from-purple-400 to-purple-600 shadow-purple-500/30' },
  { icon: Settings, title: 'ERP/CRM Systems', desc: 'Custom enterprise resource planning and customer management.', blobClass: 'bg-emerald-50 group-hover:bg-emerald-100', iconClass: 'from-emerald-400 to-emerald-600 shadow-emerald-500/30' },
  { icon: Database, title: 'API Development', desc: 'Secure, robust REST and GraphQL API architectures.', blobClass: 'bg-indigo-50 group-hover:bg-indigo-100', iconClass: 'from-indigo-400 to-indigo-600 shadow-indigo-500/30' },
  { icon: Zap, title: 'Digital Transformation', desc: 'End-to-end digitization of your legacy business processes.', blobClass: 'bg-rose-50 group-hover:bg-rose-100', iconClass: 'from-rose-400 to-rose-600 shadow-rose-500/30' },
  { icon: Shield, title: 'Cyber Security', desc: 'Comprehensive security audits and penetration testing.', blobClass: 'bg-amber-50 group-hover:bg-amber-100', iconClass: 'from-amber-400 to-amber-600 shadow-amber-500/30' }
];

const whyChooseUs = [
  { icon: Zap, title: 'Fast Delivery', desc: 'Agile methodology ensures rapid deployment without sacrificing quality.' },
  { icon: Shield, title: 'Secure Solutions', desc: 'Enterprise-grade security protocols built into every project.' },
  { icon: Cpu, title: 'AI Integration', desc: 'Future-proofing your business with cutting-edge AI capabilities.' },
  { icon: Users, title: 'Innovative Team', desc: 'Top-tier developers and engineers dedicated to your success.' },
  { icon: Database, title: 'Scalable Architecture', desc: 'Systems designed to handle 10x growth seamlessly.' },
  { icon: Settings, title: 'Ongoing Support', desc: '24/7 technical support and maintenance post-launch.' }
];

const processSteps = [
  'Requirement Analysis',
  'Planning & UI Design',
  'Development',
  'Testing',
  'Deployment',
  'Support & Maintenance'
];

const techStack = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'AI/ML', isLucide: true }
];

const faqs = [
  { q: 'How long does development take?', a: 'Depending on the complexity, a standard web application takes 4-8 weeks from planning to deployment.' },
  { q: 'Do you provide post-launch support?', a: 'Yes, we offer 24/7 ongoing maintenance, updates, and server monitoring for all our clients.' },
  { q: 'Can you build custom AI systems?', a: 'Absolutely. We specialize in integrating intelligent chatbots, data analysis, and predictive AI into business workflows.' },
  { q: 'Do you offer cloud deployment?', a: 'We are experts in AWS, Google Cloud, and Azure, ensuring your app scales globally.' }
];

const testimonials = [
  { name: 'Rahul Sharma', role: 'CEO, TechNova', text: 'Cyvanta transformed our business digitally. Their AI integration saved us hundreds of hours and scaled our operations massively.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' },
  { name: 'Priya Patel', role: 'Founder, Edura', text: 'The mobile app they built is flawless. Exceptional team, incredible support, and a delivery speed that blew us away!', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
  { name: 'Amit Singh', role: 'CTO, GlobalRetail', text: 'Migrating to their custom ERP system was the best decision for our supply chain. Highly recommend Cyvanta Tech Quantum.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' }
];

const ITServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => {
        const itProjects = data.filter(p => p.category === 'IT');
        setProjects([...itProjects, ...itProjects]); // Duplicate for seamless infinite scroll
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50">
        {/* Animated Background Gradients & Blobs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3"
        />

        {/* Floating Tech Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
          {/* Left Side */}
          <motion.div animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-32 left-[5%] text-blue-600/10"><Code size={72} /></motion.div>
          <motion.div animate={{ y: [25, -25, 25], rotate: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-1/2 left-[10%] text-indigo-600/10"><Database size={56} /></motion.div>
          <motion.div animate={{ y: [-15, 15, -15], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-32 left-[7%] text-cyan-600/10"><Smartphone size={64} /></motion.div>
          <motion.div animate={{ y: [30, -30, 30], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-20 left-[15%] text-orange-500/10"><Layout size={48} /></motion.div>

          {/* Right Side */}
          <motion.div animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-40 right-[8%] text-cyan-600/10"><Cloud size={80} /></motion.div>
          <motion.div animate={{ y: [-25, 25, -25], rotate: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-1/2 right-[5%] text-blue-600/10"><Server size={64} /></motion.div>
          <motion.div animate={{ y: [15, -15, 15], rotate: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-40 right-[12%] text-indigo-600/10"><Shield size={56} /></motion.div>
          <motion.div animate={{ y: [-30, 30, -30], rotate: [0, -5, 0] }} transition={{ duration: 9, repeat: Infinity }} className="absolute bottom-20 right-[6%] text-purple-600/10"><Cpu size={72} /></motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-semibold text-sm mb-8 shadow-sm">
              <Zap className="w-4 h-4" /> Powering Next-Gen Enterprises
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
              Smart IT Solutions For <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Modern Businesses
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
              We build scalable software, AI systems, websites, and automation solutions that help businesses grow faster and operate smarter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
              >
                Get Free Consultation <ArrowRight className="w-5 h-5" />
              </motion.button>
              <button
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm rounded-xl font-bold transition-all"
              >
                View Services
              </button>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 border-t border-slate-200">
              {[
                { label: '50+', desc: 'Projects Delivered' },
                { label: '10+', desc: 'Enterprise Clients' },
                { label: '24/7', desc: 'Premium Support' },
                { label: 'AI', desc: 'Powered Solutions' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-extrabold text-blue-600 mb-1">{stat.label}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUSTED BY / TECH STACK MARQUEE */}
      <section className="py-5 bg-[#22d3ee] border-y border-cyan-400 overflow-hidden relative shadow-inner">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#22d3ee] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#22d3ee] to-transparent z-10 pointer-events-none"></div>

        <div className="flex whitespace-nowrap">
          <motion.div
            className="flex gap-16 items-center w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <div key={i} className="group flex items-center gap-3 text-2xl font-black text-white/70 hover:text-white tracking-wider uppercase px-4 transition-colors duration-300">
                {tech.isLucide ? (
                  <Cpu className="w-8 h-8 text-white/70 group-hover:text-white transition-colors duration-300" />
                ) : (
                  <img src={tech.icon} alt={tech.name} className="h-10 object-contain brightness-200" />
                )}
                {tech.name}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Core Services</h2>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">Comprehensive digital solutions engineered for scale, security, and exceptional performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-2xl border border-slate-100 overflow-hidden transition-all duration-500 hover:-translate-y-2"
              >
                {/* Decorative Blob */}
                <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[60px] transition-colors duration-500 ${service.blobClass}`}></div>

                <div className={`relative w-16 h-16 rounded-[1rem] bg-gradient-to-br ${service.iconClass} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="relative text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">{service.title}</h3>
                <p className="relative text-slate-500 mb-8 leading-relaxed font-medium">{service.desc}</p>

                <div
                  className="relative flex items-center text-[#F05A28] font-bold group-hover:translate-x-2 transition-transform cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  Learn More <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-24 bg-[#0A2540] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Businesses Choose Us</h2>
            <p className="text-lg text-blue-200 font-medium">We don't just write code; we build digital assets that drive revenue.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-colors"
              >
                <div className="p-3 bg-blue-500/20 rounded-xl shrink-0">
                  <item.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS TIMELINE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Working Process</h2>
            <p className="text-lg text-slate-500 font-medium">A proven, systematic approach to delivering flawless digital products.</p>
          </div>

          <div className="relative">
            {/* Horizontal Line connecting steps */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative z-10">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 bg-white border-4 border-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-black mb-4 group-hover:border-blue-500 group-hover:bg-blue-50 transition-all shadow-md shadow-slate-200/50 relative z-10">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-slate-800">{step}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. PORTFOLIO SHOWCASE */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mb-6">
            <Star className="w-4 h-4" /> Recent Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">IT Projects & Clients</h2>
        </div>

        <div className="relative w-full py-4 group">
          {projects.length > 0 ? (
            <motion.div
              className="flex gap-8 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            >
              {projects.map((project, index) => {
                const isVideo = project.image && project.image.match(/\.(mp4|webm|ogg)$/i);
                return (
                  <div
                    key={`${project.id}-${index}`}
                    className="w-[350px] sm:w-[400px] shrink-0 bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300 flex flex-col"
                  >
                    <div className="h-56 overflow-hidden relative shrink-0">
                      {isVideo ? (
                        <video src={project.image} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <img src={project.image || 'https://via.placeholder.com/400x300'} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-slate-800 mb-3 hover:text-blue-600 transition-colors">{project.title}</h3>
                      <p className="text-slate-600 leading-relaxed font-medium">{project.description}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-12 text-slate-500 font-medium w-full">Loading portfolio...</div>
          )}

          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10"></div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Client Testimonials</h2>
            <p className="text-lg text-slate-500 font-medium">Don't just take our word for it.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm relative"
              >
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-slate-700 italic mb-8 leading-relaxed text-lg">"{testi.text}"</p>
                <div className="flex items-center gap-4 border-t border-slate-200 pt-4 mt-auto">
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{testi.name}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-lg text-slate-800">{faq.q}</span>
                  <ChevronDown className={`w-6 h-6 text-blue-500 transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA BANNER */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#0A2540] via-blue-900 to-blue-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Ready To Build Your Next <span className="text-cyan-400">Digital Product?</span>
            </h2>
            <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
              Join dozens of successful enterprises who trust Cyvanta Tech Quantum to engineer their digital future.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-orange-500/20 transition-all hover:scale-105 flex items-center justify-center gap-3 mx-auto"
            >
              <MessageSquare className="w-6 h-6" /> Book Free Consultation
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal Integration */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName="IT Services Inquiry"
      />
    </div>
  );
};

export default ITServices;
