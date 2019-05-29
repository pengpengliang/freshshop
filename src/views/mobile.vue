<template>
<div class="shop_list">
    <div class="sort_bar">
        <div class="sorts">
            <a href="###" style="text-align:center;text-indent:0em;background:none;" v-bind:class="{'current':begin}">全部</a>
            <a href="###" v-bind:class="{'ascending':isB,'descending':!isB,'current':salE}" @click="saleSort()" >销量</a>
            <a href="javascript:void(0)" v-bind:class="{'ascending':isA,'descending':!isA,'current':pricE}" @click="priceSort()" >价格</a>
        </div>
        
    </div>
    <div class="list_item">
    <ul>								
        <li v-for="item in MobileList">
            <div class="item_details">
                <a href="pro_details.html"><img v-lazy="'/static/img/'+ item.proImg" /></a>
                <h3><a href="pro_details.html">{{ item.proName }}</a></h3>
                <span>¥{{item.proPrice}}</span>
            </div>
            <div class="item_data">
                <span> 月成交<em>{{item.proSale}}笔</em></span>
                <span>
                    <a href="javascript:void(0)" @click="addCart(item.proID)">
                        <img src="/static/img/addShop.png"/>
                        加入购物车
                    </a>
                </span>
            </div>
        </li>
    </ul>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="loadMore">
        <img src="/static/loading/loading-spinning-bubbles.svg" alt="" v-show="loading">
    </div>
     </div>
     <model v-bind:mdShow="mdShow" v-on:close="closeModel">
        <p slot="message"> 
            请先登录，否则无法加入到购物车中！
        </p>
        <div slot="btnGroup" class="md-flex">
            <a href="javascript:void(0)" @click="mdShow=false" class="md-btn">关闭</a>
        </div>
    </model>
    <model v-bind:mdShow="mdShowCart" v-on:close="closeModel">
        <p slot="message"> 
            加入购物车成功！
        </p>
        <div slot="btnGroup" class="md-flex">
            <a href="javascript:void(0)" @click="mdShowCart=false" class="md-btn">继续购物</a>
            <router-link to="/cart" class="md-btn md-btn-red">查看购物车</router-link>
            
        </div>
    </model>
      </div>
</template>
<script>
	import axios from 'axios'
    import Model from '@/components/model.vue'
    export default {
        data () {
            return {
                MobileList:[],
                sortFlag:true,
                page:1,
                pageSize:6,
                sortFlags:true,
                pages:1,
                pageSizes:6,
                isA:true,
                isB:true,
                mdShow:false,
                mdShowCart:false,
                busy:true,
                loading:false,
                sortType:true,
                begin:true,
                salE:false,
                pricE:false
            }
        },
        computed: {
            userId(){
                return this.$store.state.userId;               
            }
        },
		mounted(){
			this.getMobileList();					

		},
        components:{
            Model
        },
		methods:{
			getMobileList(){
                axios.get("/mobiles").then((result)=>{
                    var res = result.data;
                    this.MobileList = res.result.list;
                    
				})
            },
            sortPrice(flag){
                var param = {
                    page:this.page,
                    pageSize:this.pageSize,
                    sort:this.sortFlag?1:-1
                }
                this.loading = true;
                
                axios.get("/mobiles/price",{
                    params:param
                }).then((result)=>{
                    var res = result.data;
                    this.loading = false;
                    
					if (res.status == '0') {
                        this.sortType = true;
                        if (flag) {
                            this.MobileList = this.MobileList.concat(res.result.list);
                            if (res.result.count==0) {
                                this.busy =true;
                            } else {
                                this.busy =false;
                                
                            }
                            
                        }else{
                            this.MobileList = res.result.list;
                            this.busy =false;
                            
                        }
                    } else {
                        this.MobileList = [];
                    }

				})

                
            },
            sortSale(flag){
                var param = {
                    pages:this.pages,
                    pageSizes:this.pageSizes,
                    sorts:this.sortFlags?1:-1
                }
                this.loading = true;
                axios.get("/mobiles/sale",{
                    params:param
                }).then((result)=>{
                    var res = result.data;
                    this.loading = false;
                    
					if (res.status == '0') {
                        this.sortType = false;
                        if (flag) {
                            this.MobileList = this.MobileList.concat(res.result.list);
                            
                            
                            if (res.result.count==0) {
                                this.busy =true;
                            } else {
                                this.busy =false;
                                
                            }
                            
                        }else{
                            this.MobileList = res.result.list;
                            this.busy =false;
                            
                        }
                    } else {
                        this.MobileList = [];
                    }

				})

                
            },
             priceSort(){                              
                this.sortFlag = !this.sortFlag;
                this.page = 1;
                this.sortPrice();              
                this.isA = !this.isA;
                this.salE = false;
                this.begin = false;
                this.pricE = true
            },
            saleSort(){                              
                this.sortFlags = !this.sortFlags;
                this.pages = 1;
                this.sortSale();              
                this.isB = !this.isB;
                this.salE = true;
                this.begin = false;
                this.pricE = false
            },
            addCart(proID){
                var userId = this.userId
                axios.post("/mobiles/addCart",{
                    proID:proID,
                    userId:userId
                }).then((res)=>{
                    if (res.data.status == "0") {
                        this.mdShowCart = true;
                        this.$store.commit("updateCartCount", 1);
                    }else{
                        this.mdShow = true;
                    }
                })

            },
            closeModel(){
                this.mdShow = false;
                this.mdShowCart = false;
            },
            loadMore(){
                this.busy = true;
                setTimeout(() => {
                
                if (this.sortType) {
                    this.page++;                    
                    this.sortPrice(true); 
                } else {
                    this.pages++;                    
                    this.sortSale(true);
                }
                          
                    
                }, 500);
                
            }
		}
    }
</script>
