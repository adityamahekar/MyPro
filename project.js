// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active class from all pills
            filterPills.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked pill
            pill.classList.add('active');
            
            // Get filter value
            const filterValue = pill.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const projectType = card.getAttribute('data-type');
                
                if (filterValue === 'all' || projectType === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});