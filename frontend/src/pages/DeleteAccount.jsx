import { motion } from 'framer-motion';
import { 
  UserX, 
  Mail, 
  Trash2, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Info
} from 'lucide-react';

const DeleteAccount = () => {
  const steps = [
    "Send an email to our support team.",
    "Use the subject line \"Delete My Account\".",
    "Mention your registered mobile number or email address.",
    "Our team will verify your request and process it."
  ];

  const deletedData = [
    "User Profile",
    "Personal Information",
    "Saved Addresses",
    "Wishlist",
    "Cart Items",
    "Login Credentials"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDFB] via-[#FFF9F2] to-[#FFF3E6] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm mb-6 shadow-sm">
            <UserX className="w-4 h-4" />
            Anandmayi Bhakti Support
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Delete Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Account</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-650 leading-relaxed font-medium">
            If you would like to permanently delete your Anandmayi Bhakti account and associated personal data, please send a request to our support team.
          </p>
        </motion.div>

        {/* Content Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl shadow-orange-950/5 p-6 md:p-10 border border-orange-100 space-y-10"
        >
          
          {/* How to request */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <span className="p-2.5 bg-orange-50 text-orange-600 rounded-xl shadow-sm">
                <Info className="w-5 h-5" />
              </span>
              How to Request Account Deletion
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="flex gap-4 p-5 bg-gradient-to-r from-amber-50/50 to-orange-50/30 rounded-2xl border border-orange-100/50 hover:border-orange-200 transition-colors"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-bold shrink-0 shadow-sm">
                    {idx + 1}
                  </span>
                  <p className="text-slate-700 text-sm font-semibold leading-relaxed self-center">
                    {idx === 1 ? (
                      <>Use the subject line <strong className="text-orange-700 font-bold">"Delete My Account"</strong>.</>
                    ) : step}
                  </p>
                </div>
              ))}
            </div>

            {/* Email card */}
            <div className="mt-6 p-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-orange-100 uppercase tracking-widest font-bold">Support Email</p>
                  <a href="mailto:support@techquantum.in" className="text-lg md:text-xl font-bold hover:underline transition-all">
                    support@techquantum.in
                  </a>
                </div>
              </div>
              <a 
                href="mailto:support@techquantum.in?subject=Delete%20My%20Account" 
                className="px-5 py-2.5 bg-white text-orange-600 hover:bg-orange-50 rounded-xl text-sm font-bold shadow-sm transition-all duration-200"
              >
                Send Request
              </a>
            </div>
          </div>

          <hr className="border-orange-100/60" />

          {/* Data details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Will be deleted */}
            <div className="p-6 bg-rose-50/30 rounded-2xl border border-rose-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="p-1.5 bg-rose-100 text-rose-600 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </span>
                Data that will be deleted
              </h3>
              <ul className="space-y-3">
                {deletedData.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* May be retained */}
            <div className="p-6 bg-amber-50/30 rounded-2xl border border-amber-100 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
                    <ShieldAlert className="w-4 h-4" />
                  </span>
                  Data that may be retained
                </h3>
                <p className="text-slate-650 text-sm font-semibold leading-relaxed">
                  Certain transaction records, invoices, and order history may be retained for up to <strong className="text-amber-700">90 days</strong> or longer if required by applicable laws, tax regulations, or fraud prevention purposes.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-100/50 flex items-center gap-3 text-slate-700 text-sm font-semibold">
                <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                <span>
                  Processing Time: <strong className="text-slate-800 font-bold">7 working days</strong>
                </span>
              </div>
            </div>

          </div>

          <div className="pt-6 text-center text-xs text-slate-400 font-medium">
            © 2026 Cyvanta Tech Quantum Pvt. Ltd. All Rights Reserved.
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default DeleteAccount;
