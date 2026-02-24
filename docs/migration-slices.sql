-- =====================================================
-- Life Slices - Slices 表 + Storage 迁移脚本
-- 在 Supabase SQL Editor 中执行此脚本
-- =====================================================

-- 1. 创建 slices 表
CREATE TABLE IF NOT EXISTS slices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    designation VARCHAR(10) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    quote TEXT,
    poster_url TEXT,
    video_url TEXT,
    audio_url TEXT,
    book_url TEXT,
    ai_knowledge_base_id TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_slices_designation ON slices(designation);

-- 2. 启用 RLS
ALTER TABLE slices ENABLE ROW LEVEL SECURITY;

-- 3. RLS 策略
CREATE POLICY "slices_select_all" ON slices FOR SELECT USING (true);
CREATE POLICY "slices_insert_auth" ON slices FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "slices_update_own" ON slices FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "slices_delete_own" ON slices FOR DELETE USING (auth.uid() = created_by);

-- 4. 创建 slice-posters 存储桶
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('slice-posters', 'slice-posters', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- 5. Storage RLS 策略
CREATE POLICY "slice_posters_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'slice-posters');
CREATE POLICY "slice_posters_auth_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'slice-posters' AND auth.role() = 'authenticated');
CREATE POLICY "slice_posters_auth_update" ON storage.objects FOR UPDATE USING (bucket_id = 'slice-posters' AND auth.role() = 'authenticated');
CREATE POLICY "slice_posters_auth_delete" ON storage.objects FOR DELETE USING (bucket_id = 'slice-posters' AND auth.role() = 'authenticated');

SELECT 'Slices migration completed!' AS result;
