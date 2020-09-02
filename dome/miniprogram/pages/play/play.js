// pages/play/play.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "",
    title:"",
    introduction:"",
    price:""
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
      title: options.title
    })
    this.setData({
      title: options.title,
      introduction: options.introduction,
      price:options.price
    })
    this.play_video_vod(options.videoId)
    // this.play_video_vod("2450c42221d34b28b919fd0bf2d7bd41")
  },
  play_video_vod(videoId) {
    fun_ref.get(fun_config.play_video_vod.url, {
      videoId: videoId
    }, res => {
      console.log(res)
      this.setData({
        src: res.data.result
      })
    })
  },
  // 当播放到末尾时
  ended() {
    console.log("111")
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})