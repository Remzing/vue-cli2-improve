<template>
  <div>
    <div class="cont-title">产品分析</div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="产品分析" name="first"></el-tab-pane>
    </el-tabs>
    <div class="count-bg">
        <div class="title-count">昨日关键指标</div>
        <el-row class="newcount">
            
            <el-col :span="6" class="county">
                <p>新增订单</p>
                <span>9999</span>
                <ul>
                    <li>日 <i></i><span>4%</span></li>
                    <li>周 <i></i><span>6%</span></li>
                    <li>月 <i></i><span>66%</span></li>
                </ul> 
            </el-col>
            <el-col :span="6" class="county">
                <p>新增订单</p>
                <span>9999</span>
                <ul>
                    <li>日 <i></i><span>4%</span></li>
                    <li>周 <i></i><span>6%</span></li>
                    <li>月 <i></i><span>66%</span></li>
                </ul> 
            </el-col>
            <el-col :span="6" class="county">
                <p>新增订单</p>
                <span>9999</span>
                <ul>
                    <li>日 <i></i><span>4%</span></li>
                    <li>周 <i></i><span>6%</span></li>
                    <li>月 <i></i><span>66%</span></li>
                </ul> 
            </el-col>
            <el-col :span="6" class="county">
                <p>新增订单</p>
                <span>9999</span>
                <ul>
                    <li>日 <i></i><span>4%</span></li>
                    <li>周 <i></i><span>6%</span></li>
                    <li>月 <i></i><span>66%</span></li>
                </ul> 
            </el-col>
        </el-row>
    </div>
    <div class="count-bg">
        <el-row class="sizer">
            <el-col :span="2">
               <el-dropdown>
                    <el-button>
                        更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item>双皮奶</el-dropdown-item>
                        <el-dropdown-item>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col :span="2">
                  <div class="block">
                    <span class="demonstration"></span>
                    <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
                    <pro-line></pro-line>
                </el-row>
                
            </div>
        </el-row>
            
        

    </div>
  </div> 
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->


<script>
import * as App from '@/utils/index';
import { Row, Col, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
//折线图
  import proLine from '../../../components/analysisbox/proLine.vue'
/*  */
export default {
  components: {
    proLine
  },
  data () {
    return {
      activeName2: 'first',
      value6:''
    };
  },
  created () {
  },
  mounted () {
   
  },
  methods: {
    handleClick ( tab, event ) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
 /*字体颜色变量*/
  $font-default-color:#353535;
  $font-info-color:#888888;
  $font-info--color-light:#bbbbbb;
  $font-danger-color:#fa7821;
  $font-other-color:#dddddd;

  /*线条颜色变量*/
  $border-default:#eeeeee;
  $border-info:#e6e8e9;

  /*主色调*/
  $color-default:#3d9738;
  $color-info:#62b42f;

  /*背景色*/
  $bg-default:#f6f8f9;

  /*字体字号及加粗*/
  $font-size-24:24px;
  $font-size-14:14px;

  /*背景色*/
  $bg-fff:#fff;

    .count-bg{background-color: $border-info;margin-bottom: 20px;}
    .sizer{padding:5px;}
    .title-count{
        color:$font-default-color;
        line-height: 40px;
        margin-left: 20px;
    }
      .newcount{
        background-color: $bg-fff;
        border: 1px solid $border-default;
        padding: 20px;}
  
    .county{
        border-right: 1px solid $border-default;
        text-align: center;
        p{
            font-size: 14px;
            color: $font-default-color;
            margin-bottom: 14px;
        }
        p+span{
            font-size: 24px;
            font-weight: bold;
            color:  $color-info;
        }
        li{
            line-height: 18px;
        }
    }
    .county:last-child{
        border-right: 0px;
    }
       

</style>


