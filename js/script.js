// Section loader
document.addEventListener("DOMContentLoaded", function () {
    let preloader = document.querySelector(".cargador");
    if (!preloader) return; // Evita errores si no hay preloader

    let minTime = 6000; // 6 segundos
    let startTime = Date.now();

    window.onload = function () {
        let elapsedTime = Date.now() - startTime;
        let remainingTime = minTime - elapsedTime;

        setTimeout(() => {
            preloader.classList.add("hidden");
            setTimeout(() => preloader.remove(), 600); // Elimina del DOM tras la animación
        }, Math.max(remainingTime, 0));
    };
});


// Bloquear consola
document.addEventListener("keydown", function (event) {
    if (event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) || 
        (event.ctrlKey && event.key === "U")) {
      event.preventDefault();
    //   alert("Acceso denegado 🚫");
    }
  });
  
  // Bloquea la consola
console.log = console.warn = console.error = function () {};
console.debug = function () { return null; };

// Evita `debugger`
setInterval(() => {
  (function () {
    if (window.console && console.log) {
      console.log = function () {};
    }
  })();
}, 1000);


// imagenes 360 PB
let viewer, viewerone, viewernt, viewerEn;

// Iniciar panorama principal (panorama)
function startPanorama() {
    viewer = pannellum.viewer('panorama', {
        type: "equirectangular",
        panorama: "images/panfinal.webp",
        autoLoad: true,
        showZoomCtrl: true,
        showFullscreenCtrl: true,
        yaw: 150,
        hfov: 90,
        pitch: 0,
        autoRotate: 3,
        vr: true,
        showControls: true,
        touchPan: true,
        orientationOnByDefault: true
    });

}

// Iniciar segundo panorama (panoramalvone)
function startPanoramaLV() {
    viewerone = pannellum.viewer('panoramalvone', {
        type: "equirectangular",
        panorama: "images/pb/upanoramica.webp",
        autoLoad: true,
        showZoomCtrl: true,
        showFullscreenCtrl: true,
        yaw: 150,
        hfov: 90,
        pitch: 0,
        autoRotate: 3,
        vr: true,
        showControls: true,
        touchPan: true,
        orientationOnByDefault: true
    });


}

// Iniciar tercer panorama (panoramaf)
function startPanoramaLN() {
  viewernt = pannellum.viewer('panoramaf', {
      type: "equirectangular",
      panorama: "images/lastlevel/entrada.jpg",
      autoLoad: true,
      showZoomCtrl: true,
      showFullscreenCtrl: true,
      yaw: 150,
      hfov: 90,
      pitch: 0,
      autoRotate: 3,
      vr: true,
      showControls: true,
      touchPan: true,
      orientationOnByDefault: true
  });

}

// Iniciar cuarto panorama 
function startPanoramaEn() {
  viewerEn = pannellum.viewer('panoramaentrada', {
      type: "equirectangular",
      panorama: "images/lastlevel/nt.jpg",
      autoLoad: true,
      showZoomCtrl: true,
      showFullscreenCtrl: true,
      yaw: 150,
      hfov: 90,
      pitch: 0,
      autoRotate: 3,
      vr: true,
      showControls: true,
      touchPan: true,
      orientationOnByDefault: true
  });

}

// Solicitar permiso de giroscopio y cargar panoramas
function requestGyroscopePermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    console.log("Giroscopio activado");
                    startPanorama();
                    startPanoramaLV(); // Inicia el segundo panorama
                    startPanoramaLN();
                    startPanoramaEn();
                } else {
                    alert("Acceso al giroscopio denegado. Actívalo en la configuración del navegador.");
                }
            })
            .catch(console.error);
    } else {
        startPanorama();
        startPanoramaLV();
        startPanoramaLN();
        startPanoramaEn();
    }
}

// Iniciar los panoramas cuando se cargue la página
window.addEventListener("load", requestGyroscopePermission);


// Final section text 
// Creamos el observer para detectar cuando el elemento entra en la vista
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const target = entry.target;
  
      if (entry.isIntersecting) {
        // Cuando el elemento entra en la vista, aplicamos la animación
        target.classList.remove('animate__zoomIn'); // Eliminamos posibles animaciones previas
        target.classList.add('animate__zoomIn', 'animate__delay-1s'); // Aplicamos la animación
        target.style.opacity = 1;
      } else {
        // Si el elemento sale de la vista, eliminamos la animación
        target.classList.remove('animate__zoomIn');
        target.style.opacity = 0;
      }
    });
  }, {
    threshold: 0.5, // Se activa cuando el 50% del elemento es visible
    rootMargin: '0px 0px -50px 0px' // Anticipa un poco la animación antes de que sea visible completamente
  });
  
  // Seleccionamos el único elemento a observar
  const animationElement = document.getElementById('animationfinal');
  
  if (animationElement) {
    observer.observe(animationElement);
  }
  
  // Aseguramos una transición suave de opacidad en CSS
  const style = document.createElement('style');
  style.innerHTML = `
    #animationfinal {
      transition: opacity 0.5s ease-in-out;
    }
  `;
  document.head.appendChild(style);
  


// Section formulario

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita la recarga de la página

    emailjs.init("TV53dC7ZQsax8xKaF"); // Tu Public Key
    console.log("EmailJS inicializado.");

    const formData = {
        name: document.querySelector("[name='name']").value,
        email: document.querySelector("[name='email']").value,
        date: document.querySelector("[name='date']") ? document.querySelector("[name='date']").value : "Fecha no proporcionada",
        time: document.querySelector("[name='time']").value ,
        personas: document.querySelector("[name='personas']").value ,
        nivel: document.querySelector("[name='nivel']").value ,
        message: document.querySelector("[name='message']").value
    };

    console.log("Datos del formulario:", formData);

    // ✉️ Enviar correo al administrador
    emailjs.send("service_491nysh", "template_ssz7tiq", formData)
    .then(function(response) {
        console.log("Correo enviado al admin:", response);
        
        // ✅ Enviar correo de confirmación al usuario
        return emailjs.send("service_491nysh", "template_gtavlbx", formData);
    })
    .then(function(response) {
        console.log("Correo de confirmación enviado al usuario:", response);
        
        // Mostrar la alerta de éxito con SweetAlert
        Swal.fire({
            title: "¡Éxito!",
            text: "¡Tu visita ha sido agendada! Revisa tu correo.",
            icon: "success",
            confirmButtonText: "Aceptar"
        });

        document.getElementById("contact-form").reset(); // Limpia el formulario
    })
    .catch(function(error) {
        console.error("Error en EmailJS:", error);
        alert("Hubo un error al enviar los correos.");
    });
});

// OPTIMMIZACION PARA DISPOSITIVOS MOVILES
// OPTIMIZACIÓN PARA DISPOSITIVOS MÓVILES
function disableAnimationsOnMobile() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile && window.innerWidth <= 768) {
    // 1. Remueve clases de WOW y animate.css
    document.querySelectorAll('.wow, [class*="animate__"]').forEach(element => {
      element.classList.remove('wow', 'animate__animated');
      
      // 2. Remueve todas las clases que empiecen con animate__
      element.classList.forEach(cls => {
        if (cls.startsWith('animate__')) {
          element.classList.remove(cls);
        }
      });

      // 3. Elimina atributos de WOW
      element.removeAttribute('data-wow-delay');
      element.removeAttribute('data-wow-duration');
      element.removeAttribute('data-wow-offset');
    });

    // 4. Remueve la hoja de estilo de animate.css si está presente
    const animateCSS = document.querySelector('link[href*="animate.min.css"]');
    if (animateCSS) animateCSS.remove();

    // 5. Evita que WOW.js se ejecute
    if (typeof WOW !== 'undefined') {
      WOW.prototype.init = function () {
        return false;
      };
    }
  }
}

// Ejecuta en carga y en resize
window.addEventListener('load', disableAnimationsOnMobile);
window.addEventListener('resize', disableAnimationsOnMobile);


// Video fachada
document.getElementById('fullscreenBtn').addEventListener('click', function () {
  const video = document.getElementById('videntrada');
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  } else {
    alert("Tu navegador no soporta pantalla completa.");
  }
});


// Video lv
document.getElementById('fullscreenBtnLv').addEventListener('click', function () {
  const video = document.getElementById('videolv');
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  } else {
    alert("Tu navegador no soporta pantalla completa.");
  }
});
// Video cine
window.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('videocn');
  video.playbackRate = 0.65; // Cambia esto según la velocidad que quieras (1 es normal)
});
document.getElementById('fullscreenBtnCn').addEventListener('click', function () {
  const video = document.getElementById('videocn');
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) { /* Safari */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { /* IE11 */
    video.msRequestFullscreen();
  }
});
// video tienda
document.getElementById('fullscreenBtnPreludio').addEventListener('click', function () {
  const video = document.getElementById('videoPreludio');
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
});


// Section Carrusel

const track = document.getElementById('carouselTrack');
const cards = track.children;
let currentPosition = 0;
let cardWidth;
let autoScrollInterval;

// Inicializa tamaños y posición
function initCarousel() {
  cardWidth = cards[0].offsetWidth;
  track.style.transition = 'none';
  track.style.transform = `translateX(0px)`;
  currentPosition = 0;
  setTimeout(() => {
    track.style.transition = 'transform 0.5s ease';
  }, 50);
}

// Avanza el carrusel continuamente
function moveNext() {
  currentPosition -= cardWidth;
  track.style.transform = `translateX(${currentPosition}px)`;

  // Cuando llega a la mitad (fin del carrusel real), resetea
  if (Math.abs(currentPosition) >= cardWidth * (cards.length / 2)) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentPosition = 0;
      track.style.transform = `translateX(0px)`;
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease';
      }, 50);
    }, 500); // espera a que la animación termine
  }
}

// Auto-scroll
function startAutoScroll() {
  autoScrollInterval = setInterval(moveNext, 3000);
}

// Pausa cuando el mouse entra
track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
track.addEventListener('mouseleave', startAutoScroll);

window.addEventListener('resize', initCarousel);
window.addEventListener('load', () => {
  initCarousel();
  startAutoScroll();
});

// Botones
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

prevBtn.addEventListener('click', () => {
  // Retrocede una tarjeta
  currentPosition += cardWidth;
  track.style.transform = `translateX(${currentPosition}px)`;
  
  // Si se va más allá del inicio, rebobina al final duplicado
  if (currentPosition > 0) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentPosition = -cardWidth * (cards.length / 2);
      track.style.transform = `translateX(${currentPosition}px)`;
      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease';
      }, 50);
    }, 500);
  }
});

nextBtn.addEventListener('click', () => {
  moveNext(); // usa la misma función que el auto-scroll
});

