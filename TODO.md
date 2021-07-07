## Objective

Your assignment is to:
1. implement a bookstore REST API using Node and Express.
2. implement a simple frontend for the bookstore in React.

Please do not spend more than 4 to 6 hours on this project. We know this timeframe is rather short and **do not** expect that you will finish everything. Please prioritise task 1 (the backend) over task 2 (the frontend).

## Brief

Lohgarra, a Wookie from Kashyyyk, has a great idea. She wants to build a marketplace that allows her and her friends to
self-publish their adventures and sell them online to other Wookies. The profits would then be collected and donated to purchase
medical supplies for an impoverished Ewok settlement.

## Tasks

### Backend
-   Implement assignment using:
    -   Language: **Node**
    -   Framework: **Express**
-   Implement a REST API returning JSON or XML based on the `Content-Type` header
-   Implement a custom user model with a "author pseudonym" field
-   Implement a book model. Each book should have a title, description, author (your custom user model), cover image and price
    -   Choose the data type for each field that makes the most sense
-   Provide an endpoint to authenticate with the API using username, password and return a JWT
-   Implement REST endpoints for the `/books` resource
    -   No authentication required
    -   Allows only GET (List/Detail) operations
    -   Make the List resource searchable with query parameters
-   Provide REST resources for the authenticated user
    -   Implement the typical CRUD operations for this resource
    -   Implement an endpoint to unpublish a book (DELETE)
-   Implement API tests for all endpoints

### Frontend
-   Implement assignment using:
    -   Library: **React**
- This can be simple and incomplete.
- It is enough if this shows the list of books and allows for searches to show subsets of books based on the search parameters in the API.

## Evaluation Criteria

-   **Node** best practices
-   If you are using a framework make sure best practices are followed for models, configuration and tests
-   Write API tests for all implemented endpoints
-   Make sure that users may only unpublish their own books
-   Bonus: Make sure the user _Darth Vader_ is unable to publish his work on Wookie Books

## Fimento

Please organize, design, test and document your code as if it were
going into production - then push your changes to the main branch. After you have pushed your code, please inform us that you are ready and where we can pull it.

All the best and happy coding,

The Fimento Team