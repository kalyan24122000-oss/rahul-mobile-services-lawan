/**
 * Admin Management Module
 * Rahul Mobile Services Lawan
 * 
 * Handles:
 * - Admin Authentication Modal (admin / admin123)
 * - Accessible Modal Dismissal (X, Cancel, Backdrop, ESC)
 * - Admin Review Management Dashboard (Add, List, Delete, Reset)
 * - Real-Time Base64 Photo Upload & Preview
 * - Instant Synchronization with Public "Happy Customers" Section
 * - Inquiries Log Viewer
 */

class AdminManager {
  constructor() {
    this.isAuthenticated = false;
    this.currentBase64Photo = '';
    this.reviewToDeleteId = null;

    // Elements
    this.loginBackdrop = document.getElementById('adminLoginBackdrop');
    this.loginModal = document.getElementById('adminLoginModal');
    this.loginForm = document.getElementById('adminLoginForm');
    this.usernameInput = document.getElementById('adminUsername');
    this.passwordInput = document.getElementById('adminPassword');
    this.loginErrorAlert = document.getElementById('adminLoginError');
    this.loginCancelBtn = document.getElementById('adminLoginCancel');
    this.loginCloseBtn = document.getElementById('adminLoginClose');

    // Dashboard Elements
    this.dashboardOverlay = document.getElementById('adminDashboardOverlay');
    this.dashboardLogoutBtn = document.getElementById('adminDashboardLogout');
    this.reviewForm = document.getElementById('adminReviewForm');
    this.reviewListContainer = document.getElementById('adminReviewsTable');
    this.resetDemoReviewsBtn = document.getElementById('btnResetDemoReviews');

    // Photo Upload Elements
    this.photoInput = document.getElementById('adminCustomerPhoto');
    this.photoPreviewImg = document.getElementById('adminPhotoPreview');
    this.clearPhotoBtn = document.getElementById('adminClearPhoto');

    // Confirm Dialog Elements
    this.confirmBackdrop = document.getElementById('confirmDialogBackdrop');
    this.confirmOkBtn = document.getElementById('confirmDialogOk');
    this.confirmCancelBtn = document.getElementById('confirmDialogCancel');

    // Stats
    this.statTotalReviews = document.getElementById('adminStatTotalReviews');
    this.statAvgRating = document.getElementById('adminStatAvgRating');
    this.statInquiries = document.getElementById('adminStatInquiries');

    // Tabs
    this.tabButtons = document.querySelectorAll('.admin-tab-btn');
    this.tabContents = document.querySelectorAll('.admin-tab-content');
    this.inquiriesTableBody = document.getElementById('adminInquiriesTableBody');

    this.init();
  }

  init() {
    this.bindLoginTriggers();
    this.bindModalDismissals();
    this.bindLoginForm();
    this.bindPhotoUpload();
    this.bindReviewForm();
    this.bindConfirmDialog();
    this.bindTabs();

    if (this.resetDemoReviewsBtn) {
      this.resetDemoReviewsBtn.addEventListener('click', () => this.handleResetDemoReviews());
    }

    if (this.dashboardLogoutBtn) {
      this.dashboardLogoutBtn.addEventListener('click', () => this.logout());
    }
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
    
    // Auto-focus username
    setTimeout(() => {
      if (this.usernameInput) this.usernameInput.focus();
    }, 100);
  }

  closeLoginModal() {
    this.loginBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  bindModalDismissals() {
    // 1. Close button (X)
    if (this.loginCloseBtn) {
      this.loginCloseBtn.addEventListener('click', () => this.closeLoginModal());
    }

    // 2. Cancel button
    if (this.loginCancelBtn) {
      this.loginCancelBtn.addEventListener('click', () => this.closeLoginModal());
    }

    // 3. Click outside on backdrop
    if (this.loginBackdrop) {
      this.loginBackdrop.addEventListener('click', (e) => {
        if (e.target === this.loginBackdrop) {
          this.closeLoginModal();
        }
      });
    }

    // 4. Press ESC key
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
     3. Dashboard Management
     ------------------------------------------------------------- */
  openDashboard() {
    this.dashboardOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.renderAdminReviews();
    this.updateStats();
    this.renderInquiries();
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
  }

  /* -------------------------------------------------------------
     4. Base64 Photo Upload & Live Preview
     ------------------------------------------------------------- */
  bindPhotoUpload() {
    if (!this.photoInput) return;

    this.photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        alert('Please choose an image file (PNG, JPG, WebP).');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('Image file size should be under 2MB for fast loading.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        this.currentBase64Photo = loadEvent.target.result;
        this.photoPreviewImg.src = this.currentBase64Photo;
        this.photoPreviewImg.style.display = 'block';
        if (this.clearPhotoBtn) this.clearPhotoBtn.classList.add('visible');
      };
      reader.readAsDataURL(file);
    });

    if (this.clearPhotoBtn) {
      this.clearPhotoBtn.addEventListener('click', () => {
        this.resetPhotoUpload();
      });
    }
  }

  resetPhotoUpload() {
    this.currentBase64Photo = '';
    if (this.photoInput) this.photoInput.value = '';
    if (this.photoPreviewImg) {
      this.photoPreviewImg.src = '';
      this.photoPreviewImg.style.display = 'none';
    }
    if (this.clearPhotoBtn) this.clearPhotoBtn.classList.remove('visible');
  }

  /* -------------------------------------------------------------
     5. Add Customer Review
     ------------------------------------------------------------- */
  bindReviewForm() {
    if (!this.reviewForm) return;

    // Set today's date as default
    const dateInput = document.getElementById('adminReviewDate');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

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
          avatar: this.currentBase64Photo
        });

        this.showToast('Customer review saved successfully!', 'success');
        this.reviewForm.reset();
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
        this.resetPhotoUpload();

        // Instant synchronization with public website & admin list
        await this.renderAdminReviews();
        await this.updateStats();
        if (window.renderPublicReviews) {
          window.renderPublicReviews();
        }
      } catch (err) {
        alert('Error saving review: ' + err.message);
      }
    });
  }

  /* -------------------------------------------------------------
     6. Render Reviews in Admin Table
     ------------------------------------------------------------- */
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

    this.reviewListContainer.innerHTML = reviews.map(r => {
      const initials = r.name ? r.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'RM';
      const avatarHtml = r.avatar
        ? `<img src="${r.avatar}" alt="${this.escapeHtml(r.name)}">`
        : initials;

      const starSvg = `<svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
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
              <span class="admin-review-date">Date: ${r.date} • ${this.escapeHtml(r.location || 'Lawan')}</span>
            </div>
          </div>
          <button type="button" class="btn-delete-review" data-id="${r.id}" title="Delete Review">
            <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            Delete
          </button>
        </div>
      `;
    }).join('');

    // Attach delete listeners
    this.reviewListContainer.querySelectorAll('.btn-delete-review').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        this.openConfirmDelete(id);
      });
    });
  }

  /* -------------------------------------------------------------
     7. Confirmation Dialog for Delete
     ------------------------------------------------------------- */
  bindConfirmDialog() {
    if (this.confirmCancelBtn) {
      this.confirmCancelBtn.addEventListener('click', () => this.closeConfirmDialog());
    }

    if (this.confirmOkBtn) {
      this.confirmOkBtn.addEventListener('click', async () => {
        if (this.reviewToDeleteId) {
          try {
            await window.ReviewStorageAPI.deleteReview(this.reviewToDeleteId);
            this.showToast('Review deleted successfully.', 'success');
            this.closeConfirmDialog();
            await this.renderAdminReviews();
            await this.updateStats();
            if (window.renderPublicReviews) {
              window.renderPublicReviews();
            }
          } catch (e) {
            alert('Failed to delete review: ' + e.message);
          }
        }
      });
    }

    if (this.confirmBackdrop) {
      this.confirmBackdrop.addEventListener('click', (e) => {
        if (e.target === this.confirmBackdrop) {
          this.closeConfirmDialog();
        }
      });
    }
  }

  openConfirmDelete(id) {
    this.reviewToDeleteId = id;
    if (this.confirmBackdrop) {
      this.confirmBackdrop.classList.add('active');
    }
  }

  closeConfirmDialog() {
    this.reviewToDeleteId = null;
    if (this.confirmBackdrop) {
      this.confirmBackdrop.classList.remove('active');
    }
  }

  async handleResetDemoReviews() {
    if (confirm('Are you sure you want to reset all testimonials back to the 3 original demo reviews for Lawan?')) {
      await window.ReviewStorageAPI.resetDemoReviews();
      this.showToast('Testimonials restored to demo defaults.', 'success');
      await this.renderAdminReviews();
      await this.updateStats();
      if (window.renderPublicReviews) {
        window.renderPublicReviews();
      }
    }
  }

  /* -------------------------------------------------------------
     8. Inquiries Tab & Rendering
     ------------------------------------------------------------- */
  bindTabs() {
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabTarget = btn.getAttribute('data-tab');
        
        this.tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.tabContents.forEach(content => {
          content.style.display = content.id === tabTarget ? 'block' : 'none';
        });

        if (tabTarget === 'tabInquiries') {
          this.renderInquiries();
        }
      });
    });
  }

  async renderInquiries() {
    if (!this.inquiriesTableBody) return;
    const inquiries = await window.ReviewStorageAPI.getAllInquiries();

    if (inquiries.length === 0) {
      this.inquiriesTableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; padding: 2rem; color: #94a3b8;">
            No customer inquiries received yet.
          </td>
        </tr>
      `;
      return;
    }

    this.inquiriesTableBody.innerHTML = inquiries.map(inq => {
      return `
        <tr>
          <td><span class="inquiries-customer-name">${this.escapeHtml(inq.name)}</span></td>
          <td><a href="tel:${inq.phone.replace(/[^0-9+]/g, '')}" class="inquiries-phone-link">${this.escapeHtml(inq.phone)}</a></td>
          <td><span class="admin-review-tag">${this.escapeHtml(inq.service)}</span></td>
          <td>${this.escapeHtml(inq.model)}</td>
          <td style="white-space:nowrap; font-size:0.75rem;">${inq.timestamp}</td>
        </tr>
      `;
    }).join('');
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
      if (toast.parentElement) {
        toast.remove();
      }
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
