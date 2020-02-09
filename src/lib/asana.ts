
import Asana from 'asana';

const ASANA_CLIENT_ID = `1160872085336118`

const splitHref = window.location.href.split('/')
export const ASANA_REDIRECT_URI = `${splitHref[0]}//${splitHref[2]}/`

export const createClient = (token?: string, refresh_token?: string) => {
  const client = Asana.Client.create({
    clientId: ASANA_CLIENT_ID,
    redirectUri: ASANA_REDIRECT_URI + 'auth/callback/asana'
  });

  if (refresh_token) {
    client.useOauth({
      credentials: {
        access_token: token,
        refresh_token
      }
    });
  } else if (token) {
    client.useOauth({
      credentials: token
    });
  //} else {
  //  client.useOauth()
  }

  return client
}
