import { Client, fetchExchange } from '@urql/core';
import { getToken } from './auth.server';

interface ClientArgs {
  url: string
  auth: {
    uri: string
    clientId: string
    clientSecret: string
  }
}

export const getClient = async ({url, auth}: ClientArgs) => {
  const { uri, clientId, clientSecret } = auth;
  const token = await getToken({ uri, clientId, clientSecret });

  return new Client({
    url,
    fetchOptions: {
      headers: {
        Authorization: token,
      },
    },
    exchanges: [fetchExchange],
  });
}

export const getClientWithAuth = async () => {
  return getClient({
    url: process.env.DRUPAL_GRAPHQL_URI!,
    auth: {
      uri: process.env.DRUPAL_AUTH_URI!,
      clientId: process.env.DRUPAL_CLIENT_ID!,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
    },
  });
}
