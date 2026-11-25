window.OVA_DATA = window.OVA_DATA || {};

window.OVA_DATA.unidad6 = {
  id: 'unidad6',
  titulo: 'Autoevaluación · Unidad 6: RIP, OSPF y BGP',
  preguntas: [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cuál es la diferencia estructural entre un protocolo IGP (como RIP u OSPF) y un protocolo EGP (como BGP)?',
      opciones: [
        'Los IGP solo funcionan sobre IPv6 y los EGP exclusivamente sobre IPv4.',
        'Los IGP intercambian información de enrutamiento dentro de un mismo Sistema Autónomo (AS), mientras que BGP coordina el intercambio de rutas y políticas entre distintos Sistemas Autónomos en Internet.',
        'Los IGP utilizan enlaces satelitales y los EGP únicamente cables de par trenzado.',
        'Los IGP operan en la capa de transporte y los EGP en la capa física.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'Un Sistema Autónomo (AS) es una red o conjunto de redes bajo una misma administración técnica. Los protocolos interiores (IGP) enrutan dentro del AS, mientras que BGP (protocolo exterior o EGP) interconecta los distintos AS que forman Internet.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Por qué el protocolo RIP (Routing Information Protocol) resulta inadecuado para redes empresariales de gran escala?',
      opciones: [
        'Porque requiere enlaces de fibra óptica de al menos 100 Gbps en cada salto.',
        'Porque utiliza el algoritmo de Dijkstra y consume demasiada memoria RAM al calcular áreas jerárquicas.',
        'Porque su métrica de conteo de saltos limita los caminos válidos a un máximo de 15 saltos (16 se considera inalcanzable) y no distingue el ancho de banda de los enlaces.',
        'Porque no soporta direcciones IPv4 con máscara de subred.'
      ],
      respuestaCorrecta: 2,
      retroalimentacion: 'RIP mide la distancia únicamente en número de routers (saltos) hasta un límite de 15; un enlace lento de 10 Mbps y uno rápido de 10 Gbps tienen exactamente el mismo costo (1 salto), lo que genera rutas subóptimas en redes grandes.'
    },
    {
      tipo: 'verdadero_falso',
      enunciado: 'En una red OSPF multiárea, todas las áreas no troncales deben conectarse física o lógicamente al Área 0 (área de respaldo o backbone) para intercambiar información de enrutamiento entre sí.',
      opciones: ['Verdadero', 'Falso'],
      respuestaCorrecta: 0,
      retroalimentacion: 'Verdadero. OSPF exige una topología jerárquica de dos niveles centrada en el Área 0 (backbone); los routers de borde de área (ABR) resumen y redistribuyen las rutas entre el Área 0 y las demás áreas.'
    },
    {
      tipo: 'caso_practico',
      contexto: 'El router de borde del Sistema Autónomo AS 65010 recibe mediante eBGP un anuncio de prefijo de red cuya lista de atributos incluye AS-PATH: 65040 65025 65010 65002.',
      enunciado: '¿Qué decisión toma el router de AS 65010 al inspeccionar ese atributo AS-PATH y por qué?',
      opciones: [
        'Acepta la ruta con máxima prioridad porque tiene cuatro saltos de AS.',
        'Descarta la ruta inmediatamente porque detecta su propio número de Sistema Autónomo (65010) dentro del AS-PATH, evitando un bucle de enrutamiento inter-AS.',
        'Convierte el anuncio BGP en paquetes RIPv2 y los difunde por broadcast.',
        'Decrementa el número 65010 a 65009 y reenvía el paquete sin modificar la tabla.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'BGP es un protocolo de vector de rutas (Path-Vector). Cuando un router ve su propio número de AS en el atributo AS-PATH de un anuncio recibido, rechaza la ruta para garantizar una topología libre de bucles entre Sistemas Autónomos.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué mecanismo de transporte en la pila TCP/IP utiliza cada uno de los tres protocolos principales de enrutamiento?',
      opciones: [
        'RIP usa UDP (puerto 520), OSPF se encapsula directamente sobre IP (Protocolo 89) y BGP utiliza TCP (puerto 179).',
        'Los tres protocolos utilizan mensajes ICMP Echo Request.',
        'RIP usa TCP (puerto 80), OSPF usa UDP (puerto 53) y BGP usa ARP.',
        'Los tres protocolos se encapsulan directamente en tramas Ethernet sin cabecera IP.'
      ],
      respuestaCorrecta: 0,
      retroalimentacion: 'RIP envía mensajes periódicos sobre UDP puerto 520; OSPF implementa su propia fiabilidad directamente sobre IP usando el número de protocolo 89; y BGP establece sesiones confiables punto a punto sobre TCP puerto 179.'
    }
  ]
};