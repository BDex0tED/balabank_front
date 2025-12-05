// Импорт компонентов остается без изменений
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
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import AddChildPage from "../pages/AddChildPage/AddChildPage";

// ✅ ЭКСПОРТИРУЕМ ТОЛЬКО МАССИВ КОНФИГУРАЦИЙ РОУТОВ
export const routers = [
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
    // ВНИМАНИЕ: Здесь нет ключа, ключ будет добавлен в App.jsx/AppRoutes
    path: "/parent",
    element: <ParentHomePage />,
  },
  {
    path: "/parent/add-child",
    element: <AddChildPage />,
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
  {
    path: "/*",
    element: <NotFoundPage />,
  },
];

// Теперь ваш компонент AppRoutes (в App.jsx) может импортировать этот массив 
// и использовать его для создания роутера с динамическим ключом.