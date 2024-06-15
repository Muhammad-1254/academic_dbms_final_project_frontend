import { cn } from '@/lib/utils'
import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = ({className}:{className:string}) => {
  return (
    <div className={cn(className,"animate-spin absolute")}>
    <AiOutlineLoading3Quarters  />
  </div>
  )
}

export default Loading
