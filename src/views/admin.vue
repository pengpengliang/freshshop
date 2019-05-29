<template>
        <div class="md-modal modal-msg md-modal-transition md-show admin">
            <div class="md-modal-inner">
            <div class="md-top">
                <div class="md-title">后台登录</div>
            </div>
            <div class="md-content">
                <div class="confirm-tips">
                <div class="error-wrap">
                    <span class="error error-show" v-show="errorTip">用户名或密码错误</span>
                </div>
                <ul>
                    <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="adminName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                    </li>
                    <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  name="password" v-model="adminPwd"  class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password">
                    </li>
                </ul>
                </div>
                <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="log">登录</a>
                </div>
            </div>
            </div>
        </div>
</template>
<script>
    import './../assets/css/common.css'
	import axios from 'axios'
    export default {
        data () {
            return {
               errorTip:false,
               adminName:'',
               adminPwd:''
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
			log(){
                 if( this.adminName == '' || this.adminPwd == ''){
                    this.errorTip = true;
                    return;
                }
                
                axios.post("/admins/login",{
                    adminName:this.adminName,
                    adminPwd:this.adminPwd
                }).then((response)=>{
                    let res =response.data;
                    if (res.status == "0") {
                        this.errorTip = false;  
                        this.$store.commit("updateAdminName", res.result.adminName);
                        this.$router.push({
                            path:"/admin_manage"
                        })
                    } else if(res.status == "1"){                      
                        this.errorTip = true;   
                                                                               
                    }
                })
            }
		}
    }
</script>
