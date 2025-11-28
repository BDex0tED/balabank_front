import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
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
import booksIcon from '../../assets/book.png';
import cribIcon from '../../assets/Baby-Cot.png';
import trashIcon from '../../assets/bin.png';
import childProfileIcon from '../../assets/child-profile-icon.jpg';

const users = [
    { id: 1, name: 'Папа', avatarUrl: 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80', isSelected: false }, 
    { id: 2, name: 'Мама', avatarUrl: 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80', isSelected: true },
];

const goalData = [
    { 
        id: 1, 
        title: 'Лабудус', 
        image: labudusImage, 
        amount: 500.85, 
        target: 1200.00 
    },
    { 
        id: 2, 
        title: 'Велосипед', 
        image: bikeImage, 
        amount: 3400.14, 
        target: 4200.00 
    },
    { 
        id: 3, 
        title: 'Наушники', 
        image: headphonesImage, 
        amount: 2000.02, 
        target: 5800.00 
    },
];

const tasksData = [
    { id: 1, text: 'Выполнить домашнюю работу', completed: false, icon: booksIcon, userType: 'child', amount: 100},
    { id: 2, text: 'Застелить кровать', completed: false, icon: cribIcon, userType: 'child', amount: 50},
    { id: 3, text: 'Выбросить мусор', completed: true, icon: trashIcon, userType: 'child', amount: 50},
];

function ChildHomePage() {
    const { registerData } = useContext(AuthContext);
    const userName = registerData?.name || 'Имя';

    return (
        <div>
            <Header 
                userType={registerData?.role || 'child'}
                content={userName}
                img={childProfileIcon}
            />
            <div className={style.container}>
                <AvatarList 
                    users={users}
                    userType={registerData?.role || 'child'}
                />
                <BalanceCard 
                    userType='child'
                    amount='300.20'
                    balance='300.20'
                />
                <div className={style.TransactionsCard}>
                    <TransactionCard 
                        type='Пополнение'
                        amount='+100.20'
                    />
                    <TransactionCard 
                        type='Расходы'
                        amount='-158.40'
                    />
                </div>
                <ChatBotBanner />
                <p className={style.taskTitle}>Мои задания &gt;</p>
                <div className={style.taskContainer}> 
                    {tasksData.map(task => (
                        <TaskItem
                            key={task.id}
                            taskText={task.text}
                            isCompleted={task.completed}
                            iconUrl={task.icon}
                            userType={task.userType}
                            amount={task.amount}
                        />
                    ))}
                </div>
            </div>
            <div className={style.savingsContainer}>
                <p>Копилка</p>
                <div className={style.TargerCardsContainer}>
                    {goalData.map(goal => (
                        <TargerCard
                            title={goal.title}
                            image={goal.image}
                            amount={goal.amount}
                            target={goal.target}
                            key={goal.id}
                        />
                    ))}
                </div>
            </div>
            <div className={style.space100}></div>
            <Navigation />
        </div>
    )
}

export default ChildHomePage;