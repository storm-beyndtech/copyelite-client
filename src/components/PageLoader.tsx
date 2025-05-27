import React from 'react';
import logo from '../assets/copyelite-logo.png';
import { SiSpinrilla } from 'react-icons/si';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999999] bg-[#070c1b] flex items-center justify-center noRight">
      <div className="absolute w-[465px] h-[140px] flex items-center justify-center gap-[10px] transition-all duration-500 ease-in-out">
        <div className="flex items-center justify-center spin">
          <SiSpinrilla className="text-9xl max-sm:text-5xl text-brandblue" />
        </div>
        <div className="load-text">
          <img
            loading="lazy"
            src={logo}
            alt="Copyelite logo text"
            width={308}
            height={107}
            className="max-sm:w-40"
          />
        </div>
      </div>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-auto">
        <img
          loading="lazy"
          src="https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/moneta-loading-map.webp"
          alt="Copyelite logo icon"
          width={1920}
          height={736}
        />
      </div>
    </div>
  );
};

export default PageLoader;
