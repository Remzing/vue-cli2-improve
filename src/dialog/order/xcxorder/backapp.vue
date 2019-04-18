<!-- 恢复应用 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="恢复应用"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div style="padding:0">
            <div class="dis-flex warn-hint">
              <div class="icon-fuhao iconfont "></div>
              <div>您确定要恢复应用？</div>
            </div>
            <el-form :model="formData" label-position="top" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
              <!-- <el-form-item  prop="reason">
                <label><span class="red-star">*</span>恢复理由：</label>
                <el-input type="textarea"  :rows="3" v-model="formData.reason" placeholder="请输入关闭理由"></el-input>
              </el-form-item> -->
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button  @click="close">取消</el-button>
            <el-button type="success" @click="submitForm('formData')">确认提交</el-button>
          </span>
      </el-dialog>
  </div>
  
</template>

<script>
import * as App from '@/utils/index'
import { openOrderXcx } from '@/api/order/xcxorder'
/*  */
export default {
  components: {
    
  },
  data () {
    return {
      visible: this.show,
      formData:{
        id: '',
        // reason: '',
      },
      rules2: {
        reason: [
          { required: true, message: '请输入关闭理由', trigger: 'blur' }
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
     * 确定提交
     */
    confirmBtn(){
      this.getNowOperData()
      console.log('confirmBtn', this.formData)

      openOrderXcx(this.formData).then(response => {
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
        id: '',
        reason: '',
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
