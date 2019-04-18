<template>
    <el-col><div id="proLinea"></div></el-col>
</template>
<style lang="scss" scoped>
    #proLinea{
      width: 700px;
      height: 405px;
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
    //  引入折线图
    require('echarts/lib/chart/line');
     require('echarts/lib/chart/lines');


    export default {
        
        data () {
            return {
                prolines:''
            }
        },
        created () {},
        methods: {
            initprolines() {
                this.prolines = echarts.init(document.getElementById('proLinea'));
                console.log("成功aaaa");
                this.prolines.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['新增订单','销售订单','累计订单','累计产品'],
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
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'新增订单',
                            type:'line',
                            stack: '总量',
                            data:[120, 0, 101, 0, 90, 0, 210],
                            color:['#67af60']
                        },
                        {
                            name:'销售订单',
                            type:'line',
                            stack: '总量',
                            data:[0, 182, 191, 234, 290, 330, 310],
                            color:['#85cb7e']
                        },
                        
                        {
                            name:'累计订单',
                            type:'line',
                            stack: '总量',
                            data:[320, 332, 0, 334, 390, 330, 320],
                            color:['#addca5']
                        },
                        {
                            name:'累计产品',
                            type:'line',
                            stack: '总量',
                            data:[820, 932, 901, 934, 1290, 1330, 1320],
                            color:['#d1ebc9']
                        }
                    ]
                })
            }

        },
        mounted() {
            this.$nextTick(function () {
                this.initprolines();
            })
        }
    }
</script>

