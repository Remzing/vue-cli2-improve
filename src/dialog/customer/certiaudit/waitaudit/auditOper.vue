<!-- 审核操作 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="审核认证"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div >
            <label>输入备注：</label>
            <el-input type="textarea"  :rows="6" v-model="formData.remark" placeholder="请输入审核备注"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="confirmBtn">通过</el-button>
            <el-button  @click="noPass">不通过</el-button>
          </span>
      </el-dialog>
  </div>
  
</template>

<script>
import * as App from '@/utils/index'
import { getList, auditHandle } from '@/api/customer/certiaudit'
/*  */
export default {
  components: {
    
  },
  data () {
    return {
      visible: this.show,
      formData:{
        remark: null, // 备注
        is_pass: null, // 审核是否通过(0不通过 1通过 3待审核)
        ids: '', // 企业id(多个用,分割)
      },
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
      
    },
    /**
     * 获取当前操作数据
     */
    getNowOperData(){
      if(this.batchOper){
        // 批量操作
        this.batchItem.forEach(element => {
          this.formData.ids += element.id + ','
        });
        this.formData.ids = this.formData.ids.substr(0, this.formData.ids.length - 1);  
      }else{
        // 非批量操作
        this.formData.ids = this.singleItem.id
      }
    },
    /**
     * 审核通过
     */
    confirmBtn(){
      this.formData.is_pass = 1
      this.getNowOperData()
      console.log('confirmBtn', this.formData)

      auditHandle(this.formData).then(response => {
        this.$message.success(response.errmsg)
        this.callBack && this.callBack()
        this.close()        
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
    /**
     * 审核不通过
     */
    noPass (){
      this.formData.is_pass = 0
      this.getNowOperData()
      console.log('noPass', this.formData)

      auditHandle(this.formData).then(response => {
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

</style>
