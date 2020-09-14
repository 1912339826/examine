// pages/homepage/homepage.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    introduction: "",
    name: "",
    pic: "",
    signature: "",
    specialty: "",
    teamIntroduction: "",
    cover: "",
    userId: "",
    introPic: "",
    teamPic: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo_taster(options.id)
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#395996'
    })
    wx.setNavigationBarTitle({
      title: '品鉴官主页'
    })
  },
  getInfo_taster(id) {
    fun_ref.get(fun_config.getInfo_taster.url, {
      id: id
    }, res => {
      let {
        id,
        introduction,
        name,
        pic,
        signature,
        specialty,
        teamIntroduction,
        userId,
        cover,
        introPic,
        teamPic
      } = res.data.result;
      this.setData({
        id,
        introduction,
        name,
        pic,
        signature,
        specialty,
        teamIntroduction,
        userId,
        cover,
        introPic,
        teamPic
      })
      console.log(!!this.data.teamPic)
    })
  },
  go_tasting_tube_shoppingmall() {
    wx.navigateTo({
      url: `../tasting_tube_shoppingmall/tasting_tube_shoppingmall?id=${this.data.id}&&name=${this.data.name}&&pic=${this.data.pic}`
    });
  },
  go_friend_circle() {
    wx.navigateTo({
      url: `../friend_circle/friend_circle?id=${this.data.userId}&&name=${this.data.name}&&pic=${this.data.pic}&&cover=${this.data.cover}`
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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