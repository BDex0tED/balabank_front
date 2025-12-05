import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from './Header.module.css';
import topUP from '../../assets/topUp.png';
import token from '../../assets/token.png';
import notification from '../../assets/notification.png'


const Header = ({ userType, img, content}) => {
    const isChild = userType === 'CHILD';
    const navigate = useNavigate();

    return (
        <motion.div 
            className={styles.header}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
        >
            <img loading="lazy" src={img} alt="pofileiIcon" className={styles.profileIcon} />
            {isChild ? (
                <div className={styles.childHeader}>
                    <p>Привет, {content}!</p>
                </div>
            ) : (
                <div className={styles.parentHeader}>
                    <div className={styles.balance}>
                        <img src={token} alt="token" />
                        <p>{content}c</p>
                    </div>
                    <div className={styles.action}>
                        <button onClick={(e) => navigate('./add-child')}>
                            <img src={topUP} alt="TopUp" loading="lazy"/>
                        </button>
                        <p>Добавить ребенка</p>
                    </div>
                </div>
            )}
            <img src={notification} alt="notificationIcon" loading="lazy"/>
        </motion.div>
    );
};

export default Header;