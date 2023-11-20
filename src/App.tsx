import Graph, { IEdge, INode, INodeXY } from "./components/graph.tsx";
import React from "react";

interface IData {
  nodes: INode[];
  edges: IEdge[];
}

const json: IData = {
  nodes: [
    { id: "React", weight: 1.0 },
    { id: "JavaScript-Bibliothek", weight: 0.8 },
    { id: "Benutzeroberflächen", weight: 0.7 },
    { id: "Komponentenbasiert", weight: 0.7 },
    { id: "Deklaratives Programmieren", weight: 0.6 },
    { id: "Wiederverwendbare Komponenten", weight: 0.6 },
    { id: "Virtual DOM", weight: 0.6 },
    { id: "Effizienz", weight: 0.5 },
    { id: "React Hooks", weight: 0.5 },
    { id: "Zustandsverwaltung", weight: 0.5 },
  ],
  edges: [
    { source: "React", target: "JavaScript-Bibliothek", weight: 0.9 },
    { source: "React", target: "Benutzeroberflächen", weight: 0.8 },
    { source: "React", target: "Komponentenbasiert", weight: 0.7 },
    { source: "React", target: "Deklaratives Programmieren", weight: 0.6 },
    { source: "React", target: "Wiederverwendbare Komponenten", weight: 0.6 },
    { source: "React", target: "Virtual DOM", weight: 0.7 },
    { source: "React", target: "Effizienz", weight: 0.5 },
    { source: "React", target: "React Hooks", weight: 0.6 },
    { source: "React", target: "Zustandsverwaltung", weight: 0.5 },
    {
      source: "Komponentenbasiert",
      target: "Wiederverwendbare Komponenten",
      weight: 0.8,
    },
    { source: "Deklaratives Programmieren", target: "Effizienz", weight: 0.6 },
    { source: "Virtual DOM", target: "Effizienz", weight: 0.7 },
    { source: "React Hooks", target: "Zustandsverwaltung", weight: 0.7 },
    {
      source: "Wiederverwendbare Komponenten",
      target: "Effizienz",
      weight: 0.6,
    },
  ],
};

const graphParser = (data: IData) => {
  const nodes: INodeXY[] = [];
  const minDistance = 150;

  data.nodes.forEach((nodeData) => {
    let newNode: INodeXY;
    let isTooClose: boolean;

    // Minimale und maximale Größe für die Kreise
    const minNodeSize = 10; // Mindestgröße des Kreises
    const maxNodeSize = 100; // Maximale Größe des Kreises

    // Berechne die Differenz
    const nodeSizeRange = maxNodeSize - minNodeSize;

    // Wende eine Potenzfunktion an, um den Kontrast zu verstärken
    // Zum Beispiel das Quadrat oder einen anderen Exponenten verwenden
    const scaledWeight = Math.pow(nodeData.weight, 2);

    // Skaliere das transformierte Gewicht auf den Bereich der Knotengrößen
    const nodeSize = scaledWeight * nodeSizeRange + minNodeSize;

    do {
      newNode = {
        id: nodeData.id,
        weight: nodeSize,
        x: Math.floor(Math.random() * 1400) + 200,
        y: Math.floor(Math.random() * 600) + 200,
      };
      isTooClose = nodes.some(
        (node) => getDistance(node, newNode) < minDistance,
      );
      // Wenn der Node zu nahe ist, wird die Schleife fortgesetzt und neue Koordinaten generiert.
    } while (isTooClose);

    nodes.push(newNode);
  });

  let edges = data.edges.map((edge) => {
    return {
      source: edge.source,
      target: edge.target,
      weight: edge.weight,
    };
  });

  // Finde das Minimum und Maximum der Gewichtungen
  const maxWeight = Math.max(...edges.map((e) => e.weight));
  const minWeight = Math.min(...edges.map((e) => e.weight));

  // Definiere die neue Skala
  const minStrokeWidth = 1; // Minimal sichtbare Strichstärke
  const maxStrokeWidth = 10; // Maximal sichtbare Strichstärke

  // Berechne die Differenz
  const weightRange = maxWeight - minWeight;
  const strokeWidthRange = maxStrokeWidth - minStrokeWidth;

  edges = edges.map((edge) => {
    // Normalisiere das Gewicht auf den Bereich 0 - 1
    let normalizedWeight = (edge.weight - minWeight) / weightRange;

    // Wende eine Potenzfunktion an, um den Kontrast zu verstärken
    // Das Quadrat hebt größere Gewichte stärker hervor
    normalizedWeight = Math.pow(normalizedWeight, 2);

    // Skaliere das normalisierte Gewicht auf den Bereich der Strichstärken
    const strokeWidth = normalizedWeight * strokeWidthRange + minStrokeWidth;

    return { ...edge, weight: strokeWidth };
  });

  return { nodes, edges };
};

const getDistance = (node1: INodeXY, node2: INodeXY): number => {
  const xDist = node1.x - node2.x;
  const yDist = node1.y - node2.y;
  return Math.sqrt(xDist * xDist + yDist * yDist);
};

function App() {
  const [graphData, setGraphData] = React.useState<IData>({
    nodes: [],
    edges: [],
  });

  const handleTriggerReloadData = () => {
    setGraphData(graphParser(json));
  };
  return (
    <div className="relative ">
      <button
        className="absolute top-0 right-0 z-50"
        onClick={handleTriggerReloadData}
      >
        Generate
      </button>
      <Graph nodes={graphData.nodes as INodeXY[]} edges={graphData.edges} />
    </div>
  );
}

export default App;
