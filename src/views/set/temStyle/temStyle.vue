<!-- 模板风格- -->
<template>
  <div style="height:100%;position: relative;">
    <div class="cont-title">模板风格</div>    
        <div class="dis-flex">
          <div class="func-arr">
            <div v-for="(item, index) in funcData.funcArr" :key="index" @click="funcHandle(index)">{{item.style}}</div>
            <div class="addProd" v-if="!(funcData.funcArr.length>9)" @click='addGoods()'><i class="el-icon-plus"></i>添加</div>
          </div>
          <div class="func-add">
            <el-input
              v-if="funcData.addGoodsFlag!=0"
              style="width: 50%;"
              :maxlength="8"
              placeholder="请输入风格名称"
              v-model="funcData.funcInput">
            </el-input>
            <el-button
              v-if="funcData.addGoodsFlag==2"
              type="success"
              @click="funcEdit"
            >确认</el-button>
            <el-button
              v-if="funcData.addGoodsFlag==2"
              type="warning"
              @click="funcDelete"
            >删除</el-button>
   
              <el-button
              v-if="funcData.addGoodsFlag==1"
              type="success"
              @click="funcAdd"
              :disabled="(funcData.funcArr.length>9)"
            >确定添加</el-button>
            <div style="color: #888;font-size: 12px;margin-top:10px;">提示：最多添加10个</div>
      
          </div>
        </div>
  </div>
</template>
<script>
/*  */
import { queryList, addOrUpdateStyle ,delStyle } from '@/api/set/temStyle'

export default {
  components: {
  },
  data () {
    return {
      formData:{
        id: null, // 产品id（更新就带id 新增不用传）
        style: '', // 行业名称
      },
      funcData:{
        funcArr:[],
        addGoodsFlag: 0,
        funcInput:'',
        nowIndex: null
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
      queryList({}).then(response => {
        this.funcData.funcArr = response.data
      }).catch(error => {
        console.error('selectTemplateInit-error:', error)
      })
    },
    /**
     * 核心功能操作
     */
    funcHandle(index){
      console.log('funcHandle-index',index)
      this.funcData.addGoodsFlag = 2
      this.funcData.nowIndex = index
      this.funcData.funcInput = this.funcData.funcArr[index].style
    },
    /**
     * 添加功能
     */
    addGoods(){
      this.funcData.addGoodsFlag = 1
      this.funcData.funcInput = ''
    },
    /**
     * 确认添加功能
     */
    funcAdd(){
      if (this.checkFunc()){
        return
      }
      if (this.funcData.funcArr&&this.funcData.funcArr.length>9) {
        this.$message.warning("模版风格最多添加10个")
        return
      }
      addOrUpdateStyle({id:'',style:this.funcData.funcInput}).then(response => {
        this.$message.success(response.errmsg)
        this.funcData.funcInput = ''
        this.funcData.addGoodsFlag = 0
        this.init()
      }).catch(error => {
        console.error('selectTemplateInit-error:', error)
      })
    },
    
    /**
     * 编辑功能
     */
    funcEdit(){
      if (this.checkFunc()){
        return
      }
      console.log('this.funcData.nowIndex',this.funcData.funcArr[this.funcData.nowIndex])
      let nowFunc = this.funcData.funcArr[this.funcData.nowIndex]

      addOrUpdateStyle({id:nowFunc.id,style:this.funcData.funcInput}).then(response => {
        this.$message.success(response.errmsg)
        this.funcData.addGoodsFlag = 0
        this.init()
      }).catch(error => {
        console.error('selectTemplateInit-error:', error)
      })
    },
    /**
     * 删除功能
     */
    funcDelete(){
      
      let nowFunc = this.funcData.funcArr[this.funcData.nowIndex]      
      delStyle({id:nowFunc.id}).then(response => {
        this.funcData.addGoodsFlag = 0
        this.funcData.funcInput = ''
        this.$message.success(response.errmsg)
        this.init()
      }).catch(error => {
        console.error('selectTemplateInit-error:', error)
      })
    },
    /**
     * 判断数据是否重复
     */
    checkFunc(){
      let checkFunc = false
      if(!this.funcData.funcInput){
        this.$message.warning("请输入模版风格名称")
        checkFunc = true
      }
      this.funcData.funcArr.forEach(element => {
        if(element.style==this.funcData.funcInput){
          this.$message.warning("风格名称重复")
          checkFunc = true
        }
      })
      
      return checkFunc
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .sure-btn{
    position: fixed;
    bottom: 0;
    justify-content: center;
    align-items: center;
    width: 85%;
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
    .addProd{
      border: 1px solid #3d9738;
      color: #3d9738;
    }
  }
  .func-add{
    display:inline-block;
    margin: 0px 0 0 20px;
  }
</style>
