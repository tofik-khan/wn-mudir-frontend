//import { lazy, Suspense } from "react";
import { ProtectedLayout } from "@/components/layouts/protected";
import { PageDashboard } from "@/pages/protected/dashboard";
import { PageAdmins } from "@/pages/protected/admins";
import { Route, Routes } from "react-router";
import { PageWAimageLibrary } from "@/pages/protected/waqfeardhi/imageLibrary";

export const ProtectedRoutes = () => {
  return (
    <>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<PageDashboard />} />
          <Route path="/admins" element={<PageAdmins />} />
          <Route path="/waqfeardhi/*" element={<WaqfeArdhiRoutes />} />
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
        <Route path="/images" element={<PageWAimageLibrary />} />
      </Routes>
    </>
  );
};
