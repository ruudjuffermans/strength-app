import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "@layout/AppLayout/Sidebar";
import Topbar from "@layout/AppLayout/Topbar";
import ModuleBoundary from "../../components/ModuleBoundary";
import { useAuth } from "@context/AuthContext";

const AppLayout = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  console.log(user)

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <ModuleBoundary innerPage>
          <Outlet />
        </ModuleBoundary>
      </main>
    </div>
  );
};

export default AppLayout;