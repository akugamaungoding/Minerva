// ProjectHub - Main JavaScript Functions

// Global Variables
let currentUser = null;
let currentRole = null;

// Role selection function
function selectRole(role) {
    document.querySelectorAll('.role-option').forEach(option => {
        option.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    document.querySelector(`input[value="${role}"]`).checked = true;
}

// Login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.querySelector('input[name="role"]:checked').value;
            
            // Simple validation (in real app, validate against server)
            if (username && password) {
                currentUser = username;
                currentRole = role;
                showDashboard();
            } else {
                alert('Mohon isi semua field!');
            }
        });
    }
});

// Show dashboard function
function showDashboard() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    
    document.getElementById('currentUser').textContent = currentUser;
    document.getElementById('welcomeUser').textContent = currentUser;
    
    // Load role-specific functionality
    if (currentRole === 'admin') {
        loadAdminDashboard();
    } else {
        loadClientDashboard();
    }
}

// Logout function
function logout() {
    currentUser = null;
    currentRole = null;
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('dashboardSection').style.display = 'none';
    document.getElementById('loginForm').reset();
    document.querySelector('.role-option').classList.add('active');
    document.querySelectorAll('.role-option')[1].classList.remove('active');
}

// Common module opening function
function openModule(moduleName) {
    const moduleDisplayName = moduleName.replace('_', ' ').toUpperCase();
    alert(`Membuka modul: ${moduleDisplayName}\n\nFitur ini akan diimplementasikan dalam pengembangan selanjutnya.`);
}

// Setup navigation based on role
function setupNavigation(menuItems) {
    const navMenu = document.getElementById('navMenu');
    navMenu.innerHTML = '';
    
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.innerHTML = `
            <a class="nav-link" href="${item.href}">
                <i class="${item.icon} me-1"></i>${item.name}
            </a>
        `;
        navMenu.appendChild(li);
    });
}

// Setup dashboard content
function setupDashboard(menuItems) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';
    
    menuItems.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
            <div class="card dashboard-card ${currentRole}-card h-100 fade-in">
                <div class="card-body text-center p-4">
                    <div class="card-icon">
                        <i class="${item.icon}"></i>
                    </div>
                    <h5 class="card-title text-${item.color}">${item.name}</h5>
                    <p class="card-text text-muted">${item.description}</p>
                    <button class="btn btn-outline-${item.color}" onclick="openModule('${item.name.toLowerCase().replace(' ', '_')}')">
                        <i class="fas fa-arrow-right me-2"></i>Buka
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(col);
    });
}

// Utility function to format module names
function formatModuleName(name) {
    return name.toLowerCase().replace(/\s+/g, '_');
}

// Animation helper functions
function addFadeInAnimation(element) {
    element.classList.add('fade-in');
}

function addSlideInAnimation(element) {
    element.classList.add('slide-in');
}

// Error handling
function showError(message) {
    alert('Error: ' + message);
}

// Success message
function showSuccess(message) {
    // You can implement a toast notification here
    console.log('Success: ' + message);
}
