// pages/play/play.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
import Toast from '@vant/weapp/toast/toast';
Page({
  // type :1 其他
  /**
   * 页面的初始数据
   */
  data: {
    src: "",
    title: "",
    introduction: "",
    price: "",
    owned: false,
    taster: false,
    tasterId: false,
    videoId: "",
    id: "",
    type: 0,
    cover: ""
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
      videoId: options.videoId,
      id: options.id,
      tasterId: options.tasterId,
      type: options.type,
      cover: options.cover
    })
    this.play_video_vod(options.videoId)
  },
  play_video_vod(videoId) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    fun_ref.get(fun_config.play_video_vod.url, {
      videoId: videoId,
      type:this.data.type
    }, res => {
      this.setData({
        src: res.data.result
      }, function () {
        console.log(this.data.src)
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
    console.log("播放结束")
  },
  // 点击购买或者申请按钮
  pay(e) {
    if (e.currentTarget.dataset.taster) {
      // 申请
      this.bindVideo_taster()
    } else {
      // 购买
      this.wxPay_pay()
    }
  },
  bindVideo_taster() {
    fun_ref.post(fun_config.bindVideo_taster.url, {
      videoId: this.data.id
    }, res => {
      if (res.data.message == "") {
        Toast.success('申请成功！');
      } else {
        Toast.fail(res.data.message);
      }
    })
  },
  // 普通商品去购买页面
  go_shopping() {
    wx.navigateTo({
      url: '../go_shopping/go_shopping?cover=' + this.data.cover + "&&title=" + this.data.title + "&&price=" + this.data.price + "&&id=" + this.data.id +"&&tasterId=" + this.data.tasterId,
    })
  },
  wxPay_pay() {
    let tasterId;
    if (!!this.data.tasterId) {
      tasterId = this.data.tasterId
    } else {
      tasterId = ""
    }
    fun_ref.post(fun_config.wxPay_pay.url, {
      videoId: this.data.id,
      tasterId: tasterId,
      price:this.data.price,
      count:1
    }, res => {
      if (res.data.success) {
        this.requestPayment(res.data.result.timeStamp, res.data.result.nonceStr, res.data.result.package, res.data.result.sign)
      } else {
        Toast.fail(res.data.message);
      }
    })
  },

  requestPayment(timeStamp, nonceStr, result_package, paySign) {
    wx.requestPayment({
      nonceStr: nonceStr,
      package: result_package,
      paySign: paySign,
      timeStamp: timeStamp,
      signType: "MD5",
      success: (res) => {
        console.log(res)
        Toast.success("支付成功！");
        this.play_video_vod(this.data.videoId)
      },
      fail: (err) => {
        console.log(err)
        Toast.fail('支付失败！');
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
    this.setData({
      taster: wx.getStorageSync('user').taster
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