// Theme toggle functionality for connect page
function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    const themeToggles = document.querySelectorAll('#themeToggle, #connectThemeToggle');
    
    if (isDarkMode) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        themeToggles.forEach(toggle => {
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
        });
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        themeToggles.forEach(toggle => {
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        });
    }
}

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeToggles = document.querySelectorAll('#themeToggle, #connectThemeToggle');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeToggles.forEach(toggle => {
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        });
    } else {
        document.body.classList.remove('dark-mode');
        themeToggles.forEach(toggle => {
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
        });
    }
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Client-side validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Create form data
            const formData = new FormData(contactForm);
            
            // Send form data using FormSubmit.co
            fetch('https://formsubmit.co/ajax/mahekaraditya468@gmail.com', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === 'true') {
                    // Success message
                    alert('Message sent successfully! I\'ll get back to you soon.');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again or contact me directly at mahekaraditya468@gmail.com');
            })
            .finally(() => {
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            });
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Add animation to contact items when they come into view
function initializeAnimations() {
    const contactItems = document.querySelectorAll('.contact-info .contact-item');
    const availabilityItems = document.querySelectorAll('.availability-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    contactItems.forEach(item => {
        item.style.opacity = '0';
        observer.observe(item);
    });
    
    availabilityItems.forEach(item => {
        item.style.opacity = '0';
        observer.observe(item);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    
    // Add event listeners to all theme toggle buttons
    const themeToggles = document.querySelectorAll('#themeToggle, #connectThemeToggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
    
    initializeContactForm();
    initializeAnimations();
    
    // Add CSS for animations if not already present
    if (!document.querySelector('#connect-animations')) {
        const style = document.createElement('style');
        style.id = 'connect-animations';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .contact-info .contact-item,
            .availability-item {
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
    }
});

// Handle responsive behavior
window.addEventListener('resize', function() {
    // Any responsive adjustments can be added here
    const contactInfo = document.querySelector('.contact-info');
    
    if (window.innerWidth <= 768) {
        if (contactInfo) {
            contactInfo.style.gap = '1rem';
        }
    } else {
        if (contactInfo) {
            contactInfo.style.gap = '2rem';
        }
    }
});