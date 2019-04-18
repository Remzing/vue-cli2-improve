<!-- 确认开票 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="确认开票"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div style="padding:0 5%">
            <div class="dis-flex warn-hint" style="justify-content: flex-start;">
              <div class="icon-fuhao iconfont "></div>
              <div>完成开票后，填写以下信息！</div>
            </div>
            <div style="margin:10px 0 0;">开票信息</div>
            <div class="item-grid">
              <div>发票类型：</div><div>{{param.bill_type||'--'}}</div>
            </div>
            <div class="item-grid">
              <div>发票抬头：</div><div>{{param.bill_title||'--'}}</div>
            </div>
            <div class="item-grid">
              <div>开票金额：</div><div>{{param.bill_money||'--'}}</div>
            </div>
            <div class="item-grid">
              <div>纳税识别号：</div><div>{{param.itin||'--'}}</div>
            </div>
            <div class="item-grid">
              <div>开户银行：</div><div>{{param.bank||'--'}}</div>
            </div>
            <div class="item-grid">
              <div>开户账号：</div><div>{{param.bank_id||'--'}}</div>
            </div>
            <div class="item-grid">
              <div>公司地址：</div><div>{{param.address||'--'}}</div>
            </div>
            <div class="item-grid">
              <div>公司电话：</div><div>{{param.telephone||'--'}}</div>
            </div>
            <el-form :model="formData" label-position="top" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
              <el-form-item label="发票编号" prop="bill_num">
                <el-input placeholder="请输入发票编号" type="" v-model="formData.bill_num" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="submitForm('formData')">确认已开</el-button>
            <el-button  @click="close">取消</el-button>
          </span>
      </el-dialog>
  </div>
  
</template>

<script>
import * as App from '@/utils/index'
import { confirmBillInit , confirmBill } from '@/api/money/monBill'

/*  */
export default {
  components: {
    
  },
  data () {
    
    return {
      visible: this.show,
      formData:{
        id: '',
        bill_num:''
      },
      param: {},
      rules2: {
        bill_num: [
          { required: true, message: '请输入发票编号', trigger: 'blur' }
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
      confirmBillInit({id: this.singleItem.id}).then(response => {
        this.param = response.data
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

      confirmBill(this.formData).then(response => {
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
        bill_num: '',
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
      width: 23% !important;
    }
    div:last-child{
      width: 68%;
    }
    .item-hint{
      color: #379338;
    }
  }
  .el-form--label-top .el-form-item__label{
    padding: 0 !important;
  }
</style>
