-- =========================================================
-- TABLES
-- =========================================================

-- 1. service_pricing
CREATE TABLE public.service_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type TEXT NOT NULL,
  tier_index INTEGER NOT NULL DEFAULT 0,
  max_sqft INTEGER NOT NULL,
  label TEXT NOT NULL,
  base_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.service_pricing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active pricing" ON public.service_pricing FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all pricing" ON public.service_pricing FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert pricing" ON public.service_pricing FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update pricing" ON public.service_pricing FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete pricing" ON public.service_pricing FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER service_pricing_updated BEFORE UPDATE ON public.service_pricing FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. service_areas
CREATE TABLE public.service_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'FL',
  tier TEXT NOT NULL DEFAULT 'standard',
  travel_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.service_areas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active areas" ON public.service_areas FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all areas" ON public.service_areas FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert areas" ON public.service_areas FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update areas" ON public.service_areas FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete areas" ON public.service_areas FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER service_areas_updated BEFORE UPDATE ON public.service_areas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  location TEXT,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view approved reviews" ON public.reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Anyone can submit a review" ON public.reviews FOR INSERT WITH CHECK (status = 'pending');
CREATE POLICY "Admins can view all reviews" ON public.reviews FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update reviews" ON public.reviews FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete reviews" ON public.reviews FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER reviews_updated BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. quote_requests
CREATE TABLE public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'FL',
  zip TEXT NOT NULL,
  square_feet TEXT,
  bedrooms TEXT,
  bathrooms TEXT,
  frequency TEXT,
  current_clean_level TEXT,
  consent_email BOOLEAN NOT NULL DEFAULT false,
  consent_sms BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a quote" ON public.quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view quotes" ON public.quote_requests FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update quotes" ON public.quote_requests FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete quotes" ON public.quote_requests FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER quote_requests_updated BEFORE UPDATE ON public.quote_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. commercial_requests
CREATE TABLE public.commercial_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  property_type TEXT NOT NULL,
  square_feet TEXT,
  frequency TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.commercial_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit commercial request" ON public.commercial_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view commercial" ON public.commercial_requests FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update commercial" ON public.commercial_requests FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete commercial" ON public.commercial_requests FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER commercial_requests_updated BEFORE UPDATE ON public.commercial_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. chatbot_conversations
CREATE TABLE public.chatbot_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_type TEXT NOT NULL DEFAULT 'residential',
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  estimate_amount NUMERIC(10,2),
  converted_to_booking BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'open',
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert conversation" ON public.chatbot_conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update own conversation" ON public.chatbot_conversations FOR UPDATE USING (true);
CREATE POLICY "Admins can view conversations" ON public.chatbot_conversations FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete conversations" ON public.chatbot_conversations FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER chatbot_conversations_updated BEFORE UPDATE ON public.chatbot_conversations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 7. abandoned_leads
CREATE TABLE public.abandoned_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flow_type TEXT NOT NULL DEFAULT 'residential',
  customer_name TEXT,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  estimate_amount NUMERIC(10,2),
  followup_sent BOOLEAN NOT NULL DEFAULT false,
  followup_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.abandoned_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert lead" ON public.abandoned_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view leads" ON public.abandoned_leads FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update leads" ON public.abandoned_leads FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete leads" ON public.abandoned_leads FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- 8. booking_blocked_dates
CREATE TABLE public.booking_blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocked_date DATE NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.booking_blocked_dates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view blocked dates" ON public.booking_blocked_dates FOR SELECT USING (true);
CREATE POLICY "Admins can insert blocked" ON public.booking_blocked_dates FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete blocked" ON public.booking_blocked_dates FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- 9. work_cards
CREATE TABLE public.work_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL DEFAULT 'instagram',
  image_url TEXT NOT NULL DEFAULT '',
  caption TEXT NOT NULL DEFAULT '',
  post_url TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.work_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view work cards" ON public.work_cards FOR SELECT USING (true);
CREATE POLICY "Admins can insert work" ON public.work_cards FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update work" ON public.work_cards FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete work" ON public.work_cards FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'));
CREATE TRIGGER work_cards_updated BEFORE UPDATE ON public.work_cards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 10. site_content (key/value)
CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins can insert site content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site content" ON public.site_content FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'));

-- =========================================================
-- STORAGE BUCKET for work photos
-- =========================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('work-photos', 'work-photos', true)
  ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view work photos" ON storage.objects FOR SELECT USING (bucket_id = 'work-photos');
CREATE POLICY "Admins can upload work photos" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'work-photos' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update work photos" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'work-photos' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete work photos" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'work-photos' AND has_role(auth.uid(), 'admin'));

-- =========================================================
-- SEED DATA
-- =========================================================

-- Service pricing tiers (matches HeroEstimator + Services rates)
INSERT INTO public.service_pricing (service_type, tier_index, max_sqft, label, base_price) VALUES
  ('standard', 0, 1000, 'Up to 1,000 sf', 150),
  ('standard', 1, 1500, 'Up to 1,500 sf', 175),
  ('standard', 2, 2000, 'Up to 2,000 sf', 200),
  ('standard', 3, 2500, 'Up to 2,500 sf', 225),
  ('standard', 4, 3000, 'Up to 3,000 sf', 250),
  ('deep',     0, 1000, 'Up to 1,000 sf', 250),
  ('deep',     1, 1500, 'Up to 1,500 sf', 290),
  ('deep',     2, 2000, 'Up to 2,000 sf', 330),
  ('deep',     3, 2500, 'Up to 2,500 sf', 380),
  ('deep',     4, 3000, 'Up to 3,000 sf', 430),
  ('moveinout',0, 1000, 'Up to 1,000 sf', 300),
  ('moveinout',1, 1500, 'Up to 1,500 sf', 350),
  ('moveinout',2, 2000, 'Up to 2,000 sf', 400),
  ('moveinout',3, 2500, 'Up to 2,500 sf', 450),
  ('moveinout',4, 3000, 'Up to 3,000 sf', 500),
  ('airbnb',   0, 1000, 'Up to 1,000 sf', 180),
  ('airbnb',   1, 1500, 'Up to 1,500 sf', 210),
  ('airbnb',   2, 2000, 'Up to 2,000 sf', 240),
  ('airbnb',   3, 2500, 'Up to 2,500 sf', 270),
  ('airbnb',   4, 3000, 'Up to 3,000 sf', 300),
  ('construction',0, 1000, 'Up to 1,000 sf', 450),
  ('construction',1, 1500, 'Up to 1,500 sf', 525),
  ('construction',2, 2000, 'Up to 2,000 sf', 600),
  ('construction',3, 2500, 'Up to 2,500 sf', 700),
  ('construction',4, 3000, 'Up to 3,000 sf', 800);

-- Service areas (cities you serve)
INSERT INTO public.service_areas (slug, name, state, tier, travel_fee, sort_order) VALUES
  ('pembroke-pines-cleaning', 'Pembroke Pines', 'FL', 'standard', 0, 1),
  ('miramar-cleaning',         'Miramar',        'FL', 'standard', 0, 2),
  ('davie-cleaning',           'Davie',          'FL', 'standard', 0, 3),
  ('coral-springs-cleaning',   'Coral Springs',  'FL', 'standard', 0, 4),
  ('sunrise-cleaning',         'Sunrise',        'FL', 'standard', 0, 5),
  ('boca-raton-cleaning',      'Boca Raton',     'FL', 'premium', 25, 6),
  ('aventura-cleaning',        'Aventura',       'FL', 'premium', 20, 7),
  ('coral-gables-cleaning',    'Coral Gables',   'FL', 'premium', 25, 8),
  ('coconut-grove-cleaning',   'Coconut Grove',  'FL', 'premium', 25, 9),
  ('miami-beach-cleaning',     'Miami Beach',    'FL', 'premium', 30, 10),
  ('doral-cleaning',           'Doral',          'FL', 'standard', 15, 11),
  ('homestead-cleaning',       'Homestead',      'FL', 'standard', 25, 12);

-- Default site content (social handles)
INSERT INTO public.site_content (key, value) VALUES
  ('instagram_handle', '@pleasantcleanings'),
  ('instagram_url',    'https://www.instagram.com/pleasantcleanings/'),
  ('tiktok_handle',    '@pleasantcleanings'),
  ('tiktok_url',       'https://www.tiktok.com/@pleasantcleanings');
