const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'abhisakhhusingh@gmail.com',
    pass: process.env.EMAIL_PASS || 'your_app_password',
  },
});

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
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } else {
      console.log('Email would have been sent (credentials missing):', mailOptions.subject);
    }

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
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
      console.log('Internship Registration Email sent successfully');
    } else {
      console.log('Email would have been sent (credentials missing):', mailOptions.subject);
    }

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

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
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
// FILE UPLOAD API
// ==========================================
const storage = multer.diskStorage({
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
const upload = multer({ storage });

app.post('/api/upload', verifyAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

app.post('/api/upload-receipt', upload.single('receipt'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No receipt file uploaded' });
  }
  const receiptUrl = `http://localhost:5000/uploads/${req.file.filename}`;
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

// --- BLOGS API ---
app.get('/api/blogs', (req, res) => res.json(readJSON('blogs.json')));
app.post('/api/blogs', verifyAdmin, (req, res) => {
  const blogs = readJSON('blogs.json');
  const newBlog = { id: Date.now(), ...req.body };
  blogs.push(newBlog);
  writeJSON('blogs.json', blogs);
  res.json(newBlog);
});
app.delete('/api/blogs/:id', verifyAdmin, (req, res) => {
  let blogs = readJSON('blogs.json');
  blogs = blogs.filter(b => b.id != req.params.id);
  writeJSON('blogs.json', blogs);
  res.json({ success: true });
});

// --- CAREERS API ---
app.get('/api/careers', (req, res) => res.json(readJSON('careers.json')));
app.post('/api/careers', verifyAdmin, (req, res) => {
  const careers = readJSON('careers.json');
  const newCareer = { id: Date.now(), ...req.body };
  careers.push(newCareer);
  writeJSON('careers.json', careers);
  res.json(newCareer);
});
app.delete('/api/careers/:id', verifyAdmin, (req, res) => {
  let careers = readJSON('careers.json');
  careers = careers.filter(c => c.id != req.params.id);
  writeJSON('careers.json', careers);
  res.json({ success: true });
});

// --- CAROUSEL API ---
app.get('/api/carousel', (req, res) => res.json(readJSON('carousel.json')));
app.post('/api/carousel', verifyAdmin, (req, res) => {
  // Overwrite the entire array of URLs
  writeJSON('carousel.json', req.body.images);
  res.json({ success: true });
});

// --- PROJECTS API ---
app.get('/api/projects', (req, res) => res.json(readJSON('projects.json')));
app.post('/api/projects', verifyAdmin, (req, res) => {
  const projects = readJSON('projects.json');
  const newProject = { id: Date.now(), ...req.body };
  projects.push(newProject);
  writeJSON('projects.json', projects);
  res.json(newProject);
});
app.delete('/api/projects/:id', verifyAdmin, (req, res) => {
  let projects = readJSON('projects.json');
  projects = projects.filter(p => p.id != req.params.id);
  writeJSON('projects.json', projects);
  res.json({ success: true });
});

// --- INTERNSHIP HERO API ---
app.get('/api/internship/hero', (req, res) => res.json(readJSON('internship_hero.json')));
app.post('/api/internship/hero', verifyAdmin, (req, res) => {
  writeJSON('internship_hero.json', req.body);
  res.json({ success: true });
});

// --- INTERNSHIP TESTIMONIALS API ---
app.get('/api/internship/testimonials', (req, res) => res.json(readJSON('internship_testimonials.json')));
app.post('/api/internship/testimonials', verifyAdmin, (req, res) => {
  const testimonials = readJSON('internship_testimonials.json');
  const newTestimonial = { id: Date.now(), ...req.body };
  testimonials.push(newTestimonial);
  writeJSON('internship_testimonials.json', testimonials);
  res.json(newTestimonial);
});
app.delete('/api/internship/testimonials/:id', verifyAdmin, (req, res) => {
  let testimonials = readJSON('internship_testimonials.json');
  testimonials = testimonials.filter(t => t.id != req.params.id);
  writeJSON('internship_testimonials.json', testimonials);
  res.json({ success: true });
});

// --- INTERNSHIP FAQS API ---
app.get('/api/internship/faqs', (req, res) => res.json(readJSON('internship_faqs.json')));
app.post('/api/internship/faqs', verifyAdmin, (req, res) => {
  const faqs = readJSON('internship_faqs.json');
  const newFaq = { id: Date.now(), ...req.body };
  faqs.push(newFaq);
  writeJSON('internship_faqs.json', faqs);
  res.json(newFaq);
});
app.delete('/api/internship/faqs/:id', verifyAdmin, (req, res) => {
  let faqs = readJSON('internship_faqs.json');
  faqs = faqs.filter(f => f.id != req.params.id);
  writeJSON('internship_faqs.json', faqs);
  res.json({ success: true });
});

// --- INTERNSHIP COLLEGES API ---
app.get('/api/internship/colleges', (req, res) => res.json(readJSON('internship_colleges.json')));
app.post('/api/internship/colleges', verifyAdmin, (req, res) => {
  const colleges = readJSON('internship_colleges.json');
  const newCollege = { id: Date.now(), ...req.body };
  colleges.push(newCollege);
  writeJSON('internship_colleges.json', colleges);
  res.json(newCollege);
});
app.delete('/api/internship/colleges/:id', verifyAdmin, (req, res) => {
  let colleges = readJSON('internship_colleges.json');
  colleges = colleges.filter(c => c.id != req.params.id);
  writeJSON('internship_colleges.json', colleges);
  res.json({ success: true });
});

// --- INTERNSHIP GALLERY API ---
app.get('/api/internship/gallery', (req, res) => res.json(readJSON('internship_gallery.json')));
app.post('/api/internship/gallery', verifyAdmin, (req, res) => {
  const gallery = readJSON('internship_gallery.json');
  const newImage = { id: Date.now(), ...req.body };
  gallery.push(newImage);
  writeJSON('internship_gallery.json', gallery);
  res.json(newImage);
});
app.delete('/api/internship/gallery/:id', verifyAdmin, (req, res) => {
  let gallery = readJSON('internship_gallery.json');
  gallery = gallery.filter(g => g.id != req.params.id);
  writeJSON('internship_gallery.json', gallery);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
