<template>
    <el-col><div id="proPop"></div></el-col>
</template>
<style lang="scss" scoped>
    #proPop{
      width: 796px;
      height: 470px;
      margin:0 auto;
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


    export default {
        data () {
            return {
                propops:''
            }
        },
        created () {},
        methods: {
            initproPopu() {
                this.propops = echarts.init(document.getElementById('proPop'));
                this.propops.setOption({
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
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
                    },
                    series: [
                        {
                            name: '2011年',
                            type: 'bar',
                            data: [182, 234, 290, 104, 134, 630],
                            color:['#53b463']
                        },
                        {
                            name: '2012年',
                            type: 'bar',
                            data: [195, 238, 310, 1214, 134, 681],
                            color:['#c0d5ca']
                        },
                    ]
                })
            }

        },
        mounted() {
            this.$nextTick(function () {
                this.initproPopu();
            })
        }
    }
</script>

