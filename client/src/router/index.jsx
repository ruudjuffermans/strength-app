import { createElement } from "react";
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
  programsPage,
  programPage,
  splitPage,
  workoutPage,
  workoutsPage,
} from "./routes";

const Router = () => {
  return (
    <Routes>
      {/* Public / Auth Pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={createElement(loginPage)} />
        <Route path="/register" element={createElement(registerPage)} />
        <Route path="/forgot-password" element={createElement(forgotPasswordPage)} />
      </Route>

      {/* Protected App Pages */}
      <Route element={<AppLayout />}>
        <Route index element={createElement(homePage)} />
        <Route path="/settings" element={createElement(settingsPage)} />
        <Route path="/users" element={createElement(usersPage)} />
        <Route path="/support" element={createElement(supportPage)} />
        <Route path="/exercises" element={createElement(exercisesPage)} />
        <Route path="/programs" element={createElement(programsPage)} />
        <Route path="/program/:programId" element={createElement(programPage)} />
        <Route path="/split/:splitId" element={createElement(splitPage)} />
        <Route path="/workout/:workoutId" element={createElement(workoutPage)} />
        <Route path="/workouts" element={createElement(workoutsPage)} />
      </Route>
    </Routes>
  );
};

export default Router;
