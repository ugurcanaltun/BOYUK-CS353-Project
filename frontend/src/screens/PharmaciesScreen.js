import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function PharmaciesScreen() {
    const [openDialog, setOpenDialog] = React.useState(false)
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    function ViewButton() {
        const onClick = () => {
            setOpenDialog(true)
        }
        return (
            <Button onClick={onClick}>
                View Details
            </Button>
        )
    }

    const rows = [
        {
            "id": 0,
            "pharmacistName": "Ugur Can Altun",
            "pharmacyName": "Bilkent",
            "address": "Cankaya/Ankara",
            "viewButton": <ViewButton/>
        },
        {
            "id": 1,
            "pharmacistName": "Yarkin Sakinci",
            "pharmacyName": "ODTU",
            "address": "Cankaya/Ankara",
            "viewButton": <ViewButton/>
        },
        {
            "id": 3,
            "pharmacistName": "Boran Torun",
            "pharmacyName": "Hacettepe",
            "address": "Cankaya/Ankara",
            "viewButton": <ViewButton/>
        },
        {
            "id": 4,
            "pharmacistName": "Ramiz Karaeski",
            "pharmacyName": "Dayi Eczanesi",
            "address": "Istanbul",
            "viewButton": <ViewButton/>
        }
    ]

    return(
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Box sx={{ flexGrow: 1 }}>
                <h1>Pharmacies</h1>
            </Box>
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Pharmacist Name</TableCell>
                                <TableCell align="right">Pharmacy Name</TableCell>
                                <TableCell align="right">Address</TableCell>
                                <TableCell align="right">Details</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.pharmacistName}
                                </TableCell>
                                <TableCell align="right">{row.pharmacyName}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.viewButton}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Dialog
                fullScreen
                open={openDialog}
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseDialog}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Pharmacy Details
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleCloseDialog}>
                            <CloseIcon />
                        </Button>
                    </Toolbar>
                </AppBar>
            </Dialog>
        </Box>
    );
}