// pages/my/my.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorization: wx.getStorageSync('authorization'),
    apply: wx.getStorageSync('user').taster,
    name: wx.getStorageSync('user').name,
    gender: wx.getStorageSync('user').sex,
    head_sculpture: wx.getStorageSync('user').avatarPic,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.head_sculpture)
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
    console.log(e.currentTarget.dataset.name)
    if (e.currentTarget.dataset.name == "store") {
      wx.redirectTo({
        url: `../${e.currentTarget.dataset.name}/${e.currentTarget.dataset.name}`
      });
    } else {
      wx.navigateTo({
        url: `../${e.currentTarget.dataset.name}/${e.currentTarget.dataset.name}`
      });
    }
  },
  log(e) {
    let message = e.detail.errMsg
    if (message == "getUserInfo:ok") {
      // 允许
      this.getUserInfo()
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
      apply: wx.getStorageSync('user').tasterId
    })
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
    fun_ref.get(fun_config.index_taster.url, {}, res => {
      console.log(res)
      wx.setStorageSync('user', res.data);
      wx.setStorageSync('authorization', true);
      this.setData({
        authorization: true,
        name: wx.getStorageSync('user').name,
        gender: wx.getStorageSync('user').sex,
        head_sculpture: wx.getStorageSync('user').avatarPic
      })
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