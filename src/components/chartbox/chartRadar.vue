<template>
    <el-col :span="8"><div id="chartRadar"></div><span>小程序雷达图</span></el-col>
</template>
<style lang="scss" scoped>
     #chartRadar{
        width: 360px;
        height: 360px;
        float: left;
    }
    #chartRadar+span{
        display: block;
        width: 360px;
        text-align: center;
        bottom:20px;
        position: absolute;
    }
</style>

<script>
    import { Row, Col } from 'element-ui'
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
        // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
      // 引入雷达图
    require('echarts/lib/chart/radar');


    export default {
        
        data () {
            return {
                radars:''
            }
        },
        created () {},
        methods: {
            initRadar() {
                this.radars = echarts.init(document.getElementById('chartRadar'));
                this.radars.setOption({
                radar: {  
                    indicator: [  
                        { name: '粉丝', max: 116500},  //雷达坐标大小，数据要在坐标大小之下否则形状会变
                        { name: '成交', max: 116000},  
                        { name: '互动', max: 310000},  
                        { name: '浏览', max: 318000},  
                        { name: '消息', max: 512000}, 
                    ],
                    name: { textStyle:{color:"#379338"}},//字体颜色
                }, 
                tooltip : {
                    trigger: 'axis'
                },
                series : [{ 
                    type: 'radar',
                      tooltip: {
                            trigger: 'item'
                        },
                    data : [{  
                        value : [101023, 115481, 216413, 193084, 412599],//显示数据  
                        name:'小程序粉丝详细值',
                        //这里的配置显示数值  
                        label: {  
                            normal: {  
                                show: true,  
                                formatter:function(params) {  
                                    return params.value;  
                                },
                                color:['#379338']//数字颜色
                            }  
                        }  
                    }], 
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            color:['#379338'],//小圆点的颜色
                            areaStyle: {type: 'default'}
                        },
                        color:['#3D9738']//雷达背景色
                    },
                    lineStyle: {
                        normal: {
                            width: 2,
                            color :"#379338"//雷达线条颜色
                        },
                        areaStyle: {
                            color:"#379338",//鼠标悬浮后，雷达线条颜色变化
                        }
                    },
                    symbolSize: 4,
                    symbol: "emptyCircle",
                    smooth: false          
                }]
            })
        }

        },
        mounted() {
            this.$nextTick(function () {
                this.initRadar();
            })
        }
    }
</script>

