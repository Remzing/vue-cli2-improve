<template>
    <el-col :span="12"><span>小程序产品排行</span><div id="chartPop"></div></el-col>
</template>
<style lang="scss" scoped>
    #chartPop{
      width: 100%;
      height: 416px;
    }
    span{
        display: block;
        width: 100%;
        text-align: center;
        margin-top: 80px;
        margin-bottom: 50px;
    }
</style>

<script>
    import { Row, Col } from 'element-ui'
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
        // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    // 引入柱状图
    require('echarts/lib/chart/bar');
    import { mapGetters } from 'vuex'
    import * as App from '@/utils/index'
    import { trendBoxData } from '@/api/contrDesk/chartBox'


    export default {
        
        data () {
            return {
                pop:'',
                formData:{},   
            }
        },
        created () {
            this.proInitData()
        },
        methods: {
            proInitData() {
                trendBoxData(this.formData).then(response => {
                    const _data = response
                    this.formData=_data.data
                    const urseas = this.formData.applyRank
                    //行业
                     const industry = urseas.map(ele=>ele.industry)
                     
                    //数量
                     const counts = urseas.map(ele=>ele.counts)
                   console.log('aaaaaaaaaaaaa工作台趋势图工作台趋势图工作台趋势图',counts)
                     
                    console.log('工作台趋势图',_data.data)
                    this.pop = echarts.init(document.getElementById('chartPop'));
                    this.pop.setOption({
                        
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        textStyle: {
                        color: '#888'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            top:'0%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        },
                        yAxis: {
                            type: 'category',
                            data: industry
                        },
                        series: [
                            {
                                name: '2011年',
                                type: 'bar',
                                data: counts,
                                color:['#53b463']
                            },
                            {
                                name: '2012年',
                                type: 'bar',
                                data: counts,
                                color:['#c0d5ca']
                            },
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

