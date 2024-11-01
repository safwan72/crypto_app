import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Col, Row, Select, Typography } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCryptoDetailsQuery ,useGetCryptoHistoryQuery} from "../../../services/cryptoApi";
import LineChart from "../../utils/LineChart";
import Loader from "../../utils/Loader";

const { Text, Title } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, settimeperiod] = useState("7d");
  const { data,isFetching } = useGetCryptoDetailsQuery(coinId);
  const {data:coinHistory} = useGetCryptoHistoryQuery({coinId,timeperiod});
  const cryptoDetails = data?.data?.coin;
  console.log(coinHistory);
  if(isFetching) return <Loader/>


  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.fullyDilutedMarketCap &&
        millify(cryptoDetails?.fullyDilutedMarketCap)
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </Title>
        <p>
          {cryptoDetails?.name} live price in US Dollars view value statistics,
          market cap and supply
        </p>
      </Col>

      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => settimeperiod(value)}
      >
        {time?.map((date, i) => (
          <Option key={i} value={date}>
            {date}
          </Option>
        ))}
      </Select>

<LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name}/>


      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} value statistics
            </Title>
            <p> An Overview showing the stats of {cryptoDetails?.name}</p>
          </Col>

          {stats?.map(({ icon, title, value, i }) => (
            <Col className="coin-stats" key={i}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other statistics
            </Title>
            <p> An Overview showing the stats of {cryptoDetails?.name}</p>
          </Col>

          {genericStats?.map(({ icon, title, value, i }) => (
            <Col className="coin-stats" key={i}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
<Title level={3} className="coin-details-heading">

  What is {cryptoDetails?.name}?
  <br/>
  {HTMLReactParser(cryptoDetails?.description?cryptoDetails?.description:'')}
</Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails?.name} Links
          </Title>
          {cryptoDetails?.links?.map((link,i) => (
            <Row className="coin-link" key={i}>
              <Title level={5} className="link-name">
                {link?.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link?.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
