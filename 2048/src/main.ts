import { createApp } from 'vue'
import App from './App.vue'
import usePlugins from '@/plugins';
import 'animate.css'
// import router from './router'
// import store from './store'

// createApp(App).use(store).use(router).mount('#app')

const app = createApp(App)
// console.log(app.config);
const win: any = window
if (process.env.NODE_ENV === 'development') {
  if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in win) {
    // 这里__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue赋值一个createApp实例
    win.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
  }
}

usePlugins(app)

app.mount('#app')

