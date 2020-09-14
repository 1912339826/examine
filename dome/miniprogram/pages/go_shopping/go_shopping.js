// pages/go_shopping/go_shopping.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover: "http://llc.njqiahao.com/pic/1599704813982.jpg",
    id: "890a381f1c324cdfa27819a223d9bc54",
    price: "0.01",
    title: "短视频制作剪辑",
    total: 0,
    number: 1,
    tasterId: false,
    name: "",
    phone: "",
    address: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let {
      cover,
      id,
      price,
      title,
      tasterId
    } = options

    this.setData({
      cover: cover,
      id: id,
      price: Number(price),
      title: title,
      total: 1 * Number(price),
      tasterId
    })

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#395996'
    })
    wx.setNavigationBarTitle({
      title: '购买'
    })
  },
  onChange(event) {
    this.setData({
      number: event.detail,
      total: event.detail * Number(this.data.price)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 地址
  address_fun(e) {
    this.setData({
      address: e.detail.value
    })
  },
  shopping() {
    console.log(this.data.id, this.data.tasterId , this.data.number, this.data.price, this.data.name, this.data.phone, this.data.address)
    this.wxPay_pay()
  },
  wxPay_pay() {
    let tasterId;
    if (this.data.tasterId!="undefined") {
      tasterId = this.data.tasterId
    } else {
      tasterId = ""
    }
    if (this.data.name == "") {
      Toast.fail("请填写姓名");
      return
    }
    if (this.data.phone == "") {
      Toast.fail("请填写联系方式");
      return
    }
    if (this.data.address == "") {
      Toast.fail("请填写地址");
      return
    }
    fun_ref.post(fun_config.wxPay_pay.url, {
      videoId: this.data.id,
      tasterId: tasterId,
      count: this.data.number,
      price: this.data.price,
      name: this.data.name,
      phone: this.data.phone,
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
        Toast.success("支付成功！");
        wx.navigateBack({
          delta: 1,
        })
      },
      fail: (err) => {
        Toast.fail('支付失败！');
      }
    })
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