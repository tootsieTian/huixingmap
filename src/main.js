import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AMap from 'vue-amap'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "normalize.css"
Vue.use(AMap);
Vue.use(ElementUI);
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '你的key',
  // 插件集合 （插件按需引入）
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.GraspRoad'
  ],

// 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
