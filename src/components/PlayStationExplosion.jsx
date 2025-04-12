import React, { useState } from "react";

const symbols = ["○", "×", "□", "△"];
const colors = {
  "○": "#ff3b3b",
  "×": "#3b82f6",
  "□": "#a855f7",
  "△": "#10b981",
};

function PlayStationExplosion({ className = "" }) {
  const [bursts, setBursts] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newBurst = Array.from({ length: 8 }).map(() => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 80 + 30;
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const color = colors[symbol];
      return {
        id: Math.random(),
        symbol,
        color,
        x,
        y,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
      };
    });

    setBursts((prev) => [...prev, ...newBurst]);
    setTimeout(() => {
      setBursts((prev) => prev.slice(newBurst.length));
    }, 800);
  };

  return (
    <div
      className={`absolute inset-0 ${className}`}
      onClick={handleClick}
    >
      {bursts.map((item) => (
        <span
          key={item.id}
          className="absolute text-xl animate-burst pointer-events-none"
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            transform: `translate(${item.dx}px, ${item.dy}px)`,
            color: item.color,
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
}

export default PlayStationExplosion;
