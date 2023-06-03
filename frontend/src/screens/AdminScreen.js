import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { HospitalAdmin } from '../components/HospitalAdmin';

export default function BasicSelect() {
  const [selected, setSelected] = React.useState(2);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

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
            <MenuItem value={5}>Drugs</MenuItem>
            </Select>
        </FormControl>
    </Box>
    <div>
      {(selected === 2)? <HospitalAdmin/>:null}
    </div>
    </div>
  );
}