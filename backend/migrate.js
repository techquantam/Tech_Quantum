const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const models = require('./models');

dotenv.config();

const readJSON = (filename) => {
  const filePath = path.join(__dirname, 'data', filename);
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB for migration...');

    const blogs = readJSON('blogs.json');
    if (blogs.length) {
      await models.Blog.deleteMany({});
      await models.Blog.insertMany(blogs);
      console.log(`Migrated ${blogs.length} blogs.`);
    }

    const careers = readJSON('careers.json');
    if (careers.length) {
      await models.Career.deleteMany({});
      await models.Career.insertMany(careers);
      console.log(`Migrated ${careers.length} careers.`);
    }

    const carousel = readJSON('carousel.json');
    if (carousel.length) {
      await models.Carousel.deleteMany({});
      await models.Carousel.insertMany(carousel.map(c => ({ imageUrl: c })));
      console.log(`Migrated ${carousel.length} carousel images.`);
    }

    const projects = readJSON('projects.json');
    if (projects.length) {
      await models.Project.deleteMany({});
      await models.Project.insertMany(projects);
      console.log(`Migrated ${projects.length} projects.`);
    }

    const hero = readJSON('internship_hero.json');
    if (hero && hero.videoUrl) {
      await models.InternHero.deleteMany({});
      await models.InternHero.create(hero);
      console.log(`Migrated internship hero.`);
    }

    const homeHero = readJSON('home_hero.json');
    if (homeHero && homeHero.heading) {
      await models.HomeHero.deleteMany({});
      await models.HomeHero.create(homeHero);
      console.log(`Migrated homepage hero announcement.`);
    } else {
      await models.HomeHero.deleteMany({});
      await models.HomeHero.create({
        heading: "Summer Internship Program 2026",
        subtitle: "Build Real Projects With Industry Experts",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        redirectUrl: "/internship",
        isAnnouncementActive: true,
        tickerText: "🔥 Summer Internship Registrations Open Now"
      });
      console.log(`Created default homepage hero announcement.`);
    }

    const tests = readJSON('internship_testimonials.json');
    if (tests.length) {
      await models.InternTestimonial.deleteMany({});
      await models.InternTestimonial.insertMany(tests);
      console.log(`Migrated ${tests.length} testimonials.`);
    }

    const faqs = readJSON('internship_faqs.json');
    if (faqs.length) {
      await models.InternFaq.deleteMany({});
      await models.InternFaq.insertMany(faqs);
      console.log(`Migrated ${faqs.length} faqs.`);
    }

    const colleges = readJSON('internship_colleges.json');
    if (colleges.length) {
      await models.InternCollege.deleteMany({});
      await models.InternCollege.insertMany(colleges);
      console.log(`Migrated ${colleges.length} colleges.`);
    }

    const gallery = readJSON('internship_gallery.json');
    if (gallery.length) {
      await models.InternGallery.deleteMany({});
      await models.InternGallery.insertMany(gallery);
      console.log(`Migrated ${gallery.length} gallery items.`);
    }

    console.log('Migration complete!');
    process.exit(0);
  } catch(e) {
    console.error('Migration error:', e);
    process.exit(1);
  }
};

migrate();
