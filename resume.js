// Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Resume download function
function downloadResume() {
    const resumeUrl = 'https://docs.google.com/document/d/1_R-uNJbsfpI1cCQVQWQywgFeE-5IBDyx/edit?tab=t.0';
    
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Aditya_Mahekar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.open(resumeUrl, '_blank');
}

// Set active nav button based on current page
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navButtons = document.querySelectorAll('.nav-button');
    
    // Remove active class from all buttons
    navButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to current page button
    navButtons.forEach(button => {
        const buttonHref = button.getAttribute('href');
        if (buttonHref === currentPage) {
            button.classList.add('active');
        }
    });
}

// View counter functionality
function updateViewCount() {
    let count = localStorage.getItem('portfolioViews') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('portfolioViews', count);
    document.getElementById('viewCount').textContent = count.toLocaleString();
}

// Share portfolio function
function sharePortfolio() {
    const portfolioUrl = window.location.href;
    const shareText = 'Check out Aditya Mahekar\'s portfolio - Computer Science Engineer and Developer';
    
    if (navigator.share) {
        navigator.share({
            title: 'Aditya Mahekar Portfolio',
            text: shareText,
            url: portfolioUrl
        })
        .catch(error => {
            console.log('Error sharing:', error);
            fallbackShare(portfolioUrl, shareText);
        });
    } else {
        fallbackShare(portfolioUrl, shareText);
    }
}

function fallbackShare(url, text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(`${text}: ${url}`)
            .then(() => {
                alert('Portfolio link copied to clipboard!');
            })
            .catch(err => {
                window.open(url, '_blank');
            });
    } else {
        window.open(url, '_blank');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setActiveNav();
    updateViewCount();
    
    // Add click event listeners to nav buttons
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Add download button event listener
    const downloadBtn = document.querySelector('.download-button');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadResume();
        });
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});