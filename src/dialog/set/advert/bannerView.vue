<!-- 查看营业执照 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="查看广告图片"
          class="dia-bod"
          width="460px"
          height="50"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div><span class="ite-ca">广告图片</span><span v-if="!busPhoto" class="err-hint">广告图片获取失败</span></div>
          <div class="imgBox">
            <img :class="{'active':isChoose}" style="display:block;margin:0 auto;max-width: 375px;max-height: 150px;" v-if="busPhoto" :src="busPhoto" @click="imgScc" alt="">
          </div>
         
      </el-dialog>
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
      visible: this.show,
      isChoose:false,
      formData:{
      },
      busName:'',
      operationName:'',
      busPhoto:''
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
      console.log('callBack', this.callBack)
      // Code that will run only after the
      // entire view has been rendered
    })
  },
  methods: {
    init(){
      this.busPhoto = App.photoUrlMeger(this.singleItem.medium_banner_url)
      console.log('this.busPhoto',this.singleItem.medium_banner_url)
    },


    /**
     * 关闭弹窗
     */
    close(){
      this.$emit('update:show', false)
    },
    imgScc:function () {                     
      this.isChoose = !this.isChoose
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  
  .col-set{
    color: $color-default
  }
  .ite-ca{
    width: 70px;
    display: inline-block;
    text-align: right;
    margin: 10px 10px 0;
  }
  .err-hint{
    color: $font-error-color
  }
  img.active {     
    transform: scale(2);          
    position: absolute;          
    z-index: 100; 
    left: 26.5%;
    right: 26.5%;
  }
  .imgBox{
    width: 375px;
    min-height: 150px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
</style>
