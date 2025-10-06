// Theme toggle functionality for certifications page
function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    const themeToggles = document.querySelectorAll('#themeToggle, #certificationsThemeToggle');
    
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
    const themeToggles = document.querySelectorAll('#themeToggle, #certificationsThemeToggle');
    
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

// Add animation to certification cards when they come into view
function initializeAnimations() {
    const certificationCards = document.querySelectorAll('.certification-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    certificationCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// Handle image loading errors
function handleImageErrors() {
    const images = document.querySelectorAll('.certification-image img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace broken image with a placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDQwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjZjBmMGYwIi8+CjxwYXRoIGQ9Ik0xNjAgMTIwQzE2MCAxMTYuNjg2IDE2Mi42ODYgMTE0IDE2NiAxMTRIMjM0QzIzNy4zMTQgMTE0IDI0MCAxMTYuNjg2IDI0MCAxMjBWMjAwQzI0MCAyMDMuMzE0IDIzNy4zMTQgMjA2IDIzNCAyMDZIMTY2QzE2Mi42ODYgMjA2IDE2MCAyMDMuMzE0IDE2MCAyMDBWMTIwWiIgZmlsbD0iIzQzNjFlZSIgZmlsbC1vcGFjaXR5PSIwLjIiLz4KPHBhdGggZD0iTTE4MCAxNDBDMTgwIDEzOC4zNDMgMTgxLjM0MyAxMzcgMTgzIDEzN0gyMTdDMjE4LjY1NyAxMzcgMjIwIDEzOC4zNDMgMjIwIDE0MEMyMjAgMTQxLjY1NyAyMTguNjU3IDE0MyAyMTcgMTQzSDE4M0MxODEuMzQzIDE0MyAxODAgMTQxLjY1NyAxODAgMTQwWiIgZmlsbD0iIzQzNjFlZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz4KPHBhdGggZD0iTTE4MCAxNjBDMTgwIDE1OC4zNDMgMTgxLjM0MyAxNTcgMTgzIDE1N0gyMTdDMjE4LjY1NyAxNTcgMjIwIDE1OC4zNDMgMjIwIDE2MEMyMjAgMTYxLjY1NyAyMTguNjU3IDE2MyAyMTcgMTYzSDE4M0MxODEuMzQzIDE2MyAxODAgMTYxLjY1NyAxODAgMTYwWiIgZmlsbD0iIzQzNjFlZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz4KPHBhdGggZD0iTTE4MCAxODBDMTgwIDE3OC4zNDMgMTgxLjM0MyAxNzcgMTgzIDE3N0gyMTdDMjE4LjY1NyAxNzcgMjIwIDE3OC4zNDMgMjIwIDE4MEMyMjAgMTgxLjY1NyAyMTguNjU3IDE4MyAyMTcgMTgzSDE4M0MxODEuMzQzIDE4MyAxODAgMTgxLjY1NyAxODAgMTgwWiIgZmlsbD0iIzQzNjFlZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz4KPC9zdmc+';
            this.alt = 'Certificate Image';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    
    // Add event listeners to all theme toggle buttons
    const themeToggles = document.querySelectorAll('#themeToggle, #certificationsThemeToggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
    
    initializeAnimations();
    handleImageErrors();
    
    // Add CSS for animations if not already present
    if (!document.querySelector('#certifications-animations')) {
        const style = document.createElement('style');
        style.id = 'certifications-animations';
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
            
            .certification-card {
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
    }
});

// Handle responsive behavior
window.addEventListener('resize', function() {
    // Adjust grid layout for mobile view
    const certificationsGrid = document.querySelector('.certifications-grid');
    
    if (window.innerWidth <= 768) {
        if (certificationsGrid) {
            certificationsGrid.style.gridTemplateColumns = '1fr';
        }
    } else {
        if (certificationsGrid) {
            certificationsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(400px, 1fr))';
        }
    }
});