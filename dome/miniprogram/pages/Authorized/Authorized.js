// pages/Authorized/Authorized.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page_name: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "授权登录" //页面标题为路由参数
    })
    let that = this;
    this.setData({
      page_name: options.page_name
    })
    wx.getSetting({
      success(res) {
        // 是否授过权
        let userInfo = res.authSetting["scope.userInfo"]
        if (userInfo) { //&&用户Token
          wx.redirectTo({
            url: `../information/information`,
          })
        } else {
          that.getUserInfo()
        }
      }
    })
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
  onGotUserInfo(e) {
    let message = e.detail.errMsg
    if (message == "getUserInfo:ok") {
      // 允许
      this.getUserInfo()
    } else {
      // 拒绝
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
    fun_ref.get(fun_config.index_taster.url, {}, res => {
      console.log(res)
      wx.setStorageSync('user', res.data)
      wx.redirectTo({
        url: `../information/information`,
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