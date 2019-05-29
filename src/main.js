// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueLazyLoad from 'vue-lazyload'
import Vuex from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(VueAwesomeSwiper)
Vue.use(infiniteScroll)
Vue.use(Vuex)
Vue.use(VueLazyLoad, {
    loading: "/static/loading/loading-cylon.svg"
})
Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
        nickName: '',
        cartCount: 0,
        userId: '',
        adminNames: ''
    },
    mutations: {
        initCartCount(state, cartCount) {
            state.cartCount = cartCount;
        },
        updateUserInfo(state, nickName) {
            state.nickName = nickName;
        },
        updateCartCount(state, cartCount) {
            state.cartCount += cartCount;
        },
        updateUserId(state, userId) {
            state.userId = userId;
        },
        updateAdminName(state, adminNames) {
            state.adminNames = adminNames;
        }
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (store.state.adminNames) { // 通过vuex state获取当前的token是否存在
            next();
        } else {
            next({
                path: '/admin'
            })
        }
    } else {
        next();
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
});