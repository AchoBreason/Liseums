const app = getApp();

Page({
  data: {
    language: 'zh',
    report: null
  },

  onLoad() {
    this.setData({ language: app.globalData.language });
    const report = wx.getStorageSync('screening_report');
    if (report) {
      this.setData({ report });
    }
  },

  goToAppointment() {
    wx.navigateTo({ url: '/pages/appointment/appointment' });
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
