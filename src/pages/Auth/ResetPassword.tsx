import { useState } from 'react';
import { motion } from 'framer-motion';
import Alert from '@/components/ui/Alert';
import { bounceAnimation } from '@/lib/utils';
import logo from '../../assets/copyelite-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeSwitcher from '@/components/Layouts/DarkModeSwitcher';

// Updated form state interface
interface ResetPasswordFormState {
  emailOrUsername: string;
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordErrors {
  emailOrUsername?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState<ResetPasswordFormState>({
    emailOrUsername: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  // Enhanced validation function
  const validateForm = (): boolean => {
    const newErrors: ResetPasswordErrors = {};

    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email or username is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Check data type for email or username
    const isEmail = formData.emailOrUsername.includes('@');
    const requestData = {
      ...(isEmail
        ? { email: formData.emailOrUsername }
        : { username: formData.emailOrUsername }),
      password: formData.newPassword,
    };

    try {
      const response = await fetch(`${url}/users/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset code');
      }

      setSubmitStatus('success');

      // Redirect to OTP verification with password data
      setTimeout(() => {
        navigate('/verify-otp', {
          state: { ...requestData, pageType: 'reset-password' },
        });
      }, 2000);
    } catch (error: any) {
      setSubmitStatus('error');
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);

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

        <div className="absolute z-10 top-0 left-0 pt-10 lg:px-20 pl-5 flex flex-col gap-6">
          <Link to="/" className="">
            <img src={logo} alt="logo" className="w-35" />
          </Link>

          <p className="text-gray-300 text-sm mt-10 leading-6">
            Reset your password by entering your credentials and a new secure
            password.
          </p>

          <motion.div className="flex" animate={bounceAnimation}>
            <img
              src="https://res.cloudinary.com/ddb1vjioq/image/upload/v1747727915/Adobe_Express_-_file_6_aore83.png"
              alt="Reset"
              className="w-[100%]"
            />
          </motion.div>
        </div>
      </div>

      {/* Right Side - Reset Password Form */}
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
            Reset Password
          </h2>
          <p className="text-gray-500 text-sm dark:text-gray-500 mb-6">
            Enter your credentials and new password to reset your account
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

            {/* New Password Field */}
            <div>
              <label htmlFor="newPassword" className="inputLabel">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  className={`w-full px-4 py-2 pr-12 rounded-md border text-sm ${
                    errors.newPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
                  } bg-white dark:bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 placeholder:opacity-50`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="inputLabel">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  className={`w-full px-4 py-2 pr-12 rounded-md border text-sm ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
                  } bg-white dark:bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 placeholder:opacity-50`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showConfirmPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
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
                message={error || 'An error occurred. Please try again.'}
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="font-semibold w-full hover:bg-blue-600 bg-brandblue text-white py-2 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              {isSubmitting ? <span>Processing...</span> : 'Reset Password'}
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
