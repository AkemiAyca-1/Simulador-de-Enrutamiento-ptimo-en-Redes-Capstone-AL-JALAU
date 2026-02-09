# Simulador-de-Enrutamiento-ptimo-en-Redes-Capstone-AL-JALAU

Arquitectura modular basada en separación de responsabilidades, donde el frontend gestiona la interacción del usuario y visualización del grafo, mientras que el backend implementa los modelos matemáticos del sistema, la representación matricial de la red y los algoritmos de optimización (Dijkstra). La persistencia inicial se realizará mediante almacenamiento local, dejando preparada la integración futura con MySQL.

## Rol de cada módulo (muy importante)
# backend/models

Define la estructura matemática del sistema

node.js → estructura de nodo

edge.js → enlaces con costo

graph.js → lista de nodos y conexiones

matrix.js → generar matriz de adyacencia


# backend/algorithms

dijkstra.js → algoritmo de optimización

# backend/services

simulationService.js

ejecuta simulación

llama a Dijkstra

devuelve resultados


# frontend/js

uiController.js

botones

eventos

graphRenderer.js

dibujar nodos y rutas

storageLocal.js

guardar simulaciones en localStorage

luego MySQL


# Orden correcto de implementación (importantísimo)

Primero programen:

1️⃣ node.js
2️⃣ edge.js
3️⃣ graph.js
4️⃣ matrix.js
5️⃣ dijkstra.js
6️⃣ renderer
7️⃣ almacenamiento

Así el sistema nunca se rompe.