import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
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

        const loginRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/auth/login`, {
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

        const me = await api("/users/me", "GET");

        if (!me || me.detail || !me.role) { 
            setError("Ошибка получения профиля или роли пользователя");
            setIsLoading(false);
            return;
        }

        setRegisterData(me); 

        setIsLoading(false);

        setTimeout(() => {
            const userRole = me.role || 'child'; 

            if (userRole === "parent") {
                navigate("/parent");
            } else {
                navigate("/child");
            }
        }, 0); 
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
                    duration: 0.4
                }}
                className={styles.card}
            >
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
                            placeholder="+996 XXX-XXX-XXX"
                            required
                            value={
                                phoneNumber
                                    .replace(/(\d{3})(\d{0,3})(\d{0,3})/, (_, a, b, c) =>
                                        [a, b, c].filter(Boolean).join(" ")
                                    )
                            }
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/\D/g, "");

                                if (onlyNums.length <= 9) {
                                    setPhoneNumber(onlyNums);
                                }
                            }}
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
            </motion.div>
        </div>
    );
}

export default LogInPage;