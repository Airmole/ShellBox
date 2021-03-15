// pages/score/score.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
let interstitialAd = null;  // 插屏广告初始化
Page({
  /**
   * 页面的初始数据
   */
  data: {
    password: "",
    jsonContent: '',
    PicURL: "",
    PicArr: [],
    screenHeight: '900',
    isLoading: true,
    showGraphic: true,
    painting: {},
    shareImage: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options);
    const device = wx.getSystemInfoSync();
    // console.log(device.screenHeight);
    this.setData({screenHeight: device.screenHeight});
    this.getScoreData();
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({ adUnitId: 'adunit-5a3621a7eb4da121' });
      if (interstitialAd) {
        interstitialAd.show().catch((err) => {
          console.error(err)
        })
      }
    }
    
    
  },
  /**
   * 查询成绩
   */
  getScoreData: function() {
    var _this = this;
    const uid = app.globalData.edusysUserInfo.uid;
    const pwd = app.globalData.edusysUserInfo.password;
    wx.request({
      url: `${app.globalData.domain}/edu/score`,
      method: "POST",
      data: { uid: uid, pwd: pwd },
      success: function(res) {
        if (res.statusCode == 200) {
          _this.setData({ isLoading: false, jsonContent: res.data });
          _this.charts();
        } else {
          wx.showToast({ title: res.data.message, icon: 'none' });
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
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function(item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  charts: function(e) {
    var that = this;
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
      that.setData({ showGraphic: false });
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
        xAxis: { disableGrid: true },
        yAxis: {
          title: '每学期成绩趋势',
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
  eventDraw() {
    var that = this;
    if (that.data.shareImage != '') {
      wx.previewImage({ urls: [that.data.shareImage] });
      wx.showToast({ title: '图片已保存至相册，记得分享给朋友们哟', icon: 'none' });
      return
    }
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })

    let userNickName = app.globalData.userInfo.nickName;
    if (userNickName == '') {
      userNickName = app.globalData.edusysUserInfo.uid;
    }
    let nickName = {
      type: 'text',
      content: userNickName,
      fontSize: 30,
      color: '#000',
      textAlign: 'center',
      top: 350,
      left: 300,
      lineHeight: 20,
      MaxLineNumber: 1,
      breakWord: true,
      width: 160
    };
    var newArr = [];
    let countNum = 0;
    const mockData = that.data.jsonContent;
    for (let p in mockData) {
      for (let q in mockData[p].score) {
        if (mockData[p].score[q].score >= 60) {
          countNum++;
          let newTempArr = {
            SerialNo: countNum,
            className: mockData[p].score[q].className,
            period: mockData[p].score[q].period,
            credit: mockData[p].score[q].credit,
            score: mockData[p].score[q].score
          };
          newArr.push(newTempArr);
        }
      }
    }
    let midNum = 0;
    if (newArr.length % 2 == 0 && newArr.length > 0) {
      midNum = newArr.length / 2;
    } else {
      midNum = (newArr.length + 1) / 2;
    }
    var whitePaperHeight = (midNum * 20) + 35;
    var pushArr = [{
      type: 'image',
      url: 'https://upload-images.jianshu.io/upload_images/4697920-b926d6f7b128a808.png',
      top: 0,
      left: 0,
      width: 600,
      height: 390
    }, {
      type: 'image',
      url: 'https://upload-images.jianshu.io/upload_images/4697920-d0909159d03389c5.png',
      top: 390 + whitePaperHeight,
      left: 0,
      width: 600,
      height: 275
    }];

    let makeupFullPicArr = [{
      type: 'rect',
      background: '#ffffff',
      top: 390,
      left: 11,
      width: 576,
      height: whitePaperHeight
    }, {
      type: 'rect',
      background: '#EF835F',
      top: 390,
      left: 0,
      width: 11,
      height: whitePaperHeight
    }, {
      type: 'rect',
      background: '#EF835F',
      top: 390,
      left: 587,
      width: 13,
      height: whitePaperHeight
    }, {
      type: 'text',
      content: '序号',
      fontSize: 13,
      color: '#000',
      textAlign: 'left',
      top: 400,
      left: 17,
      lineHeight: 20,
      MaxLineNumber: 1,
      breakWord: true,
      width: 30
    }, {
      type: 'text',
      content: '课程名称',
      fontSize: 13,
      color: '#000',
      textAlign: 'left',
      top: 400,
      left: 48,
      lineHeight: 20,
      MaxLineNumber: 1,
      breakWord: true,
      width: 200
    }, {
      type: 'text',
      content: '学分',
      fontSize: 13,
      color: '#000',
      textAlign: 'left',
      top: 400,
      left: 245,
      lineHeight: 20,
      MaxLineNumber: 1,
      breakWord: true,
      width: 30
    }, {
      type: 'text',
      content: '成绩',
      fontSize: 13,
      color: '#000',
      textAlign: 'left',
      top: 400,
      left: 273,
      lineHeight: 20,
      MaxLineNumber: 1,
      breakWord: true,
      width: 30
    }, {
      type: 'text',
      content: '序号',
      fontSize: 13,
      color: '#000',
      textAlign: 'left',
      top: 400,
      left: 310,
      lineHeight: 20,
      MaxLineNumber: 1,
      breakWord: true,
      width: 30
    }, {
      type: 'text',
      content: '课程名称',
      fontSize: 13,
      color: '#000',
      textAlign: 'left',
      top: 400,
      left: 338,
      lineHeight: 20,
      MaxLineNumber: 1,
      breakWord: true,
      width: 200
    }, {
      type: 'text',
      content: '学分',
      fontSize: 13,
      color: '#000',
      textAlign: 'left',
      top: 400,
      left: 528,
      lineHeight: 20,
      MaxLineNumber: 1,
      breakWord: true,
      width: 30
    }, {
      type: 'text',
      content: '成绩',
      fontSize: 13,
      color: '#000',
      textAlign: 'left',
      top: 400,
      left: 558,
      lineHeight: 20,
      MaxLineNumber: 1,
      breakWord: true,
      width: 30
    }];
    pushArr.push(nickName);
    pushArr = pushArr.concat(makeupFullPicArr);

    var topX = 400;
    var leftY = 20;
    for (let i = 0; i < midNum; i++) {
      topX = topX + 20;
      let tempNo = {
        type: 'text',
        content: newArr[i].SerialNo ? newArr[i].SerialNo : '',
        fontSize: 14,
        color: '#000',
        textAlign: 'left',
        top: topX,
        left: leftY,
        lineHeight: 20,
        MaxLineNumber: 1,
        breakWord: true,
        width: 20
      };
      pushArr.push(tempNo);
      let tempClassName = {
        type: 'text',
        content: newArr[i].className,
        fontSize: 14,
        color: '#000',
        textAlign: 'left',
        top: topX,
        left: leftY + 25,
        lineHeight: 20,
        MaxLineNumber: 1,
        breakWord: true,
        width: 180
      };
      pushArr.push(tempClassName);
      let tempCredit = {
        type: 'text',
        content: newArr[i].credit,
        fontSize: 13,
        color: '#000',
        textAlign: 'center',
        top: topX,
        left: leftY + 230,
        lineHeight: 20,
        MaxLineNumber: 1,
        breakWord: true,
        width: 20
      };
      pushArr.push(tempCredit);
      let tempScore = {
        type: 'text',
        content: newArr[i].score,
        fontSize: 13,
        color: '#000',
        textAlign: 'center',
        top: topX,
        left: leftY + 260,
        lineHeight: 20,
        MaxLineNumber: 1,
        breakWord: true,
        width: 20
      };
      pushArr.push(tempScore);
    }

    topX = 400;
    leftY = 310;
    for (let i = midNum; i < newArr.length; i++) {
      topX = topX + 20;
      let tempNo = {
        type: 'text',
        content: newArr[i].SerialNo + '',
        fontSize: 14,
        color: '#000',
        textAlign: 'left',
        top: topX,
        left: leftY,
        lineHeight: 20,
        MaxLineNumber: 1,
        breakWord: true,
        width: 20
      };
      pushArr.push(tempNo);
      let tempClassName = {
        type: 'text',
        content: newArr[i].className,
        fontSize: 14,
        color: '#000',
        textAlign: 'left',
        top: topX,
        left: leftY + 25,
        lineHeight: 20,
        MaxLineNumber: 1,
        breakWord: true,
        width: 180
      };
      pushArr.push(tempClassName);
      let tempCredit = {
        type: 'text',
        content: newArr[i].credit,
        fontSize: 13,
        color: '#000',
        textAlign: 'center',
        top: topX,
        left: leftY + 230,
        lineHeight: 20,
        MaxLineNumber: 1,
        breakWord: true,
        width: 20
      };
      pushArr.push(tempCredit);
      let tempScore = {
        type: 'text',
        content: newArr[i].score,
        fontSize: 13,
        color: '#000',
        textAlign: 'center',
        top: topX,
        left: leftY + 255,
        lineHeight: 20,
        MaxLineNumber: 1,
        breakWord: true,
        width: 20
      };
      pushArr.push(tempScore);
    }
    console.log(newArr);
    that.setData({
      painting: {
        width: 600,
        height: 390 + whitePaperHeight + 275,
        clear: false,
        views: pushArr
      }
    })
  },
  eventSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: '图片已保存至相册，记得分享给朋友们哟',
          icon: 'none',
          duration: 3000
        })
      }
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
  }
})