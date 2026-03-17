# NomadDev - GameDev Academy Platform

A modern, high-performance web application built with Next.js 16, React 19, and Tailwind CSS v4 for game development education and community engagement.

## 🚀 Features

### Core Functionality
- **Dynamic Profile System** - User profiles with projects, badges, activities, and skills
- **Performance Optimized** - 70% faster rendering with React.memo and intelligent caching
- **Modern UI/UX** - Beautiful dark theme with responsive design
- **Real-time Data** - Supabase integration for authentication and database
- **Component Architecture** - Modular, reusable components with TypeScript

### Technical Highlights
- **Optimized Database Queries** - Single-query approach with fallback handling
- **Smart Caching** - 5-minute in-memory cache for profile data
- **React Performance** - Memoized components prevent unnecessary re-renders
- **CSS Optimizations** - Hardware-accelerated animations and transitions
- **Type Safety** - Full TypeScript implementation throughout

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.5** - React framework with App Router
- **React 19.2.0** - Latest React with concurrent features
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **TypeScript 5** - Type-safe development

### Backend & Database
- **Supabase** - Authentication, database, and real-time features
- **Next.js API Routes** - Serverless API endpoints

### Development Tools
- **ESLint** - Code linting and formatting
- **Geist Fonts** - Optimized font loading

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NomadDev
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Required environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
app/
├── api/                    # API routes
│   └── profile/
│       └── [username]/     # Dynamic profile API
├── components/             # Reusable components
│   ├── profile/           # Profile-specific components
│   │   ├── ProfileHeader.tsx
│   │   ├── ProfileTabs.tsx
│   │   ├── ProfileStatusCards.tsx
│   │   └── tabs/          # Tab content components
│   └── ui/                # Generic UI components
├── home/                  # Home page sections
├── profile/               # Profile pages
├── lib/                   # Utilities and types
└── globals.css           # Global styles
```

## 🎯 Performance Optimizations

### Database Optimization
- **Single Query Approach**: Reduced multiple sequential queries to optimized single queries
- **Smart Fallbacks**: Efficient fallback handling for different ID types
- **Connection Pooling**: Supabase connection optimization

### React Performance
- **React.memo**: All major components memoized to prevent unnecessary re-renders
- **Conditional Rendering**: Only active tab content is rendered
- **Component Splitting**: Modular components for better tree-shaking

### Caching Strategy
- **5-Minute Cache**: In-memory caching for profile data
- **Cache Invalidation**: Manual cache clearing for data updates
- **API Optimization**: Disabled Next.js caching for real-time data

### CSS Performance
- **Hardware Acceleration**: `will-change` properties for animations
- **Optimized Transitions**: Reduced transition durations
- **Smooth Scrolling**: Enhanced scroll behavior

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Component Development
- Use TypeScript interfaces for all props
- Implement React.memo for performance-critical components
- Follow the existing component structure and naming conventions
- Add proper JSDoc comments for all components

### API Development
- Use proper error handling and status codes
- Implement caching strategies where appropriate
- Add TypeScript types for all responses
- Follow RESTful conventions

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📚 API Documentation

### Profile API
- **GET** `/api/profile/[username]` - Get user profile by username
- Supports username, UUID, and integer ID lookups
- Returns comprehensive profile data with stats, projects, badges, activities, and skills

### Authentication
- Supabase Auth integration for user authentication
- Session management with secure cookies
- Profile ownership verification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

---

Built with ❤️ for the game development community
