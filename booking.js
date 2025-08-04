// ODYSSEY Booking Form
// External appointment booking system

document.addEventListener('DOMContentLoaded', function() {
    initBookingForm();
});

// Global variables
let currentStep = 1;
let totalSteps = 3;
let selectedService = null;
let selectedDate = null;
let selectedTime = null;
let formData = {};

// Initialize the booking form
function initBookingForm() {
    loadSettings();
    loadServices();
    loadAvailableDates();
    initEventListeners();
    updateProgress();
    console.log('📅 ODYSSEY Booking Form initialized!');
}

// Load settings from localStorage
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('odysseyTurneroSettings') || '{}');
    
    // Update welcome message
    const welcomeMessage = document.querySelector('.welcome-section p');
    if (welcomeMessage && settings.welcomeMessage) {
        welcomeMessage.textContent = settings.welcomeMessage;
    }
    
    // Update contact info
    const contactInfo = document.querySelector('.contact-info span');
    if (contactInfo && settings.contactPhone) {
        contactInfo.textContent = settings.contactPhone;
    }
}

// Load services from localStorage
function loadServices() {
    const services = JSON.parse(localStorage.getItem('odysseyServices') || '[]');
    
    if (services.length === 0) {
        showError('No hay servicios disponibles en este momento. Por favor, contacta con nosotros.');
        return;
    }
    
    renderServices(services);
}

// Render services in the form
function renderServices(services) {
    const container = document.getElementById('servicesGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    services.forEach(service => {
        if (service.active) {
            const serviceElement = createServiceElement(service);
            container.appendChild(serviceElement);
        }
    });
}

// Create service element
function createServiceElement(service) {
    const div = document.createElement('div');
    div.className = 'service-card';
    div.setAttribute('data-service-id', service.id);
    
    div.innerHTML = `
        <div class="service-icon">
            <i class="fas fa-cog"></i>
        </div>
        <h4>${service.name}</h4>
        <p>Servicio profesional</p>
        <span class="duration">${service.duration} minutos</span>
    `;
    
    div.addEventListener('click', () => selectService(service));
    return div;
}

// Select service
function selectService(service) {
    // Remove previous selection
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    const selectedCard = document.querySelector(`[data-service-id="${service.id}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    selectedService = service;
    formData.serviceId = service.id;
    formData.serviceName = service.name;
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
}

// Load available dates
function loadAvailableDates() {
    const today = new Date();
    const availableDates = [];
    
    // Generate next 30 days
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        // Skip weekends (optional)
        const dayOfWeek = date.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip Sunday and Saturday
            availableDates.push(date);
        }
    }
    
    renderCalendar(availableDates);
}

// Render calendar
function renderCalendar(availableDates) {
    const container = document.getElementById('calendarGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day header';
        header.textContent = day;
        container.appendChild(header);
    });
    
    // Get current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Get first day of month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDay.getDay();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        container.appendChild(emptyDay);
    }
    
    // Add days of the month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Check if date is available
        const isAvailable = availableDates.some(availableDate => 
            availableDate.toDateString() === date.toDateString()
        );
        
        // Check if date is today
        const isToday = date.toDateString() === currentDate.toDateString();
        
        if (isToday) {
            dayElement.classList.add('today');
        }
        
        if (!isAvailable) {
            dayElement.classList.add('disabled');
        } else {
            dayElement.addEventListener('click', () => selectDate(date));
        }
        
        container.appendChild(dayElement);
    }
}

// Select date
function selectDate(date) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    
    // Add selection to clicked day
    const selectedDay = event.target;
    selectedDay.classList.add('selected');
    
    selectedDate = date;
    formData.date = date.toISOString().split('T')[0];
    
    // Load available time slots for selected date
    loadAvailableTimeSlots(date);
}

// Load available time slots
function loadAvailableTimeSlots(date) {
    const timeSlots = JSON.parse(localStorage.getItem('odysseyTimeSlots') || '[]');
    const appointments = JSON.parse(localStorage.getItem('odysseyAppointments') || '[]');
    
    // Filter appointments for selected date
    const dateString = date.toISOString().split('T')[0];
    const bookedAppointments = appointments.filter(apt => apt.date === dateString);
    
    // Get booked times
    const bookedTimes = bookedAppointments.map(apt => apt.time);
    
    // Filter available time slots
    const availableSlots = timeSlots.filter(slot => 
        slot.available && !bookedTimes.includes(slot.time)
    );
    
    renderTimeSlots(availableSlots);
}

// Render time slots
function renderTimeSlots(timeSlots) {
    const container = document.getElementById('timeSlotsGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (timeSlots.length === 0) {
        container.innerHTML = '<div class="no-slots">No hay horarios disponibles para esta fecha</div>';
        return;
    }
    
    timeSlots.forEach(slot => {
        const slotElement = document.createElement('div');
        slotElement.className = 'time-slot';
        slotElement.textContent = slot.time;
        
        slotElement.addEventListener('click', () => selectTimeSlot(slot));
        container.appendChild(slotElement);
    });
}

// Select time slot
function selectTimeSlot(slot) {
    // Remove previous selection
    document.querySelectorAll('.time-slot').forEach(timeSlot => {
        timeSlot.classList.remove('selected');
    });
    
    // Add selection to clicked slot
    const selectedSlot = event.target;
    selectedSlot.classList.add('selected');
    
    selectedTime = slot;
    formData.time = slot.time;
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
}

// Event listeners
function initEventListeners() {
    // Navigation buttons
    document.getElementById('nextBtn')?.addEventListener('click', nextStep);
    document.getElementById('prevBtn')?.addEventListener('click', prevStep);
    
    // Form submission
    document.getElementById('bookingForm')?.addEventListener('submit', submitBooking);
    
    // Input validation
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', validateForm);
    });
}

// Navigation functions
function nextStep() {
    if (currentStep < totalSteps) {
        // Validate current step
        if (validateCurrentStep()) {
            currentStep++;
            updateStep();
            updateProgress();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStep();
        updateProgress();
    }
}

// Update step display
function updateStep() {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    const currentStepElement = document.getElementById(`step${currentStep}`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    // Update button states
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-flex';
    }
    
    if (nextBtn) {
        if (currentStep === totalSteps) {
            nextBtn.textContent = 'Confirmar Reserva';
            nextBtn.innerHTML = '<i class="fas fa-check"></i> Confirmar Reserva';
        } else {
            nextBtn.textContent = 'Siguiente';
            nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Siguiente';
        }
    }
}

// Update progress bar
function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const progress = (currentStep / totalSteps) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

// Validate current step
function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            if (!selectedService) {
                showError('Por favor selecciona un servicio');
                return false;
            }
            break;
        case 2:
            if (!selectedDate || !selectedTime) {
                showError('Por favor selecciona una fecha y horario');
                return false;
            }
            break;
        case 3:
            return validatePersonalInfo();
    }
    return true;
}

// Validate personal information
function validatePersonalInfo() {
    const requiredFields = ['clientName', 'clientEmail', 'clientPhone'];
    const missingFields = [];
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input || !input.value.trim()) {
            missingFields.push(field);
        }
    });
    
    if (missingFields.length > 0) {
        showError('Por favor completa todos los campos obligatorios');
        return false;
    }
    
    // Validate email
    const email = document.getElementById('clientEmail').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Por favor ingresa un email válido');
        return false;
    }
    
    // Validate phone
    const phone = document.getElementById('clientPhone').value;
    if (phone.length < 8) {
        showError('Por favor ingresa un número de teléfono válido');
        return false;
    }
    
    return true;
}

// Validate form in real-time
function validateForm() {
    const form = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('nextBtn');
    
    if (form && submitBtn) {
        const isValid = validatePersonalInfo();
        submitBtn.disabled = !isValid;
    }
}

// Submit booking
function submitBooking(event) {
    event.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    // Collect form data
    formData.clientName = document.getElementById('clientName').value.trim();
    formData.clientEmail = document.getElementById('clientEmail').value.trim();
    formData.clientPhone = document.getElementById('clientPhone').value.trim();
    formData.notes = document.getElementById('clientNotes')?.value.trim() || '';
    
    // Show loading state
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        // Save appointment to localStorage
        saveAppointment(formData);
        
        // Hide loading and show success
        hideLoading();
        showSuccess();
    }, 2000);
}

// Save appointment
function saveAppointment(appointmentData) {
    const appointments = JSON.parse(localStorage.getItem('odysseyAppointments') || '[]');
    
    const newAppointment = {
        id: Date.now(),
        ...appointmentData,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };
    
    appointments.push(newAppointment);
    localStorage.setItem('odysseyAppointments', JSON.stringify(appointments));
    
    // Send confirmation email (simulated)
    sendConfirmationEmail(newAppointment);
}

// Send confirmation email (simulated)
function sendConfirmationEmail(appointment) {
    console.log('📧 Confirmation email sent to:', appointment.clientEmail);
    console.log('📅 Appointment details:', appointment);
    
    // In a real implementation, this would send an actual email
    // For now, we'll just log the details
}

// Show loading state
function showLoading() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.innerHTML = `
            <div class="loading">
                <div class="loading-spinner"></div>
                <span>Procesando tu reserva...</span>
            </div>
        `;
    }
}

// Hide loading state
function hideLoading() {
    // This will be handled by showSuccess()
}

// Show success message
function showSuccess() {
    const container = document.querySelector('.booking-form-container');
    if (container) {
        container.innerHTML = `
            <div class="success-message">
                <div class="success-icon">
                    <i class="fas fa-check"></i>
                </div>
                <h3>¡Reserva Confirmada!</h3>
                <p>Tu turno ha sido reservado exitosamente. Te hemos enviado un email de confirmación.</p>
                
                <div class="booking-details">
                    <h4>Detalles de tu Reserva</h4>
                    <div class="detail-row">
                        <span class="detail-label">Servicio:</span>
                        <span class="detail-value">${formData.serviceName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Fecha:</span>
                        <span class="detail-value">${formatDate(formData.date)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Hora:</span>
                        <span class="detail-value">${formData.time}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Nombre:</span>
                        <span class="detail-value">${formData.clientName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">${formData.clientEmail}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Teléfono:</span>
                        <span class="detail-value">${formData.clientPhone}</span>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button class="btn btn-primary" onclick="window.location.reload()">
                        <i class="fas fa-plus"></i>
                        Nueva Reserva
                    </button>
                </div>
            </div>
        `;
    }
}

// Show error message
function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    // Insert at the top of the form
    const form = document.getElementById('bookingForm');
    if (form) {
        form.insertBefore(errorDiv, form.firstChild);
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
}

// Utility function to check if date is in the past
function isDateInPast(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
}

// Utility function to check if time is in the past for today
function isTimeInPast(time, date) {
    if (!isDateInPast(date)) return false;
    
    const today = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const appointmentTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
    
    return appointmentTime < today;
}

// Export functions for external use
window.odysseyBooking = {
    getFormData: () => formData,
    resetForm: () => {
        currentStep = 1;
        selectedService = null;
        selectedDate = null;
        selectedTime = null;
        formData = {};
        updateStep();
        updateProgress();
    }
};