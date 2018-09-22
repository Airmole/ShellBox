// pages/electricity/electricityBind.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ["选择宿舍楼斋", "3斋", "4斋", "5斋", "6斋", "7斋", "9斋", "10斋", "11斋", "12斋", "13斋", "14斋", "15斋", "16斋", "18斋", "19斋", "20斋", "21斋", "22斋", "25斋", "26斋", "27斋", "28斋", "29斋", "30斋", "31斋", "32斋", "33斋", "34斋", "35斋", "36斋"],
    zhaiArray: ["0", "3", "4", "5", "6", "7", "9", "10", "11", "12", "13", "14", "15", "16", "18", "19", "20", "21", "22", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36"],
    index: 0,
    room: '',
    eleJson: "",
    room_focus: false,
    angle: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var building = wx.getStorageSync('building');
    var roomNo = wx.getStorageSync('roomNo');
    let that = this;
    if (building != "" && roomNo != '') {
      app.globalData.building = building;
      app.globalData.roomNo = roomNo;
      wx.redirectTo({
        url: './electricityFare?zhai=' + that.data.zhaiArray[building] + '&room=' + roomNo,
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  inputFocus: function(e) {
    var id = e.target.id,
      newData = {};
    newData[id + '_focus'] = true;
    this.setData(newData);
  },
  roomInput: function(e) {
    this.setData({
      'room': e.detail.value
    });
    if (e.detail.value.length >= 3) {
      wx.hideKeyboard();
    }
  },
  //提交表单
  formSubmit: function(e) {
    // console.log('form发生了submit事件，携带数据为：' + this.data.zhaiArray[e.detail.value.building]);
    // console.log('form发生了submit事件，携带数据为：' + e.detail.value.roomNo);
    let that = this;
    if (e.detail.value.building == 0) {
      wx.showToast({
        title: '宿舍楼斋有误',
        image: '/images/info.png',
        icon: 'none',
        duration: 1000
      });
    } else {
      var regNum = new RegExp('[1-4][0-4][0-9]', 'g'); //判断用户输入的宿舍号是否大致合适
      var rsNum = regNum.exec(e.detail.value.roomNo);
      if (!rsNum) {
        wx.showToast({
          title: '寝室号输入有误',
          image: '/images/info.png',
          icon: 'none',
          duration: 1000
        });
      } else {
        //楼斋和寝室号码大致是对的
        wx.request({
          url: 'https://airmole.cn/wechat/wxapp/api/eleQueryService.php?zhai=' + that.data.zhaiArray[e.detail.value.building] + '&room=' + e.detail.value.roomNo,
          success: function(res) {
            that.setData({
              eleJson: res.data,
            })
            console.log(res.data);
            //查询出错
            if (res.data.electricity[0].Balance == '0.00' && res.data.electricity[0].LastRecharge == '0.00' && res.data.electricity[0].yesterdayAircon == '0.00' && res.data.electricity[0].yesterdaySocket == '0.00') {
              wx.showToast({
                title: '该房间电费有误',
                image: '/images/info.png',
                icon: 'none',
                duration: 5000
              });
            } else {
              //设置本地Storage,维持登录态用
              wx.setStorageSync('building', e.detail.value.building);
              wx.setStorageSync('roomNo', e.detail.value.roomNo);
              wx.redirectTo({
                url: '/pages/electricity/electricityFare?zhai=' + that.data.zhaiArray[e.detail.value.building] + '&room=' + e.detail.value.roomNo
              })
            }
          }
        })
      }
    }
  },
})