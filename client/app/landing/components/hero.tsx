import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import React from 'react'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center max-w-[1280px] mx-auto space-y-4">
    {/* Silver Gradient Heading */}
    <h1 className="text-4xl md:text-7xl font-semibold bg-gradient-to-r text-white tracking-tight">      
      The first ever personal finance tracker powered by AI.
    </h1>
  
    {/* Subheading */}
    <p className="pt-3 text-md mx-10 md:text-xl text-gray-100 max-w-3xl">
      Effortlessly track your spending, budget smarter, plan ahead, and let artificial intelligence guide you toward
      financial freedom.
    </p>
  
    {/* Call to Action Buttons */}
    <div className="pt-10 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
      <Button size={'lg'} className='text-lg h-12 bg-white text-purple-500 hover:scale-110 hover:bg-white transition duration-500'>Get Started</Button>
      <Button size={'lg'} variant={'outline'} className='bg-transparent text-white tracking-tight text-lg h-12 hover:scale-110 transition duration-500'>Learn More</Button>
    </div>
  </div>
  
  )
}

export default Hero