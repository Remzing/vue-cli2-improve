<!-- 编辑广告 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="编辑广告"
          width="600px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div style="padding:0 10%">
            <el-form :model="formData" label-position="left" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
              <el-form-item  label="广告id" prop="id"  v-if="false">
                <el-input placeholder="广告id" type="" auto-complete="off" v-model="formData.id"></el-input>
              </el-form-item>
              <el-form-item label="广告链接"  prop="banner_link">
                <el-input placeholder="请输入广告链接" type="" v-model="formData.banner_link" auto-complete="off"></el-input>
              </el-form-item>
              
               <el-form-item label="广告图片" prop="medium_banner_url" class="bannerImg">
                <ul class="el-upload-list el-upload-list--picture-card el-banner-card" style="float:left;margin-top:16px;">
                    <li v-for="(item, index) in formData.bannerPhotoArr" :key="index" class="el-upload-list__item is-success">
                      <img :src="item.url" alt="" class="el-upload-list__item-thumbnail" >
                      <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label>
                      <span class="el-upload-list__item-actions">
                        <!-- <span class="el-upload-list__item-preview"><i class="el-icon-zoom-in"></i></span> -->
                        <span class="el-upload-list__item-delete" @click="delbannerImg(index)"><i class="el-icon-delete"></i></span>
                      </span>
                    </li>
                </ul>
                <el-upload class="fl" 
                  v-if="formData.bannerPhotoArr.length<1"
                  :action="uploadUrl"
                  :class="{'disabled':!isupload,'uploadDisabled':isupload}"
                  name="image_url"
                  style="margin-top:16px;"
                  ref="prodPhotoRef"
                  :file-list="formData.bannerPhotoArr"         
                  :show-file-list="false"
                  :on-preview="bannerPreview"
                  :on-remove="bannerRemove"
                  :onError="bannerError"
                  :onSuccess="bannerSuccess"
                  :limit="1"
                  :on-exceed="proRest"
                  :beforeUpload="bannerBeforeUpload">
                  <div class="el-upload el-upload--picture-card">
                    <i class="el-icon-plus"></i>
                  </div>
                </el-upload>
                <div class="fl smallTip" >提示：建议上传375×150px的的图片格式jpg或png</div> 
              </el-form-item>
              <el-form-item label="排序" prop="sort">
                <el-input placeholder="请输入排序号" type="" v-model="formData.sort" auto-complete="off"></el-input>
                <!-- <div class="fl smallTip" >提示：序号越大越</div>  -->
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="submitForm('formData')">确定提交</el-button>
            <el-button  @click="close">取消</el-button>
          </span>
      </el-dialog>
  </div>
  
</template>

<script>
import * as App from '@/utils/index'
import { getLocal } from '@/utils/index'
import { editBannerInit, editBanner } from '@/api/set/advert'

/*  */
export default {
  components: {
    
  },
  data () {
    
    return {
      uploadUrl: window.UPLOAD_API_URL,
      isupload:true,
      visible: this.show,
      formData:{
        id:null,
        banner_link: '',// 广告链接
        sort: '',// 排序
        medium_banner_url:'', // 中图
        min_banner_url:'', // 中图
        banner_url:'', // 中图
        bannerPhotoArr:[],
      },
      
      pay_name: null,
      roleOption:[],
      rules2: {
        banner_link: [
          { required: true, message: '请输入广告链接', trigger: 'blur' }
        ],
        medium_banner_url: [
          { required: true, message: '请上传广告图片', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序号', trigger: 'blur' }
        ],
        
        
      },
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    singleItem:{
      type: Object,
      default: null
    },
    batchItem:{
      type: Array,
      default: []
    },
    batchOper:{
      type: Boolean,
      default: false
    },
    callBack:{
      type: Function,
      default: null
    },
  },
  watch: {
    show () {
      this.visible = this.show;
      !this.show&&(this.singleItem=[])
      this.show&&this.init()

    }
  },
  computed: {
  },
  created () {
 
  },
  mounted () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
    })
  },
  methods: {
    //初始化广告内容
    init(){
       //this.singleItem.medium_banner_url = (this.singleItem.medium_banner_url).replace(getLocal('photoUrl'),'')
      console.log('singleItem.photoUrlMeger',this.singleItem.medium_banner_url)
      console.log('singleItem.id',this.singleItem.id)
      
      editBannerInit({id:(this.singleItem.id||''),medium_banner_url:(this.singleItem.medium_banner_url||null)}).then(response => {
        let formData = response.data||{}
        //let _banner = response.data||{}
        this.formData.id = formData.id||null
        this.formData.banner_link = formData.banner_link||null
        this.formData.sort = formData.sort||null
        this.formData.medium_banner_url = formData.medium_banner_url||null
        this.formData.banner_url = formData.banner_url||null
        this.formData.min_banner_url = formData.min_banner_url||null

        if (formData.medium_banner_url) {
          this.formData.medium_banner_url = formData.medium_banner_url||null
          this.formData.min_banner_url = formData.min_banner_url||null
          this.formData.banner_url = formData.banner_url||null
          console.log('single1111',formData.medium_banner_url)
          this.formData.bannerPhotoArr = [{name:'',  url: App.photoUrlMeger( formData.medium_banner_url||''), banner_url:( formData.banner_url||'') ,
           medium_banner_url: App.photoUrlMeger( formData.medium_banner_url||''),medium_banner_url:( formData.medium_banner_url||''),
           min_banner_url: App.photoUrlMeger( formData.min_banner_url||''),min_banner_url:( formData.min_banner_url||'')
           }]
        }
      }).catch(error => {
        console.error('noPass-error啊啊啊啊啊啊:', error)
      })
    },
    /**
     * 编辑广告内容
     */
    confirmBtn(){
      console.log('confirmBtn', this.formData)
      editBanner(this.formData).then(response => {
        console.log('response.errcode',response.errcode)
        if(response.errcode=1){
           this.$message.success(response.errmsg)
        }
       
        this.callBack && this.callBack()
        this.close()
      }).catch(error => {
        console.error('noPass-erroraaaaaaaaaaaaaaaaaaaaaa:', error)
      })
    },
     /* 产品图标 上传图片函数 */
    delbannerImg(index) {
      console.log('delbannerImg',index)
      this.formData.bannerPhotoArr.splice(index,1);
      if (!this.formData.bannerPhotoArr.length) {
        this.formData.medium_banner_url=''
        this.formData.min_banner_url=''
        this.formData.banner_url=''
      }
    },
       // 移除操作
    bannerRemove(file, fileList) {
      this.$message.warning('图片已移除')
      console.log('移除文件时', file, fileList);
      this.formData.medium_banner_url = fileList
      this.formData.min_banner_url = fileList
      this.formData.banner_url = fileList
    },
     // 上传前对文件的大小的判断
    bannerBeforeUpload (file) {
      console.log('上传前',file)
      console.log('--上传前------------',this.isupload)
    },
    
    //预览前的操作
    bannerPreview(file) {
      console.log('on-preview-CardPreview', file);
      this.dialogImageUrl = file.medium_url;
      this.dialogVisible = true;
    },
    // 上传成功后的回调
    bannerSuccess (response, file, fileList) {
      console.log('上传成功后aaaaaaaaaaa', response, file, fileList)
      // this.formData.banner_photo = []
      // this.formData.banner_photo.push(file)
      // 产品图标
      let tempbanner = fileList[fileList.length-1]
      this.formData.bannerPhotoArr.push(tempbanner)
      if (tempbanner.response){
        tempbanner.image_url = tempbanner.response.url
        tempbanner.medium_image_url = tempbanner.response.medium_url
        tempbanner.min_image_url = tempbanner.response.min_url
        //tempbanner.medium_image_url = App.photoUrlMeger(tempbanner.response.medium_url||'')
        tempbanner.url = App.photoUrlMeger(tempbanner.response.medium_url||'')
        console.log('tempbanner.response.medium_url22',tempbanner.response.medium_url)
      }
      // if (!tempbanner.image_url) {
      //   this.$message.warning('服务器返回图片出错，请重试！')
      //   // this.$refs.prodPhotoRef.clearFiles()
      // }
      // this.formData.banner_photo = tempbanner.image_url
       if (!tempbanner.medium_image_url) {
        this.$message.warning('服务器返回图片出错，请重试！')
        // this.$refs.prodPhotoRef.clearFiles()
      }
      this.formData.medium_banner_url = tempbanner.medium_image_url
      this.formData.min_banner_url = tempbanner.min_image_url
      this.formData.banner_url = tempbanner.image_url
      this.$refs.formData.validateField('medium_banner_url')
      console.log('啊AAAAAAAAA', this.formData.medium_banner_url)
      
    },
     // 上传错误
    bannerError (response, file, fileList) {
      this.$message.error('上传失败，请重试！')
      console.log('上传失败，请重试！',response, file, fileList)
    },
    proRest(files, fileList){
      //isdis  isupload
      console.log('个数个数files--',files)
       console.log('个数个数fileList--',fileList)
      this.$message.error('只可上传一张产品图标图片！')
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirmBtn()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * 关闭弹窗
     */
    close(){
      let formDataInit = {
        banner_link: '',// 广告链接
        sort: '',// 排序
        medium_banner_url:'', // 中图
        min_banner_url:'', // 中图
        banner_url:'', // 中图
        bannerPhotoArr:[]
      }
      this.$emit('update:show', false)
      this.resetForm('formData')
      console.log('formDataInit',formDataInit.bannerPhotoArr)
      this.formData = formDataInit
      console.log('auditoper-close', this.formData, this.formDataInit)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
