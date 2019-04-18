<!-- 提交财务 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="提交财务"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div >
            <el-form :model="formData" label-position="top" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
              <el-form-item  prop="admin_id">
                <div><span class="red-star">*</span> 选择开票人：</div>
                <el-select v-model="formData.admin_id" size="medium " placeholder="选择对象">
                  <el-option v-for="item in adminOption" :key="item.id" :label="item.real_name" :value="item.id"></el-option>
                </el-select>
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
import { commitFinanceInit, commitFinance } from '@/api/money/monBill'
/*  */
export default {
  components: {
    
  },
  data () {
    return {
      visible: this.show,
      formData:{
        id: null, // 
        admin_id: '', // 开票人
        type: '1', // 操作类型 1=提交财务 2=取消开票
      },
      adminOption: [],
      rules2: {
        admin_id: [
          { required: true, message: '请选择开票人', trigger: 'blur,change' }
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
      this.formData.admin_id = this.singleItem.admin_id
    }
  },
  computed: {
  },
  created () {
    this.init()
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
      commitFinanceInit().then(response => {
        this.adminOption = response.data      
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
     * 确定提交
     */
    confirmBtn(){
      this.getNowOperData()

      commitFinance(this.formData).then(response => {
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
        admin_id: '', // 
        remark: '', // 
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
