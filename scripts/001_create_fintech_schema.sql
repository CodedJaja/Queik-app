-- Core Fintech Schema for Queik

-- Profiles table to store user metadata
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
  avatar_url TEXT,
  kyc_status TEXT DEFAULT 'not_started' CHECK (kyc_status IN ('not_started', 'pending', 'verified', 'rejected')),
  country TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Wallets table to store user balances
CREATE TABLE IF NOT EXISTS public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  currency TEXT NOT NULL DEFAULT 'USD',
  balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  account_number TEXT UNIQUE,
  routing_number TEXT,
  swift_code TEXT,
  bank_name TEXT DEFAULT 'Queik Digital Bank',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on wallets
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own wallets" ON public.wallets
  FOR SELECT USING (auth.uid() = user_id);

-- Transactions table for all financial activity
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_id UUID REFERENCES public.wallets(id),
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'transfer_sent', 'transfer_received', 'conversion', 'trading')),
  amount DECIMAL(15,2) NOT NULL,
  fee DECIMAL(15,2) DEFAULT 0.00,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Trigger to create profile and initial wallet on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_wallet_id UUID;
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', '')
  );

  -- Insert initial USD wallet
  INSERT INTO public.wallets (user_id, currency, balance, account_number)
  VALUES (
    NEW.id,
    'USD',
    0.00,
    -- Generate a mock 10-digit account number
    (floor(random() * 9000000000) + 1000000000)::text
  )
  RETURNING id INTO new_wallet_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
