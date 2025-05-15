document.addEventListener('DOMContentLoaded', function() {
    // Sample event data
    const events = [
        {
            id: 1,
            title: "Annual Tech Fest",
            category: "fest",
            date: "2023-11-15",
            time: "10:00 AM",
            location: "Main Auditorium",
            description: "Join us for the biggest tech fest of the year with competitions, workshops, and guest speakers.",
            image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 2,
            title: "Web Development Workshop",
            category: "workshop",
            date: "2023-10-20",
            time: "2:00 PM",
            location: "Computer Lab 3",
            description: "Learn modern web development techniques including HTML, CSS, JavaScript and React.",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 3,
            title: "Career Guidance Seminar",
            category: "seminar",
            date: "2023-11-05",
            time: "11:00 AM",
            location: "Seminar Hall",
            description: "Industry experts will share insights about career opportunities in various fields.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 4,
            title: "Cultural Fest",
            category: "fest",
            date: "2023-12-10",
            time: "9:00 AM",
            location: "Open Air Theater",
            description: "Experience diverse cultures through music, dance, and food from around the world.",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 5,
            title: "Data Science Workshop",
            category: "workshop",
            date: "2023-10-28",
            time: "3:00 PM",
            location: "Computer Lab 1",
            description: "Introduction to data science concepts and tools like Python, Pandas, and Matplotlib.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 6,
            title: "Entrepreneurship Seminar",
            category: "seminar",
            date: "2023-11-22",
            time: "1:00 PM",
            location: "Business School Auditorium",
            description: "Successful entrepreneurs share their journey and tips for starting your own business.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ];

    // DOM Elements
    const eventsGrid = document.querySelector('.events-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const switchToRegister = document.querySelector('.switch-to-register');
    const switchToLogin = document.querySelector('.switch-to-login');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');

    // Display events
    function displayEvents(filter = 'all') {
        eventsGrid.innerHTML = '';
        
        const filteredEvents = filter === 'all' 
            ? events 
            : events.filter(event => event.category === filter);
        
        filteredEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-image">
                    <img src="${event.image}" alt="${event.title}">
                </div>
                <div class="event-info">
                    <span class="event-category ${event.category}">${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-meta">
                        <p><i class="fas fa-calendar-alt"></i> ${formatDate(event.date)}</p>
                        <p><i class="fas fa-clock"></i> ${event.time}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    </div>
                    <p>${event.description}</p>
                    <div class="event-actions">
                        <span class="event-date">${formatShortDate(event.date)}</span>
                        <button class="btn primary-btn" data-id="${event.id}">Register</button>
                    </div>
                </div>
            `;
            eventsGrid.appendChild(eventCard);
        });
        
        // Add event listeners to register buttons
        document.querySelectorAll('.event-actions .btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const eventId = this.getAttribute('data-id');
                const event = events.find(e => e.id == eventId);
                alert(`You have registered for "${event.title}" on ${formatDate(event.date)} at ${event.time}`);
            });
        });
    }

    // Format date to display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Format short date
    function formatShortDate(dateString) {
        const options = { month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Filter events
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter events
            const filter = this.getAttribute('data-filter');
            displayEvents(filter);
        });
    });

    // Modal functions
    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event listeners for modals
    loginBtn.addEventListener('click', () => openModal(loginModal));
    registerBtn.addEventListener('click', () => openModal(registerModal));

    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Switch between login and register modals
    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });

    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                }
            }
        });
    });

    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Login functionality will be implemented in the backend');
        closeModal(loginModal);
    });

    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Registration functionality will be implemented in the backend');
        closeModal(registerModal);
    });

    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });

    // Initialize
    displayEvents();
});