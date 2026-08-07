import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import ITServices from './pages/ITServices';
import Education from './pages/Education';
import Internship from './pages/Internship';
import About from './pages/About';
import Career from './pages/Career';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
// import Verify from './pages/Verify';
import Certificate from './pages/Certificate';
import DeleteAccount from './pages/DeleteAccount';


function App() {
  return (
    <Router>
      <Preloader />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/it-services" element={<ITServices />} />
          <Route path="/education" element={<Education />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/verify" element={<Certificate />} />
          {/* <Route path="/certificate" element={<Certificate />} /> */}
          <Route path="/certificate/:registrationNumber" element={<Certificate />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/data-security" element={<DeleteAccount />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
