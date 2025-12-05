import React, { useContext, useEffect, useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// ⚠️ Убедитесь, что вы импортируете все компоненты страниц здесь, 
// или в файле, где определен routers, если вы решите изменить структуру.
import ParentHomePage from './pages/ParentHomePage/ParentHomePage'; 
// ... остальные страницы, которые есть в вашем routers.js

import AuthProvider, { AuthContext } from './context/AuthContext.jsx';
import { TaskProvider } from './context/TaskContext';

// Предполагаем, что этот файл экспортирует массив роутов, а не готовый роутер:
import { routers as staticRoutes } from "./app/routers";
import './index.css'; 


// -----------------------------------------------------------
// 🧩 НОВЫЙ КОМПОНЕНТ: AppRoutes 
// Он имеет доступ к контексту и динамически создает роутер.
// -----------------------------------------------------------
function AppRoutes() {
    // ✅ 1. Получаем ключ обновления из AuthContext
    const { familyUpdateKey } = useContext(AuthContext);

    // 💡 Используем useMemo, чтобы пересоздавать роутер только при смене ключа.
    const router = useMemo(() => {
        
        // Находим и модифицируем роут для /parent
        const modifiedRoutes = staticRoutes.map(route => {
            if (route.path === "/parent") {
                // ✅ 2. Применяем key к ParentHomePage
                return {
                    ...route,
                    element: <ParentHomePage key={familyUpdateKey} />,
                };
            }
            // ⚠️ ВАЖНО: Если роут /parent не содержит компонента (element)
            // и использует вложенные роуты, то key нужно ставить на <Outlet />
            // или на сам компонент ParentHomePage, если он является Outlet'ом.
            return route;
        });

        // Если ParentHomePage не был в списке routers, то нужно добавить его руками
        // Если routers - это просто массив объектов, то этот код сработает.
        return createBrowserRouter(modifiedRoutes);
        
    }, [familyUpdateKey]); // ✅ Зависимость от ключа обновления семьи

    return <RouterProvider router={router} />;
}

// -----------------------------------------------------------
// 📌 ОСНОВНОЙ КОМПОНЕНТ: App
// Он отвечает только за провайдеры и логику vh.
// -----------------------------------------------------------
function App() {
    // Логика для vh, которая была у вас
    useEffect(() => {
        const updateVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        updateVh();
        window.addEventListener('resize', updateVh);

        return () => window.removeEventListener('resize', updateVh);
    }, []);

    // Удален дублирующийся useEffect

    return (
        <>
            <AuthProvider>
                <TaskProvider>
                    {/* ✅ Передаем управление роутами компоненту, имеющему доступ к контексту */}
                    <AppRoutes /> 
                </TaskProvider>
            </AuthProvider>
        </>
    );
}

export default App;