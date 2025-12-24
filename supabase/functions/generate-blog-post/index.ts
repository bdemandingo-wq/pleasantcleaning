import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CLEANING_TOPICS = [
  "Quick cleaning hacks for busy Florida professionals",
  "How to maintain a clean home during hurricane season",
  "Pet-friendly cleaning solutions for South Florida homes",
  "Best practices for cleaning luxury condos in Miami",
  "Seasonal deep cleaning checklist for Florida homeowners",
  "How to prevent sand and salt buildup in coastal homes",
  "Green cleaning tips for eco-conscious Floridians",
  "Organizing tips for small apartments in Fort Lauderdale",
  "How to clean and maintain tile floors in humid climates",
  "Tips for keeping your Airbnb spotless between guests",
  "Cleaning tips for homes with allergies in humid Florida",
  "How to maintain outdoor furniture in the Florida sun",
  "Best products for removing mildew in bathrooms",
  "Kitchen deep cleaning tips for holiday entertaining",
  "How to prepare your home for professional cleaners",
  "Decluttering strategies for a stress-free home",
  "Cleaning tips for new parents in South Florida",
  "How to maintain pristine white surfaces in your home",
  "Tips for cleaning after a Florida rainstorm",
  "How to keep your garage clean and organized",
  "Cleaning checklist for vacation rental properties",
  "Best practices for cleaning glass and mirrors",
  "How to deep clean upholstery and fabric furniture",
  "Tips for maintaining hardwood floors in humid climates",
  "Cleaning tips for home offices and workspaces",
  "How to clean and sanitize children's toys and playrooms",
  "Best practices for cleaning outdoor pools and patios",
  "Tips for removing tough stains from carpets",
  "How to maintain a clean and fresh-smelling closet",
  "Cleaning tips for multi-generational Florida homes"
];

const CATEGORIES = ["Tips", "Guides", "Seasonal", "Health", "Home Care"];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get existing blog post slugs to avoid duplicates
    const { data: existingPosts } = await supabase
      .from('blog_posts')
      .select('slug, title');

    const existingTitles = new Set(existingPosts?.map(p => p.title.toLowerCase()) || []);

    // Pick a random topic that hasn't been used
    let topic = CLEANING_TOPICS[Math.floor(Math.random() * CLEANING_TOPICS.length)];
    let attempts = 0;
    while (existingTitles.has(topic.toLowerCase()) && attempts < 10) {
      topic = CLEANING_TOPICS[Math.floor(Math.random() * CLEANING_TOPICS.length)];
      attempts++;
    }

    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

    console.log(`Generating blog post about: ${topic}`);

    // Generate blog content using Lovable AI
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a professional content writer for TIDYWISE, a cleaning service company in South Florida. 
Write engaging, SEO-optimized blog posts about cleaning tips and home care.
Your content should be helpful, practical, and relevant to South Florida homeowners.
Focus on actionable advice that readers can implement immediately.
Include local references to Miami, Fort Lauderdale, Palm Beach, and other South Florida areas when appropriate.`
          },
          {
            role: 'user',
            content: `Write a blog post about: "${topic}"

Return your response in the following JSON format:
{
  "title": "SEO-optimized title (50-60 characters)",
  "excerpt": "Engaging summary (150-160 characters)",
  "content": "Full blog post content in HTML format with proper headings (h2, h3), paragraphs, and lists. Around 800-1200 words.",
  "read_time": "X min read"
}

The content should include:
- An engaging introduction
- 3-5 main sections with subheadings
- Practical tips and actionable advice
- A call-to-action mentioning TIDYWISE services
- Proper HTML formatting (use <h2>, <h3>, <p>, <ul>, <li>, <strong> tags)`
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded, please try again later' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required for AI usage' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    const aiContent = aiData.choices?.[0]?.message?.content;

    if (!aiContent) {
      throw new Error('No content generated from AI');
    }

    console.log('AI response received, parsing content...');

    // Parse the JSON response from AI
    let blogData;
    try {
      // Extract JSON from the response (handle markdown code blocks)
      const jsonMatch = aiContent.match(/```json\s*([\s\S]*?)\s*```/) || 
                        aiContent.match(/```\s*([\s\S]*?)\s*```/) ||
                        [null, aiContent];
      const jsonStr = jsonMatch[1] || aiContent;
      blogData = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.log('Raw AI content:', aiContent);
      throw new Error('Failed to parse AI-generated content');
    }

    // Generate slug from title
    const slug = blogData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 100);

    // Check if slug already exists
    const { data: existingSlug } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (existingSlug) {
      console.log('Slug already exists, skipping:', slug);
      return new Response(JSON.stringify({ 
        message: 'Blog post with similar title already exists',
        skipped: true 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Insert the new blog post
    const { data: newPost, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title: blogData.title,
        slug: slug,
        excerpt: blogData.excerpt,
        content: blogData.content,
        category: category,
        read_time: blogData.read_time || '5 min read',
        is_published: true,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to insert blog post:', insertError);
      throw new Error(`Failed to save blog post: ${insertError.message}`);
    }

    console.log('Blog post created successfully:', newPost.title);

    return new Response(JSON.stringify({ 
      success: true, 
      post: {
        id: newPost.id,
        title: newPost.title,
        slug: newPost.slug,
        category: newPost.category
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating blog post:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
