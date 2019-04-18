<!-- 控制台-controlDesk -->
<template>
  <div class="cont-sol">   
    <el-row class="assets clearfix" :gutter="0" >
      <!-- <el-col class="user clearfix" :span="6"> -->
        <el-col class="date-box " :span="3" >
          <ul class="date" id="clock" ref="clock">
            <!-- <li>日历</li> -->
            <li class="menolo">{{ menolo }}</li>
            <li class="weeks">{{ weeks }}</li>
            <li class="lunar">{{ lunar }}</li>
          </ul>
        </el-col>
        <el-col class="user" :span="4" style="padding-left: 0px; padding-right: 0px;margin: 0px 20px;  ">
          <ul  style="width:100%;margin: 0px;" >
            <li class="font-info">{{txtShow}} &nbsp;&nbsp;{{admin.username}}</li>
            <li>您的权限：<span>{{admin.roleName}}</span></li>
            <li>上次登录：<span>{{admin.last_login_time}} <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（{{admin.city||'深圳'}}）</span> </li>
          </ul>
        </el-col>
      <!-- </el-col> -->
      <el-col :span="16" class="sum sumboxs clearfix" style="margin-left: 0px;">
        <el-col :span="8" class="sum">
          <ul>
            <li class="font-info">客户总数</li>
            <li class="num">{{countList.userTotalCount}}</li>
            <router-link to="/database/cusAna/cusAnalysis" ><li class="clearfix">今日：{{countList.userTodayCount}}  |  本月：{{countList.userThisMonthCount}} <i class="iconfont icon-user-name1"></i></li> </router-link>     
            
          </ul>
        </el-col>
        <el-col :span="8" class="sum">
          <ul>
            <li class="font-info">小程序总数</li>
            <li class="num">{{countList.appsTotalCount}}</li>
            <router-link to="/database/monAna/monAnalysis" ><li class="clearfix">今日：{{countList.appsTodayCount}}  |  本月：{{countList.appsThisMonthCount}} <i class="iconfont icon-user-name1"></i></li></router-link>     
          </ul>
        </el-col>
        <el-col :span="8" class="sum">
          <ul style="margin-right:0px;">
            <li class="font-info">产品类型</li>
            <li class="num num-mu">{{countList.productType}}</li>
            <router-link to="/database/proAna/proAnalysis" ><li class="clearfix">定制产品数：{{countList.productCustomization}}  |  小程序数量：{{countList.productApply}} <i class="iconfont icon-user-name1"></i></li></router-link>  
          </ul>
        </el-col>
      </el-col>
    </el-row>
    <div class="remind-box distance">
      <span class="title-comon">
        代办提醒
      </span>
      <el-row :gutter="24" class="clearfix">
        <el-col :span="6">
          <ul>
            <li class="remind-num">{{remindList.auditAuthenticationCount}}</li>
            <li>审核认证</li>
          </ul>
        </el-col>
        <el-col :span="6">
          <ul>
            <li class="remind-num">{{remindList.noteDispose}}</li>
            <li>开票处理</li>
          </ul>
        </el-col>
        <el-col :span="6">
          <ul>
            <li class="remind-num">{{remindList.expireOrder}}</li>
            <li>订单到期</li>
          </ul>
        </el-col>
        <el-col :span="6">
          <ul>
            <li class="remind-num">{{remindList.withdrawDepositDispose}}</li>
            <li>提现处理</li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <div class="msg distance clearfix">
      <div class="title-comon">数据分析</div>
      <el-row :gutter="24">
        <chart-pies></chart-pies>
        <chart-radar></chart-radar>
        <chart-map></chart-map>   
      </el-row>
    </div>
    <div class="tend distance clearfix">
      <div class="title-comon">数据趋势</div>
      <el-row :gutter="24">
        <chart-pop></chart-pop>
        <chart-line></chart-line>
      </el-row>
    </div>
  
  </div>
</template>
<script>
  import { Row, Col} from 'element-ui'

  //圆饼
  import chartPies from '../../components/chartbox/chartPie.vue'

  //雷达
  import chartRadar from '../../components/chartbox/chartRadar.vue'

  //地图
  import chartMap from '../../components/chartbox/chartMap.vue'

  //柱状图
  import chartPop from '../../components/chartbox/chartPop.vue'

  //折线图
  import chartLine from '../../components/chartbox/chartLine.vue'

  import { mapGetters } from 'vuex'
  import * as App from '@/utils/index'
  import { getLocal } from '@/utils/index'  
  import { conBaseData,conremind } from '@/api/contrDesk'
  import { calendar } from '@/views/contrDesk/calendar.js'
  export default{
     components: {
      chartPies,
      chartRadar, 
      chartMap,
      chartPop,
      chartLine
    },
    data () {
      return { 
        formData:{},
        countList:[],
        remindList:[],
        admin:{},
        txtShow:'',
        lunar: '',//农历
        menolo: '',//年月日
        weeks:'',//星期
        week:['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      }
    },
    computed: {
      
    },
    created(){
      this.init()
    },
    methods:{
      /**
     * 初始化
     */
    init(){
       //console.log('allXcxOrder啵啵啵宝宝--init', this.$router,this.$route)
        this.admin = getLocal('admin')||{}
        let nowTime = new Date()
        if (nowTime.getHours()>12) {
          this.txtShow='下午好！'
        }else{
          this.txtShow='上午好！'
        }
        this.marstConBaseData(),
        this.marstConremind(),
        this.updateTime()
    },
    /**
     * 工作台基本数据
     */
    marstConBaseData(){
        conBaseData(this.formData).then(response => {
            const _data = response
            this.countList = _data.data
           
           // console.log('数字获取',_data.data)
        }).catch(error => {
            console.error('conBaseData-error:', error)
        })
    },
    /**
     * 日厉
     */
    zeroPadding(num, digit) {
        var zero = '';
        for(var i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    },
    updateTime() {
      //setInterval(()=>{
        var cd = new Date();
        var lunar = calendar.solar2lunar();
        //数字时间显示//this.time = this.$options.methods.zeroPadding(cd.getHours(), 2) + ':' + this.$options.methods.zeroPadding(cd.getMinutes(), 2) + ':' + this.$options.methods.zeroPadding(cd.getSeconds(), 2);
        this.menolo = this.$options.methods.zeroPadding(cd.getFullYear(), 4) + '-' + this.$options.methods.zeroPadding(cd.getMonth()+1, 2) + '-' + this.$options.methods.zeroPadding(cd.getDate(), 2);
        this.weeks = this.week[cd.getDay()];
        this.lunar = lunar.gzYear+'（'+lunar.Animal+'）年'+' '+lunar.IMonthCn+lunar.IDayCn
      //},1000)//数字时间显示
        
    },
      /**
     * 工作台代办提醒
     */
    marstConremind(){
        conremind(this.formData).then(response => {
            const _data = response
            this.remindList = _data.data
           
            console.log('数字获取',_data.data)
        }).catch(error => {
            console.error('conBaseData-error:', error)
        })
    },

    }
  }
  
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .cont-sol{
    margin: 0 20px;
  }
  .icon-user-name1{
    font-size:14px;
  }

  .distance{
    margin-bottom: 20px;
    padding: 20px;
    background-color: $bg-fff;
  }
  /*公共处end*/
/*col-lg 1200以上，大PC*/
@media (min-width: 1679px){
  .assets .sumboxs{
    width: 68.2% !important;
  }
}
@media (min-width: 1201px){
  .assets{
    width: 100% !important;
    .sumboxs{
      // max-width: 67.2%;min-width: 68.5%;
      // width: 68.5%;
      width: 68.5%;
      margin-right: -10%;
    }
  }
}
  /*控制台-个人信息处-首行*/
  /*col-md 992-1200 PC*/
@media (min-width: 992px) and (max-width: 1200px){
  .assets{
    width: 97% !important;
    .sumboxs{
      margin-right: -10%;
      width: 62.1% !important;
    }
    .num{
      padding-bottom: 12px !important;
    }
    .user{
      width: 22% !important;
    }
    .date-box{
      width: 15% !important;
    }

  }
}
/*col-sm 768-992 平板*/
@media (min-width: 768px) and (max-width: 992px){
  .assets{
    width: 96% !important;
    .sumboxs{
      margin-right: -30px;
      width: 60% !important;
    }
    ul li.font-info{
      margin-bottom: 17px !important;
    }
    .num{
      padding-bottom: 0px !important;
    }
    .user{
      width: 23% !important;
      font-size: 9px !important;
    }
    .date-box{
      width: 15% !important;
      .weeks{
        font-size: 24px !important;
      }
    }
  }
}
/*col-xs小于768 手机*/
@media (max-width: 768px){
  .assets{
    width: 96% !important;
    .sumboxs{
      margin-right: -30px;
      width: 55% !important;
    }
    .num{
      padding-bottom: 0px !important;
    }
    .user{
      width: 27% !important;
      font-size: 9px !important;
    }
    ul li.font-info{
      margin-bottom: -4px !important;
    }
    .date-box{
      width: 15% !important;
      .menolo{
        font-size: 13px !important;
      }
      .weeks{
        font-size: 26px !important;
      }
    }
  }
}
.assets{
  margin-bottom: 20px;
    // .date-box{
    //   width: 242px;
    //   height: 146px;
    //   background-color: $bg-fff;
    //   .date{
    //     width: auto !important;
    //   }
    // }
      ul{
        height:150px;
      }
     //日历样式
      .date-box{
        // width: 240px;
        height: 149px;
        .menolo{
          font-weight: bold;
          color: #fff;
          font-size: 18px;
        }
        .weeks{
          font-size: 30px;
          color: $color-info;
          padding: 15px 0 0 0;
        }
        .lunar{
          font-size: 14px;
          color: $color-info;
        }
  
        ul{
          height: 101%;
          background: url('../../assets/images/menolo.png') no-repeat center;
          position: relative;
          background-size: 240px 156px;
          li{
            text-align: center;
          }
        }
        .date{
          margin: 0px;
          width: auto;
          padding: 14px 0px;
        }
        
      }
    
    .num{
      font-size: $font-size-24;
      color: $color-default;
      padding-bottom:20px;
    }
    ul{
       background-color: $bg-fff;
      .font-info{
        color:$font-info-color !important;
        font-weight: bold;
        margin-bottom: 25px !important;
        font-size: $font-size-14;
      }
    }
    .user{
      ul{
        padding: 19px;
        width: 300px;
        margin: 0 20px;
        li{
          color:$font-default-color;
          margin-bottom: 9px;
          span{
            color: $color-info;
          }
        }
      }
    }
    .sum{
      background-color: $bg-fff;
      ul{
        //width: 329px;
        width: 100%;
        padding: 20px 0 20px 20px;
        margin-right: 20px;
        float: left;
        li{
          &:last-child{
            background-color:  $bg-default;
            font-size: 12px;
            color: $font-info-color;
            line-height: 21px;
            position: relative;
            padding: 0 12px;
            i{
              position: absolute;
              right: 12px;
            }
            &:hover{
              background-color: #e6e8e9;
            }
          }
          
        }
      }
    }
  }
  /*控制台-代办提醒-第二行*/
  .remind-box{
    ul{
      width: 352px;
      float: left;
      margin-top:30px;
      li{
        font-size: $font-size-14;
        color: $font-default-color;
        text-align: center;
        margin-bottom: 10px;
      }
      li.remind-num{
        font-size: $font-size-24;
        font-weight: bold;
        color: $color-default;
        margin-bottom: 20px;
      }
    }
  }

  /*控制台-数据分析-第三行*/
  .msg{
    position: relative;
  }

  /*控制台-数据趋势-最后一行*/
  .tend{
    position: relative;
  }

</style>
