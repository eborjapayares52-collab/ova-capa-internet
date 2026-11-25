window.OVA_DATA = window.OVA_DATA || {};

window.OVA_DATA.unidad5 = {
  id: 'unidad5',
  titulo: 'Autoevaluación · Unidad 5: Enrutamiento y algoritmos',
  preguntas: [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cuál es la principal ventaja operativa del enrutamiento dinámico frente al enrutamiento estático en redes medianas o grandes?',
      opciones: [
        'Elimina por completo el consumo de CPU y memoria RAM en los routers.',
        'Permite que los routers descubran redes remotas y recalculen automáticamente rutas alternativas cuando falla un enlace o cambia la topología.',
        'No requiere que los routers mantengan tablas de reenvío en el plano de datos.',
        'Cifra automáticamente todo el tráfico de aplicación entre los hosts.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'Mientras que las rutas estáticas deben modificarse manualmente ante cualquier cambio, los protocolos de enrutamiento dinámico intercambian información de control para converger hacia nuevas rutas de forma automática ante fallos.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'En un algoritmo de enrutamiento de estado de enlace (Link-State) basado en Dijkstra, ¿cómo obtiene cada router la información necesaria para calcular el árbol de caminos más cortos?',
      opciones: [
        'Recibe únicamente la tabla de rutas completa de su vecino más cercano sin conocer el resto de la red.',
        'Inunda la red con anuncios de estado de enlace (LSA) que describen sus propios enlaces y costos vecinos, permitiendo que todos los routers construyan un mapa idéntico de la topología completa.',
        'Envía paquetes broadcast ARP a todos los hosts finales de Internet.',
        'Consulta un servidor DNS central cada vez que llega un datagrama.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'En los algoritmos de estado de enlace, cada nodo difunde el estado de sus enlaces directos (LSA) a toda el área; con esa base de datos topológica completa (LSDB), cada router ejecuta Dijkstra de forma independiente.'
    },
    {
      tipo: 'verdadero_falso',
      enunciado: 'En los algoritmos de vector de distancia (Bellman-Ford), cada router posee una visión completa de toda la topología de la red y de todos los enlaces intermedios antes de calcular sus rutas.',
      opciones: ['Verdadero', 'Falso'],
      respuestaCorrecta: 1,
      retroalimentacion: 'Falso. En el enfoque de vector de distancia ("enrutamiento por rumor"), cada router solo conoce el costo hacia sus vecinos conectados directamente y el vector de distancias estimadas que dichos vecinos le comunican periódicamente.'
    },
    {
      tipo: 'caso_practico',
      contexto: 'En una topología lineal de tres routers (A — B — C) con costo 1 por enlace y enrutamiento por vector de distancia sin mecanismos de prevención de bucles, el enlace entre B y C falla repentinamente. B marca su ruta directa a C con costo infinito, pero antes de notificarlo recibe una actualización de A anunciando que A puede llegar a C con costo 2.',
      enunciado: '¿Qué anomalía de convergencia se desencadena entre los routers A y B?',
      opciones: [
        'Desbordamiento de la tabla ARP por direcciones MAC duplicadas.',
        'El problema de cuenta al infinito (count-to-infinity), donde A y B actualizan iterativamente sus métricas hacia C incrementando el costo en bucle.',
        'Fragmentación excesiva de los datagramas IPv6 en el enlace entre A y B.',
        'Saturación inmediata del ancho de banda por mensajes ICMP Echo Reply.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'B cree equivocadamente que A tiene una ruta válida hacia C (sin saber que A pasaba por B) y actualiza su costo a 3; luego A actualiza el suyo a 4 y así sucesivamente. Este bucle se denomina cuenta al infinito.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué técnica evita bucles de enrutamiento entre routers vecinos en vector de distancia al prohibir que un router anuncie una ruta a través de la misma interfaz por la cual la aprendió?',
      opciones: [
        'Horizonte dividido (Split Horizon)',
        'Coincidencia de prefijo más largo (Longest Prefix Match)',
        'Doble pila (Dual Stack)',
        'Planificación equitativa ponderada (WFQ)'
      ],
      respuestaCorrecta: 0,
      retroalimentacion: 'La regla de horizonte dividido (Split Horizon) establece que nunca es útil enviar información sobre una ruta de vuelta en la dirección desde la cual se recibió originalmente, previniendo bucles directos entre vecinos.'
    }
  ]
};