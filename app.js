// ==========================================
// NAVIGATION & SCROLL HANDLING
// ==========================================

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Active navigation highlighting on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// MODAL HANDLING
// ==========================================

const modal = document.getElementById('modal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const quizForm = document.getElementById('quizForm');

/**
 * Open modal with specified form type
 * @param {string} type - 'login', 'register', or 'quiz'
 * TODO: Add authentication state management
 * TODO: Connect to backend authentication API
 */
function openModal(type) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Hide all forms
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    quizForm.style.display = 'none';
    
    // Show requested form
    if (type === 'login') {
        loginForm.style.display = 'block';
    } else if (type === 'register') {
        registerForm.style.display = 'block';
    } else if (type === 'quiz') {
        quizForm.style.display = 'block';
    }
}

/**
 * Close modal and restore scroll
 */
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ==========================================
// FORM HANDLING
// ==========================================

/**
 * Handle login form submission
 * @param {Event} event - Form submit event
 * TODO: Implement JWT token authentication
 * TODO: Store user session and redirect to dashboard
 * TODO: Add error handling for invalid credentials
 */
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // TODO: Replace with actual API call
    // Example: POST /api/auth/login with { email, password }
    console.log('Login attempt:', { email, password });
    
    // Simulate successful login
    showNotification('Login successful! Welcome back.', 'success');
    closeModal();
    
    // TODO: Store auth token in memory (not localStorage due to sandbox restrictions)
    // TODO: Redirect to dashboard or update UI to show logged-in state
}

/**
 * Handle registration form submission
 * @param {Event} event - Form submit event
 * TODO: Connect to user registration API endpoint
 * TODO: Add email verification flow
 * TODO: Validate password strength
 */
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const year = document.getElementById('registerYear').value;
    const password = document.getElementById('registerPassword').value;
    
    // TODO: Replace with actual API call
    // Example: POST /api/auth/register with { name, email, year, password }
    console.log('Registration attempt:', { name, email, year, password });
    
    // Simulate successful registration
    showNotification('Registration successful! Please check your email.', 'success');
    closeModal();
    
    // TODO: Send verification email
    // TODO: Auto-login or redirect to login form
}

/**
 * Handle skill quiz submission
 * @param {Event} event - Form submit event
 * TODO: Process quiz responses and generate personalized roadmap
 * TODO: Store quiz results in user profile
 * TODO: Redirect to recommended courses based on results
 */
function handleQuiz(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const quizData = Object.fromEntries(formData.entries());
    
    // TODO: Replace with actual API call
    // Example: POST /api/quiz/submit with quiz responses
    console.log('Quiz submission:', quizData);
    
    // Simulate quiz processing
    showNotification('Quiz completed! Generating your personalized roadmap...', 'success');
    closeModal();
    
    // TODO: Generate and display personalized learning path
    // TODO: Redirect to courses section with filtered results
    setTimeout(() => {
        scrollToSection('courses');
    }, 500);
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

/**
 * Show notification toast
 * @param {string} message - Notification message
 * @param {string} type - 'success', 'error', 'info'
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '90px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? '#4ade80' : type === 'error' ? '#ef4444' : '#6478e6',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '3000',
        animation: 'slideInRight 0.3s ease',
        fontWeight: '600'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations to styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// INTERACTIVE ELEMENTS
// ==========================================

// Add click handlers to all enroll buttons
// TODO: Connect to course enrollment API
document.querySelectorAll('.btn-enroll').forEach(button => {
    button.addEventListener('click', (e) => {
        const courseCard = e.target.closest('.course-card');
        const courseTitle = courseCard.querySelector('.course-title').textContent;
        
        // TODO: Check if user is logged in
        // TODO: POST to /api/courses/enroll with courseId
        console.log('Enrolling in course:', courseTitle);
        
        showNotification(`Enrolling in "${courseTitle}"...`, 'success');
        
        // TODO: Update user's enrolled courses
        // TODO: Redirect to course dashboard
    });
});

// Add click handlers to mentor profile buttons
// TODO: Connect to mentor profile API
document.querySelectorAll('.btn-view-profile').forEach(button => {
    button.addEventListener('click', (e) => {
        const mentorCard = e.target.closest('.mentor-card');
        const mentorName = mentorCard.querySelector('.mentor-name').textContent;
        
        // TODO: Fetch mentor details from API
        // TODO: GET /api/mentors/{mentorId}
        console.log('Viewing mentor profile:', mentorName);
        
        showNotification(`Loading ${mentorName}'s profile...`, 'info');
        
        // TODO: Show mentor details modal with:
        // - Full bio and expertise
        // - Available time slots
        // - Session booking interface
        // - Reviews and ratings
    });
});

// Add click handlers to community post actions
// TODO: Connect to community API
document.querySelectorAll('.post-action').forEach(button => {
    button.addEventListener('click', (e) => {
        const action = e.target.textContent.includes('replies') ? 'view' : 'like';
        const postCard = e.target.closest('.community-post');
        const postTitle = postCard.querySelector('.post-title').textContent;
        
        // TODO: Implement community interactions
        // TODO: POST to /api/community/posts/{postId}/like
        // TODO: GET /api/community/posts/{postId}/replies
        console.log(`Community action: ${action} on "${postTitle}"`);
        
        if (action === 'like') {
            // Update like count
            const currentCount = parseInt(e.target.textContent.match(/\d+/)[0]);
            e.target.textContent = `👍 ${currentCount + 1} likes`;
        } else {
            showNotification('Loading replies...', 'info');
            // TODO: Show replies modal
        }
    });
});

// ==========================================
// DATA FETCHING PLACEHOLDERS
// ==========================================

/**
 * Fetch user dashboard data
 * TODO: Implement API call to get user's courses, progress, and sessions
 */
function fetchDashboardData() {
    // TODO: GET /api/dashboard/user
    // Returns: { profile, enrolledCourses, upcomingSessions, progress }
    console.log('Fetching dashboard data...');
}

/**
 * Fetch available courses
 * TODO: Implement API call with filters and pagination
 */
function fetchCourses(filters = {}) {
    // TODO: GET /api/courses?category={category}&level={level}&page={page}
    // Returns: { courses: [], totalPages, currentPage }
    console.log('Fetching courses with filters:', filters);
}

/**
 * Fetch mentor list
 * TODO: Implement API call with search and filters
 */
function fetchMentors(searchTerm = '', expertise = '') {
    // TODO: GET /api/mentors?search={searchTerm}&expertise={expertise}
    // Returns: { mentors: [], totalCount }
    console.log('Fetching mentors:', { searchTerm, expertise });
}

/**
 * Fetch community posts
 * TODO: Implement API call with pagination and category filter
 */
function fetchCommunityPosts(category = 'all', page = 1) {
    // TODO: GET /api/community/posts?category={category}&page={page}
    // Returns: { posts: [], totalPages, currentPage }
    console.log('Fetching community posts:', { category, page });
}

// ==========================================
// INITIALIZATION
// ==========================================

// Initialize page on load
document.addEventListener('DOMContentLoaded', () => {
    console.log('SkillShare Hub initialized');
    
    // TODO: Check if user is logged in (check auth token in memory)
    // TODO: If logged in, fetch and display user data
    // TODO: Initialize real-time community updates (WebSocket connection)
    
    // Add smooth scroll behavior to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Log reminder about backend integration
console.log('%c🚀 SkillShare Hub - Ready for Backend Integration', 'color: #6478e6; font-size: 16px; font-weight: bold;');
console.log('%cNext Steps:', 'color: #ffd700; font-size: 14px; font-weight: bold;');
console.log('1. Connect authentication API for login/register');
console.log('2. Implement course enrollment system');
console.log('3. Set up mentor profile and booking system');
console.log('4. Build community Q&A with real-time updates');
console.log('5. Add payment integration for paid sessions');
console.log('6. Implement progress tracking and analytics');