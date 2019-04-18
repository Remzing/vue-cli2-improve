import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* const _import = require('./_import_' + process.env.NODE_ENV)
const Foo = _import('Foo') */
// 一种按需加载的写法
// const login = r => require.ensure([], () => r(require('@/views/login')), 'login')

// vue-Router 最新的一种按需加载的写法
// const login = () => import('@/views/login.vue')
const login = () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue')

const layout = () => import(/* webpackChunkName: "contrDesk" */ '@/views/Layout.vue')
const contrDesk = () => import(/* webpackChunkName: "contrDesk" */ '@/views/contrdesk/contrDesk.vue')
// 客户
const waitAudit = () => import(/* webpackChunkName: "waitAudit" */ '@/views/customer/certiaudit/waitAudit.vue')
const auditPass = () => import(/* webpackChunkName: "auditPass" */ '@/views/customer/certiaudit/auditPass.vue')
const auditNoPass = () => import(/* webpackChunkName: "auditNoPass" */ '@/views/customer/certiaudit/auditNoPass.vue')
const allCustomer = () => import(/* webpackChunkName: "allCustomer" */ '@/views/customer/commoncust/allCustomer.vue')
// 数据
const cusAnalysis = () => import(/* webpackChunkName: "cusAnalysis" */ '@/views/database/cusAna/cusAnalysis.vue')
const proAnalysis = () => import(/* webpackChunkName: "proAnalysis" */ '@/views/database/proAna/proAnalysis.vue')
const monAnalysis = () => import(/* webpackChunkName: "monAnalysis" */ '@/views/database/monAna/monAnalysis.vue')
const countAnalysis = () => import(/* webpackChunkName: "countAnalysis" */ '@/views/database/countAna/countAnalysis.vue')
// 订单
const allXcxOrder = () => import(/* webpackChunkName: "allXcxOrder" */ '@/views/order/xcxorder/allXcxOrder.vue')
const allCustomOrder = () => import(/* webpackChunkName: "allCustomOrder" */ '@/views/order/customorder/allCustomOrder.vue')
// 财务
const monDetail = () => import(/* webpackChunkName: "monDetail" */ '@/views/money/monDetail/monDetail.vue')
const monTransfer = () => import(/* webpackChunkName: "monTransfer" */ '@/views/money/monTransfer/monTransfer.vue')
const monBankcard = () => import(/* webpackChunkName: "monBankcard" */ '@/views/money/monBankcard/monBankcard.vue')
const allBill = () => import(/* webpackChunkName: "allBill" */ '@/views/money/monBill/allBill.vue')
const detailBill = () => import(/* webpackChunkName: "detailBill" */ '@/views/money/monBill/detailBill.vue')
const allCash = () => import(/* webpackChunkName: "allCash" */ '@/views/money/monCash/allCash.vue')
const detailCash = () => import(/* webpackChunkName: "detailCash" */ '@/views/money/monCash/detailCash.vue')
// 设置
const allMsg = () => import(/* webpackChunkName: "allMsg" */ '@/views/set/message/allMsg.vue')
const payPort = () => import(/* webpackChunkName: "payPort" */ '@/views/set/payPort/payPort.vue')
const prodIndustry = () => import(/* webpackChunkName: "prodIndustry" */ '@/views/set/prodIndustry/prodIndustry.vue')
const temStyle = () => import(/* webpackChunkName: "temStyle" */ '@/views/set/temStyle/temStyle.vue')
const custType = () => import(/* webpackChunkName: "custType" */ '@/views/set/custType/custType.vue')
const publicity = () => import(/* webpackChunkName: "publicity" */ '@/views/set/publicity/publicity.vue')
const allPower = () => import(/* webpackChunkName: "allPower" */ '@/views/set/power/allPower.vue')
const groupPower = () => import(/* webpackChunkName: "groupPower" */ '@/views/set/power/groupPower.vue')
const advert = () => import(/* webpackChunkName: "advert" */ '@/views/set/advert/advert.vue')
// 产品
const pub = () => import(/* webpackChunkName: "pub" */ '@/views/product/publish/pub.vue')
const lib = () => import(/* webpackChunkName: "lib" */ '@/views/product/bank/lib.vue')
const editProduct = () => import(/* webpackChunkName: "editProduct" */ '@/views/product/bank/editProduct.vue')
const allTemplate = () => import(/* webpackChunkName: "allTemplate" */ '@/views/product/template/allTemplate.vue')
const editPubTem = () => import(/* webpackChunkName: "editPubTem" */ '@/views/product/template/editPubTem.vue')
const xcxTemplate = () => import(/* webpackChunkName: "xcxTemplate" */ '@/views/product/template/xcxTemplate.vue')
// 运营
const allNeeds = () => import(/* webpackChunkName: "allNeeds" */ '@/views/operation/customneeds/allNeeds.vue')
const serviceAgreement = () => import(/* webpackChunkName: "serviceAgreement" */ '@/views/operation/contmanage/serviceAgreement.vue')
const lawPolicy = () => import(/* webpackChunkName: "lawPolicy" */ '@/views/operation/contmanage/lawPolicy.vue')

export default new Router({
  /* 去掉url中的#号  但是放到服务器静态时，后端需要配置，地址：https://router.vuejs.org/zh-cn/essentials/history-mode.html */
  mode: 'history',
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '/contrDesk',
          component: contrDesk,
          meta: []
        },
        { // 客户-认证审核-等待审核
          path: '/customer/certiaudit/waitAudit',
          name: 'waitAudit',
          component: waitAudit
        },
        { // 客户-认证审核-审核通过
          path: '/customer/certiaudit/auditPass',
          name: 'auditPass',
          component: auditPass
        },
        { // 客户-认证审核-审核不通过
          path: '/customer/certiaudit/auditNoPass',
          name: 'auditNoPass',
          component: auditNoPass
        },
        { // 客户-普通客户-全部客户
          path: '/customer/conmoncust/allCustomer',
          name: 'allCustomer',
          component: allCustomer
        },
        { // 数据模块-客户分析
          path: '/database/cusAna/cusAnalysis',
          name: 'cusAnalysis',
          component: cusAnalysis
        },
        { // 数据模块-产品分析
          path: '/database/proAna/proAnalysis',
          name: 'proAnalysis',
          component: proAnalysis
        },
        { // 数据模块-财务分析
          path: '/database/monAna/monAnalysis',
          name: 'monAnalysis',
          component: monAnalysis
        },
        { // 数据模块-数据分析
          path: '/database/countAna/countAnalysis',
          name: 'countAnalysis',
          component: countAnalysis
        },
        { // 订单模块-小程序订单
          path: '/order/xcxorder/allXcxOrder',
          name: 'allXcxOrder',
          component: allXcxOrder
        },
        { // 订单模块-定制订单
          path: '/order/customorder/allCustomOrder',
          name: 'allCustomOrder',
          component: allCustomOrder
        },
        { // 财务模块-收支明细
          path: '/money/monDetail/monDetail',
          name: 'monDetail',
          component: monDetail
        },
        { // 财务模块-对公转账
          path: '/money/monTransfer/monTransfer',
          name: 'monTransfer',
          component: monTransfer
        },
        { // 财务模块-银行卡管理
          path: '/money/monBankcard/monBankcard',
          name: 'monBankcard',
          component: monBankcard
        },
        { // 财务模块-发票管理 -全部申请
          path: '/money/monBill/allBill',
          name: 'allBill',
          component: allBill
        },
        { // 财务模块-发票管理 -发票信息
          path: '/money/monBill/detailBill',
          name: 'detailBill',
          component: detailBill
        },
        { // 财务模块-提现管理 -提现申请
          path: '/money/monCash/allCash',
          name: 'allCash',
          component: allCash
        },
        { // 财务模块-提现管理 -申请结果
          path: '/money/monCash/detailCash',
          name: 'detailCash',
          component: detailCash
        },
        { // 设置-消息提醒-全部消息
          path: '/set/message/allMsg',
          name: 'allMsg',
          component: allMsg
        },
        { // 设置-支付接口-支付接口
          path: '/set/payPort/payPort',
          name: 'payPort',
          component: payPort
        },
        { // 设置-产品行业
          path: '/set/prodIndustry/prodIndustry',
          name: 'prodIndustry',
          component: prodIndustry
        },
        { // 设置-模板风格
          path: '/set/temStyle/temStyle',
          name: 'temStyle',
          component: temStyle
        },
        { // 设置-定制类型
          path: '/set/custType/custType',
          name: 'custType',
          component: custType
        },
        { // 设置-对公信息-对公信息
          path: '/set/publicity/publicity',
          name: 'publicity',
          component: publicity
        },
        { // 设置-权限管理-全部管理员
          path: '/set/power/allPower',
          name: 'allPower',
          component: allPower
        },
        { // 设置-权限管理-管理组
          path: '/set/power/groupPower',
          name: 'groupPower',
          component: groupPower
        },
        { // 设置-广告管理
          path: '/set/advert/advert',
          name: 'advert',
          component: advert
        },
        { // 产品-产品发布
          path: '/product/publish/pub',
          name: 'pub',
          component: pub
        },
        { // 产品-产品库
          path: '/product/bank/lib',
          name: 'lib',
          component: lib
        },
        { // 产品-产品库
          path: '/product/bank/editProduct',
          name: 'editProduct',
          component: editProduct
        },
        { // 产品-模板库-所有模板
          path: '/product/template/allTemplate',
          name: 'allTemplate',
          component: allTemplate
        },
        { // 产品-模板库-小程序模板
          path: '/product/template/xcxTemplate',
          name: 'xcxTemplate',
          component: xcxTemplate
        },
        { // 产品-模板库-发布模板
          path: '/product/template/editPubTem',
          name: 'editPubTem',
          component: editPubTem
        },
        { // 运营-定制需求-全部需求
          path: '/operation/customneeds/allNeeds',
          name: 'allNeeds',
          component: allNeeds
        },
        { // 运营-内容管理-服务协议
          path: '/operation/contmanage/serviceAgreement',
          name: 'serviceAgreement',
          component: serviceAgreement
        },
        { // 运营-内容管理-法律声明和隐私政策
          path: '/operation/contmanage/lawPolicy',
          name: 'lawPolicy',
          component: lawPolicy
        }
      ]
    }
  ]
})
