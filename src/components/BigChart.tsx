import { useEffect, useRef, memo, useState } from 'react';

interface BigChartProps {
  symbol: string;
  interval?: string;
  theme?: 'light' | 'dark';
  backgroundColor?: string;
  height?: string;
  width?: string;
  allowSymbolChange?: boolean;
  style?: number;
}

function BigChart({
  symbol = '',
  interval = 'D',
  theme = 'dark',
  backgroundColor = 'transparent',
  height = '100%',
  width = '100%',
  allowSymbolChange = true,
  style = 1,
}: BigChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartKey, setChartKey] = useState<string>(
    `tv-${symbol}-${interval}-${theme}`,
  );

  useEffect(() => {
    // Clean up previous chart when inputs change
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // Generate new key to force re-render when props change
    setChartKey(`tv-${symbol}-${interval}-${theme}-${Date.now()}`);

    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: interval,
      timezone: 'Etc/UTC',
      theme: theme,
      style: style,
      locale: 'en',
    });

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      // Cleanup function
      if (containerRef.current) {
        const scriptElements =
          containerRef.current.getElementsByTagName('script');
        while (scriptElements.length > 0) {
          if (scriptElements[0].parentNode) {
            scriptElements[0].parentNode.removeChild(scriptElements[0]);
          }
        }
      }
    };
  }, [symbol, interval, theme, style, allowSymbolChange]);

  return (
    <div
      key={chartKey}
      className="tradingview-widget-container"
      ref={containerRef}
      style={{
        height: height,
        width: width,
        backgroundColor: backgroundColor,
      }}
    />
  );
}

export default memo(BigChart);
