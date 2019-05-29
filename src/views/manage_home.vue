<template>
    <div class="manage_content">
        <div class="manage_content_title">
            <h2>生活家居系列</h2>
        </div>
        <div class="toolbar">
            <form action="">
                <div class="input_texts">
                    <input type="text" placeholder="商品Id" class="css_input" v-model="findId">
                </div>
                <div class="find_button">
                    <button type="button" @click="findData">查询</button>
                </div>
                <div class="find_button">
                    <button @click="manageModelFlag = true" type="button">新增</button>
                </div>
            </form>
        </div>
        <div class="data_wrap">
            <div class="data_bar">
                <ul>
                    <li>商品Id</li>
                    <li>商品名称</li>
                    <li>商品价格</li>
                    <li>商品图片</li>
                    <li class="br0">操作</li>
                </ul>
            </div>
            <div class="data_show">
                <ul v-for="item in indexFoodList" v-if="listFlag">
                    <li>{{item.productId}}</li>
                    <li>{{item.productName}}</li>
                    <li>{{item.productPrice}}</li>
                    <li>
                        {{item.productImg}}
                        <a v-bind:href="'http://localhost:8081/static/img/'+ item.productImg" target="_Blank">查看</a>
                    </li>
                    <li class="br0">
                        <button class="edit_btn" type="button" @click="editDataConfirm(item)">编辑</button>
                        <button class="del_btn" type="button" @click="delDataConfirm(item)">删除</button>
                    </li>
                </ul>
                <ul v-for="item in findList" v-if="!listFlag">
                    <li>{{item.productId}}</li>
                    <li>{{item.productName}}</li>
                    <li>{{item.productPrice}}</li>
                    <li>
                        {{item.productImg}}
                        <a v-bind:href="'http://localhost:8081/static/img/'+ item.productImg" target="_Blank">查看</a>
                    </li>
                    <li class="br0">
                        <button class="edit_btn" type="button" @click="editDataConfirm(item)">编辑</button>
                        <button class="del_btn" type="button" @click="delDataConfirm(item)">删除</button>
                    </li>
                </ul>
                <div class="noneData" v-if="noneData"> 
                    暂无数据
                </div>
            </div>
        </div>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':manageModelFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">新增商品</div>
              <button class="md-close" @click="manageModelFlag=false" >Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="errorTip">请填写完整信息</span>
                  <span class="error error-show" v-show="errorTip2">商品已存在</span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text"  name="" v-model="proId" class="regi_login_input regi_login_input_left" placeholder="商品Id" >
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="text"   name="" v-model="proName"  class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="商品名称">
                  </li>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text"  name="" v-model="proPrice" class="regi_login_input regi_login_input_left" placeholder="商品价格" >
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="text"  name="" v-model="proImg"  class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="商品图片">
                  </li>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text"  name="" v-model="productIntro" class="regi_login_input regi_login_input_left" placeholder="商品介绍" >
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="submit">提交</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-if="manageModelFlag" @click="manageModelFlag=false"></div>
        <model v-bind:mdShow="modelConfirm" @close="closeModel">
            <p slot="message"> 
                您确认要删除此数据吗？
            </p>
            <div slot="btnGroup" class="md-flex">
                <a href="javascript:void(0)" @click="delData" class="md-btn">确认</a>
                <a href="javascript:void(0)" @click="modelConfirm=false" class="md-btn md-btn-red">关闭</a>
                
            </div>
        </model>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':editModelFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">编辑商品</div>
              <button class="md-close" @click="editModelFlag=false" >Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="errorTip">请填写完整信息</span>
                  <span class="error error-show" v-show="errorTip2">商品已存在</span>
                </div>
                <ul>
                  <label for="proId" class="label_s">商品Id</label>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text"  name="proId" v-model="proId" class="regi_login_input regi_login_input_left" placeholder="商品Id" >
                  </li>
                  <label for="proName" class="label_s">商品名称</label>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="text"   name="proName" v-model="proName"  class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="商品名称">
                  </li>
                  <label for="proPrice" class="label_s">商品价格</label>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text"  name="proPrice" v-model="proPrice" class="regi_login_input regi_login_input_left" placeholder="商品价格" >
                  </li>
                  <label for="proImg" class="label_s">商品图片</label>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="text"  name="proImg" v-model="proImg"  class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="商品图片">
                  </li>
                  <label for="productIntro" class="label_s">商品介绍</label>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text"  name="productIntro" v-model="productIntro" class="regi_login_input regi_login_input_left" placeholder="商品介绍" >
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="editData">提交</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-if="editModelFlag" @click="editModelFlag=false"></div>
    </div>
    
</template>

<script>
	import './../assets/css/manage.css'
    import Model from '@/components/model.vue'
	import axios from 'axios'
    export default {
        data () {
            return {
                indexFoodList:[],
                manageModelFlag:false,
                errorTip:false,
                errorTip2:false,
                proId:'',
                proName:'',
                proPrice:'',
                proImg:'',
                productIntro:'',
                modelConfirm:false,
                delItem:{},
                editItem:{},
                editModelFlag:false,
                findId:'',
                findList:[],
                listFlag:true,
                noneData:false
            }
        },
        computed: {
           
        },
		mounted(){
            this.getIndexFoodList();
		},
        components:{
            Model
        },
		methods:{
			getIndexFoodList(){
                this.listFlag = true;
                this.noneData = false;
                axios.get("/homes").then((result) => {
                    var res = result.data;
                    if (res.result.count < 1) {
                        this.noneData = false;
                        
                    } else {
                        this.indexFoodList = res.result.list;
                    }
                    
                });
            },
            submit(){
                if( this.proId == '' || this.proName == '' || this.proPrice == '' || this.proImg == ''){
                    this.errorTip = true;
                    return;
                }
                axios.post("/homes/addData",{
                    productId:this.proId,
                    productName:this.proName,
                    productPrice:this.proPrice,
                    productImg:this.proImg,
                    productIntro:this.productIntro
                }).then((response)=>{
                    let res =response.data;
                    if (res.status == "0") {                       
                        this.errorTip = false;
                        this.manageModelFlag = false;
                        this.getIndexFoodList();
                    } else if(res.status == "1"){ 
                        this.errorTip = true;               
                    }else if(res.status == '1001'){
                        this.errorTip2 = true;
                    }
                })
            },
            closeModel(){
               this.modelConfirm = false;              
			},
            delDataConfirm(item){
                this.modelConfirm = true;
                this.delItem = item;
            },
            editDataConfirm(item){
                this.editModelFlag = true;
                this.editItem = item;
                this.proId = item.productId;
                this.proPrice = item.productPrice;
                this.proImg = item.productImg;
                this.productIntro = item.productIntro;
                this.proName = item.productName;
            },
            delData(){

                axios.post("/homes/delData",{
                   productId:this.delItem.productId
			   }).then((response)=>{
				   let res = response.data;
				   if(res.status == '0'){
					   this.modelConfirm = false;
					   this.getIndexFoodList();

				   }
			   })
            },
            editData(){
                axios.post("/homes/editData",{
					productId:this.proId,
                    productName:this.proName,
                    productPrice:this.proPrice,
                    productImg:this.proImg,
                    productIntro:this.productIntro
				}).then((response)=>{
					let res = response.data;
					if(res.status == '0'){
					   this.editModelFlag = false;
					   this.getIndexFoodList();

				   }
					
				})
            },
            findData(){
                if (this.findId == '') {
                    this.listFlag = true;
                    this.getIndexFoodList();
                    
                } else {
                    axios.post("/homes/findData",{
                        productId:this.findId
                    }).then((response)=>{
                        let res = response.data;
                        if(res.status == '0'){
                            if (res.result.count < 1) {
                                this.noneData = true;
                                this.listFlag = false;
                                this.findList = ''
                            } else {
                                this.findList = res.result.list;
                                this.listFlag = false;
                                this.noneData = false;
                            }					   
                            
                        }
					
				    })
                }
                
            }
		}
    }
</script>
