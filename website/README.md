# BITree 理枝 · 官方网站

[bitoolkit/BITree](https://github.com/bitoolkit/BITree) 的项目官网，基于
[Astro](https://astro.build) + TypeScript + 原生 CSS 构建，静态输出，部署于 GitHub Pages。

- 线上地址：<https://bitoolkit.github.io/bitree-homepage/>
- 页面：首页 `/` · 功能 `/features/` · 下载 `/download/` · 使用帮助 `/help/`

## 开发

```sh
cd website
npm install
npm run dev      # http://localhost:4321
npm run build    # 产物输出到 dist/
npm run preview  # 本地预览构建产物（含 base 子路径）
npm run og       # 重新生成 public/og.png（仅在分享图设计变化时需要）
```

## 部署

推送到 `main` 分支且 `website/**` 或工作流文件有变化时，
[`.github/workflows/website.yml`](../.github/workflows/website.yml) 会自动构建并部署到
GitHub Pages（也可手动触发）。仓库 Settings → Pages 需选择 **GitHub Actions** 作为部署来源。

### 部署到 BITree 仓库（可选）

若日后把本目录并入 `bitoolkit/BITree` 仓库（作为 `website/` 目录）并从该仓库部署，
只需两步：

1. 把 `.github/workflows/website.yml` 一并复制过去（`website/` 路径无需改动）；
2. 将 `astro.config.mjs` 中的 `base` 从 `'/bitree-homepage'` 改为 `'/BITree'`。

站内所有链接和资源引用都基于 `import.meta.env.BASE_URL` 生成，不需要改动任何页面。

## 内容维护约定

### 文案事实来源

所有功能描述、下载格式、隐私表述均以
[BITree README](https://github.com/bitoolkit/BITree#readme) 与
`docs/architecture.md`、`docs/ui-design.md` 为准，改动功能时同步更新：

- 外链与平台定义集中在 [`src/config.ts`](src/config.ts)（仓库地址、Releases、Issues、
  各平台安装包格式与说明）；
- 安全与隐私说明须先拉取应用最新源码，再核对实际实现；已核对提交、事实和来源链接维护在 [`src/data/privacy.ts`](src/data/privacy.ts)，详细证据与限制见 [`docs/privacy-evidence.md`](docs/privacy-evidence.md)。不能把“本地优先”扩大为“完全不联网、没有任何第三方登录、所有数据均加密”的承诺；
- 应用内配色（楼宇 / 日程来源）定义在 `src/styles/global.css` 的 `--bld-*`、`--src-*`，
  与应用 `tool/building_palette.py` 生成的调色板对应，改配色请两边同步。

### 下载架构与失败处理

下载页**不硬编码任何版本号或下载地址**，行为如下：

1. 服务端渲染的按钮默认链接到 GitHub Releases 页面——即使 JavaScript 不可用也能下载；
2. 页面加载后请求 `releases/latest` 与 `releases?per_page=20`（GitHub 公开 API，
   8 秒超时，sessionStorage 缓存 10 分钟），按文件名模式匹配各平台安装包
   （Android `arm64-v8a.apk`、Windows `x64*.exe`、macOS `universal*.zip`、
   Linux `x64|arm64.tar.xz`、iOS `arm64*.ipa`），把按钮替换为真实下载地址，
   并显示版本号、发布日期与文件大小；
3. 最新预发布版（测试版）从 releases 列表识别，单独入口并标注「可能不稳定」；
4. API 失败（网络 / 限流）时保持默认 Releases 链接并显示提示条；
   `<noscript>` 场景同样给出 Releases 引导。

### 用真实截图替换示意界面

仓库当前没有应用截图，站内使用 HTML/CSS 绘制的**示意界面**（均已标注「界面示意」）。
`DevicePreview` 组件是接入截图的唯一入口：

```astro
<!-- 之前（示意界面） -->
<DevicePreview variant="window">
  <MockTimetable />
</DevicePreview>

<!-- 之后（真实截图）：把截图放到 src/assets/screens/ 下 -->
<DevicePreview variant="window" screenshot={timetableImg} alt="课表 · 周视图" />
```

传入 `screenshot` 后组件自动渲染 `<img loading="lazy">` 并隐藏「界面示意」标记。
推荐截图规格：桌面端 16:10、手机端 9:19.5，浅色深色各一套（深色可用 `darkScreenshot`
自行扩展）。替换位置集中在：

| 截图 | 使用处 |
| --- | --- |
| 课表 | 首页 Hero、Bento、Showcase、功能页 |
| 日程时间轴 | 首页 Hero（手机）、Bento、Showcase、功能页 |
| 成绩 / 试算 / 学分 | Showcase、功能页 |
| 空教室 / 考试 | Bento、Showcase、功能页 |
| 小组件 | 跨平台区、功能页 |

## 目录结构

```
website/
├── public/            # favicon.svg（项目真实 logo）、og.png、robots.txt
├── scripts/
│   └── generate-og.mjs
└── src/
    ├── config.ts      # 外链、平台与下载匹配规则（单一事实来源）
    ├── layouts/Base.astro
    ├── styles/        # global.css（设计令牌与主题）、mock.css（示意界面）
    ├── components/
    │   ├── Header / Footer / ThemeToggle / Icon
    │   ├── Hero / FeatureBento / Showcase / Platforms / Privacy / CTA
    │   ├── DevicePreview.astro   # 设备框架 + 截图接入点
    │   └── mocks/                # 各功能示意界面（HTML/CSS 绘制）
    └── pages/          # index / features / download / help
```
