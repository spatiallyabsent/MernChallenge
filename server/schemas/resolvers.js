//TODO add resolvers for all the schemas
//use examples from MERN exercise 22
// pull in the models and functions from utils
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
// will need the following resolvers:
//Query
//getSingleUser --done
//Mutation
//createUser --done
//login --done
//saveBook --done
//deleteBook
const resolvers = {
    Query: {
        getSingleUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
        },
    },

    //mutations
    Mutation: {
        //exercise 22 example
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }
            const validPassword = await user.isCorrectPassword(password);
            if (!validPassword) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { input }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw AuthenticationError;
        },

        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw AuthenticationError;
        }
    }
};

module.exports = resolvers;
