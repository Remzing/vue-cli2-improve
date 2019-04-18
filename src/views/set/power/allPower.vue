<!-- 全部管理员-waitAudit -->
<template>
  <div style="height:100%;">
    <div id="areaContHead">
      <div class="cont-title">权限管理</div>
      <!--tab 全部管理员 -->
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
        <el-col class="mgr search-date">
          <span class="demonstration"></span>
          <el-date-picker :editable="false" v-model="timeSlot" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium ">
          </el-date-picker>
        </el-col>
        <el-col :span="2" class="mgr">
          <el-select v-model="formData.type" size="medium " placeholder="选择类型">
            <el-option v-for="item in typeOption" :key="item.type" :label="item.label" :value="item.type"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3" class="mgr">
          <el-input
            placeholder="请输入内容"
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
                  v-if="item.state==0||(scope.row.role_id!=-1&&item.state==1)||(scope.row.role_id!=-1&&item.state==2)"
                  :key="index" :command="{path:item.path,name:item.name,scope:scope.row}">{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column v-if='false' prop="id" label="id" ></el-table-column>
        <el-table-column prop="create_time" label="添加时间" ></el-table-column>
        <el-table-column prop="empno" label="工号" ></el-table-column>
        <el-table-column prop="real_name"   label="真实姓名" ></el-table-column>
        <el-table-column prop="telephone" label="手机号码" ></el-table-column>
        <el-table-column prop="role_name" label="管理组" ></el-table-column>
        <el-table-column prop="degree" label="登录次数" ></el-table-column>
        <el-table-column prop="last_login_time" label="最后登录" ></el-table-column>
        <el-table-column prop="locked" label="状态" :formatter="stateTxt" ></el-table-column>
      </el-table>
      <!-- cont 底部 -->
      <div id="areaContFooter" class="bot-cont clearfix" v-if="dataList.length">
        <div class="opre-case">
          <!-- <el-checkbox @change="toggleSelection()" v-model="allChecked"></el-checkbox>
          <el-button
          size="small"
          type="warning"
          @click="open('resetPwd', true)"
          >重置密码</el-button> -->
          <el-button
          size="small"
          type="success"
          @click="open('editAcount', null, true)"
          >添加管理员</el-button>
        </div>
        <div class="paging">
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
    <edit-acount
      :show.sync="dialogShow.editAcount"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </edit-acount>
    <login-log
      :show.sync="dialogShow.loginLog"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </login-log>
    <power-state
      :show.sync="dialogShow.powerState"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </power-state>
    <reset-pwd
      :show.sync="dialogShow.resetPwd"
      :single-item='selectSingleItem'
      :batch-item='selectBatchItem'
      :batch-oper='batchOper'
      :call-back='fetchList'>
    </reset-pwd>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import * as App from '@/utils/index'
import { selectPageAdminList } from '@/api/set/power'
import editAcount from '@/dialog/set/power/editAcount'
import loginLog from '@/dialog/set/power/loginLog'
import powerState from '@/dialog/set/power/powerState'
import resetPwd from '@/dialog/set/power/resetPwd'

// import auditTest from './dialog/waitaudit/editAcount'
/*  */
export default {
  components: {
    editAcount,
    loginLog,
    powerState,
    resetPwd,
  },
  data () {
    return {
      formData:{
        is_pass: 3,// 审核是否通过(0不通过 1通过 3待审核)
        page: 1,// 当前所在页
        pageSize: 10,// 每页大小
        start_time: null,// 开始时间
        end_time: null,// 结束时间
        type: null,// 1企业名称 2纳税识别号
        keyword: null,// 具体内容
      },
      dialogShow:{  //弹窗显示flag
        editAcount: false,
        loginLog: false,
        powerState: false,
        resetPwd: false,
      },
      // 下拉框选项
      typeOption:[
        {
          type: '',
          label: '选择类型'
        }, {
          type: '1',
          label: '企业名称'
        }, {
          type: '2',
          label: '纳税识别号'
        }
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
    this.init(this.$route.path)
    
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
      this.fetchList()
    },
    /**
     * 跳转页面
     */
    goPage(item) {
      this.$router.push({path: item.path})
    },
    /**
     * table中数据处理 --formatter
     */
    stateTxt(row, column) {
      return ['已锁定',"正常",'离职'][row.locked] || row.locked
    },
    
    /** 
     *  获取列表数据
     */
    fetchList(){
      // this.formData
      selectPageAdminList(this.formData).then(response => {
        let _data = response.data
        console.log('getLoginCode:', _data)
        this.dataList = _data.AdminList.list
        this.totalCount = _data.AdminList.total
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
      this.fetchList()
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
    open (par, batch, init) {
      init&&(this.selectSingleItem = {})
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
