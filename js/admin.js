/**
 * Admin Management Module
 * Rahul Mobile Services Lawan
 * 
 * Handles:
 * - Admin Authentication Modal (admin / admin123)
 * - Accessible Modal Dismissal (X, Cancel, Backdrop, ESC)
 * - Real-Time Inquiries Management (Notification badge, WhatsApp/Call shortcuts, Status toggle)
 * - Full-Size Customer Delivery Photo Gallery Management (Add, Base64 preview, Delete, Reset)
 * - Customer Reviews & Ratings CRUD
 * - Instant Synchronization with Public Website
 */

class AdminManager {
  constructor() {
    this.isAuthenticated = false;
    this.currentBase64ReviewPhoto = '';
    this.currentBase64GalleryPhoto = '';
    this.itemToDelete = null; // { type: 'review'|'gallery'|'inquiry', id: string }
    this.inquiryFilter = 'all'; // 'all' or 'new'

    // Elements - Login
    this.loginBackdrop = document.getElementById('adminLoginBackdrop');
    this.loginModal = document.getElementById('adminLoginModal');
    this.loginForm = document.getElementById('adminLoginForm');
    this.usernameInput = document.getElementById('adminUsername');
    this.passwordInput = document.getElementById('adminPassword');
    this.loginErrorAlert = document.getElementById('adminLoginError');
    this.loginCancelBtn = document.getElementById('adminLoginCancel');
    this.loginCloseBtn = document.getElementById('adminLoginClose');

    // Elements - Dashboard & Overlay
    this.dashboardOverlay = document.getElementById('adminDashboardOverlay');
    this.dashboardLogoutBtn = document.getElementById('adminDashboardLogout');

    // Stats
    this.statTotalReviews = document.getElementById('adminStatTotalReviews');
    this.statAvgRating = document.getElementById('adminStatAvgRating');
    this.statInquiries = document.getElementById('adminStatInquiries');

    // Tabs
    this.tabButtons = document.querySelectorAll('.admin-tab-btn');
    this.tabContents = document.querySelectorAll('.admin-tab-content');

    // Inquiries Tab Elements
    this.inquiriesCardsContainer = document.getElementById('adminInquiriesCardsContainer');
    this.inquiryAlertBanner = document.getElementById('inquiryAlertBanner');
    this.inquiryAlertCountText = document.getElementById('inquiryAlertCountText');
    this.btnFilterAllInquiries = document.getElementById('btnFilterAllInquiries');
    this.btnFilterNewInquiries = document.getElementById('btnFilterNewInquiries');

    // Reviews Tab Elements
    this.reviewForm = document.getElementById('adminReviewForm');
    this.reviewListContainer = document.getElementById('adminReviewsTable');
    this.resetDemoReviewsBtn = document.getElementById('btnResetDemoReviews');
    this.reviewPhotoInput = document.getElementById('adminCustomerPhoto');
    this.reviewPhotoPreviewImg = document.getElementById('adminPhotoPreview');
    this.reviewClearPhotoBtn = document.getElementById('adminClearPhoto');

    // Gallery Tab Elements
    this.galleryForm = document.getElementById('adminGalleryForm');
    this.galleryListContainer = document.getElementById('adminGalleryTable');
    this.resetDemoGalleryBtn = document.getElementById('btnResetDemoGallery');
    this.galPhotoInput = document.getElementById('adminGalPhotoFile');
    this.galPhotoPreviewImg = document.getElementById('adminGalPhotoPreview');
    this.galClearPhotoBtn = document.getElementById('adminGalClearPhoto');

    // Confirm Dialog Elements
    this.confirmBackdrop = document.getElementById('confirmDialogBackdrop');
    this.confirmTitle = document.getElementById('confirmDialogTitle');
    this.confirmMessage = this.confirmBackdrop ? this.confirmBackdrop.querySelector('.confirm-dialog-message') : null;
    this.confirmOkBtn = document.getElementById('confirmDialogOk');
    this.confirmCancelBtn = document.getElementById('confirmDialogCancel');

    this.init();
  }

  init() {
    this.bindLoginTriggers();
    this.bindModalDismissals();
    this.bindLoginForm();

    // Features
    this.bindTabs();
    this.bindInquiriesManagement();
    this.bindReviewManagement();
    this.bindGalleryManagement();
    this.bindConfirmDialog();

    if (this.dashboardLogoutBtn) {
      this.dashboardLogoutBtn.addEventListener('click', () => this.logout());
    }

    // Auto-update stats and badges
    this.updateStats();

    // Listen to real-time events
    window.addEventListener('inquiryAdded', () => {
      this.updateStats();
      if (this.isAuthenticated) this.renderAdminInquiries();
    });
    window.addEventListener('inquiryUpdated', () => {
      this.updateStats();
      if (this.isAuthenticated) this.renderAdminInquiries();
    });
  }

  /* -------------------------------------------------------------
     1. Login Modal Triggers & Accessible Dismissal
     ------------------------------------------------------------- */
  bindLoginTriggers() {
    const triggers = document.querySelectorAll('.btn-admin-trigger');
    triggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.isAuthenticated) {
          this.openDashboard();
        } else {
          this.openLoginModal();
        }
      });
    });
  }

  openLoginModal() {
    this.loginErrorAlert.classList.remove('visible');
    this.loginForm.reset();
    this.loginBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      if (this.usernameInput) this.usernameInput.focus();
    }, 100);
  }

  closeLoginModal() {
    this.loginBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  bindModalDismissals() {
    if (this.loginCloseBtn) {
      this.loginCloseBtn.addEventListener('click', () => this.closeLoginModal());
    }

    if (this.loginCancelBtn) {
      this.loginCancelBtn.addEventListener('click', () => this.closeLoginModal());
    }

    if (this.loginBackdrop) {
      this.loginBackdrop.addEventListener('click', (e) => {
        if (e.target === this.loginBackdrop) {
          this.closeLoginModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (this.confirmBackdrop && this.confirmBackdrop.classList.contains('active')) {
          this.closeConfirmDialog();
          return;
        }
        if (this.loginBackdrop && this.loginBackdrop.classList.contains('active')) {
          this.closeLoginModal();
        }
      }
    });
  }

  /* -------------------------------------------------------------
     2. Login Authentication
     ------------------------------------------------------------- */
  bindLoginForm() {
    if (!this.loginForm) return;

    this.loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = this.usernameInput.value.trim();
      const password = this.passwordInput.value.trim();

      // Demo Credentials Check: admin / admin123
      if (username === 'admin' && password === 'admin123') {
        this.isAuthenticated = true;
        this.loginErrorAlert.classList.remove('visible');
        this.closeLoginModal();
        this.showToast('Login successful. Welcome Administrator!', 'success');
        this.openDashboard();
      } else {
        this.loginErrorAlert.textContent = 'Invalid credentials. Please use username: admin and password: admin123';
        this.loginErrorAlert.classList.add('visible');
        this.passwordInput.value = '';
        this.passwordInput.focus();
      }
    });
  }

  /* -------------------------------------------------------------
     3. Dashboard Management & Tabs
     ------------------------------------------------------------- */
  openDashboard() {
    this.dashboardOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Render all panels
    this.renderAdminInquiries();
    this.renderAdminGallery();
    this.renderAdminReviews();
    this.updateStats();
  }

  closeDashboard() {
    this.dashboardOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  logout() {
    this.isAuthenticated = false;
    this.closeDashboard();
    this.showToast('Logged out of Admin Portal.', 'info');
  }

  async updateStats() {
    const stats = await window.ReviewStorageAPI.getReviewStats();
    if (this.statTotalReviews) this.statTotalReviews.textContent = stats.total;
    if (this.statAvgRating) this.statAvgRating.textContent = stats.average + ' / 5.0';

    const inquiries = await window.ReviewStorageAPI.getAllInquiries();
    if (this.statInquiries) this.statInquiries.textContent = inquiries.length;

    if (window.updateInquiryBadges) {
      window.updateInquiryBadges();
    }
  }

  bindTabs() {
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabTarget = btn.getAttribute('data-tab');
        
        this.tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.tabContents.forEach(content => {
          content.style.display = content.id === tabTarget ? 'block' : 'none';
        });

        if (tabTarget === 'tabInquiries') this.renderAdminInquiries();
        if (tabTarget === 'tabGallery') this.renderAdminGallery();
        if (tabTarget === 'tabReviews') this.renderAdminReviews();
      });
    });
  }

  /* -------------------------------------------------------------
     4. Prominent Customer Inquiries Management
     ------------------------------------------------------------- */
  bindInquiriesManagement() {
    if (this.btnFilterAllInquiries) {
      this.btnFilterAllInquiries.addEventListener('click', () => {
        this.inquiryFilter = 'all';
        this.btnFilterAllInquiries.className = 'btn btn-primary';
        if (this.btnFilterNewInquiries) this.btnFilterNewInquiries.className = 'btn btn-secondary';
        this.renderAdminInquiries();
      });
    }

    if (this.btnFilterNewInquiries) {
      this.btnFilterNewInquiries.addEventListener('click', () => {
        this.inquiryFilter = 'new';
        this.btnFilterNewInquiries.className = 'btn btn-primary';
        if (this.btnFilterAllInquiries) this.btnFilterAllInquiries.className = 'btn btn-secondary';
        this.renderAdminInquiries();
      });
    }
  }

  async renderAdminInquiries() {
    if (!this.inquiriesCardsContainer) return;
    const allInquiries = await window.ReviewStorageAPI.getAllInquiries();
    const unreadCount = allInquiries.filter(i => i.status === 'new').length;

    if (this.inquiryAlertCountText) {
      this.inquiryAlertCountText.textContent = `${unreadCount} New Inquiries`;
    }

    const filtered = this.inquiryFilter === 'new'
      ? allInquiries.filter(i => i.status === 'new')
      : allInquiries;

    if (filtered.length === 0) {
      this.inquiriesCardsContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 3rem 1.5rem; background: #ffffff; border-radius: 12px; border: 1px dashed var(--border-medium);">
          <svg viewBox="0 0 24 24" style="width:48px;height:48px;fill:#94a3b8;margin:0 auto 0.5rem;"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <p style="color:var(--text-muted);font-weight:600;">No inquiries found in this view.</p>
        </div>
      `;
      return;
    }

    this.inquiriesCardsContainer.innerHTML = filtered.map(inq => {
      const isNew = inq.status === 'new';
      const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
      const waPhone = cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone;
      const waText = encodeURIComponent(`Hello ${inq.name}, this is Rahul Mobile Services Lawan regarding your inquiry for ${inq.service}. How can we assist you?`);
      const waLink = `https://wa.me/${waPhone}?text=${waText}`;

      return `
        <div class="inquiry-lead-card ${isNew ? 'status-new' : 'status-contacted'}" data-id="${inq.id}">
          <div class="inquiry-card-header">
            <div>
              <div class="inquiry-lead-name">${this.escapeHtml(inq.name)}</div>
              <a href="tel:${inq.phone.replace(/[^0-9+]/g, '')}" class="inquiries-phone-link">${this.escapeHtml(inq.phone)}</a>
            </div>
            <span class="inquiry-status-pill ${isNew ? 'new' : 'contacted'}">
              ${isNew ? '● NEW INQUIRY' : '✓ CONTACTED'}
            </span>
          </div>

          <div class="inquiry-detail-row">
            <strong>Service Needed:</strong> ${this.escapeHtml(inq.service)}
          </div>
          <div class="inquiry-detail-row">
            <strong>Device / Problem:</strong> ${this.escapeHtml(inq.model)}
          </div>
          <div class="inquiry-detail-row" style="font-size:0.7rem; color:var(--text-muted); margin-bottom:0.75rem;">
            Received On: ${inq.timestamp} &bull; Lawan Counter Web Lead
          </div>

          <div class="inquiry-actions-row">
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-inquiry-whatsapp" title="Chat on WhatsApp">
              <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:currentColor;"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.13.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z"/></svg>
              <span>WhatsApp Lead</span>
            </a>

            <a href="tel:${inq.phone.replace(/[^0-9+]/g, '')}" class="btn-inquiry-call" title="Call Customer Directly">
              <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:currentColor;"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              <span>Call Now</span>
            </a>

            <button type="button" class="btn-inquiry-toggle" data-inq-id="${inq.id}">
              ${isNew ? 'Mark Contacted' : 'Mark as New'}
            </button>

            <button type="button" class="btn-inquiry-delete" data-inq-id="${inq.id}" title="Delete Inquiry">
              Delete
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach Toggle and Delete actions
    this.inquiriesCardsContainer.querySelectorAll('.btn-inquiry-toggle').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('data-inq-id');
        await window.ReviewStorageAPI.toggleInquiryStatus(id);
        this.showToast('Inquiry status updated.', 'info');
        this.renderAdminInquiries();
        this.updateStats();
      });
    });

    this.inquiriesCardsContainer.querySelectorAll('.btn-inquiry-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-inq-id');
        this.openConfirmDelete({ type: 'inquiry', id });
      });
    });
  }

  /* -------------------------------------------------------------
     5. Customer Delivery Photo Gallery Management
     ------------------------------------------------------------- */
  bindGalleryManagement() {
    // 1. Base64 Upload reader for customer smiling photo
    if (this.galPhotoInput) {
      this.galPhotoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
          alert('Please select an image file (PNG, JPG, WebP).');
          return;
        }

        const reader = new FileReader();
        reader.onload = (loadEvt) => {
          this.currentBase64GalleryPhoto = loadEvt.target.result;
          if (this.galPhotoPreviewImg) {
            this.galPhotoPreviewImg.src = this.currentBase64GalleryPhoto;
            this.galPhotoPreviewImg.style.display = 'block';
          }
          if (this.galClearPhotoBtn) this.galClearPhotoBtn.classList.add('visible');
        };
        reader.readAsDataURL(file);
      });
    }

    if (this.galClearPhotoBtn) {
      this.galClearPhotoBtn.addEventListener('click', () => {
        this.resetGalleryPhotoUpload();
      });
    }

    // Set today's date
    const dateInput = document.getElementById('adminGalDate');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Form Submission
    if (this.galleryForm) {
      this.galleryForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('adminGalCustomerName').value.trim();
        const location = document.getElementById('adminGalCustomerLoc').value.trim() || 'Lawan, Chhattisgarh';
        const device = document.getElementById('adminGalDevice').value.trim();
        const category = document.getElementById('adminGalCategory').value;
        const badgeText = document.getElementById('adminGalBadge').value.trim();
        const date = document.getElementById('adminGalDate').value || new Date().toISOString().split('T')[0];
        const note = document.getElementById('adminGalNote').value.trim();

        if (!name || !device) {
          alert('Please provide Customer Name and Device Model.');
          return;
        }

        try {
          await window.ReviewStorageAPI.addPhoto({
            customerName: name,
            location: location,
            device: device,
            category: category,
            badgeText: badgeText || (category === 'repair' ? 'Screen Restored' : 'Phone Delivery'),
            date: date,
            note: note,
            photo: this.currentBase64GalleryPhoto
          });

          this.showToast('Smiling customer photo added to delivery gallery!', 'success');
          this.galleryForm.reset();
          if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
          this.resetGalleryPhotoUpload();

          // Live sync
          this.renderAdminGallery();
          if (window.renderPublicGallery) {
            window.renderPublicGallery();
          }
        } catch (err) {
          alert('Error adding gallery photo: ' + err.message);
        }
      });
    }

    if (this.resetDemoGalleryBtn) {
      this.resetDemoGalleryBtn.addEventListener('click', async () => {
        if (confirm('Restore default Lawan customer delivery photos?')) {
          await window.ReviewStorageAPI.resetDemoPhotos();
          this.showToast('Gallery restored to demo defaults.', 'success');
          this.renderAdminGallery();
          if (window.renderPublicGallery) window.renderPublicGallery();
        }
      });
    }
  }

  resetGalleryPhotoUpload() {
    this.currentBase64GalleryPhoto = '';
    if (this.galPhotoInput) this.galPhotoInput.value = '';
    if (this.galPhotoPreviewImg) {
      this.galPhotoPreviewImg.src = '';
      this.galPhotoPreviewImg.style.display = 'none';
    }
    if (this.galClearPhotoBtn) this.galClearPhotoBtn.classList.remove('visible');
  }

  async renderAdminGallery() {
    if (!this.galleryListContainer) return;
    const photos = await window.ReviewStorageAPI.getAllPhotos();

    if (photos.length === 0) {
      this.galleryListContainer.innerHTML = `
        <div class="admin-empty-state">
          <svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
          <p>No customer delivery photos found.</p>
        </div>
      `;
      return;
    }

    this.galleryListContainer.innerHTML = photos.map(p => {
      return `
        <div class="admin-review-item" data-id="${p.id}">
          <div class="admin-review-lead">
            <div class="admin-review-avatar" style="border-radius: 6px; width:48px; height:60px;">
              <img src="${p.photo}" alt="${this.escapeHtml(p.customerName)}">
            </div>
            <div class="admin-review-meta">
              <div class="admin-review-title-row">
                <span class="admin-review-author">${this.escapeHtml(p.customerName)}</span>
                <span class="admin-review-tag" style="background:#eff6ff;color:#1e3a8a;">${this.escapeHtml(p.device)}</span>
                <span class="admin-review-tag">${p.category === 'repair' ? 'Repair Handover' : 'Sales Handover'}</span>
              </div>
              <p class="admin-review-body">"${this.escapeHtml(p.note || '')}"</p>
              <span class="admin-review-date">Date: ${p.date} &bull; ${this.escapeHtml(p.location || 'Lawan')}</span>
            </div>
          </div>
          <button type="button" class="btn-delete-review btn-delete-gal" data-id="${p.id}" title="Delete Photo">
            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            Delete
          </button>
        </div>
      `;
    }).join('');

    this.galleryListContainer.querySelectorAll('.btn-delete-gal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        this.openConfirmDelete({ type: 'gallery', id });
      });
    });
  }

  /* -------------------------------------------------------------
     6. Customer Reviews Management
     ------------------------------------------------------------- */
  bindReviewManagement() {
    if (this.reviewPhotoInput) {
      this.reviewPhotoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (loadEvt) => {
          this.currentBase64ReviewPhoto = loadEvt.target.result;
          if (this.reviewPhotoPreviewImg) {
            this.reviewPhotoPreviewImg.src = this.currentBase64ReviewPhoto;
            this.reviewPhotoPreviewImg.style.display = 'block';
          }
          if (this.reviewClearPhotoBtn) this.reviewClearPhotoBtn.classList.add('visible');
        };
        reader.readAsDataURL(file);
      });
    }

    if (this.reviewClearPhotoBtn) {
      this.reviewClearPhotoBtn.addEventListener('click', () => {
        this.resetReviewPhotoUpload();
      });
    }

    const dateInput = document.getElementById('adminReviewDate');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    if (this.reviewForm) {
      this.reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('adminCustomerName').value.trim();
        const location = document.getElementById('adminCustomerLocation').value.trim() || 'Lawan, Chhattisgarh';
        const service = document.getElementById('adminReviewService').value.trim();
        const rating = document.getElementById('adminReviewRating').value;
        const date = document.getElementById('adminReviewDate').value;
        const text = document.getElementById('adminReviewText').value.trim();

        if (!name || !text) {
          alert('Please fill out Customer Name and Review text.');
          return;
        }

        try {
          await window.ReviewStorageAPI.addReview({
            name,
            location,
            service,
            rating,
            date,
            text,
            avatar: this.currentBase64ReviewPhoto
          });

          this.showToast('Customer review saved successfully!', 'success');
          this.reviewForm.reset();
          if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
          this.resetReviewPhotoUpload();

          await this.renderAdminReviews();
          await this.updateStats();
          if (window.renderPublicReviews) window.renderPublicReviews();
        } catch (err) {
          alert('Error saving review: ' + err.message);
        }
      });
    }

    if (this.resetDemoReviewsBtn) {
      this.resetDemoReviewsBtn.addEventListener('click', () => this.handleResetDemoReviews());
    }
  }

  resetReviewPhotoUpload() {
    this.currentBase64ReviewPhoto = '';
    if (this.reviewPhotoInput) this.reviewPhotoInput.value = '';
    if (this.reviewPhotoPreviewImg) {
      this.reviewPhotoPreviewImg.src = '';
      this.reviewPhotoPreviewImg.style.display = 'none';
    }
    if (this.reviewClearPhotoBtn) this.reviewClearPhotoBtn.classList.remove('visible');
  }

  async renderAdminReviews() {
    if (!this.reviewListContainer) return;
    const reviews = await window.ReviewStorageAPI.getAllReviews();

    if (reviews.length === 0) {
      this.reviewListContainer.innerHTML = `
        <div class="admin-empty-state">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          <p>No customer reviews currently found.</p>
        </div>
      `;
      return;
    }

    const starSvg = `<svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;

    this.reviewListContainer.innerHTML = reviews.map(r => {
      const initials = r.name ? r.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'RM';
      const avatarHtml = r.avatar
        ? `<img src="${r.avatar}" alt="${this.escapeHtml(r.name)}">`
        : initials;

      const starsHtml = starSvg.repeat(Math.max(1, Math.min(5, Number(r.rating) || 5)));

      return `
        <div class="admin-review-item" data-id="${r.id}">
          <div class="admin-review-lead">
            <div class="admin-review-avatar">${avatarHtml}</div>
            <div class="admin-review-meta">
              <div class="admin-review-title-row">
                <span class="admin-review-author">${this.escapeHtml(r.name)}</span>
                <span class="admin-review-tag">${this.escapeHtml(r.service)}</span>
                <div class="admin-review-stars">${starsHtml}</div>
              </div>
              <p class="admin-review-body">"${this.escapeHtml(r.text)}"</p>
              <span class="admin-review-date">Date: ${r.date} &bull; ${this.escapeHtml(r.location || 'Lawan')}</span>
            </div>
          </div>
          <button type="button" class="btn-delete-review btn-delete-rev" data-id="${r.id}" title="Delete Review">
            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            Delete
          </button>
        </div>
      `;
    }).join('');

    this.reviewListContainer.querySelectorAll('.btn-delete-rev').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        this.openConfirmDelete({ type: 'review', id });
      });
    });
  }

  async handleResetDemoReviews() {
    if (confirm('Reset all customer reviews to the 3 original Lawan demo reviews?')) {
      await window.ReviewStorageAPI.resetDemoReviews();
      this.showToast('Reviews restored to demo defaults.', 'success');
      await this.renderAdminReviews();
      await this.updateStats();
      if (window.renderPublicReviews) window.renderPublicReviews();
    }
  }

  /* -------------------------------------------------------------
     7. Confirmation Dialog (Unified for Reviews, Gallery & Inquiries)
     ------------------------------------------------------------- */
  bindConfirmDialog() {
    if (this.confirmCancelBtn) {
      this.confirmCancelBtn.addEventListener('click', () => this.closeConfirmDialog());
    }

    if (this.confirmOkBtn) {
      this.confirmOkBtn.addEventListener('click', async () => {
        if (!this.itemToDelete) return;

        try {
          if (this.itemToDelete.type === 'review') {
            await window.ReviewStorageAPI.deleteReview(this.itemToDelete.id);
            this.showToast('Customer review removed successfully.', 'success');
            await this.renderAdminReviews();
            if (window.renderPublicReviews) window.renderPublicReviews();
          } else if (this.itemToDelete.type === 'gallery') {
            await window.ReviewStorageAPI.deletePhoto(this.itemToDelete.id);
            this.showToast('Delivery photo removed from gallery.', 'success');
            await this.renderAdminGallery();
            if (window.renderPublicGallery) window.renderPublicGallery();
          } else if (this.itemToDelete.type === 'inquiry') {
            await window.ReviewStorageAPI.deleteInquiry(this.itemToDelete.id);
            this.showToast('Inquiry lead deleted.', 'success');
            await this.renderAdminInquiries();
          }

          this.closeConfirmDialog();
          await this.updateStats();
        } catch (e) {
          alert('Failed to delete item: ' + e.message);
        }
      });
    }

    if (this.confirmBackdrop) {
      this.confirmBackdrop.addEventListener('click', (e) => {
        if (e.target === this.confirmBackdrop) this.closeConfirmDialog();
      });
    }
  }

  openConfirmDelete(item) {
    this.itemToDelete = item;
    if (this.confirmTitle && this.confirmMessage) {
      if (item.type === 'review') {
        this.confirmTitle.textContent = 'Delete Customer Review';
        this.confirmMessage.textContent = 'Are you sure you want to remove this testimonial? It will disappear from the public website immediately.';
      } else if (item.type === 'gallery') {
        this.confirmTitle.textContent = 'Delete Delivery Photo';
        this.confirmMessage.textContent = 'Are you sure you want to remove this smiling customer delivery photo from the public photo gallery?';
      } else if (item.type === 'inquiry') {
        this.confirmTitle.textContent = 'Delete Customer Inquiry';
        this.confirmMessage.textContent = 'Are you sure you want to delete this customer inquiry lead from Lawan?';
      }
    }

    if (this.confirmBackdrop) this.confirmBackdrop.classList.add('active');
  }

  closeConfirmDialog() {
    this.itemToDelete = null;
    if (this.confirmBackdrop) this.confirmBackdrop.classList.remove('active');
  }

  /* -------------------------------------------------------------
     Utility Helpers
     ------------------------------------------------------------- */
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${this.escapeHtml(message)}</span>
      <button style="color:#64748b; font-weight:bold; padding:4px;" aria-label="Dismiss">&times;</button>
    `;

    toast.querySelector('button').addEventListener('click', () => toast.remove());
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 4000);
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Global initialization
window.AdminApp = null;
document.addEventListener('DOMContentLoaded', () => {
  window.AdminApp = new AdminManager();
});
