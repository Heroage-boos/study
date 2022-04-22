import { createApp } from "vue";
// import { ElButton } from 'element-plus'
import App from "./App.vue";
import router from "./route/index";

const app = createApp(App);
// app.config.globalProperties.$ELEMENT = {
//   // options
// }
// app.use(ElButton)
app.use(router);
app.mount("#app");
