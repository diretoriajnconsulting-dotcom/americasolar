import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('src');
const icons = ['ArrowRight', 'Shield', 'Zap', 'CheckCircle', 'Award', 'Flame', 'Target', 'Rocket', 'Smile', 'Users', 'TrendingUp', 'Leaf', 'Eye', 'BookOpen', 'Icon', 'Menu', 'X', 'ChevronRight', 'ChevronLeft', 'Search', 'Filter', 'MapPin', 'Phone', 'Mail', 'Instagram', 'Linkedin', 'Facebook', 'Twitter', 'Calendar', 'Clock', 'Download', 'FileText', 'Upload', 'Trash', 'Check', 'AlertCircle', 'AlertTriangle', 'Info'];

const regex = new RegExp(`<(${icons.join('|')})\\b([^>]+)>`, 'g');

files.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');
  let changed = false;
  code = code.replace(regex, (match, p1, p2) => {
    if (p2.includes('strokeWidth')) return match;
    changed = true;
    return `<${p1} strokeWidth={1.25}${p2}>`;
  });
  if (changed) {
    fs.writeFileSync(file, code);
    console.log(`Updated ${file}`);
  }
});
