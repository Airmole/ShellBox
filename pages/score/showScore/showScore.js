// pages/score/showScore/showScore.js
var wxCharts = require('../../../utils/wxcharts.js');
var util = require('../../../utils/time.js');
var app = getApp();
var lineChart = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stuId: " ",
    password: " ",
    jsonContent: {},
    PicURL: "",
    PicArr: [""],
    hasUserInfo: false,
    isLoading: true,
    showGraphic: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 60000
    })
    var that = this;
    that.setData({
      stuId: app.globalData.uid,
      password: app.globalData.pwd,
    });
    if (app.globalData.uid == '' || app.globalData.pwd == '') {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    } else {
      wx.request({
        url: 'https://api.giiig.cn/tj/?username=' + app.globalData.uid + '&password=' + app.globalData.pwd,
        success: function(res) {
          that.setData({
            jsonContent: res.data,
          })
          console.log(res.data.data.msg);
          if (res.data.code == 200) {
            if (res.data.data.msg == '密码错误') {
              wx.redirectTo({
                url: '/pages/index/index'
              })
            }
            if (res.data.data.msg == '教务系统外网访问已关闭,需要查询请内网访问') {
              wx.navigateTo({
                url: '/pages/error/queryerror?ErrorTips=' + '学校教务系统炸了,晚点再来试试吧'
              })
            }
            that.setData({
              isLoading: false
            });
            wx.hideToast()
            that.charts();
          } else {
            if (res.data.code == 402) {
              wx.redirectTo({
                url: '/pages/error/queryerror?ErrorTips=' + res.data.message
              })
            }
            if (res.data.code == 403) {
              wx.redirectTo({
                url: '/pages/error/queryerror?ErrorTips=' + res.data.message
              })
            }
          }
        }
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    that.onLoad();
    wx.stopPullDownRefresh();
    wx.showToast({
      title: "刷新完成",
      icon: "succeed",
      duration: 2000
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  GetScoreList: function(s) {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    })
    var that = this;
    // console.log(app.globalData.uid);
    wx.request({
      url: 'https://api.giiig.cn/tj/score?uid=' + app.globalData.uid,
      success: function(res) {
        that.setData({
          PicUrl: res.data.data,
        })
        console.log(res.data.data);
        that.data.PicArr[0] = res.data.data,
          wx.hideToast()
        wx.previewImage({
          current: res.data.data, // 当前显示图片的http链接
          urls: that.data.PicArr // 需要预览的图片http链接列表
        })
        wx.downloadFile({
          url: res.data.data,
          success: function(res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function(dres) {
                console.log(dres);
                wx.showToast({
                  title: '已保存到相册，记得分享',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    })
  },
  //图表相关
  createSimulationData: function() {
    var that = this;
    var categories = [];
    var data1 = [];
    var data2 = [];
    var scoreJson = this.data.jsonContent.data;
    if (scoreJson.length < 2) {
      that.setData({
        showGraphic: false
      })
    }
    for (var i = 0; i < scoreJson.length; i++) {
      categories.push(scoreJson[i].time.schoolYear + '年 第' + scoreJson[i].time.semester + '学期');
      data1.push(scoreJson[i].avg);
      data2.push(scoreJson[i].gpa);
    }
    return {
      categories: categories,
      data1: data1,
      data2: data2,
    }
  },

  touchHandler: function(e) {
    // console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function(item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  charts: function(e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth * 0.95;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var simulationData = this.createSimulationData();
    console.log(simulationData)
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      background: '#7acfa6',
      series: [{
          name: '算术平均分',
          data: simulationData.data1,
          format: (val) => val + "分"
        },
        {
          name: '加权平均分',
          data: simulationData.data2,
          format: (val) => val + "分"
        }
      ],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '每学期学分趋势',
        format: (val) => val.toFixed(2),
        min: 60
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },
})