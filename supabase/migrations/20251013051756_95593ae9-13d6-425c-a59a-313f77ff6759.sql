-- Fix function search path security warning - drop and recreate with proper settings
DROP TRIGGER IF EXISTS update_email_subscriptions_updated_at ON public.email_subscriptions;
DROP FUNCTION IF EXISTS public.update_email_subscriptions_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION public.update_email_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

-- Recreate the trigger
CREATE TRIGGER update_email_subscriptions_updated_at
BEFORE UPDATE ON public.email_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_email_subscriptions_updated_at();