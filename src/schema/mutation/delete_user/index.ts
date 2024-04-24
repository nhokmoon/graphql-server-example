const DeleteUserMutation = `#graphql
    type Mutation {
        deleteUser(id: ID!): User
    }
`;

export default DeleteUserMutation;
