#coindy2开发文档

主要记录每个功能模块组件上复杂的功能

所有文件名和文件夹名皆为有道硬翻译，如果有问题的可修改，！注意修改后需对应修改各处
## mobile.vue文件和pc.vue文件
为了区分pc端和h5的页面， 特意把app.vue文件单独剥离成纯入口文件， 纯粹无导航和底部文件或者h5移动端页面可以在mobile下作为子组件编写，
！！注意 是作为mobile的子路由组件 如果不挂到mobile.vue的子路由组件下则会默认跑到pc.vue文件下。则会填充nav和footer
如果是官网传统衍生页面则在pc.vue文件下
##main.js 入口文件
1、

## store文件夹 vuex数据库
因为前期没规划好。 所以里面有一些多余文件和多余字段，因为webpack不会打包无引用文件 所以就没去删除
如果感觉乱则清除。

## router 
使用了传统的懒加载
2个大路由页  pc.vue和mobile.vue  这个在上面也介绍了。 

## mobile
  component放置单独mobile引用的组件
  
  downpage 放置判断设备跳转不同页面

  downpage里面的down和mobile直接目录下的down.vue文件是不同的。 别弄错

  h5details是app使用的新闻详情页面和pc的新闻公告详情是不同的

  lottery，抽奖页面 抽奖组件是基于腾讯互娱的圆盘抽奖组件修改成的vue组件，

## containers 页面组件文件夹 简短注释都写在组件中。只有复杂的注释回在文档中重点说明

所有页面类型组件都放置在这个文件夹里面

### find 找回密码
### login 登陆功能
### portal 官网展示文件夹
#### about 关于我们
#### announcement 公告
#### candy 领取糖果、介绍申请页
#### download 下载页
#### home 官网首页
#### privacy 隐私协议
#### project 项目详情
#### sto sto列表、介绍、申请页
