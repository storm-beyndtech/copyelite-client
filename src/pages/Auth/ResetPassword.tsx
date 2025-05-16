import { useState } from 'react';
import { motion } from 'framer-motion';
import Alert from '@/components/ui/Alert';
import { bounceAnimation, logoAnimation } from '@/lib/utils';
import logo from '../../assets/copyelite-logo.png';
import { Link } from 'react-router-dom';
import DarkModeSwitcher from '@/components/Layouts/DarkModeSwitcher';

// Placeholder type for form state and errors
interface ResetPasswordFormState {
  emailOrUsername: string;
}

interface ResetPasswordErrors {
  emailOrUsername?: string;
}

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState<ResetPasswordFormState>({
    emailOrUsername: '',
  });

  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: ResetPasswordErrors = {};

    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email or username is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Placeholder for actual API call
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      // Handle successful request
      setSubmitStatus('success');

      // Redirect to OTP verification after 2 seconds
      setTimeout(() => {
        window.location.href = '/verify-otp?type=reset-password';
      }, 2000);
    } catch (error) {
      // Handle error
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);

      // Reset error status after 5 seconds
      if (submitStatus === 'error') {
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear corresponding error when user starts typing
    if (errors[name as keyof ResetPasswordErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-5 overflow-hidden bg-gray-50 dark:bg-bodydark">
      {/* Left Side - Marketing Content */}
      <div className="md:col-span-2 relative bg-bodydark hidden md:flex flex-col justify-center">
        <div className="absolute top-0 left-0 z-[4] w-full h-full bg-gradient-to-b from-brandblue/30 via-brandblue/10 to-bodydark"></div>

        {/* Spinning Copyelite logo in top-left */}
        <div className="absolute top-[650px] -left-20 overflow-hidden w-[560px] h-[560px] -translate-x-1/2 -translate-y-1/2 opacity-60">
          <motion.img
            src="https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/market-transaction-animation.webp"
            alt="Copyelite Logo"
            className="w-full h-full"
            animate={logoAnimation}
          />
        </div>

        <div className="absolute z-10 top-0 left-0 pt-10 lg:px-20 px-5 flex flex-col gap-6">
          {/* Logo Placeholder */}
          <Link to="/" className="">
            <img src={logo} alt="logo" className="w-35" />
          </Link>

          <p className="text-gray-300 text-sm mt-10 leading-6">
            Forgot your password? No problem. We'll help you reset it and get
            back to your trading journey.
          </p>

          <motion.div className="flex" animate={bounceAnimation}>
            <img
              src="https://protradercopy.com/static/images/about/startingright.png"
              alt="Forgot Password"
              className="w-[70%]"
            />
          </motion.div>
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="md:col-span-3 col-span-5 p-8 space-y-6">
        <div className="flex items-center justify-end gap-3">
          <Link to="/login" className="text-sm font-semibold text-brandblue">
            Login
          </Link>

          <div className="w-[68px] h-[24px] py-1 relative bg-gray-50 rounded">
            <div className="gtranslate_wrapper absolute left-1 top-[0px]"></div>
          </div>
          <DarkModeSwitcher />
        </div>
        <div className="w-full max-w-100 mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Forgot Password
          </h2>
          <p className="text-gray-500 text-sm dark:text-gray-500 mb-6">
            Enter your email or username to receive a verification code
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email/Username Field */}
            <div>
              <label htmlFor="emailOrUsername" className="inputLabel">
                Email or Username
              </label>
              <input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={handleChange}
                placeholder="Enter your email or username"
                className={`w-full px-4 py-2 rounded-md border text-sm ${
                  errors.emailOrUsername
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
                } bg-white dark:bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 placeholder:opacity-50`}
              />
              {errors.emailOrUsername && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.emailOrUsername}
                </p>
              )}
            </div>

            {/* Alert Messages */}
            {submitStatus === 'success' && (
              <Alert
                type="success"
                message="Reset code sent! Redirecting to verification..."
              />
            )}
            {submitStatus === 'error' && (
              <Alert
                type="error"
                message="Account not found. Please check your email or username."
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="font-semibold w-full hover:bg-blue-600 bg-brandblue text-white py-2 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              {isSubmitting ? <span>Processing...</span> : 'Send Reset Code'}
            </button>

            {/* Back to Login Link */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{' '}
              <Link to="/login" className="text-brandblue hover:underline">
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
