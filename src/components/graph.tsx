import GEdge from "./GEdge.tsx";
import GNode from "./node.tsx";
import React from "react";

export interface INode {
  id: string;
  weight: number;
}

export interface INodeXY extends INode {
  x: number;
  y: number;
}

export interface IEdge {
  source: string;
  target: string;
  weight: number;
}
interface GraphProps {
  nodes: INodeXY[];
  edges: IEdge[];
}
const Graph: React.FC<GraphProps> = ({ nodes, edges }) => {
  return (
    <div className="relative w-screen h-screen z-10">
      <svg className="absolute w-full h-full pointer-events-none">
        {edges.map((edge, index) => {
          const sourceX = nodes.find((node) => node.id === edge.source)?.x || 0;
          const sourceY = nodes.find((node) => node.id === edge.source)?.y || 0;
          const targetX = nodes.find((node) => node.id === edge.target)?.x || 0;
          const targetY = nodes.find((node) => node.id === edge.target)?.y || 0;
          console.log(sourceX, sourceY || targetX, targetY);
          return (
            <GEdge
              key={index}
              x1={sourceX}
              y1={sourceY}
              x2={targetX}
              y2={targetY}
              weight={edge.weight}
            />
          );
        })}
      </svg>
      <div className="absolute">
        {nodes.map((node) => (
          <GNode
            key={node.id}
            id={node.id}
            x={node.x}
            y={node.y}
            weight={node.weight}
          />
        ))}
      </div>
    </div>
  );
};

export default Graph;
