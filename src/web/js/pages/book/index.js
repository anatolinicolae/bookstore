import React, {useEffect, useState} from 'react';
import {
    Switch,
    Route,
    useRouteMatch, Link,
} from 'react-router-dom';
import BookDetail from './detail'
import axios from 'axios';

function Books() {
    const match = useRouteMatch();
    const [books, setBooks] = useState([]);

    useEffect(async () => {
        const result = await axios('/book/index');
        setBooks(result.data.books);
    }, []);

    return (
        <div>
            <h2>Books</h2>
            <Switch>
                <Route path={`${match.path}/:bookId`}>
                    <BookDetail />
                </Route>
                <Route path={match.path}>
                    <h3>Available books</h3>
                    <ul>
                        {books.map(item => (
                            <li key={item.id}>
                                <Link to={`${match.path}/${item.id}`}>{item.title}</Link>
                            </li>
                        ))}
                    </ul>
                </Route>
            </Switch>
        </div>
    );
}

export default Books;
