// pages/traffic/navi.js
var amapFile = require('../../utils/amap-wx.js');
var app = getApp();
var sliderWidth = 96;
var markersData = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mapHeight: "800",
    placeName: "",
    hideOrNot: 0,
    activePlaceID: -1,
    schoolAddressText: '天津市宝坻区京津新城珠江北环东路1号',
    postcode: '301830',
    staticMapImage: 'https://upload-images.jianshu.io/upload_images/4697920-8ab5e49dabd814ec.png',
    markers: [{
      id: 0,
      latitude: 39.544736,
      longitude: 117.388999,
      iconPath: "/images/nav/others.png",
      width: 30,
      height: 32,
      callout: {
        content: '公交站',
        display: 'ALWAYS'
      }
    }, {
      id: 1,
      latitude: 39.544972,
      longitude: 117.390287,
      iconPath: "/images/nav/sports.png",
      width: 30,
      height: 32,
      callout: {
        content: '体育馆',
        display: 'ALWAYS'
      }
    }, {
      id: 2,
      latitude: 39.545448,
      longitude: 117.390174,
      iconPath: "/images/nav/sports.png",
      width: 30,
      height: 32,
      callout: {
        content: '游泳馆',
        display: 'ALWAYS'
      }
    }, {
      id: 3,
      latitude: 39.544724,
      longitude: 117.394562,
      iconPath: "/images/nav/sports.png",
      width: 30,
      height: 32,
      callout: {
        content: '轮滑场',
        display: 'ALWAYS'
      }
    }, {
      id: 4,
      latitude: 39.546416,
      longitude: 117.389932,
      iconPath: "/images/nav/xingzheng.png",
      width: 30,
      height: 32,
      callout: {
        content: '社科图书馆',
        display: 'ALWAYS'
      }
    }, {
      id: 5,
      latitude: 39.544145,
      longitude: 117.394616,
      iconPath: "/images/nav/xingzheng.png",
      width: 30,
      height: 32,
      callout: {
        content: '理工图书馆',
        display: 'ALWAYS'
      }
    }, {
      id: 6,
      latitude: 39.544223,
      longitude: 117.390807,
      iconPath: "/images/nav/sports.png",
      width: 30,
      height: 32,
      callout: {
        content: '西操场',
        display: 'ALWAYS'
      }
    }, {
      id: 7,
      latitude: 39.54479,
      longitude: 117.39784,
      iconPath: "/images/nav/sports.png",
      width: 30,
      height: 32,
      callout: {
        content: '东操场',
        display: 'ALWAYS'
      }
    }, {
      id: 8,
      latitude: 39.542978,
      longitude: 117.392786,
      iconPath: "/images/nav/xiaomen.png",
      width: 30,
      height: 32,
      callout: {
        content: '南门',
        display: 'ALWAYS'
      }
    }, {
      id: 9,
      latitude: 39.544352,
      longitude: 117.389321,
      iconPath: "/images/nav/xiaomen.png",
      width: 30,
      height: 32,
      callout: {
        content: '西门',
        display: 'ALWAYS'
      }
    }, {
      id: 10,
      latitude: 39.543669,
      longitude: 117.396295,
      iconPath: "/images/nav/xiaomen.png",
      width: 30,
      height: 32,
      callout: {
        content: '小南门',
        display: 'ALWAYS'
      }
    }, {
      id: 11,
      latitude: 39.546894,
      longitude: 117.399626,
      iconPath: "/images/nav/xingzheng.png",
      width: 30,
      height: 32,
      callout: {
        content: '办公楼',
        display: 'ALWAYS'
      }
    }, {
      id: 12,
      latitude: 39.543454,
      longitude: 117.391992,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 30,
      height: 32,
      callout: {
        content: '1号教学楼',
        display: 'ALWAYS'
      }
    }, {
      id: 13,
      latitude: 39.54383,
      longitude: 117.392127,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 30,
      height: 32,
      callout: {
        content: '2号教学楼',
        display: 'ALWAYS'
      }
    }, {
      id: 14,
      latitude: 39.544534,
      longitude: 117.391815,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 30,
      height: 32,
      callout: {
        content: '3号教学楼',
        display: 'ALWAYS'
      }
    }, {
      id: 15,
      latitude: 39.543648,
      longitude: 117.393355,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 30,
      height: 32,
      callout: {
        content: '4号教学楼',
        display: 'ALWAYS'
      }
    }, {
      id: 16,
      latitude: 39.543963,
      longitude: 117.393258,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 30,
      height: 32,
      callout: {
        content: '5号教学楼',
        display: 'ALWAYS'
      }
    }, {
      id: 17,
      latitude: 39.54431,
      longitude: 117.393205,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 30,
      height: 32,
      callout: {
        content: '6号教学楼',
        display: 'ALWAYS'
      }
    }, {
      id: 18,
      latitude: 39.544621,
      longitude: 117.392738,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 30,
      height: 32,
      callout: {
        content: '7号教学楼',
        display: 'ALWAYS'
      }
    }, {
      id: 19,
      latitude: 39.544521,
      longitude: 117.398955,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 30,
      height: 32,
      callout: {
        content: '8号教学楼',
        display: 'ALWAYS'
      }
    }, {
      id: 20,
      latitude: 39.545386,
      longitude: 117.39873,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 30,
      height: 32,
      callout: {
        content: '9号教学楼',
        display: 'ALWAYS'
      }
    }, {
      id: 21,
      latitude: 39.546474,
      longitude: 117.397925,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 30,
      height: 32,
      callout: {
        content: '10号教学楼',
        display: 'ALWAYS'
      }
    }, {
      id: 22,
      latitude: 39.547268,
      longitude: 117.397824,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 30,
      height: 32,
      callout: {
        content: '11号教学楼',
        display: 'ALWAYS'
      }
    }, {
      id: 23,
      latitude: 39.547049,
      longitude: 117.399508,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 30,
      height: 32,
      callout: {
        content: '12号教学楼',
        display: 'ALWAYS'
      }
    }, {
      id: 24,
      latitude: 39.545861,
      longitude: 117.401251,
      iconPath: "/images/nav/others.png",
      width: 30,
      height: 32,
      callout: {
        content: '小人工湖',
        display: 'ALWAYS'
      }
    }, {
      id: 25,
      latitude: 39.54443,
      longitude: 117.401455,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '教师公寓一栋',
        display: 'ALWAYS'
      }
    }, {
      id: 26,
      latitude: 39.54455,
      longitude: 117.402517,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '教师公寓二栋',
        display: 'ALWAYS'
      }
    }, {
      id: 27,
      latitude: 39.544951,
      longitude: 117.402437,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '教师公寓三栋',
        display: 'ALWAYS'
      }
    }, {
      id: 28,
      latitude: 39.545464,
      longitude: 117.394192,
      iconPath: "/images/nav/shitang.png",
      width: 30,
      height: 32,
      callout: {
        content: '一食堂',
        display: 'ALWAYS'
      }
    }, {
      id: 29,
      latitude: 39.5452,
      longitude: 117.395957,
      iconPath: "/images/nav/shitang.png",
      width: 30,
      height: 32,
      callout: {
        content: '二食堂',
        display: 'ALWAYS'
      }
    }, {
      id: 30,
      latitude: 39.545609,
      longitude: 117.395876,
      iconPath: "/images/nav/shitang.png",
      width: 30,
      height: 32,
      callout: {
        content: '三食堂',
        display: 'ALWAYS'
      }
    }, {
      id: 31,
      latitude: 39.546238,
      longitude: 117.396488,
      iconPath: "/images/nav/others.png",
      width: 30,
      height: 32,
      callout: {
        content: '众创空间',
        display: 'ALWAYS'
      }
    }, {
      id: 32,
      latitude: 39.546635,
      longitude: 117.396429,
      iconPath: "/images/nav/others.png",
      width: 30,
      height: 32,
      callout: {
        content: '学生活动中心',
        display: 'ALWAYS'
      }
    }, {
      id: 33,
      latitude: 39.545928,
      longitude: 117.391526,
      iconPath: "/images/nav/sports.png",
      width: 30,
      height: 32,
      callout: {
        content: '体育活动中心',
        display: 'ALWAYS'
      }
    }, {
      id: 34,
      latitude: 39.545866,
      longitude: 117.390544,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '1斋',
        display: 'ALWAYS'
      }
    }, {
      id: 35,
      latitude: 39.546205,
      longitude: 117.390523,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '2斋',
        display: 'ALWAYS'
      }
    }, {
      id: 36,
      latitude: 39.546656,
      longitude: 117.390796,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '3斋',
        display: 'ALWAYS'
      }
    }, {
      id: 37,
      latitude: 39.547016,
      longitude: 117.390716,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '4斋',
        display: 'ALWAYS'
      }
    }, {
      id: 38,
      latitude: 39.545998,
      longitude: 117.39174,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '5斋',
        display: 'ALWAYS'
      }
    }, {
      id: 39,
      latitude: 39.546337,
      longitude: 117.391547,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '6斋',
        display: 'ALWAYS'
      }
    }, {
      id: 40,
      latitude: 39.546701,
      longitude: 117.391188,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '7斋',
        display: 'ALWAYS'
      }
    }, {
      id: 41,
      latitude: 39.547045,
      longitude: 117.391097,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '8斋',
        display: 'ALWAYS'
      }
    }, {
      id: 42,
      latitude: 39.545394,
      longitude: 117.392733,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '9斋',
        display: 'ALWAYS'
      }
    }, {
      id: 43,
      latitude: 39.54575,
      longitude: 117.392647,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '10斋',
        display: 'ALWAYS'
      }
    }, {
      id: 44,
      latitude: 39.546106,
      longitude: 117.392577,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '11斋',
        display: 'ALWAYS'
      }
    }, {
      id: 45,
      latitude: 39.546457,
      longitude: 117.392513,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '12斋',
        display: 'ALWAYS'
      }
    }, {
      id: 46,
      latitude: 39.546792,
      longitude: 117.392416,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '13斋',
        display: 'ALWAYS'
      }
    }, {
      id: 47,
      latitude: 39.545481,
      longitude: 117.393457,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '14斋',
        display: 'ALWAYS'
      }
    }, {
      id: 48,
      latitude: 39.545845,
      longitude: 117.393366,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '15斋',
        display: 'ALWAYS'
      }
    }, {
      id: 49,
      latitude: 39.546246,
      longitude: 117.393301,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '16斋',
        display: 'ALWAYS'
      }
    }, {
      id: 50,
      latitude: 39.546552,
      longitude: 117.393216,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '17斋',
        display: 'ALWAYS'
      }
    }, {
      id: 51,
      latitude: 39.546904,
      longitude: 117.393151,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '18斋',
        display: 'ALWAYS'
      }
    }, {
      id: 52,
      latitude: 39.546279,
      longitude: 117.394036,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '19斋',
        display: 'ALWAYS'
      }
    }, {
      id: 53,
      latitude: 39.546652,
      longitude: 117.39395,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '20斋',
        display: 'ALWAYS'
      }
    }, {
      id: 54,
      latitude: 39.546983,
      longitude: 117.393865,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '21斋',
        display: 'ALWAYS'
      }
    }, {
      id: 55,
      latitude: 39.543835,
      longitude: 117.39556,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '22斋',
        display: 'ALWAYS'
      }
    }, {
      id: 56,
      latitude: 39.544186,
      longitude: 117.395501,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '23斋',
        display: 'ALWAYS'
      }
    }, {
      id: 57,
      latitude: 39.544649,
      longitude: 117.395533,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '24斋',
        display: 'ALWAYS'
      }
    }, {
      id: 58,
      latitude: 39.54503,
      longitude: 117.395458,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '25斋',
        display: 'ALWAYS'
      }
    }, {
      id: 59,
      latitude: 39.545415,
      longitude: 117.395377,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '26斋',
        display: 'ALWAYS'
      }
    }, {
      id: 60,
      latitude: 39.545762,
      longitude: 117.395115,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '27斋',
        display: 'ALWAYS'
      }
    }, {
      id: 61,
      latitude: 39.546366,
      longitude: 117.395066,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '28斋',
        display: 'ALWAYS'
      }
    }, {
      id: 62,
      latitude: 39.546809,
      longitude: 117.395098,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '29斋',
        display: 'ALWAYS'
      }
    }, {
      id: 63,
      latitude: 39.547156,
      longitude: 117.394991,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '30斋',
        display: 'ALWAYS'
      }
    }, {
      id: 64,
      latitude: 39.543992,
      longitude: 117.396273,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '31斋',
        display: 'ALWAYS'
      }
    }, {
      id: 65,
      latitude: 39.544294,
      longitude: 117.396161,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '32斋',
        display: 'ALWAYS'
      }
    }, {
      id: 66,
      latitude: 39.54472,
      longitude: 117.396043,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '33斋',
        display: 'ALWAYS'
      }
    }, {
      id: 67,
      latitude: 39.546465,
      longitude: 117.395731,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '34斋',
        display: 'ALWAYS'
      }
    }, {
      id: 68,
      latitude: 39.546846,
      longitude: 117.395683,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '35斋',
        display: 'ALWAYS'
      }
    }, {
      id: 69,
      latitude: 39.547235,
      longitude: 117.395538,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '36斋',
        display: 'ALWAYS'
      }
    }, {
      id: 70,
      latitude: 39.547342,
      longitude: 117.396289,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '37斋',
        display: 'ALWAYS'
      }
    }, {
      id: 71,
      latitude: 39.547354,
      longitude: 117.397008,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '38斋',
        display: 'ALWAYS'
      }
    }, {
      id: 72,
      latitude: 39.547254,
      longitude: 117.399165,
      iconPath: "/images/nav/jiaoxuelou.png",
      width: 30,
      height: 32,
      callout: {
        content: '弘艺音乐厅',
        display: 'ALWAYS'
      }
    }, {
      id: 73,
      latitude: 39.547734,
      longitude: 117.396874,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '39斋',
        display: 'ALWAYS'
      }
    }, {
      id: 74,
      latitude: 39.547614,
      longitude: 117.396166,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '40斋',
        display: 'ALWAYS'
      }
    }, {
      id: 75,
      latitude: 39.547531,
      longitude: 117.395469,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '41斋',
        display: 'ALWAYS'
      }
    }, {
      id: 76,
      latitude: 39.547412,
      longitude: 117.394782,
      iconPath: "/images/nav/sushe.png",
      width: 30,
      height: 32,
      callout: {
        content: '42斋',
        display: 'ALWAYS'
      }
    }, {
      id: 77,
      latitude: 39.545699,
      longitude: 117.400388,
      iconPath: "/images/nav/others.png",
      width: 30,
      height: 32,
      callout: {
        content: '鹿鸣园',
        display: 'ALWAYS'
      }
    }],
    distance: '',
    cost: '',
    polyline: [],
    userLongitude: 117.396018,
    userLatitude: 39.545546,
    inSchool: false,
    isLoading: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    var _this = this
    _this.inital();
    if (e.markerId !== '' && Object.keys(e).length !== 0) {
      const para = { detail: e };
      _this.makertap(para);
    }
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function (res) {
        _this.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude
        })
      }
    })

  },
  inital: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onReady: function () {
    var that = this;
    setTimeout(function () { that.setData({ isLoading: false }); }, 800);
  },
  makertap: function (e) {
    // console.log(e)
    var id = e.detail.markerId;
    var that = this;
    var markers = that.data.markers;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function (res) {
        that.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude
        });
        that.setData({
          activePlaceID: id,
          placeName: markers[id].callout.content
        })
        var userLocation = that.data.userLongitude + ',' + that.data.userLatitude;
        var destination = that.data.markers[id].longitude + ',' + that.data.markers[id].latitude;
        that.planPolyline(userLocation, destination);
      }
    })

  },
  planPolyline: function (origin, destination) {
    var that = this;
    var id = that.data.activePlaceID;
    //规划步行路线
    var myAmapFun = new amapFile.AMapWX({ key: app.globalData._amap_key });
    myAmapFun.getWalkingRoute({
      origin: origin,
      destination: destination,
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          json: data.paths[0],
          polyline: [{
            points: points,
            color: "#3383F7",
            width: 6
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.paths[0] && data.paths[0].duration) {
          that.setData({
            cost: parseInt(data.paths[0].duration / 60) + '分钟'
          });
        }
        var markers = that.data.markers;
        var points = that.data.polyline[0].points;
        // 一共78个坐标点
        markers[79] = {
          id: 71,
          latitude: points[0].latitude,
          longitude: points[0].longitude,
          iconPath: '../../images/nav/mapicon_navi_s.png',
          width: 23,
          height: 33
        };
        markers[80] = {
          id: 72,
          latitude: points[points.length - 1].latitude,
          longitude: points[points.length - 1].longitude,
          iconPath: '../../images/nav/mapicon_navi_e.png',
          width: 24,
          height: 34
        }

        that.setData({ markers: markers });
      },
    })
  },
  myLocation: function () {
    var _this = this
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function (res) {
        _this.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude
        })
      }
    })
  },
  moveToSchool: function () {
    //视图返回学校
    var _this = this;
    _this.setData({ userLongitude: 117.396018, userLatitude: 39.545546 });
  },
  showStaticMapImage: function () {
    var _this = this;
    wx.previewImage({
      current: _this.data.staticMapImage,
      urls: [_this.data.staticMapImage]
    })
  },
  goDetail: function () {
    var that = this;
    const latitude = that.data.markers[that.data.activePlaceID].latitude;
    const longitude = that.data.markers[that.data.activePlaceID].longitude;
    const name = that.data.markers[that.data.activePlaceID].callout.content;
    wx.openLocation({ latitude, longitude, name, address: '学校', scale: 18 })
  },
  copyText: function (e) {
    const text = e.currentTarget.dataset.text;
    wx.setClipboardData({ data: text });
    wx.showToast({ title: '已复制到粘贴到', icon: 'none' });
  },
  onShareAppMessage: function (res) {
    return {
      title: '校园地图&导航 - 贝壳小盒子',
      path: 'pages/traffic/navi',
    }
  },
})