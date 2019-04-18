<template>
  <div style="height:100%">
    <div id="areaContHead">
        <div class="cont-title">数据分析</div>
         <div class="tab-box">
            <ul>
            <li v-for="(item, index) in sidebar.thrLev" :key="index" :label="item.name" 
                @click="goPage(item)"
                :class="{'active':item.path==$route.path}">
                {{item.name}}
            </li>
            </ul>
        </div>
        <div class="count-bg">
            <div class="title-count">昨日关键指标</div>
            <el-row class="newcount">
                
                <el-col :span="6" class="county">
                    <p>订单总数（笔）</p>
                    <span>{{countList.orderCount}}</span>
                    <ul>
                        <li>日 <i></i><span>{{countList.yesterdayOrderCount}}</span></li>
                        <li>周 <i></i><span>{{countList.thisWeekOrderCount}}</span></li>
                        <li>月 <i></i><span>{{countList.thisMonthOrderCount}}</span></li>
                    </ul> 
                </el-col>
                <el-col :span="6" class="county">
                    <p>销售金额（元）</p>
                    <span>{{countListOne.salesAmount}}</span>
                    <ul>
                        <li>日 <i></i><span>{{countListOne.yesterdaySalesAmount}}</span></li>
                        <li>周 <i></i><span>{{countListOne.thisWeekSalesAmount}}</span></li>
                        <li>月 <i></i><span>{{countListOne.thisMonthSalesAmount}}</span></li>
                    </ul> 
                </el-col>
                <el-col :span="6" class="county">
                    <p>客户总数（家）</p>
                    <span>{{countListTwo.clientCount}}</span>
                    <ul>
                        <li>日 <i></i><span>{{countListTwo.yesterdayClientCount}}</span></li>
                        <li>周 <i></i><span>{{countListTwo.thisWeekClientCount}}</span></li>
                        <li>月 <i></i><span>{{countListTwo.thisMonthClientCount}}</span></li>
                    </ul> 
                </el-col>
                <el-col :span="6" class="county">
                    <p>产品数量（个）</p>
                    <span>{{countListTh.productCount}}</span>
                    <ul>
                        <li>日 <i></i><span>{{countListTh.yesterdayProductCount}}</span></li>
                        <li>周 <i></i><span>{{countListTh.thisWeekProductCount}}</span></li>
                        <li>月 <i></i><span>{{countListTh.thisMonthProductCount}}</span></li>
                    </ul> 
                </el-col>
            </el-row>
        </div>
    </div>
    <div class="count-bg">
           <div class="sizeden">
            <el-row  :gutter="20">
                <el-col :span="2">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker v-model="timeSlot" :editable="false" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="1" :offset="20">
                    <el-button size="small" style="margin-left: 26px;">导出数据</el-button>
                </el-col>
            </el-row>
           </div>
        <el-row>
            <div class="newcount">
                <!-- 列表 -->
                <el-table :data="dataList" style="width: 100%" :default-sort = "{prop: 'datelist',prop: 'order_num',prop: 'user_num',prop: 'sale_money', order: 'descending'}">
                <el-table-column prop="datelist" label="日期" sortable max-width="400"> </el-table-column>
                <el-table-column prop="order_num" label="新增订单总数" sortable max-width="400"> </el-table-column>
                <el-table-column prop="sale_money" label="新增销售金额" sortable max-width="400"> </el-table-column>
                <el-table-column prop="product_num" label="新增产品总数" sortable max-width="400"> </el-table-column>
                <el-table-column prop="user_num" label="新增客户总数" sortable> </el-table-column>
            </el-table>
             <!-- cont 底部 -->
                <div id="areaContFooter" class="bot-cont clearfix" v-if="dataList.length">
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
        </el-row>     
    </div>
    

  </div> 
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->


<script>
import { mapGetters } from 'vuex'
import * as App from '@/utils/index'
import { yesterdayTarget,dataCountList } from '@/api/database/countAna'
import { Row, Col, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';

export default {
  components: {
  },
  data () {
    return {
        formData:{
          page: 1,// 当前所在页
            pageSize: 10,// 每页大小
            start_time: null,// 开始时间
            end_time: null,// 结束时间
        },
        countList:[],//订单总笔数
        countListOne:[],//销售总额
        countListTwo:[],//客户总数
        countListTh:[],//产品总数
        dataList: [],
        timeSlot: [],  //时间段
        list:[],
        areaHeadH:0,
        areaFootH:0,
        totalCount:0, //总条数
        
     
      datemon:'',
     
    };
  },
    watch: {
        timeSlot: function (val, oldVal) {
            console.log('new:', val, oldVal)
            if (val){
                this.formData.start_time = val[0]
                this.formData.end_time = val[1]
                this.fetchList()
            }
        },
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
        this.yesterdayData()
    },
    /**
     * 获取列表数据
     */
    fetchList(){
        dataCountList(this.formData).then(response => {
            let _data = response
            
            this.dataList = _data.list
            this.totalCount = _data.totalCount//页码条数
            console.log('getLoginCode啊啊啊:',_data)
            
        }).catch(error => {
            console.error('fetchList-error:', error)
        })
    },
    /**
     * 昨日关键数据
     */
    yesterdayData(){
        yesterdayTarget(this.formData).then(response => {
            const _data = response
            this.countList = _data.data[0]
            this.countListOne = _data.data[1]
            this.countListTwo = _data.data[2]
            this.countListTh = _data.data[3]
            console.log('数字获取',_data.data)
        }).catch(error => {
            console.error('yesterdayTarget啊啊啊啊-error:', error)
        })
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
     * 跳转页面
     */
    goPage(item) {
        this.formData={
            page: 1,// 当前所在页
            pageSize: 10,// 每页大小
            start_time: null,// 开始时间
            end_time: null,// 结束时间
        },
        this.timeSlot = []
        this.$router.push({path: item.path})
        this.fetchList()
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
  
}
</script>
<style lang="scss" scoped>
    .count-bg{background-color: $bg-default;margin-bottom: 20px;}
    .sizer{padding:5px;}
    .title-count{
        color:$font-default-color;
        line-height: 40px;
        margin-left: 20px;
    }
      .newcount{
        background-color: $bg-fff;
        border: 1px solid $bg-default;
        padding: 20px;}
    .borline{border:none;}
    .county{
        border-right: 1px solid $border-default;
        text-align: center;
        p{
            font-size: 14px;
            color: $font-default-color;
            margin-bottom: 14px;
        }
        p+span{
            font-size: 24px;
            font-weight: bold;
            color:  $color-info;
        }
        li{
            line-height: 18px;
        }
    }
    .county:last-child{
        border-right: 0px;
    }
       

</style>


