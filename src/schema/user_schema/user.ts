const user = `#graphql
  type User {
    id: ID
    username: String
    password: String
  }

  type Query {
    users: [User]
  }
`;

export default user;
