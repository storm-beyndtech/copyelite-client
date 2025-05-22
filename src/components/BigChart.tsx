import React, { useEffect, useRef } from 'react';

interface BigChartProps {
  symbol?: string;
}

const BigChart: React.FC<BigChartProps> = ({ symbol = 'NASDAQ:AAPL' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing widget
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'transparent',
      backgroundColor: 'rgba(0, 0, 0, 0.001)',
      style: '1',
      locale: 'en',
      allow_symbol_change: true,
      support_host: 'https://www.tradingview.com',
    });

    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container bg-white dark:bg-gray-900 rounded-lg shadow-md"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default BigChart;
