import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from '../../store/app';

function UserLogin() {
    const history = useHistory();

    const [user, setUser] = useState({
        email: 'test@example.com',
        password: 'test',
    });

    const {authToken, setAuthToken} = useContext(AppContext);

    function onChange(e) {
        user[e.target.name] = e.target.value;
        setUser(user);
    }

    async function onSubmit(e) {
        e.preventDefault();

        // Attempt login
        const result = await axios.post('/auth/login', {
            email: user.email,
            password: user.password,
        });

        // Store token
        setAuthToken(result.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

        history.push('/book');
    }

    return (
        <AppContext.Provider value={{user, setUser}}>
            <div>
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    <label>
                        Email:
                        <input type="email" name="email" value={user.email} onChange={onChange}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={user.password} onChange={onChange}/>
                    </label>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        </AppContext.Provider>
    );
}

export default UserLogin;
