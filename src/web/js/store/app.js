import React, {useState} from 'react';

export const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    const [authToken, setAuthToken] = useState({
        token: null,
    });

    return (
        <AppContext.Provider value={{authToken, setAuthToken}}>
            {children}
        </AppContext.Provider>
    );
};
