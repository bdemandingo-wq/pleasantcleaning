import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  beds: string;
  baths: string;
  specialInstructions: string;
  petInfo: string;
  serviceType: string;
  sqft: number;
  frequency: string;
  addOns: string[];
  totalPrice: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingRequest = await req.json();
    console.log("Received booking request:", booking);

    const addOnsList = booking.addOns.length > 0 
      ? booking.addOns.join(", ") 
      : "None";

    // Email to business owner
    const ownerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TidyWise Cleaning <support@tidywisecleaning.com>",
        to: ["support@tidywisecleaning.com"],
        subject: `New Booking Request from ${booking.customerName}`,
        html: `
          <h1>New Booking Request!</h1>
          <h2>Customer Information</h2>
          <ul>
            <li><strong>Name:</strong> ${booking.customerName}</li>
            <li><strong>Email:</strong> ${booking.customerEmail}</li>
            <li><strong>Phone:</strong> ${booking.customerPhone}</li>
            <li><strong>Address:</strong> ${booking.address}</li>
          </ul>
          
          <h2>Property Details</h2>
          <ul>
            <li><strong>Bedrooms:</strong> ${booking.beds}</li>
            <li><strong>Bathrooms:</strong> ${booking.baths}</li>
            <li><strong>Square Footage:</strong> ${booking.sqft.toLocaleString()} sq ft</li>
          </ul>
          
          <h2>Service Details</h2>
          <ul>
            <li><strong>Service Type:</strong> ${booking.serviceType}</li>
            <li><strong>Frequency:</strong> ${booking.frequency}</li>
            <li><strong>Add-Ons:</strong> ${addOnsList}</li>
            <li><strong>Total Price:</strong> $${booking.totalPrice}</li>
          </ul>
          
          <h2>Special Instructions</h2>
          <p>${booking.specialInstructions || "None provided"}</p>
          
          <h2>Pet Information</h2>
          <p>${booking.petInfo || "No pets"}</p>
        `,
      }),
    });

    const ownerEmailData = await ownerEmailRes.json();
    console.log("Owner email response:", ownerEmailData);

    // Confirmation email to customer
    const customerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TidyWise Cleaning <support@tidywisecleaning.com>",
        to: [booking.customerEmail],
        subject: "Your TidyWise Cleaning Booking Confirmation",
        html: `
          <h1>Thank you for your booking, ${booking.customerName}!</h1>
          <p>We've received your cleaning request and will contact you within 15 minutes to confirm your appointment.</p>
          
          <h2>Your Booking Summary</h2>
          <ul>
            <li><strong>Service:</strong> ${booking.serviceType}</li>
            <li><strong>Frequency:</strong> ${booking.frequency}</li>
            <li><strong>Property Size:</strong> ${booking.sqft.toLocaleString()} sq ft</li>
            <li><strong>Add-Ons:</strong> ${addOnsList}</li>
            <li><strong>Estimated Total:</strong> $${booking.totalPrice}</li>
          </ul>
          
          <p>If you have any questions, please reply to this email or call us.</p>
          
          <p>Best regards,<br>The TidyWise Cleaning Team</p>
        `,
      }),
    });

    const customerEmailData = await customerEmailRes.json();
    console.log("Customer email response:", customerEmailData);

    return new Response(
      JSON.stringify({ success: true, ownerEmail: ownerEmailData, customerEmail: customerEmailData }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending booking confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
