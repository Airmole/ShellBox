//login.js
//获取应用实例
var app = getApp();
var domain = app.globalData.domain;
Page({
  data: {
    remind: '加载中',
    help_status: false,
    reset_status: false,
    userid_focus: false,
    passwd_focus: false,
    // vcode_focus: false,
    idcard_focus: false,
    userid: '',
    passwd: '',
    // vcode: '',
    // cookie: '',
    // vcodeUrl: '',
    idcard: '',
    angle: 0,
    canIUseGetUserProfile: false
  },
  onLoad: function (){
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onReady: function(){
    try {
      const edusysUserInfo = wx.getStorageSync('edusysUserInfo');
      if(edusysUserInfo.name.length > 0){
        wx.switchTab({
          url: './index',
        })
      }
    } catch (error) {
      // this.getCookie();
    }

    var _this = this;
    setTimeout(function(){
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(_this.data.angle !== angle){
        _this.setData({
          angle: angle
        });
      }
    });
  },
  bind: function() {
    if(!this.vaildForm()){
      return
    }
    var _this = this;
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '需要获取信息用来生成成绩海报',
      success: function(res){
        // console.log('userInfo：', res.userInfo)
        wx.setStorage({data: res.userInfo, key: 'userInfo'});
        app.globalData.userInfo = res.userInfo
        _this.login(res.userInfo);
      },
      fail: function(e){
        console.log(e)
        wx.showToast({
          title: '未授权将无法使用',
          icon: 'none'
        })
      }
    })
  },
  getUserInfo: function (e){
    if(!this.vaildForm()){
      return
    }
    this.setData({
      userInfo: e.detail.userInfo,
    })
    wx.setStorage({data: e.detail.userInfo, key: 'userInfo'});
    app.globalData.userInfo = e.detail.userInfo
    this.login(e.detail.userInfo);
  },
  vaildForm: function () {
    var uid = this.data.userid;
    var password = this.data.passwd;
    // var cookie = this.data.cookie;
    // var vcode = this.data.vcode;
    if(uid.length<1){
      wx.showToast({
        title: '请输入教务网账号',
        icon: 'none'
      })
      return false;
    }
    if(password.length < 1){
      wx.showToast({
        title: '请输入教务网密码',
        icon: 'none'
      })
      return false;
    // } else if(vcode.length !== 4){
    //   wx.showToast({
    //     title: '请输入验证码',
    //     icon: 'none'
    //   })
    //   return false;
    }
    return true;
  },
  login: function (userInfo) {
    var _this = this;
    _this.setData({remind: '加载中'});
    var uid = this.data.userid;
    var password = this.data.passwd;
    // var cookie = this.data.cookie;
    // var vcode = this.data.vcode;
    wx.request({
      url: `${domain}/edu/profile`,
      data:{
        uid: uid,
        pwd: password,
        // vcode: vcode,
        // cookie: cookie,
        userFrom: 'wechat',
        openid: app.globalData.openid,
        nickname: userInfo.nickName,
        avatar: userInfo.avatarUrl,
        gender: userInfo.gender,
        country: userInfo.country,
        province: userInfo.province,
        city: userInfo.city,
        language: userInfo.language
      },
      timeout: 6000,
      method: 'POST',
      success: function(res){
        // console.log('eduSysProfile：', res.data)
        try {
          if(res.data.name.length>1){
            res.data.password = password
            wx.setStorage({
              data: res.data,
              key: 'edusysUserInfo',
            })
            app.globalData.edusysUserInfo = res.data
            wx.switchTab({
              url: './index',
            })
          }
        } catch (error) {
          // _this.getCookie();
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 5000
          })
          _this.setData({remind: ''});
        }
      }
    })
  },
  resetPassword: function () {
    if(!this.vaildResetForm()){
      return
    }
    wx.showLoading({
      title: 'loading',
    })
    var _this = this;
    const uid = this.data.userid;
    const idcard = this.data.idcard;
    const password = this.data.passwd;
    wx.request({
      url: `${domain}/edu/password/reset`,
      data: {
        uid: uid,
        idcard: idcard,
        password: password
      },
      method: 'POST',
      success: function(res){
        wx.hideLoading();
        try {
          if(res.data.code == 200){
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 5000
            })
            _this.setData({reset_status: false})
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 5000
            })
          }
        } catch (error) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 5000
          })
        }
      }
    })
  },
  showResetModal: function () {
    this.setData({
      help_status: false,
      reset_status: true
    })
  },
  closeResetModal: function () {
    this.setData({
      reset_status: false
    })
  },
  vaildResetForm: function () {
    const uid = this.data.userid;
    const idcard = this.data.idcard;
    const password = this.data.passwd;
    const idcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

    if(uid.length<1){
      wx.showToast({
        title: '请输入正确的教务网账号',
        icon: 'none'
      })
      return false;
    }
    if(idcardReg.test(idcard) == false) {
      wx.showToast({
        title: '身份证号码格式有误',
        icon: 'none'
      })
      return false;
    }
    if(uid == password){
      wx.showToast({
        title: '用户名与密码不可以相同',
        icon: 'none'
      })
      return false;
    }
    if(password.length < 8){
      wx.showToast({
        title: '密码长度不得短于8位',
        icon: 'none'
      })
      return false;
    }
    let hasAlpha= (password.search(/[A-Za-z]/)!=-1) ? 1 : 0;
	  let hasNumber= (password.search(/[0-9]/)!=-1) ? 1 : 0;
    if(hasAlpha == 0 || hasNumber == 0){
      wx.showToast({
        title: '密码必需同时包含数字和字母',
        icon: 'none'
      })
      return false;
    }

    return true;
  },
  getCookie: function() {
    // 解脱了，不用输入验证码了
    // var _this = this;
    // wx.request({
    //   url: `${domain}/edu/cookie`,
    //   success: function(res) {
    //     _this.setData({
    //       vcode: res.data.vcodeOcr,
    //       cookie: res.data.cookie,
    //       vcodeUrl: res.data.vcode
    //     })
    //   }
    // })
  },
  useridInput: function(e) {
    this.setData({
      userid: e.detail.value
    });
    if(e.detail.value.length >= 9){
      wx.hideKeyboard();
    }
  },
  passwdInput: function(e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  // vcodeInput: function(e) {
  //   this.setData({
  //     vcode: e.detail.value
  //   });
  // },
  idcardInput: function(e) {
    this.setData({
      idcard: e.detail.value
    });
  },
  inputFocus: function(e){
    if(e.target.id == 'userid'){
      this.setData({
        'userid_focus': true
      });
    }else if(e.target.id == 'passwd'){
      this.setData({
        'passwd_focus': true
      });
    // }else if(e.target.id == 'vcode'){
    //   this.setData({
    //     'vcode_focus': true
    //   });
    }else if(e.target.id == 'idcard'){
      this.setData({
        'idcard_focus': true
      });
    }
  },
  inputBlur: function(e){
    if(e.target.id == 'userid'){
      this.setData({
        'userid_focus': false
      });
    } else if(e.target.id == 'passwd'){
      this.setData({
        'passwd_focus': false
      });
    // }else if(e.target.id == 'vcode'){
    //   this.setData({
    //     'vcode_focus': false
    //   });
    } else if(e.target.id == 'idcard'){
      this.setData({
        'idcard_focus': false
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
    });
  }
});