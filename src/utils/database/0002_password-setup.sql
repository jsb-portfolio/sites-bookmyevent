
-- Create Verification Tokens Table
CREATE TABLE auth.verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    token_type TEXT NOT NULL CHECK (token_type IN ('email_verification', 'password_reset')),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Audit Logs Table
CREATE TABLE auth.audit_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Policies for Verification Tokens
ALTER TABLE auth.verification_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own verification tokens" ON auth.verification_tokens
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create Indexes for Performance Optimization
CREATE INDEX idx_auth_verification_tokens_user_id ON auth.verification_tokens(user_id);
CREATE INDEX idx_auth_verification_tokens_token_type ON auth.verification_tokens(token_type);
