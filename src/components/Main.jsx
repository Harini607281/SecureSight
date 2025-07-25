import React from 'react'
import Navbar from './Navbar'
import Actualpanel from './Actualpanel'
import { Divider } from '@mui/material'
import Timeline from './Timeline'
const Main = () => {
  return (
    <div style={{backgroundColor:"balck"}}>
      <Navbar />
       <Divider sx={{ bgcolor: '#333' }} />
      <Actualpanel />
      <Timeline />
     
    </div>
  )
}

export default Main
