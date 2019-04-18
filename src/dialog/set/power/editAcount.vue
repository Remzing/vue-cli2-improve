<!-- 编辑管理员 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="编辑管理员"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div style="padding:0 10%">
            <el-form :model="formData" label-position="left" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
              <el-form-item  label="管理组" prop="role_id">
                <el-select v-model="formData.role_id" size="medium " placeholder="选择管理组">
                  <el-option v-for="item in roleOption"  :key="formData.id" :label="item.roleName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名"  prop="real_name">
                <el-input placeholder="请输入姓名" type="" v-model="formData.real_name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="工号" prop="empno">
                <el-input placeholder="请输入员工工号" type="" v-model="formData.empno" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="telephone">
                <el-input placeholder="请输入手机号码" type="" v-model="formData.telephone" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="username">
                <el-input placeholder="请输入用户名" type="" v-model="formData.username" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input placeholder="请输入密码" type="password" v-model="formData.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input placeholder="请输入邮箱" type="" v-model="formData.email" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="submitForm('formData')">确定提交</el-button>
            <el-button  @click="close">取消</el-button>
          </span>
      </el-dialog>
  </div>
  
</template>

<script>
import * as App from '@/utils/index'
import { editAdmin, saveOrUpdateAdmin } from '@/api/set/power'

/*  */
export default {
  components: {
    
  },
  data () {
    
    return {
      visible: this.show,
      formData:{
        id:null,
        role_id: '',// 管理组
        real_name: '',// 真实姓名
        empno: '',// 工号
        telephone: '', // 手机号D
        username: '', // 用户名
        password: '', // 密码
        email: '', // 邮箱
      },
      pay_name: null,
      roleOption:[],
      rules2: {
        role_id: [
          { required: true, message: '请选择管理组', trigger: 'blur' }
        ],
        real_name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        empno: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
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
      !this.show&&(this.singleItem=[])
      this.show&&this.init()
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
      editAdmin({id:(this.singleItem.id||null),type:1}).then(response => {
        let _data = response.data||{}
        this.roleOption = _data.roles||[]
        this.formData = _data.user||{}
      }).catch(error => {
        console.error('noPass-error啊啊啊啊啊啊:', error)
      })
    },
    /**
     * 通过
     */
    confirmBtn(){
      console.log('confirmBtn', this.formData)

      saveOrUpdateAdmin(this.formData).then(response => {
        this.$message.success(response.errmsg)
        this.callBack && this.callBack()
        this.close()        
      }).catch(error => {
        console.error('noPass-erroraaaaaaaaaaaaaaaaaaaaaa:', error)
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
        number: '',
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

</style>
