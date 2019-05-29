<template>
  <div class="shopCart">
	<nav-header></nav-header>

	<div id="middle">
		<nav-list></nav-list>
		<div class="wrap">
			<div class="all_pro">
				<h1>全部商品 </h1>
				<span></span>
			</div>
			<div class="content">
				<ul>
					<li>
						<em class="contentLi" @click="toggleCheckAll" ><span class="select_all" v-bind:class="{'checked':checkAllFlag}"></span>全选</em>
					</li>
					<li>商品信息</li>
					<li>单价</li>
					<li>数量</li>
					<li>小计</li>
					<li>操作</li>
				</ul>
			</div>
			<div id="car_list">
				<ul v-for="item in carList">
					<li>
						<span class="select " v-bind:class="{'checked':item.checked == '1'}" @click="editCart('checked',item)"></span>
						<a href="javascript:void(0)"><img v-bind:src="'/static/img/' + item.proImg"></a>
					</li>
					<li>
						<h2><a href="javascript:void(0)">{{item.proName}}</a></h2>
					</li>
					<li>
						<span class="price">￥{{item.proPrice}}</span>
					</li>
					<li>
						<span class="reduce" @click="editCart('reduce',item)">-</span>
						<span id="br0">{{item.proNum}}</span>
						<span class="add" @click="editCart('add',item)">+</span>
					</li>
					<li>
						<span class="money">￥<em>{{item.proNum*item.proPrice}}</em></span>
					</li>
					<li>
						<span class="delete" @click="delCartConfirm(item)">删除</span>
					</li>
				</ul>
			</div>
			<div class="select_pro">
				<span class="select_all" @click="toggleCheckAll" v-bind:class="{'checked':checkAllFlag}"></span>
				<i @click="toggleCheckAll" >全选</i>
				<span class="delete_select">删除选中的商品</span>
				<span class="delete_shop">清除下柜商品</span>
				<div class="account">
					<span>已选择 <em id="count" >{{checkCount}}</em> 件商品</span>
					<span>总价：<em class="totalprice">￥{{totalPrice}}</em></span>
					<button v-bind:class="{'grayBtn':checkCount == 0}" @click="pay">去结算</button>
				</div>
			</div>
		</div>
	</div>
    <nav-footer></nav-footer>
	<model v-bind:mdShow="modelConfirm" @close="closeModel">
        <p slot="message"> 
            您确认要删除此数据吗？
        </p>
        <div slot="btnGroup" class="md-flex">
            <a href="javascript:void(0)" @click="delCart" class="md-btn">确认</a>
            <a href="javascript:void(0)" @click="modelConfirm=false" class="md-btn md-btn-red">关闭</a>
            
        </div>
    </model>
  </div>
</template>
<script>
    import './../assets/css/common.css'
	import './../assets/css/cart.css'
	import NavHeader from './../components/header.vue'
	import NavFooter from '@/components/footer.vue'
	import NavList from '@/components/navList.vue'
	import Model from '@/components/model.vue'
	import axios from 'axios'
	export default {
		data() {
			return {
				carList:[],
				modelConfirm:false,
				proID:'',
				delItem:{}

			}
		},
		mounted(){
			this.init(); 

		},
		computed:{
			checkAllFlag(){
                return this.checkCount == this.carList.length;
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
			totalPrice(){
				var money = 0;
				this.carList.forEach((item)=>{
					if (item.checked == '1') {
						money += parseFloat(item.proPrice)*parseInt(item.proNum);
					}
				})
				return money;
			}
		},
		components: {
			NavHeader,
			NavFooter,
			NavList,
			Model
		},
		methods:{
			init(){
				axios.get("/users/cartList").then((response)=>{					
					let res = response.data;
					this.carList = res.result;
				});
			},
			closeModel(){
               this.modelConfirm = false;              
			},
			delCartConfirm(item){
               this.modelConfirm = true;
               this.delItem = item;
			},
			delCart(){
               axios.post("/users/cartDel",{
				   proID:this.delItem.proID
			   }).then((response)=>{
				   let res = response.data;
				   if(res.status == '0'){
					   this.modelConfirm = false;
					   this.init();
					   this.$store.commit("updateCartCount", -this.delItem.proNum);

				   }
			   })
			},
			editCart(flag,item){
				
				if (flag == 'add') {
					item.proNum++;
				} else if(flag == 'reduce'){
					if (item.proNum<=1) {
						return;
					}
					item.proNum--;
				}else{
					item.checked = item.checked == "1"?'0':'1';
				}

				axios.post("/users/cartEdit",{
					proID:item.proID,
					proNum:item.proNum,
					checked:item.checked
				}).then((response)=>{
					let res = response.data;
					let num = 0;
					if (flag == 'add') {
						num = 1
					} else if(flag == 'reduce'){
						
						num = -1
					}
					this.$store.commit("updateCartCount", num);
					
				})
			},
			toggleCheckAll(){
				var flag = !this.checkAllFlag;
				this.carList.forEach((item) => {
					item.checked = flag?'1':'0';
				});
				axios.post("/users/editCheckAll",{
					checkAll: flag
				}).then((response)=>{
					let res = response.data;
					if (res.status == '0') {
						console.log("sss");
						
					} 
				})
			},
			pay(){
				if (this.checkCount == 0) {
					return;
				} else {
					this.$router.push({
						path:"/confirmOrder"
					})
				}
			}
		}

	}
</script>
