// BITree 官网构建配置。
//
// 本仓库（bitree-homepage）部署到 GitHub Pages 后的地址是
//   https://bitoolkit.github.io/bitree-homepage/
// 因此 base 默认为 '/bitree-homepage'。
//
// 如果日后把 website/ 目录并入 bitoolkit/BITree 仓库并从该仓库部署 Pages，
// 只需把 base 改为 '/BITree'——站内所有链接和资源都基于
// import.meta.env.BASE_URL 生成，无需改动任何页面。
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { iconSets } from './src/icons/catalog.mjs';

export default defineConfig({
  site: 'https://bitoolkit.github.io',
  base: '/bitree-homepage',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap(), icon({ include: iconSets })],
});
