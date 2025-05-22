// TradingViewWidget.jsx
import { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
        {
          "symbols": [
            [
              "Apple",
              "AAPL|1M"
            ],
            [
              "Google",
              "GOOGL|1M"
            ],
            [
              "Microsoft",
              "MSFT|1M"
            ],
            [
              "NASDAQ:NVDA|1M"
            ],
            [
              "NASDAQ:AMZN|1M"
            ],
            [
              "NASDAQ:TSLA|1M"
            ],
            [
              "NASDAQ:META|1M"
            ]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "colorTheme": "dark",
          "autosize": true,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": true,
          "hideMarketStatus": false,
          "hideSymbolLogo": true,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "8",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "line",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "backgroundColor": "rgba(255, 255, 255, 0)",
          "widgetFontColor": "rgba(149, 152, 161, 1)",
          "lineWidth": 2,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ]
        }`;

    if (container.current) {
      container.current.innerHTML = '';
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewWidget);
