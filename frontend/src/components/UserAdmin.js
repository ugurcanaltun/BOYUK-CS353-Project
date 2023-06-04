import { Button, TextField } from "@mui/material"
import { addHospital, deleteHospital, deleteUser, fetchUsers } from "../api/AdminAPI"
import { useEffect, useState } from "react"
import { register } from "../api/UserAPI";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function UserAdmin(props) {
    const [removeId, setRemoveId] = useState()
    const [role, setRole] = useState("");
    const [TCK, setTCK] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [expertise, setExpertise] = useState("");
    const [hospitalId, setHospitalId] = useState("");
    const [bankAccountNo, setBankAccountNo] = useState("");
    const [warehouseId, setWarehouseId] = useState("");
    const [pharmacyId, setPharmacyId] = useState("");
    const [userList, setUserList] = useState([])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#D52B1E',
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    useEffect(()=>{
        fetchUsers().then(u=>{
            setUserList(u)
        })
    }, [])

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    function addNewUser() {
        register({
            "TCK": TCK,
            "password": password,
            "fullname": firstName + " " + lastName,
            "address": address,
            "birth_year": birthDate.$y.toString(),
            "role": role,
            "expertise_field": expertise,
            "hospital_id": hospitalId,
            "warehouse_id": warehouseId,
            "pharmacy_id": pharmacyId
          }).then(data =>{
            setTCK("")
            setPassword("")
            setFirstName("")
            setLastName("")
            setAddress("")
            setBirthDate("")
            setRole("")
            setExpertise("")
            setHospitalId("")
            setBankAccountNo("")
            setWarehouseId("")
            setPharmacyId("")
      
            if (data === "success") {
                props.setSuccess(true)
            }
            fetchUsers().then(u=>{
                setUserList(u)
            })
          })
    }

    function removeUser() {
        deleteUser(removeId).then(r=>{
            if (r === "success") {
                props.setSuccess(true)
            }
            fetchUsers().then(u=>{
                setUserList(u)
            })
        })
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value);
        if (event.target.value === "patient") {
            return
        }
        setOpenDialog(true);
    };

    return(
        <div className="admin-panel-container">
            <div>
            <Grid className="admin-list" container>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>TCK</StyledTableCell>
                                <StyledTableCell>Full Name</StyledTableCell>
                                <StyledTableCell>Role</StyledTableCell>
                            </StyledTableRow>
                            </TableHead>
                            <TableBody>
                            {
                            userList?
                            userList.map((u, index) => (
                                <StyledTableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {u.TCK}
                                    </StyledTableCell>
                                    <StyledTableCell>{u.fullname}</StyledTableCell>
                                    <StyledTableCell>{u.role}</StyledTableCell>
                                </StyledTableRow>
                            )):<></>
                        }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            </div>
            <div className="admin-form">
            <h3>Add User</h3>
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    value={TCK}
                    onChange={e=>{setTCK(e.target.value)}}
                    id="tckNumber"
                    label="TCK Number"
                    name="tckNumber"
                    autoComplete="tckNumber"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    autoComplete="given-name"
                    name="firstName"
                    value={firstName}
                    onChange={e=>{setFirstName(e.target.value)}}
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    value={lastName}
                    onChange={e=>{setLastName(e.target.value)}}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    value={password}
                    onChange={e=>{setPassword(e.target.value)}}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="address"
                    value={address}
                    onChange={e=>{setAddress(e.target.value)}}
                    label="Your Address"
                    name="address"
                    autoComplete="address"
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker 
                        label="Birth Year"
                        value={birthDate}
                        onChange={(newDate) => setBirthDate(newDate)}
                        />
                    </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <FormControl fullWidth sx={{mt: 1}}>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role-select"
                        value={role}
                        label="Role"
                        onChange={handleRoleChange}
                    >
                        <MenuItem value={"doctor"}>Doctor</MenuItem>
                        <MenuItem value={"patient"}>Patient</MenuItem>
                        <MenuItem value={"pharmaceuticalwarehouseworker"}>Pharmaceutical Warehouse Worker</MenuItem>
                        <MenuItem value={"pharmacist"}>Pharmacist</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                </Grid>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Fill Additional Information for Role</DialogTitle>
                <DialogContent>
                <DialogContentText sx={{mb: 2}}>
                    Please fill the additional information related with your role.
                </DialogContentText>
                    {
                    role === "doctor" 
                    ?
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            autoComplete="expertise-field"
                            name="expertiseField"
                            required
                            fullWidth
                            id="expertiseField"
                            label="Your Expertise Field"
                            autoFocus
                            value={expertise}
                            onChange={(event) => {
                            setExpertise(event.target.value)
                            }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            autoComplete="hospital-id"
                            name="HospitalId"
                            required
                            fullWidth
                            id="hospitalId"
                            label="Your Hospital Id"
                            autoFocus
                            value={hospitalId}
                            onChange={(event) => {
                            setHospitalId(event.target.value)
                            }}
                        />
                        </Grid>
                    </Grid>
                    :
                    role === "patient"
                    ?
                    <>
                    <TextField
                        autoComplete="bank-account-No"
                        name="bankAccountNo"
                        required
                        fullWidth
                        id="bankAccountNo"
                        label="Your Bank Account No"
                        autoFocus
                        value={bankAccountNo}
                        onChange={(event) => {
                        setBankAccountNo(event.target.value)
                        }}
                    />
                    </>
                    :
                    role === "pharmaceuticalwarehouseworker"
                    ?
                    <>
                    <TextField
                        autoComplete="warehouse-id"
                        name="warehouseId"
                        required
                        fullWidth
                        id="warehouseId"
                        label="Your Warehouse ID"
                        autoFocus
                        value={warehouseId}
                        onChange={(event) => {
                        setWarehouseId(event.target.value)
                        }}
                    />
                    </>
                    :
                    role === "pharmacist"
                    ?
                    <>
                    <TextField
                        autoComplete="pharmacy-id"
                        name="pharmacyId"
                        required
                        fullWidth
                        id="pharmacyId"
                        label="Your Pharmacy Id"
                        autoFocus
                        value={pharmacyId}
                        onChange={(event) => {
                        setPharmacyId(event.target.value)
                        }}
                    />
                    </>
                    :
                    <div/>
                    }
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Button onClick={addNewUser}>Add User</Button>

            <h3>Remove User</h3>
                <TextField
                margin="normal"
                required
                fullWidth
                id="tckNumber"
                label="User TCK"
                name="tckNumber"
                autoComplete="tckNumber"
                value={removeId}
                onChange={e=>{setRemoveId(e.target.value)}}
                autoFocus
                />
                <Button onClick={removeUser}>Remove User</Button>
            </div>
        </div>
    )
}