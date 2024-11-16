import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Box } from '@mui/material';
import Navbar from '../Components/Navbar/Navbar';
import TabSwitcher from '../Components/Dashboard/TabSwitcher/TabSwitcher';
import IPOCardList from '../Components/Dashboard/IPOCardList/IPOCardList';
import { fetchIpoList } from '../Redux/basketReducer/action';

export default function Dashboard() {
  const dispatch = useDispatch();
  const token = Cookies.get('login_token_ipo');
  let { baskets, loading } = useSelector((store) => store.basketReducer);

  console.log(baskets,"baskets")
useEffect(()=>{
  if(token){
    dispatch(fetchIpoList(token))
  }
},[dispatch,token])
  return (

    <Box>
      <Navbar/>
      <TabSwitcher/>
      <IPOCardList baskets={baskets} loading={loading} />
    </Box>
     
  )
}
