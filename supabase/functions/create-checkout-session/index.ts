import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
  apiVersion: "2023-10-16",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CheckoutRequest {
  serviceType: "natal_chart" | "natal_chart_30" | "compatibility" | "report";
  serviceTitle: string;
  price: number;
  customerEmail: string;
  customerName: string;
  reportId?: string;
  bookingData?: {
    person1Name: string;
    person1BirthDate: string;
    person1BirthTime: string;
    person1BirthCity: string;
    person1BirthCountry: string;
    person1Questions?: string;
    person2Name?: string;
    person2BirthDate?: string;
    person2BirthTime?: string;
    person2BirthCity?: string;
    person2BirthCountry?: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      serviceType,
      serviceTitle,
      price,
      customerEmail,
      customerName,
      reportId,
      bookingData,
    }: CheckoutRequest = await req.json();

    console.log("Creating checkout session for:", { serviceType, customerEmail });

    // Determine product description based on service type
    const productDescription = serviceType === "report" 
      ? `Astrology report: ${serviceTitle}`
      : `Astrology reading for ${bookingData?.person1Name}`;

    // Determine cancel URL based on service type
    const cancelUrl = serviceType === "report"
      ? `${req.headers.get("origin")}/astro-reports?canceled=true`
      : `${req.headers.get("origin")}/readings?canceled=true`;

    // Build metadata based on service type
    const metadata: Record<string, string> = {
      service_type: serviceType,
      customer_name: customerName,
      customer_email: customerEmail,
    };

    if (serviceType === "report" && reportId) {
      metadata.report_id = reportId;
    } else if (bookingData) {
      metadata.person1_name = bookingData.person1Name;
      metadata.person1_birth_date = bookingData.person1BirthDate;
      metadata.person1_birth_time = bookingData.person1BirthTime;
      metadata.person1_birth_city = bookingData.person1BirthCity;
      metadata.person1_birth_country = bookingData.person1BirthCountry;
      metadata.person1_questions = bookingData.person1Questions || "";
      metadata.person2_name = bookingData.person2Name || "";
      metadata.person2_birth_date = bookingData.person2BirthDate || "";
      metadata.person2_birth_time = bookingData.person2BirthTime || "";
      metadata.person2_birth_city = bookingData.person2BirthCity || "";
      metadata.person2_birth_country = bookingData.person2BirthCountry || "";
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: serviceTitle,
              description: productDescription,
            },
            unit_amount: price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata,
    });

    console.log("Checkout session created:", session.id);

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
