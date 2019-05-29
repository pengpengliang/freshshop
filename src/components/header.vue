<template>
  <div id="header">
        <div class="site_nav">
            <div class="site_nav_bd">
                <ul class="site_nav_l">
                    <li>欢迎光临！</li>
                    <li>
                        <a href="javascript:void(0)" @click="loginModelFlag=true" v-if="!nickName">请登录</a>
                        <span v-text="nickName" v-if="nickName"></span>
                        <a href="javascript:void(0)" @click="regModelFlag=true" v-if="!nickName">免费注册</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" v-if="nickName" @click="logOut">退出</a>
                    </li>
                </ul>
                <ul class="site_nav_r">
                    <li>
                        <a href="user.html">
                            <span>我的商城</span>
                            <span class="caret"></span>
                        </a>
                        <div class="site_nav_hover" style="display: none;">
                            <a href="order.html">已买到的宝贝</a>
                            <a href="###">我的足迹</a>
                        </div>
                    </li>
                    <li>
                        <a href="###">
                            <span>我的关注</span>
                            <span class="caret"></span>
                        </a>
                        <div class="site_nav_hover" style="display: none;">
                            <a href="###">收藏的宝贝</a>
                            <a href="###">收藏的店铺</a>
                        </div>
                    </li>
                    <li>
                        <a href="###">
                            <span>清新服务</span>
                            <span class="caret"></span>
                        </a>
                        <div class="site_nav_hover" style="display: none;">
                            <a href="###">消费者服务</a>
                            <a href="###">卖家服务</a>
                        </div>
                    </li>
                    <li>
                        <a href="###">
                            <span>客服中心</span>
                            <span class="caret"></span>
                        </a>
                        <div class="site_nav_hover" style="display: none;">
                            <a href="###">在线服务</a>
                            <a href="###">电话服务</a>
                            <a href="###">售后服务</a>
                        </div>
                    </li>
                    <li>
                        <a href="###">
                            <span>消息通知</span>
                            <span class="caret"></span>
                        </a>
                        <div class="site_nav_hover" style="display: none;">
                            <a href="order.html">我的订单</a>
                            <a href="###">物流信息</a>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
        <div class="top">
            <div class="top_wrap">
                <div class="logo">
                    <router-link to="/">
                        <img src="/static/img/logo.jpg" />
                    </router-link>
                </div>
                <div class="search_wrap">
                    <form action="###">
                        <input type="text" placeholder="请输入关键词" />
                        <input type="submit" value="搜索" />
                    </form>
                    <div class="search_hot">
                        <ul>
                            <li>
                                <a href="shop_list.html">红木家具</a>
                            </li>
                            <li>
                                <a href="shop_list.html">液晶电视</a>
                            </li>
                            <li>
                                <a href="shop_list.html">无穷鸡翅</a>
                            </li>
                            <li>
                                <a href="shop_list.html">百事可乐</a>
                            </li>
                            <li>
                                <a href="shop_list.html">手帕纸</a>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="shop_car">
                    <button @click="jumpCart">
                        <img src="/static/img/shopcar.jpg"/>
                        <span id="carNum" >{{cartCount}}</span>
                    </button>
                </div>
            </div>
        </div>
         <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModelFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">Login in</div>
              <button class="md-close" @click="loginModelFlag=false" >Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
                  <span class="error error-show" v-show="errorTip2">用户名已注册</span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  name="password" v-model="userPwd"  class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password">
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="login">登  录</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':regModelFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">register</div>
              <button class="md-close" @click="regModelFlag=false" >Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="errorTip2">用户名已注册</span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  name="password" v-model="userPwd"  class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password">
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="reg">注册</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-if="loginModelFlag" @click="loginModelFlag=false"></div>
        <div class="md-overlay" v-if="regModelFlag" @click="regModelFlag=false"></div>
        
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                userName:'',
                userPwd:'',
                errorTip:false,
                loginModelFlag:false,
                errorTip2:false,
                regModelFlag:false
            }
        },
        computed:{
            nickName(){
                return this.$store.state.nickName;
            },
            cartCount(){
                return this.$store.state.cartCount;
            },
            userId(){
                return this.$store.state.userId;
                
            }
        },
		mounted(){
            this.checkLogin();						

		}, 
		methods:{
            checkLogin(){
                axios.get("/users/checkLogin").then((response)=>{
                    let res = response.data;
                    if(res.status == "0"){
                        this.$store.commit("updateUserInfo", res.result.userName);
                        this.$store.commit("updateUserId", res.result.userId);                                                      
                        this.getCartCount()  
                    }
                })

            },
            login(){              
                if( this.userName == '' || this.userPwd == ''){
                    this.errorTip = true;
                    return;
                }
                axios.post("/users/login",{
                    userName:this.userName,
                    userPwd:this.userPwd
                }).then((response)=>{
                    let res =response.data;
                    if (res.status == "0") {
                        this.errorTip = false;
                        this.loginModelFlag = false;  
                        this.errorTip2 = false;                                                                    
                        this.$store.commit("updateUserInfo", res.result.userName);
                        this.$store.commit("updateUserId", res.result.userId);                        
                        this.getCartCount();
                    } else if(res.status == "1"){                      
                        this.errorTip = true;    
                        this.errorTip2 = false;                                                           
                    }
                })
            },
            reg(){              
                if( this.userName == '' || this.userPwd == ''){
                    this.errorTip = true;
                    return;
                }
                axios.post("/users/reg",{
                    userName:this.userName,
                    userPwd:this.userPwd
                }).then((response)=>{
                    let res =response.data;
                    if (res.status == "0") {
                        this.errorTip2 = false;                        
                        this.errorTip = false;
                        this.regModelFlag = false;
                    } else if(res.status == "1"){                      
                        this.errorTip2 = false;
                        this.errorTip = true;               
                    }else if(res.status == '1001'){
                        this.errorTip2 = true;
                    }
                })
            },
            logOut(){
                axios.post("/users/logout").then((response)=>{
                    let res = response.data;
                    if (res.status == "0") {
                        this.$store.commit("updateUserInfo",res.result.userName);   
                        this.$store.commit("updateUserId",'');  
                    } 
                })
            },
            jumpCart(){
                this.$router.push({
                    path:"/cart"
                })

            },
            getCartCount(){
                axios.get("/users/getCartCount").then((response)=>{
                    let res = response.data;
                    this.$store.commit("initCartCount", res.result);
                });
            }
        }
    }
</script>

