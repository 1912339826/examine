// pages/information_details/information_details.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
const fun_time = app.time.default.time
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    title: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    // this.getInfo_news("bd1a53bbb8e447c3a486be660c798c29")
    if (options.type == "information") {
      this.getInfo_news(options.id)
    } else {
      this.getInfo_ad(options.id)
    }
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#395996'
    })
  },
  getInfo_news(id) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    fun_ref.get(fun_config.getInfo_news.url, {
      newsId: id
    }, res => {
      this.setData({
        content: res.data.result.content.replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img$1 class="pho"'),
        title: res.data.result.title
      }, function () {
        wx.setNavigationBarTitle({
          title: res.data.result.title
        })
        Toast.clear();
      })
    })
  },
  // 广告
  getInfo_ad(id) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    fun_ref.get(fun_config.getInfo_ad.url, {
      id: id
    }, res => {
      this.setData({
        content: res.data.result.content.replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img$1 class="pho"'),
        title: res.data.result.title
      }, function () {
        wx.setNavigationBarTitle({
          title: res.data.result.title
        })
        Toast.clear();
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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