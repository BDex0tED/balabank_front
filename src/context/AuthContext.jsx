import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const STORAGE_KEY = 'userRegisterData';

const getInitialRegisterData = () => {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            return JSON.parse(storedData);
        }
    } catch (error) {
        console.error("Error reading localStorage:", error);
    }
    return {
        name: "",
        surname: "",
        paternity: "",
        phone_number: "",
        age: "",
        role: "",
    };
};

export function AuthProvider({ children }) {

    // ----------------------------  
    // 🔹 ДАННЫЕ РЕГИСТРАЦИИ
    // ----------------------------
    const [registerData, setRegisterDataState] = useState(getInitialRegisterData);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(registerData));
        } catch (error) {
            console.error("Error writing localStorage:", error);
        }
    }, [registerData]);

    const setRegisterData = (newData) => {
        setRegisterDataState(newData);
    };

    const updateRegisterData = (newData) => {
        setRegisterDataState(prevData => ({ ...prevData, ...newData }));
    };

    // ----------------------------  
    // 🔥 ОБНОВЛЕНИЕ СЕМЬИ
    // ----------------------------
    const [familyUpdateKey, setFamilyUpdateKey] = useState(0);

    const refreshFamily = () => {
        setFamilyUpdateKey(prev => prev + 1);
    };

    return (
        <AuthContext.Provider 
            value={{ 
                registerData,
                setRegisterData,
                updateRegisterData,

                // 🔥 что нужно для обновления детей
                familyUpdateKey,
                refreshFamily,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
