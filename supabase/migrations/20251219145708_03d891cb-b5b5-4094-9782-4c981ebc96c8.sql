-- Create drops table
CREATE TABLE public.drops (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  geo TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create addresses table
CREATE TABLE public.addresses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  drop_id UUID NOT NULL REFERENCES public.drops(id) ON DELETE CASCADE,
  geo TEXT NOT NULL,
  delivery_method TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create billings table
CREATE TABLE public.billings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skups table
CREATE TABLE public.skups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create packs table
CREATE TABLE public.packs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pack_id TEXT NOT NULL,
  store_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Замовлено',
  card TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  amount_without_discount DECIMAL(10,2) NOT NULL DEFAULT 0,
  quantity INTEGER NOT NULL DEFAULT 1,
  billing TEXT,
  email TEXT,
  password TEXT,
  drop_id UUID REFERENCES public.drops(id),
  address_id UUID REFERENCES public.addresses(id),
  skup_id UUID REFERENCES public.skups(id),
  product_type TEXT NOT NULL DEFAULT 'Шмот',
  track_numbers TEXT[] DEFAULT '{}',
  comments TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  delivered_at TIMESTAMP WITH TIME ZONE
);

-- Create pack_archive table for deleted packs (keep 3 months)
CREATE TABLE public.pack_archive (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  original_pack_id UUID NOT NULL,
  pack_id TEXT NOT NULL,
  store_name TEXT NOT NULL,
  status TEXT NOT NULL,
  card TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  amount_without_discount DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  billing TEXT,
  email TEXT,
  password TEXT,
  drop_id UUID,
  address_id UUID,
  skup_id UUID,
  product_type TEXT NOT NULL,
  track_numbers TEXT[] DEFAULT '{}',
  comments TEXT[] DEFAULT '{}',
  original_created_at TIMESTAMP WITH TIME ZONE,
  archived_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ref_processes table
CREATE TABLE public.ref_processes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pack_id UUID REFERENCES public.packs(id) ON DELETE SET NULL,
  pack_name TEXT NOT NULL,
  store_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Актив',
  track_number TEXT,
  ref_method TEXT DEFAULT '',
  delivery_date TIMESTAMP WITH TIME ZONE,
  write_date TIMESTAMP WITH TIME ZONE,
  drop_payment DECIMAL(10,2) DEFAULT 0,
  carrier_payment DECIMAL(10,2) DEFAULT 0,
  additional_expenses DECIMAL(10,2) DEFAULT 0,
  boxer_expenses DECIMAL(10,2) DEFAULT 0,
  net_profit DECIMAL(10,2) DEFAULT 0,
  comments TEXT[] DEFAULT '{}',
  drop_id UUID REFERENCES public.drops(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables (public access for now, no auth required)
ALTER TABLE public.drops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pack_archive ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ref_processes ENABLE ROW LEVEL SECURITY;

-- Create public access policies (no auth for CRM internal use)
CREATE POLICY "Public read access" ON public.drops FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.drops FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.drops FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON public.drops FOR DELETE USING (true);

CREATE POLICY "Public read access" ON public.addresses FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.addresses FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.addresses FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON public.addresses FOR DELETE USING (true);

CREATE POLICY "Public read access" ON public.billings FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.billings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.billings FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON public.billings FOR DELETE USING (true);

CREATE POLICY "Public read access" ON public.skups FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.skups FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.skups FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON public.skups FOR DELETE USING (true);

CREATE POLICY "Public read access" ON public.packs FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.packs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.packs FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON public.packs FOR DELETE USING (true);

CREATE POLICY "Public read access" ON public.pack_archive FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.pack_archive FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.pack_archive FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON public.pack_archive FOR DELETE USING (true);

CREATE POLICY "Public read access" ON public.ref_processes FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.ref_processes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.ref_processes FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON public.ref_processes FOR DELETE USING (true);

-- Insert demo data
INSERT INTO public.drops (id, name, geo) VALUES 
  ('d1000000-0000-0000-0000-000000000001', 'Vlad', 'UA'),
  ('d1000000-0000-0000-0000-000000000002', 'Oleg', 'DE'),
  ('d1000000-0000-0000-0000-000000000003', 'Максим', 'IT');

INSERT INTO public.addresses (drop_id, geo, delivery_method, address) VALUES 
  ('d1000000-0000-0000-0000-000000000001', 'UA', 'DHL', 'Kyiv, вул. Хрещатик 1'),
  ('d1000000-0000-0000-0000-000000000001', 'UA', 'DPD', 'Lviv, пр. Свободи 5'),
  ('d1000000-0000-0000-0000-000000000002', 'DE', 'DHL', 'Berlin, Alexanderplatz 10'),
  ('d1000000-0000-0000-0000-000000000003', 'IT', 'GLS', 'Milano, Via Roma 25');

INSERT INTO public.billings (name) VALUES 
  ('Zen Anton'),
  ('Zen Yaroslav');

INSERT INTO public.skups (name) VALUES 
  ('Oleg'),
  ('Ivan'),
  ('Nazar');

-- Create function to auto-cleanup old archive records (older than 3 months)
CREATE OR REPLACE FUNCTION public.cleanup_old_archives()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.pack_archive 
  WHERE archived_at < now() - interval '3 months';
END;
$$;