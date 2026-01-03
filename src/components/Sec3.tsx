import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import phoneBg from '../assets/phone-mockup-bg.png';
import phoneScreen1 from '../assets/PhoneSlides/copytrader-row2-img01.webp';
import phoneScreen2 from '../assets/PhoneSlides/copytrader-row2-img02.webp';
import phoneScreen3 from '../assets/PhoneSlides/copytrader-row2-img03.webp';
import phoneScreen4 from '../assets/PhoneSlides/copytrader-row2-img04.webp';

const sliderImages = [phoneScreen1, phoneScreen2, phoneScreen3, phoneScreen4];

const Sec3 = () => {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <section
        className="relative text-white py-40 px-4 sm:px-8 lg:px-20 overflow-hidden"
        // style={{
        //   backgroundImage: 'radial-gradient(circle, #01a7d3 0%)',
        // }}
      >
        <div className="absolute inset-0 flex justify-center items-center z-0">
          <div className="w-[440px] h-[440px] bg-[#01a7d3] rounded-full blur-[100px]"></div>
        </div>
        <div className="max-ctn relative flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-y-16">
          {/* LEFT TEXT */}
          <div className="flex flex-col gap-70 w-full max-w-90">
            <div className="max-w-80">
              <h3 className="text-6xl font-semibold">Copy Pros in a Tap</h3>
              <p className="text-gray-400 mt-3">
                Enroll, connect, and start copying traders in 12 languages.
              </p>
            </div>
            <div className="">
              <h3 className="text-6xl font-semibold">Go Against the Flow</h3>
              <p className="text-gray-400 mt-3  max-w-70">
                Challenge friends or use the “inverse” trade feature on losing
                traders.
              </p>
            </div>
          </div>

          {/* PHONE FRAME WITH SLIDER */}
          <div className="relative z-10 w-[220px] h-[460px] bg-bodydark mx-auto rounded-[35px] overflow-hidden">
            <img
              src={phoneBg}
              alt="Phone Frame"
              className="absolute inset-0 w-full h-full z-10 pointer-events-none mix-blend-multiply"
            />
            <div className="absolute top-[0%] left-[0%] w-full h-full z-0 overflow-hidden rounded-[2rem]">
              <Slider {...settings}>
                {sliderImages.map((src, i) => (
                  <div key={i}>
                    <img
                      src={src}
                      alt={`screen-${i}`}
                      className="w-full h-full object-cover rounded-[2rem] p-1"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="flex flex-col gap-80 w-full  max-w-90 text-right">
            <div className="max-w-80">
              <h3 className="text-6xl font-semibold">
                Connect and <span className="text-white/80">Profit</span>
              </h3>
              <p className="text-gray-400 mt-3">
                Join a large trading community to chat, share strategies, and
                trade together.
              </p>
            </div>
            <div className="max-w-80">
              <h3 className="text-5xl font-semibold">
                Performance You <span className="text-white/80">Can Trust</span>
              </h3>
              <p className="text-gray-400 mt-3">
                Follow top traders with live PnL reporting or become a signal
                provider.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sec3;
