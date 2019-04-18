<!-- 服务协议 -->
<template>
  <div style="height:100%;">
    <div id="areaContHead">
      <div class="cont-title">内容管理</div>
      <!--tab 服务协议 -->
      <div class="tab-box">
        <ul>
          <li v-for="(item, index) in sidebar.thrLev" :key="index" :label="item.name" 
            @click="goPage(item)"
            :class="{'active':item.path==$route.path}">
            {{item.name}}
          </li>
        </ul>
      </div>
      
    </div>
    <div>
    <el-row class="warp">
      <el-col :span="24" class="warp-main">
        <el-form class="edit-for" ref="formData" :model="formData" label-position="top" :rules="rules" label-width="120px">
          <el-form-item prop="service_contract" >
            <div  style="line-height: 24px !important;">
              <quill-editor v-model="formData.service_contract"
                            ref="myQuillEditor"
                            class="editer-diy"
                            style="height: 400px; margin-bottom: 54px"
                            :options="editorOption" @ready="onEditorReady($event)">
              </quill-editor>
            </div>
          </el-form-item>
        </el-form>
      </el-col>


    </el-row>
  </div>
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
import { mapGetters } from 'vuex'
import * as App from '@/utils/index'
import { serviceContractInit, saveServiceContract } from '@/api/operation/contmanage'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
/*  */
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      formData:{
        service_contract:'',
        type:1  // 保存类型(1.服务协议 2.法律声明)
      },
      rules:{
        service_contract: [
          { required: true, message: '请填写服务协议', trigger: 'blur' }
        ],
      },
      editorOption: {}
    };
  },
  watch: {
   
  },
  computed: {
    // 获取state
    ...mapGetters([
      'sidebar',
    ]),
    editor() {
      return this.$refs.myQuillEditor.quill
    }
     
  },
  created () {
    this.init()
    
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
      serviceContractInit({}).then(response => {
        this.formData.service_contract = response.data.service_contract
      }).catch(error => {
        console.error('selectTemplateInit-error:', error)
      })
    },
    /**
     * 跳转页面
     */
    goPage(item) {
      this.$router.push({path: item.path})
    },
    /**
     * 确定发布
     */
    confirmBtn(){
      saveServiceContract(this.formData).then(response => {
        this.$message.success(response.errmsg)
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
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .sure-btn{
    
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    border-top: 1px solid #eee;
    margin-top: 10%;
  }
  
</style>
