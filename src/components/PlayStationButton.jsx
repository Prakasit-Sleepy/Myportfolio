import React, { useState, useRef } from 'react';

const symbols = ['○', '×', '□', '△'];
const colors = {
  '○': '#FF3B3B',
  '×': '#3B82F6',
  '□': '#A855F7',
  '△': '#10B981',
};

function ContactButtonWithEffect() {
  const [show, setShow] = useState(false);
  const [burst, setBurst] = useState([]);
  const buttonRef = useRef();

  const handleClick = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    const count = 10;

    const burstSymbols = Array.from({ length: count }).map(() => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 80 + 40;
      return {
        symbol,
        color: colors[symbol],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        offsetX: rect.width / 2,
        offsetY: rect.height / 2,
        id: Math.random(),
      };
    });

    setBurst(burstSymbols);
    setShow(true);
    setTimeout(() => setShow(false), 800);
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="bg-black text-white px-6 py-3 rounded-full 
                   hover:bg-gray-800 hover:scale-105 shadow-md 
                   transition-all duration-300 font-semibold"
      >
        💖Love
      </button>

      {show &&
        burst.map((item) => (
          <span
            key={item.id}
            className="absolute animate-burst text-xl pointer-events-none"
            style={{
              color: item.color,
              top: '0',
              left: '0',
              '--x': `${item.x}px`,
              '--y': `${item.y}px`,
              '--offsetX': `${item.offsetX}px`,
              '--offsetY': `${item.offsetY}px`,
            }}
          >
            {item.symbol}
          </span>
        ))}
    </div>
  );
}

export default ContactButtonWithEffect;