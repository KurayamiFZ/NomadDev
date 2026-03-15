-- Clean up existing objects if they exist
DROP TRIGGER IF EXISTS trigger_set_default_priority ON feedback_questions;
DROP FUNCTION IF EXISTS set_default_priority();

-- Drop and recreate tables with proper structure
DROP TABLE IF EXISTS feedback_replies CASCADE;
DROP TABLE IF EXISTS feedback_questions CASCADE;

-- Create feedback_questions table
CREATE TABLE feedback_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'general' CHECK (category IN ('general', 'technical', 'billing', 'course', 'bug', 'feature')),
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  admin_response TEXT,
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  responded_at TIMESTAMP WITH TIME ZONE
);

-- Create feedback_replies table for conversation threads
CREATE TABLE feedback_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  feedback_id UUID REFERENCES feedback_questions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  sender_type VARCHAR(10) NOT NULL CHECK (sender_type IN ('user', 'admin')),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_feedback_questions_updated_at 
    BEFORE UPDATE ON feedback_questions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE feedback_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_replies ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for feedback_questions
-- Users can view their own questions
CREATE POLICY "Users can view own feedback" ON feedback_questions
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own questions
CREATE POLICY "Users can insert own feedback" ON feedback_questions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own questions (limited fields)
CREATE POLICY "Users can update own feedback" ON feedback_questions
    FOR UPDATE USING (auth.uid() = user_id);

-- Admins can view all questions
CREATE POLICY "Admins can view all feedback" ON feedback_questions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Admins can update all questions
CREATE POLICY "Admins can update all feedback" ON feedback_questions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Admins can delete all questions
CREATE POLICY "Admins can delete all feedback" ON feedback_questions
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Create RLS policies for feedback_replies
-- Users can view replies to their own questions
CREATE POLICY "Users can view replies to own feedback" ON feedback_replies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM feedback_questions 
            WHERE feedback_questions.id = feedback_replies.feedback_id 
            AND feedback_questions.user_id = auth.uid()
        )
    );

-- Users can insert replies to their own questions
CREATE POLICY "Users can insert replies to own feedback" ON feedback_replies
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM feedback_questions 
            WHERE feedback_questions.id = feedback_replies.feedback_id 
            AND feedback_questions.user_id = auth.uid()
        )
    );

-- Admins can view all replies
CREATE POLICY "Admins can view all replies" ON feedback_replies
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Admins can insert replies to any question
CREATE POLICY "Admins can insert replies" ON feedback_replies
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Create indexes for better performance
CREATE INDEX idx_feedback_questions_user_id ON feedback_questions(user_id);
CREATE INDEX idx_feedback_questions_status ON feedback_questions(status);
CREATE INDEX idx_feedback_questions_created_at ON feedback_questions(created_at);
CREATE INDEX idx_feedback_replies_feedback_id ON feedback_replies(feedback_id);
CREATE INDEX idx_feedback_replies_sender_id ON feedback_replies(sender_id);

-- Grant permissions
GRANT ALL ON feedback_questions TO authenticated;
GRANT ALL ON feedback_replies TO authenticated;
GRANT SELECT ON feedback_questions TO anon;
GRANT SELECT ON feedback_replies TO anon;
