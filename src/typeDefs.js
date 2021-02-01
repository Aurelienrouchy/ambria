const { gql } = require('apollo-server');

const typeDefs = gql`

	type Lead {
		id: String
		fname: String
		lname: String
		email: String
		phoneNumber: [ String ]
		companyLocation: String
		companyId: String
		companySize: String
		companyIndustry: String
		companyName: String
		title: String
		startedOn: String
	}

	input LeadInput {
		fname: String
		lname: String
		email: String
		phoneNumber: [ String ]
		companyLocation: String
		companyId: String
		companySize: String
		companyIndustry: String
		companyName: String
		title: String
        startedOn: String
	}

	type LeadsResults {
		count: Int!
		pageSize: Int!
		currentPage: Int!
		results: [ Lead ]
	}

	type Filter {
		fname: String
		lname: String
		companyLocation: String
		companyId: String
		companySize: String
		companyIndustry: String
		companyName: String
		title: String
	}

	# Favorite

	type Favorite {
		id: String
		status: Int
		price: Int
		name: String
		count: Int
		leads: [ Lead ]
		fname: String
		lname: String
		companyLocation: String
		companyId: String
		companySize: String
		companyIndustry: String
		companyName: String
		title: String
	}

	input FavoriteInput {
		id: String
		name: String!
		fname: String
		lname: String
		companyLocation: String
		companyId: String
		companySize: String
		companyIndustry: String
		companyName: String
		title: String
	}

	# USER

	type User {
		id: String
		providerId: String!
		lname: String!
		fname: String
		email: String
		favorites: [ String ]
	}

	input UserInput {
		lname: String!
		fname: String!
		email: String!
		token: String!
		provider: String!
	}

	input SearchLeadInput {
		fname: String
		lname: String
		companyLocation: String
		companyId: String
		companySize: String
		companyIndustry: String
		companyName: String
		title: String
	}

	type Query {
		signIn(token: String!): User
		getUserById(id: String!): User
		getFavorites(input: [ String! ]!): [ Favorite ]
		search(input: SearchLeadInput!): LeadsResults!
		getTotalLeadCount: Int!
		getCountOfSearch(input: SearchLeadInput!): Int!
	}
	
	type Mutation {
		signUp(input: UserInput!): User!
		setFavorite(input: FavoriteInput!): Favorite!
		setLead(input: LeadInput!): Lead!
		updateFavorite(input: FavoriteInput!): Favorite!
		buyFavorite(id: String): Favorite!
	}
`;

module.exports = typeDefs;
