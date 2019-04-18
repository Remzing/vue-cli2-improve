<!-- 小程序订单- -->
<template>
  <div style="height:100%;">
    <div id="areaContHead">
      <div class="cont-title">小程序订单</div>
      <!--tab 审核通过 -->
      <div class="tab-box">
        <ul>
         <!--  <li v-for="(item, index) in sidebar.thrLev" :key="index" :label="item.name" 
            @click="goPage(item)"
            :class="{'active':item.path==$route.path}">
            {{item.name}}
          </li> -->
          <li @click="changeItem(null)" :class="{'active':!nowState}">全部订单</li>
          <li @click="changeItem(1)" :class="{'active':nowState==1}">授权打包</li>
          <li @click="changeItem(2)" :class="{'active':nowState==2}">微信审核中</li>
          <li @click="changeItem(3)" :class="{'active':nowState==3}">试用中</li>
          <li @click="changeItem(4)" :class="{'active':nowState==4}">运营中</li>
          <li @click="changeItem(5)" :class="{'active':nowState==5}">待续费</li>
          <!-- <li @click="changeItem(6)" :class="{'active':nowState==6}">已关闭</li> -->
          <li @click="changeItem(7)" :class="{'active':nowState==7}">审核未通过</li>
          <li @click="changeItem(8)" :class="{'active':nowState==8}">审核成功</li>
          <li @click="changeItem(9)" :class="{'active':nowState==9}">已关闭</li>
          
        </ul>
      </div>
      <!-- 搜索 -->
      <el-row class="sizer searchBox">
        <el-col :span="2" class="mgr" v-if="!nowState">
          <el-select v-model="formData.state" size="medium " placeholder="订单状态">
            <el-option v-for="item in stateOption" :key="item.state" :label="item.label" :value="item.state"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="mgr">
          <el-select v-model="formData.industry_id" size="medium " placeholder="产品行业">
            <el-option v-for="item in industryOption" :key="item.id" :label="item.industry" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col class="mgr search-date">
          <span class="demonstration"></span>
          <el-date-picker :editable="false" v-model="timeSlot" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium ">
          </el-date-picker>
        </el-col>
        <el-col :span="2" class="mgr">
          <el-select v-model="formData.type" size="medium " placeholder="选择类型">
            <el-option v-for="item in typeOption" :key="item.type" :label="item.label" :value="item.type"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" class="mgr">
          <el-input
            placeholder="请输入内容"
            size="medium "
            v-model="formData.keyword">
            <i slot="suffix" class="el-input__icon el-icon-search cur-pot" @click="searchHandle"></i>
          </el-input>
        </el-col>
      </el-row>
    </div>
    
    <div>
      <!-- 列表 -->
      <el-table
        ref="multipleTable"
        :data="dataList" 
        @selection-change="handleSelectionChange" 
        size="medium" 
        stripe 
        style="width: 100%" 
        :height="calcTableHeight">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column  resizable label="操作"  width="150">
          <template slot-scope="scope">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link drop-txt">
                选择操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" :command="scope.row">
                <el-dropdown-item v-for="(item, index) in dropOperArr"
                  v-if="item.state==0||(item.state==1&&scope.row.state!=9)||(item.state==2&&scope.row.state!=9)
                  ||(item.state==3&&scope.row.state!=9)||(item.state==4&&scope.row.state==9)"
                  :key="index"
                   :command="{path:item.path,name:item.name,scope:scope.row}">
                   {{item.name}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column v-if='false' prop="id" label="id" ></el-table-column>
        <el-table-column v-if='false' prop="create_time" label="create_time" ></el-table-column>
        <el-table-column v-if='false' prop="state" label="state" ></el-table-column>
        <el-table-column prop="end_time" label="到期时间"  width="160px"></el-table-column> 
        <el-table-column prop="order_num" label="订单编号" width="160px"></el-table-column>
        <el-table-column prop="cs_name" label="客服" ></el-table-column> 
        <el-table-column prop="product_name" label="产品名称" ></el-table-column>
        <el-table-column prop="apply_name" label="应用名称" ></el-table-column>
        <el-table-column prop="industry" label="所属行业 " width="80px"></el-table-column>
        <el-table-column prop="company_name" label="企业名称 " ></el-table-column>
        <el-table-column prop="publish_time" label="最后发布 " >
           <template slot-scope="scope">{{scope.row.publish_time||"--"}}</template>
        </el-table-column>
        <el-table-column prop="is_update" label="产品升级 " >
           <template slot-scope="scope">
              <span v-if="scope.row.is_update==1">待升级</span><div v-else>已是最新版本</div>
           
            </template>
        </el-table-column>

        <el-table-column prop="state" label="状态" :formatter="stateTxt"  ></el-table-column>
      </el-table>
      <!-- cont 底部 -->
      <div id="areaContFooter" class="bot-cont" v-if="dataList.length">
        <div class="opre-case" v-if="nowState!=6">
          <el-checkbox @change="toggleSelection()" v-model="allChecked"></el-checkbox>
          <el-button
          size="medium"
          type="warning"
          @click="open('closeApp', true)"
          >关闭应用</el-button>
        </div>
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
    </div>
    <!-- 弹窗 -->
    <see-order
      :show.sync="dialogShow.seeOrder"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </see-order>
    <diy-renew
      :show.sync="dialogShow.diyRenew"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </diy-renew>
    <change-due
      :show.sync="dialogShow.changeDue"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </change-due>
    <close-app
      :show.sync="dialogShow.closeApp"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </close-app>
    <order-log
      :show.sync="dialogShow.orderLog"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </order-log>
    <backapp
      :show.sync="dialogShow.backapp"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </backapp>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import * as App from '@/utils/index'
import { xcxListInit, selectOrderXcxList } from '@/api/order/xcxorder'
// dialog
import seeOrder from '@/dialog/order/xcxorder/seeOrder'
import diyRenew from '@/dialog/order/xcxorder/diyRenew'
import changeDue from '@/dialog/order/xcxorder/changeDue'
import closeApp from '@/dialog/order/xcxorder/closeApp'
import backapp from '@/dialog/order/xcxorder/backapp'
import orderLog from '@/dialog/order/xcxorder/orderLog'

/*  */
export default {
  components: {
    seeOrder,
    diyRenew,
    changeDue,
    closeApp,
    backapp,
    orderLog,
  },
  data () {
    return {
      formData:{
        page: 1,// 当前所在页
        pageSize: 10,// 每页大小
        start_time: null,// 开始时间
        end_time: null,// 结束时间
        state: null,// 订单状态['','授权打包','微信审核中','试用中','运营中','待续费','已删除','审核未通过','审核成功','已关闭',]
        industry_id: null,// 行业id
        type: null,// 类型(1产品名称 2应用名称 3企业名称 4客服姓名)
        keyword: null,// 具体内容
      },
      dialogShow:{  //弹窗显示flag
        seeOrder: false,
        diyRenew: false,
        changeDue: false,
        closeApp: false,
        backapp: false,
        orderLog: false,
      },
      // 下拉框选项
      typeOption:[
        { type: '', label: '选择类型' }, 
        { type: '1', label: '产品名称' },
        { type: '2', label: '应用名称' },
        { type: '3', label: '企业名称' },
        { type: '4', label: '客服姓名' }
      ],
      stateOption:[
        { state: '', label: '订单状态' }, 
        { state: '1', label: '授权打包' },
        { state: '2', label: '微信审核中' },
        { state: '3', label: '试用中' },
        { state: '4', label: '运营中' },
        { state: '5', label: '待续费' },
        { state: '7', label: '审核未通过' },
        { state: '8', label: '审核成功' },
        { state: '9', label: '已关闭' },
      ],
      industryOption:[],
      dialogName: '',
      nowState: null ,
      timeSlot: [],  //时间段
      selectBatchItem: [],// table选中项 数组类型 选中一个或多个都存储在这个变量中
      selectSingleItem: null,// table选中一项操作
      batchOper: false,// 是否是批量操作
      allChecked: false,  // 全选按钮状态
      totalCount:0, //总条数
      dataList: [],
      areaHeadH:0,
      areaFootH:0
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
      console.log('dropOperArr')
      if (this.sidebar.thrLev ){
        this.sidebar.thrLev.forEach(ele => {
          if(ele.path === this.$route.path){
            dropOper = ele.children
          }
        })
      }
      return dropOper
    }
  },
  created () {
    this.init()
    
  },
  mounted () {
    this.$nextTick(function () {
      console.log('allXcxOrder--mounted')
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
      console.log('allXcxOrder--init', this.$router,this.$route)
      if(this.$route.query && this.$route.query.state){
        this.nowState = this.$route.query.state
      }else{
        this.nowState = null
      }
      this.formData.state = this.nowState
      xcxListInit().then(response => {
        let _data = response
        this.industryOption = _data.data
      }).catch(error => {
        console.error('xcxListInit-error:', error)
      })
      this.fetchList()
    },
    /**
     * 跳转页面
     */
    changeItem(item) {
      this.formData = {
        page: 1, // 当前所在页
        pageSize: 10,// 每页大小
        start_time: null,// 开始时间
        end_time: null,// 结束时间
        state: item,// 订单状态['','授权打包','微信审核中','试用中','运营中','待续费','已删除','审核未通过','审核成功','已关闭',]
        industry_id: null,// 行业id
        type: null,// 类型(1产品名称 2应用名称 3企业名称 4客服姓名)
        keyword: null,// 具体内容
      }
      this.timeSlot = []
      this.nowState = item
      this.$router.push({path: this.$router.path, query:{state:item}})
      this.fetchList()
    },
    /**
     * table中数据处理 --formatter
     */
    stateTxt(row, column) {
      return ['','授权打包','微信审核中','试用中','运营中','待续费','已删除','审核未通过','审核成功','已关闭',][row.state] || row.state
    },
    /** 
     *  获取列表数据
     */
    fetchList(){
      // this.formData
      selectOrderXcxList(this.formData).then(response => {
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
      if (this.formData.keyword && !this.formData.type) {
        this.$message.warning('请选择类型')
        return
      }
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
      console.log(`toggleSelection:`,rows,this.dataList,this.selectBatchItem)
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

</style>
