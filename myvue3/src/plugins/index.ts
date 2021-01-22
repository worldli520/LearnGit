import routor from '@/router'
import store from '@/store'
import { App, Plugin } from 'vue';

const plugins: Plugin[] = [routor, store]

const usePlugins = (app: App) => {
  plugins.forEach(app.use, app)
}

export default usePlugins