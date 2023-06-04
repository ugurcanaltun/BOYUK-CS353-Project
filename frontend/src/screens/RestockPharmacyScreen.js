import { useState, useEffect } from "react"
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BASE_URL } from "../api/BaseURL"; 
import axios from "axios";
import { fetchUserInfo } from "../api/UserAPI";

const defaultTheme = createTheme();

export default function RestockPharmacyScreen() {
    const [rows, setRows] = useState([])
    const [warehouseRows, setWarehouseRows] = useState([])
    const [drugName, setDrugName] = useState("")
    const [warehouseId, setWarehouseId] = useState("")

    useEffect(() => {
        axios.get(BASE_URL+"/drug/ugur").then(function (response) {
            setRows(response.data)
        });

        axios.get(BASE_URL+ "/warehouse/getWarehouses").then(function (response) {
            setWarehouseRows(response.data)
        })
    }, [])

    const handleDrugNameChange = (event) => {
        setDrugName(event.target.value);
    };

    const handleWarehouseNameChange = (event) => {
        setWarehouseId(event.target.value);
    };

    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let pharmId
        
        fetchUserInfo().then(i=>{
            pharmId = i.pharmacy_id
            axios.post(BASE_URL+ "/drug/restockDrug", {
                "pharm_id": pharmId,
                "warehouse_id": warehouseId,
                "drug_name": drugName,
                "drug_count": data.get("drugAmount")
            }).then(
                function (response) {
                    console.log(response);
                }
            ).catch(function (error) {
                console.log(error);
            });
    
        })
        
    };

    return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Typography component="h1" variant="h5">
                Restock Drug
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth sx={{mt: 1}}>
                            <InputLabel id="drugName-label">Select Drug</InputLabel>
                            <Select
                                labelId="drugName-label"
                                id="drugName-select"
                                value={drugName}
                                label="Drug Name"
                                onChange={handleDrugNameChange}
                            >
                                {rows ? 
                                rows.map((row, index) => (
                                    <MenuItem key={index} value={row.name} >{row.name}</MenuItem>
                                )): <></>
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="drugAmount"
                            label="Enter Drug Amount"
                            name="drugAmount"
                            autoComplete="drugAmount"
                            autoFocus
                            sx={{mt: 1}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth sx={{mt: 1}}>
                            <InputLabel id="warehouse-label">Select Warehouse</InputLabel>
                            <Select
                                labelId="warehouse-label"
                                id="warehouse-select"
                                value={warehouseId}
                                label="Warehouse Name"
                                onChange={handleWarehouseNameChange}
                            >
                                {warehouseRows ? 
                                warehouseRows.map((row) => (
                                    <MenuItem key={row.warehouse_id} value={row.warehouse_id} >{row.warehouse_name}</MenuItem>
                                )): <></>
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Restock
                </Button>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}