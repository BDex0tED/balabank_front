import React, { useState } from 'react';
import styles from './CreateTaskPage.module.css';
import Header from '../../components/Header/Header';
import AvatarList from '../../components/AvatarList/AvatarList';
import Navigation from '../../components/Navigation/Navigation';
import parentProfileIcon from '../../assets/parent-profile-icon.jpg'; 

const CreateTaskPage = ({ onClose }) => {

    const initialDates = [
        { day: 'Пн', date: '24' },
        { day: 'Вт', date: '25' },
        { day: 'Ср', date: '26' },
        { day: 'Чт', date: '27' },
        { day: 'Пт', date: '28' },
        { day: 'Сб', date: '29' },
        { day: 'Вс', date: '30' },
    ];

    const users = [
        { id: 1, name: 'Аяна', avatarUrl: 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80', isSelected: false },
        { id: 2, name: 'Айсулуу', avatarUrl: 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80', isSelected: true }, 
        { id: 3, name: 'Эрмек', avatarUrl: 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80', isSelected: false },
    ];
    
    const [taskTitle, setTaskTitle] = useState('Вынести мусор');
    const [taskDescription, setTaskDescription] = useState('Не забыть разделить по пакетам');
    const [rewardAmount, setRewardAmount] = useState(200); 
    const [frequency, setFrequency] = useState('daily'); 
    const [selectedDate, setSelectedDate] = useState('27'); 
    const [dates, setDates] = useState(initialDates);
    const [showSuccess, setShowSuccess] = useState(false); 

    const handleSliderChange = (e) => {
        setRewardAmount(parseInt(e.target.value, 10));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Task Submission Data:', {
            taskTitle,
            taskDescription,
            rewardAmount,
            frequency,
            selectedDate,
        });
        
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000); 
    };

    const StyledInput = ({ label, value, onChange, placeholder = '', isTextArea = false }) => (
        <div className="mb-4">
            <label className={styles.inputLabel}>{label}</label>
            {isTextArea ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows="3"
                    className={styles.styledTextarea}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={styles.styledInput}
                />
            )}
        </div>
    );

    const RadioOption = ({ value, label }) => (
        <label className={styles.radioLabel}>
            <input
                type="radio"
                value={value}
                checked={frequency === value}
                onChange={() => setFrequency(value)}
                className={styles.radioInput}
            />
            <div className={styles.customRadio}
                 style={{ borderColor: frequency === value ? '#5D5FEF' : '#C4C4C4', backgroundColor: frequency === value ? '#5D5FEF' : 'white' }}>
                {frequency === value && (
                    <div className={styles.customRadioDot}></div>
                )}
            </div>
            {label}
        </label>
    );

    const SuccessMessage = ({ message, isVisible }) => {
        if (!isVisible) return null;

        return (
            <div className={styles.successMessage}>
                {message}
            </div>
        );
    };

    return (
        <div className={styles.pageWrapper}>
            <Header 
                img={parentProfileIcon}
                userType='parent'
                content='5000.70c'
            />
            <div className={styles.avatarSection}>
                <AvatarList users={users} userType='parent' />
            </div>
            <SuccessMessage 
                message={`Задание "${taskTitle}" успешно создано!`} 
                isVisible={showSuccess} 
            />
            <div className={styles.mainContainer}>
                <div className={styles.card}>
    
                    <h1 className={styles.title}>Создать задание</h1>

                    <div className={styles.calendarSection}>
                        <p className={styles.calendarMonth}>
                            Ноябрь 27, 2025
                        </p>
                        <div className={styles.calendarRow}>
                
                            <div className={styles.calendarArrow}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </div>

                            {dates.map((item) => (
                                <div
                                    key={item.date}
                                    className={`${styles.dayItem} ${selectedDate === item.date ? styles.dayItemActive : ''}`}
                                    onClick={() => setSelectedDate(item.date)}
                                >
                                    <span className={`${styles.dayName} ${selectedDate === item.date ? styles.dayNameActive : ''}`}>{item.day}</span>
                                    <span className={`${styles.dayDate} ${selectedDate === item.date ? styles.dayDateActive : ''}`}>{item.date}</span>
                                </div>
                            ))}

                            <div className={styles.calendarArrow}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <StyledInput
                            label="Название"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />

                        <StyledInput
                            label="Описание"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            isTextArea={true}
                        />

                        <div className="mb-6">
                            <label className={styles.inputLabel}>Награда</label>

                            <div className={styles.rewardDisplay}>
                                {rewardAmount}c
                            </div>

                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                        >
                            Создать
                        </button>
                    </form>
                </div>
            </div>
            <div className={styles.spacer}></div>
            <Navigation />
        </div>
    );
};

export default CreateTaskPage;