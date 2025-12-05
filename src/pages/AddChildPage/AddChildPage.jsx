import React from 'react';
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import styles from '../style.module.css';

function AddChildPage() {
    const { setRegisterData } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [paternity, setPaternity] = useState("");
    // Используем строку для номера телефона
    const [phoneNumber, setPhoneNumber] = useState(""); 
    // Используем числовой тип для возраста
    const [age, setAge] = useState(15); 

    // Предполагая 9-значный формат телефона без кода страны
    const isPhoneValid = phoneNumber.length === 9; 
    const isFormValid = name.trim() && surname.trim() && phoneNumber.trim() && age > 0 && isPhoneValid;

    function handleSubmit() {

        // Проверка уже включена в isFormValid, но оставим для явности
        if (!isFormValid) return;

        setRegisterData(prev => ({ 
            ...prev, 
            name: name.trim(),
            surname: surname.trim(),
            paternity: paternity.trim(), 
            phone_number: phoneNumber, 
            age: age, 
            role: 'child', // Сохраняем маленькими, преобразуем в заглавные в CreatePasswordPage
            // Family_id НЕ сохраняем здесь, он берется из localStorage в CreatePasswordPage
        }));

        navigate("/registration/password");
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
                <h1 className={styles.regTitle}>Регистрация ребенка</h1>

                <div className={styles.formGroup}>
                    <label>Имя</label>
                    <input 
                        type="text" 
                        placeholder="Аяна" 
                        required 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Фамилия</label>
                    <input 
                        type="text" 
                        placeholder="Аянова" 
                        required 
                        value={surname} 
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Отчество (Необязательно)</label>
                    <input 
                        type="text" 
                        placeholder="Аяновна" 
                        value={paternity} 
                        onChange={(e) => setPaternity(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Номер телефона</label>
                    <input
                        type="tel"
                        placeholder="XXX XXX XXX"
                        required
                        value={
                            // Форматирование номера: 345 346 345 -> 345 346 345
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
                     {!isPhoneValid && phoneNumber.length > 0 && <p style={{color: 'red', fontSize: '12px'}}>Неполный номер (нужно 9 цифр)</p>}
                </div>
                
                <div className={styles.formGroup}>
                    <label>Возраст</label>
                    <input 
                        type="number" 
                        placeholder="15" 
                        required 
                        min="1"
                        max="15"
                        value={age} 
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val) && val >= 1) {
                                setAge(val);
                            } else if (e.target.value === "") {
                                setAge(""); // Позволяем очищать поле
                            }
                        }}
                    />
                </div>

                <button  
                    onClick={handleSubmit}
                    className={styles.btn}
                    disabled={!isFormValid}
                >
                    Продолжить
                </button>
                <div className={styles.linkToLogIn}>
                    <span >Уже есть аккаунт? <a href="/login">Войдите</a> </span>
                </div>
            </motion.div>
        </div>
    )
}

export default AddChildPage;