<template>
    <div style="height:100%">
        <div class="header">
            <div class="head_title">
                清新商城后台管理系统
            </div>
            <div class="login_name">
                <span>{{adminNames}}</span>
                <span @click="logout">退出</span>
            </div>
        </div>
        <div class="middle">
            <div class="nav">
                <ul>
                    <li @click="showMenu('index')">
                        <div class="menu_title is-active">
                            首页
                            <i v-bind:class="{'icon_arrow_up':indexShow == true,'icon_arrow_down':indexShow == false}"></i>
                        </div>
                    </li>
                    <ul class="menu_content" v-show="indexShow">
                        <li class="is-current">
                            <router-link to="/admin_manage/manage_food">生活食品系列</router-link>
                        </li>
                        <li>
                            <router-link to="/admin_manage/manage_live">生活用品系列</router-link>
                        </li>
                        <li>
                            <router-link to="/admin_manage/manage_home">生活家居系列</router-link>
                        </li>
                    </ul>                   
                    <li @click="showMenu('food')">
                        <div class="menu_title">
                            生活食品
                            <i v-bind:class="{'icon_arrow_up':foodShow == true,'icon_arrow_down':foodShow == false}"></i>
                        </div>
                    </li>
                    <ul class="menu_content" v-show="foodShow">
                        <li>
                            <router-link to="/admin_manage/manage_wine">中外名酒</router-link>
                        </li>
                        <li>
                            <router-link to="/admin_manage/manage_leisure">休闲食品</router-link>
                        </li>
                        <li>
                            <router-link to="/admin_manage/manage_milk">奶粉</router-link>
                        </li>
                    </ul>
                    
                    <li @click="showMenu('live')">
                        <div class="menu_title">
                            生活用品
                            <i v-bind:class="{'icon_arrow_up':liveShow == true,'icon_arrow_down':liveShow == false}"></i>
                        </div>
                    </li>
                    <ul class="menu_content" v-show="liveShow">
                        <li>
                            <router-link to="/admin_manage/manage_sappliances">空调冰箱</router-link>
                        </li>
                        <li>
                            <router-link to="/admin_manage/manage_bappliances">厨卫大电</router-link>
                        </li>
                        <li>
                            <router-link to="/admin_manage/manage_mobile">手机数码</router-link>
                        </li>
                    </ul>
                    
                    <li @click="showMenu('home')">
                        <div class="menu_title">
                            生活家居
                            <i v-bind:class="{'icon_arrow_up':homeShow == true,'icon_arrow_down':homeShow == false}"></i>
                        </div>
                    </li>
                    <ul class="menu_content" v-show="homeShow">
                        <li>
                            <router-link to="/admin_manage/manage_kitchenware">厨房</router-link>
                        </li>
                        <li>
                            <router-link to="/admin_manage/manage_bedroom">卧室</router-link>
                        </li>
                        <li>
                            <router-link to="/admin_manage/manage_livingroom">客厅</router-link>
                        </li>
                    </ul>
                    
                </ul>
            </div>
                <router-view></router-view>
            
        </div>
    </div>
</template>

<script>
    import './../assets/css/manage.css'
	import axios from 'axios'
    export default {
        data () {
            return {
               indexShow:false,
               foodShow:false,
               liveShow:false,
               homeShow:false
               
            }
        },
		mounted(){
			
        },
        computed: {
            adminNames(){
                return this.$store.state.adminNames;
                
            }
        },
        components:{
            
        },
		methods:{
			showMenu(flag){
                if (flag == 'index') {
                    this.indexShow = !this.indexShow
                } else if(flag == 'live'){
                    this.liveShow = !this.liveShow
                }else if (flag == 'food') {
                    this.foodShow = !this.foodShow
                }else{
                    this.homeShow = !this.homeShow
                }
            },
            logout(){
                axios.post("/admins/logout").then((response)=>{
                    let res = response.data;
                    if (res.status == "0") {
                        this.$store.commit("updateAdminName",'');  
                        this.$router.push({
                            path:"/admin"
                        })
                    } 
                })
            
            }
            
		}
    }
</script>
