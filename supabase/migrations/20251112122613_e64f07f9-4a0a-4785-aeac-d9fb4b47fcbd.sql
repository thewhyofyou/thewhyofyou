-- Create bookings table for storing reading orders
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type TEXT NOT NULL CHECK (service_type IN ('natal_chart', 'compatibility')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'completed', 'cancelled')),
  
  -- Customer details
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  
  -- Person 1 details (or primary person for natal chart)
  person1_name TEXT NOT NULL,
  person1_birth_date DATE NOT NULL,
  person1_birth_time TIME NOT NULL,
  person1_birth_city TEXT NOT NULL,
  person1_birth_country TEXT NOT NULL,
  person1_questions TEXT,
  
  -- Person 2 details (for compatibility readings only)
  person2_name TEXT,
  person2_birth_date DATE,
  person2_birth_time TIME,
  person2_birth_city TEXT,
  person2_birth_country TEXT,
  
  -- Payment details
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  amount_paid INTEGER,
  currency TEXT DEFAULT 'usd',
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert bookings (for checkout)
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (true);

-- Allow customers to view their own bookings by email
CREATE POLICY "Customers can view their own bookings"
ON public.bookings
FOR SELECT
USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_bookings_updated_at();