// ODYSSEY Login System
// Authentication and session management

document.addEventListener('DOMContentLoaded', function() {
    initLoginSystem();
});

function initLoginSystem() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const loginError = document.getElementById('loginError');

    // Check if user is already logged in
    checkExistingSession();

    // Password toggle functionality
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Enter key support
    [usernameInput, passwordInput].forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleLogin();
                }
            });
        }
    });

    // Auto-focus username field
    if (usernameInput) {
        usernameInput.focus();
    }
}

function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const loginBtn = document.getElementById('loginBtn');
    const loginError = document.getElementById('loginError');

    // Hide previous errors
    hideError();

    // Validate inputs
    if (!username || !password) {
        showError('Por favor completa todos los campos');
        return;
    }

    // Show loading state
    setLoadingState(true);

    // Simulate authentication delay for better UX
    setTimeout(() => {
        if (authenticateUser(username, password)) {
            // Success
            createUserSession(username, rememberMe);
            showSuccessAndRedirect();
        } else {
            // Failure
            setLoadingState(false);
            showError('Usuario o contraseña incorrectos');
            
            // Clear password field
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
        }
    }, 1000);
}

function authenticateUser(username, password) {
    // Hardcoded admin credentials (in production, this should be server-side)
    const validCredentials = {
        'admin': 'admin'
        // Add more users here if needed
    };

    return validCredentials.hasOwnProperty(username.toLowerCase()) && 
           validCredentials[username.toLowerCase()] === password;
}

function createUserSession(username, rememberMe) {
    const sessionData = {
        username: username,
        loginTime: new Date().toISOString(),
        isAuthenticated: true
    };

    // Store session data
    if (rememberMe) {
        localStorage.setItem('odysseySession', JSON.stringify(sessionData));
    } else {
        sessionStorage.setItem('odysseySession', JSON.stringify(sessionData));
    }

    // Track login event
    trackLoginEvent(username);
}

function checkExistingSession() {
    const sessionData = getSessionData();
    
    if (sessionData && sessionData.isAuthenticated) {
        // User is already logged in, redirect to dashboard
        window.location.href = 'dashboard.html';
    }
}

function getSessionData() {
    const localData = localStorage.getItem('odysseySession');
    const sessionData = sessionStorage.getItem('odysseySession');
    
    if (localData) {
        return JSON.parse(localData);
    } else if (sessionData) {
        return JSON.parse(sessionData);
    }
    
    return null;
}

function setLoadingState(loading) {
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnIcon = loginBtn.querySelector('.btn-icon');

    if (loading) {
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        btnText.textContent = 'Verificando...';
        btnIcon.className = 'fas fa-spinner btn-icon';
    } else {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        btnText.textContent = 'Iniciar Sesión';
        btnIcon.className = 'fas fa-arrow-right btn-icon';
    }
}

function showError(message) {
    const loginError = document.getElementById('loginError');
    const errorSpan = loginError.querySelector('span');
    
    errorSpan.textContent = message;
    loginError.style.display = 'flex';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    const loginError = document.getElementById('loginError');
    loginError.style.display = 'none';
}

function showSuccessAndRedirect() {
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnIcon = loginBtn.querySelector('.btn-icon');

    // Show success state
    btnText.textContent = '¡Bienvenido!';
    btnIcon.className = 'fas fa-check btn-icon';
    loginBtn.style.background = 'linear-gradient(45deg, #4caf50, #66bb6a)';

    // Add success animation
    loginBtn.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        loginBtn.style.transform = 'scale(1)';
    }, 200);

    // Redirect after short delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

function trackLoginEvent(username) {
    // Analytics tracking
    if (typeof trackEvent === 'function') {
        trackEvent('user_login', {
            username: username,
            timestamp: new Date().toISOString(),
            page: 'login'
        });
    }

    console.log(`🚢 ODYSSEY: Usuario ${username} ha iniciado sesión`);
}

// Utility function to logout (can be called from other pages)
function logout() {
    localStorage.removeItem('odysseySession');
    sessionStorage.removeItem('odysseySession');
    
    // Track logout event
    if (typeof trackEvent === 'function') {
        trackEvent('user_logout', {
            timestamp: new Date().toISOString()
        });
    }
    
    window.location.href = 'login.html';
}

// Security: Clear sensitive data on page unload
window.addEventListener('beforeunload', function() {
    // Clear password field
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.value = '';
    }
});

// Prevent back button after login
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});

// Add some Easter eggs for fun
let konamiSequence = [];
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiSequence.push(e.keyCode);
    
    if (konamiSequence.length > konamiCode.length) {
        konamiSequence.shift();
    }
    
    if (konamiSequence.length === konamiCode.length && 
        konamiSequence.every((code, index) => code === konamiCode[index])) {
        
        // Easter egg: Auto-fill admin credentials
        document.getElementById('username').value = 'admin';
        document.getElementById('password').value = 'admin';
        document.getElementById('rememberMe').checked = true;
        
        // Show fun message
        const loginCard = document.querySelector('.login-card');
        loginCard.style.animation = 'none';
        loginCard.style.transform = 'scale(1.1) rotate(5deg)';
        
        setTimeout(() => {
            loginCard.style.transform = 'scale(1) rotate(0deg)';
            loginCard.style.transition = 'transform 0.5s ease';
        }, 500);
        
        console.log('🎮 Konami Code activated! Admin credentials auto-filled.');
    }
});

// Console welcome message
console.log(`
🚢 ODYSSEY Login System v1.0.0
⚓ Ready to authenticate users
🌊 Navigating the digital seas...

Credentials for testing:
Username: admin
Password: admin
`);

// Export functions for global access
window.logout = logout;
window.getSessionData = getSessionData;