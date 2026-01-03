import { useEffect, useRef, memo } from 'react';

function ChartSlide() {
  const container = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !container.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `{
      "symbols": [
        {
          "description": "Tesla",
          "proName": "NASDAQ:TSLA"
        },
        {
          "proName": "FOREXCOM:SPXUSD",
          "title": "S&P 500"
        },
        {
          "proName": "FOREXCOM:NSXUSD",
          "title": "US 100"
        },
        {
          "proName": "FX_IDC:EURUSD",
          "title": "EUR to USD"
        },
        {
          "description": "Microsoft",
          "proName": "NASDAQ:MSFT"
        },
        {
          "description": "Amazon",
          "proName": "NASDAQ:AMZN"
        },
        {
          "description": "Meta",
          "proName": "NASDAQ:META"
        },
        {
          "description": "Netflix",
          "proName": "NASDAQ:NFLX"
        },
        {
          "description": "Google",
          "proName": "NASDAQ:GOOGL"
        },
        {
          "description": "NVDA",
          "proName": "NASDAQ:NVDA"
        }
      ],
      "showSymbolLogo": true,
      "colorTheme": "dark",
      "isTransparent": true,
      "displayMode": "adaptive",
      "locale": "en"
    }`;
  
    // Append the TradingView script after the widget placeholder is in the DOM
    container.current.appendChild(script);
    initialized.current = true;
  }, []);  

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget py-2"></div>
    </div>
  );
}

export default memo(ChartSlide);
