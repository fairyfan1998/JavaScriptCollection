import navbar from "./navbar";
import sidebar from "./sidebar";
import {AUTHOR_INFO, COPYRIGHT, FOOTER_HTML_INFO} from "./constant.config";
import {hopeTheme} from "vuepress-theme-hope";
import {langConfig} from "./lang.config";
import {path} from "@vuepress/utils";

/**
 * 主题相关配置
 * 参考主题：https://theme-hope.vuejs.press/zh/config/intro.html#%E9%85%8D%E7%BD%AE%E6%A6%82%E5%BF%B5
 */
export default {
  theme: hopeTheme({
    locales: langConfig,
    navbarIcon: false,
    darkmode: "toggle",
    // 支持全屏
    fullscreen: true,
    // 纯净模式
    // pure: true,
    print: false, // 打印按钮
    hostname: 'https://142vip.cn',
    author: AUTHOR_INFO,
    favicon: "/favicon.ico",
    // logo: "/assets/408_logo.png",
    navbar: navbar,
    // 导航栏布局
    navbarLayout: {
      start: ["Brand"],
      center: ["Links"],
      end: ["Search", "Language", "Repo", "Outlook",]
    },
    sidebar: sidebar,

    pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],
    // 主题布局选项
    docsRepo: "https://github.com/142vip/JavaScriptCollection",
    docsDir: "docs",
    docsBranch: "master",
    repo: "https://github.com/142vip/JavaScriptCollection.git",

    // 博客配置
    // blog: {
    //     name: '测试',
    //     avatar: '',
    //     description: '',
    //     intro: '',
    //     roundAvatar: true,
    //     timeline: "时间轴的顶部文字",
    //     // articleInfo: "",
    //     medias: {
    //         "BiliBili": "https://space.bilibili.com/350937042?spm_id_from=333.1007.0.0"
    //     }
    // },
    // 设置页脚
    displayFooter: true,
    footer: FOOTER_HTML_INFO,
    copyright: COPYRIGHT,

    // 主题色选择器
    themeColor: true,

    plugins: {
      // comment:{
      //   provider: "Artalk",
      //   server:"https://test.142vip.cn/",
      //   site:'JavaScriptCollection',
      // },
      readingTime: {
        wordPerMinute: 100
      },
      copyright: false,
      // 开启博客功能
      blog: false,
      // 代码块
      mdEnhance: {
        card:true,
        codetabs: true,
        tasklist: true, // 支持任务列表
        // 启用 figure
        figure: true,
        // 启用图片懒加载
        imgLazyload: true,
        // 启用图片标记
        imgMark: true,
        // 启用图片大小
        imgSize: true,
        playground: {
          presets: ["ts", "vue"],
        },
        revealjs: ["highlight", "math", "search", "notes", "zoom"],
        stylize: [
          {
            matcher: "Recommended",
            replacer: ({tag}) => {
              if (tag === "em")
                return {
                  tag: "Badge",
                  attrs: {type: "tip"},
                  content: "Recommended",
                };
            },
          },
        ],
        sub: true,
        sup: true,
        tabs: true,
        vPre: true,
        vuePlayground: true,
        // 文件导入
        include: true,
        // 容器
        container: true,
        // mermaid
        mermaid: true,
        // 自定义对齐
        align: true,
      },
      copyCode: {
        showInMobile: true
      },
      // 不自动生成readme目录
      autoCatalog: false,
      // 参考：https://theme-hope.vuejs.press/zh/guide/markdown/components.html
      components: {
        components: [
          "AudioPlayer",
          "Badge",
          "BiliBili",
          "CodePen",
          "PDF",
          "Replit",
          "StackBlitz",
          "VideoPlayer",
          "YouTube",
          "Share",
          "XiGua"
        ],
        rootComponents: {
          // 公告 参考：https://plugin-components.vuejs.press/zh/guide/notice.html
          // notice: [
          //     {
          //         path: "/",
          //         title: "在线浏览",
          //         content: "网站无法访问时，建议通过科学上网访问备用网络",
          //         actions: [
          //             {
          //                 text: "尝鲜版",
          //                 link: "https://142vip.github.io/JavaScriptCollection",
          //                 type: "default",
          //             },
          //             {
          //                 text: "稳定版",
          //                 link: "https://code.142vip.cn",
          //                 type: "primary",
          //             },
          //         ],
          //         fullscreen: false,
          //     },
          // ],
        },
      },
    }
  })
}