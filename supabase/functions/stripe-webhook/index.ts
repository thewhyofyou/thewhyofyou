import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.80.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
  apiVersion: "2023-10-16",
});

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature || !webhookSecret) {
    return new Response("Missing signature or webhook secret", { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    console.log("Webhook event received:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log("Processing completed checkout:", session.id);

      // Extract metadata
      const metadata = session.metadata!;

      // Create booking in database
      const { data: booking, error: bookingError } = await supabase
        .from("bookings")
        .insert({
          service_type: metadata.service_type,
          customer_email: metadata.customer_email,
          customer_name: metadata.customer_name,
          person1_name: metadata.person1_name,
          person1_birth_date: metadata.person1_birth_date,
          person1_birth_time: metadata.person1_birth_time,
          person1_birth_city: metadata.person1_birth_city,
          person1_birth_country: metadata.person1_birth_country,
          person1_questions: metadata.person1_questions || null,
          person2_name: metadata.person2_name || null,
          person2_birth_date: metadata.person2_birth_date || null,
          person2_birth_time: metadata.person2_birth_time || null,
          person2_birth_city: metadata.person2_birth_city || null,
          person2_birth_country: metadata.person2_birth_country || null,
          amount_paid: session.amount_total || 0,
          currency: session.currency || "usd",
          status: "paid",
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
        })
        .select()
        .single();

      if (bookingError) {
        console.error("Error creating booking:", bookingError);
        throw bookingError;
      }

      console.log("Booking created successfully:", booking.id);

      // TODO: Send confirmation email here
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
