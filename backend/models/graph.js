export default class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(node) {
        this.nodes.push(node);
    }

    addEdge(edge) {
        this.edges.push(edge);
    }

    getNeighbors(nodeId) {
        return this.edges.filter(e => e.source === nodeId);
    }
}
