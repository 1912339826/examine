function myrequest(url, method, param, successCallback, failCallback) {
    wx.getSetting({
        // 是否授过权
        success(res) {
            let userInfo = !!res.authSetting['scope.userInfo'];
            if (userInfo) {
                wx.setStorageSync('authorization', true);
            } else {
                wx.setStorageSync('authorization', false);
            }
        }
    })
    console.log('准备发起请求 :>> ', url);
    var _this = this;
    wx.request({
        url: url,
        data: param,
        dataType: 'json',
        method: method,
        timeout: 100000,
        header: {
            'custom-header': method,
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            "Access-Token": wx.getStorageSync('accessToken')
        },
        success: (res) => {
            if (successCallback) {
                successCallback(res);
            }
        },
        fail: (res) => {
            console.log(res)
            if (failCallback) {
                failCallback(res);
            }
        }
    });
}

export default {
    get: function (url, param, success, fail) {
        return myrequest(url, "GET", param, success, fail)
    },

    getSync: function (url, param) {
        return new Promise((resolve, reject) => {
            return myrequest(url, "GET", param, resolve, reject)
        })
    },

    post: function (url, param, success, fail) {
        return myrequest(url, "POST", param, success, fail)
    },

    postSync: function (url, param, success, fail) {
        return new Promise((resolve, reject) => {
            return myrequest(url, "POST", param, resolve, reject)
        })
    },

    put: function (url, param, success, fail) {
        return myrequest(url, "PUT", param, success, fail)
    },

    putSync: function (url, param, success, fail) {
        return new Promise((resolve, reject) => {
            return myrequest(url, "PUT", param, resolve, reject)
        })
    },
    delete: function (url, param, success, fail) {
        return myrequest(url, "DELETE", param, success, fail)
    },

    deleteSync: function (url, param, success, fail) {
        return new Promise((resolve, reject) => {
            return myrequest(url, "DELETE", param, resolve, reject)
        })
    }
}