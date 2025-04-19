import Home from "@pages/Home";
import Settings from "@pages/Settings";
import Support from "@pages/Support";
import Programs from "@pages/Programs";
import ProgramsEdit from "@pages/ProgramsEdit";
import Exercises from "@pages/Exercises";
import ExercisesEdit from "@pages/ExercisesEdit";
import Split from "@pages/Split";
import Workout from "@pages/Workout";
import Workouts from "@pages/Workouts";

import ForgotPassword from "@pages/ForgotPassword";
import Login from "@pages/Login";
import Register from "@pages/Register";

import { PageBuilder } from "./PageBuilder";
import Users from "@pages/Users";

export const homePage = new PageBuilder()
  .element(Home).title("home").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const loginPage = new PageBuilder()
  .element(Login).title("login").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const registerPage = new PageBuilder()
  .element(Register).title("register").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const forgotPasswordPage = new PageBuilder()
  .element(ForgotPassword).title("forgot password").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const settingsPage = new PageBuilder()
  .element(Settings).title("settings").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const supportPage = new PageBuilder()
  .element(Support).title("support").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const programsPage = new PageBuilder()
  .element(Programs).title("programs").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const programsEditPage = new PageBuilder()
  .element(ProgramsEdit).title("edit program").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const exercisesPage = new PageBuilder()
  .element(Exercises).title("exercises").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const exercisesEditPage = new PageBuilder()
  .element(ExercisesEdit).title("edit exercise").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const splitPage = new PageBuilder()
  .element(Split).title("split").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

  export const usersPage = new PageBuilder()
  .element(Users).title("users").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const workoutsPage = new PageBuilder()
  .element(Workouts).title("workouts").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const workoutPage = new PageBuilder()
  .element(Workout).title("workout").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();
