import user from "./user_schema/user.js";
import { DeleteUserMutation, RestoreUserMutation } from "./mutation/index.js";

const typeDefs = `#graphql
  ${user}
  ${DeleteUserMutation}
  ${RestoreUserMutation}

  type Query {
    users: [User]
    deletedUsers: [User]
  }
`;

export default typeDefs;
