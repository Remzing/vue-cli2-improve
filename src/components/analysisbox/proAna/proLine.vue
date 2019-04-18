<template>
        <div class="count-bg">
            <el-row class="sizeden">
                <el-col :span="2">
                    <el-dropdown trigger="click" @command="handleCommand">
                            <el-button size="medium">
                                选择操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="recently_day"
                                 >最近{{recently_day}}天</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                <el-col :span="6">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker v-model="timeSlot" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium">
                        </el-date-picker>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <div class="newcount">
                    <div class="title-comon">
                        趋势图
                    </div>
                    <el-row>
                        <el-col><div id="proLinea"></div></el-col>
                    </el-row>
                    
                </div>
            </el-row>  
        </div>
            
    
</template>
<style lang="scss" scoped>
    #proLinea{
      width: 100%;
      height: 405px;
      margin:0 auto;
    }
    .count-bg{background-color: $bg-default;margin-bottom: 20px;}
    .sizeden{padding:5px;}
    .newcount{
        background-color: $bg-fff;
        border: 1px solid $bg-default;
        padding: 20px;}
</style>

<script>
    import { Row, Col, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    //  引入折线图
    require('echarts/lib/chart/line');
    require('echarts/lib/chart/lines');
    import { mapGetters } from 'vuex'
    import * as App from '@/utils/index'
    import { areaAnaly } from '@/api/database/proAna'


    export default {
        
        data () {
            return {
                prolines:'',
                recently_day:'30',
                formData:{
                    start_time: null,// 开始时间
                    end_time: null,// 结束时间
                    recently_day:null
                },
                timeSlot: [],  //时间段
                recently:[]
            }
        },
        created () {
            this.init()
        },
        computed:{
            // 获取state
            ...mapGetters([
            'sidebar',
            ]),
            
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
        methods: {
             /**
             * 初始化
             */
            init(){
            //console.log( this.$router,this.$route)
                this.areaAnalyData()
            },
            handleCommand(command) {
                 console.log('现在点击的是',command)
                 this.formData.recently_day=command
                 this.areaAnalyData()
                 
            },
            // goPage(item) {
            //     this.$router.push({path: item.path})
            // },
          
            /**
             * 趋势图
             */
            areaAnalyData(){
                areaAnaly(this.formData).then(response => {
                    const _data = response
                    this.formData=_data.data
                    //日期
                    const dateMetas = this.formData.map(ele=>ele.datelist)

                    //销售订单折线经过点
                    const finance_num = this.formData.map(ele=>ele.finance_num)

                    //累计产品折线经过点
                    const product_num = this.formData.map(ele=>ele.product_num)

                    //新增订单折线经过点
                    const order_num = this.formData.map(ele=>ele.order_num)
                   
                   //累计订单
                    const total_num = this.formData.map(ele=>ele.total_num) 
                    //var   gettype=Object.prototype.toString
                    //console.log('啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',_data.data)                  
                     
                this.prolines = echarts.init(document.getElementById('proLinea'));
                this.prolines.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['累计产品','新增订单','累计订单','销售订单'],
                        bottom: '1%',
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '20%',
                        containLabel: true
                    },
                    // 是否需要下载图片按钮
                    // toolbox: {
                    //     feature: {
                    //         saveAsImage: {}
                    //     }
                    // },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: dateMetas
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'累计产品',
                            type:'line',
                            stack: '总量',
                            data:product_num,
                            // color:['#67af60']
                            // color:['#6ab935']
                            color:['#56b55d']
                        },
                        {
                            name:'新增订单',
                            type:'line',
                            stack: '总量',
                            data:order_num,
                            // color:['#85cb7e']
                            // color:['#3d9738']
                            color:['#3e894f']
                        },
                        
                        {
                            name:'累计订单',
                            type:'line',
                            stack: '总量',
                            data:total_num,
                            // color:['#addca5']
                            // color:['#dadf00']
                            color:['#45866c']
                        },
                        {
                            name:'销售订单',
                            type:'line',
                            stack: '总量',
                            data:finance_num,
                            // color:['#d1ebc9']
                            // color:['#14ae67']
                            color:['#a8c500']
                        }
                    ]
                })
   
                }).catch(error => {
                    console.error('areaAnaly-error:', error)
                })
            },
          

        },
        watch:{
            timeSlot: function (val, oldVal) {
                console.log('new:', val, oldVal)
                if (val){
                    this.formData.start_time = val[0]
                    this.formData.end_time = val[1]
                     this.areaAnalyData()
                }
            },
           
        },
        mounted() {
            this.$nextTick(function () {
                this.areaAnalyData()
            })
        }
    }
</script>

