import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GTranslateProvider = () => {
  const location = useLocation();

  useEffect(() => {
    // Prevent duplicate script
    const existingScript = document.querySelector(
      'script[src="https://cdn.gtranslate.net/widgets/latest/float.js"]',
    );

    if (!existingScript) {
      // @ts-ignore
      window.gtranslateSettings = {
        default_language: 'en',
        wrapper_selector: '.gtranslate_wrapper',
        switcher_horizontal_position: 'inline',
        float_switcher_open_direction: 'bottom',
        alt_flags: {
          en: 'usa',
        },
      };
    }

    // Inject script
    const script = document.createElement('script');
    script.src = 'https://cdn.gtranslate.net/widgets/latest/float.js';
    script.defer = true;
    script.setAttribute('data-gtranslate', 'true');
    if (!existingScript) {
      document.body.appendChild(script);
    } else {
      existingScript.remove()
    }
  }, [location.pathname]);

  return (
    <div className="w-[68px] h-[24px] py-1 relative bg-gray-50 rounded">
      <div className="gtranslate_wrapper absolute left-1 top-[0px]"></div>
    </div>
  );
};

export default GTranslateProvider;
