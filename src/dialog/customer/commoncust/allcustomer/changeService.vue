<!-- 更换服务、状态权限 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          :title="dialogName"
          width="450px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div >
            <label v-if="nameType==1" class="item-title">选择人员：</label>
            <label v-if="nameType==2" class="item-title">变更状态：</label>
            <el-select v-model="secType" size="medium " placeholder="选择操作">
              <el-option v-for="item in servOption" :key="item.id" :label="item.real_name" :value="item.id"></el-option>
            </el-select>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="confirmBtn">确定提交</el-button>
            <el-button  @click="close">取消</el-button>
          </span>
      </el-dialog>
  </div>
  
</template>

<script>
import * as App from '@/utils/index'
import { updateCsInit, updateCs, updateUserState } from '@/api/customer/commoncust'
/*  */
export default {
  components: {
    
  },
  data () {
    return {
      visible: this.show,
      formData:{
        user_id: '', // 用户id
        cs_id: '', // 客服id
        state: '', // 状态( -1删除 0禁用 1正常)
      },
      nameType:'',
      secType: null,
      servOption:[]
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
    dialogName:{
      type: String,
      default: ''
    },
  },
  watch: {
    show () {
      this.visible = this.show;
    },
    dialogName: function (val, oldVal) {
      if(val == '更换客服'){
        this.serviceInit()
        this.nameType = 1
      }else if (val == '状态权限') {
        this.nameType = 2
        this.secType = this.singleItem.state || null            
        this.servOption = [{id:0,real_name:'禁用'},{id:1,real_name:'正常'}]//{id:'-1',real_name:'删除'},
      }
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
     * 更换客服初始化
     */
    serviceInit(){
      updateCsInit(this.formData).then(response => {
        this.servOption = response.data
        this.secType = this.singleItem.cs_id || null
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
    /**
     * 获取当前操作数据
     */
    getNowOperData(){

      this.formData.user_id = this.singleItem.id
      
    },
    /**
     * 确定按钮
     */
    confirmBtn(){
      this.getNowOperData()
      console.log('confirmBtn', this.formData)
      if (this.nameType == 1){
        // 更换客服
        this.formData.cs_id = this.secType
        updateCs(this.formData).then(response => {
          this.$message.success(response.errmsg)
          this.callBack && this.callBack()
          this.close()        
        }).catch(error => {
          console.error('confirmBtn-error:', error)
        })
      }else if (this.nameType == 2) {
        // 更换状态
        this.formData.state = this.secType
        updateUserState(this.formData).then(response => {
          this.$message.success(response.errmsg)
          this.callBack && this.callBack()
          this.close()        
        }).catch(error => {
          console.error('confirmBtn-error:', error)
        })
      }
      
    },
    /**
     * 关闭弹窗
     */
    close(){
      // 初始化  直接copy 在data中设置的对象属性
      let formDataInit = {
        user_id: '', // 
        cs_id: '', // 
        state: '', // 
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
