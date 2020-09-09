// pages/my/my.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorization: false,
    apply: false,
    name: '',
    gender: false,
    head_sculpture: false,
    balance: false,
    signature: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#395996'
    })
    wx.setNavigationBarTitle({
      title: '我的'
    })
    if (this.data.authorization) {
      this.index_taster()
    }
  },
  fun_click(e) {
    if (e.currentTarget.dataset.name == "tasting_tube_shoppingmall") {
      wx.navigateTo({
        url: `../${e.currentTarget.dataset.name}/${e.currentTarget.dataset.name}?id=${this.data.apply}&&name=${this.data.name}&&pic=${this.data.head_sculpture}`
      });
    } else {
      wx.navigateTo({
        url: `../${e.currentTarget.dataset.name}/${e.currentTarget.dataset.name}`
      });
    }
  },

  // 登录
  register() {
    wx.navigateTo({
      url: '../Authorized/Authorized',
    })
  },
  log(e) {
    let message = e.detail.errMsg
    if (message == "getUserInfo:ok") {
      // 允许
      // this.getUserInfo()
    } else {
      // 拒绝
    }
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
    this.setData({
      authorization: wx.getStorageSync('authorization')
    })
    if (this.data.authorization) {
      this.index_taster()
    }
  },
  getUserInfo() {
    let that = this;
    wx.getUserInfo({
      withCredentials: true,
      lang: "zh_CN",
      success(res) {
        that.wxLogin(res.encryptedData, res.iv, res.rawData)
      }
    })
  },
  wxLogin(encryptedData, iv, rawData) {
    let that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        fun_ref.post(fun_config.appletLogin.url, {
          code: res.code,
          encryptedData: encryptedData,
          iv: iv
        }, res => {
          if (!!res.data.result.token) {
            wx.setStorageSync('accessToken', res.data.result.token)
            that.index_taster()
          }
        })
      }
    })
  },
  // 获取用户信息
  index_taster() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    fun_ref.get(fun_config.index_taster.url, {}, res => {
      wx.setStorageSync('user', res.data);
      wx.setStorageSync('authorization', true);
      if (!!res.data.taster) {
        this.setData({
          name: wx.getStorageSync('user').taster.name,
          head_sculpture: wx.getStorageSync('user').taster.pic,
          signature: wx.getStorageSync('user').taster.signature,
          apply: wx.getStorageSync('user').tasterId,
          balance: wx.getStorageSync('user').taster.balance,
        }, function () {
          if (!this.data.signature) {
            this.setData({
              signature: false
            })
          }
        })
      } else {
        this.setData({
          name: wx.getStorageSync('user').name,
          head_sculpture: wx.getStorageSync('user').avatarPic,
        })
      }
      this.setData({
        authorization: true,
        gender: wx.getStorageSync('user').sex,
      }, function () {
        Toast.clear();
      })
    })
  },
  // 去更改页面更改信息
  alter(e) {
    wx.navigateTo({
      url: `../alter_page/alter_page?type=signature`
    })
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