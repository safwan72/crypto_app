import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders={
    'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
}

// const baseUrl='https://coinranking1.p.rapidapi.com';

const createRequests=(url)=>({url,headers:cryptoApiHeaders})


export const cryptoApi=createApi({
    reducerPath:'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl: process.env.REACT_APP_CRYPTO_API_URL}),
    endpoints:(builder)=>({
        getCryptos:builder.query({
            query:(count)=>createRequests(`/coins?limit=${count}`)
        }),
        getCryptoDetails:builder.query({
            query:(coinId)=>createRequests(`/coin/${coinId}`)
        }),
        getCryptoHistory:builder.query({
            query:({coinId,timeperiod})=>createRequests(`/coin/${coinId}/history?timePeriod=${timeperiod}`)
        })
    })
});

export const{
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
}=cryptoApi;

// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coins',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       timePeriod: '24h',
//       'tiers[0]': '1',
//       orderBy: 'marketCap',
//       orderDirection: 'desc',
//       limit: '50',
//       offset: '0'
//     },
//     headers: {
//       'X-RapidAPI-Key': '3ed9aa7f11msh2851e454347edc7p1db72fjsn2a7dda49b63c',
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//     }
//   };