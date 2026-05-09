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

const apiUrlCode = `const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';\n`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.includes('http://localhost:5000')) {
    // Inject API_URL inside the component or at the top
    if (!content.includes('const API_URL =')) {
      // Find the first import statement and put it after imports
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const nextLineIndex = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, nextLineIndex + 1) + '\n' + apiUrlCode + content.slice(nextLineIndex + 1);
      } else {
        content = apiUrlCode + '\n' + content;
      }
    }

    // Replace literal strings
    content = content.replace(/'http:\/\/localhost:5000/g, '`${API_URL}');
    content = content.replace(/"http:\/\/localhost:5000/g, '`${API_URL}');
    
    // Replace template strings containing it
    content = content.replace(/http:\/\/localhost:5000/g, '${API_URL}');

    // Clean up if it produced `${API_URL}`' (trailing quote without starting backtick because we replaced starting quote with backtick)
    // Actually regex is safer:
    // This is a quick and dirty way, let's fix the quotes:
    content = content.replace(/`\$\{API_URL\}([^']*)'/g, '`${API_URL}$1`');
    content = content.replace(/`\$\{API_URL\}([^"]*)"/g, '`${API_URL}$1`');

    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
}
