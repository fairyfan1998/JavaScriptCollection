import { defineUserConfig } from '@vuepress/cli'
import { getDirname, path } from '@vuepress/utils'
import { viteBundler } from '@vuepress/bundler-vite'
import { hopeTheme } from 'vuepress-theme-hope'
import {
  JSCHeaders,
  getCopyRightText,
  getFooterHtml,
  getSiteBase,
  getThemeConfig,
  getViteBundler,
} from '@142vip/vuepress'
import pkg from './package.json'
import { themeConfig } from './docs/.vuepress/theme/theme'
import navbar from './docs/.vuepress/theme/navbar'
import sidebar from './docs/.vuepress/theme/sidebar'

// 当前目录名
const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  base: getSiteBase(),
  title: '凡是过往、皆为序章',
  description: pkg.description,
  port: 5000,
  head: JSCHeaders,
  source: '',
  markdown: {
    // todo 引入代码文件时的路径替换 https://vuejs.press/zh/guide/markdown.html#%E5%AF%BC%E5%85%A5%E4%BB%A3%E7%A0%81%E5%9D%97
    importCode: {
      handleImportPath: (str) => {
        if (str.includes('@code')) {
          return str.replace(/^@code/, path.resolve(__dirname, 'code/'))
        }
        if (str.includes('@algorithm')) {
          return str.replace(/^@algorithm/, path.resolve(__dirname, 'code/algorithm/'))
        }
        if (str.includes('~')) {
          return str.replace(/^~/, path.resolve(__dirname, ''))
        }
        return str
      },
    },
    // md doc formatter  headerDepth
    headers: {
      level: [2, 3, 4],
    },
  },
  // 主题配置
  ...themeConfig,
  theme: hopeTheme(getThemeConfig({
    // 导航栏
    navbar,
    // 侧边栏
    sidebar,
    // 页脚
    footer: getFooterHtml({
      name: pkg.name,
      version: pkg.version,
    }),
    // 版权
    copyright: getCopyRightText(pkg.authorInfo.name),
    // 仓库
    repo: '142vip/JavaScriptCollection',
    repoLabel: 'GitHub',

    // 作者信息
    author: pkg.authorInfo,

    // 文档路径，开启编辑功能
    // docsDir: 'docs',
    // docsBranch: 'next',
    // // 主题布局选项
    // docsRepo: RepoAddress,
  })),
  // 编译
  bundler: viteBundler(getViteBundler()),
  shouldPrefetch: false,
})
