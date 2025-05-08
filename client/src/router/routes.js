import ForgotPassword from "@pages/auth/ForgotPassword";
import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";
import ActivateAccount from "@pages/auth/ActivateAccount";
import ResetPassword from "@pages/auth/ResetPassword";

import { PageBuilder } from "./PageBuilder";

// import ProgramEdit from "@pages/app/program/ProgramEdit";
// import Program from "@pages/app/program/Program";
// import CreateProgram from "@pages/app/program/CreateProgram";
import Programs from "@pages/app/program/Programs";

import Profile from "@pages/app/Profile";
import Progress from "@pages/app/Progress";
import Home from "@pages/app/Home";
import Settings from "@pages/app/Settings";
import Support from "@pages/app/Support";
import Exercises from "@pages/app/Exercises";
// import Split from "@pages/app/Split";

import Workout from "@pages/app/Workout";
import Workouts from "@pages/app/Workouts";

import Users from "@pages/app/admin/Users";

export const homePage = new PageBuilder()
  .element(Home).title("Home").subtitle("welcome to your dashboard")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const profilePage = new PageBuilder()
  .element(Profile).title("Profile").subtitle("welcome to your profile")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build()

export const progressPage = new PageBuilder()
  .element(Progress).title("Progress").subtitle("welcome to your progress")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build()

export const loginPage = new PageBuilder()
  .element(Login)
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const registerPage = new PageBuilder()
  .element(Register)
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const forgotPasswordPage = new PageBuilder()
  .element(ForgotPassword)
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();

export const resetPasswordPage = new PageBuilder()
  .element(ResetPassword)
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();
 
export const activateAccountPage = new PageBuilder()
  .element(ActivateAccount)
  .includeParams()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .build();


export const settingsPage = new PageBuilder()
  .element(Settings).title("Settings").subtitle("Welcome to your settings")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const supportPage = new PageBuilder()
  .element(Support).title("Help & Support").subtitle("Welcome to Help and Support")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const programsPage = new PageBuilder()
  .element(Programs).title("Programs").subtitle("Select a Program")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

// export const programPage = new PageBuilder()
//   .element(Program)
//   .includeUserContext()
//   .includeNavigate()
//   .includeMobile()
//   .includeTheme()
//   .includeParams()
//   .build();

//   export const programEditPage = new PageBuilder()
//   .element(ProgramEdit)
//   .includeUserContext()
//   .includeNavigate()
//   .includeMobile()
//   .includeTheme()
//   .includeParams()
//   .build();

//   export const createProgramPage = new PageBuilder()
//   .element(CreateProgram).title("Create New Program").subtitle("fill in the details of your new program")
//   .includeUserContext()
//   .includeNavigate()
//   .includeMobile()
//   .includeTheme()
//   .includeParams()
//   .build();

export const exercisesPage = new PageBuilder()
  .element(Exercises).title("Exercises").subtitle("A list of all the exersices")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

// export const splitPage = new PageBuilder()
//   .element(Split)
//   .includeUserContext()
//   .includeNavigate()
//   .includeMobile()
//   .includeTheme()
//   .includeParams()
//   .build();

export const usersPage = new PageBuilder()
  .element(Users).title("Users").subtitle("A list of all the users")
  .includeUserContext()
  .includeNavigate()
  .includeMobile()
  .includeTheme()
  .includeParams()
  .build();

export const workoutsPage = new PageBuilder()
  .element(Workouts).title("Workouts").subtitle("A list of all the workouts")
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
