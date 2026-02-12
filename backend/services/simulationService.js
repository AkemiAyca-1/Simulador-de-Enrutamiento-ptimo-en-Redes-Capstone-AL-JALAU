import { buildAdjacencyMatrix } from "../models/matrix.js";
import { dijkstra } from "../algorithms/dijkstra.js";

export function runSimulation(graph, startNode, endNode = null) {

    const matrix = buildAdjacencyMatrix(graph);

    const result = dijkstra(matrix, startNode, endNode);

    return {
        matrix,
        ...result
    };
}
