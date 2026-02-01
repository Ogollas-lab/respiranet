import { useEffect, useState } from "react";

const WaveformVisualizer = () => {
  const [bars, setBars] = useState<number[]>(Array(40).fill(20));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => 
        prev.map(() => Math.random() * 60 + 10)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-32 flex items-center justify-center gap-[3px] px-4">
      {bars.map((height, index) => (
        <div
          key={index}
          className="w-1.5 rounded-full bg-gradient-to-t from-primary to-accent transition-all duration-100"
          style={{ 
            height: `${height}%`,
            opacity: 0.6 + (height / 100) * 0.4
          }}
        />
      ))}
    </div>
  );
};

export default WaveformVisualizer;
