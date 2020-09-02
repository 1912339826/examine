// pages/store/store.js
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
    lists: [{
      catId: "1111",
      categoryName: "新闻",
      cover: "https://jason-blog.oss-cn-hangzhou.aliyuncs.com/images/2020/05/23/toux.png",
      id: "ca35bc4277f04698bc327ca891a61b05",
      introduction: "测试",
      isLikes: null,
      likes: 0,
      price: 200,
      title: "测试11111",
      videoId: "2c6fc60198ed4c41a2464cd9eb7bd54a"
    }],
    totalPage: 1
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
      title: '商城'
    })
    // 测试数据清空
    this.setData({
      lists: []
    })
    this.myMall()
  },
  // 获取商品
  myMall() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    fun_ref.get(fun_config.getVideoList.url, {
      pageNo: this.data.pageNo,
      pageSize: 4
    }, res => {
      let arr = this.data.lists;
      let newarr = arr.concat(res.data.result.data)
      this.setData({
        lists: newarr,
        totalPage: res.data.result.totalPage
      }, function () {
        Toast.clear();
      })

    })
  },
  // 取消点赞
  cancelLikes(e) {
    console.log(e.currentTarget.dataset)
    fun_ref.post(fun_config.cancelLikes.url, {
      userId: wx.getStorageSync('user').id,
      videoId: e.currentTarget.dataset.videoid
    }, res => {
      if (res.data.success) {
        let lists = this.data.lists;
        lists[e.currentTarget.dataset.index].isLikes = null;
        lists[e.currentTarget.dataset.index].likes--
        this.setData({
          lists: lists
        })
      }
    })
  },
  // 点赞
  addLikes(e) {
    console.log(e.currentTarget.dataset)
    fun_ref.post(fun_config.addLikes.url, {
      userId: wx.getStorageSync('user').id,
      videoId: e.currentTarget.dataset.videoid
    }, res => {
      if (res.data.success) {
        let lists = this.data.lists;
        lists[e.currentTarget.dataset.index].isLikes = true;
        lists[e.currentTarget.dataset.index].likes++
        this.setData({
          lists: lists
        })
      }
    })
  },
  // 播放
  play(e) {
    console.log(e.currentTarget.dataset)
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
        this.myMall()
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})