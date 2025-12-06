import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx"; // <-- Импорт контекста
import api from "../../api.js";
import styles from "../style.module.css";

function CreatePasswordPage() {
    // ✅ Получаем triggerFamilyUpdate из контекста
    const { registerData, setRegisterData, triggerFamilyUpdate } = useContext(AuthContext); 

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const isContinueEnabled =
        password.length >= 4 && 
        password === repeatPassword &&
        !isLoading;

    async function handleCreate(e) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (password !== repeatPassword) {
            setError("Пароли не совпадают!");
            setIsLoading(false);
            return;
        }

        const roleToRegister = registerData.role?.toUpperCase();
        let registerEndpoint = "";

        // 🧩 1. Формирование Payload
        let payload = {
            phone_number: registerData.phone_number,
            surname: registerData.surname,
            name: registerData.name,
            paternity: registerData.paternity || null,
            password: password,
            age: registerData.age,
        };

        // ----------------------------------------------------
        // 👨‍👩‍👧 Логика для Родителя (Создание семьи: /auth/register)
        // ----------------------------------------------------
        if (roleToRegister === "PARENT") {
            registerEndpoint = "/auth/register";
            payload.role = roleToRegister;
            payload.family_name = registerData.family_name;
        } 
        
        // ----------------------------------------------------
        // 👦 Логика для Ребенка (Добавление к семье: /families/add-child)
        // ----------------------------------------------------
        else if (roleToRegister === "CHILD") {
            registerEndpoint = "/families/add-child";
            delete payload.role;
        } else {
            setError("Ошибка: Неопределенная роль пользователя.");
            setIsLoading(false);
            return;
        }

        console.log(`Sending to endpoint: ${registerEndpoint}`, payload);

        // 📌 2. SEND REGISTER REQUEST
        const registerRes = await api(registerEndpoint, "POST", payload);

        if (registerRes.detail) {
            setError(`Ошибка регистрации: ${registerRes.detail}`);
            setIsLoading(false);
            return;
        }

        // 📌 3. Save generated family_id from PARENT registration
        if (roleToRegister === "PARENT" && registerRes.family_id) {
            localStorage.setItem("family_id", registerRes.family_id);
        }

        // ----------------------------------------
        // 👉 4. CHILD REGISTERED SUCCESSFULLY (Redirect PARENT to refresh)
        // ----------------------------------------
        if (roleToRegister === "CHILD") {
            setRegisterData({}); 
            setIsLoading(false);
            
            // ✅ ВЫЗЫВАЕМ ФУНКЦИЮ ОБНОВЛЕНИЯ ПЕРЕД НАВИГАЦИЕЙ
            if (triggerFamilyUpdate) {
                triggerFamilyUpdate();
            }

            navigate("/parent"); 
            return;
        }

        // ----------------------------------------
        // 👉 5. PARENT AUTO LOGIN
        // ----------------------------------------
        const formData = new URLSearchParams();
        formData.append("username", payload.phone_number);
        formData.append("password", password);

        // Вход через form-urlencoded, поэтому используем fetch
        const loginRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData.toString(),
        }).then((r) => r.json());

        if (!loginRes.access_token) {
            setError(loginRes.detail || "Ошибка входа");
            setIsLoading(false);
            return;
        }

        localStorage.setItem("token", loginRes.access_token);

        // Получаем роль, чтобы навигировать правильно
        const me = await api("/users/me", "GET");

        setIsLoading(false);
        setRegisterData({});

        // 💡 ФИНАЛЬНАЯ НАВИГАЦИЯ
        if (me && me.role?.toUpperCase() === "PARENT") {
            navigate("/parent");
        } else if (me && me.role?.toUpperCase() === "CHILD") {
            navigate("/child");
        } else {
            console.error("Роль пользователя не определена.", me);
            navigate("/login"); 
        }
    }

    return (
        <div className={styles.wrapper}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    duration: 0.4,
                }}
                className={styles.card}
            >
                <h1 className={styles.regTitle}>Создайте пароль</h1>

                {error && (
                    <div
                        className={styles.errorMessage}
                        style={{ color: "red", marginBottom: "10px", textAlign: "center" }}
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleCreate}>
                    <div className={styles.formGroup}>
                        <label>Пароль</label>
                        <input
                            type="password"
                            placeholder="Минимум 4 символа"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Повторите пароль</label>
                        <input
                            type="password"
                            placeholder="Повторите пароль"
                            required
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" className={styles.btn} disabled={!isContinueEnabled}>
                        {isLoading ? "Регистрация..." : "Продолжить"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

export default CreatePasswordPage;