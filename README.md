# ShellBox

贝壳小盒子 微信小程序

[![Star](https://img.shields.io/badge/Star-Airmole-brightgreen.svg)](https://github.com/Airmole/ShellBox/stargazers)
[![Download](https://img.shields.io/badge/download-.zip-brightgreen.svg)](https://github.com/Airmole/ShellBox/archive/master.zip)
[![size](https://img.shields.io/badge/size-7.21MB-green.svg)](https://github.com/airmole/ShellBox)
[![last commit](https://img.shields.io/badge/last%20commit-2019--01--13-green.svg)](https://github.com/Airmole/ShellBox/commits/master)
[![https://blog.airmole.cn](https://img.shields.io/badge/Blog-Airmole-green.svg)](https://blog.airmole.cn)


> 本项目2.0版本已经基本完成，近期正在埋头努力补文档中.....

## 线上版本体验

[![miniprogram.th.jpg](http://www.z4a.net/images/2018/05/04/miniprogram.th.jpg)](小程序体验码)


## 截图
[![-1.jpg](https://z4a.net/images/2019/03/16/-1.jpg)](https://z4a.net/image/7NtGdH)

## 页面路径说明

```
"pages": [
    "pages/bookSearch/index",//通知消息提示首页
    "pages/index/index",//学号绑定登录
    "pages/index/reset",//用户重置密码
    "pages/bookSearch/isbn/iputIsbn",//扫码查书
    "pages/bookSearch/bookInfo/bookDetail",//搜索图书的图书详情
    "pages/bookSearch/bookInfo/bookInfo",//扫码查书的图书详情
    "pages/bookSearch/bookInfo/bookList",//图书搜索结果列表
    "pages/features/features",//“更多”界面
    "pages/features/about",//关于
    "pages/welcome/welcome",//欢迎界面
    "pages/classQuery/index",//个人课表
    "pages/classQuery/class",//班级课表
    "pages/score/score",//成绩查询
    "pages/calendar/calendar",//校历
    "pages/error/queryerror",//查询失败或错误的异常页面
    "pages/net/netfare",//网费查询（预留。未实现）
    "pages/net/netBind",//网费绑定（预留。未实现）
    "pages/electricity/electricityFare",//电费查询
    "pages/electricity/electricityBind",//电费绑定
    "pages/Transport/Transport",//校园出行
    "pages/tel/tel",//常用电话
    "pages/stuInfo/stuInfo",//学生信息（已废弃）
    "pages/schoolNav/schoolNav"//校园导航
  ],
```

## 参考借鉴

- 通知中心、登录、关于、课表、电费查询界面借鉴使用[We重邮](https://github.com/mcc108/wecqupt)

-  校园出行公交路线、公告通知跑马灯使用[Wux Weapp](https://github.com/wux-weapp/wux-weapp)

- 校园导航路线规划使用[高德导航API](https://lbs.amap.com/)

- 图书信息来自于[豆瓣API](https://github.com/zce/douban-api-proxy)

- 电费查询、成绩查询界面统计图表[wx-charts](https://github.com/xiaolin3303/wx-charts)

- [小程序WeUI](https://github.com/Tencent/weui-wxss)
