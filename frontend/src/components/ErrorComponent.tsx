import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react'; // Optional icon for visual feedback

interface ErrorComponentProps {
  onClose?: () => void;
  errMsg: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ onClose, errMsg }) => {
  useEffect(() => {
    console.log('errMsg: ', errMsg);
  }, [errMsg]);

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="text-red-600 mt-1">
            <AlertTriangle size={28} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-red-700 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-800 text-md leading-relaxed font-bold">{errMsg}</p>
          </div>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
