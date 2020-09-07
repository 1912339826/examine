// pages/friend_circle/friend_circle.js
const app = getApp();
const fun_ref = app.ref.default;
const fun_config = app.config.default;
const tiem = app.time.default.time;
import Toast from '@vant/weapp/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    figure_set: [],
    title: false,
    id: "",
    name: "",
    pic: "",
    lists: [],
    totalPage: 1,
    pageNo: 1,
    // 今天的时间（2020822）
    Todays_date: "",
    circles_img_id: "",
    textarea_value: "",
    textarea_: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      id,
      name,
      pic
    } = options;
    this.setData({
      id,
      name,
      pic
    }, function () {

    })
  },
  // 去发动态
  publish() {
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  back() {
    wx.navigateBack({
      delta: 1,
    })
  },
  handletouchtart(e) {
    // 开始滑动
  },
  handletouchmove(e) {
    // 滑动中
    this.setData({
      // 页面滚动，评论弹窗按钮清除
      circles_img_id: null
    })
  },
  handletouchend(e) {
    // 结束滑动
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  circleFriends_list() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })

    fun_ref.get(fun_config.circleFriends_list.url, {
      pageNo: this.data.pageNo,
      pageSize: 8,
      userId: this.data.id
      // userId: "eb0fc0b43d6447f4b77702309f642293"
    }, res => {
      let arr = this.data.lists;
      let newarr = arr.concat(res.data.result.data)
      this.setData({
        lists: newarr,
        totalPage: res.data.result.totalPage
      }, function () {
        for (let index = 0; index < this.data.lists.length; index++) {
          const element = this.data.lists[index];
          element.string_time = this.disconnecting_time(element.createTime);
        }
        this.setData({
          figure_set: this.sort_pro(this.data.lists, ['string_time'])
        }, function () {
          Toast.clear();
        })
      })
    })
  },
  getList_circleFriends() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    })
    fun_ref.get(fun_config.getList_circleFriends.url, {
      pageNo: this.data.pageNo,
      pageSize: 8,
    }, res => {
      let arr = this.data.lists;
      let newarr = arr.concat(res.data.result.data)
      this.setData({
        lists: newarr,
        totalPage: res.data.result.totalPage
      }, function () {
        for (let index = 0; index < this.data.lists.length; index++) {
          const element = this.data.lists[index];
          element.string_time = this.disconnecting_time(element.createTime);
        }
        this.setData({
          figure_set: this.sort_pro(this.data.lists, ['string_time'])
        }, function () {
          Toast.clear();
        })
      })
    })
  },
  // 把对象数组按照某一个属性（或某几个属性）进行分类
  sort_pro(data, keys = []) { //keys可以传一个数组
    var c = [];
    var d = {};
    for (var element of data) {
      let element_keyStr = "";
      let element_key = [];
      let element_keyObj = {};
      for (var key of keys) {
        element_key.push(element[key]);
        element_keyObj[key] = element[key];
      }
      element_keyStr = element_key.join("_");
      if (!d[element_keyStr]) {
        c.push({
          ...element_keyObj,
          children: [element]
        });
        d[element_keyStr] = element;
      } else {
        for (var ele of c) {
          let isTrue = keys.some(key => {
            return ele[key] != element[key];
          });
          if (!isTrue) {
            ele.children.push(element);
          }
        }
      }
    }
    return c;
  },
  // 拼接时间
  disconnecting_time(data) {
    let {
      getDate,
      getFullYear,
      getMonth,
    } = tiem(data)
    let string_time = `${getFullYear}${getMonth}${getDate}`
    return string_time
  },
  // 非冒泡
  circles_(e) {
    if (this.data.circles_img_id == e.currentTarget.dataset.id) {
      this.setData({
        circles_img_id: null
      })
    } else {
      this.setData({
        circles_img_id: e.currentTarget.dataset.id
      })
    }
  },
  PL_img(e) {
    this.setData({
      textarea_: e.currentTarget.dataset.id
    })
  },
  // 评论
  add_comment(e) {
    // 当前动态的id
    // console.log(e.currentTarget.dataset.id)
    // 从今天算起的index
    // console.log(e.currentTarget.dataset.indexs)
    // 某天的第indexs个动态
    // console.log(e.currentTarget.dataset.index)
    if (this.data.textarea_value != "") {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      fun_ref.post(fun_config.add_comment.url, {
        circleFriendsId: e.currentTarget.dataset.id,
        content: this.data.textarea_value
      }, res => {
        let figure_set = this.data.figure_set;
        if (res.data.success) {
          figure_set[e.currentTarget.dataset.indexs]["children"][e.currentTarget.dataset.index]["circleFriendsComments"].push({
            name: wx.getStorageSync('user').name,
            content: this.data.textarea_value
          })
          this.setData({
            figure_set: figure_set,
            textarea_: null,
            textarea_value: ""
          })
          Toast.clear();
        }
      })
    } else {

    }
  },
  // 点击了祖先层
  ancestral_B() {
    this.setData({
      circles_img_id: null
    })
  },
  textarea_input(e) {
    this.setData({
      textarea_value: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      pageNo: 1,
      figure_set: [],
      lists: []
    }, function () {
      var timestamp = Date.parse(new Date());
      this.setData({
        Todays_date: this.disconnecting_time(timestamp)
      }, function () {
        if (!!this.data.id) {
          this.circleFriends_list()
        } else {
          this.getList_circleFriends()
          this.setData({
            name: wx.getStorageSync('user').name,
            pic: wx.getStorageSync('user').avatarPic
          })
        }
      })
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
        if (!!this.data.id) {
          this.circleFriends_list()
        } else {
          this.getList_circleFriends()
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})