var app = getApp()
Page({
  data: {
    offlinePeronalClass: '',
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
    this.setTodayOfflineClass();


  },
  onReady: function() {

  },

  onShow: function() {
    this.onLoad();
  },
  setTodayOfflineClass: function() {
    var personalClass = wx.getStorageSync('personalClass');
    var that = this;
    var date = new Date();
    let dayOfWeek = date.getDay();
    let weekArr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    personalClass = personalClass.course[weekArr[dayOfWeek]];
    var createArr = [];
    for (let i in personalClass) {
      if (personalClass[i].length > 1) {
        for (let j in personalClass[i]) {
          createArr.push(personalClass[i][j]);
        }
      } else {
        createArr.push(personalClass[i]);
      }
    }
    console.log();
    that.setData({
      offlinePeronalClass: createArr,
    })
  },
  checkEffectiveIdAndPasswoed: function() {
    var that = this;
    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('pwd');

    var zhai = wx.getStorageSync('building');
    var room = wx.getStorageSync('roomNo');
    if (uid != '' && pwd != '') {
      this.getWelcomeJson(uid, pwd, zhai, room);
    } else {
      this.getWelcomeJson(uid, pwd, zhai, room);
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
        url: 'https://airmole.cn/api/book/booksearch_adv.php?type=' + that.data.SearchType + '&keyword=' + that.data.keyword,
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
  getWelcomeJson: function(uid, pwd, zhai, room) {
    var that = this;
    wx.request({
      url: 'https://airmole.cn/test/welcome.php?uid=' + uid + '&pwd=' + pwd + '&zhai=' + zhai + '&room=' + room,
      success: function(res) {
        that.setData({
          jsonStr: res.data
        })
        console.log(res.data);
        var uid = wx.getStorageSync('uid');
        var pwd = wx.getStorageSync('pwd');
        if (res.data.todayCourse.getCourseStatus != 403) {
          that.setData({
            isLoading: "finished",
            isLogined: true
          })
          if (uid == '' || pwd == '') {
            that.setData({
              isLogined: false
            })
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
  }
});