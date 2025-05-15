//import { lazy, Suspense } from "react";
import { ProtectedLayout } from "@/components/layouts/protected";
import { PageDashboard } from "@/pages/protected/dashboard";
import { PageAdmins } from "@/pages/protected/admins";
import { Route, Routes } from "react-router";
import { PageImageLibrary } from "@/pages/protected/images";

export const ProtectedRoutes = () => {
  return (
    <>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<PageDashboard />} />
          <Route path="/admins" element={<PageAdmins />} />
          <Route path="/images" element={<PageImageLibrary />} />
          <Route path="/waqfeardhi/*" element={<WaqfeArdhiRoutes />} />
          <Route path="/expo/*" element={<ExpoRoutes />} />
        </Route>
      </Routes>
    </>
  );
};

const WaqfeArdhiRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<p>Waqf-e-Ardhi Dashboard</p>} />
      </Routes>
    </>
  );
};

const ExpoRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<p>Expo Dashboard</p>} />
      </Routes>
    </>
  );
};
