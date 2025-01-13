import Logo from '@/components/globals/logo'
import { Button } from '../../../components/ui/button'
import React from 'react'

const LandingNavBar = () => {
  return (
    <div className='border-b-[1px] border-slate-300 p-4'>
      <div className='max-w-[1280px] flex flex-row justify-between items-center mx-auto'>
      {/* logo */}
      <Logo/>

      {/* navigation buttons */}
      <div className='flex flex-row items-center'>
        <Button variant={'outline'} className='hover:scale-110 transition duration-500 border-fuchsia-500 text-fuchsia-600 hover:text-fuchsia-600'>Log In</Button>
        <Button className='ml-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:scale-110 transition duration-500'>Get Started</Button>
      </div>


      </div>
    </div>
  )
}

export default LandingNavBar