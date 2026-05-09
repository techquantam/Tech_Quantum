import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      filelist.push(dirFile);
    }
  }
  return filelist;
};

const files = walkSync(srcDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.includes('http://localhost:5000')) {
    // 1. Handle backticks
    content = content.replace(/`http:\/\/localhost:5000([^`]*)`/g, '`${import.meta.env.VITE_API_URL}$1`');
    
    // 2. Handle single quotes
    content = content.replace(/'http:\/\/localhost:5000([^']*)'/g, '`${import.meta.env.VITE_API_URL}$1`');
    
    // 3. Handle double quotes
    content = content.replace(/"http:\/\/localhost:5000([^"]*)"/g, '`${import.meta.env.VITE_API_URL}$1`');

    fs.writeFileSync(file, content);
    console.log('Updated safely:', file);
  }
}
