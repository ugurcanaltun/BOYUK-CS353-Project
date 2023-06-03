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

export default function WareHouseOrdersScreen() {
    const [openDialog, setOpenDialog] = React.useState(false)
    const [dialogEnum, setDialogEnum] = React.useState(0)
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    function OrderedItemsButton() {
        const onClick = () => {
            setDialogEnum(1)
            setOpenDialog(true)
        }
        return (
            <Button onClick={onClick}>
                View Ordered Items
            </Button>
        )
    }

    function OrderDetailsButton() {
        const onClick = () => {
            setDialogEnum(2)
            setOpenDialog(true)
        }
        return (
            <Button onClick={onClick}>
                View Order Details
            </Button>
        )
    }

    const rows = [
        {
            "id": 0,
            "pharmacy": "Faruk Eczanesi",
            "orderedItems": <OrderedItemsButton/>,
            "orderDate": "31/12/2031",
            "orderDetails": <OrderDetailsButton/>
        },
        {
            "id": 1,
            "pharmacy": "Gaylan Eczanesi",
            "orderedItems": <OrderedItemsButton/>,
            "orderDate": "31/12/2031",
            "orderDetails": <OrderDetailsButton/>
        },
        {
            "id": 2,
            "pharmacy": "Kastamanolular Eczanesi",
            "orderedItems": <OrderedItemsButton/>,
            "orderDate": "31/12/2031",
            "orderDetails": <OrderDetailsButton/>
        },
        {
            "id": 3,
            "pharmacy": "Nejat Isler Eczanesi",
            "orderedItems": <OrderedItemsButton/>,
            "orderDate": "31/12/2031",
            "orderDetails": <OrderDetailsButton/>
        }
    ]

    return(
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Box sx={{ flexGrow: 1 }}>
                <h1>Warehouse Orders</h1>
            </Box>
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Pharmacy</TableCell>
                                <TableCell align="right">Ordered Items</TableCell>
                                <TableCell align="right">Order Date</TableCell>
                                <TableCell align="right">Order Details</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.pharmacy}
                                </TableCell>
                                <TableCell align="right">{row.orderedItems}</TableCell>
                                <TableCell align="right">{row.orderDate}</TableCell>
                                <TableCell align="right">{row.orderDetails}</TableCell>
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
                {dialogEnum == 1 ?
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
                            Ordered Items
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleCloseDialog}>
                            <CloseIcon />
                        </Button>
                    </Toolbar>
                </AppBar> :
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
                        Order Details
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleCloseDialog}>
                        <CloseIcon />
                    </Button>
                </Toolbar>
            </AppBar>}
            </Dialog>
        </Box>
    );
}