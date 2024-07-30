import { Client, fetchExchange } from '@urql/core';
import { getToken } from './auth.server';
import { cache } from 'react';

interface ClientArgs {
  url: string;
  auth: {
    uri: string;
    clientId: string;
    clientSecret: string;
  };
}

function getEnvironment(): string {
  return process.env.ENVIRONMENT || "production";
}

// Cache the token retrieval
const getTokenCached = cache(async ({ uri, clientId, clientSecret }: ClientArgs['auth']) => {
  return getToken({ uri, clientId, clientSecret });
});

// Cache the client creation
const getClientCached = cache(async ({ url, auth }: ClientArgs) => {
  const token = await getTokenCached(auth);

  return new Client({
    url,
    fetchOptions: {
      headers: {
        Authorization: token,
      },
    },
    exchanges: [
      fetchExchange,
    ],
  });
});

// Cache environment variables
const DRUPAL_CONFIG = {
  url: process.env.DRUPAL_GRAPHQL_URI!,
  auth: {
    uri: process.env.DRUPAL_AUTH_URI!,
    clientId: process.env.DRUPAL_CLIENT_ID!,
    clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
  },
};

export const getClientWithAuth = () => getClientCached(DRUPAL_CONFIG);