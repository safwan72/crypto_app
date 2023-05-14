import { Space, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
            Cryptoverse
            <br/>
            All Rights Reserved
        </Typography.Title>
        <Space>
            <Link to='/home'>Home</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
        </Space>
    </div>
  )
}

export default Footer