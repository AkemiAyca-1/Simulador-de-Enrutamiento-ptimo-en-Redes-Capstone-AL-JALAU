// matrices predeterminadas para que el usuario pueda elegir y simular sin necesidad de ingresar su propia matriz. Esto es útil para pruebas rápidas y demostraciones.
let matrices = [
    [
        [0,4,2,0],
        [4,0,1,5],
        [2,1,0,8],
        [0,5,8,0]
    ],
    [
        [0,10,0,30,100],
        [10,0,50,0,0],
        [0,50,0,20,10],
        [30,0,20,0,60],
        [100,0,10,60,0]
    ],
    [
        [0,3,0,7],
        [3,0,4,2],
        [0,4,0,5],
        [7,2,5,0]
    ]
];

let currentMatrix = [];
let simulationSteps = [];
let stepIndex = 0;

function loadMatrix(){
    const index = document.getElementById("matrixSelector").value;
    currentMatrix = matrices[index];

    document.getElementById("matrixView").innerText =
        "Matriz:\n" +
        currentMatrix.map(r=>r.join(" ")).join("\n");
    
    drawGraph(currentMatrix)
}

function startSimulation(){

    const result = dijkstra(currentMatrix,0);

    simulationSteps = result.steps.split("\n");
    stepIndex = 0;

    document.getElementById("output").innerText = "Simulación iniciada\n";
}

function nextStep(){

    if(stepIndex < simulationSteps.length){
        document.getElementById("output").innerText +=
            simulationSteps[stepIndex] + "\n";
        stepIndex++;
    }
}

function drawGraph(matrix) {
    const nodeCount = matrix.length;
    const positions = [
        {x: 100, y: 100},
        {x: 300, y: 100},
        {x: 100, y: 300},
        {x: 300, y: 300}
    ];

    let svg = `<svg width="400" height="400">`;

    // Dibujar aristas
    for (let i = 0; i < nodeCount; i++) {
        for (let j = 0; j < nodeCount; j++) {
            if (matrix[i][j] !== 0) {
                const x1 = positions[i].x;
                const y1 = positions[i].y;
                const x2 = positions[j].x;
                const y2 = positions[j].y;
                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;

                svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" />`;
                svg += `<text x="${midX}" y="${midY - 5}" font-size="14" text-anchor="middle">${matrix[i][j]}</text>`;
            }
        }
    }

    // Dibujar nodos
    for (let i = 0; i < nodeCount; i++) {
        const {x, y} = positions[i];
        svg += `<circle cx="${x}" cy="${y}" r="20" fill="white" stroke="black" />`;
        svg += `<text x="${x}" y="${y + 5}" font-size="16" text-anchor="middle">${i}</text>`;
    }

    svg += `</svg>`;
    document.getElementById("graphView").innerHTML = svg;
}

