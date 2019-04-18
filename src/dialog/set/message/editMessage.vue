<!-- 编辑消息 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="编辑消息"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div >
            <el-form :model="formData" label-position="top" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
             
              <el-form-item>
                <div> 消息类型：</div>
                {{formData.message_type}}
              </el-form-item>
              <el-form-item  prop="msg_name">
                <div> 消息名称：</div>
                <el-input
                  style="width: 50%;"
                  placeholder="请输入消息名称"
                  v-model="formData.msg_name">
                </el-input>
              </el-form-item>
              <el-form-item  prop="send_types">
                <div> 发送方式：</div>
                <el-radio-group  v-model="formData.send_types">
                  <el-radio :label="'1'">短信</el-radio>
                  <el-radio :label="'2'">微信消息</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item  prop="phone_content">
                <div> 消息内容：</div>
                <el-input type="textarea"  :rows="3" v-model="formData.phone_content" placeholder="请输入消息内容"></el-input>
              </el-form-item>
              <el-form-item  prop="contract_no">
                <div> 把下面的字段点击可以插入到上面内容中要显示的位置：</div>
                <div class="ziduan" @click="addCont('{currentDay}')">交易时间</div>
                <div class="ziduan" @click="addCont('{money}')">续费金额</div>
                <div class="ziduan" @click="addCont('{username}')">客户账号</div>
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
import { compileMessageEcho , compileMessage } from '@/api/set/message'

/*  */
export default {
  components: {
    
  },
  data () {
    return {
      visible: this.show,
      formData:{
        id: null, // 
        send_types: null, //发送类型(1短信,2微信) 
        phone_content: '', //消息内容
      },
      start_time: '',
      radioEndTime: '',
      rules2: {
        /* contract_no: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]+$/, message: '只能输入字母和数字' }///[^\u4E00-\u9FA5A-Za-z0-9._]/g
        ],
        contract_remark: [
          { required: true, message: '请输入修改理由', trigger: 'blur' }
        ], */
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
      this.show && this.init()
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
      compileMessageEcho({id:this.singleItem.id}).then(response => {
        this.formData = response.data
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
     * 添加内容
     */
    addCont(param){
      this.formData.phone_content += param
    },
    /**
     * 确定提交
     */
    confirmBtn(){
      this.getNowOperData()

      compileMessage(this.formData).then(response => {
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
  .ziduan{
    display: inline-block;
    width: 70px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    background-color: rgba(242, 242, 242, 1);
    margin-right: 10px;
    text-align: center;
    cursor: pointer;
  }
</style>
