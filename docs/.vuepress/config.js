// const { description } = require('../../package')
const { fs, path } = require('@vuepress/shared-utils')

module.exports = {
  title: 'Demo Taudefi Docs',
  description: "VUE EXPRESS",
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  theme: '@vuepress/vue',
  themeConfig: {
    nav: require('./nav/nav'),
    smoothScroll: true,
    sidebar: {
      '/guide/': getGuideSidebar('Guide', 'Advanced'),
      '/api/': getApiSidebar(),
      '/plugin/': getPluginSidebar('Plugin', 'Introduction', 'Official Plugins'),
      '/theme/': getThemeSidebar('Theme', 'Introduction')
    }
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/google-analytics', {
      ga: 'UA-128189152-1'
    }],
    ['container', {
      type: 'vue',
      before: '<pre class="vue-container"><code>',
      after: '</code></pre>'
    }],
    ['container', {
      type: 'upgrade',
      before: info => `<UpgradePath title="${info}">`,
      after: '</UpgradePath>'
    }],
    ['flowchart']
  ]
}


function getApiSidebar() {
  return [
    'cli',
    'node'
  ]
}

function getGuideSidebar(groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'directory-structure',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'i18n',
        'deploy'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'frontmatter',
        'permalinks',
        'markdown-slot',
        'global-computed'
      ]
    }
  ]
}


function officalPlugins() {
  return fs
    .readdirSync(path.resolve(__dirname, '../plugin/official'))
    .map(filename => 'official/' + filename.slice(0, -3))
    .sort();
}

function getPluginSidebar(pluginTitle, pluginIntro, officialPluginTitle) {
  const sidebarItems = [
    {
      title: pluginTitle,
      collapsable: false,
      children: [
        ['', pluginIntro],
        'using-a-plugin',
        'writing-a-plugin',
        'life-cycle',
        'option-api',
        'context-api'
      ]
    },
    {
      title: officialPluginTitle,
      collapsable: false,
      children: officalPlugins()
    }
  ];
  console.log(JSON.stringify(sidebarItems));
  return sidebarItems;
}


function getThemeSidebar(groupA, introductionA) {
  return [
    {
      title: groupA,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        ['', introductionA],
        'using-a-theme',
        'writing-a-theme',
        'option-api',
        'default-theme-config',
        'blog-theme',
        'inheritance'
      ]
    }
  ]
}
