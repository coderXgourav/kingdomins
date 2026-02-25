

## Add "Latest News" Section and Blog Carousel to Homepage

### Overview
Add two new sections to the homepage:
1. A **"Latest News"** section matching the reference design (split layout with title on left, news list on right)
2. A **Blog Carousel** section placed below the CTA Banner

### New Components

#### 1. LatestNews Component (`src/components/LatestNews.tsx`)
- **Left side**: "Latest News" heading (serif font), description text, and a "View All News" button with a gold gradient circle accent
- **Right side**: 3 news card rows, each with:
  - Category label (gold color) + date
  - Article title/summary text
  - Arrow icon link (top-right)
  - Light gray background with hover effect (gold arrow on hover)
- Styled to match the reference image layout using a two-column grid

#### 2. BlogCarousel Component (`src/components/BlogCarousel.tsx`)
- Horizontal carousel of blog post cards using the existing Embla carousel setup
- Each card: thumbnail image, category tag, title, short excerpt, "Read More" link
- Navigation arrows for scrolling
- Uses sample blog data (real estate tips, market insights, investment guides)

### Homepage Integration (`src/pages/Index.tsx`)
The section order will be:
1. HeroSection
2. AboutKingdom
3. ExploreTopProperty
4. GlobalMap
5. PropertyGrid
6. WhyKingdom
7. Testimonials
8. EbookDownload
9. CTABanner ("Start Your Journey to Smarter Living")
10. **BlogCarousel** (new - below CTA)
11. **LatestNews** (new - below blog carousel)

### Technical Details
- Both components follow existing project conventions (Tailwind, font-display/font-body classes, kingdom color tokens)
- Blog data will be hardcoded as sample data in a `src/data/blog.ts` file with 6 sample posts
- LatestNews will use the same sample data for the 3 news items
- No new dependencies needed -- uses existing Embla carousel from `embla-carousel-react`
- Responsive: stacks vertically on mobile, side-by-side on desktop

