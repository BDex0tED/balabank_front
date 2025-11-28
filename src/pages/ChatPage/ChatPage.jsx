import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import style from '../style.module.css';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import parentProfileIcon from '../../assets/parent-profile-icon.jpg';
import childProfileIcon from '../../assets/child-profile-icon.jpg';
import sendIcon from '../../assets/send-icon.png';

function ChatPage() {
    const { registerData } = useContext(AuthContext);
    const [chatMessages, setChatMessages] = useState([]); 
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const userName = registerData?.name || 'Имя';
    
    const userRole = registerData?.role || 'child';
    const isParent = userRole === "parent";

    const headerImg = isParent ? parentProfileIcon : childProfileIcon;

    const headerContent = isParent ? '5000.70' : userName; 

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const myMessage = { id: Date.now(), text: inputText, isMyMessage: true };
        setChatMessages(prev => [...prev, myMessage]);
        setInputText("");
        setIsLoading(true);

        try {
            const endpoint = isParent ? "/ask/parent" : "/ask/children";

            const res = await fetch(`http://localhost:8000${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: myMessage.text }) 
            });

            const data = await res.json();

            if (res.ok && data.llm_answer) {
                const answerMessage = { id: Date.now() + 1, text: data.llm_answer, isMyMessage: false };
                setChatMessages(prev => [...prev, answerMessage]);
            } else if (!res.ok) {
                console.error("Ошибка API:", data);
            }
        } catch (err) {
            console.error("Ошибка отправки:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header 
                userType={userRole}
                content={headerContent}
                img={headerImg}
            />

            <div className={style.chatContainer}>
                <div className={style.messagesList}>
                    {chatMessages.map(message => (
                        <div 
                            key={message.id} 
                            className={`${style.messageBubble} ${message.isMyMessage ? style.myMessage : style.otherMessage}`}
                        >
                            <p>{message.text}</p>
                        </div>
                    ))}

                    {isLoading && (
                        <div className={`${style.messageBubble} ${style.otherMessage}`}>
                            <p>...</p>
                        </div>
                    )}

                    <div style={{ flexGrow: 1 }}></div>
                </div>

                <div className={style.inputArea}>
                    <input 
                        type="text"
                        placeholder="Задайте вопрос Баяу..." 
                        className={style.chatInput}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => { if(e.key === "Enter") handleSend(); }}
                        disabled={isLoading}
                    />
                    <button 
                        className={style.sendButton} 
                        onClick={handleSend}
                        disabled={isLoading}
                    >
                        <img src={sendIcon} alt="Send" />
                    </button>
                </div>
            </div>

            <Navigation />
        </div>
    );
}

export default ChatPage;