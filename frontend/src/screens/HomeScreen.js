import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import AppDrawer from '../components/AppDrawer';
import AppBar from '../components/AppBar'
import { Outlet } from "react-router-dom";
import { useNavigate  } from 'react-router-dom';

function AppBarAndDrawer () {
    const [open, setOpen] = React.useState(false);
    return (
      <>
      <AppBar open={open} setOpen={setOpen}/>
      <AppDrawer open={open} setOpen={setOpen}/>
      </>
    );
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function HomeScreen() {
  const navigate = useNavigate();
  React.useEffect(()=>{
    let role = localStorage.getItem("role")
    if (role === "doctor") {
      navigate('/home/doctorprescription');
    }
    else if (role === 'pharmaceuticalwarehouseworker') {
      navigate('/home/warehouseorders');
    }
    else if (role === "pharmacist") {
      navigate('/home/warehouseorders');
    }
    else if (role === "admin") {
      navigate('/home/admin');
    }
  }, [])
  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarAndDrawer/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Outlet />
        </Box>
    </Box>
  );
}