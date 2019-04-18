<style lang="scss" scoped>
  .login-container {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #e6e8e9;
    background: url(../../assets/images/bgLogin.png) no-repeat bottom;
    // background-repeat: no-repeat;
    // background-size: auto;
    overflow: hidden;
  }
  .login-center{
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .login-logo {
      margin-bottom: 34px;
    }
  }
  .login-form {
    width: 500px;
    height: 562px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 100px rgba(0,0,0,.08);
    padding: 50px 55px;
    margin-bottom: 105px;
    .login-account {
      color: #999;
      text-align: center;
      margin-top: -15px;
      span {
        font-size: 12px;
        &:first-child {
          margin-right: 16px;
        }
      }
    }
    .input-code{
      display: inline-block;
      width: 60%;
    }
    .code-img{
      // float:right;
      display: inline-block;
      height: 100%;
      img{
        width: 144px;
        height: 62px;
        cursor: pointer;
      }
    }
    // .sub-btn {
    //   width: 100%;
      
    // }
    .lg-title{
      font-size: 30px;
      color: #3d9738;
      font-weight: bold;
      text-align: center;
      padding-bottom: 50px;
    }
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
  .low-beat{
    input{
      width: 100%;
      height: 60px;
      border: 1px solid #ededed;
      padding:0 32px;
      border-radius: 30px;
      font-size: 14px;
    }
    .sub-btn{
      width: 390px;
      height: 60px;
      background-image: linear-gradient(to right, #69b834 40%, #3b9638 100%);
      box-shadow: 0px 2px 9px 0px 
        rgba(102, 102, 102, 0.4);
      border-radius: 30px;
      margin-top: 14px;
      font-size: 18px;
      font-weight: bold;
      border: none;
    }
    .forget{
      color: #999999;
    }
}
  .plword-box{
    border-radius: 30px;
    border: 1px solid #ededed;
    padding: 0 32px;
    input.plword{
      border:none;
      padding: 0 32px !important;
    }
    input.pwidth{
      width:75%;
    }
    .getcodes{
      color: #3d9738;
      cursor: pointer;
    }
  }
  .biyanj,
  .zhangyanj{
    color: #bbb;
    cursor: pointer;
    font-size: 18px;
  }
  .iconfont{
    color: #bbb;
    font-size: 18px;
  }
  .el-form-item{
    padding: 0 0 0 32px;
    .iconbox{
      margin-left: -32px !important;
      padding: 0 32px !important;
      input{
        width: 90% ;
        margin:0;
        padding: 0 0 0 10px !important;
      }
      i{
        vertical-align: middle;
      }
    }
    input{
      margin-left: -32px;
      padding: 0 32px;
    }
    button{
      margin-left: -32px !important;
    }
  }
  .img-rad{
    width: 144px;
    border-radius: 40px;
    overflow: hidden;
  }


</style>
<template>
  <div class="login-container">
    <transition name="form-fade" mode="in-out">
      <div class="dis-flex login-center">
        <div class="login-logo">
          <img src="../../assets/images/logoLogin.png">
        </div>
        <!-- 登录 -->
        <div class="login-form low-beat" v-show="loginFlag==1">
          <div class="lg-title">后台登录</div>
          <el-form :model="formLogin" :rules="rulesLogin"  ref="formLogin"><!-- :rules="rulesLogin" -->
            <el-form-item prop="username" class="plword-box">
              <div class="iconbox">
                <i class="iconfont zhanghu"></i>
                <input type="text" v-model="formLogin.username" class="plword" autocomplete = 'new-password'  placeholder="请输入易帮云账号" @keyup.enter="submitForm('formLogin')"></input>
              </div>
            </el-form-item>
            <el-form-item prop="password" class="plword-box">
              <div class="iconbox">
                <i class="iconfont icon-mima"></i>
                <input :type="seen ? 'password' : 'text'" style="width:85%;"  class="plword" v-model="formLogin.password" autocomplete = 'new-password'  placeholder="请输入密码" @keyup.enter="submitForm('formLogin')" ></input>
                <i class="iconfont" :class="{'biyanj':seen, 'zhangyanj': !seen}" @click="changSee"></i>
              </div>
            </el-form-item>
            <el-form-item prop="changeCode" style="margin-bottom:5px;">
              <div class="iconbox plword-box fl" style="width:66%;" >
                <i class="iconfont yanzhengma"></i>
                  <input class="input-code plword" type="text" style="width:66%;"  v-model="formLogin.changeCode" autocomplete = 'new-password'   placeholder="请输入验证码" @keyup.enter="submitForm('formLogin')" ></input>
              </div>
              <span class="code-img fr img-rad"><img  border=0 v-if="codeImg" :src="codeImg" @click="getLoginCode"> </span>
            </el-form-item>
            <el-form-item style="margin-bottom:0px;">
              <el-checkbox class="remember" v-model="checked">记住密码</el-checkbox>
              <a class="forget fr" @click="switchLogin(2)">忘记密码?</a>
            </el-form-item>
            <el-form-item>
              <el-button class="sub-btn" type="success" @keyup.enter="submitForm('formLogin')" @click="submitForm('formLogin')">登录</el-button>
            </el-form-item>  
          </el-form>
          
        </div>
        <!-- 忘记密码 -->
        <div class="login-form low-beat formforget" v-show="loginFlag==2">
          <div class="lg-title">找回密码</div>
          <el-form :model="formRegist" ref="formRegist" :rules="rulesFind">  <!--:rules="rulesFind" -->
            <el-form-item prop="username" class="plword-box">
              <div class="iconbox">
                <i class="iconfont zhanghu"></i>
                <input type="text"  class="plword" v-model="formLogin.username" autocomplete = 'new-password'  placeholder="请输入您手机号码或者邮箱" @keyup.enter="submitRegist('formRegist')"></input>
              </div>
            </el-form-item>
            <el-form-item prop="telephone" class="plword-box">
              <div class="iconbox">
                <i class="iconfont yanzhengma"></i>
                <input type="text" class="plword pwidth" style="width:70%;" v-model="formLogin.telephone" autocomplete = 'new-password'  placeholder="请输入手机验证码" @keyup.enter="submitRegist('formRegist')" ></input>
                <span class="getcodes" @click="pwdSendCode">获取验证码</span>
              </div>
            </el-form-item>
            <el-form-item prop="psw" style="margin-bottom:5px;" class="plword-box">
              <div class="iconbox">
                <i class="iconfont icon-mima"></i>
                <input :type="seen ? 'password' : 'text'" class="plword" style="width: 85%;" v-model="formLogin.psw" autocomplete = 'new-password'  placeholder="设置6~16位字符密码" @keyup.enter="submitRegist('formRegist')"></input>
                <i class="iconfont" :class="{'biyanj':seen, 'zhangyanj': !seen}" @click="changSee"></i>
              </div>
            </el-form-item>
            <el-form-item style="margin-bottom:0px;">
              <a class="forget fr" @click="switchLogin(1)">已找回密码，马上登陆！</a>
            </el-form-item>
            <el-form-item>
              <el-button class="sub-btn" type="success" @keyup.enter="submitRegist('formRegist')" @click="submitRegist('formRegist')" >确认修改</el-button>
            </el-form-item>  
          </el-form>
          <div class="login-account">
          </div>
        </div>
      </div>

    </transition>
  </div>
</template>

<script>
import { Form, FormItem, Input, Button } from 'element-ui'
import { getCode, login, forgetPsw, sendCode } from '@/api/login/login'
import { setLocal } from '@/utils/index'
export default {
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElButton: Button
  },
  data () {
    return {
      formLogin: {
        username: '',
        password: '',
        changeCode: '',
        token: null,
        telephone:'',
        psw:''
      },
      formRegist:{
        username: '',
        password: '',
        changeCode: '',
        token: null,
        telephone:'',
      },
      seen:true,
      checked:true,
      loginFlag:1,//1登录，2找回密码
      rulesLogin: {
        username: [
          { required: true, message: '请输入易帮云账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        changeCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      rulesFind:{
        username: [
          { required: true, message: '请输入您手机号码或者邮箱', trigger: 'blur' }
        ],
       telephone: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' }
        ],
        changeCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        psw: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      },

      codeImg: null,
      phone:null
    }
  },
  created () {
  },
  mounted () {
    // 获取验证码
    this.getLoginCode()
    //记住密码
    this.getCookie()
  },
  methods: {
    getLoginCode () {
      getCode().then(response => {
        const _data = response.data
        console.log('getLoginCode:', _data, this.formLogin, this.$data)
        this.formLogin.token = _data.token
        this.codeImg = _data.img
      }).catch(error => {
        console.error('getLoginCode-error:', error)
      })
    },
    
    //忘记密码-发送短信
    pwdSendCode(){
      sendCode().then(response => {
        const _data = response.data
        console.log('sendCode:', _data, this.formLogin, this.$data)
        this.formLogin.token = _data.token
        this.telephone = _data.telephone
      }).catch(error => {
        console.error('sendCode-error:', error)
      })
    },
    submitForm (name) {
      console.log('sendCode:',name)
      //判断复选框是否被勾选 勾选则调用配置cookie方法
      if (this.checked == true) {
        console.log("checked == true");
        //传入账号名，密码，和保存天数3个参数
        this.setCookie(this.formLogin.username, this.formLogin.password, 7);
      }else {
        console.log("清空Cookie");
        //清空Cookie
        this.clearCookie();
      }
      this.$refs[name].validate((valid) => {
        if (valid) this.goLogin() // 验证通过，前去登录
      })
    },
    //提交修改密码
    submitRegist (res) {
      this.$refs[res].validate((valid) => {
        if (valid) this.forgetPsw() // 验证通过，前去提交修改密码
      })
    },
    /**
     * 切换
     */
    switchLogin(param){
      this.loginFlag = param
    },
    /*
     * 密码眼睛变化切换
     */
    changSee(){
      this.seen = !this.seen;
    },
    /**
     * 记住密码
     */
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    
     //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; '); //这里显示的格式需要切割一下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('='); //再次切割
          //判断查找相对应的值
          if (arr2[0] == 'userName') {
            this.formLogin.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == 'userPwd') {
            this.formLogin.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天
    },
    // forgetPsw() {
    //   return new Promise((resolve, reject) => {
    //     forgetPsw(this.formLogin).then(response => {
    //       const _data = response.data
    //       console.log('login-back:', response)
    //       setLocal('menu', _data.webRightList)
    //       setLocal('admin', _data.admin)
    //       setLocal('photoUrl', _data.domain_url)
    //       this.$router.push({path: '/contrDesk', query:{}})
    //       resolve()
    //     }).catch(error => {
    //       console.error('login-error:', error)
    //       reject(error)
    //     })
    //   })
    // },
     goLogin() {
      return new Promise((resolve, reject) => {
        login(this.formLogin).then(response => {
          const _data = response.data
          console.log('login-back:', response)
          setLocal('menu', _data.webRightList)
          setLocal('admin', _data.admin)
          setLocal('photoUrl', _data.domain_url)
          this.$router.push({path: '/contrDesk', query:{}})
          resolve()
        }).catch(error => {
          console.error('login-error:', error)
          reject(error)
        })
      })
    }
  },
  beforeDestroy () {

  }
}
</script>
