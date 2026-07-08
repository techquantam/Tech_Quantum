import { motion } from 'framer-motion';
import { 
  Shield, 
  Info, 
  Lock, 
  Eye, 
  RefreshCw, 
  Mail, 
  Globe, 
  Database, 
  FileText, 
  CheckCircle2, 
  MapPin, 
  Cookie, 
  UserCheck 
} from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm mb-6">
            <Shield className="w-4 h-4" />
            Privacy & Trust
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Policy</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Last Updated: July 8, 2026
          </p>
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100 space-y-12"
        >
          {/* Welcome section */}
          <div>
            <p className="text-slate-600 leading-relaxed font-medium text-lg">
              Welcome to the official Privacy Policy of <strong>Cyvanta Tech Quantum Pvt. Ltd.</strong> (referred to as "we", "us", or "our"). As a leading digital technology and IT services firm, we are deeply committed to protecting your privacy and ensuring that your personal information remains safe, secure, and handled with the highest standards of integrity.
            </p>
            <p className="text-slate-600 leading-relaxed font-medium text-md mt-4">
              This policy explains how we collect, use, share, and protect your information when you visit our website, use our applications, register for our training/internship programs, or utilize our corporate IT solutions.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Information We Collect */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Info className="w-5 h-5" /></span>
              Information We Collect
            </h2>
            <p className="text-slate-600 mb-6 font-medium">
              We collect information to provide better services to all our users, whether they are students registering for internships, candidates exploring careers, or clients seeking software solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Personal Identification Data', desc: 'Name, email address, mobile number, and registration/profile details.' },
                { name: 'Device & Network Information', desc: 'IP addresses, browser type, device model, operating system, and hardware details.' },
                { name: 'App & Site Usage Data', desc: 'Pages visited, session duration, user flow, clickstream data, and performance analytics.' },
                { name: 'Diagnostics & Telemetry', desc: 'System crash reports, API latency logs, error details, and system statistics.' },
                { name: 'Notification Tokens', desc: 'Push tokens used strictly to deliver essential application updates and alerts.' }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 mt-2" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{item.name}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* How We Use Your Information */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Eye className="w-5 h-5" /></span>
              How We Use Your Information
            </h2>
            <p className="text-slate-600 mb-6 font-medium">
              We process your data strictly to deliver value, optimize operations, and maintain a secure environment. We do not sell or monetize your data.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Provide & Manage Services', desc: 'To facilitate educational course registrations, internship processing, client communications, and application delivery.' },
                { title: 'Optimize Experience & Performance', desc: 'To monitor system health, reduce latency, debug client-side crashes, and continuously improve user interfaces.' },
                { title: 'Support & Interaction', desc: 'To address client inquiries, process support tickets, and contact you with updates related to your registered programs.' },
                { title: 'Maintain Security & Integrity', desc: 'To prevent fraudulent activities, verify registration authenticity, secure administrative gateways, and fix bugs.' }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Cookies Section */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <span className="p-2 bg-amber-50 text-amber-600 rounded-xl"><Cookie className="w-5 h-5" /></span>
              Cookies & Tracking Technologies
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              We use cookies, web beacons, and session storage to enhance site navigation, personalize your experience, and gather anonymous analytics. You can configure your browser preferences to refuse cookies, though some features of our platforms may not function optimally as a result.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Data Security */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <span className="p-2 bg-rose-50 text-rose-600 rounded-xl"><Database className="w-5 h-5" /></span>
              Data Security & Storage
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              We implement industry-standard administrative, physical, and technical safeguards (such as SSL/TLS encryption for network transit and secure cloud database instances) to prevent unauthorized access, alteration, or disclosure of your personal data. However, please be aware that no transmission method over the internet is 100% secure.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Third-Party Services */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Lock className="w-5 h-5" /></span>
              Third-Party Services & Integrations
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              To deliver maximum performance and cloud capabilities, our platforms integrate with trusted third-party services like <strong>Google Play Services</strong>, <strong>Firebase Analytics</strong>, and Cloud Databases. These service providers process data governed by their respective privacy policies.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Your Data Rights */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <span className="p-2 bg-violet-50 text-violet-600 rounded-xl"><UserCheck className="w-5 h-5" /></span>
              Your Rights & Controls
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              You retain the right to review, update, or request the deletion of any personal information we hold about you. If you wish to opt-out of notifications, update your contact details, or inquire about data deletion, please contact us directly via our support email.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Policy Updates */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <span className="p-2 bg-slate-100 text-slate-600 rounded-xl"><RefreshCw className="w-5 h-5" /></span>
              Policy Updates
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              We may update this Privacy Policy periodically to reflect changes in our operational procedures, technological frameworks, or legal obligations. All revisions will be posted on this page with the updated revision date.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Contact Us */}
          <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="p-2 bg-blue-100 text-blue-700 rounded-xl"><Mail className="w-5 h-5" /></span>
              Contact Our Privacy Team
            </h2>
            <div className="space-y-4 font-medium text-slate-600">
              <p className="font-bold text-slate-800 text-lg">Cyvanta Tech Quantum Pvt. Ltd.</p>
              
              <div className="flex flex-col gap-3 pt-2 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                  <span>B-2/390, Sitapur Rd, Sector-A, Scheme, Aliganj, Lucknow, Uttar Pradesh 226024</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-slate-400 shrink-0" />
                  <a href="https://techquantum.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    techquantum.in
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                  <a href="mailto:techquantum.india@gmail.com" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    techquantum.india@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center text-xs text-slate-400 font-medium">
            © 2026 Cyvanta Tech Quantum Pvt. Ltd. All Rights Reserved.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
