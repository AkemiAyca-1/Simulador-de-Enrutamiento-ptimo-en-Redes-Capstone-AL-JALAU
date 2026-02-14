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
    document.getElementById("output").innerText = "> Topología cargada correctamente.";

    // Limpiar datos previos
    nodes.clear();
    edges.clear();

    // Crear nodos y enlaces para Vis.js
    for (let i = 0; i < currentMatrix.length; i++) {
        nodes.add({ 
            id: i, 
            label: `Router ${i}`, 
            shape: 'dot', 
            size: 40, // Nodos más grandes
            color: { background: '#2c3e50', border: '#34495e' },
            font: { color: '#ffffff', size: 16 }
        });
        
        for (let j = 0; j < currentMatrix[i].length; j++) {
            if (currentMatrix[i][j] !== 0 && i < j) {
                edges.add({ 
                    from: i, 
                    to: j, 
                    label: String(currentMatrix[i][j]), 
                    color: { color: '#bdc3c7' },
                    width: 3, // Líneas más gruesas
                    font: { align: 'top', size: 14 }
                });
            }
        }
    }

    const container = document.getElementById('networkCanvas');
    const data = { nodes, edges };
    const options = {
        physics: {
            enabled: true,
            barnesHut: { gravitationalConstant: -3000, springLength: 200 }
        },
        interaction: { hover: true, zoomView: true }
    };
    
    network = new vis.Network(container, data, options);

    // Ajuste automático para que el grafo llene el espacio
    network.once("stabilizationIterationsDone", function() {
        network.fit();
    });
}

function startSimulation() {
    if (currentMatrix.length === 0) return alert("Cargue una matriz primero");
    
    const result = dijkstra(currentMatrix, 0);
    simulationSteps = result.steps.split("\n\n").filter(s => s.trim() !== "");
    stepIndex = 0;

    document.getElementById("output").innerHTML = `<div class="text-primary fw-bold">Calculando rutas desde Router 0...</div><br>`;
    
    // Resetear colores originales
    nodes.update(nodes.get().map(n => ({...n, color: {background: '#2c3e50'}})));
}

function nextStep() {
    if (stepIndex < simulationSteps.length) {
        let stepText = simulationSteps[stepIndex];
        
        // Extraer el nodo que Dijkstra está analizando
        let match = stepText.match(/Nodo seleccionado: (\d+)/);
        if (match) {
            let id = parseInt(match[1]);
            // Iluminar el nodo en el mapa
            nodes.update({ 
                id: id, 
                color: { background: '#ffc107' }, // Amarillo resaltado
                size: 50 // Crece un poco al ser seleccionado
            });
        }

        const out = document.getElementById("output");
        out.innerHTML += `<div class="step-entry">${stepText.replace(/\n/g, '<br>')}</div>`;
        out.scrollTop = out.scrollHeight; 
        
        stepIndex++;
    } else {
        document.getElementById("output").innerHTML += `<div class="text-success mt-2">✔ Simulación finalizada con éxito.</div>`;
    }
}
