// Smooth scrolling for navigation links
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

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hero-text, .hero-visual, .intro-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add parallax effect to floating icons
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const icons = document.querySelectorAll('.icon');
    
    icons.forEach((icon, index) => {
        const speed = 0.5 + (index * 0.1);
        icon.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Resume button handler - open PDF in new window
document.addEventListener('DOMContentLoaded', () => {
    const resumeBtn = document.querySelector('.resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('rishabhResume.pdf', '_blank');
        });
    }
});

// Animate skill boxes on scroll
document.addEventListener('DOMContentLoaded', () => {
    const skillBoxes = document.querySelectorAll('.skills-box');
    
    skillBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        box.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        
        const boxObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    boxObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        boxObserver.observe(box);
    });
    
    // Animate coding profile cards
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cardObserver.observe(card);
    });

    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    projectObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        projectObserver.observe(card);
    });

    // Typewriter effect for hero subtitle
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const titles = [
            'Data Analyst',
            'Machine Learning Engineer',
            'Developer',
            'Problem Solver',
            'AI Enthusiast'
        ];
        
        let currentTitleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let deletingSpeed = 50;
        let pauseTime = 2000;
        
        function typeWriter() {
            const currentTitle = titles[currentTitleIndex];
            
            if (isDeleting) {
                // Delete characters
                typingText.textContent = currentTitle.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = deletingSpeed;
                
                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                    typingSpeed = 100;
                }
            } else {
                // Type characters
                typingText.textContent = currentTitle.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
                
                if (currentCharIndex === currentTitle.length) {
                    isDeleting = true;
                    typingSpeed = pauseTime;
                }
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
        
        // Start the typewriter effect
        typeWriter();
    }
});

// Fetch live coding profile stats from public API
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('https://alfa-leetcode-api.onrender.com/rishu_ai/solved');
        if (res.ok) {
            const data = await res.json();
            if (data.solvedProblem !== undefined && data.solvedProblem !== null) {
                document.getElementById('lc-solved').textContent = data.solvedProblem;
            }
        }
    } catch (error) {
        console.error('Error fetching stats from proxy:', error);
    }
});
