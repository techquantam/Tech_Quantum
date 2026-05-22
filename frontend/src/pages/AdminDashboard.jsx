import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2, Plus, Image, BookOpen, Briefcase, Pencil, ArrowRight, Rocket } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [careers, setCareers] = useState([]);
  const [projects, setProjects] = useState([]);
  
  // Form States
  const [blogForm, setBlogForm] = useState({ title: '', date: '', category: '', image: '', content: '' });
  const [blogImageFile, setBlogImageFile] = useState(null);
  const [careerForm, setCareerForm] = useState({ title: '', type: '', location: '' });
  const [projectForm, setProjectForm] = useState({ title: '', description: '', image: '', category: 'IT' });
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Internship States
  const [internHero, setInternHero] = useState({ videoUrl: '' });
  const [internHeroFile, setInternHeroFile] = useState(null);
  
  const [internTestimonials, setInternTestimonials] = useState([]);
  const [internTestimonialForm, setInternTestimonialForm] = useState({ name: '', rating: '5', text: '' });
  
  const [internFaqs, setInternFaqs] = useState([]);
  const [internFaqForm, setInternFaqForm] = useState({ question: '', answer: '' });
  
  const [internColleges, setInternColleges] = useState([]);
  const [internCollegeFile, setInternCollegeFile] = useState(null);
  
  const [internGallery, setInternGallery] = useState([]);
  const [internGalleryFile, setInternGalleryFile] = useState(null);

  // Homepage Hero Announcement States
  const [homeHeroForm, setHomeHeroForm] = useState({
    heading: '',
    subtitle: '',
    imageUrl: '',
    redirectUrl: '',
    isAnnouncementActive: false,
    tickerText: ''
  });
  const [homeHeroImageFile, setHomeHeroImageFile] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const [bRes, cRes, pRes, iHeroRes, iTestiRes, iFaqRes, iColRes, iGalRes, hHeroRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/blogs`),
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/careers`),
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/projects`),
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/hero`),
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/testimonials`),
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/faqs`),
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/colleges`),
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/gallery`),
        fetch(`${import.meta.env.VITE_API_URL || ""}/api/home-hero`)
      ]);
      setBlogs(await bRes.json());
      setCareers(await cRes.json());
      setProjects(await pRes.json());
      setInternHero(await iHeroRes.json());
      setInternTestimonials(await iTestiRes.json());
      setInternFaqs(await iFaqRes.json());
      setInternColleges(await iColRes.json());
      setInternGallery(await iGalRes.json());
      
      const heroData = await hHeroRes.json();
      setHomeHeroForm({
        heading: heroData.heading || '',
        subtitle: heroData.subtitle || '',
        imageUrl: heroData.imageUrl || '',
        redirectUrl: heroData.redirectUrl || '',
        isAnnouncementActive: !!heroData.isAnnouncementActive,
        tickerText: heroData.tickerText || ''
      });
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const deleteItem = async (type, id) => {
    if (!window.confirm('Are you sure?')) return;
    await fetch(`${import.meta.env.VITE_API_URL || ""}/api/${type}/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchData();
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.imageUrl;
  };

  const addBlog = async (e) => {
    e.preventDefault();
    let finalImageUrl = blogForm.image;
    if (blogImageFile) {
      try {
        finalImageUrl = await handleFileUpload(blogImageFile);
      } catch (err) {
        alert('Failed to upload image');
        return;
      }
    }
    await fetch(`${import.meta.env.VITE_API_URL || ""}/api/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ ...blogForm, image: finalImageUrl })
    });
    setBlogForm({ title: '', date: '', category: '', image: '', content: '' });
    setBlogImageFile(null);
    fetchData();
  };

  const addCareer = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL || ""}/api/careers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(careerForm)
    });
    setCareerForm({ title: '', type: '', location: '' });
    fetchData();
  };

  const saveProject = async (e) => {
    e.preventDefault();
    let finalImageUrl = projectForm.image;
    if (projectImageFile) {
      try {
        finalImageUrl = await handleFileUpload(projectImageFile);
      } catch (err) {
        alert('Failed to upload image');
        return;
      }
    }
    
    if (editingProjectId) {
      await fetch(`${import.meta.env.VITE_API_URL || ""}/api/projects/${editingProjectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...projectForm, image: finalImageUrl })
      });
    } else {
      await fetch(`${import.meta.env.VITE_API_URL || ""}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...projectForm, image: finalImageUrl })
      });
    }
    
    setProjectForm({ title: '', description: '', image: '', category: 'IT' });
    setProjectImageFile(null);
    setEditingProjectId(null);
    fetchData();
  };

  const handleEditProject = (project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      image: project.image || '',
      category: project.category
    });
    setEditingProjectId(project.id);
    setProjectImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const cancelEditProject = () => {
    setProjectForm({ title: '', description: '', image: '', category: 'IT' });
    setProjectImageFile(null);
    setEditingProjectId(null);
  };
  const updateInternHero = async (e) => {
    e.preventDefault();
    if (!internHeroFile) return;
    try {
      const videoUrl = await handleFileUpload(internHeroFile);
      await fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/hero`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ videoUrl })
      });
      setInternHeroFile(null);
      fetchData();
    } catch (err) {
      alert('Failed to upload media');
    }
  };

  const deleteInternHero = async () => {
    if (!window.confirm('Are you sure you want to delete the hero media?')) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/hero`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setInternHero({ videoUrl: '' });
      fetchData();
    } catch (err) {
      alert('Failed to delete media');
    }
  };

  const addInternTestimonial = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(internTestimonialForm)
    });
    setInternTestimonialForm({ name: '', rating: '5', text: '' });
    fetchData();
  };

  const addInternFaq = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/faqs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(internFaqForm)
    });
    setInternFaqForm({ question: '', answer: '' });
    fetchData();
  };

  const addInternCollege = async (e) => {
    e.preventDefault();
    if (!internCollegeFile) return;
    try {
      const imageUrl = await handleFileUpload(internCollegeFile);
      await fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/colleges`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ imageUrl })
      });
      setInternCollegeFile(null);
      fetchData();
    } catch (err) {
      alert('Failed to upload college logo');
    }
  };

  const addInternGallery = async (e) => {
    e.preventDefault();
    if (!internGalleryFile) return;
    try {
      const imageUrl = await handleFileUpload(internGalleryFile);
      await fetch(`${import.meta.env.VITE_API_URL || ""}/api/internship/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ imageUrl })
      });
      setInternGalleryFile(null);
      fetchData();
    } catch (err) {
      alert('Failed to upload gallery image');
    }
  };

  const saveHomeHero = async (e) => {
    e.preventDefault();
    let finalImageUrl = homeHeroForm.imageUrl;
    if (homeHeroImageFile) {
      try {
        finalImageUrl = await handleFileUpload(homeHeroImageFile);
      } catch (err) {
        alert('Failed to upload banner image');
        return;
      }
    }
    
    const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/home-hero`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ ...homeHeroForm, imageUrl: finalImageUrl })
    });
    
    if (res.ok) {
      alert('Hero Announcement configuration saved successfully!');
      setHomeHeroImageFile(null);
      fetchData();
    } else {
      alert('Failed to save Hero configuration');
    }
  };

  const resetHomeHero = async () => {
    if (!window.confirm('Are you sure you want to reset the hero announcement to system defaults?')) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/home-hero`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      alert('Hero Announcement reset to defaults.');
      setHomeHeroImageFile(null);
      fetchData();
    } else {
      alert('Failed to reset Hero configuration');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col pt-8">
        <h2 className="text-xl font-bold px-6 mb-8 text-brand-accent">Admin Panel</h2>
        <nav className="flex-1 px-4 space-y-2">
          <button onClick={() => setActiveTab('blogs')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'blogs' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <BookOpen className="w-5 h-5" /> Blogs
          </button>
          <button onClick={() => setActiveTab('careers')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'careers' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Briefcase className="w-5 h-5" /> Careers
          </button>
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Briefcase className="w-5 h-5" /> Projects
          </button>
          <button onClick={() => setActiveTab('home_hero')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'home_hero' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Image className="w-5 h-5" /> Hero Announcement
          </button>
          
          <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Internship Page</div>
          <button onClick={() => setActiveTab('intern_hero')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'intern_hero' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Image className="w-5 h-5" /> Hero Video
          </button>
          <button onClick={() => setActiveTab('intern_testimonials')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'intern_testimonials' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <BookOpen className="w-5 h-5" /> Testimonials
          </button>
          <button onClick={() => setActiveTab('intern_faqs')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'intern_faqs' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <BookOpen className="w-5 h-5" /> FAQs
          </button>
          <button onClick={() => setActiveTab('intern_colleges')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'intern_colleges' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Image className="w-5 h-5" /> Partner Colleges
          </button>
          <button onClick={() => setActiveTab('intern_gallery')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'intern_gallery' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Image className="w-5 h-5" /> Gallery
          </button>
        </nav>
        <div className="p-4">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        
        {/* BLOGS */}
        {activeTab === 'blogs' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Manage Blogs</h1>
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Add New Blog</h2>
              <form onSubmit={addBlog} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Title" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="border p-3 rounded-lg"/>
                <input required placeholder="Date (e.g. Oct 12, 2023)" value={blogForm.date} onChange={e => setBlogForm({...blogForm, date: e.target.value})} className="border p-3 rounded-lg"/>
                <input required placeholder="Category" value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})} className="border p-3 rounded-lg"/>
                <textarea required placeholder="Blog Content" value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} className="border p-3 rounded-lg md:col-span-2" rows="4"/>
                <input type="file" accept="image/*" onChange={e => setBlogImageFile(e.target.files[0])} className="border p-2 rounded-lg bg-slate-50"/>
                <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Publish Blog</button>
              </form>
            </div>
            
            <div className="grid gap-4">
              {blogs.map(blog => (
                <div key={blog.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-800">{blog.title}</h3>
                    <p className="text-sm text-slate-500">{blog.category} • {blog.date}</p>
                  </div>
                  <button onClick={() => deleteItem('blogs', blog.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5"/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CAREERS */}
        {activeTab === 'careers' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Manage Careers</h1>
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Add Job Posting</h2>
              <form onSubmit={addCareer} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input required placeholder="Job Title" value={careerForm.title} onChange={e => setCareerForm({...careerForm, title: e.target.value})} className="border p-3 rounded-lg"/>
                <input required placeholder="Type (e.g. Full-time)" value={careerForm.type} onChange={e => setCareerForm({...careerForm, type: e.target.value})} className="border p-3 rounded-lg"/>
                <input required placeholder="Location" value={careerForm.location} onChange={e => setCareerForm({...careerForm, location: e.target.value})} className="border p-3 rounded-lg"/>
                <button type="submit" className="md:col-span-3 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Post Job</button>
              </form>
            </div>

            <div className="grid gap-4">
              {careers.map(career => (
                <div key={career.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-800">{career.title}</h3>
                    <p className="text-sm text-slate-500">{career.type} • {career.location}</p>
                  </div>
                  <button onClick={() => deleteItem('careers', career.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5"/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === 'projects' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Manage Projects & Clients</h1>
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                {editingProjectId ? <Pencil className="w-5 h-5"/> : <Plus className="w-5 h-5"/>} 
                {editingProjectId ? 'Edit Project' : 'Add New Project'}
              </h2>
              <form onSubmit={saveProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Project Title" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="border p-3 rounded-lg"/>
                <select value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})} className="border p-3 rounded-lg bg-white">
                  <option value="IT">IT Section</option>
                  <option value="Education">Empowering Education</option>
                </select>
                <textarea required placeholder="Description (What did you do?)" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="border p-3 rounded-lg md:col-span-2" rows="3"/>
                <input type="file" accept="image/*" onChange={e => setProjectImageFile(e.target.files[0])} className="border p-2 rounded-lg bg-slate-50 md:col-span-2"/>
                <div className="md:col-span-2 flex gap-4">
                  <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
                    {editingProjectId ? 'Update Project' : 'Add Project'}
                  </button>
                  {editingProjectId && (
                    <button type="button" onClick={cancelEditProject} className="flex-1 bg-slate-200 text-slate-800 py-3 rounded-lg font-bold hover:bg-slate-300">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
            
            <div className="grid gap-4">
              {projects.map(project => (
                <div key={project.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-slate-100 gap-4">
                  <img src={project.image || 'https://via.placeholder.com/150'} alt={project.title} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded text-slate-600 uppercase tracking-wider">{project.category}</span>
                      <h3 className="font-bold text-slate-800">{project.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => handleEditProject(project)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Pencil className="w-5 h-5"/></button>
                    <button onClick={() => deleteItem('projects', project.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5"/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTERNSHIP HERO */}
        {activeTab === 'intern_hero' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Internship Hero Media</h1>
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">Update Background Media</h2>
              <form onSubmit={updateInternHero} className="flex flex-col sm:flex-row gap-4">
                <input type="file" accept="image/*,video/mp4,video/webm" required onChange={e => setInternHeroFile(e.target.files[0])} className="border p-2 rounded-lg flex-1 bg-slate-50"/>
                <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700">Upload Media</button>
              </form>
            </div>
            {internHero?.videoUrl && (
              <div className="relative group bg-slate-900 rounded-2xl overflow-hidden aspect-video max-w-2xl shadow-lg">
                {internHero.videoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video src={internHero.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50" />
                ) : (
                  <img src={internHero.videoUrl} alt="Hero Background" className="w-full h-full object-cover opacity-50" />
                )}
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl drop-shadow-md pointer-events-none">Current Background Media</div>
                <button 
                  onClick={deleteInternHero}
                  className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold z-10"
                >
                  <Trash2 className="w-8 h-8 mb-2" /><br/>Delete Media
                </button>
              </div>
            )}
          </div>
        )}

        {/* INTERNSHIP TESTIMONIALS */}
        {activeTab === 'intern_testimonials' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Internship Testimonials</h1>
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Add Testimonial</h2>
              <form onSubmit={addInternTestimonial} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Student Name" value={internTestimonialForm.name} onChange={e => setInternTestimonialForm({...internTestimonialForm, name: e.target.value})} className="border p-3 rounded-lg"/>
                <select required value={internTestimonialForm.rating} onChange={e => setInternTestimonialForm({...internTestimonialForm, rating: e.target.value})} className="border p-3 rounded-lg bg-white">
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                </select>
                <textarea required placeholder="Testimonial Text" value={internTestimonialForm.text} onChange={e => setInternTestimonialForm({...internTestimonialForm, text: e.target.value})} className="border p-3 rounded-lg md:col-span-2" rows="3"/>
                <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Add Testimonial</button>
              </form>
            </div>
            <div className="grid gap-4">
              {internTestimonials.map(t => (
                <div key={t.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-800">{t.name} ({t.rating} Stars)</h3>
                    <p className="text-sm text-slate-500">"{t.text}"</p>
                  </div>
                  <button onClick={() => deleteItem('internship/testimonials', t.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5"/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTERNSHIP FAQS */}
        {activeTab === 'intern_faqs' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Internship FAQs</h1>
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Add FAQ</h2>
              <form onSubmit={addInternFaq} className="grid grid-cols-1 gap-4">
                <input required placeholder="Question" value={internFaqForm.question} onChange={e => setInternFaqForm({...internFaqForm, question: e.target.value})} className="border p-3 rounded-lg"/>
                <textarea required placeholder="Answer" value={internFaqForm.answer} onChange={e => setInternFaqForm({...internFaqForm, answer: e.target.value})} className="border p-3 rounded-lg" rows="3"/>
                <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Add FAQ</button>
              </form>
            </div>
            <div className="grid gap-4">
              {internFaqs.map(f => (
                <div key={f.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-800">Q: {f.question}</h3>
                    <p className="text-sm text-slate-500">A: {f.answer}</p>
                  </div>
                  <button onClick={() => deleteItem('internship/faqs', f.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5"/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTERNSHIP COLLEGES */}
        {activeTab === 'intern_colleges' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Partner Colleges</h1>
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Upload Logo</h2>
              <form onSubmit={addInternCollege} className="flex flex-col sm:flex-row gap-4">
                <input type="file" accept="image/*" required onChange={e => setInternCollegeFile(e.target.files[0])} className="border p-2 rounded-lg flex-1 bg-slate-50"/>
                <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700">Upload Logo</button>
              </form>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {internColleges.map((c) => (
                <div key={c.id} className="relative group bg-white border border-slate-200 rounded-xl overflow-hidden aspect-video flex items-center justify-center p-4">
                  <img src={c.imageUrl} className="max-w-full max-h-full object-contain" alt="College Logo" />
                  <button 
                    onClick={() => deleteItem('internship/colleges', c.id)}
                    className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTERNSHIP GALLERY */}
        {activeTab === 'intern_gallery' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Internship Gallery</h1>
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Upload Gallery Image</h2>
              <form onSubmit={addInternGallery} className="flex flex-col sm:flex-row gap-4">
                <input type="file" accept="image/*" required onChange={e => setInternGalleryFile(e.target.files[0])} className="border p-2 rounded-lg flex-1 bg-slate-50"/>
                <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700">Upload Image</button>
              </form>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {internGallery.map((g) => (
                <div key={g.id} className="relative group bg-slate-200 rounded-xl overflow-hidden aspect-square">
                  <img src={g.imageUrl} className="w-full h-full object-cover" alt="Gallery" />
                  <button 
                    onClick={() => deleteItem('internship/gallery', g.id)}
                    className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                  >
                    <Trash2 className="w-8 h-8 mb-2" /><br/>Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HOMEPAGE HERO ANNOUNCEMENT */}
        {activeTab === 'home_hero' && (
          <div className="max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Homepage Hero Announcement</h1>
                <p className="text-slate-500 font-medium mt-1">Configure the latest internship announcement drive and control live landing page hero elements.</p>
              </div>
              <button 
                type="button" 
                onClick={resetHomeHero}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2"
              >
                Reset to Defaults
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Config Fields */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 lg:col-span-7 space-y-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2 pb-3 border-b border-slate-100">
                  <Plus className="w-5 h-5 text-blue-500" /> Configuration
                </h2>
                
                <form onSubmit={saveHomeHero} className="space-y-6">
                  {/* Announcement Toggle */}
                  <div className="flex items-center justify-between p-4 bg-orange-50/50 border border-orange-100 rounded-2xl">
                    <div>
                      <label className="font-extrabold text-slate-800 text-sm block">Active Announcement Mode</label>
                      <span className="text-xs text-slate-500 font-medium">Toggle between the live internship banner drive and default tagline.</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={homeHeroForm.isAnnouncementActive} 
                        onChange={e => setHomeHeroForm({...homeHeroForm, isAnnouncementActive: e.target.checked})} 
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F05A28]"></div>
                    </label>
                  </div>

                  {homeHeroForm.isAnnouncementActive && (
                    <>
                      {/* Ticker Text */}
                      <div className="space-y-2">
                        <label className="text-sm font-extrabold text-slate-700 block">Top Marquee Ticker Text</label>
                        <input 
                          type="text" 
                          required={homeHeroForm.isAnnouncementActive}
                          placeholder="e.g. 🔥 Summer Internship Registrations Open Now" 
                          value={homeHeroForm.tickerText} 
                          onChange={e => setHomeHeroForm({...homeHeroForm, tickerText: e.target.value})} 
                          className="w-full border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none font-medium transition-all"
                        />
                      </div>
                    </>
                  )}

                  {/* Heading */}
                  <div className="space-y-2">
                    <label className="text-sm font-extrabold text-slate-700 block">Hero Title Heading</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Summer Internship Program 2026" 
                      value={homeHeroForm.heading} 
                      onChange={e => setHomeHeroForm({...homeHeroForm, heading: e.target.value})} 
                      className="w-full border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none font-medium transition-all"
                    />
                  </div>

                  {/* Subtitle / Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-extrabold text-slate-700 block">Subtitle / Description</label>
                    <textarea 
                      required
                      placeholder="e.g. Build Real Projects With Industry Experts" 
                      value={homeHeroForm.subtitle} 
                      onChange={e => setHomeHeroForm({...homeHeroForm, subtitle: e.target.value})} 
                      className="w-full border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none font-medium transition-all"
                      rows="3"
                    />
                  </div>

                  {homeHeroForm.isAnnouncementActive && (
                    <>
                      {/* Redirect Link */}
                      <div className="space-y-2">
                        <label className="text-sm font-extrabold text-slate-700 block">Redirect URL</label>
                        <input 
                          type="text" 
                          required={homeHeroForm.isAnnouncementActive}
                          placeholder="e.g. /internship or external registration link" 
                          value={homeHeroForm.redirectUrl} 
                          onChange={e => setHomeHeroForm({...homeHeroForm, redirectUrl: e.target.value})} 
                          className="w-full border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none font-medium transition-all"
                        />
                      </div>
                    </>
                  )}

                  {/* Banner Image upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-extrabold text-slate-700 block">Banner Image File</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={e => setHomeHeroImageFile(e.target.files[0])} 
                        className="w-full border border-slate-200 p-2.5 rounded-xl bg-slate-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-extrabold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                      />
                      {homeHeroForm.imageUrl && !homeHeroImageFile && (
                        <div className="h-14 w-20 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                          <img src={homeHeroForm.imageUrl} className="w-full h-full object-cover" alt="Current" />
                        </div>
                      )}
                    </div>
                    {homeHeroForm.imageUrl && (
                      <span className="text-[11px] text-slate-400 font-medium block overflow-hidden text-ellipsis whitespace-nowrap">Current URL: {homeHeroForm.imageUrl}</span>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#F05A28] hover:bg-[#d94a1b] text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    Save Configuration
                  </button>
                </form>
              </div>

              {/* Preview Side */}
              <div className="lg:col-span-5 space-y-6">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Image className="w-5 h-5 text-orange-500" /> Live Mock Preview
                </h2>
                
                {/* Live Preview Container resembling Home.jsx styles */}
                <div className="bg-[#FFF9F5] border border-orange-200/40 rounded-3xl p-6 shadow-md relative overflow-visible flex flex-col justify-between min-h-[460px]">
                  {/* Subtle decorative blob */}
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-orange-100/60 rounded-full blur-[40px] pointer-events-none -z-10"></div>
                  
                  <div className="space-y-4">
                    {/* Pulsing live badge mimic */}
                    {homeHeroForm.isAnnouncementActive ? (
                      <div className="inline-flex items-center gap-3 px-4.5 py-2.5 rounded-full bg-yellow-100/90 text-amber-800 font-extrabold text-xs border border-yellow-300/80 backdrop-blur-sm shadow-sm tracking-wider uppercase">
                        <span className="relative flex h-3 w-3 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                        </span>
                        <span className="leading-none mt-[1px]">LIVE REGISTRATION OPEN</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-yellow-100/90 text-amber-800 font-bold text-xs border border-yellow-300/80 tracking-wider backdrop-blur-sm shadow-sm uppercase">
                        <Rocket className="w-3.5 h-3.5 animate-bounce text-amber-600" />
                        <span className="leading-none mt-[1px]">🌐 IT Services • 🎓 Education • 💼 Internship</span>
                      </div>
                    )}

                    {/* Heading preview */}
                    <h3 className="text-xl md:text-2xl font-black text-[#0A2540] tracking-tight leading-tight">
                      {homeHeroForm.isAnnouncementActive ? (
                        <>
                          {homeHeroForm.heading ? (
                            <>
                              {homeHeroForm.heading.split(' ').slice(0, -1).join(' ')}{' '}
                              <span className="text-[#F05A28]">
                                {homeHeroForm.heading.split(' ').pop()}
                              </span>
                            </>
                          ) : (
                            "Summer Internship Program 2026"
                          )}
                        </>
                      ) : (
                        <>
                          Build. Learn. Grow with <span className="text-[#F05A28]">Technology & AI</span>
                        </>
                      )}
                    </h3>

                    {/* Subtitle preview */}
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      {homeHeroForm.isAnnouncementActive 
                        ? (homeHeroForm.subtitle || "Build Real Projects With Industry Experts")
                        : "We deliver IT solutions, practical education, and industry-ready internships — all in one place."}
                    </p>
                  </div>

                  {/* Banner mockup preview (matching the physical tilted card) */}
                  <div className="mt-6 relative w-full flex justify-center items-center overflow-visible">
                    {homeHeroForm.isAnnouncementActive && (
                      <>
                        {/* Mock Floating Emojis */}
                        <div className="absolute -top-4 -left-3 text-2xl select-none z-30 animate-bounce">📢</div>
                        <div className="absolute -top-5 -right-3 text-2xl select-none z-30 animate-bounce delay-150">🔔</div>
                        <div className="absolute bottom-2 -right-4 text-xl select-none z-30 animate-pulse">✨</div>
                        <div className="absolute -bottom-4 -left-3 text-2.5xl select-none z-30 animate-bounce">🎉</div>
                      </>
                    )}

                    {/* Polaroid Memo Flyer preview card */}
                    <div 
                      className={`relative w-full max-w-[340px] bg-white border border-slate-100 rounded-3xl p-2.5 shadow-xl flex flex-col transition-all duration-300 ${
                        homeHeroForm.isAnnouncementActive ? 'rotate-[-2.5deg]' : ''
                      }`}
                    >
                      {/* Pinned washi tape representation */}
                      {homeHeroForm.isAnnouncementActive && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-100/80 border border-amber-200/40 rounded-sm rotate-[-1.5deg] z-30 flex items-center justify-center pointer-events-none select-none">
                          <span className="w-6 h-[0.5px] bg-slate-300/30"></span>
                        </div>
                      )}

                      {/* Mock Image container */}
                      <div className="w-full relative overflow-hidden rounded-[1.2rem] bg-slate-100 flex items-center justify-center aspect-[1.45] shadow-inner z-10">
                        {homeHeroImageFile ? (
                          <>
                            <img src={URL.createObjectURL(homeHeroImageFile)} className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-125 select-none pointer-events-none" alt="Blur" />
                            <img src={URL.createObjectURL(homeHeroImageFile)} className="relative z-10 max-w-full max-h-full object-contain p-0.5 rounded-lg border border-white/20 bg-white/5" alt="Local" />
                          </>
                        ) : homeHeroForm.imageUrl ? (
                          <>
                            <img src={homeHeroForm.imageUrl} className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-125 select-none pointer-events-none" alt="Blur" />
                            <img src={homeHeroForm.imageUrl} className="relative z-10 max-w-full max-h-full object-contain p-0.5 rounded-lg border border-white/20 bg-white/5" alt="Remote" />
                          </>
                        ) : (
                          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1"><Image className="w-3.5 h-3.5"/> No Image Selected</span>
                        )}
                      </div>

                      {/* Text details below the image */}
                      <div className="pt-2 px-1 flex items-center justify-between z-20">
                        <div className="max-w-[80%] text-left">
                          <span className="text-[7px] uppercase tracking-wider font-extrabold text-[#F05A28] block">Announcement</span>
                          <span className="text-[10px] font-black text-[#0A2540] truncate block">{homeHeroForm.heading || "Summer Internship"}</span>
                          <span className="text-[9px] text-slate-500 font-semibold truncate block mt-0.5">{homeHeroForm.subtitle}</span>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-[#F05A28] flex items-center justify-center text-white shrink-0 ml-2">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {homeHeroForm.isAnnouncementActive && homeHeroForm.tickerText && (
                    <div className="mt-4 p-2 bg-gradient-to-r from-[#F05A28] to-[#F97316] text-white rounded-lg text-[9px] font-bold tracking-wider text-center uppercase overflow-hidden whitespace-nowrap text-ellipsis">
                      Marquee: {homeHeroForm.tickerText}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;

