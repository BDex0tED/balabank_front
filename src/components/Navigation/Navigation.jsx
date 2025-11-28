import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import styles from './Navigation.module.css';
import { AuthContext } from '../../context/AuthContext.jsx'; 

import homeIcon from '../../assets/home.png';
import paymentsIcon from '../../assets/payments.png';
import historyIcon from '../../assets/history.png';
import profileIcon from '../../assets/profile.png';
import scannerIcon from '../../assets/scan.png';

const navItems = [
    { label: 'Главная', icon: homeIcon, path: null }, 
    { label: 'Платежи', icon: paymentsIcon, path: '/payments' },
    { label: 'История', icon: historyIcon, path: '/history' },
    { label: 'Профиль', icon: profileIcon, path: '/profile' },
];

function Navigation() {
    const { registerData } = useContext(AuthContext);
    const userRole = registerData?.role;

    const homePath = userRole === 'parent' ? '/parent' : '/child';

    const finalNavItems = navItems.map(item => {
        if (item.label === 'Главная') {
            return { ...item, path: homePath };
        }
        return item;
    });

    return (
        <nav className={styles.navWrapper}>
            <div className={styles.navContainer}>
                <div className={styles.navSection}>
                    {finalNavItems.slice(0, 2).map(item => (
                        <Link key={item.label} to={item.path} className={styles.navItem}>
                            <img src={item.icon} alt={item.label} className={styles.icon} />
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    ))}
                </div>

                <button className={styles.centerButton}>
                    <img src={scannerIcon} alt="Сканер"/>
                </button>
                
                <div className={styles.navSection}>
                    {finalNavItems.slice(2).map(item => (
                        <Link key={item.label} to={item.path} className={styles.navItem}>
                            <img src={item.icon} alt={item.label} className={styles.icon} />
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Navigation;