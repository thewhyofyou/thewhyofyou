# The Why of You - Astrology Website

A beautiful, modern astrology website built with Next.js, offering personalized readings, free birth charts, and cosmic guidance.

## 🌟 Features

- **Free Birth Charts** - Generate personalized astrological charts
- **Personal Readings** - Book one-on-one astrology consultations
- **Free Guides** - Download comprehensive astrology PDFs
- **Astro Reports** - Purchase detailed astrological analysis
- **Blog Articles** - Read insights about cosmic events and spiritual guidance
- **Video Content** - Access astrology educational videos
- **Responsive Design** - Optimized for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm installed
- Git for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/thewhyofyou/lovable.git

# Navigate to the project directory
cd lovable

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website locally.

## 🛠️ Tech Stack

This project is built with modern web technologies:

- **Next.js 14.2.33** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library with hooks and components
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Beautiful, accessible React components
- **Supabase** - Backend as a service (database, auth, storage)
- **TanStack Query** - Data fetching and state management
- **Lucide React** - Beautiful icons
- **Next.js Image** - Optimized image loading

## 📦 Project Structure

```
├── app/                    # Next.js App Router pages
├── src/
│   ├── components/         # React components
│   ├── page-components/    # Page-specific components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── integrations/      # Third-party integrations (Supabase)
├── public/                # Static assets (images, PDFs)
├── supabase/             # Supabase configuration and migrations
└── tailwind.config.ts    # Tailwind CSS configuration
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
3. Deploy automatically with each push to master

### Build for Production

```bash
# Create production build
npm run build

# Test production build locally
npm run start
```

## 🌍 Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

## 📝 Adding Blog Content

To add new blog articles, edit `src/components/BlogArticles.tsx` and add entries to the articles array:

```typescript
{
  id: "new-id",
  title: "Your Blog Title",
  excerpt: "Your blog description...",
  image: "https://images.unsplash.com/your-image",
  url: "/articles",
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
