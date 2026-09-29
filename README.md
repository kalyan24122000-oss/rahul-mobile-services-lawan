# Rahul Mobile Services Lawan

> **Retail Smartphone Sales, Precision Hardware Mobile Repairs, and Customer-Centric After-Sales Services located in Lawan, Chhattisgarh.**

A production-ready, light-themed commercial web application built with modern vanilla web standards (HTML5, CSS3, ES6+ JavaScript), responsive mobile-first architecture, bilingual localization (English / Hindi), and an interactive Admin Management System with persistent local storage.

---

## 🏛 Architectural & Design Highlights

1. **Brand Consistency**:
   - Exact Business Name: **"Rahul Mobile Services Lawan"** used consistently throughout.
   - Operating Domain: Lawan, Baloda Bazar District, Chhattisgarh.

2. **Corporate Light Theme Design System**:
   - Clean, trustworthy light theme inspired by established corporate web properties (Microsoft, Amazon, Flipkart).
   - High-contrast typography, crisp slate backgrounds (`#f8fafc`), pure whites (`#ffffff`), and corporate Royal Blue (`#2563eb`) & Deep Navy (`#0f2347`, `#1e3a8a`) accents.
   - Strictly NO dark mode, NO glowing neon accents, and NO sluggish visual animations. Snappy 0.2s cubic-bezier transitions.

3. **Mobile-First Responsive Ergonomics**:
   - Primary target: Mobile devices with high touch-target sizes (minimum 44px, contact touch buttons at 52px).
   - Sticky navigation header with responsive hamburger menu, slide-out drawer, and accessible dismissal.
   - Fluid typography and responsive CSS Grid / Flexbox layouts for Mobile, Tablet, and Desktop.

4. **Bilingual Localization Engine (i18n)**:
   - **Default Language**: Professional, clean English across all sections.
   - **Default Bilingual Greeting**: The Top Welcome Banner features both English and Hindi:
     * English: *"Welcome to Rahul Mobile Services Lawan"*
     * Hindi: *"राहुल मोबाइल सर्विसेज लवन में आपका स्वागत है"*
   - **Language Switcher**: Prominent dual toggle (`EN | हिंदी`) in the top bar. Switching to `हिंदी` dynamically translates all sections without page reloads.

---

## 🧩 Sections Included

1. **Top Welcome Banner**:
   - Bilingual greeting with icon indicator, business working hours, and the dual-button language toggle (`EN | हिंदी`).
2. **Sticky Header & Navigation**:
   - Brand logo with smartphone hardware icon.
   - Navigation links: Home, Services, Happy Customers, Why Choose Us, About Us, Contact.
   - Discreet "Admin Login" action with lock icon (subtle secondary design).
   - Primary "Book Repair" CTA button.
   - Mobile hamburger drawer menu.
3. **Full-Screen Commercial Hero Section**:
   - Headline: *"Reliable Mobile Solutions"*
   - Sub-headline: *"Rahul Mobile Services Lawan"*
   - Supporting commercial copy with "Explore Services" and "Contact Us" buttons.
   - Metric Badges: *100% Genuine Tested Parts*, *Quick Turnaround Time*, *Located in Lawan, Chhattisgarh*.
   - Live Diagnostic & Store Counter preview card showing active repair capabilities.
4. **Services Section ("Services by Rahul Mobile Services Lawan")**:
   - 3 elevated corporate cards with itemized bullet points:
     * **Top Quality Repairing Services**: Display fixes (AMOLED/OLED/LCD), Type-C ports, battery replacements, motherboard & water damage diagnostics.
     * **Mobile Sales Services**: Verified new smartphones, keypad phones, budget guidance, original accessories & chargers.
     * **After-Sales Services**: Software updates, contact & WhatsApp chat migration, warranty checks, long-term support.
5. **Happy Customers Section (Real-Time Customer Testimonials)**:
   - Overall star rating counter (5.0 / 5.0) and review count.
   - Dynamic testimonial card grid loaded from persistent storage (`ReviewStorageAPI`).
   - Pre-populated with 3 realistic demo reviews from Lawan customers.
6. **Why Choose Us Section**:
   - 4 corporate trust pillars: *Quality-Focused*, *Fast Turnaround*, *Honest Pricing*, and *Customer Care*.
7. **About Us Section**:
   - Mission statement, values checklist, and 4-cell stats panel (5,000+ Repaired, 100% Tested Spares, 8+ Yrs in Lawan, 99.4% Satisfaction).
8. **Mobile-First Contact Section**:
   - Store address: *Main Road Market, Lawan, Baloda Bazar District, Chhattisgarh - 493526*.
   - Phone: *+91 98765 43210*.
   - Business Hours: *Monday – Sunday: 9:30 AM to 8:30 PM*.
   - 3 High-Touch Action Buttons: **Call Now** (`tel:`), **WhatsApp** (`wa.me`), **Get Directions** (Google Maps).
   - Interactive Quick Service Inquiry Form with validation and real-time feedback.
9. **Footer**:
   - Brand identity, services links, quick navigation, store visit hours, copyright notice (2026), and a discreet secondary Admin Portal link.

---

## 🔐 Store Administration System

### 1. Admin Login Modal
- **Trigger**: Click **"Admin Login"** in the top navigation or **"Store Admin Portal"** in the footer.
- **Demo Credentials**:
  - **Username**: `admin`
  - **Password**: `admin123`
- **Accessible Dismissal**:
  1. Clicking the close (`✕`) button
  2. Clicking the `Cancel` button
  3. Clicking outside on the modal backdrop
  4. Pressing the `Escape` key

### 2. Admin Review Management Dashboard
Accessible upon successful authentication:
- **Quick Statistics**: Total Reviews, Average Rating, Customer Inquiries count.
- **Add Customer Testimonial Form**:
  - Customer Name input
  - Customer Location / Ward input
  - Service Received dropdown
  - Star Rating dropdown (1 to 5 stars)
  - Review Date input (defaults to today)
  - Customer Photo input with **real-time Base64 preview**, upload support, and default avatar fallback
  - Customer Review textarea
  - "Save Review" button
- **Instant Synchronization**: Newly saved reviews immediately render inside the public **"Happy Customers"** section without page refresh.
- **Testimonial List**: Lists all active reviews with thumbnail, author, rating, and a **Delete** action protected by a custom confirmation dialog.
- **Reset Demo Reviews**: One-click action to restore the 3 original Lawan demo testimonials.
- **Customer Inquiries Log**: View inquiries submitted through the public contact form (Name, Phone, Service, Issue details, Timestamp).

---

## 📁 Project Structure

```
├── index.html         # Semantic HTML5 single-page application
├── css/
│   ├── style.css      # Corporate Light Theme design system & components
│   └── admin.css      # Admin modal, dashboard overlay, and table styling
├── js/
│   ├── storage.js     # Persistent storage abstraction layer (ReviewStorageAPI)
│   ├── i18n.js        # Bilingual localization engine (English / Hindi)
│   ├── admin.js       # Admin authentication, review CRUD, and photo upload
│   └── app.js         # Client-side dynamic rendering & navigation
└── README.md          # Complete documentation & usage guide
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any modern web browser, or serve it using any local HTTP server:

```powershell
# Using Python
python -m http.server 8080

# Or using Node.js
npx serve .
```

Open `http://localhost:8080` in your browser.
