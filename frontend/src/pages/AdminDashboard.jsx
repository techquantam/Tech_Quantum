import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2, Plus, Image, BookOpen, Briefcase } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [careers, setCareers] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [projects, setProjects] = useState([]);
  
  // Form States
  const [blogForm, setBlogForm] = useState({ title: '', date: '', category: '', image: '' });
  const [blogImageFile, setBlogImageFile] = useState(null);
  const [careerForm, setCareerForm] = useState({ title: '', type: '', location: '' });
  const [carouselImageFile, setCarouselImageFile] = useState(null);
  const [projectForm, setProjectForm] = useState({ title: '', description: '', image: '', category: 'IT' });
  const [projectImageFile, setProjectImageFile] = useState(null);

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
      const [bRes, cRes, imgRes, pRes, iHeroRes, iTestiRes, iFaqRes, iColRes, iGalRes] = await Promise.all([
        fetch('http://localhost:5000/api/blogs'),
        fetch('http://localhost:5000/api/careers'),
        fetch('http://localhost:5000/api/carousel'),
        fetch('http://localhost:5000/api/projects'),
        fetch('http://localhost:5000/api/internship/hero'),
        fetch('http://localhost:5000/api/internship/testimonials'),
        fetch('http://localhost:5000/api/internship/faqs'),
        fetch('http://localhost:5000/api/internship/colleges'),
        fetch('http://localhost:5000/api/internship/gallery')
      ]);
      setBlogs(await bRes.json());
      setCareers(await cRes.json());
      setCarousel(await imgRes.json());
      setProjects(await pRes.json());
      setInternHero(await iHeroRes.json());
      setInternTestimonials(await iTestiRes.json());
      setInternFaqs(await iFaqRes.json());
      setInternColleges(await iColRes.json());
      setInternGallery(await iGalRes.json());
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
    await fetch(`http://localhost:5000/api/${type}/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchData();
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('http://localhost:5000/api/upload', {
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
    await fetch('http://localhost:5000/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ ...blogForm, image: finalImageUrl })
    });
    setBlogForm({ title: '', date: '', category: '', image: '' });
    setBlogImageFile(null);
    fetchData();
  };

  const addCareer = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/careers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(careerForm)
    });
    setCareerForm({ title: '', type: '', location: '' });
    fetchData();
  };

  const addCarouselImage = async (e) => {
    e.preventDefault();
    if (!carouselImageFile) return;
    try {
      const uploadedUrl = await handleFileUpload(carouselImageFile);
      const newImages = [...carousel, uploadedUrl];
      await fetch('http://localhost:5000/api/carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ images: newImages })
      });
      setCarouselImageFile(null);
      fetchData();
    } catch (err) {
      alert('Failed to upload carousel image');
    }
  };

  const removeCarouselImage = async (index) => {
    if (!window.confirm('Remove image?')) return;
    const newImages = carousel.filter((_, i) => i !== index);
    await fetch('http://localhost:5000/api/carousel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ images: newImages })
    });
    fetchData();
  };

  const addProject = async (e) => {
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
    await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ ...projectForm, image: finalImageUrl })
    });
    setProjectForm({ title: '', description: '', image: '', category: 'IT' });
    setProjectImageFile(null);
    fetchData();
  };
  const updateInternHero = async (e) => {
    e.preventDefault();
    if (!internHeroFile) return;
    try {
      const videoUrl = await handleFileUpload(internHeroFile);
      await fetch('http://localhost:5000/api/internship/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ videoUrl })
      });
      setInternHeroFile(null);
      fetchData();
    } catch (err) {
      alert('Failed to upload video');
    }
  };

  const addInternTestimonial = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/internship/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(internTestimonialForm)
    });
    setInternTestimonialForm({ name: '', rating: '5', text: '' });
    fetchData();
  };

  const addInternFaq = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/internship/faqs', {
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
      await fetch('http://localhost:5000/api/internship/colleges', {
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
      await fetch('http://localhost:5000/api/internship/gallery', {
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
          <button onClick={() => setActiveTab('carousel')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'carousel' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Image className="w-5 h-5" /> Home Carousel
          </button>
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
            <Briefcase className="w-5 h-5" /> Projects
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

        {/* CAROUSEL */}
        {activeTab === 'carousel' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Home Page Carousel Images</h1>
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Upload New Image</h2>
              <form onSubmit={addCarouselImage} className="flex flex-col sm:flex-row gap-4">
                <input type="file" accept="image/*,video/mp4,video/webm,video/ogg" required onChange={e => setCarouselImageFile(e.target.files[0])} className="border p-2 rounded-lg flex-1 bg-slate-50"/>
                <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700">Upload Media</button>
              </form>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {carousel.map((src, index) => {
                const isVideo = src.match(/\.(mp4|webm|ogg)$/i);
                return (
                <div key={index} className="relative group bg-slate-200 rounded-xl overflow-hidden aspect-[4/5]">
                  {isVideo ? (
                    <video src={src} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                  ) : (
                    <img src={src} className="w-full h-full object-cover" alt={`Carousel ${index}`} />
                  )}
                  <button 
                    onClick={() => removeCarouselImage(index)}
                    className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                  >
                    <Trash2 className="w-8 h-8 mb-2" /><br/>Delete
                  </button>
                </div>
              )})}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === 'projects' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Manage Projects & Clients</h1>
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Add New Project</h2>
              <form onSubmit={addProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Project Title" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="border p-3 rounded-lg"/>
                <select value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})} className="border p-3 rounded-lg bg-white">
                  <option value="IT">IT Section</option>
                  <option value="Education">Empowering Education</option>
                </select>
                <textarea required placeholder="Description (What did you do?)" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="border p-3 rounded-lg md:col-span-2" rows="3"/>
                <input type="file" accept="image/*" onChange={e => setProjectImageFile(e.target.files[0])} className="border p-2 rounded-lg bg-slate-50 md:col-span-2"/>
                <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Add Project</button>
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
                  <button onClick={() => deleteItem('projects', project.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0"><Trash2 className="w-5 h-5"/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTERNSHIP HERO */}
        {activeTab === 'intern_hero' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Internship Hero Video</h1>
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">Update Background Video</h2>
              <form onSubmit={updateInternHero} className="flex flex-col sm:flex-row gap-4">
                <input type="file" accept="video/mp4,video/webm" required onChange={e => setInternHeroFile(e.target.files[0])} className="border p-2 rounded-lg flex-1 bg-slate-50"/>
                <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700">Upload Video</button>
              </form>
            </div>
            {internHero?.videoUrl && (
              <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video max-w-2xl relative shadow-lg">
                <video src={internHero.videoUrl} autoPlay loop muted className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl drop-shadow-md">Current Background Video</div>
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

      </div>
    </div>
  );
};

export default AdminDashboard;
