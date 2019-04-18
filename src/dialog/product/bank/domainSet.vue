<!-- 配置域名 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          class="setHigh"
          title="配置域名"
          width="36%"
          height="500px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div >
            <div class="dis-flex warn-hint">
              <div class="icon-fuhao iconfont " style="margin-right:20px;"></div>
              <div>服务器域名需经过ICP备案，新备案域名需要24小时后才可配置。域名格式只支持英文大小写字母、数字“_”，不支持IP地址及端口号。如果没有服务器与域名，请通知有关人员先进行采购。注意，每个月只能修改5次，每类域名最多填写20个。</div>
            </div>
          </div>
          <el-form style="margin-top:30px;" :model="formData" label-position="left" status-icon :rules="rules2" ref="formData" label-width="170px" class="demo-ruleForm">
            <el-form-item  prop="request_url" label="request合法域名">
              <div v-for="(item, index) in requestArr" :key="index" :index="index">
                <el-input class="dom-inp" placeholder="请输入域名" v-model="item.domainUrl">
                  <template slot="prepend">https://</template>
                </el-input>
                <!-- 添加 -->
                <i v-if="index==0" class="el-icon-circle-plus-outline clk-plus" @click="addRequest(1)"></i>
                <!-- 删除 -->
                <i v-if="!(index==0)" class="el-icon-remove-outline clk-plus del-col" @click="deleteRequest(1,index)"></i>
              </div>
            </el-form-item>
            <el-form-item  prop="socket_url" label="socket合法域名">
              <div v-for="(item, index) in socketArr" :key="index" :index="index">
                <el-input class="dom-inp" placeholder="请输入域名" v-model="item.domainUrl">
                  <template slot="prepend"> wss://</template>
                </el-input>
                <!-- 添加 -->
                <i v-if="index==0" class="el-icon-circle-plus-outline clk-plus" @click="addRequest(2)"></i>
                <!-- 删除 -->
                <i v-if="!(index==0)" class="el-icon-remove-outline clk-plus del-col" @click="deleteRequest(2,index)"></i>
              </div>
            </el-form-item>
            <el-form-item  prop="upload_file_url" label="uploadfile合法域名">
              <div v-for="(item, index) in uploadFileArr" :key="index" :index="index">
                <el-input class="dom-inp" placeholder="请输入域名" v-model="item.domainUrl">
                  <template slot="prepend">https://</template>
                </el-input>
                <!-- 添加 -->
                <i v-if="index==0" class="el-icon-circle-plus-outline clk-plus" @click="addRequest(3)"></i>
                <!-- 删除 -->
                <i v-if="!(index==0)" class="el-icon-remove-outline clk-plus del-col" @click="deleteRequest(3,index)"></i>
              </div>
            </el-form-item>
            <el-form-item  prop="download_file_url" label="downloadfile合法域名">
              <div v-for="(item, index) in downloadFileArr" :key="index" :index="index">
                <el-input class="dom-inp" placeholder="请输入域名" v-model="item.domainUrl">
                  <template slot="prepend">https://</template>
                </el-input>
                <!-- 添加 -->
                <i v-if="index==0" class="el-icon-circle-plus-outline clk-plus" @click="addRequest(4)"></i>
                <!-- 删除 -->
                <i v-if="!(index==0)" class="el-icon-remove-outline clk-plus del-col" @click="deleteRequest(4,index)"></i>
              </div>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button  @click="close">取消</el-button>
            <el-button type="success" @click="submitForm('formData')">确认提交</el-button>
          </span>
      </el-dialog>
  </div>
  
</template>

<script>
import * as App from '@/utils/index'
import { updateProductUrlInit, updateProductUrl } from '@/api/product/publish'

/*  */
export default {
  components: {
    
  },
  data () {
    return {
      visible: this.show,
      formData:{
        id: null, // 
        request_url: '', // 服务器域名，request合法域名
        socket_url: '', // 服务器域名-socket合法域名
        upload_file_url: '', // 服务器域名-uploadFile合法域名
        download_file_url: '', // 服务器域名-downloadFile合法域名
      },
      requestArr: [],
      socketArr: [],
      uploadFileArr: [],
      downloadFileArr: [],
      rules2: {
        request_url: [
          { required: true, message: '请输入request合法域名', trigger: 'blur' },
          // { pattern: /^[A-Za-z0-9]+$/, message: '只能输入字母和数字' }///[^\u4E00-\u9FA5A-Za-z0-9._]/g
        ],
        socket_url: [
          { required: true, message: '请输入socket合法域名', trigger: 'blur' }
        ],
        upload_file_url: [
          { required: true, message: '请输入uploadfile合法域名', trigger: 'blur' }
        ],
        download_file_url: [
          { required: true, message: '请输入downloadfile合法域名', trigger: 'blur' }
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
      this.show && this.init()
    },
    requestArr:{
      handler: function (newQuestion, oldQuestion) {
        // this.getNowOperData()
      },
      deep: true
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
    init(){
      this.formData.id = this.singleItem.id
      updateProductUrlInit({id:this.singleItem.id}).then(response => {
        let _data = response.data
        if (_data) {
          let _requestArr = _data.request_url.split(',')
          let _socketArr = _data.socket_url.split(',')
          let _uploadFileArr = _data.upload_file_url.split(',')
          let _downloadFileArr = _data.download_file_url.split(',')
          console.log('_requestArr', _requestArr)
          _requestArr.forEach(ele => {
            let _element = ele.replace('https://', '')
            this.requestArr.push({domainUrl: _element})
          })
          _socketArr.forEach(ele => {
            let _element = ele.replace('wss://', '')
            this.socketArr.push({domainUrl: _element})
          })
          _uploadFileArr.forEach(ele => {
            let _element = ele.replace('https://', '')
            this.uploadFileArr.push({domainUrl: _element})
          })
          _downloadFileArr.forEach(ele => {
            let _element = ele.replace('https://', '')
            this.downloadFileArr.push({domainUrl: _element})
          })
        }
        
        !this.requestArr.length && (this.requestArr=[{domainUrl:''}])
        !this.socketArr.length && (this.socketArr=[{domainUrl:''}])
        !this.uploadFileArr.length && (this.uploadFileArr=[{domainUrl:''}])
        !this.downloadFileArr.length && (this.downloadFileArr=[{domainUrl:''}])
        console.log('this.requestArr-end:', this.requestArr)
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
    /**
     * 添加input
     */
    addRequest(param){
      if (param==1) {
        this.requestArr.push({domainUrl:''})
      }else if (param==2) {
        this.socketArr.push({domainUrl:''})
      }else if (param==3) {
        this.uploadFileArr.push({domainUrl:''})
      }else if (param==4) {
        this.downloadFileArr.push({domainUrl:''})
      }
    },
    /**
     * 删除input
     */
    deleteRequest(param, index){
      if (param==1) {
        this.requestArr.splice(index,1)
      }else if (param==2) {
        this.socketArr.splice(index,1)
      }else if (param==3) {
        this.uploadFileArr.splice(index,1)
      }else if (param==4) {
        this.downloadFileArr.splice(index,1)
      }
    },
    /**
     * 获取当前操作数据
     */
    getNowOperData(){
      this.requestArr.forEach(element => {
        element.domainUrl&&(this.formData.request_url += 'https://'+ element.domainUrl + ',')
      });
      this.formData.request_url = this.formData.request_url.substr(0, this.formData.request_url.length - 1);

      this.socketArr.forEach(element => {
        element.domainUrl&&(this.formData.socket_url += 'wss://'+element.domainUrl + ',')
      });
      this.formData.socket_url = this.formData.socket_url.substr(0, this.formData.socket_url.length - 1);

      this.uploadFileArr.forEach(element => {
        element.domainUrl&&(this.formData.upload_file_url += 'https://'+element.domainUrl + ',')
      });
      this.formData.upload_file_url = this.formData.upload_file_url.substr(0, this.formData.upload_file_url.length - 1);

      this.downloadFileArr.forEach(element => {
        element.domainUrl&&(this.formData.download_file_url += 'https://'+element.domainUrl + ',')
      });
      this.formData.download_file_url = this.formData.download_file_url.substr(0, this.formData.download_file_url.length - 1);  
      console.log('getNowOperData', this.formData)
    },
    /**
     * 确定提交
     */
    confirmBtn(){
      updateProductUrl(this.formData).then(response => {
        this.$message.success(response.errmsg)
        this.callBack && this.callBack()
        this.close()        
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
    submitForm(formName) {
      this.getNowOperData()
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
      this.formData={
        id: null, // 
        request_url: '', // 服务器域名，request合法域名
        socket_url: '', // 服务器域名-socket合法域名
        upload_file_url: '', // 服务器域名-uploadFile合法域名
        download_file_url: '', // 服务器域名-downloadFile合法域名
      },
      this.requestArr=[],
      this.socketArr=[],
      this.uploadFileArr=[],
      this.downloadFileArr=[],

      this.$emit('update:show', false)
      this.resetForm('formData')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .clk-plus{
    margin-left:10px;
    cursor: pointer;
    font-size: 22px;
    color: $color-default;
    vertical-align: -webkit-baseline-middle;
  }
  .del-col{
    color: $font-error-color !important;
  }
  .dom-inp{
    width: 90%;
    margin-top: 10px;
  }
</style>
