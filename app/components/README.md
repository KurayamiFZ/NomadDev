# GameDev Academy Component Library

## Overview

This directory contains all reusable components for the GameDev Academy platform. Each component is documented with comprehensive JSDoc comments and follows a consistent design pattern.

## Component Architecture

### Design Principles
- **Single Responsibility**: Each component has one clear purpose
- **Reusability**: Components work across multiple pages
- **Type Safety**: Full TypeScript interfaces with JSDoc
- **Responsive**: Mobile-first design with Tailwind CSS
- **Accessibility**: Semantic HTML with ARIA labels
- **Performance**: Optimized with minimal re-renders

### File Structure
```
components/
├── Navigation.tsx          # Sticky header with mobile menu
├── HeroSection.tsx         # Main headline and value proposition
├── DemoSection.tsx          # Interactive lesson demo
├── RoadmapSection.tsx       # Course progression timeline
├── TransformationSection.tsx # Before/after learning journey
├── StatsSection.tsx         # Course statistics display
├── GuaranteeSection.tsx      # Risk-free promises
├── CTASection.tsx          # Enrollment call-to-action
├── Footer.tsx              # Site footer with branding
├── WelcomeBanner.tsx        # Personalized greeting (home pages)
├── StatsCard.tsx           # Reusable statistics card
├── LessonCard.tsx          # Individual lesson display
├── LiveClassCard.tsx       # Live class listings
├── AchievementCard.tsx      # Achievement badges
├── CommunityActivityItem.tsx # Activity feed items
├── LessonFilters.tsx        # Lesson filter controls
├── button.tsx              # Base button component
├── icons.tsx               # Icon wrapper component
└── footer.tsx              # Footer component
```

## Component Documentation

### Navigation
**Purpose**: Sticky navigation header with branding and menu items
**Features**:
- Responsive design with mobile hamburger menu
- Smooth scroll navigation to page sections
- Integration with Next.js router
- Gradient branding with game controller icon

**Props**:
```typescript
interface NavigationProps {
  onNavigate?: (section: string) => void;
}
```

**Usage**:
```tsx
import { Navigation } from './components/Navigation';

<Navigation onNavigate={(section) => console.log(section)} />
```

### StatsCard
**Purpose**: Reusable card for displaying statistics and metrics
**Features**:
- Configurable Lucide icon
- Optional progress bar with percentage calculation
- Flexible subtitle display
- Gradient backgrounds with consistent styling

**Props**:
```typescript
interface StatsCardProps {
  icon: React.ComponentType<LucideProps>;
  value: string;
  label: string;
  color: string;
  subtitle?: string;
  progress?: {
    current: number;
    total: number;
  };
}
```

**Usage**:
```tsx
import { StatsCard } from './components/StatsCard';
import { BookOpen } from 'lucide-react';

<StatsCard 
  icon={BookOpen}
  value="12/150"
  label="Lessons Completed"
  color="text-blue-400"
  progress={{ current: 12, total: 150 }}
/>
```

### LessonCard
**Purpose**: Individual lesson display with status indicators
**Features**:
- Status icons (completed, current, locked)
- Progress indicators
- Hover interactions
- Accessibility support

**Props**:
```typescript
interface LessonCardProps {
  lesson: Lesson;
  onClick?: () => void;
}
```

**Usage**:
```tsx
import { LessonCard } from './components/LessonCard';

<LessonCard 
  lesson={lessonData}
  onClick={() => handleLessonClick(lessonData.id)}
/>
```

## Data Management

### Types
All TypeScript interfaces are centralized in `lib/types.ts`:
- `Lesson` - Course lesson structure
- `Achievement` - Gamification elements
- `UpcomingClass` - Live session information
- `CommunityActivity` - Activity feed items
- `WeeklyMilestone` - Course progression
- `CourseStats` - Overall statistics

### Constants
Static data is organized in `lib/`:
- `constants.ts` - Landing page data
- `home-data.ts` - Home page content

## Styling Guidelines

### Color System
- **Primary**: Purple to pink gradients (`from-purple-500 to-pink-500`)
- **Success**: Green accents (`text-green-400`, `bg-green-500`)
- **Warning**: Orange accents (`text-orange-400`, `bg-orange-400`)
- **Info**: Blue accents (`text-blue-400`, `bg-blue-400`)
- **Neutral**: Gray scale (`bg-gray-800`, `text-gray-400`)

### Typography
- **Headlines**: `font-extrabold` with responsive sizing
- **Body**: Default font weights with proper contrast
- **Labels**: `font-bold` with appropriate sizing

### Spacing
- **Cards**: `p-6` padding, `rounded-xl` corners
- **Sections**: `py-12` vertical spacing
- **Grid**: `gap-4` to `gap-8` depending on density

## Best Practices

### When Adding New Components
1. **Create Interface First**: Define props with TypeScript
2. **Add JSDoc**: Document all props and purpose
3. **Use Semantic HTML**: Proper elements for accessibility
4. **Responsive Design**: Mobile-first approach
5. **Consistent Styling**: Follow established patterns
6. **Error Handling**: Graceful fallbacks for missing data

### Component Composition
- Prefer composition over inheritance
- Use children for flexible content
- Extract common patterns into shared components
- Maintain clear prop interfaces

### Performance
- Use `React.memo` for expensive components
- Implement proper dependency arrays in hooks
- Avoid inline functions in render props
- Use semantic imports for tree shaking

## Contributing

### Development Workflow
1. Create component in appropriate directory
2. Add comprehensive JSDoc documentation
3. Update this README with new component
4. Test across different screen sizes
5. Verify TypeScript types and accessibility

### Code Review Checklist
- [ ] JSDoc documentation complete
- [ ] TypeScript interfaces defined
- [ ] Responsive design tested
- [ ] Accessibility considered
- [ ] Performance optimized
- [ ] Consistent styling applied

## Support

For questions about component usage or development:
- Check component JSDoc comments for detailed prop information
- Review existing components for patterns
- Follow established naming conventions
- Test in Storybook (when available)
