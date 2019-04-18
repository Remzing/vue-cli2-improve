<style lang="scss">
.console-navbar {
  .el-menu {
    margin-top: 70px;
    width: 120px !important;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #e6e8e9;
  }
  .el-menu-item-group__title, .lev-title {
    position: fixed;
    left: 110px;
    top: 70px;
    width: 80px;
    height: 60px;
    line-height: 70px;
    background: #e6e8e9;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 700;
    color: #888;
    margin: 0px 20px 0;
    border-bottom: 1px solid #ddd;
    z-index: 10;
  }
  .el-menu-item {
    font-size: 12px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 0 !important;
    width: 120px;
    &.is-active {
      color: #379338;
      // border-right: 22px solid #379338;
      z-index: 2;
      // background-color: #fff;
    }
  }
}
.el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    color: #379338;
    background-color: transparent !important;
  }
  .console-navbar {
    position: fixed;
    top: 70px;
    bottom: 0;
    z-index: 2;
    overflow: hidden;
    transition: all .2s ease;
    width: 120px;
    &.navbar-full {
      left: 110px;
    }
    .product-nav-stage {
      width: 120px;
      overflow: hidden;
      position: absolute;
      top: 0px;
      bottom: 0px;
      right: 0px;
      left: 0;
    }
  }
</style>

<template>

<div class="console-navbar navbar-full">
  <div class="product-nav-stage">
    <el-menu mode="vertical" :router='false' :default-active="defaultActive">
      <!-- <el-menu-item-group :title="description"> -->
        <div class="lev-title">{{sidebar.levTitle}}</div>
        <el-menu-item v-for="(item, index) in sidebar.twoLev" :key="index" :index="item.path" 
        :class="{'is-active': defaultActive == item.path}" @click="goView(item)">{{item.name}}</el-menu-item>
      <!-- </el-menu-item-group> -->
    </el-menu>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Menu, MenuItem, MenuItemGroup } from 'element-ui'
import { getLocal } from '@/utils/index'
export default {
  components: {
    ElMenu: Menu,
    ElMenuItem: MenuItem,
    ElMenuItemGroup: MenuItemGroup
  },
  data () {
    return {
      childMenu: [],
      description: ''
    }
  },
  computed: {
    defaultActive: function() {
      return ('/' + this.$route.path.split('/')[1] + '/' +this.$route.path.split('/')[2]);
    },
    ...mapGetters([
      'sidebar',
    ])
  },
  created () {
    this.init(this.$route.path)
    const that = this
  },
  mounted () {
    
  },
  methods: {
    init(nowPath){
      console.log('mapGetters-sidebar', this.sidebar)
    },
    // 调用store 下的action-nav
    ToggleNavBar(param) {
      this.$store.dispatch('ToggleNavBar', param)
    },
    // 二级菜单跳转
    goView(ele) {
      let tempPath
      tempPath = ele.path
      if(ele.children && ele.children.length>0){

        tempPath = ele.children[0].path
        this.ToggleNavBar(ele.children)
      }
      console.log('navbar:', tempPath)
      this.$router.push({path: tempPath, query:{}})
    }
  }
}
</script>
