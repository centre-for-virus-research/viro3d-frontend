import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

type ControlsPopUpProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ControlsPopUp: React.FC<ControlsPopUpProps> = ({ handleClick }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(false);
    setTimeout(() => {
      handleClick(event);
    }, 300);
  };

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal"
      unmountOnExit
      appear
    >
      <div
        id="default-modal"
        aria-hidden="true"
        className="overflow-y-auto mb-4 font-extralight overflow-x-hidden absolute bottom-0 right-0 z-50"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative flex flex-row bg-[#64748be0] rounded-lg shadow">
            <div className="flex flex-col gap-4 justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
              <h3 className="text-xl text-white">Zoom: Ctrl + Mouse Wheel</h3>
              <h4 className="text-xl text-white">Pan: Left-click and drag</h4>
            </div>
            <div className="flex items-center p-4 md:p-5 rounded-b border-gray-400">
              <button
                onClick={handleClose}
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-[#56b3e6] hover:bg-[#61c8ff] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ControlsPopUp;
