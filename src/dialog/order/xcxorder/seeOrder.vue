<!-- 查看信息 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="订单信息"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div >
            <ul class="dis-flex dialog-tab-box">
              <li @click="changeItem(1)" :class="{'active':showItem==1}">基本信息</li>
              <li @click="changeItem(2)" :class="{'active':showItem==2}">应用信息</li>
            </ul>
            <!-- 基本信息 -->
            <div v-if="showItem==1">
              <div class="item-grid">
                <div>订单编号：</div><div>{{param.order_num||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>产品行业：</div><div>{{param.industry||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>产品名称：</div><div>{{param.product_name||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>创建日期：</div><div>{{param.create_time||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>到期日期：</div><div>{{param.end_time||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>订单状态：</div><div>{{stateArr[param.state]||'--'}}</div>
              </div>
            </div>
            <!-- 企业信息 -->
            <div v-if="showItem==2">
              <div class="item-grid">
                <div>应用名称：</div><div>{{param.apply_name||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>应用介绍：</div><div>{{param.apply_introduce||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>应用标签：</div><div>{{(param.apply_label||'')+(param.c_city||'')+(param.c_area||'')}}</div>
              </div>
              <div class="item-grid">
                <div>应用图标：</div><div><img style="width: 40%;" :src="param.apply_photo" alt=""/></div>
              </div>
              <div class="item-grid">
                <div>公众号授权：</div><div>{{param.wechat_account||'--'}}</div>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            
          </span>
      </el-dialog>
  </div>
</template>

<script>
import * as App from '@/utils/index'
import { selectOrderXcxInfo } from '@/api/order/xcxorder'
/*  */
export default {
  components: {
    
  },
  data () {
    return {
      visible: this.show,
      showItem: 1,
      formData:{
        id: null
      },
      stateArr:['','授权打包', '微信审核中', '试用中', '运营中', '待续费', '已关闭', '审核未通过', '审核成功', '已关闭'],
      param: {
        user_num: null,
        level: null,
      }
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
      this.show&&this.init()
    }
  },
  computed: {
  },
  created () {
 
  },
  mounted () {
    this.$nextTick(function () {
    })
  },
  methods: {
    init(){
      this.formData.id = this.singleItem.id
      selectOrderXcxInfo(this.formData).then(response => {
        this.param = response.data
        this.param.apply_photo = App.photoUrlMeger(this.param.apply_photo)
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
    /**
     * 切换tab
     */
    changeItem(par){
      this.showItem = par
    },
    /**
     * 关闭弹窗
     */
    close(){
      let formDataInit = {
        input: null
      }
      this.$emit('update:show', false)
      this.formData = formDataInit
      console.log('auditoper-close', this.formData, this.formDataInit)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .el-row{
    margin-top: 20px;
  }
  .item-grid{
    div{
      display: inline-block;
      padding-top: 20px;
    }
    div:first-child{
      margin-left: 5%;
      width: 23%
    }
    div:last-child{
      width: 68%
    }
    .item-hint{
      color: #379338;
    }
  }
</style>
