/**
 * Client Main Application
 * Rahul Mobile Services Lawan
 * 
 * Manages:
 * - Dynamic Review Rendering in "Happy Customers" Section
 * - Mobile Drawer & Responsive Navigation
 * - Contact Inquiry Form Handling & Validation
 * - Scroll Spy & Header Elevations
 * - Global Initialization & i18n Event Listening
 */

// Helper to escape HTML characters
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Public Review Rendering Function
 * Renders all saved testimonials dynamically into the grid.
 */
async function renderPublicReviews() {
  const container = document.getElementById('testimonialsGrid');
  const avgRatingEl = document.getElementById('publicAvgRating');
  const reviewCountEl = document.getElementById('publicReviewCount');
  if (!container) return;

  try {
    const reviews = await window.ReviewStorageAPI.getAllReviews();
    const stats = await window.ReviewStorageAPI.getReviewStats();

    if (avgRatingEl) avgRatingEl.textContent = stats.average;
    if (reviewCountEl) {
      const countLabel = window.I18n && window.I18n.currentLang === 'hi' 
        ? `${stats.total} संतुष्ट समीक्षाएं` 
        : `Based on ${stats.total} verified reviews`;
      reviewCountEl.textContent = countLabel;
    }

    if (reviews.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 1rem;">No customer reviews currently available. Be the first to visit our store in Lawan!</p>
        </div>
      `;
      return;
    }

    const starSvg = `<svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;

    container.innerHTML = reviews.map(r => {
      const initials = r.name ? r.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'RM';
      const avatarHtml = r.avatar
        ? `<img src="${r.avatar}" alt="${escapeHtml(r.name)}" class="customer-avatar">`
        : `<div class="customer-avatar">${initials}</div>`;

      const numStars = Math.max(1, Math.min(5, Number(r.rating) || 5));
      const starsHtml = starSvg.repeat(numStars);

      // Format date
      let formattedDate = r.date;
      try {
        const d = new Date(r.date);
        formattedDate = d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
      } catch (e) {}

      return `
        <article class="testimonial-card">
          <div class="card-top-row">
            ${avatarHtml}
            <div class="customer-meta">
              <div class="customer-name-row">
                <span class="customer-name">${escapeHtml(r.name)}</span>
                <svg class="verified-icon" viewBox="0 0 20 20" title="Verified Customer" aria-label="Verified Customer">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="customer-location">${escapeHtml(r.location || 'Lawan, Chhattisgarh')}</span>
            </div>
          </div>
          <div class="review-stars" aria-label="${numStars} out of 5 stars">
            ${starsHtml}
          </div>
          <p class="review-text">"${escapeHtml(r.text)}"</p>
          <div class="review-footer">
            <span class="service-tag">${escapeHtml(r.service)}</span>
            <span class="review-date">${formattedDate}</span>
          </div>
        </article>
      `;
    }).join('');

  } catch (err) {
    console.error('Error rendering public reviews:', err);
  }
}

// Make accessible to Admin module
window.renderPublicReviews = renderPublicReviews;

let currentGalleryFilter = 'all';

/**
 * Public Customer Delivery Photo Gallery Rendering
 * Displays full-size smiling customer photos with device model & handover tags.
 */
async function renderPublicGallery(filter = currentGalleryFilter) {
  currentGalleryFilter = filter;
  const container = document.getElementById('customerGalleryGrid');
  if (!container) return;

  try {
    const allPhotos = await window.ReviewStorageAPI.getAllPhotos();
    const filteredPhotos = filter === 'all' 
      ? allPhotos 
      : allPhotos.filter(p => p.category === filter);

    if (filteredPhotos.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0;">
          <p style="color: #64748b; font-size: 1rem;">No customer delivery photos found in this category.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredPhotos.map(p => {
      const badgeText = p.badgeText || (p.category === 'repair' ? 'Screen Restored' : 'Phone Delivery');
      return `
        <div class="gallery-card" data-id="${p.id}" role="button" tabindex="0" aria-label="View photo of ${escapeHtml(p.customerName)} holding ${escapeHtml(p.device)}">
          <div class="gallery-image-frame">
            <img src="${p.photo}" alt="${escapeHtml(p.customerName)} smiling with ${escapeHtml(p.device)}" loading="lazy">
            <span class="gallery-card-badge">${escapeHtml(badgeText)}</span>
          </div>
          <div class="gallery-card-content">
            <div class="gallery-device-pill">
              <svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>
              <span>${escapeHtml(p.device)}</span>
            </div>
            <h4 class="gallery-customer-name">${escapeHtml(p.customerName)}</h4>
            <span class="gallery-customer-loc">${escapeHtml(p.location || 'Lawan, Chhattisgarh')}</span>
            <p class="gallery-customer-note">"${escapeHtml(p.note || 'Very pleased with device handover at Rahul Mobile Services Lawan.')}"</p>
            <div class="gallery-card-footer">
              <span>${p.date}</span>
              <span class="gallery-view-hint">
                <span>View Full Photo</span>
                <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:currentColor;"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to open Lightbox
    container.querySelectorAll('.gallery-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const photoItem = allPhotos.find(p => p.id === id);
        if (photoItem) openGalleryLightbox(photoItem);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-id');
          const photoItem = allPhotos.find(p => p.id === id);
          if (photoItem) openGalleryLightbox(photoItem);
        }
      });
    });

  } catch (err) {
    console.error('Error rendering public photo gallery:', err);
  }
}

window.renderPublicGallery = renderPublicGallery;

/**
 * Gallery Lightbox Modal Handling
 */
function openGalleryLightbox(item) {
  const backdrop = document.getElementById('galleryLightboxBackdrop');
  if (!backdrop) return;

  document.getElementById('lightboxImg').src = item.photo;
  document.getElementById('lightboxBadge').textContent = item.badgeText || (item.category === 'repair' ? 'Screen Restored' : 'Phone Delivery');
  document.getElementById('lightboxCategory').textContent = item.category === 'repair' ? 'Precision Hardware Repair' : 'Smartphone Sales Handover';
  document.getElementById('lightboxCustomerName').textContent = item.customerName;
  document.getElementById('lightboxLocation').textContent = item.location || 'Lawan, Chhattisgarh';
  document.getElementById('lightboxDevice').textContent = item.device;
  document.getElementById('lightboxNote').textContent = item.note || 'Extremely happy with the service and device delivery at Rahul Mobile Services Lawan.';
  document.getElementById('lightboxDate').textContent = item.date;

  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGalleryLightbox() {
  const backdrop = document.getElementById('galleryLightboxBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function setupGalleryLightboxEvents() {
  const backdrop = document.getElementById('galleryLightboxBackdrop');
  const closeBtn = document.getElementById('lightboxCloseBtn');

  if (closeBtn) closeBtn.addEventListener('click', closeGalleryLightbox);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeGalleryLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Escape' || e.key === 'Esc') && backdrop && backdrop.classList.contains('active')) {
      closeGalleryLightbox();
    }
  });
}

function setupGalleryFilterButtons() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter') || 'all';
      renderPublicGallery(filter);
    });
  });
}

/**
 * Real-Time Inquiry Badges & Counters
 */
async function updateInquiryBadges() {
  try {
    const unreadCount = await window.ReviewStorageAPI.getUnreadInquiriesCount();
    const navBadge = document.getElementById('navInquiryBadge');
    const drawerBadge = document.getElementById('mobileDrawerInquiryBadge');
    const adminTabBadge = document.getElementById('adminInquiryTabBadge');
    const alertCountText = document.getElementById('inquiryAlertCountText');

    if (navBadge) {
      navBadge.textContent = unreadCount;
      navBadge.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
    }

    if (drawerBadge) {
      drawerBadge.textContent = unreadCount;
      drawerBadge.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
    }

    if (adminTabBadge) {
      adminTabBadge.textContent = unreadCount;
      adminTabBadge.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
    }

    if (alertCountText) {
      alertCountText.textContent = `${unreadCount} New Inquiries`;
    }
  } catch (e) {
    console.warn('Could not update inquiry badges:', e);
  }
}

window.updateInquiryBadges = updateInquiryBadges;

/**
 * Mobile Navigation Drawer Management
 */
function setupMobileNavigation() {
  const openBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  if (!openBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * Quick Service Inquiry Form Handling
 */
function setupInquiryForm() {
  const form = document.getElementById('quickInquiryForm');
  const statusAlert = document.getElementById('formStatusAlert');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('inquiryName');
    const phoneInput = document.getElementById('inquiryPhone');
    const serviceInput = document.getElementById('inquiryService');
    const modelInput = document.getElementById('inquiryModel');
    const submitBtn = form.querySelector('button[type="submit"]');

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const service = serviceInput.value;
    const model = modelInput.value.trim();

    if (!name || !phone) {
      if (statusAlert) {
        statusAlert.className = 'form-status-alert error';
        statusAlert.textContent = 'Please provide both your name and phone number.';
      }
      return;
    }

    // Basic Indian phone validation
    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 10) {
      if (statusAlert) {
        statusAlert.className = 'form-status-alert error';
        statusAlert.textContent = 'Please enter a valid 10-digit mobile number.';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    try {
      await window.ReviewStorageAPI.addInquiry({
        name,
        phone,
        service,
        model
      });

      form.reset();

      if (statusAlert) {
        const msg = window.I18n && window.I18n.currentLang === 'hi'
          ? 'धन्यवाद! आपकी पूछताछ Rahul Mobile Services Lawan को प्राप्त हो गई है। हमारी टीम जल्द ही आपसे संपर्क करेगी।'
          : 'Thank you! Your inquiry has been submitted to Rahul Mobile Services Lawan. Our technicians will call you shortly.';
        statusAlert.className = 'form-status-alert success';
        statusAlert.textContent = msg;
      }

      // If admin app exists, update stats
      if (window.AdminApp) {
        window.AdminApp.updateStats();
      }

      setTimeout(() => {
        if (statusAlert) statusAlert.style.display = 'none';
      }, 7000);

    } catch (err) {
      if (statusAlert) {
        statusAlert.className = 'form-status-alert error';
        statusAlert.textContent = 'Unable to send inquiry. Please call us directly at +91 98765 43210.';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = window.I18n && window.I18n.currentLang === 'hi' 
          ? 'पूछताछ भेजें' 
          : 'Submit Service Inquiry';
      }
    }
  });
}

/**
 * Active Navigation Spy on Scroll
 */
function setupScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/**
 * Prefill inquiry form on button click from Service cards
 */
function setupServiceEstimateTriggers() {
  const triggers = document.querySelectorAll('.btn-service-trigger');
  const serviceSelect = document.getElementById('inquiryService');
  const contactSection = document.getElementById('contact');

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceType = btn.getAttribute('data-service-val');
      if (serviceSelect && serviceType) {
        serviceSelect.value = serviceType;
      }
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const nameField = document.getElementById('inquiryName');
        if (nameField) setTimeout(() => nameField.focus(), 600);
      }
    });
  });
}

// Global App Initialization
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Localization (Default: English)
  if (window.I18n) {
    window.I18n.init();
  }

  // 2. Render Initial Reviews & Full-Size Photo Gallery from Persistent Storage
  renderPublicReviews();
  renderPublicGallery();

  // 3. Setup Navigation & Interactivity
  setupMobileNavigation();
  setupInquiryForm();
  setupScrollSpy();
  setupServiceEstimateTriggers();
  setupGalleryFilterButtons();
  setupGalleryLightboxEvents();

  // 4. Update Live Inquiry Notification Badges
  updateInquiryBadges();

  // Listen for language changes to update dynamic review count label
  window.addEventListener('languageChanged', () => {
    renderPublicReviews();
    renderPublicGallery();
  });

  // Listen for real-time inquiry events
  window.addEventListener('inquiryAdded', () => {
    updateInquiryBadges();
  });
  window.addEventListener('inquiryUpdated', () => {
    updateInquiryBadges();
  });
});
