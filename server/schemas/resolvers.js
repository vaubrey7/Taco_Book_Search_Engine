// setting up our paths and functions
const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User
                    .findOne({ _id: context.user._id })
                    .select('-__v - password');

                return userData;
            };
            throw new AuthenticationError('WARNING WILL ROBINSON YOU MUST log in!');
        },
    },
// logs in a current user
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('WARNING WILL ROBINSON INTRUDER ALERT');
            }
// checks PW
            const correctPW = await user.isCorrectPassword(password);
            if (!correctPW) {
                throw new AuthenticationError('WARNING WILL ROBINSON Password ALERT!');
            }

            const token = signToken(user);
            return { token, user };
        },
        // Adds a user 
        addUser: async (_parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        // allows a user to save a book
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User
                    .findOneAndUpdate(
                        { _id: context.user._Id },
                        { $addToSet: { savedBooks: bookData } },
                        { new: true },
                    )
                return updatedUser;
            };
            // you are not allowed to search for a book without signing in
            throw new AuthenticationError('WILL ROBINSON YOU MUST LOGIN YO OBTAIN A BOOK!');
        },
        // allows a user to remove a book from savedBooks
        removeBook: async (_parent, { bookId }, context) => {
            if (context.user) {
                const userUpdate = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
                return userUpdate;
            };
            // again you cannot remove a book from a list without logging in
            throw new AuthenticationError('ERROR WILL ROBINSON LOGIN REQUIRED');
        },
    },
};

module.exports = resolvers;