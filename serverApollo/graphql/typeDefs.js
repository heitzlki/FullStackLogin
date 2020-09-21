const {
	gql
} = require('apollo-server')

const typeDefs = gql `
	type User {
		id: ID
		name: String!
		token: String
	}
	type Query {
		getUsers: [User]!
		login(name: String!, password: String!): User!
	}
	type Mutation {
		register(
			name: String!
			password: String!
			confirmPassword: String!
		): User!
	}
`;

module.exports = typeDefs;