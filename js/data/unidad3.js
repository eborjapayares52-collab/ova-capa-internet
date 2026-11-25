window.OVA_DATA = window.OVA_DATA || {};

window.OVA_DATA.unidad3 = {
  id: 'unidad3',
  titulo: 'Autoevaluación · Unidad 3: IPv4: encabezado y direccionamiento',
  preguntas: [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cuál es el valor mínimo del campo IHL (Internet Header Length) en una cabecera IPv4 estándar sin opciones y a cuántos bytes equivale?',
      opciones: [
        'Valor 4, equivalente a 16 bytes.',
        'Valor 5, equivalente a 20 bytes (5 palabras de 32 bits).',
        'Valor 15, equivalente a 60 bytes.',
        'Valor 8, equivalente a 32 bytes.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'El campo IHL mide la longitud de la cabecera en palabras de 32 bits (4 bytes). Como la cabecera IPv4 fija tiene 20 bytes, su valor mínimo es 5 (5 × 4 = 20 bytes) y su máximo es 15 (60 bytes).'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué función cumple el campo TTL (Time to Live) de 8 bits en la cabecera IPv4?',
      opciones: [
        'Indicar la velocidad máxima en Mbps a la que puede transmitirse el datagrama.',
        'Evitar que los datagramas circulen indefinidamente en bucles de enrutamiento, decrementándose en 1 en cada router hasta descartarse si llega a 0.',
        'Identificar si el contenido del paquete pertenece a TCP (6) o UDP (17).',
        'Almacenar el desplazamiento de cada fragmento cuando el paquete supera la MTU.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'Cada router que procesa un datagrama IPv4 resta 1 al campo TTL y recalcula el checksum de cabecera. Si el TTL alcanza 0, el router descarta el paquete y envía un mensaje ICMP Tiempo Excedido al origen.'
    },
    {
      tipo: 'verdadero_falso',
      enunciado: 'Las direcciones IPv4 privadas definidas en el RFC 1918 (10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16) pueden enrutarse directamente a través de los routers troncales de Internet público sin necesidad de traducción NAT.',
      opciones: ['Verdadero', 'Falso'],
      respuestaCorrecta: 1,
      retroalimentacion: 'Falso. Los bloques privados del RFC 1918 están reservados exclusivamente para redes internas (LAN); los proveedores de Internet (ISP) filtran y descartan paquetes con destino privado si no han pasado antes por NAT.'
    },
    {
      tipo: 'caso_practico',
      contexto: 'A una subred de laboratorio se le asigna el bloque CIDR 192.168.25.64/26 (máscara 255.255.255.192). Un estudiante configura un servidor en la dirección 192.168.25.127.',
      enunciado: '¿Por qué la configuración de ese servidor generará fallos de comunicación en la subred?',
      opciones: [
        'Porque 192.168.25.127 es una dirección pública reservada para servidores DNS raíz.',
        'Porque 192.168.25.127 corresponde a la dirección de difusión (broadcast) de la subred 192.168.25.64/26 y no puede asignarse a un host individual.',
        'Porque el prefijo /26 solo permite direcciones pares en el último octeto.',
        'Porque la máscara 255.255.255.192 pertenece exclusivamente a IPv6.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'Con prefijo /26 quedan 6 bits de host (64 direcciones en total, de .64 a .127). La primera (192.168.25.64) identifica la subred, la última (192.168.25.127) es el broadcast y los hosts útiles van de .65 a .126.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué campo de la cabecera IPv4 indica a la capa de Internet del host destino a qué protocolo superior (por ejemplo, ICMP = 1, TCP = 6 o UDP = 17) debe entregar la carga útil del datagrama?',
      opciones: [
        'DSCP (6 bits)',
        'Flags (3 bits)',
        'Protocolo (8 bits)',
        'Suma de comprobación de cabecera (16 bits)'
      ],
      respuestaCorrecta: 2,
      retroalimentacion: 'El campo Protocolo de 8 bits actúa como multiplexor entre la capa de Internet y la capa superior, indicando si los datos encapsulados corresponden a TCP (6), UDP (17), ICMP (1), OSPF (89), entre otros.'
    }
  ]
};