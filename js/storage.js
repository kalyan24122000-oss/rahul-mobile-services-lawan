/**
 * Storage Layer & Data Persistence Architecture
 * Rahul Mobile Services Lawan
 * 
 * Provides an extensible API abstraction layer for:
 * 1. Customer Reviews & Ratings
 * 2. Full-Size Smiling Customer Delivery Photo Gallery (Devices Purchased & Repaired)
 * 3. Customer Inquiries Log & Real-Time Notification System
 */

const STORAGE_KEYS = {
  REVIEWS: 'rahul_mobile_reviews_lawan',
  GALLERY: 'rahul_mobile_gallery_lawan',
  INQUIRIES: 'rahul_mobile_inquiries_lawan',
  LANG_PREF: 'rahul_mobile_lang_lawan'
};

// 3 Realistic Pre-Populated Customer Reviews from Lawan, Chhattisgarh
const INITIAL_DEMO_REVIEWS = [
  {
    id: 'rev-lawan-1',
    name: 'Ramesh Verma',
    location: 'Lawan Main Market',
    rating: 5,
    date: '2026-09-18',
    service: 'Screen & Display Replacement',
    text: 'My Redmi Note 12 screen cracked badly after falling on concrete. Visited Rahul Mobile Services Lawan and they replaced the full display in just 40 minutes with original quality and flawless touch responsiveness. Pricing was crystal clear upfront. Highly recommended for everyone in Lawan!',
    avatar: ''
  },
  {
    id: 'rev-lawan-2',
    name: 'Sunita Sahu',
    location: 'Kharora-Lawan Road',
    rating: 5,
    date: '2026-09-22',
    service: 'Smartphone Sales & Data Migration',
    text: 'Purchased a new 5G smartphone from Rahul Mobile Services Lawan. The owner personally helped me choose the best phone within my ₹15,000 budget and transferred all my photos and contacts from the old device without charging extra. Truly dependable after-sales care!',
    avatar: ''
  },
  {
    id: 'rev-lawan-3',
    name: 'Manoj Dewangan',
    location: 'Lawan Ward 4',
    rating: 5,
    date: '2026-09-27',
    service: 'Battery & Type-C Charging Port Fix',
    text: 'My phone had completely stopped charging. Nearby repair shops told me the whole motherboard was damaged, but Rahul Mobile Services Lawan accurately diagnosed just a damaged Type-C charging pin. Repaired within an hour at a very honest price. 100% trustworthy technicians.',
    avatar: ''
  }
];

// Helper to create beautiful high-contrast SVG images of smiling customers holding their phone
function createCustomerDeliverySvg(name, device, badgeText, themeColor = '#2563eb', bgAccent = '#dbeafe') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f8fafc"/>
        <stop offset="100%" stop-color="${bgAccent}"/>
      </linearGradient>
      <linearGradient id="phoneScreen" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="50%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#1e3a8a"/>
      </linearGradient>
      <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.12"/>
      </filter>
    </defs>
    <!-- Background Frame -->
    <rect width="600" height="750" fill="url(#bgGrad)"/>
    <circle cx="500" cy="150" r="180" fill="#ffffff" opacity="0.6"/>
    <circle cx="100" cy="650" r="160" fill="${themeColor}" opacity="0.08"/>

    <!-- Store Counter Backdrop Details -->
    <rect x="40" y="30" width="520" height="40" rx="8" fill="#ffffff" opacity="0.9"/>
    <text x="60" y="56" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto" font-size="16" font-weight="700" fill="#0f2347">Rahul Mobile Services Lawan &bull; Verified Delivery</text>

    <!-- Smiling Customer Illustration -->
    <!-- Torso / Shirt -->
    <path d="M170 540 Q300 480 430 540 L450 750 L150 750 Z" fill="${themeColor}"/>
    <!-- Collar & Details -->
    <polygon points="260,510 300,560 340,510" fill="#ffffff"/>
    <polygon points="300,560 280,630 320,630" fill="#e2e8f0"/>

    <!-- Neck -->
    <rect x="270" y="380" width="60" height="110" rx="20" fill="#fed7aa"/>

    <!-- Face / Head -->
    <ellipse cx="300" cy="300" rx="95" ry="115" fill="#fcd34d"/>
    <ellipse cx="300" cy="305" rx="90" ry="105" fill="#ffedd5"/>

    <!-- Hair -->
    <path d="M205 270 Q300 160 395 270 Q405 190 300 180 Q195 190 205 270 Z" fill="#1e293b"/>

    <!-- Smiling Eyes & Eyebrows -->
    <path d="M245 255 Q265 245 280 255" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M320 255 Q335 245 355 255" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="262" cy="275" rx="8" ry="10" fill="#0f172a"/>
    <ellipse cx="338" cy="275" rx="8" ry="10" fill="#0f172a"/>
    <circle cx="264" cy="272" r="3" fill="#ffffff"/>
    <circle cx="340" cy="272" r="3" fill="#ffffff"/>

    <!-- Cheerful Big Smile (Teeth visible) -->
    <path d="M255 330 Q300 380 345 330 Z" fill="#b91c1c"/>
    <path d="M260 330 Q300 350 340 330 Z" fill="#ffffff"/>
    <path d="M255 330 Q300 385 345 330" stroke="#991b1b" stroke-width="3" fill="none"/>

    <!-- Arm & Hand Holding The Smartphone (Proud Display Pose) -->
    <!-- Arm reaching forward-right holding the phone -->
    <path d="M380 520 Q440 500 460 410 Q475 350 420 340" stroke="#fcd34d" stroke-width="50" fill="none" stroke-linecap="round"/>

    <!-- Smartphone Body Held Up (Full Visibility) -->
    <g transform="translate(370, 240) rotate(-6)" filter="url(#cardShadow)">
      <!-- Phone Outer Shell -->
      <rect x="0" y="0" width="165" height="310" rx="22" fill="#0f172a" stroke="#cbd5e1" stroke-width="3"/>
      <!-- Screen -->
      <rect x="7" y="10" width="151" height="290" rx="16" fill="url(#phoneScreen)"/>
      <!-- Camera Punch hole -->
      <circle cx="82" cy="24" r="5" fill="#020617"/>
      <!-- Screen Display Graphics (Modern UI Wallpaper) -->
      <circle cx="82" cy="140" r="45" fill="${themeColor}" opacity="0.8"/>
      <!-- App icons grid mockup on phone -->
      <rect x="25" y="195" width="22" height="22" rx="5" fill="#38bdf8"/>
      <rect x="58" y="195" width="22" height="22" rx="5" fill="#22c55e"/>
      <rect x="91" y="195" width="22" height="22" rx="5" fill="#eab308"/>
      <rect x="124" y="195" width="22" height="22" rx="5" fill="#ec4899"/>

      <rect x="25" y="228" width="22" height="22" rx="5" fill="#6366f1"/>
      <rect x="58" y="228" width="22" height="22" rx="5" fill="#a855f7"/>
      <rect x="91" y="228" width="22" height="22" rx="5" fill="#14b8a6"/>
      <rect x="124" y="228" width="22" height="22" rx="5" fill="#f97316"/>

      <!-- Device Model Text on Screen -->
      <rect x="15" y="80" width="135" height="30" rx="6" fill="rgba(255,255,255,0.15)"/>
      <text x="82" y="100" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">${device}</text>

      <!-- Fingers curled around phone -->
      <ellipse cx="-2" cy="130" rx="12" ry="18" fill="#fcd34d"/>
      <ellipse cx="-2" cy="175" rx="12" ry="18" fill="#fcd34d"/>
      <ellipse cx="-2" cy="220" rx="12" ry="18" fill="#fcd34d"/>
      <ellipse cx="167" cy="180" rx="14" ry="24" fill="#fed7aa"/>
    </g>

    <!-- Bottom Overlay Banner with Customer & Device Info -->
    <rect x="30" y="620" width="540" height="100" rx="14" fill="#ffffff" filter="url(#cardShadow)"/>
    <rect x="30" y="620" width="10" height="100" rx="4" fill="${themeColor}"/>

    <text x="55" y="652" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto" font-size="20" font-weight="800" fill="#0f172a">${name}</text>
    <text x="55" y="678" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto" font-size="15" font-weight="700" fill="${themeColor}">Device: ${device}</text>
    <text x="55" y="702" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto" font-size="12" font-weight="500" fill="#64748b">Verified Delivery &bull; Rahul Mobile Services Lawan</text>

    <!-- Badge Tag -->
    <rect x="420" y="638" width="135" height="30" rx="15" fill="${themeColor}"/>
    <text x="487" y="658" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">${badgeText}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// 4 Initial Realistic Demo Photos of Smiling Customers Holding Their Phone in Lawan
const INITIAL_DEMO_GALLERY = [
  {
    id: 'gal-lawan-1',
    customerName: 'Rajesh Kumar Sahu',
    location: 'Lawan Main Market',
    device: 'Vivo Y200e 5G',
    category: 'sales',
    badgeText: 'New 5G Delivery',
    date: '2026-09-24',
    note: 'Purchased my first 5G smartphone from Rahul Mobile Services Lawan. Exceptional counter guidance and free data setup!',
    photo: createCustomerDeliverySvg('Rajesh Kumar Sahu', 'Vivo Y200e 5G', 'New 5G Delivery', '#2563eb', '#dbeafe')
  },
  {
    id: 'gal-lawan-2',
    customerName: 'Pooja Verma',
    location: 'Kharora Road, Lawan',
    device: 'Redmi Note 13 Pro',
    category: 'repair',
    badgeText: 'Screen Restored',
    date: '2026-09-26',
    note: 'Completely cracked screen replaced in just 45 minutes. Phone looks and feels brand new again. Highly trusted repair work!',
    photo: createCustomerDeliverySvg('Pooja Verma', 'Redmi Note 13 Pro', 'Screen Restored', '#16a34a', '#dcfce7')
  },
  {
    id: 'gal-lawan-3',
    customerName: 'Mahesh Dewangan',
    location: 'Lawan Ward 3',
    device: 'Samsung Galaxy A15 5G',
    category: 'sales',
    badgeText: 'Smartphone Sales',
    date: '2026-09-27',
    note: 'Got the best deal on Samsung Galaxy A15 with original tempered glass and fast adapter. Very happy with the service in Lawan.',
    photo: createCustomerDeliverySvg('Mahesh Dewangan', 'Galaxy A15 5G', 'Smartphone Sales', '#0f2347', '#e2e8f0')
  },
  {
    id: 'gal-lawan-4',
    customerName: 'Karan Patel',
    location: 'Baloda Bazar Road, Lawan',
    device: 'Realme 12x 5G',
    category: 'sales',
    badgeText: 'Budget 5G Phone',
    date: '2026-09-28',
    note: 'Found the exact phone model I wanted within my budget. Honest staff and complete purchase invoice provided on the spot.',
    photo: createCustomerDeliverySvg('Karan Patel', 'Realme 12x 5G', 'Budget 5G Phone', '#7c3aed', '#ede9fe')
  }
];

// Initial demo inquiries for Admin demonstration
const INITIAL_DEMO_INQUIRIES = [
  {
    id: 'inq-lawan-1',
    name: 'Prakash Sahu',
    phone: '+91 97555 12345',
    service: 'Precision Hardware Repair',
    model: 'Samsung Galaxy M33 - Battery draining rapidly',
    timestamp: '2026-09-28 11:20 AM',
    status: 'new' // 'new' or 'contacted'
  },
  {
    id: 'inq-lawan-2',
    name: 'Kavita Verma',
    phone: '+91 98271 89012',
    service: 'Retail Smartphone Sales',
    model: 'Looking for 5G smartphone with good camera under 20k',
    timestamp: '2026-09-29 02:45 PM',
    status: 'new'
  }
];

class ReviewStorageService {
  constructor() {
    this._initializeStorage();
  }

  _initializeStorage() {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_DEMO_REVIEWS));
      }
      if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) {
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_DEMO_GALLERY));
      }
      if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_DEMO_INQUIRIES));
      }
    } catch (e) {
      console.warn('LocalStorage error during initialization:', e);
    }
  }

  /* -------------------------------------------------------------
     1. Reviews Storage APIs
     ------------------------------------------------------------- */
  async getAllReviews() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (!data) return [...INITIAL_DEMO_REVIEWS];
      const reviews = JSON.parse(data);
      return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (e) {
      return [...INITIAL_DEMO_REVIEWS];
    }
  }

  async addReview(reviewData) {
    const reviews = await this.getAllReviews();
    const newReview = {
      id: 'rev-' + Date.now(),
      name: reviewData.name.trim(),
      location: reviewData.location ? reviewData.location.trim() : 'Lawan, Chhattisgarh',
      rating: parseInt(reviewData.rating, 10) || 5,
      date: reviewData.date || new Date().toISOString().split('T')[0],
      service: reviewData.service.trim() || 'General Mobile Service',
      text: reviewData.text.trim(),
      avatar: reviewData.avatar || ''
    };

    reviews.unshift(newReview);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    return newReview;
  }

  async deleteReview(id) {
    const reviews = await this.getAllReviews();
    const filtered = reviews.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(filtered));
    return true;
  }

  async resetDemoReviews() {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_DEMO_REVIEWS));
    return [...INITIAL_DEMO_REVIEWS];
  }

  async getReviewStats() {
    const reviews = await this.getAllReviews();
    if (reviews.length === 0) return { total: 0, average: '5.0' };
    const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
    const avg = (sum / reviews.length).toFixed(1);
    return { total: reviews.length, average: avg };
  }

  /* -------------------------------------------------------------
     2. Full-Size Customer Photo Gallery APIs
     ------------------------------------------------------------- */
  async getAllPhotos() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (!data) return [...INITIAL_DEMO_GALLERY];
      const photos = JSON.parse(data);
      return photos.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (e) {
      return [...INITIAL_DEMO_GALLERY];
    }
  }

  async addPhoto(photoData) {
    const photos = await this.getAllPhotos();
    const newPhoto = {
      id: 'gal-' + Date.now(),
      customerName: photoData.customerName.trim(),
      location: photoData.location ? photoData.location.trim() : 'Lawan, Chhattisgarh',
      device: photoData.device.trim() || 'Smartphone Handover',
      category: photoData.category || 'sales',
      badgeText: photoData.badgeText ? photoData.badgeText.trim() : (photoData.category === 'repair' ? 'Precision Repair' : 'Phone Delivery'),
      date: photoData.date || new Date().toISOString().split('T')[0],
      note: photoData.note ? photoData.note.trim() : 'Happy customer with device handover at Rahul Mobile Services Lawan.',
      photo: photoData.photo || createCustomerDeliverySvg(photoData.customerName, photoData.device, 'Verified Delivery')
    };

    photos.unshift(newPhoto);
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(photos));
    return newPhoto;
  }

  async deletePhoto(id) {
    const photos = await this.getAllPhotos();
    const filtered = photos.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(filtered));
    return true;
  }

  async resetDemoPhotos() {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_DEMO_GALLERY));
    return [...INITIAL_DEMO_GALLERY];
  }

  /* -------------------------------------------------------------
     3. Customer Inquiries APIs (With Real-Time Status & Notification)
     ------------------------------------------------------------- */
  async getAllInquiries() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  async getUnreadInquiriesCount() {
    const inquiries = await this.getAllInquiries();
    return inquiries.filter(i => i.status === 'new').length;
  }

  async addInquiry(inquiryData) {
    const inquiries = await this.getAllInquiries();
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newInquiry = {
      id: 'inq-' + Date.now(),
      name: inquiryData.name.trim(),
      phone: inquiryData.phone.trim(),
      service: inquiryData.service || 'Repair Inquiry',
      model: inquiryData.model ? inquiryData.model.trim() : 'Not specified',
      timestamp: formattedDate,
      status: 'new'
    };

    inquiries.unshift(newInquiry);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));

    // Dispatch custom event for real-time notification
    window.dispatchEvent(new CustomEvent('inquiryAdded', { detail: newInquiry }));
    return newInquiry;
  }

  async toggleInquiryStatus(id) {
    const inquiries = await this.getAllInquiries();
    const item = inquiries.find(i => i.id === id);
    if (item) {
      item.status = item.status === 'contacted' ? 'new' : 'contacted';
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
      window.dispatchEvent(new CustomEvent('inquiryUpdated', { detail: item }));
      return item;
    }
    return null;
  }

  async deleteInquiry(id) {
    const inquiries = await this.getAllInquiries();
    const filtered = inquiries.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('inquiryUpdated', { detail: { id } }));
    return true;
  }
}

// Global Singleton Instance for clean architectural separation
window.ReviewStorageAPI = new ReviewStorageService();
