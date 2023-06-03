import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { register } from '../api/UserAPI';
import { Alert, Snackbar } from '@mui/material';

const theme = createTheme();

export default function SignUp() {
  const [role, setRole] = React.useState("");
  const [TCK, setTCK] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [expertise, setExpertise] = React.useState("");
  const [hospitalId, setHospitalId] = React.useState("");
  const [bankAccountNo, setBankAccountNo] = React.useState("");
  const [warehouseId, setWarehouseId] = React.useState("");
  const [pharmacyId, setPharmacyId] = React.useState("");

  const [snackOpen, setSnackOpen] = React.useState(false)
  const [snackText, setSnackText] = React.useState("")
  const [snackStatus, setSnackStatus] = React.useState("error")

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setOpenDialog(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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

      if (data === "successful") {
        setSnackStatus("success")
        setSnackText("Account created successfuly")
        setSnackOpen(true)
      }
    })
  };
  function handleSnackClose() {
    setSnackOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
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
        </Box>
      </Container>
      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleSnackClose} anchorOrigin={{ vertical:"bottom",horizontal:"right" }}>
          <Alert onClose={handleSnackClose} severity={snackStatus} sx={{ width: '100%' }}>
              {snackText}
          </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}