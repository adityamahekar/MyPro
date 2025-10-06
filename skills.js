// Dark/Light Mode Toggle for Skills Page
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

// Function to apply theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.className = 'fas fa-sun';
        console.log('Dark mode applied');
    } else {
        document.body.classList.remove('dark-mode');
        icon.className = 'fas fa-moon';
        console.log('Light mode applied');
    }
}

// Check saved theme or system preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    console.log('Saved theme:', savedTheme);
    console.log('System prefers dark:', prefersDark);

    // Apply initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
    } else {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
    }
    
    console.log('Theme toggled to:', isDarkMode ? 'light' : 'dark');
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) { // Only if user hasn't set preference
        applyTheme(e.matches ? 'dark' : 'light');
        console.log('System theme changed to:', e.matches ? 'dark' : 'light');
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Skills page loaded');
    initializeTheme();
    
    // Set active nav button based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        const buttonHref = button.getAttribute('href');
        if (buttonHref === currentPage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Add animation delays to skill pills
    const skillPills = document.querySelectorAll('.skill-pill');
    skillPills.forEach((pill, index) => {
        pill.style.animationDelay = `${(index % 10) * 0.1}s`;
    });
});

// Debug function to check current theme state
function debugTheme() {
    console.log('Current body classes:', document.body.className);
    console.log('LocalStorage theme:', localStorage.getItem('theme'));
    console.log('CSS Variables:');
    console.log('--primary-color:', getComputedStyle(document.documentElement).getPropertyValue('--primary-color'));
    console.log('--background-color:', getComputedStyle(document.documentElement).getPropertyValue('--background-color'));
}

// Export for debugging
window.debugTheme = debugTheme;