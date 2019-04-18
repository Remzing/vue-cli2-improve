<!-- 提现申请 -->
<template>
  <div style="height:100%;">
    <div id="areaContHead">
      <div class="cont-title">提现管理</div>
      <div class="tab-box">
        <ul>
          <li v-for="(item, index) in sidebar.thrLev" :key="index" :label="item.name" 
            @click="goPage(item)"
            :class="{'active':item.path==$route.path}">
            {{item.name}}
          </li>
        </ul>
      </div>
      <!-- 搜索栏 -->
      <el-row class="sizer searchBox">
        <el-col class="mgr search-date">
          <span class="demonstration"></span>
          <el-date-picker :editable="false" v-model="timeSlot" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium">
          </el-date-picker>
        </el-col>
        <el-col :span="3" class="mgr">
          <el-input
            placeholder="请输入开户名/开户账号"
            size="medium "
            v-model="formData.keyword">
            <i slot="suffix" class="el-input__icon el-icon-search cur-pot" @click="searchHandle"></i>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <el-table :data="dataList"
      size="medium"
      stripe style="width: 100%"
      max-height="600"
      ref="multipleTable"
      @selection-change="handleSelectionChange" 
      :height="calcTableHeight">
        <el-table-column resizable label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link drop-txt">
                选择操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" :command="scope.row">
                <el-dropdown-item v-for="(item, index) in dropOperArr"
                  :key="index" :command="{path:item.path,name:item.name,scope:scope.row}">{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="申请时间"></el-table-column>
      <el-table-column prop="money" label="提现金额（元）"></el-table-column>
      <el-table-column prop="bankname_kaihu" width="200" label="开户名"></el-table-column>
      <el-table-column prop="bankid_kaihu" width="300" label="开户账号"></el-table-column>
      <el-table-column prop="bank_kaihu" label="开户银行"></el-table-column>
      <el-table-column prop="cash_state" :formatter="stateTxt" label="状态"></el-table-column>
    </el-table>
    <!-- 底部编辑 --><!-- cont 底部 -->
      <div id="areaContFooter" class="bot-cont clearfix"> 
        <div class="paging">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="formData.page"
            :page-sizes="sidebar.pageSizeArr"
            :page-size="formData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
      <!-- 弹窗 -->
      <now-review
        :show.sync="dialogShow.nowReview"
        :single-item='selectSingleItem'
        :batch-item='selectBatchItem'
        :batch-oper='batchOper'
        :call-back='fetchList'>
      </now-review>
    </div>  
</template>

<script>
import { mapGetters } from 'vuex'
import * as App from '@/utils/index'
import { cashFinanceList } from '@/api/money/monCash'

//dialog
import nowReview from '@/dialog/money/monCash/nowReview'
export default {
  components: {
    nowReview
  },
  data () {
    return {
      formData:{
        page: 1,// 当前所在页
        pageSize: 10,// 每页大小
        start_time: null,// 开始时间
        end_time: null,// 结束时间
        keyword: null,// 发票抬头
        
      },
      dialogShow:{  //弹窗显示flag
        nowReview: false,      
      },
      timeSlot:[], // 时间段
      totalCount:0, //总条数
      selectBatchItem: [],// table选中项 数组类型 选中一个或多个都存储在这个变量中
      selectSingleItem: null,// table选中一项操作
      batchOper: false,// 是否是批量操作
      allChecked: false,  // 全选按钮状态
      totalCount:0, //总条数
      dataList: [], 
      areaHeadH:0,
      areaFootH:0,
    };
  },
  watch: {
    timeSlot: function (val, oldVal) {
      console.log('new:', val, oldVal)
      if (val){
        this.formData.start_time = val[0]
        this.formData.end_time = val[1]
      }
    },
  },
  computed: {
    // 获取state
    ...mapGetters([
      'sidebar',
    ]),
    // 计算table列表高度
    calcTableHeight () {
      let tableHeight = (this.sidebar.nowWinH-this.areaHeadH-this.areaFootH-this.sidebar.layoutH)
      return tableHeight
    },
    /**
     * 获取下拉操作项
     */
    dropOperArr(){
      let dropOper = []
      console.log('dropOperArr',this.sidebar.thrLev)
      if (this.sidebar.thrLev ){
        this.sidebar.thrLev.forEach(ele => {
          if(ele.path === this.$route.path){
            dropOper = ele.children
          }
        })
        
      }
      return dropOper
      console.log('获取下拉操作项dropOper----',dropOper)
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.$nextTick(function () {
      // 获取到内容区域头部和底部的高度--为了计算table的高度
      let areaContHead = document.getElementById('areaContHead')
      let areaContFooter = document.getElementById('areaContFooter')
      this.areaHeadH = areaContHead && areaContHead.offsetHeight
      this.areaFootH = areaContFooter && areaContFooter.offsetHeight
    })
  },
  methods: {
    /**
     * 初始化
     */
    init(){
      this.fetchList()
    },
     /**
     * 跳转页面
     */
    goPage(item) {
      this.$router.push({path: item.path})
    },
     /**
     * table中数据处理 --formatter
     */
    stateTxt(row, column) {
      return ['',"待审核",'审核通过','拒绝审核'][row.cash_state] || row.cash_state
    },
     /** 
     *  获取列表数据
     */
    fetchList(){
      cashFinanceList(this.formData).then(response => {
        let _data = response
        console.log('getLoginCode:', _data)
        this.dataList = _data.list
        this.totalCount = _data.totalCount
      }).catch(error => {
        console.error('fetchList-error:', error)
      })
    },
    /** 
     *  搜索
     */
    searchHandle(){
      // 初始化参数
      this.formData.page = 1
      this.fetchList()
    },
       /**
     * 修改列表显示条数
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.formData.pageSize = val
      this.formData.page = 1 //清空页数
      this.fetchList()
    },
    /**
     * 翻页
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.formData.page = val
      this.fetchList()
    },
    /**
     * 下拉操作项change
     */
    handleCommand(command) {
       console.log(`handleCommand:`)
      if (command) {
        console.log(`handleCommand:`, command,command.path)
        this.batchOper = false //非批量操作
        // 选中项存储
        this.selectSingleItem = command.scope
        this.dialogName = command.name // 用于多个弹窗共用一个组件--区分当前弹窗
        // 打开窗口
        this.open(command.path)
      }
    },
    /**
     * 选中操作
     */
    handleSelectionChange(val) {
      console.log(`SelectionChange:`,val)
      // 多个选项存储
      this.selectBatchItem = val;
      // 判断是否全选
      if(val.length == this.dataList.length){
        this.allChecked = true
      }else{
        this.allChecked = false
      }
    },
    /**
     * 全选操作
     */
    toggleSelection() {
      let rows = this.dataList
      if (this.allChecked) {
        rows.forEach(row => {
          // 全选
          this.$refs.multipleTable.toggleRowSelection(row,true);
        });
      } else {
        // 取消全选
        this.$refs.multipleTable.clearSelection();
      }
    },
    /**
     * 打开弹窗
     * @augments par 弹窗名称
     * @augments batch 是否是批量操作
     */
    open (par, batch) {
      batch && (this.batchOper = batch) 
      if (batch && this.selectBatchItem.length<1){
        this.$message.warning('请先选择操作项');
        return
      }
      if (par){
        this.dialogShow[par] = true        
      }else{
        this.$message.error('打开弹出错误！');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .searchBox {
    margin-bottom: 20px;
    .mgr{
      margin-right: 20px;
    }
    .search-date{
      width: 350px;
    }
  }
</style>
