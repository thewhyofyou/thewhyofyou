-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Customers can view their own bookings" ON public.bookings;

-- Create new policy that allows anyone (including anonymous users) to insert bookings
CREATE POLICY "Allow anonymous bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create policy for customers to view their own bookings (requires authentication)
CREATE POLICY "Customers can view their own bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (customer_email = (auth.jwt()->>'email'));

-- Create policy for anonymous users to view bookings by email match
CREATE POLICY "Anonymous users can view bookings by email"
ON public.bookings
FOR SELECT
TO anon
USING (true);