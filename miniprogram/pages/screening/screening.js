// pages/screening/screening.js
const app = getApp();

const QUESTIONS = {
  zh: [
    '最近让你最有成就感的一件事情是什么？',
    '如果让你选一个人生中最骄傲的时刻，会是什么？',
    '有没有一段时间，你觉得自己的生活特别精彩？',
    '你经历过最大的挑战是什么？你是怎么度过的？',
    '有没有一个人对你的影响特别大？',
    '你做过最疯狂/最大胆的事情是什么？',
    '如果让你重新选择，你会做什么不同的决定？',
    '什么事情让你做起来会忘记时间？',
    '你有什么特长或技能是别人不知道的？',
    '如果不用考虑钱，你会做什么？',
    '你最想感谢的人是谁？为什么？',
    '你觉得自己给身边的人带来了什么？',
    '如果让你对10年前的自己说一句话，你会说什么？',
    '用三个词形容你目前的人生，你会选什么？',
    '你希望100年后，人们怎么记住你？'
  ],
  en: [
    "What recent accomplishment makes you feel most proud?",
    "If you could choose one moment you're most proud of, what would it be?",
    "Was there a period when you felt your life was especially amazing?",
    "What's the biggest challenge you've faced? How did you get through it?",
    "Has someone had a particularly big impact on you?",
    "What's the craziest/boldest thing you've ever done?",
    "If you could do things differently, what would you change?",
    "What makes you lose track of time?",
    "What skills do you have that others don't know about?",
    "If money weren't an issue, what would you do?",
    "Who do you want to thank the most? Why?",
    "What do you think you bring to the people around you?",
    "If you could say something to yourself 10 years ago, what would it be?",
    "Describe your current life in three words.",
    "How do you want people to remember you 100 years from now?"
  ]
};

Page({
  data: {
    language: 'zh',
    status: 'idle',
    sessionId: null,
    currentQuestion: {},
    questionIndex: 0,
    totalQuestions: 15,
    userAnswer: '',
    answers: [],
    messages: [],
    loading: false,
    result: null
  },

  onLoad() {
    this.setData({ language: app.globalData.language });
  },

  async startScreening() {
    const isZh = this.data.language === 'zh';

    let userId = wx.getStorageSync('user_id');
    if (!userId) {
      userId = 'wx_' + Date.now();
      wx.setStorageSync('user_id', userId);
    }

    this.setData({ status: 'paying' });

    try {
      const response = await app.startScreening();
      if (response && response.sessionId) {
        this.setData({
          status: 'answering',
          sessionId: response.sessionId,
          messages: [{ role: 'assistant', content: response.message || response.greeting }],
          currentQuestion: {
            text: response.question || QUESTIONS[this.data.language][0],
            index: 0
          },
          questionIndex: 0
        });
      } else {
        throw new Error(response?.error || 'Start failed');
      }
    } catch (err) {
      wx.showToast({ title: isZh ? '启动失败，请检查配置' : 'Failed to start', icon: 'none' });
      this.setData({ status: 'idle' });
    }
  },

  async sendAnswer() {
    const { userAnswer, sessionId, questionIndex, messages, answers } = this.data;
    if (!userAnswer || !userAnswer.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userAnswer }];
    const newAnswers = [...answers, { question: this.data.currentQuestion.text, answer: userAnswer }];

    this.setData({
      messages: newMessages,
      answers: newAnswers,
      userAnswer: '',
      loading: true
    });

    try {
      const response = await app.sendScreeningAnswer(sessionId, userAnswer, questionIndex);

      const nextIndex = questionIndex + 1;
      const questions = QUESTIONS[this.data.language];
      const aiReply = response.message || response.aiReply || (this.data.language === 'zh' ? '谢谢你的分享！' : 'Thank you for sharing!');

      const assistantMsg = { role: 'assistant', content: aiReply };
      const updatedMessages = [...newMessages, assistantMsg];

      if (response.isComplete || nextIndex >= questions.length) {
        this.setData({
          status: 'completed',
          messages: updatedMessages,
          loading: false,
          result: response
        });
      } else {
        this.setData({
          messages: updatedMessages,
          currentQuestion: { text: questions[nextIndex], index: nextIndex },
          questionIndex: nextIndex,
          loading: false
        });
      }
    } catch (err) {
      this.setData({ loading: false });
      wx.showToast({ title: this.data.language === 'zh' ? '发送失败' : 'Send failed', icon: 'none' });
    }
  },

  onInputChange(e) {
    this.setData({ userAnswer: e.detail.value });
  },

  goToResult() {
    wx.navigateTo({ url: '/pages/result/result' });
  }
});
