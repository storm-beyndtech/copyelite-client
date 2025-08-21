import { useEffect, useState } from 'react';
import authImg from '../assets/authMFA.png';
import { contextData } from '@/context/AuthContext';
import Alert from './ui/Alert';
import LoadingSpinner from './ui/LoadingSpinner';

export default function TwoFactorSetup() {
  const [qrCodeSrc, setQrCodeSrc] = useState<null | string>(null);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { user, token: authToken, setToken: setUserToken } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (countdown > 0) {
      interval = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (!user.mfa && authToken) {
      fetchQrCode();
    }
  }, [authToken]);

  const fetchQrCode = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${url}/mfa/getQrCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setQrCodeSrc(data.imgSrc);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load QR code');
    } finally {
      setLoading(false);
    }
  };

  const sendToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (token.length !== 6 || !/^\d{6}$/.test(token)) {
      setError('Please enter a valid 6-digit code');
      return;
    }
    if (!authToken) {
      setError('Authentication token missing');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${url}/mfa/verifyToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserToken(data.token); // Update JWT in context
        setSuccess(true);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      setError(error.message || 'Invalid token');
    } finally {
      setLoading(false);
      setToken('');
    }
  };

  const handleResend = async () => {
    if (!canResend || !authToken) return;
    setCanResend(false);
    setCountdown(60);
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch(`${url}/mfa/getQrCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setQrCodeSrc(data.imgSrc);
        setSuccess(true);
        setError('New QR code generated');
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to resend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-10 my-4 max-[900px]:flex-col">
      {!user.mfa ? (
        <>
          <div className="flex-none">
            {loading && !qrCodeSrc ? (
              <LoadingSpinner />
            ) : (
              <img
                src={qrCodeSrc as string}
                alt="QR code"
                className="rounded-xl"
                width={250}
              />
            )}
          </div>
          <div className="flex-auto shadow-1">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
              <form className="space-y-6" onSubmit={sendToken}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Enable Two-Factor Authentication
                </h5>
                <div>
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    6-Digit Code
                  </label>
                  <input
                    onChange={(e) =>
                      setToken(e.target.value.replace(/[^0-9]/g, ''))
                    }
                    value={token}
                    type="text"
                    id="otp"
                    maxLength={6}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="******"
                    required
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Need a new code?{' '}
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-blue-700 hover:underline font-medium dark:text-blue-500"
                      >
                        Resend Code
                      </button>
                    ) : (
                      <span className="text-gray-500">
                        Resend in{' '}
                        <span className="font-medium">{countdown}s</span>
                      </span>
                    )}
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {loading ? 'Loading...' : 'Submit Code'}
                </button>
                {error && <Alert type="error" message={error} />}
                {success && (
                  <Alert type="success" message="2FA enabled successfully" />
                )}
              </form>
            </div>
          </div>
        </>
      ) : (
        <img src={authImg} alt="2FA Enabled" className="w-full max-w-100" />
      )}
    </div>
  );
}
