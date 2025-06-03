import React from 'react';

interface PopupProperty {
  title: string;
  firstOption: string;
  secondOption: string;
  isOpen: boolean;
  content?: React.ReactNode;
  msg?:string,
  onclose: () => void;
  onfirstOption: () => void;
  onsecondOption: () => Promise<void>;
}

interface ColorOptionProperty {
  firstOptionColor: string;
  firstOptionTextColor: string;
  firstOptionHoverColor?: string;
  secondOptionColor: string;
  secondOptionHoverColor?: string;
  titleColor: string;
  contentColor?:string
}

type Props = PopupProperty & ColorOptionProperty;

const Popup: React.FC<Props> = ({
  title,
  firstOption,
  secondOption,
  isOpen,
  content,
  onclose,
  onfirstOption,
  onsecondOption,
  firstOptionColor,
  firstOptionTextColor,
  firstOptionHoverColor,
  secondOptionColor,
  secondOptionHoverColor,
  titleColor,
  contentColor,
  msg
}) => {
  if (!isOpen) return null;
 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 opacity-95">
      <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-sm p-6 transition-all duration-300 ease-in-out scale-100">
        <div className="flex flex-col items-center text-center">

          {/* Title */}
          <h3 className={`${titleColor} text-lg font-semibold mb-2`}>
            {title}
          </h3>
 
          {content && (
            <div className={`${contentColor} text-sm mb-4 w-full`}>
              {content}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center sm:justify-end gap-3">
          <button
            className={`px-4 py-2 rounded-md border ${firstOptionColor} ${firstOptionTextColor} ${firstOptionHoverColor ?? ''} transition-colors duration-200`}
            onClick={() => {
              onfirstOption();
              onclose();
            }}
          >
            {firstOption}
          </button>
          <button
            className={`px-4 py-2 rounded-md ${secondOptionColor} ${firstOptionTextColor} ${secondOptionHoverColor ?? ''} transition-colors duration-200`}
            onClick={() => {
              onsecondOption();
              onclose();
            }}
          >
            {secondOption}
          </button>
        </div>
        {msg && (
  <p
    className={`text-center mt-4 ${
      msg.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"
    }`}
  >
    {msg}
  </p>
)}

      </div>
    </div>
  );
};

export default Popup;
