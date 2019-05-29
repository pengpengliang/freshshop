<template>
	<div class="shopList">
		<nav-header></nav-header>
		<div id="middle">
			<nav-list></nav-list>
			<div class="shop_list_wrap">
				<div class="center">
					<div class="left_nav">
						<ul>
							<li class=""><router-link to="/food_list/wine">中外名酒</router-link></li>
							<li><router-link to="/food_list/leisure">休闲食品</router-link></li>
							<li class="bb0"><router-link to="/food_list/milk">奶粉</router-link></li>
						</ul>
					</div>
					<router-view>
					<div class="shop_list">
						<div class="sort_bar">
							<div class="sorts">
                                <a href="###" style="text-align:center;text-indent:0em;background:none;color:#ffa130;">全部</a>
                                <a href="###">销量</a>
                                <!-- <a href="###">评价</a> -->
                                <a href="###">价格</a>
							</div>
							
						</div>
						<div class="list_item">
							
								<ul>								
									<li>
										<div class="item_details">
											<a href="pro_details.html"><img src="/static/img/clean_s_1.png" /></a>
											<h3><a href="pro_details.html">悬挂式洁净层流罩</a></h3>
											<span>￥349.00</span>
										</div>
										<div class="item_data">
											<span>
										月成交
										<em>1120笔</em>
									</span>

											<span>
										<a href="###">
											<img src="/static/img/addShop.png"/>
											加入购物车
										</a>
									</span>
										</div>
									</li>			
								</ul>
							
							<!-- <div class="page">
								<div class="page_l">
									<ul>
										<li>
											<a href="###">&lt;</a>
										</li>
										<li class="on">
											<a href="###">1</a>
										</li>
										<li>
											<a href="###">2</a>
										</li>
										<li>
											<a href="###">3</a>
										</li>
										<li>
											<a href="###">4</a>
										</li>
										<li>
											<a href="###">...</a>
										</li>
										<li>
											<a href="###">100</a>
										</li>
										<li>
											<a href="###">&gt;</a>
										</li>
									</ul>
								</div>
								<div class="page_r">
									<label>
										共100页,到第
										<input type="text" value="1" /> 页
									</label>
									<button>确定</button>
								</div>
							</div> -->
						</div>
					</div>
					</router-view>

				</div>

			</div>

		</div>
		<model>
			<p slot="message" v-bind:mdShow="mdShow"> 
				请先登录，否则无法加入到购物车中！
			</p>
			<div slot="btnGroup">
				<a href="">关闭</a>
			</div>
		</model>
		<nav-footer></nav-footer>
	</div>
</template>

<script>
	import './../assets/css/common.css'
	import './../assets/css/shop_list.css'
	import NavHeader from './../components/header.vue'
	import NavFooter from '@/components/footer.vue'
	import NavList from '@/components/navList.vue'
	import Model from '@/components/model.vue'
	import axios from 'axios'
	export default {
		data() {
			return {
				mdShow:false
			}
		},
		components: {
			NavHeader,
			NavFooter,
			NavList,
			Model
		}

	}
</script>