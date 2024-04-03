import { gql } from '@apollo/client';

export const GET_USER_METADATA = gql`
query GetLocations {
  locations {
	id
	name
	description
	photo
  }
}
`;