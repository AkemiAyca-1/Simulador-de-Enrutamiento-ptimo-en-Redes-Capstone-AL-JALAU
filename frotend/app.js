let nodes = new vis.DataSet([]);
let edges = new vis.DataSet([]);
let network = null;

let matrices = [
    [[0,4,2,0],[4,0,1,5],[2,1,0,8],[0,5,8,0]],
    [[0,10,0,30,100],[10,0,50,0,0],[0,50,0,20,10],[30,0,20,0,60],[100,0,10,60,0]],
    [[0,3,0,7],[3,0,4,2],[0,4,0,5],[7,2,5,0]]
];

let currentMatrix = [];
let simulationSteps = [];
let stepIndex = 0;

function loadMatrix() {
    const index = document.getElementById("matrixSelector").value;
    currentMatrix = matrices[index];

    // Actualizar vista de texto
    document.getElementById("matrixView").innerText = currentMatrix.map(r => r.join("  ")).join("\n");
    document.getElementById("output").innerText = "> Red cargada. Lista para simular.";

    // Dibujar Grafo
    nodes.clear();
    edges.clear();

    for (let i = 0; i < currentMatrix.length; i++) {
        nodes.add({ id: i, label: `Router ${i}`, shape: 'dot', size: 20, color: '#2c3e50' });
        for (let j = 0; j < currentMatrix[i].length; j++) {
            if (currentMatrix[i][j] !== 0 && i < j) {
                edges.add({ from: i, to: j, label: String(currentMatrix[i][j]), color: '#bdc3c7', font: { align: 'top' } });
            }
        }
    }

    const container = document.getElementById('networkCanvas');
    const data = { nodes, edges };
    const options = {
        physics: { enabled: true, barnesHut: { gravitationalConstant: -2000 } },
        interaction: { hover: true }
    };
    network = new vis.Network(container, data, options);
}

function startSimulation() {
    if (currentMatrix.length === 0) return alert("¡Carga una matriz primero!");
    
    // Ejecutamos tu algoritmo de dijkstra.js
    const result = dijkstra(currentMatrix, 0);
    simulationSteps = result.steps.split("\n\n").filter(s => s.trim() !== "");
    stepIndex = 0;

    document.getElementById("output").innerHTML = `<div class="text-white">Iniciando cálculo de ruta óptima desde Nodo 0...</div><br>`;
    
    // Resetear colores de nodos
    nodes.update(nodes.get().map(n => ({...n, color: '#2c3e50'})));
}

function nextStep() {
    if (stepIndex < simulationSteps.length) {
        let stepText = simulationSteps[stepIndex];
        
        // Resaltar nodo actual en el grafo
        let match = stepText.match(/Nodo seleccionado: (\d+)/);
        if (match) {
            let id = parseInt(match[1]);
            nodes.update({ id: id, color: '#ffc107', size: 25 }); // Naranja brillante
        }

        const out = document.getElementById("output");
        out.innerHTML += `<div class="step-entry">${stepText.replace(/\n/g, '<br>')}</div>`;
        out.scrollTop = out.scrollHeight; // Auto-scroll
        
        stepIndex++;
    } else {
        document.getElementById("output").innerHTML += `<div class="text-info mt-2">✔ Simulación completada.</div>`;
    }
}
