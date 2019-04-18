<!-- 更改期限 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="更改期限"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div >
            <el-form :model="formData" label-position="top" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
              
              <div><span class="red-star">*</span> 期限范围：</div>
              <el-date-picker
                :readonly='true'
                v-model="start_time"
                type="date"
                size="medium "
                value-format="yyyy-MM-dd"
                placeholder="开始日期">
              </el-date-picker>
              <span>-</span>
              <el-form-item  prop="end_time" style="display: inline-block;">
                <el-date-picker
                  v-model="formData.end_time"
                  type="date"
                  size="medium "
                  value-format="yyyy-MM-dd"
                  placeholder="到期日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item  prop="reason">
                <div><span class="red-star">*</span> 更改理由：</div>
                <el-select v-model="formData.reason" size="medium " placeholder="选择理由">
                  <el-option v-for="item in typeOption" :key="item.type" :label="item.label" :value="item.label"></el-option>
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
import { updateEndTime } from '@/api/order/xcxorder'
/*  */
export default {
  components: {
    
  },
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择到期日期'));
      } else {
        var nowDateStart = new Date(this.start_time).getTime()
        var nowDateEnd = new Date(value).getTime()
        if (nowDateEnd <= nowDateStart) {
          callback(new Error('到期时间必须大于开始时间！'));
        } else {
          callback();
        }
      }
    };
    return {
      visible: this.show,
      formData:{
        end_time: null, // 
        id: null, // 
        reason: '', // 
      },
      start_time: '',
      rules2: {
        end_time: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        reason: [
          { required: true, message: '请选择更改理由', trigger: 'blur' }
        ],
        
      },
      // 下拉框选项
      typeOption:[
        { type: '', label: '选择理由' }, 
        { type: '1', label: '续费成功，到期错误' },
        { type: '2', label: '业务需要，调整到期日期' },
        { type: '3', label: '优惠赠送，调整到期日期' },
        { type: '4', label: '其他原因' },
      ],
      timeSlot: ['2018-01-28', '2018-01-30']
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

      updateEndTime(this.formData).then(response => {
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
        end_time: null, // 
        id: null, // 
        reason: '', // 
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
