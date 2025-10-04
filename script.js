// Typing effect for header
(function() {
    const titles = [
        " Computer Science Engineer ",
        " Developer ",
        " UI/UX Enthusiast ",
        " Aspiring Full-Stack Developer ",
        " Problem Solver "
    ];
    const typingElement = document.getElementById("typing");
    let currentTitle = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
        const currentText = titles[currentTitle];
        typingElement.textContent = isDeleting
            ? currentText.substring(0, charIndex--)
            : currentText.substring(0, charIndex++);

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => { isDeleting = true; typeEffect(); }, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentTitle = (currentTitle + 1) % titles.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }

    typeEffect();
})();

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
    updateViewCount();
    
    // Set active nav button based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        const buttonHref = button.getAttribute('href');
        if ((currentPage === 'index.html' && buttonHref === 'index.html') || 
            (buttonHref === currentPage)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
});