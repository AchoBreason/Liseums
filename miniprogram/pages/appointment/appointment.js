const app = getApp();

Page({
  data: {
    language: 'zh',
    date: '',
    time: '',
    notes: ''
  },

  onLoad() {
    this.setData({ language: app.globalData.language });
  },

  onDateChange(e) {
    this.setData({ date: e.detail.value });
  },

  onTimeChange(e) {
    this.setData({ time: e.detail.value });
  },

  onNotesInput(e) {
    this.setData({ notes: e.detail.value });
  },

  async submitAppointment() {
    const { date, time, notes } = this.data;
    const isZh = this.data.language === 'zh';

    if (!date || !time) {
      wx.showToast({ title: isZh ? '请选择日期和时间' : 'Please select date and time', icon: 'none' });
      return;
    }

    const scheduledAt = `${date}T${time}:00.000Z`;

    try {
      await app.createAppointment(scheduledAt, notes);
      wx.showToast({ title: isZh ? '预约成功' : 'Booked successfully' });
      setTimeout(() => wx.navigateBack(), 1500);
    } catch (err) {
      wx.showToast({ title: isZh ? '预约失败' : 'Booking failed', icon: 'none' });
    }
  }
});
