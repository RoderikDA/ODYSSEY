// ODYSSEY Turnero System
// Complete appointment and scheduling management system

document.addEventListener('DOMContentLoaded', function() {
    initTurneroSystem();
});

// Global data structures
let services = [];
let timeSlots = [];
let appointments = [];
let currentDate = new Date();

// Initialize the turnero system
function initTurneroSystem() {
    checkAuthentication();
    loadData();
    initUI();
    initEventListeners();
    updateStats();
    console.log('📅 ODYSSEY Turnero System initialized!');
}

// Authentication check
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

// Data management
function loadData() {
    // Load services
    const savedServices = localStorage.getItem('odysseyServices');
    if (savedServices) {
        services = JSON.parse(savedServices);
    } else {
        // Default services
        services = [
            { id: 1, name: 'Consulta General', duration: 60, color: '#4dd0e1', active: true },
            { id: 2, name: 'Servicio Técnico', duration: 60, color: '#26c6da', active: true },
            { id: 3, name: 'Asesoramiento', duration: 60, color: '#00bcd4', active: true }
        ];
        saveServices();
    }

    // Load time slots
    const savedTimeSlots = localStorage.getItem('odysseyTimeSlots');
    if (savedTimeSlots) {
        timeSlots = JSON.parse(savedTimeSlots);
    } else {
        // Default time slots (9:00 to 18:00, 60 min intervals)
        timeSlots = generateDefaultTimeSlots();
        saveTimeSlots();
    }

    // Load appointments
    const savedAppointments = localStorage.getItem('odysseyAppointments');
    if (savedAppointments) {
        appointments = JSON.parse(savedAppointments);
    }
}

function generateDefaultTimeSlots() {
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    
    for (let hour = startHour; hour < endHour; hour++) {
        slots.push({
            id: hour,
            time: `${hour.toString().padStart(2, '0')}:00`,
            available: true,
            serviceId: null
        });
    }
    
    return slots;
}

function saveServices() {
    localStorage.setItem('odysseyServices', JSON.stringify(services));
}

function saveTimeSlots() {
    localStorage.setItem('odysseyTimeSlots', JSON.stringify(timeSlots));
}

function saveAppointments() {
    localStorage.setItem('odysseyAppointments', JSON.stringify(appointments));
}

// UI Initialization
function initUI() {
    loadUserData();
    renderServices();
    renderTimeSlots();
    renderAppointments();
    updateCalendar();
}

function loadUserData() {
    const sessionData = getSessionData();
    if (!sessionData) return;
    
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = sessionData.username === 'admin' ? 'Administrador' : sessionData.username;
    }
}

// Event Listeners
function initEventListeners() {
    // Navigation tabs
    const tabs = document.querySelectorAll('.turnero-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');
            switchTab(target);
        });
    });

    // Service management
    document.getElementById('addServiceBtn')?.addEventListener('click', showAddServiceModal);
    document.getElementById('saveServiceBtn')?.addEventListener('click', saveService);
    document.getElementById('cancelServiceBtn')?.addEventListener('click', hideAddServiceModal);

    // Appointment management
    document.getElementById('addAppointmentBtn')?.addEventListener('click', showAddAppointmentModal);
    document.getElementById('saveAppointmentBtn')?.addEventListener('click', saveAppointment);
    document.getElementById('cancelAppointmentBtn')?.addEventListener('click', hideAddAppointmentModal);

    // Time slot management
    document.getElementById('generateSlotsBtn')?.addEventListener('click', generateTimeSlots);
    document.getElementById('saveSlotsBtn')?.addEventListener('click', saveTimeSlotSettings);

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    // Copy URL button
    document.getElementById('copyUrl')?.addEventListener('click', copyFormUrl);

    // Save settings
    document.getElementById('saveSettings')?.addEventListener('click', saveTurneroSettings);
    document.getElementById('testSettings')?.addEventListener('click', testTurneroSettings);

    // Refresh button
    document.getElementById('refreshBtn')?.addEventListener('click', refreshTurnero);

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', logout);
}

// Tab Navigation
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.turnero-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update content panels
    document.querySelectorAll('.turnero-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    // Update content based on tab
    switch(tabName) {
        case 'calendar':
            updateCalendar();
            break;
        case 'services':
            renderServices();
            break;
        case 'slots':
            renderTimeSlots();
            break;
        case 'appointments':
            renderAppointments();
            break;
        case 'settings':
            loadTurneroSettings();
            break;
    }
}

// Services Management
function renderServices() {
    const container = document.getElementById('servicesList');
    if (!container) return;

    container.innerHTML = '';
    
    services.forEach(service => {
        const serviceElement = createServiceElement(service);
        container.appendChild(serviceElement);
    });
}

function createServiceElement(service) {
    const div = document.createElement('div');
    div.className = 'service-item';
    div.innerHTML = `
        <div class="service-info">
            <div class="service-color" style="background: ${service.color}"></div>
            <div class="service-details">
                <h4>${service.name}</h4>
                <span>${service.duration} minutos</span>
            </div>
        </div>
        <div class="service-actions">
            <button class="btn btn-sm btn-secondary" onclick="editService(${service.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteService(${service.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    return div;
}

function showAddServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.add('active');
    document.getElementById('serviceName').value = '';
    document.getElementById('serviceDuration').value = '60';
    document.getElementById('serviceColor').value = '#4dd0e1';
}

function hideAddServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
}

function saveService() {
    const name = document.getElementById('serviceName').value.trim();
    const duration = parseInt(document.getElementById('serviceDuration').value);
    const color = document.getElementById('serviceColor').value;

    if (!name || duration <= 0) {
        showToast('Por favor completa todos los campos', 'error');
        return;
    }

    const newService = {
        id: Date.now(),
        name: name,
        duration: duration,
        color: color,
        active: true
    };

    services.push(newService);
    saveServices();
    renderServices();
    hideAddServiceModal();
    showToast('Servicio creado exitosamente', 'success');
}

function editService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    showAddServiceModal();
    document.getElementById('serviceName').value = service.name;
    document.getElementById('serviceDuration').value = service.duration;
    document.getElementById('serviceColor').value = service.color;
    
    // Change save button to update
    const saveBtn = document.getElementById('saveServiceBtn');
    saveBtn.textContent = 'Actualizar Servicio';
    saveBtn.onclick = () => updateService(serviceId);
}

function updateService(serviceId) {
    const name = document.getElementById('serviceName').value.trim();
    const duration = parseInt(document.getElementById('serviceDuration').value);
    const color = document.getElementById('serviceColor').value;

    if (!name || duration <= 0) {
        showToast('Por favor completa todos los campos', 'error');
        return;
    }

    const serviceIndex = services.findIndex(s => s.id === serviceId);
    if (serviceIndex !== -1) {
        services[serviceIndex] = {
            ...services[serviceIndex],
            name: name,
            duration: duration,
            color: color
        };
        
        saveServices();
        renderServices();
        hideAddServiceModal();
        showToast('Servicio actualizado exitosamente', 'success');
        
        // Reset save button
        const saveBtn = document.getElementById('saveServiceBtn');
        saveBtn.textContent = 'Crear Servicio';
        saveBtn.onclick = saveService;
    }
}

function deleteService(serviceId) {
    if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
        services = services.filter(s => s.id !== serviceId);
        saveServices();
        renderServices();
        showToast('Servicio eliminado exitosamente', 'success');
    }
}

// Time Slots Management
function renderTimeSlots() {
    const container = document.getElementById('timeSlotsList');
    if (!container) return;

    container.innerHTML = '';
    
    timeSlots.forEach(slot => {
        const slotElement = createTimeSlotElement(slot);
        container.appendChild(slotElement);
    });
}

function createTimeSlotElement(slot) {
    const div = document.createElement('div');
    div.className = `time-slot-item ${slot.available ? 'available' : 'unavailable'}`;
    
    const service = services.find(s => s.id === slot.serviceId);
    const serviceName = service ? service.name : 'Sin asignar';
    
    div.innerHTML = `
        <div class="slot-time">${slot.time}</div>
        <div class="slot-service">${serviceName}</div>
        <div class="slot-status">
            <span class="status-badge ${slot.available ? 'available' : 'unavailable'}">
                ${slot.available ? 'Disponible' : 'Ocupado'}
            </span>
        </div>
        <div class="slot-actions">
            <button class="btn btn-sm btn-secondary" onclick="editTimeSlot(${slot.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteTimeSlot(${slot.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    return div;
}

function generateTimeSlots() {
    const startHour = parseInt(document.getElementById('startHour').value);
    const endHour = parseInt(document.getElementById('endHour').value);
    const interval = parseInt(document.getElementById('interval').value);

    if (startHour >= endHour) {
        showToast('La hora de inicio debe ser menor a la hora de fin', 'error');
        return;
    }

    timeSlots = [];
    for (let hour = startHour; hour < endHour; hour++) {
        timeSlots.push({
            id: hour,
            time: `${hour.toString().padStart(2, '0')}:00`,
            available: true,
            serviceId: null
        });
    }

    saveTimeSlots();
    renderTimeSlots();
    showToast('Franjas horarias generadas exitosamente', 'success');
}

function saveTimeSlotSettings() {
    // Save current time slot configuration
    saveTimeSlots();
    showToast('Configuración de horarios guardada', 'success');
}

function editTimeSlot(slotId) {
    const slot = timeSlots.find(s => s.id === slotId);
    if (!slot) return;

    // Show edit modal or inline editing
    const newServiceId = prompt('Selecciona el servicio para este horario:\n' + 
        services.map(s => `${s.id}: ${s.name}`).join('\n'));
    
    if (newServiceId) {
        const serviceId = parseInt(newServiceId);
        const service = services.find(s => s.id === serviceId);
        
        if (service) {
            slot.serviceId = serviceId;
            saveTimeSlots();
            renderTimeSlots();
            showToast('Horario actualizado exitosamente', 'success');
        }
    }
}

function deleteTimeSlot(slotId) {
    if (confirm('¿Estás seguro de que quieres eliminar este horario?')) {
        timeSlots = timeSlots.filter(s => s.id !== slotId);
        saveTimeSlots();
        renderTimeSlots();
        showToast('Horario eliminado exitosamente', 'success');
    }
}

// Appointments Management
function renderAppointments() {
    const container = document.getElementById('appointmentsList');
    if (!container) return;

    container.innerHTML = '';
    
    // Filter appointments for current date
    const todayAppointments = appointments.filter(apt => 
        apt.date === currentDate.toISOString().split('T')[0]
    );

    if (todayAppointments.length === 0) {
        container.innerHTML = '<div class="empty-state">No hay turnos programados para hoy</div>';
        return;
    }

    todayAppointments.forEach(appointment => {
        const appointmentElement = createAppointmentElement(appointment);
        container.appendChild(appointmentElement);
    });
}

function createAppointmentElement(appointment) {
    const div = document.createElement('div');
    div.className = 'appointment-item';
    
    const service = services.find(s => s.id === appointment.serviceId);
    const serviceName = service ? service.name : 'Servicio no encontrado';
    
    div.innerHTML = `
        <div class="appointment-time">${appointment.time}</div>
        <div class="appointment-info">
            <h4>${appointment.clientName}</h4>
            <p>${serviceName}</p>
            <span class="contact-info">
                <i class="fas fa-phone"></i> ${appointment.clientPhone}
                <i class="fas fa-envelope"></i> ${appointment.clientEmail}
            </span>
        </div>
        <div class="appointment-actions">
            <button class="btn btn-sm btn-secondary" onclick="editAppointment(${appointment.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteAppointment(${appointment.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    return div;
}

function showAddAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    modal.classList.add('active');
    
    // Set current date
    document.getElementById('appointmentDate').value = currentDate.toISOString().split('T')[0];
    
    // Populate time slots
    const timeSelect = document.getElementById('appointmentTime');
    timeSelect.innerHTML = '<option value="">Seleccionar hora</option>';
    
    timeSlots.forEach(slot => {
        if (slot.available) {
            const option = document.createElement('option');
            option.value = slot.time;
            option.textContent = slot.time;
            timeSelect.appendChild(option);
        }
    });
    
    // Clear form
    document.getElementById('clientName').value = '';
    document.getElementById('clientPhone').value = '';
    document.getElementById('clientEmail').value = '';
    document.getElementById('appointmentNotes').value = '';
}

function hideAddAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    modal.classList.remove('active');
}

function saveAppointment() {
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const clientName = document.getElementById('clientName').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();
    const clientEmail = document.getElementById('clientEmail').value.trim();
    const notes = document.getElementById('appointmentNotes').value.trim();

    if (!date || !time || !clientName || !clientPhone || !clientEmail) {
        showToast('Por favor completa todos los campos obligatorios', 'error');
        return;
    }

    // Find available service for this time slot
    const timeSlot = timeSlots.find(slot => slot.time === time);
    const serviceId = timeSlot ? timeSlot.serviceId : services[0]?.id;

    const newAppointment = {
        id: Date.now(),
        date: date,
        time: time,
        clientName: clientName,
        clientPhone: clientPhone,
        clientEmail: clientEmail,
        serviceId: serviceId,
        notes: notes,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };

    appointments.push(newAppointment);
    saveAppointments();
    renderAppointments();
    hideAddAppointmentModal();
    updateStats();
    showToast('Turno creado exitosamente', 'success');
}

function editAppointment(appointmentId) {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (!appointment) return;

    showAddAppointmentModal();
    
    document.getElementById('appointmentDate').value = appointment.date;
    document.getElementById('appointmentTime').value = appointment.time;
    document.getElementById('clientName').value = appointment.clientName;
    document.getElementById('clientPhone').value = appointment.clientPhone;
    document.getElementById('clientEmail').value = appointment.clientEmail;
    document.getElementById('appointmentNotes').value = appointment.notes || '';
    
    // Change save button to update
    const saveBtn = document.querySelector('#appointmentModal .btn-primary');
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Actualizar Turno';
    saveBtn.onclick = () => updateAppointment(appointmentId);
}

function updateAppointment(appointmentId) {
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const clientName = document.getElementById('clientName').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();
    const clientEmail = document.getElementById('clientEmail').value.trim();
    const notes = document.getElementById('appointmentNotes').value.trim();

    if (!date || !time || !clientName || !clientPhone || !clientEmail) {
        showToast('Por favor completa todos los campos obligatorios', 'error');
        return;
    }

    const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);
    if (appointmentIndex !== -1) {
        appointments[appointmentIndex] = {
            ...appointments[appointmentIndex],
            date: date,
            time: time,
            clientName: clientName,
            clientPhone: clientPhone,
            clientEmail: clientEmail,
            notes: notes
        };
        
        saveAppointments();
        renderAppointments();
        hideAddAppointmentModal();
        updateStats();
        showToast('Turno actualizado exitosamente', 'success');
        
        // Reset save button
        const saveBtn = document.querySelector('#appointmentModal .btn-primary');
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Guardar Turno';
        saveBtn.onclick = saveAppointment;
    }
}

function deleteAppointment(appointmentId) {
    if (confirm('¿Estás seguro de que quieres eliminar este turno?')) {
        appointments = appointments.filter(a => a.id !== appointmentId);
        saveAppointments();
        renderAppointments();
        updateStats();
        showToast('Turno eliminado exitosamente', 'success');
    }
}

// Calendar Management
function updateCalendar() {
    // This would integrate with a calendar view
    // For now, we'll just update the stats
    updateStats();
}

function updateStats() {
    const today = currentDate.toISOString().split('T')[0];
    const todayAppointments = appointments.filter(apt => apt.date === today);
    
    // Update stats
    const todayElement = document.getElementById('todayAppointments');
    if (todayElement) todayElement.textContent = todayAppointments.length;
    
    const nextElement = document.getElementById('nextAppointment');
    if (nextElement) {
        const nextAppointment = todayAppointments
            .filter(apt => apt.time > new Date().toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'}))
            .sort((a, b) => a.time.localeCompare(b.time))[0];
        
        nextElement.textContent = nextAppointment ? nextAppointment.time : 'No hay más turnos';
    }
    
    // Weekly appointments
    const weekStart = new Date(currentDate);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const weekAppointments = appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate >= weekStart && aptDate <= weekEnd;
    });
    
    const weekElement = document.getElementById('weekAppointments');
    if (weekElement) weekElement.textContent = weekAppointments.length;
    
    // Occupancy rate
    const totalSlots = timeSlots.length;
    const occupiedSlots = todayAppointments.length;
    const occupancyRate = totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0;
    
    const occupancyElement = document.getElementById('occupancyRate');
    if (occupancyElement) occupancyElement.textContent = `${occupancyRate}%`;
}

// Settings Management
function loadTurneroSettings() {
    const settings = JSON.parse(localStorage.getItem('odysseyTurneroSettings') || '{}');
    
    document.getElementById('welcomeMessage').value = settings.welcomeMessage || 
        'Bienvenido al sistema de turnos ODYSSEY. Selecciona el día y horario que mejor te convenga.';
    
    document.getElementById('publicFormUrl').value = settings.publicFormUrl || 
        'https://odyssey.com.ar/reservar-turno';
}

function saveTurneroSettings() {
    const settings = {
        welcomeMessage: document.getElementById('welcomeMessage').value,
        publicFormUrl: document.getElementById('publicFormUrl').value
    };
    
    localStorage.setItem('odysseyTurneroSettings', JSON.stringify(settings));
    showToast('Configuración guardada exitosamente', 'success');
}

function testTurneroSettings() {
    // Open the public form in a new window
    const formUrl = document.getElementById('publicFormUrl').value;
    window.open(formUrl, '_blank');
}

function copyFormUrl() {
    const urlInput = document.getElementById('publicFormUrl');
    urlInput.select();
    document.execCommand('copy');
    showToast('URL copiada al portapapeles', 'success');
}

// Utility Functions
function refreshTurnero() {
    loadData();
    updateStats();
    showToast('Datos actualizados', 'success');
}

function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Show animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

function logout() {
    localStorage.removeItem('odysseySession');
    sessionStorage.removeItem('odysseySession');
    window.location.href = 'login.html';
}

// Export functions for external use
window.odysseyTurnero = {
    getServices: () => services,
    getTimeSlots: () => timeSlots,
    getAppointments: () => appointments,
    addAppointment: (appointmentData) => {
        const newAppointment = {
            id: Date.now(),
            ...appointmentData,
            status: 'confirmed',
            createdAt: new Date().toISOString()
        };
        appointments.push(newAppointment);
        saveAppointments();
        updateStats();
        return newAppointment;
    }
};