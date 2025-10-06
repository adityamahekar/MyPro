// Theme toggle functionality for activities page
function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    const themeToggles = document.querySelectorAll('#themeToggle, #activitiesThemeToggle');
    
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
    const themeToggles = document.querySelectorAll('#themeToggle, #activitiesThemeToggle');
    
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

// Add animation to activity items when they come into view
function initializeAnimations() {
    const activityItems = document.querySelectorAll('.activity-item');
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('activity-item')) {
                    entry.target.style.animation = 'slideInLeft 0.6s ease forwards';
                } else if (entry.target.classList.contains('stat-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    activityItems.forEach(item => {
        item.style.opacity = '0';
        observer.observe(item);
    });
    
    statCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// Handle image loading errors
function handleImageErrors() {
    const images = document.querySelectorAll('.gallery-scroll img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace broken image with a placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjBmMGYwIi8+CjxwYXRoIGQ9Ik0xMjAgODBDMTIwIDc2LjY4NjMgMTIyLjY4NiA3NCAxMjYgNzRIMTc0QzE3Ny4zMTQgNzQgMTgwIDc2LjY4NjMgMTgwIDgwVjE0MEMxODAgMTQzLjMxNCAxNzcuMzE0IDE0NiAxNzQgMTQ2SDEyNkMxMjIuNjg2IDE0NiAxMjAgMTQzLjMxNCAxMjAgMTQwVjgwWiIgZmlsbD0iIzQzNjFlZSIgZmlsbC1vcGFjaXR5PSIwLjIiLz4KPHBhdGggZD0iTTEzNSA5MEMxMzUgODguMzQzMSAxMzYuMzQzIDg3IDEzOCA4N0gxNjJDMTYzLjY1NyA4NyAxNjUgODguMzQzMSAxNjUgOTBDMTY1IDkxLjY1NjkgMTYzLjY1NyA5MyAxNjIgOTNIMTM4QzEzNi4zNDMgOTMgMTM1IDkxLjY1NjkgMTM1IDkwWiIgZmlsbD0iIzQzNjFlZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz4KPHBhdGggZD0iTTEzNSAxMTBDMTM1IDEwOC4zNDMgMTM2LjM0MyAxMDcgMTM4IDEwN0gxNjJDMTYzLjY1NyAxMDcgMTY1IDEwOC4zNDMgMTY1IDExMEMxNjUgMTExLjY1NyAxNjMuNjU3IDExMyAxNjIgMTEzSDEzOEMxMzYuMzQzIDExMyAxMzUgMTExLjY1NyAxMzUgMTEwWiIgZmlsbD0iIzQzNjFlZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz4KPHBhdGggZD0iTTEzNSAxMzBDMTM1IDEyOC4zNDMgMTM2LjM0MyAxMjcgMTM4IDEyN0gxNjJDMTYzLjY1NyAxMjcgMTY1IDEyOC4zNDMgMTY1IDEzMEMxNjUgMTMxLjY1NyAxNjMuNjU3IDEzMyAxNjIgMTMzSDEzOEMxMzYuMzQzIDEzMyAxMzUgMTMxLjY1NyAxMzUgMTMwWiIgZmlsbD0iIzQzNjFlZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz4KPC9zdmc+';
            this.alt = 'Activity Image';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    
    // Add event listeners to all theme toggle buttons
    const themeToggles = document.querySelectorAll('#themeToggle, #activitiesThemeToggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
    
    initializeAnimations();
    handleImageErrors();
    
    // Add CSS for animations if not already present
    if (!document.querySelector('#activities-animations')) {
        const style = document.createElement('style');
        style.id = 'activities-animations';
        style.textContent = `
            @keyframes slideInLeft {
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
            
            .activity-item, .stat-card {
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
    }
});

// Handle responsive behavior
window.addEventListener('resize', function() {
    // Adjust gallery scroll for mobile view
    const galleryScrolls = document.querySelectorAll('.gallery-scroll');
    
    if (window.innerWidth <= 480) {
        galleryScrolls.forEach(gallery => {
            const images = gallery.querySelectorAll('img');
            images.forEach(img => {
                img.style.width = '250px';
                img.style.height = '150px';
            });
        });
    } else {
        galleryScrolls.forEach(gallery => {
            const images = gallery.querySelectorAll('img');
            images.forEach(img => {
                img.style.width = '300px';
                img.style.height = '200px';
            });
        });
    }
});