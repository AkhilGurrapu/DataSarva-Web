import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS headers for allowing frontend requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Email sending function using Resend
async function sendEmail(to: string, subject: string, html: string) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY')
  
  if (!resendApiKey) {
    console.log('RESEND_API_KEY not configured, skipping email notification')
    return
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'DataSarva <noreply@datasarva.com>',
        to: [to],
        subject: subject,
        html: html,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Failed to send email:', error)
    } else {
      console.log('Email sent successfully to:', to)
    }
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role key for admin access
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse request body
    const { name, email, company, interest, message }: ContactFormData = await req.json()

    // Validate required fields
    if (!name || !email || !company || !interest || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'All fields are required'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Insert contact request into database
    const { data, error } = await supabase
      .from('contact_requests')
      .insert({
        name,
        email,
        company,
        interest,
        message,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Failed to submit contact request'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Send notification emails after successful database insert
    try {
      // Email template for admin notification
      const adminEmailHtml = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Interest:</strong> ${interest}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Contact ID:</strong> ${data.id}</p>
      `

      // Email template for customer confirmation
      const customerEmailHtml = `
        <h2>Thank you for contacting DataSarva</h2>
        <p>Hello ${name},</p>
        <p>We've received your inquiry about ${interest} and will get back to you within 24 hours.</p>
        
        <h3>Your message:</h3>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        
        <p>Best regards,<br>
        DataSarva Team</p>
        
        <hr>
        <p style="font-size: 12px; color: #666;">
          This is an automated confirmation. Please do not reply to this email.
        </p>
      `

      // Send admin notification (replace with your admin email)
      await sendEmail(
        'admin@datasarva.com',
        `New Contact Form: ${name} - ${interest}`,
        adminEmailHtml
      )

      // Send customer confirmation
      await sendEmail(
        email,
        'Thank you for contacting DataSarva',
        customerEmailHtml
      )

    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if emails fail
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contact request submitted successfully',
        id: data.id
      }),
      {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error processing contact form:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Invalid request format'
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})