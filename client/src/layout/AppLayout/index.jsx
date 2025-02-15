import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@layout/AppLayout/Sidebar";
import Topbar from "@layout/AppLayout/Topbar";
import ModuleBoundary from "../../components/ModuleBoundary";

const AppLayout = () => {
  const [isSidebar, setIsSidebar] = useState(true);

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
