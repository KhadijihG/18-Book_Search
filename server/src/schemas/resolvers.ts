import AddUserArgs from '../interfaces/AddUserArgs';
import BookInput from '../interfaces/BookInput';
import LoginUserArgs from '../interfaces/LoginUserArgs';
import IUser from '../interfaces/User';
import {User} from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth.js';

const resolvers = {
  Query: {
    getUser: async (_parent: any, _args: any,context: IUser) => {
      return await User.findOne({_id:context.user._id});
    },
    
  },
  Mutation: {
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
      
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },

    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    saveBook: async (_parent: any, { book }: {book: BookInput}, context: any) => {
      if (context.user) {
      

       const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          {new: true}
        );

        return user;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    removeBook: async (_parent: any, { bookId }: {bookId: string}, context: any) => {
      if (context.user) {
      

       const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: {bookId} } },
          {new: true}
        );

        return user;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
  },
};

export default resolvers;
