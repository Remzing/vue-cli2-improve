<!-- 支付接口- -->
<template>
  <div style="height:100%;position: relative;">
    <div class="cont-title">支付接口</div>
    <div class="type-title">微信支付</div>
    <el-form :model="weChat" label-position="left" status-icon :rules="rules2" ref="weChat" label-width="100px" class="demo-ruleForm pay-demo pad-50">
       <el-form-item label="APPID" prop="app_id">
        <el-input style="width: 30%;" placeholder="输入APPID" v-model="weChat.app_id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商户号" prop="shop_id">
        <el-input style="width: 30%;" placeholder="输入商户号" v-model="weChat.shop_id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商户密钥" prop="secret">
        <el-input style="width: 30%;"  placeholder="输入密钥" v-model="weChat.secret" auto-complete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="回调地址" prop="redirect_url">
        <el-input style="width: 30%;"  placeholder="输入回调地址" v-model="weChat.redirect_url" auto-complete="off"></el-input>
      </el-form-item> -->
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="weChat.state">
          <el-radio :label='0'>开启</el-radio>
          <el-radio :label='1'>关闭</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="type-title">支付宝</div>
    <el-form :model="alipay" label-position="left" status-icon :rules="rules2" ref="alipay" label-width="100px" class="demo-ruleForm pay-demo pad-50">
      <el-form-item label="APPID" prop="app_id">
        <el-input style="width: 30%;" placeholder="输入APPID" v-model="alipay.app_id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商户号" prop="shop_id">
        <el-input style="width: 30%;" placeholder="输入商户号" v-model="alipay.shop_id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="商户密钥" prop="secret">
        <el-input style="width: 30%;"  placeholder="输入密钥" v-model="alipay.secret" auto-complete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="回调地址" prop="redirect_url">
        <el-input style="width: 30%;"  placeholder="输入回调地址" v-model="alipay.redirect_url" auto-complete="off"></el-input>
      </el-form-item> -->
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="alipay.state">
          <el-radio :label='0'>开启</el-radio>
          <el-radio :label='1'>关闭</el-radio>
        </el-radio-group>
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
import {  saveAlipay , queryAlipay } from '@/api/set/payPort'

export default {
  components: {
  },
  data () {

    return {
      formData:{},
      alipay:{// 支付宝
        id: null, // 
        shop_id: '', // 商户号
        app_id: '', // appid
        secret: null, // 密钥
        state: null, // 状态(0关闭 1开启)
        type: null, // 接口类型 1=微信 2=支付宝
        redirect_url: null, // 收款银行
        is_private: null, // 回调地址
      },
      weChat:{// 微信
        id: null, // 
        shop_id: '', // 商户号
        app_id: '', // appid
        secret: null, // 密钥
        state: null, // 状态(0关闭 1开启)
        type: null, // 接口类型 1=微信 2=支付宝
        redirect_url: null, // 收款银行
        is_private: null, // 回调地址
      },
      rules2: {
       /*  name: [
          { required: true, message: '请输入转款途径产品名称', trigger: 'blur' }
        ],
        bank_name: [
          { required: true, message: '请输入收款户名', trigger: 'blur' }
        ],
        bank_card_open: [
          { required: true, message: '请输入收款账号', trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '请输入收款银行', trigger: 'blur' },
        ],
        is_private: [
          { required: true, message: '请选择公户或私户', trigger: 'blur,change' }
        ] */
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
      queryAlipay({}).then(response => {
        this.alipay = response.data.alipay||{}
        this.weChat = response.data.weChat||{}
        console.log('this.alipay',this.alipay)
      }).catch(error => {
        console.error('selectTemplateInit-error:', error)
      })
    },
    /**
     * 处理数据
     */
    manageData(){
      let tempData = []
      tempData.push(this.alipay)
      tempData.push(this.weChat)
      this.formData = {alipays: JSON.stringify(tempData)}
    },
    /**
     * 确定发布
     */
    confirmBtn(){
      this.manageData()
      saveAlipay(this.formData).then(response => {
        this.$message.success(response.errmsg)
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
    /**
     * 确定提交
     */
    submitForm(formName) {
      /* this.$refs[formName].validate((valid) => {
        console.log('formData:', this.formData)
        if (valid) { */
          this.confirmBtn()
        /* } else {
          this.$message.warning('请检查必填项已填写且格式正确')
          console.log('error submit!!');
          return false;
        }
      }); */
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
  .type-title{
    padding: 6px 0 20px 20px
  }
</style>
