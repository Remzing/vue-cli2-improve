<!-- 模板库- -->
<template>
  <div style="height:100%;">
    <div id="areaContHead">
      <div class="cont-title">模板库</div>
      <!--tab 产品库 -->
      <div class="tab-box">
        <ul>
          <li v-for="(item, index) in sidebar.thrLev" :key="index" :label="item.name" 
            @click="goPage(item)"
            :class="{'active':item.path==$route.path}">
            {{item.name}}
          </li>
        </ul>
      </div>
      <!-- 搜索 -->
      <el-row class="sizer searchBox">
        <el-col :span="2" class="mgr" >
          <el-select v-model="formData.industry_id" size="medium " placeholder="行业选择">
            <el-option v-for="item in industryOption" :key="item.id" :label="item.industry" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="mgr">
          <el-select v-model="formData.style_id" size="medium " placeholder="风格选择">
            <el-option v-for="item in styleOption" :key="item.id" :label="item.style" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="mgr">
          <el-select v-model="formData.state" size="medium " placeholder="选择状态">
            <el-option v-for="item in stateOption" :key="item.label" :label="item.label" :value="item.type"></el-option>
          </el-select>
        </el-col>
        <el-col class="mgr search-date">
          <span class="demonstration"></span>
          <el-date-picker :editable="false" v-model="timeSlot" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium ">
          </el-date-picker>
        </el-col>
       <!--  <el-col :span="2" class="mgr">
          <el-select v-model="formData.type" size="medium " placeholder="选择类型">
            <el-option v-for="item in typeOption" :key="item.type" :label="item.label" :value="item.type"></el-option>
          </el-select>
        </el-col> -->
        <el-col :span="4" class="mgr">
          <el-input
            placeholder="输入模板名称/产品名称"
            size="medium "
            v-model="formData.keyword">
            <i slot="suffix" class="el-input__icon el-icon-search cur-pot" @click="searchHandle"></i>
          </el-input>
        </el-col>
      </el-row>
    </div>
    
    <div>
      <!-- 列表 -->
      <el-table
        ref="multipleTable"
        :data="dataList" 
        @selection-change="handleSelectionChange" 
        size="medium" 
        stripe 
        style="width: 100%" 
        :height="calcTableHeight">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column  resizable label="操作"  width="150">
          <template slot-scope="scope">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link drop-txt">
                选择操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" :command="scope.row">
                <el-dropdown-item v-for="(item, index) in dropOperArr" 
                  v-if="(item.state==-1)||(item.state==1&&scope.row.is_show==0)||
                  (item.state==0&&scope.row.is_show==1)"
                  :key="index" :command="{path:item.path,name:item.name,scope:scope.row}">{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column v-if='false' prop="id" label="id" ></el-table-column>
        <el-table-column v-if='false' prop="is_show" label="is_show" ></el-table-column>
        <el-table-column v-if='false' prop="template_name" label="template_name" ></el-table-column>
        <el-table-column prop="create_time" label="创建时间" ></el-table-column> 
        <el-table-column prop="min_picture" label="缩略图" >
          <template slot-scope="scope">
            <img :src="scope.row.min_picture" width="50" height="50"/>
          </template>
        </el-table-column>
        <el-table-column prop="template_name" label="模板名称" ></el-table-column> 
        <el-table-column prop="industry" label="所属行业" ></el-table-column>
        <el-table-column prop="style" label="所属风格" ></el-table-column>
        <el-table-column prop="fee" :formatter="feeTxt" label="费用（元） " ></el-table-column>
        <el-table-column prop="is_show" label="状态" :formatter="stateTxt"  ></el-table-column>
      </el-table>
      <!-- cont 底部 -->
      <div id="areaContFooter" class="bot-cont" >
        <div class="opre-case">
          <!-- <el-checkbox v-if="dataList.length" @change="toggleSelection()" v-model="allChecked"></el-checkbox>
          <el-button
          size="medium"
          v-if="dataList.length"
          @click="open('closeApp', true)"
          type="warning"
          >批量上下架</el-button> -->
          <el-button
          size="medium"
          type="success"
          @click="open('/product/template/editPubTem')"
          >发布模板</el-button>
        </div>
        <div class="paging" v-if="dataList.length">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="formData.page"
            :page-sizes="sidebar.pageSizeArr"
            :page-size="formData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <on-off-template
      :show.sync="dialogShow.onOffTemplate"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </on-off-template>
    <delete-template
      :show.sync="dialogShow.deleteTemplate"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </delete-template>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import * as App from '@/utils/index'
import { selectTemplateInit, selectTemplateList } from '@/api/product/template'
// dialog
import onOffTemplate from '@/dialog/product/template/onOffTemplate'
import deleteTemplate from '@/dialog/product/template/deleteTemplate'

/*  */
export default {
  components: {
    onOffTemplate,
    deleteTemplate
  },
  data () {
    return {
      formData:{
        page: 1,// 当前所在页
        pageSize: 10,// 每页大小
        start_time: null,// 开始时间
        end_time: null,// 结束时间
        state: null,// 是否上架(0不上架 1上架)
        style_id: null,// 风格id
        industry_id: null,// 行业id
        type: null,// 类型(1关联订单 2合同编号 3定制名称)
        keyword: null,// 具体内容
      },
      dialogShow:{  //弹窗显示flag
        onOffTemplate: false,
        deleteTemplate: false,
      },
      // 下拉框选项
      stateOption:[
        { state: '', label: '选择状态' }, 
        { state: '0', label: '下架' },
        { state: '1', label: '上架' },
      ],
      industryOption:[],
      styleOption:[],
      dialogName: '',
      nowState: null ,
      timeSlot: [],  //时间段
      selectBatchItem: [],// table选中项 数组类型 选中一个或多个都存储在这个变量中
      selectSingleItem: {},// table选中一项操作
      batchOper: false,// 是否是批量操作
      allChecked: false,  // 全选按钮状态
      totalCount:0, //总条数
      dataList: [],
      areaHeadH:0,
      areaFootH:0
    };
  },
  watch: {
    timeSlot: function (val, oldVal) {
      console.log('new:', val, oldVal)
      if (val){
        this.formData.start_time = val[0]
        this.formData.end_time = val[1]
      }
    },
  },
  computed: {
    // 获取state
    ...mapGetters([
      'sidebar',
    ]),
    // 计算table列表高度
    calcTableHeight () {
      let tableHeight = (this.sidebar.nowWinH-this.areaHeadH-this.areaFootH-this.sidebar.layoutH)
      return tableHeight
    },
    /**
     * 获取下拉操作项
     */
    dropOperArr(){
      let dropOper = []
      console.log('dropOperArr')
      if (this.sidebar.thrLev ){
        this.sidebar.thrLev.forEach(ele => {
          if(ele.path === this.$route.path){
            dropOper = ele.children
          }
        })
      }
      return dropOper
    }
  },
  created () {
    this.init()
    
  },
  mounted () {
    this.$nextTick(function () {
      console.log('allXcxOrder--mounted')
      // 获取到内容区域头部和底部的高度--为了计算table的高度
      let areaContHead = document.getElementById('areaContHead')
      let areaContFooter = document.getElementById('areaContFooter')
      this.areaHeadH = areaContHead && areaContHead.offsetHeight
      this.areaFootH = areaContFooter && areaContFooter.offsetHeight
    })
  },
  methods: {
    /** 
     * 初始化
     */
    init(){
      console.log('allXcxOrder--init', this.$router,this.$route)
      this.formData.state = this.nowState
      selectTemplateInit().then(response => {
        let _data = response
        this.industryOption = _data.data.industry
        this.styleOption = _data.data.style
      }).catch(error => {
        console.error('selectTemplateInit-error:', error)
      })
      this.fetchList()
    },
    /**
     * 跳转页面
     */
    goPage(item) {
      if (item.path=='/product/template/xcxTemplate') {
        window.open('https://open.weixin.qq.com/')
        return
      }
      this.$router.push({path: item.path})
    },
    /**
     * 跳转页面
     */
    /* pubTem() {
      
      this.$router.push({path: '/product/template/editPubTem', query:{id:(this.selectSingleItem.id||'')}})
    }, */
    /**
     * table中数据处理 --formatter
     */
    stateTxt(row, column) {
      return ['不显示',"显示"][row.is_show] || row.is_show
    },
    feeTxt(row, column) {
      return (row.fee>0?row.fee:'免费')
    },
    /** 
     *  获取列表数据
     */
    fetchList(){
      // this.formData
      selectTemplateList(this.formData).then(response => {
        let _data = response
        console.log('getLoginCode:', _data)
        this.dataList = _data.list
        this.dataList.forEach(ele => {
          // ele.picture = App.photoUrlMeger(ele.picture||'')
          ele.min_picture = App.photoUrlMeger(ele.min_picture||'')
        });
        this.totalCount = _data.totalCount
      }).catch(error => {
        console.error('fetchList-error:', error)
      })
    },
    /** 
     *  搜索
     */
    searchHandle(){
      if (this.formData.keyword && !this.formData.type) {
        this.$message.warning('请选择类型')
        return
      }
      // 初始化参数
      this.formData.page = 1
      this.fetchList()
    },
    /**
     * 修改列表显示条数
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.formData.pageSize = val
      this.formData.page = 1 //清空页数
      this.fetchList()
    },
    /**
     * 翻页
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.formData.page = val
      this.fetchList()
    },
    /**
     * 下拉操作项change
     */
    handleCommand(command) {
      if (command) {
        console.log(`handleCommand:`, command,command.path)
        this.batchOper = false //非批量操作
        // 选中项存储
        this.selectSingleItem = command.scope
        this.dialogName = command.name // 用于多个弹窗共用一个组件--区分当前弹窗
        // 打开窗口
        this.open(command.path)
      }
    },
    /**
     * 选中操作
     */
    handleSelectionChange(val) {
      console.log(`SelectionChange:`,val)
      // 多个选项存储
      this.selectBatchItem = val;
      // 判断是否全选
      if(val.length == this.dataList.length){
        this.allChecked = true
      }else{
        this.allChecked = false
      }
    },
    /**
     * 全选操作
     */
    toggleSelection() {
      let rows = this.dataList
      console.log(`toggleSelection:`,rows,this.dataList,this.selectBatchItem)
      if (this.allChecked) {
        rows.forEach(row => {
          // 全选
          this.$refs.multipleTable.toggleRowSelection(row,true);
        });
      } else {
        // 取消全选
        this.$refs.multipleTable.clearSelection();
      }
    },
    /**
     * 打开弹窗
     * @augments par 弹窗名称
     * @augments batch 是否是批量操作
     */
    open (par, batch) {
      batch && (this.batchOper = batch) 
      if (batch && this.selectBatchItem.length<1){
        this.$message.warning('请先选择操作项');
        return
      }
      
      // 跳转页面
      if (par.indexOf('/')>-1){
        this.$router.push({path: par, query:{id:(this.selectSingleItem.id||'')}})
        return
      }
      // 打开弹窗
      if (par){
        this.dialogShow[par] = true        
      }else{
        this.$message.error('打开弹出错误！');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
