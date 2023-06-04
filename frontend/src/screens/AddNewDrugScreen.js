import * as React from 'react';
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
import { BASE_URL } from '../api/BaseURL';
import axios from "axios";

const defaultTheme = createTheme();

export default function AddNewDrugScreen() {
    const [prescription, setPrescription] = React.useState("");

    const handlePrescriptionChange = (event) => {
        setPrescription(event.target.value);
    };

    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let drugNew = {
            "name": data.get('drugName'),
            "needs_prescription": prescription,
            "drug_class": data.get('drugClass'),
            "drug_type": data.get("drugType"),
            "price": data.get("drugPrice")
        }
        axios.post(BASE_URL + "/drug/registerDrug", drugNew).then(
            function (response) {
                console.log(response);
            }
        ).catch(function (error) {
            console.log(error);
        });

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
                Register Drug
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="drugName"
                            label="Enter Drug Name"
                            name="drugName"
                            autoComplete="drugName"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="drugClass"
                            label="Enter Drug Company"
                            name="drugClass"
                            autoComplete="drugClass"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="drugType"
                            label="Enter Drug Type"
                            name="drugType"
                            autoComplete="drugType"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth sx={{mt: 1}}>
                            <InputLabel id="prescription-label">Prescription</InputLabel>
                            <Select
                                labelId="prescription-label"
                                id="prescription-select"
                                value={prescription}
                                label="Prescription"
                                onChange={handlePrescriptionChange}
                            >
                                <MenuItem value={"yes"}>Needs Prescription</MenuItem>
                                <MenuItem value={"no"}>No Prescription</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="drugPrice"
                            label="Enter Drug Price"
                            name="drugPrice"
                            autoComplete="drugPrice"
                            autoFocus
                        />
                    </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Register
                </Button>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}