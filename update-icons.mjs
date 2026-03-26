import fs from 'fs';

let code = fs.readFileSync('src/app/page.tsx', 'utf8');
const icons = ['ArrowRight', 'Shield', 'Zap', 'CheckCircle', 'Award', 'Flame', 'Target', 'Rocket', 'Smile', 'Users', 'TrendingUp', 'Leaf', 'Eye', 'BookOpen', 'Icon'];
const regex = new RegExp(`<(${icons.join('|')})\\b([^>]+)>`, 'g');

code = code.replace(regex, (match, p1, p2) => {
  if (p2.includes('strokeWidth')) return match;
  return `<${p1} strokeWidth={1.25}${p2}>`;
});

fs.writeFileSync('src/app/page.tsx', code);
console.log('Icons updated');
