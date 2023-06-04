import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MedicationIcon from '@mui/icons-material/Medication';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { logout } from '../api/UserAPI';
import { useNavigate  } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import "../css/Bank.css"


const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function AppDrawer(props) {
  const userType = localStorage.getItem("role")
  const navigate = useNavigate();

  const handleLogout = (e) => {
    logout()
    navigate('/');
  }
  React.useEffect(()=> {
    // console.log(localStorage.getItem('loggedin'))
    // if (localStorage.getItem('loggedin') === "false") {
    //   navigate('/');
    // }
  })

  let drawerItems;

  if(userType === "patient"){
    drawerItems = [
      {
        id: 0,
        label: "Home",
        icon: (<HomeIcon sx={{ color: '#1976d2' }}/>),
        link: "home",
      },
      {
        id: 1,
        label: "List Medicines",
        icon: (<ShoppingCartIcon sx={{ color: '#1976d2' }}/>),
        link: "listmedicines",
      },
      {
        id: 2,
        label: "Past Orders",
        icon: (<LocalShippingIcon sx={{ color: '#1976d2' }}/>),
        link: "pastorders",
      },
      {
        id: 3,
        label: "My Prescriptions",
        icon: (<ReceiptLongIcon sx={{ color: '#1976d2' }}/>),
        link: "myprescription",
      }
    ]
  }
  else if(userType === "doctor"){
    drawerItems = [
      {
        id: 1,
        label: "List Medicines",
        icon: (<ShoppingCartIcon sx={{ color: '#1976d2' }}/>),
        link: "listmedicines",
      },
      {
        id: 2,
        label: "New Prescription",
        icon: (<ReceiptLongIcon sx={{ color: '#1976d2' }}/>),
        link: "doctorprescription",
      }
    ]
  }
  else if(userType === "pharmacist"){
    drawerItems = [
      {
        id: 0,
        label: "Home",
        icon: (<HomeIcon sx={{ color: '#1976d2' }}/>),
        link: "home",
      },
      {
        id: 1,
        label: "List Medicines",
        icon: (<ShoppingCartIcon sx={{ color: '#1976d2' }}/>),
        link: "viewmedicines",
      },
      {
        id: 2,
        label: "Add New Drug",
        icon: (<MedicationIcon sx={{ color: '#1976d2' }}/>),
        link: "addnewdrug",
      },
      {
        id:3,
        label: "Restock Drug",
        icon: (<RefreshIcon sx={{ color: '#1976d2' }}/>),
        link: "restock",
      }
    ]
  }
  else if(userType === "admin"){
    drawerItems = [
      {
        id: 1,
        label: "Admin",
        icon: (<AdminPanelSettingsIcon sx={{ color: '#1976d2' }}/>),
        link: "admin",
      }
    ]
  }
  else if(userType === "pharmaceuticalwarehouseworker"){
    drawerItems = [
      {
        id: 0,
        label: "Warehouse Orders",
        icon: (<LocalShippingIcon sx={{ color: '#1976d2' }}/>),
        link: "warehouseorders",
      },
      {
        id: 1,
        label: "List Pharmacies",
        icon: (<LocalPharmacyIcon sx={{ color: '#1976d2' }}/>),
        link: "pharmacies",
      }
    ]
  }
  
  const handleDrawerClose = () => {
    props.setOpen(false);
  };

  return (
      <Drawer variant="permanent" open={props.open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {drawerItems.map((item) => (
            <Link style={{ color: '#C7C5D8', textDecoration: 'none' }} key={item.id} to={item.link}>
              <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: props.open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: props.open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} sx={{color: '#000000', opacity: props.open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <Button className='logout-button' onClick={handleLogout}>
            <LogoutIcon />
          </Button>
        </List>
      </Drawer>
  );
}