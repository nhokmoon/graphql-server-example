const RestoreUserMutation = `#graphql
    type Mutation {
        restoreUser(id: ID!): User
    }
`;

export default RestoreUserMutation;
