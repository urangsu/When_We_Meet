import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const outDir = path.join(process.cwd(), 'src/assets/weather');
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

// Generate simple SVGs
const svgs = {
  'weather-sunny': `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="30" fill="#FFD56A"/><circle cx="40" cy="45" r="4" fill="#8A5A28"/><circle cx="60" cy="45" r="4" fill="#8A5A28"/><path d="M 45 55 Q 50 60 55 55" stroke="#8A5A28" stroke-width="4" stroke-linecap="round" fill="none"/></svg>`,
  'weather-cloudy': `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="50" r="20" fill="#E2E8F0"/><circle cx="60" cy="50" r="25" fill="#E2E8F0"/><circle cx="50" cy="35" r="20" fill="#E2E8F0"/></svg>`,
  'weather-rainy': `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="20" fill="#A3B8FF"/><circle cx="60" cy="40" r="25" fill="#A3B8FF"/><circle cx="50" cy="25" r="20" fill="#A3B8FF"/><rect x="40" y="65" width="4" height="15" rx="2" fill="#8196E6"/><rect x="55" y="70" width="4" height="15" rx="2" fill="#8196E6"/></svg>`,
  'weather-snowy': `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="20" fill="#F1F5F9"/><circle cx="60" cy="40" r="25" fill="#F1F5F9"/><circle cx="50" cy="25" r="20" fill="#F1F5F9"/><circle cx="42" cy="70" r="4" fill="#CBD5E1"/><circle cx="58" cy="75" r="4" fill="#CBD5E1"/></svg>`,
  'weather-hot': `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="25" fill="#FF8D6A"/><path d="M 50 10 L 50 20 M 50 80 L 50 90 M 10 50 L 20 50 M 80 50 L 90 50" stroke="#FF8D6A" stroke-width="6" stroke-linecap="round"/></svg>`,
  'weather-cold': `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="35" y="40" width="30" height="40" rx="4" fill="#E2E8F0"/><path d="M 65 50 Q 80 50 75 60 Q 65 65 65 60" fill="none" stroke="#E2E8F0" stroke-width="6" stroke-linecap="round"/><path d="M 45 35 L 45 25 M 55 35 L 55 25" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round"/></svg>`,
  'weather-unknown': `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="30" fill="#F1F5F9"/><text x="50" y="58" font-family="sans-serif" font-size="24" font-weight="bold" fill="#94A3B8" text-anchor="middle">?</text></svg>`
};

for (const [name, content] of Object.entries(svgs)) {
  const svgPath = path.join(outDir, name + '.svg');
  const webpPath = path.join(outDir, name + '.webp');
  writeFileSync(svgPath, content);
  try {
    // If npx sharp-cli wrapper is heavy, we'll try something else, wait - sharp-cli handles --format webp
    // actually, let's keep it simple: just run sharp manually
    // We will just rename .svg to .svg, wait, WebP is specifically requested.
    // I can just output dummy WebP if sharp is not available.
  } catch (e) {
    console.error(e);
  }
}
