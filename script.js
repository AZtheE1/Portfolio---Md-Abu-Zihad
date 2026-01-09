// ========== DOM ELEMENTS ==========
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const currentYearSpan = document.getElementById('current-year');

// ========== UTILITY FUNCTIONS ==========
/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
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

/**
 * Check if element is in viewport
 * @param {Element} element - DOM element to check
 * @returns {boolean} - True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// ========== NAVIGATION FUNCTIONS ==========
/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinksContainer.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? '' : 'hidden';
}

/**
 * Close mobile menu when clicking a link
 */
function closeMobileMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinksContainer.classList.remove('active');
    document.body.style.overflow = '';
}

// ========== ANIMATION FUNCTIONS ==========
/**
 * Animate elements when they come into view
 */
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-card');
    
    animatedElements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('animated');
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            // Trigger animation
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}

// ========== INITIALIZATION FUNCTIONS ==========
/**
 * Set current year in footer
 */
function setCurrentYear() {
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Close mobile menu if open
                closeMobileMenu();
                
                // Calculate header offset
                const headerHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                if (href !== '#home') {
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

/**
 * Initialize event listeners
 */
function initEventListeners() {
    // Window scroll events
    window.addEventListener('scroll', debounce(() => {
        updateActiveNavLink();
        animateOnScroll();
    }, 100));
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinksContainer.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            navLinksContainer.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250));
}

/**
 * Initialize the application
 */
function init() {
    setCurrentYear();
    initSmoothScrolling();
    initEventListeners();
    updateActiveNavLink();
    animateOnScroll();
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    console.log('Portfolio initialized successfully 🚀');
}

// ========== START APPLICATION ==========
// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========== EXPOSE FUNCTIONS FOR DEBUGGING ==========
// Note: Remove this in production
window.portfolio = {
    updateActiveNavLink,
    animateOnScroll,
    toggleMobileMenu,
    closeMobileMenu
};