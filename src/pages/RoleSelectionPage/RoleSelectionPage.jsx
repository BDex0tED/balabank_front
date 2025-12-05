import React, { useContext, useState } from 'react';
import { motion } from "framer-motion";
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
        const nav = selectedRole == 'PARENT' ? 'registration' : 'login';
        navigate(`/${nav}`);
    };

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
                className={styles.content}
            >
                <p className={styles.title}>Выберите роль</p>
                <div className={styles.choiseContainer}>
                    <figure>
                        <div
                            className={`${styles.roleCard} ${selectedRole === 'PARENT' ? styles.selectedCard : ''}`}
                            onClick={() => setSelectedRole('PARENT')}
                        >
                            <img src={parent} alt="parent-icon" />
                        </div>
                        <figcaption className={styles.figcaption}>Родитель</figcaption>
                    </figure>
                    <figure>
                        <div
                            className={`${styles.roleCard} ${selectedRole === 'CHILD' ? styles.selectedCard : ''}`}
                            onClick={() => setSelectedRole('CHILD')}
                        >
                            <img src={child} alt="child-icon" />
                        </div>
                        <figcaption className={styles.figcaption}>Ребенок</figcaption>
                    </figure>
                </div>
                <div className={styles.space100}></div>
                <motion.button 
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    onClick={handleContinue}
                    className={styles.startBtn}
                    disabled={!isContinueEnabled}
                >
                    Продолжить
                </motion.button>
            </motion.div >
        </div>
    )
}

export default RoleSelectionPage;
