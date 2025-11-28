import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../Style.module.css';
import bapi from '../../assets/bapi.png';


function GreetingPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
        <div className={styles.content}>
            <p className={styles.title}>Добро пожаловать в <strong>Balabank!</strong></p>
            <img src={bapi} alt="bapi-icon" />
            <div className={styles.space}></div>
            <p className={styles.subTitle}>Меня зовут Бапи и я помогу тебе управлять деньгами!</p>
            <div className={styles.space}></div>
            <button 
              onClick={() => navigate("/role")}
              className={styles.startBtn}
            >
              Начать
            </button>
        </div>
    </div>
  )
}

export default GreetingPage