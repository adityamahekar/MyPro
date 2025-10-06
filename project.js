// Theme toggle functionality for projects page
function toggleTheme() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    const themeToggles = document.querySelectorAll('#themeToggle, #projectsThemeToggle');
    
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
    const themeToggles = document.querySelectorAll('#themeToggle, #projectsThemeToggle');
    
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

// Project filtering functionality
function initializeProjectFilters() {
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            filterPills.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked pill
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects with smooth animation
            projectCards.forEach(card => {
                const projectType = card.getAttribute('data-type');
                
                if (filterValue === 'all' || projectType === filterValue) {
                    // Show card with animation
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.display = 'block';
                    }, 50);
                } else {
                    // Hide card with animation
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
}

// Add animation to project cards when they come into view
function initializeAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// Handle image loading errors
function handleImageErrors() {
    const images = document.querySelectorAll('.project-image img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace broken image with a placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyMCIgdmlld0JveD0iMCAwIDQwMCAyMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjIwIiBmaWxsPSIjZjBmMGYwIi8+CjxwYXRoIGQ9Ik0xNjAgODBDMTYwIDc2LjY4NjMgMTYyLjY4NiA3NCAxNjYgNzRIMjM0QzIzNy4zMTQgNzQgMjQwIDc2LjY4NjMgMjQwIDgwVjE0MEMyNDAgMTQzLjMxNCAyMzcuMzE0IDE0NiAyMzQgMTQ2SDE2NkMxNjIuNjg2IDE0NiAxNjAgMTQzLjMxNCAxNjAgMTQwVjgwWiIgZmlsbD0iIzQzNjFlZSIgZmlsbC1vcGFjaXR5PSIwLjIiLz4KPHBhdGggZD0iTTE4MCA5MEMxODAgODguMzQzMSAxODEuMzQzIDg3IDE4MyA4N0gyMTdDMjE4LjY1NyA4NyAyMjAgODguMzQzMSAyMjAgOTBDMjIwIDkxLjY1NjkgMjE4LjY1NyA5MyAyMTcgOTNIMTgzQzE4MS4zNDMgOTMgMTgwIDkxLjY1NjkgMTgwIDkwWiIgZmlsbD0iIzQzNjFlZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz4KPHBhdGggZD0iTTE4MCAxMTBDMTgwIDEwOC4zNDMgMTgxLjM0MyAxMDcgMTgzIDEwN0gyMTdDMjE4LjY1NyAxMDcgMjIwIDEwOC4zNDMgMjIwIDExMEMyMjAgMTExLjY1NyAyMTguNjU3IDExMyAyMTcgMTEzSDE4M0MxODEuMzQzIDExMyAxODAgMTExLjY1NyAxODAgMTEwWiIgZmlsbD0iIzQzNjFlZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz4KPHBhdGggZD0iTTE4MCAxMzBDMTgwIDEyOC4zNDMgMTgxLjM0MyAxMjcgMTgzIDEyN0gyMTdDMjE4LjY1NyAxMjcgMjIwIDEyOC4zNDMgMjIwIDEzMEMyMjAgMTMxLjY1NyAyMTguNjU3IDEzMyAyMTcgMTMzSDE4M0MxODEuMzQzIDEzMyAxODAgMTMxLjY1NyAxODAgMTMwWiIgZmlsbD0iIzQzNjFlZSIgZmlsbC1vcGFjaXR5PSIwLjQiLz4KPC9zdmc+';
            this.alt = 'Project Preview';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    
    // Add event listeners to all theme toggle buttons
    const themeToggles = document.querySelectorAll('#themeToggle, #projectsThemeToggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });
    
    initializeProjectFilters();
    initializeAnimations();
    handleImageErrors();
    
    // Add CSS for animations if not already present
    if (!document.querySelector('#projects-animations')) {
        const style = document.createElement('style');
        style.id = 'projects-animations';
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
            
            .project-card {
                opacity: 0;
            }
            
            .project-card.hidden {
                opacity: 0;
                transform: scale(0.8);
                height: 0;
                margin: 0;
                padding: 0;
                overflow: hidden;
                transition: all 0.4s ease;
            }
        `;
        document.head.appendChild(style);
    }
});

// Handle responsive behavior
window.addEventListener('resize', function() {
    // Any responsive adjustments can be added here
    const projectFilters = document.querySelector('.project-filters');
    
    if (window.innerWidth <= 768) {
        if (projectFilters) {
            projectFilters.style.gap = '0.5rem';
        }
    } else {
        if (projectFilters) {
            projectFilters.style.gap = '1rem';
        }
    }
});