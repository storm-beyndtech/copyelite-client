import { contextData } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import PageLoader from '@/components/PageLoader';
import { GoInfo } from 'react-icons/go';
import Alert from '@/components/ui/Alert';
import { Copy } from 'lucide-react';

interface Coin {
  name: string;
  address: string;
  network: string;
  price: number;
}

export default function Deposit() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState<string | number>(0);
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState<Coin | undefined>();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const { user } = contextData();

  const fetchCoins = async () => {
    setFetching(true);
    try {
      const res = await fetch(`${url}/utils`);
      const data = await res.json();

      if (res.ok) {
        setCoins(data.coins);
        setCoin(data.coins[0]);
      } else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const sendDeposit = async (e: any) => {
    e.preventDefault();
    setError(null);

    if (amount < 1) return setError('The minimum transfer amount is $1');
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch(`${url}/deposits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user._id,
          amount,
          convertedAmount,
          coinName: coin?.name,
        }),
      });

      const data = await res.json();

      if (res.ok) setSuccess(data.message);
      else throw new Error(data.message);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const roundNumber = (number: number) => {
    if (number < 1 && Math.abs(number) % 1 > 1e-6) {
      return number.toFixed(6);
    }

    return number.toFixed(2);
  };

  const handleCoinChange = (e: any) => {
    const findCoin: Coin | any = JSON.parse(e.target.value);
    if (findCoin) setCoin(findCoin);

    if (findCoin) {
      setConvertedAmount(roundNumber(amount / findCoin.price));
    }
  };

  const handleAmountChange = (e: any) => {
    const newAmount = Number(e.target.value);
    setAmount(newAmount);
    if (coin) setConvertedAmount(roundNumber(newAmount / coin.price));
  };

  const copyToClipBoard = async (copyMe: string) => {
    await navigator.clipboard.writeText(copyMe);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000);
  };

  if (fetching) return <PageLoader />;

  return (
    coin && (
      <>
        {!success ? (
          <div className="w-full flex  justify-center shadow-1 m-auto">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-950 dark:border-gray-900">
              <form className="space-y-6" action="#" onSubmit={sendDeposit}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Start Deposit
                </h5>

                <div className="flex gap-5">
                  <div className="flex-auto">
                    <label
                      htmlFor="coin"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Method
                    </label>
                    <select
                      onChange={handleCoinChange}
                      id="coin"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 capitalize"
                    >
                      {coins.map((c: Coin, i: number) => (
                        <option key={i} value={JSON.stringify(c)}>
                          {c.name} {c.network}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-auto">
                    <label
                      htmlFor="amount"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Amount In USD
                    </label>
                    <input
                      onChange={handleAmountChange}
                      value={amount === 0 ? '' : amount}
                      type="number"
                      id="amount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-800 dark:placeholder-gray-400 dark:text-white"
                      placeholder="$0.00"
                      required
                      min={0}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex-auto">
                    <label
                      htmlFor="convertedAmount"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                    >
                      Amount in {coin?.name}
                    </label>
                    <input
                      value={convertedAmount}
                      type="number"
                      id="convertedAmount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-800 dark:placeholder-gray-400 dark:text-white"
                      disabled
                      required
                    />
                  </div>

                  <div className="flex-auto">
                    <label
                      htmlFor="minDeposit"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Minimum Deposit
                    </label>
                    <input
                      value="1"
                      type="number"
                      id="minDeposit"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-800 dark:placeholder-gray-400 dark:text-white"
                      disabled
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {loading ? 'Loading...' : 'Deposit'}
                </button>
                {error && <Alert type="error" message={error} />}
              </form>
            </div>
          </div>
        ) : (
          <div className="w-full flex  justify-center shadow-1 m-auto">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800/70 dark:border-gray-700">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-blue-400 mb-4">
                Deposit Confirmation
              </h4>
              <h5 className="text-base font-semibold text-gray-900 dark:text-gray-300 mb-3 capitalize">
                {coin?.name} Payment
              </h5>

              <p className="text-sm font-light text-gray-900 dark:text-gray-300 mb-4">
                Your deposit order of{' '}
                <span className="text-blue-500 font-medium">{amount} USD</span>{' '}
                has been placed.
              </p>

              <p className="text-sm font-light text-gray-900 dark:text-gray-300 mb-4">
                Please send{' '}
                <span className="text-green-500 font-medium">
                  {convertedAmount} {coin?.name} ({coin?.network})
                </span>{' '}
                to the address below. The amount will reflect in your wallet
                only after transaction is approved.
              </p>

              <div className="mt-4">
                <label className="text-gray-700 dark:text-gray-300 max-lg:text-white/30">
                  Deposit address
                </label>
                <div className="mt-2 p-3 lg:border rounded-lg flex items-center max-lg:gap-5 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                      coin.address,
                    )}`}
                    alt="QR Code"
                    className="w-26 h-26 lg:w-16 lg:h-16 mr-4"
                  />
                  <div className="flex-1 max-lg:w-full">
                    <input
                      type="text"
                      readOnly
                      value={coin.address}
                      className="max-lg:break-all outline-none max-lg:w-full bg-transparent text-gray-600 dark:text-gray-300 font-medium text-sm"
                    />
                  </div>
                  <button
                    onClick={() => copyToClipBoard(coin.address)}
                    className="text-gray-600 max-lg:text-gray-400 px-3 flex flex-col items-center gap-1"
                  >
                    <Copy
                      size={18}
                      className={`${copySuccess ? 'text-brandblue' : ''}`}
                    />
                    <span
                      className={`${
                        copySuccess ? 'text-blue-300 text-[10px]' : ''
                      }`}
                    >
                      {copySuccess ? 'copied' : ''}
                    </span>
                  </button>
                </div>
              </div>

              <p className="flex text-[10px] gap-2 text-gray-800 dark:text-gray-400 leading-none mt-2">
                <GoInfo className="text-xl" /> Kindly make sure to check that
                your are sending to above generated wallet address, to avoid
                loss of funds.
              </p>
            </div>
          </div>
        )}
      </>
    )
  );
}
