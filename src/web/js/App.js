import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import Books from './pages/book'
import User from './pages/user';
import UserLogin from './pages/user/login';
import {AppProvider} from './store/app';

export default function App() {
    return (
        <AppProvider>
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/book">Home</Link>
                        </li>
                        <li>
                            <Link to="/user">Profile</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>

                    <Switch>
                        <Route path="/login">
                            <UserLogin/>
                        </Route>
                        <Route path="/user">
                            <User/>
                        </Route>
                        <Route path="/book">
                            <Books/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </AppProvider>
    );
}

