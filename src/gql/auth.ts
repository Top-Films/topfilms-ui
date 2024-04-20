import { gql } from '@apollo/client';

export const GET_USER_METADATA = gql`
	query UserById($id: ID!) {
		userById(id: $id) {
			username,
			firstName,
			lastName
		}
	}
`;

export const CREATE_USER = gql`
	mutation CreateUser($input: UserInput!) {
		createUser(input: $input) {
			id
		}
	}
`;

export const DELETE_USER = gql`
	mutation DeleteUser($id: ID!) {
		deleteUser(id: $id)
	}
`;