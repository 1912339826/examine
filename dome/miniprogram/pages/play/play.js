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
    title: "",
    introduction: "",
    price: "",
    owned: false,
    taster: wx.getStorageSync('user').taster,
    tasterId: wx.getStorageSync('user').tasterId,
    videoId: ""
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
      price: options.price,
      videoId: options.videoId
    })
    this.play_video_vod(options.videoId)
  },
  play_video_vod(videoId) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    fun_ref.get(fun_config.play_video_vod.url, {
      videoId: videoId
    }, res => {
      console.log(res)
      this.setData({
        src: res.data.result
      }, function () {
        let arr = this.data.src.split("&")
        if (arr[arr.length - 1].split("=")[0] == "end") {
          // 30s视频
          this.setData({
            owned: false
          })
        } else {
          this.setData({
            owned: true
          })
        }
        Toast.clear();
      })
    })
  },
  // 当播放到末尾时
  ended() {
    console.log("111")
  },
  // 点击购买或者申请按钮
  pay() {
    if (!!taster) {
      // 申请
      this.wxPay_pay(this.data.tasterId)
    } else {
      // 购买
      this.wxPay_pay("")
    }
  },
  wxPay_pay(tasterId) {
    fun_ref.get(fun_config.wxPay_pay.url, {
      videoId: this.data.videoId,
      tasterId: tasterId
    }, res => {
      console.log(res)
      // this.requestPayment()
    })
  },
  // requestPayment(nonceStr, package, paySign, timeStamp) {
  //   wx.wx.requestPayment({
  //     nonceStr: nonceStr,
  //     package: package,
  //     paySign: paySign,
  //     timeStamp: timeStamp,
  //     signType: "MD5",
  //     success: (res) => {
  //       Toast.success("支付成功！");
  //       this.play_video_vod(this.data.videoId)
  //     },
  //     fail: (res) => {
  //       Toast.fail('支付失败！');
  //     }
  //   })
  // },


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