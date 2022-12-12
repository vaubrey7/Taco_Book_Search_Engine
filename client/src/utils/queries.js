import { gql } from '@apollo/client';
// pulls all user info
export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                descritpion
                title
                image
                link
            }
        }
    }
`;