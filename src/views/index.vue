<template>
    <div class="index">
        <nav-header></nav-header>
        <div id="middle">
           <nav-list></nav-list>          
            <template>
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide><a href="pro_details.html"><img src="/static/img/banner-1.jpg" /></a></swiper-slide>
                    <swiper-slide><a href="pro_details.html"><img src="/static/img/banner-2.jpg" /></a></swiper-slide>
                    <swiper-slide><a href="pro_details.html"><img src="/static/img/banner-3.jpg" /></a></swiper-slide>
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
            </template>
            <div class="fixtool">
                <ul>
                    <li><a href="###">生活家居系列</a></li>
                    <li><a href="###">生活食品系列</a></li>
                    <li><a href="###">生活用品系列</a></li>
                    <li>
                        <img src="/static/img/shang1.png" />
                        <a href="###">返回顶部</a>
                    </li>
                </ul>
            </div>
            <div class="ensure">
                <ul>
                    <li>
                        <img src="/static/img/service1.jpg" />
                        <p>正品保障</p>
                    </li>
                    <li>
                        <img src="/static/img/service2.jpg" />
                        <p>准时送达</p>
                    </li>
                    <li>
                        <img src="/static/img/service3.jpg" />
                        <p>专属客服</p>
                    </li>
                    <li>
                        <img src="/static/img/service4.jpg" />
                        <p>免费保修</p>
                    </li>
                    <li>
                        <img src="/static/img/service5.jpg" />
                        <p>帮助中心</p>
                    </li>
                </ul>
            </div>
            <div id="filter_series">
                <div class="clean_series">
                    <h2>生活食品系列</h2>
                    <a href="shop_list.html">查看更多&gt;</a>
                    <div class="clean_series_l">
                        <a href="pro_details.html"><img src="/static/img/food1.jpg" /></a>
                        <p><a href="pro_details.html">工程用洁净层流罩</a></p>
                    </div>
                    <div class="clean_series_r">
                        <ul>
                            <li v-for="(item,index) in indexFoodList" :key={index}>
                                <a href="pro_details.html"><img v-lazy="'/static/img/'+ item.productImg" /></a>
                                <h3><a href="pro_details.html">{{ item.productName }}</a></h3>
                                <p>{{item.productIntro}}</p>
                                <span>{{item.productPrice}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="related_product">
                <div class="clean_series">
                    <h2>生活用品系列</h2>
                    <a href="shop_list.html">查看更多&gt;</a>
                    <div class="clean_series_l">
                        <a href="pro_details.html"><img src="/static/img/live1.jpg" /></a>
                        <p><a href="pro_details.html">工程用洁净层流罩</a></p>
                    </div>
                    <div class="clean_series_r">
                        <ul>
                            <li v-for="(item,index) in indexLiveList" :key={index}>
                                <a href="pro_details.html"><img v-lazy="'/static/img/'+ item.productImg" /></a>
                                <h3><a href="pro_details.html">{{ item.productName }}</a></h3>
                                <p>{{item.productIntro}}</p>
                                <span>{{item.productPrice}}</span>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
            <div id="equip_series">
                <div class="clean_series">
                    <h2>生活家居系列</h2>
                    <a href="shop_list.html">查看更多&gt;</a>
                    <div class="clean_series_l">
                        <a href="pro_details.html"><img src="/static/img/jiaju5.jpg" /></a>
                        <p><a href="pro_details.html">工程用洁净层流罩</a></p>
                    </div>
                    <div class="clean_series_r">
                        <ul>
                            <li v-for="(item,index) in indexList" :key={index}>
                                <a href="pro_details.html"><img v-lazy="'/static/img/'+ item.productImg" /></a>
                                <h3><a href="pro_details.html">{{ item.productName }}</a></h3>
                                <p>{{item.productIntro}}</p>
                                <span>{{item.productPrice}}</span>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>  
        <nav-footer></nav-footer>
    </div>
  
</template>

<script>
    import './../assets/css/common.css'
    import './../assets/css/index.css'
    import NavHeader from './../components/header.vue'
    import NavFooter from '@/components/footer.vue'
    import NavList from './../components/navList.vue'
    import axios from 'axios'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'  
    export default {
        data(){
            return {
                indexList:[],
                indexFoodList:[],
                indexLiveList:[],
                swiperOption: {               
                    pagination: {
                        el: '.swiper-pagination'
                    },   
                    loop:true,
                    autoplay: true,
                    autoplayDisableOnInteraction: false,
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true//修改swiper的父元素时，自动初始化swiper
                    
                }  
            }
        },
        components: {
            NavHeader,
            NavFooter,
            NavList,
            swiper,  
            swiperSlide 
        },
        computed: {  
  
            swiper() {  
              return this.$refs.mySwiper.swiper; 
            }  
        },
        mounted () {
            this.getIndexList();
            this.getIndexFoodList();
            this.getIndexLiveList()
        },
        methods: {
            getIndexList(){
                axios.get("/homes").then((result) => {
                    var res = result.data;
                    this.indexList = res.result.list;
                    
                }); 
            },
            getIndexFoodList(){
                axios.get("/goods").then((result) => {
                    var res = result.data;
                    this.indexFoodList = res.result.list;
                });
            },
            getIndexLiveList(){
                axios.get("/lives").then((result) => {
                    var res = result.data;
                    this.indexLiveList = res.result.list;
                });
            }
        }
    }
</script>