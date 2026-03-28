// ============================================
// API Configuration & Utility Functions
// ============================================

const API_BASE_URL = 'http://localhost:8080';

// ============================================
// Helper Functions
// ============================================

/**
 * Get JWT token from localStorage
 */
function getToken() {
    return localStorage.getItem('jwt_token');
}

/**
 * Set JWT token in localStorage
 */
function setToken(token) {
    localStorage.setItem('jwt_token', token);
}

/**
 * Remove JWT token from localStorage
 */
function removeToken() {
    localStorage.removeItem('jwt_token');
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
    const token = getToken();
    if (!token) return false;
    
    // Optional: Check token expiry if stored
    const expiry = localStorage.getItem('token_expiry');
    if (expiry && Date.now() > parseInt(expiry)) {
        removeToken();
        return false;
    }
    
    return true;
}

/**
 * Get Authorization header
 */
function getAuthHeader() {
    const token = getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

/**
 * Handle API response
 */
async function handleResponse(response) {
    const data = await response.json().catch(() => null);
    
    if (!response.ok) {
        const errorMessage = data?.message || data?.error || `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
    }
    
    return data;
}

/**
 * Show loading spinner
 */
function showLoading() {
    let spinner = document.querySelector('.spinner-overlay');
    if (!spinner) {
        spinner = document.createElement('div');
        spinner.className = 'spinner-overlay';
        spinner.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(spinner);
    }
    spinner.style.display = 'flex';
}

/**
 * Hide loading spinner
 */
function hideLoading() {
    const spinner = document.querySelector('.spinner-overlay');
    if (spinner) {
        spinner.style.display = 'none';
    }
}

// ============================================
// Auth API
// ============================================

/**
 * Login with email and password
 */
async function login(email, password) {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await handleResponse(response);
        
        if (data.token) {
            setToken(data.token);
            // Optionally store expiry
            // localStorage.setItem('token_expiry', Date.now() + 24 * 60 * 60 * 1000);
        }
        
        return data;
    } finally {
        hideLoading();
    }
}

/**
 * Register new user
 */
async function register(fullName, email, password) {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName,
                email,
                password
            })
        });
        
        return await handleResponse(response);
    } finally {
        hideLoading();
    }
}

/**
 * Logout user
 */
function logout() {
    removeToken();
    localStorage.removeItem('token_expiry');
    localStorage.removeItem('user_email');
    window.location.href = 'login.html';
}

// ============================================
// Measurement API
// ============================================

/**
 * Convert measurement
 */
async function convertMeasurement(thisValue, thisUnit, thisMeasurementType, thatUnit) {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/measurements/convert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify({
                thisQuantity: {
                    value: thisValue,
                    unit: thisUnit,
                    measurementType: thisMeasurementType
                },
                targetUnit: thatUnit
            })
        });
        
        return await handleResponse(response);
    } finally {
        hideLoading();
    }
}

/**
 * Compare two measurements
 */
async function compareMeasurements(value1, unit1, measurementType1, value2, unit2, measurementType2) {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/measurements/compare`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify({
                thisQuantity: {
                    value: value1,
                    unit: unit1,
                    measurementType: measurementType1
                },
                thatQuantity: {
                    value: value2,
                    unit: unit2,
                    measurementType: measurementType2
                }
            })
        });
        
        return await handleResponse(response);
    } finally {
        hideLoading();
    }
}

/**
 * Get measurement history
 */
async function getHistory() {
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/api/measurements/history`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            }
        });
        
        return await handleResponse(response);
    } finally {
        hideLoading();
    }
}

// ============================================
// OAuth2
// ============================================

/**
 * Redirect to Google OAuth2 login
 */
function redirectToGoogleOAuth() {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
}

/**
 * Handle OAuth2 callback (called from index.html)
 */
async function handleOAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
        setToken(token);
        window.location.href = 'dashboard.html';
        return true;
    }
    
    return false;
}

// Export for use in other files
window.API = {
    BASE_URL: API_BASE_URL,
    getToken,
    setToken,
    removeToken,
    isAuthenticated,
    getAuthHeader,
    handleResponse,
    showLoading,
    hideLoading,
    login,
    register,
    logout,
    convertMeasurement,
    compareMeasurements,
    getHistory,
    redirectToGoogleOAuth,
    handleOAuthCallback
};