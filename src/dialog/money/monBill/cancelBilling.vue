<!-- 取消开票 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
        title="取消开票"
        width="450px"
        :visible.sync="visible"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        :before-close="close"
        :show="show">
        <div style="padding:0 5%">
          <div class="dis-flex warn-hint">
            <div class="icon-fuhao iconfont "></div>
            <div>确定要取消开票？</div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="confirmBtn">确定取消</el-button>
          <el-button  @click="close">取消</el-button>
        </span>
      </el-dialog>
  </div>
  
</template>

<script>
import * as App from '@/utils/index'
import { commitFinance } from '@/api/money/monBill'

/*  */
export default {
  components: {
    
  },
  data () {
    
    return {
      visible: this.show,
      formData:{
        id: '',
        type: '2', // 操作类型 1=提交财务 2=取消开票
      },
      param: {},
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
      this.pay_name = this.singleItem.pay_name
    }
  },
  computed: {
  },
  created () {
 
  },
  mounted () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
    })
  },
  methods: {
    init(){
      
    },
    /**
     * 获取当前操作数据
     */
    getNowOperData(){
      if(this.batchOper){
        // 批量操作
        this.batchItem.forEach(element => {
          this.formData.id += element.id + ','
        });
        this.formData.id = this.formData.id.substr(0, this.formData.id.length - 1);  
      }else{
        // 非批量操作
        this.formData.id = this.singleItem.id
      }
    },
    /**
     * 通过
     */
    confirmBtn(){
      this.getNowOperData()
      console.log('confirmBtn', this.formData)

      commitFinance(this.formData).then(response => {
        this.$message.success(response.errmsg)
        this.callBack && this.callBack()
        this.close()        
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
    /**
     * 关闭弹窗
     */
    close(){
      this.$emit('update:show', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .item-grid{
    div{
      display: inline-block;
      padding-top: 10px;
    }
    div:first-child{
      margin-left: 5%;
      width: 23% !important;
    }
    div:last-child{
      width: 68%;
    }
    .item-hint{
      color: #379338;
    }
  }
</style>
