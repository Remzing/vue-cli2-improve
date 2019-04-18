<!-- 收支明细 -->
<template>
  <div style="height:100%;">
    <div id="areaContHead">
      <div class="cont-title">收支明细</div>
      <div class="tab-box">
        <ul>
          <li v-for="(item, index) in sidebar.thrLev" :key="index" :label="item.name" 
            @click="goPage(item)"
            :class="{'active':item.path==$route.path}">
            {{item.name}}
          </li>
        </ul>
      </div>
      <!-- 搜索栏 
      
                  -->
      <el-row class="sizer searchBox">
        <el-col :span="2" class="mgr">
          <el-select v-model="formData.pay_platform" size="medium" placeholder="付款平台">
            <el-option v-for="item in payment" :key="item.modelType" :label="item.label"
             :value="item.modelType"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="mgr">
          <el-select v-model="formData.pay_type" size="medium" placeholder="付款分类">
            <el-option v-for="item in payclass" :key="item.payType" :label="item.label" 
            :value="item.classType"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="mgr">
          <el-select v-model="formData.state" size="medium" placeholder="选择状态">
            <el-option v-for="item in chooseStatus" :key="item.chooseType" :label="item.label" :value="item.chooseType"></el-option>
          </el-select>
        </el-col>
        <el-col class="mgr search-date">
          <span class="demonstration"></span>
          <el-date-picker :editable="false" v-model="timeSlot" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium">
          </el-date-picker>
        </el-col>
        <el-col :span="3" class="mgr">
          <el-input
            placeholder="请输入付款平台订单号或付款对象"
            size="medium "
            v-model="formData.keyword">
            <i slot="suffix" class="el-input__icon el-icon-search cur-pot" @click="searchHandle"></i>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <!-- 搜索结果列表 :data="dataList" tableList-->
    <el-table :data="dataList"
      size="medium"
      stripe style="width: 100%"
      max-height="600"
      ref="multipleTable"
      
      @selection-change="handleSelectionChange" 
      :height="calcTableHeight">
        <el-table-column  type="selection" width="55"> </el-table-column>
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
        <el-table-column prop="create_time" label="交易时间" ></el-table-column>
        <el-table-column prop="money" label="金额（元）" ></el-table-column>
        <el-table-column prop="number" width="300"  :formatter="numberTxt"  label="付款平台订单号" ></el-table-column>
        <el-table-column prop="pay_name" :formatter="paynameTxt" label="付款户名" ></el-table-column>
        <el-table-column prop="order_num" :formatter="orderTxt" label="关联订单号" ></el-table-column>
        <el-table-column prop="pay_platform" :formatter="platformTxt" label="付款平台" >
       
        </el-table-column>
        <el-table-column prop="pay_type" :formatter="typeTxt" label="付款分类" >
           <!-- <template slot-scope="scope">
              <ul class="handleFirst">
                {{scope.row.apply_name||"--"}} <span v-show="scope.row.state==2" @click="open('qrdialog',scope.row)"> 体验</span>
              </ul>
            </template> -->
            <!-- <template slot-scope="scope">
              <ul class="handleFirst">
               <span v-show="scope.row.pay_type==3" >提现</span>
              </ul>
            </template> -->
        </el-table-column>
        <el-table-column prop="state" :formatter="publicTxt" label="状态">
        </el-table-column>
        <!-- <el-table-column prop="public_state" :formatter="publicTxt" label="状态" v-show="scope.row.pay_platform==3">
        </el-table-column>
        <el-table-column prop="cash_state" :formatter="cashTxt" label="状态" v-show="scope.row.pay_type==3" ></el-table-column>
        <el-table-column prop="finance_state" :formatter="financeTxt" label="状态" v-show="scope.row.pay_platform==1 || scope.row.pay_platform==2 || scope.row.pay_platform==4" >

        </el-table-column> -->
        <!-- v-if="(item.name=='支付宝'&&scope.row.pay_type==1)||(item.name=='微信'&&scope.row.pay_type==2)||
                  (item.name=='对公转账'&&scope.row.pay_type==3)" -->
    </el-table>
    <!-- 底部编辑 --><!-- cont 底部 -->
      <div id="areaContFooter" class="bot-cont clearfix"> <!-- v-if="dataList.length" @click="open('resetPwd', true)" -->
        <!-- <div class="opre-case">
          <el-checkbox @change="toggleSelection()" v-model="allChecked"></el-checkbox>
          <el-button
          size="medium"
          >批量确认</el-button>  
          
        </div> -->
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
      <see-detail 
        :show.sync="dialogShow.seeDetail"
        :single-item='selectSingleItem'
        :batch-item='selectBatchItem'
        :batch-oper='batchOper'
        :call-back='fetchList'>
      </see-detail>
    </div>  
</template>

<script>
import { mapGetters } from 'vuex'
import * as App from '@/utils/index'
import { financeDetail } from '@/api/money/monDetail'

//dialog
import seeDetail from '@/dialog/money/monDetail/seeDetail'

export default {
  components: {
    seeDetail
  },
  data () {
    return {
      formData:{
        page: 1,// 当前所在页
        pageSize: 10,// 每页大小
        pay_platform: null,// 付款平台(1支付宝 2微信 3对公转账) 
        pay_type: null,// 付款分类(1充值 2续费 3提现)
        state: null,// 状态(1待核对 2已核对)
        start_time: null,// 开始时间
        end_time: null,// 结束时间
        keyword: null,// 关键字
        public_state:null,//对公到账状态(1待核对 2已核对)
        cash_state:null,//提现审核状态(1待审核 2审核通过 3拒绝审核)
        finance_state:null,//除提现和对公外收支明细状态 1=待核对 2=已核对
      },
      dialogShow:{  //弹窗显示flag
        seeDetail: false,      
      },
      //付款平台
      payment: [
        {
          modelType: '1',
          label: '支付宝'
        }, {
          modelType: '2',
          label: '微信支付'
        }, {
          modelType: '3',
          label: '对公转账'
        }, {
          modelType: '4',
          label: '余额'
        }
      ],
      //付款分类
      payclass:[
        {
          classType:'1',
          label:'充值'
        },{
          classType:'2',
          label:'续费'
        },{
          classType:'3',
          label:'提现'
        }
      ],
      chooseStatus:[
        {
          chooseType:'1',
          label:'待核对'
        },{
          chooseType:'2',
          label:'已核对'
        }
      ],

      searchCen: '',//搜索框
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
    // stateTxt(row, column) {
    //   // return this.stateOption[row.state] || row.state
    //   console.log('stateTxt', this.stateOption.filter(ele => {return ele.state==row.state})[0])
    //   let nowItem = this.stateOption.filter(ele => {return ele.state==row.state})
    //   if(nowItem && nowItem.length){
    //     return nowItem[0].label
    //   }
    //   return row.state ||''
    // },
    publicTxt(row, column) {
      if(row.pay_platform==3){
        return ['',"待核对",'已核对'][row.public_state] || '无'
      }else if(row.pay_platform == 1 || row.pay_platform == 2 || row.pay_platform == 4){
        return ['',"待核对",'已核对'][row.finance_state] || '无'
      }else{
        return ['',"待审核",'审核通过','拒绝审核'][row.cash_state] ||'无'
      }
     
    },

     /**
     * table中数据处理 --formatter--付款平台
     */
    platformTxt(row, column) {
      return ['','支付宝',"微信",'对公转账','余额'][row.pay_platform] || '无'
    },
     /**
     * table中数据处理 --formatter--关联订单号
     */
    orderTxt(row,column){
      return row.order_num ||'无'
    },
    paynameTxt(row,column){
      return row.pay_name ||'无'
    },
    numberTxt(row,column){
      return row.number ||'无'
    },
     /**
     * table中数据处理 --formatter--付款分类
     */
    typeTxt(row, column) {
      if(row.pay_platform == 1 || row.pay_platform == 2 || row.pay_platform == 3 || row.pay_platform == 4){//付款平台支付宝或微信时、余额
        return ['','充值',"续费"][row.pay_type] || '无'//显示充值或续费
      }else if(row.pay_type==3){//为空时
        return ['','提现']|| '无'//只显示提现分类
      }else{
        return row.pay_type || '无'//空
      }
   
    },
     /** 
     *  获取列表数据
     */
    fetchList(){
      financeDetail(this.formData).then(response => {
        let _data = response
        console.log('getLoginCode--获取列表数据:', _data)
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
    /*   if (this.formData.keyword && !this.formData.type) {
        this.$message.warning('请选择类型')
        return
      } */
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
      if(val.length !== this.dataList.length){
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
    },
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
