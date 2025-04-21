import Home from "@pages/Home";
import Settings from "@pages/Settings";
import Support from "@pages/Support";
import Programs from "@pages/Programs";
import Exercises from "@pages/Exercises";
import Split from "@pages/Split";
import Workout from "@pages/Workout";
import Workouts from "@pages/Workouts";

import ForgotPassword from "@pages/ForgotPassword";
import Login from "@pages/Login";
import Register from "@pages/Register";

import { PageBuilder } from "./PageBuilder";
import Users from "@pages/Users";
import Program from "../pages/Program";

export const homePage = new PageBuilder()
  .element(Home).title("home").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const loginPage = new PageBuilder()
  .element(Login).title("login").subtitle("welcome to your dashboard")
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const registerPage = new PageBuilder()
  .element(Register).title("register").subtitle("welcome to your dashboard")
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const forgotPasswordPage = new PageBuilder()
  .element(ForgotPassword).title("forgot password").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const settingsPage = new PageBuilder()
  .element(Settings).title("settings").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const supportPage = new PageBuilder()
  .element(Support).title("support").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const programsPage = new PageBuilder()
  .element(Programs).title("Programs").subtitle("All available programs")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const programPage = new PageBuilder()
  .element(Program)
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const exercisesPage = new PageBuilder()
  .element(Exercises).title("Exercises").subtitle("A list of all the exersices")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const splitPage = new PageBuilder()
  .element(Split)
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const usersPage = new PageBuilder()
  .element(Users).title("Users").subtitle("al list of all the users")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const workoutsPage = new PageBuilder()
  .element(Workouts).title("workouts").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const workoutPage = new PageBuilder()
  .element(Workout)
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();
