import AppLayout from "@layout/AppLayout";
import AuthLayout from "@layout/AuthLayout";
import ForgotPassword from "@pages/ForgotPassword";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Register from "@pages/Register";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Settings from "@pages/Settings";
import Support from "@pages/Support";
import Programs from "@pages/Programs";
import ProgramsEdit from "@pages/ProgramsEdit";
import Exercises from "@pages/Exercises";
import ExercisesEdit from "@pages/ExercisesEdit";
import Split from "@pages/Split";
import Workout from "@pages/Workout";

const Router = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercises/edit" element={<ExercisesEdit />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/edit" element={<ProgramsEdit />} />
        <Route path="/split/:splitId" element={<Split />} />
        <Route path="/workout" element={<Workout />} />
      </Route>
    </Routes>
  );
};

export default Router;
