import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Login from "pages/login";
import Dashboard from "pages/dashboard";
import PortfolioManagement from "pages/portfolio-management";
import SettingsAdministration from "pages/settings-administration";
import ReportsClientCommunication from "pages/reports-client-communication";
import AnalyticsPerformance from "pages/analytics-performance";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio-management" element={<PortfolioManagement />} />
        <Route path="/settings-administration" element={<SettingsAdministration />} />
        <Route path="/reports-client-communication" element={<ReportsClientCommunication />} />
        <Route path="/analytics-performance" element={<AnalyticsPerformance />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;