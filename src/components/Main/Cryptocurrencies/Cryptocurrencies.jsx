import { Card, Col, Input, Row } from 'antd'
import millify from 'millify'
import React from 'react'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../../../services/cryptoApi'




const Cryptocurrencies = ({simplified}) => {
const count=simplified?10:100;
const {data:cryptoslist,isfetching}=useGetCryptosQuery(count);
const [cryptos, setcryptos] = React.useState([]);
const [searchterms, setsearchterms] = React.useState('');
React.useEffect(()=>{
setcryptos(cryptoslist?.data?.coins);

const filteredData=cryptoslist?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchterms.toLowerCase()));
setcryptos(filteredData);


},[cryptoslist,searchterms])
console.log(cryptoslist)
  return (
    <>
    {!simplified &&(
          <div className='search-crypto'>
          <Input placeholder='Search CryptoCurrency' onChange={(e)=>setsearchterms(e.target.value)}/>
              </div>
          
    )}
    <Row gutter={[32,32]} className='crypto-card-container'>
      {cryptos?.map((crypto)=>(
        <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto?.uuid}>
       <Link to={`/crypto/${crypto?.uuid}`}>
       <Card title={`${crypto?.rank} . ${crypto?.name}`}
       extra={<img className='crypto-image' src={crypto?.iconUrl} alt={crypto?.name}/>}
       hoverable
       >
<p>Price: {millify(crypto?.price)}</p>
<p>Market Cap: {millify(crypto?.marketCap)}</p>
<p>Daily Change: {millify(crypto?.change)}</p>
       </Card>
       </Link>
       
        </Col>
      ))}

    </Row>
    </>
  )
}

export default Cryptocurrencies