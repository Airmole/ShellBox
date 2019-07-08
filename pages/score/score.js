// pages/score/showScore/showScore.js
var wxCharts = require('../../utils/wxcharts.js');
var util = require('../../utils/time.js');
var app = getApp();
var lineChart = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stuId: "",
    password: "",
    jsonContent: '',
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
    // console.log(options.isShareFrom);

    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('newpwd');
    var cookie = options.cookie;
    var vcode = options.vcode;
    that.setData({
      stuId: uid,
      password: pwd,
    });
    if ((that.data.stuId == '' || that.data.password == '') || (vcode == '' || cookie == '')) {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    } else {
      this.GetScoreData(uid, pwd, cookie, vcode);
    }
  },
  /**
   * 查询成绩
   */
  GetScoreData: function(uid, pwd, cookie, vcode) {
    var that = this;
    wx.request({
      url: 'https://api.airmole.cn/ShellBox/v3/score.php?username=' + uid + '&password=' + pwd + '&cookie=' + cookie + '&vcode=' + vcode,
      success: function(res) {
        console.log(res.data)
        that.setData({
          jsonContent: res.data,
        })
        if (Object.keys(res.data).length == 0) {
          wx.redirectTo({
            url: '/pages/error/queryerror?ErrorTips=暂时无法查询'
          })
        }
        if (Object.keys(res.data).length != 0) {
          if (res.data.code == "401" && res.data.desc == "学号、密码不正确？") {
            that.reLogin();
          }
          that.setData({
            isLoading: false
          });
          wx.hideToast()
          that.charts();
        } else {
          wx.redirectTo({
            url: '/pages/error/queryerror?ErrorTips=' + res.data.desc
          })
        }
      }
    })
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
    //console.log(app.globalData.uid)
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
        if (res.data.code == 200) {
          that.setData({
            PicUrl: res.data.data,
          })
          console.log(res.data);
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
                  // wx.showToast({
                  //   title: '已保存到相册，记得分享',
                  //   icon: 'none',
                  //   duration: 2000
                  // })
                  return true;
                }
              })
            }
          })
        } else {
          return false;
        }
      }
    })
  },
  //图表相关
  createSimulationData: function() {
    var that = this;
    var categories = [];
    var data1 = [];
    var data2 = [];
    var scoreJson = this.data.jsonContent;
    if (scoreJson.length < 2) {
      console.log("scoreJson.length==" + scoreJson.length);
      that.setData({
        showGraphic: false
      })
    }
    for (var key in scoreJson) {
      categories.push(key);
      data1.push(scoreJson[key].avg);
      data2.push(scoreJson[key].gpa);
    }
    categories = categories.reverse();
    data1 = data1.reverse();
    data2 = data2.reverse();
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
    var that = this;
    if (simulationData.categories.length <= 0) {
      that.setData({
        showGraphic: false
      })
    } else {
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
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    // console.log(res);
    if (this.GetScoreList() == true) {
      wx.showToast({
        title: '已保存到相册，记得分享',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.hideToast()
      return {
        title: '诺~给你看看，这是我的成绩单!',
        path: 'pages/score/score?isShareFrom=true&uid=' + this.data.stuId + '&pwd=' + this.data.password,
      }
    }
  },
  //注销重登录
  reLogin: function() {
    app.globalData.uid = "";
    app.globalData.pwd = "";
    app.globalData.newpwd = "";
    wx.setStorageSync('uid', '');
    wx.setStorageSync('pwd', '');
    wx.setStorageSync('newpwd', '');
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  onReady: function() {

  }
})