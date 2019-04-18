<template>
  <div>
    <div class="cont-title">客户分析</div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部客户" name="first">产品分析</el-tab-pane>
    </el-tabs>
    <div style="width:100%;height:100%;background:#fff;">
        22222
    </div>
  </div> 
</template>

<script>
import * as App from '@/utils/index'
/*  */
export default {
  components: {
    
  },
  data () {
    return {
      activeName2: 'first'
    };
  },
  created () {
  },
  mounted () {
   
  },
  methods: {
    handleClick ( tab, event ) {
      console.log(tab, event)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
