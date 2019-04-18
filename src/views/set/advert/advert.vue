<!-- 广告管理-waitAudit -->
<template>
  <div style="height:100%;">
    <div id="areaContHead">
      <div class="cont-title">广告管理</div>
      <!--tab 广告管理 -->
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
      <!-- <el-row class="sizer searchBox">
        <el-col :span="2" class="is_open">
          <el-select v-model="formData.is_open" size="medium " placeholder="选择状态">
            <el-option v-for="item in stateOption" :key="item.type" :label="item.label" :value="item.type"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="type">
          <el-select v-model="formData.msg_types" size="medium " placeholder="消息类型">
            <el-option label="消息类型" value=""></el-option>
            <el-option v-for="item in typeOption" :key="item.id" :label="item.message_type" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row> -->
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
                  :key="index" :command="{path:item.path,name:item.name,scope:scope.row}">{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column v-if='false' prop="id" label="id" ></el-table-column>
        <el-table-column prop="banner_link" label="广告链接" ></el-table-column>
          <el-table-column label="广告图片">
          <template slot-scope="scope" >
            <i class="iconfont icon-test16" @click="open('bannerView',null, true, scope.row)"></i>
          </template>
        </el-table-column>

      
        <el-table-column prop="sort" label="排序" ></el-table-column>
        <!-- <el-table-column prop="is_open" :formatter="stateTxt" label="状态" ></el-table-column> -->
      </el-table>
      <!-- cont 底部 -->
      <div id="areaContFooter" class="bot-cont clearfix" >
        <!-- v-if="dataList.length" -->
        <div class="opre-case">
          <!-- <el-checkbox @change="toggleSelection()" v-model="allChecked"></el-checkbox> -->
          <el-button v-if="dataList.length<5"
          size="small"
          type="success"
          @click="open('editAdvert',null, true ,null)"
          >新增广告</el-button>
          <el-button v-if="dataList.length"
          size="small"
          type="warning"
          @click="delBanneritem"
          >删除广告</el-button>
        </div>
        <div class="paging" v-if="false">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="formData.page"
            :page-sizes="sidebar.pageSizeArr"
            :page-size="formData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <banner-view
      :show.sync="dialogShow.bannerView"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </banner-view>
    <!-- 弹窗 -->
    <edit-advert
      :show.sync="dialogShow.editAdvert"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </edit-advert>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import * as App from '@/utils/index'
import { selectBanner,delBanner } from '@/api/set/advert'
import msgState from '@/dialog/set/message/msgState'
import editAdvert from '@/dialog/set/advert/editAdvert'
import bannerView from '@/dialog/set/advert/bannerView'
/*  */
export default {
  components: {
    msgState,
    editAdvert,
    bannerView
  },
  data () {
    return {
      formData:{
        // page: 1,// 当前所在页
        // pageSize: 10,// 每页大小
        id:'',
        medium_banner_url:'',
      },
      dialogShow:{  //弹窗显示flag
        msgState: false,        
        editAdvert: false,   
        bannerView:false,  
      },
      // 下拉框选项
      stateOption:[
        {
          type: '',
          label: '选择状态'
        }, {
          type: '1',
          label: '开启'
        }, {
          type: '2',
          label: '禁用'
        }
      ],
      typeOption:[
        
      ],
      timeSlot:[],  //时间段
      selectBatchItem: [],// table选中项 数组类型 选中一个或多个都存储在这个变量中
      selectSingleItem: null,// table选中一项操作
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
      console.log('mapGetters-navbar', this.sidebar)
      
      const that = this
     
      console.log('formData.page',this.formData)
      this.fetchList()  
    },
     /**
     * 确定删除
     */
    confirmBtn(){
      console.log('this.selectBatchItem.length',this.selectBatchItem.length)
      if(this.selectBatchItem.length>1){
        this.selectBatchItem.forEach(element => {
          this.formData.id += element.id + ','
          console.log('123',this.formData.id)
          console.log('element.id ', element.id + ',')
        });
      }else{
        this.selectBatchItem.forEach(element => {
          this.formData.id = element.id + ','
        });
      }
      
      this.formData.id = this.formData.id.substr(0, this.formData.id.length - 1);  
      delBanner(this.formData).then(response => {
        this.$message.success(response.errmsg)
        this.callBack && this.callBack()
        this.init()
        this.close()  
      }).catch(error => {
        console.error('noPass-error:', error)
      })
    },

    /**
     * 删除广告
     */
    delBanneritem(){
        // this.dataList = _data.data
       
        this.$confirm('此操作将删除该广告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.confirmBtn()
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   
    },
    /**
     * 跳转页面
     */
    goPage(item) {
      this.$router.push({path: item.path})
    },
    /** 
     *  获取列表数据
     */
    fetchList(){
      // this.formData
      selectBanner(this.formData).then(response => {
        let _data = response
        console.log('fetchList_data:', _data)
        this.dataList = _data.data
        this.totalCount = _data.totalCount
        this.formData.page = 1
      }).catch(error => {
        console.error('fetchList-error:', error)
      })
    },



    /** 
     *  搜索
     */
    searchHandle(){
      if (this.formData.banner_link && !this.formData.sort) {
        this.$message.warning('请选择类型')
        return
      }
      // 初始化参数
      this.formData.page = 1
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
      console.log('翻页',this.formData.page)
      this.fetchList()
    },
    /**
     * 选中操作
     */
    handleSelectionChange(val) {
      console.log(`SelectionChange:`,val)
      // 多个选项存储
      this.selectBatchItem = val;
      //this.formData.id = this.selectBatchItem.id;
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
    open (par, batch,init,item) {
      init&&(this.selectSingleItem = {})
      item && (this.selectSingleItem = item)
      batch && (this.batchOper = batch) 
      if (batch && this.selectBatchItem.length<1){
        this.$message.warning('请先选择操作项');
        return
      }
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
