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

    const blogsCount = await models.Blog.countDocuments();
    const blogs = readJSON('blogs.json');
    if (blogsCount === 0 && blogs.length) {
      await models.Blog.insertMany(blogs);
      console.log(`Migrated ${blogs.length} blogs.`);
    } else {
      console.log('Blog collection already has data. Skipping seeding.');
    }

    const careersCount = await models.Career.countDocuments();
    const careers = readJSON('careers.json');
    if (careersCount === 0 && careers.length) {
      await models.Career.insertMany(careers);
      console.log(`Migrated ${careers.length} careers.`);
    } else {
      console.log('Career collection already has data. Skipping seeding.');
    }

    const projectsCount = await models.Project.countDocuments();
    const projects = readJSON('projects.json');
    if (projectsCount === 0 && projects.length) {
      await models.Project.insertMany(projects);
      console.log(`Migrated ${projects.length} projects.`);
    } else {
      console.log('Project collection already has data. Skipping seeding.');
    }

    const internHeroCount = await models.InternHero.countDocuments();
    const hero = readJSON('internship_hero.json');
    if (internHeroCount === 0 && hero && hero.videoUrl) {
      await models.InternHero.create(hero);
      console.log(`Migrated internship hero.`);
    } else {
      console.log('InternHero collection already has data. Skipping seeding.');
    }

    const homeHeroCount = await models.HomeHero.countDocuments();
    const homeHero = readJSON('home_hero.json');
    if (homeHeroCount === 0) {
      if (homeHero && homeHero.heading) {
        await models.HomeHero.create(homeHero);
        console.log(`Migrated homepage hero announcement.`);
      } else {
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
    } else {
      console.log('HomeHero collection already has data. Skipping seeding.');
    }

    const testsCount = await models.InternTestimonial.countDocuments();
    const tests = readJSON('internship_testimonials.json');
    if (testsCount === 0 && tests.length) {
      await models.InternTestimonial.insertMany(tests);
      console.log(`Migrated ${tests.length} testimonials.`);
    } else {
      console.log('Testimonials collection already has data. Skipping seeding.');
    }

    const faqsCount = await models.InternFaq.countDocuments();
    const faqs = readJSON('internship_faqs.json');
    if (faqsCount === 0 && faqs.length) {
      await models.InternFaq.insertMany(faqs);
      console.log(`Migrated ${faqs.length} faqs.`);
    } else {
      console.log('FAQs collection already has data. Skipping seeding.');
    }

    const collegesCount = await models.InternCollege.countDocuments();
    const colleges = readJSON('internship_colleges.json');
    if (collegesCount === 0 && colleges.length) {
      await models.InternCollege.insertMany(colleges);
      console.log(`Migrated ${colleges.length} colleges.`);
    } else {
      console.log('Colleges collection already has data. Skipping seeding.');
    }

    const galleryCount = await models.InternGallery.countDocuments();
    const gallery = readJSON('internship_gallery.json');
    if (galleryCount === 0 && gallery.length) {
      await models.InternGallery.insertMany(gallery);
      console.log(`Migrated ${gallery.length} gallery items.`);
    } else {
      console.log('Gallery collection already has data. Skipping seeding.');
    }

    console.log('Migration seeding check complete!');
    process.exit(0);
  } catch(e) {
    console.error('Migration error:', e);
    process.exit(1);
  }
};

migrate();
