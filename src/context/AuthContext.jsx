import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('growup-user');
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('growup-user', JSON.stringify(user));
        } else {
            localStorage.removeItem('growup-user');
        }
    }, [user]);

    const login = (loggedUser) => setUser(loggedUser);
    const logout = () => setUser(null);

    const value = useMemo(() => ({ user, login, logout }), [user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        return { user: null, login: () => { }, logout: () => { } };
    }
    return context;
}
