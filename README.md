
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
=======
# ODYSSEY - Plataforma de Nube y Servicios

![ODYSSEY Logo](https://img.shields.io/badge/ODYSSEY-Cloud%20Platform-4dd0e1?style=for-the-badge&logo=ship)

Una plataforma web moderna y profesional para servicios en la nube, diseñada específicamente para **odyssey.com.ar**. Inspirada en la épica travesía de Ulises, ODYSSEY guía a las empresas a través del complejo panorama tecnológico actual.

## 🚀 Características

### ✨ Diseño y UX
- **Paleta de Colores Personalizada**: Extraída del logo ODYSSEY con gradientes azul profundo y acentos cian
- **Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- **Animaciones Fluidas**: Efectos de parallax, floating cards y transiciones suaves
- **Tipografía Moderna**: Fuente Inter para máxima legibilidad

### 🛠 Funcionalidades Técnicas
- **PWA (Progressive Web App)**: Instalable en dispositivos móviles
- **Service Worker**: Funcionalidad offline y cache inteligente
- **SEO Optimizado**: Meta tags, sitemap, robots.txt
- **Rendimiento**: Lazy loading, compresión, optimización de recursos
- **Seguridad**: Headers de seguridad, CSP, protección XSS

### 📱 Secciones Principales
1. **Hero**: Presentación impactante con elementos flotantes animados
2. **Servicios**: Grid de 6 servicios principales (Cloud Storage, Servidores, Seguridad, etc.)
3. **Nosotros**: Historia de la empresa con estadísticas animadas
4. **Contacto**: Formulario funcional con validación

## 🎨 Paleta de Colores

```css
--primary-dark: #0a1929     /* Azul marino profundo */
--primary-blue: #1e3a5f     /* Azul medio */
--primary-cyan: #4dd0e1     /* Cian principal */
--accent-cyan: #26c6da      /* Cian de acento */
--light-cyan: #80deea       /* Cian claro */
```
main

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
=======
odyssey-webapp/
├── index.html              # Página principal
├── styles.css             # Estilos CSS con paleta ODYSSEY
├── script.js              # JavaScript interactivo
├── manifest.json          # Manifest PWA
├── sw.js                  # Service Worker
├── .htaccess             # Configuración Apache
├── robots.txt            # SEO robots
├── sitemap.xml           # Mapa del sitio
├── README.md             # Este archivo
└── icons/                # Iconos PWA (crear carpeta)
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

## 🚀 Despliegue en odyssey.com.ar

### Requisitos del Servidor
- **Servidor Web**: Apache 2.4+ o Nginx
- **SSL**: Certificado HTTPS (requerido)
- **PHP**: 7.4+ (opcional, para formularios backend)
- **Módulos Apache**: mod_rewrite, mod_headers, mod_deflate, mod_expires

### Pasos de Instalación

1. **Subir Archivos**
   ```bash
   # Subir todos los archivos al directorio raíz del dominio
   scp -r * usuario@servidor:/var/www/odyssey.com.ar/
   ```

2. **Configurar Permisos**
   ```bash
   chmod 644 *.html *.css *.js *.json *.xml *.txt
   chmod 755 .htaccess
   ```

3. **Crear Iconos PWA**
   - Generar iconos desde el logo ODYSSEY en diferentes tamaños
   - Colocar en la carpeta `/icons/`

4. **Configurar DNS**
   ```
   A record: odyssey.com.ar → IP_DEL_SERVIDOR
   CNAME: www.odyssey.com.ar → odyssey.com.ar
   ```

5. **SSL Certificate**
   ```bash
   # Con Let's Encrypt
   certbot --apache -d odyssey.com.ar -d www.odyssey.com.ar
   ```

### Configuración de Formulario de Contacto

Para activar el envío de emails del formulario, crear `contact.php`:

```php
<?php
// Configurar según tus necesidades de email
$to = "info@odyssey.com.ar";
$subject = "Nuevo contacto desde ODYSSEY";
// ... lógica de envío
?>
```

## 🔧 Personalización

### Cambiar Colores
Modificar las variables CSS en `styles.css`:
```css
:root {
    --primary-cyan: #TU_COLOR;
    --accent-cyan: #TU_ACENTO;
}
```

### Agregar Secciones
1. Añadir HTML en `index.html`
2. Estilos en `styles.css`
3. Funcionalidad en `script.js`

### Modificar Contenido
- **Textos**: Editar directamente en `index.html`
- **Servicios**: Modificar la sección `.services-grid`
- **Contacto**: Actualizar información en `.contact-info`

## 📊 Analytics y Seguimiento

El código incluye tracking de eventos. Para activar Google Analytics:

```html
<!-- Agregar en <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 SEO y Performance

### Optimizaciones Incluidas
- ✅ Meta tags completos (Open Graph, Twitter Cards)
- ✅ Sitemap XML
- ✅ Robots.txt
- ✅ Estructura semántica HTML5
- ✅ Lazy loading de imágenes
- ✅ Compresión GZIP
- ✅ Cache headers optimizados
- ✅ Minificación automática

### Lighthouse Score Esperado
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## 🛡 Seguridad

### Headers Implementados
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Content-Security-Policy
- Referrer-Policy
- Permissions-Policy

## 🌐 Compatibilidad

### Navegadores Soportados
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Dispositivos
- Desktop: 1920x1080+
- Tablet: 768px - 1024px
- Mobile: 320px - 767px

## 🎮 Easter Eggs

- **Konami Code**: ↑↑↓↓←→←→BA para activar modo especial
- **Console Messages**: Mensajes temáticos en la consola del navegador

## 📞 Soporte

Para soporte técnico o consultas sobre la implementación:
- **Email**: info@odyssey.com.ar
- **Documentación**: Revisar comentarios en el código
- **Issues**: Reportar problemas técnicos

## 📄 Licencia

Proyecto desarrollado específicamente para ODYSSEY. Todos los derechos reservados.

---

**🚢 ¡Que comience tu ODYSSEY digital!**

*Navegando hacia el futuro de la tecnología en la nube.*

