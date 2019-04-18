<template>
<el-row :gutter="24">
    <el-col :span="12" class="pieboxs"><div id="proPie"></div><span>交易类型</span></el-col>
    <el-col :span="12" class="pieboxs"><div id="proPieb"></div><span>产品分布</span></el-col>
</el-row>
    
</template>
<style lang="scss" scoped>
    .pieboxs{
        position: relative;
        #proPie,#proPieb{
            width: 405px;
            height: 405px;
            margin: 0 auto;
        }
        span{
            position: absolute;
            display: inline-block;
            left:50%;
            top:50%;
            margin-left: -48px;
            margin-top:-16px;
            font-size: 24px;
            color:$font-info-color;
        }
    }
    
</style>

<script>
   import { Row, Col, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
    
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
      //  引入大圆饼
    require('echarts/lib/chart/pie');
    import { mapGetters } from 'vuex'
    import * as App from '@/utils/index'
    import { regInit } from '@/api/database/monAna'
    // color:['#76c56f', '#85cb7e','#a3d89c','#e1f1d8']


    export default {
        
        data () {
            return {
                pie:'',
                pieb:''
            }
        },
        created () {
            this.regInitData()
        },
        methods: {
            regInitData(){
                regInit(this.formData).then(response => {
                    const _data = response
                    //交易类型
                    this.formData=_data.data
                    //产品分布
                    this.guildData=this.formData.m.industryCount
                 

                    //交易类型-充值金额
                    const rechargeCount = this.formData.rechargeCount

                    //交易类型-提现金额
                    const withdrawDepositCount = this.formData.withdrawDepositCount

                    //交易类型-续费金额
                    const renewCount = this.formData.renewCount

                    //交易类型-总数
                    const totalCount = this.formData.totalCount
                    const plotting = []
                    const names =[]
                    const induData = this.guildData.forEach((item,index) =>{
                        //产品分布-行业
                        names.push(item.industry);
                        //产品分布-行业和占比
                        plotting.push({
                            value:item.con,
                            name:item.industry
                        })
                     })

                   


                    //var   gettype=Object.prototype.toString
                    this.pie = echarts.init(document.getElementById('proPie'));
                    this.pieb = echarts.init(document.getElementById('proPieb'));
                    this.pie.setOption({
                        textStyle: {
                            color: '#3d9738'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',//右侧标题位置设置
                            x: 'right',
                        },
                       
                        series: [
                            {
                                type:'pie',
                            },
                            {
                                name:"交易类型",//悬浮标题
                                type:'pie',
                                radius: ['40%', '55%'],
                                label: {
                                    normal: {
                                        backgroundColor: '#eee',
                                        borderColor: '#aaa',
                                        rich: {
                                            a: {
                                                color: '#999',
                                                lineHeight: 22,
                                                align: 'center'
                                            },
                                            hr: {
                                                borderColor: '#aaa',
                                                width: '100%',
                                                borderWidth: 0.5,
                                                height: 0
                                            },
                                            b: {
                                                fontSize: 16,
                                                lineHeight: 33
                                            },
                                            per: {
                                                color: '#eee',
                                                backgroundColor: '#334455',
                                                padding: [2, 4],
                                                borderRadius: 2
                                            }
                                        }
                                    }
                                },
                                data:[
                                    {value:renewCount, name:'续费'},//圆形小标题和数据
                                    {value:rechargeCount, name:'充值'},
                                    {value:withdrawDepositCount, name:'提现'},
                               
                                ],
                                data:[
                                    {value:renewCount, name:'续费'},
                                    {value:rechargeCount, name:'充值'},
                                    {value:withdrawDepositCount, name:'提现'},//右侧标题
                                ],
                                color:['#76c56f', '#85cb7e','#a3d89c','#e1f1d8']
                            }
                        ]
                    })
                    this.pieb.setOption({
                    textStyle: {
                        color: '#3d9738'
                    },
                     tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        data:names//行业名
                    },
                    series: [
                        { 
                            type:'pie',
                        },
                        {
                            name:'产品分布',//悬浮标题
                            type:'pie',
                            radius: ['40%', '55%'],
                            label: {
                                normal: {
                                // formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    backgroundColor: '#eee',
                                    borderColor: '#aaa',
                                    //borderWidth: 1,
                                    //borderRadius: 4,
                                    // shadowBlur:3,
                                    // shadowOffsetX: 2,
                                    // shadowOffsetY: 2,
                                    // shadowColor: '#999',
                                    // padding: [0, 7],
                                    rich: {
                                        a: {
                                            color: '#999',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        // abg: {
                                        //     backgroundColor: '#333',
                                        //     width: '100%',
                                        //     align: 'right',
                                        //     height: 22,
                                        //     borderRadius: [4, 4, 0, 0]
                                        // },
                                        hr: {
                                            borderColor: '#aaa',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 16,
                                            lineHeight: 33
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    }
                                }
                            },
                            data:plotting,//行业名称和比例，value和name
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
                this.regInitData();
            })
        }
    }
</script>

