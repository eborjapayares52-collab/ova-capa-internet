window.OVA_DATA = window.OVA_DATA || {};

window.OVA_DATA.unidad2 = {
  id: 'unidad2',
  titulo: 'Autoevaluación · Unidad 2: Router, colas y reenvío',
  preguntas: [
    {
      tipo: 'opcion_multiple',
      enunciado: '¿Qué diferencia funcional existe entre el plano de datos y el plano de control dentro de un router?',
      opciones: [
        'El plano de datos ejecuta protocolos como OSPF y BGP, mientras que el plano de control mueve los bits por el cable.',
        'El plano de datos realiza el reenvío local de cada datagrama desde un puerto de entrada hacia uno de salida, mientras que el plano de control calcula y mantiene las tablas de enrutamiento.',
        'El plano de datos solo opera en redes inalámbricas y el plano de control en enlaces de fibra óptica.',
        'Ambos planos son idénticos y se ejecutan exclusivamente en la tarjeta de red del host origen.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'El plano de datos (forwarding) opera por hardware en nanosegundos para conmutar cada paquete; el plano de control (routing) opera por software en el procesador de enrutamiento para construir la tabla de rutas.'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: 'Cuando la dirección IP de destino de un paquete coincide con varias entradas en la tabla de reenvío de un router, ¿qué regla aplica el equipo para elegir la interfaz de salida?',
      opciones: [
        'Selecciona la ruta con la máscara de subred más corta (menos específica).',
        'Aplica la coincidencia de prefijo más largo (Longest Prefix Match), eligiendo la ruta más específica.',
        'Envía una copia del datagrama por todas las interfaces coincidentes simultáneamente.',
        'Descarta el paquete y solicita retransmisión mediante TCP.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'La regla de coincidencia de prefijo más largo (Longest Prefix Match) garantiza que el router envíe el paquete hacia la subred más específica disponible en su tabla de reenvío.'
    },
    {
      tipo: 'verdadero_falso',
      enunciado: 'En un entramado de conmutación basado en red de interconexión (crossbar), es posible transferir múltiples paquetes en paralelo siempre que se dirijan a puertos de salida distintos.',
      opciones: ['Verdadero', 'Falso'],
      respuestaCorrecta: 0,
      retroalimentacion: 'Verdadero. A diferencia de la conmutación por memoria o por bus compartido (donde solo viaja un paquete a la vez), una matriz crossbar permite rutas simultáneas entre distintos pares entrada-salida.'
    },
    {
      tipo: 'caso_practico',
      contexto: 'Un router troncal recibe ráfagas de tráfico desde tres interfaces de entrada de 10 Gbps que deben salir simultáneamente por una misma interfaz de salida de 10 Gbps. El búfer de salida alcanza su capacidad máxima durante varios milisegundos.',
      enunciado: '¿Qué fenómeno ocurre en el puerto de salida y cuál es su efecto directo sobre los datagramas que siguen llegando?',
      opciones: [
        'Se activa el bloqueo de cabeza de línea (HOL) en el procesador de enrutamiento y se reinicia el router.',
        'Se produce congestión y desbordamiento del búfer de salida, provocando retardos de cola y pérdida (descarte) de paquetes.',
        'El entramado de conmutación duplica automáticamente el ancho de banda físico del enlace de salida.',
        'La capa de Internet detiene el envío en el origen mediante control de flujo por ventana deslizante.'
      ],
      respuestaCorrecta: 1,
      retroalimentacion: 'Cuando la tasa de llegada hacia un puerto de salida supera su capacidad de transmisión y el búfer se llena, el router debe descartar paquetes entrantes (política drop-tail o gestión activa de colas).'
    },
    {
      tipo: 'opcion_multiple',
      enunciado: '¿En qué consiste el bloqueo de cabeza de línea (Head-of-Line o HOL blocking) en un router con colas en los puertos de entrada?',
      opciones: [
        'Un paquete al frente de una cola de entrada queda retenido porque su puerto de salida está ocupado, bloqueando a otros paquetes detrás de él que van hacia puertos de salida libres.',
        'La cabecera IPv4 supera los 60 bytes y el puerto de entrada rechaza el datagrama.',
        'El cable Ethernet de entrada supera los 100 metros y atenúa la señal.',
        'La tabla ARP expira antes de que el paquete cruce el entramado de conmutación.'
      ],
      respuestaCorrecta: 0,
      retroalimentacion: 'El bloqueo HOL ocurre en las colas de entrada FIFO: aunque exista un paquete en segunda posición cuyo puerto de salida esté libre, debe esperar hasta que se despache el primer paquete de esa misma cola.'
    }
  ]
};