<template>
  <div class="confirmOrder">
        <nav-header></nav-header>
        <div id="middle">
           <nav-list></nav-list>          
           <div class="confirm_order">
				<div class="title">
					<h1>填写并核对订单信息</h1>
				</div>
				<div class="order_info">
					<dl>
						<dt>
							收货人信息
						</dt>
						<div class="addr-list-wrap">
                            <div id="add-list">
                                <ul>
                                    <li v-for="(item,index) in addressListFilter" v-bind:class="{'check':checkIndex == index}" @click="checkIndex=index">
                                        <dl>
                                        <dt>{{item.userName}}</dt>
                                        <dd class="address">{{item.streetName}}</dd>
                                        <dd class="tel">{{item.tel}}</dd>
                                        </dl>
                                        <div class="addr-opration addr-del">
                                        <a href="javascript:;" class="addr-del-btn" @click="delAddress(item.addressId)">
                                           删除
                                        </a>
                                        </div>
                                        <div class="addr-opration addr-set-default">
                                        <a href="javascript:;" class="addr-set-default-btn" v-if="!item.isDefault" @click="setDefault(item.addressId)"><i>设为默认</i></a>
                                        </div>
                                        <div class="addr-opration addr-default" v-if="item.isDefault"> 默认地址</div>
                                    </li>
									<li class="addr-new" @click="addAddModelFlag=true">
										<div class="add-new-inner">
										<i class="icon-add">
											<img src="/static/img/addAdd.png" alt="">
										</i>
										<p>Add new address</p>
										</div>
									</li>
                                </ul>
                            </div>

                            <div class="shipping-addr-more">
                                <a class="addr-more-btn up-down-btn down-btn" href="javascript:;" @click="expand" v-bind:class="{'up-btn':limit>4}">{{hiden}}</a>
                            </div>
                        </div>
					</dl>
					
					<dl>
						<dt>
							商品清单
							<span><router-link to="/cart">返回修改购物车</router-link></span>
						</dt>
						<dd>
							<ul>
								<li>商品</li>
								<li>价格</li>
								<li>数量</li>
								<li>小计</li>
							</ul>
						</dd>
						<dd>
							<ul>
								<li v-for="item in carList" v-if="item.checked=='1'">
									<p>
										<a href="javascropt:void(0)">
											<img v-bind:src="'/static/img/' + item.proImg"/>
										</a>
									</p>
									<p>
										<span>
											<a href="javascropt:void(0)">{{item.proName}}</a>
										</span>
									</p>
									<p>
										<span >
											￥{{item.proPrice}}
										</span>
									</p>
									<p>
										<span>
											x{{item.proNum}}
										</span>
									</p>
									<p>
										<span>￥{{item.proPrice*item.proNum}}</span>
									</p>
								</li>
							</ul>
							
						</dd>
						<dd>
							
							<div class="total">
								<p>
									<span>共<em>{{checkCount}}</em>件商品，商品总金额：</span>
									<span>￥{{subTotal}}</span>
								</p>
								<p>
									<span>运费：</span>
									<span>￥{{shipping}}</span>
								</p>
                                <p>
                                    <span>应付总额：</span>
                                    <em>￥{{orderTotal}}</em>
                                </p>
							</div>						
						</dd>
					</dl>
				</div>
				<div class="submit_order">					
					<button @click="payMent">提交订单</button>
				</div>
			</div>          
            
        </div>  
		<model v-bind:mdShow="isMdShow" @close="closeModel">
			<p slot="message">您是否要删除此地址</p>
			<div slot="btnGroup" class="md-flex">
				<a href="javascript:void(0)" class="md-btn" @click="delAddressConfirm">确认</a>
				<a href="javascript:void(0)" class="md-btn md-btn-red" @click="isMdShow=false">取消</a>
			</div>
		</model>
		<div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':addAddModelFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">添加新地址</div>
              <button class="md-close" @click="addAddModelFlag=false" >Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="errorTip">{{errorTipContent}}</span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="nameInfo" v-model="nameInfo" class="regi_login_input regi_login_input_left" placeholder="收货人姓名" data-type="nameInfo">
                  </li>
                  <li class="regi_form_input">
                    <i class="icon IconPwd"></i>
                    <input type="text" tabindex="2"  name="address" v-model="address"  class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="收货人地址">
                  </li>
				  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="tel" tabindex="2"  name="address" v-model="phone"  class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="收货人手机">
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="save">保 存</a>
              </div>
            </div>
          </div>
        </div>
		<div class="md-overlay" v-if="addAddModelFlag" @click="addAddModelFlag=false"></div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import './../assets/css/common.css'
	import './../assets/css/confirmOrder.css'
	import NavHeader from './../components/header.vue'
	import NavFooter from '@/components/footer.vue'
	import NavList from '@/components/navList.vue'
	import Model from '@/components/model.vue'
	import axios from 'axios'
	export default {
		data() {
			return {
				limit:3,
				checkIndex:0,
				addressList:[],
				isMdShow:false,
				addressId:'',
				carList:[],
				shipping:10,
				subTotal:0,
				orderTotal:0,
				addAddModelFlag:false,
				errorTip:false,
				nameInfo:'',
				address:'',
				phone:'',
				errorTipContent:''
			}
		},
		mounted(){
			this.init();
			this.inits()
		},
		computed:{
			addressListFilter(){
				return this.addressList.slice(0,this.limit);
			},
			hiden(){
				if (this.limit > 3) {
					return '隐藏'
				} else {
					return '展开'
				}
			},
			checkCount(){
				var i = 0;
				this.carList.forEach((item)=>{
					if (item.checked == '1') {
						i++;
					}
				})
				return i;
				
			},
			addressIds(){
				var addresss = ''
				this.addressList.forEach((item)=>{
					if (item.isDefault == true) {
						addresss = item.addressId
					}
				})
				return addresss
			}
		},
		components: {
			NavHeader,
			NavFooter,
			NavList,
			Model
		},
		methods:{
			save(){
				if( this.nameInfo == '' || this.phone == '' || this.address == ''){
					this.errorTip = true;
					this.errorTipContent = '请填写完整信息';
                    return;
                }else{
					this.errorTip = false;
					axios.post("/users/addAddress",{
						nameInfo:this.nameInfo,
						phone:this.phone,
						address:this.address
					}).then((response)=>{
						let res = response.data;
						if (res.status == '1001') {
							this.errorTip = true;
							this.errorTipContent = res.msg;

						} else if(res.status == '1'){
							this.errorTip = true;
							this.errorTipContent = res.msg;
						}else{
							this.addAddModelFlag = false;
							this.init();
						}
					})
				}
			},
			init(){
				axios.get("/users/addressList").then((response)=>{
					let res = response.data;
					this.addressList = res.result;
				});
				
			},
			inits(){
				axios.get("/users/cartList").then((response)=>{					
					let res = response.data;
					this.carList = res.result;

					this.carList.forEach((item)=>{
						if (item.checked == '1') {
							this.subTotal += item.proPrice*item.proNum;
						}
					});

					this.orderTotal = this.subTotal + this.shipping;
				});
			},
			expand(){
				if (this.limit == 3) {
					this.limit = this.addressList.length;
				} else {
					this.limit = 3
				}
			},
			setDefault(addressId){
				axios.post("/users/setDefault",{
					addressId:addressId
				}).then((response)=>{
					let res = response.data;
					if (res.status == '0') {
						this.init()
						
					} 
				})
			},
			closeModel(){
				this.isMdShow = false;
			},
			delAddress(addressId){
				this.isMdShow = true;				
				this.addressId = addressId;
				
			},
			delAddressConfirm(){
				axios.post("/users/delAddress",{
					addressId:this.addressId
				}).then((response)=>{
					let res = response.data;
					if (res.status == '0') {
						console.log(123);
						this.isMdShow = false;
						this.init()
					}
				})
			},
			payMent(){
				console.log(this.addressIds)
				axios.post("/users/payMent",{
					addressId:this.addressIds,
					orderTotal:this.orderTotal
				}).then((response)=>{
					let res = response.data;
					if (res.status == '0') {
						this.$router.push({
							path:'/orderPay?orderId='+res.result.orderId
						})
					}
				})
			}
			
		}

	}
</script>


