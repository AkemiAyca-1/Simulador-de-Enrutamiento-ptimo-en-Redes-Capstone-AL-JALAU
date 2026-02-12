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

    const startNode = 0; // modificar para que no inicie de 0 a todos.

    const result = dijkstra(graph, startNode);

    document.getElementById("output").innerText =
        "Distancias: " + result.join(", ");
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
