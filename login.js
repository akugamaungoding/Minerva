let currentUser = null;
let currentRole = null;
let currentTheme = 'light';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    loadTheme();
});

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (username && password) {
        currentRole = determineRole(username);
        currentUser = username;
        
        // Store user info in localStorage for dashboard
        localStorage.setItem('currentUser', currentUser);
        localStorage.setItem('currentRole', currentRole);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Mohon isi semua field!',
            confirmButtonText: 'OK'
        });
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (username && email && password && confirmPassword) {
        if (password === confirmPassword) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Registrasi berhasil! Silakan login dengan akun baru Anda.',
                confirmButtonText: 'OK'
            });
            showLoginForm();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Password tidak cocok!',
                confirmButtonText: 'OK'
            });
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Mohon isi semua field!',
            confirmButtonText: 'OK'
        });
    }
}

function determineRole(username) {
    if (username.toLowerCase().includes('admin') || username.toLowerCase().includes('administrator')) {
        return 'admin';
    } else {
        return 'client';
    }
}

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('authToggle').innerHTML = 'Belum punya akun? <a href="#" onclick="showRegisterForm()">Daftar di sini</a>';
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('authToggle').innerHTML = 'Sudah punya akun? <a href="#" onclick="showLoginForm()">Login di sini</a>';
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    const themeIcon = document.getElementById('themeIcon');
    
    if (currentTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const themeIcon = document.getElementById('themeIcon');
    
    if (currentTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}
