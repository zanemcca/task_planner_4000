
import React, { useEffect } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { useDidMount } from 'react-hooks-lib';
import { ASANA_REDIRECT_URI } from '../lib/asana';
import { Spin, message } from 'antd';
import { useAsanaToken } from '../hooks/auth';

import '../styles/Asana.css';

const AsanaCallback: React.FC<RouteComponentProps> = (props) => {
  const url = `${ASANA_REDIRECT_URI}asana/callback${props.location && props.location.search}`
  const [loading, setLoading ] = React.useState(true)
  const setToken = useAsanaToken(null)[1];
  const [error, setError] = React.useState<Error | undefined>()
  const onMount = async () => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      if (data) {
        setToken(data.token)
        navigate('/')
      }
      setLoading(false)
    } catch(e) {
      setError(e)
    }
  }

  useDidMount(() => {
    onMount()
  })

  useEffect(() => {
    if (error) {
      message.error(error.message)
    }
  }, [error])

  return (
    <div className="AsanaCallback">
      {loading && <Spin size='large'/>}
    </div>
  )
}

export default AsanaCallback
