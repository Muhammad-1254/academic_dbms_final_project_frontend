import Loading from '@/components/elements/Loading'
import React from 'react'

const loading = () => {
  return (
    <div className='w-screen h-screen  flex items-center justify-center'>
      <Loading className='text-6xl md:text-7xl lg:text-9xl'/>
    </div>
  )
}

export default loading
