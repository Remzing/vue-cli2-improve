<!-- 产品发布- -->
<template>
  <div style="height:100%;position: relative;">
    <div class="cont-title">产品发布</div>    
    <el-form :model="formData" label-position="left" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
      <el-form-item style="display:inline-block;" label="所属行业："  prop="industry_id">
        <el-select :disabled="false" v-model="formData.industry_id" size="medium " placeholder="选择行业">
          <el-option label="选择行业" value=""></el-option>
          <el-option v-for="item in industryOption" :key="item.id" :label="item.industry" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <span v-if="!addIndustry">
          <el-button
            type="success"
            @click="addIndustryShow"
          >添加行业</el-button>
        </span>
        <span v-if="addIndustry">
          <el-input
            style="width: 10%;"
            placeholder="请输入行业名称"
            v-model="industryInput">
          </el-input>
          <el-button
            type="success"
            @click="addNewIndustry"
          >确认</el-button>
        </span>
        <span style="color: #888;font-size: 12px;">提示：行业不存在可手动添加！</span> 
      <el-form-item label="产品名称：" prop="product_name">
        <el-input style="width: 30%;" :maxlength="7" placeholder="最多允许输入7个字" v-model="formData.product_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="广告文案：" prop="advertising">
        <el-input style="width: 50%;font-size: inherit;color: inherit;font-family: inherit;" type="textarea"  :rows="3" autocomplete="off" v-model="formData.advertising" placeholder="请输入广告文案"></el-input>
      </el-form-item>
      <el-form-item label="月租费用：" prop="month_fee">
        <el-input
          style="width: 20%;"
          placeholder="请输入金额"
          v-model="formData.month_fee">
          <i slot="suffix" class="">元</i>
        </el-input>
      </el-form-item>
      <el-form-item label="产品图标：" prop="product_photo">
        <el-upload class="fl"
          :action="uploadUrl"
          :class="{'disabled':!isupload,'uploadDisabled':isupload}"
          name="image_url"
          style="margin-top:16px;"
          ref="prodPhotoRef"
          :file-list="productPhotoArr"         
          list-type="picture-card"
          :on-preview="productPreview"
          :on-remove="productRemove"
          :onError="productError"
          :onSuccess="productSuccess"
          :limit="1"
          :on-exceed="proRest"
          :beforeUpload="productBeforeUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
        <div class="fl smallTip" >提示：建议上传150×150px的的图片格式jpg或png</div> 
      </el-form-item>
      <el-form-item label="核心功能 ：" prop="function_name">
        <div class="dis-flex">
          <div class="func-arr">
            <div v-for="(item, index) in funcData.funcArr" :key="index" @click="funcHandle(index)">{{item}}</div>
            <div @click='addGoods'><i class="el-icon-plus"></i>添加</div>
          </div>
          <div class="func-add">
            <el-input
              style="width: 50%;"
              :maxlength="8"
              placeholder="请输入功能名称"
              v-if="funcData.addGoodsFlag!=0"
              v-model="funcData.funcInput">
            </el-input>
            <el-button
              v-if="funcData.addGoodsFlag==2"
              type="success"
              @click="funcEdit"
            >确认</el-button>
            <el-button
              v-if="funcData.addGoodsFlag==2"
              type="warning"
              @click="funcDelete"
            >删除</el-button>
            <el-button
              v-if="funcData.addGoodsFlag==1"
              type="success"
              @click="funcAdd"
            >确定添加</el-button>
            <div style="color: #888;font-size: 12px;">提示：最多添加10个</div>
          </div>
        </div>
        
      </el-form-item>
      <el-form-item label="界面截图：" prop="param" class="screenShots">
        <el-upload
          class="fl"
          name="image_url"
          :action="uploadUrl"
          id="uploadId"
          ref="uploadRef"
          :file-list="paramArr"
          style="margin-top:16px;"
          list-type="picture-card"
          :multiple="true"
          :limit="5"
          :on-exceed="paramRest"
          :on-preview="screenshotPreview"
          :on-remove="screenshotRemove"
          :onError="screenshotError"
          :onSuccess="screenshotSuccess"
          :beforeUpload="screenshotBeforeUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
         <div class="fl smallTip" style="margin-top: 170px;">提示：可以批量上传，建议上传750×1334px的图片，格式jpg或png，最多允许上传5张</div> 
      </el-form-item>
      <el-form-item label="管理后台：" prop="manage_url">
        <el-input style="width: 30%;" :maxlength="100" placeholder="https://" v-model="formData.manage_url" auto-complete="off"></el-input>
        <span class="smallTip">提示：用户进入管理后台系统的地址</span>
      </el-form-item>
      <el-form-item label="附加条件：" prop="is_use">
        <el-form-item><label for="">代理：</label> <el-checkbox v-model="formData.is_agent">允许</el-checkbox></el-form-item> 
        <el-form-item>
          <label for="">试用：</label>
          <el-radio v-model="formData.is_use" :label="1">允许</el-radio>
          <el-form-item prop="use_time" v-if="formData.is_use==1" class="dis-inblok" style="width:10%;">
            <el-input
              placeholder="请输入试用天数"
              v-model="formData.use_time">
              <i slot="suffix" class="">天</i>
            </el-input>
          </el-form-item>
          <el-radio v-model="formData.is_use" :label="0">不允许</el-radio>
        </el-form-item>
        <el-form-item>
          <label for="" style="vertical-align: top;">小程序二维码：</label>
          <el-upload
            style="display:inline-block;margin-top:16px;"
            :action="uploadUrl"
            ref="qrCodeRef"
            name="image_url"
            v-if="true"
            :file-list="qrCodeArr"
            list-type="picture-card"
            :on-preview="QRCodePreview"
            :on-remove="QRCodeRemove"
            :onError="QRCodeError"
            :onSuccess="QRCodeSuccess"
            :limit="1"
            :on-exceed="proRest"
            :beforeUpload="QRCodeBeforeUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div class="sure-btn dis-flex">
      <el-button
        type="success"
        size="medium"
        @click="submitForm('formData')"
        >确认提交</el-button>
    </div>
  </div>
</template>
<script>
/*  */
import { publishProductInit, publishProduct, addOrUpdateIndustry, updateProductInit} from '@/api/product/publish'
import * as App from '@/utils/index'
import $ from 'jquery'
export default {
  components: {
  },
  data () {
    /* var validatePass2 = (rule, value, callback) => {
      if (this.formData.is_use == 1 && value === '') { //允许使用
        callback(new Error('请输入试用天数'));
      } else {
        callback();
      }
    }; */
    return {
      uploadUrl: window.UPLOAD_API_URL,
      isupload:true,
      formData:{
        id: null, // 产品id（更新就带id 新增不用传）
        param: '', // 页面截图json数组
        industry_id: null, // 行业id
        // product_name: '', // 行业名称
        product_name: '', // 产品名称
        advertising: '', // 广告文案
        month_fee: '', // 月租费用
        product_photo: [], // 产品图标
        function_name: '', // 核心功能名称（逗号分隔）
        is_agent: true, // 允许代理(0不允许 1允许)
        is_use: 0, // 允许试用(0不允许 1允许)
        use_time: '', // 试用天数
        qr_code: [], // 小程序二维码
      },
      productPhotoArr:[],
      paramArr:[],
      qrCodeArr:[],
      industryInput:null,
      addIndustry: false,
      rules2: {
        industry_id: [
          { required: true, message: '请选择行业', trigger: 'blur,change' }
        ],
        product_name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        advertising: [
          { required: true, message: '请输入广告文案', trigger: 'blur' }
        ],
        month_fee: [
          { required: true, message: '请输入月租费用', trigger: 'blur' },
          { pattern: /^[0-9.]+$/, message: '输入的金额有误' }
        ],
        product_photo: [
          { required: true, message: '请选择产品图标', trigger: 'blur' }
        ],
        function_name: [
          { required: true, message: '请添加核心功能', trigger: 'blur,change' }
        ],
        param: [
          { required: true, message: '请添加界面截图', trigger: 'blur,change' }
        ],
        manage_url: [
          { required: true, message: '请输入管理后台地址', trigger: 'blur' }
        ],
        is_use: [
          { required: true, message: '请选择是否允许试用', trigger: 'blur' }
        ],
        /* use_time: [
          { validator: validatePass2, trigger: 'blur,change' }
        ], */
      },
      funcData:{
        funcArr:[],
        addGoodsFlag: 0,
        funcInput:'',
        nowIndex: null
      },
      
      industryOption:[],
      headers:{
      },
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  watch: {

  },
  computed: {
    
  },
  created () {
    this.init()
  },
  mounted () {
    this.$nextTick(function () {
      console.log('uploadId',document.getElementById('uploadId').children)
      var div=document.getElementById("uploadId")
      var span=document.createElement("span");  
      span.id="spanid";  
      span.style.color="blue";  
      span.innerHTML=" i am append span !"

      // console.log('this.$refs---$',$('#uploadId .el-upload--picture-card').hide())
    })
  },
  methods: {
    /** 
     * 初始化
     */
    init(){
      if(this.$route.query.id){
        this.editProductInit(this.$route.query.id)
      }
      this.pubProductInit()
    },
    /**
     * 编辑产品初始化
     */
    editProductInit(id){
      updateProductInit({"id":id}).then(response => {
        let _product = response.data.product||{}
        let _coreFunList = response.data.core_function_list||{}
        let _productImageList = response.data.product_image_list||{}
        this.formData.id = _product.id
        this.formData.industry_id = _product.industry_id
        this.formData.product_name = _product.product_name
        this.formData.advertising = _product.advertising
        this.formData.month_fee = _product.month_fee
        this.formData.is_agent = (_product.is_agent==1)?true:false;
        this.formData.is_use = _product.is_use
        this.formData.use_time = (_product.use_time<0)?0:_product.use_time 
        this.formData.manage_url = _product.manage_url
        // 产品图标 
        this.formData.product_photo = _product.product_photo
        this.productPhotoArr = [{name:'',  url: App.photoUrlMeger( _product.product_photo||''), image_url:( _product.product_photo||'')}]
        //小程序二维码 
        this.formData.qr_code = _product.qr_code
        this.qrCodeArr = [{name:'', url: App.photoUrlMeger( _product.qr_code||''), image_url:( _product.qr_code||'')}]
        
        // 核心功能
        _coreFunList.forEach(element => {
          this.funcData.funcArr.push(element.function_name)
        });
        this.manageFunc()

        //产品截图img
        let prodArr = []
        _productImageList.forEach(ele => {
          // imageUrl image_name
          let tempArr = {}
          tempArr.url = App.photoUrlMeger(ele.image_url||'')
          tempArr.image_url = ele.image_url||''
          tempArr.name = ele.image_name
          this.paramArr.push(tempArr)

          prodArr.push({image_url:ele.image_url,image_name:ele.image_name})
        })
        this.formData.param = JSON.stringify(prodArr)          

      }).catch(error => {
        console.error('selectTemplateInit-error:', error)
      })
    },
    /**
     * 添加行业post
     */
    pubProductInit(){
      publishProductInit().then(response => {
        let _data = response
        this.industryOption = _data.data
      }).catch(error => {
        console.error('selectTemplateInit-error:', error)
      })
    },
    /**
     * 添加行业post
     */
    addIndustryShow(){
      this.addIndustry = true
    },
    /**
     * 添加行业post
     */
    addNewIndustry(){
      console.log('funcHandle-index',this.industryInput)
      if(!this.industryInput){
        this.$message.warning("请输入行业名称")
        return
      }
      let tempFlag = false
      this.industryOption.forEach(element => {
        if(element.industry==this.industryInput){
          this.$message.warning("行业名称重复")
          tempFlag = true
        }
      });
      if (tempFlag) {
        return
      }
      this.addIndustry = false
      let formData = {
        id: null,
        industry: this.industryInput,
        
      }
      addOrUpdateIndustry(formData).then(response => {
        this.$message.success(response.errmsg)
        this.pubProductInit()
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
    /**
     * 核心功能操作
     */
    funcHandle(index){
      console.log('funcHandle-index',index)
      this.funcData.nowIndex = index
      this.funcData.addGoodsFlag = 2
      this.funcData.funcInput = this.funcData.funcArr[index]
    },
    /**
     * 添加功能
     */
    addGoods(){
      this.funcData.addGoodsFlag = 1
      this.funcData.funcInput=''
    },
    /**
     * 确认添加功能
     */
    funcAdd(){
      if (this.checkFunc()){
        return
      }
      this.funcData.funcArr.push(this.funcData.funcInput)
      this.manageFunc()
      this.funcData.addGoodsFlag = 0
    },
    
    /**
     * 编辑功能
     */
    funcEdit(){
      if (this.checkFunc()){
        return
      }
      console.log('this.funcData.nowIndex',this.funcData.funcArr[this.funcData.nowIndex])
      // this.funcData.funcArr[this.funcData.nowIndex] = this.funcData.funcInput
      this.funcData.funcArr.splice(this.funcData.nowIndex,1,this.funcData.funcInput)
      this.manageFunc()
      this.funcData.addGoodsFlag = 0
    },
    /**
     * 删除功能
     */
    funcDelete(){
      this.funcData.funcArr.splice(this.funcData.nowIndex,1)
      this.funcData.addGoodsFlag = 0
      this.funcData.funcInput = ''
      this.manageFunc()
    },
    /**
     * 判断数据是否重复
     */
    checkFunc(){
      let checkFunc = false
      if(!this.funcData.funcInput){
        this.$message.warning("请输入功能名称")
        checkFunc = true
      }
      this.funcData.funcArr.forEach(element => {
        if(element==this.funcData.funcInput){
          this.$message.warning("功能名称重复")
          checkFunc = true
        }
      });
      return checkFunc
    },
    /**
     * 处理数据
     */
    manageFunc(){
      this.formData.function_name = ''
      this.funcData.funcArr.forEach(element => {
        this.formData.function_name += element + ','
      });
      this.formData.function_name = this.formData.function_name.substr(0, this.formData.function_name.length - 1);
      console.log('manageFunc', this.formData.function_name)
      this.$refs.formData.validateField('function_name')
    },
    /* 产品图标 上传图片函数 */
    // 上传前对文件的大小的判断
    productBeforeUpload (file) {
      console.log('上传前',file)
      console.log('--上传前------------',this.isupload)
    },
    
     // 上传成功后的回调
    productSuccess (response, file, fileList) {
      console.log('上传成功后aaaaaaaaaaa', response, file, fileList)
      // this.formData.product_photo = []
      // this.formData.product_photo.push(file)
      // 产品图标
      let tempProduct = fileList[fileList.length-1]
      if (tempProduct.response){
        tempProduct.image_url = tempProduct.response.url
      }
      if (!tempProduct.image_url) {
        this.$message.warning('服务器返回图片出错，请重试！')
        this.$refs.prodPhotoRef.clearFiles()
      }
      this.formData.product_photo = tempProduct.image_url
      this.$refs.formData.validateField('product_photo')
      console.log('啊AAAAAAAAA', this.formData.product_photo)
      
    },
    // 上传错误
    productError (response, file, fileList) {
      this.$message.error('上传失败，请重试！')
      console.log('上传失败，请重试！',response, file, fileList)
    },
    //产品图标-上传超出个数限制
    proRest(files, fileList){
      //isdis  isupload
      console.log('个数个数files--',files)
       console.log('个数个数fileList--',fileList)
      this.$message.error('只可上传一张产品图标图片！')
    },
    //界面截图-上传超出限制数量
    paramRest(files, fileList){
      this.$message.error('最多允许上传5张界面截图！')
    },
    // uploadDisabled:function(){
    //   return this.formData.product_photo.length>0
    // },
    // 移除操作
    productRemove(file, fileList) {
      this.$message.warning('图片已移除')
      console.log('移除文件时', file, fileList);
      this.formData.product_photo = fileList
    },
    //预览前的操作
    productPreview(file) {
      console.log('on-preview-CardPreview', file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /* 界面截图 上传图片函数 */
    // 上传前
    screenshotBeforeUpload (file) {
      console.log('上传前',file)
    },
     // 上传成功后的回调
    screenshotSuccess (response, file, fileList) {
      console.log('上传成功后', response, file, fileList)
      // 界面截图
      let tempParam = []
      console.log('screenshotPreview', this.formData.param);
      fileList.forEach(element => {
        if (element.response){
          element.image_url = element.response.url
        }
        let tempObj = {}
        tempObj.image_url = element.image_url
        tempObj.image_name = element.name
        tempObj.image_url && tempParam.push(tempObj)
      });
      if (tempParam.length>0) {
        this.formData.param = JSON.stringify(tempParam)
      }else{
        this.$message.warning('服务器返回图片出错，请重试！')
        this.$refs.uploadRef.clearFiles()
      
      }

      this.$refs.formData.validateField('param')
      console.log(',this.formData.param',this.formData.param)
    },
    // 上传错误
    screenshotError (response, file, fileList) {
      this.$message.error('上传失败，请重试！')
      console.log('上传失败，请重试！',response, file, fileList)
    },
    // 移除操作
    screenshotRemove(file, fileList) {
      this.$message.warning('图片已移除')
      console.log('移除文件时', file, fileList);
      this.formData.param = fileList
    },
    //预览前的操作
    screenshotPreview(file) {
      console.log('screenshotPreview', file);
    },
    /* 小程序二维码 上传图片函数 */
    // 上传前
    QRCodeBeforeUpload (file) {
      console.log('上传前',file)
    },
     // 上传成功后的回调
    QRCodeSuccess (response, file, fileList) {
      console.log('上传成功后', response, file, fileList)
      this.formData.qr_code = fileList
      // this.$refs.formData.validateField('qr_code')  
      // 产品图标
      let tempQRCode = fileList[fileList.length-1]
      if (tempQRCode.response){
        tempQRCode.image_url = tempQRCode.response.url
      }
      if (!tempQRCode.image_url) {
        this.$message.warning('服务器返回图片出错，请重试！')
        this.$refs.qrCodeRef.clearFiles()
      }
      this.formData.qr_code = tempQRCode.image_url  
    },
    // 上传错误
    QRCodeError (response, file, fileList) {
      this.$message.error('上传失败，请重试！')
      console.log('上传失败，请重试！',response, file, fileList)
    },
    // 移除操作
    QRCodeRemove(file, fileList) {
      this.$message.warning('图片已移除')
      console.log('移除文件时', file, fileList);
      this.formData.qr_code = fileList
    },
    //预览前的操作
    QRCodePreview(file) {
      console.log('screenshotPreview', file);
    },
    /* 上传图片-END */
    
    /**
     * formData 数据处理
     */
    manageFormData(){
      //代理商
      this.formData.is_agent = this.formData.is_agent?1:0
    },

    /**
     * 确定发布
     */
    confirmBtn(){
      this.manageFormData()
      publishProduct(this.formData).then(response => {
        this.$message.success(response.errmsg)
        this.$router.push({path: '/product/bank/lib'})
        
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
    /**
     * 确定提交
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log('formData:', this.formData)
        if (valid) {
          this.confirmBtn()
        } else {
          this.$message.warning('请检查必填项已填写且格式正确')
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .sure-btn{
    // position: absolute;
    // bottom: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    border-top: 1px solid #eee;
  }
  .func-arr{
    display:inline-block;
    width: 120px;
    max-width: 500px;
    cursor: pointer;
    text-align: center;
    div{
      border: 1px solid #ddd;
      margin-top: -1px;
      height: 40px;
      line-height: 40px
    }
    div:last-child{
      border: 1px solid #3d9738;
      color: #3d9738;
    }
  }
  .func-add{
    display:inline-block;
    margin: 0px 0 0 20px;
  }
  .smallTip{
    color: #888;font-size: 12px;width: 197px;line-height: 20px;margin-top: 68px;margin-left: 17px;
  }
</style>
