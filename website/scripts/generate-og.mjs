// 生成 Open Graph 分享预览图（1200×630 PNG）。
// 运行：npm run og  → 输出 public/og.png（产物直接提交，CI 不重复生成）。
// Logo 使用项目真实图标 public/favicon.svg。
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const W = 1200;
const H = 630;

const bg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="0.82" cy="0.1" r="0.75">
      <stop offset="0%" stop-color="#e7f3ec"/>
      <stop offset="60%" stop-color="#fbfbf7"/>
      <stop offset="100%" stop-color="#fbfbf7"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- 抽象枝线（与首页 Hero 呼应） -->
  <g stroke="#2c7a57" fill="none" stroke-linecap="round" opacity="0.2">
    <path d="M880 620 C 940 520, 900 430, 990 370 C 1050 328, 1080 280, 1096 210" stroke-width="2.4"/>
    <path d="M950 500 C 1010 492, 1050 460, 1082 452" stroke-width="1.8"/>
    <path d="M1096 210 C 1120 170, 1156 156, 1190 166" stroke-width="1.8"/>
    <path d="M1096 210 C 1086 164, 1096 120, 1126 86" stroke-width="1.8"/>
  </g>
  <g fill="#2c7a57" opacity="0.3">
    <circle cx="1096" cy="210" r="6"/>
    <circle cx="1190" cy="166" r="5"/>
    <circle cx="1126" cy="86" r="5.5"/>
    <circle cx="1082" cy="452" r="4.5"/>
    <circle cx="880" cy="620" r="5"/>
  </g>

  <!-- 标题区 -->
  <g font-family="Noto Sans CJK SC, sans-serif" fill="#1d241f">
    <text x="96" y="316" font-size="76" font-weight="700" letter-spacing="1">BITree 理枝</text>
    <text x="98" y="382" font-size="30" font-weight="500" fill="#57615a">面向北京理工大学的本地跨平台工具集</text>
    <text x="98" y="448" font-size="26" font-weight="500" fill="#2c7a57">课表 · 日程与 DDL · 成绩绩点 · 空教室 · 考试安排</text>
  </g>

  <!-- 底部标签 -->
  <g font-family="Noto Sans CJK SC, sans-serif" font-size="22" font-weight="500">
    <g>
      <rect x="96" y="500" width="118" height="44" rx="22" fill="none" stroke="#bfe0cf"/>
      <text x="155" y="529" text-anchor="middle" fill="#57615a">跨平台</text>
    </g>
    <g>
      <rect x="228" y="500" width="98" height="44" rx="22" fill="none" stroke="#bfe0cf"/>
      <text x="277" y="529" text-anchor="middle" fill="#57615a">开源</text>
    </g>
    <g>
      <rect x="340" y="500" width="134" height="44" rx="22" fill="none" stroke="#bfe0cf"/>
      <text x="407" y="529" text-anchor="middle" fill="#57615a">本地优先</text>
    </g>
  </g>

  <text x="96" y="580" font-family="Noto Sans CJK SC, sans-serif" font-size="19" fill="#8b948d">
    bitoolkit · Android / Windows / macOS / Linux / iOS
  </text>
</svg>`;

const logo = await sharp(join(root, 'public/favicon.svg'))
  .resize(150, 150)
  .png()
  .toBuffer();

const image = await sharp(Buffer.from(bg))
  .composite([{ input: logo, left: 92, top: 82 }])
  .png({ compressionLevel: 9 })
  .toFile(join(root, 'public/og.png'));

console.log(`og.png generated: ${image.width}×${image.height}, ${(image.size / 1024).toFixed(1)} KB`);
