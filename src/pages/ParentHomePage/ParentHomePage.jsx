import React from 'react';
import style from '../style.module.css'
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
import parentProfileIcon from '../../assets/parent-profile-icon.jpg';

const users = [
    { id: 1, name: 'Аяна', avatarUrl: 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80', isSelected: false },
    { id: 2, name: 'Айсулуу', avatarUrl: 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80', isSelected: true }, 
    { id: 3, name: 'Эрмек', avatarUrl: 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80', isSelected: false },
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
    { id: 1, text: 'Выполнить домашнюю работу', completed: false, icon: booksIcon, userType: 'parent', amount: 100},
    { id: 2, text: 'Застелить кровать', completed: false, icon: cribIcon, userType: 'parent', amount: 50},
    { id: 3, text: 'Выбросить мусор', completed: true, icon: trashIcon, userType: 'parent', amount: 50},
];

function ParentHomePage() {

    return (
        <div>
            <Header 
                img={parentProfileIcon}
                userType='parent'
                content='5000.70'
            />
            <div className={style.container}>
                <AvatarList 
                    users={users}
                    userType='parent'
                />
                <BalanceCard 
                    userType='parent'
                    amount='100.0'
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
                <a href='/createtask' className={style.linkTitle}>Задания &gt;</a>
                <div className={style.space5}></div>
                <div className={style.taskContainer}> 
                    {tasksData.map(task => (
                        <TaskItem
                            key={task.id}
                            taskText={task.text}
                            isCompleted={task.completed}
                            iconUrl={task.icon}
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

export default ParentHomePage