import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UserAdmin } from '../components/UserAdmin';
import { HospitalAdmin } from '../components/HospitalAdmin';
import { PharmacyAdmin } from '../components/PharmacyAdmin';
import { WarehouseAdmin } from '../components/WarehouseAdmin';
import { Alert, Snackbar } from '@mui/material';

export default function BasicSelect() {
  const [selected, setSelected] = React.useState(2);
  const [success, setSuccess] = React.useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false)

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  React.useEffect(()=>{
    if (success) {
      setSnackOpen(true)
      setSuccess(false)
    }
  }, [success])

  function handleSnackClose() {
    setSnackOpen(false)
  }

  return (
    <div>
    <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
            <h1>Admin Screen</h1>
        </Box>
        <FormControl fullWidth>
            <InputLabel id="object-label">Object</InputLabel>
            <Select
            labelId="object-label"
            id="object"
            value={selected}
            label="object"
            onChange={handleChange}
            >
            <MenuItem value={1}>Users</MenuItem>
            <MenuItem value={2}>Hospitals</MenuItem>
            <MenuItem value={3}>Pharmacies</MenuItem>
            <MenuItem value={4}>Warehouses</MenuItem>
            </Select>
        </FormControl>
    </Box>
    <div>
      {(selected === 1)? <UserAdmin setSuccess={setSuccess}/>:null}
      {(selected === 2)? <HospitalAdmin setSuccess={setSuccess}/>:null}
      {(selected === 3)? <PharmacyAdmin setSuccess={setSuccess}/>:null}
      {(selected === 4)? <WarehouseAdmin setSuccess={setSuccess}/>:null}
    </div>
    <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleSnackClose} anchorOrigin={{ vertical:"bottom",horizontal:"right" }}>
          <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
              Operation Successful
          </Alert>
      </Snackbar>
    </div>
  );
}