import React from "react";

interface EdgeProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  weight: number;
}
const GEdge: React.FC<EdgeProps> = ({ x1, y1, x2, y2, weight }) => {
  return (
    <line
      className="absolute"
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="black"
      strokeWidth={weight}
    />
  );
};

export default GEdge;
