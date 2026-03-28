// ============================================
// Toast Notification System
// ============================================

/**
 * Create toast container if not exists
 */
function getToastContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - 'success', 'error', or 'warning'
 * @param {number} duration - Duration in milliseconds
 */
function showToast(message, type = 'success', duration = 4000) {
    const container = getToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconSvg = type === 'success' 
        ? '<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
        : type === 'error'
        ? '<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
        : '<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>';
    
    toast.innerHTML = `
        ${iconSvg}
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Show success toast
 */
function showSuccess(message) {
    showToast(message, 'success');
}

/**
 * Show error toast
 */
function showError(message) {
    showToast(message, 'error', 6000);
}

/**
 * Show warning toast
 */
function showWarning(message) {
    showToast(message, 'warning', 5000);
}

// ============================================
// Protected Route Handler
// ============================================

/**
 * Check if user is authenticated, redirect to login if not
 * Note: Should be called AFTER processing OAuth tokens from URL
 */
function requireAuth() {
    if (!API.isAuthenticated()) {
        // Check if there's an OAuth token in the current URL that hasn't been processed yet
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('oauth_token')) {
            // Token is in URL but not yet processed - don't redirect
            return true;
        }
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

/**
 * Redirect to dashboard if already authenticated
 */
function redirectIfAuth() {
    if (API.isAuthenticated()) {
        window.location.href = 'dashboard.html';
        return true;
    }
    return false;
}

// ============================================
// Form Validation
// ============================================

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength (minimum 6 characters)
 */
function isValidPassword(password) {
    return password && password.length >= 6;
}

/**
 * Validate required field
 */
function isRequired(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
}

// ============================================
// Date Formatting
// ============================================

/**
 * Format date for display
 */
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Format date for table display
 */
function formatTableDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Export for use in other files
window.Utils = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    requireAuth,
    redirectIfAuth,
    isValidEmail,
    isValidPassword,
    isRequired,
    formatDate,
    formatTableDate
};