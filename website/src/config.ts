// 站点级常量：所有外链与文案事实统一在此维护，来源为
// bitoolkit/BITree 仓库 README 与 Releases，勿凭记忆改写。

/** 站点子路径，保证带尾斜杠（'/bitree-homepage/'），内链与静态资源统一用它拼接。 */
export const BASE: string = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export const SITE = {
  name: 'BITree 理枝',
  org: 'BIToolkit',
  tagline: '面向北京理工大学的本地跨平台工具集',
  description:
    'BITree 理枝，为北京理工大学同学打造的跨平台校园工具。课表、DDL、成绩与日程，一处管理。',
};

export const REPO = 'https://github.com/bitoolkit/BITree';

export const LINKS = {
  repo: REPO,
  org: 'https://github.com/bitoolkit',
  releases: `${REPO}/releases`,
  releasesLatest: `${REPO}/releases/latest`,
  releasesPrerelease: `${REPO}/releases?q=prerelease%3Atrue`,
  issues: `${REPO}/issues`,
  newIssue: `${REPO}/issues/new`,
  license: `${REPO}/blob/main/LICENSE`,
  // 绩点计算规则（README 引用的学校页面）
  gpaRule: 'https://soe.bit.edu.cn/rcpy/bk/ffa622a7030b45bdadf33415bdffa364.htm',
} as const;

/** Releases API，下载页运行时使用；失败时回退到 releases 页面。 */
export const API = {
  latest: 'https://api.github.com/repos/bitoolkit/BITree/releases/latest',
  list: 'https://api.github.com/repos/bitoolkit/BITree/releases?per_page=20',
} as const;

/** 平台定义：图标、安装包格式与安装说明（与 README 下载表一致）。 */
export type PlatformId = 'android' | 'windows' | 'macos' | 'linux' | 'ios';

export const PLATFORMS: {
  id: PlatformId;
  name: string;
  arch: string;
  format: string;
  note: string;
  /** 在 release assets 中匹配安装包的规则 */
  match: RegExp;
}[] = [
  {
    id: 'android',
    name: 'Android',
    arch: 'arm64-v8a',
    format: 'APK 安装包',
    note: '下载后直接安装；桌面小组件可在桌面长按添加。',
    match: /-android-arm64-v8a\.apk$/i,
  },
  {
    id: 'windows',
    name: 'Windows',
    arch: 'x64',
    format: 'EXE 安装包',
    note: '安装包已包含运行依赖，按向导安装即可。',
    match: /-windows-x64.*\.exe$/i,
  },
  {
    id: 'macos',
    name: 'macOS',
    arch: '通用（Intel / Apple 芯片）',
    format: 'ZIP 压缩包',
    note: '当前版本未签名：解压后首次打开需在「系统设置 → 隐私与安全性」中点击「仍要打开」。',
    match: /-macos-universal.*\.zip$/i,
  },
  {
    id: 'linux',
    name: 'Linux',
    arch: 'x64 / aarch64',
    format: 'tar.xz 压缩包',
    note: '解压后运行目录中的 bitree 即可，无需安装。',
    match: /-linux-(x64|arm64)\.tar\.xz$/i,
  },
  {
    id: 'ios',
    name: 'iOS',
    arch: 'arm64',
    format: 'IPA（未签名）',
    note: '需自行签名后安装：使用自签工具或开发者证书侧载。',
    match: /-ios-arm64.*\.ipa$/i,
  },
];
