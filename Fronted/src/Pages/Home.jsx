import React from 'react'
import Hero from '../Component/UserLayout/Hero'
import NewArrival from '../Component/Product/NewArrival'
import GiftPurchass from '../Component/Product/GiftPurchass'
import FeatureProduct from '../Component/Product/FeatureProduct'
import BestSeller from '../Component/Product/BestSeller'

const Home=()=> {
  return (
    <div>
        <Hero/>
        <NewArrival/>
        <GiftPurchass/>
        <FeatureProduct/>
        <BestSeller/>
        </div>
  )
}

export default Home