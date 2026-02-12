function minDistance(dist, visited) {
    let min = Infinity;
    let min_index = -1;

    for (let v = 0; v < dist.length; v++) {
        if (!visited[v] && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}

function dijkstra(graph, start) {

    const dist = Array(graph.length).fill(Infinity);
    const visited = Array(graph.length).fill(false);

    dist[start] = 0;

    for (let i = 0; i < graph.length - 1; i++) {
        let u = minDistance(dist, visited);
        visited[u] = true;

        for (let v = 0; v < graph.length; v++) {
            if (!visited[v] && graph[u][v] !== 0 &&
                dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }

    return dist;
}


// Qué hace?
// Recibe la matriz de adyacencia
// Calcula las distancias mínimas
// Devuelve las distancias desde el nodo origen