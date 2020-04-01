# ShellBox

贝壳小盒子 微信小程序

[![Star](https://img.shields.io/badge/Star-Airmole-brightgreen.svg)](https://github.com/Airmole/ShellBox/stargazers)
[![Download](https://img.shields.io/badge/download-.zip-brightgreen.svg)](https://github.com/Airmole/ShellBox/archive/master.zip)
[![last commit](https://img.shields.io/badge/last%20commit-2020--04--01-green.svg)](https://github.com/Airmole/ShellBox/commits/master)



## 线上版本体验

[![miniprogram.th.jpg](http://www.z4a.net/images/2018/05/04/miniprogram.th.jpg)](小程序体验码)

```
测试体验账号

学号：000000000

密码：test
```


## 截图
[![-1.jpg](https://z4a.net/images/2019/03/16/-1.jpg)](https://z4a.net/image/7NtGdH)

## 页面路径说明

```
"pages": [
    "pages/bookSearch/index",//通知消息提示首页
    "pages/index/index",//学号绑定登录
    "pages/index/vcode",//成绩查询输入验证码
    "pages/bookSearch/isbn/iputIsbn",//扫码查书
    "pages/bookSearch/bookInfo/bookDetail",//搜索图书的图书详情
    "pages/bookSearch/bookInfo/bookInfo",//扫码查书的图书详情
    "pages/bookSearch/bookInfo/bookList",//图书搜索结果列表
    "pages/features/features",//“更多”界面
    "pages/features/about",//关于
    "pages/welcome/welcome",//欢迎界面
    "pages/classQuery/index",//个人课表
    "pages/classQuery/class",//班级课表
    "pages/classQuery/jskb",//教师课表查询界面
    "pages/classQuery/showJskb",//教师课表展示界面
    "pages/score/score",//成绩查询
    "pages/calendar/calendar",//校历
    "pages/error/queryerror",//查询失败或错误的异常页面
    "pages/net/netfare",//网费查询
    "pages/net/netBind",//网费绑定
    "pages/electricity/electricityFare",//电费查询
    "pages/electricity/electricityBind",//电费绑定
    "pages/Transport/Transport",//校园出行
    "pages/tel/tel",//常用电话
    "pages/schoolNav/schoolNav",//校园导航
    "pages/opac/index",//在线图书馆图书借阅列表
    "pages/opac/bind",//在线图书馆账号绑定
    "pages/cet/find"//四六级准考证号找回
  ],
```

## 参考借鉴

- 通知中心、登录、关于、课表、电费查询界面借鉴使用[We重邮](https://github.com/mcc108/wecqupt)

- 校园出行公交路线、公告通知跑马灯使用[Wux Weapp](https://github.com/wux-weapp/wux-weapp)

- 校园导航路线规划使用[高德导航API](https://lbs.amap.com/)

- 图书信息来自于[豆瓣API](https://github.com/zce/douban-api-proxy)

- 电费查询、成绩查询界面统计图表[wx-charts](https://github.com/xiaolin3303/wx-charts)

- [小程序WeUI](https://github.com/Tencent/weui-wxss)

## 参赛获奖

- 2019 高校微信小程序开发大赛 华北赛区二等奖 （2019年7月25日）

## 其他版本

- [贝壳小盒子QQ小程序版](https://github.com/Airmole/ShellBox_QApp)
