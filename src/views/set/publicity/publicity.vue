<!-- 对公信息- -->
<template>
  <div style="height:100%;position: relative;">
    <div class="cont-title">对公信息</div>    
    <el-form :model="formData" label-position="left" status-icon :rules="rules2" ref="formData" label-width="100px" class="demo-ruleForm">
      <el-form-item class="form-lin" label="转款途径产品名称" prop="name">
        <el-input style="width: 30%;" placeholder="输入转款途径产品名称" v-model="formData.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="收款户名" prop="bank_name">
        <el-input style="width: 30%;" placeholder="输入收款户名" v-model="formData.bank_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="收款账号" prop="bank_card">
        <el-input style="width: 30%;"  placeholder="输入收款账号" v-model="formData.bank_card" auto-complete="off"></el-input>
        <el-form-item prop="is_private" style="display:inline-block;margin-left:20px;" >
          <el-radio-group v-model="formData.is_private">
            <el-radio :label='0'>公户</el-radio>
            <el-radio :label='1'>私户</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form-item>
      <el-form-item label="收款银行" prop="bank">
        <el-input style="width: 30%;"  placeholder="输入收款银行" v-model="formData.bank" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>

    <div class="sure-btn dis-flex">
      <el-button
        type="success"
        size="medium"
        @click="submitForm('formData')"
        >确认发布</el-button>
    </div>
  </div>
</template>
<script>
/*  */
import {  editPublicMsg , queryBankInfo } from '@/api/set/publicity'

export default {
  components: {
  },
  data () {

    return {
      formData:{
        id: null, // 
        name: '', // 转款途径产品名称
        bank_name: null, // 收款户名
        bank_card: null, // 收款账号(对公)
        bank: null, // 收款银行
        is_private: null, // 是否对私(0不是 1是)
      },
      rules2: {
        name: [
          { required: true, message: '请输入转款途径产品名称', trigger: 'blur' }
        ],
        bank_name: [
          { required: true, message: '请输入收款户名', trigger: 'blur' }
        ],
        bank_card: [
          { required: true, message: '请输入收款账号', trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '请输入收款银行', trigger: 'blur' },
        ],
        is_private: [
          { required: true, message: '请选择公户或私户', trigger: 'blur,change' }
        ]
      },
    };
  },
  watch: {

  },
  computed: {
    
  },
  created () {
    this.init()
  },
  mounted () {
    this.$nextTick(function () {
    })
  },
  methods: {
    /** 
     * 初始化
     */
    init(){
      this.editProductInit() 
    },
    /**
     * 编辑对公信息初始化
     */
    editProductInit(id){
      queryBankInfo({}).then(response => {
        this.formData = response.data
      }).catch(error => {
        console.error('selectTemplateInit-error:', error)
      })
    },
    /**
     * 确定发布
     */
    confirmBtn(){
      editPublicMsg(this.formData).then(response => {
        this.$message.success(response.errmsg)
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
    /**
     * 确定提交
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log('formData:', this.formData)
        if (valid) {
          this.confirmBtn()
        } else {
          this.$message.warning('请检查必填项已填写且格式正确')
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .sure-btn{
    position: absolute;
    bottom: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    border-top: 1px solid #eee;
  }
  .func-arr{
    display:inline-block;
    width: 120px;
    max-width: 500px;
    cursor: pointer;
    text-align: center;
    div{
      border: 1px solid #ddd;
      margin-top: -1px;
      height: 40px;
      line-height: 40px
    }
    div:last-child{
      border: 1px solid #3d9738;
      color: #3d9738;
    }
  }
  .func-add{
    display:inline-block;
    margin: 0px 0 0 20px;
  }
</style>
