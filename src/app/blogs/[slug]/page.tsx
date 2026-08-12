import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import BlogDetailClient from './BlogDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const defaultBlogMap: Record<string, any> = {
  'essential-toddler-activity-learning': {
    id: 'd1', title: 'Why Activity-Based Learning is Essential for Toddlers',
    slug: 'essential-toddler-activity-learning',
    short_description: 'Discover the impact of active play and dynamic programs on child brain development.',
    content: `Early childhood is a crucial stage of development, and how children learn during these years shapes their future. Activity-Based Learning (ABL) is one of the most effective ways to support holistic growth in toddlers.\n\n## What is Activity-Based Learning?\n\nActivity-Based Learning is an educational approach that uses engaging activities and real-life experiences to help children learn by doing. It encourages exploration, curiosity, creativity, and problem-solving skills.\n\n## Why Does It Matter for Toddlers?\n\nToddlers between 1–5 years are in their most receptive phase of brain development. Studies show that:\n\n- Active play strengthens neural connections in the brain\n- Physical movement improves focus and memory retention\n- Group activities build social and emotional intelligence\n- Creative exploration nurtures confidence and self-expression\n\n## How Phulwari Implements ABL\n\nAt Phulwari Mother & Child Activity Centre, our structured programs combine gymnastics, dance, art, yoga, and music into a vibrant daily curriculum that gives toddlers the stimulation they need to thrive.`,
    category: 'Education', author_name: 'Phulwari Admin', created_at: new Date('2026-08-12').toISOString(), featured_image: '/galary1.webp'
  },
  'positive-parenting-emotional-bonds': {
    id: 'd2', title: 'Positive Parenting: Building Strong Emotional Bonds',
    slug: 'positive-parenting-emotional-bonds',
    short_description: 'Simple everyday strategies to nurture confidence, trust, and emotional well-being in children.',
    content: `Positive parenting is about building a strong, loving connection with your child while setting clear, healthy boundaries. It is not about being permissive — it is about being present, empathetic, and consistent.\n\n## The Core Principles of Positive Parenting\n\n- Listen actively without dismissing feelings\n- Use encouragement instead of criticism\n- Model the behavior you want to see\n- Set age-appropriate boundaries with kindness\n\n## How Emotional Bonds Shape Your Child's Future\n\nChildren who feel securely attached to their parents grow up to be more confident, socially competent, and emotionally resilient. They perform better in school and form healthier relationships throughout life.\n\n## Practical Tips for Everyday Connection\n\n- Dedicate 15 minutes of undivided one-on-one time daily\n- Use bedtime to share gratitude and talk about the day\n- Celebrate small wins and milestones enthusiastically\n- Use "I" statements when expressing concerns to avoid blame`,
    category: 'Parenting', author_name: 'Phulwari Admin', created_at: new Date('2026-08-08').toISOString(), featured_image: '/motherhappy.webp'
  },
  'creative-activities-child-development': {
    id: 'd3', title: 'Creative Activities That Boost Child Development',
    slug: 'creative-activities-child-development',
    short_description: 'Explore fun and creative activities that improve imagination, focus, and fine motor skills.',
    content: `Creativity is not just about art — it is a fundamental life skill. When children engage in creative activities, they learn to think flexibly, solve problems, and express themselves in meaningful ways.\n\n## Why Creativity is Essential\n\nCreative activities stimulate both hemispheres of the brain, developing:\n\n- Fine motor skills through drawing, clay, and craft\n- Language skills through storytelling and role play\n- Mathematical thinking through patterns and puzzles\n- Emotional intelligence through expressive arts\n\n## Best Creative Activities for Kids Aged 1–8\n\n- Clay Modeling & Sculpting\n- Finger Painting & Mixed Media Art\n- Music & Rhythm Games\n- Dance & Movement Stories\n- Building Blocks & LEGO\n\n## Phulwari's Creative Programs\n\nOur art and craft workshops, music sessions, and dance classes are carefully designed to nurture your child's creative intelligence in a joyful, encouraging environment.`,
    category: 'Activities', author_name: 'Phulwari Admin', created_at: new Date('2026-08-05').toISOString(), featured_image: '/arts.webp'
  },
  'child-developmental-milestones': {
    id: 'd4', title: "Understanding Your Child's Developmental Milestones",
    slug: 'child-developmental-milestones',
    short_description: "A guide to what's normal at every stage of your child's growth from 1 to 6 years.",
    content: `Every child develops at their own pace, but understanding general milestones helps parents identify whether development is on track or if additional support might be needed.\n\n## Age 1–2: The Toddler Surge\n\n- Begins walking and climbing\n- Starts speaking first words\n- Imitates adults in play\n- Shows strong attachment to caregivers\n\n## Age 2–3: Language Explosion\n\n- Vocabulary grows rapidly (200–300 words)\n- Begins two-word and three-word sentences\n- Shows parallel play with peers\n- Develops sense of self ("mine", "no")\n\n## Age 3–5: Social & Cognitive Growth\n\n- Engages in cooperative play\n- Understands rules and follows instructions\n- Draws recognizable figures and shapes\n- Shows curiosity and asks "why?" frequently\n\n## When to Seek Guidance\n\nIf your child isn't meeting key milestones, early intervention from qualified educators and therapists makes a significant positive difference. Phulwari's team is always here to support you.`,
    category: 'Child Development', author_name: 'Phulwari Admin', created_at: new Date('2026-08-01').toISOString(), featured_image: '/galary3.webp'
  },
  'healthy-eating-habits-children': {
    id: 'd5', title: 'Healthy Eating Habits for Growing Children',
    slug: 'healthy-eating-habits-children',
    short_description: 'Nutritional tips and easy meal ideas to keep your young one energized and focused.',
    content: `Good nutrition in early childhood lays the foundation for a lifetime of healthy habits. What children eat directly impacts their energy levels, concentration, immune system, and even their mood.\n\n## Key Nutrients for Growing Children\n\n- Protein: Essential for muscle and brain development (eggs, dal, paneer)\n- Iron: Prevents anaemia and supports cognitive function (spinach, jaggery, pulses)\n- Calcium: Builds strong bones and teeth (milk, curd, ragi)\n- Omega-3: Supports brain development (fish, walnuts, flaxseeds)\n\n## Building Healthy Habits at Home\n\n- Offer a rainbow of fruits and vegetables at every meal\n- Limit packaged snacks and sugary drinks\n- Make meal times screen-free and social\n- Let children participate in simple cooking tasks\n- Never use food as a reward or punishment\n\n## Quick Healthy Snack Ideas\n\nFruity yogurt parfait, roti with peanut butter, boiled egg with veggies, homemade chikki, banana smoothie with milk.`,
    category: 'Health', author_name: 'Phulwari Admin', created_at: new Date('2026-07-28').toISOString(), featured_image: '/mothertod.webp'
  },
  'yoga-mindfulness-benefits-kids': {
    id: 'd6', title: 'The Benefits of Yoga & Mindfulness for Kids',
    slug: 'yoga-mindfulness-benefits-kids',
    short_description: 'How introducing yoga early helps children build focus, flexibility, and emotional resilience.',
    content: `Yoga is no longer just for adults. Introducing children to yoga and mindfulness practices from a young age has profound benefits for their physical, mental, and emotional development.\n\n## Physical Benefits\n\n- Improves flexibility, balance, and body coordination\n- Builds core strength without strain\n- Develops spatial awareness and proprioception\n- Promotes healthy posture habits from early on\n\n## Mental & Emotional Benefits\n\n- Reduces anxiety and improves stress management\n- Enhances focus and concentration in school\n- Builds self-awareness and emotional regulation\n- Encourages patience and perseverance\n\n## Child-Friendly Yoga Techniques\n\nAt Phulwari, our trained yoga instructors use storytelling, animal poses (Butterfly, Cat-Cow, Cobra), breathing games, and relaxation techniques to make yoga fun and accessible for toddlers and young children.\n\n## Starting at Home\n\nJust 10 minutes of simple breathing and stretching before school can dramatically improve your child's readiness to learn and interact with others.`,
    category: 'Health', author_name: 'Phulwari Admin', created_at: new Date('2026-07-22').toISOString(), featured_image: '/yoga.webp'
  }
};

const allDefaultBlogs = Object.values(defaultBlogMap);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let blog: any = null;
  
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('blogs').select('*').eq('slug', slug).single();
    blog = data;
  } catch (err) {}

  if (!blog) blog = defaultBlogMap[slug] || null;

  if (!blog) {
    return {
      title: 'Article Not Found | Phulwari Patna',
      description: 'The requested parent guide or toddler active learning article was not found.'
    };
  }

  return {
    title: `${blog.title} | Parenting & Kids Development Blogs`,
    description: blog.short_description || 'Insightful articles, guides, and child developmental milestones compiled by experts at Phulwari Patna.',
    alternates: { canonical: `https://phulwari.co.in/blogs/${slug}` },
    openGraph: {
      title: blog.title,
      description: blog.short_description,
      url: `https://phulwari.co.in/blogs/${slug}`,
      type: 'article',
      images: blog.featured_image ? [{ url: blog.featured_image }] : []
    }
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let blog: any = null;
  let allBlogs: any[] = allDefaultBlogs;

  try {
    const supabase = await createClient();
    const [blogRes, allRes] = await Promise.all([
      supabase.from('blogs').select('*').eq('slug', slug).single(),
      supabase.from('blogs').select('id, title, slug, short_description, category, author_name, created_at, featured_image').eq('status', 'published').order('created_at', { ascending: false })
    ]);
    
    if (blogRes.data) blog = blogRes.data;
    if (allRes.data && allRes.data.length > 0) {
      const dbSlugs = new Set(allRes.data.map((b: any) => b.slug));
      const fillDefaults = allDefaultBlogs.filter(d => !dbSlugs.has(d.slug));
      allBlogs = [...allRes.data, ...fillDefaults];
    }
  } catch (err) {
    console.error('Failed to load blog details:', err);
  }

  if (!blog) blog = defaultBlogMap[slug] || null;

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-slate-500 bg-[#FFF7EC] p-4 text-center">
        <BookOpen className="w-16 h-16 text-pink-500 opacity-40" />
        <h2 className="text-xl font-bold">Article Not Found</h2>
        <p className="text-xs text-slate-400">The blog post you are looking for does not exist or has been removed.</p>
        <Link href="/blogs" className="px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-xs font-bold transition">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return <BlogDetailClient blog={blog} allBlogs={allBlogs} />;
}

