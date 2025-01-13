import React from 'react'
import { HandCoins } from 'lucide-react'

const Logo = () => {
  return (
    <div className='flex flex-row items-center'>
        <div className="text-purple-500">
          <HandCoins />
        </div>
        <h1 className="ml-1 text-2xl bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent font-semibold"> Moola </h1>
    </div>
  )
}

export default Logo