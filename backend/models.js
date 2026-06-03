const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  date: String,
  category: String,
  image: String,
  content: String
});
const Blog = mongoose.model('Blog', blogSchema);

const careerSchema = new mongoose.Schema({
  title: String,
  type: String,
  location: String
});
const Career = mongoose.model('Career', careerSchema);

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  category: String
});
const Project = mongoose.model('Project', projectSchema);

const internHeroSchema = new mongoose.Schema({
  videoUrl: String
});
const InternHero = mongoose.model('InternHero', internHeroSchema);

const homeHeroSchema = new mongoose.Schema({
  heading: String,
  subtitle: String,
  imageUrl: String,
  redirectUrl: String,
  isAnnouncementActive: Boolean,
  tickerText: String,
  lmsUrl: String
});
const HomeHero = mongoose.model('HomeHero', homeHeroSchema);

const internTestimonialSchema = new mongoose.Schema({
  name: String,
  rating: String,
  text: String
});
const InternTestimonial = mongoose.model('InternTestimonial', internTestimonialSchema);

const internFaqSchema = new mongoose.Schema({
  question: String,
  answer: String
});
const InternFaq = mongoose.model('InternFaq', internFaqSchema);

const internCollegeSchema = new mongoose.Schema({
  imageUrl: String
});
const InternCollege = mongoose.model('InternCollege', internCollegeSchema);

const internGallerySchema = new mongoose.Schema({
  imageUrl: String
});
const InternGallery = mongoose.model('InternGallery', internGallerySchema);

module.exports = {
  Blog,
  Career,
  Project,
  InternHero,
  HomeHero,
  InternTestimonial,
  InternFaq,
  InternCollege,
  InternGallery
};
