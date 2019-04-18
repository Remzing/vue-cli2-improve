<!-- 创建订单 -dialog -->
<template>
  <div class="dialog-container createOrder">
      <el-dialog
          title="创建订单"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div >
            <el-form :model="formData" label-position="top" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
             
              <el-form-item  prop="type_id">
                <div><span class="red-star">*</span> 定制类型：</div>
                <el-radio-group v-model="formData.type_id">
                  <el-radio v-for="(item, index) in customArr"  :key="index" :label="item.id">{{item.type}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item  prop="demand_name">
                <div><span class="red-star">*</span> 定制名称：</div>
                <el-input
                  style="width: 50%;"
                  placeholder="请输入定制名称"
                  v-model="formData.demand_name">
                </el-input>
              </el-form-item>
              <el-form-item  prop="contract_no">
                <div><span class="red-star">*</span> 合同编号：</div>
                <el-input
                  style="width: 50%;"
                  placeholder="请输入合同编号"
                  v-model="formData.contract_no">
                </el-input>
              </el-form-item>
              <el-form-item  prop="start_time">
                <div><span class="red-star">*</span> 合同周期：</div>
                <el-date-picker :editable="false" v-model="timeSlot" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium ">
                </el-date-picker>
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
import {selectDemandListInit, createOrderMade } from '@/api/operation/customneeds'

/*  */
export default {
  components: {
    
  },
  data () {
    return {
      visible: this.show,
      formData:{
        id: null, //
        user_id: null, //
        type_id:'', //
        contract_no: null, // 
        demand_name: null, // 
        start_time: null,// 开始时间
        end_time: null,// 结束时间
      },
      customArr:[],
      timeSlot: [],  //时间段
      // checkList: ['选中且禁用','复选框 A'],
      rules2: {
        type_id: [
          { required: true, message: '请选择定制类型', trigger: 'blur,change' },
        ],
        contract_no: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]+$/, message: '只能输入字母和数字' }///[^\u4E00-\u9FA5A-Za-z0-9._]/g
        ],
        demand_name: [
          { required: true, message: '请输入定制名称', trigger: 'blur' }
        ],
        start_time: [
          { required: true, message: '请选择合同周期', trigger: 'blur' }
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
      this.show&&this.init()
    },
    timeSlot: function (val, oldVal) {
      console.log('new:', val, oldVal)
      if (val){
        this.formData.start_time = val[0]
        this.formData.end_time = val[1]
      }
    },
  },
  computed: {
  },
  created () {
    //this.init()
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
      this.formData.type_id =  this.singleItem.type_id

      selectDemandListInit().then(response => {
        this.customArr = response.data
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
      this.formData.user_id = this.singleItem.user_id
      console.log('this.formData.user_id',this.formData.user_id)

    },
    /**
     * 确定提交
     */
    confirmBtn(){
      this.getNowOperData()

      createOrderMade(this.formData).then(response => {
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
     // this.formData = formDataInit
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
