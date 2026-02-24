const app = getApp();

Page({
  data: {
    language: 'zh',
    userInfo: null
  },

  onLoad() {
    this.setData({
      language: app.globalData.language,
      userInfo: app.globalData.userInfo
    });
  },

  onShow() {
    this.setData({ userInfo: app.globalData.userInfo });
  },

  login() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        this.setData({ userInfo: res.userInfo });
        app.loginWithWechat(res.userInfo);
      }
    });
  },

  goToAppointment() {
    wx.navigateTo({ url: '/pages/appointment/appointment' });
  },

  goToResult() {
    wx.navigateTo({ url: '/pages/result/result' });
  }
});
