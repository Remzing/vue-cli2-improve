<style lang="scss">
.console-sidebar {
  .el-submenu__title {
    font-size: 12px;
    height: 46px;
    line-height: 46px;
  }
  .el-submenu {
    background: #37424f;
    border-bottom: 1px solid #414d5c;
  }
  .el-submenu__icon-arrow {
    right: 40px;
    margin-top: -4px;
  }
  .el-icon-message {
    font-size: 12px;
  }
  .el-menu-item {
    font-size: 12px;
    height: 42px;
    line-height: 42px;
    &.is-active {
      border-right: none;
      color: #fff;
      background: #379338 !important;
      &:hover {
        background: #379338 !important;
      }
    }
  }
}

  .console-sidebar {
    position: fixed;
    top: 70px;
    bottom: 0px;
    background-color: #f6f8f9;
    z-index: 102;
    overflow-x: hidden;
    overflow-y: auto;
    height: auto;
    width: 110px;
    box-shadow: 0px 3px 2px 0px 
		rgba(53, 53, 53, 0.08);
    .sidebar-content {
      width: 110px;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      background: #f6f8f9;
      .sidebar-fold {
        height: 30px;
        width: 140px;
        background: #394555;
        color: #aeb9c2;
        text-align: left;
        padding: 0 20px;
        line-height: 30px !important;
        user-select: none;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
      }
    }
    
  }
  .waterLogo{
    width: 70px;
	  height: 34px;
    position: absolute;
    bottom: 23px;
    right: 20%;
    img{
      width: 100%;
    }
  }
  .side-text{
    // text-align: center;
    i{
      vertical-align: unset;
      margin-right: 12px;
      font-size: 14px;
    }
  }
</style>
<template>
  <div class="console-sidebar">
    <el-menu :unique-opened='true' :router='false' theme="dark" :default-active="defaultActive" class="sidebar-content">
      <el-menu-item class="side-text" v-for="(item, index) in Menu" :key="index" :index="item.path" @click="goView(item)">
       <i class="iconfont" v-bind:class="item.icon"></i>{{item.name}}
      </el-menu-item>
    </el-menu>
    <div class="waterLogo"><img src="@/assets/images/logoWater.png" alt=""></div>
  </div>
</template>
<script>
  import { Menu, Submenu, MenuItem, Icon ,Message} from 'element-ui'
  import { getLocal } from '@/utils/index'
  export default {
    components: {
      ElMenu: Menu,
      ElSubmenu: Submenu,
      ElMenuItem: MenuItem,
      Icon: Icon
    },
    data () {
      return {
        Menu: [],
        fonticons:[
          {icon:'&#xe673;'},
          {icon:'&#xe674;'},
          {icon:'&#xe670;'},
          {icon:'&#xe677;'},
          {icon:'&#xe671;'},
          {icon:'&#xe675;'},
          {icon:'&#xe676;'},
        ]
      }
    },
    computed: {
			defaultActive: function() {
        const that = this;
        
				return ('/' + this.$route.path.split('/')[1]);
      },
      
    },
    mounted () {
      this.init()
    },
    methods: {
      init(){
        //如果没有menu 回到登录页面
        if (Object.keys(getLocal('menu'))==0) {
          Message({
            message: '未登录或登录已过期，请重新登录',
            type: 'error',
            duration: 5 * 1000
          })
          this.$router.push({path: '/'})
          return
        }
        this.Menu = getLocal('menu') 
        this.toggleSideBar(this.$route.path)
      },
      // 调用store 下的action-side
      toggleSideBar(param) {
        let onePath = '/' + param.split('/')[1]
        let twoPath = '/' + param.split('/')[1] + '/' +param.split('/')[2]
        this.Menu.forEach(ele => {
          if (ele.path === onePath) {
            // 调用store 下的action
            this.$store.dispatch('ToggleLevTitle', ele.name)
            if(ele.children && ele.children.length>0){
              this.$store.dispatch('ToggleSideBar', ele.children)
              this.$store.dispatch('ToggleNavBar', ele.children[0].children)
              
              ele.children.forEach(eleTwo => {
                console.log('toggleSideBar',eleTwo, eleTwo.path, twoPath)
                if(eleTwo.path == twoPath){
                  console.log('toggleSideBar===', twoPath, eleTwo.children)
                  this.$store.dispatch('ToggleNavBar', eleTwo.children)
                }
              })
            }else{
              this.$store.dispatch('ToggleSideBar', [])
              this.$store.dispatch('ToggleNavBar', [])
            }
            return
          }
        })
      },
      // 一级菜单跳转
      goView(ele) {
        let tempPath
        tempPath = ele.path
        if(ele.children && ele.children.length>0 && 
            ele.children[0].children && ele.children[0].children.length>0){

              console.log('consoleSidebar', ele.children[0].children[0])
          tempPath = ele.children[0].children[0].path
        }
        
        this.toggleSideBar(tempPath)
        this.$router.push({path: tempPath, query:{}})
      }

    }
  }
</script>
