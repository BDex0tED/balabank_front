import { createBrowserRouter } from "react-router-dom";
import ParentHomePage from "../pages/ParentHomePage/ParentHomePage";
import ChildHomePage from "../pages/ChildHomePage/ChildHomePage";
import GreetingPage from "../pages/GreetingPage/GreetingPage";
import RoleSelectionPage from "../pages/RoleSelectionPage/RoleSelectionPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LogInPage from "../pages/LogInPage/LogInPage";
import CreatePasswordPage from "../pages/CreatePasswordPage/CreatePasswordPage";
import ChatPage from "../pages/ChatPage/ChatPage";
import AutoPaymentPage from "../pages/AutoPaymentPage/AutoPaymentPage";
import CreateTaskPage from "../pages/CreateTaskPage/CreateTaskPage";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <GreetingPage />,
  },
  {
    path: "/role",
    element: <RoleSelectionPage />,
  },
  {
    path: "/registration",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "/registration/password",
    element: <CreatePasswordPage />,
  },
  {
    path: "/parent",
    element: <ParentHomePage />,
  },
  {
    path: "/child",
    element: <ChildHomePage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/autopayment",
    element: <AutoPaymentPage />,
  },
  {
    path: "/createtask",
    element: <CreateTaskPage />,
  },
]);
