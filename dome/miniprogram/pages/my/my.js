// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apply:null,
    name:wx.getStorageSync('user').name,
    gender:wx.getStorageSync('user').sex,
    head_sculpture:wx.getStorageSync('user').avatarPic,
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
      apply:wx.getStorageSync('user').tasterId
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