const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('#navMenu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Modal de servicio
const serviceModal = document.getElementById('serviceModal');
const closeBtn = document.querySelector('.close-btn');
const closeConfirmation = document.getElementById('closeConfirmation');
const modalFormContent = document.getElementById('modalFormContent');
const modalLoading = document.getElementById('modalLoading');
const modalConfirmation = document.getElementById('modalConfirmation');

// Funcionalidad para los botones "Solicitar"
const requestButtons = document.querySelectorAll('.service-card .btn');
requestButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        // Obtener información del servicio
        const serviceCard = button.closest('.service-card');
        const serviceName = serviceCard.querySelector('h3').textContent;
        const serviceDescription = serviceCard.querySelector('p').textContent;

        // Llenar el modal con la información del servicio
        document.getElementById('modalServiceName').textContent = serviceName;
        document.getElementById('modalServiceDescription').textContent = serviceDescription;
        document.getElementById('quickServiceName').value = serviceName;

        // Mostrar el modal
        serviceModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Evitar scroll del body

        // Resetear el modal
        modalFormContent.style.display = 'block';
        modalLoading.style.display = 'none';
        modalConfirmation.style.display = 'none';
        document.getElementById('quickContactForm').reset();
    });
});

// Cerrar modal
function closeModal() {
    serviceModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
}

closeBtn.addEventListener('click', closeModal);
closeConfirmation.addEventListener('click', closeModal);

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
        closeModal();
    }
});

// Formulario rápido del modal
const quickContactForm = document.getElementById('quickContactForm');
quickContactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Mostrar loading
    modalFormContent.style.display = 'none';
    modalLoading.style.display = 'block';

    // Simular envío del formulario (en un caso real sería una petición AJAX)
    setTimeout(() => {
        // Ocultar loading y mostrar confirmación
        modalLoading.style.display = 'none';
        modalConfirmation.style.display = 'block';

        // Mensaje personalizado
        const serviceName = document.getElementById('quickServiceName').value;
        const clientName = document.getElementById('quickName').value;
        document.getElementById('confirmationMessage').textContent =
            `Gracias ${clientName} por solicitar nuestro servicio de ${serviceName}. Nos pondremos en contacto contigo en breve para confirmar tu cita.`;

        // Resetear el formulario principal por si acaso
        document.getElementById('contactForm').reset();
    }, 2000);
});

// Formulario de contacto principal
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener los valores del formulario
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        preferredDate: document.getElementById('preferredDate').value,
        selectedService: document.getElementById('selectedService').value
    };

    // Aquí normalmente harías una petición AJAX para enviar los datos al servidor
    // Por ahora simularemos el envío con un setTimeout

    // Mostrar mensaje de éxito
    alert(`Gracias ${formData.name} por tu mensaje. Hemos recibido tu solicitud para el servicio de ${formData.service || formData.selectedService}. Nos pondremos en contacto contigo pronto.`);

    // Limpiar el formulario
    contactForm.reset();
    document.getElementById('selectedService').value = '';

    // Cerrar el modal si estaba abierto
    closeModal();

    // En un caso real, aquí iría el código AJAX:
    /*
    fetch('tu-servidor.com/api/contacto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.');
    });
    */
});

// Rellenar automáticamente el servicio seleccionado cuando viene del modal
if (document.getElementById('selectedService').value) {
    document.getElementById('service').value = document.getElementById('selectedService').value;
}

// Scroll suave para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animación al hacer scroll
window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
    const elements = document.querySelectorAll('.service-card, .about-img, .testimonial-card');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementPosition < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Ejecutar al cargar la página
window.addEventListener('load', () => {
    revealOnScroll();

    // Verificar si hay un servicio seleccionado en la URL (para demo)
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
        document.getElementById('selectedService').value = serviceParam;
        document.getElementById('service').value = serviceParam;
    }
});