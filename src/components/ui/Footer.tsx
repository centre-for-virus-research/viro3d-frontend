import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <footer
        id="footer"
        className={`desktop-footer xs:hidden lg:block border-t-2  border-[#d6d5d5] text-[#4a95c0] drop-shadow-md bg-[#e6e6e6]`}
      >
        <div className="flex justify-center gap-8 px-8 mx-auto py-4">
          <img alt="MRC Logo" src="/MRC_RGB.png" width="200"></img>
          <img alt="UofG Logo" src="/Glasgow_RGB.png" width="200"></img>
          <img alt="CVR Logo" src="/CVR_RGB.png" width="200"></img>
        </div>
      </footer>
      <footer
        id="footer"
        className={`mobile-footer lg:hidden border-t-2 border-[#d6d5d5] text-[#4a95c0] drop-shadow-md bg-[#e6e6e6]`}
      >
        <div className="flex justify-center gap-8 px-8 mx-auto py-4">
          <img alt="MRC Logo" src="/MRC_RGB.png" width="100"></img>
          <img alt="UofG Logo" src="/Glasgow_RGB.png" width="100"></img>
          <img alt="CVR Logo" src="/CVR_RGB.png" width="100"></img>
        </div>
      </footer>
      
    </>
  );
};

export default Footer;
