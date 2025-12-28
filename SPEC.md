# 📋 JESpark - Technical Specification Document

**Version:** 1.0.1  
**Last Updated:** 2024  
**Project Type:** Healthcare Wellness & Rewards Platform  
**Platform:** Web Application (Mobile-First)

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Architecture](#architecture)
4. [Features & Components](#features--components)
5. [Data Models](#data-models)
6. [API Integration](#api-integration)
7. [UI/UX Specifications](#uiux-specifications)
8. [State Management](#state-management)
9. [Routing & Navigation](#routing--navigation)
10. [Environment Variables](#environment-variables)
11. [Build & Deployment](#build--deployment)
12. [Development Guidelines](#development-guidelines)

---

## 🎯 Project Overview

### Description
JESpark is a premium Healthcare Reward & Wellness platform featuring:
- AI-powered health assistant (Poly)
- Points-based reward redemption system
- Service booking and management
- EV charging station locator
- Mobile-first responsive design

### Key Objectives
- Provide accessible healthcare services
- Reward users with points for engagement
- Offer AI-powered health consultations
- Enable seamless service bookings
- Support multiple payment methods

### Target Platform
- **Primary:** Mobile Web (PWA-ready)
- **Secondary:** Desktop/Tablet
- **Framework:** React 19.2.3
- **Build Tool:** Vite 6.2.0

---

## 🛠 Technical Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.3 | UI Framework |
| **TypeScript** | 5.8.2 | Type Safety |
| **Vite** | 6.2.0 | Build Tool & Dev Server |
| **Tailwind CSS** | CDN | Styling Framework |

### Dependencies

#### Production
```json
{
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "@google/genai": "^1.34.0",
  "lucide-react": "^0.562.0"
}
```

#### Development
```json
{
  "@types/node": "^22.14.0",
  "@vitejs/plugin-react": "^5.0.0",
  "typescript": "~5.8.2",
  "vite": "^6.2.0"
}
```

### External Services
- **Google Gemini API** - AI Health Assistant
- **Google Maps API** - EV Station Navigation
- **Unsplash CDN** - Image Assets

---

## 🏗 Architecture

### Project Structure
```
jespark/
├── components/          # React Components
│   ├── AIBrainView.tsx
│   ├── BannerCarousel.tsx
│   ├── ElectricityBillScreen.tsx
│   ├── HeroCard.tsx
│   ├── KnowledgeGraph.tsx
│   ├── LoginScreen.tsx
│   ├── MobileTopupScreen.tsx
│   ├── NotificationCenter.tsx
│   ├── PaymentMethodsScreen.tsx
│   ├── PersonalInfoScreen.tsx
│   ├── QuickNav.tsx
│   ├── RegisterScreen.tsx
│   ├── RewardCard.tsx
│   ├── RewardDetailScreen.tsx
│   ├── RewardsScreen.tsx
│   ├── SectionBanner.tsx
│   ├── ServiceDetailScreen.tsx
│   ├── ServiceListingScreen.tsx
│   ├── SettingsScreen.tsx
│   └── TransactionHistoryScreen.tsx
├── services/            # API Services
│   └── geminiService.ts
├── types.ts            # TypeScript Definitions
├── App.tsx             # Main Application Component
├── index.tsx           # Entry Point
├── index.html          # HTML Template
├── vite.config.ts      # Vite Configuration
├── tsconfig.json       # TypeScript Configuration
├── package.json        # Dependencies
└── vercel.json         # Deployment Configuration
```

### Component Architecture

#### Pattern: Functional Components with Hooks
- All components use functional components
- State management via `useState` and `useEffect`
- Props-based data flow
- No class components

#### State Management Strategy
- **Local State:** Component-level `useState`
- **Global State:** Props drilling (App.tsx → Components)
- **Persistence:** `localStorage` for theme preferences
- **Future:** Consider Context API or Zustand for global state

---

## 🎨 Features & Components

### 1. Authentication System

#### Components
- `LoginScreen.tsx` - User login interface
- `RegisterScreen.tsx` - User registration

#### Features
- Email/Password authentication (UI only, mock)
- Form validation (basic)
- Password visibility toggle
- Remember me functionality (planned)

#### State
```typescript
const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock
const [isRegistering, setIsRegistering] = useState(false);
```

### 2. Home Screen

#### Components
- `HeroCard.tsx` - Points display card
- `BannerCarousel.tsx` - Promotional banners
- `QuickNav.tsx` - Service quick access
- `SectionBanner.tsx` - Premium membership banner
- `RewardCard.tsx` - Reward preview cards

#### Features
- Points display (12,500 PT default)
- Promotional carousel
- Quick navigation to services
- Reward preview grid

### 3. AI Health Assistant (Poly)

#### Components
- `KnowledgeGraph.tsx` - Interactive knowledge visualization
- `AIBrainView.tsx` - AI learning dashboard

#### Features
- **Chat Interface:**
  - Streaming responses from Gemini API
  - Message history
  - Graph/Chat view toggle
  
- **Knowledge Graph:**
  - Entity extraction (symptoms, diseases, medicines, locations)
  - Relationship mapping
  - Interactive physics simulation
  - Node dragging
  
- **AI Training:**
  - Concept learning from conversations
  - Confidence scoring
  - Learning history
  - Level system (XP-based)

#### API Integration
```typescript
// services/geminiService.ts
generateHealthAdvice(prompt: string, onChunk: (text: string) => void)
extractKnowledgeGraph(conversationText: string): Promise<KnowledgeGraphData>
```

### 4. Rewards System

#### Components
- `RewardsScreen.tsx` - Full rewards catalog
- `RewardDetailScreen.tsx` - Reward details & redemption
- `RewardCard.tsx` - Reward card component

#### Features
- Category filtering (All, Food, Clinic, Pharmacy, Services, Lifestyle, Bill)
- Search functionality
- Points requirement display
- Redemption confirmation
- Points balance check

#### Data Model
```typescript
interface RewardItem {
  id: string;
  title: string;
  category: string;
  points: number;
  imageUrl: string;
  description: string;
}
```

### 5. Services

#### Components
- `ServiceListingScreen.tsx` - Service category listings
- `ServiceDetailScreen.tsx` - Service details & booking
- `MobileTopupScreen.tsx` - Mobile top-up service
- `ElectricityBillScreen.tsx` - Electricity bill payment

#### Features
- **Service Categories:**
  - Dental
  - Healthy Food
  - Cardio & Gym
  - Pharmacy
  - Wellness
  - Others

- **Service Details:**
  - Rating & reviews
  - Distance calculation
  - Opening hours
  - Booking system (date/time selection)
  - Google Maps integration

- **Payment Services:**
  - Mobile top-up (AIS, True, DTAC, my)
  - Electricity bill (MEA, PEA)
  - Account number validation
  - Payment confirmation

### 6. EV Charging Stations

#### Features
- GPS location detection
- Distance calculation (Haversine formula)
- Station status (Available, Busy, Maintenance)
- Connector types (CCS2, Type 2)
- Power rating display
- Price per kWh
- Google Maps navigation

#### Data Model
```typescript
interface EVStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  status: 'Available' | 'Busy' | 'Maintenance';
  connectors: string[];
  power: string;
  price: string;
  distance?: number;
}
```

### 7. User Profile

#### Components
- `PersonalInfoScreen.tsx` - User information management
- `SettingsScreen.tsx` - Application settings
- `TransactionHistoryScreen.tsx` - Transaction records
- `PaymentMethodsScreen.tsx` - Payment method management
- `NotificationCenter.tsx` - Notification management

#### Features
- **Profile Management:**
  - Edit personal information
  - Profile picture (UI only)
  - Address management
  
- **Settings:**
  - Dark/Light mode toggle (default: light)
  - Notification preferences
  - Sound settings
  - Language selection (UI only)
  - Account management
  - Privacy & security
  
- **Transactions:**
  - Filter by type (redeem, earn, payment, topup, bill)
  - Group by date
  - Status indicators
  - Transaction details
  
- **Payment Methods:**
  - Add/Edit/Delete methods
  - Set default method
  - Card, Bank, Wallet support

### 8. Navigation

#### Bottom Navigation Bar
- Home
- EV Charge
- AI Chat (center button, prominent)
- Rewards
- Profile

#### Navigation Flow
```
Home
├── Quick Nav → Service List → Service Detail
├── Rewards → Reward Detail
└── Profile
    ├── Settings
    ├── Personal Info
    ├── Transaction History
    ├── Payment Methods
    └── Notifications
```

---

## 📊 Data Models

### Core Types

#### User & Authentication
```typescript
// Mock - No real implementation
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  membership: 'Premium' | 'Standard';
}
```

#### Rewards
```typescript
interface RewardItem {
  id: string;
  title: string;
  category: string;
  points: number;
  imageUrl: string;
  description: string;
}
```

#### Services
```typescript
interface ServiceVenue {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  distance: string;
  imageUrl: string;
  isOpen: boolean;
  address: string;
  tags: string[];
  phone?: string;
  hours?: string;
  description?: string;
}
```

#### AI Chat
```typescript
interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

interface KnowledgeGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

interface GraphNode {
  id: string;
  label: string;
  type: 'symptom' | 'disease' | 'medicine' | 'location' | 'other';
  x?: number;
  y?: number;
}

interface GraphEdge {
  source: string;
  target: string;
  relation: string;
}

interface LearnedConcept extends GraphNode {
  learnedAt: Date;
  confidence: number;
  sourceInteraction: string;
}
```

#### Transactions
```typescript
interface Transaction {
  id: string;
  type: 'redeem' | 'earn' | 'payment' | 'topup' | 'bill';
  title: string;
  amount: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  description?: string;
}
```

#### Notifications
```typescript
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'promotion';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}
```

#### Payment Methods
```typescript
interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'wallet';
  name: string;
  last4?: string;
  isDefault: boolean;
  icon?: string;
}
```

---

## 🔌 API Integration

### Google Gemini API

#### Service: `services/geminiService.ts`

#### Functions

##### 1. Generate Health Advice
```typescript
generateHealthAdvice(
  prompt: string,
  onChunk: (text: string) => void
): Promise<string>
```

**Purpose:** Stream health advice responses  
**Model:** `gemini-3-flash-preview`  
**System Instruction:** Thai healthcare assistant  
**Response:** Streaming text chunks

##### 2. Extract Knowledge Graph
```typescript
extractKnowledgeGraph(
  conversationText: string
): Promise<KnowledgeGraphData>
```

**Purpose:** Extract entities and relationships from conversation  
**Model:** `gemini-3-flash-preview`  
**Response Format:** JSON with nodes and edges  
**Schema:** Structured entity extraction

#### Configuration
```typescript
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
const model = 'gemini-3-flash-preview';
```

### Google Maps API

#### Integration Points
- EV Station navigation links
- Service location maps
- Address geocoding (planned)

#### Usage
```typescript
// EV Station Navigation
href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}

// Service Location Search
href={`https://www.google.com/maps/search/?api=1&query=${address}`}
```

---

## 🎨 UI/UX Specifications

### Design System

#### Color Palette
```css
Primary Green:   #1B4D3E
Secondary Gold:  #D4AF37
Background:     #F5F9F7
Dark Background: #0f172a (slate-900)
```

#### Typography
- **Primary Font:** Kanit (Thai support)
- **Secondary Font:** Inter
- **Weights:** 300, 400, 500, 600, 700

#### Theme
- **Default:** Light Mode
- **Toggle:** Available in Settings
- **Persistence:** localStorage
- **System Preference:** Not used (always defaults to light)

#### Spacing
- Mobile-first responsive design
- Max width: 28rem (448px) for mobile container
- Padding: 1.25rem (20px) standard
- Gap: 0.5rem - 1.5rem for components

#### Components

##### Buttons
- Primary: `bg-[#1B4D3E]` with hover states
- Secondary: White with border
- Icon buttons: Circular with icon
- Size variants: sm, md, lg

##### Cards
- Rounded: `rounded-2xl` (16px)
- Shadow: `shadow-sm` with hover `shadow-md`
- Border: `border-slate-100` (light) / `border-slate-700` (dark)

##### Inputs
- Rounded: `rounded-xl`
- Focus: Green border ring
- Placeholder: Slate-400

### Animations
```css
fade-in: 0.5s ease-out
fade-in-down: 0.5s ease-out
fade-in-up: 0.5s ease-out
```

### Responsive Breakpoints
- Mobile: < 640px (default)
- Tablet: 640px - 1024px (planned)
- Desktop: > 1024px (planned)

---

## 🔄 State Management

### Current Implementation

#### App.tsx State
```typescript
// Authentication
const [isAuthenticated, setIsAuthenticated] = useState(true);
const [isRegistering, setIsRegistering] = useState(false);

// Navigation
const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
const [selectedServiceCategory, setSelectedServiceCategory] = useState(null);
const [selectedReward, setSelectedReward] = useState(null);
const [selectedService, setSelectedService] = useState(null);

// Theme
const [isDarkMode, setIsDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme === 'dark';
});

// Chat
const [messages, setMessages] = useState<ChatMessage[]>([]);
const [inputText, setInputText] = useState('');
const [isLoading, setIsLoading] = useState(false);

// Knowledge Graph
const [showGraph, setShowGraph] = useState(false);
const [graphData, setGraphData] = useState<KnowledgeGraphData>({ nodes: [], edges: [] });
const [isGraphLoading, setIsGraphLoading] = useState(false);

// AI Brain
const [aiKnowledge, setAiKnowledge] = useState<LearnedConcept[]>([]);
const [showBrainView, setShowBrainView] = useState(false);

// EV Stations
const [userLocation, setUserLocation] = useState(null);
const [evStations, setEvStations] = useState<EVStation[]>([]);
const [locationError, setLocationError] = useState(null);

// User Data
const [userPoints, setUserPoints] = useState(12500);

// Toast
const [toast, setToast] = useState(null);
```

### Recommended Improvements
- Implement Context API for global state
- Consider Zustand or Redux for complex state
- Separate state by domain (auth, user, chat, etc.)

---

## 🧭 Routing & Navigation

### Tab Enum
```typescript
enum Tab {
  HOME = 'HOME',
  REWARDS = 'REWARDS',
  EV_STATIONS = 'EV_STATIONS',
  AI_CHAT = 'AI_CHAT',
  PROFILE = 'PROFILE',
  MOBILE_TOPUP = 'MOBILE_TOPUP',
  ELEC_BILL = 'ELEC_BILL',
  SERVICE_LIST = 'SERVICE_LIST',
  SETTINGS = 'SETTINGS',
  PERSONAL_INFO = 'PERSONAL_INFO',
  TRANSACTION_HISTORY = 'TRANSACTION_HISTORY',
  NOTIFICATIONS = 'NOTIFICATIONS',
  REWARD_DETAIL = 'REWARD_DETAIL',
  SERVICE_DETAIL = 'SERVICE_DETAIL',
  PAYMENT_METHODS = 'PAYMENT_METHODS'
}
```

### Navigation Flow
- Tab-based navigation (no URL routing)
- Modal-style screens for details
- Back button navigation
- Deep linking (planned)

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Google Gemini API Key | ✅ Yes | - |
| `API_KEY` | Alias for GEMINI_API_KEY | ⚠️ Optional | - |

### Configuration
```typescript
// vite.config.ts
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
}
```

### Setup
1. Create `.env.local` file
2. Add `GEMINI_API_KEY=your_api_key_here`
3. Restart dev server

---

## 🚀 Build & Deployment

### Build Configuration

#### Vite Config
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
```

#### Build Commands
```bash
# Development
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview
```

### Deployment

#### Vercel Configuration
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Deployment Steps
1. Push to GitHub
2. Import project in Vercel
3. Set `GEMINI_API_KEY` environment variable
4. Deploy

### Build Output
- **Directory:** `dist/`
- **Entry:** `index.html`
- **Assets:** `dist/assets/`
- **Bundle Size:** ~612 KB (gzipped: ~145 KB)

---

## 📝 Development Guidelines

### Code Style

#### TypeScript
- Strict type checking enabled
- Use interfaces for object shapes
- Use enums for constants
- Avoid `any` type

#### React
- Functional components only
- Use hooks for state and effects
- Props destructuring
- Component composition

#### Naming Conventions
- **Components:** PascalCase (`RewardCard.tsx`)
- **Files:** PascalCase for components, camelCase for utilities
- **Variables:** camelCase
- **Constants:** UPPER_SNAKE_CASE
- **Types/Interfaces:** PascalCase

### File Organization
- One component per file
- Co-locate related files
- Separate concerns (components, services, types)

### Git Workflow
- Feature branches (recommended)
- Descriptive commit messages
- Regular pushes to main branch

### Testing (Planned)
- Unit tests for utilities
- Component tests with React Testing Library
- Integration tests for flows
- E2E tests for critical paths

---

## 🔮 Future Enhancements

### High Priority
1. **Backend Integration**
   - REST API endpoints
   - Real authentication
   - Database integration
   - User management

2. **State Management**
   - Context API implementation
   - Global state management
   - State persistence

3. **Error Handling**
   - Error boundaries
   - Retry mechanisms
   - User-friendly error messages

### Medium Priority
1. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

2. **Performance**
   - Code splitting
   - Lazy loading
   - Image optimization

3. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

### Low Priority
1. **PWA Features**
   - Service worker
   - Offline support
   - Push notifications

2. **Analytics**
   - User tracking
   - Performance monitoring
   - Error tracking

---

## 📚 Additional Resources

### Documentation
- `README.md` - Quick start guide
- `DEPLOY.md` - Deployment instructions
- `VERCEL_DEPLOY.md` - Vercel-specific guide
- `SYSTEM_REVIEW.md` - System analysis

### External Links
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Gemini API](https://ai.google.dev)

---

## 📞 Support & Contact

### Repository
- **GitHub:** https://github.com/weenahee04/jespark
- **Version:** 1.0.1

### Issues
- Report bugs via GitHub Issues
- Feature requests welcome
- Pull requests accepted

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Maintained By:** Development Team

