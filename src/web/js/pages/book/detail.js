import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export default function BookDetail() {
    const {bookId} = useParams();
    const [book, setBook] = useState();

    useEffect(async () => {
        const result = await axios.get(`/book/${bookId}`);
        setBook(result.data);
    }, []);

    if (typeof book === 'undefined') {
        return (<h2>Loading...</h2>);
    }

    return (
        <div>
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <img src={book.cover} width="128"  alt="Book Cover"/>
            <p>Price: <span>{book.price.currency} {book.price.amount / 100}</span></p>
            <button>Add to cart</button>
        </div>
    );
}
