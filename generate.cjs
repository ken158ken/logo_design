// Brand Logo Designer - 30 hand-crafted brain / thought-expansion logos
// Theme: psychology + brain + thought expansion + multi-line composition
// Each design uses a single distinct brand color.

const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'public', 'generated_logos');
fs.mkdirSync(OUT_DIR, { recursive: true });

// Helpers
const radial = (n, r, cx = 100, cy = 100, startDeg = -90) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((startDeg + (360 / n) * i) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });

const fmt = (n) => Math.round(n * 100) / 100;

// ============================================================
// 30 Designs
// ============================================================

const D = [];

// 01 — Synapse  突觸放射 中心神經元 + 12 放射軸突
{
  const c = '#FF3D6E';
  const inner = radial(12, 18);
  const outer = radial(12, 72);
  let lines = '';
  for (let i = 0; i < 12; i++) {
    const a = inner[i], b = outer[i];
    const opacity = i % 2 === 0 ? 1 : 0.55;
    lines += `<line x1="${fmt(a.x)}" y1="${fmt(a.y)}" x2="${fmt(b.x)}" y2="${fmt(b.y)}" opacity="${opacity}"/>`;
    lines += `<circle cx="${fmt(b.x)}" cy="${fmt(b.y)}" r="${i % 2 === 0 ? 3 : 2}" fill="${c}" opacity="${opacity}"/>`;
  }
  D.push({
    id: '01', name: 'Synapse', label: 'SYNAPSE', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2" stroke-linecap="round">
${lines}
<circle cx="100" cy="100" r="9" fill="${c}"/>
<circle cx="100" cy="100" r="15" stroke-width="1.2" stroke-dasharray="1.5 3" opacity="0.5"/>
</g>`
  });
}

// 02 — Cortex Wave  大腦皮質摺紋 五層波
{
  const c = '#4F46E5';
  let waves = '';
  for (let i = 0; i < 5; i++) {
    const y = 60 + i * 20;
    const amp = 8 + i * 0.8;
    const op = 1 - i * 0.13;
    let d = `M40 ${y}`;
    for (let x = 40; x <= 160; x += 20) {
      const sign = ((x - 40) / 20) % 2 === 0 ? -1 : 1;
      d += ` Q${x + 10} ${y + sign * amp} ${x + 20} ${y}`;
    }
    waves += `<path d="${d}" opacity="${op.toFixed(2)}"/>`;
  }
  D.push({
    id: '02', name: 'CortexWave', label: 'CORTEX', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="3" stroke-linecap="round">
${waves}
</g>`
  });
}

// 03 — Echo Mind  半邊大腦輪廓 + 四圈擴散漣漪
{
  const c = '#06B6D4';
  D.push({
    id: '03', name: 'Echo', label: 'ECHO', color: c,
    body: `<g stroke="${c}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M100 50 C70 50 55 75 60 100 C50 108 55 130 75 135 C80 150 100 150 100 150" stroke-width="4"/>
<path d="M82 70 Q92 80 82 92 Q70 102 82 116" stroke-width="2" opacity="0.65"/>
<path d="M70 95 Q80 98 78 110" stroke-width="1.6" opacity="0.45"/>
<g stroke-width="2" opacity="0.85">
<path d="M120 65 Q138 100 120 135"/>
<path d="M138 55 Q165 100 138 145" opacity="0.55"/>
<path d="M156 45 Q188 100 156 155" opacity="0.3"/>
</g>
<circle cx="100" cy="100" r="3" fill="${c}"/>
</g>`
  });
}

// 04 — Constellation  星座連線 構成腦半輪廓
{
  const c = '#F59E0B';
  // Hand-picked nodes resembling a brain hemisphere outline
  const nodes = [
    [60, 90], [70, 65], [95, 55], [125, 58], [148, 80],
    [150, 110], [135, 138], [105, 145], [80, 130],
    [90, 95], [115, 88], [108, 115]
  ];
  // Edge list (constellation)
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0],
    [9, 1], [9, 2], [9, 8], [9, 11], [10, 2], [10, 3], [10, 4], [10, 11], [11, 6], [11, 7]
  ];
  let lines = '';
  for (const [a, b] of edges) {
    lines += `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" opacity="0.45"/>`;
  }
  let dots = '';
  for (let i = 0; i < nodes.length; i++) {
    const [x, y] = nodes[i];
    dots += `<circle cx="${x}" cy="${y}" r="3.5" fill="${c}"/>`;
    dots += `<circle cx="${x}" cy="${y}" r="6" stroke-width="1" opacity="0.3"/>`;
  }
  D.push({
    id: '04', name: 'Constellation', label: 'CONSTELLATION', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="1.4" stroke-linecap="round">
${lines}
${dots}
</g>`
  });
}

// 05 — Radiance  腦核心放射光線
{
  const c = '#10B981';
  let rays = '';
  const n = 24;
  for (let i = 0; i < n; i++) {
    const a = ((i * 360 / n) * Math.PI) / 180;
    const r1 = 28 + (i % 2 ? 0 : 4);
    const r2 = i % 2 ? 70 : 78;
    const x1 = 100 + r1 * Math.cos(a);
    const y1 = 100 + r1 * Math.sin(a);
    const x2 = 100 + r2 * Math.cos(a);
    const y2 = 100 + r2 * Math.sin(a);
    rays += `<line x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}" opacity="${i % 2 ? 0.5 : 1}"/>`;
  }
  D.push({
    id: '05', name: 'Radiance', label: 'RADIANCE', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2" stroke-linecap="round">
${rays}
<circle cx="100" cy="100" r="22" fill="${c}"/>
<path d="M88 92 Q100 84 112 92 M88 100 Q100 92 112 100 M88 108 Q100 100 112 108" stroke="white" stroke-width="1.2"/>
</g>`
  });
}

// 06 — Mobius  無限環 雙線並行
{
  const c = '#8B5CF6';
  D.push({
    id: '06', name: 'Mobius', label: 'MOBIUS', color: c,
    body: `<g stroke="${c}" fill="none" stroke-linecap="round">
<path d="M55 100 C55 70 95 70 100 100 C105 130 145 130 145 100 C145 70 105 70 100 100 C95 130 55 130 55 100 Z" stroke-width="3.5"/>
<path d="M65 100 C65 78 92 78 100 100 C108 122 135 122 135 100 C135 78 108 78 100 100 C92 122 65 122 65 100 Z" stroke-width="1.5" opacity="0.55"/>
<path d="M75 100 C75 86 90 86 100 100 C110 114 125 114 125 100" stroke-width="1" opacity="0.35"/>
<circle cx="55" cy="100" r="2.5" fill="${c}"/>
<circle cx="145" cy="100" r="2.5" fill="${c}"/>
</g>`
  });
}

// 07 — Lattice  網格交織
{
  const c = '#EC4899';
  let mesh = '';
  // Diagonal mesh inside a circular mask
  for (let i = -8; i <= 8; i++) {
    const off = i * 12;
    mesh += `<line x1="${30 + off}" y1="30" x2="${170 + off}" y2="170" opacity="0.5"/>`;
    mesh += `<line x1="${170 - off}" y1="30" x2="${30 - off}" y2="170" opacity="0.5"/>`;
  }
  D.push({
    id: '07', name: 'Lattice', label: 'LATTICE', color: c,
    body: `<defs><clipPath id="cl07"><circle cx="100" cy="100" r="65"/></clipPath></defs>
<g stroke="${c}" stroke-width="1" clip-path="url(#cl07)">
${mesh}
</g>
<circle cx="100" cy="100" r="65" fill="none" stroke="${c}" stroke-width="3"/>
<circle cx="100" cy="100" r="6" fill="${c}"/>`
  });
}

// 08 — Brainwave  EEG 6 平行波
{
  const c = '#14B8A6';
  const ys = [55, 75, 95, 115, 135, 155];
  let waves = '';
  ys.forEach((y, i) => {
    const op = i === 2 || i === 3 ? 1 : 0.55 - Math.abs(i - 2.5) * 0.08;
    let d = `M30 ${y}`;
    const segs = 8;
    for (let s = 0; s < segs; s++) {
      const x = 30 + (140 / segs) * s;
      const xn = x + 140 / segs;
      const mx = (x + xn) / 2;
      // EEG-like irregular peaks
      const peak = (Math.sin((s + i) * 1.7) * (i + 1) * 1.5) + (s % 2 ? -6 : 8);
      d += ` Q${fmt(mx)} ${fmt(y - peak)} ${fmt(xn)} ${y}`;
    }
    waves += `<path d="${d}" opacity="${Math.max(0.3, op).toFixed(2)}"/>`;
  });
  D.push({
    id: '08', name: 'Brainwave', label: 'BRAINWAVE', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2.2" stroke-linecap="round">
${waves}
</g>`
  });
}

// 09 — Neural Bloom  腦螺旋 + 8 花瓣放射
{
  const c = '#F97316';
  let petals = '';
  for (let i = 0; i < 8; i++) {
    const a = (i * 45 - 90) * Math.PI / 180;
    const x1 = 100 + 32 * Math.cos(a);
    const y1 = 100 + 32 * Math.sin(a);
    const x2 = 100 + 80 * Math.cos(a);
    const y2 = 100 + 80 * Math.sin(a);
    const cax = 100 + 56 * Math.cos(a + 0.25);
    const cay = 100 + 56 * Math.sin(a + 0.25);
    const cbx = 100 + 56 * Math.cos(a - 0.25);
    const cby = 100 + 56 * Math.sin(a - 0.25);
    petals += `<path d="M${fmt(x1)} ${fmt(y1)} Q${fmt(cax)} ${fmt(cay)} ${fmt(x2)} ${fmt(y2)} Q${fmt(cbx)} ${fmt(cby)} ${fmt(x1)} ${fmt(y1)} Z" opacity="${i % 2 ? 0.55 : 1}"/>`;
  }
  D.push({
    id: '09', name: 'NeuralBloom', label: 'BLOOM', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
${petals}
<path d="M100 75 Q115 80 110 95 Q90 100 90 110 Q105 122 118 110" stroke-width="2.4"/>
<circle cx="100" cy="100" r="4" fill="${c}"/>
</g>`
  });
}

// 10 — Stratum  五層思維堆疊
{
  const c = '#84CC16';
  let arcs = '';
  for (let i = 0; i < 5; i++) {
    const r = 30 + i * 12;
    const op = 1 - i * 0.15;
    arcs += `<path d="M${100 - r} 120 A${r} ${r} 0 0 1 ${100 + r} 120" opacity="${op.toFixed(2)}"/>`;
  }
  D.push({
    id: '10', name: 'Stratum', label: 'STRATUM', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="3" stroke-linecap="round">
${arcs}
<line x1="40" y1="120" x2="160" y2="120" stroke-width="1.5" opacity="0.5"/>
<circle cx="100" cy="120" r="3" fill="${c}"/>
<line x1="100" y1="50" x2="100" y2="38" stroke-width="2"/>
<circle cx="100" cy="34" r="2.5" fill="${c}"/>
</g>`
  });
}

// 11 — Spiral  螺旋洞察 + 放射點線
{
  const c = '#0EA5E9';
  // Approximate spiral with cubic curves
  let spiral = `M100 100`;
  let r = 4, a = 0;
  let prev = { x: 100, y: 100 };
  for (let i = 0; i < 36; i++) {
    a += 0.45;
    r += 1.6;
    const x = 100 + r * Math.cos(a);
    const y = 100 + r * Math.sin(a);
    spiral += ` L${fmt(x)} ${fmt(y)}`;
    prev = { x, y };
  }
  // 8 radial dotted extensions
  let radials = '';
  for (let i = 0; i < 8; i++) {
    const ang = (i * 45) * Math.PI / 180;
    const x1 = 100 + 70 * Math.cos(ang);
    const y1 = 100 + 70 * Math.sin(ang);
    const x2 = 100 + 88 * Math.cos(ang);
    const y2 = 100 + 88 * Math.sin(ang);
    radials += `<line x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}" stroke-dasharray="2 3" opacity="0.6"/>`;
  }
  D.push({
    id: '11', name: 'Spiral', label: 'SPIRAL', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2" stroke-linecap="round">
<path d="${spiral}"/>
${radials}
</g>`
  });
}

// 12 — Crosswire  交叉雙腦摺
{
  const c = '#A855F7';
  D.push({
    id: '12', name: 'Crosswire', label: 'CROSSWIRE', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="3" stroke-linecap="round">
<path d="M50 60 Q100 100 150 140"/>
<path d="M150 60 Q100 100 50 140"/>
<path d="M55 80 Q100 100 145 80" opacity="0.55"/>
<path d="M55 120 Q100 100 145 120" opacity="0.55"/>
<path d="M75 50 Q100 80 125 50" opacity="0.4" stroke-width="1.8"/>
<path d="M75 150 Q100 120 125 150" opacity="0.4" stroke-width="1.8"/>
<circle cx="100" cy="100" r="6" fill="${c}"/>
<circle cx="100" cy="100" r="11" stroke-width="1" stroke-dasharray="2 2" opacity="0.5"/>
</g>`
  });
}

// 13 — Aurora  四條極光流線
{
  const c = '#3B82F6';
  let aurora = '';
  for (let i = 0; i < 4; i++) {
    const off = i * 14;
    const op = 1 - i * 0.18;
    aurora += `<path d="M30 ${130 - off} C70 ${60 - off} 130 ${160 - off} 170 ${90 - off}" opacity="${op.toFixed(2)}"/>`;
  }
  D.push({
    id: '13', name: 'Aurora', label: 'AURORA', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="3" stroke-linecap="round">
${aurora}
<circle cx="30" cy="130" r="3" fill="${c}"/>
<circle cx="170" cy="62" r="3" fill="${c}"/>
</g>`
  });
}

// 14 — Illumina  燈泡腦摺 + 8 放射光線
{
  const c = '#EAB308';
  let rays = '';
  for (let i = 0; i < 8; i++) {
    if (i === 0 || i === 4) continue;
    const a = (i * 45 - 90) * Math.PI / 180;
    const r1 = 70, r2 = 86;
    const x1 = 100 + r1 * Math.cos(a);
    const y1 = 100 + r1 * Math.sin(a);
    const x2 = 100 + r2 * Math.cos(a);
    const y2 = 100 + r2 * Math.sin(a);
    rays += `<line x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}"/>`;
  }
  D.push({
    id: '14', name: 'Illumina', label: 'ILLUMINA', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
${rays}
<path d="M70 100 C70 65 130 65 130 100 C130 118 118 130 115 145 L85 145 C82 130 70 118 70 100 Z" stroke-width="3.5"/>
<line x1="86" y1="155" x2="114" y2="155" stroke-width="3"/>
<line x1="92" y1="165" x2="108" y2="165" stroke-width="3"/>
<path d="M88 100 Q100 88 112 100 M88 115 Q100 103 112 115" stroke-width="1.8" opacity="0.7"/>
</g>`
  });
}

// 15 — Threadwork  三股編織腦
{
  const c = '#DC2626';
  D.push({
    id: '15', name: 'Threadwork', label: 'THREADWORK', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2.5" stroke-linecap="round">
<path d="M50 60 C70 80 90 60 100 80 C110 100 130 80 150 100 C130 120 110 100 100 120 C90 140 70 120 50 140"/>
<path d="M50 75 C70 95 90 75 100 95 C110 115 130 95 150 115" opacity="0.7"/>
<path d="M50 90 C70 110 90 90 100 110 C110 130 130 110 150 130" opacity="0.45"/>
<circle cx="50" cy="60" r="2.5" fill="${c}"/>
<circle cx="150" cy="100" r="2.5" fill="${c}"/>
<circle cx="50" cy="140" r="2.5" fill="${c}"/>
</g>`
  });
}

// 16 — Iris  眼睛 + 腦螺旋虹膜
{
  const c = '#059669';
  // Iris radial lines
  let iris = '';
  for (let i = 0; i < 16; i++) {
    const a = (i * 22.5) * Math.PI / 180;
    const x1 = 100 + 8 * Math.cos(a);
    const y1 = 100 + 8 * Math.sin(a);
    const x2 = 100 + 22 * Math.cos(a);
    const y2 = 100 + 22 * Math.sin(a);
    iris += `<line x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}" opacity="${i % 2 ? 0.55 : 1}"/>`;
  }
  D.push({
    id: '16', name: 'Iris', label: 'IRIS', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="1.6" stroke-linecap="round">
<path d="M30 100 Q100 50 170 100 Q100 150 30 100 Z" stroke-width="3"/>
<circle cx="100" cy="100" r="28"/>
${iris}
<circle cx="100" cy="100" r="6" fill="${c}"/>
<circle cx="106" cy="94" r="2" fill="white"/>
</g>`
  });
}

// 17 — Labyrinth  迷宮腦
{
  const c = '#7C3AED';
  let maze = '';
  for (let i = 0; i < 5; i++) {
    const r = 18 + i * 11;
    const startA = (i * 30) * Math.PI / 180;
    const endA = startA + 1.6 * Math.PI;
    const sx = 100 + r * Math.cos(startA);
    const sy = 100 + r * Math.sin(startA);
    const ex = 100 + r * Math.cos(endA);
    const ey = 100 + r * Math.sin(endA);
    const large = endA - startA > Math.PI ? 1 : 0;
    maze += `<path d="M${fmt(sx)} ${fmt(sy)} A${r} ${r} 0 ${large} 1 ${fmt(ex)} ${fmt(ey)}"/>`;
  }
  D.push({
    id: '17', name: 'Labyrinth', label: 'LABYRINTH', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2.4" stroke-linecap="round">
${maze}
<circle cx="100" cy="100" r="4" fill="${c}"/>
<line x1="100" y1="22" x2="100" y2="14" stroke-width="2"/>
</g>`
  });
}

// 18 — Pulse  脈搏轉腦摺
{
  const c = '#DB2777';
  D.push({
    id: '18', name: 'Pulse', label: 'PULSE', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
<path d="M30 110 L55 110 L62 95 L72 130 L80 80 L90 130 L100 110 Q115 90 130 110 Q145 130 160 110 L170 110"/>
<path d="M55 125 Q70 100 85 125 Q100 150 115 125 Q130 100 145 125" opacity="0.5"/>
<circle cx="30" cy="110" r="2.5" fill="${c}"/>
<circle cx="170" cy="110" r="2.5" fill="${c}"/>
</g>`
  });
}

// 19 — Kintsugi  金繕裂紋腦
{
  const c = '#FACC15';
  D.push({
    id: '19', name: 'Kintsugi', label: 'KINTSUGI', color: c,
    body: `<g stroke="${c}" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M65 90 Q60 60 95 55 Q130 50 140 80 Q155 100 140 130 Q130 155 95 150 Q60 145 65 115 Q55 102 65 90 Z" stroke-width="3"/>
<path d="M95 55 L92 90 L75 100 L88 120 L85 150" stroke-width="1.8" opacity="0.85"/>
<path d="M140 80 L120 95 L92 90" stroke-width="1.8" opacity="0.85"/>
<path d="M75 100 L65 115" stroke-width="1.4" opacity="0.7"/>
<path d="M120 95 L140 130" stroke-width="1.4" opacity="0.7"/>
<path d="M88 120 L120 130" stroke-width="1.4" opacity="0.7"/>
<circle cx="92" cy="90" r="2.5" fill="${c}"/>
<circle cx="120" cy="95" r="2.5" fill="${c}"/>
<circle cx="88" cy="120" r="2.5" fill="${c}"/>
</g>`
  });
}

// 20 — Origami  折紙幾何腦
{
  const c = '#0891B2';
  D.push({
    id: '20', name: 'Origami', label: 'ORIGAMI', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
<polygon points="100,50 145,75 145,125 100,150 55,125 55,75" stroke-width="3"/>
<line x1="100" y1="50" x2="100" y2="150"/>
<line x1="55" y1="75" x2="145" y2="125"/>
<line x1="145" y1="75" x2="55" y2="125"/>
<line x1="55" y1="100" x2="145" y2="100" opacity="0.6"/>
<line x1="78" y1="62" x2="78" y2="138" opacity="0.45"/>
<line x1="122" y1="62" x2="122" y2="138" opacity="0.45"/>
<circle cx="100" cy="100" r="4" fill="${c}"/>
</g>`
  });
}

// 21 — Galaxy  螺旋星系腦
{
  const c = '#9333EA';
  // 3 galaxy arms
  let arms = '';
  for (let arm = 0; arm < 3; arm++) {
    const phase = (arm * 120) * Math.PI / 180;
    let d = '';
    for (let i = 0; i < 30; i++) {
      const t = i / 29;
      const r = 8 + t * 70;
      const a = phase + t * 3.2;
      const x = 100 + r * Math.cos(a);
      const y = 100 + r * Math.sin(a);
      d += i === 0 ? `M${fmt(x)} ${fmt(y)}` : ` L${fmt(x)} ${fmt(y)}`;
    }
    arms += `<path d="${d}"/>`;
  }
  // Star dots
  let stars = '';
  for (let i = 0; i < 14; i++) {
    const a = (i * 37) * Math.PI / 180;
    const r = 28 + (i % 5) * 11;
    const x = 100 + r * Math.cos(a);
    const y = 100 + r * Math.sin(a);
    stars += `<circle cx="${fmt(x)}" cy="${fmt(y)}" r="${i % 3 === 0 ? 2 : 1.2}" fill="${c}" opacity="${i % 2 ? 0.9 : 0.5}"/>`;
  }
  D.push({
    id: '21', name: 'Galaxy', label: 'GALAXY', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="1.8" stroke-linecap="round">
${arms}
${stars}
<circle cx="100" cy="100" r="6" fill="${c}"/>
</g>`
  });
}

// 22 — Branch  思維樹分枝
{
  const c = '#16A34A';
  D.push({
    id: '22', name: 'Branch', label: 'BRANCH', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
<line x1="100" y1="170" x2="100" y2="120"/>
<path d="M100 120 Q85 110 75 95"/>
<path d="M100 120 Q115 110 125 95"/>
<path d="M75 95 Q65 80 55 65"/>
<path d="M75 95 Q80 75 90 60"/>
<path d="M125 95 Q135 80 145 65"/>
<path d="M125 95 Q120 75 110 60"/>
<path d="M55 65 Q45 50 50 38"/>
<path d="M55 65 Q60 50 70 45"/>
<path d="M90 60 Q90 45 95 38"/>
<path d="M110 60 Q110 45 105 38"/>
<path d="M145 65 Q155 50 150 38"/>
<path d="M145 65 Q140 50 130 45"/>
${[[55,65],[75,95],[90,60],[110,60],[125,95],[145,65],[50,38],[70,45],[95,38],[105,38],[130,45],[150,38]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.5" fill="${c}"/>`).join('')}
</g>`
  });
}

// 23 — Network  節點圖譜腦
{
  const c = '#C026D3';
  const N = [[100,55],[65,70],[140,75],[55,110],[150,115],[75,150],[130,150],[100,100]];
  const E = [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[0,1],[0,2],[1,3],[2,4],[3,5],[4,6],[5,6]];
  let lines = E.map(([a,b]) => `<line x1="${N[a][0]}" y1="${N[a][1]}" x2="${N[b][0]}" y2="${N[b][1]}" opacity="0.55"/>`).join('');
  let dots = N.map(([x,y],i) => `<circle cx="${x}" cy="${y}" r="${i===7?6:4}" fill="${c}"/>` + (i===7?`<circle cx="${x}" cy="${y}" r="11" stroke-width="1" stroke-dasharray="2 2" opacity="0.5"/>`:'')).join('');
  D.push({
    id: '23', name: 'Network', label: 'NETWORK', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="1.6" stroke-linecap="round">
${lines}
${dots}
</g>`
  });
}

// 24 — Hemisphere  左右半腦對稱
{
  const c = '#4338CA';
  D.push({
    id: '24', name: 'Hemisphere', label: 'HEMISPHERE', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
<path d="M95 50 C70 50 55 75 60 100 C50 110 60 135 80 140 C85 152 95 152 95 140 Z" stroke-width="3"/>
<path d="M105 50 C130 50 145 75 140 100 C150 110 140 135 120 140 C115 152 105 152 105 140 Z" stroke-width="3"/>
<path d="M82 75 Q90 88 80 100 Q70 112 80 125" stroke-width="1.8" opacity="0.7"/>
<path d="M118 75 Q110 88 120 100 Q130 112 120 125" stroke-width="1.8" opacity="0.7"/>
<path d="M70 105 Q80 110 75 122" stroke-width="1.4" opacity="0.5"/>
<path d="M130 105 Q120 110 125 122" stroke-width="1.4" opacity="0.5"/>
<line x1="100" y1="48" x2="100" y2="155" stroke-width="1" stroke-dasharray="2 3" opacity="0.6"/>
</g>`
  });
}

// 25 — Prism  稜鏡光譜思維
{
  const c = '#B45309';
  let spectrum = '';
  for (let i = 0; i < 6; i++) {
    const y = 92 + i * 6;
    const op = 1 - i * 0.13;
    spectrum += `<line x1="125" y1="${y}" x2="180" y2="${y}" opacity="${op.toFixed(2)}"/>`;
  }
  D.push({
    id: '25', name: 'Prism', label: 'PRISM', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2.5" stroke-linecap="round">
<line x1="20" y1="100" x2="65" y2="100" stroke-width="1.8" opacity="0.7"/>
<polygon points="80,55 80,145 130,100" stroke-width="3"/>
<line x1="65" y1="100" x2="83" y2="100" stroke-width="1"/>
${spectrum}
<circle cx="80" cy="100" r="3" fill="${c}"/>
</g>`
  });
}

// 26 — Fractal  自相似嵌套腦
{
  const c = '#1D4ED8';
  D.push({
    id: '26', name: 'Fractal', label: 'FRACTAL', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
<path d="M55 100 Q55 50 100 50 Q145 50 145 100 Q145 150 100 150 Q55 150 55 100 Z" stroke-width="3"/>
<path d="M70 100 Q70 65 100 65 Q130 65 130 100 Q130 135 100 135 Q70 135 70 100 Z" opacity="0.7"/>
<path d="M82 100 Q82 78 100 78 Q118 78 118 100 Q118 122 100 122 Q82 122 82 100 Z" opacity="0.5"/>
<path d="M92 100 Q92 90 100 90 Q108 90 108 100 Q108 110 100 110 Q92 110 92 100 Z" opacity="0.4"/>
<circle cx="100" cy="100" r="2" fill="${c}"/>
</g>`
  });
}

// 27 — Compass  指南針 8 向腦核
{
  const c = '#BE185D';
  let arms = '';
  for (let i = 0; i < 8; i++) {
    const a = (i * 45) * Math.PI / 180;
    const x = 100 + 70 * Math.cos(a);
    const y = 100 + 70 * Math.sin(a);
    const major = i % 2 === 0;
    arms += `<line x1="100" y1="100" x2="${fmt(x)}" y2="${fmt(y)}" stroke-width="${major ? 2.6 : 1.4}" opacity="${major ? 1 : 0.55}"/>`;
    arms += `<circle cx="${fmt(x)}" cy="${fmt(y)}" r="${major ? 3 : 2}" fill="${c}"/>`;
  }
  D.push({
    id: '27', name: 'Compass', label: 'COMPASS', color: c,
    body: `<g stroke="${c}" fill="none" stroke-linecap="round">
${arms}
<circle cx="100" cy="100" r="22" fill="white" stroke-width="2.5"/>
<path d="M100 80 L107 100 L100 120 L93 100 Z" fill="${c}" stroke="none"/>
<circle cx="100" cy="100" r="3" fill="white"/>
<circle cx="100" cy="100" r="78" stroke-width="1" stroke-dasharray="2 4" opacity="0.4"/>
</g>`
  });
}

// 28 — Blossom  六瓣腦花
{
  const c = '#15803D';
  let petals = '';
  for (let i = 0; i < 6; i++) {
    const a = (i * 60 - 90) * Math.PI / 180;
    const cx = 100 + 28 * Math.cos(a);
    const cy = 100 + 28 * Math.sin(a);
    petals += `<ellipse cx="${fmt(cx)}" cy="${fmt(cy)}" rx="22" ry="11" transform="rotate(${i * 60 - 90} ${fmt(cx)} ${fmt(cy)})" opacity="${i % 2 ? 0.6 : 1}"/>`;
  }
  D.push({
    id: '28', name: 'Blossom', label: 'BLOSSOM', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2.2" stroke-linecap="round">
${petals}
<circle cx="100" cy="100" r="9" fill="${c}"/>
<path d="M93 100 Q100 92 107 100 M93 105 Q100 97 107 105" stroke="white" stroke-width="1.2"/>
</g>`
  });
}

// 29 — Quantum  量子干涉波點
{
  const c = '#7E22CE';
  let dots = '';
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      const x = 50 + i * 10;
      const y = 50 + j * 10;
      const dx = x - 100, dy = y - 100;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 55) continue;
      const wave = Math.cos(dist * 0.45);
      const r = 1 + (wave + 1) * 1.4;
      const op = 0.3 + (wave + 1) * 0.32;
      dots += `<circle cx="${x}" cy="${y}" r="${fmt(r)}" fill="${c}" opacity="${op.toFixed(2)}"/>`;
    }
  }
  // Outer wave rings
  let rings = '';
  for (let i = 0; i < 3; i++) {
    rings += `<circle cx="100" cy="100" r="${65 + i * 8}" stroke-width="1" stroke-dasharray="3 4" opacity="${0.5 - i * 0.13}"/>`;
  }
  D.push({
    id: '29', name: 'Quantum', label: 'QUANTUM', color: c,
    body: `<g stroke="${c}" fill="none">
${rings}
${dots}
</g>`
  });
}

// 30 — Horizon  地平線意識日出
{
  const c = '#0F766E';
  let arcs = '';
  for (let i = 0; i < 5; i++) {
    const r = 32 + i * 11;
    const op = 1 - i * 0.16;
    arcs += `<path d="M${100 - r} 130 A${r} ${r} 0 0 1 ${100 + r} 130" opacity="${op.toFixed(2)}"/>`;
  }
  let rays = '';
  for (let i = 0; i < 7; i++) {
    const a = (-180 + i * 30) * Math.PI / 180;
    const x1 = 100 + 92 * Math.cos(a);
    const y1 = 130 + 92 * Math.sin(a);
    const x2 = 100 + 105 * Math.cos(a);
    const y2 = 130 + 105 * Math.sin(a);
    rays += `<line x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}" stroke-dasharray="2 3" opacity="0.6"/>`;
  }
  D.push({
    id: '30', name: 'Horizon', label: 'HORIZON', color: c,
    body: `<g stroke="${c}" fill="none" stroke-width="2.6" stroke-linecap="round">
<line x1="25" y1="130" x2="175" y2="130" stroke-width="1.5"/>
${arcs}
${rays}
<circle cx="100" cy="130" r="3" fill="${c}"/>
</g>`
  });
}

// ============================================================
// Remix Combinations (mixing Quantum × Hemisphere × Network ×
// Kintsugi × Constellation × Sample1 squiggle × Sample2 gradient)
// ============================================================

const REMIX_DIR = path.join(__dirname, 'public', 'remix_logos');
fs.mkdirSync(REMIX_DIR, { recursive: true });

// ---------- shared building blocks ----------

// Sample 1 — speech-bubble brain (hand-drawn squiggle)
const SQUIGGLE_OUTLINE = `<path d="M100 52 C72 50 52 72 58 96 C46 110 56 132 76 132 C76 146 88 154 100 146 L106 158 L112 146 C132 152 148 132 138 110 C152 88 134 58 105 56 Z" stroke-linejoin="round"/>`;
const SQUIGGLE_INNER = `<path d="M86 82 C100 72 120 80 116 96 C100 92 84 102 94 116 C112 116 122 104 116 92" stroke-linejoin="round" fill="none"/>`;

// Sample 2 — smooth twin-lobe brain (gradient stroke)
const SMOOTH_OUTLINE_LEFT = `<path d="M100 58 C82 56 66 70 70 92 C58 102 64 124 80 130 C80 142 96 146 100 138" fill="none"/>`;
const SMOOTH_OUTLINE_RIGHT = `<path d="M100 58 C118 56 134 70 130 92 C142 102 136 124 120 130 C120 142 104 146 100 138" fill="none"/>`;
const SMOOTH_FOLDS_LEFT = `<path d="M78 80 Q88 92 78 102 Q68 112 78 124" fill="none"/>`;
const SMOOTH_FOLDS_RIGHT = `<path d="M122 80 Q112 92 122 102 Q132 112 122 124" fill="none"/>`;

// Quantum dot field — interference pattern
function quantumDots(color, opacityScale = 1, range = 55, cellSize = 9, cx = 100, cy = 100) {
  let dots = '';
  const n = Math.floor((range * 2) / cellSize) + 1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const x = cx - range + i * cellSize;
      const y = cy - range + j * cellSize;
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > range) continue;
      const wave = Math.cos(dist * 0.42);
      const r = 1 + (wave + 1) * 1.2;
      const op = (0.32 + (wave + 1) * 0.3) * opacityScale;
      dots += `<circle cx="${fmt(x)}" cy="${fmt(y)}" r="${fmt(r)}" fill="${color}" opacity="${op.toFixed(2)}"/>`;
    }
  }
  return dots;
}

// Brain-shape node positions (used by network/constellation overlays)
const BRAIN_NODES = [
  [100, 56], [70, 70], [130, 70], [56, 100], [144, 100],
  [72, 138], [128, 138], [100, 100], [85, 90], [115, 90], [85, 122], [115, 122]
];
const BRAIN_EDGES = [
  [0,1],[0,2],[1,3],[2,4],[3,5],[4,6],[5,6],
  [7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],
  [8,1],[8,3],[9,2],[9,4],[10,5],[11,6],[8,9],[10,11]
];

function networkOverlay(color, nodeR = 4, edgeOp = 0.55, withHub = true) {
  let lines = BRAIN_EDGES.map(([a,b]) => {
    const [x1,y1] = BRAIN_NODES[a], [x2,y2] = BRAIN_NODES[b];
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.4" opacity="${edgeOp}"/>`;
  }).join('');
  let dots = BRAIN_NODES.map((p, i) => {
    if (i === 7) return withHub ? `<circle cx="${p[0]}" cy="${p[1]}" r="${nodeR + 2}" fill="${color}"/><circle cx="${p[0]}" cy="${p[1]}" r="${nodeR + 7}" fill="none" stroke="${color}" stroke-width="1" stroke-dasharray="2 3" opacity="0.6"/>` : '';
    return `<circle cx="${p[0]}" cy="${p[1]}" r="${nodeR}" fill="${color}"/>`;
  }).join('');
  return lines + dots;
}

// Constellation layout — same nodes but as stars + connecting lines
function constellationOverlay(color, withCore = true) {
  const edges = [[0,1],[0,2],[1,3],[2,4],[3,5],[4,6],[5,6],[1,8],[2,9],[5,10],[6,11],[8,9],[10,11]];
  let lines = edges.map(([a,b]) => {
    const [x1,y1]=BRAIN_NODES[a],[x2,y2]=BRAIN_NODES[b];
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1" opacity="0.4"/>`;
  }).join('');
  let stars = BRAIN_NODES.map((p,i) => {
    if (i === 7 && !withCore) return '';
    const r = i === 7 ? 4 : (i < 7 ? 3 : 2);
    return `<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${color}"/>` +
           `<circle cx="${p[0]}" cy="${p[1]}" r="${r + 3}" fill="none" stroke="${color}" stroke-width="0.8" opacity="0.35"/>`;
  }).join('');
  return lines + stars;
}

// Hemisphere fold curves (one half)
function hemiFolds(color, side = 'left') {
  const sw = 2.2;
  if (side === 'left') {
    return `<g stroke="${color}" stroke-width="${sw}" fill="none" stroke-linecap="round">
<path d="M95 56 C72 56 58 76 62 100 C52 110 60 132 80 138 C84 150 95 150 95 138 Z" stroke-width="3"/>
<path d="M82 78 Q92 90 82 102 Q72 114 82 126" opacity="0.7"/>
<path d="M70 105 Q80 110 75 122" opacity="0.5" stroke-width="1.5"/>
</g>`;
  }
  return `<g stroke="${color}" stroke-width="${sw}" fill="none" stroke-linecap="round">
<path d="M105 56 C128 56 142 76 138 100 C148 110 140 132 120 138 C116 150 105 150 105 138 Z" stroke-width="3"/>
<path d="M118 78 Q108 90 118 102 Q128 114 118 126" opacity="0.7"/>
<path d="M130 105 Q120 110 125 122" opacity="0.5" stroke-width="1.5"/>
</g>`;
}

// Kintsugi cracked-brain outline + interior cracks
function kintsugiBrain(color, outlineColor, withDots = false, dotsHTML = '') {
  return `<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M65 90 Q60 60 95 55 Q130 50 140 80 Q155 100 140 130 Q130 155 95 150 Q60 145 65 115 Q55 102 65 90 Z" stroke="${outlineColor}" stroke-width="3"/>
${withDots ? dotsHTML : ''}
<g stroke="${color}" stroke-width="1.8" opacity="0.9">
<path d="M95 55 L92 90 L75 100 L88 120 L85 150"/>
<path d="M140 80 L120 95 L92 90"/>
<path d="M75 100 L65 115" stroke-width="1.4" opacity="0.7"/>
<path d="M120 95 L140 130" stroke-width="1.4" opacity="0.7"/>
<path d="M88 120 L120 130" stroke-width="1.4" opacity="0.7"/>
</g>
<g fill="${color}">
<circle cx="92" cy="90" r="2.5"/>
<circle cx="120" cy="95" r="2.5"/>
<circle cx="88" cy="120" r="2.5"/>
<circle cx="75" cy="100" r="2"/>
<circle cx="120" cy="130" r="2"/>
</g>
</g>`;
}

// ---------- 24 Remix Designs ----------

const R = [];

// R01 · Quantum × Network — 量子網絡
R.push({
  id: 'R01', name: 'PixelMind', label: 'PIXEL · MIND',
  tags: 'QUANTUM × NETWORK', color: '#06B6D4',
  body: `<g>${quantumDots('#7E22CE', 0.5)}${networkOverlay('#06B6D4')}</g>`
});

// R02 · Quantum × Hemisphere — 半腦量子
{
  let leftDots = '';
  for (let i = 0; i < 11; i++) for (let j = 0; j < 11; j++) {
    const x = 50 + i * 5, y = 50 + j * 10;
    if (x > 96) continue;
    const dx = x - 100, dy = y - 100;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > 50) continue;
    const wave = Math.cos(dist * 0.4);
    const r = 1 + (wave + 1) * 1.3;
    const op = 0.35 + (wave + 1) * 0.3;
    leftDots += `<circle cx="${x}" cy="${y}" r="${fmt(r)}" fill="#7E22CE" opacity="${op.toFixed(2)}"/>`;
  }
  R.push({
    id: 'R02', name: 'BifoldQuanta', label: 'BIFOLD · QUANTA',
    tags: 'QUANTUM × HEMISPHERE', color: '#7E22CE',
    body: `<g>${leftDots}${hemiFolds('#4338CA', 'right')}<line x1="100" y1="48" x2="100" y2="156" stroke="#7E22CE" stroke-width="1" stroke-dasharray="2 3" opacity="0.7"/></g>`
  });
}

// R03 · Quantum × Kintsugi — 裂金量子場
{
  // Quantum dots clipped inside brain shape
  let dots = '';
  for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) {
    const x = 60 + i * 7, y = 55 + j * 8;
    if (x < 65 || x > 145 || y < 60 || y > 150) continue;
    const dx = x - 100, dy = y - 100;
    const wave = Math.cos(Math.sqrt(dx*dx + dy*dy) * 0.4);
    const r = 0.8 + (wave + 1) * 0.9;
    const op = 0.3 + (wave + 1) * 0.25;
    dots += `<circle cx="${x}" cy="${y}" r="${fmt(r)}" fill="#7E22CE" opacity="${op.toFixed(2)}"/>`;
  }
  R.push({
    id: 'R03', name: 'FracturedField', label: 'FRACTURED · FIELD',
    tags: 'QUANTUM × KINTSUGI', color: '#FACC15',
    body: `<defs><clipPath id="clpR03"><path d="M65 90 Q60 60 95 55 Q130 50 140 80 Q155 100 140 130 Q130 155 95 150 Q60 145 65 115 Q55 102 65 90 Z"/></clipPath></defs>
<g clip-path="url(#clpR03)">${dots}</g>
${kintsugiBrain('#FACC15', '#FACC15')}`
  });
}

// R04 · Quantum × Constellation — 星塵場
{
  R.push({
    id: 'R04', name: 'StellarField', label: 'STELLAR · FIELD',
    tags: 'QUANTUM × CONSTELLATION', color: '#F59E0B',
    body: `<g>${quantumDots('#06B6D4', 0.4)}${constellationOverlay('#F59E0B')}</g>`
  });
}

// R05 · Quantum × Sample1 — 手繪量子腦
{
  // Dots clipped inside squiggle
  let dots = '';
  for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) {
    const x = 65 + i * 8, y = 60 + j * 9;
    if (x < 70 || x > 140 || y < 65 || y > 150) continue;
    const dx = x - 100, dy = y - 100;
    const wave = Math.cos(Math.sqrt(dx*dx + dy*dy) * 0.4);
    const r = 0.8 + (wave + 1) * 0.7;
    const op = 0.35 + (wave + 1) * 0.25;
    dots += `<circle cx="${x}" cy="${y}" r="${fmt(r)}" fill="#C026D3" opacity="${op.toFixed(2)}"/>`;
  }
  R.push({
    id: 'R05', name: 'SquiggleQuanta', label: 'SQUIGGLE · QUANTA',
    tags: 'QUANTUM × SAMPLE 1', color: '#C026D3',
    body: `<defs><clipPath id="clpR05"><path d="M100 52 C72 50 52 72 58 96 C46 110 56 132 76 132 C76 146 88 154 100 146 L106 158 L112 146 C132 152 148 132 138 110 C152 88 134 58 105 56 Z"/></clipPath></defs>
<g clip-path="url(#clpR05)">${dots}</g>
<g stroke="#1a1a1a" stroke-width="3.2" fill="none" stroke-linecap="round">${SQUIGGLE_OUTLINE}${SQUIGGLE_INNER}</g>`
  });
}

// R06 · Quantum × Sample2 — 漸變量子
R.push({
  id: 'R06', name: 'GradientQuanta', label: 'GRADIENT · QUANTA',
  tags: 'QUANTUM × SAMPLE 2', color: '#3B82F6',
  body: `<defs>
<linearGradient id="gR06" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#06B6D4"/><stop offset="1" stop-color="#3B82F6"/>
</linearGradient>
</defs>
${quantumDots('#06B6D4', 0.45)}
<g stroke="url(#gR06)" stroke-width="3.2" fill="none" stroke-linecap="round">
${SMOOTH_OUTLINE_LEFT}${SMOOTH_OUTLINE_RIGHT}${SMOOTH_FOLDS_LEFT}${SMOOTH_FOLDS_RIGHT}
</g>`
});

// R07 · Hemisphere × Network — 雙腦圖譜
R.push({
  id: 'R07', name: 'DualMind', label: 'DUAL · MIND',
  tags: 'HEMISPHERE × NETWORK', color: '#C026D3',
  body: `${hemiFolds('#4338CA', 'left')}
<g>
<line x1="105" y1="56" x2="138" y2="76" stroke="#C026D3" stroke-width="1.4" opacity="0.55"/>
<line x1="105" y1="56" x2="125" y2="100" stroke="#C026D3" stroke-width="1.4" opacity="0.55"/>
<line x1="138" y1="76" x2="148" y2="110" stroke="#C026D3" stroke-width="1.4" opacity="0.55"/>
<line x1="138" y1="76" x2="125" y2="100" stroke="#C026D3" stroke-width="1.4" opacity="0.55"/>
<line x1="125" y1="100" x2="148" y2="110" stroke="#C026D3" stroke-width="1.4" opacity="0.55"/>
<line x1="125" y1="100" x2="115" y2="135" stroke="#C026D3" stroke-width="1.4" opacity="0.55"/>
<line x1="148" y1="110" x2="135" y2="138" stroke="#C026D3" stroke-width="1.4" opacity="0.55"/>
<line x1="115" y1="135" x2="135" y2="138" stroke="#C026D3" stroke-width="1.4" opacity="0.55"/>
<circle cx="105" cy="56" r="3.5" fill="#C026D3"/>
<circle cx="138" cy="76" r="3.5" fill="#C026D3"/>
<circle cx="148" cy="110" r="3.5" fill="#C026D3"/>
<circle cx="115" cy="135" r="3.5" fill="#C026D3"/>
<circle cx="135" cy="138" r="3.5" fill="#C026D3"/>
<circle cx="125" cy="100" r="5" fill="#C026D3"/>
<circle cx="125" cy="100" r="9" fill="none" stroke="#C026D3" stroke-width="1" stroke-dasharray="2 2" opacity="0.55"/>
</g>
<line x1="100" y1="48" x2="100" y2="156" stroke="#8b909d" stroke-width="1" stroke-dasharray="2 3" opacity="0.5"/>`
});

// R08 · Hemisphere × Kintsugi — 金縫雙腦
R.push({
  id: 'R08', name: 'GoldenSeam', label: 'GOLDEN · SEAM',
  tags: 'HEMISPHERE × KINTSUGI', color: '#FACC15',
  body: `${hemiFolds('#4338CA', 'left').replace(/M95 56/g, 'M93 56').replace(/M95 138 Z/g, 'M93 138 Z')}
${hemiFolds('#4338CA', 'right').replace(/M105 56/g, 'M107 56').replace(/M105 138 Z/g, 'M107 138 Z')}
<path d="M100 50 L96 70 L102 90 L94 110 L104 130 L98 150 L100 158" stroke="#FACC15" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<g fill="#FACC15">
<circle cx="96" cy="70" r="2.2"/><circle cx="102" cy="90" r="2.2"/>
<circle cx="94" cy="110" r="2.2"/><circle cx="104" cy="130" r="2.2"/>
<circle cx="98" cy="150" r="2.2"/>
</g>`
});

// R09 · Hemisphere × Constellation — 鏡像星圖
R.push({
  id: 'R09', name: 'MirroredStars', label: 'MIRROR · STARS',
  tags: 'HEMISPHERE × CONSTELLATION', color: '#F59E0B',
  body: `${hemiFolds('#0EA5E9', 'left')}
<g>
<line x1="105" y1="56" x2="130" y2="70" stroke="#F59E0B" stroke-width="1" opacity="0.5"/>
<line x1="130" y1="70" x2="144" y2="100" stroke="#F59E0B" stroke-width="1" opacity="0.5"/>
<line x1="144" y1="100" x2="128" y2="138" stroke="#F59E0B" stroke-width="1" opacity="0.5"/>
<line x1="105" y1="56" x2="115" y2="90" stroke="#F59E0B" stroke-width="1" opacity="0.5"/>
<line x1="115" y1="90" x2="130" y2="70" stroke="#F59E0B" stroke-width="1" opacity="0.5"/>
<line x1="115" y1="90" x2="144" y2="100" stroke="#F59E0B" stroke-width="1" opacity="0.5"/>
<line x1="115" y1="90" x2="115" y2="122" stroke="#F59E0B" stroke-width="1" opacity="0.5"/>
<line x1="115" y1="122" x2="128" y2="138" stroke="#F59E0B" stroke-width="1" opacity="0.5"/>
${[[105,56,3],[130,70,3],[144,100,3.5],[128,138,3],[115,90,2.5],[115,122,2.5]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#F59E0B"/><circle cx="${x}" cy="${y}" r="${r+2.5}" fill="none" stroke="#F59E0B" stroke-width="0.7" opacity="0.4"/>`).join('')}
</g>
<line x1="100" y1="48" x2="100" y2="156" stroke="#8b909d" stroke-width="1" stroke-dasharray="2 3" opacity="0.5"/>`
});

// R10 · Hemisphere × Sample1 — 手繪雙腦
R.push({
  id: 'R10', name: 'DualSketch', label: 'DUAL · SKETCH',
  tags: 'HEMISPHERE × SAMPLE 1', color: '#DC2626',
  body: `<g stroke="#1a1a1a" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M95 52 C72 50 56 72 62 92 C50 102 58 130 78 130 C78 144 88 152 95 144 L95 156"/>
<path d="M82 80 C92 70 100 80 96 92 C82 88 76 100 86 110 C100 110 106 100 100 92"/>
<path d="M105 52 C128 50 144 72 138 92 C150 102 142 130 122 130 C122 144 112 152 105 144 L105 156"/>
<path d="M118 80 C108 70 100 80 104 92 C118 88 124 100 114 110 C100 110 94 100 100 92"/>
</g>
<line x1="100" y1="48" x2="100" y2="158" stroke="#DC2626" stroke-width="1" stroke-dasharray="2 3" opacity="0.7"/>`
});

// R11 · Hemisphere × Sample2 — 漸變鏡像
R.push({
  id: 'R11', name: 'GradientMirror', label: 'GRADIENT · MIRROR',
  tags: 'HEMISPHERE × SAMPLE 2', color: '#0EA5E9',
  body: `<defs>
<linearGradient id="gR11L" x1="0" x2="1" y1="0" y2="0">
<stop offset="0" stop-color="#06B6D4"/><stop offset="1" stop-color="#3B82F6"/>
</linearGradient>
<linearGradient id="gR11R" x1="1" x2="0" y1="0" y2="0">
<stop offset="0" stop-color="#A855F7"/><stop offset="1" stop-color="#3B82F6"/>
</linearGradient>
</defs>
<g stroke="url(#gR11L)" stroke-width="3.2" fill="none" stroke-linecap="round">${SMOOTH_OUTLINE_LEFT}${SMOOTH_FOLDS_LEFT}</g>
<g stroke="url(#gR11R)" stroke-width="3.2" fill="none" stroke-linecap="round">${SMOOTH_OUTLINE_RIGHT}${SMOOTH_FOLDS_RIGHT}</g>
<line x1="100" y1="56" x2="100" y2="142" stroke="#fff" stroke-width="1.5" stroke-dasharray="3 4" opacity="0.6"/>`
});

// R12 · Network × Kintsugi — 節點裂痕
R.push({
  id: 'R12', name: 'NodeCracks', label: 'NODE · CRACKS',
  tags: 'NETWORK × KINTSUGI', color: '#FACC15',
  body: `<path d="M65 90 Q60 60 95 55 Q130 50 140 80 Q155 100 140 130 Q130 155 95 150 Q60 145 65 115 Q55 102 65 90 Z" fill="none" stroke="#7E22CE" stroke-width="3" stroke-linejoin="round"/>
<g stroke="#FACC15" stroke-width="1.6" opacity="0.85" fill="none" stroke-linecap="round">
<line x1="95" y1="55" x2="100" y2="100"/>
<line x1="100" y1="100" x2="140" y2="80"/>
<line x1="100" y1="100" x2="75" y2="100"/>
<line x1="100" y1="100" x2="120" y2="130"/>
<line x1="100" y1="100" x2="85" y2="135"/>
<line x1="75" y1="100" x2="65" y2="115"/>
<line x1="140" y1="80" x2="140" y2="130"/>
<line x1="120" y1="130" x2="140" y2="130"/>
<line x1="85" y1="135" x2="120" y2="130"/>
<line x1="95" y1="150" x2="85" y2="135"/>
</g>
<g fill="#FACC15">
<circle cx="100" cy="100" r="5"/>
<circle cx="100" cy="100" r="9" fill="none" stroke="#FACC15" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.6"/>
${[[95,55],[140,80],[140,130],[75,100],[120,130],[85,135],[95,150],[65,115]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3"/>`).join('')}
</g>`
});

// R13 · Network × Constellation — 宇宙網絡
{
  // Background scattered stars
  let scatter = '';
  const positions = [[40,40],[160,40],[35,90],[170,90],[45,160],[155,160],[170,135],[30,135],[175,75],[25,60]];
  scatter = positions.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${Math.random()>0.5?1.5:1}" fill="#0EA5E9" opacity="${(0.4+Math.random()*0.4).toFixed(2)}"/>`).join('');
  R.push({
    id: 'R13', name: 'CosmicWeb', label: 'COSMIC · WEB',
    tags: 'NETWORK × CONSTELLATION', color: '#C026D3',
    body: `${scatter}${networkOverlay('#C026D3', 4, 0.5)}${constellationOverlay('#0EA5E9', false).replace(/r="3"/g,'r="1.6"').replace(/r="2"/g,'r="1.2"')}`
  });
}

// R14 · Network × Sample1 — 手繪節點腦
R.push({
  id: 'R14', name: 'SketchNetwork', label: 'SKETCH · NETWORK',
  tags: 'NETWORK × SAMPLE 1', color: '#06B6D4',
  body: `<g stroke="#1a1a1a" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round">${SQUIGGLE_OUTLINE}</g>
<g stroke="#06B6D4" stroke-width="1.4" fill="none" opacity="0.65">
<line x1="80" y1="80" x2="100" y2="100"/>
<line x1="120" y1="80" x2="100" y2="100"/>
<line x1="75" y1="115" x2="100" y2="100"/>
<line x1="125" y1="115" x2="100" y2="100"/>
<line x1="100" y1="135" x2="100" y2="100"/>
<line x1="80" y1="80" x2="120" y2="80"/>
<line x1="75" y1="115" x2="125" y2="115"/>
<line x1="80" y1="80" x2="75" y2="115"/>
<line x1="120" y1="80" x2="125" y2="115"/>
<line x1="75" y1="115" x2="100" y2="135"/>
<line x1="125" y1="115" x2="100" y2="135"/>
</g>
<g fill="#06B6D4">
<circle cx="80" cy="80" r="3.5"/><circle cx="120" cy="80" r="3.5"/>
<circle cx="75" cy="115" r="3.5"/><circle cx="125" cy="115" r="3.5"/>
<circle cx="100" cy="135" r="3.5"/>
<circle cx="100" cy="100" r="5"/>
<circle cx="100" cy="100" r="9" fill="none" stroke="#06B6D4" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.6"/>
</g>`
});

// R15 · Network × Sample2 — 漸變光網
R.push({
  id: 'R15', name: 'GradientNetwork', label: 'GRADIENT · NETWORK',
  tags: 'NETWORK × SAMPLE 2', color: '#3B82F6',
  body: `<defs>
<linearGradient id="gR15" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#06B6D4"/><stop offset="1" stop-color="#3B82F6"/>
</linearGradient>
</defs>
<g stroke="url(#gR15)" stroke-width="3.2" fill="none" stroke-linecap="round">
${SMOOTH_OUTLINE_LEFT}${SMOOTH_OUTLINE_RIGHT}${SMOOTH_FOLDS_LEFT}${SMOOTH_FOLDS_RIGHT}
</g>
<g stroke="#fff" stroke-width="1.2" fill="none" opacity="0.85">
<line x1="78" y1="80" x2="122" y2="80"/>
<line x1="78" y1="80" x2="78" y2="125"/>
<line x1="122" y1="80" x2="122" y2="125"/>
<line x1="78" y1="125" x2="122" y2="125"/>
<line x1="100" y1="62" x2="78" y2="80"/>
<line x1="100" y1="62" x2="122" y2="80"/>
<line x1="78" y1="125" x2="100" y2="138"/>
<line x1="122" y1="125" x2="100" y2="138"/>
</g>
<g fill="#fff" stroke="url(#gR15)" stroke-width="1.5">
<circle cx="100" cy="62" r="3.5"/>
<circle cx="78" cy="80" r="3.5"/>
<circle cx="122" cy="80" r="3.5"/>
<circle cx="78" cy="125" r="3.5"/>
<circle cx="122" cy="125" r="3.5"/>
<circle cx="100" cy="138" r="3.5"/>
</g>`
});

// R16 · Kintsugi × Constellation — 裂痕星象
R.push({
  id: 'R16', name: 'CrackedStars', label: 'CRACKED · STARS',
  tags: 'KINTSUGI × CONSTELLATION', color: '#F59E0B',
  body: `<path d="M65 90 Q60 60 95 55 Q130 50 140 80 Q155 100 140 130 Q130 155 95 150 Q60 145 65 115 Q55 102 65 90 Z" fill="none" stroke="#FACC15" stroke-width="3" stroke-linejoin="round"/>
<g stroke="#FACC15" stroke-width="1.6" opacity="0.85" fill="none" stroke-linecap="round">
<path d="M95 55 L92 90 L75 100 L88 120 L85 150"/>
<path d="M140 80 L120 95 L92 90"/>
<path d="M75 100 L65 115" stroke-width="1.2" opacity="0.7"/>
<path d="M120 95 L140 130" stroke-width="1.2" opacity="0.7"/>
<path d="M88 120 L120 130" stroke-width="1.2" opacity="0.7"/>
</g>
<g fill="#F59E0B">
${[[92,90,4],[120,95,4],[88,120,4],[75,100,3],[120,130,3]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/><circle cx="${x}" cy="${y}" r="${r+3.5}" fill="none" stroke="#F59E0B" stroke-width="0.8" opacity="0.4"/>`).join('')}
</g>`
});

// R17 · Kintsugi × Sample1 — 侘寂手繪
R.push({
  id: 'R17', name: 'WabiMind', label: 'WABI · MIND',
  tags: 'KINTSUGI × SAMPLE 1', color: '#FACC15',
  body: `<g stroke="#1a1a1a" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round">${SQUIGGLE_OUTLINE}</g>
<g stroke="#FACC15" stroke-width="2" opacity="0.9" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M100 60 L94 88 L78 100 L92 120 L88 145"/>
<path d="M138 92 L116 96 L94 88"/>
<path d="M78 100 L66 116" stroke-width="1.4"/>
<path d="M116 96 L132 124" stroke-width="1.4"/>
<path d="M92 120 L120 128" stroke-width="1.4"/>
</g>
<g fill="#FACC15">
<circle cx="94" cy="88" r="2.5"/>
<circle cx="116" cy="96" r="2.5"/>
<circle cx="92" cy="120" r="2.5"/>
<circle cx="78" cy="100" r="1.8"/>
<circle cx="120" cy="128" r="1.8"/>
</g>`
});

// R18 · Kintsugi × Sample2 — 鎏金漸變
R.push({
  id: 'R18', name: 'GildedBrain', label: 'GILDED · BRAIN',
  tags: 'KINTSUGI × SAMPLE 2', color: '#FACC15',
  body: `<defs>
<linearGradient id="gR18" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#0EA5E9"/><stop offset="1" stop-color="#0F766E"/>
</linearGradient>
</defs>
<g stroke="url(#gR18)" stroke-width="3.2" fill="none" stroke-linecap="round">
${SMOOTH_OUTLINE_LEFT}${SMOOTH_OUTLINE_RIGHT}${SMOOTH_FOLDS_LEFT}${SMOOTH_FOLDS_RIGHT}
</g>
<g stroke="#FACC15" stroke-width="1.6" opacity="0.95" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M100 58 L96 78 L82 92 L94 108 L86 128 L96 142"/>
<path d="M100 58 L106 80 L120 96 L108 112 L116 132 L104 142"/>
<path d="M82 92 L96 108" stroke-width="1.2" opacity="0.7"/>
</g>
<g fill="#FACC15">
<circle cx="96" cy="78" r="2"/>
<circle cx="82" cy="92" r="2"/>
<circle cx="94" cy="108" r="2"/>
<circle cx="106" cy="80" r="2"/>
<circle cx="120" cy="96" r="2"/>
<circle cx="108" cy="112" r="2"/>
</g>`
});

// R19 · Constellation × Sample1 — 手繪星座
R.push({
  id: 'R19', name: 'SketchStars', label: 'SKETCH · STARS',
  tags: 'CONSTELLATION × SAMPLE 1', color: '#0EA5E9',
  body: `<g stroke="#1a1a1a" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round">${SQUIGGLE_OUTLINE}</g>
<g>
<line x1="78" y1="78" x2="100" y2="68" stroke="#0EA5E9" stroke-width="0.9" opacity="0.45"/>
<line x1="100" y1="68" x2="122" y2="78" stroke="#0EA5E9" stroke-width="0.9" opacity="0.45"/>
<line x1="78" y1="78" x2="76" y2="118" stroke="#0EA5E9" stroke-width="0.9" opacity="0.45"/>
<line x1="122" y1="78" x2="124" y2="118" stroke="#0EA5E9" stroke-width="0.9" opacity="0.45"/>
<line x1="76" y1="118" x2="100" y2="138" stroke="#0EA5E9" stroke-width="0.9" opacity="0.45"/>
<line x1="124" y1="118" x2="100" y2="138" stroke="#0EA5E9" stroke-width="0.9" opacity="0.45"/>
<line x1="78" y1="78" x2="100" y2="100" stroke="#0EA5E9" stroke-width="0.9" opacity="0.45"/>
<line x1="122" y1="78" x2="100" y2="100" stroke="#0EA5E9" stroke-width="0.9" opacity="0.45"/>
<line x1="76" y1="118" x2="100" y2="100" stroke="#0EA5E9" stroke-width="0.9" opacity="0.45"/>
<line x1="124" y1="118" x2="100" y2="100" stroke="#0EA5E9" stroke-width="0.9" opacity="0.45"/>
${[[100,68,3],[78,78,2.5],[122,78,2.5],[76,118,2.5],[124,118,2.5],[100,138,3],[100,100,3.5]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#0EA5E9"/><circle cx="${x}" cy="${y}" r="${r+2.5}" fill="none" stroke="#0EA5E9" stroke-width="0.7" opacity="0.4"/>`).join('')}
</g>`
});

// R20 · Constellation × Sample2 — 漸變星宇
R.push({
  id: 'R20', name: 'GradientCosmos', label: 'GRADIENT · COSMOS',
  tags: 'CONSTELLATION × SAMPLE 2', color: '#F59E0B',
  body: `<defs>
<linearGradient id="gR20" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#4338CA"/><stop offset="1" stop-color="#7C3AED"/>
</linearGradient>
</defs>
<g stroke="url(#gR20)" stroke-width="3.2" fill="none" stroke-linecap="round">
${SMOOTH_OUTLINE_LEFT}${SMOOTH_OUTLINE_RIGHT}${SMOOTH_FOLDS_LEFT}${SMOOTH_FOLDS_RIGHT}
</g>
<g>
<line x1="78" y1="78" x2="100" y2="68" stroke="#F59E0B" stroke-width="0.9" opacity="0.5"/>
<line x1="100" y1="68" x2="122" y2="78" stroke="#F59E0B" stroke-width="0.9" opacity="0.5"/>
<line x1="78" y1="78" x2="78" y2="120" stroke="#F59E0B" stroke-width="0.9" opacity="0.5"/>
<line x1="122" y1="78" x2="122" y2="120" stroke="#F59E0B" stroke-width="0.9" opacity="0.5"/>
<line x1="78" y1="120" x2="100" y2="138" stroke="#F59E0B" stroke-width="0.9" opacity="0.5"/>
<line x1="122" y1="120" x2="100" y2="138" stroke="#F59E0B" stroke-width="0.9" opacity="0.5"/>
${[[100,68,2.5],[78,78,2],[122,78,2],[78,120,2],[122,120,2],[100,138,2.5],[100,100,3]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#F59E0B"/><circle cx="${x}" cy="${y}" r="${r+2.5}" fill="none" stroke="#F59E0B" stroke-width="0.6" opacity="0.5"/>`).join('')}
</g>`
});

// R21 · Sample1 × Sample2 — 雙風混血
R.push({
  id: 'R21', name: 'HybridStyle', label: 'HYBRID · STYLE',
  tags: 'SAMPLE 1 × SAMPLE 2', color: '#06B6D4',
  body: `<defs>
<linearGradient id="gR21" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#06B6D4"/><stop offset="1" stop-color="#3B82F6"/>
</linearGradient>
</defs>
<g stroke="url(#gR21)" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.35">
${SMOOTH_OUTLINE_LEFT}${SMOOTH_OUTLINE_RIGHT}${SMOOTH_FOLDS_LEFT}${SMOOTH_FOLDS_RIGHT}
</g>
<g stroke="#1a1a1a" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round">${SQUIGGLE_OUTLINE}${SQUIGGLE_INNER}</g>`
});

// R22 · Quantum × Hemisphere × Network — 三位一體
{
  let leftDots = '';
  for (let i = 0; i < 11; i++) for (let j = 0; j < 11; j++) {
    const x = 50 + i * 5, y = 55 + j * 9;
    if (x > 96) continue;
    const dx = x - 100, dy = y - 100;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > 50) continue;
    const wave = Math.cos(dist * 0.4);
    const r = 1 + (wave + 1) * 1.1;
    const op = 0.35 + (wave + 1) * 0.28;
    leftDots += `<circle cx="${x}" cy="${y}" r="${fmt(r)}" fill="#7E22CE" opacity="${op.toFixed(2)}"/>`;
  }
  R.push({
    id: 'R22', name: 'TrinityMind', label: 'TRINITY · MIND',
    tags: 'QUANTUM × HEMI × NETWORK', color: '#06B6D4',
    body: `${leftDots}
<g stroke="#06B6D4" stroke-width="1.4" fill="none" opacity="0.55">
<line x1="108" y1="60" x2="142" y2="78"/>
<line x1="142" y1="78" x2="148" y2="115"/>
<line x1="148" y1="115" x2="130" y2="142"/>
<line x1="130" y1="142" x2="110" y2="138"/>
<line x1="108" y1="60" x2="125" y2="100"/>
<line x1="142" y1="78" x2="125" y2="100"/>
<line x1="148" y1="115" x2="125" y2="100"/>
<line x1="130" y1="142" x2="125" y2="100"/>
<line x1="110" y1="138" x2="125" y2="100"/>
</g>
<g fill="#06B6D4">
<circle cx="108" cy="60" r="3"/><circle cx="142" cy="78" r="3"/>
<circle cx="148" cy="115" r="3"/><circle cx="130" cy="142" r="3"/>
<circle cx="110" cy="138" r="3"/>
<circle cx="125" cy="100" r="5"/>
<circle cx="125" cy="100" r="9" fill="none" stroke="#06B6D4" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.6"/>
</g>
<line x1="100" y1="48" x2="100" y2="156" stroke="#fff" stroke-width="1" stroke-dasharray="2 3" opacity="0.5"/>`
  });
}

// R23 · Kintsugi × Constellation × Network — 裂網星圖
R.push({
  id: 'R23', name: 'FractureWeb', label: 'FRACTURE · WEB',
  tags: 'KINTSUGI × CONSTELLATION × NET', color: '#FACC15',
  body: `<path d="M65 90 Q60 60 95 55 Q130 50 140 80 Q155 100 140 130 Q130 155 95 150 Q60 145 65 115 Q55 102 65 90 Z" fill="none" stroke="#FACC15" stroke-width="3" stroke-linejoin="round"/>
<g stroke="#FACC15" stroke-width="1.4" opacity="0.85" fill="none" stroke-linecap="round">
<line x1="95" y1="55" x2="100" y2="100"/>
<line x1="140" y1="80" x2="100" y2="100"/>
<line x1="75" y1="100" x2="100" y2="100"/>
<line x1="120" y1="130" x2="100" y2="100"/>
<line x1="88" y1="135" x2="100" y2="100"/>
<line x1="65" y1="115" x2="100" y2="100"/>
<line x1="140" y1="130" x2="100" y2="100"/>
<line x1="95" y1="55" x2="140" y2="80"/>
<line x1="75" y1="100" x2="65" y2="115"/>
<line x1="120" y1="130" x2="140" y2="130"/>
<line x1="88" y1="135" x2="120" y2="130"/>
</g>
<g fill="#FACC15">
${[[95,55,3.5],[140,80,3.5],[140,130,3.5],[120,130,3],[88,135,3],[75,100,3],[65,115,3]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/><circle cx="${x}" cy="${y}" r="${r+3}" fill="none" stroke="#FACC15" stroke-width="0.7" opacity="0.45"/>`).join('')}
<circle cx="100" cy="100" r="5.5"/>
<circle cx="100" cy="100" r="11" fill="none" stroke="#FACC15" stroke-width="0.9" stroke-dasharray="2 2" opacity="0.6"/>
</g>`
});

// R24 · Quantum × Kintsugi × Sample1 — 侘寂量子
{
  let dots = '';
  for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) {
    const x = 65 + i * 8, y = 60 + j * 9;
    if (x < 70 || x > 138 || y < 65 || y > 150) continue;
    const dx = x - 100, dy = y - 100;
    const wave = Math.cos(Math.sqrt(dx*dx + dy*dy) * 0.4);
    const r = 0.7 + (wave + 1) * 0.6;
    const op = 0.3 + (wave + 1) * 0.22;
    dots += `<circle cx="${x}" cy="${y}" r="${fmt(r)}" fill="#7E22CE" opacity="${op.toFixed(2)}"/>`;
  }
  R.push({
    id: 'R24', name: 'WabiQuanta', label: 'WABI · QUANTA',
    tags: 'QUANTUM × KINTSUGI × SAMPLE 1', color: '#FACC15',
    body: `<defs><clipPath id="clpR24"><path d="M100 52 C72 50 52 72 58 96 C46 110 56 132 76 132 C76 146 88 154 100 146 L106 158 L112 146 C132 152 148 132 138 110 C152 88 134 58 105 56 Z"/></clipPath></defs>
<g clip-path="url(#clpR24)">${dots}</g>
<g stroke="#1a1a1a" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">${SQUIGGLE_OUTLINE}</g>
<g stroke="#FACC15" stroke-width="1.8" opacity="0.95" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M100 60 L94 88 L78 100 L92 120 L88 145"/>
<path d="M138 92 L116 96 L94 88"/>
<path d="M78 100 L66 116" stroke-width="1.2"/>
<path d="M92 120 L120 128" stroke-width="1.2"/>
</g>
<g fill="#FACC15">
<circle cx="94" cy="88" r="2.2"/><circle cx="116" cy="96" r="2.2"/><circle cx="92" cy="120" r="2.2"/>
</g>`
  });
}

// ============================================================
// Build SVG files
// ============================================================

function fullSvg(d) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
<rect width="200" height="200" fill="#FAFAFA"/>
${d.body}
<text x="100" y="190" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="2" fill="${d.color}">${d.label}</text>
</svg>`;
}

for (const d of D) {
  const file = path.join(OUT_DIR, `logo_${d.id}_${d.name}.svg`);
  fs.writeFileSync(file, fullSvg(d));
}

for (const d of R) {
  const file = path.join(REMIX_DIR, `remix_${d.id}_${d.name}.svg`);
  fs.writeFileSync(file, fullSvg(d));
}

// ============================================================
// Build index.html
// ============================================================

const cards = D.map(d => `
      <div class="card" id="card-${d.id}" style="--brand:${d.color};">
        <div class="card-id">ID · ${d.id}</div>
        <div class="svg-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            ${d.body}
          </svg>
        </div>
        <div class="card-label">${d.label}</div>
      </div>`).join('');

const remixCards = R.map(d => `
      <div class="card remix" id="card-${d.id}" style="--brand:${d.color};">
        <div class="card-id">${d.id}　·　<span class="tag">${d.tags}</span></div>
        <div class="svg-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            ${d.body}
          </svg>
        </div>
        <div class="card-label">${d.label}</div>
      </div>`).join('');

const html = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Brand Logo Studio · 30 款心智擴張系列</title>
    <style>
      :root {
        --bg: #0e0f12;
        --panel: #15171c;
        --panel-2: #1c1f26;
        --line: #2a2d36;
        --text: #e7e9ee;
        --muted: #8b909d;
      }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      body {
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang TC", "Noto Sans TC", sans-serif;
        background: radial-gradient(1200px 800px at 80% -10%, #1a1d27 0%, var(--bg) 60%);
        color: var(--text);
        min-height: 100vh;
        -webkit-font-smoothing: antialiased;
      }
      .wrap { max-width: 1280px; margin: 0 auto; padding: 80px 32px 120px; }

      header { margin-bottom: 64px; }
      .eyebrow {
        font-size: 12px; letter-spacing: 4px; text-transform: uppercase;
        color: var(--muted); margin-bottom: 18px;
      }
      h1 {
        font-size: clamp(34px, 5vw, 56px); margin: 0 0 18px;
        font-weight: 800; letter-spacing: -0.02em; line-height: 1.05;
      }
      h1 span {
        background: linear-gradient(90deg,#ff6a88,#ffb347,#7afcff,#a3a1ff);
        -webkit-background-clip: text; background-clip: text; color: transparent;
      }
      .lede { color: var(--muted); font-size: 16px; max-width: 720px; line-height: 1.65; }

      h2 {
        font-size: 13px; letter-spacing: 5px; text-transform: uppercase;
        color: var(--muted); font-weight: 600; margin: 0 0 28px;
        padding-bottom: 16px; border-bottom: 1px solid var(--line);
      }

      section { margin-top: 72px; }

      .samples { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 24px; max-width: 720px; }
      .sample {
        background: var(--panel); border: 1px solid var(--line); border-radius: 16px;
        padding: 22px; transition: transform .25s ease, border-color .25s ease;
      }
      .sample:hover { transform: translateY(-3px); border-color: #3d4150; }
      .sample img { width: 100%; aspect-ratio: 1; object-fit: contain; background:#fff; border-radius: 10px; display:block; }
      .sample-cap { margin-top: 14px; font-size: 13px; color: var(--muted); display:flex; justify-content: space-between; }

      .grid {
        display: grid; gap: 22px;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      }
      .card {
        position: relative;
        background: var(--panel); border: 1px solid var(--line); border-radius: 16px;
        padding: 22px 22px 18px; overflow: hidden;
        transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
      }
      .card::before {
        content: ""; position: absolute; inset: 0; pointer-events: none;
        background: radial-gradient(180px 90px at 50% -30%, color-mix(in srgb, var(--brand) 35%, transparent) 0%, transparent 70%);
        opacity: .55; transition: opacity .3s ease;
      }
      .card:hover { transform: translateY(-4px); border-color: var(--brand); box-shadow: 0 16px 40px -20px color-mix(in srgb, var(--brand) 70%, black); }
      .card:hover::before { opacity: .9; }
      .card-id { font-size: 11px; letter-spacing: 2px; color: var(--muted); font-family: ui-monospace, "JetBrains Mono", Menlo, monospace; }
      .svg-wrap { aspect-ratio: 1; margin: 14px 0 10px; display:flex; align-items:center; justify-content:center; background: #fff; border-radius: 12px; }
      .svg-wrap svg { width: 78%; height: 78%; }
      .card-label { font-size: 14px; font-weight: 700; letter-spacing: 3px; color: var(--brand); text-align: center; margin-top: 4px; }
      .card.remix .card-id { display:flex; gap:6px; align-items:center; }
      .card.remix .tag { color: var(--brand); font-weight: 600; opacity: 0.85; }

      .section-intro { color: var(--muted); margin: -16px 0 32px; font-size: 14px; line-height: 1.7; max-width: 780px; }

      footer { margin-top: 96px; padding-top: 24px; border-top: 1px solid var(--line); color: var(--muted); font-size: 12px; display: flex; justify-content: space-between; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <header>
        <div class="eyebrow">Brand Logo Studio · Cognition Series</div>
        <h1>多線條<span>思維擴張</span><br/>心理學大腦標誌系列</h1>
        <p class="lede">
          以心智、潛意識、神經連結與思維擴張為核心概念，30 款手工繪製的向量品牌標誌。
          每一款使用獨立色彩語言，透過多層線條的組合構築深度寓意 —— 從突觸放射、皮層摺紋、星座連結到金繕裂痕。
        </p>
      </header>

      <section>
        <h2>Original Samples · 原始樣本參考</h2>
        <div class="samples">
          <div class="sample">
            <img src="/sample_logo1.jpg" alt="Sample 1" />
            <div class="sample-cap"><span>Sample 01</span><span>線描風格</span></div>
          </div>
          <div class="sample">
            <img src="/sample_logo2.jpg" alt="Sample 2" />
            <div class="sample-cap"><span>Sample 02</span><span>漸變現代</span></div>
          </div>
        </div>
      </section>

      <section>
        <h2>30 Hand-crafted Logos · 心智系列</h2>
        <div class="grid">${cards}
        </div>
      </section>

      <section>
        <h2>Remix · 組合系列 (24 款)</h2>
        <p class="section-intro">
          挑出最有味道的五個元素 — Quantum 量子干涉、Hemisphere 雙腦、Network 圖譜、Kintsugi 金繕、Constellation 星座 — 加上原始兩款樣本（手繪線描 / 漸變現代），交叉混搭出 24 款組合品牌標誌。
          雙元素融合佔 21 款、三元素堆疊 3 款，每張視覺都試圖讓兩種思維語言彼此對話。
        </p>
        <div class="grid">${remixCards}
        </div>
      </section>

      <footer>
        <span>© Brand Logo Studio</span>
        <span>30 main · 24 remix · SVG · vector</span>
      </footer>
    </div>
  </body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), html);

console.log(`✓ wrote ${D.length} main SVGs to ${OUT_DIR}`);
console.log(`✓ wrote ${R.length} remix SVGs to ${REMIX_DIR}`);
console.log(`✓ wrote index.html`);
