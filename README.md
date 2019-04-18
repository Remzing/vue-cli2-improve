# client-sample

> saas-client

## Build Setup

``` bash
# node版本请更新到7以上
# 安装依赖环境
npm install

# 运行项目命令 ，端口：localhost:8081
npm run dev  
#或
npm start


#目录结构-改动时进行修改

├──build
├──config
├──src:主目录
│   ├──api:数据对接【按文档目标分配】
│   ├──assets：共用css、images
│   ├──components：组件【按文档目标分配】
│   ├──config
│   |   ├──index.js：对置开发环境
│   ├──dialog：element弹框【按文档目标分配】
│   ├──router：路由
│   ├──store
│   |   ├──modules:vuex-状态树
│   |   ├──getters.js:vuex-getters
│   |   ├──index.js:挂载store
│   ├──styles:公共scss
│   ├──utils
│   |   ├──index.js：公共引用方法
│   |   ├──request.js：公共接口
│   ├──views：页面主干【按文档目标分配】
├──README.md：你懂得



#参考文档和工作原理 
[guide](http://vuejs-templates.github.io/webpack/)

[vue-loader](http://vuejs.github.io/vue-loader)
