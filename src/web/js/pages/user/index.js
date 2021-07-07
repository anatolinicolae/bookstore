import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {AppContext} from '../../store/app';
import {useHistory} from 'react-router-dom';

function User() {
    const history = useHistory();
    const [user, setUser] = useState([]);
    const {authToken} = useContext(AppContext);

    useEffect(async () => {
        if (authToken === null) return history.push('/login');
        const result = await axios.get('/user/meta');
        setUser(result.data);
    }, []);

    return (
        <AppContext.Provider value={{user, setUser}}>
            <div>
                <h2>User</h2>
                <table>
                    <tbody>
                    {Object.keys(user).map(key => (
                        <tr key={key}>
                            <th>{key}</th>
                            <td>{user[key].toString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </AppContext.Provider>
    );
}

export default User;
