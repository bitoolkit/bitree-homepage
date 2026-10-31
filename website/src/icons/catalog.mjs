// Iconify 开源图标目录：只映射官方图标，不维护手绘 SVG 路径。
// 通用图标：Lucide (ISC)；平台标识：Simple Icons (CC0) / Tabler (MIT)。
// 授权与来源见 website/THIRD_PARTY_NOTICES.md。
export const icons = Object.freeze({
  github: 'simple-icons:github',
  download: 'lucide:download',
  'arrow-right': 'lucide:arrow-right',
  external: 'lucide:external-link',
  sun: 'lucide:sun',
  moon: 'lucide:moon',
  auto: 'lucide:sun-moon',
  menu: 'lucide:menu',
  close: 'lucide:x',
  'chevron-down': 'lucide:chevron-down',
  'chevron-left': 'lucide:chevron-left',
  'chevron-right': 'lucide:chevron-right',
  check: 'lucide:check',
  lock: 'lucide:lock-keyhole',
  phone: 'lucide:smartphone',
  laptop: 'lucide:laptop',
  calendar: 'lucide:calendar-days',
  clock: 'lucide:clock-3',
  chart: 'lucide:chart-no-axes-column-increasing',
  door: 'lucide:door-open',
  alert: 'lucide:triangle-alert',
  sync: 'lucide:refresh-cw',
  widget: 'lucide:panels-top-left',
  offline: 'lucide:cloud-off',
  theme: 'lucide:contrast',
  android: 'simple-icons:android',
  windows: 'tabler:brand-windows',
  apple: 'simple-icons:apple',
  macos: 'simple-icons:apple',
  linux: 'simple-icons:linux',
  ios: 'simple-icons:apple',
  leaf: 'lucide:leaf',
  branch: 'lucide:git-branch',
  'sort-schedule': 'lucide:arrow-down-up',
  'sort-grades': 'lucide:arrow-up-wide-narrow',
  'trending-up': 'lucide:trending-up',
});

// 组件与构建配置共用一份目录，避免动态名称漏打包或引入整套图标。
export const iconSets = {};
for (const name of new Set(Object.values(icons))) {
  const [collection, icon] = name.split(':');
  (iconSets[collection] ??= []).push(icon);
}
