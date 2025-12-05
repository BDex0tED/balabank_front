import React, { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import styles from './AvatarList.module.css';
import requestIcon from '../../assets/request.png';

function AvatarList({ users, userType, onChildSelect, selectedChildId }){
    const isChild = userType === 'child';

    const containerRef = useRef(null);

    const [selectedUserId, setSelectedUserId] = useState(selectedChildId);

    const centerItem = (index) => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const item = container.children[index];

        if (!item) return;

        const scrollX =
            item.offsetLeft -
            container.offsetWidth / 2 +
            item.offsetWidth / 2;

        container.scrollTo({
            left: scrollX,
            behavior: "smooth",
        });
    };

    // центрируем выбранного ребенка
    useEffect(() => {
        if (!users || users.length === 0) return;

        const index = users.findIndex(u => u.id === selectedChildId);

        if (index !== -1) {
            centerItem(index);
        }
    }, [selectedChildId, users]);

    const handleAvatarClick = (user, index) => {
        setSelectedUserId(user.id);
        centerItem(index);

        if (onChildSelect) {
            onChildSelect(user.id);
        }
    };

    useEffect(() => {
        setSelectedUserId(selectedChildId);
    }, [selectedChildId]);

    return (
        <>
            <motion.div
                ref={containerRef}
                className={styles.container}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    duration: 0.4,
                }}
            >
                {users.map((user, index) => (
                    <div
                        key={user.id || index}
                        onClick={() => handleAvatarClick(user, index)}
                        className={`${styles.avatarItem} ${
                            user.id === selectedChildId ? styles.selected : ""
                        }`}
                    >
                        <div className={styles.avatarWrapper}>
                            <img
                                loading="lazy"
                                src={user.avatarUrl}
                                alt={`Аватар ${user.name}`}
                                className={styles.avatar}
                            />
                        </div>
                        <span className={styles.name}>{user.name}</span>
                    </div>
                ))}
            </motion.div>

            <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 100 }}
                className={`${styles.BtnStyle} ${!isChild ? styles.hidden : ""}`}
            >
                <img src={requestIcon} alt="requestIcon" />
                <p>Запросить денег</p>
            </motion.button>
        </>
    );
}

export default AvatarList;
