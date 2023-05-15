import React from "react";
import { useGetCryptoNewsQuery } from "../../../services/cryptoNewsApi";
import { Avatar, Card, Col, Row, Select, Typography } from "antd";
import moment from "moment/moment";
import { useGetCryptosQuery } from '../../../services/cryptoApi'

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
const News = ({ simplified }) => {
  const [newsCategory, setnewsCategory] = React.useState('CryptoCurrency');
  const {data}=useGetCryptosQuery(100);

  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 24,
  });
  console.log(cryptoNews);
  if (isFetching) return "Loading.....";

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select 
          showSearch
          className="select-news"
          placeholder='Select A Crypto'
          optionFilterProp="children"
          onChange={(value)=>setnewsCategory(value)}
          filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase())}
          >
<Option value='CryptoCurrency'>CryptoCurrency</Option>
{data?.data?.coins?.map((coin)=>(
  <Option value={coin?.name}>{coin?.name}</Option>
))}
          </Select>
        </Col>
      )}
      {cryptoNews?.value?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news?.url} target="blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news?.name}
                </Title>
                <img
                style={{maxWidth:'200px',maxHeight:'100px'}}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="News"
                />
              </div>
              <p>
                {news?.description > 100
                  ? `${news?.description.substring(0, 20)}....`
                  : news?.description}
              </p>
              <div className="provider-container">
              <div>
                <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl||demoImage} alt="News Provider"></Avatar>
                <Text className="provider-name">{news?.provider[0]?.name}</Text>
              </div>
                <Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
