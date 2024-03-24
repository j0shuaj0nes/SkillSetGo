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
    updateUser: async (_, { _id, username, email, country, skillsOffering, skillsInterestedIn }, context) => {
      if (context.user) {
        const updateFields = {};
        if (username) updateFields.username = username;
        if (email) updateFields.email = email;
        if (familyName) updateFields.country = country;
        if (familyName) updateFields.skillsOffering = skillsOffering;
        if (familyName) updateFields.skillsInterestedIn = skillsInterestedIn;
    
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          updateFields,
          { new: true, runValidators: true }
        );
    
        if (!updatedUser) {
          throw new Error('User not found!');
        }
    
        return updatedUser;
      }
    
      throw new AuthenticationError('Unauthorized');
    },
    deleteUser: async (parent, { userId }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (deletedUser) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        return false;
      }
    // deleteUser: async (_, { _id }, context) => {
    //   if (context.user) {
    //     const deletedUser = await User.findByIdAndDelete(_id);
    //     if (!deletedUser) {
    //       throw new Error('User not found!');
    //     }
    //     return true; // Return true if deletion is successful
    //   }
    //   throw new AuthenticationError('Unauthorized');
    // },
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
    addFollower: async (_, { _id }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id },
          {
            $addToSet: {
              followers: context._id,
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
    deleteFollower: async (_, { _id }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id }, // Assuming context.user contains the authenticated user's data
          {
            $pull: {
              followers: _id, // Remove the specified follower ID from the followers array
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
    
        return user;
      }
    
      throw new AuthenticationError('Unauthorized');
    },
  },
};

module.exports = resolvers;