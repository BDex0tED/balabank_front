import React, { useState, useEffect, useCallback } from 'react';
import { useTasks } from '../../context/TaskContext';
import api from '../../api';

import style from '../style.module.css';
import Header from '../../components/Header/Header';
import AvatarList from '../../components/AvatarList/AvatarList';
import BalanceCard from '../../components/BalanceCard/BalanceCard';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import ChatBotBanner from '../../components/ChatBotBanner/ChatBotBanner';
import TargerCard from '../../components/TargerCard/TargerCard';
import TaskItem from '../../components/TaskItem/TaskItem';
import Navigation from '../../components/Navigation/Navigation';

import labudusImage from '../../assets/labubu.png';
import bikeImage from '../../assets/bicycle.png';
import headphonesImage from '../../assets/headphones.png';
import parentProfileIcon from '../../assets/parent-profile-icon.jpg';
import childProfileIcon from '../../assets/child-profile-icon.jpg';

const goalDataPlaceholder = [
    { id: 1, title: 'Лабудус', image: labudusImage, amount: 500.85, target: 1200.00 },
    { id: 2, title: 'Велосипед', image: bikeImage, amount: 3400.14, target: 4200.00 },
    { id: 3, title: 'Наушники', image: headphonesImage, amount: 2000.02, target: 5800.00 },
];

function ParentHomePage() {
    const { tasks } = useTasks();
    const [children, setChildren] = useState([]);
    const [selectedChildId, setSelectedChildId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchChildren = useCallback(async () => {
        setIsLoading(true);
        console.log("[FETCH] Старт запроса /users/family");

        try {
            const fetchedUsers = await api("/users/family", "GET");
            console.log("[FETCH] Ответ API:", fetchedUsers);

            if (!Array.isArray(fetchedUsers)) {
                console.error("API вернул НЕ массив:", fetchedUsers);
                setChildren([]);
                setSelectedChildId(null);
                return;
            }

            const fetchedChildren = fetchedUsers
                .filter(user => user.role && user.role.toLowerCase() === "child")
                .map(child => ({
                    ...child,
                    tasks: child.tasks || [],
                    goals: child.goals || [],
                }));

            console.log("[CHILDREN] Дети после фильтрации:", fetchedChildren);

            setChildren(fetchedChildren);

            if (fetchedChildren.length > 0) {
                const centerIndex = Math.floor((fetchedChildren.length - 1) / 2);
                setSelectedChildId(fetchedChildren[centerIndex].id);
            } else {
                console.warn("Нет детей у родителя!");
                setSelectedChildId(null);
            }

        } catch (error) {
            console.error("Ошибка API:", error);
            setChildren([]);
            setSelectedChildId(null);
        } finally {
            setIsLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchChildren();
    }, [fetchChildren]);

    const currentChild = children.find(c => c.id === selectedChildId);
    const handleChildSelect = (childId) => setSelectedChildId(childId);

    if (isLoading) {
        return <div className={style.wrapper}><p>Загрузка данных...</p></div>;
    }

    const renderGoalCards = (goals) => {
        const goalsToRender = goals.length > 0 ? goals : goalDataPlaceholder;
        return (
            <div className={style.TargerCardsContainer}>
                {goalsToRender.map(goal => (
                    <TargerCard
                        title={goal.title}
                        image={goal.image}
                        amount={goal.amount}
                        target={goal.target}
                        key={goal.id}
                    />
                ))}
            </div>
        );
    };

    return (
        <div>
            <Header img={parentProfileIcon} userType='parent' content='5000.70' />
            <div className={style.container}>

                <AvatarList
                    users={children.map(child => ({
                        id: child.id,
                        name: child.name,
                        avatarUrl: child.avatarUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3fZ_ebLrIR7-37WMGcyj_RO-0TTcZGtUKtg&s'
                    }))}
                    userType='parent'
                    onChildSelect={handleChildSelect}
                    selectedChildId={selectedChildId}
                />

                {currentChild ? (
                    <>
                        <BalanceCard userType='parent' amount='100.0' balance={currentChild.balance || '0.00'} />

                        <div className={style.TransactionsCard}>
                            <TransactionCard type='Пополнение' amount='+100.20' />
                            <TransactionCard type='Расходы' amount='-158.40' />
                        </div>

                        <ChatBotBanner />
                        <a href='/createtask' className={style.linkTitle}>Задания &gt;</a>

                        <div className={style.taskContainer}>
                            {currentChild.tasks.map(task => (
                                <TaskItem
                                    key={task.id}
                                    taskText={task.text}
                                    isCompleted={task.completed}
                                    iconUrl={task.icon}
                                    amount={task.amount}
                                    userType="parent"
                                />
                            ))}

                            {currentChild.tasks.length === 0 && (
                                <p style={{ textAlign: 'center', color: 'gray' }}>
                                    У {currentChild.name} пока нет заданий.
                                </p>
                            )}
                        </div>

                        <div className={style.savingsContainer}>
                            <p>Копилка</p>
                            {renderGoalCards(currentChild.goals)}
                        </div>
                    </>
                ) : (
                    <div>
                        <p style={{ textAlign: 'center', marginTop: '20px', paddingBottom: '60px' }}>
                            У вас пока нет добавленных детей. Нажмите "Добавить ребенка".
                        </p>

                        <ChatBotBanner />

                        <div className={style.savingsContainer}>
                            <p>Копилка</p>
                            {renderGoalCards(goalDataPlaceholder)}
                        </div>
                    </div>
                )}

            </div>

            <Navigation />
        </div>
    );
}

export default ParentHomePage;
