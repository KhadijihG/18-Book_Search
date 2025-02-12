import User from '../models/User';


const resolvers = {
  Query: {
    getUser: async (): Promise<ITech[] | null> => {
      return User.find({});
    },
    
  },
  Mutation: {
    createMatchup: async (_parent: any, args: any): Promise<IMatchup | null> => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (_parent: any, { _id, techNum }: { _id: string, techNum: number}): Promise<IMatchup | null> => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

export default resolvers;
