// 值	       说明	
// develop	开发版	
// trial	体验版	
// release	正式版

let envVersion = wx.getAccountInfoSync().miniProgram.envVersion
if (!envVersion || envVersion == "develop") {
  // var BASE_URLA = "https://llc.njqiahao.com/api";
  //  var BASE_URLA = "http://106.54.252.48:8091";
  var BASE_URLA = "http://192.168.5.198:8091";
} else if (envVersion == "trial") {
  var BASE_URLA = "https://llc.njqiahao.com/api";
} else if (envVersion == "release") {
  var BASE_URLA = "https://llc.njqiahao.com/api";
}

// window.BASE_URLA = BASE_URLA;
export default {
  // baseUrl: BASE_URLA,
  BASE_URLA,
  // 资讯
  list: {
    type: "GET",
    url: `${BASE_URLA}/news/list`
  },
  // 城市（省市区）
  cityTree: {
    type: "GET",
    url: `${BASE_URLA}/city/cityTree`
  },
  // 品鉴官列表
  tasterList: {
    type: "GET",
    url: `${BASE_URLA}/taster/getList`
  },
  // 品鉴官商城 
  myMall: {
    type: "GET",
    url: `${BASE_URLA}/taster/myMall`
  },
  // 商城 
  getVideoList: {
    type: "GET",
    url: `${BASE_URLA}/video/getVideoList`
  },
  //商城中点赞 
  addLikes: {
    type: "POST",
    url: `${BASE_URLA}/video/addLikes`
  },
  //商城中取消点赞 
  cancelLikes: {
    type: "POST",
    url: `${BASE_URLA}/video/cancelLikes`
  },
  //申请品鉴官 
  tasterSubmit: {
    type: "POST",
    url: `${BASE_URLA}/taster/submit`
  },
  // 品鉴官详情
  getInfo_taster: {
    type: "GET",
    url: `${BASE_URLA}/taster/getInfo`
  },
  // 品鉴官商城
  getTasterMall_taster: {
    type: "GET",
    url: `${BASE_URLA}/taster/getTasterMall`
  },
  // 获取视频
  play_video_vod: {
    type: "GET",
    url: `${BASE_URLA}/vod/video/playTest`
  },
  // 朋友圈列表
  circleFriends_list: {
    type: "GET",
    url: `${BASE_URLA}/circleFriends/list`
  },
  // 朋友圈评论
  add_comment: {
    type: "POST",
    url: `${BASE_URLA}/comment/add`
  },
  // 小程序登录
  appletLogin: {
    type: "POST",
    url: `${BASE_URLA}/user/appletLogin`
  },
  // 用户信息
  index_taster: {
    type: "GET",
    url: `${BASE_URLA}/taster/index`
  },
  // 总部留言
  add_leaveMessage: {
    type: "POST",
    url: `${BASE_URLA}/leaveMessage/add`
  },
  // 支付
  wxPay_pay: {
    type: "POST",
    url: `${BASE_URLA}/pay/wxPay`
  },
  // 购买记录
  list_order: {
    type: "GET",
    url: `${BASE_URLA}/order/list`
  },
  // 品鉴官申请
  bindVideo_taster: {
    type: "POST",
    url: `${BASE_URLA}/taster/bindVideo`
  },
  // 用户朋友圈
  getList_circleFriends: {
    type: "GET",
    url: `${BASE_URLA}/circleFriends/getList`
  },
};