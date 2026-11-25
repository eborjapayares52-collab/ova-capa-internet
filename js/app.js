(function () {
    'use strict';
  
    var STORAGE_KEY = 'ova-capa-internet-progreso';
    var UNIDADES_VALIDAS = [
      'unidad1',
      'unidad2',
      'unidad3',
      'unidad4',
      'unidad5',
      'unidad6'
    ];
  
    function estadoInicial() {
      return {
        unidadesVisitadas: [],
        puntajes: {}
      };
    }
  
    function leerProgreso() {
      try {
        var raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          return estadoInicial();
        }
        var parsed = JSON.parse(raw);
        var visitadas = Array.isArray(parsed.unidadesVisitadas)
          ? parsed.unidadesVisitadas.filter(function (id, idx, arr) {
              return UNIDADES_VALIDAS.indexOf(id) !== -1 && arr.indexOf(id) === idx;
            })
          : [];
        var puntajes =
          parsed && typeof parsed.puntajes === 'object' && parsed.puntajes !== null && !Array.isArray(parsed.puntajes)
            ? parsed.puntajes
            : {};
  
        return {
          unidadesVisitadas: visitadas,
          puntajes: puntajes
        };
      } catch (error) {
        return estadoInicial();
      }
    }
  
    function guardarProgreso(progreso) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso));
      } catch (error) {
        // Silencioso si el navegador bloquea almacenamiento local
      }
    }
  
    function marcarEnlaceActivo() {
      if (!document.body) {
        return;
      }
      var paginaActual = document.body.getAttribute('data-page') || '';
      var enlaces = document.querySelectorAll('a.nav-link[data-nav]');
  
      enlaces.forEach(function (enlace) {
        var destino = enlace.getAttribute('data-nav');
        if (destino === paginaActual) {
          enlace.classList.add('active');
          enlace.setAttribute('aria-current', 'page');
        } else {
          enlace.classList.remove('active');
          enlace.removeAttribute('aria-current');
        }
      });
    }
  
    function unidadTienePuntaje(puntajes, unidadId) {
      return Object.keys(puntajes).some(function (clave) {
        var esDeUnidad = clave === unidadId || clave.indexOf(unidadId + '-') === 0;
        var valor = puntajes[clave];
        return esDeUnidad && typeof valor === 'number' && !isNaN(valor);
      });
    }
  
    function actualizarUIProgreso() {
      var progreso = leerProgreso();
      var totalVisitadas = progreso.unidadesVisitadas.length;
      var porcentaje = Math.round((totalVisitadas / UNIDADES_VALIDAS.length) * 100);
  
      document.querySelectorAll('[data-ova-unidades-visitadas]').forEach(function (el) {
        el.textContent = String(totalVisitadas);
      });
  
      document.querySelectorAll('[data-ova-progreso]').forEach(function (el) {
        el.setAttribute('aria-valuenow', String(totalVisitadas));
      });
  
      document.querySelectorAll('[data-ova-barra-progreso]').forEach(function (el) {
        el.style.width = porcentaje + '%';
      });
  
      document.querySelectorAll('[data-unidad]').forEach(function (el) {
        var uid = el.getAttribute('data-unidad');
        var visitada = progreso.unidadesVisitadas.indexOf(uid) !== -1;
        var completada = unidadTienePuntaje(progreso.puntajes, uid);
  
        el.classList.toggle('is-visitada', visitada);
        el.classList.toggle('is-completada', completada);
  
        var badgeEstado = el.querySelector('[data-ova-estado-texto]');
        if (badgeEstado) {
          if (completada) {
            badgeEstado.textContent = 'Completada';
          } else if (visitada) {
            badgeEstado.textContent = 'Visitada';
          } else {
            badgeEstado.textContent = 'Sin visitar';
          }
        }
      });
    }
  
    function registrarUnidadVisitada(unidadId) {
      if (UNIDADES_VALIDAS.indexOf(unidadId) === -1) {
        return;
      }
      var progreso = leerProgreso();
      if (progreso.unidadesVisitadas.indexOf(unidadId) === -1) {
        progreso.unidadesVisitadas.push(unidadId);
        guardarProgreso(progreso);
      }
      actualizarUIProgreso();
    }
  
    function guardarPuntaje(actividadId, puntaje) {
      if (!actividadId || typeof puntaje !== 'number' || isNaN(puntaje)) {
        return;
      }
      var progreso = leerProgreso();
      progreso.puntajes[actividadId] = puntaje;
      guardarProgreso(progreso);
      actualizarUIProgreso();
    }
  
    function obtenerPuntaje(actividadId) {
      var progreso = leerProgreso();
      return Object.prototype.hasOwnProperty.call(progreso.puntajes, actividadId)
        ? progreso.puntajes[actividadId]
        : null;
    }
  
    window.OVAUtil = {
      obtenerProgreso: leerProgreso,
      registrarUnidadVisitada: registrarUnidadVisitada,
      guardarPuntaje: guardarPuntaje,
      obtenerPuntaje: obtenerPuntaje,
      actualizarUI: actualizarUIProgreso
    };
  
    document.addEventListener('DOMContentLoaded', function () {
      marcarEnlaceActivo();
  
      var unidadActual = document.body
        ? document.body.getAttribute('data-unidad') || document.body.getAttribute('data-page')
        : '';
  
      if (UNIDADES_VALIDAS.indexOf(unidadActual) !== -1) {
        registrarUnidadVisitada(unidadActual);
      } else {
        actualizarUIProgreso();
      }
    });
  })();