window.OVA_DATA = window.OVA_DATA || {};

window.OVA_DATA.unidad1 = {
  id: 'unidad1',
  titulo: 'Autoevaluación · Unidad 1: Funciones, encapsulación y datagramas',
  preguntas: [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Cuál es la función principal de la capa de Internet en la arquitectura TCP/IP?',
      opciones: [
        'Garantizar la entrega ordenada y libre de errores entre procesos de aplicación mediante ventanas deslizantes.',
        'Proporcionar direccionamiento lógico global y enrutar datagramas de forma independiente desde el origen hasta el destino a través de múltiples redes.',
        'Codificar los bits en señales eléctricas u ópticas para transmitirlos por el medio físico.',
        'Resolver nombres de dominio (FQDN) en direcciones IP mediante consultas recursivas.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'La capa de Internet (equivalente a la capa de red en OSI) se encarga del direccionamiento lógico (IP) y del reenvío/enrutamiento de datagramas entre redes heterogéneas bajo un modelo de mejor esfuerzo.'
    },
    {
      tipo: 'verdadero_falso',
      enunciado: 'En una red de datagramas como Internet, cada paquete transporta la dirección completa de destino y dos datagramas de una misma comunicación pueden seguir rutas diferentes.',
      opciones: ['Verdadero', 'Falso'],
      respuestaCorrecta: 0,
      retroalimentacion: 'Verdadero. A diferencia de los circuitos virtuales, las redes de datagramas no reservan un camino fijo previo; cada router consulta su tabla de reenvío de manera independiente para cada paquete.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'Durante el proceso descendiente de encapsulación en el host origen, ¿cómo se denomina la unidad de datos de protocolo (PDU) que entrega la capa de Internet hacia la capa de acceso a la red?',
      opciones: [
        'Segmento',
        'Trama',
        'Datagrama IP',
        'Mensaje de aplicación'
      ],
      respuestaCorrecta: 2,
      retroalimentacion: 'La capa de transporte entrega un segmento (TCP) o datagrama de usuario (UDP); la capa de Internet le antepone la cabecera IP formando un datagrama IP, que luego la capa de enlace encapsula en una trama.'
    },
    {
      tipo: 'caso_practico',
      contexto: 'Un administrador analiza el comportamiento de dos arquitecturas de red: en la Red A los routers mantienen estado por cada flujo activo tras una fase de señalización previa; en la Red B los routers carecen de estado por conexión y reenvían cada paquete mirando únicamente la dirección IP de destino.',
      enunciado: 'Según estas características, ¿qué modelo implementa la Red B y cuál es una ventaja directa frente a la Red A?',
      opciones: [
        'Modelo de circuitos virtuales; garantiza ancho de banda reservado sin congestión.',
        'Modelo de datagramas; mayor resiliencia ante fallos de enlaces intermedios sin necesidad de restablecer conexiones en los routers.',
        'Modelo de conmutación de circuitos físicos; elimina por completo el retardo de cola.',
        'Modelo orientado a conexión en capa 3; evita el uso de cabeceras de dirección en los paquetes.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'La Red B corresponde a una red de datagramas (sin estado por flujo en los routers). Si un enlace falla, los protocolos de enrutamiento actualizan las rutas y los datagramas siguientes se desvían sin reconstruir circuitos.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué diferencia fundamental existe entre el direccionamiento físico (MAC) y el direccionamiento lógico (IP)?',
      opciones: [
        'La dirección MAC tiene estructura jerárquica para enrutar entre países, mientras que la IP es plana y fija de fábrica.',
        'La dirección IP identifica interfaces dentro de una jerarquía de red para permitir el enrutamiento extremo a extremo, mientras que la dirección MAC identifica la interfaz en el enlace local.',
        'La dirección IP solo se usa en redes inalámbricas Wi-Fi y la MAC exclusivamente en fibra óptica.',
        'Ambas direcciones operan dentro de la cabecera de la capa de transporte.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'El direccionamiento lógico IP es jerárquico (red + host) y permite mover paquetes entre redes distintas; el direccionamiento MAC opera en el salto local de capa de enlace.'
    }
  ]
};