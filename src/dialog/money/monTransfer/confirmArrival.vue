<!-- 确认到账 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="确认到账"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div style="padding:0 10%">
            <div class="dis-flex warn-hint" style="justify-content: flex-start;">
              <div class="icon-fuhao iconfont "></div>
              <div>您确认所选的记录是否已到账？</div>
            </div>
            <div style="margin:14px 0;">付款户名：{{pay_name}}</div>
            <el-form :model="formData" label-position="top" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
              
              <el-form-item  prop="number">
                <el-input placeholder="请输入付款平台订单号" type="" v-model="formData.number" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item  prop="money">
                <el-input placeholder="请输入到账金额" type="" v-model="formData.money" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item  prop="account_time">
                <el-date-picker
                  v-model="formData.account_time"
                  type="date"
                  size="medium "
                  value-format="yyyy-MM-dd"
                  placeholder="到账时间">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="submitForm('formData')">确定到账</el-button>
            <el-button  @click="close">取消</el-button>
          </span>
      </el-dialog>
  </div>
  
</template>

<script>
import * as App from '@/utils/index'
import { confirmTheAccount } from '@/api/money/monTransfer'

/*  */
export default {
  components: {
    
  },
  data () {
    
    return {
      visible: this.show,
      formData:{
        number: '',// 付款平台订单号
        money: '',// 到账金额
        id: '',
        account_time: '', // 到账时间
      },
      pay_name: null,
      rules2: {
        number: [
          { required: true, message: '请输入付款平台订单号', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入到账金额', trigger: 'blur' }
        ],
        account_time: [
          { required: true, message: '请选择到账时间', trigger: 'blur' }
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

      confirmTheAccount(this.formData).then(response => {
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

</style>
