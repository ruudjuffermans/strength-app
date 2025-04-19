import React from "react";
import { Route, Routes } from "react-router-dom";

import AppLayout from "@layout/AppLayout";
import AuthLayout from "@layout/AuthLayout";

import {
  homePage,
  loginPage,
  registerPage,
  forgotPasswordPage,
  settingsPage,
  usersPage,
  supportPage,
  exercisesPage,
  exercisesEditPage,
  programsPage,
  programsEditPage,
  splitPage,
  workoutPage,
  workoutsPage,
} from "./routes";

const Router = () => {
  return (
    <Routes>
      {/* Public / Auth Pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={loginPage()} />
        <Route path="/register" element={registerPage()} />
        <Route path="/forgot-password" element={forgotPasswordPage()} />
      </Route>

      {/* Protected App Pages */}
      <Route element={<AppLayout />}>
        <Route index element={homePage()} />
        <Route path="/settings" element={settingsPage()} />
        <Route path="/users" element={usersPage()} />
        <Route path="/support" element={supportPage()} />
        <Route path="/exercises" element={exercisesPage()} />
        <Route path="/exercises/edit" element={exercisesEditPage()} />
        <Route path="/programs" element={programsPage()} />
        <Route path="/programs/edit" element={programsEditPage()} />
        <Route path="/split/:splitId" element={splitPage()} />
        <Route path="/workout/:workoutId" element={workoutPage()} />
        <Route path="/workouts" element={workoutsPage()} />
      </Route>
    </Routes>
  );
};

export default Router;
