<template>
  <div class="orderPay">
        <nav-header></nav-header>
        <div id="middle">
           <nav-list></nav-list>          
           <div class="order_success">
				
				<h2>订单提交成功，请尽快付款！订单号：<em>{{orderId}}</em></h2>
				<p>请您在<strong>24小时</strong>内完成支付，否则订单会被自动取消(库存紧俏商品支付时限以订单详情页为准)。</p>
			</div>     
            <div class="content">
				<div class="order_detail">
					<h3>订单信息</h3>
					<div class="order_infomation">
						<span>订单号：<em>{{orderId}}</em></span>
						<span>创建时间：<em>{{createDate}}</em></span>
						<span>收货地址：<em>{{addressInfo.userName}}，{{addressInfo.tel}}，{{addressInfo.streetName}}</em></span>
					</div>
					<div class="order_model">
						<ul>
							<li>商品信息</li>
							<li>单价</li>
							<li>数量</li>
							<li>商品总价</li>
						</ul>
					</div>
				</div>
				<div class="pro_details">
					<ul v-for="item in goodList">
						<li>
							<a href="javascript:void(0)"><img v-bind:src="'/static/img/'+ item.proImg"></a>
						</li>
						<li>
							<h2><a href="javascript:void(0)">{{item.proName}}</a></h2>
						</li>
						<li>
							<span class="price">￥{{item.proPrice}}</span>
						</li>
						<li>
							<span id="br0">{{item.proNum}}</span>
						</li>
						<li>
							<span class="money">￥<em>{{item.proPrice*item.proNum}}</em></span>
						</li>
						
					</ul>
				</div>
				<div class="orderPays">
					<div class="orderPay_wrap">
						<span>应付总额：<em>￥{{orderTotal}}</em></span>
						<button>立即付款</button>
					</div>
						
				</div>
			</div>
        </div>  
		
        <nav-footer></nav-footer>
    </div>
</template>

<script>
    import './../assets/css/common.css'
	import './../assets/css/orderPay.css'
	import NavHeader from './../components/header.vue'
	import NavFooter from '@/components/footer.vue'
	import NavList from '@/components/navList.vue'
	import Model from '@/components/model.vue'
	import axios from 'axios'
	export default {
		data() {
			return {
				orderId:'',
				orderTotal:0,
				goodList:[],
				createDate:'',
				addressInfo:[]
			}
		},
		mounted(){
			this.init();
		},
		computed:{
			
		},
		components: {
			NavHeader,
			NavFooter,
			NavList,
			Model
		},
		methods:{
			init(){
				var orderId = this.$route.query.orderId;				
				axios.get("/users/orderDetail",{
					params:{
						orderId:orderId
						
					}
				}).then((response)=>{
					let res = response.data;
					if (res.status == '0') {
						this.orderTotal = res.result.orderTotal;
						this.orderId = orderId;
						this.goodList = res.result.goodsList;
						this.createDate = res.result.createDate;
						this.addressInfo = res.result.addressInfo;
					}
				})
			}
			
		}

	}
</script>


