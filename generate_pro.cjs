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

// 高品質設計模版
const templates = [
    // 1. 有機曲線腦 (Organic Cerebral) - 展現真實腦褶皺感
    (color) => `
    <path d="M100,60 C85,60 70,70 65,90 C60,110 70,130 85,135 C90,138 95,140 100,140 C105,140 110,138 115,135 C130,130 140,110 135,90 C130,70 115,60 100,60 Z" fill="none" stroke="${color}" stroke-width="4"/>
    <path d="M100,70 Q110,85 100,100 Q90,115 100,130" fill="none" stroke="${color}" stroke-width="2" opacity="0.6"/>
    <path d="M75,90 Q85,95 85,110 M125,90 Q115,95 115,110" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/>`,
    
    // 2. 思考燈泡腦 (Insight Bulb) - 大腦形狀的燈泡
    (color) => `
    <path d="M100,45 C75,45 60,65 60,90 C60,110 75,125 85,135 V150 H115 V135 C125,125 140,110 140,90 C140,65 125,45 100,45 Z" fill="none" stroke="${color}" stroke-width="4"/>
    <path d="M85,158 H115 M90,165 H110" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    <path d="M100,70 V110" stroke="${color}" stroke-width="2" stroke-dasharray="4 4"/>`,

    // 3. 神經對稱腦 (Neural Symmetry) - 體現左右腦平衡
    (color) => `
    <path d="M100,60 C70,60 55,80 55,105 C55,130 75,145 100,145" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
    <path d="M100,60 C130,60 145,80 145,105 C145,130 125,145 100,145" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" opacity="0.5"/>
    <circle cx="100" cy="105" r="10" fill="${color}"/>
    <path d="M75,85 L125,125 M75,125 L125,85" stroke="${color}" stroke-width="1" opacity="0.3"/>`,

    // 4. 成長樹腦 (Tree of Mind) - 大腦輪廓內長出樹木
    (color) => `
    <path d="M100,50 C75,50 60,70 60,100 C60,130 75,150 100,150 C125,150 140,130 140,100 C140,70 125,50 100,50 Z" fill="none" stroke="${color}" stroke-width="3"/>
    <path d="M100,150 V110 M100,125 L85,110 M100,120 L115,105" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="100" cy="80" r="15" fill="${color}" opacity="0.4"/>`,

    // 5. 抽象意識流 (Flow of Thought) - 用動態線條組成大腦
    (color) => `
    <path d="M60,100 Q70,50 100,50 Q130,50 140,100" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
    <path d="M60,110 Q70,160 100,160 Q130,160 140,110" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
    <path d="M80,105 H120" stroke="${color}" stroke-width="2" stroke-dasharray="8 4"/>`,

    // 6. 幾何心智 (Geometric Logic) - 現代感幾何風格
    (color) => `
    <path d="M100,50 L140,80 L140,120 L100,150 L60,120 L60,80 Z" fill="none" stroke="${color}" stroke-width="4"/>
    <path d="M100,50 V150 M60,80 L140,120 M140,80 L60,120" stroke="${color}" stroke-width="1" opacity="0.5"/>
    <circle cx="100" cy="100" r="15" fill="none" stroke="${color}" stroke-width="2"/>`,

    // 7. 拼圖大腦 (Puzzle Mind) - 體現心理分析
    (color) => `
    <path d="M100,60 C75,60 60,80 60,105 C60,130 75,145 100,145 C125,145 140,130 140,105 C140,80 125,60 100,60 Z" fill="none" stroke="${color}" stroke-width="4"/>
    <path d="M100,60 V105 H140" stroke="${color}" stroke-width="2"/>
    <circle cx="100" cy="105" r="8" fill="white" stroke="${color}" stroke-width="2"/>`,

    // 8. 心理學符號腦 (Psi Mind) - 整合希臘字母 Psi
    (color) => `
    <path d="M70,70 V120 C70,140 130,140 130,120 V70 M100,60 V150" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
    <path d="M55,95 C55,60 75,50 100,50 C125,50 145,60 145,95" fill="none" stroke="${color}" stroke-width="2" opacity="0.4"/>
    <circle cx="100" cy="100" r="60" fill="none" stroke="${color}" stroke-width="1" stroke-dasharray="10 5"/>`,

    // 9. 迴圈思考 (Infinite Loop) - 無限大腦
    (color) => `
    <path d="M100,100 C100,70 70,70 60,100 C50,130 80,130 100,100 C120,70 150,70 140,100 C130,130 100,130 100,100" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
    <path d="M80,60 Q100,40 120,60" stroke="${color}" stroke-width="2" opacity="0.3"/>
    <path d="M80,140 Q100,160 120,140" stroke="${color}" stroke-width="2" opacity="0.3"/>`,

    // 10. 極致核心 (Core Focus) - 聚焦於大腦中心
    (color) => `
    <circle cx="100" cy="100" r="45" fill="none" stroke="${color}" stroke-width="1"/>
    <circle cx="100" cy="100" r="30" fill="none" stroke="${color}" stroke-width="2" opacity="0.5"/>
    <circle cx="100" cy="100" r="10" fill="${color}"/>
    <path d="M100,30 V55 M100,145 V170 M30,100 H55 M145,100 H170" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`
];

const cards = [];

for (let i = 0; i < 30; i++) {
    const theme = themes[i];
    const color = (i % 2 === 0) ? '#24292E' : '#0366D6'; // GitHub 風格配色
    const genIndex = i % templates.length;
    const id = `logo-${(i + 1).toString().padStart(2, '0')}`;
    const fileName = `logo_${(i + 1).toString().padStart(2, '0')}_${theme.toLowerCase()}.svg`;
    
    const svgBody = templates[genIndex](color);
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="${id}" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <!-- Created by Gemini CLI - Professional Series -->
    <rect width="200" height="200" fill="white"/>
    ${svgBody}
    <text x="100" y="185" font-family="Helvetica, Arial, sans-serif" font-size="14" text-anchor="middle" font-weight="bold" fill="${color}">${theme.toUpperCase()}</text>
</svg>`;

    fs.writeFileSync(path.join(outputDir, fileName), svgContent);
    
    cards.push(`
        <div class="card" id="card-${id}">
          <div class="card-id">ID: ${id}</div>
          <div class="svg-container">
            ${svgContent.replace('<?xml version="1.0" encoding="UTF-8"?>', '').replace('width="200" height="200"', 'width="100%" height="100%"')}
          </div>
          <div class="card-label">${theme}</div>
        </div>`);
}

const htmlContent = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>專業心理學 Logo 展示</title>
    <style>
      body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #f6f8fa; color: #24292e; }
      .container { max-width: 1200px; margin: 0 auto; padding: 50px 20px; }
      header { text-align: center; margin-bottom: 60px; }
      h1 { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 10px; }
      p.subtitle { color: #586069; font-size: 1.2rem; }
      
      section { margin-bottom: 80px; }
      h2 { font-size: 1.5rem; font-weight: 600; margin-bottom: 30px; border-bottom: 1px solid #e1e4e8; padding-bottom: 10px; }

      .grid { display: grid; gap: 30px; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
      .card { background: #fff; border: 1px solid #e1e4e8; border-radius: 12px; padding: 25px; transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
      .card:hover { transform: translateY(-5px); box-shadow: 0 8px 24px rgba(149,157,165,0.2); border-color: #0366d6; }
      .svg-container { aspect-ratio: 1; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; }
      .card-id { font-size: 0.75rem; color: #6a737d; margin-bottom: 8px; font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace; }
      .card-label { text-align: center; font-weight: 600; font-size: 1.1rem; color: #24292e; }
      
      .sample-grid { display: flex; gap: 30px; justify-content: center; }
      .sample-card { width: 300px; }
      .sample-card img { width: 100%; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>心理學系列 Logo 展示</h1>
        <p class="subtitle">10 種專業視覺模版 | 30 款延伸設計</p>
      </header>

      <section>
        <h2>原始樣本參考 (Original Samples)</h2>
        <div class="sample-grid">
          <div class="card sample-card">
            <img src="/sample_logo1.jpg" alt="樣本 1" />
            <div class="card-label" style="margin-top:15px;">樣本 1 (參考風格)</div>
          </div>
          <div class="card sample-card">
            <img src="/sample_logo2.jpg" alt="樣本 2" />
            <div class="card-label" style="margin-top:15px;">樣本 2 (參考風格)</div>
          </div>
        </div>
      </section>

      <section>
        <h2>Gemini 專業設計版</h2>
        <div class="grid">
          ${cards.join('')}
        </div>
      </section>
    </div>
  </body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent);
console.log('Professional brain logos generated and index.html updated.');
