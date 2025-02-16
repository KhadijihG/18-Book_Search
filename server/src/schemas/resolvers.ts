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
    // createMatchup: async (_parent: any, args: any): Promise<IMatchup | null> => {
    //   const matchup = await Matchup.create(args);
    //   return matchup;
    // },
    // createVote: async (_parent: any, { _id, techNum }: { _id: string, techNum: number}): Promise<IMatchup | null> => {
    //   const vote = await Matchup.findOneAndUpdate(
    //     { _id },
    //     { $inc: { [`tech${techNum}_votes`]: 1 } },
    //     { new: true }
    //   );
    //   return vote;
    // },
  },
};

export default resolvers;
