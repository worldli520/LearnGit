import { createApp } from 'vue'
import App from './App.vue'
import usePlugins from '@/plugins';
// import router from './router'
// import store from './store'

// createApp(App).use(store).use(router).mount('#app')

const app = createApp(App)

usePlugins(app)

app.mount('#app')

