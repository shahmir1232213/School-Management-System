import React from 'react';
import { Loader2 } from 'lucide-react'; // spinner icon

interface LoadingComponentProps {
  message?: string;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({ message = 'Processing...' }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl p-6 flex items-center gap-4 animate-fade-in">
        <div className="text-[#055266] animate-spin">
          <Loader2 size={32} />
        </div>
        <div className="text-[#055266] text-lg font-semibold">{message}</div>
      </div>
    </div>
  );
};

export default LoadingComponent;
