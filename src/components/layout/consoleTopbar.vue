<style scoped lang="scss">
.console-topbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  clear: both;
  height: 70px;
  font-size: 12px;
  width: 100%;
  box-shadow: 0px 3px 2px 0px 
		rgba(53, 53, 53, 0.08);
  .el-col {
    background: #fff;
    height: 70px;
    color: #353535;
    font-size: 14px;
    line-height: 70px;
    .topbar-home {
      position: relative;
      display: block;
      width: 70px;
      background: #fff;
      font-size: 28px;
      color: #353535;
      text-align: center;
      height: 70px;
      line-height: 70px;
      overflow: hidden;
      float: left;
      margin-left: 20px;
      &:before {
        content: '';
        position: absolute;
        width: 50px;
        height: 50px;
        left: 11px;
        top: 11px;
        display: inline-block;
        background: url(../../assets/images/logo.png) no-repeat center center;
        background-size: cover;
      }
    }
    .topbar-home-link {
      display: inline-block;
      height: 70px;
      box-sizing: border-box;
      padding: 0 20px 0 0;
      color: #353535;
      font-size: 14px;
      line-height: 70px;
      // border-right: 1px solid #008fbf;
    }
    .topbar-info {
      float: right;
      line-height: 70px;
      padding: 0 30px 0 10px;
      height: 70px;
      display: block;
      z-index: 2;
      background: #fff;
      color: #353535;
      font-size: 14px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      .user-name {
        color: #379338;
        font-size: 14px;
      }
      .wel-span{
        color: #888;
      }
      .el-dropdown-menu {
        padding: 0 !important;
        .el-dropdown-menu__item {
          padding: 0 10px;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
<template>
  <el-row class="console-topbar" type="flex">
    <el-col :xs="12" :sm="12" :md="12" :lg="12">
      <a class="topbar-home" target="_blank" href="javascript:void(0);"></a>
      <a href="javascript:void(0);" target="_self" class="topbar-home-link">
        <span>小程序SaaS管理平台</span>
      </a>
    </el-col>
    <el-col :xs="12" :sm="12" :md="12" :lg="12">
      <el-dropdown trigger="click" class="topbar-info" @command="handleCommand">
        <span class="wel-span">欢迎回来， 
          <span  class="user-name">
            {{admin.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <span class="user-name">消息</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>重置密码</el-dropdown-item> -->
          <el-dropdown-item command="signOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
  import { Row, Col, Dropdown, Icon, DropdownMenu, DropdownItem } from 'element-ui'
  import { getLocal } from '@/utils/index'
  export default {
    components: {
      ElRow: Row,
      ElCol: Col,
      ElDropdown: Dropdown,
      ElDropdownMenu: DropdownMenu,
      ElDropdownItem: DropdownItem,
      Icon: Icon
    },
    data () {
      return {
        admin:{}
      }
    },
    mounted () {
      this.admin = getLocal('admin')||{}
    },
    methods: {
      handleCommand(command) { // 点击菜单项触发的事件回调
        const that = this;
        if(command == 'signOut') { // 模拟退出登录
          localStorage.clear()
          that.$router.replace({path: '/'});
        }
        
      }
    }
  }
</script>
