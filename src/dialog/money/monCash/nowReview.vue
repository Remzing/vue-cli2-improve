<!-- 提现审核 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="提现审核"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div style="padding:0 5%">
            <div class="dis-flex warn-hint" style="justify-content: flex-start;">
              <div class="icon-fuhao iconfont "></div>
              <div>确认以下信息后，操作提交！</div>
            </div>
            <div style="margin:10px 0 0;">提现信息</div>
            <div class="item-grid">
              <div>提现金额：</div><div>{{param.money||'--'}}</div>
            </div>
            <div class="item-grid">
              <div>开  户 名：</div><div>{{param.bankname_kaihu||'--'}}</div>
            </div>
            <div class="item-grid">
              <div>开户账号：</div><div>{{param.bankid_kaihu||'--'}}</div>
            </div>
            <div class="item-grid">
              <div>开户银行：</div><div>{{param.bank_kaihu||'--'}}</div>
            </div>
            <el-form :model="formData" label-position="top" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
              <div style="margin:14px 0;">转款信息：</div>
              <el-form-item  prop="bankname_self">
                <el-select v-model="formData.bankname_self" size="medium " placeholder="选择付款银行">
                  <el-option v-for="item in bankOption" :key="item.id" :label="item.bank" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  prop="transaction_number">
                <el-input placeholder="请输入付款平台交易号" type="" v-model="formData.transaction_number" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item  prop="pay_time">
                <el-date-picker
                  v-model="formData.pay_time"
                  type="date"
                  size="medium "
                  value-format="yyyy-MM-dd"
                  placeholder="付款时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item  prop="remark">
                <label><span class="red-star">*</span>审核备注：</label>
                <el-input type="textarea" :maxlength="100"  :rows="3" v-model="formData.remark" placeholder="允许输入100字"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="submitForm('formData')">审核通过</el-button>
            <el-button  @click="auditFailBtn">拒绝审核</el-button>
          </span>
      </el-dialog>
  </div>
  
</template>

<script>
import * as App from '@/utils/index'
import { reviewInit, reviewOk ,notReview} from '@/api/money/monCash'

/*  */
export default {
  components: {
    
  },
  data () {
    
    return {
      visible: this.show,
      formData:{
        id: '',
        bankname_self: '', // 转款银行信息
        transaction_number: '', // 付款平台交易号
        pay_time: '', // 付款时间
        remark: '', // 备注
      },
      param: {},
      bankOption:[],
      rules2: {
        bankname_self: [
          { required: true, message: '请选择转款银行', trigger: 'blur,change' }
        ],
        transaction_number: [
          { required: true, message: '请输入付款平台交易号', trigger: 'blur' }
        ],
        pay_time: [
          { required: true, message: '请选择付款时间', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入审核备注', trigger: 'blur' }
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
      this.pay_name = this.singleItem.pay_name
      this.init()
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
      reviewInit({id:this.singleItem.id}).then(response => {
        this.param = response.data.financeCash
        this.bankOption = response.data.bankList
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
    /**
     * 获取当前操作数据
     */
    getNowOperData(){
      // 非批量操作
      this.formData.id = this.singleItem.id
      
    },
    /**
     * 通过
     */
    confirmBtn(){
      this.getNowOperData()
      console.log('confirmBtn', this.formData)

      reviewOk(this.formData).then(response => {
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
     * 拒绝审核
     */
    auditFailBtn(){
      this.getNowOperData()
      // validateField  Function(prop: string, callback: Function(errorMessage: string))
      this.$refs.formData.validateField('remark',(valid) => {
        console.log('remark',valid)
        if (!valid) {
           notReview(this.formData).then(response => {
            this.$message.success(response.errmsg)
            this.callBack && this.callBack()
            this.close()        
          }).catch(error => {
            console.error('noPass-error:', error)
          })
          
        } else {
          console.log('error submit!!');
          return false;
        }
      })
     
    },
    /**
     * 关闭弹窗
     */
    close(){
      let formDataInit = {
        number: '',
        money: '',
        id: '',
      }
      this.$emit('update:show', false)
      this.resetForm('formData')
      this.formData = formDataInit
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
