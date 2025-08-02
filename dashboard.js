// ODYSSEY Dashboard System
// Main dashboard functionality and service management

document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
});

function initDashboard() {
    // Check authentication first
    checkAuthentication();
    
    // Initialize dashboard components
    initUserInterface();
    initServiceCards();
    initNotifications();
    initQuickActions();
    
    // Load user data
    loadUserData();
    
    console.log('🚢 ODYSSEY Dashboard initialized successfully!');
}

function checkAuthentication() {
    const sessionData = getSessionData();
    
    if (!sessionData || !sessionData.isAuthenticated) {
        // User not authenticated, redirect to login
        window.location.href = 'login.html';
        return;
    }
    
    // Check session expiry (optional - 24 hours)
    const loginTime = new Date(sessionData.loginTime);
    const now = new Date();
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
        // Session expired
        logout();
        return;
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

function initUserInterface() {
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            showConfirmDialog('¿Estás seguro que deseas cerrar sesión?', logout);
        });
    }
    
    // Notifications button
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', toggleNotifications);
    }
    
    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            showNotification('Configuración próximamente disponible', 'info');
        });
    }
}

function loadUserData() {
    const sessionData = getSessionData();
    if (!sessionData) return;
    
    // Update user name in UI
    const userNameElements = document.querySelectorAll('#userName, #welcomeUserName');
    userNameElements.forEach(element => {
        if (element) {
            element.textContent = sessionData.username === 'admin' ? 'Administrador' : sessionData.username;
        }
    });
    
    // Update last login time
    const lastLoginElement = document.getElementById('lastLogin');
    if (lastLoginElement) {
        const loginTime = new Date(sessionData.loginTime);
        const now = new Date();
        const diffHours = Math.floor((now - loginTime) / (1000 * 60 * 60));
        
        if (diffHours < 1) {
            lastLoginElement.textContent = 'Hace unos minutos';
        } else if (diffHours < 24) {
            lastLoginElement.textContent = `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
        } else {
            lastLoginElement.textContent = loginTime.toLocaleDateString();
        }
    }
}

function initServiceCards() {
    // Add click animations to service cards
    const serviceCards = document.querySelectorAll('.service-card:not(.add-service-card)');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Simulate real-time service status updates
    updateServiceStatus();
    setInterval(updateServiceStatus, 30000); // Update every 30 seconds
}

function updateServiceStatus() {
    const services = ['nextcloud', 'chatgpt', 'calendar', 'gmail'];
    
    services.forEach(service => {
        const statusElement = document.querySelector(`[data-service="${service}"] .service-status`);
        if (statusElement) {
            // Simulate random status (95% online)
            const isOnline = Math.random() > 0.05;
            statusElement.className = `service-status ${isOnline ? 'online' : 'offline'}`;
            
            const icon = statusElement.querySelector('i');
            if (icon) {
                icon.style.color = isOnline ? '#4caf50' : '#f44336';
            }
        }
    });
}

// Service Management Functions
function openService(serviceName) {
    showLoadingOverlay();
    
    // Track service access
    trackEvent('service_access', {
        service: serviceName,
        timestamp: new Date().toISOString()
    });
    
    // Service URLs (replace with your actual service URLs)
    const serviceUrls = {
        'nextcloud': 'https://your-nextcloud-instance.com',
        'chatgpt': 'https://chat.openai.com',
        'calendar': 'https://calendar.google.com',
        'gmail': 'https://gmail.com'
    };
    
    // Simulate loading delay
    setTimeout(() => {
        hideLoadingOverlay();
        
        if (serviceUrls[serviceName]) {
            window.open(serviceUrls[serviceName], '_blank');
            showNotification(`Abriendo ${getServiceDisplayName(serviceName)}...`, 'success');
        } else {
            showNotification(`Servicio ${serviceName} no configurado`, 'error');
        }
    }, 1500);
}

function configureService(serviceName) {
    showNotification(`Configuración de ${getServiceDisplayName(serviceName)} próximamente`, 'info');
}

function addNewService() {
    showNotification('Función de agregar servicios próximamente disponible', 'info');
}

function getServiceDisplayName(serviceName) {
    const displayNames = {
        'nextcloud': 'Nextcloud',
        'chatgpt': 'ChatGPT',
        'calendar': 'Google Calendar',
        'gmail': 'Gmail'
    };
    return displayNames[serviceName] || serviceName;
}

// Quick Actions
function initQuickActions() {
    // Add hover effects to quick actions
    const quickActions = document.querySelectorAll('.quick-action');
    quickActions.forEach(action => {
        action.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function refreshServices() {
    showNotification('Actualizando servicios...', 'info');
    
    // Simulate refresh
    const serviceCards = document.querySelectorAll('.service-card:not(.add-service-card)');
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = 'fadeInUp 0.6s ease-out';
        }, index * 100);
    });
    
    updateServiceStatus();
    
    setTimeout(() => {
        showNotification('Servicios actualizados correctamente', 'success');
    }, 2000);
}

function showSystemStatus() {
    const statusInfo = `
        🚢 ODYSSEY Sistema v1.0.0
        ⚡ Estado: Operativo
        🔒 Seguridad: Activa
        📊 Rendimiento: Óptimo
        🌐 Conectividad: Estable
        
        Última actualización: ${new Date().toLocaleString()}
    `;
    
    showNotification(statusInfo, 'info');
}

function showLogs() {
    const logEntries = [
        '✅ Sistema iniciado correctamente',
        '🔐 Usuario admin autenticado',
        '📡 Servicios sincronizados',
        '🔄 Backup automático completado',
        '⚡ Rendimiento optimizado'
    ];
    
    showNotification(logEntries.join('\n'), 'info');
}

function showHelp() {
    const helpInfo = `
        🆘 AYUDA ODYSSEY
        
        🎯 Navegación:
        • Haz clic en "Abrir" para acceder a servicios
        • Usa los botones de configuración para ajustes
        • Revisa notificaciones regularmente
        
        🔧 Funciones:
        • Actualizar: Refresca el estado de servicios
        • Estado: Muestra información del sistema
        • Logs: Historial de actividades
        
        📞 Soporte: info@odyssey.com.ar
    `;
    
    showNotification(helpInfo, 'info');
}

function showAbout() {
    const aboutInfo = `
        🚢 ODYSSEY Dashboard v1.0.0
        
        Una plataforma moderna de gestión de servicios en la nube.
        Inspirada en la épica travesía de Ulises.
        
        Desarrollado con ❤️ para odyssey.com.ar
        
        © 2024 ODYSSEY. Todos los derechos reservados.
    `;
    
    showNotification(aboutInfo, 'info');
}

// Notifications System
function initNotifications() {
    // Close notifications when clicking outside
    document.addEventListener('click', function(e) {
        const notificationPanel = document.getElementById('notificationPanel');
        const notificationBtn = document.getElementById('notificationBtn');
        
        if (notificationPanel && notificationBtn) {
            if (!notificationPanel.contains(e.target) && !notificationBtn.contains(e.target)) {
                closeNotifications();
            }
        }
    });
}

function toggleNotifications() {
    const panel = document.getElementById('notificationPanel');
    if (panel) {
        panel.classList.toggle('active');
        
        // Mark notifications as read when opened
        if (panel.classList.contains('active')) {
            setTimeout(() => {
                const badge = document.querySelector('.notification-badge');
                if (badge) {
                    badge.style.opacity = '0';
                    setTimeout(() => {
                        badge.textContent = '0';
                        badge.style.display = 'none';
                    }, 300);
                }
            }, 1000);
        }
    }
}

function closeNotifications() {
    const panel = document.getElementById('notificationPanel');
    if (panel) {
        panel.classList.remove('active');
    }
}

// Loading Overlay
function showLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.dashboard-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `dashboard-notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 10001;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        white-space: pre-line;
        font-family: 'Inter', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function showConfirmDialog(message, callback) {
    const confirmed = confirm(message);
    if (confirmed && callback) {
        callback();
    }
}

function logout() {
    // Clear session data
    localStorage.removeItem('odysseySession');
    sessionStorage.removeItem('odysseySession');
    
    // Track logout event
    trackEvent('user_logout', {
        timestamp: new Date().toISOString(),
        page: 'dashboard'
    });
    
    // Show logout message
    showNotification('Cerrando sesión...', 'info');
    
    // Redirect after short delay
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

function trackEvent(eventName, properties) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Console log for development
    console.log(`📊 Event tracked: ${eventName}`, properties);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + L = Logout
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        showConfirmDialog('¿Cerrar sesión con Ctrl+L?', logout);
    }
    
    // Ctrl/Cmd + R = Refresh services
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refreshServices();
    }
    
    // Escape = Close notifications
    if (e.key === 'Escape') {
        closeNotifications();
    }
});

// Auto-refresh dashboard every 5 minutes
setInterval(() => {
    if (document.visibilityState === 'visible') {
        updateServiceStatus();
        console.log('🔄 Dashboard auto-refreshed');
    }
}, 5 * 60 * 1000);

// Handle visibility change
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Refresh when tab becomes visible
        updateServiceStatus();
    }
});

// Console welcome message
console.log(`
🚢 ODYSSEY Dashboard v1.0.0
⚓ Welcome aboard, Captain!
🌊 All systems operational

Keyboard shortcuts:
• Ctrl+L: Logout
• Ctrl+R: Refresh services  
• Escape: Close notifications

Ready to navigate the digital seas! 🌊
`);

// Export functions for global access
window.openService = openService;
window.configureService = configureService;
window.addNewService = addNewService;
window.refreshServices = refreshServices;
window.showSystemStatus = showSystemStatus;
window.showLogs = showLogs;
window.showHelp = showHelp;
window.showAbout = showAbout;
window.closeNotifications = closeNotifications;
window.logout = logout;