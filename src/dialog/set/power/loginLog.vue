<!-- 登录日志 -dialog -->
<template>
  <div class="dialog-container">
      <el-dialog
          title="登录日志"
          width="600px"
          :visible.sync="visible"
          :modal-append-to-body="false"
          :close-on-click-modal="false"
          :before-close="close"
          :show="show">
          <div class="dia-body-high">
            <div class="log-item" v-for="(item, index) in paramList" :key="index" >
              <span>{{item.create_time}}</span> 
              <span>IP： {{item.operation_ip}}</span>
              <span>{{item.operation_content}}</span>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <div >
              <el-pagination
                small
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="formData.page"
                :page-sizes="sidebar.pageSizeArr"
                :page-size="formData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
              </el-pagination>
            </div>
          </span>
      </el-dialog>
  </div>
  
</template>

<script>
import * as App from '@/utils/index'
import { mapGetters } from 'vuex'
import { loginLog } from '@/api/set/power'
/*  */
export default {
  components: {
    
  },
  data () {
    return {
      visible: this.show,
      formData:{
        id: null, // 备注
        page: 1, // 
        pageSize: 10, // 
      },
      totalCount: 0,
      paramList: [],
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
    // 获取state
    ...mapGetters([
      'sidebar',
    ]),
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
    /**
     * 初始化
     */
    init(){
      this.formData.id = this.singleItem.id||''
      this.fetchList()
    },
    /**
     * 获取数据
     */
    fetchList(){
      loginLog(this.formData).then(response => {
        let _data = response
        this.paramList = _data.list
        this.totalCount = _data.totalCount||0
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },
    /**
     * 设置条数
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.formData.pageSize = val
      this.formData.page = 1 //清空页数
      this.fetchList()
    },
    /**
     * 跳转页数
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.formData.page = val
      this.fetchList()
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
  .log-item{
    margin-bottom: 16px;
    span{
      margin-left: 16px;
      color: $color-default
    }
  }
</style>
