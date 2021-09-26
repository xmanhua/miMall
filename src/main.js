import Vue from 'vue'
import router from './router'
import axios from 'axios'//ie11>不支持
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store' //index.js可以不用写，store文件夹下默认index.js
import App from './App.vue'
// import env from './env'

// mock开关
const mock = false;//关闭：false
if (mock) {
    require('./mock/api');
}

//根据前端的跨域方式做调整,将代理的方式:/api , 例/a/b: /api/a/b => /a/b, 转发时api会自动去掉
axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = '/miMall/dist/api';//git hubs
//超时８秒
axios.defaults.timeout = 8000;

//根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;

//接口错误拦截
axios.interceptors.response.use(function (response) {
    let res = response.data;
    let path = location.hash;//如：/#/index就是hash哈西路由
    if (res.status == 0) {
        return res.data;
    } else if (res.status == 10) {
        if (path != '#/index') {
            window.location.href = '/#/login';
        }
        return Promise.rejece(res);//抛出去，不会进到成功里面
    } else {
        Message.warning(res.msg);
        return Promise.rejece(res);//抛异常，不会进到成功里面
    }
},(error) => {
   let res = error.response;
   Message.error(res.data.message);
   return Promise.rejece(error);//抛异常，不会进到成功里面
});
Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad, {
    loading: '/miMall/dist/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message = Message;
Vue.config.productionTip = false//生产环境下的提示

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')