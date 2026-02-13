function runSimulation() {

    const graph = [
        [0, 4, 2, 0],// = Nodo 0
        // conexión con nodo 1 = costo 4
        // conexión con nodo 2 = costo 2
        // no conectado con nodo 3
        [4, 0, 1, 5],// = Nodo 1
//         significa:
// conectado a nodo 0 → costo 4
// conectado a nodo 2 → costo 1
// conectado a nodo 3 → costo 5
        [2, 1, 0, 8], // = Nodo 2
        [0, 5, 8, 0] // = Nodo 3
    ];

    const startNode = parseInt(document.getElementById("startNode").value); // modificar para que no inicie de 0 a todos.

    const result = dijkstra(graph, startNode);

    document.getElementById("output").innerText =
        "Distancias desde nodo " + startNode + ": " + result.join(", ");
    
    drawGraph(graph);
}

// Esto es una matriz de adyacencia ponderada.

// Representa una red como:

// nodos = routers / computadoras

// valores = costo del enlace (latencia, distancia, tiempo, etc.)

// 0 = no existe conexión directa


// Otro ejemplo
// const graph = [
//     [0, 10, 0, 30, 100],
//     [10, 0, 50, 0, 0],
//     [0, 50, 0, 20, 10],
//     [30, 0, 20, 0, 60],
//     [100, 0, 10, 60, 0]
// ];

function drawGraph(graph) {
    const canvas = document.getElementById("graphCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Posiciones fijas para los nodos
    const positions = [
        {x: 100, y: 100}, //Nodo 0
        {x: 300, y: 100}, //Nodo 1
        {x: 100, y: 300}, //Nodo 2
        {x: 300, y: 300}, //Nodo 3
    ]

    // Dibujar aristas
    ctx.strokeStyle = "#555";
    ctx.font = "14px Arial";
    ctx.fillStyle = "#000";

    for(let i = 0; i < graph.length; i++) {
        for(let j = 0; j < graph[i].length; j++) {
            if(graph[i][j] > 0) {
                const p1 = positions[i];
                const p2 = positions[j];
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();

                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;
                ctx.fillText(graph[i][j], midX, midY);
            }
        }
    }

    // Dibujar nodos
    for(let i = 0; i < positions.length; i++) {
        const p = positions[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 25, 0, 2 * Math.PI);
        ctx.fillStyle = "#007bff";
        ctx.fill();
        ctx.strokeStyle = "#333";
        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(i, p.x, p.y);
    }
}