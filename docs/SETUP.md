# 人生切片 - 微信小程序配置指南

## 一、前置准备

1. **微信小程序账号**：在 [微信公众平台](https://mp.weixin.qq.com/) 注册并获取 AppID
2. **Supabase 项目**：在 [supabase.com](https://supabase.com) 创建项目
3. **N8N 实例**：本地或云端运行的 N8N（如 `http://localhost:5678`）
4. **MiniMax API Key**：从 [MiniMax 开放平台](https://platform.minimax.chat/) 获取

---

## 二、Supabase 配置

### 1. 执行数据库 Schema

1. 登录 Supabase 控制台
2. 进入 **SQL Editor**
3. 复制 `docs/supabase-schema.sql` 内容并执行

### 2. 创建测试用户（用于筛选流程）

在 SQL Editor 中执行：

```sql
INSERT INTO users (id, name, language) 
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Test User', 'zh')
ON CONFLICT (id) DO NOTHING;
```

记录此 UUID：`a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`

### 3. 获取 Project URL 和 Anon Key

- 进入 Supabase 项目 **Settings** → **API**
- 复制 **Project URL** 和 **anon public** Key

---

## 三、N8N 配置

### 1. 导入工作流

1. 打开 N8N（如 http://localhost:5678）
2. 点击 **Workflows** → **Import from File**
3. 选择 `n8n-workflows/screening-workflow.json`

### 2. 配置 Credentials

1. **Supabase**：
   - 新建 Credential，类型选 Supabase
   - 填入 Project URL 和 **Service Role Key**（Settings → API → service_role）

2. **MiniMax API**：
   - 在 HTTP Request 节点中，将 `YOUR_MINIMAX_API_KEY` 替换为你的 API Key
   - 或使用 N8N 的 Credentials 管理

### 3. 激活工作流

- 打开工作流，点击右上角 **Active** 开关

### 4. 获取 Webhook 地址

- 格式：`http://你的N8N地址/webhook/screening-start`
- 本地示例：`http://localhost:5678/webhook/screening-start`
- **注意**：真机调试时需使用可公网访问的地址（如 ngrok）

---

## 四、小程序配置

### 1. 打开 `miniprogram/app.js`

修改以下配置：

```javascript
globalData: {
  // Supabase
  supabaseUrl: 'https://你的项目.supabase.co',
  supabaseKey: '你的anon_key',

  // N8N Webhook 根地址（不要带 /screening-start）
  n8nBaseUrl: 'http://localhost:5678/webhook',

  // 测试用：若 Supabase 已创建测试用户，可填其 UUID
  // 留空则使用 wx_时间戳 作为临时 ID（需 N8N 工作流支持）
  testUserId: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
}
```

### 2. 修改 project.config.json

- 将 `"appid": "your-appid"` 改为你的小程序 AppID

---

## 五、微信开发者工具

1. 下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 新建项目 → 选择 `miniprogram` 目录
3. 填入 AppID
4. 点击 **编译** 运行

---

## 六、真机调试与域名配置

### 1. 服务器域名

在微信公众平台 → 开发 → 开发管理 → 开发设置 → 服务器域名：

- **request 合法域名**：添加你的 N8N 和 Supabase 域名
- 本地开发可在开发者工具中勾选「不校验合法域名」

### 2. 真机调试

- 本地 N8N 需通过 ngrok 等工具暴露到公网
- 将 `n8nBaseUrl` 改为 ngrok 提供的地址

---

## 七、常见问题

| 问题 | 处理 |
|------|------|
| 筛选启动失败 | 检查 n8nBaseUrl、N8N 工作流是否已激活 |
| 创建会话失败 | 检查 Supabase 中是否有对应用户，user_id 需为有效 UUID |
| 401 / 403 | 检查 Supabase Key、N8N 凭证 |
| 真机无法请求 | 配置服务器域名或使用 ngrok |

---

**版本**：v1.0
