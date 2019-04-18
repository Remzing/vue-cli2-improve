<template>
    <el-col :span="8"><div id="chartPie"></div><span>产品类型饼状图</span></el-col>
</template>
<style lang="scss" scoped>
    #chartPie{
      width: 405px;
      height: 405px;
      float: left;
    }
    span{
      position: absolute;
      display: block;
      width: 405px;
      text-align: center;
      bottom:20px;
    }
</style>

<script>
    import { Row, Col } from 'element-ui'
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
      //  引入大圆饼
    require('echarts/lib/chart/pie');
    import { mapGetters } from 'vuex'
    import * as App from '@/utils/index'
    import { chartBoxData } from '@/api/contrDesk/chartBox'


    export default {
        
        data () {
            return {
                pie:'',
                formData:[]
            }
        },
        created () {
            this.marstChartBoxData()
        },
        methods: {
            marstChartBoxData() {
                chartBoxData(this.formData).then(response => {
                     const _data = response
                     this.formData=_data.data
                     //产品饼状图(定制数量)
                    const productCustomization=this.formData.productCustomization
                    // 产品饼状图(产品总数量) 
                    const productCount=this.formData.productCount
                    // 产品饼状图(小程序数量) 
                    const productApply=this.formData.productApply 
                     console.log('啊啊啊啊啊啊啊啊11111啊啊啊啊',productCustomization)



                    this.pie = echarts.init(document.getElementById('chartPie'));
                    console.log("成功", this.pie);
                    this.pie.setOption({
                        textStyle: {
                        color: '#3d9738'
                        },
                         tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        series : [
                            {
                            name: '产品类型',
                            type: 'pie',
                            radius: '55%',
                            
                            data:[
                                {value:productCustomization, name:'定制数量'},
                                {value:productCount, name:'产品总数量'},
                                {value:productApply, name:'小程序数量'},
                            ],
                            color:['#76c56f', '#85cb7e','#a3d89c','#e1f1d8']
                            }
                        ]
                    })
                }).catch(error => {
                    console.error('regInit-error:', error)
                })
            }

        },
        mounted() {
            this.$nextTick(function () {
                this.marstChartBoxData();
            })
        }
    }
</script>

