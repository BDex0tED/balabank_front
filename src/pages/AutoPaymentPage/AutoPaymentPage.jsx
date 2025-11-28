import React, { useState } from 'react';
import style from './AutoPaymentPage.module.css'; 
import Header from '../../components/Header/Header';
import AvatarList from '../../components/AvatarList/AvatarList';
import Navigation from '../../components/Navigation/Navigation';
import parentProfileIcon from '../../assets/parent-profile-icon.jpg'; 

const users = [
    { id: 1, name: 'Аяна', avatarUrl: 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80', isSelected: false },
    { id: 2, name: 'Айсулуу', avatarUrl: 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80', isSelected: true }, 
    { id: 3, name: 'Эрмек', avatarUrl: 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740&q=80', isSelected: false },
];

const initialDays = [
    { id: 1, day: 'Пн', date: 24 },
    { id: 2, day: 'Вт', date: 25 },
    { id: 3, day: 'Ср', date: 26 },
    { id: 4, day: 'Чт', date: 27 },
    { id: 5, day: 'Пт', date: 28 },
    { id: 6, day: 'Сб', date: 29 },
    { id: 7, day: 'Вс', date: 30 },
];

function AutoPaymentPage() {
    const [amount, setAmount] = useState(200);
    const [frequency, setFrequency] = useState('daily');
    const [selectedDateId, setSelectedDateId] = useState(4); 

    const min = 100;
    const max = 1000; 
    const progress = ((amount - min) / (max - min)) * 100;
    
    const getAmountDisplay = (value) => {

        return `${value}c`;
    };

    return (
        <div className={style.pageWrapper}>
            <Header 
                img={parentProfileIcon}
                userType='parent'
                content='5000.70c'
            />
            
            <div className={style.mainContainer}>
                <div className={style.avatarSection}>
                   <AvatarList users={users} userType='parent' />
                </div>

                <div className={style.card}>
                    <h1 className={style.title}>Автоматические выплаты</h1>
                    <p className={style.subtitle}>
                        Установите сумму и частоту, чтобы деньги автоматически приходили ребенку.
                    </p>
                    <div className={style.amountSection}>
                        <label className={style.label}>Сумма</label>
                        
                        <div className={style.amountDisplay}>
                            {getAmountDisplay(amount)}
                        </div>
                        
                        <div className={style.sliderWrapper}>
                            <input 
                                type="range" 
                                min={min}
                                max={max}
                                step="10"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className={style.slider}
                                style={{ '--progress': `${progress}%` }} 
                            />

                            <div className={style.sliderLabels}>
                                <span>100</span>
                                <span>500</span>
                                <span>1000</span>
                            </div>
                        </div>
                    </div>

                    <div className={style.frequencySection}>
                        <label className={style.label}>Частота</label>
                        <div className={style.radioGrid}>
                            
                            <label className={style.radioLabel}>
                                <input 
                                    type="radio" 
                                    name="frequency" 
                                    checked={frequency === 'daily'} 
                                    onChange={() => setFrequency('daily')}
                                    className={style.hiddenRadio}
                                />
                                <span className={style.customRadio} aria-hidden="true"></span>
                                Ежедневно
                            </label>
                            
                            <label className={style.radioLabel}>
                                <input 
                                    type="radio" 
                                    name="frequency" 
                                    checked={frequency === 'weekly'} 
                                    onChange={() => setFrequency('weekly')}
                                    className={style.hiddenRadio}
                                />
                                <span className={style.customRadio} aria-hidden="true"></span>
                                Еженедельно
                            </label>

                            <label className={style.radioLabel}>
                                <input 
                                    type="radio" 
                                    name="frequency" 
                                    checked={frequency === 'biweekly'} 
                                    onChange={() => setFrequency('biweekly')}
                                    className={style.hiddenRadio}
                                />
                                <span className={style.customRadio} aria-hidden="true"></span>
                                Раз в 2 недели
                            </label>

                            <label className={style.radioLabel}>
                                <input 
                                    type="radio" 
                                    name="frequency" 
                                    checked={frequency === 'monthly'} 
                                    onChange={() => setFrequency('monthly')}
                                    className={style.hiddenRadio}
                                />
                                <span className={style.customRadio} aria-hidden="true"></span>
                                Ежемесячно
                            </label>
                        </div>
                    </div>
                    
                    <div className={style.calendarSection}>
                        <div className={style.calendarHeader}>
                            <label className={style.label}>Следующий перевод:</label>
                        </div>
                        <div className={style.daysRow}>
                            {initialDays.map((item) => (
                                <div 
                                    key={item.id} 
                                    onClick={() => setSelectedDateId(item.id)}
                                    className={`${style.dayItem} ${selectedDateId === item.id ? style.dayActive : ''}`}
                                >
                                    <span className={style.dayName}>{item.day}</span>
                                    <span className={style.dayDate}>{item.date}</span>
                                </div>
                            ))}
                            <div className={style.arrowIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18L15 12L9 6" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <button className={style.submitButton}>Создать</button>
                </div>
            </div>
            <div className={style.spacer}></div>
            <Navigation />
        </div>
    );
}

export default AutoPaymentPage;