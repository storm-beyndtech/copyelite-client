import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Alert from '@/components/ui/Alert';
import { bounceAnimation } from '@/lib/utils';
import logo from '../assets/copyelite-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeSwitcher from '@/components/Layouts/DarkModeSwitcher';
import { contextData } from '@/context/AuthContext';

// OTP Page Types
export type OTPPageType =
  | 'register-verification'
  | 'reset-password'
  | 'login-verification'
  | 'withdraw-verification';

// User data interface
interface UserData {
  email?: string;
  username?: string;
  password?: string;
  referredBy?: string;
  phoneNumber?: string;
  withdrawalAmount?: number;
  withdrawalAddress?: string;
}

interface OTPVerificationProps {
  pageType: OTPPageType;
  otpLength?: number;
  resendDelay?: number;
  userData: UserData;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  pageType = 'register-verification',
  otpLength = 6,
  resendDelay = 60,
  userData,
}) => {
  // Create an array of refs for the OTP input fields
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(''));
  const [activeInput, setActiveInput] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(resendDelay);
  const [canResend, setCanResend] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  // Initialize the input refs array
  useEffect(() => {
    inputRefs.current = Array(otpLength)
      .fill(null)
      .map((_, i) => inputRefs.current[i] || null);
  }, [otpLength]);

  // Start countdown timer for resend button
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [countdown]);

  // Determine which contact method was used for sending OTP
  const getContactMethod = () => {
    if (userData.email) return userData.email;
    if (userData.phoneNumber) return userData.phoneNumber;
    return 'your contact information';
  };

  // Mask the contact information for display
  const maskContactInfo = (info: string) => {
    if (!info) return '';

    // Handle email
    if (info.includes('@')) {
      const [username, domain] = info.split('@');
      return `${username.substring(0, 2)}${'*'.repeat(
        Math.max(2, username.length - 4),
      )}${username.slice(-2)}@${domain}`;
    }

    // Handle phone number
    else if (/^\d+$/.test(info.replace(/\D/g, ''))) {
      const digits = info.replace(/\D/g, '');
      return `${'*'.repeat(Math.max(0, digits.length - 4))}${digits.slice(-4)}`;
    }

    return info;
  };

  // Determine page title and descriptions based on pageType
  const getPageContent = () => {
    const maskedContact = maskContactInfo(getContactMethod());

    switch (pageType) {
      case 'register-verification':
        return {
          title: 'Verify Your Account',
          description: `Enter the verification code we sent to ${maskedContact}`,
          successMessage: 'Account verified successfully!',
          errorMessage: 'Invalid verification code. Please try again.',
          redirectUrl: '/login',
          redirectText: 'Proceed to Login',
        };
      case 'reset-password':
        return {
          title: 'Reset Password',
          description: `Enter the verification code we sent to ${maskedContact} to recover your password`,
          successMessage:
            'Verification successful. Redirecting to reset your password...',
          errorMessage: 'Invalid verification code. Please try again.',
          redirectUrl: '/reset-password',
          redirectText: 'Reset Password',
        };
      case 'login-verification':
        return {
          title: '2-Step Verification',
          description: `Enter the security code we sent to ${maskedContact}`,
          successMessage:
            'Verification successful! Redirecting to dashboard...',
          errorMessage: 'Invalid verification code. Please try again.',
          redirectUrl: '/dashboard',
          redirectText: 'Continue to Dashboard',
        };
      case 'withdraw-verification':
        return {
          title: 'Verify Withdrawal',
          description: `Enter the security code sent to ${maskedContact} to confirm your withdrawal request`,
          successMessage: 'Withdrawal verification successful!',
          errorMessage: 'Invalid verification code. Please try again.',
          redirectUrl: '/transactions',
          redirectText: 'View Transaction Status',
        };
      default:
        return {
          title: 'Verification Required',
          description: `Enter the verification code we sent to ${maskedContact}`,
          successMessage: 'Verification successful!',
          errorMessage: 'Invalid verification code. Please try again.',
          redirectUrl: '/dashboard',
          redirectText: 'Continue',
        };
    }
  };

  const pageContent = getPageContent();

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    // Update OTP array
    const newOtp = [...otp];
    // Only take the last character if multiple characters are pasted
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }
  };

  // Handle key press events
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // Move to previous input on backspace if current field is empty
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

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    // Check if pasted data contains only numbers
    if (!/^\d+$/.test(pastedData)) return;

    // Fill OTP fields with pasted data
    const newOtp = [...otp];
    for (let i = 0; i < Math.min(pastedData.length, otpLength); i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus on the next empty field or the last field
    const focusIndex = Math.min(pastedData.length, otpLength - 1);
    inputRefs.current[focusIndex]?.focus();
    setActiveInput(focusIndex);
  };

  // Get the appropriate request payload based on page type
  const getRequestPayload = () => {
    const basePayload = {
      otp: otp.join(''),
      type: pageType,
    };

    switch (pageType) {
      case 'register-verification':
        return {
          ...basePayload,
          username: userData.username,
          email: userData.email,
          password: userData.password,
        };
      case 'reset-password':
        return {
          ...basePayload,
          email: userData.email || '',
          username: userData.username || '',
        };
      case 'login-verification':
        return {
          ...basePayload,
          email: userData.email || '',
          username: userData.username || '',
          password: userData.password || '',
        };
      case 'withdraw-verification':
        return {
          ...basePayload,
          email: userData.email || '',
          username: userData.username || '',
          amount: userData.withdrawalAmount,
          address: userData.withdrawalAddress,
        };
      default:
        return basePayload;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if OTP is complete
    if (otp.some((digit) => digit === '')) {
      setSubmitStatus('error');
      setErrorMessage('Please enter all digits of the verification code.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the request payload based on the page type
      const payload = getRequestPayload();

      // Placeholder for actual API call
      const response = await fetch(`${url}/users/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(pageContent.errorMessage);
      }

      // Handle successful verification
      setSubmitStatus('success');
      const userData = await response.json();
      login(userData.user);

      // Redirect to appropriate page
      setTimeout(() => {
        if (pageType === 'register-verification') {
          navigate('/dashboard');
        }
        if (pageType === 'login-verification') {
          navigate('/dashboard');
        }
      }, 2000);
    } catch (error) {
      // Handle error
      setSubmitStatus('error');
      setErrorMessage(pageContent.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (!canResend) return;

    setCanResend(false);

    try {
      // Prepare the resend request data
      const resendData = {
        type: pageType,
        email: userData.email || '',
        username: userData.username || '',
        phoneNumber: userData.phoneNumber || '',
      };

      // Placeholder for actual API call
      const response = await fetch(`${url}/users/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resendData),
      });

      if (!response.ok) {
        throw new Error('Failed to resend verification code.');
      }

      // Reset countdown
      setCountdown(resendDelay);

      // Show success message
      setSubmitStatus('success');
      setErrorMessage(
        'A new verification code has been sent to your contact information.',
      );

      // Clear any existing error
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to resend code. Please try again later.');
    }
  };

  // Determine back link based on page type
  const getBackLink = () => {
    switch (pageType) {
      case 'register-verification':
        return '/register';
      case 'reset-password':
        return '/forgot-password';
      case 'withdraw-verification':
        return '/withdraw';
      default:
        return '/login';
    }
  };

  const backLink = getBackLink();

  return (
    <div className="min-h-screen grid grid-cols-5 overflow-hidden bg-gray-50 dark:bg-bodydark">
      {/* Left Side - Marketing Content */}
      <div className="md:col-span-2 relative bg-bodydark hidden md:flex flex-col justify-center">
        <div className="absolute top-0 left-0 z-[4] w-full h-full bg-gradient-to-b from-brandblue/30 via-brandblue/10 to-bodydark"></div>

        <div className="absolute z-10 top-0 left-0 pt-10 lg:pl-10 pl-5 flex flex-col gap-6">
          {/* Logo Placeholder */}
          <Link to="/" className="">
            <img src={logo} alt="logo" className="w-35" />
          </Link>

          <p className="text-gray-300 text-sm mt-10 leading-6 max-w-80">
            Protecting your account with extra security verification. Your funds
            and data remain safe with us.
          </p>

          <motion.div className="flex" animate={bounceAnimation}>
            <img
              src="https://res.cloudinary.com/ddb1vjioq/image/upload/v1747727915/Adobe_Express_-_file_6_aore83.png"
              alt="Otp"
              className="w-[100%]"
            />
          </motion.div>
        </div>
      </div>

      {/* Right Side - OTP Verification Form */}
      <div className="md:col-span-3 col-span-5 p-8 space-y-6">
        <div className="flex items-center justify-end gap-3">
          <Link to={backLink} className="text-sm font-semibold text-brandblue">
            Back to{' '}
            {pageType === 'register-verification'
              ? 'Registration'
              : pageType === 'reset-password'
                ? 'Reset Password'
                : 'Login'}
          </Link>

          <div className="w-[68px] h-[24px] py-1 relative bg-gray-50 rounded">
            <div className="gtranslate_wrapper absolute left-1 top-[0px]"></div>
          </div>
          <DarkModeSwitcher />
        </div>
        <div className="w-full max-w-100 mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {pageContent.title}
          </h2>
          <p className="text-gray-500 text-sm dark:text-gray-500 mb-6">
            {pageContent.description}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Fields */}
            <div className="flex justify-center gap-2 md:gap-4">
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
            </div>

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Didn't receive a code?{' '}
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-brandblue hover:underline font-medium"
                  >
                    Resend Code
                  </button>
                ) : (
                  <span className="text-gray-500">
                    Resend in <span className="font-medium">{countdown}s</span>
                  </span>
                )}
              </p>
            </div>

            {/* Alert Messages */}
            {submitStatus === 'success' && (
              <Alert type="success" message={pageContent.successMessage} />
            )}
            {submitStatus === 'error' && (
              <Alert
                type="error"
                message={errorMessage || pageContent.errorMessage}
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="font-semibold w-full hover:bg-blue-600 bg-brandblue text-white py-2 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              {isSubmitting ? <span>Verifying...</span> : 'Verify Code'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
