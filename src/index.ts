import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { user, deletedUsers } from "./fake_data/index.js";

import typeDefs from "./schema/index.js";

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    users: () => user,
    deletedUsers: () => deletedUsers,
  },
  Mutation: {
    deleteUser: (parent, arg, context, info) => {
      const index = user.findIndex(
        (user) => String(user.id) === String(arg.id)
      );

      if (index === -1) {
        throw new Error(`User with id ${arg.id} not found`);
      }

      const [deletedUser] = user.splice(index, 1);
      deletedUsers.push(deletedUser); // Add this line

      return deletedUser;
    },
    restoreUser: (parent, arg, context, info) => {
      // Add this mutation
      const index = deletedUsers.findIndex(
        (user) => String(user.id) === String(arg.id)
      );

      if (index === -1) {
        throw new Error(`Deleted user with id ${arg.id} not found`);
      }

      const [restoredUser] = deletedUsers.splice(index, 1);
      user.push(restoredUser);

      return restoredUser;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
