import React from 'react';

interface StatCardProps {
  value?: number | string;
  label?: string;
  icon?: string; // image path
  bg1?: string;
  bg2?: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, icon, bg1, bg2}) => {
  return (
    <div
      style={{
        background: `linear-gradient(to right, ${bg1}, ${bg2})`,
      }}
        className="w-[300px] h-[120px] rounded-xl flex items-center justify-between px-6 shadow-md text-white transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <div className="flex flex-col justify-center">
        <span className="text-3xl font-bold">{value}</span>
        <span className="text-md">{label}</span>
      </div>
      <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
        <img
          src={`/images/${icon}`}
          alt="icon"
          className="w-12 h-12 object-contain"
        />
      </div>
    </div>
  );
};

export default StatCard;
