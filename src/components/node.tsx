import React from "react";

interface GNodeProps {
  id: string;
  x: number;
  y: number;
  weight: number;
}

const GNode: React.FC<GNodeProps> = ({ id, x, y, weight }) => {
  const offsetX = x - weight / 2;
  const offsetY = y - weight / 2;
  return (
    <div
      className="absolute"
      style={{ left: `${offsetX}px`, top: `${offsetY}px` }}
    >
      <div
        className="relative flex justify-center items-center"
        style={{
          width: `${weight}px`,
          height: `${weight}px`,
        }}
      >
        <svg width={weight} height={weight}>
          <circle
            cx={weight / 2}
            cy={weight / 2}
            r={weight / 2}
            className="fill-black"
          />
        </svg>
        <span
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ top: "50%", left: "50%" }}
        >
          {id}
        </span>
      </div>
    </div>
  );
};

export default GNode;
