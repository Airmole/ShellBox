// pages/tel/departmentTel.js
var base64 = require("../../../images/base64");
/**
 * 2018年3月9日 12点49分预留各部门的icon后续慢慢加，这个功能不着急
 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //存储存储各部门电话的数组
    telNumber: [{
      avatar: '/images/tuanwei.png',
      name: '团委',
      tel: 22410730
    }, {
      avatar: '/images/jiaowu.png',
      name: '教务处',
      tel: 22410732
    }, {
      avatar: '',
      name: '财务处',
      tel: 22410769
    }, {
      avatar: '',
      name: '人事处',
      tel: 22410768
    }, {
      avatar: '',
      name: '宣传部',
      tel: 22410352
    }, {
      avatar: '',
      name: '基础部',
      tel: 22410502
    }, {
      avatar: '',
      name: '体育部',
      tel: 22410422
    }, {
      avatar: '',
      name: '思政部',
      tel: 22410736
    }, {
      avatar: '',
      name: '图书馆',
      tel: 22410526
    }, {
      name: '土木系',
      avatar: '',
      tel: 22410703
    }, {
      avatar: '',
      name: '材料系',
      tel: 22410516
    }, {
      name: '机械系',
      tel: 22410508
    }, {
      avatar: '',
      name: '信息系',
      tel: 22410704
    }, {
      avatar: '',
      name: '经济系',
      tel: 22410721
    }, {
      avatar: '',
      name: '管理系	',
      tel: 22410705
    }, {
      avatar: '',
      name: '法律系',
      tel: 22410391
    }, {
      avatar: '',
      name: '艺术系',
      tel: 22410348
    }, {
      avatar: '',
      name: '外语系',
      tel: 22410523
    }, {
      avatar: '',
      name: '网络中心',
      tel: 22410719
    }, {
      avatar: '',
      name: '学院办公室',
      tel: 22410800
    }, {
      avatar: '',
      name: '学校报警电话	',
      tel: 22411110
    }, {
      avatar: '',
      name: '心理咨询中心',
      tel: 22410981
    }, {
      avatar: '',
      name: '学生工作办公室',
      tel: 22410298
    }, {
      avatar: '',
      name: '国际合作交流部',
      tel: 22410389
    }, {
      avatar: '',
      name: '招生就业处（就业）',
      tel: 22412672
    }, {
      avatar: '',
      name: '招办就业处（招生）',
      tel: 22410960
    }, {
      avatar: '',
      name: '保卫处（户籍/宿管）',
      tel: 22411900
    }, {
      avatar: '',
      name: '基建后勤处资产管理中心',
      tel: 22410919
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      icon: base64.icon20
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
    * 点击电话号码拨出电话事件的处理函数
    */
  callPhone: function (event) {
    wx.makePhoneCall({
      phoneNumber: event.target.id
    })
  },
  /**
   * 长按号码复制到粘贴板的处理函数
   */
  copyIt: function (event) {
    wx.setClipboardData({
      data: event.target.id
    })
    wx.showToast({
      title: '已复制到粘贴版',
      icon: 'none',
      duration: 1000
    });
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '贝壳田园各系部联系电话',
      path: 'pages/tel/departmentTel',
      imageUrl: "https://airmole.cn/wechat/wxapp/images/QueryTel.jpg"
    }
  }
})