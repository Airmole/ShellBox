var app = getApp();
var timeJs = require('../../utils/time.js');
var utilsJs = require('../../utils/util.js');
Page({
  data: {
    offlinePeronalClass: 'null', //缓存的今天全天的课表数组
    nextCourse: "null",
    inputShowed: false,
    adsError: false,
    isLoading: '加载中',
    isShowAllCourse: false,
    isLogined: false,
    keyword: "",
    jsonStr: "",
    dayOfWeek: '',
    keywordStr: '',
    SearchType: '02',
    radioItems: [{
        name: '书名',
        value: '02',
        checked: true
      },
      {
        name: '作者',
        value: '03'
      }, {
        name: '主题',
        value: '04'
      },
      {
        name: '出版社',
        value: '09'
      }
    ]
  },
  onLoad: function() {

    this.checkEffectiveIdAndPasswoed();

  },
  onReady: function() {

  },

  onShow: function() {
    this.onLoad();
  },
  setTodayOfflineClass: function(personalClass) {
    var that = this;
    var date = new Date();
    var dayOfWeek = date.getDay();
    var weekArr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    var createArr = [];
    var nextCourseArr = [];

    personalClass = personalClass.course[weekArr[dayOfWeek]];
    for (let i in personalClass) {
      if (personalClass[i].length > 1) {
        for (let j in personalClass[i]) {
          createArr.push(personalClass[i][j]);
        }
      } else {
        createArr.push(personalClass[i]);
      }
    }
    let nowMintues = date.getMinutes();
    if (nowMintues < 10) {
      nowMintues = "0" + nowMintues;
    }
    var nowTime = date.getHours() + ':' + nowMintues;
    // console.log(createArr);
    for (let i = 0; i < createArr.length; i++) {
      if (createArr[i]['startTime'] != '') {
        // if (timeJs.CompareDate(nowTime, createArr[i]['startTime']) && utilsJs.needThisWeekGo(that.data.jsonStr.teachWeek, createArr[i]['teachWeek'])) {
        //   nextCourseArr = createArr[i];
        // }
        if (timeJs.CompareDate(nowTime, createArr[i]['startTime'])) {
          nextCourseArr = createArr[i];
          break;
        }
      }
    }
    console.log(nextCourseArr)
    that.setData({
      offlinePeronalClass: createArr,
      nextCourse: nextCourseArr
    })


  },
  checkEffectiveIdAndPasswoed: function() {
    var that = this;
    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('newpwd');
    var netPassword = wx.getStorageSync('netPassword');
    var zhai = wx.getStorageSync('building');
    var room = wx.getStorageSync('roomNo');
    if (uid != '' && pwd != '') {
      this.getWelcomeJson(uid, pwd, zhai, room, netPassword);
    } else {
      this.getWelcomeJson(uid, pwd, zhai, room, netPassword);
      that.setData({
        isLogined: false
      })
    }
  },
  isShowAllCourse: function() {
    this.setData({
      isShowAllCourse: !this.data.isShowAllCourse
    })
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  onBindFocus: function(event) {

  },
  onBindBlur: function(event) {
    this.setData({
      inputVal: "",
      inputShowed: false
    })
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  radioChange: function(e) {
    console.log(e.detail.value);
    this.setData({
      SearchType: e.detail.value
    })
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems,
    });
  },
  inputTyping: function(e) {
    this.setData({
      keyword: e.detail.value
    });
    // console.log("输入了" + this.data.keyword);
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  searchIt: function(e) {
    var that = this;
    if (that.data.keyword == 0) {
      wx.showToast({
        title: '请输入检索关键字',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.showToast({
        title: "正在搜索..",
        icon: "loading",
        duration: 10000
      })
      wx.request({
        url: app.globalData.apiURL + '/book/booksearch_adv.php?type=' + that.data.SearchType + '&keyword=' + that.data.keyword,
        success: function(res) {
          that.setData({
            keywordStr: res.data,
          })
          console.log(res.data);
          wx.hideToast()
          if (res.data.total == '图书馆系统无响应') {
            wx.navigateTo({
              url: '/pages/error/queryerror?ErrorTips=' + "图书馆OPAC系统无响应"
            })
          } else if (res.data.total == 0) {
            wx.showToast({
              title: '本馆暂无此书',
              image: '/images/info.png',
              icon: 'none',
              duration: 2000
            });
          } else {
            wx.navigateTo({
              url: '../bookSearch/bookInfo/bookList?keyword=' + that.data.keyword + '&SearchType=' + that.data.SearchType,
            })
          }
        }
      })
    }
  },
  getWelcomeJson: function(uid, pwd, zhai, room, netPassword) {
    var that = this;
    wx.request({
      url: app.globalData.apiURL + '/v2/welcome.php',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        uid: uid,
        pwd: pwd,
        netPassword: netPassword,
        zhai: zhai,
        room: room,
      },
      success: function(res) {
        that.setData({
          jsonStr: res.data
        })
        console.log(res.data);
        var uid = wx.getStorageSync('uid');
        var pwd = wx.getStorageSync('newpwd');
        var personalClass = wx.getStorageSync('personal19Class');
        if (res.data.todayCourse.getCourseStatus != 403) {
          that.setData({
            isLoading: "finished",
            isLogined: true
          })
          if (uid == '' || pwd == '') {
            that.setData({
              isLogined: false
            })
          } else {
            if (personalClass != '') {
              console.log(personalClass)
              that.setTodayOfflineClass(personalClass);
            }
          }

        } else {
          that.setData({
            isLoading: "finished",
            isLogined: false
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
      duration: 3000
    })
  },
  onReachBottom: function() {
    //拉到底了，做点什么好呢
  },
  adsError: function(e) {
    console.log(e)
    var that = this;
    that.setData({
      adsError: true
    })
  },
  bindGetUserInfo: function(e) {
    console.log(e);
    app.globalData.nickName = e.detail.userInfo.nickName;
    this.toLogin();
  },
  toLogin: function() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
});