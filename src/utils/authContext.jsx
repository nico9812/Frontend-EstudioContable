import {createContext, useCallback, useContext, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";

const MY_AUTH = 'MY_AUTH1';

export const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(window.localStorage.getItem(MY_AUTH) ?? false);

    const login = useCallback(function () {
        window.localStorage.setItem(MY_AUTH,true);
        setIsAuthenticated(true)
    },[]);

    const logout = useCallback(function () {
        window.localStorage.removeItem(MY_AUTH);
        setIsAuthenticated(false);
    }, [])

    const value = useMemo(() => ({
        login,
        logout,
        isAuthenticated
    }),
    [login,logout,isAuthenticated]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
    children: PropTypes.object // Usa PropTypes en lugar de ProTypes
};

export function useAuthContext() {
    return useContext(AuthContext);
}