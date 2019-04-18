<!-- 查看信息 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="查看信息"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div >
            <ul class="dis-flex dialog-tab-box">
              <li @click="changeItem(1)" :class="{'active':showItem==1}">基本信息</li>
              <li @click="changeItem(2)" :class="{'active':showItem==2}">企业信息</li>
              <li @click="changeItem(3)" :class="{'active':showItem==3}">银行卡信息</li>
              <li @click="changeItem(4)" :class="{'active':showItem==4}">开票信息</li>
            </ul>
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
                <div>所在城市：</div><div>{{(param.u_province||'')+(param.u_city||'')+(param.u_area||'')}}</div>
              </div> -->
              <div class="item-grid">
                <div>银行卡：</div><div>{{param.bank||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>注册日期：</div><div>{{param.create_time||'--'}}<span v-if="param.days" class="item-hint">（已加入{{param.days}}天）</span></div>
              </div>
              <div class="item-grid">
                <div>上次登录：</div><div>{{param.login_time||'--'}} <span v-if="param.site" class="item-hint">（{{param.site}}）</span></div>
              </div> 
            </div>
            <!-- 企业信息 -->
            <div v-if="showItem==2">
              <div class="item-grid">
                <div>状态：</div><div>{{stateArr[param.is_pass]||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>企业名称：</div><div>{{param.company_name||'--'}}</div>
              </div>
              <!-- <div class="item-grid">
                <div>所在城市：</div><div>{{(param.c_province||'')+(param.c_city||'')+(param.c_area||'')}}</div>
              </div> -->
              <div class="item-grid">
                <div>纳税识别号：</div><div>{{param.taxpayer||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>所属行业：</div><div>{{param.industry||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>运营者姓名：</div><div>{{param.operation_name||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>运营者手机号码：</div><div>{{param.operation_phone||'--'}}</div>
              </div>
            </div>
            <!-- 银行卡信息 -->
            <div v-if="showItem==3">
              <div class="item-grid">
                <div>开户名：</div><div>{{param.bank_name||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>开户账号：</div><div>{{param.bank_id||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>开户银行：</div><div>{{param.bank||'--'}}</div>
              </div>
            </div>
            <!-- 开票信息 -->
            <div v-if="showItem==4">
              <div class="item-grid">
                <div>发票类型：</div><div>{{param.bill_type||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>发票抬头：</div><div>{{param.bill_title||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>纳税识别号：</div><div>{{param.itin||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>开户银行：</div><div>{{param.bank||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>开户账号：</div><div>{{param.bank_id||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>公司地址：</div><div>{{(param.c_province||'')+(param.c_city||'')+(param.c_area||'')}}</div>
              </div>
              <div class="item-grid">
                <div>公司电话：</div><div>{{param.telephone||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>邮寄地址：</div><div>{{(param.mail_province||'')+(param.mail_city||'')+(param.mail_area||'')+(param.address||'')}}</div>
              </div>
              <div class="item-grid">
                <div>收件人：</div><div>{{param.recipients||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>手机号码：</div><div>{{param.recipients_phone||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>固定电话：</div><div>{{param.telephone||'--'}}</div>
              </div>
              <div class="item-grid">
                <div>邮政编码：</div><div>{{param.postcode||'--'}}</div>
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
import { selectUserInfo } from '@/api/customer/commoncust'
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
      stateArr:['未认证',"已认证",'待审核'],
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
      this.formData.user_id = this.singleItem.id
      selectUserInfo(this.formData).then(response => {
        this.param = response.data||{}
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
      width: 23%;
    }
    div:last-child{
      width: 68%;
    }
    .item-hint{
      color: #379338;
    }
  }
</style>
