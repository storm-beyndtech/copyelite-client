import { Button } from './ui/button';

export default function Sec2() {
  return (
    <section className="max-ctn text-white py-20 flex items-center justify-between flex-wrap">
      {/* Left Content */}
      <div className="space-y-6 max-w-150">
        <h1 className="text-3xl md:text-6xl font-bold leading-tight">
          Start copying <br /> & start earning
        </h1>
        <p className="text-gray-400 text-lg font-medium sm:pr-5">
          ProTrader Copy Trading provides the ability to copy successful
          strategies OR to share your own strategy and start earning when others
          copy it.
        </p>
        <p className="text-sm text-gray-500">
          Experience the sheer brilliance of ProTrader Copy Trading - a
          revolutionary platform that effortlessly mirrors the success of
          profitable traders and lets you copy successful strategies or provide
          your own strategy to others to be copied and profit from that.
        </p>

        <Button size="lg" className="hover:opacity-90 text-white">
          Start Copytrading
        </Button>
      </div>

      {/* Right Visual Placeholder */}
      <div className="grid place-content-center w-full max-w-[580px] h-[400px] bg-[url('https://protradercopy.com/local/templates/weltrade.main/components/wt/static.content/trader.copy.trading/wt/content.detail/default/img/texture-bg.png')]">
        <img
          src="https://protradercopy.com/local/templates/weltrade.main/components/wt/static.content/trader.copy.trading/wt/content.detail/default/img/start-copy-trading.png"
          alt="Copy Trading Visual"
          className="w-full object-cover mt-[-60px]"
        />
      </div>
    </section>
  );
}
