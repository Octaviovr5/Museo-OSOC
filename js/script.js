// // Section loader
// document.addEventListener("DOMContentLoaded", function () {
//     let preloader = document.querySelector(".cargador");
//     if (!preloader) return; // Evita errores si no hay preloader

//     let minTime = 6000; // 6 segundos
//     let startTime = Date.now();

//     window.onload = function () {
//         let elapsedTime = Date.now() - startTime;
//         let remainingTime = minTime - elapsedTime;

//         setTimeout(() => {
//             preloader.classList.add("hidden");
//             setTimeout(() => preloader.remove(), 600); // Elimina del DOM tras la animación
//         }, Math.max(remainingTime, 0));
//     };
// });


// // Bloquear consola
// document.addEventListener("keydown", function (event) {
//     if (event.key === "F12" || 
//         (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) || 
//         (event.ctrlKey && event.key === "U")) {
//       event.preventDefault();
//     //   alert("Acceso denegado 🚫");
//     }
//   });
  
//   // Bloquea la consola
// console.log = console.warn = console.error = function () {};
// console.debug = function () { return null; };

// // Evita `debugger`
// setInterval(() => {
//   (function () {
//     if (window.console && console.log) {
//       console.log = function () {};
//     }
//   })();
// }, 1000);


// // imagenes 360 PB
// let viewer, viewerone;

// // Iniciar panorama principal (panorama)
// function startPanorama() {
//     viewer = pannellum.viewer('panorama', {
//         type: "equirectangular",
//         panorama: "images/panfinal.png",
//         autoLoad: true,
//         showZoomCtrl: true,
//         showFullscreenCtrl: true,
//         yaw: 120,
//         hfov: 90,
//         pitch: 0,
//         autoRotate: 3,
//         vr: true,
//         showControls: true,
//         touchPan: true,
//         orientationOnByDefault: true
//     });

//     viewer.startOrientation();
// }

// // Iniciar segundo panorama (panoramalvone)
// function startPanoramaLV() {
//     viewerone = pannellum.viewer('panoramalvone', {
//         type: "equirectangular",
//         panorama: "images/pb/upanoramica.png",
//         autoLoad: true,
//         showZoomCtrl: true,
//         showFullscreenCtrl: true,
//         yaw: 120,
//         hfov: 90,
//         pitch: 0,
//         autoRotate: 3,
//         vr: true,
//         showControls: true,
//         touchPan: true,
//         orientationOnByDefault: true
//     });

//     viewerone.startOrientation();
// }

// // Solicitar permiso de giroscopio y cargar panoramas
// function requestGyroscopePermission() {
//     if (typeof DeviceMotionEvent.requestPermission === 'function') {
//         DeviceMotionEvent.requestPermission()
//             .then(response => {
//                 if (response === 'granted') {
//                     console.log("Giroscopio activado");
//                     startPanorama();
//                     startPanoramaLV(); // Inicia el segundo panorama
//                 } else {
//                     alert("Acceso al giroscopio denegado. Actívalo en la configuración del navegador.");
//                 }
//             })
//             .catch(console.error);
//     } else {
//         startPanorama();
//         startPanoramaLV();
//     }
// }

// // Iniciar los panoramas cuando se cargue la página
// window.addEventListener("load", requestGyroscopePermission);


// // Final section text 
// // Creamos el observer para detectar cuando el elemento entra en la vista
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       const target = entry.target;
  
//       if (entry.isIntersecting) {
//         // Cuando el elemento entra en la vista, aplicamos la animación
//         target.classList.remove('animate__zoomIn'); // Eliminamos posibles animaciones previas
//         target.classList.add('animate__zoomIn', 'animate__delay-1s'); // Aplicamos la animación
//         target.style.opacity = 1;
//       } else {
//         // Si el elemento sale de la vista, eliminamos la animación
//         target.classList.remove('animate__zoomIn');
//         target.style.opacity = 0;
//       }
//     });
//   }, {
//     threshold: 0.5, // Se activa cuando el 50% del elemento es visible
//     rootMargin: '0px 0px -50px 0px' // Anticipa un poco la animación antes de que sea visible completamente
//   });
  
//   // Seleccionamos el único elemento a observar
//   const animationElement = document.getElementById('animationfinal');
  
//   if (animationElement) {
//     observer.observe(animationElement);
//   }
  
//   // Aseguramos una transición suave de opacidad en CSS
//   const style = document.createElement('style');
//   style.innerHTML = `
//     #animationfinal {
//       transition: opacity 0.5s ease-in-out;
//     }
//   `;
//   document.head.appendChild(style);
  


// // Section formulario

// document.getElementById("contact-form").addEventListener("submit", function(event) {
//     event.preventDefault(); // Evita la recarga de la página

//     emailjs.init("TV53dC7ZQsax8xKaF"); // Tu Public Key
//     console.log("EmailJS inicializado.");

//     const formData = {
//         name: document.querySelector("[name='name']").value,
//         email: document.querySelector("[name='email']").value,
//         date: document.querySelector("[name='date']") ? document.querySelector("[name='date']").value : "Fecha no proporcionada",
//         time: document.querySelector("[name='time']").value ,
//         personas: document.querySelector("[name='personas']").value ,
//         nivel: document.querySelector("[name='nivel']").value ,
//         message: document.querySelector("[name='message']").value
//     };

//     console.log("Datos del formulario:", formData);

//     // ✉️ Enviar correo al administrador
//     emailjs.send("service_491nysh", "template_ssz7tiq", formData)
//     .then(function(response) {
//         console.log("Correo enviado al admin:", response);
        
//         // ✅ Enviar correo de confirmación al usuario
//         return emailjs.send("service_491nysh", "template_gtavlbx", formData);
//     })
//     .then(function(response) {
//         console.log("Correo de confirmación enviado al usuario:", response);
        
//         // Mostrar la alerta de éxito con SweetAlert
//         Swal.fire({
//             title: "¡Éxito!",
//             text: "¡Tu visita ha sido agendada! Revisa tu correo.",
//             icon: "success",
//             confirmButtonText: "Aceptar"
//         });

//         document.getElementById("contact-form").reset(); // Limpia el formulario
//     })
//     .catch(function(error) {
//         console.error("Error en EmailJS:", error);
//         alert("Hubo un error al enviar los correos.");
//     });
// });


// // css3 para la panoramica en ios
// document.addEventListener("DOMContentLoaded", function () {
//   setTimeout(() => {
//       let panoContainer = document.getElementById("panorama");
//       let canvas = panoContainer.querySelector("canvas");

//       if (canvas) {
//           canvas.style.transform = "translateZ(0)"; // Forzar uso de CSS3 en lugar de WebGL
//       }
//   }, 1000);
// });


// Mejora y optimizacion del codigo 
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
console.log = console.warn = console.error = function () {};
console.debug = function () { return null; };
setInterval(() => {
  (function () {
      if (window.console && console.log) {
          console.log = function () {};
      }
  })();
}, 1000);

// Variables globales
let viewer, viewerone;

// 🚀 Iniciar panorama principal
function startPanorama() {
    if (viewer) return; // Evita inicializar más de una vez

    viewer = pannellum.viewer('panorama', {
        type: "equirectangular",
        panorama: "images/panfinal.png",
        autoLoad: true,
        showZoomCtrl: true,
        showFullscreenCtrl: true,
        yaw: 120,
        hfov: 90,
        pitch: 0,
        autoRotate: 3,
        vr: true,
        showControls: true,
        touchPan: true,
        orientationOnByDefault: true
    });

    console.log("Panorama principal iniciado");
}

// 🚀 Iniciar segundo panorama
function startPanoramaLV() {
    if (viewerone) return;

    viewerone = pannellum.viewer('panoramalvone', {
        type: "equirectangular",
        panorama: "images/pb/upanoramica.png",
        autoLoad: true,
        showZoomCtrl: true,
        showFullscreenCtrl: true,
        yaw: 120,
        hfov: 90,
        pitch: 0,
        autoRotate: 3,
        vr: true,
        showControls: true,
        touchPan: true,
        orientationOnByDefault: true
    });

    console.log("Segundo panorama iniciado");
}

// 📌 Función para activar panoramas en iOS
function requestGyroscopePermission() {
    console.log("Solicitando permiso de giroscopio...");

    if (typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission()
            .then(response => {
                if (response === "granted") {
                    console.log("Giroscopio activado");
                    startPanorama();
                    startPanoramaLV();
                } else {
                    alert("No se concedió acceso al giroscopio. Actívalo manualmente.");
                }
            })
            .catch(err => {
                console.error("Error al solicitar permiso de giroscopio:", err);
                alert("Este navegador no permite el acceso automático al giroscopio.");
            });
    } else {
        startPanorama();
        startPanoramaLV();
    }

    // Ocultar pantalla de inicio
    document.getElementById("start-screen").style.display = "none";
}

// 🌟 Detectar iOS y mostrar pantalla de inicio
function detectiOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

document.addEventListener("DOMContentLoaded", function () {
    if (detectiOS()) {
        console.log("Dispositivo iOS detectado, mostrando pantalla de inicio...");
        document.getElementById("start-screen").style.display = "flex";
    } else {
        console.log("No es iOS, iniciando panoramas automáticamente...");
        startPanorama();
        startPanoramaLV();
    }
});


// 🚀 Solicitar permiso de giroscopio en iOS
function requestGyroscopePermission() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
          .then(response => {
              if (response === 'granted') {
                  console.log("Giroscopio activado");
                  startPanorama();
                  startPanoramaLV();
              } else {
                  alert("Acceso al giroscopio denegado. Actívalo en la configuración del navegador.");
              }
          })
          .catch(err => {
              console.error("Error al solicitar permiso de giroscopio:", err);
              alert("Tu navegador no permite el acceso al giroscopio automáticamente.");
          });
  } else {
      startPanorama();
      startPanoramaLV();
  }
}

// 📌 iOS requiere interacción del usuario para activar el giroscopio
document.addEventListener("click", requestGyroscopePermission, { once: true });

// 🌟 Optimización para iOS: Evitar problemas con WebGL y Safari
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
      let panoContainer = document.getElementById("panorama");
      let canvas = panoContainer?.querySelector("canvas");

      if (canvas) {
          canvas.style.willChange = "transform";
          canvas.style.transform = "translateZ(0)";
          canvas.style.backfaceVisibility = "hidden";
      }
  }, 1000);
});

// ✨ Optimizar rendimiento en iOS cuando la pestaña pierde/gana el foco
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
      console.log("Página en segundo plano, pausando panorama...");
      if (viewer) viewer.stopAutoRotate();
      if (viewerone) viewerone.stopAutoRotate();
  } else {
      console.log("Página activa, reanudando panorama...");
      if (viewer) viewer.startAutoRotate();
      if (viewerone) viewerone.startAutoRotate();
  }
});

// 🚫 Evitar desplazamiento no deseado en dispositivos táctiles (Safari)
document.addEventListener("touchmove", function (event) {
  event.preventDefault();
}, { passive: false });

// Final section text - Animación de entrada
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

// Section formulario - Enviar correos con EmailJS
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita la recarga de la página

  emailjs.init("TV53dC7ZQsax8xKaF"); // Tu Public Key
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

