
import Asana from 'asana';

const ASANA_CLIENT_ID = `1160872085336118`

const splitHref = window.location.href.split('/')
export const ASANA_REDIRECT_URI = process.env.NODE_ENV === 'production' ? `${splitHref[0]}//${splitHref[2]}/` : 'http://localhost:3000/'

export const client = Asana.Client.create({
  clientId: ASANA_CLIENT_ID,
  redirectUri: ASANA_REDIRECT_URI + 'auth/callback/asana'
});

client.useOauth();
