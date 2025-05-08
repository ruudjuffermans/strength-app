import { createElement } from "react";
import { Route, Routes } from "react-router-dom";

import AppLayout from "@layout/AppLayout";
import AuthLayout from "@layout/AuthLayout";

import {
  homePage,
  loginPage,
  registerPage,
  forgotPasswordPage,
  activateAccountPage,
  settingsPage,
  usersPage,
  supportPage,
  exercisesPage,
  programsPage,
  // createProgramPage,
  // programPage,
  // programEditPage,
  // splitPage,
  workoutPage,
  workoutsPage,
  resetPasswordPage,
  profilePage,
  progressPage
} from "./routes";

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={createElement(loginPage)} />
        <Route path="/register" element={createElement(registerPage)} />
        <Route path="/forgot-password" element={createElement(forgotPasswordPage)} />
        <Route path="/activate-account" element={createElement(activateAccountPage)} />
        <Route path="/reset-password/:token" element={createElement(resetPasswordPage)} />
      </Route>

      <Route element={<AppLayout />}>
        <Route index element={createElement(homePage)} />
        <Route path="/settings" element={createElement(settingsPage)} />
        <Route path="/profile" element={createElement(profilePage)} />
        <Route path="/users" element={createElement(usersPage)} />
        <Route path="/support" element={createElement(supportPage)} />
        <Route path="/exercises" element={createElement(exercisesPage)} />
        <Route path="/programs" element={createElement(programsPage)} />
        <Route path="/progress" element={createElement(progressPage)} />
        {/* <Route path="/create-program" element={createElement(createProgramPage)} />
        <Route path="/program/:programId/edit" element={createElement(programEditPage)} />
        <Route path="/program/:programId" element={createElement(programPage)} /> */}
        {/* <Route path="/split/:splitId" element={createElement(splitPage)} /> */}
        <Route path="/workout/:workoutId" element={createElement(workoutPage)} />
        <Route path="/workouts" element={createElement(workoutsPage)} />
      </Route>
    </Routes>
  );
};

export default Router;
