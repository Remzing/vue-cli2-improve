<!-- 更改状态 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="更改状态"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div >
            <el-form :model="formData" label-position="top" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
              <el-form-item  prop="state">
                <div><span class="red-star">*</span> 状态：</div>
                <el-select v-model="formData.state" size="medium " placeholder="订单状态">
                  <el-option v-for="item in stateOption" :key="item.state" :label="item.label" :value="item.state"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  prop="remark">
                <label><span class="red-star">*</span>输入备注：</label>
                <el-input type="textarea"  :rows="3" v-model="formData.remark" placeholder="请输入备注"></el-input>
                <!-- <el-input placeholder="确认密码" type="password" v-model="formData.remark" auto-complete="off"></el-input> -->
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
import { updateOrderMadeState } from '@/api/order/customorder'
/*  */
export default {
  components: {
    
  },
  data () {
    return {
      visible: this.show,
      formData:{
        order_made_id: null, // 
        state: '', // 
        remark: '', // 
      },
      start_time: '',
      rules2: {
        state: [
          { required: true, message: '请选择订单状态', trigger: 'blur,change' }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
        
      },
      // 下拉框选项
      stateOption:[
        { state: '', label: '订单状态' }, 
        { state: 1, label: '产品设计' },
        { state: 2, label: 'UI设计' },
        { state: 3, label: '程序开发' },
        { state: 4, label: '内部测试' },
        { state: 5, label: '完成验收' },
        { state: 6, label: '订单暂停' },
        { state: 7, label: '订单终止' },
      ],
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
      this.formData.state = this.singleItem.state
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
          this.formData.order_made_id += element.id + ','
        });
        this.formData.order_made_id = this.formData.order_made_id.substr(0, this.formData.order_made_id.length - 1);  
      }else{
        // 非批量操作
        this.formData.order_made_id = this.singleItem.id
      }
    },
    /**
     * 确定提交
     */
    confirmBtn(){
      this.getNowOperData()

      updateOrderMadeState(this.formData).then(response => {
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
        order_made_id: null, // 
        state: '', // 
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
