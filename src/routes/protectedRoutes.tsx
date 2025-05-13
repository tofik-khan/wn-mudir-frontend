//import { lazy, Suspense } from "react";
import { ProtectedLayout } from "@/components/layouts/protected";
import { PageDashboard } from "@/pages/protected/dashboard";
import { PageAdmins } from "@/pages/protected/admins";
import { Route, Routes } from "react-router";

export const ProtectedRoutes = () => {
  return (
    <>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<PageDashboard />} />
          <Route path="/admins" element={<PageAdmins />} />
        </Route>
      </Routes>
    </>
  );
};
