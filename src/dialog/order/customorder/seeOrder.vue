<!-- 订单信息 -dialog -->
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
              <li @click="changeItem(2)" :class="{'active':showItem==2}">需求内容</li>
            </ul>
            <!-- 基本信息 -->
            <div v-if="showItem==1">
              <div class="item-grid">
                <div>订单编号：</div><div>{{param.order_num||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>定制类型：</div><div>{{param.type||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>定制名称：</div><div>{{param.demand_name||'--'}}</div>
              </div>
             <!--  <div class="item-grid">
                <div>关联订单：</div><div>{{param.order_num||'--'}}</div>
              </div> -->
              <div class="item-grid">
                <div>合同编号：</div><div>{{param.contract_no||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>企业名称：</div><div>{{param.company_name||'--'}}</div>
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
              <div>{{param.need||'暂无'}}</div>  
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            
          </span>
      </el-dialog>
  </div>
</template>

<script>
import * as App from '@/utils/index'
import { selectOrderMadeInfo } from '@/api/order/customorder'
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
      stateArr:['','产品设计', 'UI设计', '程序开发', '内部测试', '完成验收', '订单暂停', '订单终止'],
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
      this.init()
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
      selectOrderMadeInfo(this.formData).then(response => {
        this.param = response
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
        id: null
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
