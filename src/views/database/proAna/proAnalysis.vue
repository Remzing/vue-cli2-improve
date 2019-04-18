<template>
  <div style="height:100%;">
    <div id="areaContHead">
        <div class="cont-title">产品分析</div>
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
                    <p>新增订单</p>
                    <span>{{countList.createOrder}}</span>
                    <ul>
                        <li>日 <i></i><span>{{countList.dayCreateOrder}}%</span></li>
                        <li>周 <i></i><span>{{countList.weekCreateOrder}}%</span></li>
                        <li>月 <i></i><span>{{countList.monthCreateOrder}}%</span></li>
                    </ul> 
                </el-col>
                <el-col :span="6" class="county">
                    <p>销售订单</p>
                     <span>{{countListOne.sellOrder}}</span>
                    <ul>
                        <li>日 <i></i><span>{{countListOne.daySellOrder}}%</span></li>
                        <li>周 <i></i><span>{{countListOne.weekSellOrder}}%</span></li>
                        <li>月 <i></i><span>{{countListOne.monthSellOrder}}%</span></li>
                    </ul> 
                </el-col>
                <el-col :span="6" class="county">
                    <p>累计订单</p>
                     <span>{{countListTwo.totalOrder}}</span>
                    <ul>
                        <li>日 <i></i><span>{{countListTwo.dayTotalOrder}}%</span></li>
                        <li>周 <i></i><span>{{countListTwo.weekTotalOrder}}%</span></li>
                        <li>月 <i></i><span>{{countListTwo.monthTotalOrder}}%</span></li>
                    </ul> 
                </el-col>
                <el-col :span="6" class="county">
                    <p>累计产品</p>
                     <span>{{countListTh.totalProduct}}</span>
                    <ul>
                        <li>日 <i></i><span>{{countListTh.dayTotalProduct}}%</span></li>
                        <li>周 <i></i><span>{{countListTh.weekTotalProduct}}%</span></li>
                        <li>月 <i></i><span>{{countListTh.monthTotalProduct}}%</span></li>
                    </ul> 
                </el-col>
            </el-row>
        </div>
        <pro-line></pro-line>
        <pro-pop></pro-pop>
   
        <div class="count-bg">
            <el-row :gutter="20">
                <div class="title-count">产品销售区域排行</div>        
            </el-row>   
            <el-row>
                <div class="newcount">
                    <el-row>
                    <pro-map></pro-map>
                    </el-row>
                </div>
            </el-row>
        </div>
    </div>
    <div class="count-bg">
        <div class="sizeden">
            <el-row  :gutter="20">
                <el-col :span="2">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker :editable="false" v-model="timeSlot" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="1" :offset="20">
                    <el-button size="small" style="margin-left: 26px;">导出数据</el-button>
                </el-col>
            </el-row>
        </div>
            <div class="newcount">
               <!-- 列表 -->
                <el-table  ref="multipleTable"
                 :data="dataList"   
                 size="medium" 
                 stripe
                 style="width: 100%" 
                 :height="calcTableHeight" :default-sort = "{prop: 'datelist',prop: 'order_num',prop: 'product_num', prop: 'finance_num',prop: 'total_num',order: 'descending'}">
                    <el-table-column prop="datelist" label="日期" sortable max-width="400"> </el-table-column>
                    <el-table-column prop="finance_num" label="销售订单" sortable max-width="400"> </el-table-column>
                    <el-table-column prop="total_num" label="累计订单" sortable max-width="400"> </el-table-column>
                    <el-table-column prop="product_num" label="累计产品" sortable max-width="400"> </el-table-column>
                    <el-table-column prop="order_num" label="新增订单" sortable> </el-table-column>
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
             
     
          <!-- cont 底部 -->
           
    </div>
  </div> 
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->


<script>
  import { Row, Col, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
//折线图
  import proLine from '../../../components/analysisbox/proAna/proLine.vue'
  //地图
  import proMap from '../../../components/analysisbox/proAna/proMap.vue'

 //柱状图
  import proPop from '../../../components/analysisbox/proAna/proPop.vue'

  import { mapGetters } from 'vuex'
  import * as App from '@/utils/index'
  import { yesterdayTarget,dataCountList } from '@/api/database/proAna'
export default {
  components: {
    proLine,
    proMap,
    proPop,
  },
  data () {
    return {     
      tableTrend:'',
      formData:{
            page: 1,// 当前所在页
            pageSize: 10,// 每页大小
            start_time: null,// 开始时间
            end_time: null,// 结束时间
        },
        dataList: [],
        countList:[],//新增客户
        countListOne:[],//累计客户数量
        countListTwo:[],//消费客户
        countListTh:[],//创建应用客户
        list:[],
        areaHeadH:0,
        areaFootH:0,
        totalCount:0, //总条数
         //付款平台
      handle: [
          {
            modelType: '',
            label: '支付宝'
          }, {
            modelType: '0',
            label: '微信支付'
          }, {
            modelType: '1',
            label: '对公转账'
          }
        ],
        timeSlot: [],  //时间段
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
    computed:{
    // 获取state
    ...mapGetters([
      'sidebar',
    ]),
    // 计算table列表高度
    calcTableHeight () {
      let tableHeight = (this.sidebar.nowWinH-this.areaHeadH-this.areaFootH-this.sidebar.layoutH)
      console.log('areaHeadH'+this.areaHeadH);
      console.log('areaFootH'+this.areaFootH);
      return tableHeight
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
      console.log('areaHeadHaaaaaaa'+this.areaHeadH);
      console.log('areaFootHaaaaaaa'+this.areaFootH);
    })
  },
   methods: {
    /**
     * 初始化
     */
    init(){
       console.log('allXcxOrder啵啵啵宝宝--init', this.$router,this.$route)
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
            //console.log('数字获取',this.countList.newlyIncreasedClient)
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
}
</script>
<style lang="scss" scoped>
    .count-bg{background-color: $bg-default;margin-bottom: 20px;}
    .sizeden{padding:5px;}
    .title-count{
        color:$font-default-color;
        line-height: 40px;
        margin-left: 20px;
    }
      .newcount{
        background-color: $bg-fff;
        border: 1px solid $bg-default;
        padding: 20px;}
  
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


