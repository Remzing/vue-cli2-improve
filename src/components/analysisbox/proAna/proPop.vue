<template>
    <div class="count-bg">
            <el-row :gutter="20" >
                <el-col :span="2" class="title-count">
                    产品销售排行
                </el-col>
                <el-col :span="1" :offset="20">
                    <el-button size="medium" style="margin-top: 4px;">导出数据</el-button>
                </el-col>
            </el-row>
            <el-row>
                <div class="newcount">
                    <el-row>
                    <el-col><div id="proPop"></div></el-col>
                    </el-row>
                </div>
            </el-row>
        </div>
</template>
<style lang="scss" scoped>
    #proPop{
      width: 796px;
      height: 300px;
      margin:0 auto;
    }
    .count-bg{background-color: $bg-default;margin-bottom: 20px;}
     .title-count{
        color:$font-default-color;
        line-height: 40px;
        margin-left: 20px;
    }
    .newcount{
        background-color: $bg-fff;
        border: 1px solid $bg-default;
        padding: 20px;}
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
    import { proInit } from '@/api/database/proAna'


    export default {
        data () {
            return {
                propops:'',
                formData:{},        
            }
        },
        created () {
            this.proInitData()
        },
        methods: {
           proInitData(){
                proInit(this.formData).then(response => {
                    const _data = response
                    this.formData=_data.data
                    //百分比
                    const percentage = this.formData.map(ele=>ele.percentage)

                    //行业
                    const industry = this.formData.map(ele=>ele.industry)

                    
                    //var   gettype=Object.prototype.toString
                   // console.log('啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',_data.data)  
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
                            data: industry
                        },
                        series: [
                            {
                                type: 'bar',
                                data: percentage,
                                color:['#53b463','#c0d5ca']
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

