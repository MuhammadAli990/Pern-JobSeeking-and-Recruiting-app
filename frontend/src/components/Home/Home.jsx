import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Featured from './Featured'
import GetaJobSteps from './GetaJobSteps'
import HirePeopleSteps from './HirePeopleSteps'

function Home(props) {
  const {isLogin} = props;
  return (
    <>
        {<Navbar color={'white'}/>}
        <Hero/>
        <Featured/>
        <GetaJobSteps/>
        <HirePeopleSteps/>
    </>
  )
}

export default Home
