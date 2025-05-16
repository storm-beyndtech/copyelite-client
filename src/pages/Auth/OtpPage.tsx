import OTPVerification from '@/components/OTP';
import { useLocation } from 'react-router-dom';

export default function OtpPage() {
  const location = useLocation();
  const { email, username, password, referredBy, pageType } = location.state || {};

  return <OTPVerification pageType={pageType} userData={{email, username, password, referredBy}} />;
};
