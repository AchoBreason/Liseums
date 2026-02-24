// app.js - 人生切片小程序
App({
  onLaunch() {
    // 检查登录状态
    this.checkLoginStatus();
    
    // 获取用户设置
    this.getUserSettings();
  },
  
  globalData: {
    // =====================================================
    // ⚠️ 请在此处填入你的配置
    // =====================================================
    
    // Supabase 配置
    supabaseUrl: 'https://YOUR_PROJECT.supabase.co',
    supabaseKey: 'YOUR_ANON_KEY',
    
    // N8N Webhook 地址（本地: http://localhost:5678/webhook）
    n8nBaseUrl: 'http://localhost:5678/webhook',

    // 测试用：Supabase users 表中已创建用户的 UUID，见 docs/SETUP.md
    testUserId: '',
    
    // MiniMax API Key (在N8N中配置)
    minimaxApiKey: '',
    
    // =====================================================
    // 以下通常不需要修改
    // =====================================================
    
    userInfo: null,
    isLoggedIn: false,
    language: 'zh', // 'zh' 或 'en'
    
    // 支付配置
    pricing: {
      screening: { zh: 5900, en: 999 },    // 分
      book: { zh: 19900, en: 2999 },
      avatar: { zh: 19900, en: 2999 }
    }
  },
  
  // 检查登录状态
  checkLoginStatus() {
    const token = wx.getStorageSync('auth_token');
    if (token) {
      this.globalData.isLoggedIn = true;
      this.getUserInfo();
    }
  },
  
  // 获取用户设置
  getUserSettings() {
    const systemInfo = wx.getSystemInfoSync();
    const language = systemInfo.language.includes('en') ? 'en' : 'zh';
    this.globalData.language = language;
  },
  
  // 获取用户信息
  getUserInfo() {
    const that = this;
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        that.globalData.userInfo = res.userInfo;
        that.loginWithWechat(res.userInfo);
      },
      fail: () => {
        // 用户拒绝授权，仍可继续使用
        console.log('用户拒绝授权');
      }
    });
  },
  
  // 微信登录
  loginWithWechat(userInfo) {
    const that = this;
    
    // 获取 code
    wx.login({
      success: (res) => {
        if (res.code) {
          // 发送到后端换取 token
          that.request({
            url: `${that.globalData.supabaseUrl}/rest/v1/users`,
            method: 'POST',
            data: {
              wx_code: res.code,
              name: userInfo?.nickName || '用户',
              avatar_url: userInfo?.avatarUrl || ''
            },
            success: (response) => {
              // 保存 token
              wx.setStorageSync('auth_token', response.data.token);
              that.globalData.isLoggedIn = true;
            }
          });
        }
      }
    });
  },
  
  // 发起请求
  request(options) {
    const defaultOptions = {
      header: {
        'Content-Type': 'application/json',
        'apikey': this.globalData.supabaseKey,
        'Authorization': `Bearer ${wx.getStorageSync('auth_token') || this.globalData.supabaseKey}`
      },
      timeout: 30000
    };
    
    return wx.request({ ...defaultOptions, ...options });
  },
  
  // 发起筛选请求 (调用 N8N Webhook)
  async startScreening() {
    let userId = this.globalData.testUserId || wx.getStorageSync('user_id');
    if (!userId) {
      userId = 'wx_' + Date.now();
      wx.setStorageSync('user_id', userId);
    }
    const language = this.globalData.language;

    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.globalData.n8nBaseUrl}/screening-start`,
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        data: {
          userId: userId,
          language: language,
          paymentStatus: 'paid'
        },
        success: (res) => resolve(res.data || res),
        fail: (err) => reject(err)
      });
    });
  },
  
  // 发送筛选回答
  async sendScreeningAnswer(sessionId, answer, questionIndex) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.globalData.n8nBaseUrl}/screening-response`,
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        data: {
          sessionId: sessionId,
          answer: answer,
          questionIndex: questionIndex
        },
        success: (res) => resolve(res.data || res),
        fail: (err) => reject(err)
      });
    });
  },
  
  // 微信支付
  wxPay(orderId, amount) {
    return new Promise((resolve, reject) => {
      // 1. 先获取支付参数
      this.request({
        url: `${this.globalData.supabaseUrl}/functions/v1/create-payment`,
        method: 'POST',
        data: { orderId, amount },
        success: (res) => {
          if (res.data.success) {
            // 2. 调用微信支付
            wx.requestPayment({
              ...res.data.paymentParams,
              success: () => resolve(true),
              fail: (err) => reject(err)
            });
          } else {
            reject(new Error(res.data.message));
          }
        },
        fail: reject
      });
    });
  },
  
  // 获取用户订单
  getOrders() {
    const userId = wx.getStorageSync('user_id');
    return new Promise((resolve, reject) => {
      this.request({
        url: `${this.globalData.supabaseUrl}/rest/v1/orders?user_id=eq.${userId}&order=created_at.desc`,
        success: (res) => resolve(res.data),
        fail: reject
      });
    });
  },
  
  // 获取筛选会话
  getScreeningSession() {
    const userId = wx.getStorageSync('user_id');
    return new Promise((resolve, reject) => {
      this.request({
        url: `${this.globalData.supabaseUrl}/rest/v1/screening_sessions?user_id=eq.${userId}&order=created_at.desc&limit=1`,
        success: (res) => resolve(res.data?.[0] || null),
        fail: reject
      });
    });
  },
  
  // 预约采访
  createAppointment(scheduledAt, notes) {
    const userId = wx.getStorageSync('user_id');
    return new Promise((resolve, reject) => {
      this.request({
        url: `${this.globalData.supabaseUrl}/rest/v1/appointments`,
        method: 'POST',
        data: {
          user_id: userId,
          scheduled_at: scheduledAt,
          notes: notes,
          status: 'pending'
        },
        success: (res) => resolve(res.data),
        fail: reject
      });
    });
  }
});
