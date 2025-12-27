-- Portfolio and Order Management Schema

-- Portfolios table for tracking user holdings across different assets
CREATE TABLE IF NOT EXISTS public.portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  asset_symbol TEXT NOT NULL,
  asset_name TEXT NOT NULL,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('crypto', 'stock', 'forex')),
  quantity DECIMAL(24,8) NOT NULL DEFAULT 0,
  average_buy_price DECIMAL(24,8) NOT NULL DEFAULT 0,
  total_invested DECIMAL(24,8) NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, asset_symbol)
);

-- Orders table for tracking buy/sell requests
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  portfolio_id UUID REFERENCES public.portfolios(id),
  type TEXT NOT NULL CHECK (type IN ('buy', 'sell')),
  asset_symbol TEXT NOT NULL,
  asset_type TEXT NOT NULL,
  quantity DECIMAL(24,8) NOT NULL,
  price_at_execution DECIMAL(24,8) NOT NULL,
  total_value DECIMAL(24,8) NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own portfolio" ON public.portfolios FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
