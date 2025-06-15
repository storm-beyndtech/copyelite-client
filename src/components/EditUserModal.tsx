import { countries } from '@/lib/countries';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contextData } from '@/context/AuthContext';
import Alert from './ui/Alert';

const rankOptions = [
  'welcome',
  'silver',
  'silverPro',
  'gold',
  'goldPro',
  'ambassador',
];

export default function EditUserModal({ userData, handleUserData }: any) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [deposit, setDeposit] = useState(0);
  const [interest, setInterest] = useState(0);
  const [trade, setTrade] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [withdrawalLimit, setWithdrawalLimit] = useState(0);
  const [minWithdrawal, setMinWithdrawal] = useState(1);
  const [withdrawalStatus, setWithdrawalStatus] = useState(false);
  const [rank, setRank] = useState('welcome');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const { login } = contextData();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  useEffect(() => {
    setFullName(userData.fullName);
    setEmail(userData.email);
    setSelectedCountry(userData.country);
    setPhoneNumber(userData.phone);
    setAddress(userData.address);
    setCity(userData.city);
    setState(userData.state);
    setZipCode(userData.zipCode);
    setDeposit(userData.deposit);
    setInterest(userData.interest);
    setTrade(userData.trade);
    setBonus(userData.bonus);
    setWithdrawalLimit(userData.withdrawalLimit || 0);
    setMinWithdrawal(userData.minWithdrawal || 1);
    setWithdrawalStatus(userData.withdrawalStatus || false);
    setRank(userData.rank || 'welcome');
  }, [userData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);

    const [firstName, ...rest] = fullName.trim().split(' ');
    const lastName = rest.join(' ') || '';

    const profileData = {
      email,
      firstName,
      lastName,
      country: selectedCountry,
      phone: phoneNumber,
      address,
      state,
      city,
      zipCode,
      deposit,
      interest,
      trade,
      bonus,
      withdrawalLimit,
      minWithdrawal,
      withdrawalStatus,
      rank,
    };

    try {
      setLoading(true);
      const res = await fetch(`${url}/users/update-profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();

      if (res.ok) setSuccess(data.message || 'User update successful');
      else throw new Error(data.message);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginAsUser = () => {
    login(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/dashboard/');
  };

  return (
    <div className="bg-gray-800/70 backdrop-blur-md fixed top-0 left-0 right-0  z-999999 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full">
      <div className="relative w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <form
          onSubmit={handleSubmit}
          className="relative bg-white rounded-lg shadow dark:bg-gray-800/95"
        >
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-900">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit user
            </h3>
            <button
              onClick={() => handleUserData(null)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="editUserModal"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* <!-- Modal body --> */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="full-name" className="editUserLabel">
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  id="full-name"
                  className="editUserInput"
                  placeholder={userData.fullName}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="email" className="editUserLabel">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  className="editUserInput"
                  placeholder={userData.email}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="editUserLabel">
                  Country
                </label>
                <select
                  id="country"
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                  }}
                  className="editUserInput"
                >
                  <option value="none">{userData.country}</option>
                  {countries.map((country, i) => (
                    <option key={i} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="phone-number" className="editUserLabel">
                  Phone Number
                </label>
                <input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="text"
                  id="phone-number"
                  className="editUserInput"
                  placeholder={userData.phone}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="address" className="editUserLabel">
                  Address
                </label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  name="address"
                  id="address"
                  className="editUserInput"
                  placeholder={userData.address}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="state" className="editUserLabel">
                  State
                </label>
                <input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                  id="state"
                  className="editUserInput"
                  placeholder={userData.state}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="city" className="editUserLabel">
                  City
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  id="city"
                  className="editUserInput"
                  placeholder={userData.city}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="zipCode" className="editUserLabel">
                  Zip Code
                </label>
                <input
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  type="text"
                  id="zipCode"
                  className="editUserInput"
                  placeholder={userData.zipCode}
                />
              </div>

              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="deposit" className="editUserLabel">
                  Deposit
                </label>
                <input
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  type="number"
                  id="deposit"
                  className="editUserInput"
                  placeholder={userData.deposit}
                  min={0}
                />
              </div>

              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="interest" className="editUserLabel">
                  Interest
                </label>
                <input
                  value={interest}
                  onChange={(e) => setInterest(Number(e.target.value))}
                  type="number"
                  id="interest"
                  className="editUserInput"
                  placeholder={userData.interest}
                  min={0}
                />
              </div>

              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="trade" className="editUserLabel">
                  Trade
                </label>
                <input
                  value={trade}
                  onChange={(e) => setTrade(Number(e.target.value))}
                  type="number"
                  id="trade"
                  className="editUserInput"
                  placeholder={userData.trade}
                  min={0}
                />
              </div>

              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="bonus" className="editUserLabel">
                  Bonus
                </label>
                <input
                  value={bonus}
                  onChange={(e) => setBonus(Number(e.target.value))}
                  type="number"
                  id="bonus"
                  className="editUserInput"
                  placeholder={userData.bonus}
                  min={0}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="withdrawalLimit" className="editUserLabel">
                  Withdrawal Limit
                </label>
                <input
                  value={withdrawalLimit}
                  onChange={(e) => setWithdrawalLimit(Number(e.target.value))}
                  type="number"
                  id="withdrawalLimit"
                  className="editUserInput"
                  placeholder={userData.withdrawalLimit || '0'}
                  min={0}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="minWithdrawal" className="editUserLabel">
                  Minimum Withdrawal
                </label>
                <input
                  value={minWithdrawal}
                  onChange={(e) => setMinWithdrawal(Number(e.target.value))}
                  type="number"
                  id="minWithdrawal"
                  className="editUserInput"
                  placeholder={userData.minWithdrawal || '1'}
                  min={0}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="rank" className="editUserLabel">
                  Rank
                </label>
                <select
                  id="rank"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  className="editUserInput"
                >
                  {rankOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6">
                <div className="flex items-center">
                  <input
                    id="withdrawalStatus"
                    type="checkbox"
                    checked={withdrawalStatus}
                    onChange={(e) => setWithdrawalStatus(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="withdrawalStatus"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Enable withdrawals for this user
                  </label>
                </div>
              </div>
            </div>
            {error && <Alert type="error" message={error} />}
            {success && <Alert type="success" message={success} />}
          </div>

          {/* <!-- Modal footer --> */}
          <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-900">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? 'Saving...' : 'Save all'}
            </button>

            <a
              href="#"
              onClick={loginAsUser}
              className="text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-200 dark:text-gray-800"
            >
              Login as user
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
