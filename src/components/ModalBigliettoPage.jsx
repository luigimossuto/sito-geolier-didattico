import React from 'react';

const ModalBigliettoPage = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 relative max-w-md w-full">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-4 text-3xl font-bold text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalBigliettoPage;
