<!-- 手工续费 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="手工续费"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div >
            <el-form :model="formData" label-position="top" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
              
              <div><span class="red-star">*</span> 使用期限：</div>
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
                  @change='cancelItem'
                  value-format="yyyy-MM-dd"
                  placeholder="到期日期">
                </el-date-picker>
              </el-form-item>
              <el-radio-group @change='changeEndTime'  v-model="radioEndTime">
                <el-radio label="1">新增1个月</el-radio>
                <el-radio label="2">新增1个季度</el-radio>
                <el-radio label="3">新增1年</el-radio>
              </el-radio-group>
              <el-form-item  prop="money">
                <div><span class="red-star">*</span> 输入金额：</div>
                <el-input
                  style="width: 50%;"
                  placeholder="请输入金额"
                  v-model="formData.money">
                  <i slot="suffix" class="">元</i>
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
import { handRenew } from '@/api/order/xcxorder'
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
        user_id: null, // 
        money: '', // 
      },
      start_time: '',
      radioEndTime: '',
      rules2: {
        end_time: [
          { required: true, validator: validatePass2, trigger: 'blur,change' }
        ],
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { pattern: /^[0-9.]+$/, message: '输入的金额有误' }
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
    },
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
    changeEndTime(){
      
      console.log('changeEndTime',this.radioEndTime,this.$refs.formData.fields[0])
      let dateArr = (this.start_time||'').split('-');
      let year = Number(dateArr[0]) //获取当前日期的年份
      let month = Number(dateArr[1]) //获取当前日期的月份
      let day = Number(dateArr[2]) //获取当前日期的日
      // this.formData.end_time
      console.log('date--',year,month,day,)
      if (!year||!month||!day){
        return
      }
      let daArr = [1, 3, 5, 7, 8, 10,12]
      let xiaoArr = [2, 4, 6, 9, 11]
      let endYear,endMonth,endDay
      
      if(this.radioEndTime==1){
        //一个月
        endYear = year
        endMonth = (month+1)>12? (month+1)%12 : (month+1)
        endDay = day
      }else if(this.radioEndTime==2){
        // 一个季度
        endYear = year
        endMonth = (month+3)>12? (month+3)%12 : (month+3)
        endDay = day
      }else if(this.radioEndTime==3){
        //一年
        endYear = year+1
        endMonth = month
        endDay = day
      }
      if (xiaoArr.indexOf(endMonth)>-1){
        endDay = (day>30)?30:day
        if (endMonth==2){//二月
          if((endYear % 4 == 0) && (endYear % 100 != 0 || endYear % 400 == 0)){
            //闰年 2月
            endDay = 29
          }else{
            //平年 2月
            endDay = 28
          }
        }
      }
      this.formData.end_time = endYear +'-'+ endMonth +'-'+ endDay
      // this.$refs.formData.validate()
      this.$refs.formData.validateField('end_time')
      
    },
    cancelItem(){
      this.radioEndTime = ''
    },
    /**
     * 获取当前操作数据
     */
    getNowOperData(){
      this.formData.user_id = this.singleItem.id
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

      handRenew(this.formData).then(response => {
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
       // reason: '', // 
        user_id: '', // 
        money: '', // 
      }
      this.radioEndTime = ''
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
