(function () {
    'use strict';
  
    var LETRAS_OPCION = ['A', 'B', 'C', 'D', 'E', 'F'];
  
    function escaparHTML(texto) {
      var div = document.createElement('div');
      div.textContent = texto == null ? '' : String(texto);
      return div.innerHTML;
    }
  
    function renderizarCuestionario(contenedor, bloque) {
      var el = typeof contenedor === 'string' ? document.getElementById(contenedor) : contenedor;
      if (!el) {
        return;
      }
  
      if (!bloque || !Array.isArray(bloque.preguntas) || bloque.preguntas.length === 0) {
        el.innerHTML =
          '<div class="alert alert-info mb-0" role="status">' +
          'Este cuestionario se habilitará cuando se cargue su banco de preguntas.' +
          '</div>';
        return;
      }
  
      var preguntas = bloque.preguntas;
      var total = preguntas.length;
      var indiceActual = 0;
      var puntaje = 0;
      var opcionSeleccionada = null;
      var respondida = false;
  
      function pintarPregunta() {
        var p = preguntas[indiceActual];
        var esVF = p.tipo === 'verdadero_falso';
        var opciones =
          esVF && (!Array.isArray(p.opciones) || p.opciones.length === 0)
            ? ['Verdadero', 'Falso']
            : p.opciones;
        var avancePorcentaje = Math.round((indiceActual / total) * 100);
        var tituloId = 'quiz-titulo-' + (bloque.id || 'ova') + '-' + indiceActual;
  
        var bloqueCaso = '';
        if (p.tipo === 'caso_practico' && p.contexto) {
          bloqueCaso =
            '<div class="ova-caso">' +
              '<p class="ova-caso-etiqueta">Caso práctico</p>' +
              '<p class="mb-0">' + escaparHTML(p.contexto) + '</p>' +
            '</div>';
        }
  
        var botonesOpciones = opciones
          .map(function (textoOpcion, idx) {
            var letra = esVF ? (idx === 0 ? 'V' : 'F') : LETRAS_OPCION[idx] || String(idx + 1);
            return (
              '<button type="button" class="ova-opcion" data-indice="' + idx + '" aria-pressed="false">' +
                '<span class="ova-opcion-letra">' + escaparHTML(letra) + '</span>' +
                '<span class="ova-opcion-texto">' + escaparHTML(textoOpcion) + '</span>' +
                '<span class="ova-opcion-estado"></span>' +
              '</button>'
            );
          })
          .join('');
  
        el.innerHTML =
          '<section class="ova-actividad ova-actividad-quiz" aria-labelledby="' + tituloId + '">' +
            '<div class="ova-actividad-meta">' +
              '<div class="ova-puntaje" aria-live="polite">' +
                '<i class="bi bi-star-fill" aria-hidden="true"></i>' +
                '<span>Puntaje</span>' +
                '<strong data-ova-puntaje>' + puntaje + '</strong>' +
              '</div>' +
              '<div class="progress ova-progreso" role="progressbar" aria-label="Avance de la actividad" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + avancePorcentaje + '">' +
                '<div class="progress-bar" data-ova-barra style="width: ' + avancePorcentaje + '%"></div>' +
              '</div>' +
              '<p class="ova-actividad-paso">Pregunta <span data-ova-paso>' + (indiceActual + 1) + '</span> de <span data-ova-total>' + total + '</span></p>' +
            '</div>' +
            bloqueCaso +
            '<h2 class="ova-enunciado" id="' + tituloId + '">' + escaparHTML(p.enunciado) + '</h2>' +
            '<div class="ova-opciones" role="radiogroup" aria-label="Opciones">' +
              botonesOpciones +
            '</div>' +
            '<div class="d-flex flex-wrap gap-2 mt-3">' +
              '<button type="button" class="btn ova-btn-confirmar" data-ova-confirmar disabled>Comprobar</button>' +
              '<button type="button" class="btn btn-outline-secondary" data-ova-siguiente hidden>' +
                (indiceActual + 1 < total ? 'Siguiente pregunta' : 'Finalizar cuestionario') +
              '</button>' +
            '</div>' +
            '<div class="ova-retro ova-retro-correcta" data-ova-retro-ok role="status" hidden>' +
              '<i class="bi bi-check-circle-fill" aria-hidden="true"></i>' +
              '<div>' +
                '<p class="ova-retro-titulo">Correcto</p>' +
                '<p class="ova-retro-texto">' + escaparHTML(p.retroalimentacion) + '</p>' +
              '</div>' +
            '</div>' +
            '<div class="ova-retro ova-retro-incorrecta" data-ova-retro-bad role="status" hidden>' +
              '<i class="bi bi-x-circle-fill" aria-hidden="true"></i>' +
              '<div>' +
                '<p class="ova-retro-titulo">Incorrecto</p>' +
                '<p class="ova-retro-texto">' + escaparHTML(p.retroalimentacion) + '</p>' +
              '</div>' +
            '</div>' +
          '</section>';
  
        var opcionesWrap = el.querySelector('.ova-opciones');
        var botones = el.querySelectorAll('.ova-opcion');
        var btnConfirmar = el.querySelector('[data-ova-confirmar]');
        var btnSiguiente = el.querySelector('[data-ova-siguiente]');
  
        botones.forEach(function (btn) {
          btn.addEventListener('click', function () {
            if (respondida) {
              return;
            }
            opcionSeleccionada = parseInt(btn.getAttribute('data-indice'), 10);
            botones.forEach(function (otro) {
              var activo = otro === btn;
              otro.classList.toggle('is-seleccionada', activo);
              otro.setAttribute('aria-pressed', activo ? 'true' : 'false');
            });
            btnConfirmar.disabled = false;
          });
        });
  
        btnConfirmar.addEventListener('click', function () {
          if (respondida || opcionSeleccionada === null) {
            return;
          }
          respondida = true;
          btnConfirmar.disabled = true;
  
          var esCorrecta = opcionSeleccionada === p.respuestaCorrecta;
          if (esCorrecta) {
            puntaje += 1;
          }
  
          if (opcionesWrap) {
            opcionesWrap.classList.add('is-resuelto');
          }
  
          botones.forEach(function (btn) {
            var idx = parseInt(btn.getAttribute('data-indice'), 10);
            btn.disabled = true;
            btn.classList.remove('is-seleccionada');
            if (idx === p.respuestaCorrecta) {
              btn.classList.add('is-correcta');
            } else if (idx === opcionSeleccionada && !esCorrecta) {
              btn.classList.add('is-incorrecta');
            }
          });
  
          var puntajeEl = el.querySelector('[data-ova-puntaje]');
          if (puntajeEl) {
            puntajeEl.textContent = String(puntaje);
          }
  
          var nuevoPorcentaje = Math.round(((indiceActual + 1) / total) * 100);
          var barra = el.querySelector('[data-ova-barra]');
          var progressWrap = el.querySelector('.ova-progreso');
          if (barra) {
            barra.style.width = nuevoPorcentaje + '%';
          }
          if (progressWrap) {
            progressWrap.setAttribute('aria-valuenow', String(nuevoPorcentaje));
          }
  
          var retroOk = el.querySelector('[data-ova-retro-ok]');
          var retroBad = el.querySelector('[data-ova-retro-bad]');
          if (esCorrecta && retroOk) {
            retroOk.hidden = false;
          } else if (!esCorrecta && retroBad) {
            retroBad.hidden = false;
          }
  
          if (btnSiguiente) {
            btnSiguiente.hidden = false;
            btnSiguiente.focus();
          }
        });
  
        btnSiguiente.addEventListener('click', function () {
          opcionSeleccionada = null;
          respondida = false;
          if (indiceActual + 1 < total) {
            indiceActual += 1;
            pintarPregunta();
          } else {
            pintarResumenFinal();
          }
        });
      }
  
      function pintarResumenFinal() {
        var porcentajeFinal = Math.round((puntaje / total) * 100);
        if (window.OVAUtil && typeof window.OVAUtil.guardarPuntaje === 'function' && bloque.id) {
          window.OVAUtil.guardarPuntaje(bloque.id, porcentajeFinal);
        }
  
        el.innerHTML =
          '<section class="ova-actividad ova-actividad-quiz" aria-live="polite">' +
            '<div class="ova-actividad-meta">' +
              '<div class="ova-puntaje">' +
                '<i class="bi bi-trophy-fill" aria-hidden="true"></i>' +
                '<span>Resultado</span>' +
                '<strong>' + puntaje + ' / ' + total + ' (' + porcentajeFinal + '%)</strong>' +
              '</div>' +
              '<div class="progress ova-progreso" role="progressbar" aria-label="Cuestionario completado" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100">' +
                '<div class="progress-bar" style="width: 100%"></div>' +
              '</div>' +
            '</div>' +
            '<h2 class="ova-enunciado">Actividad completada: ' + escaparHTML(bloque.titulo || 'Cuestionario') + '</h2>' +
            '<p>Respondiste correctamente <strong>' + puntaje + '</strong> de <strong>' + total + '</strong> preguntas. Tu puntaje quedó guardado en el progreso local.</p>' +
            '<button type="button" class="btn ova-btn-confirmar" data-ova-reiniciar>Reintentar cuestionario</button>' +
          '</section>';
  
        var btnReiniciar = el.querySelector('[data-ova-reiniciar]');
        if (btnReiniciar) {
          btnReiniciar.addEventListener('click', function () {
            indiceActual = 0;
            puntaje = 0;
            opcionSeleccionada = null;
            respondida = false;
            pintarPregunta();
          });
        }
      }
  
      pintarPregunta();
    }
  
    window.OVAQuizEngine = {
      render: renderizarCuestionario
    };
  
    document.addEventListener('DOMContentLoaded', function () {
      var contenedores = document.querySelectorAll('[data-ova-quiz]');
      contenedores.forEach(function (contenedor) {
        var clave = contenedor.getAttribute('data-ova-quiz');
        var datos = window.OVA_DATA && clave ? window.OVA_DATA[clave] : null;
        renderizarCuestionario(contenedor, datos);
      });
    });
  })();