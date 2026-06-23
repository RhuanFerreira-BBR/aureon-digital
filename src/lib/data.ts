// ─── CASES DATA ─────────────────────────────────────────────────────────────
export const cases = [
  {
    id: "techbrasil-seo",
    tag: "SEO",
    client: "TechBrasil",
    title: "3× organic traffic in 90 days",
    subtitle: "From invisible to undeniable",
    desc: "TechBrasil was producing great content but ranking for nothing. We rebuilt their technical SEO foundation, overhauled their content architecture, and implemented a targeted link strategy.",
    challenge: "TechBrasil had a 4-year-old website with 200+ pages and zero ranking on their core keywords. Their team was publishing content weekly but seeing no traction — a classic case of technical debt blocking organic growth.",
    solution: "We started with a full site audit, eliminating 80+ zombie pages, fixing crawl errors, and consolidating topical clusters. We then rebuilt their keyword strategy from the ground up, targeting commercial-intent terms with real conversion potential.",
    result: "Within 90 days, organic sessions tripled. Their primary keyword went from position 47 to position 3. Leads from organic search increased by 240%.",
    metrics: [
      { label: "Traffic increase", value: "3×" },
      { label: "Keyword ranking", value: "#3" },
      { label: "Organic leads", value: "+240%" },
      { label: "Time to results", value: "90d" },
    ],
    industry: "Technology",
    services: ["Technical SEO", "Content Strategy", "Link Building"],
    color: "#4A90E2",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    year: "2025",
  },
  {
    id: "modavida-web",
    tag: "Web Design",
    client: "ModaVida",
    title: "E-commerce redesign that doubled conversions",
    subtitle: "Design as a revenue driver",
    desc: "ModaVida's store was losing customers at checkout. We redesigned the full purchase flow — from landing page to confirmation — with conversion science at the core.",
    challenge: "ModaVida had steady traffic but a 1.2% conversion rate — well below industry standard. Their checkout had 7 steps, poor mobile UX, and no trust signals. Cart abandonment was at 85%.",
    solution: "We reduced checkout to 3 steps, redesigned the product pages with social proof and urgency signals, rebuilt their mobile experience, and added a smart cart with AI-suggested items.",
    result: "Conversion rate went from 1.2% to 2.8% in 60 days. Revenue increased 88% without increasing ad spend. Cart abandonment dropped to 62%.",
    metrics: [
      { label: "Conversion rate", value: "2.8%" },
      { label: "Revenue increase", value: "+88%" },
      { label: "Cart abandonment", value: "−23pt" },
      { label: "Time to ship", value: "45d" },
    ],
    industry: "Fashion & E-commerce",
    services: ["UI/UX Design", "Web Development", "CRO"],
    color: "#E24A7A",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    year: "2025",
  },
  {
    id: "clinica-geo",
    tag: "GEO",
    client: "Clínica Saúde Prime",
    title: "Appearing in AI answers for 40+ health queries",
    subtitle: "First mover in generative search",
    desc: "When patients asked AI assistants about dermatologists in São Paulo, Clínica Saúde Prime wasn't showing up. We changed that entirely.",
    challenge: "As more patients began using ChatGPT and Perplexity to find healthcare providers, Clínica Saúde Prime was invisible in AI-generated answers — even though they had strong traditional SEO.",
    solution: "We implemented a GEO strategy: structured their expertise data, built authoritative citations, optimized for entity recognition, and created content specifically structured for LLM consumption.",
    result: "Within 4 months, the clinic appeared in AI-generated answers for 40+ relevant health queries. New patient inquiries increased by 65%, with 30% citing AI recommendations.",
    metrics: [
      { label: "AI queries covered", value: "40+" },
      { label: "New patient leads", value: "+65%" },
      { label: "AI attribution", value: "30%" },
      { label: "Time to results", value: "4mo" },
    ],
    industry: "Healthcare",
    services: ["GEO", "Entity SEO", "Content Architecture"],
    color: "#4AE2A0",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    year: "2026",
  },
  {
    id: "construtora-full",
    tag: "Full Stack",
    client: "Construtora Forma",
    title: "From zero digital presence to market leader",
    subtitle: "Building a digital empire from the ground up",
    desc: "Construtora Forma had no website, no SEO, no social presence. We built everything from scratch — brand identity, web platform, and a full digital marketing stack.",
    challenge: "A 20-year construction company with zero digital infrastructure. Their only leads came from word of mouth. Competitors were already dominating local search.",
    solution: "We designed and built a premium website, implemented local SEO, created a content program focused on real estate keywords, and set up their entire GEO infrastructure.",
    result: "In 8 months, they ranked #1 for their primary keywords, generated 120+ qualified leads per month, and closed 3 major contracts directly attributed to digital.",
    metrics: [
      { label: "Local ranking", value: "#1" },
      { label: "Monthly leads", value: "120+" },
      { label: "Direct contracts", value: "3" },
      { label: "ROI", value: "14×" },
    ],
    industry: "Real Estate",
    services: ["Web Design", "Local SEO", "GEO", "Brand Identity"],
    color: "#E2A44A",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    year: "2026",
  },
];

// ─── BLOG DATA ───────────────────────────────────────────────────────────────
export const posts = [
  {
    id: "geo-vs-seo-2025",
    tag: "GEO",
    title: "GEO vs SEO: Why the next decade belongs to AI search",
    excerpt: "Google is no longer the only place people find businesses. We break down what Generative Engine Optimization means for your brand and why you need to start now.",
    readTime: "6 min",
    date: "Jun 2026",
    author: "AUREON Team",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    body: `The search landscape is shifting faster than any time since the original Google PageRank revolution. With ChatGPT, Perplexity, and Google AI Overviews now answering direct questions — your business might be invisible even if you rank on page one.

**What is GEO?**

Generative Engine Optimization (GEO) is the practice of structuring your brand's online presence so that AI systems can accurately represent you in their generated answers. It's not about keywords or backlinks — it's about entity recognition, authoritative citations, and structured data that LLMs can parse and trust.

**The key differences**

SEO optimizes for crawlers and ranking algorithms. GEO optimizes for language models and their training/retrieval systems. While SEO asks "how do I rank for this keyword?", GEO asks "how do I become the definitive source on this topic that AI systems cite?"

**Why now?**

Early movers in GEO will establish authority before the space becomes competitive. The brands that appear in AI answers today are the ones that will be top-of-mind when AI search becomes the primary discovery channel — and that transition is happening faster than most realize.

**Three GEO fundamentals**

1. **Entity establishment**: Make sure AI systems know who you are, what you do, and why you matter. Wikipedia mentions, structured schema, consistent NAP citations.
2. **Authoritative content**: Create comprehensive, citable resources that LLMs reference. Think depth over breadth.
3. **Semantic coverage**: Cover your topic completely — questions, comparisons, definitions. LLMs pull from broad coverage.

The window to lead is open. Don't wait until your competitors have already claimed the AI-generated answer.`,
  },
  {
    id: "web-design-conversion-2025",
    tag: "Web Design",
    title: "The anatomy of a high-converting website in 2025",
    excerpt: "Most websites look good but convert badly. We break down the 8 elements that actually move the needle — with data from our client portfolio.",
    readTime: "8 min",
    date: "May 2026",
    author: "AUREON Team",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    body: `A beautiful website that doesn't convert is an expensive brochure. We've analyzed conversion data from 40+ client sites and identified the exact elements that separate 1% CVR from 4% CVR.

**1. Above-the-fold clarity**

You have 3 seconds. Your headline must answer: what do you do, who is it for, and what should I do next. Vague is fatal. "We help businesses grow" tells me nothing. "We triple organic traffic for B2B SaaS companies" tells me everything.

**2. Social proof within 2 scrolls**

Logos, testimonials, or case study snippets must appear before the user has to make any effort. Trust is the primary conversion barrier — address it early.

**3. One CTA, not five**

Every additional call-to-action you add dilutes click-through on all of them. Pick your primary conversion goal and ruthlessly eliminate competing options.

**4. Mobile-first, not mobile-adapted**

60%+ of your traffic is mobile. If your site was designed for desktop and "adapted" for mobile, you're losing half your conversions. Design for the thumb first.

**5. Speed as a feature**

Every second of load time costs 7% in conversions. Speed isn't a technical metric — it's a business metric.

**6. Friction audit**

Count the number of form fields, clicks, and decisions required to convert. Cut every non-essential step. We reduced a client's checkout from 7 steps to 3 and saw a 2.3× conversion increase.

**7. Trust infrastructure**

SSL badges, privacy policy, real team photos, real testimonials with full names and companies. Anonymized social proof is worthless.

**8. Exit-intent capture**

You're losing 97% of your visitors. A well-designed exit-intent flow can recover 5-15% of them. That's free traffic you're currently throwing away.`,
  },
  {
    id: "seo-technical-fundamentals",
    tag: "SEO",
    title: "Technical SEO in 2025: the fundamentals still win",
    excerpt: "While everyone chases AI trends, most sites are failing on basics. Here's the technical SEO checklist that still drives 80% of ranking results.",
    readTime: "5 min",
    date: "Apr 2026",
    author: "AUREON Team",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80",
    body: `The SEO industry loves shiny objects. AI content, topical authority, E-E-A-T signals — these matter, but most sites fail before they get to any of it. Fix your fundamentals first.

**Core Web Vitals**

Google's Page Experience signals are real ranking factors. LCP under 2.5s, INP under 200ms, CLS under 0.1. Run PageSpeed Insights on your 10 most important pages and fix what's failing.

**Crawl budget management**

Large sites with poor crawl budget management are leaving ranking potential on the table. Audit your robots.txt, eliminate paginated duplicate content, and ensure Google is spending its crawl time on your money pages.

**Internal linking architecture**

Your link equity flows through your site based on internal links. Most sites have it backwards — the homepage gets all the links and the conversion pages get none. Fix your topical hubs.

**Structured data**

Schema markup is no longer optional. Organization, LocalBusiness, FAQ, Article, BreadcrumbList — implement the schemas relevant to your business type and watch your SERP real estate expand.

**Core ranking signal: relevance**

Before any technical work, your content must actually answer the query better than what's currently ranking. Keyword stuffing is dead. Match search intent with depth, clarity, and genuine expertise.

The brands that win in organic search aren't the ones doing the most exotic tactics — they're the ones who've nailed the basics and execute them consistently.`,
  },
  {
    id: "smb-digital-strategy-brazil",
    tag: "Strategy",
    title: "Digital strategy for Brazilian SMBs: what actually works",
    excerpt: "The Brazilian digital market has unique characteristics. We share what we've learned from 40+ local projects — what to prioritize and what to skip.",
    readTime: "7 min",
    date: "Mar 2026",
    author: "AUREON Team",
    image: "https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?w=800&q=80",
    body: `Brazil is one of the world's most dynamic digital markets — mobile-first, social-heavy, and highly competitive. Generic digital marketing advice often misses the mark here.

**Mobile is not optional**

Brazil has over 250 million mobile connections and one of the highest smartphone usage rates globally. If your site isn't optimized for mobile, you're effectively invisible to the majority of your market.

**WhatsApp as a conversion channel**

Brazilian consumers expect to communicate via WhatsApp. Integrating a WhatsApp contact flow into your site — not just as a button, but as a designed conversion path — consistently outperforms traditional contact forms by 3-5×.

**Local SEO is underutilized**

Most Brazilian SMBs still haven't claimed or optimized their Google Business Profile. Local SEO competition is lower than in more mature markets, meaning the opportunity to dominate local search is significant.

**Content in Portuguese matters**

Not just translation — actual original Portuguese content that speaks to Brazilian context, problems, and references. Translated English content always underperforms locally-native content.

**The GEO opportunity is wide open**

In Brazil, almost no SMBs have any GEO strategy. The companies that move first to establish AI search presence in the next 12-18 months will have a substantial first-mover advantage.

The Brazilian SMB that invests in a solid digital foundation today — web, SEO, WhatsApp integration, GEO — will be 3 steps ahead of competitors who wait.`,
  },
];
