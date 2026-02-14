function minDistancia(dist, visited){
    let min = Infinity;
    let index = -1;

    for(let i=0;i<dist.length;i++){
        if(!visited[i] && dist[i]<=min){
            min = dist[i];
            index = i;
        }
    }
    return index;
}

function dijkstra(graph, start){

    let n = graph.length;

    let dist = new Array(n).fill(Infinity);
    let visited = new Array(n).fill(false);

    dist[start]=0;

    let steps="";

    for(let i=0;i<n-1;i++){

        let u = minDistancia(dist,visited);
        visited[u]=true;

        steps += `Nodo seleccionado: ${u}\n`;

        for(let v=0;v<n;v++){
            if(!visited[v] && graph[u][v]!=0 &&
                dist[u]+graph[u][v]<dist[v]){

                steps += `dist[${v}] = ${dist[u]} + ${graph[u][v]}\n`;
                dist[v]=dist[u]+graph[u][v];
            }
        }

        steps += `Vector: ${dist.join(",")}\n\n`;
    }

    return {dist,steps};
}
