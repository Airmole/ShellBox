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
    BottomTip: " ",
    hideOrNot: 0,
    tabs: ["导航地图", "静态地图"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    markers: [],
    distance: '',
    cost: '',
    polyline: [],
    userLongitude: '',
    userLatitude: '',
    inSchool: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    //获取屏幕高度，合理设置地图组件高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          mapHeight: res.windowHeight - 175,
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    //判断用户是否在学校
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          userLongitude: res.longitude,
          userLatitude: res.latitude
        })
        if ((that.data.userLongitude >= 117.38 && that.data.userLongitude <= 117.40) && (that.data.userLatitude >= 39.54 && that.data.userLatitude <= 39.55)) {
          that.setData({
            inSchool: true,
          })
          var myAmapFun = new amapFile.AMapWX({
            key: '66a87160f8db2a9a76431c954b4f52a5'
          });
          var params = {
            iconPathSelected: '../../images/nav/marker_checked.png',
            iconPath: '../../images/nav/marker.png',
            success: function (data) {
              markersData = data.markers;
              var poisData = data.poisData;
              var markers_new = [];
              markersData.forEach(function (item, index) {
                markers_new.push({
                  id: item.id,
                  latitude: item.latitude,
                  longitude: item.longitude,
                  iconPath: item.iconPath,
                  width: item.width,
                  height: item.height
                })
              })
              if (markersData.length > 0) {
                that.setData({
                  markers: markers_new
                });
                that.setData({
                  city: poisData[0].cityname || ''
                });
                that.setData({
                  latitude: markersData[0].latitude
                });
                that.setData({
                  longitude: markersData[0].longitude
                });
                that.showMarkerInfo(markersData, 0);
              } else {
                wx.getLocation({
                  type: 'gcj02',
                  success: function (res) {
                    that.setData({
                      latitude: res.latitude
                    });
                    that.setData({
                      longitude: res.longitude
                    });
                    that.setData({
                      city: '天津市'
                    });
                  },
                  fail: function () {
                    that.setData({
                      latitude: 39.545546
                    });
                    that.setData({
                      longitude: 117.396018
                    });
                    that.setData({
                      city: '天津市'
                    });
                  }
                })
                that.setData({
                  textData: {
                    name: '抱歉，未找到结果',
                    desc: ''
                  }
                });
              }
            },
            fail: function (info) {
              // wx.showModal({title:info.errMsg})
            }
          }
          myAmapFun.getPoiAround(params)
        } else {
          console.log('不在学校', that.data.userLongitude + ',' + that.data.userLatitude)
        }
      }
    })
  },
  //顶部Tab切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  isInSchool: function () {

  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
    var userLocation = that.data.userLongitude + ',' + that.data.userLatitude;
    var destination = markersData[id].longitude + ',' + markersData[id].latitude;
    this.planPolyline(userLocation, destination);
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../images/nav/marker_checked.png";
      } else {
        data[j].iconPath = "../../images/nav/marker.png";
      }
      markers.push({
        id: data[j].id,
        latitude: data[j].latitude,
        longitude: data[j].longitude,
        iconPath: data[j].iconPath,
        width: data[j].width,
        height: data[j].height
      })
    }
    that.setData({
      markers: markers
    });
  },
  planPolyline: function (origin, destination) {
    var that = this;
    //规划步行路线
    var myAmapFun = new amapFile.AMapWX({
      key: '66a87160f8db2a9a76431c954b4f52a5'
    });
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
      fail: function (info) {

      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})