import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [object, setObject] = React.useState('');

  const handleChange = (event) => {
    setObject(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
            <h1>Admin Screen</h1>
        </Box>
        <FormControl fullWidth>
            <InputLabel id="object-label">Object</InputLabel>
            <Select
            labelId="object-label"
            id="object"
            value={object}
            label="object"
            onChange={handleChange}
            >
            <MenuItem value={10}>Users</MenuItem>
            <MenuItem value={20}>Hospitals</MenuItem>
            <MenuItem value={30}>Pharmacies</MenuItem>
            <MenuItem value={30}>Warehouses</MenuItem>
            <MenuItem value={30}>Drugs</MenuItem>
            <MenuItem value={30}>Prescriptions</MenuItem>
            </Select>
        </FormControl>
    </Box>
  );
}