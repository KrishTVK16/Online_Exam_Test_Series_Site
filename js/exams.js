/**
 * ONLINE EXAM TEST SERIES WEBSITE
 * Exams JavaScript - Filtering, Search, and Sorting
 */

// ===================================
// MOCK EXAM DATA
// ===================================

const mockExams = [
    // UPSC Exams (4)
    {
        id: 1,
        name: "UPSC Civil Services Prelims 2025",
        category: "UPSC",
        level: "Advanced",
        price: 2999,
        originalPrice: 4999,
        rating: 4.8,
        reviews: 1245,
        image: "assets/img/exam-upsc.jpg",
        description: "Comprehensive test series for UPSC CSE Prelims with 50+ mock tests",
        featured: true,
        tests: 50,
        questions: 200,
        duration: "2 hours"
    },
    {
        id: 2,
        name: "UPSC Mains General Studies",
        category: "UPSC",
        level: "Advanced",
        price: 3499,
        originalPrice: 5499,
        rating: 4.9,
        reviews: 892,
        description: "Complete UPSC Mains GS test series with model answers",
        featured: false,
        tests: 40,
        questions: 250,
        duration: "3 hours"
    },
    {
        id: 3,
        name: "UPSC CSAT Practice Tests",
        category: "UPSC",
        level: "Intermediate",
        price: 1999,
        originalPrice: 2999,
        rating: 4.7,
        reviews: 654,
        description: "CSAT aptitude and comprehension test series",
        featured: false,
        tests: 30,
        questions: 80,
        duration: "2 hours"
    },
    {
        id: 4,
        name: "UPSC Essay Writing Series",
        category: "UPSC",
        level: "Advanced",
        price: 2499,
        originalPrice: 3999,
        rating: 4.6,
        reviews: 432,
        description: "Essay writing practice with expert evaluation",
        featured: false,
        tests: 25,
        questions: 50,
        duration: "3 hours"
    },
    // SSC Exams (4)
    {
        id: 5,
        name: "SSC CGL Tier 1 Complete Package",
        category: "SSC",
        level: "Intermediate",
        price: 1499,
        originalPrice: 2499,
        rating: 4.6,
        reviews: 856,
        description: "Full-length mock tests for SSC CGL Tier 1 preparation",
        featured: true,
        tests: 40,
        questions: 100,
        duration: "60 minutes"
    },
    {
        id: 6,
        name: "SSC CHSL Mock Tests 2025",
        category: "SSC",
        level: "Beginner",
        price: 1299,
        originalPrice: 1999,
        rating: 4.5,
        reviews: 743,
        description: "Complete SSC CHSL preparation test series",
        featured: false,
        tests: 35,
        questions: 100,
        duration: "60 minutes"
    },
    {
        id: 7,
        name: "SSC MTS Practice Series",
        category: "SSC",
        level: "Beginner",
        price: 999,
        originalPrice: 1499,
        rating: 4.4,
        reviews: 567,
        description: "Multi-Tasking Staff exam preparation tests",
        featured: false,
        tests: 25,
        questions: 100,
        duration: "90 minutes"
    },
    {
        id: 8,
        name: "SSC CPO Mock Tests",
        category: "SSC",
        level: "Intermediate",
        price: 1599,
        originalPrice: 2299,
        rating: 4.7,
        reviews: 489,
        description: "Central Police Organization exam test series",
        featured: false,
        tests: 30,
        questions: 200,
        duration: "2 hours"
    },
    // Banking Exams (4)
    {
        id: 9,
        name: "Bank PO Prelims Test Series",
        category: "Banking",
        level: "Intermediate",
        price: 1299,
        originalPrice: 1999,
        rating: 4.7,
        reviews: 672,
        description: "Practice tests for IBPS PO, SBI PO and other bank exams",
        featured: false,
        tests: 35,
        questions: 100,
        duration: "60 minutes"
    },
    {
        id: 10,
        name: "SBI Clerk Preparation Package",
        category: "Banking",
        level: "Beginner",
        price: 1099,
        originalPrice: 1699,
        rating: 4.5,
        reviews: 823,
        description: "Complete SBI Clerk exam preparation with mocks",
        featured: true,
        tests: 30,
        questions: 100,
        duration: "60 minutes"
    },
    {
        id: 11,
        name: "RBI Grade B Test Series",
        category: "Banking",
        level: "Advanced",
        price: 2499,
        originalPrice: 3499,
        rating: 4.8,
        reviews: 345,
        description: "RBI Grade B comprehensive test preparation",
        featured: false,
        tests: 40,
        questions: 200,
        duration: "3 hours"
    },
    {
        id: 12,
        name: "IBPS RRB Mock Tests",
        category: "Banking",
        level: "Intermediate",
        price: 1199,
        originalPrice: 1799,
        rating: 4.6,
        reviews: 678,
        description: "Regional Rural Bank exams test series",
        featured: false,
        tests: 28,
        questions: 80,
        duration: "45 minutes"
    },
    // Railway Exams (4)
    {
        id: 13,
        name: "Railway RRB NTPC Mock Tests",
        category: "Railway",
        level: "Beginner",
        price: 999,
        originalPrice: 1499,
        rating: 4.5,
        reviews: 543,
        description: "Complete test series for Railway RRB NTPC exam",
        featured: false,
        tests: 30,
        questions: 100,
        duration: "90 minutes"
    },
    {
        id: 14,
        name: "Railway Group D Practice Tests",
        category: "Railway",
        level: "Beginner",
        price: 899,
        originalPrice: 1299,
        rating: 4.4,
        reviews: 789,
        description: "Railway Group D comprehensive mock tests",
        featured: false,
        tests: 25,
        questions: 100,
        duration: "90 minutes"
    },
    {
        id: 15,
        name: "Railway ALP Technician Series",
        category: "Railway",
        level: "Intermediate",
        price: 1399,
        originalPrice: 1999,
        rating: 4.6,
        reviews: 456,
        description: "Assistant Loco Pilot test preparation package",
        featured: false,
        tests: 35,
        questions: 75,
        duration: "60 minutes"
    },
    {
        id: 16,
        name: "Railway RPF Constable Tests",
        category: "Railway",
        level: "Beginner",
        price: 1099,
        originalPrice: 1599,
        rating: 4.5,
        reviews: 534,
        description: "Railway Protection Force exam preparation",
        featured: false,
        tests: 28,
        questions: 120,
        duration: "90 minutes"
    },
    // GATE Exams (2)
    {
        id: 17,
        name: "GATE Computer Science 2025",
        category: "GATE",
        level: "Advanced",
        price: 2499,
        originalPrice: 3999,
        rating: 4.9,
        reviews: 1089,
        description: "Subject-wise and full-length tests for GATE CS",
        featured: true,
        tests: 45,
        questions: 65,
        duration: "3 hours"
    },
    {
        id: 18,
        name: "GATE Mechanical Engineering",
        category: "GATE",
        level: "Advanced",
        price: 2499,
        originalPrice: 3999,
        rating: 4.8,
        reviews: 876,
        description: "Complete GATE ME test series with solutions",
        featured: false,
        tests: 42,
        questions: 65,
        duration: "3 hours"
    },
    // MBA Exams (2)
    {
        id: 19,
        name: "CAT Quantitative Aptitude",
        category: "MBA",
        level: "Advanced",
        price: 1999,
        originalPrice: 2999,
        rating: 4.7,
        reviews: 789,
        description: "Sectional tests focusing on Quant for CAT preparation",
        featured: false,
        tests: 25,
        questions: 34,
        duration: "60 minutes"
    },
    {
        id: 20,
        name: "CAT Complete Mock Test Series",
        category: "MBA",
        level: "Advanced",
        price: 2999,
        originalPrice: 4499,
        rating: 4.8,
        reviews: 1234,
        description: "Full-length CAT mock tests with analysis",
        featured: true,
        tests: 35,
        questions: 100,
        duration: "3 hours"
    },
    // Medical Exams (2)
    {
        id: 21,
        name: "NEET Medical Entrance Test Series",
        category: "Medical",
        level: "Advanced",
        price: 3499,
        originalPrice: 4999,
        rating: 4.8,
        reviews: 1567,
        description: "Comprehensive NEET preparation with chapter-wise and full tests",
        featured: true,
        tests: 60,
        questions: 180,
        duration: "3 hours"
    },
    {
        id: 22,
        name: "AIIMS Medical Mock Tests",
        category: "Medical",
        level: "Advanced",
        price: 2999,
        originalPrice: 4299,
        rating: 4.7,
        reviews: 923,
        description: "AIIMS entrance exam preparation test series",
        featured: false,
        tests: 45,
        questions: 200,
        duration: "3.5 hours"
    },
    // Engineering Exams (2)
    {
        id: 23,
        name: "JEE Main Mathematics",
        category: "Engineering",
        level: "Advanced",
        price: 2199,
        originalPrice: 3299,
        rating: 4.6,
        reviews: 934,
        description: "Subject-wise test series for JEE Main Mathematics",
        featured: false,
        tests: 35,
        questions: 75,
        duration: "3 hours"
    },
    {
        id: 24,
        name: "JEE Advanced Complete Package",
        category: "Engineering",
        level: "Advanced",
        price: 3999,
        originalPrice: 5999,
        rating: 4.9,
        reviews: 1423,
        description: "Full JEE Advanced preparation with 50+ tests",
        featured: true,
        tests: 55,
        questions: 180,
        duration: "3 hours"
    }
];

// ===================================
// STATE MANAGEMENT
// ===================================

let filteredExams = [...mockExams];
let currentFilters = {
    search: '',
    category: [],
    level: [],
    priceMin: 0,
    priceMax: 6000,
    sort: 'popularity'
};

// Pagination state
let currentPage = 1;
let isInitialized = false;

// ===================================
// DYNAMIC PAGINATION
// ===================================

/**
 * Get items per page based on screen width
 * @returns {number} Items per page (2, 4, or 6)
 */
function getItemsPerPage() {
    const width = window.innerWidth;
    if (width < 600) return 2;      // Mobile: 1 column × 2 rows
    if (width <= 850) return 4;     // Medium: 2 columns × 2 rows
    return 6;                        // Desktop: 3 columns × 2 rows
}

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Content Loaded - Checking for exams page...');
    
    if (document.querySelector('.exams-page')) {
        console.log('Exams page detected, initializing...');
        initializeExamsPage();
    } else {
        console.log('Exams page not detected. Body classes:', document.body.className);
    }

    if (document.querySelector('.featured-exams')) {
        renderFeaturedExams();
    }
    
    // Fallback: If examsGrid exists but is empty after a delay, force render
    setTimeout(() => {
        const examsGrid = document.getElementById('examsGrid');
        if (examsGrid && examsGrid.children.length === 0 && mockExams.length > 0) {
            console.log('Fallback: Force rendering exams...');
            filteredExams = [...mockExams];
            currentPage = 1;
            renderExams();
        }
    }, 500);
});

function initializeExamsPage() {
    // Only initialize once
    if (isInitialized) return;
    
    // Reset to page 1 on initial load (ignore any stored state)
    currentPage = 1;
    
    // Ensure filteredExams is initialized with all exams
    filteredExams = [...mockExams];
    
    // Handle URL parameters (e.g., ?category=UPSC)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        currentFilters.category = [categoryParam];
        // Check the corresponding checkbox
        const categoryCheckbox = document.querySelector(`[name="category"][value="${categoryParam}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
        }
        // Apply filters to actually filter the exams
        applyFilters();
        isInitialized = true;
        return; // applyFilters() already calls renderExams()
    }
    
    initializeFilters();
    initializeSearch();
    initializeSort();
    
    // Add window resize listener for responsive pagination
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recalculate pagination on resize
            const newItemsPerPage = getItemsPerPage();
            const totalPages = Math.ceil(filteredExams.length / newItemsPerPage);
            
            // Adjust current page if it exceeds total pages after resize
            if (currentPage > totalPages && totalPages > 0) {
                currentPage = totalPages;
            }
            
            // Re-render with new pagination
            renderExams();
        }, 300); // Debounce: 300ms delay
    });
    
    // Force initial render with a small delay to ensure DOM is ready
    setTimeout(() => {
        renderExams();
        isInitialized = true;
    }, 100);
}

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

function initializeSearch() {
    const searchInput = document.getElementById('examSearch');
    if (!searchInput) return;

    const debouncedSearch = window.appUtils.debounce(function (value) {
        currentFilters.search = value.toLowerCase();
        applyFilters();
    }, 300);

    searchInput.addEventListener('input', function () {
        debouncedSearch(this.value);
    });
}

// ===================================
// FILTERS
// ===================================

function initializeFilters() {
    // Category checkboxes
    const categoryCheckboxes = document.querySelectorAll('[name="category"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                currentFilters.category.push(this.value);
            } else {
                currentFilters.category = currentFilters.category.filter(c => c !== this.value);
            }
            applyFilters();
        });
    });

    // Level checkboxes
    const levelCheckboxes = document.querySelectorAll('[name="level"]');
    levelCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                currentFilters.level.push(this.value);
            } else {
                currentFilters.level = currentFilters.level.filter(l => l !== this.value);
            }
            applyFilters();
        });
    });

    // Price range (if implemented)
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');

    if (priceMin && priceMax) {
        priceMin.addEventListener('change', function () {
            currentFilters.priceMin = parseInt(this.value) || 0;
            applyFilters();
        });

        priceMax.addEventListener('change', function () {
            currentFilters.priceMax = parseInt(this.value) || 5000;
            applyFilters();
        });
    }

    // Clear filters button
    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilters);
    }
}

function clearFilters() {
    // Reset filters
    currentFilters = {
        search: '',
        category: [],
        level: [],
        priceMin: 0,
        priceMax: 5000,
        sort: 'popularity'
    };

    // Uncheck all checkboxes
    document.querySelectorAll('[name="category"], [name="level"]').forEach(cb => {
        cb.checked = false;
    });

    // Clear search
    const searchInput = document.getElementById('examSearch');
    if (searchInput) searchInput.value = '';

    // Reset sort
    const sortSelect = document.getElementById('sortExams');
    if (sortSelect) sortSelect.value = 'popularity';

    applyFilters();
}

// ===================================
// SORTING
// ===================================

function initializeSort() {
    const sortSelect = document.getElementById('sortExams');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', function () {
        currentFilters.sort = this.value;
        applyFilters();
    });
}

function sortExams(exams, sortBy) {
    const sorted = [...exams];

    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted.sort((a, b) => b.id - a.id);
        case 'popularity':
        default:
            return sorted.sort((a, b) => b.reviews - a.reviews);
    }
}

// ===================================
// FILTER APPLICATION
// ===================================

function applyFilters() {
    let results = [...mockExams];

    // Search filter
    if (currentFilters.search) {
        results = results.filter(exam =>
            exam.name.toLowerCase().includes(currentFilters.search) ||
            exam.description.toLowerCase().includes(currentFilters.search) ||
            exam.category.toLowerCase().includes(currentFilters.search)
        );
    }

    // Category filter
    if (currentFilters.category.length > 0) {
        results = results.filter(exam =>
            currentFilters.category.includes(exam.category)
        );
    }

    // Level filter
    if (currentFilters.level.length > 0) {
        results = results.filter(exam =>
            currentFilters.level.includes(exam.level)
        );
    }

    // Price filter
    results = results.filter(exam =>
        exam.price >= currentFilters.priceMin && exam.price <= currentFilters.priceMax
    );

    // Sort
    results = sortExams(results, currentFilters.sort);

    // Reset to page 1 when filters change
    currentPage = 1;
    
    filteredExams = results;
    renderExams();
}

// ===================================
// RENDERING
// ===================================

function renderExams() {
    const container = document.getElementById('examsGrid');
    const resultsCount = document.getElementById('resultsCount');
    const emptyState = document.getElementById('emptyState');

    if (!container) {
        console.error('examsGrid container not found');
        return;
    }

    // Ensure filteredExams is initialized
    if (!filteredExams || filteredExams.length === 0) {
        console.log('filteredExams was empty, initializing with all exams');
        filteredExams = [...mockExams];
    }
    
    // Ensure container is visible
    container.style.display = 'grid';
    container.style.visibility = 'visible';
    container.style.opacity = '1';

    // Update results count
    if (resultsCount) {
        resultsCount.textContent = `Showing ${filteredExams.length} exams`;
    }

    // Show empty state if no results
    if (filteredExams.length === 0) {
        container.innerHTML = '';
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        hidePagination();
        return;
    }

    if (emptyState) {
        emptyState.style.display = 'none';
    }

    // Calculate pagination with dynamic items per page
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(filteredExams.length / itemsPerPage);
    
    // Ensure currentPage is within valid range
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }
    if (currentPage < 1) {
        currentPage = 1;
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedExams = filteredExams.slice(startIndex, endIndex);

    // Render exam cards for current page
    console.log('Rendering exams - Page:', currentPage, 'Total pages:', totalPages, 'Filtered exams:', filteredExams.length, 'Paginated exams:', paginatedExams.length);
    
    if (paginatedExams.length > 0) {
        const cardsHTML = paginatedExams.map((exam, index) => {
            if (!exam) {
                console.warn('Invalid exam object at index', index, ':', exam);
                return '';
            }
            try {
                const cardHTML = createExamCard(exam);
                if (!cardHTML || cardHTML.trim() === '') {
                    console.warn('Empty card HTML for exam:', exam.name || exam.id);
                }
                return cardHTML;
            } catch (error) {
                console.error('Error creating exam card:', error, exam);
                return '';
            }
        }).filter(html => html.trim() !== '').join('');
        
        console.log('Generated cards HTML length:', cardsHTML.length, 'Cards count:', paginatedExams.length);
        
        if (cardsHTML && cardsHTML.trim() !== '') {
            // Clear container first
            container.innerHTML = '';
            // Force a reflow
            void container.offsetHeight;
            // Set the HTML
            container.innerHTML = cardsHTML;
            // Ensure container is visible and has proper display
            // Force grid layout with inline styles as fallback
            container.style.display = 'grid';
            container.style.gridTemplateColumns = 'repeat(3, 1fr)';
            container.style.gap = '1.5rem'; // Use pixel value instead of CSS variable
            container.style.visibility = 'visible';
            container.style.opacity = '1';
            container.style.minHeight = '400px'; // Ensure container has height
            container.style.width = '100%';
            container.style.position = 'relative'; // Ensure positioning context
            
            console.log('Cards rendered successfully. Container children:', container.children.length);
            
            // Force all cards to be visible immediately
            const examCards = container.querySelectorAll('.exam-card');
            examCards.forEach((card, index) => {
                // Force visibility with inline styles
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.visibility = 'visible';
                card.classList.add('in-view');
                
                // Add a small delay for staggered effect if desired (optional)
                // card.style.transitionDelay = `${index * 0.05}s`;
            });
            
            console.log('Forced visibility on', examCards.length, 'cards');
            
            // Debug: Log container and card dimensions
            console.log('Container dimensions:', {
                width: container.offsetWidth,
                height: container.offsetHeight,
                display: window.getComputedStyle(container).display,
                visibility: window.getComputedStyle(container).visibility,
                opacity: window.getComputedStyle(container).opacity
            });
            
            if (examCards.length > 0) {
                const firstCard = examCards[0];
                console.log('First card dimensions:', {
                    width: firstCard.offsetWidth,
                    height: firstCard.offsetHeight,
                    display: window.getComputedStyle(firstCard).display,
                    visibility: window.getComputedStyle(firstCard).visibility,
                    opacity: window.getComputedStyle(firstCard).opacity,
                    transform: window.getComputedStyle(firstCard).transform
                });
            }
            
            // Also reinitialize scroll animations for new elements
            if (typeof initScrollAnimations === 'function') {
                setTimeout(() => {
                    initScrollAnimations();
                }, 100);
            }
        } else {
            console.error('No valid exam cards generated. Paginated exams:', paginatedExams, 'Filtered exams:', filteredExams.length);
            container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">Error loading exams. Please refresh the page.</div>';
        }
    } else {
        container.innerHTML = '';
        console.warn('No exams to display on page', currentPage, 'Total exams:', filteredExams.length, 'Total pages:', totalPages, 'Start index:', startIndex, 'End index:', endIndex);
        
        // If we're on a page with no results but there are exams, go to page 1
        if (filteredExams.length > 0) {
            if (currentPage > totalPages) {
                console.log('Current page exceeds total pages, redirecting to page 1');
                currentPage = 1;
                renderExams();
                return;
            } else if (paginatedExams.length === 0 && currentPage > 1) {
                console.log('Current page has no results, redirecting to page 1');
                currentPage = 1;
                renderExams();
                return;
            }
        }
    }

    // Render pagination controls
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    let paginationContainer = document.getElementById('pagination');

    if (!paginationContainer) {
        // Create pagination container if it doesn't exist
        const examsGrid = document.getElementById('examsGrid');
        if (examsGrid && examsGrid.parentElement) {
            paginationContainer = document.createElement('div');
            paginationContainer.id = 'pagination';
            paginationContainer.style.cssText = 'display: flex; justify-content: center; align-items: center; gap: 0.5rem; margin-top: 2rem; flex-wrap: wrap;';
            examsGrid.parentElement.appendChild(paginationContainer);
        }
    }

    if (!paginationContainer || totalPages <= 1) {
        if (paginationContainer) paginationContainer.style.display = 'none';
        return;
    }

    paginationContainer.style.display = 'flex';

    let paginationHTML = '';

    // Previous button
    const prevDisabled = currentPage === 1;
    paginationHTML += `
        <button onclick="changePage(${currentPage - 1})" 
                ${prevDisabled ? 'disabled' : ''}
                class="pagination-btn pagination-prev"
                style="padding: 0.5rem 1rem; border: 2px solid var(--color-primary-dark); background: ${prevDisabled ? 'var(--color-bg-secondary)' : 'transparent'}; color: ${prevDisabled ? 'var(--color-text-secondary)' : 'var(--color-text-primary)'}; cursor: ${prevDisabled ? 'not-allowed' : 'pointer'}; border-radius: var(--radius-md); font-weight: 600; opacity: ${prevDisabled ? '0.5' : '1'}; transition: all 0.2s;">
            ←
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        paginationHTML += `
            <button onclick="changePage(${i})"
                    class="pagination-btn pagination-number ${isActive ? 'active' : ''}"
                    style="padding: 0.5rem 1rem; border: 2px solid var(--color-primary-dark); background: ${isActive ? 'var(--gradient-button)' : 'transparent'}; color: ${isActive ? 'white' : 'var(--color-text-primary)'}; cursor: pointer; border-radius: var(--radius-md); font-weight: 600; min-width: 40px; transition: all 0.2s;">
                ${i}
            </button>
        `;
    }

    // Next button
    const nextDisabled = currentPage === totalPages;
    paginationHTML += `
        <button onclick="changePage(${currentPage + 1})"
                ${nextDisabled ? 'disabled' : ''}
                class="pagination-btn pagination-next"
                style="padding: 0.5rem 1rem; border: 2px solid var(--color-primary-dark); background: ${nextDisabled ? 'var(--color-bg-secondary)' : 'transparent'}; color: ${nextDisabled ? 'var(--color-text-secondary)' : 'var(--color-text-primary)'}; cursor: ${nextDisabled ? 'not-allowed' : 'pointer'}; border-radius: var(--radius-md); font-weight: 600; opacity: ${nextDisabled ? '0.5' : '1'}; transition: all 0.2s;">
            →
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

function hidePagination() {
    const paginationContainer = document.getElementById('pagination');
    if (paginationContainer) {
        paginationContainer.style.display = 'none';
    }
}

function changePage(page) {
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(filteredExams.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderExams();

    // Scroll to top of exams grid smoothly
    const container = document.getElementById('examsGrid');
    if (container) {
        const containerTop = container.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: containerTop, behavior: 'smooth' });
    }
}

// Make changePage available globally
if (typeof window !== 'undefined') {
    window.changePage = changePage;
}

function renderFeaturedExams() {
    const container = document.querySelector('.featured-exams');
    if (!container) return;

    const featured = mockExams.filter(exam => exam.featured).slice(0, 4);
    container.innerHTML = featured.map(exam => createExamCard(exam)).join('');
}

function createExamCard(exam) {
    // Validate exam object
    if (!exam || !exam.id || !exam.name) {
        console.error('Invalid exam object passed to createExamCard:', exam);
        return '';
    }
    
    const discount = Math.round(((exam.originalPrice - exam.price) / exam.originalPrice) * 100);

    // Use emoji as placeholder instead of image
    const categoryEmojis = {
        'UPSC': '🏛️',
        'SSC': '📋',
        'Banking': '🏦',
        'Railway': '🚂',
        'GATE': '🔬',
        'MBA': '💼',
        'Medical': '🏥',
        'Engineering': '⚙️'
    };
    const emoji = categoryEmojis[exam.category] || '📚';

    // Ensure all required fields have defaults
    const examName = exam.name || 'Untitled Exam';
    const examCategory = exam.category || 'General';
    const examDescription = exam.description || 'No description available';
    const examTests = exam.tests || 0;
    const examQuestions = exam.questions || 0;
    const examDuration = exam.duration || 'N/A';
    const examPrice = exam.price || 0;
    const examOriginalPrice = exam.originalPrice || exam.price || 0;
    const examRating = exam.rating || 0;
    const examReviews = exam.reviews || 0;
    const examId = exam.id || 0;

    return `
    <div class="card h-100 exam-card animate-on-scroll in-view" style="opacity: 1 !important; transform: translateY(0) !important; visibility: visible !important; position: relative;">
      <span class="card-badge badge-primary featured-badge ${exam.featured ? '' : 'badge-hidden'}">Featured</span>
      <div style="height: 200px; display: flex; align-items: center; justify-content: center; background: var(--color-bg-secondary); font-size: 4rem;">
        ${emoji}
      </div>
      <div class="card-body">
        <div style="text-align: center; margin-bottom: var(--spacing-sm);">
          <span class="card-badge badge-accent">${examCategory}</span>
        </div>
        <h3 class="card-title">${examName}</h3>
        <p class="card-text">${examDescription}</p>
        <div style="display: flex; gap: 1rem; margin: 0.5rem 0; font-size: 0.875rem; color: var(--color-text-secondary); flex-wrap: wrap;">
          <span>📝 ${examTests} Tests</span>
          <span>❓ ${examQuestions} Questions</span>
          <span>⏱️ ${examDuration}</span>
        </div>
        <div class="card-footer">
          <div>
            <span class="card-price">₹${examPrice.toLocaleString()}</span>
            <span class="card-price-old">₹${examOriginalPrice.toLocaleString()}</span>
            <span style="color: var(--color-success-olive); font-size: 0.875rem; margin-left: 0.5rem;">${discount}% OFF</span>
          </div>
          <div class="card-rating">
            <span>⭐ ${examRating}</span>
            <span>(${examReviews.toLocaleString()})</span>
          </div>
        </div>
        <a href="exam-detail.html?id=${examId}" class="btn btn-primary btn-block" style="margin-top: 1rem;">View Details</a>
      </div>
    </div>
  `;
}

// ===================================
// EXAM DETAIL PAGE
// ===================================

function loadExamDetail() {
    console.log('Loading exam detail page...');
    const urlParams = new URLSearchParams(window.location.search);
    const examId = parseInt(urlParams.get('id'));

    console.log('Exam ID from URL:', examId);

    if (!examId || isNaN(examId)) {
        console.error('Invalid exam ID, redirecting to exams page');
        window.location.href = 'exams.html';
        return;
    }

    const exam = mockExams.find(e => e.id === examId);

    if (!exam) {
        console.error('Exam not found with ID:', examId, 'Available exams:', mockExams.map(e => e.id));
        window.location.href = 'exams.html';
        return;
    }

    console.log('Found exam:', exam.name, 'ID:', exam.id);

    // Populate exam details
    document.title = exam.name + ' - ExamMaster';

    // Category emojis
    const categoryEmojis = {
        'UPSC': '🏛️',
        'SSC': '📋',
        'Banking': '🏦',
        'Railway': '🚂',
        'GATE': '🔬',
        'MBA': '💼',
        'Medical': '🏥',
        'Engineering': '⚙️'
    };
    const emoji = categoryEmojis[exam.category] || '📚';
    const discount = Math.round(((exam.originalPrice - exam.price) / exam.originalPrice) * 100);

    // Update page content
    const examTitle = document.getElementById('examTitle');
    const examBadge = document.getElementById('examBadge');
    const examDescription = document.getElementById('examDescription');
    const examPrice = document.getElementById('examPrice');
    const examRating = document.getElementById('examRating');
    const examImage = document.getElementById('examImage');
    const examTests = document.getElementById('examTests');
    const examQuestions = document.getElementById('examQuestions');
    const examDuration = document.getElementById('examDuration');
    const examLevel = document.getElementById('examLevel');
    const examCategory = document.getElementById('examCategory');
    const examReviews = document.getElementById('examReviews');
    const examOriginalPrice = document.getElementById('examOriginalPrice');
    const examDiscount = document.getElementById('examDiscount');
    const examBreadcrumb = document.getElementById('examBreadcrumb');
    const enrollBtn = document.getElementById('enrollBtn');
    const sidebarEnrollBtn = document.getElementById('sidebarEnrollBtn');

    // Populate all exam details with the selected exam data
    if (examTitle) {
        examTitle.textContent = exam.name;
        console.log('Set exam title:', exam.name);
    }
    if (examBadge) {
        examBadge.textContent = exam.category;
        console.log('Set exam category:', exam.category);
    }
    if (examDescription) {
        examDescription.textContent = exam.description;
        console.log('Set exam description:', exam.description);
    }
    if (examPrice) {
        examPrice.textContent = `₹${exam.price.toLocaleString()}`;
        console.log('Set exam price:', exam.price);
    }
    if (examRating) {
        examRating.innerHTML = `⭐ ${exam.rating} (${exam.reviews.toLocaleString()} reviews)`;
        console.log('Set exam rating:', exam.rating, 'reviews:', exam.reviews);
    }
    if (examImage) {
        examImage.textContent = emoji;
        console.log('Set exam emoji:', emoji);
    }
    if (examTests) {
        examTests.textContent = exam.tests || 0;
        console.log('Set exam tests:', exam.tests);
    }
    if (examQuestions) {
        examQuestions.textContent = exam.questions || 0;
        console.log('Set exam questions:', exam.questions);
    }
    if (examDuration) {
        examDuration.textContent = exam.duration || 'N/A';
        console.log('Set exam duration:', exam.duration);
    }
    if (examLevel) {
        examLevel.textContent = exam.level || '-';
        console.log('Set exam level:', exam.level);
    }
    if (examCategory) {
        examCategory.textContent = exam.category || '-';
    }
    if (examReviews) {
        examReviews.textContent = exam.reviews.toLocaleString() || '0';
    }
    if (examOriginalPrice) {
        examOriginalPrice.textContent = `₹${exam.originalPrice.toLocaleString()}`;
        console.log('Set original price:', exam.originalPrice);
    }
    if (examDiscount) {
        examDiscount.textContent = `${discount}% OFF`;
        console.log('Set discount:', discount);
    }
    if (examBreadcrumb) {
        examBreadcrumb.textContent = exam.name;
    }
    
    console.log('All exam details populated for:', exam.name);
    console.log('Verification - Exam ID:', exam.id, 'Name:', exam.name, 'Category:', exam.category);
    
    // Verify all data is from the selected exam
    const verification = {
        id: exam.id,
        name: exam.name,
        category: exam.category,
        price: exam.price,
        tests: exam.tests,
        questions: exam.questions,
        duration: exam.duration
    };
    console.log('Exam data verification:', verification);
    
    // Enroll button handlers
    if (enrollBtn) {
        enrollBtn.addEventListener('click', () => {
            alert(`Enrolling in: ${exam.name}\nPrice: ₹${exam.price.toLocaleString()}\n\nEnrollment feature coming soon!`);
        });
    }
    if (sidebarEnrollBtn) {
        sidebarEnrollBtn.addEventListener('click', () => {
            alert(`Enrolling in: ${exam.name}\nPrice: ₹${exam.price.toLocaleString()}\n\nEnrollment feature coming soon!`);
        });
    }

    // Render related exams (excludes current exam)
    renderRelatedExams(exam);
    
    console.log('Exam detail page loaded successfully for exam ID:', examId);
}

function renderRelatedExams(currentExam) {
    const container = document.getElementById('relatedExams');
    if (!container) {
        console.warn('Related exams container not found');
        return;
    }

    console.log('Rendering related exams for:', currentExam.name, 'Category:', currentExam.category);
    
    // Filter: same category, exclude current exam
    const related = mockExams
        .filter(exam => {
            const isSameCategory = exam.category === currentExam.category;
            const isNotCurrent = exam.id !== currentExam.id;
            return isSameCategory && isNotCurrent;
        })
        .slice(0, 3);

    console.log('Found', related.length, 'related exams:', related.map(e => e.name));

    if (related.length > 0) {
        container.innerHTML = related.map(exam => createExamCard(exam)).join('');
        
        // Ensure related exam cards are visible
        const relatedCards = container.querySelectorAll('.exam-card');
        relatedCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.visibility = 'visible';
            card.classList.add('in-view');
        });
    } else {
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: 2rem;">No related exams found.</p>';
    }
}

// Initialize exam detail if on detail page
if (window.location.pathname.includes('exam-detail.html') || window.location.href.includes('exam-detail.html')) {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadExamDetail);
    } else {
        // DOM is already loaded
        loadExamDetail();
    }
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.examsData = {
        mockExams,
        getExam: (id) => mockExams.find(e => e.id === id)
    };
}
