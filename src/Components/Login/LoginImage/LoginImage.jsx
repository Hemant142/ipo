import { Card, CardMedia } from '@mui/material'
import React from 'react'
import Login from "../../../Assets/Images/login.png"

export default function LoginImage() {
  return (
    <Card sx={{ margin:"auto", boxShadow: "0px 5 px 12.1px 0 px #759DE594"}} >

        <CardMedia 
        component={"img"} 
        // height={"250"}
        alt='Login Image'
        image={Login}
        sx={{objectFit:"contain", borderRadius :"16px"}}
        />
    </Card>
  )
}
