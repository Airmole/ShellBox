var base64 = require("../../images/base64");
Page({
  onLoad: function () {
    this.setData({
      icon: base64.icon20
    });
  },
  callWusi: function () {
    wx.makePhoneCall({
      phoneNumber: '15922164710', 
    })
  },
  callLiuweijie: function () {
    wx.makePhoneCall({
      phoneNumber: '18722136008',
    })
  },
  callYangcan: function () {
    wx.makePhoneCall({
      phoneNumber: '18630801799',
    })
  } 
});