import { gql } from '@apollo/client';
//  login user via email password
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
// not a current user? sign up, Add user 
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
// once you are a user and logged in you are able to save books
export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookInput) {
        saveBook(bookData: $bookData) {
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;
// didn't mean to add that book, you can remove books here
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;