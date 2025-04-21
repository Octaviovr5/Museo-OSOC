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

// Variables globales para los visores
let viewer, viewerone, viewernt, viewerEn;
let gyroPermissionRequested = false;

// Detectar si es iOS
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// Función para inicializar todos los panoramas
function initAllPanoramas(enableGyro = true) {
  startPanorama(enableGyro);
  startPanoramaLV(enableGyro);
  startPanoramaLN(enableGyro);
  startPanoramaEn(enableGyro);
}

// Iniciar panorama principal (panorama)
function startPanorama(enableGyro = true) {
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
      orientationOnByDefault: enableGyro
  });
}

// Iniciar segundo panorama (panoramalvone)
function startPanoramaLV(enableGyro = true) {
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
      orientationOnByDefault: enableGyro
  });
}

// Iniciar tercer panorama (panoramaf)
function startPanoramaLN(enableGyro = true) {
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
    orientationOnByDefault: enableGyro
});
}

// Iniciar cuarto panorama 
function startPanoramaEn(enableGyro = true) {
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
    orientationOnByDefault: enableGyro
});
}

// Solicitar permiso de giroscopio mejorado
function requestGyroscopePermission() {
  if (gyroPermissionRequested) return;
  gyroPermissionRequested = true;
  
  if (isIOS() && typeof DeviceMotionEvent.requestPermission === 'function') {
      // Mostrar un mensaje personalizado antes de pedir permiso
      if (confirm("Para una mejor experiencia de realidad virtual, necesitamos acceso al giroscopio. ¿Deseas permitir esto?")) {
          DeviceMotionEvent.requestPermission()
              .then(response => {
                  if (response === 'granted') {
                      console.log("Permiso de giroscopio concedido");
                      initAllPanoramas(true);
                  } else {
                      console.log("Permiso de giroscopio denegado");
                      initAllPanoramas(false);
                  }
              })
              .catch(error => {
                  console.error("Error al solicitar permiso:", error);
                  initAllPanoramas(false);
              });
      } else {
          initAllPanoramas(false);
      }
  } else {
      // Dispositivos que no requieren permiso explícito
      initAllPanoramas();
  }
}

// Cambiamos a DOMContentLoaded y agregamos un pequeño retraso
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(requestGyroscopePermission, 1000);
});

// Final section text 
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const target = entry.target;

    if (entry.isIntersecting) {
      target.classList.remove('animate__zoomIn');
      target.classList.add('animate__zoomIn', 'animate__delay-1s');
      target.style.opacity = 1;
    } else {
      target.classList.remove('animate__zoomIn');
      target.style.opacity = 0;
    }
  });
}, {
  threshold: 0.5,
  rootMargin: '0px 0px -50px 0px'
});

const animationElement = document.getElementById('animationfinal');
if (animationElement) {
  observer.observe(animationElement);
}

const style = document.createElement('style');
style.innerHTML = `
  #animationfinal {
    transition: opacity 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);

// Section formulario
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  emailjs.init("TV53dC7ZQsax8xKaF");
  console.log("EmailJS inicializado.");

  const formData = {
      name: document.querySelector("[name='name']").value,
      email: document.querySelector("[name='email']").value,
      date: document.querySelector("[name='date']") ? document.querySelector("[name='date']").value : "Fecha no proporcionada",
      time: document.querySelector("[name='time']").value,
      personas: document.querySelector("[name='personas']").value,
      nivel: document.querySelector("[name='nivel']").value,
      message: document.querySelector("[name='message']").value
  };

  console.log("Datos del formulario:", formData);

  emailjs.send("service_491nysh", "template_ssz7tiq", formData)
  .then(function(response) {
      console.log("Correo enviado al admin:", response);
      return emailjs.send("service_491nysh", "template_gtavlbx", formData);
  })
  .then(function(response) {
      console.log("Correo de confirmación enviado al usuario:", response);
      Swal.fire({
          title: "¡Éxito!",
          text: "¡Tu visita ha sido agendada! Revisa tu correo.",
          icon: "success",
          confirmButtonText: "Aceptar"
      });
      document.getElementById("contact-form").reset();
  })
  .catch(function(error) {
      console.error("Error en EmailJS:", error);
      alert("Hubo un error al enviar los correos.");
  });
});

// OPTIMIZACIÓN PARA DISPOSITIVOS MÓVILES
function disableAnimationsOnMobile() {
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile && window.innerWidth <= 768) {
  document.querySelectorAll('.wow, [class*="animate__"]').forEach(element => {
    element.classList.remove('wow', 'animate__animated');
    element.classList.forEach(cls => {
      if (cls.startsWith('animate__')) {
        element.classList.remove(cls);
      }
    });
    element.removeAttribute('data-wow-delay');
    element.removeAttribute('data-wow-duration');
    element.removeAttribute('data-wow-offset');
  });

  const animateCSS = document.querySelector('link[href*="animate.min.css"]');
  if (animateCSS) animateCSS.remove();

  if (typeof WOW !== 'undefined') {
    WOW.prototype.init = function () {
      return false;
    };
  }
}
}

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
video.playbackRate = 0.65;
});
document.getElementById('fullscreenBtnCn').addEventListener('click', function () {
const video = document.getElementById('videocn');
if (video.requestFullscreen) {
  video.requestFullscreen();
} else if (video.webkitRequestFullscreen) {
  video.webkitRequestFullscreen();
} else if (video.msRequestFullscreen) {
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

function initCarousel() {
cardWidth = cards[0].offsetWidth;
track.style.transition = 'none';
track.style.transform = `translateX(0px)`;
currentPosition = 0;
setTimeout(() => {
  track.style.transition = 'transform 0.5s ease';
}, 50);
}

function moveNext() {
currentPosition -= cardWidth;
track.style.transform = `translateX(${currentPosition}px)`;

if (Math.abs(currentPosition) >= cardWidth * (cards.length / 2)) {
  setTimeout(() => {
    track.style.transition = 'none';
    currentPosition = 0;
    track.style.transform = `translateX(0px)`;
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease';
    }, 50);
  }, 500);
}
}

function startAutoScroll() {
autoScrollInterval = setInterval(moveNext, 3000);
}

track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
track.addEventListener('mouseleave', startAutoScroll);

window.addEventListener('resize', initCarousel);
window.addEventListener('load', () => {
initCarousel();
startAutoScroll();
});

// Botones carrusel
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

prevBtn.addEventListener('click', () => {
currentPosition += cardWidth;
track.style.transform = `translateX(${currentPosition}px)`;

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

nextBtn.addEventListener('click', moveNext);