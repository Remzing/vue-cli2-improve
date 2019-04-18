<!-- 合同编号 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="合同编号"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div >
            <el-form :model="formData" label-position="top" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
             
              <el-form-item  prop="contract_no">
                <div><span class="red-star">*</span> 合同编号：</div>
                <el-input
                  style="width: 50%;"
                  placeholder="请输入合同编号"
                  v-model="formData.contract_no">
                </el-input>
              </el-form-item>
              <el-form-item  prop="contract_remark">
                <div><span class="red-star">*</span> 修改理由：</div>
                <el-input
                  style="width: 50%;"
                  placeholder="请输入修改的理由"
                  v-model="formData.contract_remark">
                </el-input>
              </el-form-item>
            </el-form>
            
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="submitForm('formData')">确认提交</el-button>
            <el-button  @click="close">取消</el-button>
          </span>
      </el-dialog>
  </div>
  
</template>

<script>
import * as App from '@/utils/index'
import { updateContractNo } from '@/api/order/customorder'

/*  */
export default {
  components: {
    
  },
  data () {
    return {
      visible: this.show,
      formData:{
        id: null, // 
        contract_no: null, // 
        contract_remark: '', //
      },
      start_time: '',
      radioEndTime: '',
      rules2: {
        contract_no: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]+$/, message: '只能输入字母和数字' }///[^\u4E00-\u9FA5A-Za-z0-9._]/g
        ],
        contract_remark: [
          { required: true, message: '请输入修改理由', trigger: 'blur' }
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
      this.start_time = this.singleItem.create_time
      this.formData.contract_no = this.singleItem.contract_no||''
    }
  },
  computed: {
  },
  created () {
 
  },
  mounted () {
    this.$nextTick(function () {
      console.log('callBack', this.callBack)
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
     * 确定提交
     */
    confirmBtn(){
      this.getNowOperData()

      updateContractNo(this.formData).then(response => {
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
        id: null, // 
        contract_no: null, // 
        contract_remark: '', //
      }
      this.$emit('update:show', false)
      this.resetForm('formData')
      this.formData = formDataInit
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
