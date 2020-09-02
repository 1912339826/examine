// pages/shopping_trolley/shopping_trolley.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [{
      "id": "1",
      "userId": "c72e7f22219d4864998316af08dba02c",
      "tasterId": null,
      "videoId": "e7e4cd18842249ed9febeb2de32b0fba",
      "orderNo": "1111111",
      "createTime": 1599041637000,
      "cover": "https://jason-blog.oss-cn-hangzhou.aliyuncs.com/imgs/4.jpg",
      "title": "短视频制作服务",
      "price": 0.02,
      "video": "fbc24a9ce71c41c18ae69e177f34680a"
    }]
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
      title: '全部订单'
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