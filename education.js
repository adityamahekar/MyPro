// Theme toggle functionality for education page
function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    const themeToggles = document.querySelectorAll('#themeToggle, #educationThemeToggle');
    
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
    const themeToggles = document.querySelectorAll('#themeToggle, #educationThemeToggle');
    
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

// Add animation to timeline items when they come into view
function initializeAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.animation = 'slideInRight 0.6s ease forwards';
                } else if (entry.target.classList.contains('stat-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        observer.observe(item);
    });
    
    statCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// Add hover effects dynamically
function initializeHoverEffects() {
    const educationCards = document.querySelectorAll('.timeline-content');
    const statCards = document.querySelectorAll('.stat-card');
    
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Handle image loading errors
function handleImageErrors() {
    const images = document.querySelectorAll('.education-image img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace broken image with a placeholder icon
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM0MzYxZWUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxwYXRoIGQ9Ik00MCAyMEM0My4zMTM3IDIwIDQ2IDIyLjY4NjMgNDYgMjZDNDYgMjkuMzEzNyA0My4zMTM3IDMyIDQwIDMyQzM2LjY4NjMgMzIgMzQgMjkuMzEzNyAzNCAyNkMzNCAyMi42ODYzIDM2LjY4NjMgMjAgNDAgMjBaIiBmaWxsPSIjNDM2MWVlIi8+CjxwYXRoIGQ9Ik00OCA1MkM0OCA1NC4yMDkxIDQ2LjIwOTEgNTYgNDQgNTZIMzZDMzMuNzkwOSA1NiAzMiA1NC4yMDkxIDMyIDUyVjQ0QzMyIDQxLjc5MDkgMzMuNzkwOSA0MCAzNiA0MEg0NEM0Ni4yMDkxIDQwIDQ4IDQxLjc5MDkgNDggNDRWNTJaIiBmaWxsPSIjNDM2MWVlIi8+Cjwvc3ZnPgo=';
            this.alt = 'Education Institution';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    
    // Add event listeners to all theme toggle buttons
    const themeToggles = document.querySelectorAll('#themeToggle, #educationThemeToggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
    
    initializeAnimations();
    initializeHoverEffects();
    handleImageErrors();
    
    // Add CSS for animations if not already present
    if (!document.querySelector('#education-animations')) {
        const style = document.createElement('style');
        style.id = 'education-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
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
            
            .timeline-item, .stat-card {
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
    }
});

// Handle responsive behavior
window.addEventListener('resize', function() {
    // Adjust timeline for mobile view
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (window.innerWidth <= 768) {
        timelineItems.forEach(item => {
            item.style.paddingLeft = '70px';
        });
        if (timeline) {
            timeline.style.setProperty('--timeline-left', '30px');
        }
    } else {
        timelineItems.forEach(item => {
            item.style.paddingLeft = '100px';
        });
        if (timeline) {
            timeline.style.setProperty('--timeline-left', '50px');
        }
    }
});