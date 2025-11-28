import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import styles from '../style.module.css'; 
import child from '../../assets/child-icon.png'; 
import parent from '../../assets/parent-icon.png'; 

function RoleSelectionPage() {
    const { updateRegisterData } = useContext(AuthContext);
    const [selectedRole, setSelectedRole] = useState(null);
    const isContinueEnabled = selectedRole !== null;

    const navigate = useNavigate();
    
    const handleContinue = () => {
        updateRegisterData({ role: selectedRole }); 
        navigate("/registration");
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <p className={styles.title}>Выберите роль</p>
                <div className={styles.choiseContainer}>
                    <figure>
                        <div
                            className={`${styles.roleCard} ${selectedRole === 'parent' ? styles.selectedCard : ''}`}
                            onClick={() => setSelectedRole('parent')}
                        >
                            <img src={parent} alt="parent-icon" />
                        </div>
                        <figcaption className={styles.figcaption}>Родитель</figcaption>
                    </figure>
                    <figure>
                        <div
                            className={`${styles.roleCard} ${selectedRole === 'child' ? styles.selectedCard : ''}`}
                            onClick={() => setSelectedRole('child')}
                        >
                            <img src={child} alt="child-icon" />
                        </div>
                        <figcaption className={styles.figcaption}>Ребенок</figcaption>
                    </figure>
                </div>
                <div className={styles.space100}></div>
                <button 
                    onClick={handleContinue}
                    className={styles.startBtn}
                    disabled={!isContinueEnabled}
                >
                    Продолжить
                </button>
            </div>
        </div>
    )
}

export default RoleSelectionPage;
