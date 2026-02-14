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
