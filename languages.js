// Theme toggle functionality for languages page
function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    const themeToggles = document.querySelectorAll('#themeToggle, #languagesThemeToggle');
    
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
    const themeToggles = document.querySelectorAll('#themeToggle, #languagesThemeToggle');
    
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

// Add animation to language cards when they come into view
function initializeAnimations() {
    const languageCards = document.querySelectorAll('.language-card');
    const statItems = document.querySelectorAll('.stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('language-card')) {
                    entry.target.style.animation = 'fadeInScale 0.6s ease forwards';
                } else if (entry.target.classList.contains('stat-item')) {
                    entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    languageCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    statItems.forEach(item => {
        item.style.opacity = '0';
        observer.observe(item);
    });
}

// Add progress bar animation on hover
function initializeProgressAnimations() {
    const progressBars = document.querySelectorAll('.level-progress');
    
    progressBars.forEach(bar => {
        const parentCard = bar.closest('.language-card');
        parentCard.addEventListener('mouseenter', function() {
            bar.style.animation = 'pulse 1s ease-in-out';
        });
        
        parentCard.addEventListener('mouseleave', function() {
            bar.style.animation = 'none';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    
    // Add event listeners to all theme toggle buttons
    const themeToggles = document.querySelectorAll('#themeToggle, #languagesThemeToggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
    
    initializeAnimations();
    initializeProgressAnimations();
    
    // Add CSS for animations if not already present
    if (!document.querySelector('#languages-animations')) {
        const style = document.createElement('style');
        style.id = 'languages-animations';
        style.textContent = `
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes pulse {
                0% { transform: scaleX(1); }
                50% { transform: scaleX(1.05); }
                100% { transform: scaleX(1); }
            }
            
            .language-card, .stat-item {
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
    }
});

// Handle responsive behavior
window.addEventListener('resize', function() {
    // Adjust grid layout for mobile view
    const languagesGrid = document.querySelector('.languages-grid');
    const statsContainer = document.querySelector('.stats-container');
    
    if (window.innerWidth <= 768) {
        if (languagesGrid) {
            languagesGrid.style.gridTemplateColumns = '1fr';
        }
        if (statsContainer) {
            statsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        }
    } else {
        if (languagesGrid) {
            languagesGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
        }
        if (statsContainer) {
            statsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
        }
    }
    
    if (window.innerWidth <= 480) {
        if (statsContainer) {
            statsContainer.style.gridTemplateColumns = '1fr';
        }
    }
});