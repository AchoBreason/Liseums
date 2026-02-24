# 人生切片 (Life Slices) - 项目说明

> A personal legacy project capturing life highlights through AI-powered interviews, books, and AI avatars.

---

## 📌 项目概述

**项目名称**：人生切片 (Life Slices)

**核心理念**：在人生某个时间节点，采集并展示个人的高光时刻，形成独特的"人生切片"——既是一本个人传记书籍，也是一首人生主题曲，更是可以与"过去的自己"对话的AI分身。

**项目阶段**：开发中 (Phase 1)

---

## 🌏 多语言架构

### 语言分布

| 区域 | 语言 | 平台 |
|------|------|------|
| 🇨🇳 中国大陆 | 简体中文 (Simplified Chinese) | 微信小程序 + Web |
| 🇦🇺 澳洲 / 🌎 全球 | English | Web + App |

### 国际化设计

```tsx
// 语言配置
const translations = {
  zh: {
    hero: { title: "记录人生高光时刻", subtitle: "让每一个精彩瞬间成为永恒" },
    pricing: { screening: "AI筛选", book: "人生传记", avatar: "AI分身" }
  },
  en: {
    hero: { title: "Capture Your Life Highlights", subtitle: "Every brilliant moment becomes eternal" },
    pricing: { screening: "AI Screening", book: "Life Biography", avatar: "AI Avatar" }
  }
}
```

---

## 🏗️ 技术架构

### 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| **小程序** | 微信小程序 | 中国区入口 |
| **前端** | React + TypeScript | Web主站 |
| **后端工作流** | N8N | 自动化流程编排 |
| **AI引擎** | MiniMax API | 文本/语音/向量 |
| **数据库** | Supabase | 用户/订单数据 |
| **向量存储** | Qdrant | 人格向量 |
| **支付** | 微信支付 + Stripe | 国内外支付 |

### 系统架构图

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              用户层                                       │
├─────────────┬─────────────┬─────────────┬─────────────┬────────────────┤
│  微信小程序   │   Web官网   │    App     │  YouTube   │   小红书       │
│  (中国区)    │  (全球)    │   (可选)    │  (推广)    │   (推广)       │
└──────┬──────┴──────┬──────┴──────┬──────┴──────┬──────┴───────┬──────┘
       │              │             │             │              │
       ▼              ▼             ▼             │              │
┌─────────────────────────────────────────────────────────────────────────┐
│                           N8N 工作流层                                   │
├─────────────┬─────────────┬─────────────┬─────────────┬────────────────┤
│  支付服务   │  用户服务   │  筛选Agent  │  内容Agent  │  AvatarAgent   │
│             │             │ (MiniMax)   │ (MiniMax)   │  (MiniMax)     │
└──────┬──────┴──────┬──────┴──────┬──────┴──────┬──────┴───────┬──────┘
       │              │             │             │              │
       ▼              ▼             ▼             ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐
│  微信支付  │  │ Supabase │  │ MiniMax  │  │ MiniMax  │  │   Qdrant     │
│  Stripe   │  │  数据库   │  │  文本API │  │ Embedding│  │   向量库     │
└──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────────┘
```

---

## 🤖 Agent 设计

### 1. 筛选 Agent (Screening Agent)

**用途**：通过AI对话问卷，评估用户的人生亮点

**技术**：
- 模型：MiniMax-M2.5
- 接口：文本对话

**流程**：
```
用户入口 → 支付9.99 → AI问卷(15题) → 亮点评估 → 报告生成
```

### 2. 采访 Agent (Interview Agent)

**用途**：深度采访提纲生成 + 内容整理

**技术**：
- 模型：MiniMax-M2.5
- 接口：文本 + TTS

### 3. 内容 Agent (Content Agent)

**用途**：书籍撰写 + 歌词创作

**技术**：
- 模型：MiniMax-M2.5
- 接口：文本生成

### 4. Avatar Agent

**用途**：AI分身对话

**技术**：
- 模型：MiniMax-M2.5 + MiniMax Embedding
- 接口：文本 + TTS
- 向量库：Qdrant

---

## 💰 商业模式

### 价格体系

| 产品 | 中国区 | 海外 | 说明 |
|------|--------|------|------|
| AI筛选 | ¥59 | $9.99 | 单次 |
| 传记书籍 | ¥199 | $29.99 | 单本 |
| AI分身 | ¥199/月 | $29.99/月 | 订阅 |

---

## 📱 Phase 1: 微信小程序 + 筛选Agent

### 小程序功能

| 功能 | 说明 |
|------|------|
| AI筛选入口 | 9.99元付费 |
| 进度查询 | 筛选进度 |
| 预约采访 | 免费预约 |
| 订单管理 | 购买记录 |
| 客服入口 | 人工客服 |

### 筛选Agent Prompt

详见 `agents/screening-agent.md`

### N8N 工作流

详见 `n8n-workflows/screening-workflow.json`

---

## 📅 开发计划

### Phase 1: 小程序 + 筛选系统 (2-3周)
- [ ] 微信小程序搭建
- [ ] 支付对接
- [ ] 筛选Agent
- [ ] 问卷流程
- [ ] 报告生成

### Phase 2: Web + 书籍 (3-4周)
- [ ] Web官网
- [ ] 采访流程
- [ ] 书籍生成

### Phase 3: AI分身 (4-5周)
- [ ] 向量库
- [ ] Avatar Agent
- [ ] 订阅系统

---

## 📂 项目结构

```
life-slices/
├── miniprogram/          # 微信小程序
│   ├── pages/
│   ├── components/
│   ├── utils/
│   └── app.js
├── n8n-workflows/        # N8N工作流
│   ├── screening-workflow.json
│   └── interview-workflow.json
├── agents/               # Agent配置
│   ├── screening-agent.md
│   └── interview-agent.md
└── docs/                # 文档
    └── PROJECT.md
```

---

**文档版本**：v1.0  
**最后更新**：2024年  
**项目状态**：开发中
