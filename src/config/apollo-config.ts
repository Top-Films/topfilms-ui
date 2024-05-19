import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Environment } from '../common/environment';

export const client = new ApolloClient({
	uri: `${Environment.apiUrl()}/graphql`,
	cache: new InMemoryCache(),
	credentials: 'include'
});