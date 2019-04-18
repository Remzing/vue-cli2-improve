
const app = {
  state: {
    sidebar: {
      levTitle: '菜单栏',
      twoLev: '', // 二级菜单
      thrLev: '', // 三级菜单
      layoutH: 220, // layout th 所占高度--为了计算table的高度
      nowWinH: document.documentElement.clientHeight, // 当前视图高度
      pageSizeArr: [10, 20, 50, 100]
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: (state, param) => {
      state.sidebar.twoLev = param
    },
    TOGGLE_LEVTITLE: (state, param) => {
      state.sidebar.levTitle = param
    },
    TOGGLE_NAVBAR: (state, param) => {
      state.sidebar.thrLev = param
    }
  },
  actions: {
    ToggleSideBar: ({ commit }, acpar) => {
      commit('TOGGLE_SIDEBAR', acpar)
    },
    ToggleLevTitle: ({ commit }, acpar) => {
      commit('TOGGLE_LEVTITLE', acpar)
    },
    ToggleNavBar: ({ commit }, acpar) => {
      commit('TOGGLE_NAVBAR', acpar)
    }
  }
}

export default app
