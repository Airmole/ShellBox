// pages/netsys/bind.js//获取应用实例
var app = getApp();
var domain = app.globalData.domain;
Page({
  data: {
    remind: '加载中',
    help_status: false,
    netid_focus: false,
    passwd_focus: false,
    netid: '',
    passwd: '',
    bgimg: 'https://cdn.airmole.cn/static/netsys_bind_title.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    angle: 0
  },
  onLoad: function (){
  },
  onReady: function(){
    var _this = this;
    try {
      const netsysUserInfo = wx.getStorageSync('netsysUserInfo') || {}
      if(netsysUserInfo.netid.length > 0) {
        wx.redirectTo({ url: './index' })
      }
    } catch (error) {
      _this.setData({ netid: app.globalData.edusysUserInfo.uid })
    }

    setTimeout(function(){ _this.setData({ remind: '' }) }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle > 14){ angle = 14 }
      else if(angle<-14) { angle = -14 }
      if(_this.data.angle !== angle){
        _this.setData({ angle: angle })
      }
    });
  },
  bind: function() {
    if (!this.vaildForm()) {
      return
    }
    var _this = this;
    _this.getProfile()
  },
  vaildForm: function () {
    var netid = this.data.netid
    var password = this.data.passwd
    if(netid.length < 1){
      wx.showToast({ title: '请输入上网账号', icon: 'none' })
      return false
    }
    if (password.length < 1) {
      wx.showToast({ title: '请输入校园网密码', icon: 'none' })
      return false
    }
    return true
  },
  getProfile: function () {
    var _this = this
    _this.setData({remind: '加载中'})
    var netid = this.data.netid
    var password = this.data.passwd
    wx.request({
      url: `${domain}/netsys/profile`,
      data:{
        uid: app.globalData.edusysUserInfo.uid,
        userid: netid,
        password: password,
      },
      timeout: app.globalData.requestTimeout,
      method: 'POST',
      success: function(res){
        try {
          if (res.data.welcome.length > 1) {
            const netsysUserInfo = {netid: netid, password: password }
            res.data.password = password
            app.globalData.netsysUserInfo = res.data
            wx.setStorage({ data: netsysUserInfo, key: 'netsysUserInfo' })
            wx.redirectTo({ url: './index' })
          }
        } catch (error) {
          _this.setData({remind: ''})
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 5000
          })
        }
      }
    })
  },
  netidInput: function(e) {
    this.setData({
      netid: e.detail.value
    });
    if(e.detail.value.length >= 9){
      wx.hideKeyboard();
    }
  },
  passwdInput: function(e) {
    this.setData({
      passwd: e.detail.value
    })
  },
  inputFocus: function(e){
    if(e.target.id == 'netid'){
      this.setData({
        'netid_focus': true
      })
    }else if(e.target.id == 'passwd'){
      this.setData({
        'passwd_focus': true
      })
    }
  },
  inputBlur: function(e){
    if(e.target.id == 'netid'){
      this.setData({
        'netid_focus': false
      });
    } else if(e.target.id == 'passwd'){
      this.setData({
        'passwd_focus': false
      });
    }
  },
  tapHelp: function(e){
    if(e.target.id == 'help'){
      this.hideHelp();
    }
  },
  showHelp: function(e){
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function(e){
    this.setData({
      'help_status': false
    })
  }
});