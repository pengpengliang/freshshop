import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index.vue'
import live_list from '@/views/live_list.vue'
import food_list from '@/views/food_list.vue'
import furnishing_list from '@/views/furnishing_list.vue'
import wine from '@/views/wine.vue'
import leisure from '@/views/leisure.vue'
import milk from '@/views/milk.vue'
import livingroom from '@/views/livingroom.vue'
import Kitchenware from '@/views/Kitchenware.vue'
import bedroom from '@/views/bedroom.vue'
import pro_detail from '@/views/pro_detail.vue'
import s_appliances from '@/views/s_appliances.vue'
import b_appliances from '@/views/b_appliances.vue'
import mobile from '@/views/mobile.vue'
import Cart from '@/views/cart.vue'
import confirmOrder from '@/views/confirmOrder.vue'
import orderPay from '@/views/orderPay.vue'
import admin from '@/views/admin.vue'
import admin_manage from '@/views/admin_manage.vue'
import manage_food from '@/views/manage_food.vue'
import manage_live from '@/views/manage_live.vue'
import manage_home from '@/views/manage_home.vue'
import manage_wine from '@/views/manage_wine.vue'
import manage_leisure from '@/views/manage_leisure.vue'
import manage_milk from '@/views/manage_milk.vue'
import manage_sappliances from '@/views/manage_sappliances.vue'
import manage_bappliances from '@/views/manage_bappliances.vue'
import manage_mobile from '@/views/manage_mobile.vue'
import manage_kitchenware from '@/views/manage_kitchenware.vue'
import manage_bedroom from '@/views/manage_bedroom.vue'
import manage_livingroom from '@/views/manage_livingroom.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/furnishing_list',
            component: furnishing_list,
            children: [{
                path: 'livingroom',
                component: livingroom,
                name: 'livingroom'
            }, {
                path: 'Kitchenware',
                component: Kitchenware,
                name: 'Kitchenware'
            }, {
                path: 'bedroom',
                component: bedroom,
                name: 'bedroom'
            }]
        },
        {
            path: '/food_list',
            component: food_list,
            children: [{
                path: 'wine',
                name: 'wine',
                component: wine

            }, {
                path: 'leisure',
                name: 'leisure',
                component: leisure
            }, {
                path: 'milk',
                name: 'milk',
                component: milk
            }]
        },
        {
            path: '/live_list',
            component: live_list,
            children: [{
                path: 's_appliances',
                name: 's_appliances',
                component: s_appliances
            }, {
                path: 'b_appliances',
                name: 'b_appliances',
                component: b_appliances
            }, {
                path: 'mobile',
                name: 'mobile',
                component: mobile
            }]
        },
        {
            path: '/pro_detail',
            component: pro_detail
        },
        {
            path: '/cart',
            component: Cart
        },
        {
            path: '/confirmOrder',
            component: confirmOrder
        },
        {
            path: '/orderPay',
            component: orderPay
        },
        {
            path: '/admin',
            component: admin
        },
        {
            path: '/admin_manage',
            component: admin_manage,
            meta: {
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            },
            children: [{
                path: 'manage_food',
                component: manage_food,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                }
            }, {
                path: 'manage_live',
                component: manage_live,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                }
            }, {
                path: 'manage_home',
                component: manage_home,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                }
            }, {
                path: 'manage_wine',
                component: manage_wine,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                }
            }, {
                path: 'manage_leisure',
                component: manage_leisure,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                }
            }, {
                path: 'manage_milk',
                component: manage_milk,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                }
            }, {
                path: 'manage_sappliances',
                component: manage_sappliances,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                }
            }, {
                path: 'manage_bappliances',
                component: manage_bappliances,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                }
            }, {
                path: 'manage_mobile',
                component: manage_mobile,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                }
            }, {
                path: 'manage_kitchenware',
                component: manage_kitchenware,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                }
            }, {
                path: 'manage_bedroom',
                component: manage_bedroom,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                }
            }, {
                path: 'manage_livingroom',
                component: manage_livingroom,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                }
            }]
        }
    ],

    mode: 'history'
})