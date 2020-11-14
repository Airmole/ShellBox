//获取应用实例
var app = getApp();
Page({
  data: {
    uid: '',
    pwd: '',
    nickName: '',
    remind: '加载中',
    isLoading: true,
    _days: ['一', '二', '三', '四', '五', '六', '日'],
    activeClass: '',
    activeClassItem: 0,
    painting: {},
    shareImage: '',
    whichDayOfWeek: '',
    scroll: {
      left: 0 //判断今天是不周末，是的话滚一下
    },
    timeRow: [{
        l1: '第一小节',
        l2: '第二小节',
        t1: '8:00-8:45',
        t2: '8:50-9:35'
      },
      {
        l1: '第三小节',
        l2: '第四小节',
        t1: '9:55-10:40',
        t2: '10:45-11:30'
      },
      {
        l1: '第五小节',
        l2: '第六小节',
        t1: '13:10-13:55',
        t2: '14:00-14:45'
      },
      {
        l1: '第七小节',
        l2: '第八小节',
        t1: '15:00-15:45',
        t2: '15:50-16:35'
      },
      {
        l1: '第九小节',
        l2: '第十小节',
        t1: '16:50-17:35',
        t2: '17:40-18:25'
      },
    ],
    classJson: '',
    targetLessons: [],
    targetX: 0, //target x轴top距离
    targetY: 0, //target y轴left距离
    targetDay: 0, //target day
    targetWid: 0, //target wid
    targetI: 0, //target 第几个active
    targetLen: 0, //target 课程长度
    blur: false,
    is_vacation: false, // 是否为假期
  },
  onLoad: function(options) {
    console.log('options:', options)

    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('newpwd');
    var courseCache = wx.getStorageSync('personal19Class');
    var cookie = options.cookie;
    var vcode = options.vcode;

    if ((typeof(options.cookie) == 'undefined' || typeof(options.vcode) == 'undefined') && courseCache.length == 0) {
      wx.redirectTo({
        url: '/pages/index/vcode?to=grkb&update=0',
      })
    }
    var that = this;
    that.setInfo();
    console.log(pwd)
    that.setData({
      uid: uid,
      pwd: pwd,
    })


    let showCache = true;
    if (options.update == '1') {
      showCache = false;
      that.getTable(uid, pwd, false, cookie, vcode);
    }
    if (options.isShareFrom == 'tiue') {
      showCache = false;
      that.getTable(options.uid, options.pwd, showCache, 'cookie', 'code');
    }

    if (courseCache != "" && showCache) {
      that.setData({
        uid: uid,
        pwd: pwd,
        classJson: courseCache,
        isLoading: false
      })
    } else if ((uid == '' || pwd == '') || (vcode == '' || cookie == '')) {
      wx.navigateTo({
        url: '/pages/index/index'
      })

    } else {
      that.getTable(uid, pwd, false, cookie, vcode);
    }

    that.setData({
      nickName: app.globalData.nickName
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  setInfo: function() {
    var that = this;
    const whichDayOfWeek = new Date().getDay();
    const arr = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'staturday'];
    that.setData({
      whichDayOfWeek: arr[whichDayOfWeek],
    })
  },
  getTable: function(uid, pwd, showCookieClass, cookie, vcode) {
    var that = this;
    wx.request({
      url: app.globalData.apiURL + '/v5/courseTable.php',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        username: uid,
        password: pwd,
        cookie: cookie,
        vcode: vcode,
        openid: app.globalData.openid,
      },
      success: function(res) {
        that.setData({
          classJson: res.data,
          isLoading: false
        })
        console.log(res.data);
        if (res.data.status == 200) {
          wx.setStorageSync('personal19Class', res.data);
          wx.showToast({
            title: "刷新完成",
            icon: "succeed",
            duration: 2000
          })
        }
        if (res.data.status == 401) {
          wx.navigateTo({
            url: '/pages/error/queryerror?ErrorTips=' + "学号密码不对，请重新登录",
          })
        }
        if (res.data.status == 500) {
          var personalClass = wx.getStorageSync('personal19Class');
          if (personalClass != "" && showCookieClass == true) {
            that.setData({
              classJson: personalClass,
              isLoading: false
            })
            wx.showToast({
              title: '教务无法访问，当前展示离线缓存课表',
              icon: 'none',
              duration: 2000
            })
          } else {}
        }
      }
    })
  },
  changeActiveItem: function(e) {
    var that = this;
    // console.log(e);
    that.setData({
      activeClassItem: e.currentTarget.dataset.num,
    })
  },
  onShow: function() {
    var _this = this;

  },
  onReady: function() {
    var that = this;
  },
  showDetail: function(e) {
    console.log(e)
    // 点击课程卡片后执行
    var that = this;
    that.setData({
      targetX: e.detail.x,
      targetY: e.detail.y,
      targetDay: 1,
      targetWid: 2,
      targetI: 1,
      blur: true,
      activeClass: e.currentTarget.dataset
    });
  },
  goClassPlace: function(ep) {
    console.log(ep.target.dataset.place);
    var placeArr = ["1教", "2教", "3教", "4教", "5教", "6教", "7教", "8教", "9教", "10教", "11教", "12教", "理工馆", "社科馆"];
    var markerIdArr = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 5, 4];
    var result = placeArr.indexOf(ep.target.dataset.place.slice(0, -3));
    // console.log(result);
    wx.navigateTo({
      url: '/pages/schoolNav/schoolNav?markerId=' + markerIdArr[result],
    })
  },
  hideDetail: function() {
    var that = this;
    // 点击遮罩层时触发，取消主体部分的模糊，清空target
    that.setData({
      blur: false,
      targetLessons: [],
      targetX: 0,
      targetY: 0,
      targetDay: 0,
      targetWid: 0,
      targetI: 0,
      targetLen: 0,
      activeClassItem: 0,
    });
  },
  catchMoveDetail: function() { /*阻止滑动穿透*/ },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var that = this;
    // console.log(res);
    return {
      title: that.data.nickName + '的个人课表',
      path: 'pages/classQuery/index?isShareFrom=true&uid=' + that.data.uid + '&pwd=' + that.data.pwd,
    }
  },
  refreshData: function() {
    wx.redirectTo({
      url: '/pages/index/vcode?to=grkb&update=1',
    })
  },
  eventDraw() {
    var that = this;
    if (that.data.shareImage != '') {
      wx.previewImage({
        urls: [that.data.shareImage],
      })
      wx.showToast({
        title: '图片已存至相册，可发给好友或设为壁纸',
        icon: 'none',
        duration: 3000
      })
      return
    }
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    const deviceInfo = wx.getSystemInfoSync();
    const screenWidth = deviceInfo.screenWidth;
    const screenHeight = deviceInfo.screenHeight;
    let topMargin = 10;
    if (screenHeight / screenWidth >= 1.8) {
      //检测是否为全面屏
      topMargin = 30;
    }
    var viewsArr = [{
      type: 'rect',
      background: '#fff',
      top: 0,
      left: 0,
      width: screenWidth,
      height: screenHeight
    }];
    //绘制星期
    const weekArr = ['周一', '周二', '周三', '周四', '周五'];
    for (let i = 0; i < weekArr.length; i++) {
      let rowTempArr = {
        type: 'text',
        content: weekArr[i],
        fontSize: 16,
        color: '#402D16',
        textAlign: 'left',
        top: topMargin,
        left: 30 + (i * ((screenWidth - 30) / weekArr.length)),
        bolder: true
      };
      viewsArr.push(rowTempArr);
    }
    //绘制节数
    for (let i = 1; i <= 12; i++) {
      let columnTempArr = {
        type: 'text',
        content: i,
        fontSize: 16,
        color: '#402D16',
        textAlign: 'center',
        top: (topMargin - 30) + (i * ((screenHeight - 30) / 12)),
        left: 10,
        bolder: true
      };
      viewsArr.push(columnTempArr);
    }

    const allCourseArr = that.data.classJson.course;
    let j = 0;
    for (let w in allCourseArr) {
      if (j < 5) {
        for (let i in allCourseArr[w]) {
          try {
            if (allCourseArr[w][i].courseName.length > 0) {
              let classTempBgArr = {
                type: 'rect',
                background: '#7acfa6',
                top: (topMargin + 30) + (2 * (i - 1) * ((screenHeight - 30) / 12)),
                left: Number(30 + (j * ((screenWidth - 30) / weekArr.length))),
                width: ((screenWidth - 30) / weekArr.length) - 1,
                height: (1 * ((screenHeight - 30) / 6)) - 1
              };
              viewsArr.push(classTempBgArr);
              let classTextTempArr = {
                type: 'text',
                content: allCourseArr[w][i].place + ' ' + allCourseArr[w][i].courseName,
                fontSize: 16,
                color: '#fff',
                textAlign: 'left',
                top: (topMargin + 30) + (2 * (i - 1) * ((screenHeight - 30) / 12) + 5),
                left: Number(30 + (j * ((screenWidth - 30) / weekArr.length)) + 5),
                breakWord: true,
                MaxLineNumber: 7,
                width: ((screenWidth - 30) / weekArr.length) - 20
              };
              viewsArr.push(classTextTempArr);
            }
          } catch (error) {
            let classTempBgArr = {
              type: 'rect',
              background: '#7acfa6',
              top: (topMargin + 30) + (2 * (i - 1) * ((screenHeight - 30) / 12)),
              left: Number(30 + (j * ((screenWidth - 30) / weekArr.length))),
              width: ((screenWidth - 30) / weekArr.length) - 1,
              height: (1 * ((screenHeight - 30) / 6)) - 1
            };
            viewsArr.push(classTempBgArr);
            let classTextTempArr = {
              type: 'text',
              content: allCourseArr[w][i][0].place + allCourseArr[w][i][0].courseName + ' ' + allCourseArr[w][i][1].place + allCourseArr[w][i][1].courseName,
              fontSize: 16,
              color: '#fff',
              textAlign: 'left',
              top: (topMargin + 30) + (2 * (i - 1) * ((screenHeight - 30) / 12) + 5),
              left: Number(30 + (j * ((screenWidth - 30) / weekArr.length)) + 5),
              breakWord: true,
              MaxLineNumber: 7,
              width: ((screenWidth - 30) / weekArr.length) - 20
            };
            viewsArr.push(classTextTempArr);
          }
        }
        j++;
      }
    }
    var canvasJson = {
      width: screenWidth,
      height: screenHeight,
      views: viewsArr
    };
    that.setData({
      painting: canvasJson
    })
  },
  eventGetImage(event) {
    var that = this;
    console.log(event)
    wx.hideLoading()
    const {
      tempFilePath,
      errMsg
    } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({
        shareImage: tempFilePath
      })
      wx.previewImage({
        urls: [tempFilePath],
      })
      that.eventSave();
    }
  },
  eventSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: '图片已存至相册，可发给好友或设为壁纸',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
});