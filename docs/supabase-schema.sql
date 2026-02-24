-- =====================================================
-- Life Slices 数据库 Schema
-- 在 Supabase SQL Editor 中执行此脚本
-- =====================================================

-- 1. 用户表
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wx_openid VARCHAR(128) UNIQUE,          -- 微信OpenID
    email VARCHAR(255),
    name VARCHAR(100),
    avatar_url TEXT,
    language VARCHAR(10) DEFAULT 'zh',      -- 'zh' 或 'en'
    role VARCHAR(20) DEFAULT 'user',        -- 'user', 'admin'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 筛选会话表
CREATE TABLE IF NOT EXISTS screening_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending',    -- 'pending', 'started', 'in_progress', 'completed', 'expired'
    language VARCHAR(10) DEFAULT 'zh',
    current_question INTEGER DEFAULT 0,       -- 当前问题索引
    answers JSONB DEFAULT '[]',              -- 用户回答列表
    score JSONB,                             -- 评估分数
    highlights JSONB,                         -- 亮点列表
    report_url TEXT,                         -- 报告链接
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 订单表
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    order_number VARCHAR(64) UNIQUE NOT NULL,
    type VARCHAR(30) NOT NULL,               -- 'screening', 'book', 'avatar_subscription'
    amount INTEGER NOT NULL,                 -- 金额(分)
    currency VARCHAR(10) DEFAULT 'CNY',     -- 'CNY', 'AUD', 'USD'
    status VARCHAR(20) DEFAULT 'pending',    -- 'pending', 'paid', 'failed', 'refunded'
    payment_method VARCHAR(20),              -- 'wechat', 'stripe'
    payment_info JSONB,                      -- 支付相关信息
    metadata JSONB DEFAULT '{}',
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 采访预约表
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    screening_session_id UUID REFERENCES screening_sessions(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'pending',   -- 'pending', 'confirmed', 'completed', 'cancelled'
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    meeting_link TEXT,                      -- 会议链接 (Zoom/腾讯会议)
    notes TEXT,
    video_url TEXT,                         -- 采访视频链接
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. 书籍表
CREATE TABLE IF NOT EXISTS books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    title VARCHAR(200),
    subtitle VARCHAR(200),
    cover_image TEXT,
    content JSONB,                           -- 书籍内容 (章节等)
    status VARCHAR(20) DEFAULT 'draft',     -- 'draft', 'reviewing', 'published', 'archived'
    price INTEGER,                           -- 价格(分)
    download_count INTEGER DEFAULT 0,
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AI分身表
CREATE TABLE IF NOT EXISTS avatars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100),
    description TEXT,
    voice_id TEXT,                           -- 语音克隆ID
    personality JSONB,                       -- 人格配置
    vector_store_id TEXT,                    -- 向量库ID (Qdrant)
    status VARCHAR(20) DEFAULT 'training',  -- 'training', 'ready', 'active', 'inactive'
    subscription_status VARCHAR(20) DEFAULT 'trial', -- 'trial', 'active', 'expired'
    trial_expires_at TIMESTAMPTZ,
    subscription_expires_at TIMESTAMPTZ,
    total_conversations INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. 对话历史表
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    avatar_id UUID REFERENCES avatars(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20),                        -- 'user', 'assistant'
    content TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. 歌曲表
CREATE TABLE IF NOT EXISTS songs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    book_id UUID REFERENCES books(id) ON DELETE SET NULL,
    title VARCHAR(200),
    lyrics TEXT,
    audio_url TEXT,
    video_url TEXT,
    style VARCHAR(50),                       -- 'pop', 'rock', 'folk', etc.
    status VARCHAR(20) DEFAULT 'processing',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. 人生切片展示表 (Admin 创建)
CREATE TABLE IF NOT EXISTS slices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    designation VARCHAR(10) NOT NULL UNIQUE,  -- 展示 ID，如 "001"
    title VARCHAR(200) NOT NULL,              -- 主题标题
    quote TEXT,                               -- 引言/描述
    poster_url TEXT,                          -- 海报图片 URL
    video_url TEXT,                           -- 视频 URL
    audio_url TEXT,                           -- 音频 URL
    book_url TEXT,                            -- 书籍 URL
    ai_knowledge_base_id TEXT,               -- AI 向量库 ID
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 索引
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_users_wx_openid ON users(wx_openid);
CREATE INDEX IF NOT EXISTS idx_screening_sessions_user_id ON screening_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_screening_sessions_status ON screening_sessions(status);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_books_user_id ON books(user_id);
CREATE INDEX IF NOT EXISTS idx_avatars_user_id ON avatars(user_id);
CREATE INDEX IF NOT EXISTS idx_avatars_status ON avatars(status);
CREATE INDEX IF NOT EXISTS idx_conversations_avatar_id ON conversations(avatar_id);
CREATE INDEX IF NOT EXISTS idx_songs_user_id ON songs(user_id);
CREATE INDEX IF NOT EXISTS idx_slices_designation ON slices(designation);

-- =====================================================
-- RLS 策略 (Row Level Security)
-- =====================================================

-- 启用 RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE screening_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE avatars ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

-- slices 表：公开可读，仅认证用户可写
ALTER TABLE slices ENABLE ROW LEVEL SECURITY;

-- 用户只能查看自己的数据
CREATE POLICY "users_select_own" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "sessions_select_own" ON screening_sessions FOR SELECT USING (user_id IN (SELECT id FROM users WHERE auth.uid() = id));
CREATE POLICY "orders_select_own" ON orders FOR SELECT USING (user_id IN (SELECT id FROM users WHERE auth.uid() = id));
CREATE POLICY "appointments_select_own" ON appointments FOR SELECT USING (user_id IN (SELECT id FROM users WHERE auth.uid() = id));
CREATE POLICY "books_select_own" ON books FOR SELECT USING (user_id IN (SELECT id FROM users WHERE auth.uid() = id));
CREATE POLICY "avatars_select_own" ON avatars FOR SELECT USING (user_id IN (SELECT id FROM users WHERE auth.uid() = id));
CREATE POLICY "conversations_select_own" ON conversations FOR SELECT USING (user_id IN (SELECT id FROM users WHERE auth.uid() = id));
CREATE POLICY "songs_select_own" ON songs FOR SELECT USING (user_id IN (SELECT id FROM users WHERE auth.uid() = id));

-- slices: 所有人可读
CREATE POLICY "slices_select_all" ON slices FOR SELECT USING (true);
-- slices: 认证用户可插入
CREATE POLICY "slices_insert_auth" ON slices FOR INSERT WITH CHECK (auth.uid() = created_by);
-- slices: 创建者可更新
CREATE POLICY "slices_update_own" ON slices FOR UPDATE USING (auth.uid() = created_by);
-- slices: 创建者可删除
CREATE POLICY "slices_delete_own" ON slices FOR DELETE USING (auth.uid() = created_by);

-- =====================================================
-- 存储桶 (用于文件上传)
-- =====================================================

-- 创建书籍封面存储桶
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_extensions)
VALUES ('book-covers', 'book-covers', true, 10485760, ARRAY['jpg', 'jpeg', 'png', 'webp']);

-- 创建采访视频存储桶
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_extensions)
VALUES ('interview-videos', 'interview-videos', true, 524288000, ARRAY['mp4', 'mov', 'avi']);

-- 创建音频存储桶
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_extensions)
VALUES ('audio', 'audio', true, 104857600, ARRAY['mp3', 'wav', 'm4a']);

-- 创建切片海报存储桶
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_extensions)
VALUES ('slice-posters', 'slice-posters', true, 10485760, ARRAY['jpg', 'jpeg', 'png', 'webp']);

-- slice-posters 存储桶策略：公开可读
CREATE POLICY "slice_posters_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'slice-posters');
-- slice-posters 存储桶策略：认证用户可上传
CREATE POLICY "slice_posters_auth_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'slice-posters' AND auth.role() = 'authenticated');
-- slice-posters 存储桶策略：认证用户可更新
CREATE POLICY "slice_posters_auth_update" ON storage.objects FOR UPDATE USING (bucket_id = 'slice-posters' AND auth.role() = 'authenticated');
-- slice-posters 存储桶策略：认证用户可删除
CREATE POLICY "slice_posters_auth_delete" ON storage.objects FOR DELETE USING (bucket_id = 'slice-posters' AND auth.role() = 'authenticated');

-- =====================================================
-- 完成后执行
-- =====================================================

SELECT 'Database setup completed!' AS result;
