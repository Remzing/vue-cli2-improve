<!-- 查看信息 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="查看详情"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div >
            <!-- 基本信息 -->
            <div v-if="showItem==1">
              <div class="item-grid">
                <div>交易时间：</div><div>{{param.create_time||'无'}}</div>
              </div>
              <div class="item-grid">
                <div>付款平台<br />订单号：</div><div>{{param.number||'无'}}</div>
              </div>
              <div class="item-grid">
                <div>关联订单号：</div><div>{{param.order_num||'无'}}</div>
              </div>
              <div class="item-grid">
                <div>付款户名：</div><div>{{param.pay_name||'无'}}</div>
              </div>
              <div class="item-grid">
                <div>付款平台：</div><div>{{payArr[param.pay_platform]||'无'}}</div>
              </div>
              <div class="item-grid">
                <div>付款分类：</div><div>{{typeArr[param.pay_type]||'无'}}</div>
              </div>
              <div class="item-grid">
                <div>状态：</div><div>{{stateArr[param.finance_state] || cashArr[param.cash_state] || '无'}} </div>
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
import { queryFinanceById } from '@/api/money/monDetail'
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
      payArr:['','支付宝',"微信",'对公转账','余额'],
      typeArr:['','充值',"续费",'提现'],
      stateArr:['','待核对',"已核对"],
      cashArr:['','待审核','审核通过','拒绝审核'],
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
      queryFinanceById(this.formData).then(response => {
        this.param = response.data
      }).catch(error => {
        console.error('noPass-error:', error)
      })
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
