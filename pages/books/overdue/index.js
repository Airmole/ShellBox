// pages/books/overdue/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '图书超期',
    isLoading: '加载中',
    screenHeight: '900',
    type: 'bulletin',
    uid: '',
    myFine: '',
    typeList: [{
      title: '超期催还',
      value: 'bulletin'
    }, {
      title: '超期欠款',
      value: 'debt'
    }],
    datalist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type ? options.type : 'bulletin';
    this.inital(type);
    this.getDatalist(type);
  },
  inital: function (type) {
    const device = wx.getSystemInfoSync();
    const uid = app.globalData.edusysUserInfo.uid;
    this.setData({ screenHeight: device.screenHeight, type: type, uid: uid });
    wx.showShareMenu({ withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] });
  },
  typeChanged: function (e) {
    const type = this.data.typeList[e.currentTarget.dataset.index].value;
    // console.log(type);
    this.setData({ type: type});
    this.getDatalist(type);
  },
  getDatalist: function (type = 'bulletin', page = '1') {
    const _this = this;
    wx.request({
      url: `${app.globalData.domain}/book/overdue/${type}`,
      data: { page: page},
      timeout: app.globalData.requestTimeout,
      success: (res) => {
        _this.setData({datalist: res.data, isLoading: false})
        wx.vibrateShort({ type: 'medium' })
      }
    })
  },
  // 上一页
  lastPage: function () {
    const current = this.data.datalist.pagination.current;
    const targetPage = current > 1 ? Number(current) - 1 : 2;
    this.getDatalist(this.data.type, targetPage);
  },
  // 下一页
  nextPage: function () {
    const current = this.data.datalist.pagination.current;
    const last = this.data.datalist.pagination.last;
    const targetPage = current < last ? Number(current) + 1 : last;
    this.getDatalist(this.data.type, targetPage);
  },
  searchInput: function (e) {
    const value = e.detail.value;
    // console.log(value)
    this.setData({ uid: value });
  },
  search: function () {
    const uid = this.data.uid;
    const _this = this;
    wx.request({
      url: `${app.globalData.domain}/book/fine/${uid}`,
      timeout: app.globalData.requestTimeout,
      success: (res) => {
        _this.setData({myFine: res.data})
        wx.vibrateShort({ type: 'medium' })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    setTimeout(function () { _this.setData({ isLoading: false }) }, 1000);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})