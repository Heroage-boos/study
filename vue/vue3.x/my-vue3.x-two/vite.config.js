import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// 按需引入elment-puls
import Components from "unplugin-vue-components/vite";
import ElementPlus from "unplugin-element-plus/vite";
import styleImport from "vite-plugin-style-import";
import ViteComponents, { ElementPlusResolver } from "vite-plugin-components";

//配置使用@访问src下面目录
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "components": path.resolve(__dirname, "src/components"),
        "assets": path.resolve(__dirname, "src/assets"),
        "plugins": path.resolve(__dirname, "src/plugins"),
        "view": path.resolve(__dirname, "src/view"),
        "layouts": path.resolve(__dirname, "src/layouts"),
        "utils": path.resolve(__dirname, "src/utils"),
      },
    },
    plugins: [
      vue(),
      //按需导入element-plus组件
      ViteComponents({
        customComponentResolvers: [ElementPlusResolver()],
      }),
      //按需导入element-plus的css样式
      styleImport({
        libs: [
          {
            libraryName: "element-plus",
            esModule: true,
            resolveStyle: (name) => {
              return `element-plus/lib/theme-chalk/${name}.css`;
            },
          },
        ],
      }),
      ElementPlus(),
    ],
    base: env.VITE_RES_URL,
    server: {
      port: 8081,
      // open: env.VITE_RES_URL,
      proxy: {
        "/api": {
          target: "http://127.0.0.1",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
