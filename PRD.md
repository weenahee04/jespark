# 📋 JESpark - Product Requirements Document (PRD)

**Version:** 1.0  
**Last Updated:** 2024  
**Product:** Healthcare Wellness & Rewards Platform  
**Status:** Active Development

---

## 📑 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Overview](#product-overview)
3. [Goals & Objectives](#goals--objectives)
4. [Target Users](#target-users)
5. [User Personas](#user-personas)
6. [User Stories](#user-stories)
7. [Features & Requirements](#features--requirements)
8. [User Flows](#user-flows)
9. [Success Metrics](#success-metrics)
10. [Technical Constraints](#technical-constraints)
11. [Timeline & Milestones](#timeline--milestones)
12. [Risks & Dependencies](#risks--dependencies)
13. [Future Roadmap](#future-roadmap)

---

## 📊 Executive Summary

### Product Vision
JESpark is a comprehensive healthcare wellness platform that empowers users to take control of their health through AI-powered consultations, reward-based engagement, and convenient access to healthcare services.

### Problem Statement
- Users lack accessible health consultation services
- Healthcare services are fragmented and hard to discover
- No unified platform for wellness rewards and benefits
- Limited engagement in preventive healthcare

### Solution
A mobile-first platform that combines:
- AI-powered health assistant for instant consultations
- Points-based reward system for engagement
- Integrated service booking and discovery
- Seamless payment and transaction management

### Key Value Propositions
1. **Accessibility:** 24/7 AI health assistant
2. **Rewards:** Earn points for health activities
3. **Convenience:** One-stop platform for all health needs
4. **Personalization:** AI learns from user interactions

---

## 🎯 Product Overview

### Product Description
JESpark is a premium Healthcare Reward & Wellness platform featuring:
- **AI Health Assistant (Poly):** Conversational health advisor with knowledge graph visualization
- **Rewards System:** Points-based redemption for health services and products
- **Service Marketplace:** Discover and book healthcare services
- **Payment Integration:** Mobile top-up and utility bill payments
- **EV Charging:** Locate and navigate to EV charging stations

### Platform
- **Primary:** Mobile Web Application (PWA-ready)
- **Target Devices:** iOS, Android (via mobile browser)
- **Secondary:** Desktop/Tablet browsers

### Business Model
- **B2C:** Direct to consumer healthcare platform
- **Revenue Streams:** (Planned)
  - Service booking commissions
  - Premium membership subscriptions
  - Partner integrations
  - Advertising (healthcare providers)

---

## 🎯 Goals & Objectives

### Primary Goals

#### 1. User Engagement
- **Target:** 10,000+ active users in first 6 months
- **Metric:** Daily Active Users (DAU)
- **Strategy:** Reward system, AI assistant, gamification

#### 2. Health Consultation Accessibility
- **Target:** 1,000+ AI consultations per month
- **Metric:** Chat sessions completed
- **Strategy:** Free AI assistant, easy access, knowledge graph

#### 3. Service Discovery
- **Target:** 500+ service bookings per month
- **Metric:** Completed bookings
- **Strategy:** Comprehensive service listings, ratings, reviews

#### 4. Reward Redemption
- **Target:** 70% redemption rate
- **Metric:** Rewards redeemed vs. points earned
- **Strategy:** Attractive rewards, clear point system

### Secondary Goals
- Build user trust in AI health advice
- Create sustainable engagement loop
- Establish partnerships with healthcare providers
- Expand service categories

---

## 👥 Target Users

### Primary User Segments

#### 1. Health-Conscious Individuals
- **Age:** 25-45
- **Characteristics:**
  - Actively manage health
  - Use health apps regularly
  - Value preventive care
  - Tech-savvy

#### 2. Chronic Condition Patients
- **Age:** 35-65
- **Characteristics:**
  - Need regular consultations
  - Track symptoms and medications
  - Value convenience
  - Price-sensitive

#### 3. Wellness Enthusiasts
- **Age:** 20-40
- **Characteristics:**
  - Interested in fitness and nutrition
  - Active lifestyle
  - Social media users
  - Reward-motivated

#### 4. Busy Professionals
- **Age:** 30-50
- **Characteristics:**
  - Limited time for health management
  - Value efficiency
  - Mobile-first users
  - Willing to pay for convenience

### User Needs
1. **Quick Health Advice:** Instant access to health information
2. **Service Discovery:** Find nearby healthcare providers
3. **Reward Incentives:** Earn points for health activities
4. **Convenience:** Book services and pay bills in one place
5. **Trust:** Reliable health information and services

---

## 🧑‍💼 User Personas

### Persona 1: "Sarah - The Health Enthusiast"

**Demographics:**
- Age: 32
- Occupation: Marketing Manager
- Location: Bangkok
- Tech Proficiency: High

**Goals:**
- Maintain optimal health
- Track fitness and nutrition
- Earn rewards for healthy choices
- Get quick health advice

**Pain Points:**
- Hard to find reliable health information
- Services are expensive
- No motivation to maintain healthy habits

**Behaviors:**
- Uses health apps daily
- Checks reviews before booking services
- Shares health tips on social media
- Values rewards and gamification

**How JESpark Helps:**
- AI assistant provides instant health advice
- Points system rewards healthy behaviors
- Easy service discovery with ratings
- Convenient booking and payment

---

### Persona 2: "Somchai - The Chronic Patient"

**Demographics:**
- Age: 58
- Occupation: Retired Teacher
- Location: Chiang Mai
- Tech Proficiency: Medium

**Goals:**
- Manage diabetes effectively
- Find affordable healthcare
- Track medications and appointments
- Get reliable health information

**Pain Points:**
- Expensive medical consultations
- Hard to navigate healthcare system
- Forgets to take medications
- Limited mobility

**Behaviors:**
- Prefers phone calls over apps
- Needs simple interfaces
- Values trust and reliability
- Price-conscious

**How JESpark Helps:**
- Free AI consultations
- Clear service pricing
- Medication reminders (planned)
- Easy-to-use interface

---

### Persona 3: "Nina - The Busy Professional"

**Demographics:**
- Age: 28
- Occupation: Software Developer
- Location: Bangkok
- Tech Proficiency: Very High

**Goals:**
- Save time on health management
- Quick access to services
- Efficient booking process
- Mobile-first experience

**Pain Points:**
- No time for long consultations
- Booking processes are slow
- Multiple apps for different needs
- Wants everything in one place

**Behaviors:**
- Uses mobile for everything
- Values speed and efficiency
- Prefers self-service
- Willing to pay for convenience

**How JESpark Helps:**
- One-stop platform
- Quick AI consultations
- Fast booking process
- Mobile-optimized interface

---

## 📖 User Stories

### Epic 1: AI Health Assistant

#### Story 1.1: Initial Consultation
**As a** user  
**I want to** ask health questions to an AI assistant  
**So that** I can get instant health advice without visiting a clinic

**Acceptance Criteria:**
- User can type questions in chat interface
- AI responds with helpful health advice
- Responses are in Thai language
- Streaming responses for better UX
- Knowledge graph visualization available

**Priority:** High  
**Story Points:** 8

---

#### Story 1.2: Knowledge Graph
**As a** user  
**I want to** see visual representation of health concepts  
**So that** I can understand relationships between symptoms, diseases, and treatments

**Acceptance Criteria:**
- Graph view toggle available
- Nodes represent entities (symptoms, diseases, medicines)
- Edges show relationships
- Interactive graph (draggable nodes)
- Loading states during extraction

**Priority:** Medium  
**Story Points:** 13

---

#### Story 1.3: AI Learning
**As a** user  
**I want to** train the AI with conversation data  
**So that** the AI becomes smarter over time

**Acceptance Criteria:**
- "Train AI" button in graph view
- AI learns new concepts from conversations
- Learning history visible in Brain View
- XP/Level system for AI intelligence
- Confidence scores displayed

**Priority:** Low  
**Story Points:** 8

---

### Epic 2: Rewards System

#### Story 2.1: Browse Rewards
**As a** user  
**I want to** browse available rewards  
**So that** I can see what I can redeem with my points

**Acceptance Criteria:**
- Rewards displayed in grid layout
- Category filtering (Food, Clinic, Pharmacy, etc.)
- Search functionality
- Points requirement clearly shown
- Reward images and descriptions

**Priority:** High  
**Story Points:** 5

---

#### Story 2.2: Redeem Reward
**As a** user  
**I want to** redeem rewards with points  
**So that** I can get health services and products

**Acceptance Criteria:**
- View reward details
- Check if user has enough points
- Confirmation modal before redemption
- Points deducted after redemption
- Success feedback

**Priority:** High  
**Story Points:** 8

---

#### Story 2.3: Earn Points
**As a** user  
**I want to** earn points for using services  
**So that** I can redeem more rewards

**Acceptance Criteria:**
- Points earned after service booking
- Points earned after bill payment
- Points displayed in hero card
- Transaction history shows point earnings
- Points expiration warning

**Priority:** High  
**Story Points:** 5

---

### Epic 3: Service Discovery & Booking

#### Story 3.1: Discover Services
**As a** user  
**I want to** discover healthcare services by category  
**So that** I can find services I need

**Acceptance Criteria:**
- Quick navigation by category
- Service listings with ratings
- Distance calculation
- Open/closed status
- Filter and search options

**Priority:** High  
**Story Points:** 8

---

#### Story 3.2: View Service Details
**As a** user  
**I want to** view detailed service information  
**So that** I can make informed booking decisions

**Acceptance Criteria:**
- Service name, rating, reviews
- Address and distance
- Opening hours
- Service tags
- Contact information
- Google Maps link

**Priority:** High  
**Story Points:** 5

---

#### Story 3.3: Book Service
**As a** user  
**I want to** book a service appointment  
**So that** I can receive healthcare services

**Acceptance Criteria:**
- Date selection
- Time slot selection
- Booking confirmation
- Booking saved in history
- Notification sent (planned)

**Priority:** High  
**Story Points:** 8

---

### Epic 4: Payment Services

#### Story 4.1: Mobile Top-up
**As a** user  
**I want to** top up my mobile phone  
**So that** I can pay for mobile services

**Acceptance Criteria:**
- Select mobile provider (AIS, True, DTAC, my)
- Enter phone number
- Select amount
- Confirm payment
- Success confirmation

**Priority:** Medium  
**Story Points:** 5

---

#### Story 4.2: Pay Electricity Bill
**As a** user  
**I want to** pay my electricity bill  
**So that** I can manage utility payments

**Acceptance Criteria:**
- Select authority (MEA/PEA)
- Enter account number
- View bill details
- Confirm payment
- Payment receipt

**Priority:** Medium  
**Story Points:** 8

---

### Epic 5: User Profile & Settings

#### Story 5.1: Manage Profile
**As a** user  
**I want to** manage my personal information  
**So that** my profile is up to date

**Acceptance Criteria:**
- View profile information
- Edit name, email, phone
- Update address
- Change profile picture (UI only)
- Save changes

**Priority:** Medium  
**Story Points:** 5

---

#### Story 5.2: View Transaction History
**As a** user  
**I want to** view my transaction history  
**So that** I can track my spending and point earnings

**Acceptance Criteria:**
- List all transactions
- Filter by type (redeem, earn, payment)
- Group by date
- Show transaction details
- Status indicators

**Priority:** Medium  
**Story Points:** 5

---

#### Story 5.3: Manage Settings
**As a** user  
**I want to** customize app settings  
**So that** the app works according to my preferences

**Acceptance Criteria:**
- Toggle dark/light mode
- Notification preferences
- Sound settings
- Language selection (UI only)
- Privacy settings

**Priority:** Medium  
**Story Points:** 5

---

## 🎨 Features & Requirements

### Feature 1: AI Health Assistant (Poly)

#### Functional Requirements
1. **Chat Interface**
   - Real-time message display
   - Streaming responses
   - Message history persistence
   - Error handling
   - Loading states

2. **Knowledge Graph**
   - Entity extraction (symptoms, diseases, medicines, locations)
   - Relationship mapping
   - Interactive visualization
   - Physics simulation
   - Node dragging

3. **AI Training**
   - Concept learning
   - Confidence scoring
   - Learning history
   - XP/Level system

#### Non-Functional Requirements
- Response time: < 3 seconds for initial response
- Streaming: Real-time chunk delivery
- Accuracy: Health advice must be general, not diagnostic
- Language: Thai and English support

#### Technical Requirements
- Google Gemini API integration
- Model: `gemini-3-flash-preview`
- API Key: Environment variable
- Error handling: Graceful degradation

---

### Feature 2: Rewards System

#### Functional Requirements
1. **Reward Catalog**
   - Display all available rewards
   - Category filtering
   - Search functionality
   - Points requirement display
   - Reward details

2. **Redemption Process**
   - Points balance check
   - Confirmation modal
   - Points deduction
   - Success feedback
   - Transaction recording

3. **Points Management**
   - Points display
   - Points earning
   - Points expiration tracking
   - Transaction history

#### Non-Functional Requirements
- Performance: Fast filtering and search
- UX: Clear points display
- Security: Prevent negative points

#### Business Rules
- Minimum redemption: 450 points
- Points expiration: 31 Dec 2024 (configurable)
- One redemption per reward per user

---

### Feature 3: Service Discovery

#### Functional Requirements
1. **Service Listings**
   - Category-based navigation
   - Service cards with key info
   - Rating and review display
   - Distance calculation
   - Open/closed status

2. **Service Details**
   - Complete service information
   - Booking interface
   - Date/time selection
   - Contact information
   - Map integration

3. **Booking System**
   - Appointment scheduling
   - Confirmation
   - Booking history

#### Non-Functional Requirements
- Performance: Fast loading
- Accuracy: Real-time availability
- UX: Intuitive booking flow

---

### Feature 4: Payment Services

#### Functional Requirements
1. **Mobile Top-up**
   - Provider selection
   - Phone number input
   - Amount selection
   - Payment processing
   - Confirmation

2. **Electricity Bill Payment**
   - Authority selection (MEA/PEA)
   - Account number input
   - Bill details display
   - Payment processing
   - Receipt

#### Non-Functional Requirements
- Security: Secure payment processing
- Validation: Input validation
- UX: Clear payment flow

---

### Feature 5: EV Charging Stations

#### Functional Requirements
1. **Station Discovery**
   - GPS location detection
   - Distance calculation
   - Station status
   - Connector types
   - Power and pricing info

2. **Navigation**
   - Google Maps integration
   - Route directions
   - Real-time location

#### Non-Functional Requirements
- Accuracy: Precise distance calculation
- Performance: Fast location detection
- Privacy: User consent for location

---

## 🔄 User Flows

### Flow 1: First-Time User Onboarding

```
1. User opens app
   ↓
2. Sees Login/Register screen
   ↓
3. Clicks "Sign Up"
   ↓
4. Fills registration form
   ↓
5. Accepts terms and conditions
   ↓
6. Account created
   ↓
7. Redirected to Home
   ↓
8. Sees welcome message and points (0)
   ↓
9. Guided tour (planned)
```

---

### Flow 2: AI Health Consultation

```
1. User navigates to AI Chat tab
   ↓
2. Sees welcome message from Poly
   ↓
3. Types health question
   ↓
4. AI processes and streams response
   ↓
5. User reads response
   ↓
6. (Optional) Switches to Graph View
   ↓
7. Sees knowledge graph visualization
   ↓
8. (Optional) Trains AI with graph data
   ↓
9. AI learns new concepts
   ↓
10. Returns to chat or asks another question
```

---

### Flow 3: Reward Redemption

```
1. User navigates to Rewards tab
   ↓
2. Browses reward catalog
   ↓
3. (Optional) Filters by category
   ↓
4. (Optional) Searches for specific reward
   ↓
5. Clicks on reward card
   ↓
6. Views reward details
   ↓
7. Checks points balance
   ↓
8. Clicks "Redeem Now"
   ↓
9. Confirms redemption
   ↓
10. Points deducted
   ↓
11. Success message displayed
   ↓
12. Returns to rewards list
```

---

### Flow 4: Service Booking

```
1. User on Home screen
   ↓
2. Clicks Quick Nav category (e.g., "Dental")
   ↓
3. Sees service listings
   ↓
4. Clicks on service card
   ↓
5. Views service details
   ↓
6. Clicks "Book Now"
   ↓
7. Selects date
   ↓
8. Selects time slot
   ↓
9. Confirms booking
   ↓
10. Booking saved
   ↓
11. Success message
   ↓
12. Points earned (if applicable)
```

---

### Flow 5: Payment Flow

```
1. User clicks "Top-up" or "Elec Bill"
   ↓
2. Selects provider/authority
   ↓
3. Enters account details
   ↓
4. (For bills) Views bill details
   ↓
5. Confirms payment
   ↓
6. Payment processed
   ↓
7. Success confirmation
   ↓
8. Transaction recorded
   ↓
9. Points earned (if applicable)
```

---

## 📈 Success Metrics

### Key Performance Indicators (KPIs)

#### User Engagement
- **Daily Active Users (DAU):** Target 1,000+ in first month
- **Monthly Active Users (MAU):** Target 5,000+ in first 3 months
- **Session Duration:** Average 5+ minutes
- **Return Rate:** 40%+ users return within 7 days

#### Feature Adoption
- **AI Chat Usage:** 60%+ of users try AI assistant
- **Reward Redemption:** 30%+ redemption rate
- **Service Bookings:** 20%+ of users book a service
- **Payment Usage:** 15%+ of users use payment features

#### Business Metrics
- **Points Earned:** Track total points distributed
- **Points Redeemed:** Track redemption value
- **Service Bookings:** Track completed bookings
- **Revenue:** (Planned) Track commission revenue

#### User Satisfaction
- **App Rating:** Target 4.5+ stars
- **NPS Score:** Target 50+
- **Support Tickets:** < 5% of users
- **Error Rate:** < 1% of sessions

### Measurement Tools
- Google Analytics (planned)
- Custom event tracking
- User feedback surveys
- App store reviews

---

## ⚙️ Technical Constraints

### Current Limitations
1. **No Backend:** All data is mock/localStorage
2. **No Real Authentication:** Login is UI-only
3. **No Payment Gateway:** Payment flows are simulated
4. **No Database:** No persistent data storage
5. **API Dependency:** Requires Google Gemini API key

### Performance Constraints
- Bundle size: ~612 KB (should optimize)
- API rate limits: Google Gemini API limits
- Mobile performance: Must work on low-end devices

### Browser Support
- Modern browsers (Chrome, Safari, Firefox, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Minimum: ES2022 support

---

## 📅 Timeline & Milestones

### Phase 1: MVP (Completed) ✅
- ✅ Core UI components
- ✅ AI Health Assistant
- ✅ Rewards system (UI)
- ✅ Service listings
- ✅ Basic navigation
- ✅ Theme system

**Duration:** Completed  
**Status:** ✅ Done

---

### Phase 2: Enhanced Features (Completed) ✅
- ✅ All screens implemented
- ✅ Transaction history
- ✅ Settings and profile
- ✅ Payment methods
- ✅ Notification center
- ✅ Knowledge graph visualization

**Duration:** Completed  
**Status:** ✅ Done

---

### Phase 3: Backend Integration (Planned)
- [ ] API development
- [ ] Database setup
- [ ] Authentication system
- [ ] Real payment integration
- [ ] User management
- [ ] Service provider integration

**Duration:** 8-12 weeks  
**Status:** 🔜 Planned

---

### Phase 4: Production Ready (Planned)
- [ ] Testing (unit, integration, E2E)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Error tracking
- [ ] Analytics integration
- [ ] Production deployment

**Duration:** 4-6 weeks  
**Status:** 🔜 Planned

---

## ⚠️ Risks & Dependencies

### Technical Risks

#### Risk 1: API Dependency
**Description:** Reliance on Google Gemini API  
**Impact:** High - Core feature depends on external service  
**Mitigation:**
- Have backup API options
- Implement caching
- Graceful error handling
- Monitor API status

#### Risk 2: No Backend
**Description:** Current implementation has no backend  
**Impact:** High - Cannot scale or persist data  
**Mitigation:**
- Plan backend development
- Design API architecture
- Consider serverless options

#### Risk 3: Performance Issues
**Description:** Large bundle size, slow loading  
**Impact:** Medium - Poor user experience  
**Mitigation:**
- Code splitting
- Lazy loading
- Image optimization
- Bundle analysis

### Business Risks

#### Risk 1: Low Adoption
**Description:** Users may not engage with platform  
**Impact:** High - Business failure  
**Mitigation:**
- Marketing campaigns
- Referral programs
- Incentive programs
- User feedback integration

#### Risk 2: Regulatory Compliance
**Description:** Health data privacy regulations  
**Impact:** High - Legal issues  
**Mitigation:**
- Consult legal experts
- Implement privacy controls
- GDPR/PDPA compliance
- Data encryption

### Dependencies
1. **Google Gemini API:** Required for AI features
2. **Google Maps API:** Required for navigation
3. **Payment Gateways:** Required for real payments
4. **Service Providers:** Required for booking system

---

## 🗺️ Future Roadmap

### Q1 2024 (Planned)
- Backend API development
- Real authentication
- Database integration
- Payment gateway integration

### Q2 2024 (Planned)
- Service provider partnerships
- Advanced AI features
- Push notifications
- Offline support (PWA)

### Q3 2024 (Planned)
- Mobile apps (iOS/Android)
- Advanced analytics
- Machine learning recommendations
- Social features

### Q4 2024 (Planned)
- International expansion
- Multi-language support
- Enterprise features
- API for partners

---

## 📝 Appendices

### Appendix A: Glossary
- **Poly:** AI Health Assistant name
- **Points (PT):** Virtual currency for rewards
- **Knowledge Graph:** Visual representation of health concepts
- **XP:** Experience points for AI learning

### Appendix B: References
- Technical Specification: `SPEC.md`
- System Review: `SYSTEM_REVIEW.md`
- Deployment Guide: `DEPLOY.md`

### Appendix C: Change Log
- **v1.0 (2024):** Initial PRD creation
- Future versions will track changes

---

**Document Owner:** Product Team  
**Stakeholders:** Development, Design, Business  
**Review Cycle:** Quarterly  
**Next Review:** Q2 2024

---

**End of Document**

