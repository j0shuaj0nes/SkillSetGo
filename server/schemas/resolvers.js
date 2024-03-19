const { User, Group } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('groups');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('groups');
    },
    groups: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Group.find(params).sort({ createdAt: -1 });
    },
    group: async (parent, { groupId }) => {
      return Group.findOne({ _id: groupId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addGroup: async (parent, { name }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              groups: {group: context.group.name},
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return user;
      }
      throw AuthenticationError;
    },
    removeGroup: async (parent, { groupId }, context) => {
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { groups: groupId } }
        );
        return user;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;