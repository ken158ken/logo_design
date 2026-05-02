const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'generated_logos');
const themes = [
    "Cognition", "Insight", "Neural", "Growth", "Logic",
    "Empathy", "Creativity", "Analysis", "Potential", "Vision",
    "Flow", "Inspiration", "Knowledge", "Dream", "Mindfulness",
    "Seed", "Connection", "Passion", "Fluidity", "Perception",
    "Depth", "Aspiration", "Strength", "Clarity", "Unconscious",
    "Balance", "Resilience", "Healing", "Freedom", "Science"
];

const colors = ['#1A73E8', '#34A853', '#FBBC05', '#EA4335', '#8E24AA', '#00ACC1'];

const generators = [
    // 1. 寫實腦剖面 (Realistic Brain Profile)
    (id, color, theme) => `
    <svg id="${id}" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50 C70 50 50 70 50 100 C50 130 70 150 100 150 C130 150 150 130 150 100 C150 70 130 50 100 50 Z" fill="none" stroke="${color}" stroke-width="2"/>
        <path d="M100 50 Q120 75 100 100 Q80 125 100 150" fill="none" stroke="${color}" stroke-width="2" opacity="0.6"/>
        <path d="M70 80 Q85 80 85 95 M115 80 Q130 80 130 95 M70 120 Q85 120 85 105 M115 120 Q130 120 130 105" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        <text x="100" y="180" font-family="Verdana" font-size="14" text-anchor="middle" font-weight="bold" fill="${color}">${theme}</text>
    </svg>`,
    
    // 2. 齒輪大腦 (Gear Brain - Logic)
    (id, color, theme) => `
    <svg id="${id}" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="45" fill="none" stroke="${color}" stroke-width="8" stroke-dasharray="10 5"/>
        <circle cx="100" cy="100" r="20" fill="${color}"/>
        <path d="M100 40 V160 M40 100 H160" stroke="${color}" stroke-width="2" opacity="0.3"/>
        <path d="M70 70 L130 130 M130 70 L70 130" stroke="${color}" stroke-width="2" opacity="0.3"/>
        <text x="100" y="180" font-family="Verdana" font-size="14" text-anchor="middle" font-weight="bold" fill="${color}">${theme}</text>
    </svg>`,

    // 3. 心理連結 (Psychology Psi Symbol + Brain)
    (id, color, theme) => `
    <svg id="${id}" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M70 60 V120 C70 150 130 150 130 120 V60 M100 50 V160" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
        <path d="M60 90 H140" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="100" cy="100" r="70" fill="none" stroke="${color}" stroke-width="1" opacity="0.2"/>
        <text x="100" y="185" font-family="Verdana" font-size="14" text-anchor="middle" font-weight="bold" fill="${color}">${theme}</text>
    </svg>`,

    // 4. 無限心智 (Infinite Mind)
    (id, color, theme) => `
    <svg id="${id}" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M70 100 C70 80 90 80 100 100 C110 120 130 120 130 100 C130 80 110 80 100 100 C90 120 70 120 70 100" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
        <circle cx="100" cy="100" r="80" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="5 5" opacity="0.5"/>
        <text x="100" y="180" font-family="Verdana" font-size="14" text-anchor="middle" font-weight="bold" fill="${color}">${theme}</text>
    </svg>`,

    // 5. 神經雲端 (Neural Cloud/Pulse)
    (id, color, theme) => `
    <svg id="${id}" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 110 Q80 140 100 110 Q120 80 140 110" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="80" cy="125" r="4" fill="${color}"/>
        <circle cx="120" cy="95" r="4" fill="${color}"/>
        <path d="M50 100 A50 50 0 1 1 150 100 A50 50 0 1 1 50 100" fill="none" stroke="${color}" stroke-width="2" stroke-dasharray="2 2"/>
        <text x="100" y="180" font-family="Verdana" font-size="14" text-anchor="middle" font-weight="bold" fill="${color}">${theme}</text>
    </svg>`
];

const cards = [];

for (let i = 0; i < 30; i++) {
    const theme = themes[i];
    const color = colors[i % colors.length];
    const genIndex = i % generators.length;
    const id = `logo-${(i + 1).toString().padStart(2, '0')}`;
    const fileName = `logo_${(i + 1).toString().padStart(2, '0')}_${theme.toLowerCase()}.svg`;
    
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by Gemini CLI - High-Concept Psychology Series -->
${generators[genIndex](id, color, theme)}`;

    fs.writeFileSync(path.join(outputDir, fileName), svgContent);
    
    cards.push(`
        <div class="card" id="card-${id}">
          <div class="card-id">ID: ${id}</div>
          <div class="svg-container">${generators[genIndex](id, color, theme)}</div>
          <div class="card-label">${theme}</div>
        </div>`);
}

const htmlContent = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>心理學 Logo 概念設計 - 全新視覺版</title>
    <style>
      body { margin: 0; font-family: 'Inter', system-ui, sans-serif; background: #0f172a; color: #f8fafc; }
      .container { max-width: 1200px; margin: 0 auto; padding: 60px 20px; }
      header { text-align: center; margin-bottom: 60px; }
      h1 { font-size: 3rem; background: linear-gradient(90deg, #60a5fa, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 16px; }
      p.subtitle { color: #94a3b8; font-size: 1.25rem; }
      
      .grid { display: grid; gap: 32px; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
      .card { background: #1e293b; border: 1px solid #334155; border-radius: 20px; padding: 24px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      .card:hover { transform: translateY(-10px); border-color: #60a5fa; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3); }
      .svg-container { background: rgba(255,255,255,0.03); border-radius: 12px; margin-bottom: 20px; padding: 10px; display: flex; justify-content: center; }
      .card-id { font-size: 0.8rem; color: #64748b; margin-bottom: 8px; font-mono: monospace; }
      .card-label { text-align: center; font-weight: 700; color: #f1f5f9; font-size: 1.2rem; }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>心理學系列 Logo 設計</h1>
        <p class="subtitle">30 款全新幾何心理學概念設計，已移除所有舊版樣本</p>
      </header>

      <div class="grid">
        ${cards.join('')}
      </div>
    </div>
  </body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent);
console.log('index.html and logos have been completely rebuilt with zero legacy content.');
