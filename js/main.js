/**
 * ONLINE EXAM TEST SERIES WEBSITE
 * Main JavaScript - Core Functionality
 */

// ===================================
// GLOBAL STATE
// ===================================

const state = {
  theme: localStorage.getItem('theme') || 'light',
  mobileMenuOpen: false
};

// ===================================
// DOM READY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initMobileMenu();
  initActiveNav();
  initSmoothScroll();
  initFormValidation();
  initScrollToTop();
  initNavDropdown();
  initUserAuth();
});

// ===================================
// THEME TOGGLE
// ===================================

function initTheme() {
  // Apply saved theme
  if (state.theme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  
  // Theme toggle button
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    updateThemeIcon(themeToggle);
    
    themeToggle.addEventListener('click', function() {
      toggleTheme();
      updateThemeIcon(this);
    });
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  state.theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', state.theme);
}

function updateThemeIcon(button) {
  const isDark = document.body.classList.contains('dark-mode');
  button.innerHTML = isDark ? '☀️' : '🌙';
  button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

// ===================================
// MOBILE MENU
// ===================================

function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.mobile-menu-close');
  
  if (!menuToggle || !mobileMenu) return;
  
  // Open menu
  menuToggle.addEventListener('click', function() {
    openMobileMenu();
  });
  
  // Close menu
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      closeMobileMenu();
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', function() {
      closeMobileMenu();
    });
  }
  
  // Close on link click
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      closeMobileMenu();
    });
  });
  
  // Close on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && state.mobileMenuOpen) {
      closeMobileMenu();
    }
  });
}

function openMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  
  if (mobileMenu) mobileMenu.classList.add('active');
  if (overlay) overlay.classList.add('active');
  
  document.body.style.overflow = 'hidden';
  state.mobileMenuOpen = true;
}

function closeMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  
  if (mobileMenu) mobileMenu.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  
  document.body.style.overflow = '';
  state.mobileMenuOpen = false;
}

// ===================================
// NAVIGATION DROPDOWN
// ===================================

function initNavDropdown() {
  const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
  
  dropdownItems.forEach(item => {
    const dropdownLink = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');
    
    if (!dropdownLink || !dropdown) return;
    
    // Prevent default link behavior
    dropdownLink.addEventListener('click', function(e) {
      e.preventDefault();
    });
    
    // Toggle dropdown on click (for touch devices)
    dropdownLink.addEventListener('click', function() {
      // Close other dropdowns
      dropdownItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current dropdown
      item.classList.toggle('active');
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-item-dropdown')) {
      dropdownItems.forEach(item => {
        item.classList.remove('active');
      });
    }
  });
  
  // Close dropdown on window resize (mobile menu takes over)
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
      dropdownItems.forEach(item => {
        item.classList.remove('active');
      });
    }
  });
}

// ===================================
// ACTIVE NAVIGATION HIGHLIGHT
// ===================================

function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Desktop nav
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-item-dropdown > .nav-link)');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });
  
  // Desktop dropdown links
  const dropdownLinks = document.querySelectorAll('.nav-dropdown-link');
  dropdownLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.classList.add('active');
      // Also mark parent dropdown as active
      const dropdown = link.closest('.nav-item-dropdown');
      if (dropdown) {
        dropdown.querySelector('.nav-link').classList.add('active');
      }
    }
  });
  
  // Mobile nav
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });
}

// ===================================
// SMOOTH SCROLL
// ===================================

function initSmoothScroll() {
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Ignore # only
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL
        history.pushState(null, null, href);
      }
    });
  });
}

// ===================================
// FORM VALIDATION
// ===================================

function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm(this)) {
        handleFormSubmit(this);
      }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        // Remove error on input
        if (this.classList.contains('error')) {
          this.classList.remove('error');
          const errorMsg = this.parentElement.querySelector('.form-error');
          if (errorMsg) errorMsg.remove();
        }
      });
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('.form-control[required]');
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  const required = field.hasAttribute('required');
  
  // Remove existing error
  field.classList.remove('error', 'success');
  const existingError = field.parentElement.querySelector('.form-error');
  if (existingError) existingError.remove();
  
  // Check if empty and required
  if (required && !value) {
    showFieldError(field, 'This field is required');
    return false;
  }
  
  // Email validation
  if (type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showFieldError(field, 'Please enter a valid email address');
      return false;
    }
  }
  
  // Password validation (min 6 characters)
  if (type === 'password' && value && value.length < 6) {
    showFieldError(field, 'Password must be at least 6 characters');
    return false;
  }
  
  // Confirm password
  if (field.name === 'confirmPassword') {
    const password = field.form.querySelector('[name="password"]');
    if (password && value !== password.value) {
      showFieldError(field, 'Passwords do not match');
      return false;
    }
  }
  
  // Success
  field.classList.add('success');
  return true;
}

function showFieldError(field, message) {
  field.classList.add('error');
  
  const errorDiv = document.createElement('span');
  errorDiv.className = 'form-error';
  errorDiv.textContent = message;
  
  field.parentElement.appendChild(errorDiv);
}

function handleFormSubmit(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  console.log('Form submitted:', data);
  
  // Show success message
  showSuccessMessage(form);
  
  // Reset form
  setTimeout(() => {
    form.reset();
    form.querySelectorAll('.form-control').forEach(input => {
      input.classList.remove('success');
    });
  }, 2000);
}

function showSuccessMessage(form) {
  const successDiv = document.createElement('div');
  successDiv.className = 'alert alert-success';
  successDiv.style.cssText = 'margin-top: 1rem; padding: 1rem; background: #27AE60; color: white; border-radius: 8px; text-align: center;';
  successDiv.textContent = '✓ Form submitted successfully!';
  
  form.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}

// ===================================
// PASSWORD STRENGTH INDICATOR
// ===================================

function initPasswordStrength() {
  const passwordInputs = document.querySelectorAll('input[type="password"][data-strength]');
  
  passwordInputs.forEach(input => {
    const strengthBar = input.parentElement.querySelector('.strength-bar-fill');
    const strengthText = input.parentElement.querySelector('.strength-text');
    
    if (strengthBar) {
      input.addEventListener('input', function() {
        const strength = checkPasswordStrength(this.value);
        updateStrengthIndicator(strengthBar, strengthText, strength);
      });
    }
  });
}

function checkPasswordStrength(password) {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;
  
  if (strength <= 1) return 'weak';
  if (strength <= 3) return 'medium';
  return 'strong';
}

function updateStrengthIndicator(bar, text, strength) {
  bar.className = 'strength-bar-fill ' + strength;
  
  if (text) {
    const messages = {
      weak: 'Weak password',
      medium: 'Medium password',
      strong: 'Strong password'
    };
    text.textContent = messages[strength] || '';
    text.style.color = strength === 'weak' ? '#E74C3C' : strength === 'medium' ? '#F39C12' : '#27AE60';
  }
}

// ===================================
// MODAL MANAGEMENT
// ===================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close on overlay click
    const overlay = modal.querySelector('.modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => closeModal(modalId));
    }
    
    // Close on close button click
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modalId));
    }
    
    // Close on ESC key
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal(modalId);
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ===================================
// ACCORDION
// ===================================

function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const isActive = this.classList.contains('active');
      
      // Close all accordions (optional - remove for multiple open)
      accordionHeaders.forEach(h => {
        h.classList.remove('active');
        const body = h.nextElementSibling;
        if (body) body.style.maxHeight = null;
      });
      
      // Toggle current
      if (!isActive) {
        this.classList.add('active');
        const body = this.nextElementSibling;
        if (body) {
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      }
    });
  });
}

// ===================================
// SCROLL TO TOP
// ===================================

function initScrollToTop() {
  const scrollBtn = document.querySelector('.scroll-to-top');
  
  if (scrollBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });
    
    scrollBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ===================================
// USER AUTHENTICATION
// ===================================

function initUserAuth() {
  // Check if user is logged in
  const userData = getUserData();
  
  // Check if we're on dashboard or coming from dashboard context
  const isDashboardPage = window.location.pathname.includes('dashboard.html');
  const fromDashboard = sessionStorage.getItem('fromDashboard') === 'true' || isDashboardPage;
  
  // Set flag when on dashboard
  if (isDashboardPage) {
    sessionStorage.setItem('fromDashboard', 'true');
  }
  
  if (isDashboardPage || fromDashboard) {
    // Simplified header: Hide navigation, show only theme toggle, user name, and logout
    hideNavigationMenu();
    showSimplifiedHeader(userData);
  } else {
    // Normal header behavior
    if (userData && userData.isLoggedIn) {
      updateHeaderForLoggedInUser(userData);
    } else {
      updateHeaderForGuest();
    }
  }
  
  // Handle logout links - use event delegation for dynamically added elements
  document.addEventListener('click', function(e) {
    if (e.target.matches('.logout-btn') || e.target.closest('.logout-btn')) {
      e.preventDefault();
      handleLogout();
    }
  });
  
  // Handle links from dashboard - set flag when clicking links
  if (isDashboardPage || fromDashboard) {
    const allLinks = document.querySelectorAll('a[href]');
    allLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (!this.href.includes('dashboard.html') && !this.href.includes('#')) {
          sessionStorage.setItem('fromDashboard', 'true');
        }
      });
    });
  }
  
  // Dashboard is accessible without login - no redirect needed
}

function hideNavigationMenu() {
  const headerNav = document.querySelector('.header-nav');
  const mobileNavList = document.querySelector('.mobile-nav-list');
  
  if (headerNav) headerNav.style.display = 'none';
  if (mobileNavList) mobileNavList.style.display = 'none';
}

function showSimplifiedHeader(userData) {
  const headerActions = document.querySelector('.header-actions');
  const mobileNavActions = document.querySelector('.mobile-nav-actions');
  
  // Hide Dashboard, Login, Sign Up buttons
  if (headerActions) {
    const dashboardBtn = headerActions.querySelector('a[href="dashboard.html"]');
    const loginBtn = headerActions.querySelector('a[href="login.html"]');
    const signUpBtn = headerActions.querySelector('a[href="register.html"]');
    
    if (dashboardBtn) dashboardBtn.style.display = 'none';
    if (loginBtn) loginBtn.style.display = 'none';
    if (signUpBtn) signUpBtn.style.display = 'none';
    
    // Check if user info already exists, if not create it
    let userInfoDiv = headerActions.querySelector('.user-info');
    if (!userInfoDiv) {
      userInfoDiv = document.createElement('div');
      userInfoDiv.className = 'user-info';
      userInfoDiv.style.cssText = 'display: flex; align-items: center; gap: 0.75rem;';
      
      // Insert after theme toggle
      const themeToggle = headerActions.querySelector('.theme-toggle');
      if (themeToggle) {
        themeToggle.insertAdjacentElement('afterend', userInfoDiv);
      } else {
        headerActions.insertBefore(userInfoDiv, headerActions.firstChild);
      }
    }
    
    // Update user info content
    const userName = (userData && userData.isLoggedIn) ? (userData.name || userData.email || 'User') : 'Guest';
    userInfoDiv.innerHTML = `
      <span style="color: var(--color-text-secondary);">👤 ${userName}</span>
      <a href="#" class="logout-btn btn btn-secondary btn-sm">Logout</a>
    `;
  }
  
  // Mobile menu
  if (mobileNavActions) {
    // Hide Dashboard, Login, Sign Up buttons
    const dashboardBtnMobile = mobileNavActions.querySelector('a[href="dashboard.html"]');
    const loginBtnMobile = mobileNavActions.querySelector('a[href="login.html"]');
    const signUpBtnMobile = mobileNavActions.querySelector('a[href="register.html"]');
    
    if (dashboardBtnMobile) dashboardBtnMobile.style.display = 'none';
    if (loginBtnMobile) loginBtnMobile.style.display = 'none';
    if (signUpBtnMobile) signUpBtnMobile.style.display = 'none';
    
    // Check if user info already exists in mobile menu, if not create it
    let userInfoDivMobile = mobileNavActions.querySelector('.user-info-mobile');
    if (!userInfoDivMobile) {
      userInfoDivMobile = document.createElement('div');
      userInfoDivMobile.className = 'user-info-mobile';
      userInfoDivMobile.style.cssText = 'margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border);';
      mobileNavActions.appendChild(userInfoDivMobile);
    }
    
    // Update mobile user info content
    const userName = (userData && userData.isLoggedIn) ? (userData.name || userData.email || 'User') : 'Guest';
    userInfoDivMobile.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; padding: 0.75rem; background: var(--color-bg-secondary); border-radius: 8px;">
        <span style="color: var(--color-text-primary); font-weight: 600;">👤 ${userName}</span>
      </div>
      <a href="#" class="logout-btn btn btn-secondary btn-block">Logout</a>
    `;
  }
}

function getUserData() {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

function setUserData(userData) {
  localStorage.setItem('userData', JSON.stringify({
    ...userData,
    isLoggedIn: true,
    loginTime: new Date().toISOString()
  }));
}

function clearUserData() {
  localStorage.removeItem('userData');
}

function handleLogout() {
  clearUserData();
  sessionStorage.removeItem('fromDashboard'); // Clear dashboard context flag
  // Redirect to home page
  window.location.href = 'index.html';
}

function updateHeaderForLoggedInUser(userData) {
  const userName = userData.name || userData.email || 'User';
  const headerActions = document.querySelector('.header-actions');
  const mobileNavActions = document.querySelector('.mobile-nav-actions');
  
  if (headerActions) {
    // Hide Dashboard, Login, Sign Up buttons
    const dashboardBtn = headerActions.querySelector('a[href="dashboard.html"]');
    const loginBtn = headerActions.querySelector('a[href="login.html"]');
    const signUpBtn = headerActions.querySelector('a[href="register.html"]');
    
    if (dashboardBtn) dashboardBtn.style.display = 'none';
    if (loginBtn) loginBtn.style.display = 'none';
    if (signUpBtn) signUpBtn.style.display = 'none';
    
    // Check if user info already exists, if not create it
    let userInfoDiv = headerActions.querySelector('.user-info');
    if (!userInfoDiv) {
      userInfoDiv = document.createElement('div');
      userInfoDiv.className = 'user-info';
      userInfoDiv.style.cssText = 'display: flex; align-items: center; gap: 0.75rem;';
      
      // Insert after theme toggle
      const themeToggle = headerActions.querySelector('.theme-toggle');
      if (themeToggle) {
        themeToggle.insertAdjacentElement('afterend', userInfoDiv);
      } else {
        headerActions.insertBefore(userInfoDiv, headerActions.firstChild);
      }
    }
    
    // Update user info content
    userInfoDiv.innerHTML = `
      <span style="color: var(--color-text-secondary);">👤 ${userName}</span>
      <a href="#" class="logout-btn btn btn-secondary btn-sm">Logout</a>
    `;
    
    // Attach logout event
    const logoutBtn = userInfoDiv.querySelector('.logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleLogout();
      });
    }
  }
  
  if (mobileNavActions) {
    // Hide Dashboard, Login, Sign Up buttons
    const dashboardBtnMobile = mobileNavActions.querySelector('a[href="dashboard.html"]');
    const loginBtnMobile = mobileNavActions.querySelector('a[href="login.html"]');
    const signUpBtnMobile = mobileNavActions.querySelector('a[href="register.html"]');
    
    if (dashboardBtnMobile) dashboardBtnMobile.style.display = 'none';
    if (loginBtnMobile) loginBtnMobile.style.display = 'none';
    if (signUpBtnMobile) signUpBtnMobile.style.display = 'none';
    
    // Check if user info already exists in mobile menu, if not create it
    let userInfoDivMobile = mobileNavActions.querySelector('.user-info-mobile');
    if (!userInfoDivMobile) {
      userInfoDivMobile = document.createElement('div');
      userInfoDivMobile.className = 'user-info-mobile';
      userInfoDivMobile.style.cssText = 'margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border);';
      mobileNavActions.appendChild(userInfoDivMobile);
    }
    
    // Update mobile user info content
    userInfoDivMobile.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; padding: 0.75rem; background: var(--color-bg-secondary); border-radius: 8px;">
        <span style="color: var(--color-text-primary); font-weight: 600;">👤 ${userName}</span>
      </div>
      <a href="#" class="logout-btn btn btn-secondary btn-block">Logout</a>
    `;
    
    // Attach logout event
    const logoutBtnMobile = userInfoDivMobile.querySelector('.logout-btn');
    if (logoutBtnMobile) {
      logoutBtnMobile.addEventListener('click', function(e) {
        e.preventDefault();
        handleLogout();
      });
    }
  }
}

function updateHeaderForGuest() {
  const headerActions = document.querySelector('.header-actions');
  const mobileNavActions = document.querySelector('.mobile-nav-actions');
  
  if (headerActions) {
    // Show Dashboard, Login, Sign Up buttons
    const dashboardBtn = headerActions.querySelector('a[href="dashboard.html"]');
    const loginBtn = headerActions.querySelector('a[href="login.html"]');
    const signUpBtn = headerActions.querySelector('a[href="register.html"]');
    
    if (dashboardBtn) dashboardBtn.style.display = '';
    if (loginBtn) loginBtn.style.display = '';
    if (signUpBtn) signUpBtn.style.display = '';
    
    // Remove user info if exists
    const userInfo = headerActions.querySelector('.user-info');
    if (userInfo) userInfo.remove();
  }
  
  if (mobileNavActions) {
    // Show Dashboard, Login, Sign Up buttons
    const dashboardBtnMobile = mobileNavActions.querySelector('a[href="dashboard.html"]');
    const loginBtnMobile = mobileNavActions.querySelector('a[href="login.html"]');
    const signUpBtnMobile = mobileNavActions.querySelector('a[href="register.html"]');
    
    if (dashboardBtnMobile) dashboardBtnMobile.style.display = '';
    if (loginBtnMobile) loginBtnMobile.style.display = '';
    if (signUpBtnMobile) signUpBtnMobile.style.display = '';
    
    // Remove user info if exists
    const userInfoMobile = mobileNavActions.querySelector('.user-info-mobile');
    if (userInfoMobile) userInfoMobile.remove();
  }
}

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
  window.userAuth = {
    getUserData,
    setUserData,
    clearUserData,
    handleLogout,
    updateHeaderForLoggedInUser,
    updateHeaderForGuest
  };
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
  window.appUtils = {
    openModal,
    closeModal,
    debounce
  };
}
