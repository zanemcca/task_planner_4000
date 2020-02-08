
import Asana from 'asana';

const ASANA_CLIENT_ID = `1160872085336118`
const ASANA_REDIRECT_URI = process.env.NODE_ENV === 'production' ? 'https://tp4000.zanemccaig.com' :
  process.env.NODE_ENV === 'test' ? 'https://tp4000preview.zanemccaig.com' : 'http://localhost:3000'

export const client = Asana.Client.create({
  clientId: ASANA_CLIENT_ID,
  redirectUri: ASANA_REDIRECT_URI + '/auth/callback/asana'
});

client.useOauth();
