import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "@layout/AppLayout/Sidebar";
import Topbar from "@layout/AppLayout/Topbar";
import ModuleBoundary from "../../components/ModuleBoundary";
import { useAuth } from "@context/AuthContext";

const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="app">
      <Sidebar open={open} setOpen={setOpen}  />
      <main className="content">
        <Topbar open={open} setOpen={setOpen}  />
        <ModuleBoundary innerPage>
          <Outlet />
        </ModuleBoundary>
      </main>
    </div>
  );
};

export default AppLayout;