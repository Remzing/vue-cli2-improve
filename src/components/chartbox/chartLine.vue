<template>
    <el-col :span="12"><span>近1个月的订单趋势图</span><div id="chartLine"></div></el-col>
</template>
<style lang="scss" scoped>
    #chartLine{
      width: 100%;
      height: 470px;
    }
    span{
        display: block;
        width: 100%;
        text-align: center;
        margin-top: 80px;
   
    }
</style>

<script>
    import { Row, Col } from 'element-ui'
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    //  引入折线图
    require('echarts/lib/chart/line');
    import { mapGetters } from 'vuex'
    import * as App from '@/utils/index'
    import { trendBoxData } from '@/api/contrDesk/chartBox'
    export default {
        
        data () {
            return {
                line:''
            }
        },
         created () {
            this.proInitData()
        },
        methods: {
            proInitData() {
                trendBoxData(this.formData).then(response => {
                    const _data = response
                    this.formData=_data.data.orderTendency
                    //订单数量
                    const order_counts = this.formData.map(ele=>ele.order_counts)

                    //时间
                    const datelist = this.formData.map(ele=>ele.datelist)

                    this.line = echarts.init(document.getElementById('chartLine'));
                    this.line.setOption({
                        textStyle: {
                            color: '#888'
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        //是否需要顶部小标题
                        legend: {
                            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
                            show:false
                        },
                        //是否需要下载图片按钮
                        // toolbox: {
                        //     feature: {
                        //         saveAsImage: {}
                        //     }
                        // },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : datelist
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                        
                            {
                                name:'订单数量',
                                type:'line',
                                stack: '订单数量',
                                areaStyle: {normal: {}},
                                data:order_counts,
                                color:['#53b463']
                            },
                            // {
                            //     name:'搜索引擎',
                            //     type:'line',
                            //     stack: '总量',
                            //     /*设置顶部第一行并是否显示数字*/
                            //     label: {
                            //         normal: {
                            //             show: true,
                            //             position: 'top'
                            //         }
                            //     },
                            //     areaStyle: {normal: {}},
                            //     data:[820, 932, 901, 934, 1290, 1330, 1320],
                            //     color:['#a3d89c']
                            // }
                        ]
                    })
                }).catch(error => {
                    console.error('proInit-error:', error)
                })
            }

        },
        mounted() {
            this.$nextTick(function () {
                this.proInitData();
            })
        }
    }
</script>