import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Alert from '@/components/ui/Alert';
import { bounceAnimation } from '@/lib/utils';
import logo from '../../assets/copyelite-logo.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import DarkModeSwitcher from '@/components/Layouts/DarkModeSwitcher';
import { contextData } from '@/context/AuthContext';

const TwoFactorLogin: React.FC = () => {
  const otpLength = 6;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(''));
  const [activeInput, setActiveInput] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const { state } = useLocation();
  const { token, setToken } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const email = state?.email || '';

  useEffect(() => {
    inputRefs.current = Array(otpLength)
      .fill(null)
      .map((_, i) => inputRefs.current[i] || null);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text/plain')
      .trim()
      .replace(/[^0-9]/g, '');
    if (pastedData.length !== otpLength) return;

    const newOtp = pastedData.split('').slice(0, otpLength);
    setOtp(newOtp);
    inputRefs.current[otpLength - 1]?.focus();
    setActiveInput(otpLength - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((digit) => !digit)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter all digits');
      return;
    }
    if (!token) {
      setSubmitStatus('error');
      setErrorMessage('Authentication token missing');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${url}/mfa/verifyLogin2FA`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token: otp.join('') }),
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setSubmitStatus('success');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Invalid 2FA code');
      setOtp(Array(otpLength).fill('')); // Clear OTP on error
      setActiveInput(0); // Focus first input
      inputRefs.current[0]?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@');
    return `${username.slice(0, 2)}${'*'.repeat(
      Math.max(2, username.length - 4),
    )}${username.slice(-2)}@${domain}`;
  };

  // Shake animation for error
  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.3 },
  };

  return (
    <div className="min-h-screen grid grid-cols-5 overflow-hidden bg-gray-50 dark:bg-bodydark">
      <div className="md:col-span-2 relative bg-bodydark hidden md:flex flex-col justify-center">
        <div className="absolute top-0 left-0 z-[4] w-full h-full bg-gradient-to-b from-brandblue/30 via-brandblue/10 to-bodydark"></div>
        <div className="absolute z-10 top-0 left-0 pt-10 lg:pl-10 pl-5 flex flex-col gap-6">
          <Link to="/" className="">
            <img src={logo} alt="logo" className="w-35" />
          </Link>
          <p className="text-gray-300 text-sm mt-10 leading-6 max-w-80">
            Verify your identity with two-factor authentication.
          </p>
          <motion.div className="flex" animate={bounceAnimation}>
            <img
              src="https://res.cloudinary.com/ddb1vjioq/image/upload/v1747727915/Adobe_Express_-_file_6_aore83.png"
              alt="2FA"
              className="w-[100%] rounded-xl"
            />
          </motion.div>
        </div>
      </div>
      <div className="md:col-span-3 col-span-5 p-8 space-y-6">
        <div className="flex items-center justify-end gap-3">
          <Link to="/login" className="text-sm font-semibold text-brandblue">
            Back to Login
          </Link>
          <DarkModeSwitcher />
        </div>
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            2-Step Verification
          </h2>
          <p className="text-gray-500 text-sm dark:text-gray-500 mb-6">
            Enter the code from your authenticator app for {maskEmail(email)}
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              className="flex justify-center gap-2 md:gap-4"
              animate={submitStatus === 'error' ? shakeAnimation : {}}
            >
              {Array(otpLength)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className={`w-12 h-12 md:w-14 md:h-14 border text-center text-xl rounded-md
                      ${
                        index === activeInput
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-300 dark:border-gray-700'
                      }
                      focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                      bg-white dark:bg-transparent text-gray-900 dark:text-white`}
                  />
                ))}
            </motion.div>
            {submitStatus === 'success' && (
              <Alert type="success" message="2FA verified, redirecting..." />
            )}
            {submitStatus === 'error' && (
              <Alert
                type="error"
                message={errorMessage || 'Invalid 2FA code'}
              />
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brandblue text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors"
            >
              {isSubmitting ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorLogin;
