import * as React from 'react';
import { useEffect, useState } from "react";
import { fetchUserInfo } from '../api/UserAPI';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { logout } from '../api/UserAPI';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { useNavigate  } from 'react-router-dom';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    backgroundColor: "#a11208",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function AppNavbar(props) {
    const userType = localStorage.getItem("role")
    const [username, setUsername] = useState("")
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserInfo().then(u=> {
            console.log(u)
            setUsername(u.fullname)
        })
        if(userType === "patient"){
            setUserRole("Patient")
        }
        if(userType === "doctor"){
            setUserRole("Doctor")
        }
        if(userType === "pharmacist"){
            setUserRole("Pharmacist")
        }
        if(userType === "admin"){
            setUserRole("Admin")
        }
        if(userType === "pharmaceuticalwarehouseworker"){
            setUserRole("Pharmaceutical Warehouse Worker")
        }
    }, [])

    const handleLogout = (e) => {
        logout()
        navigate('/');
    }

    const handleDrawerOpen = () => {
        props.setOpen(true);
    };

    return (
        <AppBar position="absolute" open={props.open}>
            <Toolbar
                sx={{
                pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                sx={{
                    marginRight: '36px',
                    ...(props.open && { display: 'none' }),
                }}
                >
                <MenuIcon />
                </IconButton>
                
                <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
                >
                    PharmHub
                </Typography>

                <Typography
                component="h4"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
                >
                    {username} - {userRole}
                </Typography>

                { userType === "patient" ?
                <IconButton href='cart' color="inherit">
                    <ShoppingCartIcon />
                </IconButton>
                :
                <></>
                }
                <Button className='logout-button' onClick={handleLogout} sx={{color: "#ffff"}}>
                    <LogoutIcon />
                </Button>
            </Toolbar>
        </AppBar>
    );
}