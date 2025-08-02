// ODYSSEY Settings System
// Visual customization and configuration management

document.addEventListener('DOMContentLoaded', function() {
    initSettingsPanel();
});

// Global settings object
let currentSettings = {
    colors: {
        primaryDark: '#0a1929',
        primaryBlue: '#1e3a5f',
        primaryCyan: '#4dd0e1',
        accentCyan: '#26c6da',
        lightCyan: '#80deea'
    },
    typography: {
        fontFamily: 'Inter',
        headingSize: 32,
        bodySize: 16,
        smallSize: 14
    },
    branding: {
        logoType: 'icon',
        logoIcon: 'fa-ship',
        logoImage: null,
        logoColor: '#4dd0e1',
        logoBg: '#26c6da'
    },
    layout: {
        borderRadius: 12,
        spacingSmall: 8,
        spacingMedium: 16,
        spacingLarge: 32,
        animationSpeed: 'normal'
    },
    theme: 'light'
};

function initSettingsPanel() {
    // Check authentication
    checkAuthentication();
    
    // Load saved settings
    loadSettings();
    
    // Initialize UI components
    initTabNavigation();
    initColorControls();
    initTypographyControls();
    initBrandingControls();
    initLayoutControls();
    initExportImport();
    initActionButtons();
    
    // Load user data
    loadUserData();
    
    console.log('🎨 ODYSSEY Settings Panel initialized!');
}

function checkAuthentication() {
    const sessionData = getSessionData();
    
    if (!sessionData || !sessionData.isAuthenticated) {
        window.location.href = 'login.html';
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

function loadUserData() {
    const sessionData = getSessionData();
    if (!sessionData) return;
    
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = sessionData.username === 'admin' ? 'Administrador' : sessionData.username;
    }
}

// Tab Navigation
function initTabNavigation() {
    const tabs = document.querySelectorAll('.settings-tab');
    const panels = document.querySelectorAll('.settings-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active panel
            panels.forEach(p => p.classList.remove('active'));
            document.getElementById(targetTab).classList.add('active');
            
            // Track tab change
            trackEvent('settings_tab_change', { tab: targetTab });
        });
    });
}

// Color Controls
function initColorControls() {
    // Color presets
    const presets = document.querySelectorAll('.preset');
    presets.forEach(preset => {
        preset.addEventListener('click', function() {
            const presetName = this.dataset.preset;
            applyColorPreset(presetName);
            
            presets.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            
            updateColorInputs();
            applyLivePreview();
        });
    });
    
    // Custom color inputs
    const colorInputs = document.querySelectorAll('input[type="color"]');
    colorInputs.forEach(input => {
        input.addEventListener('input', function() {
            const colorName = this.id;
            const hexInput = document.getElementById(colorName + 'Hex');
            
            hexInput.value = this.value;
            updateSettingsColor(colorName, this.value);
            applyLivePreview();
        });
    });
    
    // Hex inputs
    const hexInputs = document.querySelectorAll('input[type="text"][id$="Hex"]');
    hexInputs.forEach(input => {
        input.addEventListener('input', function() {
            const colorName = this.id.replace('Hex', '');
            const colorInput = document.getElementById(colorName);
            
            if (isValidHex(this.value)) {
                colorInput.value = this.value;
                updateSettingsColor(colorName, this.value);
                applyLivePreview();
            }
        });
    });
    
    // Theme selector
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            
            themeOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            currentSettings.theme = theme;
            applyTheme(theme);
            applyLivePreview();
        });
    });
}

function applyColorPreset(presetName) {
    const presets = {
        odyssey: {
            primaryDark: '#0a1929',
            primaryBlue: '#1e3a5f',
            primaryCyan: '#4dd0e1',
            accentCyan: '#26c6da'
        },
        ocean: {
            primaryDark: '#1a237e',
            primaryBlue: '#303f9f',
            primaryCyan: '#00bcd4',
            accentCyan: '#4fc3f7'
        },
        sunset: {
            primaryDark: '#e65100',
            primaryBlue: '#f57c00',
            primaryCyan: '#ff9800',
            accentCyan: '#ffc107'
        },
        forest: {
            primaryDark: '#1b5e20',
            primaryBlue: '#388e3c',
            primaryCyan: '#4caf50',
            accentCyan: '#8bc34a'
        }
    };
    
    if (presets[presetName]) {
        Object.assign(currentSettings.colors, presets[presetName]);
    }
}

function updateSettingsColor(colorName, value) {
    const colorMap = {
        primaryDark: 'primaryDark',
        primaryBlue: 'primaryBlue',
        primaryCyan: 'primaryCyan',
        accentCyan: 'accentCyan',
        logoColor: 'logoColor',
        logoBg: 'logoBg'
    };
    
    if (colorMap[colorName]) {
        if (colorName.startsWith('logo')) {
            currentSettings.branding[colorMap[colorName]] = value;
        } else {
            currentSettings.colors[colorMap[colorName]] = value;
        }
    }
}

function updateColorInputs() {
    Object.keys(currentSettings.colors).forEach(colorName => {
        const input = document.getElementById(colorName);
        const hexInput = document.getElementById(colorName + 'Hex');
        
        if (input && hexInput) {
            input.value = currentSettings.colors[colorName];
            hexInput.value = currentSettings.colors[colorName];
        }
    });
}

function isValidHex(hex) {
    return /^#([A-Fa-f0-9]{6})$/.test(hex);
}

// Typography Controls
function initTypographyControls() {
    // Font family selector
    const fontOptions = document.querySelectorAll('.font-option');
    fontOptions.forEach(option => {
        option.addEventListener('click', function() {
            const fontFamily = this.dataset.font;
            
            fontOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            currentSettings.typography.fontFamily = fontFamily;
            applyTypography();
            applyLivePreview();
        });
    });
    
    // Font size sliders
    const sizeSliders = ['headingSize', 'bodySize', 'smallSize'];
    sizeSliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        const valueDisplay = slider.nextElementSibling;
        
        slider.addEventListener('input', function() {
            const value = parseInt(this.value);
            valueDisplay.textContent = value + 'px';
            
            currentSettings.typography[sliderId] = value;
            applyTypography();
            applyLivePreview();
        });
    });
}

function applyTypography() {
    const { fontFamily, headingSize, bodySize, smallSize } = currentSettings.typography;
    
    // Apply to preview
    const preview = document.querySelector('.typography-preview');
    if (preview) {
        preview.style.fontFamily = `'${fontFamily}', sans-serif`;
        
        const h1 = preview.querySelector('.preview-h1');
        const h2 = preview.querySelector('.preview-h2');
        const body = preview.querySelector('.preview-body');
        const small = preview.querySelector('.preview-small');
        
        if (h1) h1.style.fontSize = headingSize + 'px';
        if (h2) h2.style.fontSize = (headingSize * 0.75) + 'px';
        if (body) body.style.fontSize = bodySize + 'px';
        if (small) small.style.fontSize = smallSize + 'px';
    }
}

// Branding Controls
function initBrandingControls() {
    // Logo upload
    const logoUpload = document.getElementById('logoUpload');
    logoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = e.target.result;
                currentSettings.branding.logoType = 'image';
                currentSettings.branding.logoImage = imageData;
                
                updateLogoPreview();
                applyLivePreview();
                showToast('Logo subido correctamente');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Reset logo
    const resetLogo = document.getElementById('resetLogo');
    resetLogo.addEventListener('click', function() {
        currentSettings.branding.logoType = 'icon';
        currentSettings.branding.logoImage = null;
        currentSettings.branding.logoIcon = 'fa-ship';
        
        updateLogoPreview();
        applyLivePreview();
        showToast('Logo restaurado');
    });
    
    // Icon selector
    const iconOptions = document.querySelectorAll('.icon-option');
    iconOptions.forEach(option => {
        option.addEventListener('click', function() {
            const iconClass = this.dataset.icon;
            
            iconOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            currentSettings.branding.logoType = 'icon';
            currentSettings.branding.logoIcon = iconClass;
            currentSettings.branding.logoImage = null;
            
            updateLogoPreview();
            applyLivePreview();
        });
    });
    
    // Brand color inputs
    const brandColorInputs = ['logoColor', 'logoBg'];
    brandColorInputs.forEach(inputId => {
        const colorInput = document.getElementById(inputId);
        const hexInput = document.getElementById(inputId + 'Hex');
        
        colorInput.addEventListener('input', function() {
            hexInput.value = this.value;
            updateSettingsColor(inputId, this.value);
            updateLogoPreview();
            applyLivePreview();
        });
        
        hexInput.addEventListener('input', function() {
            if (isValidHex(this.value)) {
                colorInput.value = this.value;
                updateSettingsColor(inputId, this.value);
                updateLogoPreview();
                applyLivePreview();
            }
        });
    });
}

function updateLogoPreview() {
    const logoPreview = document.querySelector('.logo-preview');
    const logoIcon = document.getElementById('currentLogoIcon');
    const logoImg = document.getElementById('currentLogoImg');
    const logoInfo = document.querySelector('.logo-info small');
    
    if (currentSettings.branding.logoType === 'image' && currentSettings.branding.logoImage) {
        logoIcon.style.display = 'none';
        logoImg.style.display = 'block';
        logoImg.src = currentSettings.branding.logoImage;
        logoInfo.textContent = 'Imagen personalizada';
    } else {
        logoIcon.style.display = 'flex';
        logoImg.style.display = 'none';
        logoIcon.className = `fas ${currentSettings.branding.logoIcon}`;
        logoInfo.textContent = 'Icono por defecto';
    }
    
    // Update logo colors
    logoPreview.style.background = `linear-gradient(45deg, ${currentSettings.branding.logoBg}, ${currentSettings.branding.logoColor})`;
    logoIcon.style.color = '#ffffff';
}

// Layout Controls
function initLayoutControls() {
    // Border radius slider
    const borderRadiusSlider = document.getElementById('borderRadius');
    const borderValueDisplay = borderRadiusSlider.nextElementSibling;
    const borderPreview = document.querySelector('.border-preview .preview-card');
    
    borderRadiusSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        borderValueDisplay.textContent = value + 'px';
        currentSettings.layout.borderRadius = value;
        
        borderPreview.style.borderRadius = value + 'px';
        applyLivePreview();
    });
    
    // Spacing sliders
    const spacingSliders = ['spacingSmall', 'spacingMedium', 'spacingLarge'];
    spacingSliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        const valueDisplay = slider.nextElementSibling;
        
        slider.addEventListener('input', function() {
            const value = parseInt(this.value);
            valueDisplay.textContent = value + 'px';
            currentSettings.layout[sliderId] = value;
            applyLivePreview();
        });
    });
    
    // Animation speed selector
    const animationOptions = document.querySelectorAll('.animation-option');
    animationOptions.forEach(option => {
        option.addEventListener('click', function() {
            const speed = this.dataset.speed;
            
            animationOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            currentSettings.layout.animationSpeed = speed;
            applyAnimationSpeed(speed);
            applyLivePreview();
        });
    });
}

function applyAnimationSpeed(speed) {
    const speedMap = {
        fast: '0.2s',
        normal: '0.3s',
        slow: '0.5s'
    };
    
    document.documentElement.style.setProperty('--transition-speed', speedMap[speed]);
}

// Export/Import Functions
function initExportImport() {
    // Export configuration
    const exportBtn = document.getElementById('exportConfig');
    exportBtn.addEventListener('click', exportConfiguration);
    
    // Copy to clipboard
    const copyBtn = document.getElementById('copyConfig');
    copyBtn.addEventListener('click', copyToClipboard);
    
    // Import configuration
    const importInput = document.getElementById('importConfig');
    importInput.addEventListener('change', importConfiguration);
    
    // Reset to default
    const resetBtn = document.getElementById('resetConfig');
    resetBtn.addEventListener('click', resetToDefault);
}

function exportConfiguration() {
    const config = {
        ...currentSettings,
        exportDate: new Date().toISOString(),
        version: '1.0.0'
    };
    
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'odyssey-config.json';
    link.click();
    
    showToast('Configuración exportada correctamente');
    trackEvent('settings_exported');
}

function copyToClipboard() {
    const config = JSON.stringify(currentSettings, null, 2);
    
    navigator.clipboard.writeText(config).then(() => {
        showToast('Configuración copiada al portapapeles');
    }).catch(() => {
        showToast('Error al copiar configuración', 'error');
    });
}

function importConfiguration(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const config = JSON.parse(e.target.result);
            
            // Validate configuration structure
            if (validateConfiguration(config)) {
                currentSettings = { ...config };
                applyAllSettings();
                updateAllInputs();
                showToast('Configuración importada correctamente');
                trackEvent('settings_imported');
            } else {
                showToast('Archivo de configuración inválido', 'error');
            }
        } catch (error) {
            showToast('Error al leer el archivo', 'error');
        }
    };
    reader.readAsText(file);
}

function validateConfiguration(config) {
    return config &&
           config.colors &&
           config.typography &&
           config.branding &&
           config.layout;
}

function resetToDefault() {
    if (confirm('¿Estás seguro de que deseas restaurar la configuración por defecto?')) {
        currentSettings = {
            colors: {
                primaryDark: '#0a1929',
                primaryBlue: '#1e3a5f',
                primaryCyan: '#4dd0e1',
                accentCyan: '#26c6da',
                lightCyan: '#80deea'
            },
            typography: {
                fontFamily: 'Inter',
                headingSize: 32,
                bodySize: 16,
                smallSize: 14
            },
            branding: {
                logoType: 'icon',
                logoIcon: 'fa-ship',
                logoImage: null,
                logoColor: '#4dd0e1',
                logoBg: '#26c6da'
            },
            layout: {
                borderRadius: 12,
                spacingSmall: 8,
                spacingMedium: 16,
                spacingLarge: 32,
                animationSpeed: 'normal'
            },
            theme: 'light'
        };
        
        applyAllSettings();
        updateAllInputs();
        showToast('Configuración restaurada por defecto');
        trackEvent('settings_reset');
    }
}

// Action Buttons
function initActionButtons() {
    // Apply settings
    const applyBtn = document.getElementById('applySettings');
    applyBtn.addEventListener('click', applySettings);
    
    // Preview settings
    const previewBtn = document.getElementById('previewSettings');
    previewBtn.addEventListener('click', previewSettings);
    
    // Reset changes
    const resetBtn = document.getElementById('resetSettings');
    resetBtn.addEventListener('click', resetChanges);
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

function applySettings() {
    saveSettings();
    applyAllSettings();
    showToast('Configuración aplicada correctamente');
    trackEvent('settings_applied');
}

function previewSettings() {
    applyAllSettings();
    showToast('Vista previa aplicada');
}

function resetChanges() {
    loadSettings();
    updateAllInputs();
    applyAllSettings();
    showToast('Cambios deshechos');
}

// Settings Management
function saveSettings() {
    localStorage.setItem('odysseySettings', JSON.stringify(currentSettings));
}

function loadSettings() {
    const saved = localStorage.getItem('odysseySettings');
    if (saved) {
        try {
            currentSettings = { ...currentSettings, ...JSON.parse(saved) };
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }
}

function applyAllSettings() {
    applyColors();
    applyTypography();
    applyBranding();
    applyLayout();
    applyTheme(currentSettings.theme);
}

function applyColors() {
    const { primaryDark, primaryBlue, primaryCyan, accentCyan } = currentSettings.colors;
    
    document.documentElement.style.setProperty('--primary-dark', primaryDark);
    document.documentElement.style.setProperty('--primary-blue', primaryBlue);
    document.documentElement.style.setProperty('--primary-cyan', primaryCyan);
    document.documentElement.style.setProperty('--accent-cyan', accentCyan);
    
    // Update gradients
    document.documentElement.style.setProperty('--gradient-primary', 
        `linear-gradient(135deg, ${primaryDark} 0%, ${primaryBlue} 50%, ${primaryCyan} 100%)`);
    document.documentElement.style.setProperty('--gradient-accent', 
        `linear-gradient(45deg, ${accentCyan}, ${primaryCyan})`);
}

function applyBranding() {
    // Update all logo instances
    const logoIcons = document.querySelectorAll('.brand-logo i, .footer-logo i, #headerLogoIcon');
    const logoContainers = document.querySelectorAll('.brand-logo, .footer-logo');
    
    if (currentSettings.branding.logoType === 'icon') {
        logoIcons.forEach(icon => {
            icon.className = `fas ${currentSettings.branding.logoIcon}`;
            icon.style.display = 'block';
        });
        
        // Hide any custom images
        const logoImages = document.querySelectorAll('.brand-logo img, .footer-logo img');
        logoImages.forEach(img => img.style.display = 'none');
    }
    
    // Update logo colors
    logoContainers.forEach(container => {
        container.style.background = `linear-gradient(45deg, ${currentSettings.branding.logoBg}, ${currentSettings.branding.logoColor})`;
    });
}

function applyLayout() {
    const { borderRadius, spacingSmall, spacingMedium, spacingLarge, animationSpeed } = currentSettings.layout;
    
    document.documentElement.style.setProperty('--border-radius', borderRadius + 'px');
    document.documentElement.style.setProperty('--spacing-small', spacingSmall + 'px');
    document.documentElement.style.setProperty('--spacing-medium', spacingMedium + 'px');
    document.documentElement.style.setProperty('--spacing-large', spacingLarge + 'px');
    
    applyAnimationSpeed(animationSpeed);
}

function applyTheme(theme) {
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    
    if (theme === 'dark') {
        document.body.classList.add('theme-dark');
    } else if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.add(prefersDark ? 'theme-dark' : 'theme-light');
    } else {
        document.body.classList.add('theme-light');
    }
}

function applyLivePreview() {
    // Update live preview window
    const previewWindow = document.querySelector('.preview-window');
    if (previewWindow) {
        const previewHeader = previewWindow.querySelector('.preview-header');
        const previewLogo = previewWindow.querySelector('.preview-logo');
        const previewCard = previewWindow.querySelector('.preview-card');
        const previewBtn = previewWindow.querySelector('.preview-btn');
        
        if (previewHeader) {
            previewHeader.style.background = `linear-gradient(135deg, ${currentSettings.colors.primaryDark}, ${currentSettings.colors.primaryBlue})`;
        }
        
        if (previewLogo && currentSettings.branding.logoType === 'icon') {
            const logoIcon = previewLogo.querySelector('i');
            if (logoIcon) {
                logoIcon.className = `fas ${currentSettings.branding.logoIcon}`;
            }
        }
        
        if (previewCard) {
            previewCard.style.borderRadius = currentSettings.layout.borderRadius + 'px';
        }
        
        if (previewBtn) {
            previewBtn.style.background = `linear-gradient(45deg, ${currentSettings.colors.accentCyan}, ${currentSettings.colors.primaryCyan})`;
            previewBtn.style.borderRadius = (currentSettings.layout.borderRadius * 0.5) + 'px';
        }
    }
}

function updateAllInputs() {
    // Update color inputs
    updateColorInputs();
    
    // Update typography inputs
    const fontOptions = document.querySelectorAll('.font-option');
    fontOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.font === currentSettings.typography.fontFamily);
    });
    
    ['headingSize', 'bodySize', 'smallSize'].forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        const valueDisplay = slider.nextElementSibling;
        
        slider.value = currentSettings.typography[sliderId];
        valueDisplay.textContent = currentSettings.typography[sliderId] + 'px';
    });
    
    // Update branding inputs
    updateLogoPreview();
    
    const iconOptions = document.querySelectorAll('.icon-option');
    iconOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.icon === currentSettings.branding.logoIcon);
    });
    
    // Update layout inputs
    const borderRadiusSlider = document.getElementById('borderRadius');
    const borderValueDisplay = borderRadiusSlider.nextElementSibling;
    borderRadiusSlider.value = currentSettings.layout.borderRadius;
    borderValueDisplay.textContent = currentSettings.layout.borderRadius + 'px';
    
    ['spacingSmall', 'spacingMedium', 'spacingLarge'].forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        const valueDisplay = slider.nextElementSibling;
        
        slider.value = currentSettings.layout[sliderId];
        valueDisplay.textContent = currentSettings.layout[sliderId] + 'px';
    });
    
    // Update theme selector
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.theme === currentSettings.theme);
    });
}

// Utility Functions
function showToast(message, type = 'success') {
    const toast = document.getElementById('settingsToast');
    const icon = toast.querySelector('i');
    const text = toast.querySelector('span');
    
    // Update content
    text.textContent = message;
    
    // Update style based on type
    if (type === 'error') {
        toast.style.background = '#f44336';
        icon.className = 'fas fa-exclamation-circle';
    } else {
        toast.style.background = '#4caf50';
        icon.className = 'fas fa-check-circle';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function trackEvent(eventName, properties = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    console.log(`📊 Settings event: ${eventName}`, properties);
}

function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        localStorage.removeItem('odysseySession');
        sessionStorage.removeItem('odysseySession');
        window.location.href = 'login.html';
    }
}

// Initialize settings on load
window.addEventListener('load', function() {
    loadSettings();
    applyAllSettings();
    updateAllInputs();
});

// Auto-save settings periodically
setInterval(() => {
    if (document.visibilityState === 'visible') {
        saveSettings();
    }
}, 30000); // Save every 30 seconds

console.log('🎨 ODYSSEY Settings System loaded successfully!');

// Export functions for global access
window.applySettings = applySettings;
window.exportConfiguration = exportConfiguration;