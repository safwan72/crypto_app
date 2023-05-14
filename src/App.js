import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, Space, Typography } from "antd";
import {
  Navbar,
  News,
  Homepage,
  Cryptocurrencies,
  Exchanges,
  CryptoDetails,
  Footer
} from "./components/index";
import "./App.css";
const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />}/>
              <Route  path="/cryptocurrencies" element={<Cryptocurrencies />}/>
              <Route  path="/crypto/:coinId" element={<CryptoDetails />}/>
              <Route  path="/exchanges" element={<Exchanges />}/>
              <Route  path="/news" element={<News />}/>
            </Routes>
          </div>
        </Layout>
        <div>
        <Footer/>
        </div>
      </div>
    </div>
  );
};

export default App;
