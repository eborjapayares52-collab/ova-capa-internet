window.OVA_DATA = window.OVA_DATA || {};

window.OVA_DATA.evaluacion = {
  id: 'evaluacion',
  titulo: 'Evaluación final integradora · Capa de Internet del modelo TCP/IP',
  preguntas: [
    {
      tipo: 'opcion_multiple',
      enunciado: '[Unidad 1] Durante la encapsulación descendiente en el host emisor, ¿qué secuencia correcta de unidades de datos (PDU) atraviesa un mensaje desde la capa de transporte hasta el medio físico?',
      opciones: [
        'Trama → Segmento → Datagrama IP',
        'Segmento → Datagrama IP → Trama',
        'Datagrama IP → Trama → Segmento',
        'Paquete → Bit → Segmento'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'La capa de transporte entrega un segmento (TCP/UDP); la capa de Internet le agrega la cabecera IP formando un datagrama IP; y la capa de acceso a la red lo encapsula en una trama con direcciones físicas MAC.'
    },
    {
      tipo: 'verdadero_falso',
      enunciado: '[Unidad 1] En una red de datagramas como Internet, los routers mantienen estado por cada flujo activo y reservan de antemano un circuito fijo antes de transmitir paquetes.',
      opciones: ['Verdadero', 'Falso'],
      respuestaCorrecta: 1,
      retroalimentacion: 'Falso. Internet opera como una red de datagramas sin conexión y sin estado por flujo en los routers; cada paquete lleva la dirección completa de destino y se enruta de forma independiente.'
    },
    {
      tipo: 'caso_practico',
      contexto: 'Un router dispone en su tabla de reenvío de las entradas: 172.16.0.0/16 → Eth0, 172.16.32.0/20 → Eth1, 172.16.40.0/24 → Eth2 y 0.0.0.0/0 → Serial0. Llega un datagrama con dirección IP de destino 172.16.40.88.',
      enunciado: '[Unidad 2] Aplicando la regla de coincidencia de prefijo más largo (Longest Prefix Match), ¿por qué interfaz despachará el router el datagrama?',
      opciones: [
        'Eth0 (/16)',
        'Eth1 (/20)',
        'Eth2 (/24)',
        'Serial0 (/0)'
      ],
      respuestaCorrecta: 2,
      retroalimentacion: 'La dirección 172.16.40.88 encaja en las cuatro rutas, pero el router selecciona 172.16.40.0/24 (Eth2) por tener la máscara más específica (24 bits coincidentes).'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '[Unidad 2] ¿Qué describe con exactitud el fenómeno de bloqueo de cabeza de línea (HOL blocking) en un router?',
      opciones: [
        'Un paquete al frente de una cola de entrada queda retenido porque su puerto de salida está ocupado, impidiendo que otros paquetes detrás de él avancen hacia puertos de salida que están libres.',
        'El procesador de enrutamiento rechaza paquetes cuya cabecera IPv6 supera los 40 bytes.',
        'Un router descarta paquetes ICMP cuando el TTL llega a 255.',
        'Dos interfaces Ethernet negocian velocidades distintas en el enlace físico.'
      ],
      respuestaCorrecta: 0,
      retroalimentacion: 'El bloqueo HOL ocurre en colas FIFO de entrada: el primer paquete detenido por contención en su salida bloquea a paquetes posteriores de la misma cola aunque sus destinos estén disponibles.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '[Unidad 3] ¿Por qué todo router IPv4 debe recalcular obligatoriamente el campo Suma de Comprobación de Cabecera (Header Checksum) antes de reenviar un datagrama?',
      opciones: [
        'Porque la dirección IP de origen cambia en cada salto intermedio.',
        'Porque el router decrementa en 1 el campo TTL en cada salto, modificando el contenido binario de la cabecera IPv4.',
        'Porque el campo Versión pasa de 4 a 6 al cruzar un enlace troncal.',
        'Porque el checksum IPv4 verifica también la integridad de los datos de aplicación.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'Al reducir en 1 el valor del TTL en cada router, cambia la cabecera IPv4 y debe actualizarse su suma de comprobación de 16 bits para que el siguiente nodo no la descarte por error.'
    },
    {
      tipo: 'caso_practico',
      contexto: 'Se asigna el bloque CIDR 10.10.5.64/27 (máscara 255.255.255.224) para una subred de servidores de laboratorio.',
      enunciado: '[Unidad 3] ¿Cuál es la dirección de difusión (broadcast) correspondiente a esa subred?',
      opciones: [
        '10.10.5.64',
        '10.10.5.94',
        '10.10.5.95',
        '10.10.5.255'
      ],
      respuestaCorrecta: 2,
      retroalimentacion: 'Un prefijo /27 deja 5 bits de host (32 direcciones en total, de .64 a .95). La primera (.64) es la red, los hosts útiles van de .65 a .94 (30 hosts) y la última (10.10.5.95) es el broadcast.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '[Unidad 4] ¿Qué mejora estructural introduce la cabecera básica de IPv6 (40 bytes fijos) respecto a IPv4?',
      opciones: [
        'Amplía las direcciones a 64 bits y añade un campo de checksum de 32 bits.',
        'Elimina el checksum de cabecera y la fragmentación en routers intermedios, trasladando las funcionalidades opcionales a cabeceras de extensión encadenadas mediante el campo Next Header.',
        'Permite el uso de direcciones de broadcast globales en toda la red.',
        'Mantiene el campo IHL variable entre 20 y 60 bytes.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'IPv6 utiliza direcciones de 128 bits y una cabecera fija de 40 bytes sin checksum ni fragmentación en routers, delegando las opciones al encadenamiento de cabeceras de extensión (Next Header).'
    },
    {
      tipo: 'caso_practico',
      contexto: 'Al ejecutar traceroute hacia un destino remoto, la herramienta envía datagramas con TTL = 1, luego TTL = 2 y así sucesivamente.',
      enunciado: '[Unidad 4] ¿Qué mensaje ICMP devuelve cada router intermedio cuando el contador TTL/Hop Limit del paquete llega a 0?',
      opciones: [
        'ICMP Time Exceeded (Tiempo excedido: Tipo 11 en IPv4 / Tipo 3 en ICMPv6)',
        'ICMP Echo Reply (Respuesta de eco: Tipo 0 en IPv4 / Tipo 129 en ICMPv6)',
        'ICMP Redirect (Redirección: Tipo 5)',
        'ICMP Router Solicitation (Solicitud de router: Tipo 10)'
      ],
      respuestaCorrecta: 0,
      retroalimentacion: 'Cuando un router decrementa el TTL/Hop Limit a 0, descarta el datagrama y envía al origen un mensaje ICMP Time Exceeded, permitiendo a traceroute identificar la dirección IP de ese salto.'
    },
    {
      tipo: 'verdadero_falso',
      enunciado: '[Unidad 5] En los algoritmos de enrutamiento de estado de enlace (como Dijkstra), cada router inunda el área con anuncios LSA de sus enlaces directos para que todos los routers construyan una base de datos topológica idéntica (LSDB).',
      opciones: ['Verdadero', 'Falso'],
      respuestaCorrecta: 0,
      retroalimentacion: 'Verdadero. Con la base de datos topológica completa (LSDB), cada router ejecuta de manera independiente el algoritmo de Dijkstra (SPF) para calcular el árbol de rutas más cortas.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '[Unidad 5] ¿Cuál es el objetivo de la técnica de Horizonte Dividido (Split Horizon) en los algoritmos de vector de distancia?',
      opciones: [
        'Dividir una red IPv4 /16 en subredes /24 iguales.',
        'Aumentar el límite de saltos de RIP de 15 a 255.',
        'Evitar bucles de enrutamiento entre vecinos prohibiendo que un router anuncie una ruta a través de la misma interfaz por la cual la aprendió.',
        'Encapsular paquetes IPv6 dentro de tramas Ethernet.'
      ],
      respuestaCorrecta: 2,
      retroalimentacion: 'Split Horizon impide que un router devuelva información de enrutamiento por la misma interfaz desde la que recibió esa ruta, mitigando bucles directos y el problema de cuenta al infinito.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '[Unidad 6] ¿Cuál de las siguientes asociaciones entre protocolo de enrutamiento, métrica/criterio y protocolo de transporte es correcta?',
      opciones: [
        'RIPv2: saltos (máx. 15) sobre UDP 520 · OSPF: costo por ancho de banda sobre IP (proto 89) · BGP-4: políticas y AS-PATH sobre TCP 179.',
        'RIPv2: ancho de banda sobre TCP 179 · OSPF: saltos sobre UDP 520 · BGP-4: ARP sobre Ethernet.',
        'RIPv2: políticas AS-PATH sobre ICMP · OSPF: saltos sobre UDP 53 · BGP-4: costo por retardo sobre IP (proto 89).',
        'Los tres protocolos utilizan sesiones TCP en el puerto 80.'
      ],
      respuestaCorrecta: 0,
      retroalimentacion: 'RIPv2 usa UDP puerto 520 con métrica de saltos (hasta 15); OSPF corre directamente sobre IP (Protocolo 89) con costo basado en ancho de banda; y BGP-4 utiliza TCP puerto 179 guiado por políticas.'
    },
    {
      tipo: 'caso_practico',
      contexto: 'El router de borde del Sistema Autónomo AS 65200 recibe por eBGP una actualización para el prefijo 203.0.113.0/24 con el atributo AS-PATH: 65400 65200 65010.',
      enunciado: '[Unidad 6] ¿Cómo procesa el router de AS 65200 ese anuncio BGP?',
      opciones: [
        'Lo acepta como ruta principal porque contiene exactamente tres Sistemas Autónomos.',
        'Lo descarta de inmediato porque reconoce su propio número de Sistema Autónomo (65200) dentro del AS-PATH, evitando un bucle inter-AS.',
        'Lo reenvía por inundación LSA hacia el Área 0 de OSPF.',
        'Cambia el puerto TCP 179 por UDP 520 y lo instala con métrica 1.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'Como protocolo de vector de rutas (Path-Vector), BGP inspecciona el atributo AS-PATH y rechaza cualquier anuncio que ya contenga el ASN local (65200), garantizando rutas libres de bucles entre Sistemas Autónomos.'
    }
  ]
};