import React, {createContext, useContext, useEffect, useState} from "react";

const AuthenticationContext = createContext()

export const AuthenticationProvider = ({children}) => {
    const [userData, setUserData] = useState({
        user: null,
        tokens: null
    })
    const [tokens, setTokens] = useState(userData.tokens)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // TODO: CHECK REFRESH TOKEN IF TOKEN IS STILL VALID
    useEffect(() => {
        if(userData.tokens) {
            setTokens(userData.tokens)
        }
    }, [userData])

    useEffect(() => {
        if (!tokens) {
            setIsLoggedIn(false)
        } else {
            localStorage.setItem('tokens', JSON.stringify(userData.tokens))
            setIsLoggedIn(true)
        }
    }, [tokens])


    return (
        <AuthenticationContext.Provider value={{isLoggedIn, setUserData, userData}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export const useAuthenticationValue = () => useContext(AuthenticationContext)