import Image from 'next/image'
import React from 'react'
import Home from "../../../../public/home.svg"

const HomeIcon = () => {
  return (
        <Image width={24} height={24} src={Home} alt="home"></Image>
  )
}

export default HomeIcon