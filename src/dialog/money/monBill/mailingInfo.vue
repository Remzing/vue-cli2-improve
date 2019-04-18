<!-- 邮寄信息 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="邮寄信息"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div style="padding:0 5%">
            <div class="dis-flex warn-hint" style="justify-content: flex-start;">
              <div class="icon-fuhao iconfont"></div>
              <div>完成开票后，填写以下信息！</div>
            </div>
            <div style="margin:10px 0 0;">邮寄信息</div>
            <div class="item-grid">
              <div>邮寄地址：</div><div>{{(param.mail_province||'')+(param.mail_city||'')+(param.mail_area||'')+(param.address||'')}}</div>
            </div>
            <div class="item-grid">
              <div>收件人：</div><div>{{param.recipients||'--'}}</div>
            </div>
            <div class="item-grid">
              <div>手机号码：</div><div>{{param.telephone||'--'}}</div>
            </div>
            <div class="item-grid">
              <div>电话号码：</div><div>{{param.recipients_phone||'--'}}</div>
            </div>
            <div class="item-grid">
              <div>邮政编码：</div><div>{{param.postcode||'--'}}</div>
            </div>
            <el-form :model="formData" label-position="top" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
              <el-form-item label="快递单号" prop="tracking_number">
                <el-input placeholder="请输入单号" type="" v-model="formData.tracking_number" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item prop="express_company">
                <el-input placeholder="请输入快递公司" type="" v-model="formData.express_company" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="submitForm('formData')">确认寄出</el-button>
            <el-button  @click="close">取消</el-button>
          </span>
      </el-dialog>
  </div>
  
</template>

<script>
import * as App from '@/utils/index'
import { mailAddressInfo , confirmMail} from '@/api/money/monBill'


/*  */
export default {
  components: {
    
  },
  data () {
    
    return {
      visible: this.show,
      formData:{
        id: '',
        tracking_number: '', // 快递单号
        express_company: '', // 快递公司
      },
      param: {},
      rules2: {
        tracking_number: [
          { required: true, message: '请输入单号', trigger: 'blur' }
        ],
        express_company: [
          { required: true, message: '请输入快递公司', trigger: 'blur' }
        ],
        
      }
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
      mailAddressInfo({user_id: this.singleItem.user_id}).then(response => {
        this.param = response.data||{}
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
    /**
     * 获取当前操作数据
     */
    getNowOperData(){
      if(this.batchOper){
        // 批量操作
        this.batchItem.forEach(element => {
          this.formData.id += element.id + ','
        });
        this.formData.id = this.formData.id.substr(0, this.formData.id.length - 1);  
      }else{
        // 非批量操作
        this.formData.id = this.singleItem.id
      }
    },
    /**
     * 通过
     */
    confirmBtn(){
      this.getNowOperData()
      console.log('confirmBtn', this.formData)
      this.formData.id = this.formData.id
      confirmMail(this.formData).then(response => {
        this.$message.success(response.errmsg)
        this.callBack && this.callBack()
        this.close()        
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
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

      this.$emit('update:show', false)
      this.resetForm('formData')
      console.log('auditoper-close', this.formData, this.formDataInit)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .item-grid{
    div{
      display: inline-block;
      padding-top: 10px;
    }
    div:first-child{
      margin-left: 5%;
      width: 23%
    }
    div:last-child{
      width: 68%
    }
    .item-hint{
      color: #379338;
    }
  }
</style>
