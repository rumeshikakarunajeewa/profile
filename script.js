// Rumeshika Karunajeewa Portfolio - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initSmoothScroll();
    initTypingAnimation();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let scrolled = false;

    window.addEventListener('scroll', function() {
        const isScrolled = window.scrollY > 50;
        
        if (isScrolled !== scrolled) {
            scrolled = isScrolled;
            if (scrolled) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isOpen = false;

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        isOpen = !isOpen;
        
        if (isOpen) {
            mobileMenu.classList.add('active');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            mobileMenu.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking links
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            isOpen = false;
            mobileMenu.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            if (isOpen) {
                isOpen = false;
                mobileMenu.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in-up elements
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                // Animate the skill bar
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                    progressBar.classList.add('animate');
                }, 200);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showToast('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                showToast('Message Sent!', 'success', 'Thank you for your message. I\'ll get back to you soon!');
                form.reset();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Toast notification system
function showToast(title, type = 'success', description = '') {
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('.toast-icon i');
    const toastTitle = toast.querySelector('.toast-title');
    const toastDescription = toast.querySelector('.toast-description');
    
    // Update content
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    // Update icon based on type
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle';
        toastIcon.style.color = '#22c55e';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toastIcon.style.color = '#ef4444';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing animation for hero text (optional enhancement)
function initTypingAnimation() {
    const typedElement = document.querySelector('.hero-subtitle');
    if (!typedElement) return;

    const text = 'Full-Stack Developer & AI Research Enthusiast';
    const originalText = typedElement.textContent;
    
    // Only run typing animation on first visit
    if (sessionStorage.getItem('heroAnimationPlayed')) {
        return;
    }

    typedElement.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typedElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        } else {
            sessionStorage.setItem('heroAnimationPlayed', 'true');
        }
    }

    // Start typing animation after hero loads
    setTimeout(() => {
        typeWriter();
    }, 1000);
}

// Particle effect for hero background (optional enhancement)
function initParticleEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('.hero-section');
    
    if (!heroSection) return;

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    heroSection.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 3 + 1;
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = '#8b5cf6';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
}

// Initialize advanced features after DOM is fully loaded
window.addEventListener('load', function() {
    // Uncomment to enable particle effect
    // initParticleEffect();
});

// Utility functions
const utils = {
    // Throttle function for performance optimization
    throttle: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Debounce function
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Performance optimized scroll handler
const optimizedScroll = utils.throttle(function() {
    // Any scroll-based animations or updates can go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);

// Handle viewport resize
const optimizedResize = utils.debounce(function() {
    // Handle responsive updates here
}, 250);

window.addEventListener('resize', optimizedResize);

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'profile.svg',
        'project1.svg',
        'project2.svg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize image preloading
preloadImages();

// Add loading state management
function showLoadingState(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoadingState(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    }
});

// Add focus management for accessibility
function initAccessibility() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black p-2 rounded';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main landmark
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.setAttribute('id', 'main');
        heroSection.setAttribute('role', 'main');
    }

    // Enhance form labels
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (label && !input.getAttribute('aria-label')) {
            input.setAttribute('aria-label', label.textContent);
        }
    });
}

// Initialize accessibility features
initAccessibility();

// Console welcome message
console.log(`
🚀 Rumeshika Karunajeewa Portfolio
   Built with vanilla HTML, CSS & JavaScript
   
   Feel free to explore the code!
   GitHub: https://github.com/rumeshikakarunajeewa
`);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        utils,
        initNavbar,
        initMobileMenu,
        initScrollAnimations,
        initSkillBars,
        initContactForm,
        showToast
    };
}