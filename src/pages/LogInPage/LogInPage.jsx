import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import api from "../../api.js";
import styles from "../style.module.css";

function LogInPage() {
    const { setRegisterData } = useContext(AuthContext);
    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const cleanedPhone = phoneNumber.replace(/\D/g, "");
    const isFormValid = cleanedPhone.length === 9 && password.length >= 1;

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const formData = new URLSearchParams();
        formData.append("username", cleanedPhone);
        formData.append("password", password);

        // 1. ЛОГИН (ПОЛУЧЕНИЕ ТОКЕНА)
        const loginRes = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        }).then((r) => r.json());

        if (!loginRes.access_token) {
            setError(loginRes.detail || "Неверный телефон или пароль");
            setIsLoading(false);
            return;
        }

        localStorage.setItem("token", loginRes.access_token);

        // 2. ПОЛУЧЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ (ВКЛЮЧАЯ РОЛЬ)
        const me = await api("/users/me", "GET");

        if (!me || me.detail || !me.role) { // 💡 Добавил проверку на наличие me.role
            setError("Ошибка получения профиля или роли пользователя");
            setIsLoading(false);
            return;
        }

        // 3. ПОЛНОЕ ОБНОВЛЕНИЕ КОНТЕКСТА (setRegisterData полностью перезаписывает state)
        setRegisterData(me); 

        setIsLoading(false);

        // 4. НАВИГАЦИЯ (с небольшой задержкой для гарантии обновления state)
        // 💡 Используем таймаут 0мс, чтобы убедиться, что состояние контекста
        // успеет обновиться до навигации (предотвращает чтение старой роли)
        setTimeout(() => {
            const userRole = me.role || 'child'; // Защита на случай пустого поля

            if (userRole === "parent") {
                navigate("/parent");
            } else {
                navigate("/child");
            }
        }, 0); 
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1 className={styles.regTitle}>Войти</h1>

                {error && (
                    <div className={styles.errorMessage} style={{ color: "red" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Номер телефона</label>
                        <input
                            type="tel"
                            placeholder="9 цифр"
                            value={phoneNumber}
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, "");
                                if (onlyNums.length <= 9) setPhoneNumber(onlyNums);
                            }}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Пароль</label>
                        <input
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!isFormValid || isLoading}
                        className={styles.btn}
                    >
                        {isLoading ? "Вход..." : "Войти"}
                    </button>
                </form>

                <div className={styles.linkToLogIn}>
                    <span>Нет аккаунта? <a href="/registration">Зарегистрируйтесь</a></span>
                </div>
            </div>
        </div>
    );
}

export default LogInPage;