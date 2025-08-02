# ODYSSEY - Sistema de Gestión y Turnos

Un sistema completo de gestión empresarial con sistema de turnos integrado, panel de configuración estética y formulario externo para reservas.

## 🚀 Características Principales

### 1. Panel de Configuración Estética
- **Personalización de colores**: Cambio de esquema de colores en tiempo real
- **Tipografía**: Selección de fuentes y tamaños
- **Marca personalizada**: Subida de logo y personalización de marca
- **Diseño adaptable**: Configuración de bordes, espaciado y animaciones
- **Vista previa en vivo**: Los cambios se aplican inmediatamente

### 2. Sistema de Turnos Completo
- **Gestión de servicios**: Crear, editar y eliminar servicios con duración personalizable
- **Configuración de horarios**: Definir franjas horarias de 60 minutos
- **Gestión de turnos**: Crear, editar y eliminar citas
- **Lista de clientes**: Visualizar todos los turnos asignados
- **Estadísticas en tiempo real**: Turnos del día, próxima cita, ocupación semanal

### 3. Formulario Externo para Reservas
- **Accesible desde cualquier dispositivo**: Diseño responsive para móviles y computadoras
- **Proceso de 3 pasos**: Selección de servicio → Fecha y hora → Datos personales
- **Validación en tiempo real**: Verificación de campos obligatorios
- **Integración completa**: Conectado con el sistema de administración
- **Confirmación automática**: Guardado de turnos y notificaciones

## 📁 Estructura del Proyecto

```
odyssey/
├── dashboard.html          # Panel principal de administración
├── dashboard.js            # Lógica del dashboard
├── dashboard.css           # Estilos del dashboard
├── settings.html           # Panel de configuración estética
├── settings.js             # Lógica de configuración
├── settings.css            # Estilos de configuración
├── turnero.html            # Sistema de gestión de turnos
├── turnero.js              # Lógica del sistema de turnos
├── turnero.css             # Estilos del sistema de turnos
├── reservar-turno.html     # Formulario externo de reservas
├── booking.js              # Lógica del formulario de reservas
├── booking.css             # Estilos del formulario de reservas
├── login.html              # Página de inicio de sesión
├── login.js                # Lógica de autenticación
├── login.css               # Estilos de login
├── styles.css              # Estilos globales
├── test-system.html        # Página de pruebas del sistema
└── README.md               # Este archivo
```

## 🛠️ Instalación y Configuración

### Requisitos
- Servidor web (Apache, Nginx, o servidor local)
- Navegador web moderno
- No requiere base de datos (usa localStorage)

### Instalación
1. Descarga todos los archivos en tu servidor web
2. Asegúrate de que todos los archivos estén en la misma carpeta
3. Accede a `login.html` para comenzar

### Configuración Inicial
1. **Acceso al sistema**: Usa las credenciales por defecto
   - Usuario: `admin`
   - Contraseña: `admin123`

2. **Configurar servicios**: Ve a "Sistema de Turnos" → "Servicios"
   - Agrega los servicios que ofreces
   - Define la duración de cada servicio

3. **Configurar horarios**: Ve a "Sistema de Turnos" → "Horarios"
   - Define las franjas horarias disponibles
   - Configura los días de la semana

4. **Personalizar apariencia**: Ve a "Configuración" → "Apariencia"
   - Cambia colores y tipografía
   - Sube tu logo personalizado

## 📖 Guía de Uso

### Para Administradores

#### Panel de Configuración Estética
1. Accede a `settings.html`
2. Navega entre las pestañas: Apariencia, Tipografía, Marca, Diseño
3. Realiza cambios y usa "Vista Previa" para ver el resultado
4. Guarda la configuración con "Aplicar Cambios"

#### Sistema de Turnos
1. Accede a `turnero.html`
2. **Servicios**: Crea y gestiona los servicios disponibles
3. **Horarios**: Configura las franjas horarias de trabajo
4. **Turnos**: Gestiona las citas de los clientes
5. **Configuración**: Personaliza el formulario público

### Para Clientes

#### Reserva de Turnos
1. Accede a `reservar-turno.html`
2. **Paso 1**: Selecciona el servicio que necesitas
3. **Paso 2**: Elige fecha y horario disponible
4. **Paso 3**: Completa tus datos de contacto
5. Confirma la reserva

## 🔧 Funcionalidades Técnicas

### Almacenamiento de Datos
- **localStorage**: Configuración, servicios, horarios y turnos
- **sessionStorage**: Datos de sesión del usuario
- **Persistencia**: Los datos se mantienen entre sesiones

### Integración
- **Sincronización automática**: Los turnos del formulario externo se reflejan en el panel de administración
- **Validación cruzada**: Verificación de disponibilidad en tiempo real
- **Notificaciones**: Sistema de toasts para feedback del usuario

### Responsive Design
- **Móviles**: Optimizado para pantallas pequeñas
- **Tablets**: Adaptación automática a diferentes tamaños
- **Desktop**: Experiencia completa en pantallas grandes

## 🧪 Pruebas del Sistema

### Página de Pruebas
Accede a `test-system.html` para:
- Verificar la configuración del sistema
- Probar la gestión de servicios
- Validar horarios y turnos
- Comprobar el formulario externo
- Ver el estado general del sistema

### Datos de Prueba
El sistema incluye datos de ejemplo que puedes usar para probar:
- Servicios predefinidos
- Horarios de 9:00 a 18:00
- Configuración básica

## 🔒 Seguridad

### Autenticación
- Sistema de login básico
- Sesiones persistentes
- Protección de rutas administrativas

### Validación
- Validación de formularios en frontend
- Sanitización de datos de entrada
- Verificación de disponibilidad de horarios

## 🚀 Despliegue

### Servidor Local
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server

# Con PHP
php -S localhost:8000
```

### Servidor Web
1. Sube todos los archivos a tu servidor web
2. Configura el servidor para servir archivos estáticos
3. Asegúrate de que el archivo `.htaccess` esté presente (para Apache)

## 📞 Soporte

### Problemas Comunes
1. **Los cambios no se guardan**: Verifica que localStorage esté habilitado
2. **Formulario no funciona**: Asegúrate de que todos los archivos JS estén presentes
3. **Estilos no se aplican**: Verifica que los archivos CSS se carguen correctamente

### Logs del Sistema
- Abre la consola del navegador (F12) para ver logs detallados
- Los errores se muestran en tiempo real
- Usa `test-system.html` para diagnóstico

## 🔄 Actualizaciones

### Versión Actual
- Sistema de turnos completo
- Panel de configuración estética
- Formulario externo funcional
- Integración total entre módulos

### Próximas Funcionalidades
- Integración con Google Calendar
- Notificaciones por email
- Panel de estadísticas avanzado
- API REST para integraciones externas

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y comerciales.

---

**ODYSSEY** - Tu plataforma confiable de gestión y turnos 🚀