import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function Sec2() {
  return (
    <section className="max-ctn text-white py-30 flex items-center justify-between flex-wrap">
      {/* Left Content */}
      <div className="space-y-5 max-w-150">
        <h1 className="text-3xl md:text-6xl font-bold leading-tight">
          Start copying <br /> & start earning
        </h1>
        <p className="text-gray-300 text-lg font-medium">
          Copyelite Trading provides the ability to copy successful strategies
          OR to share your own strategy and start earning when others copy it.
        </p>
        <p className="text-gray-400/80 mb-5">
          Experience the sheer brilliance of Copyelite Trading - a revolutionary
          platform that effortlessly mirrors the success of profitable traders
          and lets you copy successful strategies or provide your own strategy
          to others to be copied and profit from that.
        </p>

        <Link to="/register" className="block">
          <Button size="lg" className="hover:opacity-90 text-white">
            Start Copytrading
          </Button>
        </Link>
      </div>

      {/* Right Visual Placeholder */}
      <div className="grid place-content-center w-full max-w-[580px] h-[400px]">
        <img
          src="https://www.ameritradesbrokers.com/assets/copy-trade3-uq0GdfhB.png"
          alt="Copy Trading Visual"
          className="w-full object-cover mt-[-60px]"
        />
      </div>
    </section>
  );
}
