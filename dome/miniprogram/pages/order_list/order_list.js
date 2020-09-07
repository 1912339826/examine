// pages/shopping_trolley/shopping_trolley.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    totalPage: 1,
    lists: [{
      "id": "1",
      "userId": "c72e7f22219d4864998316af08dba02c",
      "tasterId": "111",
      "videoId": "e7e4cd18842249ed9febeb2de32b0fba",
      "orderNo": "1111111",
      "createTime": 1599041637000,
      "video": {
        "createTime": 1599013296000,
        "updateTime": 1599013296000,
        "createBy": "e89325119fa411e89e43525400557291",
        "id": "e7e4cd18842249ed9febeb2de32b0fba",
        "title": "短视频制作服务",
        "introduction": "短视频制作服务剪辑代做淘宝产品拍摄后期主图企业宣传片MG动画AE",
        "catId": "1111",
        "videoId": "fbc24a9ce71c41c18ae69e177f34680a",
        "likes": 0,
        "price": 0.02,
        "cashback": 0.01,
        "cover": "https://jason-blog.oss-cn-hangzhou.aliyuncs.com/imgs/4.jpg"
      }
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
    this.setData({
      lists:[]
    })
    this.list_order();
  },
  list_order() {
    fun_ref.get(fun_config.list_order.url, {
      pageNo: this.data.pageNo,
      pageSize: 10
    }, res => {
      let arr = this.data.lists;
      for (let index = 0; index < res.data.result.data.length; index++) {
        const element = res.data.result.data[index];
        element.timestamp = this.timestamp(element.createTime)
      }
      let newarr = arr.concat(res.data.result.data)
      this.setData({
        lists: newarr,
        totalPage: res.data.result.totalPage
      })
    })
  },
  timestamp(time) {
    let isdata = new Date(time)
    var y = isdata.getFullYear();
    var m = isdata.getMonth() + 1;
    var d = isdata.getDate();
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    return `${y}-${m}-${d}`
  },
  play(e) {
    wx.navigateTo({
      url: '../play/play?videoId=' + e.currentTarget.dataset.id + "&&title=" + e.currentTarget.dataset.title + "&&introduction=" + e.currentTarget.dataset.introduction + "&&price=" + e.currentTarget.dataset.price,
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
    let pageNo = this.data.pageNo + 1;
    if (this.data.totalPage < pageNo) {
      console.log(pageNo)
    } else {
      this.setData({
        pageNo: pageNo
      }, function () {
        this.list_order()
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})