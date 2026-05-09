import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 font-semibold text-sm mb-6">
            <BookOpen className="w-4 h-4" />
            Our Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6">
            Latest Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">News</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Read our latest articles on technology trends, educational advancements, and industry news.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="h-48 bg-slate-200 w-full relative overflow-hidden">
                {/* Placeholder Image */}
                <img src={post.image || 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=80'} alt="Blog Cover" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-600">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-400 font-medium mb-3">{post.date}</p>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-purple-600 transition-colors">{post.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
