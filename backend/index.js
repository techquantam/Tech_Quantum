const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const models = require('./models');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const port = process.env.PORT || 6000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Helper function to send Email via Brevo API
const sendBrevoEmail = async (subject, content, isHtml = false) => {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  
  const payload = {
    sender: { name: "Cyvanta Tech Quantum", email: "techquantum.india@gmail.com" },
    to: [{ email: "techquantum.india@gmail.com" }],
    subject: subject,
  };

  if (isHtml) {
    payload.htmlContent = content;
  } else {
    payload.textContent = content;
  }

  try {
    await axios.post('https://api.brevo.com/v3/smtp/email', payload, {
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      }
    });
    console.log('Email sent successfully via Brevo');
  } catch (error) {
    console.error('Brevo Email error:', error.response ? error.response.data : error.message);
  }
};

// Helper function to send WhatsApp via API (Placeholder for UltraMsg/Twilio)
const sendWhatsAppNotification = async (name, email, phone, service, message) => {
  // Replace these with your actual UltraMsg or Twilio API details
  const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || 'https://api.ultramsg.com/YOUR_INSTANCE_ID/messages/chat';
  const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || 'YOUR_TOKEN';
  const ADMIN_PHONE = process.env.ADMIN_PHONE; // The number where you receive notifications

  const textMessage = `New Inquiry for ${service}!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;

  try {
    if (process.env.WHATSAPP_TOKEN) {
      await axios.post(WHATSAPP_API_URL, {
        token: WHATSAPP_TOKEN,
        to: ADMIN_PHONE,
        body: textMessage,
      });
      console.log('WhatsApp message sent to admin successfully');
    } else {
      console.log('[Mock WhatsApp] Would have sent:', textMessage);
      console.log('Please add WHATSAPP_TOKEN and WHATSAPP_API_URL to your .env to enable actual delivery.');
    }
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.message);
    if (error.response && error.response.data) {
      console.error('WhatsApp API Error Details:', error.response.data);
    }
  }
};

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !phone || !service) {
    return res.status(400).json({ error: 'Name, Phone, and Service are required fields.' });
  }

  // 1. Send Email Notification
  const mailOptions = {
    from: process.env.EMAIL_USER || 'your_email@gmail.com',
    to: 'techquantum.india@gmail.com',
    subject: `New Inquiry for ${service} from ${name}`,
    text: `
      You have a new inquiry from Cyvanta Tech Quantum Landing Page!

      Name: ${name}
      Email: ${email || 'Not provided'}
      Phone: ${phone}
      Service Requested: ${service}
      
      Message:
      ${message || 'No additional message.'}
    `,
  };

  try {
    // Send Email via Brevo asynchronously (don't block the response)
    sendBrevoEmail(mailOptions.subject, mailOptions.text, false);

    // 2. Send WhatsApp Notification asynchronously (don't block the response)
    sendWhatsAppNotification(name, email, phone, service, message);

    res.status(200).json({ success: true, message: 'Message received!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send notification.' });
  }
});

app.post('/api/internship-registration', async (req, res) => {
  const { name, email, phone, college, branch, year, domain, thought, receiptUrl } = req.body;

  if (!name || !email || !phone || !college || !branch || !domain) {
    return res.status(400).json({ error: 'Please fill all required fields.' });
  }

  // 1. Send Email Notification
  const mailOptions = {
    from: process.env.EMAIL_USER || 'your_email@gmail.com',
    to: 'techquantum.india@gmail.com',
    subject: `New Internship Registration from ${name}`,
    html: `
      <h2>New Internship Registration</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>College:</strong> ${college}</p>
      <p><strong>Branch:</strong> ${branch}</p>
      <p><strong>Year:</strong> ${year}</p>
      <p><strong>Domain:</strong> ${domain}</p>
      <p><strong>Payment Receipt:</strong> <a href="${receiptUrl}">View Receipt</a></p>
      <p><strong>Any Thought:</strong> ${thought || 'N/A'}</p>
    `,
  };

  try {
    // Send Email via Brevo asynchronously
    sendBrevoEmail(mailOptions.subject, mailOptions.html, true);

    // 2. Send WhatsApp Notification
    const extraDetails = `
Registration Details:
College: ${college}
Branch: ${branch}
Year: ${year}
Domain: ${domain}
Receipt: ${receiptUrl}
Thought: ${thought || 'None'}
`;
    sendWhatsAppNotification(name, email, phone, 'Internship Registration', extraDetails);

    res.status(200).json({ success: true, message: 'Registration submitted successfully!' });
  } catch (error) {
    console.error('Error processing registration:', error);
    res.status(500).json({ error: 'Failed to submit registration.' });
  }
});

app.post('/api/internship-enquiry', async (req, res) => {
  const { name, email, phone, college, branch, year, domain, thought } = req.body;

  if (!name || !email || !phone || !college || !branch || !domain) {
    return res.status(400).json({ error: 'Please fill all required fields.' });
  }

  // 1. Send Email Notification
  const mailOptions = {
    from: process.env.EMAIL_USER || 'your_email@gmail.com',
    to: 'techquantum.india@gmail.com',
    subject: `New Internship Enquiry from ${name}`,
    html: `
      <h2>New Internship Enquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>College:</strong> ${college}</p>
      <p><strong>Branch:</strong> ${branch}</p>
      <p><strong>Year:</strong> ${year}</p>
      <p><strong>Domain:</strong> ${domain}</p>
      <p><strong>Any Thought:</strong> ${thought || 'N/A'}</p>
    `,
  };

  try {
    // Send Email via Brevo asynchronously
    sendBrevoEmail(mailOptions.subject, mailOptions.html, true);

    // 2. Send WhatsApp Notification
    const extraDetails = `
Enquiry Details:
College: ${college}
Branch: ${branch}
Year: ${year}
Domain: ${domain}
Thought: ${thought || 'None'}
`;
    sendWhatsAppNotification(name, email, phone, 'Internship Enquiry', extraDetails);

    res.status(200).json({ success: true, message: 'Enquiry submitted successfully!' });
  } catch (error) {
    console.error('Error processing enquiry:', error);
    res.status(500).json({ error: 'Failed to submit enquiry.' });
  }
});

// ==========================================
// ADMIN PANEL APIS (JSON File DB)
// ==========================================

const readJSON = (filename) => {
  const filePath = path.join(__dirname, 'data', filename);
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeJSON = (filename, data) => {
  const filePath = path.join(__dirname, 'data', filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'cyvanta@123';
const ADMIN_TOKEN = 'cyvanta_admin_token_secure';

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === `Bearer ${ADMIN_TOKEN}`) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized access' });
  }
};

// ==========================================
// FILE UPLOAD API (Cloudinary + Local Fallback)
// ==========================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

let storage;
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name') {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'cyvanta_uploads',
      resource_type: 'auto',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    }
  });
} else {
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
    }
  });
}
const upload = multer({ storage });

app.post('/api/upload', verifyAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageUrl = req.file.path || `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

app.post('/api/upload-receipt', upload.single('receipt'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No receipt file uploaded' });
  }
  const receiptUrl = req.file.path || `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ receiptUrl });
});

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ token: ADMIN_TOKEN });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Helper for frontend compatibility (id instead of _id)
const toFrontEnd = (doc) => {
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  return obj;
};

// --- BLOGS API ---
app.get('/api/blogs', async (req, res) => {
  const blogs = await models.Blog.find();
  res.json(blogs.map(toFrontEnd));
});
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await models.Blog.findById(req.params.id);
    if (blog) res.json(toFrontEnd(blog));
    else res.status(404).json({ error: 'Blog not found' });
  } catch(e) { res.status(404).json({ error: 'Invalid ID' }); }
});
app.post('/api/blogs', verifyAdmin, async (req, res) => {
  const newBlog = new models.Blog(req.body);
  await newBlog.save();
  res.json(toFrontEnd(newBlog));
});
app.delete('/api/blogs/:id', verifyAdmin, async (req, res) => {
  await models.Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- CAREERS API ---
app.get('/api/careers', async (req, res) => {
  const careers = await models.Career.find();
  res.json(careers.map(toFrontEnd));
});
app.post('/api/careers', verifyAdmin, async (req, res) => {
  const newCareer = new models.Career(req.body);
  await newCareer.save();
  res.json(toFrontEnd(newCareer));
});
app.delete('/api/careers/:id', verifyAdmin, async (req, res) => {
  await models.Career.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});


// --- PROJECTS API ---
app.get('/api/projects', async (req, res) => {
  const projects = await models.Project.find();
  res.json(projects.map(toFrontEnd));
});
app.post('/api/projects', verifyAdmin, async (req, res) => {
  const newProject = new models.Project(req.body);
  await newProject.save();
  res.json(toFrontEnd(newProject));
});
app.delete('/api/projects/:id', verifyAdmin, async (req, res) => {
  await models.Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
app.put('/api/projects/:id', verifyAdmin, async (req, res) => {
  const updatedProject = await models.Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(toFrontEnd(updatedProject));
});

// --- INTERNSHIP HERO API ---
app.get('/api/internship/hero', async (req, res) => {
  const hero = await models.InternHero.findOne();
  res.json(hero ? toFrontEnd(hero) : { videoUrl: '' });
});
app.post('/api/internship/hero', verifyAdmin, async (req, res) => {
  await models.InternHero.deleteMany({});
  const hero = new models.InternHero(req.body);
  await hero.save();
  res.json({ success: true });
});
app.delete('/api/internship/hero', verifyAdmin, async (req, res) => {
  await models.InternHero.deleteMany({});
  res.json({ success: true });
});

// --- HOME HERO API ---
app.get('/api/home-hero', async (req, res) => {
  try {
    let hero = await models.HomeHero.findOne();
    if (!hero) {
      hero = {
        heading: "Summer Internship Program 2026",
        subtitle: "Build Real Projects With Industry Experts",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        redirectUrl: "/internship",
        isAnnouncementActive: true,
        tickerText: "🔥 Summer Internship Registrations Open Now",
        lmsUrl: "https://cyvantalms.techquantum.in/login"
      };
    } else {
      hero = toFrontEnd(hero);
      if (!hero.lmsUrl) {
        hero.lmsUrl = "https://cyvantalms.techquantum.in/login";
      }
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch homepage hero configuration" });
  }
});

app.post('/api/home-hero', verifyAdmin, async (req, res) => {
  try {
    await models.HomeHero.deleteMany({});
    const hero = new models.HomeHero(req.body);
    await hero.save();
    res.json({ success: true, hero: toFrontEnd(hero) });
  } catch (error) {
    res.status(500).json({ error: "Failed to save homepage hero configuration" });
  }
});

app.delete('/api/home-hero', verifyAdmin, async (req, res) => {
  try {
    await models.HomeHero.deleteMany({});
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to reset homepage hero configuration" });
  }
});

// --- INTERNSHIP TESTIMONIALS API ---
app.get('/api/internship/testimonials', async (req, res) => {
  const tests = await models.InternTestimonial.find();
  res.json(tests.map(toFrontEnd));
});
app.post('/api/internship/testimonials', verifyAdmin, async (req, res) => {
  const t = new models.InternTestimonial(req.body);
  await t.save();
  res.json(toFrontEnd(t));
});
app.delete('/api/internship/testimonials/:id', verifyAdmin, async (req, res) => {
  await models.InternTestimonial.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- INTERNSHIP FAQS API ---
app.get('/api/internship/faqs', async (req, res) => {
  const faqs = await models.InternFaq.find();
  res.json(faqs.map(toFrontEnd));
});
app.post('/api/internship/faqs', verifyAdmin, async (req, res) => {
  const faq = new models.InternFaq(req.body);
  await faq.save();
  res.json(toFrontEnd(faq));
});
app.delete('/api/internship/faqs/:id', verifyAdmin, async (req, res) => {
  await models.InternFaq.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- INTERNSHIP COLLEGES API ---
app.get('/api/internship/colleges', async (req, res) => {
  const cols = await models.InternCollege.find();
  res.json(cols.map(toFrontEnd));
});
app.post('/api/internship/colleges', verifyAdmin, async (req, res) => {
  const c = new models.InternCollege(req.body);
  await c.save();
  res.json(toFrontEnd(c));
});
app.delete('/api/internship/colleges/:id', verifyAdmin, async (req, res) => {
  await models.InternCollege.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// --- INTERNSHIP GALLERY API ---
app.get('/api/internship/gallery', async (req, res) => {
  const gals = await models.InternGallery.find();
  res.json(gals.map(toFrontEnd));
});
app.post('/api/internship/gallery', verifyAdmin, async (req, res) => {
  const g = new models.InternGallery(req.body);
  await g.save();
  res.json(toFrontEnd(g));
});
app.delete('/api/internship/gallery/:id', verifyAdmin, async (req, res) => {
  await models.InternGallery.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
