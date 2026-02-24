// pages/index/index.js
const app = getApp();

Page({
  data: {
    language: 'zh',
    banners: [
      { id: 1, image: '/assets/images/banner1.jpg', title: '记录你的高光时刻' },
      { id: 2, image: '/assets/images/banner2.jpg', title: '让故事成为永恒' }
    ],
    features: [],
    recentCases: []
  },
  
  onLoad() {
    this.setData({
      language: app.globalData.language
    });
    
    this.loadData();
  },
  
  onShow() {
    this.setData({
      language: app.globalData.language
    });
  },
  
  loadData() {
    const isZh = this.data.language === 'zh';
    
    this.setData({
      features: [
        {
          icon: '/assets/icons/ai.png',
          title: isZh ? 'AI筛选' : 'AI Screening',
          desc: isZh ? '发现你的高光时刻' : 'Discover your highlights',
          price: isZh ? '¥59' : '$9.99',
          path: '/pages/screening/screening'
        },
        {
          icon: '/assets/icons/book.png',
          title: isZh ? '人生传记' : 'Life Biography',
          desc: isZh ? '定制你的故事书' : 'Your personalized story',
          price: isZh ? '¥199' : '$29.99',
          path: '/pages/appointment/appointment'
        },
        {
          icon: '/assets/icons/avatar.png',
          title: isZh ? 'AI分身' : 'AI Avatar',
          desc: isZh ? '与过去的自己对话' : 'Talk to your past self',
          price: isZh ? '¥199/月' : '$29.99/mo',
          path: '/pages/profile/profile'
        }
      ],
      recentCases: [
        { name: '张三', highlight: '从0到1创业成功', time: '2小时前' },
        { name: '李四', highlight: '环游世界30国', time: '1天前' },
        { name: '王五', highlight: '战胜病魔重获新生', time: '3天前' }
      ]
    });
  },
  
  // 跳转到筛选
  goToScreening(e) {
    const { path } = e.currentTarget.dataset;
    wx.navigateTo({ url: path });
  },
  
  // 跳转到Web
  goToWeb() {
    wx.navigateToMiniProgram({
      appId: 'your-web-app-id',
      path: 'pages/index/index'
    });
  },
  
  // 语言切换
  switchLanguage() {
    const newLang = this.data.language === 'zh' ? 'en' : 'zh';
    this.setData({ language: newLang });
    app.globalData.language = newLang;
    this.loadData();
  }
});
