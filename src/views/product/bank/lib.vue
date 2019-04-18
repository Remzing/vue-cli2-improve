<!-- 产品库- -->
<template>
  <div style="height:100%;">
    <div id="areaContHead">
      <div class="cont-title">产品库</div>
      <!--tab 产品库 -->
      <div class="tab-box">
        <ul>
          <li @click="changeItem(null)" :class="{'active':nowState===null}">全部产品</li>
          <li @click="changeItem(0)" :class="{'active':nowState===0}">已下架</li>
        </ul>
      </div>
      <!-- 搜索 -->
      <el-row class="sizer searchBox">
        <el-col :span="2" class="mgr" >
          <el-select v-model="formData.industry_id" size="medium " placeholder="行业选择">
            <el-option v-for="item in industryOption" :key="item.id" :label="item.industry" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="mgr" v-if="nowState===null">
          <el-select v-model="formData.industry_id" size="medium " placeholder="状态选择">
            <el-option v-for="item in stateOption" :key="item.type" :label="item.label" :value="item.type"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="mgr">
          <el-select v-model="formData.is_agent" size="medium " placeholder="是否代理">
            <el-option v-for="item in typeOption" :key="item.label" :label="item.label" :value="item.type"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="mgr">
          <el-select v-model="formData.is_use" size="medium " placeholder="是否试用">
            <el-option v-for="item in typeOption" :key="item.type" :label="item.label" :value="item.type"></el-option>
          </el-select>
        </el-col>
        <el-col class="mgr search-date">
          <span class="demonstration"></span>
          <el-date-picker :editable="false" v-model="timeSlot" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium ">
          </el-date-picker>
        </el-col>
       <!--  <el-col :span="2" class="mgr">
          <el-select v-model="formData.type" size="medium " placeholder="选择类型">
            <el-option v-for="item in typeOption" :key="item.type" :label="item.label" :value="item.type"></el-option>
          </el-select>
        </el-col> -->
        <el-col :span="3" class="mgr">
          <el-input
            placeholder="输入产品名称关键词"
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
                  v-if="(item.state==-1)||(item.state==1&&scope.row.is_putaway==0)||
                  (item.state==0&&scope.row.is_putaway==1)"
                  :key="index" :command="{path:item.path,name:item.name,scope:scope.row}">{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column v-if='false' prop="id" label="id" ></el-table-column>
        <el-table-column v-if='false' prop="is_putaway" label="is_putaway" ></el-table-column>
        <el-table-column v-if='false' prop="product_name" label="product_name" ></el-table-column>
        <el-table-column prop="update_time" label="更新时间" ></el-table-column> 
        <el-table-column prop="product_photo" label="产品图标" >
          <template slot-scope="scope">
            <img :src="scope.row.product_photo" width="50" height="50"/>
          </template>
        </el-table-column>
        <el-table-column prop="product_name" label="产品名称" ></el-table-column> 
        <el-table-column prop="industry" label="所属行业" ></el-table-column>
        <el-table-column prop="month_fee" label="月租费用（元）" ></el-table-column>
        <el-table-column prop="is_agent" :formatter="agentTxt" label="是否代理 " ></el-table-column>
        <el-table-column prop="is_open" :formatter="openTxt" label="是否开启 " ></el-table-column>
        <el-table-column prop="use_time" :formatter="useTimeTxt" label="试用（天） " ></el-table-column>
        <el-table-column prop="is_putaway" label="状态" :formatter="stateTxt"  ></el-table-column>
      </el-table>
      <!-- cont 底部 -->
      <div id="areaContFooter" class="bot-cont" >
        <div class="opre-case" v-if="nowState===null">
          <!-- <el-checkbox v-if="dataList.length" @change="toggleSelection()" v-model="allChecked"></el-checkbox> -->
          <!-- <el-button
          v-if="dataList.length"
          size="medium"
          @click="open('onOffProduct', true)"
          type="warning"
          >批量上下架</el-button> -->
          <el-button
          size="medium"
          type="success"
          @click="open('/product/publish/pub')"
          >发布产品</el-button>
        </div>
        <div class="paging" v-if="dataList.length">
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
    <on-off-product
      :show.sync="dialogShow.onOffProduct"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </on-off-product>
    <delete-product
      :show.sync="dialogShow.deleteProduct"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </delete-product>
    <domain-set
      :show.sync="dialogShow.domainSet"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </domain-set>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import * as App from '@/utils/index'
import { selectProductListInit, selectProductList } from '@/api/product/publish'
// dialog
import onOffProduct from '@/dialog/product/bank/onOffProduct'
import deleteProduct from '@/dialog/product/bank/deleteProduct'
import domainSet from '@/dialog/product/bank/domainSet'

/*  */
export default {
  components: {
    onOffProduct,
    deleteProduct,
    domainSet,
  },
  data () {
    return {
      formData:{
        page: 1,// 当前所在页
        pageSize: 10,// 每页大小
        start_time: null,// 开始时间
        end_time: null,// 结束时间
        state: null,// 是否上架(0不上架 1上架)
        industry_id: null,// 行业id
        is_agent: null,// 允许代理(0不允许 1允许)
        is_open:null,//是否开启（0不开启 1开启）
        is_use: null,// 允许试用(0不允许 1允许)
        type: null,// 类型(1关联订单 2合同编号 3定制名称)
        keyword: null,// 具体内容
      },
      dialogShow:{  //弹窗显示flag
        onOffProduct: false,
        deleteProduct: false,
        domainSet: false,
      },
      // 下拉框选项
      typeOption:[
        { type: '', label: '选择类型' }, 
        { type: '0', label: '不允许' },
        { type: '1', label: '允许' },
      ],
      stateOption:[
        { state: '', label: '状态选择' }, 
        { state: '0', label: '下架' },
        { state: '1', label: '上架' },
      ],
      industryOption:[],
      dialogName: '',
      nowState: null ,
      timeSlot: [],  //时间段
      selectBatchItem: [],// table选中项 数组类型 选中一个或多个都存储在这个变量中
      selectSingleItem: {},// table选中一项操作
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
        this.nowState = Number(this.$route.query.state)
      }else{
        this.nowState = null
      }
      this.formData.state = this.nowState
      selectProductListInit().then(response => {
        let _data = response
        this.industryOption = _data.data
      }).catch(error => {
        console.error('selectProductListInit-error:', error)
      })
      this.fetchList()
    },
    callBack(){
      this.init()
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
        state: item,// 订单状态(1产品设计 2UI设计 3程序开发 4内部测试 5完成验收 6订单暂停 7订单终止)
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
      return ['下架',"上架",'已删除'][row.is_putaway] || row.is_putaway
    },
    useTimeTxt(row, column) {
      return (row.use_time>0)?row.use_time:'不允许'
    },
    agentTxt(row, column) {
      return ['不允许',"允许"][row.is_agent] || '--'
    },
    openTxt(row, column) {
      return ['不开启',"开启"][row.is_open] || '--'
    },
    /** 
     *  获取列表数据
     */
    fetchList(){
      // this.formData
      selectProductList(this.formData).then(response => {
        let _data = response
        console.log('getLoginCode:', _data)
        this.dataList = _data.list
        this.dataList.forEach(ele => {
          ele.product_photo = App.photoUrlMeger(ele.product_photo||'')
        });
        // this.product.product_photo = App.photoUrlMeger(this.product.product_photo||'')
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
      //上架之前需要先确定配置了域名
      if (par=='onOffProduct' && this.selectSingleItem.is_putaway==0 &&!this.selectSingleItem.request_url) {
        this.$message.warning('产品未配置域名，请先配置域名')
        return
      }
      //编辑产品之前 需要先下架产品
      if (par=='/product/bank/editProduct' && this.selectSingleItem.is_putaway==1) {
        this.$message.warning('请先下架产品，才能编辑产品信息')
        return
      }
      // 跳转页面
      if (par.indexOf('/')>-1){
        this.$router.push({path: par, query:{id:(this.selectSingleItem.id||'')}})
        return
      }
      // 打开弹窗
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
