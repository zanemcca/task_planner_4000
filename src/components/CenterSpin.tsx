
import React from 'react';
import { Spin } from 'antd';

import '../styles/CenterSpin.css';

export interface ICenterSpinProps {
  loading: boolean
  size?: 'small' | 'default' | 'large'
}

const CenterSpin = ({ loading, size }: ICenterSpinProps) => (
  <div className="CenterSpin">
    {loading && <Spin size={ size }/>}
  </div>
)

export default CenterSpin
