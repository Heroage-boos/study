// ref: https://umijs.org/config/
const HOST_URL = 'http://localhost:8000/';

export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/about', component: './about/index' },
        { path: '/home', component: './home/index' },
        { path: '/address', component: './address/index' },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'umiJs',
        dll: true,
        locale: {
          enable: true,
          default: 'en-US',
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  proxy: {
    '/api': {
      target: HOST_URL,
      changeOrigin: true,
      pathRewrite: { '/api': '' },
    },
  },
  theme: {
    'primary-color': '#3385ff',
    'font-size-base': '14px',
  },
  alias: {
    '@': require('path').resolve(__dirname, './src'),
    '@components': require('path').resolve(__dirname, './src/components'),
    '@services': require('path').resolve(__dirname, './src/services'),
    '@mock': require('path').resolve(__dirname, './mock'),
    '@utils': require('path').resolve(__dirname, './src/utils'),
  },
};
