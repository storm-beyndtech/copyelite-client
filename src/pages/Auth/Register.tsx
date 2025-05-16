import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import Alert from '@/components/ui/Alert';
import { bounceAnimation, logoAnimation } from '@/lib/utils';
import logo from '../../assets/copyelite-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeSwitcher from '@/components/Layouts/DarkModeSwitcher';
import GTranslateProvider from '@/components/ui/GTranslateProvider';

// Placeholder types for form state and errors
interface RegistrationFormState {
  username: string;
  email: string;
  password: string;
  referredBy: string;
  termsAccepted: boolean;
}

interface RegistrationErrors {
  username?: string;
  email?: string;
  password?: string;
  termsAccepted?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormState>({
    username: '',
    email: '',
    password: '',
    referredBy: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [showPassword, setShowPassword] = useState(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  // Validation function placeholder
  const validateForm = (): boolean => {
    const newErrors: RegistrationErrors = {};

    // Add validation logic here
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    const bodyData = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      referredBy: formData.referredBy,
    };
    try {
      // Placeholder for actual API call
      const response = await fetch(`${url}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Handle successful registration
      setSubmitStatus('success');

      setTimeout(() => {
        navigate('/verify-otp', {
          state: { ...bodyData, pageType: 'registration-page' },
        });
      }, 2000);
    } catch (error) {
      // Handle registration error
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    // Special handling for checkbox
    const finalValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // Clear corresponding error when user starts typing/selecting
    if (errors[name as keyof RegistrationErrors]) {
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

        {/* Spinning ProTrader logo in top-left */}
        <div className="absolute top-[650px] -left-20 overflow-hidden w-[560px] h-[560px] -translate-x-1/2 -translate-y-1/2 opacity-60">
          <motion.img
            src="https://protradercopy.com/wp-content/themes/ProTrader-Copy/images/market-transaction-animation.webp"
            alt="ProTrader Logo"
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
            Join Interactive CopyElite today and start earning with expert
            traders in Stocks, ETFs, Options, Fixed Income & Futures
          </p>

          <motion.div className="flex" animate={bounceAnimation}>
            <img
              src="https://protradercopy.com/static/images/about/startingright.png"
              alt="Registration"
              className="w-[80%]"
            />
          </motion.div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="md:col-span-3 col-span-5 p-8 space-y-6">
        <div className="flex items-center justify-end gap-3">
          <Link to="/login" className="text-sm font-semibold text-brandblue">
            Login
          </Link>

          <GTranslateProvider />
          <DarkModeSwitcher />
        </div>
        <div className="w-full max-w-100 mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Sign Up
          </h2>
          <p className="text-gray-500 text-sm dark:text-gray-500 mb-6">
            Join the community and unleash endless possibilities
          </p>

          {/* Google Register Button */}
          <button className="w-full font-medium flex items-center justify-center bg-white dark:bg-transparent border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-white rounded-md py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <FcGoogle className="mr-3 text-2xl" />
            Register with Google
          </button>

          <div className="flex items-center my-5">
            <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
            <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">
              OR
            </span>
            <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username and Email in the same line */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="inputLabel">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className={`w-full px-4 py-2 rounded-md border text-sm ${
                    errors.username
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
                  } bg-white dark:bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 placeholder:opacity-50`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="inputLabel">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  className={`w-full px-4 py-2 rounded-md border text-sm ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
                  } bg-white dark:bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 placeholder:opacity-50`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="inputLabel">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className={`w-full px-4 py-2 rounded-md border text-sm ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
                  } bg-white dark:bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 placeholder:opacity-50 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mr-2 rounded text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="termsAccepted"
                className="text-xs tracking-tight font-medium text-gray-500 dark:text-gray-300"
              >
                I've read and accept the{' '}
                <Link to="#" className="text-brandblue">
                  Terms & Conditions
                </Link>{' '}
                with{' '}
                <Link to="#" className="text-brandblue">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
            )}

            {/* Alert Messages */}
            {submitStatus === 'success' && (
              <Alert
                type="success"
                message="Registration Successful! Welcome to ProTrader Markets."
              />
            )}
            {submitStatus === 'error' && (
              <Alert
                type="error"
                message="Registration failed. Please try again."
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="font-semibold w-full hover:bg-blue-600 bg-brandblue text-white py-2 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              {isSubmitting ? <span>Processing...</span> : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
