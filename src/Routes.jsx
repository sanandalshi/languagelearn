import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import InteractiveLesson from './pages/interactive-lesson';
import LanguageSelection from './pages/language-selection';
import UserProfileSettings from './pages/user-profile-settings';
import UserRegistration from './pages/user-registration';
import LearningDashboard from './pages/learning-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<InteractiveLesson />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/interactive-lesson" element={<InteractiveLesson />} />
        <Route path="/language-selection" element={<LanguageSelection />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/learning-dashboard" element={<LearningDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
