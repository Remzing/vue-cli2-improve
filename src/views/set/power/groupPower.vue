<!-- 管理组-waitAudit -->
<template>
  <div>
    <div style="height:100%;" v-if="stateShow==1">
      <div id="areaContHead">
        <div class="cont-title">权限管理</div>
        <!--tab 管理组 -->
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
                    
                    v-if="scope.row.role_id!=-1"
                    :key="index" :command="{path:item.path,name:item.name,scope:scope.row}">{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column v-if='false' prop="id" label="id" ></el-table-column>
          <el-table-column prop="updateTime" :formatter="timeTxt" label="更新时间" ></el-table-column>
          <el-table-column prop="roleName" label="名称" ></el-table-column>
          <el-table-column prop="status" :formatter="stateTxt" label="状态" ></el-table-column>
        </el-table>
        <!-- cont 底部 -->
        <div id="areaContFooter" class="bot-cont clearfix" v-if="dataList.length">
          <div class="opre-case">
            <el-checkbox @change="toggleSelection()" v-model="allChecked"></el-checkbox>
            <!-- <el-button
            size="small"
            type="warning"
            @click="open('changeGroup', true)"
            >更改状态</el-button> -->
            <el-button
            size="small"
            type="success"
            @click="addManageGroup"
            >添加管理组</el-button>
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
      <change-group
        :show.sync="dialogShow.changeGroup"
        :single-item='selectSingleItem'
        :batch-item='selectBatchItem'
        :batch-oper='batchOper'
        :call-back='fetchList'>
      </change-group>
      <delete-group
        :show.sync="dialogShow.deleteGroup"
        :single-item='selectSingleItem'
        :batch-item='selectBatchItem'
        :batch-oper='batchOper'
        :call-back='fetchList'>
      </delete-group>
    </div>
    <!-- 添加管理组 -->
    <div v-if="stateShow==2">
      <div class="cont-title">权限管理</div>
      <div class="tab-box">
        <ul>
          <li v-for="(item, index) in sidebar.thrLev" :key="index" :label="item.name" 
            @click="goPage(item)"
            :class="{'active':item.path==$route.path}">
            {{item.name}}
          </li>
        </ul>
      </div>

      <el-form :model="groupData" label-position="top" status-icon :rules="rules2" ref="groupData" label-width="100px" class="demo-ruleForm">
        <el-form-item label="管理组名称：" prop="role_name">
          <el-input style="width: 30%;" :maxlength="10" placeholder="管理组名称" v-model="groupData.role_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理组描述：" prop="description">
          <el-input type="textarea" :maxlength="100"  :rows="6" v-model="groupData.description" placeholder="请输入管理组描述"></el-input>
        </el-form-item>
      </el-form>
      <!-- <span class="red-star">*</span> -->
      <div style="margin:0 0 16px;"> 权限地图：</div>
      <el-tree
        :data="powerData"
        show-checkbox
        ref="rightTreeRef"
        node-key="id"
        :default-expanded-keys="[]"
        @check-change="handleCheckChange"
        :default-checked-keys="rightArr"
        :props="defaultProps">
      </el-tree>
      <div class="sure-btn dis-flex">
        <el-button
          type="success"
          size="medium"
          @click="submitForm('groupData')"
          >确认添加</el-button>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import * as App from '@/utils/index'
import { queryRoleList, toUpdateRole, toInsertRole, insertRole, updateRole } from '@/api/set/power'
import changeGroup from '@/dialog/set/power/changeGroup'
import deleteGroup from '@/dialog/set/power/deleteGroup'
/*  */
export default {
  components: {
    changeGroup,
    deleteGroup,
  },
  data () {
    return {
      stateShow:1,
      formData:{
        is_pass: 3,// 审核是否通过(0不通过 1通过 3待审核)
        page: 1,// 当前所在页
        pageSize: 10,// 每页大小
        start_time: null,// 开始时间
        end_time: null,// 结束时间
        type: null,// 1企业名称 2纳税识别号
        keyword: null,// 具体内容
      },
      groupData:{
        id: '', // 管理组id
        description: '', // 管理组描述
        role_name: '', // 管理组名称
        right_ids: '', // 权限节点名称
      },
      rules2:{
        role_name: [
          { required: true, message: '请输入管理组名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入管理组描述', trigger: 'blur' }
        ],
      },
      rightArr:[],
      dialogShow:{  //弹窗显示flag
        changeGroup: false,       
        deleteGroup: false,       
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
      powerData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
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
    stateShow: function (val, oldVal) {
      console.log('stateShow', val)
      if (val==2){
        if(this.$route.query && this.$route.query.id){
          this.groupData.id = this.$route.query.id
        }
        this.fetchTree()
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
      if(this.$route.query && this.$route.query.state==2){
        this.stateShow=2
      }else{
        this.stateShow=1
        this.fetchList()
      }
    },
    /**
     * 跳转页面
     */
    goPage(item) {
      this.$router.push({path: item.path, query:{state:1}})
    },
    stateTxt(row, column) {
      return ['',"正常",'关闭'][row.status] || row.status
    },
    timeTxt(row, column) {
      return App.splitTimeStr(row.updateTime) || App.splitTimeStr(row.createTime)
    },
    /**
     * 
     */
    fetchCurrentKey(param){
      console.log('fetchCurrentKey', param)
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log('handleCheckChange',data, checked, indeterminate);
    },
    /**
     * 获取当前操作数据
     */
    getNowOperData(){
      this.groupData.right_ids = ''
      console.log('handleCheckChange', this.$refs.rightTreeRef.getCheckedKeys());
      let rightArr = this.$refs.rightTreeRef.getCheckedKeys()
      rightArr.forEach(element => {
        this.groupData.right_ids += element + ','
      });
      this.groupData.right_ids = this.groupData.right_ids.substr(0, this.groupData.right_ids.length - 1);  
    },
     /**
     * queding
     */
    confirmBtn(){
      this.getNowOperData()
      console.log('confirmBtn', this.groupData)
      if (this.groupData.id) {
        updateRole(this.groupData).then(response => {
          this.$message.success(response.errmsg)
          this.$router.push({path: '/set/power/groupPower', query:{state:1}})
          this.stateShow =1
          this.init()
        }).catch(error => {
          console.error('noPass-error:', error)
        })
      }else{
        insertRole(this.groupData).then(response => {
          this.$message.success(response.errmsg)
          this.$router.push({path: '/set/power/groupPower', query:{state:1}})
          this.stateShow =1
          this.init()
        }).catch(error => {
          console.error('noPass-error:', error)
        })
      }
      
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirmBtn()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    /**
     * 添加管理组
     */
    addManageGroup(){
      this.stateShow=2
      this.$router.push({path: this.$router.path, query:{state:2}})
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
     *  获取权限
     */
    fetchTree(){
      console.log('fetchTree:', this)
      // this.formData {role_id:(this.selectSingleItem.id||null)}
      if (this.groupData.id) {
        toUpdateRole({role_id:this.groupData.id}).then(response => {
          let _data = response.data
          this.powerData = _data.rights
          this.groupData.role_name = _data.role.roleName
          this.groupData.description = _data.role.description
          this.loopFun(this.powerData)
          console.log('this.rightArr', this.rightArr)
        }).catch(error => {
          console.error('fetchList-error:', error)
        })
      }else{
        toInsertRole({}).then(response => {
          let _data = response.data
          this.powerData = _data
        }).catch(error => {
          console.error('fetchList-error:', error)
        })
      }
    },
    loopFun(dataArr){
      dataArr.forEach(ele => {
        if (ele.isChecked=='checked') {
          this.rightArr.push(ele.id)
        }
        if (ele.children&&ele.children.length>0) {
          this.loopFun(ele.children)
        }
      });
    },
    /** 
     *  获取列表数据
     */
    fetchList(){
      // this.formData
      queryRoleList(this.formData).then(response => {
        let _data = response.data
        console.log('getLoginCode:', _data)
        this.dataList = _data
        // this.totalCount = _data.AdminList.total
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
    open (par, batch) {
      batch && (this.batchOper = batch) 
      if (batch && this.selectBatchItem.length<1){
        this.$message.warning('请先选择操作项');
        return
      }
      if (par){
        if (par=='checkGroup') {
          //查看管理组
          this.stateShow=2
          this.$router.push({path: this.$router.path, query:{state:2,id:this.selectSingleItem.id}})
          return
        }
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
  .sure-btn{
    // position: absolute;
    // bottom: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    border-top: 1px solid #eee;
  }
</style>
