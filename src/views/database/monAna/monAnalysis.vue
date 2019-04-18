<template>
  <div style="height:100%;">
    <div id="areaContHead">
        <div class="cont-title">财务分析</div>
        
        <div class="count-bg">
            <div class="title-count">昨日关键指标</div>
            <el-row class="newcount">
                
                <el-col :span="6" class="county">
                    <p>交易笔数（笔）</p>
                    <span>{{countList.dealCount}}</span>
                    <ul>
                        <li>日 <i></i><span>{{countList.dealCount}}%</span></li>
                        <li>周 <i></i><span>{{countList.dayDealCount}}%</span></li>
                        <li>月 <i></i><span>{{countList.weekDealCount}}%</span></li>
                    </ul> 
                </el-col>
                <el-col :span="6" class="county">
                    <p>续费金额（元）</p>
                    <span>{{countListOne.renewCount}}</span>
                    <ul>
                        <li>日 <i></i><span>{{countListOne.dayRenewCount}}%</span></li>
                        <li>周 <i></i><span>{{countListOne.weekRenewCount}}%</span></li>
                        <li>月 <i></i><span>{{countListOne.monthRenewCount}}%</span></li>
                    </ul> 
                </el-col>
                <el-col :span="6" class="county">
                    <p>充值金额（元）</p>
                    <span>{{countListTwo.rechargeCount}}</span>
                    <ul>
                        <li>日 <i></i><span>{{countListTwo.dayRechargeCount}}%</span></li>
                        <li>周 <i></i><span>{{countListTwo.weekRechargeCount}}%</span></li>
                        <li>月 <i></i><span>{{countListTwo.monthRechargeCount}}6%</span></li>
                    </ul> 
                </el-col>
                <el-col :span="6" class="county">
                    <p>累计金额</p>
                    <span>{{countListTh.totalCount}}</span>
                    <ul>
                        <li>日 <i></i><span>{{countListTh.dayTotalCount}}%</span></li>
                        <li>周 <i></i><span>{{countListTh.weekTotalCount}}%</span></li>
                        <li>月 <i></i><span>{{countListTh.monthTotalCount}}%</span></li>
                    </ul> 
                </el-col>
            </el-row>
        </div>
        
         
            <pro-line></pro-line>   
    
        <div class="count-bg">
            <el-row :gutter="20">
                <el-col :span="2" class="title-count">
                    交易分布
                </el-col>            
            </el-row>
            
            <el-row>
                <div class="newcount">
                    <pro-pie></pro-pie>
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
                        <el-date-picker v-model="timeSlot"  :editable="false"  value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small">
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
                <!-- <div class="title-comon">
                    趋势图aa
                </div> -->
                <el-table 
                style="width: 100%" 
                ref="multipleTable"
                :data="dataList"   
                stripe
                 size="medium"
                :default-sort = "{prop: 'datelist',prop: 'recharge_money',prop:'total_money',prop:'deal_num',prop: 'renew_money', order: 'descending'}">
                    <el-table-column prop="datelist" label="日期" sortable max-width="400"> </el-table-column>
                    <el-table-column prop="recharge_money" label="充值金额" sortable max-width="400"> </el-table-column>
                    <el-table-column prop="renew_money" label="续费金额" sortable max-width="400"> </el-table-column>
                    <el-table-column prop="total_money" label="累计金额" sortable max-width="400"> </el-table-column>
                    <el-table-column prop="deal_num" label="交易笔数" sortable> </el-table-column>
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
import { Row, Col, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
//折线图
  import proLine from '../../../components/analysisbox/monAna/proLine.vue'

  //地图
  import proMap from '../../../components/analysisbox/proMap.vue'

  import proPie from '../../../components/analysisbox/monAna/proPie.vue'
  import { mapGetters } from 'vuex'
  import * as App from '@/utils/index'
  import { yesterdayTarget,dataCountList } from '@/api/database/monAna'
export default {
  components: {
    proLine,
    proMap,
    proPie
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
            console.log('getLoginCode啊啊啊金额金额金额:',_data.list)
            
        }).catch(error => {
            console.error('fetchList-error:', error)
        })
    },
    /**
     * 昨日关键数据
     */
    yesterdayData(){
        yesterdayTarget(this.formData).then(response => {
            let _data = response
            this.countList = _data.data[0]
            this.countListOne = _data.data[1]
            this.countListTwo = _data.data[2]
            this.countListTh = _data.data[3]
            console.log('数字获取',this.countList)
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


