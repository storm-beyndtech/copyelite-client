import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

//importing pages
import Home from './pages/Home';
import { Helmet } from 'react-helmet';
import PageLoader from './components/PageLoader';
import { contextData } from './context/AuthContext';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import AboutUs from './pages/company/AboutUs';
import Awards from './pages/company/Awards';
import Careers from './pages/company/Careers';
import ContactUs from './pages/company/ContactUs';
import CompareAcc from './pages/company/CompareAcc';
import ExpertTraders from './pages/company/ExpertTraders';
import FAQ from './pages/company/FAQ';
import Insurance from './pages/company/Insurance';
import Leverage from './pages/company/Leverage';
import OurTradingInfrastructure from './pages/company/OurTradingInfrastructure';
import Regulations from './pages/company/Regulation';
import Bonds from './pages/markets/Bonds';
import Commodities from './pages/markets/Commodities';
import Crypto from './pages/markets/Crypto';
import ETFs from './pages/markets/ETFs';
import FX from './pages/markets/FX';
import Indices from './pages/markets/Indices';
import ShareCFDs from './pages/markets/ShareCFDs';
import Spreads from './pages/markets/Spreads';
import AiMarketBuzz from './pages/tools/AiMarketBuzz';
import PremiumEconomicCalendar from './pages/tools/PremiumEconomicCalendar';
import EcomicCalendar from './pages/tools/EconomicCalendar';
import ForexSentiment from './pages/tools/ForexSentiment';
import MarketNews from './pages/tools/MarketNews';
import TechnicalViews from './pages/tools/TechnicalViews';
import TradeSignals from './pages/tools/TradeSignals';
import TradeVps from './pages/tools/TradeVPS';
import ResetPassword from './pages/Auth/ResetPassword';
import { useEffect, useState } from 'react';
import DefaultLayout from './components/Layouts/DefaultLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import UserOnboarding from './pages/Auth/UserOnboarding';

function App() {
  const location = useLocation();
  const isPublicRoute =
    location.pathname.includes('/dashboard') ||
    location.pathname.includes('/admin') ||
    location.pathname.includes('/login') ||
    location.pathname.includes('/register') ||
    location.pathname.includes('/password-reset');
  const { fetching, user } = contextData();
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const handleAssetsLoaded = () => {
      setAssetsLoaded(true);
    };

    // Wait until all images/videos/fonts are loaded
    if (document.readyState === 'complete') {
      handleAssetsLoaded();
    } else {
      window.addEventListener('load', handleAssetsLoaded);
    }

    return () => {
      window.removeEventListener('load', handleAssetsLoaded);
    };
  }, []);

  // Show loader while either assets or user auth is loading
  if (fetching || !assetsLoaded) return <PageLoader />;

  if (!fetching)
    return (
      <>
        <Helmet>
          {isPublicRoute ? (
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
            />
          ) : (
            <meta name="viewport" content="width=1280, user-scalable=yes" />
          )}
        </Helmet>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* Company Routes */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/compare-account" element={<CompareAcc />} />
          <Route path="/expert-trader" element={<ExpertTraders />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/leverage" element={<Leverage />} />
          <Route
            path="/trading-infrastructure"
            element={<OurTradingInfrastructure />}
          />
          <Route path="/regulations" element={<Regulations />} />
          <Route path="/support" element={<ContactUs />} />
          <Route path="/why-choose-us" element={<AboutUs />} />

          {/* Markets Routes */}
          <Route path="/bonds" element={<Bonds />} />
          <Route path="/commodities" element={<Commodities />} />
          <Route path="/crypto" element={<Crypto />} />
          <Route path="/etfs" element={<ETFs />} />
          <Route path="/fx" element={<FX />} />
          <Route path="/indices" element={<Indices />} />
          <Route path="/share-cfds" element={<ShareCFDs />} />
          <Route path="/spreads" element={<Spreads />} />
          <Route path="/trading-hours" element={<Home />} />

          {/* Tools Routes */}
          <Route path="/ai-market-buzz" element={<AiMarketBuzz />} />
          <Route path="/economic-canledar" element={<EcomicCalendar />} />
          <Route path="/forex-sentiment" element={<ForexSentiment />} />
          <Route path="/market-news" element={<MarketNews />} />
          <Route
            path="/premium-economic-canledar"
            element={<PremiumEconomicCalendar />}
          />
          <Route path="/technical-views" element={<TechnicalViews />} />
          <Route path="/trade-signals" element={<TradeSignals />} />
          <Route path="/trade-vps" element={<TradeVps />} />

          {/* Auth Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/dashboard/" element={<DefaultLayout />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path="/account-setup" element={<UserOnboarding />} />

          {user ? (
            <>
              {user.isAdmin ? (
                <>
                  {/* <Route path="/admin/" element={<AdminLayout />}>
                    <Route index element={<Admin />} />
                    <Route path="/admin/home" element={<Admin />} />
                    <Route
                      path="/admin/active-users"
                      element={<ActiveUsers />}
                    />
                    <Route path="/admin/trades" element={<ManageTrades />} />
                    <Route path="/admin/trader" element={<ManageTrader />} />
                    <Route
                      path="/admin/banned-users"
                      element={<BannedUsers />}
                    />
                    <Route
                      path="/admin/approved-deposits"
                      element={<ApprovedDeposits />}
                    />
                    <Route
                      path="/admin/pending-deposits"
                      element={<PendingDeposits />}
                    />
                    <Route
                      path="/admin/rejected-deposits"
                      element={<RejectedDeposits />}
                    />
                    <Route
                      path="/admin/approved-withdrawals"
                      element={<ApprovedWithdrawals />}
                    />
                    <Route
                      path="/admin/pending-withdrawals"
                      element={<PendingWithdrawals />}
                    />
                    <Route
                      path="/admin/rejected-withdrawals"
                      element={<RejectedWithdrawals />}
                    />
                    <Route path="/admin/sendmail" element={<SendMail />} />
                    <Route path="/admin/settings" element={<Settings />} />
                    <Route path="/admin/kyc" element={<KYC />} /> 
                  </Route>*/}

                  <Route path="/login" element={<Navigate to="/admin/" />} />
                  <Route path="/register" element={<Navigate to="/admin/" />} />
                  <Route
                    path="/register/:ref"
                    element={<Navigate to="/admin/" />}
                  />
                </>
              ) : (
                <Route
                  path="/admin/*"
                  element={<Navigate to="/dashboard/" />}
                />
              )}

              {/* {!user.isAdmin ? (
                <>
                  <Route path="/dashboard/" element={<DefaultLayout />}>
                    {user.fullName === '' ? (
                      <Route
                        path="/dashboard/updateProfile"
                        element={<UpdateProfile />}
                      />
                    ) : (
                      <Route path="/dashboard/home" element={<Dashboard />} />
                    )}

                    <Route index element={<Dashboard />} />
                    <Route path="/dashboard/home" element={<Dashboard />} />

                    {routes.map((route, i) => (
                      <Route
                        key={i}
                        path={route.path}
                        element={<route.component />}
                      />
                    ))}
                  </Route>

                  <Route
                    path="/login"
                    element={<Navigate to="/dashboard/" />}
                  />
                  <Route
                    path="/register"
                    element={<Navigate to="/dashboard/" />}
                  />
                  <Route
                    path="/register/:ref"
                    element={<Navigate to="/dashboard/" />}
                  />
                </>
              ) : (
                <Route
                  path="/dashboard/*"
                  element={<Navigate to="/admin/" />}
                />
              )} */}
            </>
          ) : (
            <>
              {/* <Route path="/dashboard/*" element={<Navigate to="/login" />} />
              <Route path="/admin/*" element={<Navigate to="/login" />} /> */}
              {/* 
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/:ref" element={<Register />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/password-reset/:page" element={<PasswordReset />} /> */}
            </>
          )}
        </Routes>
      </>
    );
}

export default App;
