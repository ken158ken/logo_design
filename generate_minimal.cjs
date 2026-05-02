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

// 核心：簡潔的大腦輪廓路徑
const brainPathLeft = "M100,60 C80,60 65,75 65,100 C65,125 80,140 100,140";
const brainPathRight = "M100,60 C120,60 135,75 135,100 C135,125 120,140 100,140";

const generators = [
    // 1. 簡約剖面腦 (Minimalist Split Brain)
    (color) => `
    <g fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round">
        <path d="${brainPathLeft}"/>
        <path d="${brainPathRight}"/>
        <path d="M100,70 V130" opacity="0.4"/>
    </g>`,
    
    // 2. 靈感大腦 (Idea Spark Brain)
    (color) => `
    <g fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round">
        <path d="${brainPathLeft}"/>
        <path d="${brainPathRight}"/>
        <circle cx="100" cy="100" r="3" fill="${color}" stroke="none"/>
        <path d="M100,90 L100,80 M115,100 L125,100 M100,110 L100,120 M85,100 L75,100" opacity="0.8"/>
    </g>`,

    // 3. 邏輯大腦 (Logic/Node Brain)
    (color) => `
    <g fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round">
        <path d="${brainPathLeft}"/>
        <path d="${brainPathRight}"/>
        <circle cx="85" cy="90" r="2" fill="${color}" stroke="none"/>
        <circle cx="115" cy="110" r="2" fill="${color}" stroke="none"/>
        <path d="M85,90 L115,110" stroke-width="1" opacity="0.5"/>
    </g>`,

    // 4. 流動大腦 (Flowing Thought)
    (color) => `
    <g fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round">
        <path d="${brainPathLeft}"/>
        <path d="${brainPathRight}"/>
        <path d="M80,100 Q100,80 120,100" opacity="0.6"/>
        <path d="M85,115 Q100,95 115,115" opacity="0.4"/>
    </g>`,

    // 5. 核心意識 (Core Awareness)
    (color) => `
    <g fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round">
        <path d="${brainPathLeft}"/>
        <path d="${brainPathRight}"/>
        <ellipse cx="100" cy="100" rx="15" ry="20" opacity="0.3"/>
        <circle cx="100" cy="100" r="5" fill="${color}" stroke="none"/>
    </g>`,

    // 6. 成長神經 (Growth Neuron)
    (color) => `
    <g fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round">
        <path d="${brainPathLeft}"/>
        <path d="${brainPathRight}"/>
        <path d="M100,140 L100,155 M100,140 L110,150" stroke-width="2" opacity="0.7"/>
    </g>`
];

const cards = [];

for (let i = 0; i < 30; i++) {
    const theme = themes[i];
    const color = (i % 2 === 0) ? '#2C3E50' : '#3498DB'; // 使用沉穩專業的顏色
    const genIndex = i % generators.length;
    const id = `logo-${(i + 1).toString().padStart(2, '0')}`;
    const fileName = `logo_${(i + 1).toString().padStart(2, '0')}_${theme.toLowerCase()}.svg`;
    
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg id="${id}" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <!-- Created by Gemini CLI - Clean Brain Series -->
    ${generators[genIndex](color)}
    <text x="100" y="175" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" font-weight="600" fill="${color}" opacity="0.8">${theme}</text>
</svg>`;

    fs.writeFileSync(path.join(outputDir, fileName), svgContent);
    
    cards.push(`
        <div class="card" id="card-${id}">
          <div class="card-id">ID: ${id}</div>
          <div class="svg-container" style="background: white; border-radius: 50%; width: 150px; height: 150px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; border: 1px solid #f0f0f0;">
            ${svgContent.replace('<?xml version="1.0" encoding="UTF-8"?>', '').replace('width="200" height="200"', 'width="120" height="120"')}
          </div>
          <div class="card-label">${theme}</div>
        </div>`);
}

const htmlContent = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Logo 設計展示 - 簡約大腦系列</title>
    <style>
      body { margin: 0; font-family: 'Segoe UI', system-ui, sans-serif; background: #ffffff; color: #333; }
      .container { max-width: 1100px; margin: 0 auto; padding: 40px 20px; }
      header { text-align: center; margin-bottom: 50px; border-bottom: 1px solid #eee; padding-bottom: 30px; }
      h1 { font-size: 2.2rem; color: #2C3E50; margin-bottom: 10px; }
      p.subtitle { color: #7f8c8d; font-size: 1.1rem; }
      
      section { margin-bottom: 60px; }
      h2 { color: #2C3E50; font-size: 1.4rem; margin-bottom: 25px; display: flex; align-items: center; }
      h2::before { content: ""; display: inline-block; width: 4px; height: 20px; background: #3498DB; margin-right: 12px; border-radius: 2px; }

      .grid { display: grid; gap: 25px; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
      .card { background: #fff; border: 1px solid #f0f0f0; border-radius: 12px; padding: 25px 15px; transition: all 0.2s; text-align: center; }
      .card:hover { border-color: #3498DB; box-shadow: 0 10px 20px rgba(0,0,0,0.05); transform: translateY(-3px); }
      .card-id { font-size: 0.7rem; color: #bdc3c7; margin-bottom: 10px; display: block; }
      .card-label { font-weight: 600; color: #2C3E50; font-size: 1rem; }
      
      .sample-grid { display: flex; gap: 20px; justify-content: center; }
      .sample-card { width: 250px; }
      .sample-card img { width: 100%; border-radius: 8px; border: 1px solid #eee; }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>大腦思考系列 Logo</h1>
        <p class="subtitle">極簡線條設計 | 專注於大腦生理輪廓與思考意象</p>
      </header>

      <section>
        <h2>原始樣本參考</h2>
        <div class="sample-grid">
          <div class="card sample-card">
            <img src="/sample_logo1.jpg" alt="樣本 1" />
            <div class="card-label" style="margin-top:10px;">樣本 1</div>
          </div>
          <div class="card sample-card">
            <img src="/sample_logo2.jpg" alt="樣本 2" />
            <div class="card-label" style="margin-top:10px;">樣本 2</div>
          </div>
        </div>
      </section>

      <section>
        <h2>全新簡約設計 (30 款)</h2>
        <div class="grid">
          ${cards.join('')}
        </div>
      </section>
    </div>
  </body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent);
console.log('New minimalist brain logos generated and index.html updated.');
