<!-- 重置密码 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="重置密码"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div style="padding:0 10%">
            <el-form :model="formData" label-position="top" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
              <el-form-item  prop="password">
                <div  class="seenBox">
                  <el-input :type="seen ? 'password' : 'text'" placeholder="输入密码" v-model="formData.password" auto-complete="off"> 
                  </el-input>
                  <i class="iconfont" :class="{'biyanj':seen, 'zhangyanj': !seen}" @click="changSee"></i>
                </div>
                
              </el-form-item>
              <el-form-item  prop="rpassword">
                <div class="lookBox">
                  <el-input :type="look ? 'password' : 'text'" placeholder="确认密码"  v-model="formData.rpassword" auto-complete="off">
                  </el-input>
                  <i class="iconfont" :class="{'biyanj':look, 'zhangyanj': !look}" @click="changLook"></i>
                </div>
                
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="submitForm('formData')">确定重置</el-button>
            <el-button  @click="close">取消</el-button>
          </span>
      </el-dialog>
  </div>
  
</template>

<script>
import * as App from '@/utils/index'
import { updatePassword } from '@/api/customer/commoncust'
/*  */
export default {
  components: {
    
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formData.rpassword !== '') {
          this.$refs.formData.validateField('rpassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      visible: this.show,
       seen:true,
       look:true,
      formData:{
        password: '',
        rpassword: '',
        user_id: '',
      },
      rules2: {
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        rpassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
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
     changSee(){
      this.seen = !this.seen;
    },
    changLook(){
      this.look = !this.look;
    },
    /**
     * 获取当前操作数据
     */
    getNowOperData(){
      if(this.batchOper){
        // 批量操作
        this.batchItem.forEach(element => {
          this.formData.user_id += element.id + ','
        });
        this.formData.user_id = this.formData.user_id.substr(0, this.formData.user_id.length - 1);  
      }else{
        // 非批量操作
        this.formData.user_id = this.singleItem.id
      }
    },
    /**
     * 通过
     */
    confirmBtn(){
      this.getNowOperData()
      console.log('confirmBtn', this.formData)

      updatePassword(this.formData).then(response => {
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
        password: '',
        rpassword: '',
        user_id: '',
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
  .seenBox, .lookBox{
    position: relative;
    .iconfont{
      position: absolute;
      right: 32px;
      top: 0;
    }
  }
</style>
