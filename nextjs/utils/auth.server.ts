import { drupalAuthClient } from "drupal-auth-client";

interface TokenArgs {
  uri: string
  clientId: string
  clientSecret: string
}

let tokenCache = {
  token: null as string | null,
  expiresAt: null as string | null,
};

export const getToken = async ({uri, clientId, clientSecret}: TokenArgs) => {
  let token;
  if (tokenCache.token && tokenCache.expiresAt && Date.now() < parseInt(tokenCache.expiresAt)) {
    return tokenCache.token;
  } else {
  const client = await drupalAuthClient(
    uri,
    "client_credentials",
    {
      clientId,
      clientSecret,
    }
  );
    token = `${client.token_type} ${client.access_token}`
    tokenCache.token = token;
    tokenCache.expiresAt = (Date.now() + parseInt( client.expires_in) * 1000).toString();
    return token;
  }
};
