const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'generated_logos');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const colors = [
    '#4A90E2', '#50E3C2', '#B8E986', '#F5A623', '#D0021B',
    '#417505', '#9013FE', '#BD10E0', '#4A4A4A', '#7ED321'
];

function generateSVG(index, theme) {
    const id = `logo-${(index + 1).toString().padStart(2, '0')}`;
    const color = colors[index % colors.length];
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by Gemini CLI -->
<svg id="${id}" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0.5" />
        </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="90" fill="#f9f9f9" stroke="${color}" stroke-width="2" />
    <path d="M70 100 C70 70, 130 70, 130 100 C130 130, 70 130, 70 100 Z" fill="url(#grad${index})" />
    <path d="M85 80 C85 60, 115 60, 115 80 C115 100, 85 100, 85 80 Z" fill="url(#grad${index})" opacity="0.8" />
    <path d="M85 120 C85 100, 115 100, 115 120 C115 140, 85 140, 85 120 Z" fill="url(#grad${index})" opacity="0.8" />
    <circle cx="100" cy="100" r="10" fill="white" opacity="0.5" />
    <text x="100" y="155" font-family="Arial" font-size="12" text-anchor="middle" fill="${color}">${theme}</text>
    <path d="M100 80 Q110 90 100 100 Q90 110 100 120" fill="none" stroke="${color}" stroke-width="2" />
</svg>`;
    return svg;
}

const themes = [
    "Cognition", "Insight", "Neural", "Growth", "Logic",
    "Empathy", "Creativity", "Analysis", "Potential", "Vision",
    "Flow", "Inspiration", "Knowledge", "Dream", "Mindfulness",
    "Seed", "Connection", "Passion", "Fluidity", "Perception",
    "Depth", "Aspiration", "Strength", "Clarity", "Unconscious",
    "Balance", "Resilience", "Healing", "Freedom", "Science"
];

const cards = [];

for (let i = 0; i < 30; i++) {
    const fileName = `logo_${(i + 1).toString().padStart(2, '0')}_${themes[i].toLowerCase()}.svg`;
    const filePath = path.join(outputDir, fileName);
    const id = `logo-${(i + 1).toString().padStart(2, '0')}`;
    fs.writeFileSync(filePath, generateSVG(i, themes[i]));
    
    cards.push(`
        <div class="card" id="card-${id}">
          <div class="card-id">ID: ${id}</div>
          <img src="/generated_logos/${fileName}" alt="${themes[i]} Logo" />
          <div class="card-label">${themes[i]}</div>
        </div>`);
}

const htmlContent = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Logo 設計展示 - 心理學延伸系列</title>
    <style>
      body { margin: 0; font-family: 'Segoe UI', system-ui, sans-serif; background: #f0f2f5; color: #1c1e21; }
      .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
      header { text-align: center; margin-bottom: 40px; }
      h1 { font-size: 2.5rem; color: #1a73e8; margin-bottom: 8px; }
      p.subtitle { color: #5f6368; font-size: 1.1rem; }
      
      section { margin-bottom: 60px; }
      h2 { border-left: 5px solid #1a73e8; padding-left: 15px; margin-bottom: 24px; font-size: 1.5rem; }

      .grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
      .card { background: #fff; border: none; border-radius: 12px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); transition: transform 0.2s; position: relative; }
      .card:hover { transform: translateY(-5px); box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
      .card img { width: 100%; height: auto; display: block; margin-bottom: 12px; }
      .card-id { font-size: 0.75rem; color: #9aa0a6; position: absolute; top: 10px; right: 10px; }
      .card-label { text-align: center; font-weight: 600; color: #3c4043; }
      .sample-label { background: #e8f0fe; color: #1967d2; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; display: inline-block; margin-top: 8px; }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>心理學系列 Logo 設計</h1>
        <p class="subtitle">由 Gemini CLI 生成，基於「大腦思考」與「心理學延伸」概念</p>
      </header>

      <section>
        <h2>樣本參考 (Original Samples)</h2>
        <div class="grid">
          <div class="card">
            <img src="/sample_logo1.jpg" alt="樣本 1" />
            <div class="card-label">樣本 1</div>
            <div style="text-align:center"><span class="sample-label">樣本原圖</span></div>
          </div>
          <div class="card">
            <img src="/sample_logo2.jpg" alt="樣本 2" />
            <div class="card-label">樣本 2</div>
            <div style="text-align:center"><span class="sample-label">樣本原圖</span></div>
          </div>
        </div>
      </section>

      <section>
        <h2>Gemini 生成設計 (30 款)</h2>
        <div class="grid">
          ${cards.join('')}
        </div>
      </section>
    </div>
  </body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent);
console.log('index.html has been updated with 30 logos.');
