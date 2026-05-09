import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Blog not found');
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF9F5] pt-24 pb-16 flex items-center justify-center">
        <div className="text-xl text-slate-500 font-bold">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FFF9F5] pt-24 pb-16 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Blog Post Not Found</h1>
        <Link to="/blog" className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5] pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-600 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to all posts
          </Link>
          
          <div className="flex items-center gap-4 text-sm text-slate-500 font-medium mb-6">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
              <Tag className="w-4 h-4" /> {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {post.date}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-8 leading-tight">
            {post.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl overflow-hidden shadow-xl mb-12 border-4 border-white h-[400px]"
        >
          <img src={post.image || 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80'} alt="Blog Cover" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg prose-slate max-w-none bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100"
        >
          {post.content ? (
            <p className="whitespace-pre-line text-slate-600 leading-relaxed">
              {post.content}
            </p>
          ) : (
            <p className="text-slate-500 italic">No detailed content available for this blog post.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
