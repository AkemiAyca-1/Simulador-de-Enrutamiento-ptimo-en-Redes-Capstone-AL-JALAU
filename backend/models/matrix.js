export function buildAdjacencyMatrix(graph) {
    const size = graph.nodes.length;
    const matrix = Array.from({ length: size }, () =>
        Array(size).fill(Infinity)
    );

    graph.nodes.forEach((node, i) => {
        matrix[i][i] = 0;
    });

    graph.edges.forEach(edge => {
        matrix[edge.source][edge.target] = edge.cost;
    });

    return matrix;
}
