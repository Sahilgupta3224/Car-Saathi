import React from 'react'
import Hero from '../../components/Hero/Hero.jsx'
import Navbar from '../../components/Navbar/Navbar.jsx';
import Analytics from '../../components/Analytics/Analytics.jsx';
import Analytics2 from '../../components/Analytics/Analytics2.jsx';
import Footer from '../../components/Footer/Footer.jsx';
function Dashboard (){
  return (
    <>
    <Navbar/>
    <Hero/>
    <Analytics/>
    <Analytics2/>
    <Analytics/>
    <Footer/>
    <div>Dashboard</div>
    </>
  )
}
export default Dashboard