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
    totalPage: 1,
    taster: false,
    getList_ad_list: [],
    show: false,
    list_category_list: [],
    list_category_change: {
      id: ""
    },
    sheet_show: false,
    sheet_actions: [{
      name: '购买'
    }, {
      name: '申请'
    }],
    change_list: {}
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
    this.getList_ad()
    // 测试数据清空
    this.setData({
      lists: []
    })
    this.myMall(this.data.list_category_change)
    this.list_category()
  },
  // 获取商品
  myMall(id) {
    let catId;
    // if (!!id.id) {
    catId = id.id
    // } else {
    // catId = ""
    // }
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    fun_ref.get(fun_config.getVideoList.url, {
      pageNo: this.data.pageNo,
      pageSize: 4,
      catId: catId
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
    if (wx.getStorageSync('authorization')) {
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
    } else {
      Toast.fail("未登录")
      setTimeout(() => {
        wx.redirectTo({
          url: '../my/my',
        })
      }, 500);
    }

  },
  // 点赞
  addLikes(e) {
    if (wx.getStorageSync('authorization')) {
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
    } else {
      Toast.fail("未登录")
      setTimeout(() => {
        wx.redirectTo({
          url: '../my/my',
        })
      }, 500);
    }

  },
  // 播放
  play(e) {
    if (wx.getStorageSync('authorization')) {
      wx.navigateTo({
        url: '../play/play?videoId=' + e.currentTarget.dataset.id + "&&title=" + e.currentTarget.dataset.title + "&&introduction=" + e.currentTarget.dataset.introduction + "&&price=" + e.currentTarget.dataset.price + "&&id=" + e.currentTarget.dataset.isid + "&&type=" + e.currentTarget.dataset.type + "&&cover=" + e.currentTarget.dataset.cover + "&&own=" + e.currentTarget.dataset.own,
      })
    } else {
      Toast.fail("未登录")
      setTimeout(() => {
        wx.redirectTo({
          url: '../my/my',
        })
      }, 500);
    }
  },
  purchase(e) {
    if (wx.getStorageSync('authorization')) {
      this.setData({
        change_list: e.currentTarget.dataset
      })
      if (e.currentTarget.dataset.taster) {
        // 点击了 购买/申请 按钮
        this.behavior(e)
      } else {
        // 购买
        if (e.currentTarget.dataset.type == 1) {
          // 普通商品需要进入详情页进行下一步操作
          wx.navigateTo({
            url: '../play/play?videoId=' + e.currentTarget.dataset.id + "&&title=" + e.currentTarget.dataset.title + "&&introduction=" + e.currentTarget.dataset.introduction + "&&price=" + e.currentTarget.dataset.price + "&&id=" + e.currentTarget.dataset.isid + "&&type=" + e.currentTarget.dataset.type + "&&cover=" + e.currentTarget.dataset.cover + "&&own=" + e.currentTarget.dataset.own,
          })
        } else if (e.currentTarget.dataset.type == 0) {
          // 视频商品可以在本页面直接进行购买行为
          this.wxPay_pay(e.currentTarget.dataset.isid, e.currentTarget.dataset.price)
        }
      }
    } else {
      Toast.fail("未登录")
      setTimeout(() => {
        wx.redirectTo({
          url: '../my/my',
        })
      }, 500);
    }

  },

  // 点击选
  behavior(e) {
    let sheet_actions = this.data.sheet_actions
    this.setData({
      sheet_show: true
    }, function () {
      if (e.currentTarget.dataset.own) {
        sheet_actions[0] = {
          name: '已购买',
          disabled: true
        }
      }
      if (e.currentTarget.dataset.isapplication) {
        sheet_actions[1] = {
          name: '已申请',
          disabled: true
        }
      } else {
        sheet_actions[1] = {
          name: '申请'
        }
      }
      this.setData({
        sheet_actions: sheet_actions
      })
    })
  },

  select_fun(e) {
    if (e.detail.name == "购买") {
      // 视频商品可以在本页面直接进行购买行为
      this.wxPay_pay(this.data.change_list.isid, this.data.change_list.price)
    } else if (e.detail.name == "申请") {
      this.bindVideo_taster(this.data.change_list.isid)
    }
    this.sheet_cancel()
  },
  // 点击取消
  sheet_cancel() {
    this.setData({
      sheet_show: false
    })
  },

  sheet_overlay() {
    this.sheet_cancel()
  },


  bindVideo_taster(id) {
    fun_ref.post(fun_config.bindVideo_taster.url, {
      videoId: id
    }, res => {
      if (res.data.message == "") {
        Toast.success('申请成功！');
      } else {
        Toast.fail(res.data.message);
      }
    })
  },

  wxPay_pay(id, price) {
    fun_ref.post(fun_config.wxPay_pay.url, {
      videoId: id,
      tasterId: "",
      price: price,
      count: 1
    }, res => {
      if (res.data.success) {
        this.requestPayment(res.data.result.timeStamp, res.data.result.nonceStr, res.data.result.package, res.data.result.sign)
      } else {
        Toast.fail(res.data.message);
      }
    })
  },

  requestPayment(timeStamp, nonceStr, result_package, paySign) {
    let that = this
    wx.requestPayment({
      nonceStr: nonceStr,
      package: result_package,
      paySign: paySign,
      timeStamp: timeStamp,
      signType: "MD5",
      success: (res) => {
        console.log(res)
        Toast.success("支付成功！");
        if (that.data.change_list.type == 0) {
          that.setData({
            pageNo: 1,
            lists:[],
            sheet_show:false
          }, function () {
            that.myMall(that.data.list_category_change)
          })
        }
      },
      fail: (err) => {
        console.log(err)
        Toast.fail('支付失败！');
      }
    })
  },
  // 广告
  getList_ad() {
    fun_ref.get(fun_config.getList_ad.url, {}, res => {
      this.setData({
        getList_ad_list: res.data.result
      })
    })
  },
  // 广告详情
  getList_ad_fn(e) {
    wx.navigateTo({
      url: '../information_details/information_details?id=' + e.currentTarget.dataset.id + "&&type=advertising"
    })
  },
  // 类别
  category() {
    if (wx.getStorageSync('authorization')) {
      this.setData({
        show: true
      })
    } else {
      Toast.fail("未登录")
      setTimeout(() => {
        wx.redirectTo({
          url: '../my/my',
        })
      }, 500);
    }

  },
  cancel() {
    this.onClose()
  },
  confirm(e) {
    this.setData({
      list_category_change: e.detail.value
    }, function () {
      this.setData({
        lists: [],
        totalPage: 1,
        pageNo: 1
      })
      this.myMall(this.data.list_category_change)
    })
    this.onClose()
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  // 获取商品类别
  list_category() {
    fun_ref.get(fun_config.list_category.url, {}, res => {
      let list_category_list = [{
        id: "",
        text: "全部",
        name: "全部"
      }]
      for (let index = 0; index < res.data.result.length; index++) {
        const element = res.data.result[index];
        element.text = element.name
      }
      this.setData({
        list_category_list: list_category_list.concat(res.data.result)
      })
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
    let pageNo = this.data.pageNo + 1;
    if (this.data.totalPage < pageNo) {
      console.log(pageNo)
    } else {
      this.setData({
        pageNo: pageNo
      }, function () {
        this.myMall(this.data.list_category_change)
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})