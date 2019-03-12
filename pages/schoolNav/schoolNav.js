// pages/schoolNav/schoolNav.js
var amapFile = require('../../utils/amap-wx.js');
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
    markers: [{
      id: 0,
      latitude: 39.546416,
      longitude: 117.389932,
      iconPath: "/images/nav/marker_checked.png",
      width: 23,
      height: 32,
      callout: {
        content: '社科图书馆',
        display: 'CLICK'
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
  onLoad: function(e) {
    var that = this;

  },
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        isLoading: false
      });
    }, 800);
  },
  makertap: function(e) {
    console.log(e)
    var id = e.markerId;
    var that = this;
    that.setData({
      activePlaceID: id,
      placeName: that.data.markers[id].callout.content
    })
    var userLocation = that.data.userLongitude + ',' + that.data.userLatitude;
    var destination = that.data.markers[id].longitude + ',' + that.data.markers[id].latitude;
    that.planPolyline(userLocation, destination);
  },
  planPolyline: function(origin, destination) {
    var that = this;
    //规划步行路线
    var myAmapFun = new amapFile.AMapWX({
      key: '66a87160f8db2a9a76431c954b4f52a5'
    });
    myAmapFun.getWalkingRoute({
      origin: origin,
      destination: destination,
      success: function(data) {
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
            color: "#7acfa6",
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
        markers.push({
          id: markers.length,
          latitude: points[0].latitude,
          longitude: points[0].longitude,
          iconPath: '../../images/nav/mapicon_navi_s.png',
          width: 23,
          height: 33
        })
        markers.push({
          id: markers.length,
          latitude: points[points.length - 1].latitude,
          longitude: points[points.length - 1].longitude,
          iconPath: '../../images/nav/mapicon_navi_e.png',
          width: 24,
          height: 34
        })
        that.setData({
          markers: markers,
        })
      },
      fail: function(info) {

      }
    })
  },


  location: function() {
    var _this = this
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标  
      success: function(res) {
        _this.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude
        })
      }
    })
  },
  jtt: function() {
    wx.previewImage({
      current: 'https://z4a.net/images/2019/03/12/SchoolMap.png', // 当前显示图片的http链接
      urls: ["https://z4a.net/images/2019/03/12/SchoolMap.png"] // 需要预览的图片http链接列表
    })
  },
  goDetail: function() {
    var that = this;
    const latitude = that.data.markers[that.data.activePlaceID].latitude;
    const longitude = that.data.markers[that.data.activePlaceID].longitude;
    const name = that.data.markers[that.data.activePlaceID].callout.content;
    wx.openLocation({
      latitude,
      longitude,
      name,
      scale: 18
    })
  }
})