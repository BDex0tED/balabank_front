import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import api from "../../api.js";
import styles from "../style.module.css";

function CreatePasswordPage() {
    const { registerData } = useContext(AuthContext);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const isContinueEnabled =
        password.length >= 8 && password === repeatPassword && !isLoading;

    async function handleCreate(e) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (password !== repeatPassword) {
            setError("Пароли не совпадают!");
            setIsLoading(false);
            return;
        }

        const registrationPayload = {
            name: registerData.name,
            surname: registerData.surname,
            paternity: registerData.paternity,
            phone_number: registerData.phone_number,
            age: registerData.age,
            password: password,
            role: registerData.role,
        };

        const registerRes = await api("/auth/register", "POST", registrationPayload);

        if (registerRes.detail) {
            setError(`Ошибка регистрации: ${registerRes.detail}`);
            setIsLoading(false);
            return;
        }

        const formData = new URLSearchParams();
        formData.append("username", registerData.phone_number);
        formData.append("password", password);

        const loginRes = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        }).then((r) => r.json());

        if (!loginRes.access_token) {
            setError(loginRes.detail || "Ошибка входа. Проверьте сервер.");
            setIsLoading(false);
            return;
        }

        localStorage.setItem("token", loginRes.access_token);

        const me = await api("/users/me", "GET");

        setIsLoading(false);

        if (me.role === "parent") navigate("/parent");
        else navigate("/child");
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1 className={styles.regTitle}>Создайте пароль</h1>

                {error && (
                    <div
                        className={styles.errorMessage}
                        style={{
                            color: "red",
                            marginBottom: "10px",
                            textAlign: "center",
                        }}
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleCreate}>
                    <input type="hidden" value={registerData.phone_number} />

                    <div className={styles.formGroup}>
                        <label>Пароль</label>
                        <input
                            type="password"
                            placeholder="Минимум 8 символов"
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

                    <button
                        type="submit"
                        className={styles.btn}
                        disabled={!isContinueEnabled}
                    >
                        {isLoading ? "Регистрация..." : "Продолжить"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreatePasswordPage;
