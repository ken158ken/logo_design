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

const colors = ['#4A90E2', '#50E3C2', '#F5A623', '#9013FE', '#D0021B', '#7ED321'];

// 不同風格的 SVG 生成器
const generators = [
    // 1. 神經連結風格 (Neural Connection)
    (id, color, theme) => `
    <svg id="${id}" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="85" fill="none" stroke="${color}" stroke-width="1" stroke-dasharray="4 2"/>
        <circle cx="100" cy="80" r="5" fill="${color}"/>
        <circle cx="70" cy="110" r="5" fill="${color}"/>
        <circle cx="130" cy="110" r="5" fill="${color}"/>
        <circle cx="100" cy="140" r="5" fill="${color}"/>
        <path d="M100 80 L70 110 L100 140 L130 110 Z" fill="none" stroke="${color}" stroke-width="2"/>
        <path d="M100 80 L100 140 M70 110 L130 110" stroke="${color}" stroke-width="1" opacity="0.5"/>
        <text x="100" y="175" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold" fill="${color}">${theme}</text>
    </svg>`,
    
    // 2. 成長樹木風格 (Growth/Organic)
    (id, color, theme) => `
    <svg id="${id}" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 150 V100 M100 120 L80 100 M100 110 L120 90" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
        <path d="M100 90 C130 90 140 60 100 40 C60 60 70 90 100 90" fill="${color}" opacity="0.8"/>
        <circle cx="100" cy="100" r="60" fill="none" stroke="${color}" stroke-width="2" opacity="0.3"/>
        <text x="100" y="180" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold" fill="${color}">${theme}</text>
    </svg>`,

    // 3. 幾何邏輯風格 (Logic/Structure)
    (id, color, theme) => `
    <svg id="${id}" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="60" y="60" width="80" height="80" rx="10" fill="none" stroke="${color}" stroke-width="3"/>
        <path d="M60 100 H140 M100 60 V140" stroke="${color}" stroke-width="2" opacity="0.6"/>
        <circle cx="100" cy="100" r="15" fill="${color}"/>
        <path d="M40 40 L60 60 M160 40 L140 60 M40 160 L60 140 M160 160 L140 140" stroke="${color}" stroke-width="2"/>
        <text x="100" y="185" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold" fill="${color}">${theme}</text>
    </svg>`,

    // 4. 流動意識風格 (Flow/Consciousness)
    (id, color, theme) => `
    <svg id="${id}" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 100 Q75 50 100 100 T150 100" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
        <path d="M50 120 Q75 70 100 120 T150 120" fill="none" stroke="${color}" stroke-width="3" opacity="0.6" stroke-linecap="round"/>
        <path d="M50 80 Q75 30 100 80 T150 80" fill="none" stroke="${color}" stroke-width="3" opacity="0.6" stroke-linecap="round"/>
        <circle cx="100" cy="100" r="70" fill="none" stroke="${color}" stroke-width="1" stroke-dasharray="10 5"/>
        <text x="100" y="170" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold" fill="${color}">${theme}</text>
    </svg>`,

    // 5. 深度剖面風格 (Depth/Layers)
    (id, color, theme) => `
    <svg id="${id}" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="100" rx="40" ry="60" fill="none" stroke="${color}" stroke-width="2"/>
        <ellipse cx="100" cy="100" rx="25" ry="40" fill="none" stroke="${color}" stroke-width="2" opacity="0.7"/>
        <ellipse cx="100" cy="100" rx="10" ry="20" fill="${color}"/>
        <path d="M100 40 V20 M100 160 V180 M140 100 H160 M40 100 H60" stroke="${color}" stroke-width="2"/>
        <text x="100" y="190" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold" fill="${color}">${theme}</text>
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
<!-- Created by Gemini CLI - Diverse Brain Series -->
${generators[genIndex](id, color, theme)}`;

    fs.writeFileSync(path.join(outputDir, fileName), svgContent);
    
    cards.push(`
        <div class="card" id="card-${id}">
          <div class="card-id">ID: ${id} (Style ${genIndex + 1})</div>
          <img src="/generated_logos/${fileName}" alt="${theme} Logo" />
          <div class="card-label">${theme}</div>
        </div>`);
}

const htmlContent = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Logo 設計展示 - 心理學延伸系列 (全新設計版)</title>
    <style>
      body { margin: 0; font-family: 'Segoe UI', system-ui, sans-serif; background: #f0f2f5; color: #1c1e21; }
      .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
      header { text-align: center; margin-bottom: 40px; }
      h1 { font-size: 2.5rem; color: #1a73e8; margin-bottom: 8px; }
      p.subtitle { color: #5f6368; font-size: 1.1rem; }
      
      section { margin-bottom: 60px; }
      h2 { border-left: 5px solid #1a73e8; padding-left: 15px; margin-bottom: 24px; font-size: 1.5rem; }

      .grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
      .card { background: #fff; border: none; border-radius: 12px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); transition: transform 0.2s; position: relative; }
      .card:hover { transform: translateY(-5px); box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
      .card img { width: 100%; height: auto; display: block; margin-bottom: 12px; background: #fafafa; border-radius: 8px; }
      .card-id { font-size: 0.75rem; color: #9aa0a6; position: absolute; top: 10px; right: 10px; }
      .card-label { text-align: center; font-weight: 600; color: #3c4043; font-size: 1.1rem; }
      .sample-label { background: #e8f0fe; color: #1967d2; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; display: inline-block; margin-top: 8px; }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>心理學系列 Logo 設計 (全新多樣版)</h1>
        <p class="subtitle">根據大腦結構、神經網路、成長路徑等 5 種視覺風格重新設計</p>
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
        <h2>Gemini 重新設計 (30 款 - 5 種視覺風格)</h2>
        <div class="grid">
          ${cards.join('')}
        </div>
      </section>
    </div>
  </body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent);
console.log('index.html and logos have been completely redesigned.');
