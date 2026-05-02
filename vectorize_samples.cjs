const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'vector_samples');

// 樣本 1 的向量化嘗試 (精確的大腦輪廓)
const sample1_svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <!-- Vectorized Version of Sample 1 -->
    <path d="M100,55 C70,55 50,75 50,105 C50,135 70,155 100,155 C130,155 150,135 150,105 C150,75 130,55 100,55 Z" fill="none" stroke="#2C3E50" stroke-width="4"/>
    <path d="M100,55 Q115,80 100,105 Q85,130 100,155" fill="none" stroke="#2C3E50" stroke-width="2" opacity="0.6"/>
    <path d="M70,85 C75,80 85,80 90,85 M110,85 C115,80 125,80 130,85" fill="none" stroke="#2C3E50" stroke-width="3" stroke-linecap="round"/>
    <path d="M70,125 C75,130 85,130 90,125 M110,125 C115,130 125,130 130,125" fill="none" stroke="#2C3E50" stroke-width="3" stroke-linecap="round"/>
    <text x="100" y="185" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold" fill="#2C3E50">VECTORIZED SAMPLE 1</text>
</svg>`;

// 樣本 2 的向量化嘗試 (結合思考線條)
const sample2_svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <!-- Vectorized Version of Sample 2 -->
    <path d="M60,100 A40,40 0 1,1 140,100 A40,40 0 1,1 60,100" fill="none" stroke="#0366D6" stroke-width="5"/>
    <path d="M100,60 V140 M60,100 H140" stroke="#0366D6" stroke-width="2" opacity="0.3"/>
    <path d="M75,75 L125,125 M125,75 L75,125" stroke="#0366D6" stroke-width="2" opacity="0.3"/>
    <circle cx="100" cy="100" r="10" fill="#0366D6"/>
    <text x="100" y="185" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold" fill="#0366D6">VECTORIZED SAMPLE 2</text>
</svg>`;

fs.writeFileSync(path.join(outputDir, 'sample1.svg'), sample1_svg);
fs.writeFileSync(path.join(outputDir, 'sample2.svg'), sample2_svg);

console.log('Vector samples created.');
