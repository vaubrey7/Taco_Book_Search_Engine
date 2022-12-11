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

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('WARNING WILL ROBINSON INTRUDER ALERT');
            }

            const correctPW = await user.isCorrectPassword(password);
            if (!correctPW) {
                throw new AuthenticationError('WARNING WILL ROBINSON fetch ALERT!');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (_parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
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
            throw new AuthenticationError('WILL ROBINSON YOU MUST LOGIN YO OBTAIN A BOOK!');
        },
        removeBook: async (_parent, { bookId }, context) => {
            if (context.user) {
                const userUpdate = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
                return userUpdate;
            };
            throw new AuthenticationError('ERROR WILL ROBINSON LOGIN REQUIRED');
        },
    },
};

module.exports = resolvers;