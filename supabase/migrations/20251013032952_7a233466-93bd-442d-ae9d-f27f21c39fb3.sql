-- Create homepage_cards table for dynamic content
CREATE TABLE public.homepage_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.homepage_cards ENABLE ROW LEVEL SECURITY;

-- Public can read cards
CREATE POLICY "Anyone can view homepage cards"
  ON public.homepage_cards
  FOR SELECT
  USING (true);

-- Only authenticated users can update (admin only)
CREATE POLICY "Authenticated users can update homepage cards"
  ON public.homepage_cards
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Insert default cards
INSERT INTO public.homepage_cards (card_key, title, content, image_url) VALUES
  ('self_paced', 'Self-Paced Guides', 'Comprehensive learning resources designed for independent study. Master research fundamentals at your own pace with curated materials and step-by-step tutorials.', null),
  ('showcase', 'Project Showcase', 'Explore inspiring student research projects from around the world. Get ideas, learn from peers, and see what''s possible when talent meets opportunity.', null),
  ('publishing', 'Independent Publishing', 'Share your research with the world. Learn how to publish your findings independently, build your academic portfolio, and make an impact.', null);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_homepage_cards_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_homepage_cards_timestamp
  BEFORE UPDATE ON public.homepage_cards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_homepage_cards_updated_at();