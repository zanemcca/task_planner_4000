
import React, { useEffect } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { ASANA_REDIRECT_URI } from '../lib/asana';
import { message } from 'antd';
import CenterSpin from './CenterSpin';
import { useMount } from 'react-use';
import { useAsanaCredentials } from '../hooks/asana';

const AsanaCallback: React.FC<RouteComponentProps> = (props) => {
  const url = `${ASANA_REDIRECT_URI}asana/callback${props.location && props.location.search}`
  const [loading, setLoading ] = React.useState(true)
  const setCredentials = useAsanaCredentials()[1];
  const [error, setError] = React.useState<Error | undefined>()
  const onMount = async () => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      if (data) {
        setCredentials(data)
        navigate('/')
      }
      setLoading(false)
    } catch(e) {
      setError(e)
    }
  }

  useMount(() => {
    onMount()
  })

  useEffect(() => {
    if (error) {
      message.error(error.message)
    }
  }, [error])

  return (
    <CenterSpin loading={loading} size='large' />
  )
}

export default AsanaCallback
