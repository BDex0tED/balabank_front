import React from 'react';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import styles from '../style.module.css';

function SignUpPage() {
    const { setRegisterData } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [paternity, setPaternity] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [age, setAge] = useState(18); 

    const isPhoneValid = phoneNumber.length === 9;
    const isFormValid = name.trim() && surname.trim() && phoneNumber.trim() && age > 0;

    function handleSubmit() {

        if (!isPhoneValid) return;

        setRegisterData(prev => ({ 
            ...prev, 
            name: name.trim(),
            surname: surname.trim(),
            paternity: paternity.trim(), 
            phone_number: phoneNumber, 
            age: age, 
        }));

        navigate("/registration/password");
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1 className={styles.regTitle}>Регистрация</h1>

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
                        placeholder="+996 (XXX) XX-XX-XX" 
                        required 
                        value={phoneNumber} 
                        onChange={(e) => {
                            const onlyNums = e.target.value.trim().replace(/\D/g, "");
                            if (onlyNums.length <= 9) {
                                setPhoneNumber(onlyNums);
                            }
                        }}
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <label>Возраст</label>
                    <input 
                        type="number" 
                        placeholder="18" 
                        required 
                        min="1"
                        value={age} 
                        onChange={(e) => setAge(parseInt(e.target.value))}
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
            </div>
        </div>
    )
}

export default SignUpPage;