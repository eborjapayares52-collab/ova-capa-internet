window.OVA_DATA = window.OVA_DATA || {};

window.OVA_DATA.unidad4 = {
  id: 'unidad4',
  titulo: 'Autoevaluación · Unidad 4: IPv6, transición e ICMP',
  preguntas: [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cuál es el tamaño fijo de la cabecera básica de IPv6 y por qué elimina el campo de suma de comprobación (Header Checksum) presente en IPv4?',
      opciones: [
        '20 bytes; lo elimina porque IPv6 solo funciona sobre enlaces de fibra óptica sin ruido.',
        '40 bytes; lo elimina para agilizar el reenvío en los routers sin tener que recalcular el checksum en cada salto al decrementar el Límite de Saltos, delegando la verificación de errores a las capas de enlace y transporte.',
        '64 bytes; lo elimina porque ICMPv6 cifra automáticamente toda la cabecera.',
        '32 bytes; lo elimina porque IPv6 no utiliza direcciones de origen.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'La cabecera fija de IPv6 mide 40 bytes (320 bits). Al suprimir el checksum de cabecera, los routers no necesitan recalcularlo cada vez que decrementan el Hop Limit, acelerando el procesamiento en el plano de datos.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cuál es la representación abreviada válida según el RFC 5952 para la dirección IPv6 2001:0db8:0000:0000:0042:0000:0000:0001?',
      opciones: [
        '2001:db8::42::1',
        '2001:db8::42:0:0:1',
        '2001:db8:0:0:42::1',
        '2001:0db8::42:0:0:1'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'Se suprimen los ceros a la izquierda de cada hexteto (0db8 → db8, 0042 → 42, 0001 → 1) y la doble coma (::) solo puede usarse una vez en toda la dirección para comprimir el bloque más largo de hextetos nulos consecutivos.'
    },
    {
      tipo: 'verdadero_falso',
      enunciado: 'En el mecanismo de transición mediante tunelización (tunneling), un datagrama IPv6 completo se encapsula como carga útil dentro de un paquete IPv4 para atravesar una infraestructura intermedia que aún solo enruta IPv4.',
      opciones: ['Verdadero', 'Falso'],
      respuestaCorrecta: 0,
      retroalimentacion: 'Verdadero. La tunelización (como 6in4 o Teredo) toma el datagrama IPv6 íntegro y le antepone una cabecera IPv4 (con campo Protocolo = 41) en el router de entrada del túnel, desencapsulándolo en el extremo de salida.'
    },
    {
      tipo: 'caso_practico',
      contexto: 'Un ingeniero ejecuta el comando traceroute (o tracert) desde su estación de trabajo hacia un servidor remoto. Observa que los saltos 1, 2 y 3 responden con sus direcciones IP y tiempos de ida y vuelta, pero el salto 4 muestra tres asteriscos (* * *).',
      enunciado: '¿Qué principio de funcionamiento de ICMP explica la aparición de los saltos 1 al 3 y qué ocurre en el salto 4?',
      opciones: [
        'Traceroute envía paquetes con TTL/Hop Limit incremental (1, 2, 3...) provocando mensajes ICMP Tiempo Excedido en cada router; en el salto 4 el router descarta el paquete pero tiene bloqueado o filtrado el envío de respuestas ICMP.',
        'Traceroute establece una sesión TCP con cada router; en el salto 4 se agotó la memoria RAM del equipo.',
        'Traceroute utiliza mensajes ARP broadcast hasta el salto 3 y cambia a BGP en el salto 4.',
        'El salto 4 indica que el cable de red del equipo origen está desconectado.'
      ],
      respuestaCorrecta: 0,
      retroalimentacion: 'Traceroute incrementa el TTL/Hop Limit de 1 en 1 para que cada router intermedio devuelva un mensaje ICMP Time Exceeded (Tipo 11 en IPv4 / Tipo 3 en ICMPv6). Los asteriscos indican que ese nodo no respondió dentro del tiempo de espera o filtra tráfico ICMP por política de seguridad.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué par de mensajes ICMP utiliza la herramienta Ping en IPv4 para verificar la conectividad y medir el tiempo de ida y vuelta (RTT) hacia un destino?',
      opciones: [
        'Router Solicitation (Tipo 10) y Router Advertisement (Tipo 9)',
        'Echo Request (Tipo 8) y Echo Reply (Tipo 0)',
        'Destination Unreachable (Tipo 3) y Redirect (Tipo 5)',
        'Time Exceeded (Tipo 11) y Parameter Problem (Tipo 12)'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'Ping envía un mensaje ICMP Echo Request (Tipo 8, Código 0 en IPv4; Tipo 128 en ICMPv6) y espera un ICMP Echo Reply (Tipo 0 en IPv4; Tipo 129 en ICMPv6) desde el host destino.'
    }
  ]
};