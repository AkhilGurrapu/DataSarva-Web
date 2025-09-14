# DataSarva-Web Application Component Reference

## Table of Contents
1. [Application Overview](#application-overview)
2. [File Structure](#file-structure)
3. [Pages](#pages)
4. [Layout Components](#layout-components)
5. [Home Section Components](#home-section-components)
6. [3D Components](#3d-components)
7. [Animation Components](#animation-components)
8. [UI Components](#ui-components)
9. [Data Layer](#data-layer)
10. [Configuration Files](#configuration-files)
11. [Quick Reference Guide](#quick-reference-guide)

---

## Application Overview

**DataSarva-Web** is a modern React/TypeScript full-stack application designed as a data insights hub and thought leadership platform to build audience and distribution for a future data, AI, and analytics SaaS and consulting company. The application combines professional presentation with sophisticated 3D interactive elements, comprehensive blog functionality, and automated lead generation workflows.

**Technology Stack**:
- **Frontend**: React 18.3.1, TypeScript 5.6.3, Vite 5.4.14, Wouter 3.3.5 Router
- **UI/Animations**: React Three Fiber 8.17.10, GSAP 3.13.0, Framer Motion 11.13.1, Tailwind CSS 3.4.14
- **Components**: Complete Radix UI + shadcn/ui library (65+ components)
- **Backend**: Express.js 4.21.2, Drizzle ORM 0.39.1, Supabase 2.50.0, Passport.js 0.7.0
- **Forms/Validation**: React Hook Form 7.53.1, Zod 3.23.8

---

## File Structure

```
/client/
├── public/
├── src/
│   ├── components/
│   │   ├── 3d/                    # 3D visual components
│   │   ├── animations/            # GSAP animation components
│   │   ├── home/                  # Homepage section components
│   │   ├── layout/                # Global layout components
│   │   └── ui/                    # shadcn/ui component library
│   ├── data/                      # Static data and content
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utilities and type definitions
│   ├── pages/                     # Route components
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Global styles and animations
├── index.html                     # HTML entry point
└── package.json
```

---

## Pages

### `/client/src/pages/Home.tsx`
**Purpose**: Main landing page
**Route**: `/`

#### Page Structure (Top to Bottom):
1. **Header** - Navigation component
2. **HeroSection** - Main hero with 3D elements
3. **ContentSections** - Platform features showcase
4. **ClientsSection** - Partner/technology logos
5. **ServicesSection** - Services and expertise
6. **ResourcesSection** - Knowledge center preview
7. **BlogPreviewSection** - Latest blog posts
8. **CTASection** - Newsletter signup form
9. **Footer** - Site footer

**Key Elements**:
- Main container: `<div className="min-h-screen bg-background">`
- Smooth scrolling enabled for anchor navigation
- Each section has an ID for navigation targeting

### `/client/src/pages/blog.tsx`
**Purpose**: Blog listing and filtering page
**Route**: `/blog`
**Current Status**: ✅ **OPTIMIZED - Clean, fast, content-focused design**

#### Key Features:
**IMPORTANT**: This page is already implemented as requested - clean, simple, and fast without heavy 3D animations.

- **Clean Hero Banner**: `bg-primary text-white py-12 mb-8`
  - Title: "Knowledge Center"
  - Subtitle: "Discover tutorials, guides, and insights..."
  - Professional search input with clean styling
  - Search icon integration without complex animations

- **Learning Paths Section**: `<section className="mb-12">`
  - Title: "Learning Paths" with simple BookMarked icon
  - Three structured learning path cards in responsive grid
  - Clean card design: `<Card className="rounded-lg border-l-4 border-primary">`

- **Content Tabs**: Using shadcn/ui `<Tabs>` component
  - Tab Options: "All Content", "Tutorials", "Articles", "Saved"
  - Simple filter button: `<Button variant="outline">` with Filter icon

- **Filters Panel**: Clean white background with minimal styling
  - `bg-white p-4 rounded-lg mb-6 border border-neutral-200`
  - Category filter buttons without heavy animations
  - Popular tags section with simple interaction

- **Blog Posts Grid**: Responsive grid layout
  - `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
  - Featured post with larger, clean layout
  - Regular blog post cards with content-focused design

#### Blog Post Card Structure:
```jsx
<Card className="rounded-xl overflow-hidden bg-white border border-gray-200">
  <div className="h-40 overflow-hidden relative">
    // Post image
    <span className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full">
      // Difficulty badge
    </span>
  </div>
  <CardContent className="p-5">
    // Category badge, title, description, read time
  </CardContent>
</Card>
```

### `/client/src/pages/BlogPost.tsx`
**Purpose**: Individual blog post detail page
**Route**: `/blog/:slug`
**Current Status**: ✅ **OPTIMIZED - Simple, fast, clean reading experience**

#### Page Structure:
**IMPORTANT**: This page is already optimized as requested - minimal design focused on content readability without heavy animations.

- **Clean Navigation Breadcrumb**: `bg-neutral-100 py-3 border-b border-neutral-200`
  - Simple breadcrumb: Blog > Category > Post Title
  - ChevronRight icons without complex animations

- **Optimized Two-Column Layout**:
  - **Sidebar** (1/4 width): Clean table of contents, reading info, simple share buttons
  - **Main Content** (3/4 width): Content-focused layout with related articles

#### Sidebar Elements:
- **Back Button**: `<Button variant="outline">` with ArrowLeft icon
- **Table of Contents**: Auto-generated from markdown headings
  - Active section highlighting with primary color
  - Smooth scroll navigation to sections
- **Reading Info Box**: `bg-neutral-100 p-4 rounded-md`
  - Read time estimate with Clock icon
  - Last updated date with Calendar icon
- **Share Buttons**: Link and Download icons

#### Main Content Elements:
- **Category Badge**: `bg-blue-100 text-primary text-sm font-medium rounded-full`
- **Post Title**: `text-3xl md:text-4xl font-bold mb-6`
- **Featured Image**: `w-full h-auto rounded-xl border border-gray-200`
- **Author Info**: `bg-neutral-50 rounded-lg border border-neutral-100`
  - Author avatar, name, title, last updated date
- **Article Metadata**: Grid with title, date, category, skill level
- **Markdown Content**: Custom processed HTML with syntax highlighting
- **Related Articles**: Grid of 2 related posts from same category

### `/client/src/pages/about.tsx`
**Purpose**: Company information and team
**Route**: `/about`

#### Page Sections:
- **Hero Section**: Company mission and description
- **Core Values**: Excellence, Innovation, Integrity
- **Research Team**: Profiles with avatars and roles
- **Research Approach**: Methodology explanation
- **Technology-First Analysis**: Process overview

### `/client/src/pages/resources.tsx`
**Purpose**: Resource library and filtering
**Route**: `/resources`

#### Resource Types:
- **White Papers**: PDF downloads with document icons
- **Case Studies**: Detailed reports with folder icons
- **Guides & Tutorials**: Step-by-step content with book icons
- **Webinars**: Video content with play icons

#### Features:
- Search functionality with magnifying glass icon
- Category filtering buttons
- Resource cards with badges, read time, action buttons

### `/client/src/pages/not-found.tsx`
**Purpose**: 404 error page
**Route**: Fallback for unmatched routes

#### Page Structure:
```jsx
<div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
  <Card className="w-full max-w-md mx-4">
    <CardContent className="pt-6">
      // AlertCircle icon + "404 Page Not Found" heading
      // Helper message about adding page to router
    </CardContent>
  </Card>
</div>
```

#### Key Elements:
- **Icon**: AlertCircle (red color, h-8 w-8)
- **Title**: "404 Page Not Found" (text-2xl font-bold)
- **Message**: Developer-friendly hint about router configuration
- **Styling**: Centered card layout on gray background

---

## Layout Components

### `/client/src/components/layout/Header.tsx`
**Purpose**: Global navigation header

#### Structure:
```jsx
<header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
  <div className="container mx-auto px-6">
    <div className="flex items-center justify-between h-16">
      // Logo, Navigation, Mobile Menu, CTA Button
    </div>
  </div>
</header>
```

#### Key Elements:
- **Logo**: "DataSarva" text with color styling
- **Navigation Links**:
  - Services (`/#services`)
  - Resources (`/#resources`)
  - Blog (`/blog`)
  - About (`/about`)
- **CTA Button**: "Join Newsletter" (`/#contact`)
- **Mobile Menu**: Hamburger icon with slide-out menu

#### Responsive Behavior:
- Desktop: Full navigation visible
- Mobile: Hamburger menu with overlay

### `/client/src/components/layout/Footer.tsx`
**Purpose**: Global site footer

#### Four-Column Layout:
1. **Company Column**:
   - DataSarva branding
   - Company description
   - Social media icons (Facebook, Twitter, LinkedIn, Instagram)

2. **Solutions Column**:
   - Snowflake, Databricks, Power BI, AI & ML links

3. **Services Column**:
   - Data Strategy, Cloud Architecture, Analytics, MLOps links

4. **Company Column**:
   - About, Careers, Blog, Resources, Contact links

#### Footer Bottom:
- Copyright notice with auto-updating year
- Legal links: Privacy Policy, Terms of Service, Cookie Policy

---

## Home Section Components

### `/client/src/components/home/HeroSection.tsx`
**Purpose**: Main hero section with 3D elements

#### Background Elements:
- **CSS Mountain Environment**: Full mountain scene with snow
- **Starfield Background**: Animated star particles
- **Network Nodes**: Floating connection points with animated lines
- **3D Geometric Shapes**: Floating polyhedrons with rotation

#### Content Structure:
```jsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  // Background layers
  <div className="relative z-10 container mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      // Left column: Text content
      // Right column: Tech showcases
    </div>
  </div>
</section>
```

#### Left Column Content:
- **Main Heading**: "Transform Your Data Into AI-Powered Insights"
- **Description**: Platform capabilities explanation
- **Feature Grid**: 2x2 grid with icons and descriptions
  - AI/ML Resources (Brain icon)
  - Analytics Platform (BarChart3 icon)
  - Open Source Tools (Code icon)
  - Learning Hub (BookOpen icon)
- **CTA Buttons**: "Explore Resources" and "Free Tools"

#### Right Column Elements:
- **Enhanced Tech Logos**: Floating technology cards
- **Real-time Insights**: AI analysis display with metrics
- **3D Visual Effects**: Mouse-following parallax elements

#### Interactive Animations:
- Mouse movement parallax on 3D elements
- Scroll-triggered reveal animations
- Continuous floating animations on tech cards
- Network connection line animations

### `/client/src/components/home/ContentSections.tsx`
**Purpose**: Platform features showcase

#### Two Main Sections:
1. **Comprehensive Data Platform**:
   - **Background**: Dark gradient with animated grid pattern
   - **Three Feature Columns**:
     - AI/ML Pipeline (AutoML, Model Versioning, Real-time Serving)
     - Real-time Analytics (Stream Processing, Dashboards, Anomaly Detection)
     - Data Engineering (ETL/ELT, Data Quality, Schema Evolution)

2. **Learning Resources**:
   - **Documentation**: Browse comprehensive guides
   - **Tutorials**: Step-by-step learning paths
   - **Examples**: Real-world implementations

#### Visual Design:
- Cards with `bg-white/10 backdrop-blur-sm` styling
- Animated grid background pattern
- Hover effects with scale transforms
- Icon-based feature representation

### `/client/src/components/home/ServicesSection.tsx`
**Purpose**: Services and expertise showcase
**Background**: CSS Mountain backdrop with snow effects

#### Service Grid (2x3 layout):
1. **Data Strategy Patterns**: Strategic planning and governance
2. **AI Engineering Insights**: Machine learning and AI implementation
3. **Cloud Architecture Studies**: Scalable infrastructure design
4. **Data Engineering Mastery**: Pipeline and infrastructure expertise
5. **Analytics Excellence**: Business intelligence and reporting
6. **MLOps & DataOps**: Operational excellence in data workflows

#### Additional Content:
- **Service Approach Process**: Discovery → Design → Implementation → Optimization
- **Engagement Models**: Strategic Advisory, Project-Based, Managed Services
- **Technology Integration**: Compact tech showcase component

#### Container Structure:
```jsx
<CSSMountainBackdrop intensity="light" showSnow={true}>
  <section id="services" className="py-20 relative z-10">
    // Service content
  </section>
</CSSMountainBackdrop>
```

### `/client/src/components/home/ClientsSection.tsx`
**Purpose**: Technology partner showcase

#### Partner Categories (5 columns):
1. **Microsoft Ecosystem**: Azure, Office 365, Power Platform
2. **AWS Cloud Platform**: EC2, S3, Lambda, RDS
3. **Google Cloud AI**: BigQuery, Vertex AI, Cloud ML
4. **Enterprise Solutions**: SAP, Oracle, Salesforce
5. **Data Platforms**: Snowflake, Databricks, Tableau

#### Visual Design:
- Gradient background with subtle pattern overlay
- Partner logos in card format
- Hover effects with shadow changes
- Grid layout responsive to screen size

### `/client/src/components/home/ResourcesSection.tsx`
**Purpose**: Knowledge center preview
**Background**: CSS Mountain backdrop with enhanced snow

#### Filter Buttons:
- All Resources (default active)
- White Papers
- Case Studies
- Guides
- Webinars

#### Resource Cards (2x2 grid):
Each card contains:
- **Resource image**: Placeholder or actual thumbnail
- **Resource type badge**: Colored badge (blue for White Papers, green for Case Studies, etc.)
- **Title**: Resource name
- **Description**: Brief overview
- **Read time**: Estimated reading time with Clock icon
- **Action button**: "Download" or "Read More"

#### Sample Resources:
1. **White Paper**: "AI Trends in 2024" (15 min read)
2. **Case Study**: "Fortune 500 Transformation" (8 min read)
3. **Guide**: "MLOps Best Practices" (12 min read)
4. **Webinar**: "Real-time AI Analytics" (45 min watch)

### `/client/src/components/home/BlogPreviewSection.tsx`
**Purpose**: Latest blog posts preview

#### Section Structure:
```jsx
<section className="py-20 bg-neutral-50">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      // Section header
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      // Blog post cards
    </div>
    <div className="text-center mt-12">
      // CTA button
    </div>
  </div>
</section>
```

#### Featured Blog Posts:
1. **"5 AI Trends Reshaping Enterprise Data Analytics in 2023"**
   - Category: AI & Machine Learning
   - Date: June 15, 2023
   - Image: Unsplash AI trends photo

2. **"Building an End-to-End ML Pipeline with Databricks"**
   - Category: Tutorials
   - Date: May 28, 2023
   - Image: Unsplash coding photo

3. **"The Business Leader's Guide to Data Governance"**
   - Category: Data Strategy
   - Date: May 10, 2023
   - Image: Unsplash business meeting photo

#### Blog Card Structure:
- **Image container**: `h-48 overflow-hidden`
- **Content area**: Date, category badge, title, description
- **Read more link**: Arrow icon with "Read Post" text

### `/client/src/components/home/CTASection.tsx`
**Purpose**: Newsletter signup and contact form
**Background**: CSS Mountain environment with heavy snow/blizzard effects

#### Form Configuration:
- **Validation**: Zod schema with comprehensive field validation
- **Backend**: Supabase integration for form submission
- **Notifications**: React Hot Toast for success/error feedback

#### Form Fields:
1. **Full Name** (required, min 2 characters)
2. **Email Address** (required, valid email format)
3. **Company** (required, min 2 characters)
4. **Interest Selection** (dropdown):
   - Data Strategy Consulting
   - AI/ML Implementation
   - Cloud Architecture
   - Analytics Solutions
   - Training & Education
5. **Message** (required, min 10 characters)

#### Benefits Section:
- **Weekly Deep-Dives**: Implementation insights and case studies
- **Exclusive Analyses**: Technology reviews and market insights
- **Early Access**: Research findings and product previews

#### Visual Elements:
- Mountain environment with heavy blizzard effects
- Form container with glassmorphism styling
- Submit button with loading states
- Success/error toast notifications

### `/client/src/components/home/CaseStudiesSection.tsx`
**Purpose**: Customer success stories and case studies showcase
**Status**: Available but not currently used in Home.tsx

#### Featured Case Studies:
1. **Global Bank Snowflake Migration**:
   - Industry: Financial Services
   - Results: 40% faster analytics, $2.5M annual savings
   - Technologies: Snowflake, Power BI
   - Link: `#case-study-1`

2. **Healthcare Provider AI Implementation**:
   - Industry: Healthcare
   - Focus: Patient outcomes improvement
   - AI-driven analytics solutions

3. **Manufacturing Analytics Platform**:
   - Industry: Manufacturing
   - Data-driven operational efficiency

#### Card Structure:
- Industry badge with colored background
- Case study title and description
- Results metrics highlighting
- Technology badges (Snowflake, Power BI, etc.)
- "Read Case Study" CTA with ArrowRight icon

### `/client/src/components/home/ProductsSection.tsx`
**Purpose**: Product and service deep-dive showcases
**Status**: Available but not currently used in Home.tsx

#### Featured Products:
1. **Snowflake Deep Dives**:
   - Architecture breakdowns
   - Cost optimization guides
   - Performance benchmarks
   - Color: Primary blue theme

2. **Databricks Analytics**:
   - Lakehouse architecture
   - MLflow integration
   - Spark optimization
   - Color: Orange theme

3. **Power BI Mastery**:
   - Dashboard design
   - DAX optimization
   - Data modeling
   - Color: Yellow theme

4. **AI/ML Solutions**:
   - Model deployment
   - MLOps practices
   - Feature engineering
   - Color: Purple theme

#### Card Features:
- Checkmark icons for feature lists
- Product-specific color theming
- "Learn More" CTAs with ArrowRight icons
- Responsive grid layout (2x2)

### `/client/src/components/home/TestimonialsSection.tsx`
**Purpose**: Customer testimonials carousel
**Status**: Available but not currently used in Home.tsx

#### Testimonial Data:
1. **Sarah Johnson** (CIO, Global Financial Services):
   - 5-star rating
   - Focus: Snowflake implementation and dashboards
   - Impact: Bottom-line results

2. **Michael Chen** (CTO, Tech Startup):
   - 5-star rating
   - Focus: AI implementation and ML optimization
   - Results: Exceeded expectations

3. **Rebecca Torres** (VP Analytics, E-commerce):
   - 5-star rating
   - Focus: Real-time analytics and customer insights
   - Impact: Revenue growth

#### Carousel Features:
- Navigation arrows (ChevronLeft, ChevronRight)
- 5-star rating display with Star icons
- Author information with User icon placeholders
- Auto-play functionality
- Mobile-responsive design
- Smooth transitions between testimonials

#### Card Structure:
```jsx
<Card className="bg-white shadow-lg">
  <CardContent className="p-8">
    // Star rating
    // Quote text
    // Author info with avatar placeholder
  </CardContent>
</Card>
```

---

## 3D Components

### `/client/src/components/3d/CSSMountainEnvironment.tsx`
**Purpose**: CSS-based mountain backgrounds

#### Components Available:
1. **CSSMountainEnvironment**: Full mountain scene
2. **CSSMountainBackdrop**: Simplified version

#### Props Configuration:
```typescript
interface MountainProps {
  intensity?: "light" | "medium" | "heavy";
  showSnow?: boolean;
  showBlizzard?: boolean;
  children: React.ReactNode;
}
```

#### Visual Layers:
1. **Mountain Silhouettes**: 4 layers with CSS clip-path
2. **Snow Particles**: Animated falling snow
3. **Blizzard Effects**: Heavy snow for dramatic scenes
4. **Atmospheric Clouds**: Subtle cloud movement
5. **Gradient Overlays**: For content readability

#### CSS Classes Used:
- Mountain layers: Custom clip-path shapes
- Snow animation: `animate-snow-fall` keyframe
- Blizzard: `animate-blizzard` with opacity changes
- Clouds: `animate-cloud-drift` for movement

### `/client/src/components/3d/SimpleTechShowcase.tsx`
**Purpose**: Technology logo displays with animations

#### Available Components:
1. **SimpleTechShowcase**: Main showcase with multiple layouts
2. **CompactTechShowcase**: Horizontal compact version
3. **EnhancedTechLogos**: Full version with starfield background

#### Technology Cards:
1. **Snowflake**: Blue theme with snowflake icon
2. **Power BI**: Yellow theme with BarChart3 icon
3. **Databricks**: Orange theme with Database icon
4. **AI/ML**: Purple theme with Brain icon
5. **Microsoft Fabric**: Green theme with Layers icon

#### Animation Features:
- Floating movement with CSS transforms
- Glow effects on hover
- Network connection lines between cards
- Starfield background integration
- System status indicators

#### Layout Options:
- **Horizontal**: Single row layout for headers
- **Grid**: 2x3 or 3x2 grid arrangement
- **Floating**: Absolute positioned cards

### `/client/src/components/3d/StarTrekStarfield.tsx`
**Purpose**: 3D starfield background using React Three Fiber

#### Main Components:
1. **AnimatedStars**: 8000 star particle system
2. **NebulaCloud**: Layered nebula effects
3. **ShootingStars**: Animated meteor trails
4. **FloatingParticles**: Cyan particle system
5. **CameraController**: Subtle camera movement

#### Star Types:
- **Blue Giants**: Large bright blue stars
- **White Dwarfs**: Medium white stars
- **Yellow Stars**: Sun-like yellow stars
- **Red Giants**: Large red stars

#### Visual Effects:
- Stellar classification system
- Dynamic camera movement
- Colored point lights for atmosphere
- Pulsar effects
- Distant galaxy rendering
- Parallax movement based on camera position

#### Performance Optimizations:
- Instanced rendering for stars
- Level-of-detail system
- Frustum culling
- Efficient particle systems

### `/client/src/components/3d/SolarSystemHub.tsx`
**Purpose**: 3D solar system visualization with orbital mechanics
**Status**: Available as lazy-loaded component

#### Features:
- Planetary orbital systems
- Gravitational animations
- Space-themed visual elements
- Smooth orbital rotations
- Interactive 3D environment

### Additional 3D Components (Legacy/Alternative Versions):

#### `/client/src/components/3d/DeviceOptimized3D.tsx`
**Purpose**: Performance-optimized 3D components for different devices

#### `/client/src/components/3d/EnhancedTechLogos.tsx`
**Purpose**: Enhanced version of technology showcases

#### `/client/src/components/3d/FloatingTechLogos.tsx`
**Purpose**: Alternative floating technology logo implementation

#### `/client/src/components/3d/Mountain3D.tsx`
**Purpose**: 3D mountain environment (alternative to CSS version)

#### `/client/src/components/3d/MountainEnvironment.tsx`
**Purpose**: Comprehensive 3D mountain scene with React Three Fiber

#### `/client/src/components/3d/SnowParticles.tsx`
**Purpose**: Dedicated snow particle system for 3D scenes

**Note**: Many of these are alternative implementations or legacy versions. The primary 3D components currently in use are `CSSMountainEnvironment`, `SimpleTechShowcase`, and `StarTrekStarfield`.

---

## Animation Components

### `/client/src/components/animations/ScrollAnimations.tsx`
**Purpose**: GSAP-powered scroll animations

#### Animation Categories:
1. **Data Stream Animations**: Flowing data particles
2. **Hero Section Parallax**: Mouse-following 3D effects
3. **Tech Module Animations**: Floating technology cards
4. **Network Connections**: Animated connection lines
5. **Section Reveals**: Scroll-triggered element reveals
6. **Holographic UI**: Futuristic interface elements

#### Key Animation Functions:
- `initializeScrollAnimations()`: Sets up all scroll triggers
- `initializeDataStreams()`: Creates flowing data particles
- `initializeHeroAnimations()`: Hero section specific animations
- `initializeNetworkAnimations()`: Connection line systems
- `initializeHolographicUI()`: Sci-fi interface elements

#### GSAP Plugins Used:
- ScrollTrigger: Scroll-based animation triggers
- MotionPath: Path-following animations
- TextPlugin: Text animation effects

### `/client/src/components/animations/SmoothScrollProvider.tsx`
**Purpose**: Global smooth scroll context

#### Features:
- Provides smooth scrolling behavior across the application
- Integrates with anchor link navigation
- Configurable scroll duration and easing

---

## UI Components

### Complete shadcn/ui Library (`/client/src/components/ui/`)

#### Form Components:
- **Button**: `button.tsx` - Primary, secondary, outline, ghost variants
- **Input**: `input.tsx` - Text inputs with validation states
- **Textarea**: `textarea.tsx` - Multi-line text input
- **Select**: `select.tsx` - Dropdown selection component
- **Form**: `form.tsx` - Form context and validation wrapper
- **Label**: `label.tsx` - Form field labels

#### Layout Components:
- **Card**: `card.tsx` - Content containers with header, content, footer
- **Sheet**: `sheet.tsx` - Slide-out panels and drawers
- **Dialog**: `dialog.tsx` - Modal dialogs and popups
- **Tabs**: `tabs.tsx` - Tabbed interface component
- **Separator**: `separator.tsx` - Visual content dividers

#### Feedback Components:
- **Toast**: `toast.tsx` + `toaster.tsx` - Notification system
- **Alert**: `alert.tsx` - Warning and info messages
- **Progress**: `progress.tsx` - Progress bars and loading states
- **Skeleton**: `skeleton.tsx` - Loading placeholder animations

#### Navigation Components:
- **Breadcrumb**: `breadcrumb.tsx` - Navigation path display
- **Pagination**: `pagination.tsx` - Page navigation controls
- **Menu**: `menubar.tsx`, `navigation-menu.tsx` - Navigation menus

#### Data Display:
- **Table**: `table.tsx` - Data tables with sorting and filtering
- **Badge**: `badge.tsx` - Status indicators and labels
- **Avatar**: `avatar.tsx` - User profile images
- **Tooltip**: `tooltip.tsx` - Hover information displays

#### Interactive Components:
- **Carousel**: `carousel.tsx` - Image and content carousels
- **Calendar**: `calendar.tsx` - Date selection interface
- **Chart**: `chart.tsx` - Data visualization components
- **Command**: `command.tsx` - Command palette interface

---

## Data Layer

### `/client/src/data/blogPosts.ts`
**Purpose**: Blog posts data and metadata

#### Main Export:
```typescript
export const blogPosts: BlogPost[] = [
  // Array of 10+ blog posts with full metadata
];
```

#### Additional Exports:
- **learningPaths**: Structured learning tracks
  - Data Engineering Fundamentals (8 articles, 12 hours)
  - AI & ML in Production (6 articles, 10 hours)
  - Business Intelligence Mastery (7 articles, 8 hours)
- **categories**: Blog category filters
- **popularTags**: Tag system for content filtering

#### Blog Post Structure:
```typescript
interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  link: string;
}
```

### `/client/src/data/blog-posts/` Directory
**Purpose**: Markdown files for individual blog posts

#### Available Posts:
- `create-microsoft-fabric-lakehouse.md`
- `ml-pipeline-databricks-tutorial.md`
- `business-leaders-guide-data-governance.md`
- `optimizing-snowflake-performance.md`
- `ethical-considerations-ai-development.md`
- `implementing-data-mesh-architecture.md`
- `power-bi-vs-tableau.md`
- `getting-started-spark-databricks.md`

---

## Configuration Files

### `/client/index.html`
**Purpose**: HTML entry point

#### Key Elements:
- **Title**: "DataSarva | Data Analytics & AI Hub"
- **Meta Description**: SEO-optimized description
- **Favicon**: Custom data URL with blue background
- **Google Fonts**: Roboto and Source Code Pro
- **Viewport**: Responsive meta tag
- **Root Element**: `<div id="root"></div>`

### `/client/src/main.tsx`
**Purpose**: React application entry point

#### Configuration:
- React 18 root creation
- StrictMode wrapper
- Global CSS import
- App component mounting

### `/client/src/App.tsx`
**Purpose**: Main application component

#### Key Features:
- **Router Setup**: Wouter-based routing
- **Global Background**: StarTrekStarfield component
- **Floating Elements**: Data streams with CSS animations
- **Smooth Scroll**: Provider wrapper
- **GSAP Integration**: Scroll animations initialization

#### Route Configuration:
```typescript
const blogPostSlugs = [
  "create-microsoft-fabric-lakehouse",
  "ml-pipeline-databricks-tutorial",
  // ... more slugs
];
```

### `/client/src/lib/` Directory

#### Type Definitions (`types.ts`):
```typescript
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  link: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "white-paper" | "case-study" | "guide" | "webinar";
  image: string;
  readTime?: number;
  watchTime?: number;
  downloadUrl?: string;
  viewUrl?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}
```

#### Utility Functions (`utils.ts`):
- `cn()`: Tailwind class name merging utility
- Date formatting functions
- URL slug generation
- Text truncation utilities

#### External Integrations:
- **Supabase Client** (`supabaseClient.ts`): Database connection
- **React Query** (`queryClient.ts`): Data fetching configuration
- **Markdown Parser** (`markdown.ts`): Markdown to HTML conversion

### `/client/src/index.css`
**Purpose**: Global styles and animations

#### CSS Custom Properties:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  // ... more CSS variables
}
```

#### Animation Keyframes:
- **gradientShift**: Background gradient animation
- **gridMove**: 3D grid movement effect
- **float**: Floating element animation
- **rotate3d**: 3D rotation effects
- **pulse**: Pulsing animation
- **drawLine**: SVG line drawing animation
- **shimmer**: Shimmer loading effect
- **dataFlow**: Data stream flow animation
- **slideIn** variants: Entrance animations from different directions
- **fadeInScale**: Fade and scale entrance
- **twinkle**: Star twinkling effect
- **nodeFloat**: Network node floating
- **lineGlow**: Connection line glow effect

---

## Quick Reference Guide

### Making Changes to Specific Elements

#### Homepage Sections:
- **Hero Section**: Edit `/client/src/components/home/HeroSection.tsx`
- **Services**: Edit `/client/src/components/home/ServicesSection.tsx`
- **Resources Preview**: Edit `/client/src/components/home/ResourcesSection.tsx`
- **Blog Preview**: Edit `/client/src/components/home/BlogPreviewSection.tsx`
- **Newsletter Form**: Edit `/client/src/components/home/CTASection.tsx`

#### Navigation:
- **Header Menu**: Edit `/client/src/components/layout/Header.tsx`
- **Footer Links**: Edit `/client/src/components/layout/Footer.tsx`

#### Blog System:
- **Blog Listing**: Edit `/client/src/pages/blog.tsx`
- **Blog Post Template**: Edit `/client/src/pages/BlogPost.tsx`
- **Blog Data**: Edit `/client/src/data/blogPosts.ts`
- **Blog Content**: Add/edit files in `/client/src/data/blog-posts/`

#### 3D Effects:
- **Mountain Backgrounds**: Edit `/client/src/components/3d/CSSMountainEnvironment.tsx`
- **Tech Showcases**: Edit `/client/src/components/3d/SimpleTechShowcase.tsx`
- **Starfield**: Edit `/client/src/components/3d/StarTrekStarfield.tsx`

#### Animations:
- **Scroll Animations**: Edit `/client/src/components/animations/ScrollAnimations.tsx`
- **CSS Animations**: Edit `/client/src/index.css` (keyframes section)

#### Styling:
- **Global Styles**: Edit `/client/src/index.css`
- **Color Scheme**: Modify CSS custom properties in `:root`
- **Component Styles**: Individual component files use Tailwind classes

#### Content Updates:
- **Page Text**: Edit respective page components
- **Blog Posts**: Add/edit markdown files in `/client/src/data/blog-posts/`
- **Resource Library**: Edit data arrays in component files
- **Company Info**: Edit `/client/src/pages/about.tsx`

#### Form Configuration:
- **Contact Form**: Edit `/client/src/components/home/CTASection.tsx`
- **Form Validation**: Modify Zod schemas in form components
- **Supabase Integration**: Configure in `/client/src/lib/supabaseClient.ts`

### Common Element Selectors:

#### Icons:
- Most icons use Lucide React library
- Import pattern: `import { IconName } from "lucide-react"`
- Common icons: ArrowRight, Search, Clock, Calendar, BookOpen, etc.

#### Buttons:
- Primary CTA: `className="bg-primary text-white"`
- Secondary: `<Button variant="outline">`
- Link buttons: `<Button asChild><a href="...">Text</a></Button>`

#### Cards:
- Standard card: `<Card className="rounded-xl overflow-hidden bg-white border border-gray-200">`
- Blog post cards: Include image, content area, and action links
- Resource cards: Include type badges and action buttons

#### Responsive Classes:
- Mobile-first: Base classes apply to mobile
- Tablet: `md:` prefix (768px+)
- Desktop: `lg:` prefix (1024px+)
- Large desktop: `xl:` prefix (1280px+)

This reference document provides comprehensive coverage of every component, section, and element in the DataSarva-Web application, enabling precise targeting for modifications and updates.