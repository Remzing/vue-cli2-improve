<!-- 编辑模板- -->
<template>
  <div style="height:100%;position: relative;">
    <div class="cont-title">编辑模板</div>    
    <el-form :model="formData" label-position="left" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
      <el-form-item style="" label="所属行业"  prop="industry_id">
        <el-select :disabled="false" v-model="formData.industry_id" size="medium " placeholder="选择行业">
          <el-option label="选择行业" value=""></el-option>
          <el-option v-for="item in industryOption" :key="item.id" :label="item.industry" :value="item.id"></el-option>
        </el-select> 
        <el-form-item style="display:inline-block;"  prop="product_id">
          <el-select :disabled="false" v-model="formData.product_id" size="medium " placeholder="选择产品">
            <el-option label="选择产品" value=""></el-option>
            <el-option v-for="item in productOption" :key="item.id" :label="item.product_name" :value="item.id"></el-option>
          </el-select> 
        </el-form-item>
      </el-form-item>
     
      <el-form-item style="display:inline-block;" label="所属风格"  prop="style_id">
        <el-select :disabled="false" v-model="formData.style_id" size="medium " placeholder="选择风格">
          <el-option label="选择风格" value=""></el-option>
          <el-option v-for="item in styleOption" :key="item.id" :label="item.style" :value="item.id"></el-option>
        </el-select> 
      </el-form-item>
      <span v-if="!addIndustry">
        <el-button
          type="success"
          @click="addIndustryShow"
        >添加风格</el-button>
      </span>
      <span v-if="addIndustry">
        <el-input
          style="width: 10%;"
          placeholder="请输入风格名称"
          v-model="industryInput">
        </el-input>
        <el-button
          type="success"
          @click="addNewIndustry"
        >确认</el-button>
      </span>
      <span style="color: #888;font-size: 12px;">提示：风格不存在可手动添加！</span> 

      <el-form-item label="模板名称" prop="template_name">
        <el-input style="width: 30%;" :maxlength="6" placeholder="最多允许输入7个字" v-model="formData.template_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="模板ID" prop="template_id">
        <el-input
          style="width: 20%;"
          placeholder="请输入模板ID"
          v-model="formData.template_id">
        </el-input>
      </el-form-item>
      <el-form-item label="版本号" prop="version">
        <el-input
          ref="versionNumber"
          style="width: 20%;"
          placeholder="请输入模板ID"
          v-model="formData.version">
        </el-input>
        <div v-show="false">{{getVersion}}</div>
      </el-form-item>
      <el-form-item label="费用" prop="fee">
        <el-input
          style="width: 20%;"
          placeholder="请输入金额"
          v-model="formData.fee">
          <i slot="suffix" class="">元</i>
        </el-input>
        <span style="color: #888;font-size: 12px;">提示：默认为零，代表免费</span> 
      </el-form-item>
      <el-form-item label="缩略图" prop="medium_picture">
        <ul class="el-upload-list el-upload-list--picture-card" style="float:left;margin-top:16px;">
            <li v-for="(item, index) in productPhotoArr" :key="index" class="el-upload-list__item is-success">
              <img :src="item.url" alt="" class="el-upload-list__item-thumbnail">
              <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label>
              <span class="el-upload-list__item-actions">
                <!-- <span class="el-upload-list__item-preview"><i class="el-icon-zoom-in"></i></span> -->
                <span class="el-upload-list__item-delete" @click="delProductImg(index)"><i class="el-icon-delete"></i></span>
              </span>
            </li>
        </ul>
        <el-upload
          :action="uploadUrl"
          name="image_url"
          style="margin-top:16px;"
          ref="medium_picture"
          v-if="productPhotoArr.length<1"
          :show-file-list="false"
          :file-list="productPhotoArr"          
          list-type="picture-card"
          :limit="1"
          :on-exceed="proRest"
          :on-preview="productPreview"
          :on-remove="productRemove"
          :onError="productError"
          :onSuccess="productSuccess"
          :beforeUpload="productBeforeUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!-- <el-form-item  class="form-lin" label="模板本地下载路径" prop="pick_url">
        <el-input style="width: 30%;" :maxlength="100" placeholder="https://" v-model="formData.pick_url" auto-complete="off"></el-input>
      </el-form-item> -->
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div class="sure-btn dis-flex">
      <el-button
        type="success"
        size="medium"
        @click="submitForm('formData')"
        >确认发布</el-button>
    </div>
  </div>
</template>
<script>
/*  */
import { setTemplateInit, setTemplate, updateTemplateInit,addOrUpdateStyle} from '@/api/product/template'
import * as App from '@/utils/index'

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
      getVersion:'',
      formData:{
        id: null, // 模板id（更新就带id 新增不用传）
        industry_id: '', // 行业id
        product_id: '', // 行业id
        style_id: null, // 风格id
        template_name: null, // 模板名称
        fee: '0', // 费用
        picture: '', // 大图
        medium_picture:'',//中图
        min_picture:'',//缩略图
        pick_url: '', // 打包路径
        template_id: '', // 第三方平台模板id
        version: '', // 版本号
        
      },
      productPhotoArr:[],
      industryInput:null,
      addIndustry: false,
      rules2: {
        industry_id: [
          { required: true, message: '请选择行业', trigger: 'blur,change' }
        ],
        product_id: [
          { required: true, message: '请选择产品', trigger: 'blur,change' }
        ],
        style_id: [
          { required: true, message: '请选择风格', trigger: 'blur,change' }
        ],
        template_name: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        template_id: [
          { required: true, message: '请输入模板ID', trigger: 'blur' }
        ],
        version: [
          { required: true, message: '请输入版本号', trigger: 'blur' }
        ],
        fee: [
          { required: true, message: '请输入费用', trigger: 'blur' },
          { pattern: /^[0-9.]+$/, message: '输入的金额有误' }
        ],
        picture: [
          { required: true, message: '请选择缩略图', trigger: 'blur,change' }
        ],
        /* pick_url: [
          { required: true, message: '请输入打包路径', trigger: 'blur,change' }
        ], */

        /* use_time: [
          { validator: validatePass2, trigger: 'blur,change' }
        ], */
      },
      funcData:{
        funcArr:[],
        addGoodsFlag: true,
        funcInput:'',
        nowIndex: null
      },
      
      industryOption:[],
      productOption:[],
      styleOption:[],
      headers:{
      },
      dialogImageUrl: '',
      dialogVisible: false
    };
  },

  computed: {
    
  },
  created () {
    this.init()
  },
  watch:{
    //versionNumber
    formData:{
      handler(oldVal,newVal){
        console.log('versionNumber-oldVal',oldVal.version);
        console.log('versionNumber-newVal',newVal.version);
        this.getVersion = oldVal.version
        console.log('this.getVersion',this.getVersion)
  　　}
    },
    deep:true

    
  },
  mounted () {
    this.$nextTick(function () {
    })
  },
  methods: {
    /** 
     * 初始化
     */
    init(){
      if(this.$route.query.id){
        this.editTemplateInit(this.$route.query.id)
      }
      this.pubProductInit()
    },
    /**
     * 编辑模板初始化
     */
    editTemplateInit(id){
      updateTemplateInit({"id":id}).then(response => {
        let _data = response.data.template
        console.log('编辑模板初始化:_data',_data.picture)
        this.formData = _data
        if (_data.picture) {
          // this.productPhotoArr = [{name:'', url: App.photoUrlMeger( _data.picture||''), image_url:( _data.picture||'')}]
          this.productPhotoArr = [{name:'', url: App.photoUrlMeger( _data.medium_picture||''), medium_url:( _data.medium_picture||''),min_url:( _data.min_picture||''),image_url:( _data.picture||'')}]
          console.log(" this.productPhotoArr =------", this.productPhotoArr )
        }
      }).catch(error => {
        console.error('selectTemplateInit-error:', error)
      })
    },
    numberChage(){
      //this.getVersion=this.formData.version.toUpperCase()
      // console.log('this.formData.version',this.formData.version)
      // console.log('this.getVersion-change',this.getVersion)
      // if(this.formData.version!=this.getVersion){
      //    this.$confirm('更新版本号,将影响该版本号所有的使用用户,是否继续?', '警告', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).catch(() => {
      //     this.formData.version=this.getVersion
      //   })
      // }
    },
  
    
    /**
     * 编辑模板初始化
     */
    pubProductInit(){
      setTemplateInit().then(response => {
        let _data = response
        this.industryOption = _data.data.industry
        this.productOption = _data.data.product
        this.styleOption = _data.data.style
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
        style: this.industryInput,
        
      }
      addOrUpdateStyle(formData).then(response => {
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
      this.funcData.addGoodsFlag = false
      this.funcData.funcInput = this.funcData.funcArr[index]
    },
    /**
     * 添加功能
     */
    addGoods(){
      this.funcData.addGoodsFlag = true
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
    },
    /**
     * 删除功能
     */
    funcDelete(){
      this.funcData.funcArr.splice(this.funcData.nowIndex,1)
      this.funcData.addGoodsFlag = true
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
      this.funcData.funcArr.forEach(element => {
        this.formData.function_name += element + ','
      });
      this.formData.function_name = this.formData.function_name.substr(0, this.formData.function_name.length - 1);
      console.log('manageFunc', this.formData.function_name)
      this.$refs.formData.validateField('function_name')
    },
    /* 产品图标 上传图片函数 */
    delProductImg(index) {
      console.log('delProductImg',index)
      this.productPhotoArr.splice(index,1);
      if (!this.productPhotoArr.length) {
        this.formData.product_photo=''
      }
    },
    proRest(files, fileList){
      //isdis  isupload
      console.log('个数个数files--',files)
      this.$message.error('只可上传一张图片！')
    },
    // 上传前对文件的大小的判断
    productBeforeUpload (file) {
      console.log('上传前',file)
    },
     // 上传成功后的回调
    productSuccess (response, file, fileList) {
      console.log('上传成功后response', response)
      console.log('上传成功后file', file)
      console.log('上传成功后fileList', fileList)
      // this.formData.picture = []
      // this.formData.picture.push(file)

      // 产品图标
      let tempProduct = fileList[fileList.length-1]
      this.productPhotoArr.push(tempProduct)
      if (tempProduct.response){
        tempProduct.image_url = tempProduct.response.url
        tempProduct.medium_url = tempProduct.response.medium_url
        tempProduct.min_url = tempProduct.response.min_url
      }
      this.formData.picture = tempProduct.image_url
      this.formData.medium_picture = tempProduct.medium_url
      this.formData.min_picture = tempProduct.min_url
      // this.$refs.formData.validateField('picture')
      this.$refs.formData.validateField('medium_picture')
    },
    // 上传错误
    productError (response, file, fileList) {
      this.$message.error('上传失败，请重试！')
      console.log('上传失败，请重试！',response, file, fileList)
    },
    // 移除操作
    productRemove(file, fileList) {
      this.$message.warning('图片已移除')
      console.log('移除文件时', file, fileList);
      // this.formData.picture = fileList
      // this.formData.picture = fileList
      // this.formData.medium_picture = fileList
      this.formData.min_picture = fileList
    },
    //预览前的操作
    productPreview(file) {
      console.log('on-preview-CardPreview', file);
      // this.dialogImageUrl = file.url;
      this.dialogImageUrl = file.min_url;
      this.dialogVisible = true;
    },
   
    /* 上传图片-END */
    
    /**
     * formData 数据处理
     */
    manageFormData(){
      //缩略图

      let tempProduct = {}
      this.productPhotoArr.forEach(ele => {
        tempProduct.image_url = ele.image_url
        tempProduct.medium_url = ele.medium_url
        tempProduct.min_url = ele.min_url

        
      });
      this.formData.picture = tempProduct.image_url
      this.formData.medium_picture = tempProduct.medium_url
      this.formData.min_picture = tempProduct.min_url
    },

    /**
     * 确定发布
     */
    confirmBtn(){
      this.manageFormData()
      setTemplate(this.formData).then(response => {
        this.$message.success(response.errmsg)
        this.$router.push({path:'/product/template/allTemplate'})
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
    /**
     * 确定提交
     */
    submitForm(formName) {
      if(this.formData.version!=this.getVersion){
         this.$confirm('更新版本号,将影响该版本号所有的使用用户,是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
        }).catch(() => {
          this.formData.version=this.getVersion
        })
      }else{
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
      }

      
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
    position: absolute;
    bottom: 0;
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
  
</style>
