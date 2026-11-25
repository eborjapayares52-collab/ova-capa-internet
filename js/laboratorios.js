document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".lab-tab");
  const panels = document.querySelectorAll(".lab-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.lab;

      tabs.forEach((t) => {
        const isSelected = t === tab;
        t.classList.toggle("is-active", isSelected);
        t.setAttribute("aria-selected", String(isSelected));
      });

      panels.forEach((panel) => {
        const isTarget = panel.id === targetId;
        panel.hidden = !isTarget;
        panel.classList.toggle("is-active", isTarget);
      });
    });
  });

  // --- LAB 1: TOPOLOGÍA Y RUTAS ---
  const topologyContainer = document.getElementById("lab1-topology");
  const routeTextEl = document.getElementById("lab1-route-text");

  const nodes = [
    { id: "PC", label: "PC", ip: "192.168.1.10", x: 60, y: 170, type: "host" },
    { id: "R1", label: "R1", ip: "192.168.1.1", x: 185, y: 170, type: "router" },
    { id: "R2", label: "R2", ip: "10.8.1.2", x: 325, y: 85, type: "router" },
    { id: "R3", label: "R3", ip: "10.8.2.3", x: 325, y: 255, type: "router" },
    { id: "R4", label: "R4", ip: "10.0.3.4", x: 475, y: 170, type: "router" },
    { id: "SRV", label: "SRV", ip: "200.5.5.10", x: 610, y: 170, type: "server" },
    { id: "NET", label: "NET", ip: "200.5.5.0/24", x: 610, y: 280, type: "net" }
  ];

  const links = [
    { id: "PC-R1", from: "PC", to: "R1", cost: 0, up: true, toggleable: false },
    { id: "R1-R2", from: "R1", to: "R2", cost: 1, up: true, toggleable: true },
    { id: "R1-R3", from: "R1", to: "R3", cost: 2, up: true, toggleable: true },
    { id: "R2-R4", from: "R2", to: "R4", cost: 1, up: true, toggleable: true },
    { id: "R3-R4", from: "R3", to: "R4", cost: 1, up: true, toggleable: true },
    { id: "R4-SRV", from: "R4", to: "SRV", cost: 0, up: true, toggleable: false },
    { id: "SRV-NET", from: "SRV", to: "NET", cost: 0, up: true, toggleable: false }
  ];

  function getNode(id) {
    return nodes.find((n) => n.id === id);
  }

  function findCheapestRoute(startId = "PC", endId = "SRV") {
    const dist = {};
    const prev = {};
    const visited = new Set();

    nodes.forEach((n) => {
      dist[n.id] = Infinity;
      prev[n.id] = null;
    });
    dist[startId] = 0;

    while (visited.size < nodes.length) {
      let current = null;
      nodes.forEach((n) => {
        if (!visited.has(n.id) && (current === null || dist[n.id] < dist[current])) {
          current = n.id;
        }
      });

      if (current === null || dist[current] === Infinity) break;
      visited.add(current);

      links.forEach((link) => {
        if (!link.up) return;
        let neighbor = null;
        if (link.from === current) neighbor = link.to;
        else if (link.to === current) neighbor = link.from;

        if (neighbor && !visited.has(neighbor)) {
          const newCost = dist[current] + link.cost;
          if (newCost < dist[neighbor]) {
            dist[neighbor] = newCost;
            prev[neighbor] = current;
          }
        }
      });
    }

    if (dist[endId] === Infinity) {
      return { path: [], cost: null };
    }

    const path = [];
    let step = endId;
    while (step) {
      path.unshift(step);
      step = prev[step];
    }

    return { path, cost: dist[endId] };
  }

  function renderTopology() {
    if (!topologyContainer) return;

    const { path, cost } = findCheapestRoute("PC", "SRV");
    const activeEdges = new Set();
    for (let i = 0; i < path.length - 1; i++) {
      activeEdges.add(`${path[i]}-${path[i + 1]}`);
      activeEdges.add(`${path[i + 1]}-${path[i]}`);
    }

    if (routeTextEl) {
      if (path.length > 0) {
        routeTextEl.textContent = `${path.join(" → ")} (costo ${cost})`;
      } else {
        routeTextEl.textContent = "Sin ruta disponible (enlaces caídos)";
      }
    }

    const svgLines = links
      .map((link) => {
        const a = getNode(link.from);
        const b = getNode(link.to);
        const isOnBestPath = link.up && activeEdges.has(`${link.from}-${link.to}`);
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2 - 8;

        const cls = [
          "lab1-link",
          link.up ? "is-up" : "is-down",
          isOnBestPath ? "is-best" : "",
          link.toggleable ? "is-toggleable" : ""
        ]
          .filter(Boolean)
          .join(" ");

        return `
          <g class="${cls}" data-link-id="${link.id}">
            <line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" />
            ${link.cost > 0 ? `<text x="${midX}" y="${midY}" text-anchor="middle">${link.up ? `costo ${link.cost}` : "CAÍDO"}</text>` : ""}
          </g>
        `;
      })
      .join("");

    const nodeCards = nodes
      .map(
        (n) => `
          <div class="lab1-node lab1-node--${n.type}" style="left: ${n.x}px; top: ${n.y}px;">
            <strong>${n.label}</strong>
            <small>${n.ip}</small>
          </div>
        `
      )
      .join("");

    topologyContainer.innerHTML = `
      <svg class="lab1-svg" viewBox="0 0 700 340" aria-hidden="true">
        ${svgLines}
      </svg>
      <div class="lab1-nodes">${nodeCards}</div>
    `;

    topologyContainer.querySelectorAll(".lab1-link.is-toggleable").forEach((el) => {
      el.addEventListener("click", () => {
        const link = links.find((l) => l.id === el.dataset.linkId);
        if (!link) return;
        link.up = !link.up;
        renderTopology();
      });
    });
  }

  // --- LAB 1: TABLA DE REENVÍO, REGISTRO Y SIMULACIÓN ---
  const routingTableEl = document.getElementById("lab1-routing-table");
  const logEl = document.getElementById("lab1-log");
  const destSelect = document.getElementById("lab1-dest");
  const speedSelect = document.getElementById("lab1-speed");
  const btnSend = document.getElementById("btn-send-packet");
  const btnPing = document.getElementById("btn-ping");
  const btnTraceroute = document.getElementById("btn-traceroute");

  let isSimulating = false;

  const r1Routes = [
    { prefix: "192.168.1.0/24", nextHop: "Directo (LAN)", iface: "eth0", metric: 0 },
    { prefix: "10.8.1.0/24", nextHop: "R2 (10.8.1.2)", iface: "eth1", metric: 1 },
    { prefix: "10.8.2.0/24", nextHop: "R3 (10.8.2.3)", iface: "eth2", metric: 2 },
    { prefix: "200.5.5.0/24", nextHop: "Vía mejor ruta", iface: "eth1/eth2", metric: 2 },
    { prefix: "0.0.0.0/0", nextHop: "R2 (por defecto)", iface: "eth1", metric: 10 }
  ];

  function addLog(message) {
    if (!logEl) return;
    const item = document.createElement("div");
    item.className = "lab1-log-entry";
    item.textContent = message;
    logEl.appendChild(item);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function clearLog() {
    if (logEl) logEl.innerHTML = "";
  }

  function renderRoutingTable(winningPrefix = "200.5.5.0/24") {
    if (!routingTableEl) return;
    const { path } = findCheapestRoute("PC", "SRV");
    const nextRouter = path[2] || "Ninguno";

    const rows = r1Routes
      .map((r) => {
        const isWinner = r.prefix === winningPrefix && path.length > 0;
        const hopLabel =
          r.prefix === "200.5.5.0/24" && nextRouter !== "Ninguno"
            ? `${nextRouter}`
            : r.nextHop;

        return `
          <tr class="${isWinner ? "is-winner" : ""}">
            <td><code>${r.prefix}</code></td>
            <td>${hopLabel}</td>
            <td>${r.iface}</td>
            <td>${r.metric}</td>
          </tr>
        `;
      })
      .join("");

    routingTableEl.innerHTML = `
      <table class="lab1-table">
        <thead>
          <tr>
            <th>Prefijo</th>
            <th>Siguiente salto</th>
            <th>Interfaz</th>
            <th>Métrica</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function getStepDelay() {
    const speed = speedSelect ? speedSelect.value : "normal";
    if (speed === "slow") return 950;
    if (speed === "fast") return 260;
    return 550;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function highlightNode(nodeId) {
    if (!topologyContainer) return;
    topologyContainer.querySelectorAll(".lab1-node").forEach((el) => {
      el.classList.toggle("is-active-hop", Boolean(nodeId) && el.textContent.includes(nodeId));
    });
  }

  async function runSingleTrace(mode, maxTtl = 64) {
    const destIp = destSelect ? destSelect.value : "200.5.5.10";
    const destExists = destIp === "200.5.5.10";
    const { path, cost } = findCheapestRoute("PC", "SRV");

    renderRoutingTable("200.5.5.0/24");

    if (path.length === 0) {
      addLog(`[${mode}] No hay ruta disponible desde PC hasta SRV.`);
      return;
    }

    for (let i = 0; i < path.length; i++) {
      const hop = path[i];
      const ttl = mode === "TRACEROUTE" ? Math.max(0, maxTtl - i) : Math.max(0, 64 - i);
      highlightNode(hop);

      if (mode === "TRACEROUTE" && i > 0 && i > maxTtl) {
        addLog(`[TRACEROUTE] TTL agotado en ${hop} (Time Exceeded tipo 11).`);
        return;
      }

      if (hop === "SRV") {
        if (!destExists) {
          addLog(`[${mode}] Llegó a la red 200.5.5.0/24, pero ${destIp} no responde (Host inalcanzable).`);
          return;
        }
        if (mode === "PING") {
          const rtt = 18 + cost * 7;
          addLog(`[PING] Echo Reply desde ${destIp}: bytes=64 tiempo=${rtt}ms TTL=${Math.max(1, 64 - i)}`);
        } else if (mode === "TRACEROUTE") {
          addLog(`[TRACEROUTE] Salto ${i}: ${hop} (${destIp}) · ${10 + i * 6} ms`);
        } else {
          addLog(`[PAQUETE] Entregado en SRV (${destIp}) con TTL=${ttl} (costo total: ${cost}).`);
        }
        return;
      }

      if (mode === "TRACEROUTE" && i > 0) {
        const nodeObj = getNode(hop);
        addLog(`[TRACEROUTE] Salto ${i}: ${hop} (${nodeObj ? nodeObj.ip : ""}) · TTL=${ttl}`);
      } else if (mode === "PAQUETE") {
        addLog(`[PAQUETE] Paso por ${hop} · TTL=${ttl}`);
      }

      await sleep(getStepDelay());
    }
  }

  async function startSimulation(mode) {
    if (isSimulating) return;
    isSimulating = true;
    clearLog();

    const destIp = destSelect ? destSelect.value : "200.5.5.10";

    if (mode === "PING") {
      addLog(`Iniciando PING a ${destIp}...`);
      for (let seq = 1; seq <= 3; seq++) {
        await runSingleTrace("PING", 64);
        await sleep(250);
      }
    } else if (mode === "TRACEROUTE") {
      addLog(`Iniciando TRACEROUTE hacia ${destIp}...`);
      for (let maxHops = 1; maxHops <= 5; maxHops++) {
        await runSingleTrace("TRACEROUTE", maxHops);
        const { path } = findCheapestRoute("PC", "SRV");
        if (maxHops >= path.length - 1 && destIp === "200.5.5.10") break;
      }
    } else {
      addLog(`Enviando paquete IP hacia ${destIp} (TTL inicial: 64)...`);
      await runSingleTrace("PAQUETE", 64);
    }

    highlightNode(null);
    isSimulating = false;
  }

  if (btnSend) btnSend.addEventListener("click", () => startSimulation("PAQUETE"));
  if (btnPing) btnPing.addEventListener("click", () => startSimulation("PING"));
  if (btnTraceroute) btnTraceroute.addEventListener("click", () => startSimulation("TRACEROUTE"));

  const originalRenderTopology = renderTopology;
  renderTopology = function () {
    originalRenderTopology();
    renderRoutingTable("200.5.5.0/24");
  };

  renderTopology();

  // --- LAB 2: SUBREDES IPV4 ---
  const ipInput = document.getElementById("lab2-ip");
  const cidrSelect = document.getElementById("lab2-cidr");
  const lab2ErrorEl = document.getElementById("lab2-error");
  const binaryViewEl = document.getElementById("lab2-binary-view");
  const resultsEl = document.getElementById("lab2-results");

  const challengePromptEl = document.getElementById("lab2-challenge-prompt");
  const btnSameYes = document.getElementById("btn-same-subnet-yes");
  const btnSameNo = document.getElementById("btn-same-subnet-no");
  const btnNewChallenge = document.getElementById("btn-new-challenge");
  const challengeFeedbackEl = document.getElementById("lab2-challenge-feedback");

  function populateCidrSelect() {
    if (!cidrSelect) return;
    cidrSelect.innerHTML = "";
    for (let prefix = 8; prefix <= 30; prefix++) {
      const opt = document.createElement("option");
      opt.value = String(prefix);
      opt.textContent = `/${prefix}`;
      if (prefix === 26) opt.selected = true;
      cidrSelect.appendChild(opt);
    }
  }

  function parseIpv4(ipStr) {
    const parts = ipStr.trim().split(".");
    if (parts.length !== 4) return null;
    const octets = [];
    for (const part of parts) {
      if (!/^\d+$/.test(part)) return null;
      const num = Number(part);
      if (num < 0 || num > 255) return null;
      octets.push(num);
    }
    return octets;
  }

  function octetsToInt(octets) {
    return (
      ((octets[0] << 24) >>> 0) +
      ((octets[1] << 16) >>> 0) +
      ((octets[2] << 8) >>> 0) +
      (octets[3] >>> 0)
    ) >>> 0;
  }

  function intToOctets(num) {
    return [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ];
  }

  function formatOctets(octets) {
    return octets.join(".");
  }

  function formatBinary32(num, prefix) {
    const bin = num.toString(2).padStart(32, "0");
    let html = "";
    for (let octetIdx = 0; octetIdx < 4; octetIdx++) {
      let octetHtml = "";
      for (let bitIdx = 0; bitIdx < 8; bitIdx++) {
        const globalPos = octetIdx * 8 + bitIdx;
        const bitChar = bin[globalPos];
        const roleClass = globalPos < prefix ? "is-net-bit" : "is-host-bit";
        octetHtml += `<span class="lab2-bit ${roleClass}">${bitChar}</span>`;
      }
      html += `<span class="lab2-octet">${octetHtml}</span>`;
      if (octetIdx < 3) html += `<span class="lab2-dot">.</span>`;
    }
    return html;
  }

  function updateSubnetCalculator() {
    if (!ipInput || !cidrSelect) return;
    const octets = parseIpv4(ipInput.value);
    const prefix = Number(cidrSelect.value);

    if (!octets) {
      if (lab2ErrorEl) {
        lab2ErrorEl.textContent = "Ingresa una dirección IPv4 válida (ejemplo: 192.168.1.130).";
        lab2ErrorEl.hidden = false;
      }
      return;
    }

    if (lab2ErrorEl) lab2ErrorEl.hidden = true;

    const ipInt = octetsToInt(octets);
    const maskInt = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
    const netInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (netInt | (~maskInt >>> 0)) >>> 0;

    const maskOctets = intToOctets(maskInt);
    const netOctets = intToOctets(netInt);
    const broadcastOctets = intToOctets(broadcastInt);

    const hostBits = 32 - prefix;
    const totalHosts = Math.pow(2, hostBits);
    const usableHosts = hostBits >= 2 ? totalHosts - 2 : 0;

    const firstHostOctets = usableHosts > 0 ? intToOctets((netInt + 1) >>> 0) : netOctets;
    const lastHostOctets = usableHosts > 0 ? intToOctets((broadcastInt - 1) >>> 0) : broadcastOctets;

    if (binaryViewEl) {
      binaryViewEl.innerHTML = `
        <div class="lab2-bin-row">
          <span class="lab2-bin-label">IP (${formatOctets(octets)})</span>
          <div class="lab2-bin-bits">${formatBinary32(ipInt, prefix)}</div>
        </div>
        <div class="lab2-bin-row">
          <span class="lab2-bin-label">Máscara /${prefix}</span>
          <div class="lab2-bin-bits">${formatBinary32(maskInt, prefix)}</div>
        </div>
        <div class="lab2-bin-row">
          <span class="lab2-bin-label">IP AND Máscara</span>
          <div class="lab2-bin-bits">${formatBinary32(netInt, prefix)}</div>
        </div>
      `;
    }

    if (resultsEl) {
      resultsEl.innerHTML = `
        <div class="lab2-stat"><span>Máscara</span><strong>${formatOctets(maskOctets)}</strong></div>
        <div class="lab2-stat"><span>Dirección de red</span><strong>${formatOctets(netOctets)}/${prefix}</strong></div>
        <div class="lab2-stat"><span>Primer host</span><strong>${formatOctets(firstHostOctets)}</strong></div>
        <div class="lab2-stat"><span>Último host</span><strong>${formatOctets(lastHostOctets)}</strong></div>
        <div class="lab2-stat"><span>Broadcast</span><strong>${formatOctets(broadcastOctets)}</strong></div>
        <div class="lab2-stat"><span>Hosts útiles</span><strong>${usableHosts} (2<sup>${hostBits}</sup> − 2)</strong></div>
      `;
    }
  }

  let currentChallenge = null;

  const sampleChallenges = [
    { ipA: "192.168.1.10", ipB: "192.168.1.50", prefix: 24 },
    { ipA: "192.168.1.130", ipB: "192.168.1.200", prefix: 26 },
    { ipA: "192.168.1.130", ipB: "192.168.1.60", prefix: 26 },
    { ipA: "10.0.14.25", ipB: "10.0.15.1", prefix: 23 },
    { ipA: "172.16.4.12", ipB: "172.16.7.99", prefix: 22 }
  ];

  function generateSubnetChallenge() {
    const item = sampleChallenges[Math.floor(Math.random() * sampleChallenges.length)];
    const maskInt = (0xffffffff << (32 - item.prefix)) >>> 0;
    const netA = formatOctets(intToOctets((octetsToInt(parseIpv4(item.ipA)) & maskInt) >>> 0));
    const netB = formatOctets(intToOctets((octetsToInt(parseIpv4(item.ipB)) & maskInt) >>> 0));

    currentChallenge = {
      ...item,
      netA,
      netB,
      same: netA === netB
    };

    if (challengePromptEl) {
      challengePromptEl.innerHTML = `Equipo A: <code>${item.ipA}/${item.prefix}</code> · Equipo B: <code>${item.ipB}/${item.prefix}</code>`;
    }
    if (challengeFeedbackEl) {
      challengeFeedbackEl.textContent = "";
    }
  }

  function answerSubnetChallenge(userSaidSame) {
    if (!currentChallenge || !challengeFeedbackEl) return;
    const isCorrect = userSaidSame === currentChallenge.same;
    const verdict = isCorrect ? "¡Correcto!" : "No exactamente.";
    challengeFeedbackEl.textContent = `${verdict} Con /${currentChallenge.prefix}, Equipo A está en ${currentChallenge.netA}/${currentChallenge.prefix} y Equipo B en ${currentChallenge.netB}/${currentChallenge.prefix}.`;
  }

  populateCidrSelect();
  updateSubnetCalculator();
  generateSubnetChallenge();

  if (ipInput) ipInput.addEventListener("input", updateSubnetCalculator);
  if (cidrSelect) cidrSelect.addEventListener("change", updateSubnetCalculator);
  if (btnSameYes) btnSameYes.addEventListener("click", () => answerSubnetChallenge(true));
  if (btnSameNo) btnSameNo.addEventListener("click", () => answerSubnetChallenge(false));
  if (btnNewChallenge) btnNewChallenge.addEventListener("click", generateSubnetChallenge);

  // --- LAB 3: BINARIO Y HEXADECIMAL ---
  const octetBoardEl = document.getElementById("lab3-octet-board");
  const binValueEl = document.getElementById("lab3-bin-value");
  const decValueEl = document.getElementById("lab3-dec-value");
  const hexValueEl = document.getElementById("lab3-hex-value");
  const decInputEl = document.getElementById("lab3-dec-input");
  const presetButtons = document.querySelectorAll(".lab3-preset");

  const challengeTargetEl = document.getElementById("lab3-challenge-target");
  const btnLab3Check = document.getElementById("btn-lab3-check");
  const btnLab3New = document.getElementById("btn-lab3-new");
  const lab3FeedbackEl = document.getElementById("lab3-challenge-feedback");

  let octetBits = [1, 1, 0, 0, 0, 0, 0, 0];
  let targetDecimal = 168;

  function getDecimalFromBits(bits) {
    return bits.reduce((acc, bit, idx) => {
      const weight = Math.pow(2, 7 - idx);
      return acc + bit * weight;
    }, 0);
  }

  function setBitsFromDecimal(value) {
    const clamped = Math.max(0, Math.min(255, Number(value) || 0));
    const binStr = clamped.toString(2).padStart(8, "0");
    octetBits = binStr.split("").map((ch) => Number(ch));
    renderOctetLab();
  }

  function renderOctetLab() {
    const decVal = getDecimalFromBits(octetBits);
    const binStr = octetBits.join("");
    const highNibbleDec = getDecimalFromBits([...octetBits.slice(0, 4), 0, 0, 0, 0]) >> 4;
    const lowNibbleDec = decVal & 0x0f;
    const highHex = highNibbleDec.toString(16).toUpperCase();
    const lowHex = lowNibbleDec.toString(16).toUpperCase();
    const hexStr = `${highHex}${lowHex}`;

    if (octetBoardEl) {
      const colsHtml = octetBits
        .map((bit, idx) => {
          const pos = 7 - idx;
          const weight = Math.pow(2, pos);
          const product = bit * weight;
          const nibbleLabel = idx < 4 ? `Alto (${highHex})` : `Bajo (${lowHex})`;

          return `
            <div class="lab3-bit-col ${bit === 1 ? "is-one" : "is-zero"}">
              <span class="lab3-pos">pos ${pos}</span>
              <button type="button" class="lab3-bit-btn" data-bit-index="${idx}" aria-label="Bit posición ${pos}">
                ${bit}
              </button>
              <span class="lab3-weight">2<sup>${pos}</sup> = ${weight}</span>
              <span class="lab3-product">${bit} × ${weight} = <strong>${product}</strong></span>
              <span class="lab3-nibble">${nibbleLabel}</span>
            </div>
          `;
        })
        .join("");

      octetBoardEl.innerHTML = colsHtml;

      octetBoardEl.querySelectorAll(".lab3-bit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.dataset.bitIndex);
          octetBits[idx] = octetBits[idx] === 1 ? 0 : 1;
          renderOctetLab();
        });
      });
    }

    if (binValueEl) binValueEl.textContent = `${binStr.slice(0, 4)} ${binStr.slice(4)}`;
    if (decValueEl) decValueEl.textContent = String(decVal);
    if (hexValueEl) hexValueEl.textContent = `0x${hexStr}`;
    if (decInputEl && document.activeElement !== decInputEl) {
      decInputEl.value = String(decVal);
    }
  }

  function generateLab3Challenge() {
    const pool = [192, 168, 172, 10, 255, 128, 64, 42, 73, 210, 15, 100];
    targetDecimal = pool[Math.floor(Math.random() * pool.length)];
    if (challengeTargetEl) {
      challengeTargetEl.innerHTML = `Forma el número decimal <strong>${targetDecimal}</strong> usando los bits del octeto.`;
    }
    if (lab3FeedbackEl) {
      lab3FeedbackEl.textContent = "";
    }
  }

  function checkLab3Challenge() {
    const currentDec = getDecimalFromBits(octetBits);
    if (!lab3FeedbackEl) return;

    if (currentDec === targetDecimal) {
      const hex = targetDecimal.toString(16).toUpperCase().padStart(2, "0");
      lab3FeedbackEl.textContent = `¡Muy bien! Formaste ${targetDecimal} (binario ${octetBits.join("")}, hex 0x${hex}).`;
    } else {
      lab3FeedbackEl.textContent = `Llevas ${currentDec} en decimal. Ajusta los bits para llegar a ${targetDecimal}.`;
    }
  }

  presetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setBitsFromDecimal(btn.dataset.val);
    });
  });

  if (decInputEl) {
    decInputEl.addEventListener("input", () => {
      setBitsFromDecimal(decInputEl.value);
    });
  }

  if (btnLab3Check) btnLab3Check.addEventListener("click", checkLab3Challenge);
  if (btnLab3New) btnLab3New.addEventListener("click", generateLab3Challenge);

  renderOctetLab();
  generateLab3Challenge();
});