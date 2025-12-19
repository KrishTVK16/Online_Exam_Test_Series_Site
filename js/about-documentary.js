/**
 * ExamMaster About Page - Documentary Style Player
 * Video-style navigation with chapters and timeline scrubber
 */

let isPlaying = false;
let currentChapter = 1;
let totalChapters = 4;
let autoScrollInterval = null;
let scrollSpeed = 50; // pixels per second when playing

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeDocumentary();
    initializeCounters();
});

function initializeDocumentary() {
    // Set up chapter markers
    updateChapterMarkers();
    
    // Initialize timeline
    updateTimeline();
    
    // Set up scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scroll to chapter on load
    goToChapter(1);
}

function togglePlay() {
    isPlaying = !isPlaying;
    const playIcon = document.getElementById('playIcon');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (isPlaying) {
        playIcon.className = 'fas fa-pause';
        startAutoScroll();
    } else {
        playIcon.className = 'fas fa-play';
        stopAutoScroll();
    }
}

function startAutoScroll() {
    if (autoScrollInterval) return;
    
    autoScrollInterval = setInterval(() => {
        const currentScroll = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
        if (currentScroll >= maxScroll - 10) {
            // Reached end, stop
            togglePlay();
            return;
        }
        
        window.scrollBy(0, scrollSpeed / 60); // 60fps
        updateTimeline();
        checkChapterChange();
    }, 1000 / 60); // 60fps
}

function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
}

function goToChapter(chapterNum, event) {
    if (event) event.stopPropagation();
    
    currentChapter = chapterNum;
    const chapter = document.getElementById(`chapter-${chapterNum}`);
    
    if (chapter) {
        // Update active states
        document.querySelectorAll('.chapter').forEach(ch => ch.classList.remove('active'));
        chapter.classList.add('active');
        
        document.querySelectorAll('.chapter-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.chapter) === chapterNum);
        });
        
        // Scroll to chapter
        const chapterTop = chapter.offsetTop - 100; // Account for header
        window.scrollTo({
            top: chapterTop,
            behavior: 'smooth'
        });
        
        // Update timeline
        setTimeout(() => updateTimeline(), 500);
        
        // Stop auto-scroll if playing
        if (isPlaying) {
            togglePlay();
        }
    }
}

function scrubTo(event) {
    const scrubber = document.getElementById('timelineScrubber');
    const rect = scrubber.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    // Calculate which chapter based on percentage
    const targetChapter = Math.ceil((percentage / 100) * totalChapters);
    goToChapter(targetChapter);
}

function updateTimeline() {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
    
    const progress = document.getElementById('timelineProgress');
    const marker = document.getElementById('timelineMarker');
    
    if (progress) progress.style.width = scrollPercentage + '%';
    if (marker) marker.style.left = scrollPercentage + '%';
    
    // Update time display (mock time)
    const totalSeconds = 240; // 4 minutes total
    const currentSeconds = Math.floor((scrollPercentage / 100) * totalSeconds);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    
    const currentTimeEl = document.getElementById('currentTime');
    if (currentTimeEl) {
        currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function updateChapterMarkers() {
    const markers = document.querySelectorAll('.chapter-marker');
    markers.forEach((marker, index) => {
        const chapterNum = index + 1;
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            goToChapter(chapterNum);
        });
    });
}

function checkChapterChange() {
    const chapters = document.querySelectorAll('.chapter');
    const scrollTop = window.pageYOffset + window.innerHeight / 2;
    
    chapters.forEach((chapter, index) => {
        const chapterTop = chapter.offsetTop;
        const chapterBottom = chapterTop + chapter.offsetHeight;
        const chapterNum = index + 1;
        
        if (scrollTop >= chapterTop && scrollTop < chapterBottom) {
            if (currentChapter !== chapterNum) {
                currentChapter = chapterNum;
                
                // Update active states
                chapters.forEach(ch => ch.classList.remove('active'));
                chapter.classList.add('active');
                
                document.querySelectorAll('.chapter-btn').forEach(btn => {
                    btn.classList.toggle('active', parseInt(btn.dataset.chapter) === chapterNum);
                });
                
                // Update chapter markers
                document.querySelectorAll('.chapter-marker').forEach((marker, idx) => {
                    marker.classList.toggle('active', idx + 1 === chapterNum);
                });
            }
        }
    });
}

function handleScroll() {
    updateTimeline();
    checkChapterChange();
    
    // Stop auto-scroll if user manually scrolls
    if (isPlaying && autoScrollInterval) {
        // Small delay to allow smooth scrolling
        setTimeout(() => {
            if (isPlaying) {
                stopAutoScroll();
                isPlaying = false;
                const playIcon = document.getElementById('playIcon');
                if (playIcon) playIcon.className = 'fas fa-play';
            }
        }, 100);
    }
}

function showDetails(detailId) {
    // Create modal or expand card with more details
    const details = {
        'problem-1': 'Traditional test series cost ₹10,000-₹50,000, making them inaccessible to many students.',
        'problem-2': 'Many platforms used outdated questions that didn\'t reflect current exam patterns.',
        'problem-3': 'Students in tier-2 and tier-3 cities had limited access to quality coaching and resources.',
        'solution-1': 'Our team includes former UPSC toppers, IIT professors, and industry experts.',
        'solution-2': 'AI analyzes your performance and suggests personalized improvement areas.',
        'solution-3': 'Study on your phone, tablet, or computer - your progress syncs across all devices.',
        'impact-1': 'From 5 test series in 2020 to 250+ today, serving students across India.',
        'impact-2': 'Students using ExamMaster show 30% higher success rates compared to self-study.',
        'impact-3': 'Rated 4.8/5 by over 10,000 students who have used our platform.',
        'future-1': 'AI will create personalized study plans based on your strengths and weaknesses.',
        'future-2': 'Expanding to serve students preparing for international competitive exams.',
        'future-3': 'Partnering with educational institutions to bring ExamMaster to more students.'
    };
    
    const message = details[detailId] || 'More information coming soon!';
    alert(message);
}

function initializeCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-counter'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    const isDecimal = target % 1 !== 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            if (isDecimal) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (isDecimal) {
                element.textContent = target.toFixed(1);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
    };
    
    requestAnimationFrame(updateCounter);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowLeft') {
        if (currentChapter > 1) {
            goToChapter(currentChapter - 1);
        }
    } else if (e.code === 'ArrowRight') {
        if (currentChapter < totalChapters) {
            goToChapter(currentChapter + 1);
        }
    }
});

