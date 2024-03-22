//TODO add resolvers for all the schemas
//use examples from MERN exercise 22
// pull in the models and functions from utils
const { User, Book } = require('../models');
const { signToken, authMiddleware } = require('../utils/auth');
// will need the following resolvers:
//Query
  //getSingleUser
//Mutation
  //createUser
  //login
  //saveBook
  //deleteBook
const resolvers = {
    Query: {
        getSingleUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
}

//mutations

