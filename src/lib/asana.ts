
import Asana from 'asana';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { useAsanaCredentials } from '../hooks/asana';

const ASANA_CLIENT_ID = `1160872085336118`

const splitHref = window.location.href.split('/')
export const ASANA_REDIRECT_URI = `${splitHref[0]}//${splitHref[2]}/`

const refreshToken = async (refreshToken: string) => {
  const url = `${ASANA_REDIRECT_URI}asana/refresh?refresh_token=${refreshToken}`
  const res = await fetch(url)
  if (res.status >= 300) {
    throw new Error('Received an error code ' + res.status)
  }
  return res.json()
}

export const useClient = () => {
  const client = Asana.Client.create({
    clientId: ASANA_CLIENT_ID,
    redirectUri: ASANA_REDIRECT_URI + 'auth/callback/asana'
  });

  const [credentials, setCredentials] = useAsanaCredentials()

  const token = credentials.access_token
  const refresh_token = credentials.refresh_token
  const isExpired = token && moment((jwtDecode(token) as any).exp * 1000).isSameOrBefore(moment())

  if (token && isExpired) {
    if (refresh_token) {
      refreshToken(refresh_token).then(setCredentials)
    } else {
      setCredentials({})
    }
  }

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
  }

  return client
}
