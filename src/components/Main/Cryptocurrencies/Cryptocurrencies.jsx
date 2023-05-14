import { Card, Col, Input, Row } from 'antd'
import millify from 'millify'
import React from 'react'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../../../services/cryptoApi'




const Cryptocurrencies = () => {
const {data:cryptoslist,isfetching}=useGetCryptosQuery();
const [cryptos, setcryptos] = React.useState(cryptoslist?.data?.coins);
console.log(cryptos)

  return (
    <>
    <Row gutter={[32,32]} className='crypto-card-container'>
      {cryptos?.map((crypto)=>(
        <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto?.id}>
       <Link to='/crypto/'>
       
       </Link>
       
        </Col>
      ))}

    </Row>
    </>
  )
}

export default Cryptocurrencies