
import Asana from 'asana';

const ASANA_CLIENT_ID = `1160872085336118`

const ASANA_REDIRECT_URI = process.env.NODE_ENV === 'production' ? window.location.href : 'http://localhost:3000'

export const client = Asana.Client.create({
  clientId: ASANA_CLIENT_ID,
  redirectUri: ASANA_REDIRECT_URI + '/auth/callback/asana'
});

client.useOauth();
