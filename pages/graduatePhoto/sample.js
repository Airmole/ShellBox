// pages/graduatePhoto/sample.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sampleId: ['female1Sample', 'male1Sample', 'female2Sample', 'male2Smple']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  chooseSample: function(e) {
    var that = this;
    // console.log(e.currentTarget.dataset.sampleid);
    wx.showModal({
      title: '提示',
      content: '本人工智能目前非常智障，生成毕业照效果过于沙雕，建议做好心理准备。',
      success(res) {
        if (res.confirm) {
          wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: '#00000',
            success: function(res) {
              if (!res.cancel) {
                if (res.tapIndex === 0) {
                  that.chooseWxImage('album', e.currentTarget.dataset.sampleid);
                } else if (res.tapIndex === 1) {
                  that.chooseWxImage('camera', e.currentTarget.dataset.sampleid);
                }
              }
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
          return;
        }
      }
    })
  },
  chooseWxImage: function(type, modelType) {
    var that = this;
    // var imgsPaths = that.data.imgs
    wx.chooseImage({
      sizeType: ['compressed'],
      sourceType: [type],
      count: 1,
      success: function(res) {
        var tempFilesSize = res.tempFiles[0].size
        console.log(tempFilesSize)
        if (tempFilesSize <= 2000000) {
          console.log(res.tempFilePaths[0])
          that.upImgs(res.tempFilePaths[0], modelType)
        } else {
          wx.showToast({
            title: '上传图片不能大于4M!',
            icon: 'none'
          })
        }
      }
    })
  },
  upImgs: function(file, modelType) {
    wx.showLoading({
      title: 'AI合成中...',
      mask: true
    })
    var uid = wx.getStorageSync('uid');
    //上传图片
    wx.uploadFile({
      url: 'https://api.airmole.cn/graduatePhotoGenerate.php',
      filePath: file,
      name: 'imgfile',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      formData: {
        'modelTypeId': modelType,
        'uid': uid
      },
      success: function(res) {
        // console.log(res.data);
        var data = JSON.parse(res.data);
        if (data.message == 'success') {
          wx.hideLoading();
          wx.navigateTo({
            url: '/pages/graduatePhoto/result?photo=' + data.data,
          })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '异常,请稍后再试',
            icon: 'none'
          })
        }
      }
    })
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '一键毕业照，让你的毕业季不留遗憾【贝壳小盒子】',
      path: '/pages/graduatePhoto/sample',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})