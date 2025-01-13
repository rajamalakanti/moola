import LandingNavBar from '@/app/landing/components/landingNavBar'
import React from 'react'
import Hero from './components/hero'

const LandingPage = () => {
  return (
    <>
      <LandingNavBar/>
      <div className='h-[calc(100vh-69px)] flex justify-center items-center bg-gradient-to-r from-purple-500 to-fuchsia-500'>
        <Hero/>
      </div>
    </>
  )
}

export default LandingPage