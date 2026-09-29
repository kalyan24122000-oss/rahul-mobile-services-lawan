/**
 * Storage Layer & Data Persistence Architecture
 * Rahul Mobile Services Lawan
 * 
 * Provides an extensible API abstraction layer for Reviews and Customer Inquiries.
 * Backed by browser localStorage by default; designed for seamless replacement
 * with Firebase, Supabase, or RESTful API endpoints.
 */

const STORAGE_KEYS = {
  REVIEWS: 'rahul_mobile_reviews_lawan',
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
    avatar: '' // Empty triggers initials avatar fallback
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

// Initial demo inquiries for Admin demonstration
const INITIAL_DEMO_INQUIRIES = [
  {
    id: 'inq-lawan-1',
    name: 'Prakash Sahu',
    phone: '+91 97555 12345',
    service: 'Precision Hardware Repair',
    model: 'Samsung Galaxy M33 - Battery draining rapidly',
    timestamp: '2026-09-28 11:20 AM'
  },
  {
    id: 'inq-lawan-2',
    name: 'Kavita Verma',
    phone: '+91 98271 89012',
    service: 'Retail Smartphone Sales',
    model: 'Looking for 5G smartphone with good camera under 20k',
    timestamp: '2026-09-29 02:45 PM'
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
      if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_DEMO_INQUIRIES));
      }
    } catch (e) {
      console.warn('LocalStorage error during initialization:', e);
    }
  }

  /**
   * Retrieves all reviews ordered chronologically (newest first).
   * @returns {Promise<Array>}
   */
  async getAllReviews() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (!data) {
        return [...INITIAL_DEMO_REVIEWS];
      }
      const reviews = JSON.parse(data);
      // Sort newest first
      return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (e) {
      console.error('Failed to read reviews from storage:', e);
      return [...INITIAL_DEMO_REVIEWS];
    }
  }

  /**
   * Adds a new customer review to persistent storage.
   * @param {Object} reviewData 
   * @returns {Promise<Object>} The saved review object
   */
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
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
      return newReview;
    } catch (e) {
      console.error('Storage quota exceeded or write failed:', e);
      throw new Error('Could not save review. Please check storage capacity.');
    }
  }

  /**
   * Deletes a review by unique identifier.
   * @param {string} id 
   * @returns {Promise<boolean>}
   */
  async deleteReview(id) {
    const reviews = await this.getAllReviews();
    const filtered = reviews.filter(r => r.id !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(filtered));
      return true;
    } catch (e) {
      console.error('Failed to delete review:', e);
      throw e;
    }
  }

  /**
   * Resets reviews back to default 3 Lawan demo reviews.
   * @returns {Promise<Array>}
   */
  async resetDemoReviews() {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_DEMO_REVIEWS));
      return [...INITIAL_DEMO_REVIEWS];
    } catch (e) {
      console.error('Failed to reset demo reviews:', e);
      throw e;
    }
  }

  /**
   * Calculates overall review statistics.
   * @returns {Promise<{total: number, average: string}>}
   */
  async getReviewStats() {
    const reviews = await this.getAllReviews();
    if (reviews.length === 0) {
      return { total: 0, average: '5.0' };
    }
    const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
    const avg = (sum / reviews.length).toFixed(1);
    return { total: reviews.length, average: avg };
  }

  /* Inquiry Operations */
  async getAllInquiries() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
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
      timestamp: formattedDate
    };

    inquiries.unshift(newInquiry);
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
      return newInquiry;
    } catch (e) {
      console.error('Failed to save inquiry:', e);
      throw e;
    }
  }
}

// Global Singleton Instance for clean architectural separation
window.ReviewStorageAPI = new ReviewStorageService();
