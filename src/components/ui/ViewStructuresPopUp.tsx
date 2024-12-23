import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

type ViewStructuresPopUpProps = {
  handleCloseViewStructurePopUpClick: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  popUpVirus: string;
};

const ViewStructuresPopUp: React.FC<ViewStructuresPopUpProps> = ({
  handleCloseViewStructurePopUpClick,
  popUpVirus,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(false);
    setTimeout(() => {
      handleCloseViewStructurePopUpClick(event);
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
        className="mb-2 mr-2 font-extralight overflow-x-hidden absolute bottom-0 right-0 z-10 sm:w-1/4 sm:min-w-1/4 xs:w-[45%] max-h-full"
      >
        <div className="max-h-full w-full float-right">
          <div className="flex flex-col justify-between bg-[#e6e6e6de] rounded-lg shadow">
            <div className="p-4 md:p-5 rounded-t dark:border-gray-600">
              <h3 className="xl:text-4xl lg:text-2xl sm:text-sm xs:text-base text-center text-[#3a5868b4]">
                {popUpVirus}
              </h3>
            </div>
            <div className="flex flex-col justify-between gap-2 p-4 md:p-5 rounded-b border-gray-400">
              <button
                onClick={() =>
                  window.open(
                    `/proteinresultspage/virus_name/${encodeURIComponent(
                      popUpVirus
                    )}`,
                    "_blank",
                    "noreferrer"
                  )
                }
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-[#56b3e6] w-full hover:bg-[#61c8ff] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg lg:text-sm xs:text-sm px-5 py-2.5 text-center"
              >
                View Structures
              </button>
              <button
                onClick={handleClose}
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-[#e65b56] w-full hover:bg-[#df7470] focus:ring-4 focus:outline-none focus:ring-[#ce6561] rounded-lg lg:text-sm xs:text-sm px-5 py-2.5 text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ViewStructuresPopUp;
