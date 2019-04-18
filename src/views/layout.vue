<style lang="scss" scoped>
  .console-body {
    position: absolute;
    width: 100%;
    left: 0px;
    top: 0px;
    bottom: 0px;
    background-color: #e6e8e9;
    z-index: 100;
    overflow-x: hidden;
    overflow-y: auto;
    .console-main {
      // margin: 20px 20px 0 20px;
      position: relative;
      padding: 70px 0 0 110px;
      // width: 100vw;
      height: 100vh;
      overflow: hidden;
      .cont-show{
        background-color: #fff;
        height: 100%;
        padding: 20px 20px 0;
        margin-right: 20px;
        box-shadow: 0px 1px 2px 0px 
		  rgba(53, 53, 53, 0.08);
      }
      &.console-main-full {
        padding-left: 230px;
      }
      .console-bcrumd {
        padding: 0px 20px;
        height: 50px;
        line-height: 50px;
      }
      .cont-case{
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        padding-top: 20px;
      }
    }
  }
</style>
<template>
    <div class="console-body">
        <console-topbar></console-topbar>
        <console-sidebar></console-sidebar>
        <console-navbar v-show="hasNavbar"></console-navbar>
        <div class="console-main" :class="{'console-main-full': hasNavbar}">
          <div class="cont-case" :class="{'cont-show': hasNavbar}">
            <router-view></router-view>            
          </div>
        </div>
    </div>
</template>
<script>
    import ConsoleTopbar from '../components/layout/consoleTopbar';
    import ConsoleSidebar from '../components/layout/consoleSidebar';
    // import ConsoleBcrumd from '../components/layout/consoleBcrumd';
    import ConsoleNavbar from '../components/layout/consoleNavbar';
    export default {
      components: {
        ConsoleTopbar,
        ConsoleSidebar,
        // ConsoleBcrumd,
        ConsoleNavbar
      },
      data () {
        return { }
      },
      computed: {
        hasNavbar () {
          let pathArr = this.$route.path.split('/')
          return  (pathArr.length > 3);
        }
      },
      methods: { }
    }
</script>
