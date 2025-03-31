// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');
const tabBtns = document.querySelectorAll('.tab-btn');
const switchTabs = document.querySelectorAll('.switch-tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const searchForm = document.getElementById('searchForm');
const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('nav ul');

// Set minimum date to today for date input
document.getElementById('date').min = new Date().toISOString().split('T')[0];

// Toggle mobile navigation
hamburger.addEventListener('click', () => {
    navUl.style.display = navUl.style.display === 'flex' ? 'none' : 'flex';
});

// Open login modal
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Close login modal
closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal if clicked outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Tab switching in the modal
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        
        // Remove active class from all tab buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        
        // Add active class to the clicked button and corresponding pane
        btn.classList.add('active');
        document.getElementById(`${target}-pane`).classList.add('active');
    });
});

// Handle tab switching from links
switchTabs.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.dataset.tab;
        
        // Find and click the corresponding tab button
        document.querySelector(`.tab-btn[data-tab="${target}"]`).click();
    });
});

// ✅ Handle registration form submission (Backend connected)
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        fullName: document.getElementById('reg-fullname').value,
        email: document.getElementById('reg-email').value,
        username: document.getElementById('reg-username').value,
        phone: document.getElementById('reg-phone').value,
        city: document.getElementById('reg-city').value,
        password: document.getElementById('reg-password').value,
    };

    try {
        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        alert(result.message);

        if (res.status === 201) {
            registerForm.reset();
            document.querySelector('.tab-btn[data-tab="login"]').click();
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Registration failed. Please try again.');
    }
});

// ✅ Handle login form submission (For testing purposes)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    if (username === 'testuser' && password === 'password123') {
        alert('Login successful!');
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        loginBtn.textContent = 'My Account';
    } else {
        alert('Invalid username or password');
    }
});

// ✅ Handle search form submission (Backend connected)
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        from: document.getElementById('from').value,
        to: document.getElementById('to').value,
        date: document.getElementById('date').value,
    };

    if (!data.from || !data.to || !data.date) {
        alert('Please fill in all fields');
        return;
    }

    if (data.from === data.to) {
        alert('Source and destination cannot be the same');
        return;
    }

    try {
        const res = await fetch('http://localhost:5000/api/booking/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const buses = await res.json();
        console.log(buses);

        if (buses.length > 0) {
            alert(`Found ${buses.length} buses from ${data.from} to ${data.to} on ${data.date}`);
        } else {
            alert('No buses found for the selected route and date.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Failed to search for buses. Please try again.');
    }
});

// ✅ Handle booking buttons
const bookButtons = document.querySelectorAll('.btn-book');
bookButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const route = btn.closest('.route-card').querySelector('.cities').textContent.trim();
        
        if (loginBtn.textContent === 'Login') {
            alert('Please login to book tickets');
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            alert(`Booking process started for ${route}`);
            // In a real application, redirect to booking page here
        }
    });
});

// ✅ Add current date to footer
document.querySelector('.footer-bottom p').textContent += ` | ${new Date().toDateString()}`;


document.addEventListener("DOMContentLoaded", function () {
    let printTicketButton = document.getElementById("print-ticket");

    if (printTicketButton) {
        printTicketButton.addEventListener("click", function () {
            window.location.href = "print_ticket.html"; // Redirect to print ticket page
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchButton").addEventListener("click", searchBuses);
});

document.getElementById("busSearchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    let fromCity = document.getElementById("fromCity").value;
    let toCity = document.getElementById("toCity").value;
    let travelDate = document.getElementById("travelDate").value;

    if (!fromCity || !toCity || !travelDate) {
        alert("Please select all fields.");
        return;
    }

    // Show loading screen
    document.getElementById("loadingScreen").style.display = "block";

    // Simulate API Call (Replace with actual API)
    setTimeout(() => {
        document.getElementById("loadingScreen").style.display = "none";
        
        // Redirect to results page with query parameters
        window.location.href = `bus_results.html?from=${fromCity}&to=${toCity}&date=${travelDate}`;
    }, 2000);
});
