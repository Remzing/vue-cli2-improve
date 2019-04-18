<!-- 查看客户 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="查看客户"
          width="30%"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div >
            <!-- 基本信息 -->
            <div v-if="showItem==1">
              <div class="item-grid">
                <div>ID：</div><div>{{param.user_num||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>等级：</div><div>{{param.level||'普通'}}</div>
              </div>
              <div class="item-grid">
                <div>企业名称：</div><div>{{param.company_name||'--'}}</div>
              </div>
              <!-- <div class="item-grid">
                <div>所在城市：</div><div>{{param.province+param.city}}</div>
              </div> -->
              <div class="item-grid">
                <div>银行卡：</div><div>{{param.bank||'--'}}<span v-if="param.bank_num" class="item-hint">（尾号{{param.bank_num||'****'}}）</span></div>
              </div>
              <div class="item-grid">
                <div>注册日期：</div><div>{{param.create_time||'--'}}<span v-if="param.days" class="item-hint">（已加入{{param.days}}天）</span></div>
              </div>
              <div class="item-grid">
                <div>上次登录：</div><div>{{param.last_login_time||'--'}} <span v-if="param.last_login_address" class="item-hint">（{{param.last_login_address}}）</span></div>
              </div> 
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            
          </span>
      </el-dialog>
  </div>
</template>

<script>
import { userBasicInit } from '@/api/money/monBankcard'
/*  */
export default {
  components: {
    
  },
  data () {
    return {
      visible: this.show,
      showItem: 1,
      formData:{
        user_id: null
      },
      payArr:['','支付宝',"微信",'对公转账'],
      typeArr:['','充值',"续费",'提现'],
      stateArr:['','待核对',"已核对"],
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
      this.formData.user_id = this.singleItem.user_id
      userBasicInit(this.formData).then(response => {
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
      width: 21% !important;
    }
    div:last-child{
      width: 68%;
    }
    .item-hint{
      color: #379338;
    }
  }
</style>
