import React from 'react';

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed  bg-black flex items-center inset-0 justify-center bg-opacity-50">
      <div className="bg-white border w-full max-w-md relative rounded p-4  shadow-md">

        <button
          onClick={onClose}
          className="absolute text-gray-500 top-2 right-2 "
          aria-label="Cerrar"
        >
          ×
        </button>

        {title && (<h2 className="text-lg font-bold mb-3">
            {title}
          </h2>)}

        <div>
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;
